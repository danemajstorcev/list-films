import { LanguageSwitcherProps } from "../../interfaces/interfaces";
import { TRANSLATION } from "../../constants/contstants";
import "./LanguageSwitcher.scss";

const LanguageSwitcher = ({
  language,
  toggleLanguage,
}: LanguageSwitcherProps) => {
  return (
    <footer className="language-switcher">
      <button onClick={toggleLanguage}>
        <span>
          {language === "en"
            ? `${TRANSLATION.en.switchToGerman}`
            : `${TRANSLATION.de.switchToEnglish}`}
        </span>
        <img
          src={
            language === "en" ? `${TRANSLATION.en.germanFlag}` : `${TRANSLATION.de.ukFlag}`
          }
          alt={
            language === "en"
              ? `${TRANSLATION.en.germanFlagAlt}`
              : `${TRANSLATION.de.ukFlagAlt}`
          }
          className="mini-flag"
        />
      </button>
    </footer>
  );
};

export default LanguageSwitcher;
