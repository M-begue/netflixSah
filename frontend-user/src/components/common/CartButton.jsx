import { useState } from 'react';
import { useCart } from '../../context/CartContext'; 

function CartButton() {
  const [showCart, setShowCart] = useState(false);
  
  const { cart, removeFromCart } = useCart();

  const cartItems = cart || [];
  const cartCount = cartItems.length;

  const toggleShow = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="relative flex">
      <button
        onClick={toggleShow}
        className="relative hover:text-gray-300 transition focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>

        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
            {cartCount}
          </span>
        )}
      </button>

      {/* Dropdown du panier */}
      {showCart && (
        <div className="absolute right-0 mt-10 w-80 bg-black/95 backdrop-blur-md border border-gray-800 rounded-lg shadow-2xl p-4 z-50">
          <h4 className="text-sm font-bold mb-3 border-b border-gray-800 pb-2">Mon Panier</h4>
          
          {cartItems.length > 0 ? (
            <div className="space-y-2">
              <div className="max-h-64 overflow-y-auto custom-scrollbar">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center justify-between bg-gray-900/50 p-2 rounded mb-2 border border-transparent hover:border-gray-700 transition"
                  >
                    <div className="flex flex-col">
                      <p className="text-white text-sm font-semibold truncate w-40">{item.title}</p>
                      <p className="text-red-500 text-xs font-bold">{item.price}€</p>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-500 text-xs transition p-1"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="pt-2 border-t border-gray-800">
                <button 
                  onClick={() => {
                    window.location.href = '/cart'; // Ou navigate('/cart') si tu importes useNavigate
                    setShowCart(false);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2 rounded transition"
                >
                  Voir mon panier complet
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500 text-sm">Votre panier est vide</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CartButton;