import { useState } from 'react';
import { apiRequest, getStoredUser, getStoredToken, setActiveRole } from './api/client';
import RoleSelect from './RoleSelect';
import Login from './Login';
import Signup from './Signup';
import CustomerBooking from './CustomerBooking';
import WorkerDashboard from './WorkerDashboard';
import TranslationVoice from './TranslationVoice';
import ContractorDashboard from './ContractorDashboard';
import CreateProject from './CreateProject';
import WorkerSelection from './WorkerSelection';
import ProjectDetails from './ProjectDetails';
import CustomerPayment from './CustomerPayment';
import RatingSubmission from './RatingSubmission';
import ComplaintSubmission from './ComplaintSubmission';
import ComplaintSuccess from './ComplaintSuccess';
import AdminDashboard from './AdminDashboard';
import WorkerProcess from './WorkerProcess';
import ProjectAssigned from './projectAssigned';
import WorkProcessStarted from './WorkProcessStarted';
import PaymentSuccess from './PaymentSuccess';

const PAGE_ROLES = { translationVoice:'customer', customerBooking:'customer', workerProcess:'customer', customerPayment:'customer', paymentSuccess:'customer', ratingSubmission:'customer', complaintSubmission:'customer', complaintSuccess:'customer', workerDashboard:'worker', contractorDashboard:'contractor', createProject:'contractor', workerSelection:'contractor', projectDetails:'contractor', projectAssigned:'contractor', WorkProcessStarted:'contractor', adminDashboard:'admin' };

