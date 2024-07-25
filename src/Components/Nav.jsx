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
    <div className="p-1 flex justify-between items-center bg-white space-x-4 bg-yellow-200">
      <div className="flex bg-white rounded-full ">
        <span className="text-yellow-500 w-14">
          <img src="./public/Dark.png" alt="Logo" />
        </span>
      </div>

      {!hidden && (
        <div className="flex m-1 shadow-inner">
          <input
            className="input rounded-full px-20 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md  mb-1"
            placeholder="Search..."
            required=""
            type="text"
          />
          <img onClick={search} className="h-8 m-auto" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply" />
        </div>
      )}

      <div className="flex">
        {hidden && (
          <div className="bg-white p-2 rounded-full mr-2 flex-end">
            <img
              onClick={search}
              className="h-8 cursor-pointer"
              src="https://img.icons8.com/ios/50/search--v1.png"
              alt="search"
            />
          </div>
        )}

        
        {isLoggedIn ? (
          <div className="relative">
            <div className={`bg-white rounded-full p-2 cursor-pointer ${window.location.pathname === '/profile' ? 'ring-2 ring-blue-500' : ''}`} onClick={toggleProfileDropdown}>
              {profileImage ? (
                <img className="h-8 cursor-pointer rounded-full" src={profileImage} alt="User Profile" />
              ) : (
                <div className="h-8 w-8 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {isProfileDropdownOpen && <ProfileComponent user={user} onLogout={signOut} />}
          </div>
        ) : (
          <Link to="/signin" className=" bg-yellow-500 text-white  rounded-full px-4 flex items-center"
          >
            Sign In
          </Link>
        )}
        <div className="bg-white rounded-full p-2 ">
          <img className="h-8" src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="shopping-cart" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
