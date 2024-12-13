import { FilmCardProps } from "../../interfaces/interfaces";
import "./FilmCard.css";

const FilmCard = ({ film, language }: FilmCardProps) => {
  return (
    <div className="film-card">
      <h3>{film.title}</h3>
      <p>
        <strong>{language === "en" ? "Episode ID" : "Episoden-ID"}:</strong>{" "}
        {film.episodeID || "N/A"}
      </p>
      <p>
        <strong>{language === "en" ? "Director" : "Regisseur"}:</strong>{" "}
        {film.director}
      </p>
      <p>
        <strong>{language === "en" ? "Producers" : "Produzenten"}:</strong>{" "}
        {film.producers.join(", ")}
      </p>
      <p>
        <strong>
          {language === "en" ? "Release Date" : "Erscheinungsdatum"}:
        </strong>{" "}
        {new Date(film.releaseDate).toLocaleDateString(language, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>
  );
};

export default FilmCard;
