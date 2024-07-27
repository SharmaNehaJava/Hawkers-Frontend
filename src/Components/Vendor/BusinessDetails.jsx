import React, { useState } from 'react';

const BusinessDetails = ({ onNext, onPrevious }) => {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ businessName, businessType, businessAddress });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Business Details</h2>
      <div>
        <label>Business Name:</label>
        <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
      </div>
      <div>
        <label>Business Type:</label>
        <input type="text" value={businessType} onChange={(e) => setBusinessType(e.target.value)} required />
      </div>
      <div>
        <label>Business Address:</label>
        <input type="text" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} required />
      </div>
      <button type="button" onClick={onPrevious}>Previous</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default BusinessDetails;
