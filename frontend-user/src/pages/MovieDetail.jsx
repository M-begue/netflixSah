import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import movies from '../../../data/movies.json';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';
import Breadcrumb from '../components/common/Breadcrumb';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

  const movie = movies.find((m) => m.id === parseInt(id));

  const handleRent = () => {
    // Vérifier si l'utilisateur est connecté
    const user = localStorage.getItem('user');
    if (!user) {
      setNotification({ type: 'error', message: 'Veuillez vous connecter pour louer un film' });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    // Créer la location
    const rental = {
      ...movie,
      rentalId: `${movie.id}-${Date.now()}`, // ID unique pour chaque location
      rentalDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 jours
    };

    // Récupérer les locations existantes
    const stored = localStorage.getItem('rentals');
    const existingRentals = stored ? JSON.parse(stored) : [];

    // Vérifier si déjà loué
    const alreadyRented = existingRentals.some((r) => r.id === movie.id);

    if (alreadyRented) {
      setNotification({ type: 'error', message: 'Vous avez déjà loué ce film' });
      return;
    }

    // Ajouter la nouvelle location et sauvegarder
    const updatedRentals = [...existingRentals, rental];
    localStorage.setItem('rentals', JSON.stringify(updatedRentals));

    setNotification({ type: 'success', message: 'Film loué avec succès !' });

    // Rediriger vers MyRentals après 2 secondes
    setTimeout(() => navigate('/my-rentals'), 2000);
  };

  if (!movie) {
    return (
      <div className="bg-black text-white flex flex-col h-screen overflow-y-auto">
        <Navbar movies={movies} onSearch={() => {}} cartItems={[]} onAddToCart={() => {}} onRemoveFromCart={() => {}} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Film non trouvé</h1>
            <p className="text-gray-400 mb-6">Désolé, ce film n'existe pas ou a été supprimé.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="bg-black text-white flex flex-col h-screen overflow-y-auto">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-xl z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {notification.message}
        </div>
      )}
      
      <Navbar movies={movies} onSearch={() => {}} cartItems={[]} onAddToCart={() => {}} onRemoveFromCart={() => {}} />
    
      <div className="flex-1 flex flex-col pt-20">
        <div className="container mx-auto px-4 pt-24">
          <Breadcrumb items={[ { label: 'Films', path: '/' }, { label: movie.genre, path: `/?genre=${movie.genre}` }, { label: movie.title }]} />
        </div>

        {/* Image de fond */}
        <div className="relative h-80 w-full bg-linear-to-b from-gray-900 via-gray-900/80 to-black">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent"></div>
          
          {/* Titre + infos sur l'image */}
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

        {/* Contenu principal */}
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-3 gap-8">
            {/* Colonne gauche - Synopsis et actions */}
            <div className="col-span-2">
              {/* Synopsis */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Synopsis</h2>
                <p className={`text-gray-300 leading-relaxed`}>
                  {movie.description}
                </p>
              </div>

              {/* Bouton Louer */}
              <button
                onClick={handleRent}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-bold transition mb-8"
              >
                🎬 Louer pour {movie.price}€
              </button>

              {/* Informations */}
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

            {/* Colonne droite - Poster */}
            <div className="col-span-1">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-lg shadow-2xl"
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
