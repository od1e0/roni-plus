import React, { useState, useEffect } from 'react';
import { OrderService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface OrderNotificationProps {
  onNewOrder?: () => void;
}

const OrderNotification: React.FC<OrderNotificationProps> = ({ onNewOrder }) => {
  const { token } = useAuth();
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [lastOrderCount, setLastOrderCount] = useState(0);

  // Check for new orders
  const checkNewOrders = async () => {
    if (!token) return;
    
    try {
      const orders = await OrderService.getAllOrders(token);
      const newOrders = orders.filter((order: any) => order.status === 'new');
      const currentCount = newOrders.length;
      
      // If we have new orders and the count increased
      if (currentCount > 0 && currentCount > lastOrderCount) {
        setNewOrdersCount(currentCount);
        setIsVisible(true);
        
        // Show notification
        if (Notification.permission === 'granted') {
          new Notification('Новая заявка!', {
            body: `Получена новая заявка от клиента. Всего новых заявок: ${currentCount}`,
            icon: '/favicon.ico',
            tag: 'new-order'
          });
        }
        
        // Call callback
        if (onNewOrder) {
          onNewOrder();
        }
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 5000);
      }
      
      setLastOrderCount(currentCount);
    } catch (error) {
      console.error('Failed to check new orders:', error);
    }
  };

  useEffect(() => {
    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    // Check for new orders every 30 seconds
    const interval = setInterval(checkNewOrders, 30000);
    
    // Initial check
    checkNewOrders();
    
    return () => clearInterval(interval);
  }, [token, lastOrderCount]);

  if (!isVisible || newOrdersCount === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 left-4 sm:left-auto z-50">
      <div className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-bounce max-w-sm sm:max-w-md">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-6H4v6zM20 4h-6v6h6V4zM10 4H4v6h6V4z" />
          </svg>
          <div className="absolute -top-1 -right-1 bg-white text-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {newOrdersCount}
          </div>
        </div>
        <div>
          <div className="font-semibold">Новая заявка!</div>
          <div className="text-sm opacity-90">
            {newOrdersCount === 1 ? 'Получена новая заявка' : `Получено ${newOrdersCount} новых заявок`}
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-white/80 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OrderNotification; 