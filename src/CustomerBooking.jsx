import { useEffect, useMemo, useState } from 'react';
import { apiRequest, getStoredToken } from './api/client';

const SERVICES = ['All', 'Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mason'];
const ICONS = { electrician: '⚡', plumber: '🔧', carpenter: '🪚', painter: '🎨', mason: '🧱' };
const RADIUS_KM = 15;
const title = value => value ? String(value).replace(/\b\w/g, c => c.toUpperCase()) : 'Professional Worker';
const readSaved = key => { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; } };
const distanceKm = (lat1, lon1, lat2, lon2) => {
  const rad = v => v * Math.PI / 180;
  const dLat = rad(lat2 - lat1), dLon = rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};
const normalizePlaceQuery = value => value.trim().replace(/\s+/g, ' ')
  .replace(/cann?aught\s+place/gi, 'Connaught Place')
  .replace(/connaught\s+plce/gi, 'Connaught Place')
  .replace(/\bcp\s+(?:new\s+)?delhi\b/gi, 'Connaught Place, New Delhi')
  .replace(/\bnew\s+delhi\b/gi, 'New Delhi');
const detectService = text => {
  const value = String(text || '').toLowerCase();
  const map = {
    electrician: ['switch', 'wire', 'wiring', 'electric', 'electricity', 'fan', 'light', 'socket', 'voltage', 'spark', 'fridge', 'refrigerator'],
    plumber: ['tap', 'pipe', 'water', 'leak', 'faucet', 'drain', 'toilet', 'plumbing'],
    carpenter: ['door', 'furniture', 'wood', 'table', 'chair', 'cabinet'],
    painter: ['paint', 'painting', 'colour', 'color', 'whitewash'],
    mason: ['brick', 'cement', 'concrete', 'masonry', 'construction']
  };
  return Object.entries(map).find(([, words]) => words.some(word => value.includes(word)))?.[0] || null;
};

