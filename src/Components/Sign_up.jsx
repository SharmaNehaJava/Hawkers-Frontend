import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import instance from '../api/apiInstances';

const SignUp = () => {
  const { login, isLoggedIn } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [mobileVerified, setMobileVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpFieldVisible, setOtpFieldVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  const handleSendOtp = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await instance.post('/api/users/request-otp', { 
        identifier: mobile, 
        method: 'sms',
        actionType: 'signup' // Specify action type as 'signup'
      });
  
      if (response.data.userExists) {
        alert('User already exists. Please sign in instead.');
        return;
      }
  
      alert('OTP sent successfully!');
      setOtpSent(true);
      setOtpFieldVisible(true);
      setResendTimer(60); // Set timer to 60 seconds
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [mobile]);

  const handleVerifyOtp = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await instance.post('/api/users/verify-otp', { identifier: mobile, otp,
        actionType: 'signup',  method: 'sms' });
      if (data.verified) {
        setMobileVerified(true);
        alert('OTP verified successfully!');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
      setOtpFieldVisible(false);
      setOtpSent(false);
    }
  }, [mobile, otp]);

  const handleSignUp = useCallback(async (e) => {
    e.preventDefault();
    if (!mobileVerified) {
      alert('Please verify your mobile number first.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await instance.post('/api/users/register', { name, email, mobile, dob, gender });
      console.log("Token: " + response.data.token);
      // Store token and user info in localStorage for persistent login
      localStorage.setItem(
        'userInfo',
        JSON.stringify({ mobile, token: response.data.token })
      );
      alert('Account created successfully. You are now logged in.');
      login();
      navigate('/');
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [name, email, mobile, dob, gender, mobileVerified, login, navigate]);

  useEffect(() => {
    if (otpSent && resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [otpSent, resendTimer]);

  const handleClose = () => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate('/signin');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-12 bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          className="w-6 h-6 bg-red-500 rounded-full absolute top-2 right-2 text-white hover:text-gray-900 flex items-center justify-center"
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
              Mobile
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              id="mobile"
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              required
            />
            <button type="button" onClick={handleSendOtp} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </div>
          {otpFieldVisible && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
                Enter OTP
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              <button type="button" onClick={handleVerifyOtp} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">
                {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
              </button>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
              Date of Birth
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;