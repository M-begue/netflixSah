import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';

const genreColors = {
  'Action': 'bg-red-600',
  'Comédie': 'bg-yellow-500',
  'Drame': 'bg-blue-600',
  'Science-Fiction': 'bg-purple-600',
  'Horreur': 'bg-orange-600',
  'Thriller': 'bg-gray-700'
};

function MovieCard({ movie }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, isInCart, isRented } = useCart(); 

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(movie.likes ?? 0);

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`, { state: { from: location.pathname } });
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      setLikes((l) => Math.max(0, l - 1));
    } else {
      setIsLiked(true);
      setLikes((l) => l + 1);
    }
  };

  const handleAction = (e) => {
    e.stopPropagation();

    if (isRented(movie.id)) {
      navigate('/my-rentals');
      return;
    }

    if (isInCart(movie.id)) {
      navigate('/cart');
      return;
    }

    addToCart(movie);
  };

  // Déterminer l'état du bouton principal
  const getButtonLabel = () => {
    if (isRented(movie.id)) return "Visionner";
    if (isInCart(movie.id)) return "Dans le panier";
    return `Louer ${movie.price}€`;
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 bg-gray-900"
    >
      {/* Image principale */}
      <div className="relative aspect-[2/3]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        {/* Badge de note */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded">
          <span className="text-yellow-400 font-bold text-xs">
            ⭐ {movie.rating}
          </span>
        </div>

        {/* Badge de genre */}
        <div className={`absolute bottom-2 left-2 ${genreColors[movie.genre] || 'bg-gray-500'} px-2 py-0.5 rounded text-[10px] font-black uppercase text-white shadow-lg`}>
          {movie.genre}
        </div>
      </div>

      {/* Overlay au hover */} 
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold leading-tight truncate mr-2">{movie.title}</h3>
          <button 
            onClick={toggleLike} 
            className={`text-lg transition-transform active:scale-125 ${isLiked ? 'text-red-500' : 'text-white'}`}
          >
            {isLiked ? '❤️' : '🤍'}
          </button>
        </div>

        <div className="flex items-center space-x-2 mb-2 text-xs">
          <span className="text-green-400 font-bold">{movie.rating * 10}% likes</span>
          <span className="text-gray-300">{movie.year}</span>
          <span className="border border-gray-600 px-1 rounded text-[10px]">{movie.duration}m</span>
        </div>

        <p className="text-[11px] text-gray-300 mb-4 line-clamp-2 leading-snug">
          {movie.description}
        </p>

        <div className="flex flex-col gap-2">
          <Button 
            size="sm" 
            className={`w-full font-bold ${isRented(movie.id) ? 'bg-white text-black hover:bg-gray-200' : ''}`} 
            onClick={handleAction}
          >
            {getButtonLabel()}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-gray-500 text-xs hover:bg-white hover:text-black transition-colors" 
            onClick={(e) => { e.stopPropagation(); handleCardClick(); }}
          >
            Détails
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;