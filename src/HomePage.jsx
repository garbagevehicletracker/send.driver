import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import socket from './socket';

const HomePage = () => {
  const location = useLocation();
  const { name, vehicleId, areaId } = location.state;

  useEffect(() => {
    let intervalId;

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocation, handleError, { enableHighAccuracy: true });
      } else {
        console.error('Geolocation not supported');
      }
    };

    const sendLocation = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log('Got Location Successfully!');

      // Emit a 'coordinatesUpdated' event to the server
      socket.emit('coordinatesUpdated', { vehicleId, latitude, longitude });

      // Update the display
      document.getElementById('log').innerText = `Lat: ${latitude} || Long: ${longitude}`;
    };

    const handleError = (error) => {
      console.error('Error getting location', error);
    };

    intervalId = setInterval(getLocation, 1000);

    return () => {
      clearInterval(intervalId);
      socket.disconnect();
    };
  }, [vehicleId]);

  return (
    <div>
      <h1>Welcome, {name}</h1>
      <p>Vehicle ID: {vehicleId}</p>
      <p>Area ID: {areaId}</p>
      <div id="log">Waiting for location...</div>
    </div>
  );
};

export default HomePage;
