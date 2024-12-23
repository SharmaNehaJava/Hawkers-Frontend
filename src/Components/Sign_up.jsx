import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import instance from '../api/apiInstances';

const SignUp = () => {
  const {login} = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpFieldVisible, setOtpFieldVisible] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  const handleSendOtp = useCallback(async (field) => {
    setIsLoading(true);
    try {
      const response = await instance.post('/api/users/request-otp', { 
        identifier: field === 'email' ? email : mobile, 
        method: field === 'email' ? 'email' : 'sms',
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
  }, [email, mobile]);
  

  const handleVerifyOtp = useCallback(async (field) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post('/api/users/verify-otp', { identifier: field === 'email' ? email : mobile, otp });
      if (data.verified) {
        field === 'email' ? setEmailVerified(true) : setMobileVerified(true);
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
  }, [email, mobile, otp]);

  const handleSignUp = useCallback(async (e) => {
    e.preventDefault();
    if (!emailVerified && !mobileVerified) {
      alert('Please verify at least one contact detail (Email or Mobile).');
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post('/api/users/register', {
        name,
        email,
        mobile,
        dob,
        gender
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      alert('Registration successful! Redirecting to homepage...');
      login();
      navigate('/'); 
    } catch (error) {
      console.error('Error registering:', error);
      alert('Error registering user');
    }
  }, [name, email, mobile, dob, gender, emailVerified,login, mobileVerified, navigate]);

  useEffect(() => {
    if (otpSent && resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [otpSent, resendTimer]);

  return (
    <div className="flex items-center justify-center bg-gray-400 bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-screen max-w-md p-8 m-2">
        <button
          className="w-6 bg-red-500 rounded-full absolute top-2 right-2 text-white hover:text-gray-900"
          onClick={() => navigate('/')}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4 border-b-2">Create Your Account</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={!mobile}
            />
            {email && !emailVerified && (
              <div className="mt-2">
                <button
                  type="button"
                  className="bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-400"
                  onClick={() => handleSendOtp('email')}
                  disabled={isLoading || resendTimer > 0}
                >
                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Send OTP'}
                </button>
              </div>
            )}
            {emailVerified && <p className="text-green-500 text-xs">Email Verified</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
              Mobile
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required={!email} // Either email or mobile is required
            />
            {mobile && !mobileVerified && (
              <div className="mt-2">
                <button
                  type="button"
                  className="bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-400"
                  onClick={() => handleSendOtp('mobile')}
                  disabled={isLoading || resendTimer > 0}
                >
                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Send OTP'}
                </button>
              </div>
            )}
            {mobileVerified && <p className="text-green-500 text-xs">Mobile Verified</p>}
          </div>
          {otpFieldVisible && (
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
              />
              <div className="mt-2">
                <button
                  type="button"
                  className="bg-green-500 text-white font-bold py-1 px-3 rounded hover:bg-green-400"
                  onClick={() => handleVerifyOtp(email ? 'email' : 'mobile')}
                  disabled={isLoading}
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
              Date of Birth
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
              type="date"
              id="dob"
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
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-400 w-full"
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
