import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { CalculatorService } from '../../services/calculator';
import type { CalculatorPart, CalculatorMaterial, CalculatorSize, CalculatorService } from '../../types';

const CalculatorPage: React.FC = () => {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<'parts' | 'materials' | 'sizes' | 'services'>('parts');
  const [selectedPartForMaterials, setSelectedPartForMaterials] = useState<CalculatorPart | null>(null);
  const [selectedPartForSizes, setSelectedPartForSizes] = useState<CalculatorPart | null>(null);
  
  const handleTabChange = (tab: 'parts' | 'materials' | 'sizes' | 'services') => {
    setActiveTab(tab);
    setError(null); // Очищаем ошибки при смене вкладки
    
    // Сбрасываем выбранные части при смене вкладки
    if (tab === 'materials') {
      setSelectedPartForMaterials(null);
    } else if (tab === 'sizes') {
      setSelectedPartForSizes(null);
    }
  };
  
  // Parts state
  const [parts, setParts] = useState<CalculatorPart[]>([]);
  const [newPart, setNewPart] = useState({ name: '', description: '' });
  const [editingPart, setEditingPart] = useState<CalculatorPart | null>(null);
  
  // Materials state
  const [materials, setMaterials] = useState<CalculatorMaterial[]>([]);
  const [newMaterial, setNewMaterial] = useState({ name: '', origin: '' });
  const [editingMaterial, setEditingMaterial] = useState<CalculatorMaterial | null>(null);
  const [editingMaterialPartId, setEditingMaterialPartId] = useState<string>('');
  
  // Sizes state
  const [sizes, setSizes] = useState<CalculatorSize[]>([]);
  const [newSize, setNewSize] = useState({ name: '', dimensions: '', price: '' });
  const [editingSize, setEditingSize] = useState<CalculatorSize | null>(null);
  const [editingSizePartId, setEditingSizePartId] = useState<string>('');
  
  // Services state
  const [services, setServices] = useState<CalculatorService[]>([]);
  const [newService, setNewService] = useState({ name: '', price: '' });
  const [editingService, setEditingService] = useState<CalculatorService | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCalculatorData();
  }, [token]);

  const fetchCalculatorData = async () => {
    try {
      setIsLoading(true);
      const [partsData, servicesData] = await Promise.all([
        CalculatorService.getParts(),
        CalculatorService.getServices()
      ]);
      
      setParts(partsData);
      setServices(servicesData);
      
      // Получаем все уникальные материалы и размеры для отображения
      const allMaterials = partsData.flatMap(part => part.materials || []);
      const uniqueMaterials = allMaterials.filter((material, index, self) => 
        index === self.findIndex(m => m.id === material.id)
      );
      setMaterials(uniqueMaterials);
      
      const allSizes = partsData.flatMap(part => part.sizes || []);
      const uniqueSizes = allSizes.filter((size, index, self) => 
        index === self.findIndex(s => s.id === size.id)
      );
      setSizes(uniqueSizes);
    } catch (error) {
      setError('Ошибка при загрузке данных калькулятора');
      console.error('Error fetching calculator data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Parts handlers
  const handleAddPart = async () => {
    if (!newPart.name) return;
    
    try {
      const part = await CalculatorService.addPart({
        name: newPart.name,
        description: newPart.description,
        isActive: true,
        order: parts.length + 1,
        materials: [], // Пустой массив материалов
        sizes: []      // Пустой массив размеров
      });
      
      setParts(prev => [...prev, part]);
      setNewPart({ name: '', description: '' });
      setError(null);
    } catch (error) {
      setError('Ошибка при добавлении части памятника');
      console.error('Error adding part:', error);
    }
  };

  const handleEditPart = (part: CalculatorPart) => {
    setEditingPart(part);
  };

  const handleUpdatePart = async () => {
    if (!editingPart) return;
    
    try {
      await CalculatorService.updatePart(editingPart);
      setParts(prev => prev.map(p => 
        p.id === editingPart.id ? editingPart : p
      ));
      setEditingPart(null);
      setError(null);
    } catch (error) {
      setError('Ошибка при обновлении части памятника');
      console.error('Error updating part:', error);
    }
  };

  const handleDeletePart = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту часть памятника?')) return;
    
    try {
      await CalculatorService.deletePart(id);
      setParts(prev => prev.filter(p => p.id !== id));
      setError(null);
    } catch (error) {
      setError('Ошибка при удалении части памятника');
      console.error('Error deleting part:', error);
    }
  };

  const handleTogglePartActive = async (id: string) => {
    try {
      const part = parts.find(p => p.id === id);
      if (part) {
        const updatedPart = { ...part, isActive: !part.isActive };
        await CalculatorService.updatePart(updatedPart);
        setParts(prev => prev.map(p => 
          p.id === id ? updatedPart : p
        ));
        setError(null);
      }
    } catch (error) {
      setError('Ошибка при изменении статуса части памятника');
      console.error('Error toggling part active:', error);
    }
  };

  // Materials handlers
  const handleAddMaterial = async () => {
    if (!newMaterial.name || !newMaterial.origin) return;
    
    if (!selectedPartForMaterials) {
      setError('Сначала выберите часть памятника для добавления материала');
      return;
    }
    
    try {
      const material = await CalculatorService.addMaterial({
        name: newMaterial.name,
        origin: newMaterial.origin,
        isActive: true,
        order: materials.length + 1
      }, selectedPartForMaterials.id);
      
      // Обновляем данные
      await fetchCalculatorData();
      setNewMaterial({ name: '', origin: '' });
      setError(null);
    } catch (error) {
      setError('Ошибка при добавлении материала');
      console.error('Error adding material:', error);
    }
  };

  const handleEditMaterial = (material: CalculatorMaterial) => {
    // Находим часть, к которой принадлежит материал
    const part = parts.find(p => p.materials?.some(m => m.id === material.id));
    if (part) {
      setEditingMaterial(material);
      setEditingMaterialPartId(part.id);
    }
  };

  const handleUpdateMaterial = async () => {
    if (!editingMaterial || !editingMaterialPartId) return;
    
    try {
      await CalculatorService.updateMaterial(editingMaterial, editingMaterialPartId);
      // Обновляем данные
      await fetchCalculatorData();
      setEditingMaterial(null);
      setEditingMaterialPartId('');
      setError(null);
    } catch (error) {
      setError('Ошибка при обновлении материала');
      console.error('Error updating material:', error);
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот материал?')) return;
    
    try {
      // Находим часть, к которой принадлежит материал
      const part = parts.find(p => p.materials?.some(m => m.id === id));
      if (!part) {
        setError('Не удалось найти часть для материала');
        return;
      }
      
      await CalculatorService.deleteMaterial(id, part.id);
      // Обновляем данные
      await fetchCalculatorData();
      setError(null);
    } catch (error) {
      setError('Ошибка при удалении материала');
      console.error('Error deleting material:', error);
    }
  };

  const handleToggleMaterialActive = async (id: string) => {
    try {
      const material = materials.find(m => m.id === id);
      if (material) {
        const updatedMaterial = { ...material, isActive: !material.isActive };
        // Находим часть, к которой принадлежит материал
        const part = parts.find(p => p.materials?.some(m => m.id === id));
        if (!part) {
          setError('Не удалось найти часть для материала');
          return;
        }
        
        await CalculatorService.updateMaterial(updatedMaterial, part.id);
        // Обновляем данные
        await fetchCalculatorData();
        setError(null);
      }
    } catch (error) {
      setError('Ошибка при изменении статуса материала');
      console.error('Error toggling material active:', error);
    }
  };

  // Sizes handlers
  const handleAddSize = async () => {
    if (!newSize.name || !newSize.dimensions || !newSize.price) return;
    
    if (!selectedPartForSizes) {
      setError('Сначала выберите часть памятника для добавления размера');
      return;
    }
    
    try {
      const size = await CalculatorService.addSize({
        name: newSize.name,
        dimensions: newSize.dimensions,
        price: parseFloat(newSize.price),
        isActive: true,
        order: sizes.length + 1
      }, selectedPartForSizes.id);
      
      // Обновляем данные
      await fetchCalculatorData();
      setNewSize({ name: '', dimensions: '', price: '' });
      setError(null);
    } catch (error) {
      setError('Ошибка при добавлении размера');
      console.error('Error adding size:', error);
    }
  };

  const handleEditSize = (size: CalculatorSize) => {
    // Находим часть, к которой принадлежит размер
    const part = parts.find(p => p.sizes?.some(s => s.id === size.id));
    if (part) {
      setEditingSize(size);
      setEditingSizePartId(part.id);
    }
  };

  const handleUpdateSize = async () => {
    if (!editingSize || !editingSizePartId) return;
    
    try {
      await CalculatorService.updateSize(editingSize, editingSizePartId);
      // Обновляем данные
      await fetchCalculatorData();
      setEditingSize(null);
      setEditingSizePartId('');
      setError(null);
    } catch (error) {
      setError('Ошибка при обновлении размера');
      console.error('Error updating size:', error);
    }
  };

  const handleDeleteSize = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот размер?')) return;
    
    try {
      // Находим часть, к которой принадлежит размер
      const part = parts.find(p => p.sizes?.some(s => s.id === id));
      if (!part) {
        setError('Не удалось найти часть для размера');
        return;
      }
      
      await CalculatorService.deleteSize(id, part.id);
      // Обновляем данные
      await fetchCalculatorData();
      setError(null);
    } catch (error) {
      setError('Ошибка при удалении размера');
      console.error('Error deleting size:', error);
    }
  };

  const handleToggleSizeActive = async (id: string) => {
    try {
      const size = sizes.find(s => s.id === id);
      if (size) {
        const updatedSize = { ...size, isActive: !size.isActive };
        // Находим часть, к которой принадлежит размер
        const part = parts.find(p => p.sizes?.some(s => s.id === id));
        if (!part) {
          setError('Не удалось найти часть для размера');
          return;
        }
        
        await CalculatorService.updateSize(updatedSize, part.id);
        // Обновляем данные
        await fetchCalculatorData();
        setError(null);
      }
    } catch (error) {
      setError('Ошибка при изменении статуса размера');
      console.error('Error toggling size active:', error);
    }
  };

  // Services handlers
  const handleAddService = async () => {
    if (!newService.name || !newService.price) return;
    
    try {
      const service = await CalculatorService.addService({
        name: newService.name,
        price: parseFloat(newService.price),
        isActive: true,
        order: services.length + 1
      });
      
      setServices(prev => [...prev, service]);
      setNewService({ name: '', price: '' });
      setError(null);
    } catch (error) {
      setError('Ошибка при добавлении услуги');
      console.error('Error adding service:', error);
    }
  };

  const handleEditService = (service: CalculatorService) => {
    setEditingService(service);
  };

  const handleUpdateService = async () => {
    if (!editingService) return;
    
    try {
      await CalculatorService.updateService(editingService);
      setServices(prev => prev.map(s => 
        s.id === editingService.id ? editingService : s
      ));
      setEditingService(null);
      setError(null);
    } catch (error) {
      setError('Ошибка при обновлении услуги');
      console.error('Error updating service:', error);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту услугу?')) return;
    
    try {
      await CalculatorService.deleteService(id);
      setServices(prev => prev.filter(s => s.id !== id));
      setError(null);
    } catch (error) {
      setError('Ошибка при удалении услуги');
      console.error('Error deleting service:', error);
    }
  };

  const handleToggleServiceActive = async (id: string) => {
    try {
      const service = services.find(s => s.id === id);
      if (service) {
        const updatedService = { ...service, isActive: !service.isActive };
        await CalculatorService.updateService(updatedService);
        setServices(prev => prev.map(s => 
          s.id === id ? updatedService : s
        ));
        setError(null);
      }
    } catch (error) {
      setError('Ошибка при изменении статуса услуги');
      console.error('Error toggling service active:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
             <div className="bg-white p-6 rounded-lg shadow-md">
         <h1 className="text-2xl font-bold">Управление калькулятором</h1>
         <p className="text-neutral-600 mt-2">
           Настройте материалы, размеры и дополнительные услуги для калькулятора стоимости
         </p>
         <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
           <h3 className="font-medium text-blue-900 mb-2">Как работает конструктор:</h3>
           <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
             <li><strong>1 этап:</strong> Добавьте части памятника (стелла, столбик, тумба и т.д.)</li>
             <li><strong>2 этап:</strong> Выберите часть и добавьте к ней доступные материалы</li>
             <li><strong>3 этап:</strong> Выберите часть и добавьте к ней размеры с ценами</li>
             <li><strong>4 этап:</strong> Настройте дополнительные услуги (общие для всех)</li>
           </ol>
         </div>
       </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => handleTabChange('parts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'parts'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Части памятника
            </button>
            <button
              onClick={() => handleTabChange('materials')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'materials'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Материалы
            </button>
            <button
              onClick={() => handleTabChange('sizes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sizes'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Размеры и цены
            </button>
            <button
              onClick={() => handleTabChange('services')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'services'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Дополнительные услуги
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Parts Tab */}
          {activeTab === 'parts' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Добавить часть памятника</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Название части"
                    value={newPart.name}
                    onChange={(e) => setNewPart(prev => ({ ...prev, name: e.target.value }))}
                    className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Описание (необязательно)"
                    value={newPart.description}
                    onChange={(e) => setNewPart(prev => ({ ...prev, description: e.target.value }))}
                    className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    onClick={handleAddPart}
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Добавить
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Список частей памятника</h3>
                <div className="space-y-3">
                  {parts.map((part) => (
                    <div key={part.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={part.isActive}
                          onChange={() => handleTogglePartActive(part.id)}
                          className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                        />
                                                 <div>
                           <div className="font-medium text-neutral-900">{part.name}</div>
                           {part.description && (
                             <div className="text-sm text-neutral-600">{part.description}</div>
                           )}
                           <div className="text-xs text-neutral-500 mt-1">
                             Материалов: {part.materials?.length || 0} | Размеров: {part.sizes?.length || 0}
                           </div>
                         </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditPart(part)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeletePart(part.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

                     {/* Materials Tab */}
           {activeTab === 'materials' && (
             <div className="space-y-6">
               {/* Выбор части для добавления материалов */}
               <div>
                 <h3 className="text-lg font-medium text-neutral-900 mb-4">Выберите часть памятника для добавления материалов</h3>
                 {parts.length === 0 ? (
                   <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                     <p className="text-yellow-800">
                       Сначала добавьте части памятника на вкладке "Части памятника"
                     </p>
                   </div>
                 ) : (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                     {parts.map((part) => (
                       <button
                         key={part.id}
                         onClick={() => setSelectedPartForMaterials(part)}
                         className={`p-3 rounded-lg border-2 text-left transition-all ${
                           selectedPartForMaterials?.id === part.id
                             ? 'border-primary bg-primary/5'
                             : 'border-neutral-200 hover:border-neutral-300'
                         }`}
                       >
                         <div className="font-medium text-neutral-900">{part.name}</div>
                         {part.description && (
                           <div className="text-sm text-neutral-600">{part.description}</div>
                         )}
                         <div className="text-xs text-neutral-500 mt-1">
                           Материалов: {part.materials?.length || 0}
                         </div>
                       </button>
                     ))}
                   </div>
                 )}
               </div>

                                {/* Форма добавления материала (только если выбрана часть) */}
                 {selectedPartForMaterials && (
                   <div>
                     <div className="flex items-center justify-between mb-4">
                       <h3 className="text-lg font-medium text-neutral-900">
                         Добавить материал для {selectedPartForMaterials.name}
                       </h3>
                       <button
                         onClick={() => setSelectedPartForMaterials(null)}
                         className="text-sm text-neutral-500 hover:text-neutral-700"
                       >
                         Сменить часть
                       </button>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                       <input
                         type="text"
                         placeholder="Название материала"
                         value={newMaterial.name}
                         onChange={(e) => setNewMaterial(prev => ({ ...prev, name: e.target.value }))}
                         className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                       />
                       <input
                         type="text"
                         placeholder="Происхождение"
                         value={newMaterial.origin}
                         onChange={(e) => setNewMaterial(prev => ({ ...prev, origin: e.target.value }))}
                         className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                       />
                       <button
                         onClick={handleAddMaterial}
                         className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                       >
                         Добавить
                       </button>
                     </div>
                   </div>
                 )}

                             <div>
                 <h3 className="text-lg font-medium text-neutral-900 mb-4">Список материалов по частям</h3>
                 <div className="space-y-6">
                   {parts.map((part) => {
                     const partMaterials = part.materials || [];
                     if (partMaterials.length === 0) return null;
                     
                     return (
                       <div key={part.id} className="border border-neutral-200 rounded-lg p-4">
                         <h4 className="font-medium text-neutral-900 mb-3">{part.name}</h4>
                         <div className="space-y-3">
                           {partMaterials.map((material) => (
                             <div key={material.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                               <div className="flex items-center space-x-4">
                                 <input
                                   type="checkbox"
                                   checked={material.isActive}
                                   onChange={() => handleToggleMaterialActive(material.id)}
                                   className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                                 />
                                 <div>
                                   <div className="font-medium text-neutral-900">{material.name}</div>
                                   <div className="text-sm text-neutral-600">{material.origin}</div>
                                 </div>
                               </div>
                               <div className="flex items-center space-x-2">
                                 <button
                                   onClick={() => handleEditMaterial(material)}
                                   className="text-blue-600 hover:text-blue-800 p-1"
                                 >
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                   </svg>
                                 </button>
                                 <button
                                   onClick={() => handleDeleteMaterial(material.id)}
                                   className="text-red-600 hover:text-red-800 p-1"
                                 >
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                   </svg>
                                 </button>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                     );
                   })}
                 </div>
               </div>
            </div>
          )}

                     {/* Sizes Tab */}
           {activeTab === 'sizes' && (
             <div className="space-y-6">
               {/* Выбор части для добавления размеров */}
               <div>
                 <h3 className="text-lg font-medium text-neutral-900 mb-4">Выберите часть памятника для добавления размеров</h3>
                 {parts.length === 0 ? (
                   <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                     <p className="text-yellow-800">
                       Сначала добавьте части памятника на вкладке "Части памятника"
                     </p>
                   </div>
                 ) : (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                     {parts.map((part) => (
                       <button
                         key={part.id}
                         onClick={() => setSelectedPartForSizes(part)}
                         className={`p-3 rounded-lg border-2 text-left transition-all ${
                           selectedPartForSizes?.id === part.id
                             ? 'border-primary bg-primary/5'
                             : 'border-neutral-200 hover:border-neutral-300'
                         }`}
                       >
                         <div className="font-medium text-neutral-900">{part.name}</div>
                         {part.description && (
                           <div className="text-sm text-neutral-600">{part.description}</div>
                         )}
                         <div className="text-xs text-neutral-500 mt-1">
                           Размеров: {part.sizes?.length || 0}
                         </div>
                       </button>
                     ))}
                   </div>
                 )}
               </div>

                                {/* Форма добавления размера (только если выбрана часть) */}
                 {selectedPartForSizes && (
                   <div>
                     <div className="flex items-center justify-between mb-4">
                       <h3 className="text-lg font-medium text-neutral-900">
                         Добавить размер для {selectedPartForSizes.name}
                       </h3>
                       <button
                         onClick={() => setSelectedPartForSizes(null)}
                         className="text-sm text-neutral-500 hover:text-neutral-700"
                       >
                         Сменить часть
                       </button>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                       <input
                         type="text"
                         placeholder="Название"
                         value={newSize.name}
                         onChange={(e) => setNewSize(prev => ({ ...prev, name: e.target.value }))}
                         className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                       />
                       <input
                         type="text"
                         placeholder="Размеры (см)"
                         value={newSize.dimensions}
                         onChange={(e) => setNewSize(prev => ({ ...prev, dimensions: e.target.value }))}
                         className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                       />
                       <input
                         type="number"
                         step="0.01"
                         placeholder="Цена (руб.)"
                         value={newSize.price}
                         onChange={(e) => setNewSize(prev => ({ ...prev, price: e.target.value }))}
                         className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                       />
                       <button
                         onClick={handleAddSize}
                         className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                       >
                         Добавить
                       </button>
                     </div>
                   </div>
                 )}

                             <div>
                 <h3 className="text-lg font-medium text-neutral-900 mb-4">Список размеров по частям</h3>
                 <div className="space-y-6">
                   {parts.map((part) => {
                     const partSizes = part.sizes || [];
                     if (partSizes.length === 0) return null;
                     
                     return (
                       <div key={part.id} className="border border-neutral-200 rounded-lg p-4">
                         <h4 className="font-medium text-neutral-900 mb-3">{part.name}</h4>
                         <div className="space-y-3">
                           {partSizes.map((size) => (
                             <div key={size.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                               <div className="flex items-center space-x-4">
                                 <input
                                   type="checkbox"
                                   checked={size.isActive}
                                   onChange={() => handleToggleSizeActive(size.id)}
                                   className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                                 />
                                 <div>
                                   <div className="font-medium text-neutral-900">{size.name}</div>
                                   <div className="text-sm text-neutral-600">{size.dimensions}</div>
                                   <div className="text-lg font-bold text-primary">{size.price.toFixed(2)} руб.</div>
                                 </div>
                               </div>
                               <div className="flex items-center space-x-2">
                                 <button
                                   onClick={() => handleEditSize(size)}
                                   className="text-blue-600 hover:text-blue-800 p-1"
                                 >
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                   </svg>
                                 </button>
                                 <button
                                   onClick={() => handleDeleteSize(size.id)}
                                   className="text-red-600 hover:text-red-800 p-1"
                                 >
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                   </svg>
                                 </button>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                     );
                   })}
                 </div>
               </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Добавить услугу</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Название услуги"
                    value={newService.name}
                    onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                    className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Цена (руб.)"
                    value={newService.price}
                    onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                    className="px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    onClick={handleAddService}
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Добавить
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-neutral-900 mb-4">Список услуг</h3>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={service.isActive}
                          onChange={() => handleToggleServiceActive(service.id)}
                          className="h-4 w-4 text-primary focus:ring-primary border-neutral-300 rounded"
                        />
                        <div>
                          <div className="font-medium text-neutral-900">{service.name}</div>
                          <div className="text-lg font-bold text-primary">{service.price.toFixed(2)} руб.</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditService(service)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modals */}
      {editingPart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Редактировать часть памятника</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Название части"
                value={editingPart.name}
                onChange={(e) => setEditingPart(prev => prev ? { ...prev, name: e.target.value } : null)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Описание (необязательно)"
                value={editingPart.description || ''}
                onChange={(e) => setEditingPart(prev => prev ? { ...prev, description: e.target.value } : null)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleUpdatePart}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => setEditingPart(null)}
                  className="flex-1 bg-neutral-300 text-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-400 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Редактировать материал</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Название материала"
                value={editingMaterial.name}
                onChange={(e) => setEditingMaterial(prev => prev ? { ...prev, name: e.target.value } : null)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Происхождение"
                value={editingMaterial.origin}
                onChange={(e) => setEditingMaterial(prev => prev ? { ...prev, origin: e.target.value } : null)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleUpdateMaterial}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => setEditingMaterial(null)}
                  className="flex-1 bg-neutral-300 text-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-400 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingSize && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Редактировать размер</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Название"
                value={editingSize.name}
                onChange={(e) => setEditingSize(prev => prev ? { ...prev, name: e.target.value } : null)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Размеры (см)"
                value={editingSize.dimensions}
                onChange={(e) => setEditingSize(prev => prev ? { ...prev, dimensions: e.target.value } : null)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Цена (руб.)"
                value={editingSize.price}
                onChange={(e) => setEditingSize(prev => prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : null)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleUpdateSize}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => setEditingSize(null)}
                  className="flex-1 bg-neutral-300 text-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-400 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Редактировать услугу</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Название услуги"
                value={editingService.name}
                onChange={(e) => setEditingService(prev => prev ? { ...prev, name: e.target.value } : null)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Цена (руб.)"
                value={editingService.price}
                onChange={(e) => setEditingService(prev => prev ? { ...prev, price: parseFloat(e.target.value) || 0 } : null)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleUpdateService}
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => setEditingService(null)}
                  className="flex-1 bg-neutral-300 text-neutral-700 px-4 py-2 rounded-md hover:bg-neutral-400 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorPage;
