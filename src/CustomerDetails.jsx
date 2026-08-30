// // import { useState } from "react";

// // function CustomerDetails({ onContinue, onBack }) {
// //   const [form, setForm] = useState({
// //     name: "",
// //     phone: "",
// //     location: "",
// //     need: "",
// //   });

// //   const [saved, setSaved] = useState(false);

// //   const handleChange = (e) => {
// //     setForm({
// //       ...form,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (!form.name || !form.phone || !form.location || !form.need) {
// //       return;
// //     }

// //     setSaved(true);

// //     setTimeout(() => {
// //       onContinue();
// //     }, 2200);
// //   };

// //   return (
// //     <main className="min-h-screen bg-[#FFF8F3] px-5 py-8 text-slate-800">

// //       {/* TOP */}
// //       <div className="mx-auto flex max-w-6xl items-center justify-between">

// //         <button
// //           onClick={onBack}
// //           className="group flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
// //         >
// //           <span className="text-lg transition duration-300 group-hover:-translate-x-1">
// //             ←
// //           </span>
// //           <span>Back</span>
// //         </button>

// //         <div className="flex items-center gap-3">
// //           <img
// //             src="/anvaya-logo.png"
// //             alt="Anvaya"
// //             className="h-10 w-auto object-contain"
// //           />

// //           <div className="hidden sm:block">
// //             <p className="text-sm font-bold text-amber-700">
// //               ANVAYA
// //             </p>
// //             <p className="text-xs text-slate-400">
// //               Customer
// //             </p>
// //           </div>
// //         </div>

// //       </div>


// //       {/* MAIN */}
// //       <div className="mx-auto mt-8 grid max-w-6xl items-center gap-8 lg:grid-cols-2">


// //         {/* LEFT */}

// //         <section className="px-2 lg:px-5">

// //           <div className="mb-5 inline-block rounded-full border border-amber-200 bg-white px-4 py-2 shadow-sm">
// //             <span className="text-xs font-bold uppercase tracking-wide text-amber-700">
// //               Welcome to Anvaya
// //             </span>
// //           </div>

// //           <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">

// //             Let's make your
// //             <br />

// //             <span className="text-amber-700">
// //               Anvaya experience
// //             </span>

// //             <br />

// //             personal.

// //           </h1>

// //           <p className="mt-6 max-w-lg text-lg leading-8 text-slate-500">
// //             Tell us a little about yourself and what kind of help
// //             you're looking for. We'll connect you with the right
// //             people.
// //           </p>


// //           {/* BENEFITS */}

// //           <div className="mt-8 space-y-4">

// //             <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
// //               <h3 className="font-bold text-slate-800">
// //                 Find workers nearby
// //               </h3>

// //               <p className="mt-2 text-sm leading-6 text-slate-500">
// //                 Discover trusted skilled workers around your location.
// //               </p>
// //             </div>


// //             <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
// //               <h3 className="font-bold text-slate-800">
// //                 Get personalized recommendations
// //               </h3>

// //               <p className="mt-2 text-sm leading-6 text-slate-500">
// //                 Your details help us understand what you need.
// //               </p>
// //             </div>


// //             <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
// //               <h3 className="font-bold text-slate-800">
// //                 Simple and secure
// //               </h3>

// //               <p className="mt-2 text-sm leading-6 text-slate-500">
// //                 Your information stays protected.
// //               </p>
// //             </div>

// //           </div>

// //         </section>


// //         {/* RIGHT */}

// //         <section className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-xl">

// //           {!saved ? (

// //             <form onSubmit={handleSubmit}>

// //               {/* FORM HEADER */}

// //               <div className="border-b border-amber-100 bg-[#FFFDF9] px-7 py-7 sm:px-9">

// //                 <p className="mb-3 text-sm font-bold text-amber-700">
// //                   Personal details
// //                 </p>

// //                 <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
// //                   Tell us about yourself
// //                 </h2>

// //                 <p className="mt-3 text-sm leading-6 text-slate-500">
// //                   A few simple details will help us create your
// //                   personalized Anvaya experience.
// //                 </p>

// //               </div>


// //               {/* FORM BODY */}

// //               <div className="px-7 py-8 sm:px-9">


// //                 {/* NAME */}

// //                 <div className="mb-5">

// //                   <label
// //                     htmlFor="name"
// //                     className="mb-2 block text-sm font-semibold text-slate-700"
// //                   >
// //                     Full Name
// //                   </label>

