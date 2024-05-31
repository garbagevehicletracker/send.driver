import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://garbage-tracking-backend.onrender.com/driver-login/get-all-drivers/')
      .then(response => response.json())
      .then(data => setDrivers(data))
      .catch(error => console.error('Error fetching drivers:', error));
  }, []);

  const handleLogin = () => {
    const loginData = {
      driverId: selectedDriver,
      password: password,
    };

    console.log('Login Data:', loginData);  // Log the data being sent for login

    fetch('https://garbage-tracking-backend.onrender.com/driver-login/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Login Response:', data);  // Log the response from the login API
        if (data.message === 'Login successful') {
          navigate('/home', { state: { ...data } });
        } else {
          alert('Login failed');
        }
      })
      .catch(error => console.error('Error during login:', error));
  };

  return (
    <div>
      <h1>Login</h1>
      <select onChange={(e) => setSelectedDriver(e.target.value)} value={selectedDriver}>
        <option value="" disabled>Select Driver</option>
        {drivers.map(driver => (
          <option key={driver.driverId} value={driver.driverId}>
            {driver.name}
          </option>
        ))}
      </select>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
