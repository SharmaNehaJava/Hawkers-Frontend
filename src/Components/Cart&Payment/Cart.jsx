import React, { useContext } from 'react';
import CartContext from '../../context/cartContext';

const Cart = ({ onCheckout }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const handleIncrease = (productId, quantity, price) => {
    addToCart(productId, quantity + 1, price);
  };

  const handleDecrease = (productId, quantity, price) => {
    if (quantity > 1) {
      addToCart(productId, quantity - 1, price);
    } else {
      removeFromCart(productId);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 9; // Example fee
  const grandTotal = total + deliveryFee;

  return (
    <div className="cart p-4 bg-white shadow-lg rounded-lg max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      <div className="grid grid-cols-6 gap-4 text-gray-600 font-semibold border-b pb-2 mb-4">
        <span>Items</span>
        <span>Title</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Total</span>
        <span>Remove</span>
      </div>

      {cart.length > 0 ? (
        cart.map((item) => (
          <div key={item.productId} className="grid grid-cols-6 gap-4 items-center mb-4">
            <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-lg" />
            <span>{item.name}</span>
            <span>{item.price} Rs</span>
            <div className="flex items-center">
              <button
                onClick={() => handleDecrease(item.productId, item.quantity, item.price)}
                className="px-2 py-1 bg-red-500 text-white rounded-lg"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => handleIncrease(item.productId, item.quantity, item.price)}
                className="px-2 py-1 bg-green-500 text-white rounded-lg"
              >
                +
              </button>
            </div>
            <span>{item.price * item.quantity} Rs</span>
            <button
              onClick={() => removeFromCart(item.productId)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}

      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Subtotal:</span>
          <span>{total} Rs</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Platform Fee:</span>
          <span>{deliveryFee} Rs</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>{grandTotal} Rs</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Proceed to Pay
      </button>
    </div>
  );
};

export default Cart;
