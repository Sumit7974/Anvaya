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

const readSaved = key => {
  try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; }
};

function CustomerBooking({ onBack, onSelectWorker }) {
  const savedRequest = readSaved('anvaya_service_request');
  const savedLocation = readSaved('anvaya_customer_location');
  const initialService = detectService(savedRequest?.problem);
  const initialLocation = Number.isFinite(Number(savedLocation?.latitude)) && Number.isFinite(Number(savedLocation?.longitude))
    ? { latitude: Number(savedLocation.latitude), longitude: Number(savedLocation.longitude), label: savedLocation.label || 'Saved location' }
    : null;

  const [workers, setWorkers] = useState([]);
  const [service, setService] = useState(initialService ? title(initialService) : 'All');
  const [search, setSearch] = useState('');
  const [note, setNote] = useState(typeof savedRequest?.problem === 'string' ? savedRequest.problem : '');
  const [selected, setSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [serviceLocation, setServiceLocation] = useState(initialLocation);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [addressQuery, setAddressQuery] = useState('');
  const [addressResults, setAddressResults] = useState([]);
  const [searchingAddress, setSearchingAddress] = useState(false);
  const [loadedKey, setLoadedKey] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const locationKey = serviceLocation ? `${serviceLocation.latitude},${serviceLocation.longitude}` : '';
  const queryKey = `${locationKey}|${service}`;
  const loadingWorkers = Boolean(serviceLocation) && loadedKey !== queryKey;

  const applyLocation = coords => {
    const next = {
      latitude: Number(coords.latitude),
      longitude: Number(coords.longitude),
      label: coords.label || 'Selected service location'
    };
    setServiceLocation(next);
    setError('');
    localStorage.setItem('anvaya_customer_location', JSON.stringify(next));
    setShowLocationPicker(false);
  };

  useEffect(() => {
    if (serviceLocation || !navigator.geolocation) return undefined;
    let alive = true;
    navigator.geolocation.getCurrentPosition(
      position => {
        if (!alive) return;
        applyLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, label: 'Current location' });
      },
      locationError => {
        if (!alive) return;
        setError(locationError.code === 1 ? 'Location permission was denied. Choose the service location manually.' : 'We could not detect your location. Choose the service location manually.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 120000 }
    );
    return () => { alive = false; };
  }, [serviceLocation]);

  useEffect(() => {
    if (!serviceLocation) return undefined;
    let cancelled = false;
    const params = new URLSearchParams({ latitude: String(serviceLocation.latitude), longitude: String(serviceLocation.longitude), radius: String(RADIUS_KM) });
    if (service !== 'All') params.set('skill', service.toLowerCase());
    apiRequest(`/api/workers/nearby?${params.toString()}`, { token: getStoredToken() })
      .then(data => {
        if (cancelled) return;
        setWorkers(Array.isArray(data?.workers) ? data.workers : []);
        setLoadedKey(queryKey);
      })
      .catch(requestError => {
        if (cancelled) return;
        setWorkers([]);
        setLoadedKey(queryKey);
        setError(requestError.message || 'Unable to find nearby workers.');
      });
    return () => { cancelled = true; };
  }, [serviceLocation, service, queryKey]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return workers.map(worker => {
      const coordinates = worker.location?.coordinates;
      const distance = Array.isArray(coordinates) && coordinates.length === 2 && serviceLocation
        ? distanceKm(serviceLocation.latitude, serviceLocation.longitude, Number(coordinates[1]), Number(coordinates[0]))
        : null;
      const skills = Array.isArray(worker.skills) ? worker.skills.map(skill => String(skill).toLowerCase()) : [];
      const displayedSkill = service !== 'All' && skills.includes(service.toLowerCase()) ? service.toLowerCase() : skills[0];
      return { ...worker, distance, displayedSkill };
    }).filter(worker => {
      const skills = Array.isArray(worker.skills) ? worker.skills.map(skill => String(skill).toLowerCase()) : [];
      const serviceMatches = service === 'All' || skills.includes(service.toLowerCase());
      const searchMatches = !q || String(worker.name || '').toLowerCase().includes(q) || skills.some(skill => skill.includes(q));
      return serviceMatches && searchMatches;
    }).sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
  }, [workers, search, service, serviceLocation]);

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

  const useCurrentLocation = () => {
    if (!navigator.geolocation) { setError('Location is not supported by this browser.'); return; }
    navigator.geolocation.getCurrentPosition(
      position => applyLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, label: 'Current location' }),
      locationError => setError(locationError.code === 1 ? 'Location permission was denied.' : 'Could not get your current location.'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 120000 }
    );
  };

  const chooseWorker = worker => {
    setSelected(worker);
    setAnalysis(null);
    setError('');
    const saved = readSaved('anvaya_service_request');
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
    if (!serviceLocation) { setError('Please select the place where the work will happen.'); return; }
    try {
      setSubmitting(true); setError('');
      const data = await apiRequest('/api/bookings', { method: 'POST', token: getStoredToken(), body: { problemDescription: note.trim(), serviceTag: analysis?.service || selected.displayedSkill || selected.skills?.[0] || 'general service', location: { type: 'Point', coordinates: [serviceLocation.longitude, serviceLocation.latitude] }, workerId: selected._id } });
      if (!data?.booking?._id) throw new Error('Booking was not created.');
      localStorage.removeItem('anvaya_service_request');
      onSelectWorker?.(selected, data.booking._id);
    } catch (requestError) { setError(requestError.message || 'Unable to send booking request.'); }
    finally { setSubmitting(false); }
  };

  return <main className="min-h-screen bg-[#FFF8F3] text-slate-800">
    <header className="border-b border-amber-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4"><div className="flex items-center gap-4"><img src="/anvaya-logo.png" alt="Anvaya" className="h-12"/><div className="border-l border-slate-200 pl-4"><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Customer</p><p className="text-sm font-semibold">Find & hire a trusted worker</p></div></div><button type="button" onClick={onBack} className="rounded-xl border border-amber-200 bg-white px-4 py-2 font-semibold">← Back</button></div></header>
    <section className="bg-[#FFF1E6]"><div className="mx-auto max-w-7xl px-5 py-9"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Smart service request</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">Trusted workers near you</h1><p className="mt-2 max-w-3xl text-slate-600">Find active, verified workers within {RADIUS_KM} km of the place where the work needs to happen.</p></div><button type="button" onClick={() => setShowLocationPicker(true)} className="min-w-[260px] rounded-2xl bg-white px-5 py-4 text-left shadow-sm ring-1 ring-amber-200"><span className="block text-xs font-bold uppercase tracking-wider text-amber-700">Service location</span><span className="mt-1 block font-bold text-slate-900">📍 {serviceLocation?.label || 'Choose a location'}</span><span className="mt-1 block text-xs text-slate-500">Change location →</span></button></div><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search electrician, plumber, carpenter..." className="mt-6 w-full max-w-2xl rounded-2xl border border-amber-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-amber-100"/></div></section>

    <section className="mx-auto max-w-7xl px-5 py-7">{note.trim() && <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-sm text-emerald-900"><p className="font-bold">✓ Your request is saved</p><p className="mt-1">The worker will receive this exact note:</p><p className="mt-3 rounded-xl bg-white px-4 py-3 font-medium leading-6 text-slate-700">“{note}”</p>{service !== 'All' && <p className="mt-3 font-semibold">Matched service: {title(service)}</p>}</div>}{error && <div className="mb-5 rounded-xl bg-red-50 p-4 font-medium text-red-700">{error}</div>}<div className="flex gap-3 overflow-x-auto pb-2">{SERVICES.map(item => <button key={item} type="button" onClick={() => setService(item)} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold ${service === item ? 'bg-amber-600 text-white' : 'border border-amber-100 bg-white'}`}>{item}</button>)}</div></section>

    <section className="mx-auto max-w-7xl px-5 pb-12"><div className="mb-5 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-bold">Available nearby workers</h2><p className="mt-1 text-sm text-slate-500">Only active, verified and available professionals are shown.</p></div>{serviceLocation && !loadingWorkers && <span className="text-sm font-bold text-emerald-700">{filtered.length} found</span>}</div>{!serviceLocation ? <div className="rounded-2xl bg-white p-10 text-center"><p className="font-bold">Choose a service location</p><p className="mt-2 text-sm text-slate-500">Use your current location or search for the place where the worker should go.</p><button type="button" onClick={() => setShowLocationPicker(true)} className="mt-4 rounded-xl bg-amber-600 px-5 py-3 font-bold text-white">Choose location</button></div> : loadingWorkers ? <div className="rounded-2xl bg-white p-10 text-center text-slate-500">Finding verified workers near {serviceLocation.label}…</div> : filtered.length === 0 ? <div className="rounded-2xl bg-white p-10 text-center text-slate-500">No matching verified workers are available within {RADIUS_KM} km of this location.</div> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map(worker => <article key={worker._id} className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm"><div className="flex justify-between"><span className="text-3xl">{ICONS[worker.displayedSkill] || '👷'}</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">● Available</span></div><h3 className="mt-5 text-xl font-bold">{worker.name}</h3><p className="font-semibold text-amber-700">{title(worker.displayedSkill)}</p><p className="mt-3 text-sm">⭐ {Number(worker.rating?.average || 0).toFixed(1)} · {worker.rating?.count || 0} reviews</p><p className="mt-2 text-sm font-semibold text-slate-600">📍 {worker.distance == null ? 'Distance unavailable' : `${worker.distance.toFixed(1)} km away`}</p><button type="button" onClick={() => chooseWorker(worker)} className="mt-5 w-full rounded-xl bg-amber-600 px-4 py-3 font-bold text-white">Hire this worker →</button></article>)}</div>}</section>

    {showLocationPicker && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"><div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Service location</p><h2 className="mt-1 text-2xl font-bold">Where should the worker go?</h2><p className="mt-2 text-sm leading-6 text-slate-500">Your home, your parents’ home, a relative’s house, or any other service address.</p></div><button type="button" onClick={() => setShowLocationPicker(false)} className="rounded-lg px-3 py-2 text-xl text-slate-500">✕</button></div><button type="button" onClick={useCurrentLocation} className="mt-6 flex w-full items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-left"><span><b className="block text-emerald-800">📍 Use my current location</b><span className="text-sm text-emerald-700">Use this when you are at the service address.</span></span><span className="font-bold text-emerald-700">Use →</span></button><div className="my-5 flex items-center gap-3"><div className="h-px flex-1 bg-slate-200"/><span className="text-xs font-bold text-slate-400">OR SEARCH ANOTHER PLACE</span><div className="h-px flex-1 bg-slate-200"/></div><div className="flex gap-2"><input value={addressQuery} onChange={event => setAddressQuery(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') void searchAddress(); }} placeholder="Example: Gwalior, MP or parents’ home" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-amber-400"/><button type="button" onClick={() => void searchAddress()} disabled={searchingAddress} className="rounded-xl bg-slate-900 px-5 py-3.5 font-bold text-white disabled:opacity-50">{searchingAddress ? 'Searching…' : 'Search'}</button></div>{addressResults.length > 0 && <div className="mt-4 space-y-2">{addressResults.map(result => <button type="button" key={`${result.place_id}-${result.lat}`} onClick={() => applyLocation({ latitude: result.lat, longitude: result.lon, label: result.display_name })} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left text-sm hover:border-amber-300 hover:bg-amber-50">📍 {result.display_name}</button>)}</div>}<p className="mt-5 text-xs leading-5 text-slate-400">The selected place is used for nearby-worker matching and saved as the booking service location.</p></div></div>}

    {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"><div className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Request to {selected.name}</p><h2 className="mt-1 text-2xl font-bold">What should the worker do?</h2></div><button type="button" onClick={() => setSelected(null)}>✕</button></div><textarea value={note} onChange={event => { setNote(event.target.value); setError(''); }} rows="6" maxLength={2000} placeholder="Describe the symptom, location inside the property, urgency and exact work you expect." className="mt-5 w-full resize-none rounded-2xl border border-slate-200 p-4 outline-none focus:border-amber-400"/><div className="mt-2 flex justify-between text-xs text-slate-400"><span>Service location: {serviceLocation?.label || 'Not selected'}</span><span>{note.length}/2000</span></div><button type="button" onClick={() => void analyze()} disabled={!note.trim()} className="mt-4 rounded-xl border border-amber-200 px-4 py-3 font-bold text-amber-700 disabled:opacity-50">Understand my request</button>{analysis && <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm"><b>Suggested service:</b> {title(analysis.service || analysis.serviceTag)}{analysis.urgency ? ` · ${title(analysis.urgency)} urgency` : ''}{analysis.suggestedPrice ? <> · <b>Suggested range:</b> ₹{analysis.suggestedPrice.min}–₹{analysis.suggestedPrice.max}</> : null}</div>}<div className="mt-6 grid grid-cols-2 gap-3"><button type="button" onClick={() => setSelected(null)} className="rounded-xl border border-slate-200 px-4 py-3 font-bold">Cancel</button><button type="button" disabled={submitting} onClick={() => void submit()} className="rounded-xl bg-amber-600 px-4 py-3 font-bold text-white disabled:opacity-50">{submitting ? 'Sending...' : 'Send Request →'}</button></div><p className="mt-4 text-center text-xs text-slate-400">The worker must accept or reject your request. Price is not final until the worker sends a quote and you accept it.</p></div></div>}
  </main>;
}

export default CustomerBooking;
