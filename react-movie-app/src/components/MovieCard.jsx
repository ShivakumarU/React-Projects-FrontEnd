import {React, useState, useEffect, useContext} from 'react'
import '../styles/MovieCard.css' ;
import { FavoritesContext } from '../context/FavoritesContext';
import { toast } from 'react-toastify';


const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  const handleFavoriteToggle = () => {
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
      toast.error(`❌ Removed "${movie.Title}" from Favorites`);
    } else {
      addToFavorites(movie);
      toast.success(`✅ Added "${movie.Title}" to Favorites`);
    }
  };

  return (
    <div className='movie-card'>
      <div className="movie-poster">
        <img
          src={`http://img.omdbapi.com/?apikey=e51de3bc&i=${movie.imdbID}`}
          alt={movie.Title}
        />
        <div className="movie-overlay">
          <button className="favotite-btn" onClick={handleFavoriteToggle}>
            {isFavorite(movie.imdbID) ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>Year: {movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;