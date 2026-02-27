import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ name:'', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    // TODO: Valider le nom
    if (!formData.name) {
      newErrors.name = "Nom requis";
    }
    // TODO: Valider l'email
    if (!formData.email) {
      newErrors.email = "Email requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    // TODO: Valider le mot de passe
    if (!formData.password) {
      newErrors.password = "Mot de passe requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Au moins 6 caractères";
    }
    // TODO: Vérifier que les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    return newErrors;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // simulation d'inscription
    setTimeout(() => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                name: formData.name,
                email: formData.email,
            }),
        );

        setLoading(false);
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">S'inscrire</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom"
            className="px-4 py-2 border rounded bg-gray-800 text-white"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="px-4 py-2 border rounded bg-gray-800 text-white"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            className="px-4 py-2 border rounded bg-gray-800 text-white"
          />
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmer le mot de passe"
            className="px-4 py-2 border rounded bg-gray-800 text-white"
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
          <button type="submit" disabled={loading} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold disabled:opacity-50">
            {loading ? 'Patientez...' : 'S\'inscrire'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-gray-400 hover:text-white text-center mt-2"
          >
            Vous avez déjà un compte ? Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
