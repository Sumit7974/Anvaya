// import { useState } from "react";

// function AdminDashboard({ onBack }) {
//   const [workers, setWorkers] = useState([
//     {
//       id: 1,
//       name: "Rahul Verma",
//       skill: "Electrician",
//       rating: 4.9,
//       earnings: 28500,
//       verified: true,
//       suspended: false,
//     },
//     {
//       id: 2,
//       name: "Amit Sharma",
//       skill: "Plumber",
//       rating: 4.8,
//       earnings: 23100,
//       verified: false,
//       suspended: false,
//     },
//     {
//       id: 3,
//       name: "Vikas Patel",
//       skill: "Carpenter",
//       rating: 4.7,
//       earnings: 19400,
//       verified: true,
//       suspended: false,
//     },
//     {
//       id: 4,
//       name: "Rohit Singh",
//       skill: "Painter",
//       rating: 4.5,
//       earnings: 16200,
//       verified: false,
//       suspended: true,
//     },
//   ]);

//   const [complaints, setComplaints] = useState([
//     {
//       id: 1,
//       customer: "Priya Sharma",
//       worker: "Rahul Verma",
//       issue: "Worker arrived late for the scheduled service.",
//       status: "Pending",
//     },
//     {
//       id: 2,
//       customer: "Neha Singh",
//       worker: "Amit Sharma",
//       issue: "Service quality was not satisfactory.",
//       status: "Pending",
//     },
//     {
//       id: 3,
//       customer: "Arjun Patel",
//       worker: "Rohit Singh",
//       issue: "Worker did not complete the requested work.",
//       status: "Resolved",
//     },
//   ]);

//   const [activeTab, setActiveTab] = useState("overview");

//   const totalEarnings = workers.reduce(
//     (total, worker) => total + worker.earnings,
//     0
//   );

//   const averageRating =
//     workers.reduce((total, worker) => total + worker.rating, 0) /
//     workers.length;

//   const pendingComplaints = complaints.filter(
//     (complaint) => complaint.status === "Pending"
//   ).length;

//   const verifyWorker = (id) => {
//     setWorkers((currentWorkers) =>
//       currentWorkers.map((worker) =>
//         worker.id === id
//           ? { ...worker, verified: !worker.verified }
//           : worker
//       )
//     );
//   };

//   const toggleSuspension = (id) => {
//     setWorkers((currentWorkers) =>
//       currentWorkers.map((worker) =>
//         worker.id === id
//           ? { ...worker, suspended: !worker.suspended }
//           : worker
//       )
//     );
//   };

//   const resolveComplaint = (id) => {
//     setComplaints((currentComplaints) =>
//       currentComplaints.map((complaint) =>
//         complaint.id === id
//           ? { ...complaint, status: "Resolved" }
//           : complaint
//       )
//     );
//   };

//   return (
//     <main className="min-h-screen bg-[#FFF8F3] text-slate-800">

//       {/* HEADER */}
//       <header className="border-b border-amber-100 bg-white">

//         <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

//           <div className="flex items-center gap-4">

//             <img
//               src="/anvaya-logo.png"
//               alt="Anvaya"
//               className="h-14 w-auto object-contain"
//             />

//             <div className="hidden border-l border-slate-200 pl-4 sm:block">
//               <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
//                 Admin
//               </p>

//               <p className="text-sm font-semibold text-slate-700">
//                 Manage the Anvaya community
//               </p>
//             </div>

//           </div>

//           <button
//             onClick={onBack}
//             className="rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
//           >
//             ← Back
//           </button>

//         </div>

//       </header>


//       {/* HERO */}
//       <section className="bg-[#FFF1E6]">

//         <div className="mx-auto max-w-7xl px-6 py-12 sm:py-14">

//           <div className="max-w-3xl">

//             <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">
//               <span>🛡️</span>
//               Admin Control Center
//             </div>

//             <h1 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
//               Keep Anvaya trusted and reliable.
//             </h1>

//             <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
//               Verify workers, review complaints, monitor performance and
//               take action when needed.
//             </p>

//           </div>

//         </div>

//       </section>


//       {/* STATS */}
//       <section className="mx-auto max-w-7xl px-6 pt-10">

