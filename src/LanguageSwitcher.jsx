import { useState } from 'react';
import { useLanguage } from './useLanguage';

function LanguageSwitcher({ language: languageProp, onLanguageChange }) {
  const global = useLanguage();
  const language = languageProp ?? global.language;
  const changeLanguage = onLanguageChange ?? global.setLanguage;
  const [open, setOpen] = useState(false);
  const languages = [
    { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी', short: 'हि', flag: '🇮🇳' },
  ];
  const currentLanguage = languages.find(item => item.code === language) || languages[0];

  return (
    <div className="relative z-[70]">
      <button type="button" onClick={() => setOpen(value => !value)} aria-haspopup="menu" aria-expanded={open} className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-amber-400 hover:text-amber-700">
        <span>{currentLanguage.flag}</span><span>{currentLanguage.short}</span>
        <svg className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
      </button>
      {open && <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-amber-100 bg-white p-2 shadow-xl" role="menu">
        {languages.map(item => <button key={item.code} type="button" role="menuitem" onClick={() => { changeLanguage(item.code); setOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left ${item.code === language ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50'}`}>
          <span className="text-lg">{item.flag}</span><span className="flex-1 text-sm font-bold">{item.label}</span>{item.code === language && <span>✓</span>}
        </button>)}
      </div>}
    </div>
  );
}

export default LanguageSwitcher;
