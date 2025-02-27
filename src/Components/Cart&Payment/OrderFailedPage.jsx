import React from 'react';

const OrderFailedPage = () => {
  return (
    <div className="order-failed-page">
      <h2 className="text-2xl font-bold text-center text-red-600">Order Failed</h2>
      <p className="text-center">Your order could not be processed. Please try again.</p>
    </div>
  );
};

export default OrderFailedPage;