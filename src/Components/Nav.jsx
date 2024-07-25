import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/apiInstances';
import ProfileComponent from '../Components/ProfileDropdown'; // Make sure to import the new component
import '../CSS/Nav.css'; // You can remove this if it's unnecessary
import { motion } from 'framer-motion';

const Nav = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setIsLoggedIn(true);
      const storedUserInfo = JSON.parse(userInfo);
      setProfileImage(storedUserInfo.profileImage);
      setUser(storedUserInfo);
    }
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const search = () => {
    setHidden(!hidden);
  };

  const signOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userInfo');
  };

  return (
    <div className="px-2 py-1 flex justify-between items-center bg-white space-x-4 shadow-lg">
      <div className="flex items-center space-x-1">
        <img  src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/40C057/external-hawker-retail-outline-outline-black-m-oki-orlando.png" className='h-6' alt="external-hawker-retail-outline-outline-black-m-oki-orlando"/>
        <img src="./public/logo.png" className="h-6" alt="Logo" />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex border border-gray-300 rounded-full px-4 py-2 focus:outline-none mx-4">
          <img src="https://img.icons8.com/ios/50/40C057/marker--v1.png" alt="marker--v1 " className='h-6 m-1'/>
          <button className="text-gray-700 bg-white px-1">
            Select Location
          </button>
        </div>

        <Link to="/" className="text-gray-700 hover:text-green-600 ">Home</Link>

        <Link to="/" className="text-gray-700
         hover:text-green-600"> All Categories</Link>

        <Link to="/offers" className="text-gray-700 hover:text-green-600">Offers</Link>

        <Link to="/blog" className="text-gray-700 hover:text-green-600">Blog</Link>

        <Link to="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
      </div>

      <div className="flex items-center space-x-4">
        {!hidden && (
          <div className="flex items-center bg-white shadow-inner rounded-full">
            <input
              className="input rounded-full px-4 py-2 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300"
              placeholder="Search..."
              type="text"
            />
            <button onClick={search} className="h-8 w-8">
              <img src="https://img.icons8.com/ios/50/multiply.png" alt="Close" />
            </button>
          </div>
        )}

        {hidden && (
          <button onClick={search} className="bg-white p-2 rounded-full">
            <img className="h-8" src="https://img.icons8.com/ios/50/search--v1.png" alt="Search" />
          </button>
        )}

        {isLoggedIn ? (
          <div className="relative">
            <button className={`bg-white rounded-full p-2 ${window.location.pathname === '/profile' ? 'ring-2 ring-blue-500' : ''}`} onClick={toggleProfileDropdown}>
              {profileImage ? (
                <img className="h-8 w-8 rounded-full" src={profileImage} alt="User Profile" />
              ) : (
                <div className="h-8 w-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </button>
            {isProfileDropdownOpen && <ProfileComponent user={user} onLogout={signOut} />}
          </div>
        ) : (
          <Link to="/signin" className=" text-white rounded-full px-4 py-2 flex items-center" style={{background:"#00b106"}}>
            Sign In
          </Link>
        )}
        <button className="bg-white rounded-full p-2">
          <img className="h-8" src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="Cart" />
        </button>
      </div>
    </div>
  );
};

export default Nav;
