import React, { useState } from 'react';

const EditAddressModal = ({ isOpen, onClose, onSave, address }) => {
  const [editedAddress, setEditedAddress] = useState({ ...address });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(editedAddress);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-4 rounded-md w-96">
        <h2 className="text-lg font-bold mb-4">Edit Address</h2>
        <label htmlFor="pincode">Pincode:</label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          value={editedAddress.pincode}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md px-2 py-1 mb-2 w-full"
        />
        {/* Add more fields for state, address, locality, city, type, etc. */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressModal;
