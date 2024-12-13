import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FILMS } from "../../apolloClient";
import "./FilmList.css";
import FilmCard from "../FilmCard/FilmCard";
import { Film, FilmListProps } from "../../interfaces/interfaces";

const FilmList = ({ language }: FilmListProps) => {
  const { data, loading, error } = useQuery(GET_FILMS);
  const [directorFilter, setDirectorFilter] = useState<string>("");
  const [releaseYearFilter, setReleaseYearFilter] = useState<string>("");
  const [sortKey, setSortKey] = useState<string>("title");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 2;

  if (loading) return <p>{language === "en" ? "Loading..." : "Lädt..."}</p>;
  if (error) return <p>{language === "en" ? "Error!" : "Fehler!"}</p>;

  const films: Film[] = data.allFilms.films;

  const uniqueDirectors = Array.from(
    new Set(films.map((film) => film.director))
  );
  const uniqueReleaseYears = Array.from(
    new Set(films.map((film) => new Date(film.releaseDate).getFullYear()))
  ).sort();

  const filteredFilms = films.filter((film) => {
    const matchesDirector = directorFilter
      ? film.director === directorFilter
      : true;
    const matchesYear = releaseYearFilter
      ? new Date(film.releaseDate).getFullYear().toString() ===
        releaseYearFilter
      : true;
    return matchesDirector && matchesYear;
  });

  filteredFilms.sort((a, b) => {
    if (sortKey === "title") return a.title.localeCompare(b.title);
    if (sortKey === "releaseDate")
      return (
        new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
      );
    return 0;
  });

  const totalPages = Math.ceil(filteredFilms.length / itemsPerPage);
  const paginatedFilms = filteredFilms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction: string) => {
    if (direction === "prev" && currentPage > 1)
      setCurrentPage(currentPage - 1);
    if (direction === "next" && currentPage < totalPages)
      setCurrentPage(currentPage + 1);
  };

  return (
    <div className="film-list">
      <div className="filters">
        <label>
          {language === "en" ? "Director:" : "Regisseur:"}
          <select
            value={directorFilter}
            onChange={(e) => setDirectorFilter(e.target.value)}
          >
            <option value="">{language === "en" ? "All" : "Alle"}</option>
            {uniqueDirectors.map((director) => (
              <option key={director} value={director}>
                {director}
              </option>
            ))}
          </select>
        </label>

        <label>
          {language === "en" ? "Release Year:" : "Erscheinungsjahr:"}
          <select
            value={releaseYearFilter}
            onChange={(e) => setReleaseYearFilter(e.target.value)}
          >
            <option value="">{language === "en" ? "All" : "Alle"}</option>
            {uniqueReleaseYears.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label>
          {language === "en" ? "Sort by:" : "Sortieren nach:"}
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="title">
              {language === "en" ? "Title" : "Titel"}
            </option>
            <option value="releaseDate">
              {language === "en" ? "Release Date" : "Erscheinungsdatum"}
            </option>
          </select>
        </label>
      </div>

      <div className="film-cards">
        {filteredFilms.length === 0 ? (
          <div className="no-films-card">
            <h3>
              {language === "en" ? "No movies found" : "Keine Filme gefunden"}
            </h3>
            <p>
              {language === "en"
                ? "No movies match the applied filters."
                : "Keine Filme entsprechen den angewandten Filtern."}
            </p>
          </div>
        ) : (
          paginatedFilms.map((film) => (
<FilmCard key={film.id} film={film} language={language} />
          ))
        )}
      </div>

      {filteredFilms.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            {language === "en" ? "Previous" : "Vorherige"}
          </button>
          <span>
            {language === "en" ? "Page" : "Seite"} {currentPage}{" "}
            {language === "en" ? "of" : "von"} {totalPages}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            {language === "en" ? "Next" : "Nächste"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FilmList;