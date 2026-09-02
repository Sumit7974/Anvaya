import { useState } from 'react';
import { apiRequest, saveAuth } from './api/client';

const DEMO_ACCOUNTS = {
  customer: {
    email: 'demo.customer@anvaya.test',
    password: 'Demo@12345',
    label: 'Customer demo'
  },
  worker: {
    email: 'demo.worker.001@anvaya.test',
    password: 'Demo@12345',
    label: 'Rakesh Tomar · Electrician',
    name: 'Rakesh Tomar',
    skill: 'Electrician',
    city: 'Gwalior'
  },
  contractor: {
    email: 'demo.contractor@anvaya.test',
    password: 'Demo@12345',
    label: 'Contractor demo'
  }
};

function Login({ role, onSuccess, onSignup, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roleName = role === 'worker' ? 'Worker' : role === 'contractor' ? 'Contractor' : role === 'admin' ? 'Admin' : 'Customer';
  const description = role === 'worker'
    ? 'Sign in to manage your worker profile, availability and jobs.'
    : role === 'contractor'
      ? 'Sign in to manage your projects and professional team.'
      : role === 'admin'
        ? 'Sign in to manage Anvaya platform operations.'
        : 'Sign in to discover trusted local professionals and manage your bookings.';
  const demo = DEMO_ACCOUNTS[role];

  const useDemo = () => {
    if (!demo) return;
    setEmail(demo.email);
    setPassword(demo.password);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); setError('');
    if (!email.includes('@')) return setError('Please enter a valid email address.');
    if (!password) return setError('Please enter your password.');
    setLoading(true);
    try {
      const data = await apiRequest(`/api/auth/${role}/login`, { method: 'POST', body: { email: email.trim().toLowerCase(), password } });
      saveAuth(data); onSuccess();
    } catch (requestError) { setError(requestError.message || 'Login failed. Please check your credentials.'); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3] px-5 py-7 text-slate-800 sm:px-8">
      <button type="button" onClick={onBack} className="fixed right-5 top-5 z-50 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-md hover:border-amber-300 hover:text-amber-700">← Back</button>
      <div className="mx-auto flex min-h-[90vh] max-w-6xl items-center justify-center"><div className="grid w-full overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-2xl lg:grid-cols-2">
        <section className="flex flex-col justify-center bg-[#FFF1E6] px-7 py-12 sm:px-12 lg:px-14"><img src="/anvaya-logo.png" alt="Anvaya" className="mb-8 h-20 w-auto object-contain object-left" /><div className="flex w-fit rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">{roleName} Access</div><h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">Welcome to <span className="text-amber-600">Anvaya.</span></h1><p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">{description}</p><div className="mt-8 space-y-4 text-sm font-semibold text-slate-700"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">✓</span> Trusted Anvaya community</div><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">🔒</span> Secure account experience</div>{role === 'worker' && <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">👷</span> Skills and verification profile</div>}</div></section>
        <section className="flex items-center justify-center px-7 py-12 sm:px-12"><form onSubmit={handleSubmit} className="w-full max-w-md"><div className="mb-8"><p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">Sign in</p><h2 className="mt-2 text-3xl font-bold text-slate-900">{roleName} account</h2><p className="mt-2 text-sm leading-6 text-slate-500">Enter your account details to continue.</p></div>
          <label className="block"><span className="mb-2 block text-sm font-semibold">Email address</span><input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} placeholder="Enter your email address" autoComplete="email" className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100" /></label>
          <label className="mt-5 block"><span className="mb-2 block text-sm font-semibold">Password</span><div className="relative"><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} placeholder="Enter your password" autoComplete="current-password" className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 pr-16 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-amber-700">{showPassword ? 'Hide' : 'Show'}</button></div></label>
          {demo && <section className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-bold text-slate-900">Demo login</p><p className="mt-1 text-xs leading-5 text-slate-600">Use this account for the SIH walkthrough.</p></div><button type="button" onClick={useDemo} className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-blue-700 shadow-sm hover:bg-blue-100">Use demo</button></div><div className="mt-3 grid gap-2 text-xs text-slate-700"><div className="rounded-lg bg-white px-3 py-2"><span className="font-semibold">Email:</span> {demo.email}</div><div className="rounded-lg bg-white px-3 py-2"><span className="font-semibold">Password:</span> {demo.password}</div>{demo.name && <div className="rounded-lg bg-white px-3 py-2"><span className="font-semibold">Demo worker to book:</span> {demo.name} · {demo.skill} · {demo.city}</div>}</div></section>}
          {error && <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
          <button disabled={loading} type="submit" className="mt-6 w-full rounded-xl bg-amber-600 px-5 py-4 font-bold text-white shadow-lg shadow-amber-600/20 hover:bg-amber-700 disabled:opacity-60">{loading ? 'Signing in…' : 'Login to Anvaya →'}</button>
          {role !== 'admin' && <div className="my-6 flex items-center gap-3"><div className="h-px flex-1 bg-slate-100" /><span className="text-xs font-semibold text-slate-400">NEW TO ANVAYA?</span><div className="h-px flex-1 bg-slate-100" /></div>}
          {role !== 'admin' && <button type="button" onClick={onSignup} className="w-full rounded-xl border-2 border-amber-200 bg-white px-5 py-3.5 font-bold text-amber-700 hover:border-amber-400 hover:bg-amber-50">Create a new account</button>}
        </form></section>
      </div></div>
    </main>
  );
}
export default Login;