//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

//           <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
//             <p className="text-sm font-semibold text-slate-500">
//               Total Workers
//             </p>

//             <p className="mt-2 text-3xl font-bold text-slate-900">
//               {workers.length}
//             </p>

//             <p className="mt-1 text-xs font-semibold text-emerald-600">
//               Community members
//             </p>
//           </div>

//           <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
//             <p className="text-sm font-semibold text-slate-500">
//               Pending Complaints
//             </p>

//             <p className="mt-2 text-3xl font-bold text-slate-900">
//               {pendingComplaints}
//             </p>

//             <p className="mt-1 text-xs font-semibold text-amber-600">
//               Need attention
//             </p>
//           </div>

//           <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
//             <p className="text-sm font-semibold text-slate-500">
//               Total Earnings
//             </p>

//             <p className="mt-2 text-3xl font-bold text-slate-900">
//               ₹{totalEarnings.toLocaleString()}
//             </p>

//             <p className="mt-1 text-xs font-semibold text-emerald-600">
//               Worker earnings
//             </p>
//           </div>

//           <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
//             <p className="text-sm font-semibold text-slate-500">
//               Average Rating
//             </p>

//             <p className="mt-2 text-3xl font-bold text-slate-900">
//               ⭐ {averageRating.toFixed(1)}
//             </p>

//             <p className="mt-1 text-xs font-semibold text-sky-600">
//               Community rating
//             </p>
//           </div>

//         </div>

//       </section>


//       {/* TABS */}
//       <section className="mx-auto max-w-7xl px-6 pt-10">

//         <div className="flex flex-wrap gap-3">

//           <button
//             onClick={() => setActiveTab("overview")}
//             className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
//               activeTab === "overview"
//                 ? "bg-amber-600 text-white shadow-md"
//                 : "border border-amber-100 bg-white text-slate-600 hover:border-amber-300 hover:text-amber-700"
//             }`}
//           >
//             Overview
//           </button>

//           <button
//             onClick={() => setActiveTab("workers")}
//             className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
//               activeTab === "workers"
//                 ? "bg-amber-600 text-white shadow-md"
//                 : "border border-amber-100 bg-white text-slate-600 hover:border-amber-300 hover:text-amber-700"
//             }`}
//           >
//             Workers
//           </button>

//           <button
//             onClick={() => setActiveTab("complaints")}
//             className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
//               activeTab === "complaints"
//                 ? "bg-amber-600 text-white shadow-md"
//                 : "border border-amber-100 bg-white text-slate-600 hover:border-amber-300 hover:text-amber-700"
//             }`}
//           >
//             Complaints
//           </button>

//           <button
//             onClick={() => setActiveTab("earnings")}
//             className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
//               activeTab === "earnings"
//                 ? "bg-amber-600 text-white shadow-md"
//                 : "border border-amber-100 bg-white text-slate-600 hover:border-amber-300 hover:text-amber-700"
//             }`}
//           >
//             Earnings & Ratings
//           </button>

//         </div>

//       </section>


//       {/* CONTENT */}
//       <section className="mx-auto max-w-7xl px-6 py-8">

//         {/* OVERVIEW */}
//         {activeTab === "overview" && (

//           <div className="grid gap-6 lg:grid-cols-2">

//             <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-md">

//               <div className="flex items-center justify-between">

//                 <div>
//                   <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
//                     Verification
//                   </p>

//                   <h2 className="mt-2 text-2xl font-bold text-slate-900">
//                     Worker verification
//                   </h2>
//                 </div>

//                 <span className="text-3xl">
//                   ✅
//                 </span>

//               </div>

//               <div className="mt-6 space-y-3">

//                 {workers.slice(0, 3).map((worker) => (

//                   <div
//                     key={worker.id}
//                     className="flex items-center justify-between rounded-2xl bg-[#FFF8F3] p-4"
//                   >

//                     <div>
//                       <p className="font-bold text-slate-900">
//                         {worker.name}
//                       </p>

//                       <p className="text-sm text-slate-500">
//                         {worker.skill}
//                       </p>
//                     </div>

