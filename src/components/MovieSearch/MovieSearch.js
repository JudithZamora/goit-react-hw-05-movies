import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../MovieApi/MovieApi'; 
import './styleserch.css'

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await searchMovies(searchQuery); 
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <div>
      <Link className='back' to="/container">&#8592; Go Back</Link> 
      <h2 className='search-title'>Search Movies</h2>
      <input
      className='input'
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className='serch' onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((movie) => (
          <li key={movie.id}>
            <Link to={`/pages/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
