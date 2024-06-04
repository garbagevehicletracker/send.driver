import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import socket from './socket';

const HomePage = () => {
  const location = useLocation();
  const { name, vehicleId, areaId, areaName } = location.state;
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    window.sendLocation = (lat, lon) => {
      setLatitude(lat);
      setLongitude(lon);
      sendLocationToServer(lat, lon);
    };
  }, []);

  const sendLocationToServer = (lat, lon) => {
    console.log('Got Location Successfully! Latitude:', lat, 'Longitude:', lon);
    socket.emit('coordinatesUpdated', { vehicleId, latitude: lat, longitude: lon });
  };

  return (
    <div>
      <h1>Welcome, {name}</h1>
      <p>Vehicle ID: {vehicleId}</p>
      <p>Area: {areaName}</p>
      <div id="log">Lat: {latitude} || Long: {longitude}</div>
    </div>
  );
};

export default HomePage;
