import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/apiInstances';
import { AuthContext } from '../context/AuthContext';
import { AiOutlineClose } from 'react-icons/ai';

const ProfileDropdown = ({ toggleProfileDropdown, setUser }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const [orders, setOrders] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: '',
    mobile: '',
    pincode: '',
    state: '',
    address: '',
    locality: '',
    city: '',
    defaultAddress: false,
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin');
    } else {
      // Fetch user info and addresses
      const fetchUserData = async () => {
        try {
          const [userInfoResponse, ordersResponse, addressesResponse] = await Promise.all([
            axiosInstance.get('/api/users/getprofile'),
            axiosInstance.get('/api/users/orders'),
            axiosInstance.get('/api/users/getaddresses'),
          ]);
          setUser(userInfoResponse.data.name);
          setUserInfo(userInfoResponse.data);
          setOrders(ordersResponse.data);
          setAddresses(addressesResponse.data);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setNewAddress({ ...newAddress, [name]: checked });
    } else {
      setNewAddress({ ...newAddress, [name]: value });
    }
  };

  const toggleAddAddress = () => {
    setIsAddingAddress(!isAddingAddress);
  };

  const handleEditField = (field) => {
    setEditField(field);
  };

  const handleAddAddress = async () => {
    try {
      const response = await axiosInstance.post('/api/users/addaddresses', newAddress);
      setAddresses([...addresses, response.data]);
      setIsAddingAddress(false);
      setNewAddress({
        name: '',
        mobile: '',
        pincode: '',
        state: '',
        address: '',
        locality: '',
        city: '',
        defaultAddress: false,
      });
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleUpdateAddress = async (id, updatedAddress) => {
    try {
      const response = await axiosInstance.put(`/api/users/updateaddress/${id}`, updatedAddress);
      setAddresses(addresses.map(address => (address._id === id ? response.data : address)));
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axiosInstance.delete(`/api/users/deleteaddress/${id}`);
      setAddresses(addresses.filter(address => address._id !== id));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axiosInstance.put('/api/users/updateprofile', userInfo);
      setUserInfo(response.data);
      setEditField(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    try {
      await axiosInstance.delete('/api/users/deleteaccount');
      localStorage.removeItem('userInfo');
      navigate('/signin');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'userInfo':
        return (
          <div>
            <button onClick={() => setActiveSection(null)}>&larr; Back</button>
            <div className="mb-1 p-2">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    placeholder='Name'
                    onChange={handleInputChange}
                    className="bg-gray-800 p-2 rounded-md m-1 w-full hover:bg-gray-500"
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder='E-mail'
                    value={userInfo.email}
                    onChange={handleInputChange}
                    className="bg-gray-800 p-2 rounded-md m-1 w-full hover:bg-gray-500"
                  />
                  <input
                    type="text"
                    name="mobile"
                    value={userInfo.mobile}
                    placeholder='Mobile Number'
                    onChange={handleInputChange}
                    className="bg-gray-800 p-2 rounded-md m-1 w-full hover:bg-gray-500"
                  />
                  <input
                    type="text"
                    name="dob"
                    value={userInfo.dob.split('T')[0]}
                    placeholder='Date Of Birth'
                    onChange={handleInputChange}
                    className="bg-gray-800 p-2 rounded-md m-1 w-full hover:bg-gray-500"
                  />
                  <input
                    type="text"
                    name="gender"
                    value={userInfo.gender}
                    placeholder='Gender-(Male, female, Other)'
                    onChange={handleInputChange}
                    className="bg-gray-800 p-2 rounded-md m-1 w-full hover:bg-gray-500"
                  />
                  <div className='flex justify-between m-1'>
                    <button
                      className="bg-blue-800 text-white p-2 rounded hover:bg-blue-500"
                      onClick={handleUpdateProfile}
                    >
                      Update
                    </button>

                    <button
                      className="bg-blue-800 text-white p-2 rounded hover:bg-blue-500"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className='bg-gray-800 p-2 rounded-md m-1'>Name: {userInfo.name}</div>
                  <div className='bg-gray-800 p-2 rounded-md m-1'>Email: {userInfo.email}</div>
                  <div className='bg-gray-800 p-2 rounded-md m-1'>Mobile: {userInfo.mobile}</div>
                  <div className='bg-gray-800 p-2 rounded-md m-1'>DOB: {new Date(userInfo.dob).toLocaleDateString()}</div>
                  <div className='bg-gray-800 p-2 rounded-md m-1'>Gender: {userInfo.gender}</div>
                  <button
                    className="bg-blue-500 text-white p-2 rounded "
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
            <ul>
              {orders.map(order => (
                <li key={order._id} className="bg-gray-700 p-2 rounded-md m-1">
                  {/* <p>Order ID: {order._id}</p> */}
                  <p>Items:</p>
                  <ul className='px-2 mb-1'>
                    {order.items.map((item, index) => (
                      <li key={index}>{item.name} - {item.quantity}</li>
                    ))}
                  </ul>
                  <p className='mb-1'>Order Placed At: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p className='mb-1'>Address: {order.address.houseNumber}, {order.address.building}, {order.address.street}, {order.address.cityDistrict}, {order.address.state}, {order.address.pincode}</p>
                  {/* <p className='mb-1'>Total: {order.totalPrice} Rs</p> */}
                  <p className={`mb-1 flex `}>Status: <p className={`${order.status === 'failed' ? 'text-red-600' : 'text-blue-600'}`}>{order.status}</p></p>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'addresses':
        return (
          <div>
            <button onClick={() => setActiveSection(null)}>&larr; Back</button>
            <div className="font-bold">Addresses</div>
            {addresses.map((address, index) => (
              <div key={index} className="bg-gray-700 p-2 rounded-md m-1">
                <div className='mb-1'>Type: {address.type}</div>
                <div className='mb-1'>House Number: {address.houseNumber}</div>
                <div className='mb-1'>Building: {address.building}</div>
                <div className='mb-1'>Street: {address.street}</div>
                <div className='mb-1'>Area: {address.area}</div>
                <div className='mb-1'>Locality: {address.localityTown}</div>
                <div className='mb-1'>City/District: {address.cityDistrict}</div>
                <div className='mb-1'>State: {address.state}</div>
                <div className='mb-1'>Pincode: {address.pincode}</div>
                <div className='mb-1'>Default: {address.isDefault ? 'Yes' : 'No'}</div>
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
                  onChange={handleAddressChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={newAddress.mobile}
                  onChange={handleAddressChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={newAddress.pincode}
                  onChange={handleAddressChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address (house no, building no, area)"
                  value={newAddress.address}
                  onChange={handleAddressChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="locality"
                  placeholder="Locality"
                  value={newAddress.locality}
                  onChange={handleAddressChange}
                  className="border p-1 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City/District"
                  value={newAddress.city}
                  onChange={handleAddressChange}
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
                    onClick={() => setIsAddingAddress(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 p-2 rounded text-white"
                    onClick={handleAddAddress}
                  >
                    Save Address
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      // case 'helpCenter':
      //   return (
      //     <div>
      //       <button onClick={() => setActiveSection(null)}>&larr; Back</button>
      //       <div className="font-bold">Help Center</div>
      //       {/* Add help center details here */}
      //     </div>
      //   );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={toggleProfileDropdown}></div>
      <div className="relative bg-gray-900 rounded-lg p-4 shadow-lg w-72 h-1/2 max-h-screen overflow-y-scroll text-white">
        <button className="absolute top-2 right-2 text-white" onClick={toggleProfileDropdown}>
          <AiOutlineClose size={24} />
        </button>
        {activeSection ? (
          renderSection()
        ) : (
          <div className='mt-6'>
            <button
              className="w-full text-left m-1 py-2 px-4 bg-gray-500 rounded"
              onClick={() => setActiveSection('userInfo')}
            >
              User Info
            </button>
            <button
              className="w-full text-left py-2 px-4 rounded m-1 bg-gray-500 border-2 border-gray-500 hover:border-blue-500"
              onClick={() => setActiveSection('order')}
            >
              Order
            </button>
            <button
              className="w-full text-left py-2 px-4 rounded m-1 bg-gray-500 border-2 border-gray-500 hover:border-blue-500"
              onClick={() => setActiveSection('addresses')}
            >
              Addresses
            </button>
            {/* <button
              className="w-full text-left py-2 px-4 rounded m-1 bg-gray-500 border-2 border-gray-500 hover:border-blue-500"
              onClick={() => setActiveSection('helpCenter')}
            >
              Help Center
            </button> */}

            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDropdown;