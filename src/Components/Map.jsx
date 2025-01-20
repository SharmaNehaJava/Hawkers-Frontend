import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';

import instance from '../api/apiInstances';
import VendorDetails from './VendorDetails.jsx';

const socket = io('http://localhost:3000', {
  reconnectionAttempts: 5, // Attempt to reconnect 5 times
  reconnectionDelay: 1000, // Wait 1 second before attempting to reconnect
});

const Map = () => {
  const [vendors, setVendors] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [category, setCategory] = useState('');
  const [range, setRange] = useState(100);
  const [businessType, setBusinessType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const mapInstance = L.map('map').setView([latitude, longitude], 16);
        setMap(mapInstance);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);

        const userMarker = L.marker([latitude, longitude], { icon: createIcon('blue') }).addTo(mapInstance)
          .bindPopup('You are here')
          .openPopup();

        const response = await instance.get('/api/users/nearbyvendors', {
          params: {
            lat: latitude,
            lng: longitude,
            radius: range,
            category,
            businessType,
          },
        });
        setVendors(response.data || []);
        response.data.forEach(vendor => {
          const vendorMarker = L.marker([vendor.location.lat, vendor.location.lng], { icon: createIcon(vendor.businessType === 'Moving' ? 'lightgreen' : 'darkgreen') }).addTo(mapInstance)
            .bindTooltip(`<b>${vendor.name}</b>`, { permanent: false, direction: 'top' })
            .on('click', () => handleVendorClick(vendor));
        });

        socket.emit('updateVendorLocation', { lat: latitude, lng: longitude });

        socket.on('vendorLocationUpdated', (data) => {
          console.log('Vendor location updated:', data);
          // Update vendor markers or other UI as needed
        });

        setInterval(async () => {
          const currentPosition = await getCurrentPosition();
          const { latitude, longitude } = currentPosition.coords;
          userMarker.setLatLng([latitude, longitude]);
          mapInstance.setView([latitude, longitude], 16);
          socket.emit('updateVendorLocation', { lat: latitude, lng: longitude });
        }, 5000);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [category, range, businessType]);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const createIcon = (color) => {
    return L.icon({
      iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  const handleVendorClick = async (vendor) => {
    try {
      const response = await instance.get(`/api/users/vendorinfo/${vendor._id}`);
      setSelectedVendor(response.data.vendor);
    } catch (error) {
      console.error('Error fetching vendor details:', error);
    }
  };

  const handleBackToList = () => {
    setSelectedVendor(null);
  };

  return (
    <div className='flex bg-gray-200 p-2'>
      <div style={{ position: 'relative', zIndex: 0 }} className='h-1/2 w-1/2 p-2'>
        <div id="map" style={{ height: '400px', width: '100%' }} className='z-0'></div>
      </div>
      <div className='h-1/2 w-1/2 p-2'>
        {selectedVendor ? (
          <div className='mt-4 bg-white p-2 rounded-md'>
            <button className='absolute top-2 right-2 text-red-500' onClick={handleBackToList}>X</button>
            <VendorDetails vendor={selectedVendor} />
          </div>
        ) : (
          <div style={{ height: '400px', width: '100%' }} className='bg-white p-2 rounded-md'>
            <h3 className='text-2xl font-sans underline mx-auto text-center'>Nearby Vendors</h3>
            <div className='flex justify-around rounded-md mt-4 bg-gray-200 p-2 w-fit'>
              <select
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-700"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fast Food">Fast Food</option>
                <option value="Dairy">Dairy</option>
                <option value="Juices">Juices</option>
                <option value="Other">Other</option>
              </select>
              <select
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-700"
                value={range}
                onChange={(e) => setRange(e.target.value)}
              >
                <option value={100}>100m</option>
                <option value={300}>300m</option>
                <option value={500}>500m</option>
              </select>
              <select
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-700"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="Both">Both</option>
                <option value="Moving">Moving</option>
                <option value="Stationary">Stationary</option>
              </select>
            </div>
            <div className='mt-4 bg-gray-200 h-fit w-full'>
              {vendors.length === 0 ? (
                <p className='text-center'>No vendors available</p>
              ) : (
                vendors.map((vendor) => (
                  <div key={vendor._id} className='border p-2 rounded mb-2'>
                    <h4 className='text-lg font-bold'>{vendor.name}</h4>
                    <p>Category: {vendor.category}</p>
                    <button
                      className='bg-blue-500 text-white py-1 px-2 rounded mt-2'
                      onClick={() => handleVendorClick(vendor)}
                    >
                      View Profile
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;