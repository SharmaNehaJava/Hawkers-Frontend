// src/Components/VendorDetails.js
import React from 'react';

const VendorDetails = ({ vendor, onAddToCart }) => {
  return (
    <div>
      <h2>{vendor.name}</h2>
      <ul>
        {vendor.products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VendorDetails;
