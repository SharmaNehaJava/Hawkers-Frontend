import React, { useState, useContext } from 'react';
import CartContext from '../../context/cartContext';

const FoodItem = ({ id, name, description, price, image }) => {
  const { addToCart, removeFromCart, cart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  useState(() => {
    const itemInCart = cart.find(item => item.productId === id);
    if (itemInCart) {
      setQuantity(itemInCart.quantity);
    }
  }, [cart, id]);

  const handleAdd = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    addToCart(id, newQuantity, price, image); 
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      addToCart(id, quantity - 1, price);
    } else {
      setQuantity(0);
      removeFromCart(id);
    }
  };

  return (
    <div className="food-item bg-white shadow-lg rounded-lg p-4 m-4 flex flex-col justify-between items-center max-w-xs hover:shadow-xl transition-shadow duration-300">
      <div className="w-full flex justify-center">
        <img className="h-40 w-40 object-cover rounded-lg" src={image} alt={name} />
      </div>
      <div className="text-center mt-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
        <p className="text-green-600 font-bold mt-3">{price} Rs</p>
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