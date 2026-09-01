// import { useState } from "react";
// import LanguageSwitcher from "./languageSwitcher";

// function RoleSelect({ onSelect, onBack }) {
//   const [language, setLanguage] = useState("en");

//   const isHindi = language === "hi";

//   return (
//     <main className="min-h-screen bg-[#FFF8F3] text-slate-800">

//       {/* ================= TOP BAR ================= */}

//       <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 pt-6 sm:px-8 lg:px-12">

//         {/* BACK BUTTON */}

//         <button
//           type="button"
//           onClick={onBack}
//           className="group flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md active:scale-95"
//         >
//           <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
//             ←
//           </span>

//           <span>
//             {isHindi ? "वापस" : "Back"}
//           </span>
//         </button>

//         {/* LANGUAGE SWITCHER */}

//         <LanguageSwitcher
//           language={language}
//           onLanguageChange={setLanguage}
//         />

//       </div>


//       {/* ================= MAIN CONTENT ================= */}

//       <section className="mx-auto flex w-full max-w-[1500px] flex-col px-5 pb-12 pt-10 sm:px-8 sm:pt-12 lg:px-12 lg:pt-14">

//         {/* ================= LOGO ================= */}

//         <div className="flex flex-col items-center text-center">

//           <img
//             src="/anvaya-logo.png"
//             alt="Anvaya"
//             className="h-20 w-auto object-contain sm:h-24 lg:h-28"
//           />


//           {/* SMALL HEADING */}

//           <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-amber-700 sm:text-sm">
//             {isHindi
//               ? "अन्वया में आपका स्वागत है"
//               : "Welcome to Anvaya"}
//           </p>


//           {/* MAIN HEADING */}

//           <h1 className="mt-3 text-center text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
//             {isHindi ? "आप कौन हैं?" : "Who are you?"}
//           </h1>


//           {/* DESCRIPTION */}

//           <p className="mt-4 max-w-2xl text-center text-sm leading-7 text-slate-500 sm:text-base lg:text-lg">
//             {isHindi
//               ? "चुनें कि आप अन्वया का उपयोग कैसे करना चाहते हैं"
//               : "Choose how you want to use Anvaya"}
//           </p>

//         </div>


//         {/* ================= ROLE CARDS ================= */}

//         <div className="mx-auto mt-12 grid w-full max-w-[1350px] grid-cols-1 gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">


//           {/* ================================================= */}
//           {/* WORKER */}
//           {/* ================================================= */}

//           <button
//             type="button"
//             onClick={() => onSelect("worker")}
//             className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-3xl border border-amber-100 bg-white p-7 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl active:scale-[0.98] sm:p-8"
//           >

//             {/* Decorative circle */}

//             <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-amber-50 transition-transform duration-500 group-hover:scale-150" />


//             <div className="relative flex h-full flex-col">

//               {/* ICON + ARROW */}

//               <div className="flex items-center justify-between">

//                 <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl transition duration-300 group-hover:rotate-2 group-hover:scale-110">
//                   👷
//                 </div>

//                 <span className="text-2xl text-slate-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-amber-600">
//                   →
//                 </span>

//               </div>


//               {/* TITLE */}

//               <h2 className="mt-7 text-2xl font-bold text-slate-900 sm:text-[26px]">
//                 {isHindi
//                   ? "मैं एक कामगार हूँ"
//                   : "I'm a Worker"}
//               </h2>


//               {/* DESCRIPTION */}

//               <p className="mt-3 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
//                 {isHindi
//                   ? "काम खोजें, अपने कौशल को दिखाएँ और उन लोगों से जुड़ें जिन्हें आपकी सेवाओं की आवश्यकता है।"
//                   : "Find work, showcase your skills and connect with people who need your services."}
//               </p>


//               {/* CTA */}

//               <div className="mt-auto pt-7">

//                 <span className="inline-flex rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition duration-300 group-hover:bg-amber-100">
//                   {isHindi
//                     ? "कामगार के रूप में जारी रखें"
//                     : "Continue as Worker"}
//                 </span>

//               </div>

//             </div>

//           </button>


//           {/* ================================================= */}
//           {/* CUSTOMER */}
//           {/* ================================================= */}

//           <button
//             type="button"
//             onClick={() => onSelect("customer")}
//             className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white p-7 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-2xl active:scale-[0.98] sm:p-8"
//           >

//             {/* Decorative circle */}

//             <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-orange-50 transition-transform duration-500 group-hover:scale-150" />


//             <div className="relative flex h-full flex-col">

//               {/* ICON + ARROW */}

//               <div className="flex items-center justify-between">

//                 <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl transition duration-300 group-hover:-rotate-2 group-hover:scale-110">
//                   👤
//                 </div>

