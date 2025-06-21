import { create } from "zustand";
import { persist } from "zustand/middleware";
import { searchMovies, getPopularMovies } from "@/lib/api";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

type Store = {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  favorites: Movie[];
  searchMovies: (query: string) => Promise<void>;
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

export const useMovieStore = create<Store>()(
  persist(
    (set, get) => ({
      movies: [],
      loading: false,
      error: null,
      favorites: [],

      searchMovies: async (query: string) => {
        try {
          set({ loading: true, error: null });
          const data = query.trim()
            ? await searchMovies(query)
            : await getPopularMovies();

          set({ movies: data.results, loading: false });
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
        const updated = get().favorites.filter((m) => m.id !== id);
        set({ favorites: updated });
      },

      isFavorite: (id) => {
        return get().favorites.some((m) => m.id === id);
      },
    }),
    {
      name: "movie-store", // localStorage key
      partialize: (state) => ({ favorites: state.favorites }), // only persist favorites
    }
  )
);
