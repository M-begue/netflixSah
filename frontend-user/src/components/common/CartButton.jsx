import { useState } from 'react';

function CartButton({ cartItems, onRemoveFromCart }) {
  const [showCart, setShowCart] = useState(false);

  const cartCount = cartItems.length;

  const toggleShow = () => {
    setShowCart(!showCart);
  };


  return (
    <div className="relative flex">
      <button
        onClick={toggleShow}
        className="relative hover:text-gray-300 transition"
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
          <span className="absolute -top-2 -right-2 bg-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {cartCount}
          </span>
        )}
      </button>

      {/* Dropdown du panier */}
      {showCart && (
        <div className="absolute right-0 mt-8 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-4 z-20">
          {cartItems.length > 0 ? (
            <>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    onDoubleClick={() => onRemoveFromCart(item.id)}
                    className="flex items-center justify-between bg-gray-800 p-2 rounded cursor-pointer hover:bg-gray-700 transition"
                  >
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                    <p className="text-primary text-xs font-bold">{item.price}€</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-center py-4">Panier vide</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CartButton;