//                 <span className="text-2xl text-slate-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-orange-600">
//                   →
//                 </span>

//               </div>


//               {/* TITLE */}

//               <h2 className="mt-7 text-2xl font-bold text-slate-900 sm:text-[26px]">
//                 {isHindi
//                   ? "मैं एक ग्राहक हूँ"
//                   : "I'm a Customer"}
//               </h2>


//               {/* DESCRIPTION */}

//               <p className="mt-3 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
//                 {isHindi
//                   ? "अपने आसपास भरोसेमंद कुशल कामगार खोजें और पूरे विश्वास के साथ अपनी ज़रूरत का काम करवाएँ।"
//                   : "Find trusted skilled workers near you and get the help you need with confidence."}
//               </p>


//               {/* CTA */}

//               <div className="mt-auto pt-7">

//                 <span className="inline-flex rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 transition duration-300 group-hover:bg-orange-100">
//                   {isHindi
//                     ? "ग्राहक के रूप में जारी रखें"
//                     : "Continue as Customer"}
//                 </span>

//               </div>

//             </div>

//           </button>


//           {/* ================================================= */}
//           {/* CONTRACTOR */}
//           {/* ================================================= */}

//           <button
//             type="button"
//             onClick={() => onSelect("contractor")}
//             className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-3xl border border-yellow-100 bg-white p-7 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-yellow-300 hover:shadow-2xl active:scale-[0.98] sm:p-8"
//           >

//             {/* Decorative circle */}

//             <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-yellow-50 transition-transform duration-500 group-hover:scale-150" />


//             <div className="relative flex h-full flex-col">

//               {/* ICON + ARROW */}

//               <div className="flex items-center justify-between">

//                 <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-3xl transition duration-300 group-hover:rotate-2 group-hover:scale-110">
//                   🏗️
//                 </div>

//                 <span className="text-2xl text-slate-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-yellow-600">
//                   →
//                 </span>

//               </div>


//               {/* TITLE */}

//               <h2 className="mt-7 text-2xl font-bold text-slate-900 sm:text-[26px]">
//                 {isHindi
//                   ? "मैं एक ठेकेदार हूँ"
//                   : "I'm a Contractor"}
//               </h2>


//               {/* DESCRIPTION */}

//               <p className="mt-3 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
//                 {isHindi
//                   ? "अपनी परियोजनाएँ बनाएँ, कुशल कामगार खोजें और अपनी टीम को आसानी से प्रबंधित करें।"
//                   : "Create projects, find skilled workers and manage your team with ease."}
//               </p>


//               {/* CTA */}

//               <div className="mt-auto pt-7">

//                 <span className="inline-flex rounded-full bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700 transition duration-300 group-hover:bg-yellow-100">
//                   {isHindi
//                     ? "ठेकेदार के रूप में जारी रखें"
//                     : "Continue as Contractor"}
//                 </span>

//               </div>

//             </div>

//           </button>

//         </div>


//         {/* ================= FOOTER MESSAGE ================= */}

//         <div className="mt-12 flex flex-col items-center text-center sm:mt-14">

//           <div className="mb-4 h-px w-32 bg-amber-100 sm:w-48" />

//           <p className="text-xs text-slate-400 sm:text-sm">
//             {isHindi
//               ? "भरोसेमंद कामगार। बेहतर जुड़ाव। मजबूत समुदाय।"
//               : "Trusted workers. Better connections. Stronger communities."}
//           </p>

//         </div>

