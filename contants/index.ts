export const API_KEY = "9ff5cac580df93f8805ec0c17a568ab6";
export const BASE_URL = "https://api.themoviedb.org/3";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};
