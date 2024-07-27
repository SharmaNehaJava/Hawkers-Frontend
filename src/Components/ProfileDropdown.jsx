import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/apiInstances';

const ProfileDropdown = ({ onSignOut, onDeleteAccount }) => {
  const [userInfo, setUserInfo] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    mobileNumber: '',
    pincode: '',
    state: '',
    address: '',
    locality: '',
    city: '',
    defaultAddress: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get('/api/users/profile');
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axiosInstance.get('/api/users/profile/getAddresses');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const toggleAddAddress = () => {
    setIsAddingAddress(!isAddingAddress);
  };

  const handleEditField = (field) => {
    setEditField(field);
  };

  const saveAddress = async () => {
    try {
      const response = await axiosInstance.post('/api/users/profile/addAddresses', newAddress);
      setAddresses([...addresses, response.data]);
      setIsAddingAddress(false);
      setNewAddress({
        name: '',
        mobileNumber: '',
        pincode: '',
        state: '',
        address: '',
        locality: '',
        city: '',
        defaultAddress: false,
      });
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const cancelAddAddress = () => {
    setIsAddingAddress(false);
    setNewAddress({
      name: '',
      mobileNumber: '',
      pincode: '',
      state: '',
      address: '',
      locality: '',
      city: '',
      defaultAddress: false,
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem('userInfo');
    setUserInfo({});
    navigate('/');
    onSignOut();
  };

  const handleDeleteAccount = async () => {
    try {
      await axiosInstance.delete('/api/users/deleteAccount');
      localStorage.removeItem('userInfo');
      setUserInfo({});
      navigate('/');
      onDeleteAccount();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const saveUserInfo = async () => {
    try {
      const response = await axiosInstance.put('/api/users/profile/update', userInfo);
      setUserInfo(response.data);
      setIsEditing(false);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'userInfo':
        return (
          <div>
            <button onClick={() => setActiveSection(null)}>&larr; Back</button>
            <div className="mb-4  p-2">
            {isEditing ? (
                <>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  placeholder='Name'
                  onChange={handleInputChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="email"
                  placeholder='E-mail'
                  value={userInfo.email}
                  onChange={handleInputChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="mobileNumber"
                  value={userInfo.mobile}
                  placeholder='Mobile Number'
                  onChange={handleInputChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="dob"
                  value={userInfo.dob}
                  placeholder='Date Of Birth'
                  onChange={handleInputChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="gender"
                  value={userInfo.gender}
                  placeholder='Gender-(Male, female, Other)'
                  onChange={handleInputChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={saveUserInfo}
                >
                  Update
                </button>
              </>
            ) : (
              <>
              <div className='bg-gray-200 p-2 rounded-md m-1'>Name: {userInfo.name}</div>
              <div className='bg-gray-200 p-2 rounded-md m-1'>Mobile: {userInfo.mobileNumber}</div>
              <div className='bg-gray-200 p-2 rounded-md m-1'>Email: {userInfo.email}</div>
              <div className='bg-gray-200 p-2 rounded-md m-1'>DOB: {userInfo.dob}</div>
              <div className='bg-gray-200 p-2 rounded-md m-1'>Gender: {userInfo.gender}</div>
              <button
                    className="bg-gray-200 text-gray-800 p-2 rounded mt-2"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        );
      case 'order':
        return (
          <div>
            <button onClick={() => setActiveSection(null)}>&larr; Back</button>
            <div className="font-bold">Order</div>
            {/* Add order history and current order details here */}
          </div>
        );
      case 'addresses':
        return (
          <div>
            <button onClick={() => setActiveSection(null)}>&larr; Back</button>
            <div className="font-bold">Addresses</div>
            {addresses.map((address, index) => (
              <div key={index} className="bg-gray-200 p-2 rounded-md m-1">
                <div>Name: {address.name}</div>
                <div>Mobile: {address.mobileNumber}</div>
                <div>Pincode: {address.pincode}</div>
                <div>State: {address.state}</div>
                <div>Address: {address.address}</div>
                <div>Locality: {address.locality}</div>
                <div>City: {address.city}</div>
                <div>Default: {address.defaultAddress ? 'Yes' : 'No'}</div>
              </div>
            ))}
            <button
              className="bg-gray-100 p-2 rounded text-gray-800 w-full mt-2"
              onClick={toggleAddAddress}
            >
              + Add New Address
            </button>
            {isAddingAddress && (
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newAddress.name}
                  onChange={handleInputChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={newAddress.mobileNumber}
                  onChange={handleInputChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={newAddress.pincode}
                  onChange={handleInputChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={handleInputChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address (house no, building no, area)"
                  value={newAddress.address}
                  onChange={handleInputChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="locality"
                  placeholder="Locality"
                  value={newAddress.locality}
                  onChange={handleInputChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City/District"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="defaultAddress"
                    checked={newAddress.defaultAddress}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        defaultAddress: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  <label>Make Default</label>
                </div>
                <div className="flex justify-between">
                  <button
                    className="bg-gray-200 p-2 rounded text-gray-800"
                    onClick={cancelAddAddress}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 p-2 rounded text-white"
                    onClick={saveAddress}
                  >
                    Save Address
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      case 'helpCenter':
        return (
          <div>
            <button onClick={() => setActiveSection(null)}>&larr; Back</button>
            <div className="font-bold">Help Center</div>
            {/* Add help center details here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50">
      {activeSection ? (
        renderSection()
      ) : (
        <>
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
              {userInfo.name && userInfo.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <div className="font-bold">{userInfo.name}</div>
              <div className="text-sm text-gray-600">{userInfo.email}</div>
            </div>
          </div>

          <button
            className="w-full text-left py-2 px-4 rounded hover:bg-gray-100"
            onClick={() => setActiveSection('userInfo')}
          >
            User Info
          </button>
          <button
            className="w-full text-left py-2 px-4 rounded hover:bg-gray-100"
            onClick={() => setActiveSection('order')}
          >
            Order
          </button>
          <button
            className="w-full text-left py-2 px-4 rounded hover:bg-gray-100"
            onClick={() => setActiveSection('addresses')}
          >
            Addresses
          </button>
          <button
            className="w-full text-left py-2 px-4 rounded hover:bg-gray-100"
            onClick={() => setActiveSection('helpCenter')}
          >
            Help Center
          </button>

          <div className="flex justify-between mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-auto px-2 rounded"
              onClick={onDeleteAccount}
            >
              Delete Account
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-auto px-2 rounded"
              onClick={handleSignOut} // Updated to call handleSignOut
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
