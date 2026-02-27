import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!credentials.email) errs.email = 'Email requis';
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
    // Simulation de connexion
    setTimeout(() => {
      // Sauvegarde locale de l'utilisateur (temporaire)
      localStorage.setItem('user', JSON.stringify({
        email: credentials.email,
        name: credentials.email.split('@')[0]
      }));

      setLoading(false);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
        <input
          name="email"
          type="email"
          value={credentials.email}
          onChange={handleChange}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder="Email"
          className={`px-4 py-2 border rounded bg-gray-800 text-white focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        <input
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          placeholder="Mot de passe"
          className={`px-4 py-2 border rounded bg-gray-800 text-white focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-semibold">
          Se connecter
        </button>
        <p className="text-gray-400 text-center mt-4">
          Pas de compte?{' '}
          <button
            type="button"
            onClick={() => navigate('/register', { state: { from: location.pathname } })}
            className="text-red-600 hover:text-red-400 font-semibold"
          >
            S'inscrire
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
