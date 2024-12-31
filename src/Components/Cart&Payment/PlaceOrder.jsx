import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/apiInstances';
import CartContext from '../../context/cartContext';
import { AuthContext } from '../../context/AuthContext';

const PlaceOrder = () => {
  const { cart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
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

  const toggleEditAddress = (address) => {
    setIsEditingAddress(true);
    setNewAddress(address);
  };

  const saveAddress = async () => {
    if (!validateAddress()) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = isEditingAddress
        ? await axiosInstance.put(`/api/users/updateaddress/${newAddress._id}`, newAddress)
        : await axiosInstance.post('/api/users/addaddresses', newAddress);
      setAddresses([...addresses.filter(addr => addr._id !== response.data._id), response.data]);
      setSelectedAddress(response.data.isDefault ? response.data : selectedAddress);
      setIsAddingAddress(false);
      setIsEditingAddress(false);
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
    setIsEditingAddress(false);
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        cartItems: cart,
        address: selectedAddress,
        totalAmount: grandTotal,
      };
      const response = await axiosInstance.post('/api/orders', orderData);
      // Redirect to payment gateway or order confirmation page
      navigate('/order-success');
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
        <h3 className="text-xl font-semibold mb-4">Delivery Address</h3>
        {selectedAddress ? (
          <div className="border p-4 rounded-lg bg-gray-100 mb-4">
            <p>{selectedAddress.houseNumber}, {selectedAddress.building}, {selectedAddress.street}, {selectedAddress.area}, {selectedAddress.localityTown}, {selectedAddress.cityDistrict}, {selectedAddress.state}, {selectedAddress.pincode}</p>
            <button onClick={() => toggleEditAddress(selectedAddress)} className="bg-blue-500 text-white p-2 rounded mt-2">Edit Address</button>
          </div>
        ) : (
          <p>No address selected</p>
        )}
        {addresses.length > 1 && (
          <button onClick={() => setSelectedAddress(null)} className="bg-blue-500 text-white p-2 rounded mb-4">Change Address</button>
        )}
        <button onClick={toggleAddAddress} className="bg-blue-500 text-white p-2 rounded">Add New Address</button>
      </div>
      {isAddingAddress || isEditingAddress ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button onClick={cancelAddAddress} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">{isEditingAddress ? 'Edit Address' : 'Add New Address'}</h3>
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
            <button onClick={saveAddress} className="bg-green-500 text-white p-2 rounded mr-2">{isEditingAddress ? 'Update Address' : 'Save Address'}</button>
            <button onClick={cancelAddAddress} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
          </div>
        </div>
      ) : null}
      <button onClick={handlePlaceOrder} className="bg-green-500 text-white p-2 rounded w-full mt-4">Pay Now</button>
    </div>
  );
};

export default PlaceOrder;