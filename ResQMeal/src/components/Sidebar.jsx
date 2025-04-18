import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Restaurants', path: '/admin/restaurants', icon: '🍽️' },
    { name: 'NGOs', path: '/admin/ngos', icon: '🤝' },
    { name: 'Orders', path: '/admin/orders', icon: '📦' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
    { name: 'Reports', path: '/admin/reports', icon: '📈' },
  ];

  const restaurantLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Inventory', path: '/inventory', icon: '📋' },
    { name: 'Orders', path: '/orders', icon: '📦' },
    { name: 'History', path: '/history', icon: '🕒' },
    { name: 'Analytics', path: '/analytics', icon: '📈' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  const ngoLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Browse Food', path: '/food', icon: '🍲' },
    { name: 'Orders', path: '/orders', icon: '📦' },
    { name: 'History', path: '/history', icon: '🕒' },
    { name: 'Beneficiaries', path: '/beneficiaries', icon: '👥' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  const links = user?.role === 'admin' 
    ? adminLinks 
    : user?.role === 'restaurant' 
      ? restaurantLinks 
      : ngoLinks;

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg ${isOpen ? 'block' : 'hidden'} md:block md:relative md:w-64`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 px-4 bg-green-600 text-white">
          <h1 className="text-xl font-bold">FoodRescue</h1>
          <button
            onClick={onClose}
            className="md:hidden ml-auto text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col flex-grow px-4 py-4 overflow-y-auto">
          <div className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={onClose}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname === link.path ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <span className="mr-3 text-lg">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center">
            <img
              src={user?.avatar || '/assets/default-avatar.png'}
              alt="User"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;