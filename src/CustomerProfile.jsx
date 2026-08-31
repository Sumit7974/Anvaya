// import { useState } from "react";

// function CustomerProfile({ onBack }) {
//   const [selectedService, setSelectedService] = useState("All");
//   const [search, setSearch] = useState("");
//   const [selectedWorker, setSelectedWorker] = useState(null);
//   const [bookingWorker, setBookingWorker] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [customNeed, setCustomNeed] = useState("");

//   const workers = [
//     {
//       id: 1,
//       name: "Rahul Verma",
//       skill: "Electrician",
//       experience: "6 years",
//       rating: "4.9",
//       jobs: "120+",
//       location: "Nearby",
//       icon: "⚡",
//       about:
//         "Experienced electrician specializing in home wiring, fan installation, lighting and electrical repairs.",
//     },
//     {
//       id: 2,
//       name: "Amit Sharma",
//       skill: "Plumber",
//       experience: "5 years",
//       rating: "4.8",
//       jobs: "95+",
//       location: "Nearby",
//       icon: "🔧",
//       about:
//         "Reliable plumber experienced in pipe repairs, bathroom fittings, leakage fixes and household plumbing.",
//     },
//     {
//       id: 3,
//       name: "Vikas Patel",
//       skill: "Carpenter",
//       experience: "8 years",
//       rating: "4.9",
//       jobs: "150+",
//       location: "Nearby",
//       icon: "🪚",
//       about:
//         "Professional carpenter offering furniture repair, doors, shelves and custom woodwork services.",
//     },
//     {
//       id: 4,
//       name: "Rohit Singh",
//       skill: "Painter",
//       experience: "4 years",
//       rating: "4.7",
//       jobs: "80+",
//       location: "Nearby",
//       icon: "🎨",
//       about:
//         "Skilled painter providing interior and exterior painting with clean and professional finishing.",
//     },
//     {
//       id: 5,
//       name: "Suresh Yadav",
//       skill: "Mason",
//       experience: "7 years",
//       rating: "4.8",
//       jobs: "110+",
//       location: "Nearby",
//       icon: "🧱",
//       about:
//         "Experienced mason for brickwork, wall repairs, flooring and small construction requirements.",
//     },
//   ];

//   const services = [
//     "All",
//     "Electrician",
//     "Plumber",
//     "Carpenter",
//     "Painter",
//     "Mason",
//   ];

//   const filteredWorkers = workers.filter((worker) => {
//     const serviceMatch =
//       selectedService === "All" || worker.skill === selectedService;

//     const searchText = search.toLowerCase().trim();

//     const searchMatch =
//       worker.name.toLowerCase().includes(searchText) ||
//       worker.skill.toLowerCase().includes(searchText) ||
//       worker.location.toLowerCase().includes(searchText);

//     return serviceMatch && searchMatch;
//   });

//   const handleBooking = () => {
//     setBookingWorker(null);
//     setSuccessMessage("Your booking request has been sent successfully.");
//   };

//   const handleCustomRequirement = () => {
//     if (!customNeed.trim()) return;

//     setCustomNeed("");
//     setSuccessMessage(
//       "Your requirement has been submitted successfully."
//     );
//   };

//   return (
//     <main className="min-h-screen bg-[#FFF8F3] text-slate-800">

//       {/* BACK BUTTON */}

//       <button
//         onClick={onBack}
//         className="fixed right-6 top-32 z-50 flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-lg"
//       >
//         <span className="text-lg">←</span>
//         <span>Back</span>
//       </button>

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
//               <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
//                 Customer
//               </p>

//               <p className="text-sm font-semibold text-slate-700">
//                 Find trusted professionals
//               </p>
//             </div>

//           </div>

//           <div className="mr-28 hidden rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 sm:block">
//             ✓ Service available
//           </div>

//         </div>
//       </header>

//       {/* HERO */}

//       <section className="relative overflow-hidden bg-[#FFF1E6]">

//         <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20">

//           <div className="max-w-3xl">

//             <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm">
//               <span>✨</span>
//               <span>Trusted professionals near you</span>
//             </div>

//             <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-6xl">
//               What do you need
//               <span className="text-amber-600"> help with?</span>
//             </h1>

