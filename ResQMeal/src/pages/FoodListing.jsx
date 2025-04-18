import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import Loader from '../components/Loader';
import FoodCard from '../components/FoodCard';

const FoodListing = () => {
  const { id } = useParams();
  const [foods, setFoods] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantRes, foodsRes] = await Promise.all([
          api.get(`/restaurants/${id}`),
          api.get(`/restaurants/${id}/foods`),
        ]);
        setRestaurant(restaurantRes.data);
        setFoods(foodsRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const categories = [...new Set(foods.map(food => food.category))].filter(Boolean);

  if (loading) return <Loader />;

  return (
    <div className="pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Restaurant Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3">
              <img
                className="h-48 w-full object-cover md:h-full"
                src={restaurant.image || '/assets/restaurant-placeholder.jpg'}
                alt={restaurant.name}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">
                {restaurant.cuisineType?.join(', ')}
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mt-1">{restaurant.name}</h1>
              <p className="mt-2 text-gray-500">{restaurant.description}</p>
              
              <div className="mt-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-gray-600">
                    {restaurant.rating || '4.5'} · {restaurant.location?.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        {categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-4">
              <h3 className="text-sm font-medium text-gray-500">Filter by Category:</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCategoryFilter('')}
                  className={`px-3 py-1 rounded-full text-sm ${!categoryFilter ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-3 py-1 rounded-full text-sm ${categoryFilter === category ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Food Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods
            .filter(food => !categoryFilter || food.category === categoryFilter)
            .map((food, index) => (
              <motion.div
                key={food._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <FoodCard food={food} />
              </motion.div>
            ))}
        </div>

        {foods.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-medium text-gray-700 mb-2">No food items available</h3>
            <p className="text-gray-500">Check back later for surplus food listings</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FoodListing;