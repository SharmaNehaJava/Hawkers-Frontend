import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orders } = location.state;

  return (
    <div>
      <h2>Order Placed Successfully</h2>
      {orders.map((order, index) => (
        <div key={index}>
          <h3>Order #{order._id}</h3>
          <p>Vendor: {order.vendor}</p>
          <p>Address: {order.address}</p>
          <p>Status: {order.status}</p>
          <h4>Items:</h4>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.name} - {item.quantity} x {item.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderConfirmation;