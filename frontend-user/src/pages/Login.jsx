import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'; 

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!credentials.email) errs.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(credentials.email)) errs.email = 'Email invalide';
    
    if (!credentials.password) errs.password = 'Mot de passe requis';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    // Appel de la fonction login du contexte au lieu du localStorage manuel
    const result = await login(credentials.email, credentials.password);

    if (result.success) {
      // Redirection vers la page demandée ou l'accueil
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } else {
      setErrors({ server: result.error || 'Identifiants invalides' });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Se connecter</h2>
        
        {/* Affichage d'une erreur générale (ex: API en panne) */}
        {errors.server && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded text-sm mb-2">
            {errors.server}
          </div>
        )}

        <div className="flex flex-col">
          <input
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Email"
            className={`px-4 py-3 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.email ? 'border-red-500' : 'border-transparent'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="flex flex-col">
          <input
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            className={`px-4 py-3 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.password ? 'border-red-500' : 'border-transparent'}`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-bold transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>

        <p className="text-gray-400 text-center mt-4">
          Pas de compte?{' '}
          <button
            type="button"
            onClick={() => navigate('/register', { state: { from: location.state?.from } })}
            className="text-red-600 hover:text-white font-semibold transition-colors"
          >
            S'inscrire
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;