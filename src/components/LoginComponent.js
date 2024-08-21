import React from "react";
import {Stack} from '@twilio-paste/core/stack';
import {Input} from '@twilio-paste/core/input';
import {Label} from '@twilio-paste/core/label';
import {Button} from '@twilio-paste/core/button';
import { Text } from '@twilio-paste/core/text';
import { useRef, useState } from 'react';

async function sendOTP(email, setErrorMessage) {
    try {
      const response = await fetch(`/verifySendOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
      const result = await response.json();
      if (result.status === 'pending') {
        return true;
      } else {
        setErrorMessage('Error sending OTP. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error sending OTP. Please try again.');
      return false;
    }
  }

const LoginComponent = ({ onLogin, email, setEmail }) => {
    const emailInputRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleLoginClick = () => {
      const emailInput = emailInputRef.current.value;
      if (emailInput.endsWith(process.env.REACT_APP_ALLOWED_DOMAIN)) {
        setErrorMessage(''); // Clear any previous error message
        setEmail(emailInput); // Update the email state

        if (sendOTP(emailInput, errorMessage, setErrorMessage)){
            onLogin(); // Call the onLogin function to update the login status
        }
        else{
            setErrorMessage('Error sending OTP. Please try again.');
        }

      } else {
        console.log('Invalid email domain');
        setErrorMessage(process.env.REACT_APP_ERROR_LOGIN_MSG);
      }
    };
  
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleLoginClick();
      }
    };
  
    return (
    <div className="Centered">
      <Stack orientation="vertical" spacing="space60">
        <Label htmlFor="email_address">Use your Twilio email address:</Label>
        <Input 
          aria-describedby="email_help_text" 
          id="email_address" 
          name="email_address" 
          type="email" 
          placeholder="example@twilio.com" 
          ref={emailInputRef} 
          onKeyDown={handleKeyDown}
          onChange={()=>{}} required
        />
        {errorMessage && (
          <Text as="p" color="colorTextError">
            {errorMessage}
          </Text>
        )}
        <Button variant="primary" onClick={handleLoginClick}>
          Login
        </Button>
      </Stack>
    </div>
    );
  };


  export default LoginComponent;