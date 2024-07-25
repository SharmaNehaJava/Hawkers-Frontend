import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/apiInstances.js'; 
import GoogleLoginComponent from '../Components/GoogleLoginComponent'; 

const Sign_in = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post('/api/users/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/'); // Navigate to home or user dashboard
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error logging in:', error.response.data);
        alert(`Login failed: ${error.response.data.message || 'Please check your credentials and try again.'}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response from server:', error.request);
        alert('Login failed: No response from server. Please try again later.');
      } else {
        // Something else happened while setting up the request
        console.error('Error:', error.message);
        alert(`Login failed: ${error.message}`);
      }
    }
  };

  const openSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 "
          onClick={() => navigate('/')}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Welcome Back!</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#" className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2 block">
              Forgot Password?
            </a>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
              onClick={ handleSignIn}
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mb-4">
          <p className="text-xs text-gray-500">or sign in with</p>
          <GoogleLoginComponent /> 
        </div> 
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Don't have an account yet?{' '}
            <span onClick={openSignUp} className="text-blue-700 cursor-pointer">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sign_in;
