import { getMovieDetails } from "../../../lib/api";
import Image from "next/image";
import styles from "./MovieDetails.module.css";

type Genre = {
  id: number;
  name: string;
};

type MovieDetails = {
  title: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genres: Genre[];
  runtime: number;
};

export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const movie: MovieDetails = await getMovieDetails(params.id);

  return (
    <main className={styles.container}>
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        width={1000}
        height={600}
        className={styles.backdrop}
      />
      <h1 className={styles.title}>{movie.title}</h1>
      <p className={styles.meta}>
        Released: {movie.release_date} | Rating: {movie.vote_average}
      </p>
      <p className={styles.section}>{movie.overview}</p>
      <p className={styles.section}>
        <strong>Genres:</strong>{" "}
        {movie.genres.map((g: Genre) => g.name).join(", ")}
      </p>
      <p className={styles.section}>
        <strong>Runtime:</strong> {movie.runtime} minutes
      </p>
    </main>
  );
}