//             <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
//               Discover skilled and reliable workers for your everyday needs.
//               Choose a service or search for the right professional.
//             </p>

//             {/* SEARCH */}

//             <div className="mt-8 flex max-w-2xl items-center rounded-2xl border border-amber-100 bg-white p-2 shadow-lg">

//               <span className="px-3 text-xl">
//                 🔍
//               </span>

//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search electrician, plumber, carpenter..."
//                 className="w-full bg-transparent px-2 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
//               />

//               {search && (
//                 <button
//                   onClick={() => setSearch("")}
//                   className="mr-2 rounded-lg px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
//                 >
//                   ✕
//                 </button>
//               )}

//             </div>

//           </div>

//         </div>

//       </section>

//       {/* SERVICES */}

//       <section className="mx-auto max-w-7xl px-6 pt-10">

//         <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
//           Explore services
//         </p>

//         <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
//           Find the right professional
//         </h2>

//         <div className="mt-6 flex gap-3 overflow-x-auto pb-3">

//           {services.map((service) => (
//             <button
//               key={service}
//               onClick={() => setSelectedService(service)}
//               className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
//                 selectedService === service
//                   ? "bg-amber-600 text-white shadow-lg shadow-amber-200"
//                   : "border border-amber-100 bg-white text-slate-600 hover:-translate-y-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
//               }`}
//             >
//               {service}
//             </button>
//           ))}

//         </div>

//       </section>

//       {/* WORKERS */}

//       <section className="mx-auto max-w-7xl px-6 py-10">

//         <div className="mb-6 flex items-center justify-between">

//           <div>
//             <h2 className="text-2xl font-bold text-slate-900">
//               Recommended workers
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Professionals ready to help you
//             </p>
//           </div>

//           <span className="hidden rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 sm:block">
//             {filteredWorkers.length} available
//           </span>

//         </div>

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//           {filteredWorkers.map((worker) => (

//             <div
//               key={worker.id}
//               className="group rounded-3xl border border-amber-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-2xl"
//             >

//               {/* WORKER ICON */}

//               <div className="flex items-center justify-between">

//                 <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1E6] text-3xl transition duration-300 group-hover:scale-110">
//                   {worker.icon}
//                 </div>

//                 <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
//                   ● Available
//                 </span>

//               </div>

//               {/* NAME */}

//               <h3 className="mt-6 text-xl font-bold text-slate-900">
//                 {worker.name}
//               </h3>

//               <p className="mt-1 font-semibold text-amber-700">
//                 {worker.skill}
//               </p>

//               {/* DETAILS */}

//               <div className="mt-5 space-y-3">

//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-slate-500">
//                     Experience
//                   </span>

//                   <span className="font-semibold text-slate-700">
//                     {worker.experience}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-slate-500">
//                     Rating
//                   </span>

//                   <span className="font-semibold text-slate-700">
//                     ⭐ {worker.rating}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-slate-500">
//                     Jobs
//                   </span>

//                   <span className="font-semibold text-slate-700">
//                     {worker.jobs}
//                   </span>
//                 </div>

//               </div>

//               {/* LOCATION */}

//               <div className="mt-5 rounded-xl bg-[#FFF8F3] px-3 py-2 text-sm font-medium text-slate-600">
//                 📍 {worker.location}
//               </div>

//               {/* BUTTONS */}

//               <div className="mt-5 grid grid-cols-2 gap-2">

//                 <button
//                   onClick={() => setSelectedWorker(worker)}
//                   className="rounded-xl border border-amber-200 px-3 py-3 text-sm font-bold text-amber-700 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-50"
//                 >
//                   Details
//                 </button>

//                 <button
//                   onClick={() => setBookingWorker(worker)}
//                   className="rounded-xl bg-amber-600 px-3 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-lg"
//                 >
//                   Book →
//                 </button>

//               </div>

//             </div>

//           ))}

//         </div>

//         {/* NO RESULTS */}

//         {filteredWorkers.length === 0 && (
//           <div className="rounded-3xl border border-amber-100 bg-white px-6 py-16 text-center shadow-md">

//             <div className="text-5xl">
//               🔎
//             </div>

//             <h3 className="mt-5 text-2xl font-bold text-slate-900">
//               No workers found
//             </h3>

