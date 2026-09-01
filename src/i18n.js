import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      common: {
        appName: "Anvaya",
        back: "Back",
        continue: "Continue",
        save: "Save",
        cancel: "Cancel",
      },

      language: {
        english: "English",
        hindi: "हिंदी",
        select: "Language",
      },

      problem: {
        title: "Describe Your Problem",
        subtitle: "Tell us what help you need",
        placeholder:
          "Example: My ceiling fan is not working and needs repair...",
        voice: "Speak",
        listening: "Listening...",
        stop: "Stop",
        clear: "Clear",
        submit: "Find Workers",
        voiceHint: "Tap the microphone and describe your problem",
      },

      contractor: {
        dashboard: "Contractor Dashboard",
        welcome: "Manage your projects and workers",
        createProject: "Create Project",
        projects: "Projects",
        workers: "Workers",
        findWorkers: "Find & Assign Workers",
        availableWorkers: "Available Workers",
        assignedWorkers: "Assigned Workers",
        noWorkers: "No workers assigned yet",
        assign: "Assign Worker",
        remove: "Remove",
        projectDetails: "Project Details",
        projectName: "Project Name",
        location: "Location",
        description: "Description",
        budget: "Budget",
        deadline: "Deadline",
        create: "Create Project",
        planning: "Planning",
        search: "Search workers...",
        all: "All",
        selected: "selected",
        viewProject: "View Project",
      },

      messages: {
        voiceNotSupported:
          "Voice input is not supported in this browser.",
        listening: "I'm listening...",
        workerAssigned: "Worker assigned successfully.",
        workerRemoved: "Worker removed successfully.",
        projectCreated: "Project created successfully.",
      },
    },
  },

  hi: {
    translation: {
      common: {
        appName: "अन्वय",
        back: "वापस",
        continue: "जारी रखें",
        save: "सहेजें",
        cancel: "रद्द करें",
      },

      language: {
        english: "English",
        hindi: "हिंदी",
        select: "भाषा",
      },

      problem: {
        title: "अपनी समस्या बताएं",
        subtitle: "बताएं कि आपको किस मदद की आवश्यकता है",
        placeholder:
          "उदाहरण: मेरा सीलिंग फैन काम नहीं कर रहा है और इसकी मरम्मत चाहिए...",
        voice: "बोलें",
        listening: "सुन रहे हैं...",
        stop: "रोकें",
        clear: "साफ करें",
        submit: "वर्कर खोजें",
        voiceHint: "माइक्रोफ़ोन दबाएं और अपनी समस्या बताएं",
      },

      contractor: {
        dashboard: "कॉन्ट्रैक्टर डैशबोर्ड",
        welcome: "अपने प्रोजेक्ट और वर्कर्स को मैनेज करें",
        createProject: "प्रोजेक्ट बनाएं",
        projects: "प्रोजेक्ट्स",
        workers: "वर्कर्स",
        findWorkers: "वर्कर्स खोजें और असाइन करें",
        availableWorkers: "उपलब्ध वर्कर्स",
        assignedWorkers: "असाइन किए गए वर्कर्स",
        noWorkers: "अभी कोई वर्कर असाइन नहीं किया गया",
        assign: "वर्कर असाइन करें",
        remove: "हटाएं",
        projectDetails: "प्रोजेक्ट की जानकारी",
        projectName: "प्रोजेक्ट का नाम",
        location: "स्थान",
        description: "विवरण",
        budget: "बजट",
        deadline: "अंतिम तारीख",
        create: "प्रोजेक्ट बनाएं",
        planning: "प्लानिंग",
        search: "वर्कर खोजें...",
        all: "सभी",
        selected: "चयनित",
        viewProject: "प्रोजेक्ट देखें",
      },

      messages: {
        voiceNotSupported:
          "इस ब्राउज़र में वॉइस इनपुट सपोर्ट नहीं करता।",
        listening: "मैं सुन रहा हूँ...",
        workerAssigned: "वर्कर सफलतापूर्वक असाइन किया गया।",
        workerRemoved: "वर्कर सफलतापूर्वक हटा दिया गया।",
        projectCreated: "प्रोजेक्ट सफलतापूर्वक बनाया गया।",
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;