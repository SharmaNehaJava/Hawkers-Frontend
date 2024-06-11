import React, { useEffect } from 'react';

const MapComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA12LRapAG9oCxOUoVV59Cs9Ba5frkO4EM&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);

    window.initMap = () => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -3.745, lng: -38.523 },
        zoom: 10,
      });

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: -3.745, lng: -38.523 },
        title: 'Hello World!',
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default MapComponent;
