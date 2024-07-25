import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ onSignOut, onDeleteAccount }) => {
  const [userInfo, setUserInfo] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
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
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const toggleAddAddress = () => {
    setIsAddingAddress(!isAddingAddress);
  };

  const saveAddress = () => {
    // Save the new address logic here
    setIsAddingAddress(false);
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
    // Clear user info from local storage
    localStorage.removeItem('userInfo');
    setUserInfo({});
    // Navigate to sign-in page
    navigate('/');
    
    onSignOut();
    
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'userInfo':
        return (
          <div>
            <button onClick={() => setActiveSection(null)}>&larr; Back</button>
            <div className="mb-4  p-2">
              <div className='bg-gray-200 p-2 rounded-md m-1'>Name: {userInfo.name}</div>
              <div className='bg-gray-200 p-2 rounded-md m-1'>Mobile: {userInfo.mobileNumber}</div>
              <div className='bg-gray-200 p-2 rounded-md m-1'>Email: {userInfo.email}</div>
              <div className='bg-gray-200 p-2 rounded-md m-1'>DOB: {userInfo.dob}</div>
              <div className='bg-gray-200 p-2 rounded-md m-1'>Gender: {userInfo.gender}</div>
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
            {/* Display saved addresses here */}
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
                  <label>Make this my default address</label>
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
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              onClick={onDeleteAccount}
            >
              Delete Account
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
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
