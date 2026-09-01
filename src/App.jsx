import { useState } from "react";

import RoleSelect from "./RoleSelect";
import Login from "./Login";
import CustomerBooking from "./CustomerBooking";
import Workerdashboard from "./Workerdashboard"; // Case fixed
import TranslationVoice from "./TranslationVoice";

import ContractorDashboard from "./ContractorDashboard";
import CreateProject from "./CreateProject";
import WorkerSelection from "./WorkerSelection";
import ProjectDetails from "./ProjectDetails";

import CustomerPayment from "./CustomerPayment";
import RatingSubmission from "./RatingSubmission";
import ComplaintSubmission from "./ComplaintSubmission";
import ComplaintSuccess from "./ComplaintSuccess";

import AdminDashboard from "./AdminDashboard";
import WorkerProcess from "./WorkerProcess";
import ProjectAssigned from "./projectAssigned";
import WorkProcessStarted from "./WorkProcessStarted";
import PaymentSuccess from "./PaymentSuccess";
import { LanguageProvider, useLanguage } from "./LanguageContext";

 

function AppContent() {
  const [page, setPage] = useState("home");
  const [selectedRole, setSelectedRole] = useState("");

  /* CUSTOMER DATA */
  const [selectedWorker, setSelectedWorker] = useState(null);

  /* CONTRACTOR DATA */
  const [project, setProject] = useState(null);
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  /* ================= ROLE SELECT ================= */
  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setPage("login");
  };

  /* ================= LOGIN ================= */
  const handleLoginSuccess = () => {
    if (selectedRole === "customer") {
      setPage("customerBooking");
    } else if (selectedRole === "worker") {
      setPage("workerdashboard");
    } else if (selectedRole === "contractor") {
      setPage("contractorDashboard");
    } else if (selectedRole === "admin") {
      setPage("adminDashboard");
    }
  };

  /* ================= CUSTOMER WORKER SELECT ================= */
  const handleWorkerSelect = (worker) => {
    setSelectedWorker(worker);
    setPage("workerProcess");
  };

  /* ================= BACK BUTTON ================= */
  const handleBack = () => {
    switch (page) {      /* GENERAL */
      case "translationVoice":
        setPage("home");
        break;

      case "role":
        setPage("translationVoice");
        break;

      case "login":
        setPage("role");
        break;

      /* CUSTOMER */
      case "customerBooking":
        setPage("login");
        break;

      case "workerProcess":
        setPage("customerBooking");
        break;

      case "customerPayment":
        setPage("workerProcess");
        break;

      case "paymentSuccess":
        setPage("customerPayment");
        break;

      case "ratingSubmission":
        setPage("paymentSuccess");
        break;

      case "complaintSubmission":
        setPage("ratingSubmission");
        break;

      case "complaintSuccess":
        setPage("ratingSubmission");
        break;

      /* WORKER */
      case "workerDashboard":
        setPage("login");
        break;

      /* CONTRACTOR FLOW BACK HANDLERS */
      case "contractorDashboard":
  setPage("login");
  break;

case "createProject":
  setPage("contractorDashboard");
  break;

case "workerSelection":
  setPage("createProject");
  break;

case "projectDetails":
  setPage("workerSelection");
  break;

  case "projectAssigned":
  setPage("projectDetails");
  break;

  

  case "WorkProcessStarted":
  setPage("contractorDashboard");
  break;
     

      /* ADMIN */
      case "adminDashboard":
        setPage("login");
        break;

      default:
        setPage("home");
        break;
    }
  };

  /* ================= VIEWS ================= */

  if (page === "translationVoice") {
    return (
      <TranslationVoice
        onBack={() => setPage("home")}
        onContinue={() => setPage("role")}
      />
    );
  }

  if (page === "role") {
    return (
      <RoleSelect
        onSelect={handleRoleSelect}
        onBack={handleBack}
      />
    );
  }

  if (page === "login") {
    return (
      <Login
        role={selectedRole}
        onSuccess={handleLoginSuccess}
        onBack={handleBack}
      />
    );
  }

  /* ================= CUSTOMER FLOW ================= */

  if (page === "customerBooking") {
    return (
      <CustomerBooking
        onBack={handleBack}
        onSelectWorker={handleWorkerSelect}
      />
    );
  }

  if (page === "workerProcess") {
    return (
      <WorkerProcess
        worker={selectedWorker}
        onBack={handleBack}
        onProceedToPayment={() => setPage("customerPayment")}
      />
    );
  }

  if (page === "customerPayment") {
    return (
      <CustomerPayment
        worker={selectedWorker}
        onBack={handleBack}
        onNext={() => setPage("paymentSuccess")}
      />
    );
  }

  if (page === "paymentSuccess") {
  return (
    <PaymentSuccess
      onBack={handleBack}
      onContinue={() => setPage("ratingSubmission")}
    />
  );
}
     
               
             

  if (page === "ratingSubmission") {
    return (
      <RatingSubmission
        onBack={handleBack}
        onNext={() => setPage("home")}
        onComplaint={() => setPage("complaintSubmission")}
      />
    );
  }

  if (page === "complaintSubmission") {
    return (
      <ComplaintSubmission
        onBack={handleBack}
        onSubmit={() => setPage("complaintSuccess")}
      />
    );
  }

  if (page === "complaintSuccess") {
    return (
      <ComplaintSuccess
        onBack={handleBack}
        onHome={() => setPage("home")}
      />
    );
  }

  /* ================= WORKER FLOW ================= */

  if (page === "workerdashboard") {
    return <Workerdashboard onBack={handleBack} />;
  }

  /* ================= CONTRACTOR FLOW ================= */

  /* ================= CONTRACTOR FLOW ================= */

