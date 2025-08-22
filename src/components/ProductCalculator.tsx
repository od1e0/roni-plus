import React, { useState, useEffect } from 'react';
import type { CalculatorPart, CalculatorMaterial, CalculatorSize, CalculatorService, CalculatorSelection, CalculatorOrderData } from '../types';
import { CalculatorServiceClass } from '../services/calculator';

interface ProductCalculatorProps {
  onAddToOrder?: (options: CalculatorSelection[]) => void;
  onOpenOrderModal?: (calculatorData?: CalculatorOrderData) => void;
  onOrderSubmitted?: () => void;
}

const ProductCalculator: React.FC<ProductCalculatorProps> = ({ onAddToOrder, onOpenOrderModal, onOrderSubmitted }) => {
  const [selectedPart, setSelectedPart] = useState<CalculatorPart | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<CalculatorMaterial | null>(null);
  const [selectedSize, setSelectedSize] = useState<CalculatorSize | null>(null);
  const [selectedServices, setSelectedServices] = useState<CalculatorService[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selections, setSelections] = useState<CalculatorSelection[]>([]);

  // В реальном проекте эти данные должны загружаться с сервера
  const [parts, setParts] = useState<CalculatorPart[]>([]);
  const [materials, setMaterials] = useState<CalculatorMaterial[]>([]);
  const [sizes, setSizes] = useState<CalculatorSize[]>([]);
  const [services, setServices] = useState<CalculatorService[]>([]);

  useEffect(() => {
    const loadCalculatorData = async () => {
      try {
        const [partsData, servicesData] = await Promise.all([
          CalculatorServiceClass.getParts(),
          CalculatorServiceClass.getServices()
        ]);
        
        setParts(partsData);
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading calculator data:', error);
      }
    };
    
    loadCalculatorData();
  }, []);

  // Обновляем доступные материалы и размеры при выборе части
  useEffect(() => {
    if (selectedPart) {
      setMaterials(selectedPart.materials || []);
      setSizes(selectedPart.sizes || []);
      // Сбрасываем выбранные материал и размер при смене части
      setSelectedMaterial(null);
      setSelectedSize(null);
      
      // Прокручиваем к выбору материала
      setTimeout(() => {
        const materialSection = document.getElementById('material-selection');
        if (materialSection) {
          materialSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      setMaterials([]);
      setSizes([]);
    }
  }, [selectedPart]);

  // Автоматическая прокрутка к кнопке добавления, когда все параметры выбраны
  useEffect(() => {
    if (selectedPart && selectedMaterial && selectedSize) {
      setTimeout(() => {
        const addButton = document.getElementById('add-to-order-btn');
        if (addButton) {
          addButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [selectedPart, selectedMaterial, selectedSize]);

  // Сброс калькулятора при получении callback об успешной отправке заявки
  useEffect(() => {
    if (onOrderSubmitted) {
      // Сбрасываем калькулятор при получении callback
      resetCalculator();
    }
  }, [onOrderSubmitted]);

  const calculateTotalPrice = (): number => {
    if (!selectedPart || !selectedSize) return 0;
    const basePrice = selectedSize.price * quantity;
    const servicesPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
    return basePrice + servicesPrice;
  };

     const handleAddToSelections = () => {
     if (!selectedPart || !selectedMaterial || !selectedSize) return;

     const newSelection: CalculatorSelection = {
       part: selectedPart,
       material: selectedMaterial,
       size: selectedSize,
       quantity,
       services: selectedServices,
       totalPrice: calculateTotalPrice()
     };

     setSelections(prev => [...prev, newSelection]);
     
     // Сброс формы
     setSelectedPart(null);
     setSelectedMaterial(null);
     setSelectedSize(null);
     setSelectedServices([]);
     setQuantity(1);
     // Материалы и размеры будут сброшены автоматически через useEffect
     
     // Прокручиваем к списку выбранных позиций
     setTimeout(() => {
       const selectionsList = document.getElementById('selections-list');
       if (selectionsList) {
         selectionsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
       }
     }, 200);
   };

  const handleRemoveSelection = (index: number) => {
    setSelections(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateSelection = (index: number, field: keyof CalculatorSelection, value: any) => {
    setSelections(prev => prev.map((selection, i) => {
      if (i === index) {
        const updated = { ...selection, [field]: value };
        if (field === 'quantity') {
          const basePrice = updated.size.price * updated.quantity;
          const servicesPrice = updated.services.reduce((sum, service) => sum + service.price, 0);
          updated.totalPrice = basePrice + servicesPrice;
        }
        return updated;
      }
      return selection;
    }));
  };

  const handleServiceToggle = (service: CalculatorService) => {
    setSelectedServices(prev => {
      const isSelected = prev.find(s => s.id === service.id);
      if (isSelected) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  // Функция для автоматической прокрутки
  const scrollToElement = (elementId: string, delay: number = 100) => {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, delay);
  };

  const handleSubmitOrder = () => {
    if (selections.length > 0) {
      if (onOpenOrderModal) {
        const calculatorData: CalculatorOrderData = {
          selections,
          totalPrice: totalOrderPrice,
          source: 'calculator'
        };
        onOpenOrderModal(calculatorData);
      } else if (onAddToOrder) {
        onAddToOrder(selections);
        setSelections([]);
        setIsOpen(false);
      }
    }
  };

  // Функция для сброса данных калькулятора
  const resetCalculator = () => {
    setSelections([]);
    setSelectedPart(null);
    setSelectedMaterial(null);
    setSelectedSize(null);
    setSelectedServices([]);
    setQuantity(1);
  };

  const totalOrderPrice = selections.reduce((sum, selection) => sum + selection.totalPrice, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-bold text-neutral-900">Рассчитать стоимость</h3>
          </div>
                     <button
             onClick={() => {
               setIsOpen(!isOpen);
               // Если открываем калькулятор, прокручиваем к началу формы
               if (!isOpen) {
                 setTimeout(() => {
                   const calculatorForm = document.getElementById('calculator-form');
                   if (calculatorForm) {
                     calculatorForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                   }
                 }, 100);
               }
             }}
             className="text-primary hover:text-primary-dark transition-colors flex items-center space-x-2"
           >
             <span>{isOpen ? 'Скрыть' : 'Показать'}</span>
             <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
             </svg>
           </button>
        </div>
      </div>

                    {/* Calculator Form */}
       {isOpen && (
         <div id="calculator-form" className="p-6 space-y-6">
           {/* Progress Indicator */}
           <div className="mb-6">
             <div className="flex items-center justify-between mb-2">
               <span className="text-sm font-medium text-neutral-700">Прогресс заполнения:</span>
               <span className="text-sm text-neutral-500">
                 {selectedPart ? (selectedMaterial ? (selectedSize ? (selectedServices.length > 0 ? 4 : 3) : 2) : 1) : 0}/5 шагов
               </span>
             </div>
             <div className="w-full bg-neutral-200 rounded-full h-2">
               <div 
                 className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                 style={{ 
                   width: `${selectedPart ? (selectedMaterial ? (selectedSize ? (selectedServices.length > 0 ? 80 : 60) : 40) : 20) : 0}%` 
                 }}
               ></div>
             </div>
             <div className="flex justify-between text-xs text-neutral-500 mt-1">
               <span className={`transition-colors duration-300 ${selectedPart ? 'text-primary font-medium' : ''}`}>Часть</span>
               <span className={`transition-colors duration-300 ${selectedMaterial ? 'text-primary font-medium' : ''}`}>Материал</span>
               <span className={`transition-colors duration-300 ${selectedSize ? 'text-primary font-medium' : ''}`}>Размер</span>
               <span className={`transition-colors duration-300 ${selectedServices.length > 0 ? 'text-primary font-medium' : ''}`}>Услуги</span>
               <span className={`transition-colors duration-300 ${selectedPart && selectedMaterial && selectedSize ? 'text-primary font-medium' : ''}`}>Готово</span>
             </div>
           </div>

           {/* Part Selection */}
           <div>
             <label className="block text-sm font-medium text-neutral-700 mb-3">
               Выберите часть памятника
             </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {parts.filter(part => part.isActive).map((part) => (
                                 <button
                   key={part.id}
                   onClick={() => setSelectedPart(part)}
                   className={`p-3 rounded-lg border-2 text-left transition-all duration-300 hover:scale-105 ${
                     selectedPart?.id === part.id
                       ? 'border-primary bg-primary/5 shadow-md'
                       : 'border-neutral-200 hover:border-neutral-300'
                   }`}
                 >
                  <div className="font-medium text-neutral-900">{part.name}</div>
                  {part.description && (
                    <div className="text-sm text-neutral-600">{part.description}</div>
                  )}
                </button>
              ))}
            </div>
          </div>

                     {/* Material Selection (only if part is selected) */}
           {selectedPart && (
             <div id="material-selection">
               <label className="block text-sm font-medium text-neutral-700 mb-3">
                 Выберите материал для {selectedPart.name.toLowerCase()}
               </label>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {materials.filter(material => material.isActive).map((material) => (
                                        <button
                       key={material.id}
                       onClick={() => {
                         setSelectedMaterial(material);
                         // Прокручиваем к выбору размера
                         scrollToElement('size-selection');
                       }}
                       className={`p-3 rounded-lg border-2 text-left transition-all duration-300 hover:scale-105 ${
                         selectedMaterial?.id === material.id
                           ? 'border-primary bg-primary/5 shadow-md'
                           : 'border-neutral-200 hover:border-neutral-300'
                       }`}
                     >
                     <div className="font-medium text-neutral-900">{material.name}</div>
                     <div className="text-sm text-neutral-600">{material.origin}</div>
                   </button>
                 ))}
               </div>
             </div>
           )}

                     {selectedMaterial && (
             <div id="size-selection">
               <label className="block text-sm font-medium text-neutral-700 mb-3">
                 Выберите размер
               </label>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {sizes.filter(size => size.isActive).map((size) => (
                                        <button
                       key={size.id}
                       onClick={() => {
                         setSelectedSize(size);
                         // Прокручиваем к выбору количества
                         scrollToElement('quantity-selection');
                       }}
                       className={`p-3 rounded-lg border-2 text-left transition-all duration-300 hover:scale-105 ${
                         selectedSize?.id === size.id
                           ? 'border-primary bg-primary/5 shadow-md'
                           : 'border-neutral-200 hover:border-neutral-300'
                       }`}
                     >
                     <div className="font-medium text-neutral-900">{size.name}</div>
                     <div className="text-sm text-neutral-600">{size.dimensions}</div>
                     <div className="text-lg font-bold text-primary">{size.price.toFixed(2)} руб.</div>
                   </button>
                 ))}
               </div>
             </div>
           )}

                     {/* Quantity Selection (only if size is selected) */}
           {selectedSize && (
             <div id="quantity-selection">
               <label className="block text-sm font-medium text-neutral-700 mb-3">
                 Количество
               </label>
               <div className="flex items-center space-x-4">
                 <button
                   onClick={() => {
                     setQuantity(prev => Math.max(1, prev - 1));
                     // Прокручиваем к услугам после изменения количества
                     scrollToElement('services-selection');
                   }}
                   className="w-10 h-10 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-50"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                   </svg>
                 </button>
                 <span className="text-xl font-bold text-neutral-900 min-w-[3rem] text-center">
                   {quantity}
                 </span>
                 <button
                   onClick={() => {
                     setQuantity(prev => prev + 1);
                     // Прокручиваем к услугам после изменения количества
                     scrollToElement('services-selection');
                   }}
                   className="w-10 h-10 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-50"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                   </svg>
                 </button>
               </div>
             </div>
           )}

                     {/* Additional Services Selection (only if size is selected) */}
           {selectedSize && (
             <div id="services-selection">
               <label className="block text-sm font-medium text-neutral-700 mb-3">
                 Дополнительные услуги
               </label>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {services.filter(service => service.isActive).map((service) => {
                   const isSelected = selectedServices.find(s => s.id === service.id);
                   return (
                     <button
                       key={service.id}
                       onClick={() => {
                         handleServiceToggle(service);
                         // Прокручиваем к итоговой цене после выбора услуги
                         scrollToElement('total-price');
                       }}
                       className={`p-3 rounded-lg border-2 text-left transition-all ${
                         isSelected
                           ? 'border-primary bg-primary/5'
                           : 'border-neutral-200 hover:border-neutral-300'
                       }`}
                     >
                       <div className="font-medium text-neutral-900">{service.name}</div>
                       <div className="text-lg font-bold text-primary">{service.price.toFixed(2)} руб.</div>
                     </button>
                   );
                 })}
               </div>
             </div>
           )}

                     {/* Total Price */}
           {selectedPart && selectedSize && (
             <div id="total-price" className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
               <div className="flex justify-between items-center">
                 <span className="text-lg font-medium text-neutral-700">Итого:</span>
                 <span className="text-2xl font-bold text-primary">
                   {calculateTotalPrice().toFixed(2)} руб.
                 </span>
               </div>
             </div>
           )}

           {/* Add Button */}
           <button
             id="add-to-order-btn"
             onClick={handleAddToSelections}
             disabled={!selectedPart || !selectedMaterial || !selectedSize}
             className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Добавить в заказ
           </button>
        </div>
      )}

             {/* Selections List */}
       {selections.length > 0 && (
         <div id="selections-list" className="border-t border-neutral-200">
           <div className="p-6">
             <h4 className="text-lg font-bold text-neutral-900 mb-4">Выбранные позиции</h4>
            <div className="space-y-3">
              {selections.map((selection, index) => (
                <div key={index} className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-neutral-900">
                        {selection.part.name}: {selection.material.name} / {selection.size.name}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {selection.size.dimensions} × {selection.quantity} шт.
                      </div>
                      <div className="text-sm text-neutral-600">
                        {selection.material.origin}
                      </div>
                       {selection.services.length > 0 && (
                         <div className="mt-2">
                           <div className="text-sm text-neutral-600 font-medium">Услуги:</div>
                           <div className="text-xs text-neutral-500">
                             {selection.services.map(service => service.name).join(', ')}
                           </div>
                         </div>
                       )}
                     </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="font-bold text-primary">
                          {selection.totalPrice.toFixed(2)} руб.
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveSelection(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Quantity adjustment for existing selections */}
                  <div className="mt-3 flex items-center space-x-3">
                    <span className="text-sm text-neutral-600">Количество:</span>
                    <button
                      onClick={() => handleUpdateSelection(index, 'quantity', Math.max(1, selection.quantity - 1))}
                      className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center hover:bg-neutral-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="font-medium text-neutral-900 min-w-[2rem] text-center">
                      {selection.quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateSelection(index, 'quantity', selection.quantity + 1)}
                      className="w-8 h-8 rounded border border-neutral-300 flex items-center justify-center hover:bg-neutral-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Total Order Price */}
            <div className="mt-6 bg-primary/5 rounded-xl p-4 border border-primary/20">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-neutral-900">Общая стоимость заказа:</span>
                <span className="text-3xl font-bold text-primary">
                  {totalOrderPrice.toFixed(2)} руб.
                </span>
              </div>
            </div>

            {/* Submit Order Button */}
            <div className="mt-6 flex space-x-3">
              <button
                onClick={handleSubmitOrder}
                className="flex-1 btn-primary py-3"
              >
                Оставить заявку
              </button>
                             <button
                 onClick={() => {
                   setSelections([]);
                   // Прокручиваем к началу формы
                   setTimeout(() => {
                     const calculatorForm = document.getElementById('calculator-form');
                     if (calculatorForm) {
                       calculatorForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                     }
                   }, 100);
                 }}
                 className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
               >
                 Очистить
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCalculator;
