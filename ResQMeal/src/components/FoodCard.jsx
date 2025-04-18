import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const FoodCard = ({ food, onUpdate }) => {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      toast.info('Please login to add items to cart');
      return;
    }

    try {
      setIsAdding(true);
      await api.post('/cart/add', { foodId: food._id, quantity: 1 });
      toast.success(`${food.name} added to cart`);
      if (onUpdate) onUpdate();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-lg shadow-md overflow-hidden relative"
    >
      <div className="relative h-48 overflow-hidden">
        <Link to={`/food/${food._id}`}>
          <motion.img
            src={food.image || '/assets/food-placeholder.jpg'}
            alt={food.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        {food.discountPrice && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
          >
            {Math.round(((food.originalPrice - food.discountPrice) / food.originalPrice) * 100)}% OFF
          </motion.div>
        )}

        <motion.div
          initial={{ y: 50 }}
          animate={{ y: isHovered ? 0 : 50 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
        >
          <h3 className="text-white font-bold text-lg">{food.name}</h3>
          <p className="text-gray-200 text-sm truncate">{food.description}</p>
        </motion.div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="text-green-600 font-bold text-lg">
              ${food.discountPrice || food.originalPrice}
            </span>
            {food.discountPrice && (
              <span className="ml-2 text-gray-500 text-sm line-through">${food.originalPrice}</span>
            )}
          </div>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            {food.quantity} left
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Expires at {formatTime(food.expiryTime)}
        </div>

        <div className="flex justify-between items-center">
          <Link
            to={`/restaurants/${food.restaurant._id}`}
            className="flex items-center text-sm text-gray-700 hover:text-green-600"
          >
            <img
              src={food.restaurant.logo || '/assets/restaurant-placeholder.jpg'}
              alt={food.restaurant.name}
              className="w-6 h-6 rounded-full mr-2 object-cover"
            />
            {food.restaurant.name}
          </Link>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={isAdding || food.quantity <= 0}
            className={`px-3 py-1 rounded-full text-sm font-medium ${food.quantity <= 0 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
          >
            {isAdding ? 'Adding...' : food.quantity <= 0 ? 'Sold Out' : 'Add to Cart'}
          </motion.button>
        </div>
      </div>

      {food.quantity <= 0 && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <span className="text-white font-bold text-lg">Sold Out</span>
        </div>
      )}
    </motion.div>
  );
};

export default FoodCard;