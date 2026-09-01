import { useEffect, useRef, useState } from "react";
import LanguageSwitcher from "./languageSwitcher";
import { useLanguage } from "./LanguageContext";
const translations = {
  en: {
    badge: "Voice-powered service request",
    title: "Tell us what",
    highlight: "you need.",
    description:
      "Describe your problem in your own words. You can type it or simply speak.",
    problemLabel: "Describe your problem",
    placeholder:
      "Example: I need an electrician to install two ceiling fans...",
    startVoice: "Start Voice",
    stopVoice: "Stop Listening",
    listening: "Listening...",
    clear: "Clear",
    submit: "Submit Request",
    language: "Language",
    ready: "Ready to listen",
    speaking: "Listening to you...",
    supported: "Voice input is supported in this browser.",
    unsupported: "Voice input is not supported in this browser.",
    submitted: "Request submitted successfully!",
    tipTitle: "Speak naturally",
    tipText:
      "You don't need to use special commands. Just explain your problem normally.",
    words: "words",
  },

  hi: {
    badge: "आवाज़ से सेवा अनुरोध",
    title: "हमें बताएं",
    highlight: "आपको क्या चाहिए।",
    description:
      "अपनी समस्या अपने शब्दों में बताएं। आप टाइप कर सकते हैं या अपनी आवाज़ का इस्तेमाल कर सकते हैं।",
    problemLabel: "अपनी समस्या बताएं",
    placeholder:
      "उदाहरण: मुझे दो सीलिंग फैन लगाने के लिए इलेक्ट्रिशियन चाहिए...",
    startVoice: "आवाज़ शुरू करें",
    stopVoice: "सुनना बंद करें",
    listening: "सुन रहे हैं...",
    clear: "साफ़ करें",
    submit: "अनुरोध भेजें",
    language: "भाषा",
    ready: "आवाज़ के लिए तैयार",
    speaking: "आपकी बात सुनी जा रही है...",
    supported: "इस ब्राउज़र में वॉइस इनपुट उपलब्ध है।",
    unsupported: "इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है।",
    submitted: "अनुरोध सफलतापूर्वक भेज दिया गया!",
    tipTitle: "स्वाभाविक रूप से बोलें",
    tipText:
      "आपको कोई विशेष कमांड बोलने की जरूरत नहीं है। बस अपनी समस्या सामान्य तरीके से बताएं।",
    words: "शब्द",
  },
};

