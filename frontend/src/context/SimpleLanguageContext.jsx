// import React, { createContext, useState, useContext, useEffect } from "react";

// const LanguageContext = createContext();

// export const useSimpleLanguage = () => {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error("useSimpleLanguage must be used within SimpleLanguageProvider");
//   }
//   return context;
// };

// export const SimpleLanguageProvider = ({ children }) => {
//   const [language, setLanguage] = useState("ar");

//   const setLang = (lang) => {
//     setLanguage(lang);
//   };

//   const toggleLanguage = () => {
//     setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
//   };

//   return (
//     <LanguageContext.Provider value={{ language, toggleLanguage, setLang }}>
//       <div dir={language === "ar" ? "rtl" : "ltr"} className={language === "ar" ? "rtl" : "ltr"}>
//         {children}
//       </div>
//     </LanguageContext.Provider>
//   );
// };

// In your SimpleLanguageContext.js or App.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const SimpleLanguageContext = createContext();

export const useSimpleLanguage = () => useContext(SimpleLanguageContext);

export const SimpleLanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    // Update document direction based on language
    document.body.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", language);

    // Update Bootstrap's data-bs-theme attribute for RTL support
    if (language === "ar") {
      document.documentElement.setAttribute("data-bs-theme", "rtl");
    } else {
      document.documentElement.removeAttribute("data-bs-theme");
    }
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === "ar" ? "en" : "ar";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <SimpleLanguageContext.Provider value={{ language, toggleLanguage }}>{children}</SimpleLanguageContext.Provider>
  );
};
