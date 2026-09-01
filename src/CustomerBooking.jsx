import { useEffect, useMemo, useState } from 'react';
import { apiRequest, getStoredToken } from './api/client';

const services = ['All', 'Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mason'];
const icons = { electrician: '⚡', plumber: '🔧', carpenter: '🪚', painter: '🎨', mason: '🧱' };
const title = v => v ? String(v).replace(/\b\w/g, c => c.toUpperCase()) : 'Professional Worker';

function CustomerBooking({ onBack, onSelectWorker }) {
  const [workers, setWorkers] = useState([]); const [search, setSearch] = useState(''); const [service, setService] = useState('All'); const [selected, setSelected] = useState(null); const [note, setNote] = useState(''); const [analysis, setAnalysis] = useState(null); const [loading, setLoading] = useState(true); const [submitting, setSubmitting] = useState(false); const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    try {
      const saved = JSON.parse(localStorage.getItem('anvaya_service_request') || 'null');
      if (alive && typeof saved?.problem === 'string') setNote(saved.problem);
    } catch {
      if (alive) setNote('');
    }
    apiRequest('/api/workers?isAvailable=true', { token: getStoredToken() }).then(data => alive && setWorkers(Array.isArray(data?.workers) ? data.workers : [])).catch(e => alive && setError(e.message || 'Unable to load workers.')).finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  const filtered = useMemo(() => workers.filter(w => { const skills = Array.isArray(w.skills) ? w.skills : []; const q = search.trim().toLowerCase(); return (service === 'All' || skills.some(s => String(s).toLowerCase() === service.toLowerCase())) && (!q || String(w.name || '').toLowerCase().includes(q) || skills.some(s => String(s).toLowerCase().includes(q))); }), [workers, search, service]);

  const choose = worker => {
    setSelected(worker); setAnalysis(null); setError('');
    try {
      const saved = JSON.parse(localStorage.getItem('anvaya_service_request') || 'null');
      setNote(typeof saved?.problem === 'string' ? saved.problem : note);
    } catch { /* keep current requirement */ }
  };

  const analyze = async () => {
    if (!note.trim()) return;
    try { setError(''); const data = await apiRequest('/api/services/analyze', { method: 'POST', token: getStoredToken(), body: { text: note.trim() } }); setAnalysis(data); }
    catch (e) { setError(e.message || 'Could not understand the request.'); }
  };

  const submit = async () => {
    if (!selected || note.trim().length < 10) { setError('Please describe exactly what you need (at least 10 characters).'); return; }
    try {
      setSubmitting(true); setError('');
      const coords = Array.isArray(selected.location?.coordinates) && selected.location.coordinates.length === 2 ? selected.location.coordinates : [0, 0];
      const data = await apiRequest('/api/bookings', { method: 'POST', token: getStoredToken(), body: { problemDescription: note.trim(), serviceTag: analysis?.service || selected.skills?.[0] || 'general service', location: { type: 'Point', coordinates: coords }, workerId: selected._id } });
      if (!data?.booking?._id) throw new Error('Booking was not created.');
      localStorage.removeItem('anvaya_service_request');
      onSelectWorker?.(selected, data.booking._id);
    } catch (e) { setError(e.message || 'Unable to send booking request.'); } finally { setSubmitting(false); }
  };

  return <main className="min-h-screen bg-[#FFF8F3] text-slate-800">
    <header className="border-b border-amber-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><div className="flex items-center gap-4"><img src="/anvaya-logo.png" alt="Anvaya" className="h-12"/><div className="border-l border-slate-200 pl-4"><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Customer</p><p className="text-sm font-semibold">Find & hire a trusted worker</p></div></div><button onClick={onBack} className="rounded-xl border border-amber-200 bg-white px-4 py-2 font-semibold">← Back</button></div></header>
    <section className="bg-[#FFF1E6]"><div className="mx-auto max-w-7xl px-5 py-10"><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Smart service request</p><h1 className="mt-2 text-3xl font-bold">Tell the worker exactly what you need</h1><p className="mt-2 max-w-2xl text-slate-600">Choose a verified worker, send the exact problem, and let the worker review it before accepting and proposing a price.</p><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search electrician, plumber, carpenter..." className="mt-6 w-full max-w-2xl rounded-2xl border border-amber-100 bg-white px-5 py-4 outline-none"/></div></section>
    <section className="mx-auto max-w-7xl px-5 py-7">
      {note.trim() && <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-sm text-emerald-900"><p className="font-bold">✓ Your request is saved</p><p className="mt-1 leading-6">The worker will receive this exact note when you hire them:</p><p className="mt-3 rounded-xl bg-white px-4 py-3 font-medium leading-6 text-slate-700">“{note}”</p></div>}
      <div className="flex gap-3 overflow-x-auto pb-2">{services.map(s => <button key={s} onClick={() => setService(s)} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold ${service === s ? 'bg-amber-600 text-white' : 'border border-amber-100 bg-white'}`}>{s}</button>)}</div>
    </section>
    {error && <div className="mx-auto max-w-7xl px-5"><div className="rounded-xl bg-red-50 p-4 text-red-700">{error}</div></div>}
    <section className="mx-auto max-w-7xl px-5 pb-12"><h2 className="mb-5 text-2xl font-bold">Available workers</h2>{loading ? <p>Loading workers...</p> : filtered.length === 0 ? <p className="rounded-2xl bg-white p-10 text-center text-slate-500">No matching verified workers are available right now.</p> : <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map(w => <article key={w._id} className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm"><div className="flex justify-between"><span className="text-3xl">{icons[String(w.skills?.[0] || '').toLowerCase()] || '👷'}</span><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">● Available</span></div><h3 className="mt-5 text-xl font-bold">{w.name}</h3><p className="font-semibold text-amber-700">{title(w.skills?.[0])}</p><p className="mt-3 text-sm">⭐ {Number(w.rating?.average || 0).toFixed(1)} · {w.rating?.count || 0} reviews</p><p className="mt-2 text-sm text-slate-500">📍 {w.location?.coordinates ? `${w.location.coordinates[1]}, ${w.location.coordinates[0]}` : 'Location unavailable'}</p><button onClick={() => choose(w)} className="mt-5 w-full rounded-xl bg-amber-600 px-4 py-3 font-bold text-white">Hire this worker →</button></article>)}</div>}</section>
    {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-5"><div className="w-full max-w-xl rounded-3xl bg-white p-7 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Request to {selected.name}</p><h2 className="mt-1 text-2xl font-bold">What should the worker do?</h2></div><button onClick={() => setSelected(null)}>✕</button></div><textarea value={note} onChange={e => { setNote(e.target.value); setError(''); }} rows="6" maxLength={2000} placeholder="Describe the symptom, location, urgency and exact work you expect." className="mt-5 w-full resize-none rounded-2xl border border-slate-200 p-4 outline-none focus:border-amber-400"/><div className="mt-2 flex justify-between text-xs text-slate-400"><span>Be specific so the worker can quote fairly.</span><span>{note.length}/2000</span></div><button onClick={() => void analyze()} disabled={!note.trim()} className="mt-4 rounded-xl border border-amber-200 px-4 py-3 font-bold text-amber-700 disabled:opacity-50">Understand my request</button>{analysis && <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm"><b>Suggested service:</b> {title(analysis.service)} · <b>Suggested range:</b> ₹{analysis.suggestedPrice?.min}–₹{analysis.suggestedPrice?.max}{analysis.confidence ? ` · ${Math.round(analysis.confidence * 100)}% confidence` : ''}</div>}<div className="mt-6 grid grid-cols-2 gap-3"><button onClick={() => setSelected(null)} className="rounded-xl border border-slate-200 px-4 py-3 font-bold">Cancel</button><button disabled={submitting} onClick={() => void submit()} className="rounded-xl bg-amber-600 px-4 py-3 font-bold text-white disabled:opacity-50">{submitting ? 'Sending...' : 'Send Request →'}</button></div><p className="mt-4 text-center text-xs text-slate-400">The worker must accept or reject your request. The price is not finalized until the worker sends a quote and you accept it.</p></div></div>}
  </main>;
}
export default CustomerBooking;