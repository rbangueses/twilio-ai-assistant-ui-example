import './style/App.css';
import { useState } from 'react';
import LoginComponent from './components/LoginComponent';
import OTPComponent from './components/OTPComponent';
import ChatComponent from './components/ChatComponent';
import React from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleLogin = () => {
    setIsEmailVerified(true);
  };

  return (
    <div>
      {isLoggedIn ? (
        <ChatComponent email={email} />
      ) : (
        <div className='Login'>
          {!isEmailVerified ? (
            <LoginComponent email={email} setEmail={setEmail} onLogin={handleLogin} />
          ) : (
            <OTPComponent 
              email={email} 
              otp={otp} 
              setOtp={setOtp} 
              setIsOtpVerified={setIsOtpVerified} 
              setIsLoggedIn={setIsLoggedIn} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
