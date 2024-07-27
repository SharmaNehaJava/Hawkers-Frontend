import React, { useState } from 'react';

const BankDetails = ({ onNext, onPrevious }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ bankDetails: { accountNumber, ifscCode, bankName } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Bank Details</h2>
      <div>
        <label>Account Number:</label>
        <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
      </div>
      <div>
        <label>IFSC Code:</label>
        <input type="text" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} required />
      </div>
      <div>
        <label>Bank Name:</label>
        <input type="text" value={bankName} onChange={(e) => setBankName(e.target.value)} required />
      </div>
      <button type="button" onClick={onPrevious}>Previous</button>
      <button type="submit">Next</button>
    </form>
  );
};

export default BankDetails;
