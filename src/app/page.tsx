"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Home.module.css";
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
    if (query.trim()) await searchMovies(query.trim());
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className={styles.input}
        />
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && movies.length === 0 && query && (
        <p>No movies found for “{query}”.</p>
      )}

      <div className={styles.grid}>
        {movies.map((movie) => {
          const isFav = isFavorite(movie.id);

          return (
            <div key={movie.id} className={styles.card}>
              <Link href={`/movie/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className={styles.image}
                />
                <h2 className={styles.title}>{movie.title}</h2>
                <p className={styles.meta}>{movie.release_date}</p>
                <p className={styles.meta}>⭐ {movie.vote_average}</p>
              </Link>

              <button
                onClick={() =>
                  isFav ? removeFavorite(movie.id) : addFavorite(movie)
                }
                className={`${styles.button} ${
                  isFav ? styles.remove : styles.add
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
