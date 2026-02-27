import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from "../movies/SearchBar";
import CartButton from "./CartButton";

function Navbar({ movies, onSearch, cartItems, onAddToCart, onRemoveFromCart }) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Note : useEffect sera vu au TP 03
  // Pour l'instant, version statique

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-black'
          : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-primary text-3xl font-bold tracking-tight">
              NETFLIX SAH
            </h1>

            {/* Navigation Links */}
            <ul className="hidden md:flex space-x-6">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white' }>
                Accueil 
                </NavLink>
              </li>
              <li>
                <NavLink to="/movies" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white' }>
                  Films
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-rentals" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white' }>
                  Mes locations
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white' }>
                  Connexion
                </NavLink>
              </li>
            </ul>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <SearchBar movies={movies} onSearch={onSearch} />
            <CartButton cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center cursor-pointer hover:bg-primary-dark transition-colors">
              <span className="text-sm font-bold">U</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;