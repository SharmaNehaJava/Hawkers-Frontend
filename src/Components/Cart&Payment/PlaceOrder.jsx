import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/apiInstances';
import CartContext from '../../context/cartContext';
import { AuthContext } from '../../context/AuthContext';

const PlaceOrder = () => {
  const { cart } = useContext(CartContext);
  // console.log('Cart:', cart);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    pincode: '',
    state: '',
    houseNumber: '',
    building: '',
    street: '',
    area: '',
    localityTown: '',
    cityDistrict: '',
    type: 'home',
    isDefault: false,
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin');
    } else {
      // Fetch user addresses
      const fetchAddresses = async () => {
        try {
          const response = await axiosInstance.get('/api/users/getaddresses');
          // console.log('Addresses fetched:', response.data);
          setAddresses(response.data);
          setSelectedAddress(response.data.find((address) => address.isDefault) || response.data[0]);
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      };

      fetchAddresses();
    }
  }, [isLoggedIn, navigate]);

  const handleAddressChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const validateAddress = () => {
    const { pincode, state, houseNumber, building, street, area, localityTown, cityDistrict } = newAddress;
    return pincode && state && houseNumber && building && street && area && localityTown && cityDistrict;
  };

  const toggleAddAddress = () => {
    setIsAddingAddress(!isAddingAddress);
  };

  const saveAddress = async () => {
    if (!validateAddress()) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axiosInstance.post('/api/users/addaddresses', newAddress);
      setAddresses([...addresses, response.data]);
      setSelectedAddress(response.data);
      setIsAddingAddress(false);
      setNewAddress({
        pincode: '',
        state: '',
        houseNumber: '',
        building: '',
        street: '',
        area: '',
        localityTown: '',
        cityDistrict: '',
        type: 'home',
        isDefault: false,
      });
      setSuccessMessage('Address successfully added!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const cancelAddAddress = () => {
    setNewAddress({
      pincode: '',
      state: '',
      houseNumber: '',
      building: '',
      street: '',
      area: '',
      localityTown: '',
      cityDistrict: '',
      type: 'home',
      isDefault: false,
    });
    setIsAddingAddress(false);
  };

  const handlePlaceOrder = async () => {
    try {
      // console.log(cart);
      const orderData = {
        amount: grandTotal,
        address: selectedAddress,
        cartItems: cart,
      };
      const response = await axiosInstance.post('/api/users/payment/order', orderData);
      // Redirect to payment page with order details
      navigate('/payment', { state: { order: response.data } });
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = total * 0.18; // Assuming 18% GST
  const platformFee = 9; // Example platform fee
  const grandTotal = total + gst + platformFee;

  return (
    <div className="place-order p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-20 md:mt-10 lg:mt-6">
      <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center">Place Your Order</h2>
      {successMessage && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{successMessage}</div>}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>GST (18%):</span>
          <span>${gst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Platform Fee:</span>
          <span>${platformFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4 font-bold">
          <span>Total:</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Select a Delivery Address</h3>
        <select
          className="border p-2 rounded w-full mb-4"
          value={selectedAddress ? selectedAddress._id : ''}
          onChange={(e) => setSelectedAddress(addresses.find(addr => addr._id === e.target.value))}
        >
          {addresses.map((address) => (
            <option key={address._id} value={address._id}>
              {address.houseNumber}, {address.building}, {address.street}, {address.area}, {address.localityTown}, {address.cityDistrict}, {address.state}, {address.pincode}
            </option>
          ))}
        </select>
        <button onClick={toggleAddAddress} className="bg-blue-500 text-white p-2 rounded">Add New Address</button>
      </div>
      {isAddingAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button onClick={cancelAddAddress} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Add New Address</h3>
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
              name="houseNumber"
              placeholder="House Number"
              value={newAddress.houseNumber}
              onChange={handleAddressChange}
              className="border p-1 rounded w-full mb-2"
            />
            <input
              type="text"
              name="building"
              placeholder="Building"
              value={newAddress.building}
              onChange={handleAddressChange}
              className="border p-1 rounded w-full mb-2"
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={newAddress.street}
              onChange={handleAddressChange}
              className="border p-1 rounded w-full mb-2"
            />
            <input
              type="text"
              name="area"
              placeholder="Area"
              value={newAddress.area}
              onChange={handleAddressChange}
              className="border p-1 rounded w-full mb-2"
            />
            <input
              type="text"
              name="localityTown"
              placeholder="Locality/Town"
              value={newAddress.localityTown}
              onChange={handleAddressChange}
              className="border p-1 rounded w-full mb-2"
            />
            <input
              type="text"
              name="cityDistrict"
              placeholder="City/District"
              value={newAddress.cityDistrict}
              onChange={handleAddressChange}
              className="border p-1 rounded w-full mb-2"
            />
            <select
              name="type"
              value={newAddress.type}
              onChange={handleAddressChange}
              className="border p-1 rounded w-full mb-2"
            >
              <option value="home">Home</option>
              <option value="office">Office</option>
              <option value="other">Other</option>
            </select>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                name="isDefault"
                checked={newAddress.isDefault}
                onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                className="mr-2"
              />
              Default Address
            </label>
            <button onClick={saveAddress} className="bg-green-500 text-white p-2 rounded mr-2">Save Address</button>
            <button onClick={cancelAddAddress} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
          </div>
        </div>
      )}
      <button onClick={handlePlaceOrder} className="bg-green-500 text-white p-2 rounded w-full mt-4">Pay Now</button>
    </div>
  );
};

export default PlaceOrder;