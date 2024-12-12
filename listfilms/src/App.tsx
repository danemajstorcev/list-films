import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";
import FilmList from "./components/FilmList";
import LanguageSwitcher from "./components/LanguageSwitcher";
import "./App.css";

const App = () => {
  const [language, setLanguage] = useState<string>("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  return (
    <ApolloProvider client={client}>
      <div className="app">
        <h1>{language === "en" ? "Star Wars Films" : "Star Wars Filme"}</h1>
        <LanguageSwitcher language={language} toggleLanguage={toggleLanguage} />
        <FilmList language={language} />
      </div>
    </ApolloProvider>
  );
};

export default App;
