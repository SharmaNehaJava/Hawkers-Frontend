import React from 'react';
import { motion } from 'framer-motion';
import { Carousel } from 'flowbite-react';

const WhoWeAre = () => {
  return (
    <div className="relative bg-white  lg:pt-14">
      {/* Header Section */}
      <div className="container mx-auto px-4 md:flex items-center justify-between">
        <motion.img
          className="w-full md:w-1/2 max-w-md mx-auto transition-transform transform hover:scale-105"
          src="3.png" // Update this with the correct image path
          alt="Decorative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <motion.div
          className="mt-8 md:mt-0 md:ml-10 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 leading-tight mb-6" style={{}}>
            Hawkers
            <span className="block text-2xl md:text-3xl text-primary mt-2">
              (An online platform to provide what you need with an Indian touch)
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Launched in 2024, our platform connects customers with local street vendors,
            serving their diverse needs. Customers use our platform to discover vendors,
            read and write reviews, view and upload photos, order deliveries, and make
            payments for pick-ups.
          </p>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            We provide vendors with marketing tools to grow their
            businesses and offer reliable delivery services.
          </p>
        </motion.div>
      </div>

      {/* Glimpses Section */}
      <div className="p-4 text-center text-white "  style={{ backgroundColor: '#096E66' }}  >
        <h2 className="text-2xl font-bold p-4 m-4 border-b-2 border-red-400 shadow-md inline-block">Glimpses of life at Hawkers</h2>
        
        <div class="lg:flex m-4 " >
          <div className=" h-96 mx-8 rounded-lg lg:w-1/2 p-2" >
            <Carousel className='bg-black rounded-2xl'>
               <img class="h-auto max-w-full rounded-lg " src=".\public\company1.avif" alt=""/>
                <img class="h-auto max-w-full rounded-lg" src=".\public\company2.avif" alt=""/>
                <img class="h-auto max-w-full rounded-lg" src=".\public\company6.jpg" alt=""/>
                <img class="h-auto max-w-full round/ed-lg" src=".\public\company3.jpg" alt=""/>
                <img class="h-auto max-w-full rounded-lg" src=".\public\company4.jpg" alt=""/>
            </Carousel>
          </div>
          <div className='container lg:w-1/2 my-auto p-2 text-justify'
          >
          <p className=''>At Hawker, we believe in creating a future-oriented workplace where innovation and work-life balance go hand in hand. Our team thrives in an environment that fosters creativity, collaboration, and growth, ensuring that every member can contribute to our mission of connecting communities with local vendors. With a vision to achieve milestones akin to industry giants like FANG, we are committed to building a company that not only excels in business but also enriches the lives of our employees. Join us and be a part of a journey towards excellence and a billion-dollar turnover, while enjoying a fulfilling and balanced work life.</p>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
