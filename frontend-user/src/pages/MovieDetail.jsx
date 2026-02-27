import { useParams, useNavigate } from 'react-router-dom';
import movies from '../../../data/movies.json';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === parseInt(id));

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
      <Navbar movies={movies} onSearch={() => {}} cartItems={[]} onAddToCart={() => {}} onRemoveFromCart={() => {}} />
      
      <div className="flex-1 flex flex-col pt-20">
        {/* Bouton Retour */}
        <div className="container mx-auto px-4 py-16">
          <button
            onClick={handleBackClick}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white transition"
          >
            ← Retour
          </button>
        </div>

        {/* Image de fond */}
        <div className="relative h-80 w-full bg-gradient-to-b from-gray-900 via-gray-900/80 to-black">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
          
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
                onClick={() => navigate('/cart', { state: { movie: movie } })}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-bold transition mb-8"
              >
                ▶ Louer {movie.price}€
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
