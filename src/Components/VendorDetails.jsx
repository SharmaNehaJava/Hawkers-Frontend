import React from 'react';

const VendorDetails = ({ vendor, products }) => {
  return (
    <div className="vendor-details m-6 ">
      <div className='flex justify-between bg-gray-200 rounded p-2 m-2'>
        <h3>Name</h3>
        <p>{vendor.name}</p>
      </div>
      <div className='flex justify-between bg-gray-200 rounded p-2 m-2'>
        <h3>Business Name</h3>
        <p>{vendor.businessName}</p>
      </div>
      <div className='flex justify-between bg-gray-200 rounded p-2 m-2'>
        <h3>Business Type</h3>
        <p>{vendor.businessType}</p>
      </div>
      <div className='flex justify-between bg-gray-200 rounded p-2 m-2'>
        <h3>Contact Number</h3>
        <p>{vendor.mobile}</p>
      </div>
      <div className='bg-gray-200 rounded p-2 m-2'>
        <h3 className='p-1'>Products</h3>
        <div className="products-box overflow-y-scroll max-h-40 bg-gray-300">
          {products.map((product, index) => (
            <div key={index} className="product-item bg-white p-2 m-2 rounded">
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Price:</strong> {product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;