import React, { useState } from 'react';

const BrandDetails = ({ onNext, onPrevious }) => {
  const [productCategories, setProductCategories] = useState([]);
  const [otherDetails, setOtherDetails] = useState('');

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setProductCategories(value.split(',').map((cat) => cat.trim()));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ brandDetails: { productCategories, otherDetails } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Brand Details</h2>
      <div>
        <label>Product Categories (comma separated):</label>
        <input type="text" value={productCategories.join(', ')} onChange={handleCategoryChange} required />
      </div>
      <div>
        <label>Other Details:</label>
        <textarea value={otherDetails} onChange={(e) => setOtherDetails(e.target.value)} required />
      </div>
      <button type="button" onClick={onPrevious}>Previous</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default BrandDetails;
