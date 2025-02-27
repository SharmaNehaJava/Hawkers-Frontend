import React from 'react';
import { Link } from 'react-router-dom';

const OrderFailedPage = () => {
  return (
    <div className="h-screen order-failed-page">
      <div className='items-center justify-center flex flex-col h-full'>
        <h2 className="text-2xl font-bold text-center text-red-600">Order Failed</h2>
        <p className="text-center">Your order could not be processed. Please try again.</p>
        <div className='flex justifiy-center gap-4 mt-4'>
        <Link to="/" className="text-green-600 underline">Home Page</Link>
        <Link to="/cart" className="text-green-600 underline">ReOrder?</Link>
        </div>
       
      </div>
    </div>
  );
};

export default OrderFailedPage;