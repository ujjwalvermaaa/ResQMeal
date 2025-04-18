import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import api from '../utils/api';
import Loader from '../components/Loader';
import OrderCard from '../components/OrderCard';

const FoodHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let endpoint = '/orders/history';
        if (user.role === 'restaurant') {
          endpoint = '/orders/restaurant-history';
        } else if (user.role === 'ngo') {
          endpoint = '/orders/ngo-history';
        }

        const { data } = await api.get(endpoint);
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch order history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  if (loading) return <Loader />;

  return (
    <div className="pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Order History</h1>
          <p className="text-gray-600 mt-2">
            {user.role === 'restaurant' 
              ? 'Your restaurant\'s past orders and donations' 
              : 'Your past orders and food rescues'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="text-sm font-medium text-gray-500">Filter by status:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('delivered')}
                className={`px-3 py-1 rounded-full text-sm ${filter === 'delivered' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Delivered
              </button>
              <button
                onClick={() => setFilter('cancelled')}
                className={`px-3 py-1 rounded-full text-sm ${filter === 'cancelled' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Cancelled
              </button>
              {user.role === 'restaurant' && (
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-3 py-1 rounded-full text-sm ${filter === 'pending' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  Pending
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {filteredOrders.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            {filteredOrders.map((order, index) => (
              <OrderCard 
                key={order._id} 
                order={order} 
                userRole={user.role}
                delay={index * 0.05}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-700">No orders found</h3>
            <p className="mt-1 text-gray-500">
              {filter === 'all' 
                ? 'You don\'t have any orders in your history yet.' 
                : `You don't have any ${filter} orders.`}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FoodHistory;