// //                   <input
// //                     id="name"
// //                     name="name"
// //                     type="text"
// //                     value={form.name}
// //                     onChange={handleChange}
// //                     placeholder="Enter your full name"
// //                     className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
// //                   />

// //                 </div>


// //                 {/* PHONE */}

// //                 <div className="mb-5">

// //                   <label
// //                     htmlFor="phone"
// //                     className="mb-2 block text-sm font-semibold text-slate-700"
// //                   >
// //                     Phone Number
// //                   </label>

// //                   <input
// //                     id="phone"
// //                     name="phone"
// //                     type="tel"
// //                     value={form.phone}
// //                     onChange={handleChange}
// //                     placeholder="Enter your phone number"
// //                     className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
// //                   />

// //                 </div>


// //                 {/* LOCATION */}

// //                 <div className="mb-5">

// //                   <label
// //                     htmlFor="location"
// //                     className="mb-2 block text-sm font-semibold text-slate-700"
// //                   >
// //                     Your Location
// //                   </label>

// //                   <input
// //                     id="location"
// //                     name="location"
// //                     type="text"
// //                     value={form.location}
// //                     onChange={handleChange}
// //                     placeholder="City, area or locality"
// //                     className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
// //                   />

// //                 </div>


// //                 {/* NEED */}

// //                 <div className="mb-6">

// //                   <label
// //                     htmlFor="need"
// //                     className="mb-2 block text-sm font-semibold text-slate-700"
// //                   >
// //                     What do you need help with?
// //                   </label>

// //                   <textarea
// //                     id="need"
// //                     name="need"
// //                     rows="4"
// //                     value={form.need}
// //                     onChange={handleChange}
// //                     placeholder="Example: I need an electrician to repair a switch..."
// //                     className="w-full resize-none rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
// //                   />

// //                 </div>


// //                 {/* SAVE */}

// //                 <button
// //                   type="submit"
// //                   className="group flex w-full items-center justify-center gap-3 rounded-xl bg-amber-600 px-6 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl active:translate-y-0"
// //                 >
// //                   <span>
// //                     Save & Continue
// //                   </span>

// //                   <span className="transition duration-300 group-hover:translate-x-2">
// //                     →
// //                   </span>
// //                 </button>


// //                 <p className="mt-4 text-center text-xs text-slate-400">
// //                   Your information stays protected.
// //                 </p>

// //               </div>

// //             </form>


// //           ) : (

// //             /* SUCCESS */

// //             <div className="flex min-h-[650px] flex-col items-center justify-center px-7 py-12 text-center">

// //               <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl font-bold text-emerald-600 shadow-lg shadow-emerald-100">
// //                 ✓
// //               </div>

// //               <p className="mt-8 text-sm font-bold uppercase tracking-wide text-emerald-600">
// //                 Profile Saved Successfully
// //               </p>

// //               <h2 className="mt-3 text-3xl font-bold text-slate-900">
// //                 Welcome to Anvaya! 🎉
// //               </h2>

// //               <p className="mt-4 max-w-md text-base leading-7 text-slate-500">
// //                 Your details have been saved successfully.
// //                 We are preparing your personalized experience.
// //               </p>

// //               <div className="mt-7 rounded-full border border-emerald-100 bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-700">
// //                 ✓ Login Successful
// //               </div>

// //               <p className="mt-7 text-xs text-slate-400">
// //                 Opening your customer profile...
// //               </p>

// //             </div>

// //           )}

// //         </section>

// //       </div>

// //     </main>
// //   );
// // }

// // export default CustomerDetails;
// import { useState } from "react";
// import { customerDummyData } from "./dummyData";

// function CustomerDetails({ onContinue, onBack }) {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     location: "",
//     preferredService: "",
//     description: "",
//   });

//   const [saved, setSaved] = useState(false);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };
// const handleSubmit = (e) => {
//   e.preventDefault();

//   if (
//     !form.name ||
//     !form.phone ||
//     !form.location ||
//     !form.preferredService
//   ) {
//     return;
//   }

//   const customerData = {
//     ...customerDummyData,
//     ...form,
//   };

//   console.log("Customer data submitted:", customerData);

//   setSaved(true);

//   setTimeout(() => {
//     onContinue();
//   }, 1800);
// };
  
//     setSaved(true);

