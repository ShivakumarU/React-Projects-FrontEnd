import React, {useState, useEffect, useContext} from 'react'
import MovieCard from '../components/MovieCard';
import '../styles/Favorite.css';
import { FavoritesContext } from '../context/FavoritesContext';


const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="home">
      <h2>Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <div className='favorites-empty'>
          <h2>No Favorite movies yet</h2>
          <p>Start adding your movies to your favorites and they will appear here!</p>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
