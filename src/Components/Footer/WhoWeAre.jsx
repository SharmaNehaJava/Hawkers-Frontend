import React from 'react';
import { motion } from 'framer-motion';

const WhoWeAre = () => {
  // Define the animation variants for the reel effect and underline
  const reelVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0 },
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: '100%' },
  };

  return (
    <div className="relative bg-gray-200 h-auto">
      {/* First Section: Our Mission & Story */}
      <div className="relative bg-gray-200 p-10 h-auto">
        <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
          <div className="relative w-full h-full">
            <div className="absolute top-10 left-10 w-24 h-24 bg-green-400 opacity-40 rounded-full"></div>
            <div className="absolute bottom-10 right-20 w-32 h-32 bg-green-600 opacity-50 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-green-700 opacity-30 rounded-full"></div>
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-green-700 opacity-30 rounded-full"></div>
            <div className="absolute top-20 left-3/4 w-24 h-24 bg-green-400 opacity-40 rounded-full"></div>
          </div>
        </div>
        <div className="container mx-auto px-4 md:flex items-center relative z-2">
          <motion.img
            className="md:w-1/2 max-w-md mx-auto transition-transform transform hover:scale-105 m-2 rounded-full "
            src="3.png" // Update this with the correct image path
            alt="Decorative"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <motion.div
            className="m-2 md:mt-0 md:ml-10 text-center md:text-left bg-white rounded-md p-6 border-2 border-green-600 shadow-lg"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 leading-tight mb-2">
              About Us
            </h2>
            <span className="block text-sm md:text-md mb-2 text-green-600 font-semibold">
              (An online platform to provide your daily needs with an Indian touch)
            </span>
            <p className="text-lg text-gray-800 mb-6 text-justify">
              Launched in 2024, our platform connects customers with local street vendors,
              serving their diverse needs. Customers use our platform to discover vendors,
              read and write reviews, view and upload photos, order deliveries, and make
              payments for pick-ups.
            </p>
            <p className="text-lg text-gray-800 text-justify">
              We provide vendors with marketing tools to grow their businesses and offer
              reliable delivery services.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Second Section: Glimpses of Life at Hawkers */}
      <div className="p-2 flex bg-white justify-center items-center h-screen">

      <div className="flex-1 px-6 py-4 m-8 text-justify text-gray-800 border-2 border-green-500 bg-gray-200">
          <motion.h2
            className="text-2xl font-bold p-4 m-4 border-b-2 border-green-500 inline-block text-yellow-500 text-center justify-center"
            initial="hidden"
            animate="visible"
            variants={underlineVariants}
            transition={{ duration: 2 }}
          >
            Glimpses of Life at <span className='text-gray-700 uppercase text-4xl'>Haw
              <span className='text-green-600'>Kers</span></span>
          </motion.h2>
          <p className="text-lg text-gray-800 mb-6 text-justify">
            At Hawker, we believe in creating a future-oriented workplace where innovation
            and work-life balance go hand in hand. Our team thrives in an environment that
            fosters creativity, collaboration, and growth, ensuring that every member can
            contribute to our mission of connecting communities with local vendors.</p>

            <p className='text-lg text-gray-800 mb-6 text-justify'>With
            a vision to achieve milestones akin to industry giants like FANG, we are committed
            to building a company that not only excels in business but also enriches the lives
            of our employees. Join us and be a part of a journey towards excellence and a
            billion-dollar turnover, while enjoying a fulfilling and balanced work life.
          </p>
        </div>
        
        <div className="relative flex-1 overflow-hidden h-1/2 justify-center items-center p-2">
          <div className="absolute flex">
            <motion.div
              className="flex"
              initial={{ x: 0 }}
              animate={{ x: ['0%', '-100%'] }}
              transition={{
                x: {
                  duration: 20,
                  ease: [0.1, 0.1, 0.2, 1], // Fast start and slow down
                  repeat: Infinity,
                  repeatType: 'loop',
                },
              }}
              style={{ width: '200%' }} // Ensures enough space for seamless scrolling
            >
              {/* Images */}
              <div className="flex">
                <img className="w-full h-80 object-cover" src="/company1.avif" alt="Company Life 1" />
                <img className="w-full h-80 object-cover" src="/company2.avif" alt="Company Life 2" />
                <img className="w-full h-80 object-cover" src="/company6.jpg" alt="Company Life 3" />
                <img className="w-full h-80 object-cover" src="/company3.jpg" alt="Company Life 4" />
                <img className="w-full h-80 object-cover" src="/company4.jpg" alt="Company Life 5" />
                {/* Duplicate images for seamless loop */}
                <img className="w-full h-80 object-cover" src="/company1.avif" alt="Company Life 1" />
                <img className="w-full h-80 object-cover" src="/company2.avif" alt="Company Life 2" />
                <img className="w-full h-80 object-cover" src="/company6.jpg" alt="Company Life 3" />
                <img className="w-full h-80 object-cover" src="/company3.jpg" alt="Company Life 4" />
                <img className="w-full h-80 object-cover" src="/company4.jpg" alt="Company Life 5" />
              </div>
            </motion.div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default WhoWeAre;