function App() {
  const [page, setPage] = useState('home');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [project, setProject] = useState(null);
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  const navigate = (nextPage) => { const role = PAGE_ROLES[nextPage]; if (role) setActiveRole(role); setPage(nextPage); };
  const goAuth = (role, nextPage = 'login') => { setSelectedRole(role); setActiveRole(role); setPage(nextPage); };
  const authSuccess = (role) => { setActiveRole(role); if (role === 'customer') return navigate('translationVoice'); if (role === 'worker') return navigate('workerDashboard'); if (role === 'contractor') return navigate('contractorDashboard'); return navigate('adminDashboard'); };
  const back = () => { const map = { translationVoice:'login', role:'home', login:'role', signup:'login', customerBooking:'translationVoice', workerProcess:'customerBooking', customerPayment:'workerProcess', paymentSuccess:'customerPayment', ratingSubmission:'paymentSuccess', complaintSubmission:'workerProcess', complaintSuccess:'home', workerDashboard:'login', contractorDashboard:'login', createProject:'contractorDashboard', workerSelection:'createProject', projectDetails:'workerSelection', projectAssigned:'projectDetails', WorkProcessStarted:'contractorDashboard', adminDashboard:'login' }; navigate(map[page] || 'home'); };

  const requiredRole = PAGE_ROLES[page];
  const storedUser = requiredRole ? getStoredUser(requiredRole) : null;
  if (requiredRole && storedUser?.role !== requiredRole) return <Login role={requiredRole} onSuccess={() => authSuccess(requiredRole)} onSignup={() => { setSelectedRole(requiredRole); setActiveRole(requiredRole); setPage('signup'); }} onBack={() => navigate('role')} />;
  if (page === 'role') return <RoleSelect onSelect={(role) => goAuth(role)} onBack={back} />;
  if (page === 'login') return <Login role={selectedRole} onSuccess={() => authSuccess(selectedRole)} onSignup={() => navigate('signup')} onBack={back} />;
  if (page === 'signup') return <Signup role={selectedRole} onSuccess={() => authSuccess(selectedRole)} onLogin={() => navigate('login')} onBack={back} />;
  if (page === 'translationVoice') return <TranslationVoice onBack={back} onContinue={() => navigate('customerBooking')} />;
  if (page === 'customerBooking') return <CustomerBooking onBack={back} onSelectWorker={(worker, id) => { setSelectedWorker(worker); setBookingId(id); navigate('workerProcess'); }} />;
  if (page === 'workerProcess') return <WorkerProcess worker={selectedWorker} bookingId={bookingId} onBack={back} onRetryWorker={() => navigate('customerBooking')} onComplaint={() => navigate('complaintSubmission')} onProceedToPayment={() => navigate('customerPayment')} />;
  if (page === 'customerPayment') return <CustomerPayment worker={selectedWorker} bookingId={bookingId} onBack={back} onNext={() => navigate('paymentSuccess')} />;
  if (page === 'paymentSuccess') return <PaymentSuccess onBack={back} onContinue={() => navigate('ratingSubmission')} />;
  if (page === 'ratingSubmission') return <RatingSubmission bookingId={bookingId} onBack={back} onSubmit={() => navigate('home')} onComplaint={() => navigate('complaintSubmission')} />;
  if (page === 'complaintSubmission') return <ComplaintSubmission bookingId={bookingId} onBack={back} onSubmit={() => navigate('complaintSuccess')} />;
  if (page === 'complaintSuccess') return <ComplaintSuccess onBack={() => navigate('home')} />;
  if (page === 'workerDashboard') return <WorkerDashboard onBack={back} />;
  if (page === 'contractorDashboard') return <ContractorDashboard onBack={back} onCreateProject={() => { setProject(null); setSelectedWorkers([]); navigate('createProject'); }} />;
  if (page === 'createProject') return <CreateProject onBack={back} onNext={(nextProject) => { setProject(nextProject); setSelectedWorkers([]); navigate('workerSelection'); }} />;
  if (page === 'workerSelection') return <WorkerSelection project={project} onBack={back} onNext={(workers) => { setSelectedWorkers(workers); navigate('projectDetails'); }} />;
  if (page === 'projectDetails') return <ProjectDetails project={project} selectedWorkers={selectedWorkers} onBack={back} onCreateProject={(createdProject) => { setProject(createdProject); navigate('projectAssigned'); }} />;
  if (page === 'projectAssigned') return <ProjectAssigned project={project} selectedWorkers={selectedWorkers} onBack={back} onContinue={async () => { if (!project?._id) throw new Error('Project details are missing. Please return to the dashboard.'); await apiRequest(`/api/projects/${project._id}/status`, { method: 'PATCH', token: getStoredToken('contractor'), body: { status: 'in-progress' } }); setProject(current => ({ ...current, status: 'in-progress' })); navigate('WorkProcessStarted'); }} />;
  if (page === 'WorkProcessStarted') return <WorkProcessStarted onDashboard={() => navigate('contractorDashboard')} />;
  if (page === 'adminDashboard') return <AdminDashboard onBack={back} />;

  return <main className="min-h-screen overflow-hidden bg-[#FFF9F4] text-slate-900"><header className="border-b border-amber-100 bg-white/95 backdrop-blur"><nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6"><div className="flex items-center gap-3"><img src="/anvaya-logo.png" alt="Anvaya" className="h-12 w-auto"/><div className="hidden sm:block"><p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">ANVAYA</p><p className="text-sm font-semibold text-slate-600">Trusted local services</p></div></div><button type="button" onClick={() => navigate('role')} className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-amber-600">Get Started →</button></nav></header><section className="relative"><div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-200/25 blur-3xl"/><div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20"><div><span className="inline-flex rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">🛡 Verified workers · 💬 Clear communication · ₹ Fair quotes</span><h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">Trusted help,<span className="block text-amber-600">closer to home.</span></h1><p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">Find local skilled workers, explain your problem in your own words, agree on the price, and confirm the work before payment.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={() => navigate('role')} className="rounded-2xl bg-amber-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-amber-600/20 hover:bg-amber-700">Find a worker →</button><button type="button" onClick={() => goAuth('worker')} className="rounded-2xl border border-slate-200 bg-white px-7 py-4 text-base font-bold text-slate-700 hover:border-amber-300 hover:text-amber-700">I am a worker</button></div><p className="mt-5 text-sm font-medium text-slate-500">Simple enough for first-time users. Built for towns and communities.</p></div><div className="rounded-[2rem] border border-amber-100 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-7"><div className="rounded-3xl bg-[#FFF1E6] p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">How Anvaya works</p><div className="mt-6 space-y-5">{[['01','Create or sign in','Choose Customer, Worker or Contractor first.'],['02','Tell us what you need','Customers can type or speak their requirement after signing in.'],['03','Agree before work','Worker reviews, quotes, customer accepts, then work begins.']].map(([number, stepTitle, text]) => <div key={number} className="flex gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-amber-700 shadow-sm">{number}</span><div><h2 className="font-bold text-slate-900">{stepTitle}</h2><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div></div>)}</div></div><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-600"><div className="rounded-xl bg-emerald-50 px-2 py-3">✓ Verified</div><div className="rounded-xl bg-amber-50 px-2 py-3">₹ Quote</div><div className="rounded-xl bg-blue-50 px-2 py-3">🛡 Confirm</div></div></div></div></section><section className="border-y border-amber-100 bg-white"><div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6">{[['🗣️','Speak your way','Voice-friendly service requests'],['📍','Local first','Connect with workers near you'],['🤝','Fair for both sides','Customer and worker agree before work']].map(([icon, title, text]) => <div key={title} className="flex items-center gap-3 rounded-2xl px-3 py-2"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-xl">{icon}</span><div><p className="font-bold text-slate-900">{title}</p><p className="text-xs leading-5 text-slate-500">{text}</p></div></div>)}</div></section><footer className="px-4 py-8 text-center text-sm text-slate-400">Trusted workers. Better connections. Stronger communities.</footer></main>;
}
export default App;