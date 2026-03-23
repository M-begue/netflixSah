import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      setLoading(true);
      // Simulation API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        avatar: `https://ui-avatars.com/api/?name=${email}&background=e50914&color=fff`
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Fonction d'inscription
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: Date.now(),
        email: email,
        name: name,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=e50914&color=fff`
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Vérifier si l'utilisateur est connecté
  const isAuthenticated = () => {
    return !!user;
  };

  // Mettre à jour le profil
  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = { user, loading, login, register, logout, isAuthenticated, updateProfile };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within AuthProvider');

  return context;
}

export default AuthProvider;