//     setTimeout(() => {
//       onContinue();
//     }, 1800);
//   };

//   return (
//     <main className="min-h-screen bg-[#FFF8F3] px-5 py-7 text-slate-800 sm:px-8">

//       {/* BACK BUTTON */}

//       <button
//         onClick={onBack}
//         className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-md transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-lg"
//       >
//         <span className="text-lg">←</span>
//         <span>Back</span>
//       </button>


//       <div className="mx-auto max-w-6xl pt-12">

//         {/* HEADER */}

//         <div className="mb-8 text-center">

//           <img
//             src="/anvaya-logo.png"
//             alt="Anvaya"
//             className="mx-auto h-20 w-auto object-contain"
//           />

//           <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
//             Customer Profile
//           </p>

//           <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
//             Let's get to know you
//           </h1>

//           <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
//             Tell us a little about yourself so Anvaya can help you find the
//             right skilled professional.
//           </p>

//         </div>


//         {/* CONTENT */}

//         <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">


//           {/* LEFT INFORMATION */}

//           <section className="rounded-3xl border border-amber-100 bg-white p-7 shadow-lg sm:p-8">

//             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
//               👤
//             </div>

//             <h2 className="mt-6 text-2xl font-bold text-slate-900">
//               Find the right help
//             </h2>

//             <p className="mt-3 leading-7 text-slate-500">
//               Your information helps us understand what you need and connect
//               you with suitable workers in your area.
//             </p>


//             <div className="mt-7 space-y-4">

//               <div className="rounded-2xl border border-amber-100 bg-[#FFF8F3] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">

//                 <div className="flex items-center gap-3">

//                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-lg">
//                     📍
//                   </div>

//                   <div>
//                     <h3 className="font-bold text-slate-800">
//                       Nearby professionals
//                     </h3>

//                     <p className="mt-1 text-sm leading-5 text-slate-500">
//                       Find skilled workers around your location.
//                     </p>
//                   </div>

//                 </div>

//               </div>


//               <div className="rounded-2xl border border-orange-100 bg-[#FFF9F5] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">

//                 <div className="flex items-center gap-3">

//                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-lg">
//                     🛠️
//                   </div>

//                   <div>
//                     <h3 className="font-bold text-slate-800">
//                       Choose your service
//                     </h3>

//                     <p className="mt-1 text-sm leading-5 text-slate-500">
//                       Tell us what kind of help you need.
//                     </p>
//                   </div>

//                 </div>

//               </div>


//               <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">

//                 <div className="flex items-center gap-3">

//                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-lg">
//                     ✓
//                   </div>

//                   <div>
//                     <h3 className="font-bold text-slate-800">
//                       Simple & secure
//                     </h3>

//                     <p className="mt-1 text-sm leading-5 text-slate-500">
//                       Your details help create a better experience.
//                     </p>
//                   </div>

//                 </div>

//               </div>

//             </div>

//           </section>


//           {/* FORM */}

//           <section className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-xl">

//             {!saved ? (

//               <form onSubmit={handleSubmit}>

//                 {/* FORM HEADER */}

//                 <div className="border-b border-amber-100 bg-[#FFFDF9] px-7 py-7 sm:px-9">

//                   <p className="text-sm font-bold uppercase tracking-wide text-amber-700">
//                     Personal details
//                   </p>

//                   <h2 className="mt-2 text-2xl font-bold text-slate-900">
//                     Tell us about yourself
//                   </h2>

//                   <p className="mt-2 text-sm leading-6 text-slate-500">
//                     Please provide a few details before continuing.
//                   </p>

//                 </div>


//                 {/* FORM BODY */}

//                 <div className="px-7 py-8 sm:px-9">

//                   {/* NAME */}

//                   <div className="mb-5">

//                     <label
//                       htmlFor="name"
//                       className="mb-2 block text-sm font-semibold text-slate-700"
//                     >
//                       Full Name
//                     </label>

//                     <input
//                       id="name"
//                       name="name"
//                       type="text"
//                       value={form.name}
//                       onChange={handleChange}
//                       placeholder="Enter your full name"
//                       className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
//                     />

//                   </div>


//                   {/* PHONE */}

//                   <div className="mb-5">

//                     <label
//                       htmlFor="phone"
//                       className="mb-2 block text-sm font-semibold text-slate-700"
//                     >
//                       Phone Number
//                     </label>

