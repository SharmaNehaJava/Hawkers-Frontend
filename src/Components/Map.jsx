import React, { useEffect, useState, useContext, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationContext } from '../context/LocationContext';
import { useSocket } from '../context/SocketContext.jsx';
import instance from '../api/apiInstances';
import VendorDetails from './VendorDetails.jsx';

const Map = () => {
  const { location } = useContext(LocationContext);
  const socket = useSocket();
  const [vendors, setVendors] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [category, setCategory] = useState('');
  const [range, setRange] = useState(100);
  const [businessType, setBusinessType] = useState('');
  const mapContainerRef = useRef(null);
  const markersRef = useRef([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize the map
  useEffect(() => {
    if (!location || map || !mapContainerRef.current) return;

    const mapInstance = L.map(mapContainerRef.current).setView([location.lat, location.lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance);

    // Add user marker
    const userMarker = L.marker([location.lat, location.lng], {
      icon: createIcon('blue'),
    })
      .addTo(mapInstance)
      .bindPopup('You are here')
      .openPopup();

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [location, mapContainerRef.current]);

  // Fetch nearby vendors and add markers to the map
  useEffect(() => {
    if (!location || !map) return;

    const fetchVendors = async () => {
      try {
        const response = await instance.get('/api/users/nearbyvendors', {
          params: { lat: location.lat, lng: location.lng, radius: range, category, businessType },
        });

        const vendorArray = Array.isArray(response.data) ? response.data : [];
        setVendors(vendorArray);

        // Clear existing markers
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        // Add new markers
        vendorArray.forEach((vendor) => {
          if (vendor.location?.coordinates) {
            const [vLng, vLat] = vendor.location.coordinates;
            const marker = L.marker([vLat, vLng], {
              icon: createIcon('red'),
            })
              .addTo(map)
              .bindPopup(vendor.name)
              .on('click', () => handleVendorClick(vendor));
            markersRef.current.push(marker);
          }
        });

        // Adjust map view to fit all markers
        if (vendorArray.length > 0) {
          const bounds = L.latLngBounds(vendorArray.map((vendor) => vendor.location.coordinates.reverse()));
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, [location, map, range, category, businessType]);

  // Listen for vendor location updates
  useEffect(() => {
    if (!socket) return;

    socket.on('vendorLocationUpdated', ({ vendorId, coordinates }) => {
      setVendors((prevVendors) =>
        prevVendors.map((vendor) =>
          vendor._id === vendorId ? { ...vendor, location: { coordinates } } : vendor
        )
      );

      // Update the marker position on the map
      const marker = markersRef.current.find((m) => m.vendorId === vendorId);
      if (marker) {
        marker.setLatLng([coordinates[1], coordinates[0]]);
      }
    });

    return () => {
      socket.off('vendorLocationUpdated');
    };
  }, [socket]);

  // Create a custom icon for markers
  const createIcon = (color) => {
    return L.icon({
      iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  // Handle vendor click
  const handleVendorClick = async (vendor) => {
    try {
      const response = await instance.get(`/api/users/vendorinfo/${vendor._id}`);
      setSelectedVendor(response.data.vendor);
    } catch (error) {
      console.error('Error fetching vendor details:', error);
    }
  };

  // Handle back to list
  const handleBackToList = () => {
    setSelectedVendor(null);
  };

  return (
    <div className={`h-auto flex ${isMobile ? 'flex-col' : 'flex-row'} bg-gray-200 p-2`}>
      <div style={{ position: 'relative', zIndex: 0 }} className={`h-1/2 ${isMobile ? 'w-full' : 'w-1/2'} p-2`}>
        <div ref={mapContainerRef} id="map" style={{ height: '400px', width: '100%' }} className='z-0'></div>
      </div>
      <div className={`h-1/2 ${isMobile ? 'w-full' : 'w-1/2'} p-2`}>
        {selectedVendor ? (
          <div className='mt-4 bg-white p-2 rounded-md'>
            <button className='absolute top-2 right-2 text-red-500' onClick={handleBackToList}>X</button>
            <VendorDetails vendor={selectedVendor} />
          </div>
        ) : (
          <div className='bg-white p-2 rounded-md w-full'>
            <h3 className='text-2xl font-sans underline mx-auto text-center'>Nearby Vendors</h3>
            <div className='flex flex-col sm:flex-row justify-around rounded-md mt-4 bg-gray-200 p-2 w-full'>
              <select
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-700"
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
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-700"
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
                <option value="All">Both</option>
                <option value="moving">Moving</option>
                <option value="stationary">Stationary</option>
              </select>
            </div>
            <div className='mt-4 bg-gray-200 w-full overflow-y-scroll' style={{ maxHeight: '250px' }}>
              {vendors.length === 0 ? (
                <p className='text-center'>No vendors available</p>
              ) : (
                vendors.map((vendor) => (
                  <div key={vendor._id} className=' border p-2 rounded mb-2 flex justify-between text-center items-center bg-white mt-2 ml-2 mr-2 hover:bg-green-200'>
                    <h4 className='text-md font-bold'>{vendor.name}</h4>
                    <p>Business Name: {vendor.businessName}</p>
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