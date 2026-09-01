import { useEffect, useMemo, useRef, useState } from 'react';
import { apiRequest, getStoredToken } from './api/client';

const services = ['All', 'Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mason'];
const icons = { electrician: '⚡', plumber: '🔧', carpenter: '🪚', painter: '🎨', mason: '🧱' };
const title = v => v ? String(v).replace(/\b\w/g, c => c.toUpperCase()) : 'Professional Worker';
const RADIUS_KM = 15;

const distanceKm = (lat1, lon1, lat2, lon2) => {
  const toRad = value => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const detectServiceLocally = text => {
  const value = String(text || '').toLowerCase();
  const keywords = {
    electrician: ['switch', 'wire', 'wiring', 'electric', 'electricity', 'fan', 'light', 'socket', 'voltage', 'sparking', 'spark'],
    plumber: ['tap', 'pipe', 'water', 'leak', 'leaking', 'faucet', 'drain', 'toilet', 'plumbing'],
    painter: ['paint', 'painting', 'wall', 'colour', 'color', 'whitewash'],
    carpenter: ['door', 'furniture', 'wood', 'table', 'chair', 'cabinet'],
    mason: ['brick', 'cement', 'concrete', 'masonry', 'construction']
  };
  return Object.entries(keywords).find(([, words]) => words.some(word => value.includes(word)))?.[0] || null;
};

function CustomerBooking({ onBack, onSelectWorker }) {
  const [workers, setWorkers] = useState([]);
  const [search, setSearch] = useState('');
  const [service, setService] = useState('All');
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('loading');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const requestId = useRef(0);

  const loadNearbyWorkers = async (coords, selectedService = service) => {
    const params = new URLSearchParams({ latitude: String(coords.latitude), longitude: String(coords.longitude), radius: String(RADIUS_KM) });
    if (selectedService !== 'All') params.set('skill', selectedService.toLowerCase());
    const currentRequest = ++requestId.current;
    const data = await apiRequest(`/api/workers/nearby?${params.toString()}`, { token: getStoredToken() });
    if (currentRequest === requestId.current) setWorkers(Array.isArray(data?.workers) ? data.workers : []);
  };

  const detectLocation = () => {
    setError(''); setLocationStatus('loading'); setLoading(true);
    if (!navigator.geolocation) { setLocationStatus('unsupported'); setLoading(false); setError('Location is not supported by this browser.'); return; }
    navigator.geolocation.getCurrentPosition(
      async position => {
        const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        setCustomerLocation(coords);
        localStorage.setItem('anvaya_customer_location', JSON.stringify(coords));
        setLocationStatus('ready');
        try { await loadNearbyWorkers(coords, service); }
        catch (e) { setError(e.message || 'Unable to find nearby workers.'); setWorkers([]); }
        finally { setLoading(false); }
      },
      geolocationError => {
        setLocationStatus('denied'); setLoading(false);
        if (geolocationError.code === geolocationError.PERMISSION_DENIED) setError('Location permission was denied. Allow location access and try again.');
        else if (geolocationError.code === geolocationError.TIMEOUT) setError('Location took too long to load. Please try again.');
        else setError('We could not detect your location. Please try again.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 120000 }
    );
  };

  useEffect(() => {
    let alive = true;
    try {
      const saved = JSON.parse(localStorage.getItem('anvaya_service_request') || 'null');
      if (alive && typeof saved?.problem === 'string') {
        setNote(saved.problem);
        const detected = detectServiceLocally(saved.problem);
        if (detected) setService(title(detected));
      }
      const savedLocation = JSON.parse(localStorage.getItem('anvaya_customer_location') || 'null');
      if (savedLocation && Number.isFinite(Number(savedLocation.latitude)) && Number.isFinite(Number(savedLocation.longitude))) {
        setCustomerLocation({ latitude: Number(savedLocation.latitude), longitude: Number(savedLocation.longitude) });
      }
    } catch { /* Ignore malformed local storage. */ }
    detectLocation();
    return () => { alive = false; requestId.current += 1; };
  }, []);

  useEffect(() => {
    if (!customerLocation) return;
    setLoading(true);
    loadNearbyWorkers(customerLocation, service)
      .catch(e => setError(e.message || 'Unable to refresh nearby workers.'))
      .finally(() => setLoading(false));
  }, [service, customerLocation]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const selectedSkill = service.toLowerCase();
    return workers.map(worker => {
      const coordinates = worker.location?.coordinates;
      const distance = Array.isArray(coordinates) && coordinates.length === 2 && customerLocation
        ? distanceKm(customerLocation.latitude, customerLocation.longitude, Number(coordinates[1]), Number(coordinates[0]))
        : null;
      const skills = Array.isArray(worker.skills) ? worker.skills.map(s => String(s).toLowerCase()) : [];
      const displayedSkill = service !== 'All' && skills.includes(selectedSkill) ? selectedSkill : skills[0];
      return { ...worker, distance, displayedSkill };
    }).filter(worker => {
      const skills = Array.isArray(worker.skills) ? worker.skills.map(s => String(s).toLowerCase()) : [];
      const serviceMatches = service === 'All' || skills.includes(selectedSkill);
      const searchMatches = !q || String(worker.name || '').toLowerCase().includes(q) || skills.some(s => s.includes(q));
      return serviceMatches && searchMatches;
    }).sort((a, b) => (a.distance ?? Number.POSITIVE_INFINITY) - (b.distance ?? Number.POSITIVE_INFINITY));
  }, [workers, search, service, customerLocation]);

  const choose = worker => {
    setSelected(worker); setAnalysis(null); setError('');
    try {
      const saved = JSON.parse(localStorage.getItem('anvaya_service_request') || 'null');
      setNote(typeof saved?.problem === 'string' ? saved.problem : note);
    } catch { /* Keep current requirement. */ }
  };

  const analyze = async () => {
    if (!note.trim()) return;
    try {
      setError('');
      const data = await apiRequest('/api/services/analyze', { method: 'POST', token: getStoredToken(), body: { text: note.trim() } });
      setAnalysis(data);
      const detected = data?.service || data?.serviceTag;
      if (detected && services.some(s => s.toLowerCase() === String(detected).toLowerCase())) setService(title(detected));
    } catch (e) { setError(e.message || 'Could not understand the request.'); }
  };

  const submit = async () => {
    if (!selected || note.trim().length < 10) { setError('Please describe exactly what you need (at least 10 characters).'); return; }
    if (!customerLocation) { setError('Your location is required so the booking can be tied to the correct service location.'); return; }
    try {
      setSubmitting(true); setError('');
      const data = await apiRequest('/api/bookings', {
        method: 'POST', token: getStoredToken(),
        body: {
          problemDescription: note.trim(),
          serviceTag: analysis?.service || selected.displayedSkill || selected.skills?.[0] || 'general service',
          location: { type: 'Point', coordinates: [customerLocation.longitude, customerLocation.latitude] },
          workerId: selected._id
        }
      });
      if (!data?.booking?._id) throw new Error('Booking was not created.');
      localStorage.removeItem('anvaya_service_request');
      onSelectWorker?.(selected, data.booking._id);
    } catch (e) { setError(e.message || 'Unable to send booking request.'); }
    finally { setSubmitting(false); }
  };

  return <main className="min-h-screen bg-[#FFF8F3] text-slate-800">
    <header className="border-b border-amber-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><div className="flex items-center gap-4"><img src="/anvaya-logo.png" alt="Anvaya" className="h-12"/><div className="border-l border-slate-200 pl-4"><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Customer</p><p className="text-sm font-semibold">Find & hire a trusted worker</p></div></div><button type="button" onClick={onBack} className="rounded-xl border border-amber-200 bg-white px-4 py-2 font-semibold">← Back</button></div></header>
    <section className="bg-[#FFF1E6]"><div className="mx-auto max-w-7xl px-5 py-10"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Smart service request</p><h1 className="mt-2 text-3xl font-bold">Trusted workers near you</h1><p className="mt-2 max-w-2xl text-slate-600">We use your device location to show active, verified workers within {RADIUS_KM} km, sorted by distance.</p></div><div className={`rounded-2xl border px-4 py-3 text-sm font-bold ${locationStatus === 'ready' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-white text-amber-700'}`}>{locationStatus === 'ready' ? '📍 Location detected' : locationStatus === 'loading' ? '📍 Detecting location…' : '📍 Location needed'}</div></div><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search electrician, plumber, carpenter..." className="mt-6 w-full max-w-2xl rounded-2xl border border-amber-100 bg-white px-5 py-4 outline-none"/></div></section>
    <section className="mx-auto max-w-7xl px-5 py-7">
      {note.trim() && <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-sm text-emerald-900"><p className="font-bold">✓ Your request is saved</p><p className="mt-1 leading-6">The worker will receive this exact note:</p><p className="mt-3 rounded-xl bg-white px-4 py-3 font-medium leading-6 text-slate-700">“{note}”</p>{service !== 'All' && <p className="mt-3 font-semibold">Matched service: {title(service)}</p>}</div>}
      {locationStatus !== 'ready' && <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-bold text-slate-900">We need your location</p><p className="mt-1 text-sm leading-6 text-slate-500">Your location is used to find nearby workers and set the service location.</p></div><button type="button" onClick={detectLocation} className="rounded-xl bg-amber-600 px-5 py-3 font-bold text-white">Allow location</button></div>}
      <div className="flex gap-3 overflow-x-auto pb-2">{services.map(s => <button key={s} type="button" onClick={() => setService(s)} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold ${service === s ? 'bg-amber-600 text-white' : 'border border-amber-100 bg-white'}`}>{s}</button>)}</div>
    </section>
    {error && <div className="mx-auto max-w-7xl px-5"><div className="rounded-xl bg-red-50 p-4 text-red-700">{error}</div></div>}
    <section className="mx-auto max-w-7xl px-5 pb-12"><div className="mb-5 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-bold">Available nearby workers</h2><p className="mt-1 text-sm text-slate-500">Only active, verified and available professionals are shown.</p></div>{locationStatus === 'ready' && <span className="text-sm font-bold text-emerald-700">{filtered.length} found</span>}</div>{loading ? <div className="rounded-2xl bg-white p-10 text-center text-slate-500">Finding verified workers near you…</div> : locationStatus !== 'ready' ? <div className="rounded-2xl bg-white p-10 text-center"><p className="font-bold">Location access is needed</p><p className="mt-2 text-sm text-slate-500">Allow location access to see nearby workers.</p></div> : filtered.length === 0 ? <div className="rounded-2xl bg-white p-10 text-center text-slate-500">No matching verified workers are available within {RADIUS_KM} km right now.</div> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map(w => <article key={w._id} className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm"><div className="flex justify-between"><span className="text-3xl">{icons[w.displayedSkill] || '👷'}</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">● Available</span></div><h3 className="mt-5 text-xl font-bold">{w.name}</h3><p className="font-semibold text-amber-700">{title(w.displayedSkill)}</p><p className="mt-3 text-sm">⭐ {Number(w.rating?.average || 0).toFixed(1)} · {w.rating?.count || 0} reviews</p><p className="mt-2 text-sm font-semibold text-slate-600">📍 {w.distance == null ? 'Distance unavailable' : `${w.distance.toFixed(1)} km away`}</p><button type="button" onClick={() => choose(w)} className="mt-5 w-full rounded-xl bg-amber-600 px-4 py-3 font-bold text-white">Hire this worker →</button></article>)}</div>}</section>
    {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-5"><div className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Request to {selected.name}</p><h2 className="mt-1 text-2xl font-bold">What should the worker do?</h2></div><button type="button" onClick={() => setSelected(null)}>✕</button></div><textarea value={note} onChange={e => { setNote(e.target.value); setError(''); }} rows="6" maxLength={2000} placeholder="Describe the symptom, location, urgency and exact work you expect." className="mt-5 w-full resize-none rounded-2xl border border-slate-200 p-4 outline-none focus:border-amber-400"/><div className="mt-2 flex justify-between text-xs text-slate-400"><span>Be specific so the worker can quote fairly.</span><span>{note.length}/2000</span></div><button type="button" onClick={() => void analyze()} disabled={!note.trim()} className="mt-4 rounded-xl border border-amber-200 px-4 py-3 font-bold text-amber-700 disabled:opacity-50">Understand my request</button>{analysis && <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm"><b>Suggested service:</b> {title(analysis.service || analysis.serviceTag)}{analysis.suggestedPrice && <> · <b>Suggested range:</b> ₹{analysis.suggestedPrice.min}–₹{analysis.suggestedPrice.max}</>}{analysis.confidence ? ` · ${Math.round(analysis.confidence * 100)}% confidence` : ''}</div>}<div className="mt-6 grid grid-cols-2 gap-3"><button type="button" onClick={() => setSelected(null)} className="rounded-xl border border-slate-200 px-4 py-3 font-bold">Cancel</button><button type="button" disabled={submitting} onClick={() => void submit()} className="rounded-xl bg-amber-600 px-4 py-3 font-bold text-white disabled:opacity-50">{submitting ? 'Sending...' : 'Send Request →'}</button></div><p className="mt-4 text-center text-xs text-slate-400">The worker must accept or reject your request. The price is not finalized until the worker sends a quote and you accept it.</p></div></div>}
  </main>;
}
export default CustomerBooking;
