import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Nom requis";
    
    if (!formData.email) {
      newErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Au moins 6 caractères";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Nettoyer l'erreur quand l'utilisateur tape
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulation d'inscription via le contexte
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
      };

      // On utilise login du contexte (qui sauvegarde en local et met à jour l'état)
      await login(userData);

      setLoading(false);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      setLoading(false);
      setErrors({ server: "Une erreur est survenue lors de l'inscription" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-md bg-gray-900 rounded-lg shadow-xl border border-gray-800">
        <h1 className="text-4xl font-bold mb-8 text-center text-red-600">S'inscrire</h1>
        
        {errors.server && <p className="bg-red-500/20 text-red-500 p-3 rounded mb-4 text-sm text-center">{errors.server}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nom"
              className={`w-full px-4 py-3 border rounded bg-gray-800 text-white focus:outline-none focus:border-red-600 transition ${errors.name ? 'border-red-500' : 'border-gray-700'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full px-4 py-3 border rounded bg-gray-800 text-white focus:outline-none focus:border-red-600 transition ${errors.email ? 'border-red-500' : 'border-gray-700'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              className={`w-full px-4 py-3 border rounded bg-gray-800 text-white focus:outline-none focus:border-red-600 transition ${errors.password ? 'border-red-500' : 'border-gray-700'}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmer le mot de passe"
              className={`w-full px-4 py-3 border rounded bg-gray-800 text-white focus:outline-none focus:border-red-600 transition ${errors.confirmPassword ? 'border-red-500' : 'border-gray-700'}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded font-bold uppercase tracking-wide transition disabled:opacity-50 mt-2"
          >
            {loading ? 'Création du compte...' : 'S\'inscrire'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-gray-400 hover:text-white text-sm text-center mt-4 transition"
          >
            Vous avez déjà un compte ? <span className="text-red-500">Se connecter</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;