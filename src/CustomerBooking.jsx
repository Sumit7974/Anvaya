import { useEffect, useMemo, useState } from 'react';
import { apiRequest, getStoredToken } from './api/client';

const SERVICES = ['All', 'Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mason'];
const ICONS = { electrician: '⚡', plumber: '🔧', carpenter: '🪚', painter: '🎨', mason: '🧱' };
const RADIUS_KM = 15;

const title = value => value ? String(value).replace(/\b\w/g, char => char.toUpperCase()) : 'Professional Worker';

const distanceKm = (lat1, lon1, lat2, lon2) => {
  const toRad = value => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const detectService = text => {
  const value = String(text || '').toLowerCase();
  const keywords = {
    electrician: ['switch', 'wire', 'wiring', 'electric', 'electricity', 'fan', 'light', 'socket', 'voltage', 'spark', 'sparking'],
    plumber: ['tap', 'pipe', 'water', 'leak', 'leaking', 'faucet', 'drain', 'toilet', 'plumbing'],
    painter: ['paint', 'painting', 'colour', 'color', 'whitewash'],
    carpenter: ['door', 'furniture', 'wood', 'table', 'chair', 'cabinet'],
    mason: ['brick', 'cement', 'concrete', 'masonry', 'construction']
  };
  return Object.entries(keywords).find(([, words]) => words.some(word => value.includes(word)))?.[0] || null;
};

const readSavedJson = key => {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
};

function CustomerBooking({ onBack, onSelectWorker }) {
  const savedRequest = readSavedJson('anvaya_service_request');
  const savedLocation = readSavedJson('anvaya_customer_location');
  const initialService = detectService(savedRequest?.problem);
  const validSavedLocation = Number.isFinite(Number(savedLocation?.latitude)) && Number.isFinite(Number(savedLocation?.longitude))
    ? { latitude: Number(savedLocation.latitude), longitude: Number(savedLocation.longitude), label: savedLocation.label || 'Saved location' }
    : null;

  const [workers, setWorkers] = useState([]);
  const [service, setService] = useState(initialService ? title(initialService) : 'All');
  const [search, setSearch] = useState('');
  const [note, setNote] = useState(typeof savedRequest?.problem === 'string' ? savedRequest.problem : '');
  const [selected, setSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(validSavedLocation);
  const [locationLabel, setLocationLabel] = useState(validSavedLocation?.label || 'Current location');
  const [locationStatus, setLocationStatus] = useState(validSavedLocation ? 'ready' : 'loading');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [addressQuery, setAddressQuery] = useState('');
  const [addressResults, setAddressResults] = useState([]);
  const [searchingAddress, setSearchingAddress] = useState(false);
  const [loading, setLoading] = useState(Boolean(validSavedLocation));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (customerLocation) return;
    if (!navigator.geolocation) {
      setLocationStatus('unsupported');
      setLoading(false);
      setError('Location is not supported by this browser. Choose the service location manually.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        const coords = { latitude: position.coords.latitude, longitude: position.coords.longitude, label: 'Current location' };
        setCustomerLocation(coords);
        setLocationLabel(coords.label);
        setLocationStatus('ready');
        localStorage.setItem('anvaya_customer_location', JSON.stringify(coords));
      },
      locationError => {
        setLocationStatus('denied');
        setLoading(false);
        setError(locationError.code === locationError.PERMISSION_DENIED ? 'Location permission was denied. Choose the service location manually.' : 'We could not detect your location. Choose the service location manually.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 120000 }
    );
  }, [customerLocation]);

  useEffect(() => {
    if (!customerLocation) return;
    let cancelled = false;
    const params = new URLSearchParams({ latitude: String(customerLocation.latitude), longitude: String(customerLocation.longitude), radius: String(RADIUS_KM) });
    if (service !== 'All') params.set('skill', service.toLowerCase());
    setLoading(true);
    apiRequest(`/api/workers/nearby?${params.toString()}`, { token: getStoredToken() })
      .then(data => { if (!cancelled) setWorkers(Array.isArray(data?.workers) ? data.workers : []); })
      .catch(requestError => { if (!cancelled) { setWorkers([]); setError(requestError.message || 'Unable to find nearby workers.'); } })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [customerLocation, service]);

  const useLocation = coords => {
    const next = { latitude: Number(coords.latitude), longitude: Number(coords.longitude), label: coords.label || 'Selected service location' };
    setCustomerLocation(next);
    setLocationLabel(next.label);
    setLocationStatus('ready');
    setError('');
    localStorage.setItem('anvaya_customer_location', JSON.stringify(next));
    setShowLocationPicker(false);
  };

  const searchAddress = async () => {
    const query = addressQuery.trim();
    if (query.length < 3) { setError('Enter at least 3 characters to search for a location.'); return; }
    setSearchingAddress(true);
    setError('');
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=in&q=${encodeURIComponent(query)}`, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Location search failed.');
      const results = await response.json();
      setAddressResults(Array.isArray(results) ? results : []);
      if (!results.length) setError('No matching location found. Try a town, village, landmark or full address.');
    } catch (requestError) {
      setAddressResults([]);
      setError(requestError.message || 'Location search failed.');
    } finally { setSearchingAddress(false); }
  };

  const chooseWorker = worker => {
    setSelected(worker);
    setAnalysis(null);
    setError('');
    const saved = readSavedJson('anvaya_service_request');
    if (typeof saved?.problem === 'string') setNote(saved.problem);
  };

  const analyze = async () => {
    if (!note.trim()) return;
    try {
      setError('');
      const data = await apiRequest('/api/services/analyze', { method: 'POST', token: getStoredToken(), body: { text: note.trim() } });
      setAnalysis(data);
      const detected = data?.service || data?.serviceTag;
      if (detected && SERVICES.some(item => item.toLowerCase() === String(detected).toLowerCase())) setService(title(detected));
    } catch (requestError) { setError(requestError.message || 'Could not understand the request.'); }
  };

  const submit = async () => {
    if (!selected || note.trim().length < 10) { setError('Please describe exactly what you need (at least 10 characters).'); return; }
    if (!customerLocation) { setError('Please select the place where the work will happen.'); return; }
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
    } catch (requestError) { setError(requestError.message || 'Unable to send booking request.'); }
    finally { setSubmitting(false); }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return workers.map(worker => {
      const coords = worker.location?.coordinates;
      const distance = Array.isArray(coords) && coords.length === 2 && customerLocation
        ? distanceKm(customerLocation.latitude, customerLocation.longitude, Number(coords[1]), Number(coords[0]))
        : null;
      const skills = Array.isArray(worker.skills) ? worker.skills.map(skill => String(skill).toLowerCase()) : [];
      const displayedSkill = service !== 'All' && skills.includes(service.toLowerCase()) ? service.toLowerCase() : skills[0];
      return { ...worker, distance, displayedSkill };
    }).filter(worker => {
      const skills = Array.isArray(worker.skills) ? worker.skills.map(skill => String(skill).toLowerCase()) : [];
      return (service === 'All' || skills.includes(service.toLowerCase())) && (!q || String(worker.name || '').toLowerCase().includes(q) || skills.some(skill => skill.includes(q)));
    }).sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
  }, [workers, search, service, customerLocation]);

  return <main className="min-h-screen bg-[#FFF8F3] text-slate-800">
    <header className="border-b border-amber-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4"><div className="flex items-center gap-4"><img src="/anvaya-logo.png" alt="Anvaya" className="h-12"/><div className="border-l border-slate-200 pl-4"><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Customer</p><p className="text-sm font-semibold">Find & hire a trusted worker</p></div></div><button type="button" onClick={onBack} className="rounded-xl border border-amber-200 bg-white px-4 py-2 font-semibold">← Back</button></div></header>
    <section className="bg-[#FFF1E6]"><div className="mx-auto max-w-7xl px-5 py-9"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Smart service request</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">Trusted workers near you</h1><p className="mt-2 max-w-3xl text-slate-600">Find active, verified workers within {RADIUS_KM} km of the place where the work needs to happen.</p></div><button type="button" onClick={() => setShowLocationPicker(true)} className="min-w-[240px] rounded-2xl bg-white px-5 py-4 text-left shadow-sm ring-1 ring-amber-200"><span className="block text-xs font-bold uppercase tracking-wider text-amber-700">Service location</span><span className="mt-1 block font-bold text-slate-900">📍 {locationLabel}</span><span className="mt-1 block text-xs text-slate-500">Change location →</span></button></div><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search electrician, plumber, carpenter..." className="mt-6 w-full max-w-2xl rounded-2xl border border-amber-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-amber-100"/></div></section>

    <section className="mx-auto max-w-7xl px-5 py-7">
      {note.trim() && <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-sm text-emerald-900"><p className="font-bold">✓ Your request is saved</p><p className="mt-1">The worker will receive this exact note:</p><p className="mt-3 rounded-xl bg-white px-4 py-3 font-medium leading-6 text-slate-700">“{note}”</p>{service !== 'All' && <p className="mt-3 font-semibold">Matched service: {title(service)}</p>}</div>}
      {error && <div className="mb-5 rounded-xl bg-red-50 p-4 font-medium text-red-700">{error}</div>}
      <div className="flex gap-3 overflow-x-auto pb-2">{SERVICES.map(item => <button key={item} type="button" onClick={() => setService(item)} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold ${service === item ? 'bg-amber-600 text-white' : 'border border-amber-100 bg-white'}`}>{item}</button>)}</div>
    </section>

    <section className="mx-auto max-w-7xl px-5 pb-12"><div className="mb-5 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-bold">Available nearby workers</h2><p className="mt-1 text-sm text-slate-500">Only active, verified and available professionals are shown.</p></div>{locationStatus === 'ready' && <span className="text-sm font-bold text-emerald-700">{filtered.length} found</span>}</div>{loading ? <div className="rounded-2xl bg-white p-10 text-center text-slate-500">Finding verified workers near {locationLabel}…</div> : locationStatus !== 'ready' ? <div className="rounded-2xl bg-white p-10 text-center"><p className="font-bold">Choose a service location</p><p className="mt-2 text-sm text-slate-500">Use your current location or search for the place where the worker should go.</p><button type="button" onClick={() => setShowLocationPicker(true)} className="mt-4 rounded-xl bg-amber-600 px-5 py-3 font-bold text-white">Choose location</button></div> : filtered.length === 0 ? <div className="rounded-2xl bg-white p-10 text-center text-slate-500">No matching verified workers are available within {RADIUS_KM} km of {locationLabel}.</div> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map(worker => <article key={worker._id} className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm"><div className="flex justify-between"><span className="text-3xl">{ICONS[worker.displayedSkill] || '👷'}</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">● Available</span></div><h3 className="mt-5 text-xl font-bold">{worker.name}</h3><p className="font-semibold text-amber-700">{title(worker.displayedSkill)}</p><p className="mt-3 text-sm">⭐ {Number(worker.rating?.average || 0).toFixed(1)} · {worker.rating?.count || 0} reviews</p><p className="mt-2 text-sm font-semibold text-slate-600">📍 {worker.distance == null ? 'Distance unavailable' : `${worker.distance.toFixed(1)} km away`}</p><button type="button" onClick={() => chooseWorker(worker)} className="mt-5 w-full rounded-xl bg-amber-600 px-4 py-3 font-bold text-white">Hire this worker →</button></article>)}</div>}</section>

    {showLocationPicker && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"><div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Service location</p><h2 className="mt-1 text-2xl font-bold">Where should the worker go?</h2><p className="mt-2 text-sm leading-6 text-slate-500">This can be your home, your parents’ home, a relative’s house, or any other place needing service.</p></div><button type="button" onClick={() => setShowLocationPicker(false)} className="rounded-lg px-3 py-2 text-xl text-slate-500">✕</button></div><button type="button" onClick={() => { if (navigator.geolocation) navigator.geolocation.getCurrentPosition(position => useLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, label: 'Current location' }), () => setError('Could not get your current location.')); else setError('Location is not supported by this browser.'); }} className="mt-6 flex w-full items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-left"><span><b className="block text-emerald-800">📍 Use my current location</b><span className="text-sm text-emerald-700">Use this when you are at the service address.</span></span><span className="font-bold text-emerald-700">Use →</span></button><div className="my-5 flex items-center gap-3"><div className="h-px flex-1 bg-slate-200"/><span className="text-xs font-bold text-slate-400">OR SEARCH ANOTHER PLACE</span><div className="h-px flex-1 bg-slate-200"/></div><div className="flex gap-2"><input value={addressQuery} onChange={event => setAddressQuery(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') void searchAddress(); }} placeholder="Example: Gwalior, MP or parents' home" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-amber-400"/><button type="button" onClick={() => void searchAddress()} disabled={searchingAddress} className="rounded-xl bg-slate-900 px-5 py-3.5 font-bold text-white disabled:opacity-50">{searchingAddress ? 'Searching…' : 'Search'}</button></div>{addressResults.length > 0 && <div className="mt-4 space-y-2">{addressResults.map(result => <button type="button" key={`${result.place_id}-${result.lat}`} onClick={() => useLocation({ latitude: Number(result.lat), longitude: Number(result.lon), label: result.display_name })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left text-sm hover:border-amber-300 hover:bg-amber-50">📍 {result.display_name}</button>)}</div>}<p className="mt-5 text-xs leading-5 text-slate-400">The selected place is used for nearby-worker matching and is saved on this device.</p></div></div>}

    {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"><div className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Request to {selected.name}</p><h2 className="mt-1 text-2xl font-bold">What should the worker do?</h2></div><button type="button" onClick={() => setSelected(null)}>✕</button></div><textarea value={note} onChange={event => { setNote(event.target.value); setError(''); }} rows="6" maxLength={2000} placeholder="Describe the symptom, location inside the property, urgency and exact work you expect." className="mt-5 w-full resize-none rounded-2xl border border-slate-200 p-4 outline-none focus:border-amber-400"/><div className="mt-2 flex justify-between text-xs text-slate-400"><span>Service location: {locationLabel}</span><span>{note.length}/2000</span></div><button type="button" onClick={() => void analyze()} disabled={!note.trim()} className="mt-4 rounded-xl border border-amber-200 px-4 py-3 font-bold text-amber-700 disabled:opacity-50">Understand my request</button>{analysis && <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm"><b>Suggested service:</b> {title(analysis.service || analysis.serviceTag)}{analysis.urgency ? ` · ${title(analysis.urgency)} urgency` : ''}{analysis.suggestedPrice ? <> · <b>Suggested range:</b> ₹{analysis.suggestedPrice.min}–₹{analysis.suggestedPrice.max}</> : null}</div>}<div className="mt-6 grid grid-cols-2 gap-3"><button type="button" onClick={() => setSelected(null)} className="rounded-xl border border-slate-200 px-4 py-3 font-bold">Cancel</button><button type="button" disabled={submitting} onClick={() => void submit()} className="rounded-xl bg-amber-600 px-4 py-3 font-bold text-white disabled:opacity-50">{submitting ? 'Sending...' : 'Send Request →'}</button></div><p className="mt-4 text-center text-xs text-slate-400">The worker must accept or reject your request. Price is not final until the worker sends a quote and you accept it.</p></div></div>}
  </main>;
}

export default CustomerBooking;
