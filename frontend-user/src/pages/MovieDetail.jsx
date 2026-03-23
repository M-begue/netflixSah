import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import movies from '../../../data/movies.json';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumb from '../components/common/Breadcrumb';
import { useCart } from '../context/CartContext';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { addToCart, isInCart, isRented } = useCart();

  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  const movie = movies.find((m) => m.id === parseInt(id));

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAction = () => {
    if (isRented(movie.id)) {
      navigate('/my-rentals');
      return;
    }

    if (isInCart(movie.id)) {
      navigate('/cart');
      return;
    }

    const result = addToCart(movie);
    
    if (result.success) {
      setNotification({ type: 'success', message: 'Ajouté au panier !' });
    } else {
      setNotification({ type: 'error', message: result.message });
    }

    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) {
    return (
      <div className="bg-black text-white flex flex-col h-screen items-center justify-center">
        <Navbar />
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl font-medium">Chargement du film...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black text-white flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Film introuvable</h1>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-red-600 rounded-lg font-bold">
            Retour à l'accueil
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const getButtonConfig = () => {
    if (isRented(movie.id)) return { text: 'Déjà loué (Visionner)', color: 'bg-green-600 hover:bg-green-700' };
    if (isInCart(movie.id)) return { text: 'Voir dans le panier', color: 'bg-blue-600 hover:bg-blue-700' };
    return { text: `🎬 Louer pour ${movie.price}€`, color: 'bg-red-600 hover:bg-red-700' };
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="bg-black text-white flex flex-col min-h-screen overflow-x-hidden">
      {notification && (
        <div className={`fixed top-24 right-4 px-6 py-4 rounded-lg shadow-2xl z-50 animate-bounce ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {notification.message}
        </div>
      )}
      
      <Navbar />
    
      <div className="flex-1 flex flex-col pt-20">
        <div className="container mx-auto px-4 pt-24">
          <Breadcrumb items={[ { label: 'Films', path: '/' }, { label: movie.genre, path: `/?genre=${movie.genre}` }, { label: movie.title }]} />
        </div>

        <div className="relative h-80 w-full bg-linear-to-b from-gray-900 via-gray-900/80 to-black">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end gap-6">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-3">{movie.title}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-red-600 px-3 py-1 rounded text-sm font-bold">⭐ {movie.rating}/10</span>
                <span className="text-gray-300 text-sm">{movie.year}</span>
                <span className="text-gray-300 text-sm">{movie.duration} min</span>
                <span className="border border-gray-500 px-2 py-0.5 text-sm rounded">{movie.genre}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Synopsis</h2>
                <p className="text-gray-300 leading-relaxed">
                  {movie.description}
                </p>
              </div>

              <button
                onClick={handleAction}
                className={`px-10 py-4 ${buttonConfig.color} text-white rounded font-black text-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg mb-8`}
              >
                {buttonConfig.text}
              </button>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Informations</h2>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 text-gray-400">Genre</td>
                      <td className="py-2">{movie.genre}</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 text-gray-400">Année</td>
                      <td className="py-2">{movie.year}</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 text-gray-400">Durée</td>
                      <td className="py-2">{movie.duration} minutes</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-400">Note</td>
                      <td className="py-2">{movie.rating}/10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-span-1">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-lg shadow-2xl border border-gray-800"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MovieDetail;