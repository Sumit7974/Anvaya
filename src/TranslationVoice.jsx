import { useEffect, useRef, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

const copy = {
  en: {
    badge: 'Service request',
    title: 'Tell us what',
    highlight: 'you need.',
    description: 'Type your requirement, speak it, or skip this step and choose a worker first.',
    label: 'Your work requirement',
    placeholder: 'Example: My bedroom switch is sparking and the ceiling fan is not working.',
    start: 'Start Voice',
    stop: 'Stop Listening',
    clear: 'Clear',
    next: 'Continue to Workers',
    optional: 'This step is optional',
    words: 'words',
    ready: 'Ready to listen',
    listening: 'Listening...',
    supported: 'Voice input is available in this browser.',
    unsupported: 'Voice input is not available in this browser. You can type instead.',
    required: 'You can add the requirement later while choosing a worker.',
    mic: 'Microphone access was blocked. You can type instead.',
    noSpeech: 'No speech was detected. Try again or type your requirement.',
    voiceError: 'Voice input had a problem. You can type your requirement instead.',
    tip: 'You do not have to speak. Continue works even with an empty note.',
    saved: 'Your note will be carried to the worker request.'
  },
  hi: {
    badge: 'सेवा अनुरोध',
    title: 'हमें बताएं',
    highlight: 'आपको क्या चाहिए।',
    description: 'अपनी जरूरत लिखें, बोलकर बताएं, या इस चरण को छोड़कर पहले कामगार चुनें।',
    label: 'आपकी काम की जरूरत',
    placeholder: 'उदाहरण: कमरे का स्विच खराब है और सीलिंग फैन नहीं चल रहा है।',
    start: 'आवाज़ शुरू करें',
    stop: 'सुनना बंद करें',
    clear: 'साफ़ करें',
    next: 'कामगार देखें',
    optional: 'यह चरण वैकल्पिक है',
    words: 'शब्द',
    ready: 'आवाज़ के लिए तैयार',
    listening: 'सुन रहे हैं...',
    supported: 'इस ब्राउज़र में वॉइस इनपुट उपलब्ध है।',
    unsupported: 'इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है। आप लिख सकते हैं।',
    required: 'आप कामगार चुनते समय बाद में अपनी जरूरत लिख सकते हैं।',
    mic: 'माइक्रोफ़ोन की अनुमति नहीं मिली। आप लिख सकते हैं।',
    noSpeech: 'आवाज़ नहीं मिली। दोबारा बोलें या लिखकर बताएं।',
    voiceError: 'वॉइस इनपुट में समस्या आई। आप अपनी जरूरत लिख सकते हैं।',
    tip: 'आपको बोलना जरूरी नहीं है। खाली नोट के साथ भी आगे बढ़ सकते हैं।',
    saved: 'आपका नोट कामगार के अनुरोध में साथ जाएगा।'
  }
};

function TranslationVoice({ onBack, onContinue }) {
  const [language, setLanguage] = useState('en');
  const [problem, setProblem] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);
  const speechCtorRef = useRef(null);
  const t = copy[language];

  useEffect(() => {
    speechCtorRef.current = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }, []);

  useEffect(() => () => {
    recognitionRef.current?.abort?.();
  }, []);

  const startListening = () => {
    setError('');
    const SpeechRecognition = speechCtorRef.current || window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError(t.unsupported);
      return;
    }

    recognitionRef.current?.abort?.();

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results || [])
        .map((result) => result?.[0]?.transcript || '')
        .join(' ')
        .trim();

      if (transcript) {
        setProblem((previous) => `${previous.trim()}${previous.trim() ? ' ' : ''}${transcript}`.trim());
        setError('');
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error === 'aborted') return;
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError(t.mic);
      } else if (event.error === 'no-speech') {
        setError(t.noSpeech);
      } else {
        setError(t.voiceError);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch {
      setIsListening(false);
      recognitionRef.current = null;
      setError(t.voiceError);
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop?.();
    setIsListening(false);
  };

  const continueWithRequest = () => {
    stopListening();
    const value = problem.trim();

    if (value) {
      localStorage.setItem(
        'anvaya_service_request',
        JSON.stringify({ problem: value, language })
      );
    } else {
      localStorage.removeItem('anvaya_service_request');
    }

    setError('');
    onContinue?.(value);
  };

  const wordCount = problem.trim() ? problem.trim().split(/\s+/).length : 0;

  return (
    <main className="min-h-screen bg-[#FFF9F4] text-slate-800">
      <header className="border-b border-amber-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:px-8">
          <div className="flex items-center gap-3">
            <img src="/anvaya-logo.png" alt="Anvaya" className="h-11 w-auto object-contain sm:h-12" />
            <div className="hidden border-l border-slate-200 pl-4 sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Anvaya</p>
              <p className="text-sm font-semibold text-slate-600">{t.badge}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher
              language={language}
              onLanguageChange={(next) => {
                stopListening();
                setLanguage(next);
                setError('');
              }}
            />
            <button type="button" onClick={onBack} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm hover:border-amber-300 hover:text-amber-700">
              ← {language === 'hi' ? 'वापस' : 'Back'}
            </button>
          </div>
        </div>
      </header>

      <section className="bg-[#FFF1E6]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 sm:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">🎙️ {t.badge}</span>
              <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">{t.optional}</span>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
              {t.title} <span className="text-amber-600">{t.highlight}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">{t.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 sm:px-8">
        <div className="grid gap-7 lg:grid-cols-[1.45fr_0.75fr]">
          <section className="rounded-3xl border border-amber-100 bg-white p-5 shadow-xl sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">{t.label}</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">{language === 'hi' ? 'काम का विवरण' : 'Describe the work'}</h2>
              </div>
              <span className={`w-fit rounded-full px-4 py-2 text-xs font-bold ${isListening ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>
                ● {isListening ? t.listening : t.ready}
              </span>
            </div>

            <div className="relative mt-6">
              <textarea
                value={problem}
                onChange={(event) => {
                  setProblem(event.target.value);
                  setError('');
                }}
                rows={8}
                maxLength={2000}
                placeholder={t.placeholder}
                className="w-full resize-none rounded-2xl border border-slate-200 bg-[#FFFDFC] px-5 py-5 text-base leading-7 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
              />
              <span className="absolute bottom-4 right-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-400 shadow-sm">
                {wordCount} {t.words}
              </span>
            </div>

            <button type="button" onClick={isListening ? stopListening : startListening} className={`mt-4 flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-bold shadow-lg transition ${isListening ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-amber-600 text-white hover:bg-amber-700'}`}>
              <span className="text-lg">{isListening ? '⏹' : '🎙️'}</span>
              {isListening ? t.stop : t.start}
            </button>

            {error && <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-900">{error}</div>}

            <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 text-sm leading-6 text-emerald-800">
              <b>{language === 'hi' ? 'ध्यान दें:' : 'Note:'}</b> {t.tip}
            </div>

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={() => { setProblem(''); setError(''); }} disabled={!problem && !error} className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-600 disabled:opacity-40">
                {t.clear}
              </button>
              <button type="button" onClick={continueWithRequest} className="rounded-xl bg-slate-900 px-7 py-3.5 font-bold text-white shadow-md transition hover:bg-slate-800">
                {t.next} →
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">{t.saved}</p>
          </section>

          <aside className="space-y-5">
            <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-2xl">👂</div>
              <h2 className="mt-5 text-xl font-bold text-slate-900">{language === 'hi' ? 'बोलकर या लिखकर बताएं' : 'Speak or type'}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-500">{language === 'hi' ? 'माइक ठीक से काम न करे तो कोई समस्या नहीं। बॉक्स में सीधे लिखें और आगे बढ़ें।' : 'If voice input does not work, no problem. Type directly in the box and continue.'}</p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <p className="text-sm font-bold text-slate-900">{language === 'hi' ? 'आगे क्या होगा?' : 'What happens next?'}</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p><span className="mr-2">1.</span> {language === 'hi' ? 'कामगार चुनें' : 'Choose a worker'}</p>
                <p><span className="mr-2">2.</span> {language === 'hi' ? 'कामगार आपका विवरण पढ़ेगा' : 'Worker reads your requirement'}</p>
                <p><span className="mr-2">3.</span> {language === 'hi' ? 'कामगार अपनी कीमत बताएगा' : 'Worker sends a quote'}</p>
              </div>
            </section>

            <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">Anvaya</p>
              <h2 className="mt-3 text-xl font-bold">{language === 'hi' ? 'कीमत पहले साफ़' : 'Clear pricing before work'}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{language === 'hi' ? 'कामगार पहले अनुरोध स्वीकार करेगा और फिर कीमत बताएगा। ग्राहक की मंजूरी के बाद ही काम शुरू होगा।' : 'The worker reviews the request and quotes first. Work starts only after the customer accepts the quote.'}</p>
            </section>
          </aside>
        </div>
      </section>

      <footer className="border-t border-amber-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 text-center text-sm text-slate-400">Trusted workers. Better connections. Stronger communities.</div>
      </footer>
    </main>
  );
}

export default TranslationVoice;
