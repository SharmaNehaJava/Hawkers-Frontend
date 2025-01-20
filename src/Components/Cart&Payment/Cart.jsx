import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this to navigate to the place order page
import CartContext from '../../context/cartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, addToCart, removeFromCart, updateCart, setQuantityToZero } = useContext(CartContext);
  const navigate = useNavigate(); // Hook for navigation

  const handleIncrease = (productId, quantity) => {
    updateCart(productId, quantity + 1);
  };

  const handleDecrease = (productId, quantity) => {
    if (quantity > 1) {
      updateCart(productId, quantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  const handleProceedToPay = () => {
    navigate('/place-order'); // Navigate to place order page when button is clicked
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const PlatformFee = 9; // Example delivery fee
  const grandTotal = total + PlatformFee;

  return (
    <div className="cart p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-20 md:mt-10 lg:mt-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center">Your Shopping Cart</h2>

      {cart.length > 0 ? (
        <>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 text-gray-600 font-semibold border-b pb-3 mb-6">
            <span className="hidden md:inline-block">Items</span>
            <span>Title</span>
            <span className="hidden md:inline-block">Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>Remove</span>
          </div>

          {cart.map((item) => (
            <div 
              key={item.productId} // Use _id as the unique identifier
              className="grid grid-cols-4 md:grid-cols-6 gap-4 items-center mb-6 bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="h-12 w-12 md:h-16 md:w-16 object-cover rounded-lg" 
              />
              <span>{item.name}</span> {/* Display product title */}
              <span className="hidden md:inline-block">{item.price} Rs</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDecrease(item.productId, item.quantity)}
                  className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm md:text-base"
                >
                  -
                </button>
                <span className="text-gray-800 font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item.productId, item.quantity)}
                  className="px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm md:text-base"
                >
                  +
                </button>
              </div>
              <span>{item.price * item.quantity} Rs</span>
              <button
                onClick={() => setQuantityToZero(item.productId)}
                className="px-2 md:px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm md:text-base"
              >
                Remove
              </button>
            </div>
          ))}
          

          {/* <div className="mt-8">
            <div className="flex justify-between mb-4 text-sm md:text-lg">
              <span className="font-semibold">Subtotal:</span>
              <span>{total} Rs</span>
            </div>
            <div className="flex justify-between mb-4 text-sm md:text-lg">
              <span className="font-semibold">Platform Fee:</span>
              <span>{PlatformFee} Rs</span>
            </div>
            <div className="flex justify-between font-bold text-xl md:text-2xl text-green-700">
              <span>Total:</span>
              <span>{grandTotal} Rs</span>
            </div>
          </div> */}

          <button
            onClick={handleProceedToPay} // Attach the navigation function
            className="w-full mt-6 bg-green-600 text-white py-2 md:py-3 rounded-lg hover:bg-green-700 transition-colors text-lg md:text-xl"
          >
            Proceed to Pay
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 text-center bg-gray-100 p-6 rounded-lg shadow-lg">
          <img
            src="https://img.icons8.com/clouds/100/000000/shopping-cart.png"
            alt="Empty cart"
            className="mb-4"
          />
          <h3 className="text-lg md:text-xl font-semibold text-gray-600 mb-2">Your Cart is Empty!</h3>
          <p className="text-sm md:text-base text-gray-500 mb-4">
            It seems like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/"
            className="bg-green-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-green-600 transition-colors text-sm md:text-base"
          >
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
