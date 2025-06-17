import React, { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import '../styles/Home.css'
import { searchMovies } from '../services/api'
import { useLocation } from 'react-router-dom';


const Home = () => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);



  useEffect(() => {
  if (location.pathname === '/' && movies.length === 0) {
    loadMovies("Avengers");
  }
  }, [location.pathname]);

  const loadMovies = async (searchText, page=1) => {
    setLoading(true);
    setNoResults(false);

  try {
    const result = await searchMovies(searchText, page);
    if (result.Response === "True" && result.Search) {
      setMovies(result.Search);
      setTotalResults(parseInt(result.totalResults));
      setNoResults(false);
    } else {
      setMovies([]);
      setTotalResults(0);
      setNoResults(true);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    setMovies([]);
    setNoResults(true);
  }

  setLoading(false);
};

  const handleSearchInput = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    await loadMovies(searchInput.trim());
    setSearchInput('');
  };

  const handlePageChange = (pageNum) => {
  setCurrentPage(pageNum);
  loadMovies(searchInput || "Star", pageNum);  
  };
  return (
    <div className="home">
        <form className='search-form' onSubmit={handleSearchInput}>
            <input type="text" placeholder='🔍Search for any movie . . . . . . . .' className='search-input' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
            <button type='submit' className='search-button'>Search</button>
        </form>
        {loading && <div className="loader">Loading...</div>}
        {noResults && !loading && <div className="no-results">No results found.</div>}
        <div className='movies-grid'>
            {!loading && !noResults && movies.map((movie)=>
                <MovieCard movie={movie} key={movie.imdbID}/>
            )}
        </div>    
        {!loading && !noResults && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(Math.min(totalResults, 100) / 10) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? 'active-page' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>

  );
};

export default Home