//                     <input
//                       id="phone"
//                       name="phone"
//                       type="tel"
//                       value={form.phone}
//                       onChange={handleChange}
//                       placeholder="Enter your phone number"
//                       className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
//                     />

//                   </div>


//                   {/* LOCATION */}

//                   <div className="mb-5">

//                     <label
//                       htmlFor="location"
//                       className="mb-2 block text-sm font-semibold text-slate-700"
//                     >
//                       Your Location
//                     </label>

//                     <input
//                       id="location"
//                       name="location"
//                       type="text"
//                       value={form.location}
//                       onChange={handleChange}
//                       placeholder="Enter your area or city"
//                       className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
//                     />

//                   </div>


//                   {/* SERVICE */}

//                   <div className="mb-5">

//                     <label
//                       htmlFor="preferredService"
//                       className="mb-2 block text-sm font-semibold text-slate-700"
//                     >
//                       What service do you need?
//                     </label>

//                     <select
//                       id="preferredService"
//                       name="preferredService"
//                       value={form.preferredService}
//                       onChange={handleChange}
//                       className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
//                     >
//                       <option value="">
//                         Select a service
//                       </option>

//                       <option value="Electrician">
//                         Electrician
//                       </option>

//                       <option value="Plumber">
//                         Plumber
//                       </option>

//                       <option value="Carpenter">
//                         Carpenter
//                       </option>

//                       <option value="Painter">
//                         Painter
//                       </option>

//                       <option value="Mason">
//                         Mason
//                       </option>

//                       <option value="Other">
//                         Other
//                       </option>

//                     </select>

//                   </div>


//                   {/* DESCRIPTION */}

//                   <div>

//                     <label
//                       htmlFor="description"
//                       className="mb-2 block text-sm font-semibold text-slate-700"
//                     >
//                       Describe what you need
//                     </label>

//                     <textarea
//                       id="description"
//                       name="description"
//                       rows="3"
//                       value={form.description}
//                       onChange={handleChange}
//                       placeholder="Briefly describe the work you need..."
//                       className="w-full resize-none rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
//                     />

//                   </div>


//                   {/* SAVE BUTTON */}

//                   <button
//                     type="submit"
//                     className="group mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-amber-600 px-6 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl active:translate-y-0"
//                   >

//                     <span>
//                       Save & Continue
//                     </span>

//                     <span className="transition duration-300 group-hover:translate-x-2">
//                       →
//                     </span>

//                   </button>


//                   <p className="mt-4 text-center text-xs text-slate-400">
//                     Your information helps us personalize your experience.
//                   </p>

//                 </div>

//               </form>

//             ) : (

//               /* SUCCESS MESSAGE */

//               <div className="flex min-h-[650px] flex-col items-center justify-center px-7 py-12 text-center">

//                 <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl font-bold text-emerald-600 shadow-lg shadow-emerald-100">
//                   ✓
//                 </div>

//                 <p className="mt-8 text-sm font-bold uppercase tracking-[0.12em] text-emerald-600">
//                   Details Saved Successfully
//                 </p>

//                 <h2 className="mt-3 text-3xl font-bold text-slate-900">
//                   Welcome to Anvaya! 🎉
//                 </h2>

//                 <p className="mt-4 max-w-md text-base leading-7 text-slate-500">
//                   Your details have been saved successfully. We're preparing
//                   your personalized Anvaya experience.
//                 </p>

//                 <div className="mt-7 rounded-full bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-700">
//                   ✓ Login successful
//                 </div>

//                 <p className="mt-6 text-sm font-medium text-slate-400">
//                   Finding the best experience for you...
//                 </p>

//               </div>

//             )}

//           </section>

//         </div>


//         {/* FOOTER */}

//         <p className="py-8 text-center text-sm text-slate-400">
//           Trusted workers. Better connections. Stronger communities.
//         </p>

//       </div>

//     </main>
//   );


// export default CustomerDetails;
import { useState } from "react";
import { customerDummyData } from "./dummyData";

