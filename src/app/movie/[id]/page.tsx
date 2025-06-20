// src/app/movie/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";

interface MovieDetailsPageProps {
  params: { id: string };
}

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function getMovieDetails(id: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
  );

  if (!res.ok) return null;

  return res.json();
}

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const movie = await getMovieDetails(params.id);

  if (!movie) return notFound();

  const {
    title,
    overview,
    backdrop_path,
    poster_path,
    release_date,
    vote_average,
    runtime,
    genres,
    credits,
  } = movie;

  const director = credits?.crew?.find(
    (person: any) => person.job === "Director"
  )?.name;
  const cast = credits?.cast
    ?.slice(0, 5)
    .map((actor: any) => actor.name)
    .join(", ");

  return (
    <div className="p-4">
      {backdrop_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
          alt={title}
          width={1280}
          height={720}
          className="rounded mb-4"
        />
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <Image
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          width={300}
          height={450}
          className="rounded"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600 mb-2">
            {release_date} • {runtime} min
          </p>
          <p className="mb-2">
            <strong>Rating:</strong> ⭐ {vote_average}
          </p>
          <p className="mb-2">
            <strong>Genre:</strong> {genres.map((g: any) => g.name).join(", ")}
          </p>
          <p className="mb-2">
            <strong>Director:</strong> {director}
          </p>
          <p className="mb-2">
            <strong>Cast:</strong> {cast}
          </p>
          <p className="mt-4">{overview}</p>
        </div>
      </div>
    </div>
  );
}
