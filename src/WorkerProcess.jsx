import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiRequest, getStoredToken } from './api/client';

const steps = ['requested', 'accepted', 'quote-pending', 'in-progress', 'completion-pending', 'completed'];
const labels = { requested: 'Request Sent', 'quote-pending': 'Price Proposed', accepted: 'Accepted', 'in-progress': 'Work Started', 'completion-pending': 'Verify Work', completed: 'Completed', disputed: 'Disputed', expired: 'Timed Out' };

function WorkerProcess({ worker, bookingId, onBack, onProceedToPayment, onComplaint, onRetryWorker }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [now, setNow] = useState(0);

  const load = useCallback(async () => {
    try {
      const data = await apiRequest('/api/bookings/my', { token: getStoredToken() });
      const b = (data.bookings || []).find(x => x._id === bookingId);
      if (!b) throw new Error('Booking not found');
      setBooking(b);
      setError('');
    } catch (e) { setError(e.message || 'Unable to load booking.'); }
    finally { setLoading(false); }
  }, [bookingId]);

  useEffect(() => {
    const first = window.setTimeout(() => void load(), 0);
    const timer = window.setInterval(() => void load(), 4000);
    return () => { window.clearTimeout(first); window.clearInterval(timer); };
  }, [load]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remainingMs = useMemo(() => {
    if (!booking?.responseDeadlineAt || booking.status !== 'requested') return 0;
    return Math.max(0, new Date(booking.responseDeadlineAt).getTime() - now);
  }, [booking, now]);

  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = String(remainingSeconds % 60).padStart(2, '0');
  const isExpired = booking?.status === 'expired' || (booking?.status === 'requested' && remainingMs === 0);

  const quoteAction = async action => {
    try { setBusy(true); const data = await apiRequest(`/api/quotes/${bookingId}/${action}`, { method: 'PATCH', token: getStoredToken(), body: action === 'reject' ? { reason: 'Customer rejected the proposed price' } : undefined }); setBooking(data.booking); }
    catch (e) { setError(e.message || 'Unable to process quote.'); }
    finally { setBusy(false); }
  };

  const completion = async action => {
    try { setBusy(true); const data = await apiRequest(`/api/bookings/${bookingId}/${action}`, { method: 'PATCH', token: getStoredToken() }); setBooking(data.booking); }
    catch (e) { setError(e.message || 'Unable to update completion.'); }
    finally { setBusy(false); }
  };

  const index = steps.indexOf(booking?.status);

  return <main className="min-h-screen bg-[#FFF8F3] text-slate-800"><header className="border-b border-amber-100 bg-white"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><div className="flex items-center gap-4"><img src="/anvaya-logo.png" alt="Anvaya" className="h-12"/><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Your booking</p><p className="font-semibold">Track the job safely</p></div></div><button onClick={onBack} className="rounded-xl border border-amber-200 bg-white px-4 py-2">← Back</button></div></header><section className="mx-auto max-w-5xl px-5 py-8"><div className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-xl"><div className="bg-[#FFF1E6] p-7"><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Selected worker</p><h1 className="mt-1 text-3xl font-bold">{worker?.name || 'Worker'}</h1><p className="font-semibold text-amber-700">{worker?.skills?.[0] || 'Professional service'}</p></div><div className="p-7">{loading ? <p>Loading booking...</p> : error ? <div className="rounded-xl bg-red-50 p-4 text-red-700">{error}</div> : <><div className="grid gap-3 sm:grid-cols-6">{steps.map((s, i) => <div key={s} className={`rounded-xl border p-3 ${i <= index ? 'border-amber-300 bg-amber-50' : 'border-slate-100 bg-slate-50'}`}><div className="font-bold">{i <= index ? '✓' : i + 1}</div><p className="mt-2 text-xs font-bold">{labels[s]}</p></div>)}</div><div className="mt-7 rounded-2xl border border-amber-100 bg-[#FFF8F3] p-5"><p className="text-xs font-bold uppercase text-slate-400">Your request</p><p className="mt-2 whitespace-pre-wrap leading-6">{booking?.problemDescription}</p></div>

{booking?.status === 'requested' && !isExpired && <div className="mt-6 rounded-3xl border-2 border-amber-200 bg-amber-50 p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><b className="text-lg">⏱ Waiting for {worker?.name || 'the worker'}</b><p className="mt-1 text-sm text-slate-600">You won't be kept waiting indefinitely. If they don't respond, you can quickly choose another available worker.</p></div><div className="rounded-2xl bg-white px-5 py-3 text-center shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Response window</p><p className="text-2xl font-bold tabular-nums text-amber-700">{minutes}:{seconds}</p></div></div></div>}
{isExpired && <div className="mt-6 rounded-3xl border-2 border-orange-200 bg-orange-50 p-6"><p className="text-xs font-bold uppercase tracking-widest text-orange-700">Worker did not respond</p><h2 className="mt-1 text-2xl font-bold text-slate-900">Don't wait — choose another worker</h2><p className="mt-2 leading-6 text-slate-600">{worker?.name || 'The selected worker'} did not respond within the response window. Your request has not been charged, and the worker is no longer holding your booking.</p><button onClick={onRetryWorker} className="mt-5 w-full rounded-xl bg-amber-600 px-5 py-3 font-bold text-white shadow-sm hover:bg-amber-700">← Find another available worker</button></div>}
{booking?.status === 'quote-pending' && <div className="mt-6 rounded-2xl border-2 border-amber-200 bg-amber-50 p-6"><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Worker proposal</p><h2 className="mt-1 text-3xl font-bold">₹{booking.quote?.amount}</h2>{booking.quote?.note && <p className="mt-2">{booking.quote.note}</p>}<p className="mt-4 text-sm text-slate-600">Review the price and included work before accepting.</p><div className="mt-5 grid grid-cols-2 gap-3"><button disabled={busy} onClick={() => void quoteAction('reject')} className="rounded-xl border border-red-200 bg-white px-4 py-3 font-bold text-red-600">Reject Price</button><button disabled={busy} onClick={() => void quoteAction('accept')} className="rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white">Accept ₹{booking.quote?.amount}</button></div></div>}
{booking?.status === 'accepted' && booking.quote?.amount && <div className="mt-6 rounded-2xl bg-emerald-50 p-5"><b>Price accepted: ₹{booking.quote.amount}</b><p className="mt-1 text-sm">The worker can now start the work.</p></div>}
{booking?.status === 'in-progress' && <div className="mt-6 rounded-2xl bg-blue-50 p-5"><b>Work is in progress</b><p className="mt-1 text-sm">Inspect the actual work when the worker requests completion.</p></div>}
{booking?.status === 'completion-pending' && <div className="mt-6 rounded-3xl border-2 border-purple-200 bg-purple-50 p-6"><h2 className="text-xl font-bold text-purple-900">🛡️ Customer satisfaction check</h2><p className="mt-2 text-sm leading-6 text-purple-800">Do not confirm just because the worker says it is done. Inspect and test the work first.</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><button disabled={busy} onClick={() => void completion('dispute-completion')} className="rounded-xl border border-red-200 bg-white px-4 py-3 font-bold text-red-600">Report Problem</button><button disabled={busy} onClick={() => void completion('confirm-completion')} className="rounded-xl bg-emerald-600 px-4 py-3 font-bold text-white">✓ Work Satisfactory</button></div><button onClick={onComplaint} className="mt-3 w-full rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600">Submit a formal complaint</button><p className="mt-3 text-center text-xs text-purple-700">Payment stays locked until you confirm.</p></div>}
{booking?.status === 'disputed' && <div className="mt-6 rounded-2xl bg-red-50 p-5 text-red-700"><b>Payment locked</b><p className="text-sm">You reported a problem. Submit a formal complaint if the issue needs review.</p><button onClick={onComplaint} className="mt-3 rounded-xl bg-red-600 px-4 py-2 font-bold text-white">Open Complaint</button></div>}
{booking?.status === 'completed' && <div className="mt-6 rounded-2xl bg-emerald-50 p-5"><b>✓ Work confirmed</b><p className="mt-1 text-sm">You confirmed the service is satisfactory.</p><button onClick={onProceedToPayment} className="mt-4 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white">Proceed to Payment →</button></div>}
<div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">Booking ID: {bookingId}</div></>}</div></div></section></main>;
}

export default WorkerProcess;
