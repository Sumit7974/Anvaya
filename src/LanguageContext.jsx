import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LanguageContext = createContext(null);

const translations = {
  'Customer Access': 'ग्राहक एक्सेस',
  'Worker Access': 'कामगार एक्सेस',
  'Contractor Access': 'ठेकेदार एक्सेस',
  'Admin Access': 'एडमिन एक्सेस',
  'Sign in': 'साइन इन',
  'Customer account': 'ग्राहक खाता',
  'Worker account': 'कामगार खाता',
  'Contractor account': 'ठेकेदार खाता',
  'Welcome to Anvaya.': 'अन्वया में आपका स्वागत है।',
  'Email address': 'ईमेल पता',
  'Password': 'पासवर्ड',
  'Email:': 'ईमेल:',
  'Password:': 'पासवर्ड:',
  'Use demo': 'डेमो उपयोग करें',
  'Demo login': 'डेमो लॉगिन',
  'Create a new account': 'नया खाता बनाएँ',
  'Login to Anvaya →': 'अन्वया में लॉगिन करें →',
  'Back': 'वापस',
  'Cancel': 'रद्द करें',
  'Continue': 'जारी रखें',
  'Continue →': 'जारी रखें →',
  'Continue to Workers': 'कामगारों पर जाएँ',
  'Find a worker →': 'कामगार खोजें →',
  'I am a worker': 'मैं कामगार हूँ',
  'Customer': 'ग्राहक',
  'Worker': 'कामगार',
  'Contractor': 'ठेकेदार',
  'Admin': 'एडमिन',
  'Available': 'उपलब्ध',
  'Unavailable': 'अनुपलब्ध',
  'Nearby workers': 'नज़दीकी कामगार',
  'Hire this worker →': 'इस कामगार को चुनें →',
  'Send Request →': 'अनुरोध भेजें →',
  'Sending...': 'भेजा जा रहा है...',
  'Accept Request': 'अनुरोध स्वीकार करें',
  'Reject': 'अस्वीकार करें',
  'Send Quote': 'कोटेशन भेजें',
  'Start Work': 'काम शुरू करें',
  'Create New Project': 'नया प्रोजेक्ट बनाएँ',
  'Create another project': 'एक और प्रोजेक्ट बनाएँ',
  'Project': 'प्रोजेक्ट',
  'Workers': 'कामगार',
  'Review': 'समीक्षा',
  'Create your project': 'अपना प्रोजेक्ट बनाएँ',
  'Project Name': 'प्रोजेक्ट का नाम',
  'Required Service': 'आवश्यक सेवा',
  'Project Location': 'प्रोजेक्ट स्थान',
  'Estimated Budget': 'अनुमानित बजट',
  'Expected Completion': 'अपेक्षित पूरा होने की तारीख',
  'Project Description': 'प्रोजेक्ट विवरण',
  'Secure payment': 'सुरक्षित भुगतान',
  'Payment Successful': 'भुगतान सफल',
  'Pay only after satisfaction': 'संतुष्टि के बाद ही भुगतान करें',
  'Continue to Rating': 'रेटिंग पर जाएँ',
  'Payment Status': 'भुगतान स्थिति',
  'Booking Status': 'बुकिंग स्थिति',
  'Confirmed': 'पुष्ट',
  'Paid': 'भुगतान किया गया',
  'Something went wrong': 'कुछ गलत हो गया',
  'Loading...': 'लोड हो रहा है...',
  'No customer requests yet.': 'अभी कोई ग्राहक अनुरोध नहीं है।',
  'No matching verified workers are available within 15 km of this service location.': 'इस सेवा स्थान के 15 किमी के भीतर कोई मिलान करता सत्यापित कामगार उपलब्ध नहीं है।',
  'Change location →': 'स्थान बदलें →',
  'Choose a location': 'स्थान चुनें',
  'Use my current location': 'मेरी वर्तमान लोकेशन उपयोग करें',
  'OR SEARCH A PLACE': 'या स्थान खोजें',
  'Search': 'खोजें',
  'Where should the worker go?': 'कामगार को कहाँ जाना है?',
  'Service location': 'सेवा स्थान',
  'Customer jobs': 'ग्राहक के काम',
  'Live bookings': 'लाइव बुकिंग',
  'New requests': 'नए अनुरोध',
  'Active jobs': 'सक्रिय काम',
  'Completed jobs': 'पूर्ण काम',
};

const hindiFor = value => translations[value] || value;
const englishFor = value => Object.entries(translations).find(([, hindi]) => hindi === value)?.[0] || value;

function translateDom(root, language) {
  if (language === 'en') return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const parent = node.parentElement;
    if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) continue;
    const value = node.nodeValue;
    if (!value || !value.trim()) continue;
    const trimmed = value.trim();
    const translated = hindiFor(trimmed);
    if (translated !== trimmed) {
      node.nodeValue = value.replace(trimmed, translated);
    }
  }
  root.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(element => {
    const value = element.getAttribute('placeholder');
    const translated = hindiFor(value);
    if (translated !== value) element.setAttribute('placeholder', translated);
  });
  root.querySelectorAll('option').forEach(element => {
    const value = element.textContent?.trim();
    const translated = hindiFor(value);
    if (value && translated !== value) element.textContent = translated;
  });
}

function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => localStorage.getItem('anvaya_language') || 'en');
  const setLanguage = next => {
    const value = next === 'hi' ? 'hi' : 'en';
    localStorage.setItem('anvaya_language', value);
    setLanguageState(value);
    document.documentElement.lang = value === 'hi' ? 'hi' : 'en';
  };

  useEffect(() => {
    document.documentElement.lang = language === 'hi' ? 'hi' : 'en';
    if (language === 'en') return undefined;
    const translate = () => translateDom(document.body, language);
    translate();
    const observer = new MutationObserver(translate);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder'] });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: language === 'hi' ? hindiFor : value => englishFor(value) }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used within LanguageProvider');
  return value;
};

export default LanguageProvider;