/* ================= CONTRACTOR FLOW ================= */

if (page === "contractorDashboard") {
  return (
    <ContractorDashboard
      onBack={handleBack}
      onCreateProject={() => {
        setProject(null);
        setSelectedWorkers([]);
        setPage("createProject");
      }}
    />
  );
}

if (page === "createProject") {
  return (
    <CreateProject
      onBack={handleBack}
      onNext={(newProject) => {
        setProject(newProject);
        setSelectedWorkers([]);
        setPage("workerSelection");
      }}
    />
  );
}

if (page === "workerSelection") {
  return (
    <WorkerSelection
      project={project}
      onBack={handleBack}
      onNext={(workers) => {
        setSelectedWorkers(workers);
        setPage("projectDetails");
      }}
    />
  );
}

if (page === "projectDetails") {
  return (
    <ProjectDetails
      project={project}
      selectedWorkers={selectedWorkers}
      onBack={handleBack}
      onCreateProject={() => {
        setPage("projectAssigned");
      }}
    />
  );
}

if (page === "projectAssigned") {
  return (
    <ProjectAssigned
      project={project}
      selectedWorkers={selectedWorkers}
      onBack={handleBack}
      onContinue={() => {
        setPage("WorkProcessStarted");
      }}
    />
  );
}
/* ================= WORK PROCESS STARTED ================= */

if (page === "WorkProcessStarted") {
  return (
    <WorkProcessStarted
      onDashboard={() => setPage("contractorDashboard")}
    />
  );
}
   
        
  
        
   
       

  /* ================= ADMIN ================= */

  if (page === "adminDashboard") {
    return <AdminDashboard onBack={handleBack} />;
  }

  /* ================= HOME ================= */

  return (
    <main className="min-h-screen bg-[#FFF1E6] text-slate-900">
      <nav className="flex items-center justify-between px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <img
            src="/anvaya-logo.png"
            alt="Anvaya"
            className="h-12 w-auto object-contain"
          />
          <span className="hidden border-l border-amber-200 pl-3 text-sm font-semibold text-slate-600 sm:block">
            Local services, made easier
          </span>
        </div>

        <button
          type="button"
          onClick={() => setPage("translationVoice")}
          className="rounded-xl border border-amber-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-700 hover:shadow-md active:scale-95"
        >
          Get Started
        </button>
      </nav>

      <section className="flex min-h-[calc(100vh-88px)] flex-col items-center justify-center px-6 pb-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-5 py-2 text-sm font-semibold text-amber-800 shadow-sm">
          <span>✨</span>
          Trusted Local Workers
        </div>

        <img
          src="/anvaya-logo.png"
          alt="Anvaya"
          className="h-40 w-auto object-contain sm:h-48"
        />

        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
          Find Trusted Workers
          <span className="text-amber-600"> Near You</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          Connect with verified electricians, plumbers, carpenters, painters,
          masons and other skilled professionals for your everyday needs.
        </p>

        <button
          type="button"
          onClick={() => setPage("translationVoice")}
          className="group mt-9 flex items-center justify-center gap-3 rounded-2xl bg-amber-600 px-8 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-2xl active:translate-y-0"
        >
          <span>Get Started</span>
          <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </button>

        <div className="mt-14 flex max-w-4xl flex-wrap justify-center gap-3">
          <div className="rounded-full border border-amber-100 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm">
            ✓ Verified Workers
          </div>
          <div className="rounded-full border border-amber-100 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm">
            ✓ Nearby Matching
          </div>
          <div className="rounded-full border border-amber-100 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm">
            ✓ Ratings & Reviews
          </div>
          <div className="rounded-full border border-amber-100 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-sm">
            ✓ Flexible Work
          </div>
        </div>

        <p className="mt-12 text-sm text-slate-400">
          Trusted workers. Better connections. Stronger communities.
        </p>
      </section>
    </main>
  );

}
function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;