// src/Components/ExploreMenu/FoodDisplay.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const FoodDisplay = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    const fetchProducts = async () => {
        try {
          const { data } = await axios.get(`/api/products/category/${category}`);
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            console.error('Unexpected data format', data);
          }
        } catch (error) {
          console.error('Failed to fetch products', error);
        }
      };
      

    fetchProducts();
  }, [category]);

  const handleSortChange = async (sortOption) => {
    setSortBy(sortOption);
    try {
      const { data } = await axios.get(`/api/products/sorted?sortBy=${sortOption}`);
      setProducts(data);
    } catch (error) {
      console.error('Failed to sort products', error);
    }
  };

  return (
    <div>
      <h1>Food Display</h1>
      <select onChange={(e) => handleSortChange(e.target.value)} value={sortBy}>
        <option value="price">Sort by Price</option>
        <option value="proximity">Sort by Proximity</option>
      </select>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <LazyLoadImage src={product.image} alt={product.name}
              effect="blur" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Add to wishlist and quantity controls */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
