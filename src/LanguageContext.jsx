import { createContext, useContext, useEffect, useState } from "react";
import i18n from "./i18n";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("anvaya-language") || "en";
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("anvaya-language", language);
  }, [language]);

  const setLanguage = (lang) => {
    setLanguageState(lang);
  };

  const t = (key) => {
    return i18n.t(key);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}