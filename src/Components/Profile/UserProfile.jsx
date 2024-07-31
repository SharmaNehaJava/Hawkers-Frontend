import React, { useState } from 'react';
import axios from '../../api/apiInstances';
import EditAddressModal from './EditAddressModal';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState({ name: '', gender: '' });
  const [profilePicture, setProfilePicture] = useState(null);

  const [addresses, setAddresses] = useState([
    // Example addresses
  ]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await axios.post('/api/users/upload-profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProfilePicture(response.data.profilePicture);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

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

  return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="flex items-center space-x-4 mb-8">
        <div className="relative w-32 h-32">
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" className="rounded-full w-full h-full object-cover" />
          ) : (
            <div className="rounded-full w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500 text-4xl">{userDetails.name.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{userDetails.name}</h2>
          <p className="text-gray-600">{userDetails.gender}</p>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Addresses</h3>
        <ul>
          {addresses.map((address) => (
            <li key={address.id} className="mb-2">
              <div className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
                <div>
                  <p>{address.houseNumber}, {address.street}, {address.city}</p>
                  <p>{address.state}, {address.pincode}</p>
                  <p>{address.type}</p>
                </div>
                <div>
                  <button onClick={() => openEditAddressModal(address)} className="mr-2 text-blue-500 hover:text-blue-700">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={() => openEditAddressModal(null)} className="text-blue-500 hover:text-blue-700">+ ADD NEW ADDRESS</button>
      </div>
      <div>
        <button className="text-red-500 hover:text-red-700">Delete Account</button>
        <button className="ml-4 text-gray-600 hover:text-gray-800">Logout</button>
      </div>
      {isEditAddressModalOpen && <EditAddressModal address={selectedAddress} onClose={closeEditAddressModal} />}
    </div>
  );
};

export default UserProfile;