//             <p className="mt-2 text-slate-500">
//               Try another service or search term.
//             </p>

//             <button
//               onClick={() => {
//                 setSearch("");
//                 setSelectedService("All");
//               }}
//               className="mt-6 rounded-xl bg-amber-600 px-5 py-3 font-bold text-white hover:bg-amber-700"
//             >
//               Reset Search
//             </button>

//           </div>
//         )}

//       </section>

//       {/* CUSTOM REQUIREMENT */}

//       <section className="mx-auto max-w-7xl px-6 pb-12">

//         <div className="rounded-3xl border border-amber-100 bg-white p-7 shadow-lg sm:p-9">

//           <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

//             <div>

//               <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
//                 ✍️
//               </div>

//               <h2 className="mt-5 text-2xl font-bold text-slate-900">
//                 Can't find exactly what you need?
//               </h2>

//               <p className="mt-3 leading-7 text-slate-500">
//                 Describe your requirement and send it to Anvaya.
//                 We'll help you find the right professional.
//               </p>

//             </div>

//             <div>

//               <textarea
//                 value={customNeed}
//                 onChange={(e) => setCustomNeed(e.target.value)}
//                 rows="4"
//                 placeholder="Example: I need an electrician to install two ceiling fans..."
//                 className="w-full resize-none rounded-2xl border border-slate-200 bg-[#FFFDFC] px-5 py-4 text-sm leading-6 text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
//               />

//               <button
//                 onClick={handleCustomRequirement}
//                 disabled={!customNeed.trim()}
//                 className="mt-4 rounded-xl bg-slate-800 px-6 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 Submit Requirement →
//               </button>

//             </div>

//           </div>

//         </div>

//       </section>

//       {/* WORKER DETAILS MODAL */}

//       {selectedWorker && (

//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-5 backdrop-blur-sm">

//           <div className="w-full max-w-lg rounded-3xl border border-amber-100 bg-white p-8 shadow-2xl">

//             <div className="flex items-start justify-between">

//               <div className="flex items-center gap-4">

//                 <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1E6] text-3xl">
//                   {selectedWorker.icon}
//                 </div>

//                 <div>
//                   <h2 className="text-2xl font-bold text-slate-900">
//                     {selectedWorker.name}
//                   </h2>

//                   <p className="font-semibold text-amber-700">
//                     {selectedWorker.skill}
//                   </p>
//                 </div>

//               </div>

//               <button
//                 onClick={() => setSelectedWorker(null)}
//                 className="rounded-xl px-3 py-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
//               >
//                 ✕
//               </button>

//             </div>

//             <div className="mt-7 grid grid-cols-2 gap-3">

//               <div className="rounded-2xl bg-[#FFF8F3] p-4">
//                 <p className="text-xs font-semibold text-slate-400">
//                   EXPERIENCE
//                 </p>

//                 <p className="mt-1 font-bold text-slate-800">
//                   {selectedWorker.experience}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-[#FFF8F3] p-4">
//                 <p className="text-xs font-semibold text-slate-400">
//                   RATING
//                 </p>

//                 <p className="mt-1 font-bold text-slate-800">
//                   ⭐ {selectedWorker.rating}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-[#FFF8F3] p-4">
//                 <p className="text-xs font-semibold text-slate-400">
//                   COMPLETED JOBS
//                 </p>

//                 <p className="mt-1 font-bold text-slate-800">
//                   {selectedWorker.jobs}
//                 </p>
//               </div>

//               <div className="rounded-2xl bg-[#FFF8F3] p-4">
//                 <p className="text-xs font-semibold text-slate-400">
//                   LOCATION
//                 </p>

//                 <p className="mt-1 font-bold text-slate-800">
//                   📍 {selectedWorker.location}
//                 </p>
//               </div>

//             </div>

//             <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50/50 p-5">

//               <p className="text-sm font-bold text-slate-800">
//                 About this professional
//               </p>

//               <p className="mt-2 text-sm leading-6 text-slate-500">
//                 {selectedWorker.about}
//               </p>

//             </div>

