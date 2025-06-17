const BASE_URL = "http://www.omdbapi.com/?apikey=e51de3bc&"

export const searchMovies = async (query, page=1) => {
  const response = await fetch(`${BASE_URL}s=${query}&page=${page}`);
  const data = await response.json();
  return data;
};