//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-bold ${
//                         worker.verified
//                           ? "bg-emerald-50 text-emerald-700"
//                           : "bg-amber-50 text-amber-700"
//                       }`}
//                     >
//                       {worker.verified ? "Verified" : "Pending"}
//                     </span>

//                   </div>

//                 ))}

//               </div>

//               <button
//                 onClick={() => setActiveTab("workers")}
//                 className="mt-5 text-sm font-bold text-amber-700 hover:text-amber-800"
//               >
//                 Manage workers →
//               </button>

//             </div>


//             <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-md">

//               <div className="flex items-center justify-between">

//                 <div>
//                   <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
//                     Complaints
//                   </p>

//                   <h2 className="mt-2 text-2xl font-bold text-slate-900">
//                     Recent complaints
//                   </h2>
//                 </div>

//                 <span className="text-3xl">
//                   📋
//                 </span>

//               </div>

//               <div className="mt-6 space-y-3">

//                 {complaints.slice(0, 3).map((complaint) => (

//                   <div
//                     key={complaint.id}
//                     className="rounded-2xl bg-[#FFF8F3] p-4"
//                   >

//                     <div className="flex items-center justify-between gap-3">

//                       <p className="font-bold text-slate-900">
//                         {complaint.worker}
//                       </p>

//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-bold ${
//                           complaint.status === "Resolved"
//                             ? "bg-emerald-50 text-emerald-700"
//                             : "bg-amber-50 text-amber-700"
//                         }`}
//                       >
//                         {complaint.status}
//                       </span>

//                     </div>

//                     <p className="mt-2 text-sm leading-6 text-slate-500">
//                       {complaint.issue}
//                     </p>

//                   </div>

//                 ))}

//               </div>

//               <button
//                 onClick={() => setActiveTab("complaints")}
//                 className="mt-5 text-sm font-bold text-amber-700 hover:text-amber-800"
//               >
//                 View all complaints →
//               </button>

//             </div>

//           </div>
//         )}


//         {/* WORKERS */}
//         {activeTab === "workers" && (

//           <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-md">

//             <div className="mb-6">

//               <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
//                 Worker management
//               </p>

//               <h2 className="mt-2 text-2xl font-bold text-slate-900">
//                 Verify and manage workers
//               </h2>

//             </div>

//             <div className="space-y-4">

//               {workers.map((worker) => (

//                 <div
//                   key={worker.id}
//                   className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
//                 >

//                   <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

//                     <div className="flex items-center gap-4">

//                       <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF1E6] text-2xl">
//                         👷
//                       </div>

//                       <div>
//                         <h3 className="font-bold text-slate-900">
//                           {worker.name}
//                         </h3>

//                         <p className="text-sm text-amber-700">
//                           {worker.skill}
//                         </p>

//                         <div className="mt-1 flex gap-3 text-xs text-slate-500">
//                           <span>⭐ {worker.rating}</span>
//                           <span>₹{worker.earnings.toLocaleString()}</span>
//                         </div>
//                       </div>

//                     </div>


//                     <div className="flex flex-wrap gap-2">

//                       <button
//                         onClick={() => verifyWorker(worker.id)}
//                         className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
//                           worker.verified
//                             ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
//                             : "bg-amber-600 text-white hover:bg-amber-700"
//                         }`}
//                       >
//                         {worker.verified
//                           ? "✓ Verified"
//                           : "Verify Worker"}
//                       </button>

//                       <button
//                         onClick={() => toggleSuspension(worker.id)}
//                         className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
//                           worker.suspended
//                             ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
//                             : "bg-red-50 text-red-600 hover:bg-red-100"
//                         }`}
//                       >
//                         {worker.suspended
//                           ? "Unsuspend"
//                           : "Suspend"}
//                       </button>

//                     </div>

//                   </div>

//                   {worker.suspended && (

//                     <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
//                       ⚠️ This worker is currently suspended.
//                     </div>

//                   )}

//                 </div>

//               ))}

//             </div>

//           </div>
//         )}


//         {/* COMPLAINTS */}
//         {activeTab === "complaints" && (

//           <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-md">

//             <div className="mb-6">

//               <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
//                 Complaint center
//               </p>

