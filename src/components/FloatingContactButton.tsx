import React, { useState } from 'react';
import OrderModal from './OrderModal';

const FloatingContactButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Плавающая кнопка */}
      <button
        onClick={openModal}
        className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        aria-label="Связаться с нами"
        title="Связаться с нами"
      >
        {/* Основная иконка */}
        <svg 
          className="w-6 h-6 sm:w-8 sm:h-8 text-white transition-transform duration-300 group-hover:scale-110" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
          />
        </svg>
        
        {/* Пульсирующий эффект */}
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
        
        {/* Внешний круг для дополнительного эффекта */}
        <div className="absolute inset-0 border-2 border-green-300 rounded-full animate-pulse"></div>
        
        {/* Текст при наведении (только на десктопе) */}
        <div className="hidden sm:block absolute right-full mr-3 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Связаться с нами
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-green-600 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      </button>

      {/* Модальное окно */}
      <OrderModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        source="floating-button"
      />
    </>
  );
};

export default FloatingContactButton;
