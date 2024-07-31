import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';
// import VendorDetails from './VendorDetails';
import Cart from '../Components/Cart&Payment/Cart';

const socket = io('http://localhost:3000');

const Map = () => {
  const [vendors, setVendors] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const mapInstance = L.map('map').setView([latitude, longitude], 14);
        setMap(mapInstance);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);

        const userMarker = L.marker([latitude, longitude]).addTo(mapInstance)
          .bindPopup('You are here')
          .openPopup();

        const response = await axios.get(`/api/location/nearby?lat=${latitude}&lng=${longitude}`);
        setVendors(response.data);
        response.data.forEach(vendor => {
          const vendorMarker = L.marker([vendor.location.lat, vendor.location.lng]).addTo(mapInstance)
            .bindPopup(`<b>${vendor.name}</b>`)
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
          mapInstance.setView([latitude, longitude], 14);
          socket.emit('updateVendorLocation', { lat: latitude, lng: longitude });
        }, 5000);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor);
  };

  const handleAddToCart = (product) => {
    setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
  };

  const handleCheckout = () => {
    console.log('Checkout', cartItems);
  };

  return (
    <div style={{ position: 'relative', zIndex: 0 }} >
      <div id="map" style={{ height: '400px', width: '100%',}}
      className='z-0'></div>
      {selectedVendor && <VendorDetails vendor={selectedVendor} onAddToCart={handleAddToCart} />}
      {/* <Cart cartItems={cartItems} onCheckout={handleCheckout} /> */}
    </div>
  );
};

export default Map;
