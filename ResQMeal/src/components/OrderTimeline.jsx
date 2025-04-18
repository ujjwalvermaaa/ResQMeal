import { motion } from 'framer-motion';

const statuses = {
  pending: { color: 'bg-yellow-500', text: 'Order Placed' },
  confirmed: { color: 'bg-blue-500', text: 'Restaurant Confirmed' },
  preparing: { color: 'bg-purple-500', text: 'Preparing Food' },
  ready: { color: 'bg-indigo-500', text: 'Ready for Pickup' },
  picked_up: { color: 'bg-green-500', text: 'Picked Up' },
  delivered: { color: 'bg-green-600', text: 'Delivered' },
  cancelled: { color: 'bg-red-500', text: 'Cancelled' },
};

const OrderTimeline = ({ currentStatus }) => {
  const statusOrder = ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'delivered'];
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

      <div className="space-y-6">
        {statusOrder.map((status, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isFuture = index > currentIndex;

          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-10"
            >
              {/* Status dot */}
              <div className={`absolute left-0 top-0.5 w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? statuses[status].color : isCurrent ? statuses[status].color : 'bg-gray-300'}`}>
                {isCompleted ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-white font-bold">{index + 1}</span>
                )}
              </div>

              {/* Status content */}
              <div className={`p-4 rounded-lg ${isCurrent ? 'bg-blue-50 border border-blue-100' : 'bg-white border border-gray-100'}`}>
                <h3 className={`font-medium ${isCompleted ? 'text-gray-800' : isCurrent ? 'text-blue-800' : 'text-gray-500'}`}>
                  {statuses[status].text}
                </h3>
                {isCurrent && (
                  <p className="text-sm text-gray-600 mt-1">
                    Your order is currently at this stage
                  </p>
                )}
              </div>

              {/* Connector line */}
              {index < statusOrder.length - 1 && (
                <div className={`absolute left-4 top-8 bottom-0 w-0.5 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;