function TranslationVoice({ onBack,onContinue }) {
  const [language, setLanguage] = useState("en");
  const [problem, setProblem] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);

  const t = translations[language];

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const isSupported = Boolean(SpeechRecognition);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const changeLanguage = (newLanguage) => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setLanguage(newLanguage);
    setError("");
    setSubmitted(false);
  };

  const startListening = () => {
    setError("");
    setSubmitted(false);

    if (!SpeechRecognition) {
      setError(t.unsupported);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += transcript;
        } else {
          interimText += transcript;
        }
      }

      if (finalText) {
        setProblem((previous) => {
          const separator = previous.trim() ? " " : "";
          return previous + separator + finalText.trim();
        });
      }

      if (interimText) {
        setError(`${t.speaking} "${interimText}"`);
      } else {
        setError("");
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);

      if (event.error === "not-allowed") {
        setError(
          language === "hi"
            ? "माइक्रोफ़ोन की अनुमति दें और फिर दोबारा प्रयास करें।"
            : "Please allow microphone access and try again."
        );
      } else if (event.error === "no-speech") {
        setError(
          language === "hi"
            ? "कोई आवाज़ नहीं मिली। कृपया दोबारा बोलें।"
            : "No speech detected. Please try again."
        );
      } else {
        setError(
          language === "hi"
            ? "वॉइस इनपुट में समस्या आई। कृपया दोबारा प्रयास करें।"
            : "There was a problem with voice input. Please try again."
        );
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsListening(false);
    setError("");
  };

  const clearProblem = () => {
    setProblem("");
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = () => {
    if (!problem.trim()) {
      setError(
        language === "hi"
          ? "कृपया पहले अपनी समस्या बताएं।"
          : "Please describe your problem first."
      );
      return;
    }

    if (isListening) {
      stopListening();
    }

    setSubmitted(true);
    setError("");
  };

  const wordCount = problem.trim()
    ? problem.trim().split(/\s+/).length
    : 0;

  return (
    <main className="min-h-screen bg-[#FFF8F3] text-slate-800">
      {/* HEADER */}
      <header className="border-b border-amber-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <img
              src="/anvaya-logo.png"
              alt="Anvaya"
              className="h-12 w-auto object-contain"
            />

            <div className="hidden border-l border-slate-200 pl-4 sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                Anvaya
              </p>

              <p className="text-sm font-semibold text-slate-700">
                {t.badge}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher
              language={language}
              onLanguageChange={changeLanguage}
            />

            <button
              onClick={onBack}
              className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-amber-300 hover:text-amber-700 hover:shadow-md"
            >
              <span>←</span>
              <span>Back</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#FFF1E6]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-bold text-amber-700 shadow-sm">
              <span>🎙️</span>
              <span>{t.badge}</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-6xl">
              {t.title}
              <span className="text-amber-600"> {t.highlight}</span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.7fr]">
          {/* DESCRIPTION CARD */}
          <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-xl sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                  {t.problemLabel}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {language === "en"
                    ? "Describe your requirement"
                    : "अपनी आवश्यकता बताएं"}
                </h2>
              </div>

              <div
                className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
                  isListening
                    ? "bg-red-50 text-red-600"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isListening
                      ? "animate-pulse bg-red-500"
                      : "bg-emerald-500"
                  }`}
                />

                {isListening ? t.listening : t.ready}
              </div>
            </div>

            {/* TEXTAREA */}
            <div className="relative mt-7">
              <textarea
                value={problem}
                onChange={(e) => {
                  setProblem(e.target.value);
                  setSubmitted(false);
                  setError("");
                }}
                rows={9}
                placeholder={t.placeholder}
                className="w-full resize-none rounded-2xl border border-slate-200 bg-[#FFFDFC] px-5 py-5 text-base leading-7 text-slate-800 outline-none transition duration-300 placeholder:text-slate-400 hover:border-amber-300 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
              />

              <div className="absolute bottom-4 right-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-400 shadow-sm">
                {wordCount} {t.words}
              </div>
            </div>

            {/* VOICE BUTTON */}
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`mt-5 flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 font-bold shadow-lg transition-all duration-300 ${
                isListening
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-amber-600 text-white hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl"
              }`}
            >
              <span className="text-xl">
                {isListening ? "⏹" : "🎙️"}
              </span>

              <span>
                {isListening ? t.stopVoice : t.startVoice}
              </span>

              {isListening && (
                <span className="ml-1 flex gap-1">
                  <span className="h-4 w-1 animate-pulse rounded-full bg-white" />
                  <span className="h-6 w-1 animate-pulse rounded-full bg-white [animation-delay:150ms]" />
                  <span className="h-3 w-1 animate-pulse rounded-full bg-white [animation-delay:300ms]" />
                </span>
              )}
            </button>

            {/* ERROR / STATUS */}
            {error && (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-800">
                {error}
              </div>
            )}

            {submitted && (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  ✓
                </span>

                <span>{t.submitted}</span>
              </div>
            )}

            {/* ACTIONS */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={clearProblem}
                disabled={!problem && !submitted}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-bold text-slate-600 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t.clear}
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-xl bg-slate-900 px-7 py-3.5 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
              >
                {t.submit} →
              </button>
            </div>
          </section>

          {/* SIDE INFO */}
          <aside className="space-y-6">
            <section className="rounded-3xl border border-amber-100 bg-white p-6 shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-2xl">
                🎙️
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                {t.tipTitle}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {t.tipText}
              </p>
            </section>

            <section className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-xl">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-bold text-emerald-800">
                    {language === "en"
                      ? "Voice input"
                      : "वॉइस इनपुट"}
                  </p>

                  <p className="mt-1 text-xs text-emerald-700">
                    {isSupported
                      ? t.supported
                      : t.unsupported}
                  </p>
                </div>
              </div>
            </section>
        { /* <section className="relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-900 p-6 text-white shadow-lg">
  <div className="min-w-0">
    <p className="m-0 w-full break-words text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
      Anvaya
    </p>

    <h2 className="mt-3 w-full break-words text-xl font-bold">
      {language === "en"
        ? "Simple. Local. Trusted."
        : "आसान। स्थानीय। भरोसेमंद।"}
    </h2>

    <p className="mt-3 w-full break-words text-sm leading-6 text-slate-300">
      {language === "en"
        ? "Describe your problem and connect with the right professional."
        : "अपनी समस्या बताएं और सही प्रोफेशनल से जुड़ें।"}
    </p>
  </div>
</section>
             */
             }
             <section className="relative w-full overflow-hidden rounded-3xl border border-slate-100 bg-slate-900 p-6 text-white shadow-lg">
  <p className="m-0 block w-full text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
  -ANVAYA
  </p>

  <h2 className="mt-3 block w-full text-xl font-bold text-white">
  {language === "en"
    ? "Simple. Local. Trusted."
    : "आसान। स्थानीय। भरोसेमंद।"}
</h2>

<p className="mt-3 block w-full text-sm leading-6 text-slate-300">
  {language === "en"
    ? "Describe your problem and connect with the right professional."
    : "अपनी समस्या बताएं और सही प्रोफेशनल से जुड़ें।"}
</p>
</section>

            
          </aside>
        </div>
      </section>
      <div className="flex justify-end border-t border-amber-100 bg-white px-5 py-6 sm:px-8">
  <button
    type="button"
    onClick={onContinue}
    className="group flex items-center gap-3 rounded-2xl bg-amber-600 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-amber-700 hover:shadow-xl active:translate-y-0"
  >
    <span>{language === "en" ? "Next" : "आगे"}</span>

    <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
      →
    </span>
  </button>
</div>

      {/* FOOTER */}
      <footer className="border-t border-amber-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 text-center">
          <p className="text-sm text-slate-400">
  {language === "en"
    ? "Trusted workers. Better connections. Stronger communities."
    : "विश्वसनीय वर्कर्स। बेहतर कनेक्शन। मजबूत समुदाय।"}
</p>
        </div>

      </footer>
    </main>
  );
}

export default TranslationVoice;