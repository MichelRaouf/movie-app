"use client";

import { useMovieStore } from "@/stores/useMovieStore";
import Link from "next/link";
import Image from "next/image";
import styles from "./Favorites.module.css";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useMovieStore();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Your Favorite Movies</h1>

      <div className={styles.grid}>
        {favorites.map((movie) => (
          <div key={movie.id} className={styles.card}>
            <Link href={`/movie/${movie.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className={styles.image}
              />
              <h2 className={styles.movieTitle}>{movie.title}</h2>
              <p className={styles.meta}>{movie.release_date}</p>
              <p className={styles.meta}>⭐ {movie.vote_average}</p>
            </Link>

            <button
              onClick={() => removeFavorite(movie.id)}
              className={`${styles.button} ${styles.remove}`}
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
