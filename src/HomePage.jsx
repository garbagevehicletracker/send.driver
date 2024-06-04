import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import socket from './socket';

const HomePage = () => {
  const location = useLocation();
  const { name, vehicleId, areaName, driverImage } = location.state;
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
    <div style={styles.container}>
      <div style={styles.profile}>
        <img src={driverImage} alt="Driver" style={styles.profileImage} />
        <div style={styles.profileInfo}>
          <h1 style={styles.heading}>Welcome, {name}</h1>
          <p>Vehicle ID: {vehicleId}</p>
          <p>Area: {areaName}</p>
        </div>
      </div>
      <div id="log" style={styles.coordinates}>Lat: {latitude} || Long: {longitude}</div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '100%',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profileImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginRight: '20px',
  },
  profileInfo: {
    textAlign: 'left',
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '5px',
  },
  coordinates: {
    fontSize: '16px',
  },
};

export default HomePage;
