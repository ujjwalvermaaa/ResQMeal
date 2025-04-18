import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import Loader from '../components/Loader';
import FoodItemCard from '../components/FoodItemCard';
import AddFoodItemModal from '../components/AddFoodItemModal';

const Inventory = () => {
  const { user } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data } = await api.get('/inventory');
        setInventory(data);
      } catch (err) {
        console.error('Failed to fetch inventory:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const handleAddItem = (newItem) => {
    setInventory([newItem, ...inventory]);
  };

  const handleUpdateItem = (updatedItem) => {
    setInventory(inventory.map(item => 
      item._id === updatedItem._id ? updatedItem : item
    ));
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await api.delete(`/foods/${itemId}`);
      setInventory(inventory.filter(item => item._id !== itemId));
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const filteredInventory = inventory.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'available') return item.isAvailable && item.quantity > 0;
    if (filter === 'sold') return !item.isAvailable || item.quantity <= 0;
    return true;
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
              <p className="text-gray-600 mt-2">
                Manage your restaurant's surplus food listings
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Add Food Item
            </button>
          </div>
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
                All Items
              </button>
              <button
                onClick={() => setFilter('available')}
                className={`px-3 py-1 rounded-full text-sm ${filter === 'available' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Available
              </button>
              <button
                onClick={() => setFilter('sold')}
                className={`px-3 py-1 rounded-full text-sm ${filter === 'sold' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Sold Out
              </button>
            </div>
          </div>
        </motion.div>

        {filteredInventory.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredInventory.map((item, index) => (
              <FoodItemCard
                key={item._id}
                item={item}
                onUpdate={handleUpdateItem}
                onDelete={handleDeleteItem}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-700">No food items found</h3>
            <p className="mt-1 text-gray-500">
              {filter === 'all' 
                ? 'You haven\'t added any food items to your inventory yet.' 
                : `You don't have any ${filter} food items.`}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Add Your First Item
            </button>
          </motion.div>
        )}

        <AddFoodItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddItem}
        />
      </div>
    </div>
  );
};

export default Inventory;