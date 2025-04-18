import React, { useState } from 'react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'How does the leftover food delivery work?',
    answer: 'Restaurants list their surplus food on our platform, and NGOs or individuals can browse available items, place orders, and arrange for pickup or delivery.'
  },
  {
    question: 'Is there a cost for using this service?',
    answer: 'Our basic service is free for NGOs and charities. Restaurants pay a small commission to help maintain the platform.'
  },
  {
    question: 'How do you ensure food safety?',
    answer: 'All food providers must adhere to strict food safety guidelines. We track food preparation times and require proper storage and handling procedures.'
  },
  {
    question: 'Can individuals request food or is it only for NGOs?',
    answer: 'While we prioritize NGOs serving larger groups, individuals in need can also access food through our partner organizations.'
  },
  {
    question: 'How can my restaurant join the platform?',
    answer: 'Simply register on our website as a food provider. Our team will verify your details and guide you through the onboarding process.'
  },
  {
    question: 'What types of food can be donated?',
    answer: 'Most prepared foods that can be safely stored and transported are acceptable. We do not accept raw meat, unpasteurized dairy, or other high-risk items.'
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <svg
          className={`h-5 w-5 text-green-600 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2"
        >
          <p className="text-gray-600">{answer}</p>
        </motion.div>
      )}
    </div>
  );
};

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our leftover food delivery platform.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>

        <div className="mt-12 bg-green-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-green-800">Still have questions?</h3>
          <p className="mt-2 text-green-700">
            Contact our support team at{' '}
            <a href="mailto:support@leftoverhero.com" className="font-medium underline">
              support@leftoverhero.com
            </a>{' '}
            or call us at +1 (555) 123-4567.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQs;