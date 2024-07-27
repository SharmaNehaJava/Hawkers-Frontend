import React, { useState } from 'react';

const ShippingLocations = ({ onNext, onPrevious }) => {
  const [locations, setLocations] = useState([]);

  const handleLocationChange = (e) => {
    const { value } = e.target;
    setLocations(value.split(',').map((loc) => loc.trim()));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ shippingLocations: locations });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Shipping Locations</h2>
      <div>
        <label>Locations (comma separated):</label>
        <input type="text" value={locations.join(', ')} onChange={handleLocationChange} required />
      </div>
      <button type="button" onClick={onPrevious}>Previous</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default ShippingLocations;
