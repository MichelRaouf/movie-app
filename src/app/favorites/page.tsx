"use client";

import Link from "next/link";
import { useMovieStore } from "@/stores/useMovieStore";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useMovieStore();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorite Movies</h1>

      {favorites.length === 0 && <p>No favorites yet!</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favorites.map((movie) => (
          <div key={movie.id} className="border p-2 rounded">
            <Link href={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded"
              />
              <h2 className="font-bold text-sm mt-2">{movie.title}</h2>
              <p className="text-xs text-gray-600">{movie.release_date}</p>
              <p className="text-xs">⭐ {movie.vote_average}</p>
            </Link>
            <button
              onClick={() => removeFavorite(movie.id)}
              className="mt-2 text-xs bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
