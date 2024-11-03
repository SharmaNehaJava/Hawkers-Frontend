import React, { useState, useContext } from 'react';
import CartContext from '../../context/cartContext';

const PlaceOrder = ({ addresses }) => {
  const { cart, total, deliveryFee, grandTotal } = useContext(CartContext);

  // Address states
//   const [selectedAddress, setSelectedAddress] = useState(
//     addresses.find((address) => address.defaultAddress) || addresses[0]
//   );
//   const [isEditingAddress, setIsEditingAddress] = useState(false);
//   const [newAddress, setNewAddress] = useState({
//     name: '',
//     mobileNumber: '',
//     pincode: '',
//     state: '',
//     address: '',
//     locality: '',
//     city: '',
//     defaultAddress: false,
//   });
//   const [isAddingAddress, setIsAddingAddress] = useState(false);

//   // Handle changes to new address fields
//   const handleAddressChange = (e) => {
//     setNewAddress({
//       ...newAddress,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Toggle new address form
//   const toggleAddAddress = () => {
//     setIsAddingAddress(!isAddingAddress);
//   };

//   // Save new address (Add functionality to save to backend if required)
//   const saveAddress = () => {
//     // Add new address logic here
//     setIsAddingAddress(false);
//   };

//   // Cancel adding address
//   const cancelAddAddress = () => {
//     setNewAddress({
//       name: '',
//       mobileNumber: '',
//       pincode: '',
//       state: '',
//       address: '',
//       locality: '',
//       city: '',
//       defaultAddress: false,
//     });
//     setIsAddingAddress(false);
//   };

  return (
    <div className="place-order-container flex flex-col md:flex-row md:justify-between p-6 bg-gray-50 mt-10">
      {/* Left Section: Address */}
      {/* <div className="address-section w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6 m-4">
        <h2 className="font-bold text-xl mb-4 text-gray-700">Delivery Address</h2>
        
        {!isEditingAddress ? (
          <>
            <div className="selected-address bg-gray-100 p-4 rounded-md mb-4">
              <div className="font-semibold">{selectedAddress.name}</div>
              <div>Mobile: {selectedAddress.mobileNumber}</div>
              <div>Pincode: {selectedAddress.pincode}</div>
              <div>State: {selectedAddress.state}</div>
              <div>Address: {selectedAddress.address}</div>
              <div>Locality: {selectedAddress.locality}</div>
              <div>City: {selectedAddress.city}</div>
              <div>Default: {selectedAddress.defaultAddress ? 'Yes' : 'No'}</div>
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
              onClick={() => setIsEditingAddress(true)}
            >
              Edit Address
            </button>
          </>
        ) : (
          <>
            <h3 className="font-bold mb-2">Select Address</h3>
            {addresses.map((address, index) => (
              <div
                key={index}
                className={`address-item p-2 rounded-md m-1 cursor-pointer transition-colors ${
                  selectedAddress === address ? 'bg-green-100' : 'bg-gray-200 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedAddress(address)}
              >
                <div>{address.name}</div>
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
              className="bg-gray-100 py-2 px-4 rounded-lg text-gray-800 w-full mt-4 hover:bg-gray-200"
              onClick={toggleAddAddress}
            >
              + Add New Address
            </button>

            {isAddingAddress && (
              <div className="new-address-form mt-4 bg-gray-50 p-4 rounded-lg">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newAddress.name}
                  onChange={handleAddressChange}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={newAddress.mobileNumber}
                  onChange={handleAddressChange}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={newAddress.pincode}
                  onChange={handleAddressChange}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address (house no, building no, area)"
                  value={newAddress.address}
                  onChange={handleAddressChange}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="locality"
                  placeholder="Locality"
                  value={newAddress.locality}
                  onChange={handleAddressChange}
                  className="border p-2 rounded w-full mb-2"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City/District"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  className="border p-2 rounded w-full mb-2"
                />
                <div className="flex items-center mb-4">
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
                    className="bg-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400"
                    onClick={cancelAddAddress}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    onClick={saveAddress}
                  >
                    Save Address
                  </button>
                </div>
              </div>
            )}

            
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg w-full mt-4 hover:bg-green-600"
              onClick={() => setIsEditingAddress(false)}
            >
              Save Changes
            </button>
          </>
        )}
      </div> */}

      
      <div className="order-summary w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6 m-4">
        <h2 className="font-bold text-xl mb-4 text-gray-700">Order Summary</h2>
        <div className="flex justify-between mb-4">
          <span className="font-semibold text-lg">Subtotal:</span>
          <span>{total} Rs</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="font-semibold text-lg">Platform Fee:</span>
          <span>{deliveryFee} Rs</span>
        </div>
        <div className="flex justify-between font-bold text-2xl text-green-700">
          <span>Total:</span>
          <span>{grandTotal} Rs</span>
        </div>

        <button className="bg-green-500 text-white py-3 px-4 rounded-lg w-full mt-6 hover:bg-green-600">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
