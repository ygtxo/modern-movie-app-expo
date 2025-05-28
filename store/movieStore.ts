import { create } from "zustand";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface MovieStore {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  movie: Movie | null;
  setMovie: (movie: Movie | null) => void;
  favorites: Movie[];
  setFavorites: (favorites: Movie[]) => void;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
  movie: null,
  setMovie: (movie) => set({ movie }),
  favorites: [],
  setFavorites: (favorites) => set({ favorites }),
  addFavorite: (movie) =>
    set((state) => ({
      favorites: [...state.favorites, movie],
    })),
  removeFavorite: (movieId) =>
    set((state) => ({
      favorites: state.favorites.filter((movie) => movie.id !== movieId),
    })),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  searchText: "",
  setSearchText: (searchText) => set({ searchText }),
}));
