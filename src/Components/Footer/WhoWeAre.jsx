import React from 'react';
import { motion } from 'framer-motion';

const WhoWeAre = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-200 via-blue-100 to-white p-10">
      {/* First Section: About Us with GIF */}
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <motion.img
          className="w-60 lg:w-1/2 rounded-md "
          src="3.png" // Replace with your actual GIF
          alt="Who We Are"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <motion.div
          className="p-6 lg:p-10 bg-white rounded-lg shadow-xl border-2 border-orange-500 text-center lg:text-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-4xl font-extrabold text-orange-500">Who We Are</h1>
          <p className="text-lg text-gray-700 mt-4">
            Hawkers connects local vendors with customers seeking fresh, authentic, and locally sourced products. We empower small businesses and bring the essence of street markets online.
          </p>
        </motion.div>
      </div>

      {/* Our Mission & Values */}
      <div className="grid md:grid-cols-2 gap-10 my-16">
        <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-orange-500 text-center">
          <h2 className="text-2xl font-semibold text-orange-500">Our Mission</h2>
          <p className="text-gray-700 mt-2">
            To create a seamless experience where local hawkers and street vendors can showcase their offerings, and customers can access fresh, affordable, and authentic products at their convenience.
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-orange-500 text-center">
          <h2 className="text-2xl font-semibold text-orange-500">Our Values</h2>
          <p className="text-gray-700 mt-2">
            We stand for <strong>Trust, Quality, Local Empowerment, and Freshness</strong>. Every vendor is verified to ensure authenticity, and every product meets our quality standards.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="h-2/4 text-center max-w-5xl mx-auto">
        <h2 className="text-2xl mt-16 font-semibold text-orange-500 mb-4">Why Choose Us?</h2>
        <p className="text-lg text-gray-700">
          We bring you the vibrant culture of local markets in a modern digital format. Support local businesses, enjoy fresh products, and embrace a community-driven shopping experience.
        </p>


        {/* Motion Carousel at the End */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mt-12">
          <motion.div
            className="p-12 bg-gradient-to-r from-green-200 to-blue-100 rounded-lg text-center shadow-lg border-2 border-orange-500"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold text-orange-500 mb-4">Life at Hawker</h2>
            <p>
              We foster innovation, collaboration, and growth, ensuring a vibrant workplace where creativity thrives.
            </p>
          </motion.div>
          <motion.div className="relative w-full lg:w-1/2 overflow-hidden border-2 border-orange-500 rounded-lg">
            <motion.div
              className="flex"
              initial={{ x: 0 }}
              animate={{ x: ['0%', '-100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <img className="w-60 h-50 object-cover m-2" src="/company1.avif" alt="Life 1" />
              <img className="w-60 h-50 object-cover m-2" src="/company2.avif" alt="Life 2" />
              <img className="w-60 h-50 object-cover m-2" src="/company3.jpg" alt="Life 3" />
              <img className="w-60 h-50 object-cover m-2" src="/company4.jpg" alt="Life 4" />
              <img className="w-60 h-50 object-cover m-2" src="/company6.jpg" alt="Life 5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
