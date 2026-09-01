import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const roles = [
  {
    id: "customer",
    icon: "🏠",
    title: "I need a worker",
    hindi: "मुझे कामगार चाहिए",
    description:
      "Find verified local professionals, explain the work, compare quotes and pay safely after you are satisfied.",
    hindiDescription:
      "भरोसेमंद स्थानीय कामगार खोजें, काम की जानकारी दें, कीमत तय करें और संतुष्ट होने के बाद भुगतान करें।",
    badge: "For customers",
    bg: "bg-orange-50",
    iconBg: "bg-orange-100"
  },
  {
    id: "worker",
    icon: "👷",
    title: "I am a worker",
    hindi: "मैं कामगार हूँ",
    description:
      "Receive nearby job requests, review the work note, accept or reject, and send your own quote.",
    hindiDescription:
      "पास के काम के अनुरोध देखें, काम की जानकारी पढ़ें, स्वीकार या अस्वीकार करें और अपनी कीमत बताएं।",
    badge: "For skilled workers",
    bg: "bg-amber-50",
    iconBg: "bg-amber-100"
  },
  {
    id: "contractor",
    icon: "🏗️",
    title: "I am a contractor",
    hindi: "मैं ठेकेदार हूँ",
    description:
      "Create projects, find skilled workers and coordinate your team from one place.",
    hindiDescription:
      "परियोजनाएँ बनाएँ, कुशल कामगार खोजें और अपनी टीम को एक ही जगह से संभालें।",
    badge: "For contractors",
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-100"
  }
];

function RoleSelect({ onSelect, onBack }) {
  const [language, setLanguage] = useState("en");
  const isHindi = language === "hi";

  return (
    <main className="min-h-screen bg-[#FFF9F4] text-slate-800">
      <header className="border-b border-amber-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img
              src="/anvaya-logo.png"
              alt="Anvaya"
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                Anvaya
              </p>
              <p className="text-sm font-semibold text-slate-600">
                {isHindi ? "आपके पास भरोसेमंद काम" : "Trusted work, closer to you"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher
              language={language}
              onLanguageChange={setLanguage}
            />
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm hover:border-amber-300 hover:text-amber-700"
            >
              ← {isHindi ? "वापस" : "Back"}
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">
            {isHindi ? "अन्वया में आपका स्वागत है" : "Welcome to Anvaya"}
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            {isHindi ? "आप अन्वया का उपयोग कैसे करेंगे?" : "How will you use Anvaya?"}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            {isHindi
              ? "अपनी भूमिका चुनें। आगे आपको सरल कदमों में मार्गदर्शन मिलेगा।"
              : "Choose your role. We will guide you through the next steps in simple screens."}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelect(role.id)}
              className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl focus-visible:ring-4 focus-visible:ring-amber-100"
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${role.bg.replace("50", "400")}`} />
              <div className="flex items-start justify-between gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${role.iconBg}`}>
                  {role.icon}
                </div>
                <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-amber-600">
                  →
                </span>
              </div>

              <span className="mt-6 inline-flex rounded-full bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
                {isHindi ? role.badge : role.badge}
              </span>

              <h2 className="mt-4 text-xl font-bold leading-7 text-slate-900 sm:text-2xl">
                {isHindi ? role.hindi : role.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                {isHindi ? role.hindiDescription : role.description}
              </p>

              <div className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition group-hover:bg-amber-600">
                {isHindi ? "आगे बढ़ें" : "Continue"}
              </div>
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
          {[
            ["✓", isHindi ? "सत्यापित कामगार" : "Verified workers"],
            ["₹", isHindi ? "खुली कीमत" : "Clear pricing"],
            ["🛡", isHindi ? "संतुष्टि पहले" : "Satisfaction first"]
          ].map(([icon, text]) => (
            <div
              key={text}
              className="flex items-center justify-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-700">
                {icon}
              </span>
              {text}
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-400">
          {isHindi
            ? "भरोसेमंद कामगार। बेहतर जुड़ाव। मजबूत समुदाय।"
            : "Trusted workers. Better connections. Stronger communities."}
        </p>
      </section>
    </main>
  );
}

export default RoleSelect;
