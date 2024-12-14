import { TRANSLATION } from "../../constants/contstants";
import { FilmCardProps } from "../../interfaces/interfaces";
import "./FilmCard.css";

const FilmCard = ({ film, language }: FilmCardProps) => {
  return (
    <div className="film-card">
      <h3>{film.title}</h3>
      <p>
        <strong>
          {language === "en"
            ? `${TRANSLATION.en.episodeId}`
            : `${TRANSLATION.de.episodeId}`}
          :
        </strong>{" "}
        {film.episodeID || "N/A"}
      </p>
      <p>
        <strong>
          {language === "en"
            ? `${TRANSLATION.en.director}`
            : `${TRANSLATION.de.director}`}
        </strong>{" "}
        {film.director}
      </p>
      <p>
        <strong>
          {language === "en"
            ? `${TRANSLATION.en.producers}`
            : `${TRANSLATION.de.producers}`}
          :
        </strong>{" "}
        {film.producers.join(", ")}
      </p>
      <p>
        <strong>
          {language === "en"
            ? `${TRANSLATION.en.releaseDateLabel}`
            : `${TRANSLATION.de.releaseDateLabel}`}
          :
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
