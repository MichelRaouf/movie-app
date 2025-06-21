const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getMovieDetails(id: string) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}
