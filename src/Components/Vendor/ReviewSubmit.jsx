import React from 'react';
import axiosInstance from '../../api/apiInstances';

const ReviewSubmit = ({ data, onPrevious }) => {
  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post('/api/vendors/register', data);
      console.log('Vendor registered:', response.data);
      alert('Vendor registered successfully!');
      // Navigate to a success page or dashboard
    } catch (error) {
      console.error('Error registering vendor:', error);
      alert('Failed to register vendor.');
    }
  };

  return (
    <div>
      <h2>Review & Submit</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button type="button" onClick={onPrevious}>Previous</button>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ReviewSubmit;
