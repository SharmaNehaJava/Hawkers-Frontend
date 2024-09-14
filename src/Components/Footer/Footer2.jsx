import React from 'react';
import { Link } from 'react-router-dom';
// import { Container, Typography } from '@mui/material';

const Footer = () => {
  return (
  
<footer className="bg-black border-t-2 border-red-400  bottom-0">
<div class="text-white p-4 lg:flex">

    <div className='m-auto'>
        <div class="m-auto px-auto">
          <div className="flex items-center
          mx-auto space-x-1 ">
            <img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/40C057/external-hawker-retail-outline-outline-black-m-oki-orlando.png"  alt="external-hawker-retail-outline-outline-black-m-oki-orlando"/>
            <img src="./public/BlackLogo.png" className="h-xl" alt="Logo" />
          </div>
          <p className="text-center">From Street to Screen, Hawkers Bridges the Gap</p>
        </div>

        <div class="mt-2">
          <a href="link_to_app" class="text-green-600 underline">Get the App</a>
        </div>
    </div>
  
  <div className='m-auto sm:flex'>
    <div className="flex">
    <div className="mt-2 p-4">
    <h2 class="text-lg font-semibold mb-2">MY ACCOUNT</h2>
    <ul>
      <li><a href="my_profile_link" className="hover:text-green-600 font-light text-sm">My Profile</a></li>
      <li><a href="order_history_link" className="hover:text-green-600 font-light text-sm">Order History</a></li>
      <li><a href="shopping_cart_link" className="hover:text-green-600 font-light text-sm">Shopping Cart</a></li>
    </ul>
  </div>

  <div className="mt-2 p-4">
    <h2 class="text-lg font-semibold ">INFORMATION</h2>
    <ul>
    <li ><Link to="/who-we-are" class="hover:text-green-600 font-light text-sm">About us</Link></li>
      <li><Link to="/contact-us" class="hover:text-green-600 font-light text-sm">Contact</Link></li>
      <li><Link to="/faq" class="hover:text-green-600 font-light text-sm">FAQs</Link></li>
      <li><Link to="/terms-and-condition" class="hover:text-green-600 font-light text-sm">Terms & Conditions</Link></li>
      <li><Link to="/privacy-policy" class="hover:text-green-600 font-light text-sm">Privacy Policy</Link></li>
      <li><Link to="/return-policy" class="hover:text-green-600 font-light text-sm">Return Policy</Link></li>
    </ul>
  </div>
    </div>
 
 <div className="flex m-auto">
 <div className="mt-2 p-4">
    <h2 class="text-lg font-semibold ">CATEGORIES</h2>
    <ul>
      <li><a href="deal_of_day_link" class="hover:text-green-600 font-light text-sm">Deal of the Day</a></li>
      <li><a href="fruits_link" class="hover:text-green-600 font-light text-sm">Fruits</a></li>
      <li><a href="veggies_link" class="hover:text-green-600 font-light text-sm">Veggies</a></li>
      <li><a href="snacks_link" class="hover:text-green-600 font-light text-sm">Snacks</a></li>
      <li><a href="sweets_link" class="hover:text-green-600 font-light text-sm">Sweets</a></li>
      <li><a href="dairy_link" class="hover:text-green-600 font-light text-sm">Dairy</a></li>
      <li><a href="services_link" class="hover:text-green-600 font-light text-sm">Services</a></li>
    </ul>
  </div>

  <div className='mt-2 p-4'>
    <h2 class="text-lg font-semibold ">CONTACT US</h2>
    <p className='font-light text-sm'>Phone: <a href="tel:phone_number" class="text-green-600 ">9356928367</a></p>
    <p className='font-light text-sm'>Email: <a href="mailto:email_address" className="text-green-600 ">email_address</a></p>
    <p className='font-light text-sm'>Timings: Open 24*7</p>
    <p className='font-light text-sm'>Address: Dwarika, New Delhi-43 </p>
  </div>
 </div>

 

  </div>
</div>


  <div className='flex  border-t-2 border-gray-700 w-full p-1'>
    <p className=" text-xs text-gray-500 m-auto">
    &copy; 2024. Hawkers. All rights reserved.
    </p>

    <ul className="flex flex-wrap gap-4 text-xs m-auto p-1">
          <li>
            <a href="#" className="text-gray-500 transition hover:opacity-75"> Terms & Conditions </a>
          </li>

          <li>
            <a href="#" className="text-gray-500 transition hover:opacity-75"> Privacy Policy </a>
          </li>

          <li>
            <a href="#" className="text-gray-500 transition hover:opacity-75"> Cookies </a>
          </li>
        </ul>


  </div>
</footer>
  );
};

export default Footer;
