import { useState } from 'react';
import RoleSelect from './RoleSelect';
import Login from './Login';
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

function App() {
  const [page, setPage] = useState('home');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [project, setProject] = useState(null);
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  const back = () => {
    const map = {
      translationVoice: 'login',
      role: 'home',
      login: 'role',
      customerBooking: 'translationVoice',
      workerProcess: 'customerBooking',
      customerPayment: 'workerProcess',
      paymentSuccess: 'customerPayment',
      ratingSubmission: 'paymentSuccess',
      complaintSubmission: 'workerProcess',
      complaintSuccess: 'home',
      workerDashboard: 'login',
      contractorDashboard: 'login',
      createProject: 'contractorDashboard',
      workerSelection: 'createProject',
      projectDetails: 'workerSelection',
      projectAssigned: 'projectDetails',
      WorkProcessStarted: 'contractorDashboard',
      adminDashboard: 'login'
    };

    setPage(map[page] || 'home');
  };

  if (page === 'role') {
    return (
      <RoleSelect
        onSelect={(role) => {
          setSelectedRole(role);
          setPage('login');
        }}
        onBack={back}
      />
    );
  }

  if (page === 'login') {
    return (
      <Login
        role={selectedRole}
        onSuccess={() => {
          if (selectedRole === 'customer') {
            setPage('translationVoice');
            return;
          }

          if (selectedRole === 'worker') {
            setPage('workerDashboard');
            return;
          }

          if (selectedRole === 'contractor') {
            setPage('contractorDashboard');
            return;
          }

          setPage('adminDashboard');
        }}
        onBack={back}
      />
    );
  }

  if (page === 'translationVoice') {
    return (
      <TranslationVoice
        onBack={back}
        onContinue={() => setPage('customerBooking')}
      />
    );
  }

  if (page === 'customerBooking') {
    return (
      <CustomerBooking
        onBack={back}
        onSelectWorker={(worker, id) => {
          setSelectedWorker(worker);
          setBookingId(id);
          setPage('workerProcess');
        }}
      />
    );
  }

  if (page === 'workerProcess') {
    return (
      <WorkerProcess
        worker={selectedWorker}
        bookingId={bookingId}
        onBack={back}
        onComplaint={() => setPage('complaintSubmission')}
        onProceedToPayment={() => setPage('customerPayment')}
      />
    );
  }

  if (page === 'customerPayment') {
    return (
      <CustomerPayment
        worker={selectedWorker}
        bookingId={bookingId}
        onBack={back}
        onNext={() => setPage('paymentSuccess')}
      />
    );
  }

  if (page === 'paymentSuccess') {
    return (
      <PaymentSuccess
        onBack={back}
        onContinue={() => setPage('ratingSubmission')}
      />
    );
  }

  if (page === 'ratingSubmission') {
    return (
      <RatingSubmission
        bookingId={bookingId}
        onBack={back}
        onSubmit={() => setPage('home')}
        onComplaint={() => setPage('complaintSubmission')}
      />
    );
  }

  if (page === 'complaintSubmission') {
    return (
      <ComplaintSubmission
        bookingId={bookingId}
        onBack={back}
        onSubmit={() => setPage('complaintSuccess')}
      />
    );
  }

  if (page === 'complaintSuccess') {
    return (
      <ComplaintSuccess onBack={() => setPage('home')} />
    );
  }

  if (page === 'workerDashboard') {
    return <WorkerDashboard onBack={back} />;
  }

  if (page === 'contractorDashboard') {
    return (
      <ContractorDashboard
        onBack={back}
        onCreateProject={() => {
          setProject(null);
          setSelectedWorkers([]);
          setPage('createProject');
        }}
      />
    );
  }

  if (page === 'createProject') {
    return (
      <CreateProject
        onBack={back}
        onNext={(nextProject) => {
          setProject(nextProject);
          setSelectedWorkers([]);
          setPage('workerSelection');
        }}
      />
    );
  }

  if (page === 'workerSelection') {
    return (
      <WorkerSelection
        project={project}
        onBack={back}
        onNext={(workers) => {
          setSelectedWorkers(workers);
          setPage('projectDetails');
        }}
      />
    );
  }

  if (page === 'projectDetails') {
    return (
      <ProjectDetails
        project={project}
        selectedWorkers={selectedWorkers}
        onBack={back}
        onCreateProject={() => setPage('projectAssigned')}
      />
    );
  }

  if (page === 'projectAssigned') {
    return (
      <ProjectAssigned
        project={project}
        selectedWorkers={selectedWorkers}
        onBack={back}
        onContinue={() => setPage('WorkProcessStarted')}
      />
    );
  }

  if (page === 'WorkProcessStarted') {
    return (
      <WorkProcessStarted
        onDashboard={() => setPage('contractorDashboard')}
      />
    );
  }

  if (page === 'adminDashboard') {
    return <AdminDashboard onBack={back} />;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF9F4] text-slate-900">
      <header className="border-b border-amber-100 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img
              src="/anvaya-logo.png"
              alt="Anvaya"
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                ANVAYA
              </p>
              <p className="text-sm font-semibold text-slate-600">
                Trusted local services
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPage('role')}
            className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-amber-600 focus-visible:ring-4 focus-visible:ring-amber-100"
          >
            Get Started <span aria-hidden="true">→</span>
          </button>
        </nav>
      </header>

      <section className="relative">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-200/25 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div>
            <span className="inline-flex rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">
              🛡 Verified workers · 💬 Clear communication · ₹ Fair quotes
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Trusted help,
              <span className="block text-amber-600">
                closer to home.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Find local skilled workers, explain your problem in your own words,
              agree on the price, and confirm the work before payment.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setPage('role')}
                className="rounded-2xl bg-amber-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-amber-600/20 transition hover:bg-amber-700 focus-visible:ring-4 focus-visible:ring-amber-200"
              >
                Find a worker <span aria-hidden="true">→</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('worker');
                  setPage('login');
                }}
                className="rounded-2xl border border-slate-200 bg-white px-7 py-4 text-base font-bold text-slate-700 shadow-sm transition hover:border-amber-300 hover:text-amber-700"
              >
                I am a worker
              </button>
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              Simple enough for first-time users. Built for towns and communities.
            </p>
          </div>

          <div className="rounded-[2rem] border border-amber-100 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-7">
            <div className="rounded-3xl bg-[#FFF1E6] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                How Anvaya works
              </p>

              <div className="mt-6 space-y-5">
                {[
                  ['01', 'Create or sign in', 'Choose Customer, Worker or Contractor first.'],
                  ['02', 'Tell us what you need', 'Customers can type or speak their requirement after signing in.'],
                  ['03', 'Agree before work', 'Worker reviews, quotes, customer accepts, then work begins.']
                ].map(([number, stepTitle, text]) => (
                  <div key={number} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-amber-700 shadow-sm">
                      {number}
                    </span>
                    <div>
                      <h2 className="font-bold text-slate-900">
                        {stepTitle}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-600">
              <div className="rounded-xl bg-emerald-50 px-2 py-3">✓ Verified</div>
              <div className="rounded-xl bg-amber-50 px-2 py-3">₹ Quote</div>
              <div className="rounded-xl bg-blue-50 px-2 py-3">🛡 Confirm</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-amber-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:grid-cols-3 sm:px-6">
          {[
            ['🗣️', 'Speak your way', 'Voice-friendly service requests'],
            ['📍', 'Local first', 'Connect with workers near you'],
            ['🤝', 'Fair for both sides', 'Customer and worker agree before work']
          ].map(([icon, featureTitle, text]) => (
            <div key={featureTitle} className="flex items-center gap-3 rounded-2xl px-3 py-2">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-xl">
                {icon}
              </span>
              <div>
                <p className="font-bold text-slate-900">
                  {featureTitle}
                </p>
                <p className="text-xs leading-5 text-slate-500">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-4 py-8 text-center text-sm text-slate-400">
        Trusted workers. Better connections. Stronger communities.
      </footer>
    </main>
  );
}

export default App;
