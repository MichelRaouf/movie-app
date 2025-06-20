"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMovieStore } from "@/stores/useMovieStore";

export default function Home() {
  const [query, setQuery] = useState("");
  const {
    movies = [],
    searchMovies,
    loading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useMovieStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await searchMovies(query.trim());
    }
  };

  return (
    <main className="p-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6 max-w-xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="p-2 border border-gray-300 rounded w-full text-base"
        />
      </form>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* No Results */}
      {!loading && movies.length === 0 && query && (
        <p className="text-center text-gray-500">
          No movies found for “{query}”.
        </p>
      )}

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {!loading &&
          movies.map((movie) => {
            const isFav = isFavorite(movie.id);

            return (
              <div
                key={movie.id}
                className="border p-2 rounded hover:shadow-md hover:scale-[1.02] transition-transform duration-200"
              >
                <Link href={`/movie/${movie.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={500}
                    height={750}
                    className="w-full h-auto rounded"
                  />
                  <h2 className="font-bold text-sm mt-2">{movie.title}</h2>
                  <p className="text-xs text-gray-600">{movie.release_date}</p>
                  <p className="text-xs">⭐ {movie.vote_average}</p>
                </Link>

                <button
                  onClick={() =>
                    isFav ? removeFavorite(movie.id) : addFavorite(movie)
                  }
                  className={`mt-2 text-xs px-2 py-1 rounded ${
                    isFav ? "bg-red-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {isFav ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            );
          })}
      </div>
    </main>
  );
}
