import React, { useState, useEffect } from 'react';
import { OrderService } from '../services/api';
import type { CalculatorSelection, CalculatorOrderData } from '../types';

// Функция для генерации уникального ID
const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `order_${timestamp}_${randomStr}`;
};

interface OrderFormProps {
  onSubmit?: () => void;
  className?: string;
  calculatorData?: CalculatorOrderData;
  onCalculatorReset?: () => void;
  source?: string;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, className = '', calculatorData, onCalculatorReset, source }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    source: calculatorData ? 'Калькулятор' : 'Форма заявки'
  });
  const [orderId, setOrderId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [telegramStatus, setTelegramStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  const [timeUntilNextSubmit, setTimeUntilNextSubmit] = useState<number>(0);

  // Проверка времени при загрузке компонента
  useEffect(() => {
    checkLastSubmitTime();
    
    // Обновление таймера каждую секунду
    const timer = setInterval(() => {
      if (timeUntilNextSubmit > 0) {
        setTimeUntilNextSubmit(prev => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeUntilNextSubmit]);

  // Обновляем источник при изменении данных калькулятора и генерируем новый ID
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      source: source || (calculatorData ? 'Калькулятор' : 'Форма заявки')
    }));
    setOrderId(generateOrderId());
  }, [calculatorData, source]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Проверка времени последней отправки
  const checkLastSubmitTime = (): boolean => {
    const lastSubmitTime = localStorage.getItem('lastOrderSubmitTime');
    if (!lastSubmitTime) return true;

    const now = Date.now();
    const lastSubmit = parseInt(lastSubmitTime);
    const timeDiff = now - lastSubmit;
    const oneHour = 60 * 60 * 1000; // 1 час в миллисекундах

    if (timeDiff < oneHour) {
      const remainingTime = oneHour - timeDiff;
      setTimeUntilNextSubmit(Math.ceil(remainingTime / 1000)); // в секундах
      return false;
    }

    return true;
  };

  // Сохранение времени отправки
  const saveSubmitTime = () => {
    localStorage.setItem('lastOrderSubmitTime', Date.now().toString());
  };

  // Форматирование времени
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}ч ${minutes}м ${secs}с`;
    } else if (minutes > 0) {
      return `${minutes}м ${secs}с`;
    } else {
      return `${secs}с`;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка времени последней отправки
    if (!checkLastSubmitTime()) {
      setSubmitStatus('error');
      setErrorMessage(`Вы можете отправить заявку только раз в час. Следующая отправка доступна через ${formatTime(timeUntilNextSubmit)}`);
      return;
    }
    
    // Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setErrorMessage('Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    setTelegramStatus('idle');

    try {
      // Формируем сообщение с данными калькулятора, если они есть
      let fullMessage = formData.message;
      if (calculatorData && calculatorData.selections.length > 0) {
        fullMessage += '\n\n📋 <b>Детали заказа из калькулятора:</b>\n';
        fullMessage += `💰 <b>Общая стоимость:</b> ${calculatorData.totalPrice.toFixed(2)} руб.\n\n`;
        
        calculatorData.selections.forEach((selection, index) => {
          fullMessage += `🔸 <b>${index + 1}. ${selection.part.name}</b>\n`;
          fullMessage += `   📦 Материал: ${selection.material.name} (${selection.material.origin})\n`;
          fullMessage += `   📏 Размер: ${selection.size.name} (${selection.size.dimensions})\n`;
          fullMessage += `   🔢 Количество: ${selection.quantity} шт.\n`;
          fullMessage += `   💰 Цена: ${selection.size.price.toFixed(2)} руб.\n`;
          
          if (selection.services.length > 0) {
            fullMessage += `   ⚙️ Доп. услуги: ${selection.services.map(s => `${s.name} (${s.price.toFixed(2)} руб.)`).join(', ')}\n`;
          }
          fullMessage += `   💵 <b>Итого за позицию:</b> ${selection.totalPrice.toFixed(2)} руб.\n\n`;
        });
      }

      // Отправляем заказ в систему (которая автоматически отправит в Telegram)
      setTelegramStatus('sending');
      
      try {
        const orderData = {
          name: formData.name,
          phone: formData.phone,
          message: fullMessage,
          source: formData.source
        };

        await OrderService.createOrder(orderData);
        
        setSubmitStatus('success');
        setTelegramStatus('sent');
        setFormData({ name: '', phone: '', message: '', source: 'Форма заявки' });
        
        // Сохраняем время отправки
        saveSubmitTime();
        
        // Сбрасываем данные калькулятора
        if (calculatorData && onCalculatorReset) {
          onCalculatorReset();
        }
        
        if (onSubmit) {
          onSubmit();
        }
        
        setTimeout(() => {
          setSubmitStatus('idle');
          setTelegramStatus('idle');
        }, 3000);
        
      } catch (orderError) {
        setTelegramStatus('failed');
        console.error('Failed to create order:', orderError);
        throw new Error('Не удалось отправить заявку. Попробуйте еще раз.');
      }
      
    } catch (error) {
      setSubmitStatus('error');
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
      }
      console.error('Order submission error:', error);
      setTelegramStatus('idle');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      {/* Timer Display */}
      {timeUntilNextSubmit > 0 && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center justify-center text-orange-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">
              Следующая заявка доступна через: {formatTime(timeUntilNextSubmit)}
            </span>
          </div>
        </div>
      )}
      
      {/* Calculator Data Display */}
      {calculatorData && calculatorData.selections.length > 0 && (
        <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-medium text-blue-900 text-lg">Детали заказа из калькулятора</h4>
            </div>
          </div>
          
          <div className="space-y-2 mb-3">
            {calculatorData.selections.map((selection, index) => (
              <div key={index} className="text-sm text-blue-800 bg-gradient-to-r from-blue-100 to-blue-50 p-3 rounded-lg border border-blue-200 shadow-sm">
                <div className="font-medium text-blue-900 mb-2">🔸 {index + 1}. {selection.part.name}</div>
                <div className="grid grid-cols-1 gap-1 text-blue-700">
                  <div>📦 Материал: {selection.material.name} ({selection.material.origin})</div>
                  <div>📏 Размер: {selection.size.name} ({selection.size.dimensions})</div>
                  <div>🔢 Количество: {selection.quantity} шт.</div>
                  {selection.services.length > 0 && (
                    <div>⚙️ Услуги: {selection.services.map(s => s.name).join(', ')}</div>
                  )}
                </div>
                <div className="font-medium text-blue-900 mt-2 pt-2 border-t border-blue-200">
                  💰 Цена: {selection.totalPrice.toFixed(2)} руб.
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-lg font-bold text-blue-900 border-t border-blue-200 pt-3 flex items-center justify-between bg-gradient-to-r from-blue-100 to-blue-50 p-3 rounded-lg">
            <span className="flex items-center">
              <span className="mr-2">💰</span>
              Общая стоимость:
            </span>
            <span className="text-2xl text-blue-800">{calculatorData.totalPrice.toFixed(2)} руб.</span>
          </div>
        </div>
      )}


      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="name" className="form-label">Имя</label>
          <input 
            type="text" 
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input" 
            placeholder="Ваше имя"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="phone" className="form-label">Телефон</label>
          <input 
            type="tel" 
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-input" 
            placeholder="+375 (XX) XXX XX XX"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="message" className="form-label">Сообщение</label>
          <textarea 
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="form-input h-32" 
            placeholder="Ваш вопрос или комментарий"
            disabled={isSubmitting}
          ></textarea>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-medium">Заявка успешно отправлена!</p>
                <p className="text-sm text-green-700">Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {errorMessage}
            </div>
          </div>
        )}

        <div className="pt-2">
          <button 
            type="submit" 
            className={`w-full text-sm sm:text-base py-2 sm:py-3 rounded-lg font-medium transition-all ${
              timeUntilNextSubmit > 0 || isSubmitting
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'btn-primary hover:bg-primary-dark'
            }`}
            disabled={isSubmitting || timeUntilNextSubmit > 0}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {telegramStatus === 'sending' ? 'Отправка в Telegram...' : 'Отправка...'}
              </div>
            ) : timeUntilNextSubmit > 0 ? (
              `Подождите ${formatTime(timeUntilNextSubmit)}`
            ) : (
              'Отправить'
            )}
          </button>
          
          {/* Telegram Status Indicator */}
          {telegramStatus === 'sending' && (
            <div className="mt-2 text-center text-sm text-blue-600">
              📱 Отправляем сообщение в Telegram...
            </div>
          )}
          {telegramStatus === 'sent' && (
            <div className="mt-2 text-center text-sm text-green-600">
              ✅ Сообщение отправлено в Telegram
            </div>
          )}
          {telegramStatus === 'failed' && (
            <div className="mt-2 text-center text-sm text-orange-600">
              ⚠️ Telegram недоступен, сохраняем в системе...
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default OrderForm; 