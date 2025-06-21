"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Home.module.css";
import { useMovieStore } from "../../stores/useMovieStore";
import Navbar from "../components/navbar";

export default function Home() {
  const [query, setQuery] = useState("");
  const {
    movies,
    searchMovies,
    loading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useMovieStore();

  useEffect(() => {
    searchMovies("");
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchMovies(query);
  };

  return (
    <main className={styles.container}>
      <div className={styles.formWrapper}>
        <form onSubmit={handleSearch} className={styles.form}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className={styles.input}
          />
        </form>
      </div>

      {loading && <p className={styles.message}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && movies.length === 0 && query && (
        <p className={styles.message}>No movies found for “{query}”.</p>
      )}

      <div className={styles.grid}>
        {movies.map((movie) => {
          const isFav = isFavorite(movie.id);
          const releaseYear = new Date(movie.release_date).getFullYear();
          const rating = movie.vote_average.toFixed(1);

          return (
            <div key={movie.id} className={styles.card}>
              <Link href={`/movie/${movie.id}`}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={300}
                    className={styles.image}
                  />
                </div>
                <h2 className={styles.title}>{movie.title}</h2>
                <p className={styles.meta}>⭐ {rating}</p>
                <p className={styles.meta}>{releaseYear}</p>
              </Link>

              <button
                onClick={() =>
                  isFav ? removeFavorite(movie.id) : addFavorite(movie)
                }
                className={`${styles.favoriteButton} ${
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
