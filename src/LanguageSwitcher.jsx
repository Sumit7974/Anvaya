import { useState } from 'react';
import { useLanguage } from './LanguageContext';

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const languages = [
    { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
    { code: 'hi', label: 'हिन्दी', short: 'हि', flag: '🇮🇳' },
  ];
  const current = languages.find(item => item.code === language) || languages[0];
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(value => !value)} className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:border-amber-400 hover:text-amber-700" aria-haspopup="menu" aria-expanded={open}>
        <span>{current.flag}</span><span>{current.short}</span><span aria-hidden="true">⌄</span>
      </button>
      {open && <>
        <button type="button" aria-label="Close language menu" onClick={() => setOpen(false)} className="fixed inset-0 z-40 cursor-default" />
        <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-2xl border border-amber-100 bg-white p-2 shadow-xl" role="menu">
          <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Select language</p>
          {languages.map(item => <button key={item.code} type="button" role="menuitem" onClick={() => { setLanguage(item.code); setOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left ${item.code === language ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-slate-50'}`}>
            <span>{item.flag}</span><span className="flex-1 text-sm font-bold">{item.label}</span>{item.code === language && <span>✓</span>}
          </button>)}
        </div>
      </>}
    </div>
  );
}
export default LanguageSwitcher;
