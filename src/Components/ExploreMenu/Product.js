// components/Product.js
import React, { useContext } from 'react';
import CartContext from '../../context/cartContext.js';

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product._id, 1, product.price);
  };

  return (
    <div className="product">
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
