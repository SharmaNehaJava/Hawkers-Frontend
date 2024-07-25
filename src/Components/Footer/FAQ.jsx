// src/components/FAQ.jsx

import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqData = [
  {
    question: "What is your shipping policy?",
    answer: "We offer free shipping on all orders over $50. Orders are typically processed within 2-3 business days and shipping times vary based on your location.",
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of purchase. Items must be in original condition with all tags attached. Please contact our customer service to initiate a return.",
  },
  {
    question: "How can I track my order?",
    answer: "Once your order has been shipped, you will receive an email with a tracking number. You can use this number to track your order on the carrier's website.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we do offer international shipping. Shipping rates and delivery times vary based on the destination country.",
  },
  {
    question: "Can I change or cancel my order?",
    answer: "If you need to change or cancel your order, please contact our customer service as soon as possible. Once the order has been processed, we may not be able to make changes.",
  },
];

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      {faqData.map((item, index) => (
        <div key={index} className="border-b border-gray-200 py-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(index)}>
            <h3 className="text-xl font-semibold">{item.question}</h3>
            <span>
              {expandedIndex === index ? <FaMinus /> : <FaPlus />}
            </span>
          </div>
          {expandedIndex === index && (
            <p className="mt-2 text-gray-600">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
