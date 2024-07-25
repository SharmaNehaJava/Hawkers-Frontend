import React from 'react';
import { motion } from 'framer-motion';

"use client";
import { Carousel } from "flowbite-react";

const WhoWeAre = () => {
  return (
    <div className="relative h-screen">
      <div className="h-1/2 bg-yellow-100 flex justify-between p-2">
        {/* <div>
          <div className="flex items-center">
            <span className="bg-white rounded-full w-14">
              <img src="./public/Dark.png" alt="Logo" />
            </span>
            <div className="space-x-4 my-auto p-2 font-medium flex">
              <a
                href="/"
                 className="text-black hover:underline text-gray-700 font-bold"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-black hover:underline text-gray-700 font-bold"
              >
                About
              </a>
              <a
                href="/work-with-us"
                className="text-black hover:underline text-gray-700 font-bold"
              >
                Work with Us
              </a>
            </div>
          </div>
        </div> */}
      </div>

      <div className="h-1/2 bg-white">
      
      </div>

      {/* Image and Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Image */}
        <div className="relative mt-8">
          <img
            className="relative h-60 w-auto transition-transform transform hover:scale-105"
            src="./public/3.png"
            alt="Decorative"
          />
        </div>
  
        <motion.div
          className="text-center mt-8 mx-16"
          initial={{ y: 250 }}
          animate={{ y: -5 }}
          transition={{ type: 'spring', delay: 0.5 }}
        >
           <div className="mt-2 lg:mt-0">
                <span className="block mb-4 text-lg font-semibold text-primary">
                Who We Are
                </span>
                <h2 className="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px] pt-2">
                  Hawkers (an online platform to provide what you need with an indian touch)
                </h2>
                <p className="mb-5 text-base text-body-color dark:text-dark-6">
                 
            Launched in 2024, our platform connects customers with local street vendors,
            serving their diverse needs. Customers use our platform to discover vendors,
            read and write reviews, view and upload photos, order deliveries, and make
            payments for pick-ups.
                </p>
                <p className="mb-8 text-base text-body-color dark:text-dark-6">
                We provide vendors with marketing tools to grow their
                businesses and offer reliable delivery services.
                </p>
                <a
                  href="javascript:void(0)"
                  className="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90"
                >
                  Get Started
                </a>
              </div>
        </motion.div>
      </div>
      <div className="p-4 text-center text-white "  style={{ backgroundColor: '#096E66' }}  >
        <h2 className="text-2xl font-bold p-4 m-4 border-b-2 border-red-400 shadow-md inline-block">Glimpses of life at Hawkers</h2>
        
        <div class="flex m-4 " >
          <div className=" h-96 mx-8 shadow-lg w-1/2" >
            <Carousel className='bg-black rounded-2xl'>
               <img class="h-auto max-w-full rounded-lg " src=".\public\company1.avif" alt=""/>
                <img class="h-auto max-w-full rounded-lg" src=".\public\company2.avif" alt=""/>
                <img class="h-auto max-w-full rounded-lg" src=".\public\company6.jpg" alt=""/>
                <img class="h-auto max-w-full round/ed-lg" src=".\public\company3.jpg" alt=""/>
                <img class="h-auto max-w-full rounded-lg" src=".\public\company4.jpg" alt=""/>
            </Carousel>
          </div>
          <div className='container w-1/2 my-auto'
          >
          <p className=''>At Hawker, we believe in creating a future-oriented workplace where innovation and work-life balance go hand in hand. Our team thrives in an environment that fosters creativity, collaboration, and growth, ensuring that every member can contribute to our mission of connecting communities with local vendors. With a vision to achieve milestones akin to industry giants like FANG, we are committed to building a company that not only excels in business but also enriches the lives of our employees. Join us and be a part of a journey towards excellence and a billion-dollar turnover, while enjoying a fulfilling and balanced work life.</p>
          
          </div>
        </div>
      </div>
  </div>
  );
};

export default WhoWeAre;
