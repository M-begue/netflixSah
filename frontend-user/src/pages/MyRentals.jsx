import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import movies from '../../../data/movies.json';
import Navbar from '../components/common/Navbar';

function MyRentals() {
  const navigate = useNavigate();
  const [rentals, setRentals] = useState([]);




  useEffect(() => {
    const stored = localStorage.getItem('rentals');
    if (stored) {
      try {
        setRentals(JSON.parse(stored));
      } catch (e) {
        console.error('Erreur parsing rentals', e);
      }
    }
  }, []);

  return (
      <div className="bg-black text-white flex flex-col min-h-screen">
        <Navbar movies={movies} onSearch={() => {}} cartItems={[]} onAddToCart={() => {}} onRemoveFromCart={() => {}} />
      <div className="container mx-auto px-4 py-8 flex-1 pt-30">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Mes Locations</h1>
        </div>

        {rentals.length === 0 ? (
          <div>
            <p className="text-gray-400 flex items-center mb-4">Aucune location pour le moment.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-semibold">
              Découvrir d'autres films
            </button>
          </div>
        ) : (
          <ul className="space-y-4">
            {rentals.map((movie) => (
              <li key={movie.rentalId} className="bg-gray-800 p-4 rounded flex items-center">
                <img src={movie.poster} alt={movie.title} className="w-16 h-24 object-cover rounded mr-4" />
                <div>
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                  <p className="text-gray-400 text-sm">{movie.year} - {movie.genre}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyRentals;
