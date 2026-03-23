import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/common/Navbar';

function MyRentals() {
  const navigate = useNavigate();
  
  const { rentals } = useCart();

  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex-1 pt-30">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Mes Locations</h1>
        </div>

        {rentals.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-6 text-xl">Aucune location pour le moment.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition"
            >
              Découvrir des films
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentals.map((rental) => (
              <div 
                key={rental.id} 
                className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex items-center hover:border-gray-600 transition"
              >
                <img 
                  src={rental.poster} 
                  alt={rental.title} 
                  className="w-20 h-28 object-cover rounded mr-4 shadow-lg" 
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-1">{rental.title}</h2>
                  <div className="text-gray-400 text-sm mb-2">
                    <p>Loué le : {new Date(rental.rentalDate).toLocaleDateString()}</p>
                    <p className="text-primary font-semibold">
                      Expire le : {new Date(rental.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button className="text-sm bg-white text-black px-4 py-1 rounded font-bold hover:bg-gray-200 transition">
                    Visionner
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRentals;