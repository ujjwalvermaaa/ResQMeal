import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const StatsCard = ({ number, label, icon, color = 'text-green-600', delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const increment = Math.ceil(number / (duration / 16)); // 60fps

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        current = number;
        clearInterval(timer);
      }
      setCount(current);
    }, 16);

    return () => clearInterval(timer);
  }, [number]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-lg shadow-md text-center"
    >
      <div className={`text-4xl mb-2 ${color}`}>{icon}</div>
      <motion.p 
        className="text-3xl font-bold mb-1"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
        key={count}
      >
        {count.toLocaleString()}+
      </motion.p>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

export default StatsCard;