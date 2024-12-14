export interface LanguageSwitcherProps {
  language: string;
  toggleLanguage: () => void;
}

export interface Film {
  id: string;
  title: string;
  episodeID: number;
  director: string;
  producers: string[];
  releaseDate: string;
}
export interface FilmListProps {
  language: string;
}

export interface FilmCardProps {
  film: Film;
  language: string;
}
