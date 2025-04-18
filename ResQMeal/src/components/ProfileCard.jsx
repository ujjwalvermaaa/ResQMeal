import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProfileCard = ({ user, onClose, onLogout }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50"
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <p className="text-sm font-medium text-gray-800">{user.name}</p>
        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
      </div>

      <div className="py-1">
        <Link
          to="/profile"
          onClick={onClose}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Your Profile
        </Link>
        <Link
          to="/settings"
          onClick={onClose}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Settings
        </Link>
        {user.role === 'restaurant' && (
          <Link
            to="/dashboard"
            onClick={onClose}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Restaurant Dashboard
          </Link>
        )}
        {user.role === 'ngo' && (
          <Link
            to="/dashboard"
            onClick={onClose}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            NGO Dashboard
          </Link>
        )}
      </div>

      <div className="py-1 border-t border-gray-100">
        <button
          onClick={() => {
            onLogout();
            onClose();
          }}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Sign out
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileCard;