import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const isLogin=useSelector((state)=>state.auth.isLogin);
   
  return (
    <header className="bg-black m-0 p-0 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src="/path-to-logo.png" alt="Game App Logo" className="h-12 w-12 rounded-full border-2 border-white" />
          <h1 className="text-3xl font-extrabold tracking-wide">GameZone</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
        <Link to="/" className="text-lg font-medium hover:text-yellow-300 transition">Home</Link>
          <Link to="/Game" className="text-lg font-medium hover:text-yellow-300 transition">Games</Link>
          <Link to="/LeaderBoard" className="text-lg font-medium hover:text-yellow-300 transition">Leaderboard</Link>
          <Link to="/About" className="text-lg font-medium hover:text-yellow-300 transition">About</Link>
       {isLogin ?  <Link to="/Profile" className="text-lg font-medium hover:text-yellow-300 transition">Profile</Link>:
          <Link to="/Login" className="text-lg font-medium hover:text-yellow-300 transition">Login</Link>
      }   </nav>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none">
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-purple-700 shadow-md">
          <nav className="flex flex-col space-y-4 p-4">
          <Link to="/" className="text-lg font-medium hover:text-yellow-300 transition">Home</Link>
          <Link to="/Game" className="text-lg font-medium hover:text-yellow-300 transition">Games</Link>
          <Link to="/LeaderBoard" className="text-lg font-medium hover:text-yellow-300 transition">Leaderboard</Link>
          <Link to="/About" className="text-lg font-medium hover:text-yellow-300 transition">About</Link>
       {isLogin ?  <Link to="/Profile" className="text-lg font-medium hover:text-yellow-300 transition">Profile</Link>:
          <Link to="/Login" className="text-lg font-medium hover:text-yellow-300 transition">Login</Link>
      }
     
      </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
