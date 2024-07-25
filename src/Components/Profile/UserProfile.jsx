import React, { useState } from 'react';
import axios from '../../api/apiInstances'; // Import your axios instance
import EditAddressModal from './EditAddressModal'; // Assuming you have a modal component for editing addresses

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    gender: '',
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      pincode: '110001',
      state: 'Delhi',
      addressLine1: '123, ABC Building',
      area: 'Connaught Place',
      locality: 'New Delhi',
      city: 'New Delhi',
      type: 'Home',
      isDefault: true,
    },
    {
      id: 2,
      pincode: '400001',
      state: 'Maharashtra',
      addressLine1: '456, XYZ Apartments',
      area: 'Churchgate',
      locality: 'Mumbai',
      city: 'Mumbai',
      type: 'Office',
      isDefault: false,
    },
    // Add more addresses as needed
  ]);

  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const openEditAddressModal = (address) => {
    setSelectedAddress(address);
    setIsEditAddressModalOpen(true);
  };

  const closeEditAddressModal = () => {
    setSelectedAddress(null);
    setIsEditAddressModalOpen(false);
  };

  const saveEditedAddress = (editedAddress) => {
    // Logic to save edited address, update state, or send to server
    console.log('Saving edited address:', editedAddress);
    const updatedAddresses = addresses.map(addr =>
      addr.id === editedAddress.id ? editedAddress : addr
    );
    setAddresses(updatedAddresses);
    closeEditAddressModal();
  };

  const renderAddresses = () => {
    return addresses.map(address => (
      <div key={address.id} className="border rounded-md p-3 mb-3">
        <div>{address.addressLine1}, {address.area}, {address.locality}, {address.city}, {address.state} - {address.pincode}</div>
        <div>Type: {address.type}</div>
        {address.isDefault && <div>Default Address</div>}
        <div>
          <button onClick={() => openEditAddressModal(address)} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-600">Edit</button>
          <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">Remove</button>
        </div>
      </div>
    ));
  };

  const handleProfilePictureEdit = async (e) => {
    // Example logic to upload new profile picture
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profileImage', file);
    
    try {
      const response = await axios.post('/uploadProfileImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Assuming server returns the new profile image URL
      const newProfileImageUrl = response.data.imageUrl;
      // Update profile image state or user details accordingly
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="flex items-center mb-4">
        <div className="rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src={profileImage} // Replace with actual profile image URL
            alt="Profile"
            className="h-24 w-24 object-cover"
          />
        </div>
        <label htmlFor="profilePictureInput" className="ml-4 cursor-pointer bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
          Edit Profile Picture
        </label>
        <input
          id="profilePictureInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfilePictureEdit}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">User Details</h2>
        <div>
          <div>Name: {userDetails.name}</div>
          <div>Gender: {userDetails.gender}</div>
          {/* Add more user details here */}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Addresses</h2>
        <button
          onClick={() => setIsEditAddressModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          + Add New Address
        </button>
        {renderAddresses()}
      </div>

      {isEditAddressModalOpen && (
        <EditAddressModal
          isOpen={isEditAddressModalOpen}
          onClose={closeEditAddressModal}
          onSave={saveEditedAddress}
          address={selectedAddress}
        />
      )}
    </div>
  );
};

export default UserProfile;
