import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // initialisation des états avec chargement depuis localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('netflix_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [rentals, setRentals] = useState(() => {
    const savedRentals = localStorage.getItem('netflix_rentals');
    return savedRentals ? JSON.parse(savedRentals) : [];
  });

  // Sauvegarde automatique à chaque modification
  useEffect(() => {
    localStorage.setItem('netflix_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('netflix_rentals', JSON.stringify(rentals));
  }, [rentals]);

  // Ajouter au panier
  const addToCart = (movie) => {
    if (!isInCart(movie.id) && !isRented(movie.id)) {
      setCart((prev) => [...prev, movie]);
      return { success: true };
    }
    return { success: false, message: "Déjà dans le panier ou loué" };
  };

  // Retirer du panier
  const removeFromCart = (movieId) => {
    setCart((prev) => prev.filter(item => item.id !== movieId));
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Calculer le total
  const getCartTotal = () => {
    return cart.reduce((total, movie) => total + (movie.price || 0), 0);
  };

  // Nombre d'items
  const getCartCount = () => {
    return cart.length;
  };

  // Logique interne pour créer une location
  const createRentalObject = (movie) => {
    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // 7 jours
    
    return {
      id: Date.now() + Math.random(), // ID unique
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString()
    };
  };

  // Louer un film seul
  const rentMovie = (movie) => {
    if (isRented(movie.id)) return { success: false, error: "Déjà loué" };
    
    const newRental = createRentalObject(movie);
    setRentals((prev) => [...prev, newRental]);
    removeFromCart(movie.id); // On le retire du panier s'il y était
    
    return { success: true, rental: newRental };
  };

  // Louer tous les films du panier
  const rentAllInCart = () => {
    if (cart.length === 0) return { success: false };

    const newRentals = cart.map(movie => createRentalObject(movie));
    setRentals((prev) => [...prev, ...newRentals]);
    clearCart();
    
    return { success: true, count: newRentals.length };
  };

  // Vérifier si un film est loué
  const isRented = (movieId) => {
    return rentals.some(r => r.movieId === movieId);
  };

  // Obtenir la location d'un film
  const getRentalByMovieId = (movieId) => {
    return rentals.find(r => r.movieId === movieId);
  };

  // Vérifier si un film est dans le panier
  const isInCart = (movieId) => {
    return cart.some(item => item.id === movieId);
  };

  const value = {
    cart,
    rentals,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    rentMovie,
    rentAllInCart,
    isRented,
    getRentalByMovieId,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

export default CartProvider;