function CustomerBooking({ onBack, onSelectWorker }) {
  const savedRequest = readSaved('anvaya_service_request');
  const savedLocation = readSaved('anvaya_customer_location');
  const initialService = detectService(savedRequest?.problem);
  const initialLocation = Number.isFinite(Number(savedLocation?.latitude)) && Number.isFinite(Number(savedLocation?.longitude))
    ? { latitude: Number(savedLocation.latitude), longitude: Number(savedLocation.longitude), label: savedLocation.label || 'Saved service location', precision: savedLocation.precision || 'exact' } : null;

  const [service, setService] = useState(initialService ? title(initialService) : 'All');
  const [search, setSearch] = useState('');
  const [note, setNote] = useState(typeof savedRequest?.problem === 'string' ? savedRequest.problem : '');
  const [serviceLocation, setServiceLocation] = useState(initialLocation);
  const [workers, setWorkers] = useState([]);
  const [workersLoading, setWorkersLoading] = useState(false);
  const [locationPickerOpen, setLocationPickerOpen] = useState(false);
  const [addressQuery, setAddressQuery] = useState('');
  const [addressResults, setAddressResults] = useState([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [locationRequestPending, setLocationRequestPending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!serviceLocation) return undefined;
    let cancelled = false;
    setWorkersLoading(true);
    const params = new URLSearchParams({ latitude: String(serviceLocation.latitude), longitude: String(serviceLocation.longitude), radius: String(RADIUS_KM) });
    if (service !== 'All') params.set('skill', service.toLowerCase());
    apiRequest(`/api/workers/nearby?${params}`, { token: getStoredToken() })
      .then(data => { if (!cancelled) setWorkers(Array.isArray(data?.workers) ? data.workers : []); })
      .catch(err => { if (!cancelled) { setWorkers([]); setError(err.message || 'Unable to find nearby workers.'); } })
      .finally(() => { if (!cancelled) setWorkersLoading(false); });
    return () => { cancelled = true; };
  }, [serviceLocation, service]);

  const requestCurrentLocation = () => {
    if (!navigator.geolocation) { setError('Location is not supported by this browser. Search the service address instead.'); return; }
    setLocationRequestPending(true); setError('');
    navigator.geolocation.getCurrentPosition(position => {
      const next = { latitude: position.coords.latitude, longitude: position.coords.longitude, label: 'Current location', precision: 'exact' };
      setServiceLocation(next); setLocationRequestPending(false); setLocationPickerOpen(false);
      localStorage.setItem('anvaya_customer_location', JSON.stringify(next));
    }, err => {
      setLocationRequestPending(false);
      setError(err.code === 1 ? 'Location permission was denied. Search the service address instead.' : 'Could not get your current location.');
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 120000 });
  };

  const searchAddress = async () => {
    const raw = addressQuery.trim();
    if (raw.length < 3) { setError('Enter a town, landmark, PIN code, or full address.'); return; }
    const query = normalizePlaceQuery(raw);
    setAddressLoading(true); setAddressResults([]); setError('');
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=5&countrycodes=in&accept-language=en&q=${encodeURIComponent(`${query}, India`)}`;
      const response = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Location search failed. Please try again.');
      const results = await response.json();
      setAddressResults(Array.isArray(results) ? results : []);
      if (!results.length) setError(`No place found for “${raw}”. Try the area, city, PIN code, or full address.`);
    } catch (err) { setError(err.message || 'Location search failed.'); }
    finally { setAddressLoading(false); }
  };

  const selectLocationResult = result => {
    const latitude = Number(result.lat), longitude = Number(result.lon);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) { setError('That location result is invalid.'); return; }
    const broad = ['city', 'town', 'village', 'administrative', 'state', 'municipality'].includes(String(result.type || '').toLowerCase());
    const next = { latitude, longitude, label: result.display_name, precision: broad ? 'area' : 'exact' };
    setServiceLocation(next); setLocationPickerOpen(false); setAddressResults([]); setAddressQuery(''); setError('');
    localStorage.setItem('anvaya_customer_location', JSON.stringify(next));
  };

  const workerCards = useMemo(() => {
    const q = search.trim().toLowerCase();
    return workers.map(worker => {
      const coords = worker.location?.coordinates;
      const skills = Array.isArray(worker.skills) ? worker.skills.map(s => String(s).toLowerCase()) : [];
      const distance = Array.isArray(coords) && coords.length === 2 && serviceLocation ? distanceKm(serviceLocation.latitude, serviceLocation.longitude, Number(coords[1]), Number(coords[0])) : null;
      const displayedSkill = service !== 'All' && skills.includes(service.toLowerCase()) ? service.toLowerCase() : skills[0];
      return { ...worker, distance, displayedSkill };
    }).filter(worker => {
      const skills = Array.isArray(worker.skills) ? worker.skills.map(s => String(s).toLowerCase()) : [];
      return (service === 'All' || skills.includes(service.toLowerCase())) && (!q || String(worker.name || '').toLowerCase().includes(q) || skills.some(s => s.includes(q)));
    }).sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
  }, [workers, search, service, serviceLocation]);

  const analyze = async () => {
    if (!note.trim()) return;
    try {
      setError('');
      const data = await apiRequest('/api/services/analyze', { method: 'POST', token: getStoredToken(), body: { text: note.trim() } });
      setAnalysis(data);
      const detected = data?.service || data?.serviceTag;
      if (detected && SERVICES.some(item => item.toLowerCase() === String(detected).toLowerCase())) setService(title(detected));
    } catch (err) { setError(err.message || 'Could not understand the request.'); }
  };

  const submit = async () => {
    if (!selectedWorker) return;
    if (note.trim().length < 10) { setError('Please describe the problem in at least 10 characters.'); return; }
    if (!serviceLocation) { setError('Choose the service location first.'); return; }
    try {
      setBookingLoading(true); setError('');
      const data = await apiRequest('/api/bookings', { method: 'POST', token: getStoredToken(), body: {
        problemDescription: note.trim(), serviceTag: analysis?.service || analysis?.serviceTag || selectedWorker.displayedSkill,
        location: { type: 'Point', coordinates: [serviceLocation.longitude, serviceLocation.latitude] }, workerId: selectedWorker._id
      } });
      if (!data?.booking?._id) throw new Error('Booking was not created.');
      localStorage.removeItem('anvaya_service_request');
      onSelectWorker?.(selectedWorker, data.booking._id);
    } catch (err) { setError(err.message || 'Unable to send booking request.'); }
    finally { setBookingLoading(false); }
  };

  const precisionMessage = serviceLocation?.precision === 'area' ? 'Area selected — distance is approximate. Use the full address or GPS for doorstep accuracy.' : 'Distances are measured from this selected service location.';

  return <main className="min-h-screen bg-[#FFF8F3] text-slate-800">
    <header className="border-b border-amber-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4"><div className="flex items-center gap-4"><img src="/anvaya-logo.png" alt="Anvaya" className="h-12"/><div className="border-l border-slate-200 pl-4"><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Customer</p><p className="text-sm font-semibold">Find & hire a trusted worker</p></div></div><button type="button" onClick={onBack} className="rounded-xl border border-amber-200 bg-white px-4 py-2 font-semibold">← Back</button></div></header>
    <section className="bg-[#FFF1E6]"><div className="mx-auto max-w-7xl px-5 py-9"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Smart service request</p><h1 className="mt-2 text-3xl font-bold sm:text-4xl">Find a trusted worker near the job</h1><p className="mt-2 max-w-3xl text-slate-600">Choose where the work needs to happen. We then show verified workers within {RADIUS_KM} km.</p></div><button type="button" onClick={() => setLocationPickerOpen(true)} className="min-w-[270px] rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-amber-200"><span className="block text-xs font-bold uppercase tracking-wider text-amber-700">Where is the work?</span><span className="mt-1 block font-bold text-slate-900">📍 {serviceLocation?.label || 'Choose a service location'}</span><span className="mt-2 block text-sm font-semibold text-amber-700">Change location →</span></button></div><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by worker name or skill..." className="mt-6 w-full max-w-2xl rounded-2xl border border-amber-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-amber-100"/></div></section>

    <section className="mx-auto max-w-7xl px-5 py-7">{serviceLocation && <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Service location</p><p className="mt-1 font-bold text-slate-900">📍 {serviceLocation.label}</p><p className="mt-1 text-sm text-slate-500">{precisionMessage}</p></div><button type="button" onClick={() => setLocationPickerOpen(true)} className="rounded-xl border border-amber-200 px-4 py-2.5 text-sm font-bold text-amber-700">Change</button></div></div>}{error && <div className="mb-5 rounded-xl bg-red-50 p-4 font-medium text-red-700">{error}</div>}<div className="flex gap-3 overflow-x-auto pb-2">{SERVICES.map(item => <button key={item} type="button" onClick={() => setService(item)} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold ${service === item ? 'bg-amber-600 text-white' : 'border border-amber-100 bg-white'}`}>{item}</button>)}</div></section>

    <section className="mx-auto max-w-7xl px-5 pb-12"><div className="mb-5 flex items-end justify-between"><div><h2 className="text-2xl font-bold">Nearby workers</h2><p className="mt-1 text-sm text-slate-500">Verified, active and available professionals.</p></div>{serviceLocation && <span className="text-sm font-bold text-emerald-700">{workersLoading ? 'Finding…' : `${workerCards.length} found`}</span>}</div>{!serviceLocation ? <div className="rounded-2xl bg-white p-10 text-center"><p className="font-bold">Choose the service location</p><p className="mt-2 text-sm text-slate-500">Use your current location or search for the place where the worker should go.</p><button type="button" onClick={() => setLocationPickerOpen(true)} className="mt-4 rounded-xl bg-amber-600 px-5 py-3 font-bold text-white">Choose location</button></div> : workersLoading && workers.length === 0 ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map(i => <div key={i} className="h-72 animate-pulse rounded-3xl border border-amber-100 bg-white" />)}</div> : workerCards.length === 0 ? <div className="rounded-2xl bg-white p-10 text-center text-slate-500">No matching verified workers are available within {RADIUS_KM} km of this service location.</div> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{workerCards.map(worker => <article key={worker._id} className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"><div className="flex justify-between"><span className="text-3xl">{ICONS[worker.displayedSkill] || '👷'}</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">● Available</span></div><h3 className="mt-5 text-xl font-bold">{worker.name}</h3><p className="font-semibold text-amber-700">{title(worker.displayedSkill)}</p><p className="mt-3 text-sm">⭐ {Number(worker.rating?.average || 0).toFixed(1)} · {worker.rating?.count || 0} reviews</p><p className="mt-2 text-sm font-semibold text-slate-600">📍 {worker.distance == null ? 'Distance unavailable' : `${worker.distance.toFixed(1)} km from selected service location`}</p><button type="button" onClick={() => setSelectedWorker(worker)} className="mt-5 w-full rounded-xl bg-amber-600 px-4 py-3 font-bold text-white">Hire this worker →</button></article>)}</div>}</section>

    {locationPickerOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4" role="dialog" aria-modal="true"><div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Service location</p><h2 className="mt-1 text-2xl font-bold">Where should the worker go?</h2><p className="mt-2 text-sm leading-6 text-slate-500">Your home, parents’ home, a relative’s house, or any other service address.</p></div><button type="button" aria-label="Close" onClick={() => setLocationPickerOpen(false)} className="text-xl text-slate-500">✕</button></div><button type="button" onClick={requestCurrentLocation} disabled={locationRequestPending} className="mt-6 flex w-full items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-left disabled:opacity-60"><span><b className="block text-emerald-800">📍 Use my current location</b><span className="text-sm text-emerald-700">Use this when you are at the service address.</span></span><span className="font-bold text-emerald-700">{locationRequestPending ? 'Getting…' : 'Use →'}</span></button><div className="my-5 flex items-center gap-3"><div className="h-px flex-1 bg-slate-200"/><span className="text-xs font-bold text-slate-400">OR SEARCH A PLACE</span><div className="h-px flex-1 bg-slate-200"/></div><div className="flex gap-2"><input value={addressQuery} onChange={e => setAddressQuery(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') void searchAddress(); }} placeholder="Full address, town, landmark, PIN code..." aria-label="Search service location" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-amber-400"/><button type="button" onClick={() => void searchAddress()} disabled={addressLoading} className="rounded-xl bg-slate-900 px-5 py-3.5 font-bold text-white disabled:opacity-50">{addressLoading ? 'Searching…' : 'Search'}</button></div>{addressResults.length > 0 && <div className="mt-4 space-y-2"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Choose the correct result</p>{addressResults.map(result => { const broad = ['city', 'town', 'village', 'administrative', 'state', 'municipality'].includes(String(result.type || '').toLowerCase()); return <button type="button" key={`${result.place_id}-${result.lat}`} onClick={() => selectLocationResult(result)} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left text-sm hover:border-amber-300 hover:bg-amber-50">📍 {result.display_name}<span className="mt-1 block text-xs text-slate-500">{broad ? 'Area-level location · distance is approximate' : 'Address/landmark · better for doorstep distance'}</span></button>; })}</div>}<p className="mt-5 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">Tip: you can search your parents’ address even when you are somewhere else. The selected service location is used for worker distance and booking.</p></div></div>}

    {selectedWorker && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4" role="dialog" aria-modal="true"><div className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Request to {selectedWorker.name}</p><h2 className="mt-1 text-2xl font-bold">Confirm the work request</h2></div><button type="button" aria-label="Close" onClick={() => setSelectedWorker(null)}>✕</button></div><div className="mt-4 rounded-2xl bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Service location</p><p className="mt-1 font-semibold">📍 {serviceLocation?.label}</p><p className="mt-1 text-sm text-slate-500">{selectedWorker.distance == null ? 'Distance unavailable' : `${selectedWorker.distance.toFixed(1)} km from this location`}</p></div><textarea value={note} onChange={e => { setNote(e.target.value); setError(''); }} rows="6" maxLength={2000} placeholder="Describe the problem, where it is, urgency, and what you expect the worker to do." className="mt-4 w-full resize-none rounded-2xl border border-slate-200 p-4 outline-none focus:border-amber-400"/><div className="mt-2 flex justify-between text-xs text-slate-400"><span>{analysis ? `Service: ${title(analysis.service || analysis.serviceTag)}` : 'The worker will review this note.'}</span><span>{note.length}/2000</span></div><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => void analyze()} disabled={!note.trim()} className="rounded-xl border border-amber-200 px-4 py-3 font-bold text-amber-700 disabled:opacity-50">Understand request</button>{analysis?.urgency && <span className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">{title(analysis.urgency)} urgency</span>}</div><div className="mt-6 grid grid-cols-2 gap-3"><button type="button" onClick={() => setSelectedWorker(null)} className="rounded-xl border border-slate-200 px-4 py-3 font-bold">Cancel</button><button type="button" onClick={() => void submit()} disabled={bookingLoading} className="rounded-xl bg-amber-600 px-4 py-3 font-bold text-white disabled:opacity-50">{bookingLoading ? 'Sending...' : 'Send Request →'}</button></div><p className="mt-4 text-center text-xs text-slate-400">The worker must accept or reject the request. The price is agreed later through the quote process.</p></div></div>}
  </main>;
}

export default CustomerBooking;
