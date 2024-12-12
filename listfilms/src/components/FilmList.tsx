import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FILMS } from "../apolloClient";

interface Film {
  id: string;
  title: string;
  episodeID: number;
  director: string;
  producers: string[];
  releaseDate: string;
}

interface FilmListProps {
  language: string;
}

const FilmList: React.FC<FilmListProps> = ({ language }) => {
  const { loading, error, data } = useQuery(GET_FILMS);
  const [filteredDirector, setFilteredDirector] = useState<string>("");
  const [filteredYear, setFilteredYear] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("title");

  if (loading) return <p>{language === "en" ? "Loading..." : "Laden..."}</p>;
  if (error) return <p>{language === "en" ? `Error: ${error.message}` : `Fehler: ${error.message}`}</p>;

  const films = data?.allFilms?.films || [];

  const filterFilms = films
    .filter((film: Film) => {
      return (
        (filteredDirector ? film.director.toLowerCase().includes(filteredDirector.toLowerCase()) : true) &&
        (filteredYear ? new Date(film.releaseDate).getFullYear() === filteredYear : true)
      );
    })
    .sort((a: Film, b: Film) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
    });

  const handleDirectorFilter = (e: React.ChangeEvent<HTMLInputElement>) => setFilteredDirector(e.target.value);
  const handleYearFilter = (e: React.ChangeEvent<HTMLInputElement>) => setFilteredYear(Number(e.target.value));

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder={language === "en" ? "Filter by Director..." : "Filtern nach Regisseur..."}
          value={filteredDirector}
          onChange={handleDirectorFilter}
        />
        <input
          type="number"
          placeholder={language === "en" ? "Filter by Year..." : "Filtern nach Jahr..."}
          value={filteredYear || ""}
          onChange={handleYearFilter}
        />
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="title">{language === "en" ? "Sort by Title" : "Sortieren nach Titel"}</option>
          <option value="releaseDate">{language === "en" ? "Sort by Release Date" : "Sortieren nach Veröffentlichungsdatum"}</option>
        </select>
      </div>

      <ul>
        {filterFilms.map((film: Film) => (
          <li key={film.id} className="film-item">
            <h3>{film.title}</h3>
            <p>
              <strong>{language === "en" ? "Episode ID:" : "Episoden ID:"} </strong>{film.episodeID}
            </p>
            <p>
              <strong>{language === "en" ? "Director:" : "Regisseur:"} </strong>{film.director}
            </p>
            <p>
              <strong>{language === "en" ? "Producers:" : "Produzenten:"} </strong>{film.producers.join(", ")}
            </p>
            <p>
              <strong>{language === "en" ? "Release Date:" : "Veröffentlichungsdatum:"} </strong>
              {new Date(film.releaseDate).toLocaleDateString(language === "en" ? "en-US" : "de-DE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilmList;
