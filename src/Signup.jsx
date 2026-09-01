import { useMemo, useState } from 'react';
import { apiRequest, saveAuth } from './api/client';

const SKILLS = [
  ['electrician', '⚡ Electrician'], ['plumber', '🔧 Plumber'], ['carpenter', '🪚 Carpenter'],
  ['painter', '🎨 Painter'], ['mason', '🧱 Mason'], ['welder', '🔥 Welder'],
  ['ac-repair', '❄️ AC / Appliance repair'], ['mechanic', '🔩 Mechanic'], ['other', '🛠️ Other']
];

function Signup({ role, onSuccess, onBack, onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [skills, setSkills] = useState([]);
  const [location, setLocation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [service, setService] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isWorker = role === 'worker';
  const isContractor = role === 'contractor';
  const title = useMemo(
    () => isWorker ? 'Create your worker profile' : isContractor ? 'Create your contractor account' : 'Create your customer account',
    [isWorker, isContractor]
  );

  const toggleSkill = (skill) => {
    setSkills((current) => current.includes(skill)
      ? current.filter((item) => item !== skill)
      : [...current, skill]);
    setError('');
  };

  const connectDigiLocker = () => {
    const url = import.meta.env.VITE_DIGILOCKER_AUTH_URL;
    if (!url) {
      setError('DigiLocker is not configured yet. Add VITE_DIGILOCKER_AUTH_URL after enabling your approved DigiLocker/API Setu integration.');
      return;
    }
    window.location.href = url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!name.trim()) return setError('Please enter your full name.');
    if (!email.includes('@')) return setError('Please enter a valid email address.');
    if (phone.trim().length < 10) return setError('Please enter a valid 10-digit phone number.');
    if (password.length < 8) return setError('Password must be at least 8 characters long.');
    if (password !== confirmPassword) return setError('Passwords do not match.');
    if (isWorker && skills.length === 0) return setError('Please select at least one skill.');
    if (isContractor && !companyName.trim()) return setError('Please enter your business or company name.');
    if (isContractor && !location.trim()) return setError('Please enter your location.');
    if (isContractor && !service) return setError('Please select your primary service.');

    setLoading(true);
    try {
      const data = await apiRequest(`/api/auth/${role}/register`, {
        method: 'POST',
        body: {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          password,
          ...(isWorker ? { skills } : {}),
          ...(isContractor ? { companyName: companyName.trim(), location: location.trim(), service } : {})
        }
      });
      saveAuth(data);
      setSuccess(true);
      setTimeout(() => onSuccess(), 900);
    } catch (requestError) {
      setError(requestError.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3] px-4 py-6 text-slate-800 sm:px-8">
      <button type="button" onClick={onBack} className="fixed right-5 top-5 z-50 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-md hover:border-amber-300 hover:text-amber-700">← Back</button>
      <div className="mx-auto max-w-6xl pt-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-2xl lg:grid-cols-[.82fr_1.18fr]">
          <section className="bg-[#FFF1E6] px-7 py-10 sm:px-12 lg:px-14">
            <img src="/anvaya-logo.png" alt="Anvaya" className="h-20 w-auto" />
            <span className="mt-8 inline-flex rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">{isWorker ? '👷 Worker registration' : isContractor ? '🏗️ Contractor registration' : '🏠 Customer registration'}</span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">Join <span className="text-amber-600">Anvaya.</span></h1>
            <p className="mt-5 text-base leading-7 text-slate-600">{isWorker ? 'Build a trusted local-worker profile. Tell customers what you can do and complete identity verification before you start taking jobs.' : isContractor ? 'Create your professional account and manage your local projects and teams.' : 'Create an account once, then find trusted local professionals whenever you need help.'}</p>
            <div className="mt-8 space-y-4 text-sm font-semibold text-slate-700">
              <div className="flex gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">✓</span> Simple account creation</div>
              <div className="flex gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">📍</span> Built for local communities</div>
              {isWorker && <div className="flex gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">🛡️</span> Identity + skill profile</div>}
            </div>
          </section>

          <section className="px-7 py-10 sm:px-12">
            {!success ? <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
              <div className="mb-7"><p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">Sign up</p><h2 className="mt-2 text-3xl font-bold text-slate-900">{title}</h2><p className="mt-2 text-sm text-slate-500">Use details you can access easily. You can update your profile later.</p></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label><span className="mb-2 block text-sm font-semibold">Full name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" autoComplete="name" className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100" /></label>
                <label><span className="mb-2 block text-sm font-semibold">Phone number</span><input value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ''))} placeholder="10-digit mobile number" autoComplete="tel" className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100" /></label>
              </div>
              <label className="mt-5 block"><span className="mb-2 block text-sm font-semibold">Email address</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100" /></label>

              {isWorker && <>
                <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
                  <div><p className="font-bold text-slate-900">Verify your identity</p><p className="mt-1 text-xs leading-5 text-slate-600">Use the approved DigiLocker integration to verify your identity. Verification status is confirmed by the server, not the browser.</p></div>
                  <button type="button" onClick={connectDigiLocker} className="mt-4 w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 font-bold text-emerald-800 hover:bg-emerald-50">Connect DigiLocker</button>
                </div>
                <div className="mt-6"><div className="mb-3 flex items-end justify-between"><div><p className="text-sm font-bold">What work can you do?</p><p className="mt-1 text-xs text-slate-500">Select all skills that match your experience.</p></div><span className="text-xs font-bold text-amber-700">{skills.length} selected</span></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{SKILLS.map(([value, label]) => <button key={value} type="button" onClick={() => toggleSkill(value)} className={`rounded-xl border px-3 py-3 text-left text-xs font-bold transition ${skills.includes(value) ? 'border-amber-400 bg-amber-50 text-amber-800' : 'border-slate-200 bg-white text-slate-600 hover:border-amber-200'}`}>{label}</button>)}</div></div>
              </>}

              {isContractor && <><div className="mt-5 grid gap-5 sm:grid-cols-2"><label><span className="mb-2 block text-sm font-semibold">Business / company</span><input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your business name" className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100" /></label><label><span className="mb-2 block text-sm font-semibold">Location</span><input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Town / village / area" className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100" /></label></div><label className="mt-5 block"><span className="mb-2 block text-sm font-semibold">Primary service</span><select value={service} onChange={(e) => setService(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100"><option value="">Select a service</option><option value="Construction">Construction</option><option value="Electrical">Electrical</option><option value="Plumbing">Plumbing</option><option value="Carpentry">Carpentry</option><option value="Painting">Painting</option><option value="Renovation">Renovation</option><option value="Other">Other</option></select></label></>}

              <div className="mt-5 grid gap-5 sm:grid-cols-2"><label><span className="mb-2 block text-sm font-semibold">Password</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" autoComplete="new-password" className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100" /></label><label><span className="mb-2 block text-sm font-semibold">Confirm password</span><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat password" autoComplete="new-password" className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100" /></label></div>
              {error && <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</div>}
              <button disabled={loading} type="submit" className="mt-6 w-full rounded-xl bg-amber-600 px-5 py-4 font-bold text-white shadow-lg shadow-amber-600/20 hover:bg-amber-700 disabled:opacity-60">{loading ? 'Creating account…' : 'Create my Anvaya account →'}</button>
              <p className="mt-5 text-center text-sm text-slate-500">Already have an account? <button type="button" onClick={onLogin} className="font-bold text-amber-700 hover:underline">Sign in</button></p>
            </form> : <div className="py-20 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">✓</div><h2 className="mt-6 text-3xl font-bold text-slate-900">Account created</h2><p className="mt-2 text-slate-500">Taking you to your Anvaya dashboard…</p></div>}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Signup;