//       </section>

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
    <main className="min-h-screen bg-[#FFF8F3] px-[clamp(1rem,3vw,3rem)] py-[clamp(1.25rem,3vw,2.5rem)] text-slate-800">

      {/* ================= TOP BAR ================= */}

      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4">

        {/* BACK BUTTON */}

        <button
          type="button"
          onClick={onBack}
          className="group flex shrink-0 items-center gap-2 rounded-xl border border-amber-200 bg-white px-[clamp(0.8rem,1.5vw,1.1rem)] py-[clamp(0.55rem,1vw,0.7rem)] text-[clamp(0.75rem,1vw,0.9rem)] font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md active:scale-95"
        >
          <span className="text-[clamp(1rem,1.5vw,1.2rem)] transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>

          <span>
            {isHindi ? "वापस" : "Back"}
          </span>
        </button>


        {/* LANGUAGE SWITCHER */}

        <div className="shrink-0">
          <LanguageSwitcher
            language={language}
            onLanguageChange={setLanguage}
          />
        </div>

      </div>


      {/* ================= MAIN CONTENT ================= */}

      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center">

        {/* ================= LOGO + HEADING ================= */}

        <div className="mt-[clamp(2rem,5vw,4.5rem)] w-full text-center">

          <img
            src="/anvaya-logo.png"
            alt="Anvaya"
            className="mx-auto h-[clamp(4.5rem,8vw,7rem)] w-auto object-contain"
          />


          <p className="mt-[clamp(1rem,2vw,1.5rem)] text-[clamp(0.7rem,1vw,0.9rem)] font-bold uppercase tracking-[0.18em] text-amber-700">
            {isHindi
              ? "अन्वया में आपका स्वागत है"
              : "Welcome to Anvaya"}
          </p>


          <h1 className="mt-[clamp(0.5rem,1vw,0.9rem)] text-[clamp(2rem,4vw,3.75rem)] font-bold leading-tight tracking-tight text-slate-900">
            {isHindi ? "आप कौन हैं?" : "Who are you?"}
          </h1>


          <p className="mx-auto mt-[clamp(0.75rem,1.5vw,1.25rem)] max-w-2xl px-2 text-[clamp(0.85rem,1.4vw,1.15rem)] leading-relaxed text-slate-500">
            {isHindi
              ? "चुनें कि आप अन्वया का उपयोग कैसे करना चाहते हैं"
              : "Choose how you want to use Anvaya"}
          </p>

        </div>


        {/* ================= ROLE CARDS ================= */}

        <div className="mt-[clamp(2rem,4vw,3.5rem)] grid w-full grid-cols-1 gap-[clamp(1rem,2vw,1.75rem)] md:grid-cols-2 xl:grid-cols-3">


          {/* ================= WORKER ================= */}

          <button
            type="button"
            onClick={() => onSelect("worker")}
            className="group relative flex min-h-[clamp(18rem,28vw,23rem)] w-full flex-col overflow-hidden rounded-3xl border border-amber-100 bg-white p-[clamp(1.25rem,2.5vw,2rem)] text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl active:scale-[0.98]"
          >

            <div className="absolute -right-12 -top-12 h-[clamp(7rem,10vw,9rem)] w-[clamp(7rem,10vw,9rem)] rounded-full bg-amber-50 transition-transform duration-500 group-hover:scale-150" />


            <div className="relative flex h-full flex-col">

              <div className="flex items-center justify-between">

                <div className="flex h-[clamp(3.25rem,5vw,4rem)] w-[clamp(3.25rem,5vw,4rem)] shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-[clamp(1.5rem,3vw,2rem)] transition duration-300 group-hover:scale-110 group-hover:rotate-2">
                  👷
                </div>

                <span className="text-[clamp(1.5rem,2.5vw,2rem)] text-slate-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-amber-600">
                  →
                </span>

              </div>


              <h2 className="mt-[clamp(1.25rem,2.5vw,1.75rem)] text-[clamp(1.25rem,2vw,1.6rem)] font-bold leading-tight text-slate-900">
                {isHindi ? "मैं एक कामगार हूँ" : "I'm a Worker"}
              </h2>


              <p className="mt-[clamp(0.6rem,1.2vw,0.9rem)] text-[clamp(0.8rem,1.2vw,1rem)] leading-7 text-slate-500">
                {isHindi
                  ? "काम खोजें, अपने कौशल को दिखाएँ और उन लोगों से जुड़ें जिन्हें आपकी सेवाओं की आवश्यकता है।"
                  : "Find work, showcase your skills and connect with people who need your services."}
              </p>


              <div className="mt-auto pt-[clamp(1.25rem,2vw,1.75rem)]">

                <span className="inline-flex rounded-full bg-amber-50 px-[clamp(0.8rem,1.5vw,1rem)] py-[clamp(0.45rem,1vw,0.6rem)] text-[clamp(0.7rem,1vw,0.9rem)] font-semibold text-amber-700 transition duration-300 group-hover:bg-amber-100">
                  {isHindi
                    ? "कामगार के रूप में जारी रखें →"
                    : "Continue as Worker →"}
                </span>

              </div>

            </div>

          </button>


          {/* ================= CUSTOMER ================= */}

          <button
            type="button"
            onClick={() => onSelect("customer")}
            className="group relative flex min-h-[clamp(18rem,28vw,23rem)] w-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white p-[clamp(1.25rem,2.5vw,2rem)] text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-orange-300 hover:shadow-2xl active:scale-[0.98]"
          >

            <div className="absolute -right-12 -top-12 h-[clamp(7rem,10vw,9rem)] w-[clamp(7rem,10vw,9rem)] rounded-full bg-orange-50 transition-transform duration-500 group-hover:scale-150" />


            <div className="relative flex h-full flex-col">

              <div className="flex items-center justify-between">

                <div className="flex h-[clamp(3.25rem,5vw,4rem)] w-[clamp(3.25rem,5vw,4rem)] shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[clamp(1.5rem,3vw,2rem)] transition duration-300 group-hover:scale-110 group-hover:-rotate-2">
                  👤
                </div>

                <span className="text-[clamp(1.5rem,2.5vw,2rem)] text-slate-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-orange-600">
                  →
                </span>

              </div>


              <h2 className="mt-[clamp(1.25rem,2.5vw,1.75rem)] text-[clamp(1.25rem,2vw,1.6rem)] font-bold leading-tight text-slate-900">
                {isHindi ? "मैं एक ग्राहक हूँ" : "I'm a Customer"}
              </h2>


              <p className="mt-[clamp(0.6rem,1.2vw,0.9rem)] text-[clamp(0.8rem,1.2vw,1rem)] leading-7 text-slate-500">
                {isHindi
                  ? "अपने आसपास भरोसेमंद कुशल कामगार खोजें और पूरे विश्वास के साथ अपनी ज़रूरत का काम करवाएँ।"
                  : "Find trusted skilled workers near you and get the help you need with confidence."}
              </p>


              <div className="mt-auto pt-[clamp(1.25rem,2vw,1.75rem)]">

                <span className="inline-flex rounded-full bg-orange-50 px-[clamp(0.8rem,1.5vw,1rem)] py-[clamp(0.45rem,1vw,0.6rem)] text-[clamp(0.7rem,1vw,0.9rem)] font-semibold text-orange-700 transition duration-300 group-hover:bg-orange-100">
                  {isHindi
                    ? "ग्राहक के रूप में जारी रखें →"
                    : "Continue as Customer →"}
                </span>

              </div>

            </div>

          </button>


          {/* ================= CONTRACTOR ================= */}

          <button
            type="button"
            onClick={() => onSelect("contractor")}
            className="group relative flex min-h-[clamp(18rem,28vw,23rem)] w-full flex-col overflow-hidden rounded-3xl border border-yellow-100 bg-white p-[clamp(1.25rem,2.5vw,2rem)] text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-yellow-300 hover:shadow-2xl active:scale-[0.98]"
          >

            <div className="absolute -right-12 -top-12 h-[clamp(7rem,10vw,9rem)] w-[clamp(7rem,10vw,9rem)] rounded-full bg-yellow-50 transition-transform duration-500 group-hover:scale-150" />


            <div className="relative flex h-full flex-col">

              <div className="flex items-center justify-between">

                <div className="flex h-[clamp(3.25rem,5vw,4rem)] w-[clamp(3.25rem,5vw,4rem)] shrink-0 items-center justify-center rounded-2xl bg-yellow-100 text-[clamp(1.5rem,3vw,2rem)] transition duration-300 group-hover:scale-110 group-hover:rotate-2">
                  🏗️
                </div>

                <span className="text-[clamp(1.5rem,2.5vw,2rem)] text-slate-300 transition-all duration-300 group-hover:translate-x-2 group-hover:text-yellow-600">
                  →
                </span>

              </div>


              <h2 className="mt-[clamp(1.25rem,2.5vw,1.75rem)] text-[clamp(1.25rem,2vw,1.6rem)] font-bold leading-tight text-slate-900">
                {isHindi ? "मैं एक ठेकेदार हूँ" : "I'm a Contractor"}
              </h2>


              <p className="mt-[clamp(0.6rem,1.2vw,0.9rem)] text-[clamp(0.8rem,1.2vw,1rem)] leading-7 text-slate-500">
                {isHindi
                  ? "अपनी परियोजनाएँ बनाएँ, कुशल कामगार खोजें और अपनी टीम को आसानी से प्रबंधित करें।"
                  : "Create projects, find skilled workers and manage your team with ease."}
              </p>


              <div className="mt-auto pt-[clamp(1.25rem,2vw,1.75rem)]">

                <span className="inline-flex rounded-full bg-yellow-50 px-[clamp(0.8rem,1.5vw,1rem)] py-[clamp(0.45rem,1vw,0.6rem)] text-[clamp(0.7rem,1vw,0.9rem)] font-semibold text-yellow-700 transition duration-300 group-hover:bg-yellow-100">
                  {isHindi
                    ? "ठेकेदार के रूप में जारी रखें →"
                    : "Continue as Contractor →"}
                </span>

              </div>

            </div>

          </button>

        </div>


        {/* ================= FOOTER ================= */}

        <div className="mt-[clamp(2rem,4vw,3rem)] w-full pb-4 text-center">

          <div className="mx-auto mb-4 h-px w-[min(80%,20rem)] bg-amber-100" />

          <p className="px-2 text-[clamp(0.7rem,1vw,0.9rem)] text-slate-400">
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