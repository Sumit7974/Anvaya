function LanguageSwitcher({ language = 'en', onLanguageChange }) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-amber-200 bg-white p-1 shadow-sm" aria-label="Language selector">
      <button type="button" onClick={() => onLanguageChange?.('en')} className={`rounded-lg px-3 py-2 text-sm font-semibold ${language === 'en' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-amber-50'}`}>
        English
      </button>
      <button type="button" onClick={() => onLanguageChange?.('hi')} className={`rounded-lg px-3 py-2 text-sm font-semibold ${language === 'hi' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-amber-50'}`}>
        हिंदी
      </button>
    </div>
  );
}

export default LanguageSwitcher;
