import { useState } from "react";

function LanguageSwitcher({ language, onLanguageChange }) {
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
    { code: "hi", label: "हिन्दी", short: "हि", flag: "🇮🇳" },
  ];

  const currentLanguage =
    languages.find((item) => item.code === language) || languages[0];

  const handleChange = (code) => {
    onLanguageChange(code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-700 hover:shadow-md"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <span>{currentLanguage.short}</span>
        <svg
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close language menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div
            className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-amber-100 bg-white p-2 shadow-xl"
            role="menu"
          >
            <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Select language
            </p>
            {languages.map((item) => {
              const selected = item.code === language;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleChange(item.code)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                    selected
                      ? "bg-amber-50 text-amber-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  role="menuitem"
                >
                  <span className="text-lg">{item.flag}</span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold">{item.label}</span>
                    <span className="block text-xs text-slate-400">{item.short}</span>
                  </span>
                  {selected && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default LanguageSwitcher;
