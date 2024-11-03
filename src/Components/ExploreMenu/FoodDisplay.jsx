import React from 'react';
import FoodItem from './FoodItem.jsx'; // Import the FoodItem component

const FoodDisplay = ({ items }) => {
  if (!items || items.length === 0) {
    return <p>No items available in this category.</p>;
  }

  // Debug log for items
  console.log('Items in FoodDisplay:', items);

  return (
    <div className="container mx-auto px-4">
      <h1 className="font-medium underline text-blue-500 p-2 text-center">
        Top dishes near you
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => {
          // Debug log for each item name
          console.log('Item name:', item.name);
          return (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name} // Make sure name is defined
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
