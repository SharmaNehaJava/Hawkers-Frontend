import React, { useState } from 'react';

const DigitalSignature = ({ onNext, onPrevious }) => {
  const [digitalSignature, setDigitalSignature] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ digitalSignature });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Digital Signature</h2>
      <div>
        <label>Signature:</label>
        <textarea value={digitalSignature} onChange={(e) => setDigitalSignature(e.target.value)} required />
      </div>
      <button type="button" onClick={onPrevious}>Previous</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default DigitalSignature;
