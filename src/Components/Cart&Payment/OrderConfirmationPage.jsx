import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders } = location.state || {};

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-red-600">No Orders Found</h2>
        <p className="mt-4">It seems like there are no orders to display.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Order Placed Successfully</h2>
      {orders.map((order, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Order #{order._id}</h3>
          {/* <p className="mb-1"><strong>Vendor:</strong> {order.vendor}</p> */}
          <p className="mb-1"><strong>Address:</strong> {order.address.houseNumber}, {order.address.building}, {order.address.street}, {order.address.area}, {order.address.localityTown}, {order.address.cityDistrict}, {order.address.state}, {order.address.pincode}</p>
          <p className="mb-1"><strong>Status:</strong> {order.status}</p>
          <h4 className="text-lg font-semibold mt-4 mb-2">Items:</h4>
          <ul className="list-disc list-inside">
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} - {item.quantity} x Rs{item.price}
              </li>
            ))}
          </ul>
          <button
          onClick={() => navigate('/')}
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          Go to Home
        </button>
        </div>
      ))}
    </div>
  );
};

export default OrderConfirmation;