//               <h2 className="mt-2 text-2xl font-bold text-slate-900">
//                 Review customer complaints
//               </h2>

//             </div>

//             <div className="space-y-4">

//               {complaints.map((complaint) => (

//                 <div
//                   key={complaint.id}
//                   className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
//                 >

//                   <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

//                     <div>

//                       <div className="flex flex-wrap items-center gap-2">

//                         <h3 className="font-bold text-slate-900">
//                           {complaint.worker}
//                         </h3>

//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-bold ${
//                             complaint.status === "Resolved"
//                               ? "bg-emerald-50 text-emerald-700"
//                               : "bg-amber-50 text-amber-700"
//                           }`}
//                         >
//                           {complaint.status}
//                         </span>

//                       </div>

//                       <p className="mt-1 text-sm text-slate-500">
//                         Customer: {complaint.customer}
//                       </p>

//                       <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
//                         {complaint.issue}
//                       </p>

//                     </div>

//                     {complaint.status === "Pending" && (

//                       <button
//                         onClick={() => resolveComplaint(complaint.id)}
//                         className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
//                       >
//                         Mark Resolved ✓
//                       </button>

//                     )}

//                   </div>

//                 </div>

//               ))}

//             </div>

//           </div>
//         )}


//         {/* EARNINGS */}
//         {activeTab === "earnings" && (

//           <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-md">

//             <div className="mb-6">

//               <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
//                 Performance
//               </p>

//               <h2 className="mt-2 text-2xl font-bold text-slate-900">
//                 Earnings & ratings
//               </h2>

//             </div>

//             <div className="space-y-4">

//               {workers.map((worker) => (

//                 <div
//                   key={worker.id}
//                   className="flex flex-col gap-4 rounded-2xl bg-[#FFF8F3] p-5 sm:flex-row sm:items-center sm:justify-between"
//                 >

//                   <div className="flex items-center gap-4">

//                     <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
//                       👷
//                     </div>

//                     <div>

//                       <p className="font-bold text-slate-900">
//                         {worker.name}
//                       </p>

//                       <p className="text-sm text-slate-500">
//                         {worker.skill}
//                       </p>

//                     </div>

//                   </div>

//                   <div className="flex gap-8">

//                     <div>
//                       <p className="text-xs font-semibold text-slate-400">
//                         Rating
//                       </p>

//                       <p className="mt-1 font-bold text-slate-900">
//                         ⭐ {worker.rating}
//                       </p>
//                     </div>

//                     <div>
//                       <p className="text-xs font-semibold text-slate-400">
//                         Earnings
//                       </p>

//                       <p className="mt-1 font-bold text-emerald-700">
//                         ₹{worker.earnings.toLocaleString()}
//                       </p>
//                     </div>

//                   </div>

//                 </div>

//               ))}

//             </div>

//           </div>
//         )}

//       </section>


//       {/* FOOTER */}
//       <footer className="border-t border-amber-100 bg-white">

//         <div className="mx-auto max-w-7xl px-6 py-8 text-center">

//           <p className="text-sm text-slate-400">
//             Anvaya Admin Center · Trusted workers. Better connections.
//           </p>

//         </div>

//       </footer>

//     </main>
//   );
// }

// export default AdminDashboard;
import { useState } from "react";

