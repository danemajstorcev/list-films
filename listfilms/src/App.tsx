import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";
import FilmList from "./components/FilmList/FilmList";
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";
import { TRANSLATION } from "./constants/contstants";
import "./App.css";

const App = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "de" : "en"));
  };

  return (
    <ApolloProvider client={client}>
      <div className="app">
        <h1>{language === "en" ? `${TRANSLATION.en.title}` : `${TRANSLATION.de.title}`}</h1>
        <FilmList language={language} />
        <LanguageSwitcher language={language} toggleLanguage={toggleLanguage} />
        </div>
    </ApolloProvider>
  );
};

export default App;
