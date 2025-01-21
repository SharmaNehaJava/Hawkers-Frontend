import React, { useState, useContext, useEffect } from 'react';
import CartContext from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';

const FoodItem = ({ item}) => {
  // console.log('FoodItem item:', item);
  const { addToCart, removeFromCart,updateCart, cart } = useContext(CartContext);

  // Sync quantity with cart context
  const itemInCart = cart.find(cartItem => cartItem.productId === item._id);
  const [quantity, setQuantity] = useState(itemInCart ? itemInCart.quantity : 0);

   const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

  useEffect(() => {
    // Update quantity whenever cart changes
    if (itemInCart) {
      setQuantity(itemInCart.quantity);
    } else {
      setQuantity(0); // Item was removed from cart
    }
  }, [cart, itemInCart]); // Listening to changes in cart and item

  
  useEffect(() => {
    // console.log("App.jsx isLoggedIn:", isLoggedIn);
    if (!isLoggedIn) {
      navigate("/signin");
    }

  }, [navigate, isLoggedIn]);

  const handleAdd = () => {
    if (quantity === 0) {
      addToCart(item);
    } else {
      updateCart(item._id, quantity + 1);
    } 
  };

  const handleRemove = () => {
    if (quantity === 1) {
      removeFromCart(item._id);
    } else {
      updateCart(item._id, quantity - 1);
    }
  };

  // Debug log for name
  // console.log('FoodItem name:', item.name);

  return (
    <div className="food-item bg-white shadow-lg rounded-lg p-4 m-4 flex flex-col justify-between items-center max-w-xs hover:shadow-xl transition-shadow duration-300">
      <div className="w-full flex justify-center">
        <img className="h-40 w-40 object-cover rounded-lg" src={item.imageUrl} alt={item.name} />
      </div>
      <div className="text-center mt-4">
        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
        <p className="text-green-600 font-bold mt-3">{item.price} Rs</p>
      </div>
      <div className="mt-4">
        {quantity === 0 ? (
          <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded-lg">Add to Cart</button>
        ) : (
          <div className="flex items-center">
            <button onClick={handleRemove} className="bg-red-500 text-white px-3 py-2 rounded-lg">-</button>
            <span className="mx-2">{quantity}</span>
            <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-2 rounded-lg">+</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodItem;