function AdminDashboard({ onBack }) {
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: "Rahul Verma",
      skill: "Electrician",
      rating: 4.9,
      earnings: 28500,
      verified: true,
      suspended: false,
    },
    {
      id: 2,
      name: "Amit Sharma",
      skill: "Plumber",
      rating: 4.8,
      earnings: 23100,
      verified: false,
      suspended: false,
    },
    {
      id: 3,
      name: "Vikas Patel",
      skill: "Carpenter",
      rating: 4.7,
      earnings: 19400,
      verified: true,
      suspended: false,
    },
    {
      id: 4,
      name: "Rohit Singh",
      skill: "Painter",
      rating: 4.5,
      earnings: 16200,
      verified: false,
      suspended: true,
    },
  ]);

  const [complaints, setComplaints] = useState([
    {
      id: 1,
      customer: "Priya Sharma",
      worker: "Rahul Verma",
      issue: "Worker arrived late for the scheduled service.",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Neha Singh",
      worker: "Amit Sharma",
      issue: "Service quality was not satisfactory.",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Arjun Patel",
      worker: "Rohit Singh",
      issue: "Worker did not complete the requested work.",
      status: "Resolved",
    },
  ]);

  const [activeTab, setActiveTab] = useState("overview");

  const totalEarnings = workers.reduce(
    (total, worker) => total + worker.earnings,
    0
  );

  const averageRating =
    workers.reduce((total, worker) => total + worker.rating, 0) /
    workers.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const verifyWorker = (id) => {
    setWorkers((currentWorkers) =>
      currentWorkers.map((worker) =>
        worker.id === id
          ? { ...worker, verified: !worker.verified }
          : worker
      )
    );
  };

  const toggleSuspension = (id) => {
    setWorkers((currentWorkers) =>
      currentWorkers.map((worker) =>
        worker.id === id
          ? { ...worker, suspended: !worker.suspended }
          : worker
      )
    );
  };

  const resolveComplaint = (id) => {
    setComplaints((currentComplaints) =>
      currentComplaints.map((complaint) =>
        complaint.id === id
          ? { ...complaint, status: "Resolved" }
          : complaint
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">

      {/* HEADER */}
      <header className="border-b border-amber-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-4">
            <img
              src="/anvaya-logo.png"
              alt="Anvaya"
              className="h-14 w-auto object-contain"
            />

            <div className="hidden border-l border-slate-200 pl-4 sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                Admin
              </p>

              <p className="text-sm font-semibold text-slate-700">
                Manage the Anvaya community
              </p>
            </div>
          </div>

          <button
            onClick={onBack}
            className="rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
          >
            ← Back
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#FFF1E6]">
        <div className="mx-auto max-w-7xl px-6 py-12">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">
              <span>🛡️</span>
              Admin Control Center
            </div>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Keep Anvaya trusted and reliable.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Verify workers, review complaints, monitor performance and
              take action when needed.
            </p>

          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 pt-10">

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-semibold text-slate-500">
              Total Workers
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {workers.length}
            </p>

            <p className="mt-1 text-xs font-semibold text-emerald-600">
              Community members
            </p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-semibold text-slate-500">
              Pending Complaints
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {pendingComplaints}
            </p>

            <p className="mt-1 text-xs font-semibold text-amber-600">
              Need attention
            </p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-semibold text-slate-500">
              Total Earnings
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              ₹{totalEarnings.toLocaleString()}
            </p>

            <p className="mt-1 text-xs font-semibold text-emerald-600">
              Worker earnings
            </p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <p className="text-sm font-semibold text-slate-500">
              Average Rating
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              ⭐ {averageRating.toFixed(1)}
            </p>

            <p className="mt-1 text-xs font-semibold text-sky-600">
              Community rating
            </p>
          </div>

        </div>
      </section>

      {/* TABS */}
      <section className="mx-auto max-w-7xl px-6 pt-10">

        <div className="flex flex-wrap gap-3">

          {[
            ["overview", "Overview"],
            ["workers", "Workers"],
            ["complaints", "Complaints"],
            ["earnings", "Earnings & Ratings"],
          ].map(([tab, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
                activeTab === tab
                  ? "bg-amber-600 text-white shadow-md"
                  : "border border-amber-100 bg-white text-slate-600 hover:border-amber-300 hover:text-amber-700"
              }`}
            >
              {label}
            </button>
          ))}

        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-8">

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid gap-6 lg:grid-cols-2">

            <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-md">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                    Verification
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    Worker verification
                  </h2>
                </div>

                <span className="text-3xl">✅</span>
              </div>

              <div className="mt-6 space-y-3">

                {workers.slice(0, 3).map((worker) => (
                  <div
                    key={worker.id}
                    className="flex items-center justify-between rounded-2xl bg-[#FFF8F3] p-4"
                  >
                    <div>
                      <p className="font-bold text-slate-900">
                        {worker.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {worker.skill}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        worker.verified
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {worker.verified ? "Verified" : "Pending"}
                    </span>
                  </div>
                ))}

              </div>

              <button
                onClick={() => setActiveTab("workers")}
                className="mt-5 text-sm font-bold text-amber-700 hover:text-amber-800"
              >
                Manage workers →
              </button>

            </div>

            <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-md">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                    Complaints
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    Recent complaints
                  </h2>
                </div>

                <span className="text-3xl">📋</span>

              </div>

              <div className="mt-6 space-y-3">

                {complaints.slice(0, 3).map((complaint) => (
                  <div
                    key={complaint.id}
                    className="rounded-2xl bg-[#FFF8F3] p-4"
                  >

                    <div className="flex items-center justify-between gap-3">

                      <p className="font-bold text-slate-900">
                        {complaint.worker}
                      </p>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          complaint.status === "Resolved"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {complaint.status}
                      </span>

                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {complaint.issue}
                    </p>

                  </div>
                ))}

              </div>

              <button
                onClick={() => setActiveTab("complaints")}
                className="mt-5 text-sm font-bold text-amber-700 hover:text-amber-800"
              >
                View all complaints →
              </button>

            </div>

          </div>
        )}

        {/* WORKERS */}
        {activeTab === "workers" && (
          <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-md">

            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                Worker management
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Verify and manage workers
              </h2>
            </div>

            <div className="space-y-4">

              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-center gap-4">

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF1E6] text-2xl">
                        👷
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {worker.name}
                        </h3>

                        <p className="text-sm text-amber-700">
                          {worker.skill}
                        </p>

                        <div className="mt-1 flex gap-3 text-xs text-slate-500">
                          <span>⭐ {worker.rating}</span>
                          <span>
                            ₹{worker.earnings.toLocaleString()}
                          </span>
                        </div>
                      </div>

                    </div>

                    <div className="flex flex-wrap gap-2">

                      <button
                        onClick={() => verifyWorker(worker.id)}
                        className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                          worker.verified
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-amber-600 text-white hover:bg-amber-700"
                        }`}
                      >
                        {worker.verified
                          ? "✓ Verified"
                          : "Verify Worker"}
                      </button>

                      <button
                        onClick={() => toggleSuspension(worker.id)}
                        className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                          worker.suspended
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-red-50 text-red-600 hover:bg-red-100"
                        }`}
                      >
                        {worker.suspended
                          ? "Unsuspend"
                          : "Suspend"}
                      </button>

                    </div>
                  </div>

                  {worker.suspended && (
                    <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                      ⚠️ This worker is currently suspended.
                    </div>
                  )}

                </div>
              ))}

            </div>
          </div>
        )}

        {/* COMPLAINTS */}
        {activeTab === "complaints" && (
          <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-md">

            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                Complaint center
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Review customer complaints
              </h2>
            </div>

            <div className="space-y-4">

              {complaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                >

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-bold text-slate-900">
                          {complaint.worker}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            complaint.status === "Resolved"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {complaint.status}
                        </span>

                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        Customer: {complaint.customer}
                      </p>

                      <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                        {complaint.issue}
                      </p>

                    </div>

                    {complaint.status === "Pending" && (
                      <button
                        onClick={() => resolveComplaint(complaint.id)}
                        className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
                      >
                        Mark Resolved ✓
                      </button>
                    )}

                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

        {/* EARNINGS */}
        {activeTab === "earnings" && (
          <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-md">

            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                Performance
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Earnings & ratings
              </h2>
            </div>

            <div className="space-y-4">

              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className="flex flex-col gap-4 rounded-2xl bg-[#FFF8F3] p-5 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                      👷
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        {worker.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {worker.skill}
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-8">

                    <div>
                      <p className="text-xs font-semibold text-slate-400">
                        Rating
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        ⭐ {worker.rating}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400">
                        Earnings
                      </p>

                      <p className="mt-1 font-bold text-emerald-700">
                        ₹{worker.earnings.toLocaleString()}
                      </p>
                    </div>

                  </div>

                </div>
              ))}

            </div>
          </div>
        )}

      </section>

      {/* FOOTER */}
      <footer className="border-t border-amber-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center">
          <p className="text-sm text-slate-400">
            Anvaya Admin Center · Trusted workers. Better connections.
          </p>
        </div>
      </footer>

    </main>
  );
}

export default AdminDashboard;