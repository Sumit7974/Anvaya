// import { useState } from "react";

// function WorkerProfile({ onBack }) {
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     skill: "",
//     experience: "",
//     location: "",
//     about: "",
//   });

//   const [saved, setSaved] = useState(false);
//   const [available, setAvailable] = useState(true);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       !form.name ||
//       !form.phone ||
//       !form.skill ||
//       !form.experience ||
//       !form.location
//     ) {
//       return;
//     }

//     setSaved(true);
//   };

//   return (
//     <main className="min-h-screen bg-[#FFF8F3] px-5 py-7 text-slate-800 sm:px-8">

//       {/* BACK BUTTON */}
//       <button
//         onClick={onBack}
//         className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-md transition duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-lg"
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
//             Worker Profile
//           </p>

//           <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
//             Build your professional profile
//           </h1>

//           <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
//             Tell customers about your skills, experience and availability.
//             A complete profile helps you connect with the right opportunities.
//           </p>

//         </div>

//         {/* MAIN CONTENT */}
//         <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">

//           {/* LEFT CARD */}
//           <section className="rounded-3xl border border-amber-100 bg-white p-7 shadow-lg sm:p-8">

//             <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
//               👷
//             </div>

//             <h2 className="mt-6 text-2xl font-bold text-slate-900">
//               Welcome, skilled professional
//             </h2>

//             <p className="mt-3 leading-7 text-slate-500">
//               Your profile is your introduction to customers. Add accurate
//               details so people can understand your services and experience.
//             </p>

//             <div className="mt-7 space-y-4">

//               <div className="rounded-2xl border border-amber-100 bg-[#FFF8F3] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
//                 <h3 className="font-bold text-slate-800">
//                   Showcase your skills
//                 </h3>

