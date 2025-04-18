import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell, FiCheck } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const NotificationBell = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          const { data } = await api.get('/notifications');
          setNotifications(data);
          setUnreadCount(data.filter(n => !n.read).length);
        } catch (err) {
          console.error('Error fetching notifications:', err);
        }
      };
      fetchNotifications();
    }
  }, [user]);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev => 
        prev.map(n => n._id === id ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => prev - 1);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch('/notifications/mark-all-read');
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-gray-700 hover:bg-gray-100 relative"
      >
        <FiBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-50"
          >
            <div className="px-4 py-2 bg-gray-100 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">Notifications</h3>
              <button
                onClick={markAllAsRead}
                className="text-xs text-green-600 hover:text-green-700"
              >
                Mark all as read
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`px-4 py-3 border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : 'bg-white'}`}
                  >
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="text-green-600 hover:text-green-700 ml-2"
                        >
                          <FiCheck size={16} />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-500">
                  No notifications yet
                </div>
              )}
            </div>

            <div className="px-4 py-2 bg-gray-50 text-center border-t border-gray-200">
              <a
                href="/notifications"
                className="text-sm text-green-600 hover:text-green-700"
              >
                View all notifications
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;