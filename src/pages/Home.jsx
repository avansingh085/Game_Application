import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const GameHome = ({ setIsOnline, resetGame }) => {
 

  return (
    <div  className="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4">
     
      <h1 className="text-6xl font-extrabold text-black mb-6 text-shadow-lg text-center">
        Game Hub
      </h1>

      <div className="text-center text-black font-medium text-lg">
        <p className="mb-4">Select a game to play or check back later for more games!</p>
        <p className="italic text-sm">Stay tuned for more fun additions!</p>
      </div>

    <Link to="/Game" >  <button
        
        className="mt-6 px-6 py-3 border-2 border-black text-black text-lg font-semibold rounded-lg 
        hover:bg-black hover:text-white transition-all duration-300 ease-in-out shadow-md"
      >
        Explore Games
      </button>
      </Link>
      
      <footer className="mt-8 text-black font-semibold text-sm text-center">
        <p>Powered by React & Game Development Enthusiasts</p>
      </footer>
    </div>
  );
};

export default GameHome;
