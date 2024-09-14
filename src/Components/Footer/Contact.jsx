import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState(''); // Add feedback state

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_ts5n3cb',   // Your EmailJS service ID
      'template_55t2iqu',  // Your EmailJS template ID
      form.current,        // Ref to the form
      'qdgBpQ03BdgkkVs43'  // Your EmailJS public key (user ID)
    )
    .then((result) => {
      setName('');
      setEmail('');
      setMessage('');
      setFeedback('Message Sent Successfully!');  // Success feedback
    }, (error) => {
      setFeedback('Failed to send message. Please try again later.');  // Failure feedback
      console.log(error.text);
    });
  };

  return (
    <>
      <section className="relative z-2 overflow-hidden bg-gradient-to-r bg-gray-100 dark:from-dark dark:via-dark-3 dark:to-dark lg:py-[80px]">
        <div className="container mx-auto p-2">
          <span className="block text-4xl font-extrabold text-green-600 text-center p-2">
            Contact Us
          </span>
          <div className="flex flex-col lg:flex-row lg:justify-between items-center bg-gray-200 mx-4 p-4">
            <div className="w-full lg:w-1/2 xl:w-5/12 mb-12 lg:mb-0 px-4">
              <h6 className="text-xl font-semibold text-dark dark:text-white mb-4">
                We're Here to Help
              </h6>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Whether you have a question, need assistance, or just want to share feedback, fill out the form below and we'll get back to you promptly. Your satisfaction is our priority.
              </p>
              {/* Contact Info */}
              <div className="flex mb-6 items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 12V5C20 3.89543 19.1046 3 18 3H6C4.89543 3 4 3.89543 4 5V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-dark dark:text-white">Visit Us</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">E-493 Dwarika, New Delhi 110043. India</p>
                </div>
              </div>

              <div className="flex mb-6 items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 2L21 7L7 21L2 21L2 16L16 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-dark dark:text-white">Call Us</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">(+91) 81 414 257 9980</p>
                </div>
              </div>

              <div className="flex mb-6 items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 3H3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20V4C22 3.44772 21.5523 3 21 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 7L12 13L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-dark dark:text-white">Email Us</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">support@example.com</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 xl:w-5/12 px-4">
              <form ref={form} onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-dark dark:text-white mb-2" htmlFor="name">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="from_name"  // This should match the template's field
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full px-4 py-2 text-sm text-dark bg-white dark:bg-dark-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                    required 
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-dark dark:text-white mb-2" htmlFor="email">
                    Your Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="from_email"  // This should match the template's field
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full px-4 py-2 text-sm text-dark bg-white dark:bg-dark-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                    required 
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-dark dark:text-white mb-2" htmlFor="message">
                    Your Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message"  // This should match the template's field
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    className="w-full px-4 py-2 text-sm text-dark bg-white dark:bg-dark-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                    required 
                  />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500">
                  Send Message
                </button>
              </form>
              {feedback && <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">{feedback}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
