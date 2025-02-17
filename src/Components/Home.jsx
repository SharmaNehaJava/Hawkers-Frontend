// src/Components/Home.jsx
import React, { useEffect, useState } from 'react';
import Product from "./Product.jsx"
import Map from "./Map.jsx";

// Import all the images for the carousel
import image1 from '/bananas.jpg';
import image2 from '/Bread_hawker.jpg';
import image3 from '/clothes.png';
import image4 from '/fruits.jpg';
import image5 from '/vegetable.jpg';
import image6 from '/golgappe.jpg';



// Carousel component
const Carousel = () => {
  const images = [image1, image2, image3, image4, image5, image6]; // Array of images
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current image index

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Move to the next image every few seconds
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length]);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      <div className="relative w-full h-full">
        <img
          src={images[currentIndex]}
          alt={`Carousel Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50 ">
          <h1 className="text-6xl md:text-5xl font-bold mb-2 shadow-2xl blur-3xl">
            HAW<span className='text-green-700 '>KERS</span>
          </h1>
          <p className="text-xl md:text-2xl">
            Enjoy delicious meals from various vendors near you!
          </p>
        </div>
      </div>
    </div>
  );
};

const Home = ({ category, setCategory }) => {

  return (
    <>
      <div className="home-container">
          <Carousel />
          <Map/>
          <Product category={category} setCategory={setCategory}/>
      </div>
    </>
  );
};

export default Home;
