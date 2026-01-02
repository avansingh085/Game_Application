import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLogin = useSelector((state) => state.user.isLogin);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Games', path: '/Game' },
    { name: 'Leaderboard', path: '/LeaderBoard' },
    { name: 'About', path: '/About' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 text-white">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
            <img 
              src="/path-to-logo.png" 
              alt="Logo" 
              className="relative h-11 w-11 rounded-full border border-white/20 object-cover" 
            />
          </div>
          <h1 className="text-2xl font-black tracking-tighter">
            GAME<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ZONE</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center space-x-10">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="relative text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          
          <div className="h-6 w-px bg-white/10 mx-2"></div>

          {isLogin ? (
            <Link 
              to="/Profile" 
              className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500"></div>
              <span className="text-sm font-medium">Profile</span>
            </Link>
          ) : (
            <Link 
              to="/Login" 
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2.5 rounded-lg font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_25px_rgba(8,145,178,0.5)]"
            >
              SIGN IN
            </Link>
          )}
        </nav>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between items-center">
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      <div className={`md:hidden absolute w-full bg-black/95 backdrop-blur-2xl transition-all duration-300 ease-in-out border-b border-white/10 ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
        <nav className="flex flex-col space-y-6 p-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={() => setIsMenuOpen(false)}
              className="text-xl font-bold tracking-tight text-gray-300 hover:text-cyan-400 transition"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10">
            {isLogin ? (
              <Link to="/Profile" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-cyan-400">Profile</Link>
            ) : (
              <Link to="/Login" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold text-cyan-400">Sign In</Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;