//                 <p className="mt-1 text-sm leading-6 text-slate-500">
//                   Let customers know exactly what services you provide.
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-orange-100 bg-[#FFF9F5] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
//                 <h3 className="font-bold text-slate-800">
//                   Get discovered nearby
//                 </h3>

//                 <p className="mt-1 text-sm leading-6 text-slate-500">
//                   Your location helps customers find suitable workers nearby.
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
//                 <h3 className="font-bold text-slate-800">
//                   Control your availability
//                 </h3>

//                 <p className="mt-1 text-sm leading-6 text-slate-500">
//                   Turn your availability on or off whenever you need.
//                 </p>
//               </div>

//             </div>
//           </section>

//           {/* FORM */}
//           <section className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-xl">

//             {!saved ? (

//               <form onSubmit={handleSubmit}>

//                 <div className="border-b border-amber-100 bg-[#FFFDF9] px-7 py-7 sm:px-9">

//                   <p className="text-sm font-bold uppercase tracking-wide text-amber-700">
//                     Personal details
//                   </p>

//                   <h2 className="mt-2 text-2xl font-bold text-slate-900">
//                     Tell us about yourself
//                   </h2>

//                   <p className="mt-2 text-sm leading-6 text-slate-500">
//                     Fill in your details to create your worker profile.
//                   </p>

//                 </div>

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

//                   {/* SKILL */}
//                   <div className="mb-5">

//                     <label
//                       htmlFor="skill"
//                       className="mb-2 block text-sm font-semibold text-slate-700"
//                     >
//                       Primary Skill
//                     </label>

//                     <select
//                       id="skill"
//                       name="skill"
//                       value={form.skill}
//                       onChange={handleChange}
//                       className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
//                     >
//                       <option value="">Select your skill</option>
//                       <option value="Electrician">Electrician</option>
//                       <option value="Plumber">Plumber</option>
//                       <option value="Carpenter">Carpenter</option>
//                       <option value="Painter">Painter</option>
//                       <option value="Mason">Mason</option>
//                       <option value="Other">Other</option>
//                     </select>

//                   </div>

//                   {/* EXPERIENCE + LOCATION */}
//                   <div className="grid gap-5 sm:grid-cols-2">

//                     <div>

//                       <label
//                         htmlFor="experience"
//                         className="mb-2 block text-sm font-semibold text-slate-700"
//                       >
//                         Experience
//                       </label>

//                       <select
//                         id="experience"
//                         name="experience"
//                         value={form.experience}
//                         onChange={handleChange}
//                         className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
//                       >
//                         <option value="">Years</option>
//                         <option value="Less than 1 year">
//                           Less than 1 year
//                         </option>
//                         <option value="1-3 years">1-3 years</option>
//                         <option value="3-5 years">3-5 years</option>
//                         <option value="5+ years">5+ years</option>
//                       </select>

//                     </div>

//                     <div>

//                       <label
//                         htmlFor="location"
//                         className="mb-2 block text-sm font-semibold text-slate-700"
//                       >
//                         Location
//                       </label>

//                       <input
//                         id="location"
//                         name="location"
//                         type="text"
//                         value={form.location}
//                         onChange={handleChange}
//                         placeholder="Your area"
//                         className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
//                       />

//                     </div>

//                   </div>

//                   {/* ABOUT */}
//                   <div className="mt-5">

//                     <label
//                       htmlFor="about"
//                       className="mb-2 block text-sm font-semibold text-slate-700"
//                     >
//                       About Your Work
//                     </label>

//                     <textarea
//                       id="about"
//                       name="about"
//                       rows="3"
//                       value={form.about}
//                       onChange={handleChange}
//                       placeholder="Tell customers briefly about your work and experience..."
//                       className="w-full resize-none rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
//                     />

//                   </div>

//                   {/* AVAILABILITY */}
//                   <div className="mt-6 flex items-center justify-between rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">

//                     <div>

//                       <p className="text-sm font-bold text-slate-800">
//                         Become available
//                       </p>

//                       <p className="mt-1 text-xs leading-5 text-slate-500">
//                         Let customers know when you are ready for work.
//                       </p>

//                     </div>

//                     <button
//                       type="button"
//                       onClick={() => setAvailable(!available)}
//                       className={`relative h-7 w-12 rounded-full transition duration-300 ${
//                         available ? "bg-emerald-500" : "bg-slate-300"
//                       }`}
//                     >

//                       <span
//                         className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition duration-300 ${
//                           available ? "left-6" : "left-1"
//                         }`}
//                       />

//                     </button>

//                   </div>

//                   {/* SAVE BUTTON */}
//                   <button
//                     type="submit"
//                     className="group mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-amber-600 px-6 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl active:translate-y-0"
//                   >
//                     <span>Save My Profile</span>

//                     <span className="transition duration-300 group-hover:translate-x-2">
//                       →
//                     </span>
//                   </button>

//                   <p className="mt-4 text-center text-xs text-slate-400">
//                     You can update your profile details later.
//                   </p>

//                 </div>

//               </form>

//             ) : (

//               /* SUCCESS SCREEN */

//               <div className="flex min-h-[650px] flex-col items-center justify-center px-7 py-12 text-center">

//                 <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl font-bold text-emerald-600 shadow-lg shadow-emerald-100">
//                   ✓
//                 </div>

//                 <p className="mt-8 text-sm font-bold uppercase tracking-[0.12em] text-emerald-600">
//                   Profile Saved Successfully
//                 </p>

//                 <h2 className="mt-3 text-3xl font-bold text-slate-900">
//                   You're ready to get started! 🎉
//                 </h2>

//                 <p className="mt-4 max-w-md text-base leading-7 text-slate-500">
//                   Your worker profile has been created successfully.
//                   Customers can now discover your skills and services.
//                 </p>

//                 <div className="mt-7 rounded-full bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-700">
//                   ✓ You're now available for work
//                 </div>

//                 <p className="mt-7 text-xs text-slate-400">
//                   Your profile is ready on Anvaya.
//                 </p>

//               </div>

//             )}

//           </section>

//         </div>

//         <p className="py-8 text-center text-sm text-slate-400">
//           Trusted workers. Better connections. Stronger communities.
//         </p>

//       </div>

//     </main>
//   );
// }

// export default WorkerProfile;
import { useState } from "react";

function WorkerProfile({ onBack }) {
  const [form, setForm] = useState(() => {
    try {
      const savedWorker = localStorage.getItem("anvayaWorker");

      if (savedWorker) {
        const parsed = JSON.parse(savedWorker);

        return {
          name: parsed.name || "",
          phone: parsed.phone || "",
          skill: parsed.skill || "",
          experience: parsed.experience || "",
          location: parsed.location || "",
          about: parsed.about || "",
        };
      }
    } catch {
      // Use empty form if saved data cannot be read
    }

    return {
      name: "",
      phone: "",
      skill: "",
      experience: "",
      location: "",
      about: "",
    };
  });

  const [saved, setSaved] = useState(false);

  const [available, setAvailable] = useState(() => {
    try {
      return localStorage.getItem("anvayaWorkerAvailable") === "true";
    } catch {
      return false;
    }
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((previousForm) => ({
      ...previousForm,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleAvailability = () => {
    setAvailable((previous) => {
      const newValue = !previous;

      localStorage.setItem(
        "anvayaWorkerAvailable",
        String(newValue)
      );

      return newValue;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.skill ||
      !form.experience ||
      !form.location.trim()
    ) {
      setError(
        "Please complete all required details before saving your profile."
      );
      return;
    }

    if (form.phone.trim().length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    const workerData = {
      ...form,
      available,
    };

    localStorage.setItem(
      "anvayaWorker",
      JSON.stringify(workerData)
    );

    localStorage.setItem(
      "anvayaWorkerAvailable",
      String(available)
    );

    setError("");
    setSaved(true);
  };

  return (
    <main className="min-h-screen bg-[#FFF8F3] px-5 py-7 text-slate-800 sm:px-8">

      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="fixed right-5 top-5 z-50 flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-md transition duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-lg"
      >
        <span className="text-lg">←</span>
        <span>Back</span>
      </button>

      <div className="mx-auto max-w-6xl pt-12">

        {/* HEADER */}
        <div className="mb-8 text-center">

          <img
            src="/anvaya-logo.png"
            alt="Anvaya"
            className="mx-auto h-20 w-auto object-contain"
          />

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
            Worker Profile
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Build your professional profile
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Tell customers about your skills, experience and availability.
            A complete profile helps you connect with the right opportunities.
          </p>

        </div>

        {/* MAIN CONTENT */}
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">

          {/* LEFT CARD */}
          <section className="rounded-3xl border border-amber-100 bg-white p-7 shadow-lg sm:p-8">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
              👷
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Welcome, skilled professional
            </h2>

            <p className="mt-3 leading-7 text-slate-500">
              Your profile is your introduction to customers. Add accurate
              details so people can understand your services and experience.
            </p>

            <div className="mt-7 space-y-4">

              <div className="rounded-2xl border border-amber-100 bg-[#FFF8F3] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <h3 className="font-bold text-slate-800">
                  Showcase your skills
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Let customers know exactly what services you provide.
                </p>
              </div>

              <div className="rounded-2xl border border-orange-100 bg-[#FFF9F5] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <h3 className="font-bold text-slate-800">
                  Get discovered nearby
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Your location helps customers find suitable workers nearby.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <h3 className="font-bold text-slate-800">
                  Control your availability
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Turn your availability on or off whenever you need.
                </p>
              </div>

            </div>
          </section>

          {/* FORM */}
          <section className="overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-xl">

            {!saved ? (

              <form onSubmit={handleSubmit}>

                <div className="border-b border-amber-100 bg-[#FFFDF9] px-7 py-7 sm:px-9">

                  <p className="text-sm font-bold uppercase tracking-wide text-amber-700">
                    Personal details
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    Tell us about yourself
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Fill in your details to create your worker profile.
                  </p>

                </div>

                <div className="px-7 py-8 sm:px-9">

                  {/* NAME */}
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

                  {/* PHONE */}
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

                  {/* SKILL */}
                  <div className="mb-5">

                    <label
                      htmlFor="skill"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Primary Skill
                    </label>

                    <select
                      id="skill"
                      name="skill"
                      value={form.skill}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    >
                      <option value="">Select your skill</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Plumber">Plumber</option>
                      <option value="Carpenter">Carpenter</option>
                      <option value="Painter">Painter</option>
                      <option value="Mason">Mason</option>
                      <option value="Other">Other</option>
                    </select>

                  </div>

                  {/* EXPERIENCE + LOCATION */}
                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>

                      <label
                        htmlFor="experience"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Experience
                      </label>

                      <select
                        id="experience"
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                      >
                        <option value="">Years</option>
                        <option value="Less than 1 year">
                          Less than 1 year
                        </option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
                      </select>

                    </div>

                    <div>

                      <label
                        htmlFor="location"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                      >
                        Location
                      </label>

                      <input
                        id="location"
                        name="location"
                        type="text"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Your area"
                        className="w-full rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                      />

                    </div>

                  </div>

                  {/* ABOUT */}
                  <div className="mt-5">

                    <label
                      htmlFor="about"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      About Your Work
                    </label>

                    <textarea
                      id="about"
                      name="about"
                      rows="3"
                      value={form.about}
                      onChange={handleChange}
                      placeholder="Tell customers briefly about your work and experience..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-[#FFFDFC] px-4 py-3.5 text-sm leading-6 text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    />

                  </div>

                  {/* AVAILABILITY */}
                  <div
                    className={`mt-6 flex items-center justify-between rounded-2xl border p-4 transition-all duration-300 ${
                      available
                        ? "border-emerald-200 bg-emerald-50/70"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >

                    <div className="pr-4">

                      <p className="text-sm font-bold text-slate-800">
                        Become available
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {available
                          ? "Customers can see that you are available for work."
                          : "Turn this on when you are ready to accept work."}
                      </p>

                    </div>

                    <button
                      type="button"
                      aria-label={
                        available
                          ? "Turn availability off"
                          : "Turn availability on"
                      }
                      aria-pressed={available}
                      onClick={handleAvailability}
                      className={`relative h-7 w-12 shrink-0 rounded-full transition duration-300 ${
                        available
                          ? "bg-emerald-500"
                          : "bg-slate-300"
                      }`}
                    >

                      <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition duration-300 ${
                          available
                            ? "left-6"
                            : "left-1"
                        }`}
                      />

                    </button>

                  </div>

                  {/* STATUS */}
                  {available && (
                    <div className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-700">
                      ✓ You are currently available for work.
                    </div>
                  )}

                  {/* ERROR */}
                  {error && (
                    <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-600">
                      {error}
                    </div>
                  )}

                  {/* SAVE BUTTON */}
                  <button
                    type="submit"
                    className="group mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-amber-600 px-6 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl active:translate-y-0"
                  >
                    <span>Save My Profile</span>

                    <span className="transition duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </button>

                  <p className="mt-4 text-center text-xs text-slate-400">
                    Your information is saved for your Anvaya session.
                  </p>

                </div>

              </form>

            ) : (

              /* SUCCESS SCREEN */

              <div className="flex min-h-[650px] flex-col items-center justify-center px-7 py-12 text-center">

                <div className="relative">

                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-5xl font-bold text-emerald-600 shadow-lg shadow-emerald-100">
                    ✓
                  </div>

                  <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-md">
                    ✨
                  </div>

                </div>

                <p className="mt-8 text-sm font-bold uppercase tracking-[0.12em] text-emerald-600">
                  Profile Saved Successfully
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  You're ready to get started!
                </h2>

                <p className="mt-4 max-w-md text-base leading-7 text-slate-500">
                  Your worker profile has been created successfully.
                  Customers can now discover your skills and services.
                </p>

                <div
                  className={`mt-7 rounded-full px-6 py-3 text-sm font-bold ${
                    available
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {available
                    ? "✓ You're available for work"
                    : "○ You're currently unavailable"}
                </div>

                <button
                  type="button"
                  onClick={() => setSaved(false)}
                  className="mt-7 rounded-xl border border-amber-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm transition duration-300 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
                >
                  Edit Profile
                </button>

                <p className="mt-6 text-xs text-slate-400">
                  Your profile is ready on Anvaya.
                </p>

              </div>

            )}

          </section>

        </div>

        <p className="py-8 text-center text-sm text-slate-400">
          Trusted workers. Better connections. Stronger communities.
        </p>

      </div>

    </main>
  );
}

export default WorkerProfile;