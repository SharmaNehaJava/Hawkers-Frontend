import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-lg mb-4">Sorry, the page you are looking for is under construction or not available.</p>
      <Link to="/" className="text-green-600 underline">Go back to Home</Link>
    </div>
  );
};

export default NotFound;