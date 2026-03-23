import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchBar from "../movies/SearchBar";
import CartButton from "./CartButton";
import { useAuth } from '../../context/AuthProvider';

function Navbar({ movies, onSearch, cartItems, onRemoveFromCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Gestion du scroll pour le background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? 'bg-black'
          : 'bg-linear-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Section Gauche : Logo & Liens */}
          <div className="flex items-center space-x-8">
            <h1 className="text-primary text-3xl font-bold tracking-tight cursor-pointer" onClick={() => navigate('/')}>
              NETFLIX
            </h1>

            <ul className="hidden md:flex space-x-6">
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white'}>
                  Accueil 
                </NavLink>
              </li>
              <li>
                <NavLink to="/movies" className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-gray-300 hover:text-white'}>
                  Films
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Section Droite : User Section */}
          <div className="flex items-center space-x-4">
            
            {/* Recherche & Panier */}
            <SearchBar movies={movies} onSearch={onSearch} />
            <CartButton cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />

            {/* Authentification Dynamique */}
            {isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-primary transition"
                  />
                  <span className="hidden md:block text-sm text-white font-medium">{user?.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/95 backdrop-blur-lg border border-gray-800 rounded-lg shadow-xl py-2 z-50">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mon profil
                    </NavLink>
                    <NavLink
                      to="/my-rentals"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 transition"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mes locations
                    </NavLink>
                    <hr className="my-2 border-gray-800" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-primary font-bold hover:bg-gray-800 transition"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="bg-primary text-white px-4 py-1.5 rounded text-sm font-bold hover:bg-primary-dark transition"
              >
                Connexion
              </NavLink>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;