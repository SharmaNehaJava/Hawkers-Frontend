import React from 'react';

const VendorDetails = ({ vendor }) => {
  return (
    <div className="vendor-details">
      <h2>{vendor.name}</h2>
      <p>Business Type: {vendor.businessType}</p>
      <p>Hawking Timings: {vendor.hawkingTimings}</p>
      {/* Add more vendor details as needed */}
    </div>
  );
};

export default VendorDetails;