//             <button
//               onClick={() => {
//                 setSelectedWorker(null);
//                 setBookingWorker(selectedWorker);
//               }}
//               className="mt-6 w-full rounded-xl bg-amber-600 px-5 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-amber-700"
//             >
//               Book {selectedWorker.name} →
//             </button>

//           </div>

//         </div>

//       )}

//       {/* BOOKING CONFIRMATION */}

//       {bookingWorker && (

//         <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 px-5 backdrop-blur-sm">

//           <div className="w-full max-w-md rounded-3xl border border-amber-100 bg-white p-8 text-center shadow-2xl">

//             <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-4xl">
//               {bookingWorker.icon}
//             </div>

//             <p className="mt-6 text-sm font-bold uppercase tracking-wider text-amber-600">
//               Booking Request
//             </p>

//             <h2 className="mt-2 text-3xl font-bold text-slate-900">
//               Confirm your request
//             </h2>

//             <p className="mt-4 leading-7 text-slate-500">
//               You are requesting{" "}
//               <span className="font-bold text-slate-800">
//                 {bookingWorker.name}
//               </span>{" "}
//               for your {bookingWorker.skill.toLowerCase()} requirement.
//             </p>

//             <div className="mt-6 rounded-2xl bg-[#FFF8F3] p-4 text-left">

//               <p className="font-bold text-slate-800">
//                 {bookingWorker.skill}
//               </p>

//               <p className="mt-1 text-sm text-slate-500">
//                 ⭐ {bookingWorker.rating} rating
//               </p>

//               <p className="mt-1 text-sm text-slate-500">
//                 📍 {bookingWorker.location}
//               </p>

//             </div>

//             <div className="mt-6 grid grid-cols-2 gap-3">

//               <button
//                 onClick={() => setBookingWorker(null)}
//                 className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-600 transition hover:bg-slate-50"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleBooking}
//                 className="rounded-xl bg-amber-600 px-5 py-3 font-bold text-white shadow-md transition hover:bg-amber-700"
//               >
//                 Send Request
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//       {/* SUCCESS MODAL */}

//       {successMessage && (

//         <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-900/40 px-5 backdrop-blur-sm">

//           <div className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-2xl">

//             <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl font-bold text-emerald-600 shadow-lg shadow-emerald-100">
//               ✓
//             </div>

//             <p className="mt-7 text-sm font-bold uppercase tracking-wider text-emerald-600">
//               Success
//             </p>

//             <h2 className="mt-3 text-3xl font-bold text-slate-900">
//               Request Sent! 🎉
//             </h2>

//             <p className="mt-4 leading-7 text-slate-500">
//               {successMessage}
//             </p>

//             <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
//               ✓ Your request is now active
//             </div>

//             <button
//               onClick={() => setSuccessMessage("")}
//               className="mt-7 w-full rounded-xl bg-slate-800 px-5 py-3.5 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-700 hover:shadow-lg"
//             >
//               Continue Exploring
//             </button>

//           </div>

//         </div>

//       )}

//       {/* FOOTER */}

//       <footer className="border-t border-amber-100 bg-white">

//         <div className="mx-auto max-w-7xl px-6 py-8 text-center">

//           <p className="text-sm text-slate-400">
//             Trusted workers. Better connections. Stronger communities.
//           </p>

//         </div>

//       </footer>

//     </main>
//   );
// }

// export default CustomerProfile;
import { useMemo, useState } from "react";

