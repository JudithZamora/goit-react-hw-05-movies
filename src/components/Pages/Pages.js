import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { getTrendingMovies, getMovieCast, getMovieReviews } from '../MovieApi/MovieApi';
import './staylepages.css';

const API_KEY = '6572c4084b513060a738f05bde64f117';

const Pages = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]); 
  const [reviews, setReviews] = useState([]); 
  const [genres, setGenres] = useState([]);
  const [isCastVisible, setIsCastVisible] = useState(false);
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movies = await getTrendingMovies();
        const selectedMovie = movies.find((movie) => movie.id.toString() === id);
        setMovieDetails(selectedMovie);
        const castData = await getMovieCast(id); 
        setCast(castData);

        const reviewsData = await getMovieReviews(id); 
        setReviews(reviewsData);

        const genresResponse = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
        );
        setGenres(genresResponse.data.genres);

      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchGenres = async () => {
      try {
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
//ocultar cast
  const toggleCastVisibility = () => {
    setIsCastVisible(!isCastVisible);
  };
//ocultar review
  const toggleReviewsVisibility = () => {
    setIsReviewsVisible(!isReviewsVisible); 
  };

  return (
    <div>
      <Link className='back' to="/container">&#8592; Go Back</Link> 
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
      <div className='line'> </div>
      <div className='page-info'>
        <h2>Additional Information</h2>
        <ul className='page-ul'>
          <li className='page-cast'>
          <Link to={`/pages/${id}/cast`} onClick={toggleCastVisibility}> 
              <h3>Cast</h3>
            </Link>
            {isCastVisible && ( 
              <ul>
                {cast.map((actor) => (
                  <li key={actor.id}>{actor.name}
                  {actor.profile_path && (
                  <img className='img-cast' width={100} src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={`${actor.name} Profile`} />
                )}
                  <p>Actor: {actor.name}</p>
                  <p>Character: {actor.character}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
          
          <li className='page-review'>
          <Link  to={`/pages/${id}/review`} onClick={toggleReviewsVisibility}>
              <h3>Reviews</h3>
            </Link>
            {isReviewsVisible && (
              <ul>
                {reviews.map((review) => (
                  <li key={review.id}>
                    <p>{review.author}</p>
                    <p>{review.content}</p>
                  </li>
                ))
                }
              </ul>
            )}
          </li>
        </ul>
      </div>
      <div className='line'> </div>
    </div>
  );
};

export default Pages;