import React from "react";
import { useState } from 'react';
import {Stack} from '@twilio-paste/core/stack';
import {Input} from '@twilio-paste/core/input';
import {Label} from '@twilio-paste/core/label';
import {Button} from '@twilio-paste/core/button';
import { Text } from '@twilio-paste/core/text';

const OTPComponent = ({ email, otp, setOtp, setIsOtpVerified, setIsLoggedIn }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [otpMessage, setOtpMessage] = useState('');

  const handleOtpVerification = async () => {
    // Simulate OTP verification
    const response = await fetch(`/verifyVerifyOTP`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, code: otp }),
    });
    const result = await response.json();
    if (result.status === 'approved') {
      setIsOtpVerified(true);
      setIsLoggedIn(true);
    } else {
      setErrorMessage('Invalid OTP. Please try again.');
    }
  };

  const resendOTP = async () => {
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
        setOtpMessage('Resent OTP. Please check your inbox.');
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

  return (
    <div className="Centered">
      <Stack orientation="vertical" spacing="space60">
        <Label htmlFor="otp_input">Enter the OTP sent to your email:</Label>
        <Input
          aria-describedby="otp_help_text"
          id="otp_input"
          name="otp_input"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        {errorMessage && (
          <Text as="p" color="colorTextError">
            {errorMessage}
          </Text>
        )}
        {otpMessage && (
          <Text as="p" color="colorTextSuccess">
            {otpMessage}
          </Text>
        )}
        <Stack orientation="horizontal" spacing="space60">
          <Button variant="primary" onClick={handleOtpVerification}>
            Verify OTP
          </Button>
          <Button variant="secondary" onClick={resendOTP}>
            Resend OTP
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default OTPComponent;