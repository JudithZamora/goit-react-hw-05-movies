import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams para obtener la ID de la URL
import { getTrendingMovies } from '../MovieApi';
import './staylepages.css'

const Pages = () => {
  const { id } = useParams(); // Obtiene la ID de la URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movies = await getTrendingMovies();
        const selectedMovie = movies.find((movie) => movie.id.toString() === id);
        setMovieDetails(selectedMovie);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchGenres = async () => {
      try {
        // Realiza la llamada a la API para obtener los géneros
        // ...
        // Una vez obtenidos, establece los géneros en el estado
        // setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchMovieDetails();
    fetchGenres();
  }, [id]);

  const getGenreNames = () => {
    const genreNames = movieDetails.genre_ids.map((genreId) => {
      const genre = genres.find((genre) => genre.id === genreId);
      return genre ? genre.name : '';
    });
    return genreNames.join(', ');
  };

  return (
    <div>
      {movieDetails && (
        <div className='pages-container'>
          <div className='pages-content'>
            <img width={200} src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
            <div className='pages-details'>
              <h2 className='pages-title'>{movieDetails.title} ({movieDetails.release_date.substring(0, 4)})</h2>
              <div className='pages-info'>
                <div style={{ fontSize: '20px' }}>User Score: {movieDetails.vote_average * 10}%</div>
                <div>Overview: {movieDetails.overview}</div>
                <div>Genre: {getGenreNames()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pages;
