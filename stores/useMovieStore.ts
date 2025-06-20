// stores/useMovieStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MovieStore {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  favorites: Movie[];
  searchMovies: (query: string) => Promise<void>;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      movies: [],
      loading: false,
      error: null,
      favorites: [],

      searchMovies: async (query: string) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(`/api/search?query=${query}`);
          const data = await res.json();
          set({ movies: data, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      addFavorite: (movie) => {
        const favorites = get().favorites;
        if (!favorites.some((fav) => fav.id === movie.id)) {
          set({ favorites: [...favorites, movie] });
        }
      },

      removeFavorite: (id) => {
        set({ favorites: get().favorites.filter((m) => m.id !== id) });
      },

      isFavorite: (id) => {
        return get().favorites.some((m) => m.id === id);
      },
    }),
    {
      name: "movie-favorites", // key in localStorage
    }
  )
);
