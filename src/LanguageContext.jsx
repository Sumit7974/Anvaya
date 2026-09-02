import { useEffect, useMemo, useState } from 'react';
import { LanguageContext, englishFor, hindiFor, translateDom } from './languageStore';

function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => localStorage.getItem('anvaya_language') || 'en');

  const setLanguage = next => {
    const value = next === 'hi' ? 'hi' : 'en';
    localStorage.setItem('anvaya_language', value);
    setLanguageState(value);
    document.documentElement.lang = value;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'en') return undefined;
    const translate = () => translateDom(document.body);
    translate();
    const observer = new MutationObserver(translate);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder'] });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: language === 'hi' ? hindiFor : englishFor }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export default LanguageProvider;
