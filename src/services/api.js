import axios from 'axios';

const API_KEY = '09d7a3eefc954f8342048cf5b31d1e79';
const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500';
const NO_POSTER =
  'https://fakeimg.pl/400x600/6693ba/ffffff?text=No+Poster&font=lobster';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchTrending = async () => {
  const params = {
    api_key: API_KEY,
    language: 'en-US',
  };
  const response = await axios.get('/trending/movie/day', { params });
  return response.data;
};

export const fetchMoviesByName = async name => {
  const params = {
    api_key: API_KEY,
    language: 'en-US',
    include_adult: false,
    query: name,
  };
  const response = await axios.get('search/movie', { params });
  return response.data;
};

export const fetchMovieDetails = async id => {
  const params = {
    api_key: API_KEY,
    language: 'en-US',
  };
  const response = await axios.get(`movie/${id}`, { params });
  return response.data;
};

export const fetchActors = async id => {
  const params = {
    api_key: API_KEY,
    language: 'en-US',
  };
  const response = await axios.get(`movie/${id}/credits`, { params });
  return response.data.cast
    .map(actor => {
      return {
        id: actor.id,
        name: actor.name,
        poster: getPoster(actor.profile_path),
      };
    })
    .slice(0, 10);
};

export const getPoster = url => (url ? BASE_POSTER_URL + url : NO_POSTER);
