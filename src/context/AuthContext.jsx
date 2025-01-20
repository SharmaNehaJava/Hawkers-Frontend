import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    // console.log("AuthContext userInfo:", userInfo);
    if (userInfo && userInfo.token) {
      setIsLoggedIn(true);
      // console.log("AuthContext isLoggedIn set to true"); 
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    // console.log("AuthContext login called, isLoggedIn set to true");
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
    // console.log("AuthContext logout called, isLoggedIn set to false");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};