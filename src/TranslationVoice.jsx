import { useEffect, useRef, useState } from 'react';
import LanguageSwitcher from './languageSwitcher';

const copy = {
  en: { badge: 'Voice-powered service request', title: 'Tell us what', highlight: 'you need.', description: 'Describe your problem in your own words. Type it or simply speak.', label: 'Describe your requirement', placeholder: 'Example: My bedroom switch is sparking and the ceiling fan is not working.', start: 'Start Voice', stop: 'Stop Listening', clear: 'Clear', next: 'Continue to Workers', words: 'words', ready: 'Ready to listen', listening: 'Listening...', supported: 'Voice input is supported in this browser.', unsupported: 'Voice input is not supported in this browser.', required: 'Please describe your problem first.', mic: 'Please allow microphone access and try again.', noSpeech: 'No speech detected. Please try again.', voiceError: 'There was a problem with voice input. Please try again.' },
  hi: { badge: 'आवाज़ से सेवा अनुरोध', title: 'हमें बताएं', highlight: 'आपको क्या चाहिए।', description: 'अपनी समस्या अपने शब्दों में बताएं। आप टाइप कर सकते हैं या बोल सकते हैं।', label: 'अपनी आवश्यकता बताएं', placeholder: 'उदाहरण: कमरे का स्विच खराब है और सीलिंग फैन नहीं चल रहा है।', start: 'आवाज़ शुरू करें', stop: 'सुनना बंद करें', clear: 'साफ़ करें', next: 'वर्कर्स देखें', words: 'शब्द', ready: 'आवाज़ के लिए तैयार', listening: 'सुन रहे हैं...', supported: 'इस ब्राउज़र में वॉइस इनपुट उपलब्ध है।', unsupported: 'इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है।', required: 'कृपया पहले अपनी समस्या बताएं।', mic: 'माइक्रोफ़ोन की अनुमति दें और फिर दोबारा प्रयास करें।', noSpeech: 'कोई आवाज़ नहीं मिली। कृपया दोबारा बोलें।', voiceError: 'वॉइस इनपुट में समस्या आई। कृपया दोबारा प्रयास करें।' }
};

function TranslationVoice({ onBack, onContinue }) {
  const [language, setLanguage] = useState('en');
  const [problem, setProblem] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);
  const t = copy[language];
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const isSupported = Boolean(SpeechRecognition);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  const startListening = () => {
    setError('');
    if (!SpeechRecognition) { setError(t.unsupported); return; }
    if (recognitionRef.current) recognitionRef.current.stop();
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      let finalText = '';
      let interimText = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += transcript; else interimText += transcript;
      }
      if (finalText.trim()) setProblem((previous) => `${previous.trim()}${previous.trim() ? ' ' : ''}${finalText.trim()}`);
      setError(interimText.trim() ? `${t.listening} “${interimText.trim()}”` : '');
    };
    recognition.onerror = (event) => {
      setIsListening(false);
      setError(event.error === 'not-allowed' ? t.mic : event.error === 'no-speech' ? t.noSpeech : t.voiceError);
    };
    recognition.onend = () => { setIsListening(false); recognitionRef.current = null; };
    recognitionRef.current = recognition;
    try { recognition.start(); } catch (e) { setIsListening(false); setError(e?.message || t.voiceError); }
  };

  const stopListening = () => { recognitionRef.current?.stop(); setIsListening(false); setError(''); };

  const continueWithRequest = () => {
    const value = problem.trim();
    if (!value) { setError(t.required); return; }
    if (isListening) stopListening();
    localStorage.setItem('anvaya_service_request', JSON.stringify({ problem: value, language }));
    onContinue?.(value);
  };

  const wordCount = problem.trim() ? problem.trim().split(/\s+/).length : 0;

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">
      <header className="border-b border-amber-100 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"><div className="flex items-center gap-4"><img src="/anvaya-logo.png" alt="Anvaya" className="h-12 w-auto object-contain"/><div className="hidden border-l border-slate-200 pl-4 sm:block"><p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Anvaya</p><p className="text-sm font-semibold text-slate-700">{t.badge}</p></div></div><div className="flex items-center gap-3"><LanguageSwitcher language={language} onLanguageChange={(next) => { stopListening(); setLanguage(next); setError(''); }} /><button type="button" onClick={onBack} className="rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm">← Back</button></div></div></header>
      <section className="bg-[#FFF1E6]"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20"><span className="inline-flex rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">🎙️ {t.badge}</span><h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">{t.title} <span className="text-amber-600">{t.highlight}</span></h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{t.description}</p></div></section>
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14"><div className="grid gap-8 lg:grid-cols-[1.5fr_0.7fr]"><section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-xl sm:p-8"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">{t.label}</p><h2 className="mt-2 text-2xl font-bold text-slate-900">Make the request specific</h2></div><span className={`rounded-full px-4 py-2 text-xs font-bold ${isListening ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>● {isListening ? t.listening : t.ready}</span></div><div className="relative mt-7"><textarea value={problem} onChange={(e) => { setProblem(e.target.value); setError(''); }} rows={9} maxLength={2000} placeholder={t.placeholder} className="w-full resize-none rounded-2xl border border-slate-200 bg-[#FFFDFC] px-5 py-5 text-base leading-7 outline-none transition placeholder:text-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"/><span className="absolute bottom-4 right-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-400 shadow-sm">{wordCount} {t.words}</span></div><button type="button" onClick={isListening ? stopListening : startListening} className={`mt-5 flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 font-bold shadow-lg ${isListening ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-amber-600 text-white hover:bg-amber-700'}`}><span>{isListening ? '⏹' : '🎙️'}</span>{isListening ? t.stop : t.start}</button>{error && <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-800">{error}</div>}<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between"><button type="button" onClick={() => { setProblem(''); setError(''); }} disabled={!problem} className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-600 disabled:opacity-40">{t.clear}</button><button type="button" onClick={continueWithRequest} className="rounded-xl bg-slate-900 px-7 py-3.5 font-bold text-white hover:bg-slate-800">{t.next} →</button></div></section><aside className="space-y-6"><section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl">🎙️</div><h2 className="mt-5 text-xl font-bold text-slate-900">Speak naturally</h2><p className="mt-3 text-sm leading-7 text-slate-500">Mention the symptom, location, urgency and any visible issue. This gives matching more signal.</p></section><section className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6"><p className="text-sm font-bold text-emerald-800">Voice input</p><p className="mt-2 text-xs leading-5 text-emerald-700">{isSupported ? t.supported : t.unsupported}</p></section><section className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg"><p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Next step</p><h2 className="mt-3 text-xl font-bold">AI-assisted worker matching</h2><p className="mt-3 text-sm leading-6 text-slate-300">Your exact description is carried forward instead of being replaced by a generic label.</p></section></aside></div></section>
      <footer className="border-t border-amber-100 bg-white"><div className="mx-auto max-w-7xl px-5 py-7 text-center text-sm text-slate-400">Trusted workers. Better connections. Stronger communities.</div></footer>
    </main>
  );
}
export default TranslationVoice;
