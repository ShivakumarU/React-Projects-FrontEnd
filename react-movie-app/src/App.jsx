import React from 'react'
import MovieCard from './components/MovieCard'
import Home from './pages/Home'
import { Routes, Route , useLocation} from 'react-router-dom'
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'
import './styles/App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const location = useLocation();
  return (
    <div>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home key={location.key}/>}/>
          <Route path='/favorites' element={<Favorites />}/>
        </Routes>
      </main>      
      <ToastContainer position="bottom-left" autoClose={2000} theme="colored" />
    </div>
  )
}

export default App