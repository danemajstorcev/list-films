import React from "react";

interface LanguageSwitcherProps {
  language: string;
  toggleLanguage: () => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, toggleLanguage }) => {
  return (
    <footer className="language-switcher">
      <button onClick={toggleLanguage}>
        {language === "en" ? "Switch to German" : "Wechseln zu Englisch"}
      </button>
    </footer>
  );
};

export default LanguageSwitcher;
