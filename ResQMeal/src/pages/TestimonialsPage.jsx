import { motion } from 'framer-motion';
import TestimonialCard from '../components/TestimonialCard';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Restaurant Owner',
    content: 'Joining FoodRescue has allowed us to reduce our food waste by 80% while helping our community. It feels great to know our surplus food is feeding people instead of going to waste.',
    image: '/assets/testimonial1.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'NGO Director',
    content: 'The platform has been a game-changer for our food distribution program. We can now reliably source quality food for our beneficiaries with just a few clicks.',
    image: '/assets/testimonial2.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Volunteer',
    content: "I love being part of the FoodRescue community. It's rewarding to connect restaurants with those in need and see the immediate impact of our work.",
    image: '/assets/testimonial3.jpg',
    rating: 4,
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Community Leader',
    content: 'In just six months, FoodRescue has helped provide over 5,000 meals to families in our neighborhood. The platform is easy to use and makes a real difference.',
    image: '/assets/testimonial4.jpg',
    rating: 5,
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'Restaurant Manager',
    content: 'The FoodRescue team made it so simple for us to start donating our surplus food. The impact reports they provide show exactly how much we\'re helping.',
    image: '/assets/testimonial5.jpg',
    rating: 4,
  },
  {
    id: 6,
    name: 'James Park',
    role: 'Food Bank Coordinator',
    content: 'The variety and quality of food we receive through FoodRescue has significantly improved our meal programs. Our beneficiaries are thrilled with the fresh options.',
    image: '/assets/testimonial6.jpg',
    rating: 5,
  },
];

const TestimonialsPage = () => {
  return (
    <div className="pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">What People Are Saying</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from our community of restaurants, NGOs, volunteers, and beneficiaries
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id}
              testimonial={testimonial}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-green-50 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Share Your Experience</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Have you used FoodRescue as a restaurant, NGO, or volunteer? We'd love to hear your story!
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md font-medium">
            Submit Your Testimonial
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsPage;