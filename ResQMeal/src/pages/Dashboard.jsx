import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Loader from '../components/Loader';
import StatsCard from '../components/StatsCard';
import RecentOrders from '../components/RecentOrders';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = '';
        if (user.role === 'restaurant') {
          endpoint = '/dashboard/restaurant';
        } else if (user.role === 'ngo') {
          endpoint = '/dashboard/ngo';
        } else {
          endpoint = '/dashboard/user';
        }
        
        const { data } = await api.get(endpoint);
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

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
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user.name}! Here's what's happening today.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user.role === 'restaurant' && (
            <>
              <StatsCard 
                number={stats.foodListed || 0} 
                label="Food Items Listed" 
                icon="🍽️" 
                color="text-green-600" 
              />
              <StatsCard 
                number={stats.ordersReceived || 0} 
                label="Orders Received" 
                icon="📦" 
                color="text-blue-600" 
              />
              <StatsCard 
                number={stats.foodDonated || 0} 
                label="Meals Donated" 
                icon="❤️" 
                color="text-red-600" 
              />
              <StatsCard 
                number={stats.wasteReduced || 0} 
                label="Kg Waste Reduced" 
                icon="🌱" 
                color="text-yellow-600" 
              />
            </>
          )}

          {user.role === 'ngo' && (
            <>
              <StatsCard 
                number={stats.ordersPlaced || 0} 
                label="Orders Placed" 
                icon="📦" 
                color="text-green-600" 
              />
              <StatsCard 
                number={stats.mealsReceived || 0} 
                label="Meals Received" 
                icon="🍲" 
                color="text-blue-600" 
              />
              <StatsCard 
                number={stats.beneficiaries || 0} 
                label="Beneficiaries" 
                icon="👥" 
                color="text-red-600" 
              />
              <StatsCard 
                number={stats.moneySaved || 0} 
                label="Dollars Saved" 
                icon="💰" 
                color="text-yellow-600" 
              />
            </>
          )}

          {user.role === 'user' && (
            <>
              <StatsCard 
                number={stats.ordersPlaced || 0} 
                label="Orders Placed" 
                icon="📦" 
                color="text-green-600" 
              />
              <StatsCard 
                number={stats.moneySaved || 0} 
                label="Dollars Saved" 
                icon="💰" 
                color="text-blue-600" 
              />
              <StatsCard 
                number={stats.favorites || 0} 
                label="Favorite Restaurants" 
                icon="❤️" 
                color="text-red-600" 
              />
              <StatsCard 
                number={stats.impactScore || 0} 
                label="Impact Score" 
                icon="🌍" 
                color="text-yellow-600" 
              />
            </>
          )}
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-800">Recent Orders</h2>
          </div>
          <RecentOrders />
        </motion.div>

        {/* Additional Sections Based on Role */}
        {user.role === 'restaurant' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-medium text-gray-800">Inventory Status</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600">Your inventory is {stats.inventoryStatus || 'good'}.</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${stats.inventoryPercentage || 0}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}

        {user.role === 'ngo' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-medium text-gray-800">Upcoming Deliveries</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600">You have {stats.upcomingDeliveries || 0} upcoming deliveries scheduled.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;