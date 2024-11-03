// src/Components/Home.jsx
import React, {  useEffect, useState } from 'react';
import Categories from "./ExploreMenu/Categories";
import FoodDisplay from './ExploreMenu/FoodDisplay.jsx';
import { food_list } from '../assets/assets.js';




const Product = ({ category, setCategory }) => {
  const [filteredItems, setFilteredItems] = useState([]); 

  useEffect(() => {

    if (category === 'All') {
      setFilteredItems(food_list); 
    } else {
      const filtered = food_list.filter(item => item.category === category);
      setFilteredItems(filtered);
    }
  }, [category]);

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
