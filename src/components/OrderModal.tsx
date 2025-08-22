import React from 'react';
import OrderForm from './OrderForm';
import type { CalculatorOrderData } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorData?: CalculatorOrderData;
  onCalculatorReset?: () => void;
  onOrderSubmitted?: () => void;
  source?: string;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, calculatorData, onCalculatorReset, onOrderSubmitted, source }) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    // Вызываем callback для уведомления об успешной отправке заявки
    if (onOrderSubmitted) {
      onOrderSubmitted();
    }
    // Закрываем модальное окно после успешной отправки
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-800 font-heading">
              Оставить заявку
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Закрыть"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <p className="text-neutral-600 mb-6">
              {calculatorData 
                ? 'Оставьте заявку на выбранные позиции из калькулятора, и мы свяжемся с вами в ближайшее время для обсуждения деталей заказа.'
                : 'Оставьте заявку, и мы свяжемся с вами в ближайшее время для обсуждения деталей заказа.'
              }
            </p>
            <OrderForm onSubmit={handleSubmit} calculatorData={calculatorData} onCalculatorReset={onCalculatorReset} source={source} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderModal; 