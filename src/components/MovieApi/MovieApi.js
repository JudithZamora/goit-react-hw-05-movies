// MovieApi.js
import axios from 'axios';

const API_KEY = '6572c4084b513060a738f05bde64f117';

export const getTrendingMovies = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.data.results;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return response.data.results;
};
