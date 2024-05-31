import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import socket from './socket';

const HomePage = () => {
  const location = useLocation();
  const { name, vehicleId, areaId } = location.state;

  useEffect(() => {
    let intervalId;

    const startSendingLocation = () => {
      intervalId = setInterval(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            sendLocation(latitude, longitude);
            socket.emit("coordinatesUpdated", { vehicleId, latitude, longitude });
          });
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      }, 1000);
    };

    startSendingLocation();

    return () => {
      clearInterval(intervalId);
      socket.disconnect();
    };
  }, [vehicleId]);

  const sendLocation = (latitude, longitude) => {
    console.log("Latitude: " + latitude + ", Longitude: " + longitude);
    // Handle the location data as needed
  };

  return (
    <div>
      <h1>Welcome, {name}</h1>
      <p>Vehicle ID: {vehicleId}</p>
      <p>Area ID: {areaId}</p>
    </div>
  );
};

export default HomePage;