function CustomerProfile({ onBack }) {
  const [selectedService, setSelectedService] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [booking, setBooking] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [customNeed, setCustomNeed] = useState("");
  const [requirementSent, setRequirementSent] = useState(false);

  const workers = [
    {
      id: 1,
      name: "Rahul Verma",
      skill: "Electrician",
      experience: "6 years",
      rating: "4.9",
      jobs: "120+",
      location: "Nearby · 1.2 km",
      icon: "⚡",
      about:
        "Experienced electrician specializing in home wiring, fan installation, lighting and electrical repairs.",
    },
    {
      id: 2,
      name: "Amit Sharma",
      skill: "Plumber",
      experience: "5 years",
      rating: "4.8",
      jobs: "95+",
      location: "Nearby · 1.8 km",
      icon: "🔧",
      about:
        "Reliable plumber for bathroom repairs, pipe fitting, leakage fixes and household plumbing work.",
    },
    {
      id: 3,
      name: "Vikas Patel",
      skill: "Carpenter",
      experience: "8 years",
      rating: "4.9",
      jobs: "150+",
      location: "Nearby · 2.1 km",
      icon: "🪚",
      about:
        "Skilled carpenter experienced in furniture repair, doors, cabinets and custom woodwork.",
    },
    {
      id: 4,
      name: "Rohit Singh",
      skill: "Painter",
      experience: "4 years",
      rating: "4.7",
      jobs: "80+",
      location: "Nearby · 2.6 km",
      icon: "🎨",
      about:
        "Professional painter providing interior, exterior and finishing services for homes and shops.",
    },
    {
      id: 5,
      name: "Suresh Yadav",
      skill: "Mason",
      experience: "9 years",
      rating: "4.8",
      jobs: "180+",
      location: "Nearby · 3.0 km",
      icon: "🧱",
      about:
        "Experienced mason for renovation, brickwork, plastering, flooring and general construction work.",
    },
  ];

  const services = [
    "All",
    "Electrician",
    "Plumber",
    "Carpenter",
    "Painter",
    "Mason",
  ];

  const filteredWorkers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return workers.filter((worker) => {
      const matchesService =
        selectedService === "All" ||
        worker.skill === selectedService;

      const matchesSearch =
        !query ||
        worker.name.toLowerCase().includes(query) ||
        worker.skill.toLowerCase().includes(query) ||
        worker.location.toLowerCase().includes(query);

      return matchesService && matchesSearch;
    });
  }, [selectedService, search]);

  const openWorker = (worker) => {
    setSelectedWorker(worker);
  };

  const startBooking = () => {
    if (!selectedWorker) return;

    setBooking({
      id: `ANV-${Math.floor(100000 + Math.random() * 900000)}`,
      worker: selectedWorker,
      status: "confirmed",
    });

    setSelectedWorker(null);
  };

  const cancelBooking = () => {
    setBooking((current) =>
      current
        ? {
            ...current,
            status: "cancelled",
          }
        : null
    );

    setShowCancelConfirm(false);
  };

  const statusSteps = [
    {
      key: "confirmed",
      title: "Booking Confirmed",
      description: "Your booking request has been placed.",
      icon: "✓",
    },
    {
      key: "accepted",
      title: "Worker Accepted",
      description: "The worker has accepted your request.",
      icon: "🤝",
    },
    {
      key: "started",
      title: "Work Started",
      description: "The worker has started the service.",
      icon: "🛠️",
    },
    {
      key: "completed",
      title: "Work Completed",
      description: "Your service has been completed successfully.",
      icon: "🎉",
    },
  ];

  const getStatusIndex = () => {
    if (!booking) return -1;

    const index = statusSteps.findIndex(
      (step) => step.key === booking.status
    );

    return index;
  };

  const advanceMockStatus = () => {
    setBooking((current) => {
      if (!current) return current;

      const currentIndex = statusSteps.findIndex(
        (step) => step.key === current.status
      );

      if (
        currentIndex === -1 ||
        currentIndex === statusSteps.length - 1
      ) {
        return current;
      }

      return {
        ...current,
        status: statusSteps[currentIndex + 1].key,
      };
    });
  };

  const submitRequirement = () => {
    if (!customNeed.trim()) return;

    setRequirementSent(true);
    setCustomNeed("");
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">

      {/* TOP HEADER */}

      <header className="sticky top-0 z-40 border-b border-amber-100 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">

          <div className="flex items-center gap-3">
            <img
              src="/anvaya-logo.png"
              alt="Anvaya"
              className="h-12 w-auto object-contain sm:h-14"
            />

            <div className="hidden border-l border-slate-200 pl-3 sm:block">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Customer
              </p>

              <p className="text-sm font-semibold text-slate-700">
                Find trusted professionals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <div className="hidden rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 sm:block">
              ✓ Service available
            </div>

            <button
              onClick={onBack}
              className="group flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md active:scale-95"
            >
              <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>

              <span>Back</span>
            </button>

          </div>
        </div>
      </header>


      {/* ACTIVE BOOKING BANNER */}

      {booking && booking.status !== "cancelled" && (
        <section className="border-b border-emerald-100 bg-emerald-50/70">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                📍
              </div>

              <div>
                <p className="text-sm font-bold text-emerald-800">
                  Active booking
                </p>

                <p className="text-sm text-emerald-700">
                  {booking.worker.name} · {booking.worker.skill}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md"
            >
              Track Booking →
            </button>

          </div>
        </section>
      )}


      {/* HERO */}

      <section className="relative overflow-hidden bg-[#FFF1E6]">

        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-100/60" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-orange-100/50" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">

          <div className="max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm">
              <span>✨</span>
              <span>Trusted professionals near you</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
              What do you need
              <span className="text-amber-600"> help with?</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Discover skilled and reliable workers for your everyday needs.
              Choose a service, search nearby professionals and book with
              confidence.
            </p>

            {/* SEARCH */}

            <div className="mt-8 flex max-w-2xl items-center rounded-2xl border border-amber-100 bg-white p-2 shadow-xl">

              <span className="px-3 text-xl">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search electrician, plumber, carpenter..."
                className="w-full bg-transparent px-2 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="mr-2 rounded-lg px-2 py-1 text-sm font-bold text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  ✕
                </button>
              )}

            </div>

          </div>

        </div>
      </section>


      {/* SERVICES */}

      <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-6">

        <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
          Explore services
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Find the right professional
        </h2>

        <div className="mt-6 flex gap-3 overflow-x-auto pb-3">

          {services.map((service) => (
            <button
              key={service}
              onClick={() => setSelectedService(service)}
              className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                selectedService === service
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-200"
                  : "border border-amber-100 bg-white text-slate-600 hover:-translate-y-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
              }`}
            >
              {service}
            </button>
          ))}

        </div>
      </section>


      {/* WORKERS */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">

        <div className="mb-6 flex items-end justify-between">

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Nearby workers
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose a professional that fits your needs
            </p>
          </div>

          <span className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            {filteredWorkers.length} available
          </span>

        </div>


        {filteredWorkers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredWorkers.map((worker) => (
              <article
                key={worker.id}
                className="group rounded-3xl border border-amber-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-amber-200 hover:shadow-2xl"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1E6] text-3xl transition duration-300 group-hover:scale-110">
                    {worker.icon}
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    ● Available
                  </span>

                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {worker.name}
                </h3>

                <p className="mt-1 font-semibold text-amber-700">
                  {worker.skill}
                </p>

                <div className="mt-5 space-y-3">

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Experience
                    </span>

                    <span className="font-semibold text-slate-700">
                      {worker.experience}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Rating
                    </span>

                    <span className="font-semibold text-slate-700">
                      ⭐ {worker.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      Completed
                    </span>

                    <span className="font-semibold text-slate-700">
                      {worker.jobs}
                    </span>
                  </div>

                </div>

                <div className="mt-5 rounded-xl bg-[#FFF8F3] px-3 py-2 text-sm font-medium text-slate-600">
                  📍 {worker.location}
                </div>

                <button
                  onClick={() => openWorker(worker)}
                  className="mt-5 w-full rounded-xl bg-amber-600 px-4 py-3 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-lg"
                >
                  View & Book →
                </button>

              </article>
            ))}

          </div>
        ) : (
          <div className="rounded-3xl border border-amber-100 bg-white px-6 py-16 text-center shadow-md">

            <div className="text-5xl">
              🔎
            </div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              No workers found
            </h3>

            <p className="mt-2 text-slate-500">
              Try another service or search term.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedService("All");
              }}
              className="mt-6 rounded-xl bg-amber-600 px-6 py-3 font-bold text-white transition hover:bg-amber-700"
            >
              Reset Search
            </button>

          </div>
        )}

      </section>


      {/* TRACK BOOKING */}

      {booking && (
        <section
          id="booking-tracker"
          className="mx-auto max-w-7xl px-5 pb-12 sm:px-6"
        >

          {booking.status === "cancelled" ? (
            <div className="rounded-3xl border border-red-100 bg-white p-8 shadow-xl sm:p-10">

              <div className="mx-auto max-w-2xl text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-3xl text-red-600">
                  ✕
                </div>

                <p className="mt-6 text-sm font-bold uppercase tracking-wider text-red-600">
                  Booking Cancelled
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  Your booking has been cancelled
                </h2>

                <p className="mt-4 leading-7 text-slate-500">
                  The request for{" "}
                  <span className="font-bold text-slate-800">
                    {booking.worker.name}
                  </span>{" "}
                  is no longer active.
                </p>

                <button
                  onClick={() => setBooking(null)}
                  className="mt-7 rounded-xl bg-amber-600 px-6 py-3 font-bold text-white transition hover:bg-amber-700"
                >
                  Find Another Worker
                </button>

              </div>

            </div>
          ) : (
            <div className="rounded-3xl border border-amber-100 bg-white p-7 shadow-xl sm:p-10">

              <div className="flex flex-col gap-5 border-b border-slate-100 pb-7 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                    Booking tracker
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                    Track your service
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Booking ID:{" "}
                    <span className="font-bold text-slate-700">
                      {booking.id}
                    </span>
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-50 px-5 py-3 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    Current status
                  </p>

                  <p className="mt-1 font-bold text-emerald-800">
                    {
                      statusSteps.find(
                        (step) => step.key === booking.status
                      )?.title
                    }
                  </p>
                </div>

              </div>


              {/* WORKER SUMMARY */}

              <div className="mt-7 flex flex-col gap-5 rounded-2xl bg-[#FFF8F3] p-5 sm:flex-row sm:items-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                  {booking.worker.icon}
                </div>

                <div className="flex-1">
                  <p className="text-lg font-bold text-slate-900">
                    {booking.worker.name}
                  </p>

                  <p className="mt-1 font-semibold text-amber-700">
                    {booking.worker.skill}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    ⭐ {booking.worker.rating} ·{" "}
                    {booking.worker.experience} ·{" "}
                    {booking.worker.location}
                  </p>
                </div>

                {booking.status !== "completed" && (
                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
                  >
                    Cancel Booking
                  </button>
                )}

              </div>


              {/* STATUS STEPS */}

              <div className="mt-8">

                {statusSteps.map((step, index) => {
                  const activeIndex = getStatusIndex();
                  const isComplete = index <= activeIndex;
                  const isCurrent = index === activeIndex;

                  return (
                    <div
                      key={step.key}
                      className="relative flex gap-4 pb-7 last:pb-0"
                    >

                      {index < statusSteps.length - 1 && (
                        <div
                          className={`absolute left-5 top-11 h-[calc(100%-20px)] w-0.5 ${
                            index < activeIndex
                              ? "bg-emerald-400"
                              : "bg-slate-200"
                          }`}
                        />
                      )}

                      <div
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          isComplete
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-100"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {isComplete ? "✓" : index + 1}
                      </div>

                      <div className="pt-1">

                        <p
                          className={`font-bold ${
                            isCurrent
                              ? "text-emerald-700"
                              : isComplete
                              ? "text-slate-800"
                              : "text-slate-400"
                          }`}
                        >
                          {step.icon} {step.title}
                        </p>

                        <p
                          className={`mt-1 text-sm leading-6 ${
                            isComplete
                              ? "text-slate-500"
                              : "text-slate-400"
                          }`}
                        >
                          {step.description}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>


              {/* MOCK STATUS CONTROL */}

              {booking.status !== "completed" && (
                <div className="mt-8 rounded-2xl border border-dashed border-amber-200 bg-amber-50/60 p-5">

                  <p className="text-sm font-bold text-amber-800">
                    Demo booking simulation
                  </p>

                  <p className="mt-1 text-xs leading-5 text-amber-700">
                    This uses mock data for Day 3. Later this control will be
                    replaced by real backend status updates.
                  </p>

                  <button
                    onClick={advanceMockStatus}
                    className="mt-4 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    Move to Next Status →
                  </button>

                </div>
              )}

              {booking.status === "completed" && (
                <div className="mt-8 rounded-2xl bg-emerald-50 p-5 text-center">

                  <p className="text-lg font-bold text-emerald-800">
                    🎉 Service completed successfully!
                  </p>

                  <p className="mt-1 text-sm text-emerald-700">
                    Thank you for using Anvaya.
                  </p>

                </div>
              )}

            </div>
          )}

        </section>
      )}


      {/* CUSTOM REQUIREMENT */}

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-6">

        <div className="rounded-3xl border border-amber-100 bg-white p-7 shadow-lg sm:p-9">

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            <div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                ✍️
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                Can't find exactly what you need?
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                Describe your requirement and send it to Anvaya. This will
                later connect with the real worker-matching service.
              </p>

            </div>

            <div>

              {!requirementSent ? (
                <>
                  <textarea
                    value={customNeed}
                    onChange={(e) => setCustomNeed(e.target.value)}
                    rows="4"
                    placeholder="Example: I need an electrician to install two ceiling fans..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-[#FFFDFC] px-5 py-4 text-sm leading-6 text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                  />

                  <button
                    onClick={submitRequirement}
                    disabled={!customNeed.trim()}
                    className="mt-4 rounded-xl bg-slate-800 px-6 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-slate-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Submit Requirement →
                  </button>
                </>
              ) : (
                <div className="rounded-2xl bg-emerald-50 p-6">

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl text-emerald-600 shadow-sm">
                      ✓
                    </div>

                    <div>
                      <h3 className="font-bold text-emerald-800">
                        Requirement submitted
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-emerald-700">
                        Your requirement has been recorded successfully.
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={() => setRequirementSent(false)}
                    className="mt-5 text-sm font-bold text-emerald-700 underline underline-offset-4"
                  >
                    Submit another requirement
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>

      </section>


      {/* WORKER DETAILS MODAL */}

      {selectedWorker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-5 py-8 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-amber-100 bg-white p-7 shadow-2xl sm:p-8">

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1E6] text-3xl">
                  {selectedWorker.icon}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {selectedWorker.name}
                  </h2>

                  <p className="mt-1 font-semibold text-amber-700">
                    {selectedWorker.skill}
                  </p>
                </div>

              </div>

              <button
                onClick={() => setSelectedWorker(null)}
                className="rounded-xl bg-slate-100 px-3 py-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
              >
                ✕
              </button>

            </div>


            <div className="mt-7 grid grid-cols-3 gap-3">

              <div className="rounded-2xl bg-[#FFF8F3] p-4 text-center">
                <p className="text-lg font-bold text-slate-900">
                  ⭐ {selectedWorker.rating}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Rating
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFF8F3] p-4 text-center">
                <p className="text-lg font-bold text-slate-900">
                  {selectedWorker.experience}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Experience
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFF8F3] p-4 text-center">
                <p className="text-lg font-bold text-slate-900">
                  {selectedWorker.jobs}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Jobs
                </p>
              </div>

            </div>


            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">

              <p className="text-sm font-bold text-emerald-800">
                ● Available for work
              </p>

              <p className="mt-1 text-sm text-emerald-700">
                📍 {selectedWorker.location}
              </p>

            </div>


            <div className="mt-6">

              <h3 className="font-bold text-slate-900">
                About this professional
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                {selectedWorker.about}
              </p>

            </div>


            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => setSelectedWorker(null)}
                className="flex-1 rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Go Back
              </button>

              <button
                onClick={startBooking}
                className="flex-1 rounded-xl bg-amber-600 px-5 py-3 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-lg"
              >
                Book Worker →
              </button>

            </div>

          </div>
        </div>
      )}


      {/* CANCEL CONFIRMATION */}

      {showCancelConfirm && booking && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 px-5 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-3xl">
              ⚠️
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Cancel this booking?
            </h2>

            <p className="mt-3 leading-7 text-slate-500">
              Are you sure you want to cancel your booking with{" "}
              <span className="font-bold text-slate-800">
                {booking.worker.name}
              </span>
              ?
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Keep Booking
              </button>

              <button
                onClick={cancelBooking}
                className="flex-1 rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700"
              >
                Yes, Cancel
              </button>

            </div>

          </div>
        </div>
      )}


      {/* FOOTER */}

      <footer className="border-t border-amber-100 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-8 text-center sm:px-6">

          <p className="text-sm text-slate-400">
            Trusted workers. Better connections. Stronger communities.
          </p>

          <p className="mt-2 text-xs text-slate-400">
            © 2026 Anvaya · Connecting people with skilled professionals
          </p>

        </div>

      </footer>

    </main>
  );
}

export default CustomerProfile;