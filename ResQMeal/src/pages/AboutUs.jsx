import { motion } from 'framer-motion';
import TeamMember from '../components/TeamMember';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      bio: 'Passionate about reducing food waste and helping communities.',
      image: '/assets/team1.jpg',
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      bio: 'Tech enthusiast building the platform to connect people with surplus food.',
      image: '/assets/team2.jpg',
    },
    {
      name: 'Mike Johnson',
      role: 'Head of Partnerships',
      bio: 'Connecting restaurants and NGOs to maximize impact.',
      image: '/assets/team3.jpg',
    },
    {
      name: 'Sarah Williams',
      role: 'Community Manager',
      bio: 'Ensuring our users have the best experience possible.',
      image: '/assets/team4.jpg',
    },
  ];

  return (
    <div className="pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About FoodRescue</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our mission is to reduce food waste and fight hunger by connecting surplus food with those in need.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-green-50 rounded-xl p-8 md:p-12">
            <div className="md:flex items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-4">
                  Every year, millions of tons of perfectly good food go to waste while millions of people go hungry. 
                  We believe this is unacceptable and have built a platform to bridge this gap.
                </p>
                <p className="text-gray-600">
                  FoodRescue connects restaurants, grocery stores, and other food businesses with NGOs, shelters, 
                  and individuals who can use this food before it goes to waste.
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  src="/assets/about-mission.jpg"
                  alt="Our Mission"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-5xl font-bold text-green-600 mb-2">10,000+</h3>
                <p className="text-gray-600">Meals rescued monthly</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold text-green-600 mb-2">200+</h3>
                <p className="text-gray-600">Partner restaurants</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold text-green-600 mb-2">50+</h3>
                <p className="text-gray-600">NGO partners</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>

        {/* Join Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-green-600 text-white rounded-xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a restaurant with surplus food or an individual who wants to help, 
            we'd love to have you on board.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/register"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium"
            >
              Sign Up Now
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;