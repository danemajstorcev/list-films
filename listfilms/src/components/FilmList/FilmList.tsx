import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FILMS } from "../../apolloClient";
import "./FilmList.css";
import FilmCard from "../FilmCard/FilmCard";
import { Film, FilmListProps } from "../../interfaces/interfaces";
import { TRANSLATION } from "../../constants/contstants";

const FilmList = ({ language }: FilmListProps) => {
  const { data, loading, error } = useQuery(GET_FILMS);
  const [directorFilter, setDirectorFilter] = useState("");
  const [releaseYearFilter, setReleaseYearFilter] = useState("");
  const [sortKey, setSortKey] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  if (loading)
    return (
      <p>
        {language === "en"
          ? `${TRANSLATION.en.loading}`
          : `${TRANSLATION.de.loading}`}
      </p>
    );
  if (error)
    return (
      <p>
        {language === "en"
          ? `${TRANSLATION.en.error}`
          : `${TRANSLATION.de.error}`}
      </p>
    );

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
          {language === "en"
            ? `${TRANSLATION.en.director}`
            : `${TRANSLATION.de.director}`}
          <select
            value={directorFilter}
            onChange={(e) => setDirectorFilter(e.target.value)}
          >
            <option value="">
              {language === "en"
                ? `${TRANSLATION.en.all}`
                : `${TRANSLATION.de.all}`}
            </option>
            {uniqueDirectors.map((director) => (
              <option key={director} value={director}>
                {director}
              </option>
            ))}
          </select>
        </label>

        <label>
          {language === "en"
            ? `${TRANSLATION.en.releaseYear}`
            : `${TRANSLATION.de.releaseYear}`}
          <select
            value={releaseYearFilter}
            onChange={(e) => setReleaseYearFilter(e.target.value)}
          >
            <option value="">
              {language === "en"
                ? `${TRANSLATION.en.all}`
                : `${TRANSLATION.de.all}`}
            </option>
            {uniqueReleaseYears.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label>
          {language === "en"
            ? `${TRANSLATION.en.sortBy}`
            : `${TRANSLATION.de.sortBy}`}
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="title">
              {language === "en"
                ? `${TRANSLATION.en.title}`
                : `${TRANSLATION.de.title}`}
            </option>
            <option value="releaseDate">
              {language === "en"
                ? `${TRANSLATION.en.releaseDateLabel}`
                : `${TRANSLATION.de.releaseDateLabel}`}
            </option>
          </select>
        </label>
      </div>

      <div className="film-cards">
        {filteredFilms.length === 0 ? (
          <div className="no-films-card">
            <h3>
              {language === "en"
                ? `${TRANSLATION.en.noMoviesTitle}`
                : `${TRANSLATION.de.noMoviesTitle}`}
            </h3>
            <p>
              {language === "en"
                ? `${TRANSLATION.en.noMoviesDescription}`
                : `${TRANSLATION.de.noMoviesDescription}`}
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
            {language === "en"
              ? `${TRANSLATION.en.previous}`
              : `${TRANSLATION.de.previous}`}
          </button>
          <span>
            {language === "en"
              ? `${TRANSLATION.en.page}`
              : `${TRANSLATION.de.page}`}{" "}
            {currentPage}{" "}
            {language === "en"
              ? `${TRANSLATION.en.of}`
              : `${TRANSLATION.de.of}`}{" "}
            {totalPages}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
          >
            {language === "en"
              ? `${TRANSLATION.en.next}`
              : `${TRANSLATION.de.next}`}
          </button>
        </div>
      )}
    </div>
  );
};

export default FilmList;
