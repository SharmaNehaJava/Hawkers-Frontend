import React, { useState } from 'react';

const AccountCreation = ({ onNext }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ email, password, contactName, contactPhone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Account Creation</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Contact Name:</label>
        <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
      </div>
      <div>
        <label>Contact Phone:</label>
        <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required />
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default AccountCreation;
