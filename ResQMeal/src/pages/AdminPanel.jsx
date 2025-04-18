import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import api from '../utils/api';
import Loader from '../components/Loader';
import AdminUsersTable from '../components/AdminUsersTable';
import AdminRestaurantsTable from '../components/AdminRestaurantsTable';
import AdminOrdersTable from '../components/AdminOrdersTable';
import AdminNgosTable from '../components/AdminNgosTable';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const AdminPanel = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats');
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

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
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-600 mt-2">
            Manage the platform and view system statistics
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Users</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">{stats.totalUsers || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900">Restaurants</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{stats.totalRestaurants || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900">NGOs</h3>
            <p className="mt-2 text-3xl font-bold text-purple-600">{stats.totalNgos || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900">Orders Today</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-600">{stats.ordersToday || 0}</p>
          </div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full"
        >
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-lg bg-gray-100 p-1">
              {['Users', 'Restaurants', 'NGOs', 'Orders'].map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-md py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow text-green-700'
                        : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel>
                <AdminUsersTable />
              </Tab.Panel>
              <Tab.Panel>
                <AdminRestaurantsTable />
              </Tab.Panel>
              <Tab.Panel>
                <AdminNgosTable />
              </Tab.Panel>
              <Tab.Panel>
                <AdminOrdersTable />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;