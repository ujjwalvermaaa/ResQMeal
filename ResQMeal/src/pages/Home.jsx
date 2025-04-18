import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FoodCard from '../components/FoodCard';
import StatsCard from '../components/StatsCard';
import Testimonials from '../components/Testimonials';
import api from '../utils/api';
import Loader from '../components/Loader';

const Home = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodsRes, restaurantsRes, statsRes] = await Promise.all([
          api.get('/foods/featured'),
          api.get('/restaurants/featured'),
          api.get('/stats'),
        ]);
        setFeaturedFoods(foodsRes.data);
        setFeaturedRestaurants(restaurantsRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-green-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Rescue Food, <span className="text-green-600">Save Lives</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Connecting restaurants with surplus food to NGOs and people in need. 
                Reduce waste and fight hunger in your community.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/restaurants"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    Find Food Near You
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/about"
                    className="bg-white hover:bg-gray-100 text-green-600 px-6 py-3 rounded-lg font-medium border border-green-600"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/assets/hero-image.jpg"
                alt="Food Rescue"
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg"
              >
                <div className="text-green-600 font-bold text-xl">120+</div>
                <div className="text-gray-600 text-sm">Restaurants Partnered</div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
              >
                <div className="text-green-600 font-bold text-xl">5,000+</div>
                <div className="text-gray-600 text-sm">Meals Saved Daily</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Together we're making a difference in reducing food waste and fighting hunger
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
              number={stats.foodSaved || 12500} 
              label="Meals Saved" 
              icon="🍲" 
              color="text-green-600" 
              delay={0.1}
            />
            <StatsCard 
              number={stats.co2Reduced || 3200} 
              label="CO₂ Reduced (kg)" 
              icon="🌱" 
              color="text-blue-600" 
              delay={0.2}
            />
            <StatsCard 
              number={stats.partners || 240} 
              label="Partners" 
              icon="🤝" 
              color="text-yellow-600" 
              delay={0.3}
            />
            <StatsCard 
              number={stats.communities || 45} 
              label="Communities Served" 
              icon="🏘️" 
              color="text-red-600" 
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Featured Foods */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Foods</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Delicious surplus food available now from our partner restaurants
            </p>
          </motion.div>
          
          {featuredFoods.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredFoods.map((food, index) => (
                <motion.div
                  key={food._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <FoodCard food={food} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No featured foods available at the moment</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link
              to="/restaurants"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              View All Restaurants
              <svg className="ml-3 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simple steps to rescue food and make an impact
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Restaurants List Surplus",
                description: "Partner restaurants list their surplus food with details on quantity and pickup time.",
                icon: "🍽️",
              },
              {
                title: "NGOs or Individuals Order",
                description: "Registered NGOs or individuals browse available food and place orders.",
                icon: "📱",
              },
              {
                title: "Food Gets Delivered",
                description: "Food is picked up or delivered to those in need, reducing waste and hunger.",
                icon: "🚚",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-12 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Restaurants</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Partner restaurants making a difference in our community
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link to={`/restaurants/${restaurant._id}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={restaurant.image || '/assets/restaurant-placeholder.jpg'}
                      alt={restaurant.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h3 className="text-white font-bold text-xl">{restaurant.name}</h3>
                      <p className="text-gray-200 text-sm">{restaurant.location.address}</p>
                    </div>
                  </div>
                </Link>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-700">{restaurant.rating || '4.5'}</span>
                    </div>
                    <Link
                      to={`/restaurants/${restaurant._id}`}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      View Menu
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join our platform as a restaurant, NGO, or individual and start reducing food waste today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium"
                >
                  Sign Up Now
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/about"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;