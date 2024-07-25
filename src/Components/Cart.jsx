// src/Components/Cart.js
import React from 'react';

const Cart = ({ cartItems, onCheckout }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
      <button onClick={onCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
