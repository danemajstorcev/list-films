import "./LanguageSwitcher.css";
import { LanguageSwitcherProps } from "../../interfaces/interfaces";

const LanguageSwitcher = ({ language, toggleLanguage }: LanguageSwitcherProps) => {
  return (
    <footer className="language-switcher">
      <button onClick={toggleLanguage}>
        <span>
          {language === "en" ? "Switch to German" : "Wechseln zu Englisch"}
        </span>
        <img
          src={language === "en" ? "/german.png" : "/uk.png"}
          alt={language === "en" ? "German Flag" : "UK Flag"}
          className="mini-flag"
        />
      </button>
    </footer>
  );
};

export default LanguageSwitcher;
