import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import EmailLoginBox from './EmailLoginBox.jsx';
import { handleError } from '../eventHandlers/errorHandler';

const BACKEND_API_URL = 'http://localhost:5000';

const LoginBox = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [enteredOTP, setEnteredOTP] = useState(''); // Fixed camelCase
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  // Function to handle login
  const onLoginClick = async () => {
    try {
      const response = await axios.post(`${BACKEND_API_URL}/auth/login`, {
        email,
        enteredOTP, // Send the correct OTP variable
        role,
      });
      console.log(response.data);
      if(role=="Student")
      navigate('/dashboard'); // Redirect on successful login
    else
    navigate('/dashboard_inst');
    } catch (error) {
      console.error('Error logging in:', error);
      handleError({ error, setError }); // Display error message
    }
  };

  // Function to handle sending OTP
  const onSendOTPClick = async () => {
    try {
      console.log({email});
      console.log({BACKEND_API_URL});
      const response = await axios.post(`${BACKEND_API_URL}/auth/sendOTP`, {
        email,role,
        
      });
      console.log(response.data);
      console.log('OTP sent successfully:', response.data);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error sending OTP:', error);
      handleError({ error, setError }); // Display error message
    }
  };

  return (
    <div className="bg-black rounded-lg w-[700px] h-[400px] p-5">
      <h2 className="text-white text-lg mb-4">Login</h2>
      <EmailLoginBox
        email={email}
        enteredOTP={enteredOTP} // Pass the OTP to EmailLoginBox
        error={error}
        setEmail={setEmail}
        setEnteredOTP={setEnteredOTP} // Set OTP correctly
        role={role}
        setRole={setRole}
        onSendOTPClick={onSendOTPClick} // Fixed function name
        onLoginClick={onLoginClick}
      />
    </div>
  );
};

export default LoginBox;