function CustomerDetails({ onContinue, onBack }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    preferredService: "",
    description: "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.location ||
      !form.preferredService
    ) {
      alert("Please fill all required details.");
      return;
    }

    const customerData = {
      ...customerDummyData,
      ...form,
    };

    console.log("Customer data submitted:", customerData);

    setSaved(true);

    setTimeout(() => {
      onContinue();
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3] px-5 py-7 text-slate-800 sm:px-8">

      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-md transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-lg"
      >
        <span className="text-lg">←</span>
        <span>Back</span>
      </button>

      <div className="mx-auto max-w-6xl pt-12">

        {/* Header */}
        <div className="mb-8 text-center">

          <img
            src="/anvaya-logo.png"
            alt="Anvaya"
            className="mx-auto h-20 w-auto object-contain"
          />

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
            Customer Profile
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Let's get to know you
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Tell us a little about yourself so Anvaya can help you find the
            right skilled professional.
          </p>

        </div>

        {/* Main Content */}
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">

          {/* Left Information Card */}
          <section className="rounded-3xl border border-amber-100 bg-white p-7 shadow-lg sm:p-8">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
              👤
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Find the right help
            </h2>

            <p className="mt-3 leading-7 text-slate-500">
              Your information helps us understand what you need and connect
              you with suitable workers in your area.
            </p>

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl border border-amber-100 bg-[#FFF8F3] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-lg">
                    📍
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      Nearby professionals
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      Find skilled workers around your location.
                    </p>
                  </div>

                </div>
              </div>

              <div className="rounded-2xl border border-orange-100 bg-[#FFF9F5] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-lg">
                    🛠️
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      Choose your service
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      Tell us what kind of help you need.
                    </p>
                  </div>

                </div>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-lg">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800">
                      Simple & secure
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      Your details help create a better experience.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* Form Card */}
          <section className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-xl">

            {!saved ? (

              <form onSubmit={handleSubmit}>

                {/* Form Header */}
                <div className="border-b border-amber-100 bg-[#FFFDF9] px-7 py-7 sm:px-9">

                  <p className="text-sm font-bold uppercase tracking-wide text-amber-700">
                    Personal details
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    Tell us about yourself
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Please provide a few details before continuing.
                  </p>

                </div>

                {/* Form Body */}
                <div className="px-7 py-8 sm:px-9">

                  {/* Name */}
                  <div className="mb-5">
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-5">
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    />
                  </div>

                  {/* Location */}
                  <div className="mb-5">
                    <label
                      htmlFor="location"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Your Location
                    </label>

                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="Enter your area or city"
                      className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    />
                  </div>

                  {/* Service */}
                  <div className="mb-5">
                    <label
                      htmlFor="preferredService"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      What service do you need?
                    </label>

                    <select
                      id="preferredService"
                      name="preferredService"
                      value={form.preferredService}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    >
                      <option value="">
                        Select a service
                      </option>

                      <option value="Electrician">
                        Electrician
                      </option>

                      <option value="Plumber">
                        Plumber
                      </option>

                      <option value="Carpenter">
                        Carpenter
                      </option>

                      <option value="Painter">
                        Painter
                      </option>

                      <option value="Mason">
                        Mason
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Describe what you need
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Briefly describe the work you need..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    />
                  </div>

                  {/* Save Button */}
                  <button
                    type="submit"
                    className="group mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-amber-600 px-6 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl active:translate-y-0"
                  >
                    <span>Save & Continue</span>

                    <span className="transition duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </button>

                  <p className="mt-4 text-center text-xs text-slate-400">
                    Your information helps us personalize your experience.
                  </p>

                </div>
              </form>

            ) : (

              /* Success Screen */
              <div className="flex min-h-[650px] flex-col items-center justify-center px-7 py-12 text-center">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl font-bold text-emerald-600 shadow-lg shadow-emerald-100">
                  ✓
                </div>

                <p className="mt-8 text-sm font-bold uppercase tracking-[0.12em] text-emerald-600">
                  Details Saved Successfully
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  Welcome to Anvaya! 🎉
                </h2>

                <p className="mt-4 max-w-md text-base leading-7 text-slate-500">
                  Your details have been saved successfully. We're preparing
                  your personalized Anvaya experience.
                </p>

                <div className="mt-7 rounded-full bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-700">
                  ✓ Login successful
                </div>

                <p className="mt-6 text-sm font-medium text-slate-400">
                  Taking you to your customer profile...
                </p>

              </div>
            )}

          </section>

        </div>

        {/* Footer */}
        <p className="py-8 text-center text-sm text-slate-400">
          Trusted workers. Better connections. Stronger communities.
        </p>

      </div>
    </main>
  );
}

export default CustomerDetails;