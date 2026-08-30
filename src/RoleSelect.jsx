// function RoleSelect({ onSelect, onBack }) {
//   return (
//     <main className="min-h-screen bg-[#FFF8F3] px-5 py-10 text-slate-800">

//       {/* BACK BUTTON */}

//       <div className="mx-auto max-w-6xl">
//         <button
//           onClick={onBack}
//           className="group flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md active:scale-95"
//         >
//           <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
//             ←
//           </span>

//           <span>Back</span>
//         </button>
//       </div>


//       {/* MAIN */}

//       <div className="mx-auto mt-8 max-w-5xl">

//         {/* LOGO */}

//         <div className="text-center">

//           <img
//             src="/anvaya-logo.png"
//             alt="Anvaya"
//             className="mx-auto h-20 w-auto object-contain"
//           />

//           <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
//             Welcome to Anvaya
//           </p>

//           <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">
//             Who are you?
//           </h1>

//           <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
//             Choose how you want to use Anvaya
//           </p>

//         </div>


//         {/* ROLE CARDS */}

//         <div className="mx-auto mt-10 grid max-w-4xl gap-7 md:grid-cols-2">


//           {/* ================= WORKER ================= */}

//           <button
//             onClick={() => onSelect("worker")}
//             className="group relative overflow-hidden rounded-3xl border border-amber-100 bg-white p-8 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl active:scale-[0.98]"
//           >

//             {/* Decorative circle */}

//             <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-amber-50 transition-transform duration-500 group-hover:scale-150" />


//             <div className="relative">

//               <div className="flex items-center justify-between">

//                 <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl transition duration-300 group-hover:scale-110 group-hover:rotate-2">
//                   👷
//                 </div>

//                 <span className="text-2xl text-slate-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-amber-600">
//                   →
//                 </span>

//               </div>


//               <h2 className="mt-7 text-2xl font-bold text-slate-900">
//                 I'm a Worker
//               </h2>


//               <p className="mt-3 leading-7 text-slate-500">
//                 Find work, showcase your skills and connect with people who
//                 need your services.
//               </p>


//               <div className="mt-6 inline-flex rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition duration-300 group-hover:bg-amber-100">
//                 Continue as Worker
//               </div>

//             </div>

//           </button>


//           {/* ================= CUSTOMER ================= */}

//           <button
//             onClick={() => onSelect("customer")}
//             className="group relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-8 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-2xl active:scale-[0.98]"
//           >

//             {/* Decorative circle */}

//             <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-orange-50 transition-transform duration-500 group-hover:scale-150" />


//             <div className="relative">

//               <div className="flex items-center justify-between">

//                 <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl transition duration-300 group-hover:scale-110 group-hover:-rotate-2">
//                   👤
//                 </div>

//                 <span className="text-2xl text-slate-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-orange-600">
//                   →
//                 </span>

//               </div>


//               <h2 className="mt-7 text-2xl font-bold text-slate-900">
//                 I'm a Customer
//               </h2>


//               <p className="mt-3 leading-7 text-slate-500">
//                 Find trusted skilled workers near you and get the help you
//                 need with confidence.
//               </p>


//               <div className="mt-6 inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 transition duration-300 group-hover:bg-orange-100">
//                 Continue as Customer
//               </div>

//             </div>

//           </button>

//         </div>


//         {/* FOOTER */}

//         <div className="mt-12 text-center">

//           <div className="mx-auto mb-4 h-px max-w-xs bg-amber-100" />

//           <p className="text-sm text-slate-400">
//             Trusted workers. Better connections. Stronger communities.
//           </p>

//         </div>

//       </div>

//     </main>
//   );
// }

// export default RoleSelect;
import { useState } from "react";
import LanguageSwitcher from "./languageSwitcher";

