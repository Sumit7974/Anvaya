import { useEffect, useState } from 'react';
import { apiRequest, getStoredToken } from './api/client';

function CustomerPayment({ worker, bookingId, onNext, onBack }) {
  const [booking, setBooking] = useState(null); const [loading, setLoading] = useState(true); const [paying, setPaying] = useState(false); const [error, setError] = useState('');
  useEffect(()=>{apiRequest('/api/bookings/my',{token:getStoredToken()}).then(d=>{const b=(d.bookings||[]).find(x=>x._id===bookingId);if(!b)throw new Error('Booking not found');setBooking(b);}).catch(e=>setError(e.message||'Unable to load payment.')).finally(()=>setLoading(false));},[bookingId]);
  const pay = async () => {
    try {
      setPaying(true); setError('');
      const order = await apiRequest('/api/payments/order',{method:'POST',token:getStoredToken(),body:{bookingId}});
      if (!window.Razorpay) throw new Error('Razorpay checkout is not loaded. Refresh and try again.');
      const rzp = new window.Razorpay({ key: order.keyId, amount: order.amount, currency: order.currency, name: 'Anvaya', description: 'Verified service payment', order_id: order.orderId, handler: async response => {
        try { await apiRequest('/api/payments/verify',{method:'POST',token:getStoredToken(),body:{bookingId,razorpay_order_id:response.razorpay_order_id,razorpay_payment_id:response.razorpay_payment_id,razorpay_signature:response.razorpay_signature}}); onNext(); }
        catch(e){setError(e.message||'Payment verification failed.');setPaying(false);}
      }, modal:{ondismiss:()=>setPaying(false)}});
      rzp.open();
    } catch(e){setError(e.message||'Unable to start payment.');setPaying(false);}
  };
  return <main className="min-h-screen bg-[#FFF8F3] px-5 py-8 text-slate-800"><button onClick={onBack} className="fixed right-5 top-5 rounded-xl border border-amber-200 bg-white px-4 py-2 shadow">← Back</button><div className="mx-auto max-w-2xl pt-10"><div className="text-center"><img src="/anvaya-logo.png" alt="Anvaya" className="mx-auto h-16"/><p className="mt-5 text-xs font-bold uppercase tracking-widest text-amber-700">Secure payment</p><h1 className="mt-2 text-4xl font-bold">Pay only after satisfaction</h1><p className="mt-3 text-slate-500">Your worker's accepted quote is the amount charged. No surprise amount is entered on this screen.</p></div>{loading?<p className="mt-10 text-center">Loading...</p>:error?<div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-700">{error}</div>:<div className="mt-8 rounded-3xl border border-amber-100 bg-white p-7 shadow-xl"><div className="rounded-2xl bg-[#FFF1E6] p-5"><p className="text-xs font-bold uppercase text-amber-700">Booking</p><h2 className="mt-1 text-xl font-bold">{worker?.name||booking?.worker?.name||'Verified Worker'}</h2><p className="mt-2 text-sm text-slate-600">{booking?.problemDescription}</p></div><div className="mt-6 flex items-end justify-between border-b border-slate-100 pb-5"><span className="font-semibold text-slate-500">Accepted worker price</span><b className="text-4xl text-amber-700">₹{booking?.price||booking?.quote?.amount}</b></div><div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">🔒 Work was customer-confirmed before payment. Razorpay signature verification protects the transaction.</div><button disabled={paying} onClick={()=>void pay()} className="mt-6 w-full rounded-xl bg-amber-600 px-6 py-4 font-bold text-white disabled:opacity-60">{paying?'Opening secure checkout...':`Pay ₹${booking?.price||booking?.quote?.amount} securely →`}</button></div>}</div></main>;
}
export default CustomerPayment;