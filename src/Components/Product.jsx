// src/Components/Home.jsx
import React, {  useEffect, useState } from 'react';
import Categories from "./ExploreMenu/Categories";
import FoodDisplay from './ExploreMenu/FoodDisplay.jsx';
// import { food_list } from '../assets/assets.js';
import axios from '../api/apiInstances';



const Product = ({ category, setCategory }) => {
  const [filteredItems, setFilteredItems] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (category === 'All') {
          response = await axios.get('/api/products');
        } else {
          response = await axios.get(`/api/products/category/${category}`);
        }
        setFilteredItems(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/products/search?name=${searchTerm}`);
      setFilteredItems(response.data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  }

  return (
    <>
      <div id="product" className="home-container">
          <Categories category={category} setCategory={setCategory} />
          <FoodDisplay items={filteredItems} /> 
      </div>
    </>
  );
};

export default Product;
