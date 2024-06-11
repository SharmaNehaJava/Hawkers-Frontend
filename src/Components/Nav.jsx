import React, { useState } from 'react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [manualLocation, setManualLocation] = useState('');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const detectLocation = () => {
    // Dummy detection logic. Replace with actual geolocation logic if needed.
    setManualLocation('Detected Location');
  };

  const saveLocation = () => {
    setLocation(manualLocation ? manualLocation : 'Detected Location');
    setIsDropdownOpen(false);
  };

  const[hidden, setHidden] = useState(true);
  const search= ()=>{
    setHidden(!hidden);
  }

  return (
    <div className="p-2 flex justify-between items-center bg-yellow-400 space-x-4">
      <div className='flex'>
      <div>
        <span className="text-white font-bold text-lg ml-2">Hawkers</span>
      </div>

      <div className=" flex flex-col items-center text-center relative ml-2">
        <div className="font-bold text-slate-800 text-xl">Locate nearby Hawkers</div>
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">{location || 'No location selected'}</span>
          <button onClick={toggleDropdown} className="focus:outline-none">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        {isDropdownOpen && (
          <div className="absolute top-full mt-2 w-64 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-10">
            <input
              type="text"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              placeholder="Type your location here"
              className="w-full p-2 mb-2 rounded border border-gray-300"
            />
            <button
              onClick={detectLocation}
              className="w-full p-2 bg-blue-700 text-white rounded mb-2 hover:bg-blue-600 transition duration-500 "
            >
              Detect My Current Location
            </button>
            <button
              onClick={saveLocation}
              className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-600 transition duration-500"
            >
              Save Location
            </button>
          </div>
        )}
      </div>
      </div>
      {!hidden && (
      <div className='bg-white flex p-1 w-2/4 '>
         <img
            className="h-8 cursor-pointer m-auto"
            src="https://img.icons8.com/ios/50/search--v1.png"
            alt="search"
            />
        <input
          type="text"
          placeholder="Search Your Item Here"
          className="w-full p-2 rounded border border-gray-300 "
        />
            <img onClick={search} className='h-8 m-auto' src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
        </div>
      )}
      <div className='flex '>
        
          {hidden && (
            <div className='bg-white p-2 rounded-full mr-2 flex-end'>
            <img
            onClick={search}
            className="h-8 cursor-pointer"
            src="https://img.icons8.com/ios/50/search--v1.png"
            alt="search"
            />
            </div>
          )}
          <button className="mr-2 hover:bg-green-600 p-1  bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-500 cursor-pointer">Sign in</button>

          <div className="bg-white rounded-full p-2 ">
              <img className='h-8' src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="shopping-cart--v1"/>
          </div>
        
      </div>
    </div>
  );
};

export default Navbar;
