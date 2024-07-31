import React, { useState, useEffect } from 'react';

const EditAddressModal = ({ address, onClose }) => {
  const [addressDetails, setAddressDetails] = useState({
    pincode: '',
    state: '',
    houseNumber: '',
    building: '',
    street: '',
    area: '',
    locality: '',
    city: '',
    type: 'home',
    isDefault: false,
  });

  useEffect(() => {
    if (address) {
      setAddressDetails(address);
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressDetails({
      ...addressDetails,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit address details to the backend
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-2xl mb-4">{address ? 'Edit Address' : 'Add New Address'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input name="pincode" value={addressDetails.pincode} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input name="state" value={addressDetails.state} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">House Number</label>
            <input name="houseNumber" value={addressDetails.houseNumber} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Building</label>
            <input name="building" value={addressDetails.building} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Street</label>
            <input name="street" value={addressDetails.street} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Area</label>
            <input name="area" value={addressDetails.area} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Locality/Town</label>
            <input name="locality" value={addressDetails.locality} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">City/District</label>
            <input name="city" value={addressDetails.city} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <div className="flex items-center">
              <input type="radio" name="type" value="home" checked={addressDetails.type === 'home'} onChange={handleChange} className="mr-2" />
              <label className="mr-4">Home</label>
              <input type="radio" name="type" value="office" checked={addressDetails.type === 'office'} onChange={handleChange} className="mr-2" />
              <label className="mr-4">Office</label>
              <input type="radio" name="type" value="other" checked={addressDetails.type === 'other'} onChange={handleChange} className="mr-2" />
              <label>Other</label>
            </div>
          </div>
          <div className="mb-4">
            <input type="checkbox" name="isDefault" checked={addressDetails.isDefault} onChange={handleChange} className="mr-2" />
            <label className="text-sm">Make this my default address</label>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="text-gray-600 hover:text-gray-800">Cancel</button>
            <button type="submit" className="text-blue-500 hover:text-blue-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddressModal;
