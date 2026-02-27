import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-4">Page non trouvée</p>
        <p className="text-gray-400 mb-8">Désolé, la page que vous recherchez n'existe pas.</p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            Retour à l'accueil
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
          >
            ← Retour
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
