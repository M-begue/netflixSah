import React from 'react';
function Button({ children, onClick }) {
 return (
 <button onClick={onClick} className="px-4 py-2 bg-primary rounded">
 {children}
 </button>
 );
}

export default Button;