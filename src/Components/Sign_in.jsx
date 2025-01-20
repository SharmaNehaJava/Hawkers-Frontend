import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import instance from '../api/apiInstances';

const SignIn = () => {
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const isPhoneNumber = (identifier) => /^[0-9]{10}$/.test(identifier);
  const isEmail = (identifier) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

  // Check if user is already logged in when the component mounts
  useEffect(() => {
    console.log("SignIn isLoggedIn:", isLoggedIn);
    if (isLoggedIn) {
      // If user info exists in localStorage, consider them logged in
      navigate('/'); // Redirect to home page or dashboard
    }
  }, [navigate, isLoggedIn]);

  const handleSendOtp = useCallback(async () => {
    setIsLoading(true);
    try {
      const method = isPhoneNumber(identifier)
        ? 'sms'
        : isEmail(identifier)
        ? 'email'
        : '';

      if (!method) {
        alert('Please enter a valid phone number or email address.');
        setIsLoading(false);
        return;
      }
      console.log("Method "+ method);
      const response = await instance.post('/api/users/request-otp', {
        identifier,
        method,
        actionType: 'signin', // Specify action type as 'signin'
      });

      if (!response.data.userExists) {
        alert('Create an account first');
        navigate('/signup');
        return;
      }

      setStep(2); // Move to the OTP input step
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [identifier, navigate]);

  const handleVerifyOtp = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("Identifier "+ identifier);
      const { data } = await instance.post('/api/users/verify-otp', {
        identifier,
        otp,
        actionType: 'signin', 
        method: 'sms' 
      });
      if (data.verified) {
        console.log("Token" +data.token);
        // Store token and user info in localStorage for persistent login
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ moblie: identifier, token: data.token }) // Assuming backend sends a token
        );
        alert('OTP verified. You are now logged in.');
        login();
        navigate('/'); // Redirect after login
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [identifier, otp, navigate, login]);

  return (
    <div className="inset-0 h-screen flex items-center justify-center bg-gray-400 bg-opacity-50 z-50">
      <div className="h-1/2 relative bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <button
          className="w-6 bg-red-500 rounded-full absolute top-2 right-2 text-white hover:text-gray-900"
          onClick={() => navigate('/')}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4 border-b-2">
          {step === 1 ? 'Sign In' : 'Verify OTP'}
        </h2>

        {step === 1 ? (
          <>
            <div className="mb-4">
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                type="text"
                id="identifier"
                value={identifier}
                placeholder="Phone Number / Email ID"
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="button"
                className="bg-green-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-green-400"
                onClick={handleSendOtp}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Continue'}
              </button>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Don't have an account?{' '}
                <span onClick={() => navigate('/signup')} className="text-blue-700 cursor-pointer">
                  Create Account
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                Enter OTP
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="button"
                className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                onClick={handleVerifyOtp}
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify & Log In'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(SignIn);