function RoleSelect({ onSelect, onBack }) {
  const [language, setLanguage] = useState("en");

  const isHindi = language === "hi";

  return (
    <main className="min-h-screen bg-[#FFF8F3] px-5 py-10 text-slate-800">

      {/* TOP BAR */}

      <div className="mx-auto flex max-w-6xl items-center justify-between">

        {/* BACK BUTTON */}

        <button
          onClick={onBack}
          className="group flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md active:scale-95"
        >
          <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>

          <span>{isHindi ? "वापस" : "Back"}</span>
        </button>

        {/* LANGUAGE SWITCHER */}

        <LanguageSwitcher
          language={language}
          onLanguageChange={setLanguage}
        />

      </div>

      {/* MAIN */}

      <div className="mx-auto mt-8 max-w-5xl">

        {/* LOGO */}

        <div className="text-center">

          <img
            src="/anvaya-logo.png"
            alt="Anvaya"
            className="mx-auto h-20 w-auto object-contain"
          />

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-amber-700">
            {isHindi
              ? "अन्वया में आपका स्वागत है"
              : "Welcome to Anvaya"}
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">
            {isHindi ? "आप कौन हैं?" : "Who are you?"}
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
            {isHindi
              ? "चुनें कि आप अन्वया का उपयोग कैसे करना चाहते हैं"
              : "Choose how you want to use Anvaya"}
          </p>

        </div>

        {/* ROLE CARDS */}

        <div className="mx-auto mt-10 grid max-w-6xl gap-7 md:grid-cols-3">

          {/* ================= WORKER ================= */}

          <button
            onClick={() => onSelect("worker")}
            className="group relative overflow-hidden rounded-3xl border border-amber-100 bg-white p-8 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl active:scale-[0.98]"
          >

            {/* Decorative circle */}

            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-amber-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl transition duration-300 group-hover:scale-110 group-hover:rotate-2">
                  👷
                </div>

                <span className="text-2xl text-slate-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-amber-600">
                  →
                </span>

              </div>

              <h2 className="mt-7 text-2xl font-bold text-slate-900">
                {isHindi ? "मैं एक कामगार हूँ" : "I'm a Worker"}
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                {isHindi
                  ? "काम खोजें, अपने कौशल को दिखाएँ और उन लोगों से जुड़ें जिन्हें आपकी सेवाओं की आवश्यकता है।"
                  : "Find work, showcase your skills and connect with people who need your services."}
              </p>

              <div className="mt-6 inline-flex rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition duration-300 group-hover:bg-amber-100">
                {isHindi
                  ? "कामगार के रूप में जारी रखें"
                  : "Continue as Worker"}
              </div>

            </div>

          </button>

          {/* ================= CUSTOMER ================= */}

          <button
            onClick={() => onSelect("customer")}
            className="group relative overflow-hidden rounded-3xl border border-orange-100 bg-white p-8 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-2xl active:scale-[0.98]"
          >

            {/* Decorative circle */}

            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-orange-50 transition-transform duration-500 group-hover:scale-150" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl transition duration-300 group-hover:scale-110 group-hover:-rotate-2">
                  👤
                </div>

                <span className="text-2xl text-slate-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-orange-600">
                  →
                </span>

              </div>

              <h2 className="mt-7 text-2xl font-bold text-slate-900">
                {isHindi ? "मैं एक ग्राहक हूँ" : "I'm a Customer"}
              </h2>

              <p className="mt-3 leading-7 text-slate-500">
                {isHindi
                  ? "अपने आसपास भरोसेमंद कुशल कामगार खोजें और पूरे विश्वास के साथ अपनी ज़रूरत का काम करवाएँ।"
                  : "Find trusted skilled workers near you and get the help you need with confidence."}
              </p>

              <div className="mt-6 inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 transition duration-300 group-hover:bg-orange-100">
                {isHindi
                  ? "ग्राहक के रूप में जारी रखें"
                  : "Continue as Customer"}
              </div>

            </div>

          </button>
          {/* ================= CONTRACTOR ================= */}

<button
  onClick={() => onSelect("contractor")}
  className="group relative overflow-hidden rounded-3xl border border-yellow-100 bg-white p-8 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-yellow-300 hover:shadow-2xl active:scale-[0.98]"
>
  {/* Decorative circle */}

  <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-yellow-50 transition-transform duration-500 group-hover:scale-150" />

  <div className="relative">

    <div className="flex items-center justify-between">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-3xl transition duration-300 group-hover:scale-110 group-hover:rotate-2">
        🏗️
      </div>

      <span className="text-2xl text-slate-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-yellow-600">
        →
      </span>

    </div>

    <h2 className="mt-7 text-2xl font-bold text-slate-900">
      {isHindi ? "मैं एक ठेकेदार हूँ" : "I'm a Contractor"}
    </h2>

    <p className="mt-3 leading-7 text-slate-500">
      {isHindi
        ? "अपनी परियोजनाएँ बनाएँ, कुशल कामगार खोजें और अपनी टीम को आसानी से प्रबंधित करें।"
        : "Create projects, find skilled workers and manage your team with ease."}
    </p>

    <div className="mt-6 inline-flex rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700 transition duration-300 group-hover:bg-yellow-100">
      {isHindi
        ? "ठेकेदार के रूप में जारी रखें"
        : "Continue as Contractor"}
    </div>

  </div>

</button>

        </div>

        {/* FOOTER */}

        <div className="mt-12 text-center">

          <div className="mx-auto mb-4 h-px max-w-xs bg-amber-100" />

          <p className="text-sm text-slate-400">
            {isHindi
              ? "भरोसेमंद कामगार। बेहतर जुड़ाव। मजबूत समुदाय।"
              : "Trusted workers. Better connections. Stronger communities."}
          </p>

        </div>

      </div>

    </main>
  );
}

export default RoleSelect;