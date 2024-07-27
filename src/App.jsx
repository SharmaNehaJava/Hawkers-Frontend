// src/App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav';
import MapComponent from './Components/Map';
import Sign_in from './Components/Sign_in';
import Sign_up from './Components/Sign_up';
import UserProfile from './Components/Profile/UserProfile';
import Footer2 from './Components/Footer/Footer2';
import WhoWeAre from './Components/Footer/WhoWeAre';
import 'flowbite/dist/flowbite.css';
import Blog from "./Components/Footer/Blog"
import Contact from "./Components/Footer/Contact"
import FAQ from "./Components/Footer/FAQ"

import Categories from "./Components/ExploreMenu/Categories"

function App() {
  return (
    <>
      <Nav />
      <Routes>
      <Route path="/signin" element={<Sign_in />} />
        <Route path="/signup" element={<Sign_up />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/" element={<Home />} />
      </Routes>
      
      {/* <WhoWeAre/>
      <Blog/>
      <FAQ/>
      <GetInTouch/> */}
      <Categories/>
      <Footer2 />
    </>
  );
}

const Home = () => (
  <MapComponent/>
);

export default App;
