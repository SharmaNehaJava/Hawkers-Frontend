
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginComponent = ({ onLoginSuccess }) => {
  const clientId = '85478123981-movailm7ao3v4gnli8rpg2jcvlcva2ru.apps.googleusercontent.com'; // Replace with your actual client ID

  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    // Extract user info from the response
    const { profileObj } = response;
    // Call the parent component's onLoginSuccess handler
    onLoginSuccess(profileObj);
  };

  const handleError = (error) => {
    console.log('Login Failed:', error);
    // Handle login failure here
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
