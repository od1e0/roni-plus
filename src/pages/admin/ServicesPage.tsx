import React, { useState, useEffect } from 'react';
import { Service } from '../../types';
import { ServiceService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const ServicesPage: React.FC = () => {
  const { token } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: 0,
    category: '',
    isActive: true,
    images: [] as string[]
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const data = await ServiceService.getAllServices();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...fileArray]);
      
      // Create preview URLs for each file
      fileArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    
    // If it's a file, remove from imageFiles
    if (index < imageFiles.length) {
      setImageFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use previewUrls as the main source of images (both existing and new)
      const allImages = [...previewUrls];
      
      const submitData = {
        name: formData.name,
        description: formData.description,
        shortDescription: formData.shortDescription,
        price: formData.price,
        category: formData.category,
        isActive: formData.isActive,
        images: allImages
      };

      if (!token) {
        throw new Error('No authentication token');
      }
      
      if (editingService) {
        await ServiceService.updateService(editingService.id, submitData, token);
      } else {
        await ServiceService.createService(submitData, token);
      }
      setIsModalOpen(false);
      setEditingService(null);
      setFormData({ 
        name: '', 
        description: '', 
        shortDescription: '',
        price: 0, 
        category: '', 
        isActive: true,
        images: []
      });
      setImageFiles([]);
      setPreviewUrls([]);
      fetchServices();
    } catch (error) {
      console.error('Failed to save service:', error);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      shortDescription: service.shortDescription || '',
      price: service.price || 0,
      category: service.category || '',
      isActive: service.isActive,
      images: [] // Очищаем images, так как будем использовать только previewUrls
    });
    // Set existing images as preview URLs
    setPreviewUrls(service.images || []);
    setImageFiles([]);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту услугу?')) {
      try {
        if (!token) {
          throw new Error('No authentication token');
        }
        await ServiceService.deleteService(id, token);
        fetchServices();
      } catch (error) {
        console.error('Failed to delete service:', error);
      }
    }
  };

  const handleToggleActive = async (service: Service) => {
    try {
      if (!token) {
        throw new Error('No authentication token');
      }
      const updateData = {
        name: service.name,
        description: service.description,
        shortDescription: service.shortDescription,
        price: service.price,
        category: service.category,
        isActive: !service.isActive,
        images: service.images || []
      };
      await ServiceService.updateService(service.id, updateData, token);
      fetchServices();
    } catch (error) {
      console.error('Failed to toggle service status:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-neutral-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Управление услугами</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Добавить услугу
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {services.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            <p>Услуги не найдены</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Название
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Описание
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Категория
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Цена
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Фото работ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">{service.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-neutral-500 max-w-xs truncate">
                        {service.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-500">{service.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-500">
                        {service.price ? `${service.price} ₽` : 'По запросу'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {service.images && service.images.length > 0 ? (
                          <div className="flex space-x-1">
                            {service.images.slice(0, 3).map((image, index) => (
                              <div key={index} className="w-8 h-8 rounded-md overflow-hidden border border-neutral-200 service-image-container">
                                <img 
                                  src={image} 
                                  alt={`Service ${index + 1}`} 
                                  className="service-thumbnail"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </div>
                            ))}
                            {service.images.length > 3 && (
                              <div className="w-8 h-8 rounded-md bg-neutral-100 flex items-center justify-center text-xs text-neutral-500">
                                +{service.images.length - 3}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-neutral-400">Нет изображений</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(service)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          service.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {service.isActive ? 'Активна' : 'Неактивна'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-primary hover:text-primary-dark"
                        >
                          Редактировать
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingService ? 'Редактировать услугу' : 'Добавить услугу'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Название
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Краткое описание (для карточек)
                </label>
                <textarea
                  value={formData.shortDescription || ''}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={2}
                  placeholder="Краткое описание услуги для отображения на карточке..."
                />
                <p className="text-xs text-neutral-500 mt-1">
                  Будет отображаться на карточке услуги в списке
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Полное описание
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Категория
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Цена (₽)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  min="0"
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-neutral-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-neutral-700">Активна</span>
                </label>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Фотографии работ
                </label>
                
                {/* Preview existing and new images */}
                {previewUrls.length > 0 && (
                  <div className="mt-2 mb-4">
                    <p className="text-sm text-neutral-600 mb-2">Изображения: {previewUrls.length}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative group service-image-container">
                          <img 
                            src={url} 
                            alt={`Preview ${index + 1}`} 
                            className="admin-image-preview"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-white/70 hover:bg-white text-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  {/* File upload */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Загрузить новые изображения
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                    />
                    <p className="text-xs text-neutral-500 mt-1">
                      Выберите одну или несколько фотографий работ по данной услуге. Поддерживаются форматы: JPG, PNG, GIF
                    </p>
                  </div>
                  
                  {/* URL input */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Или добавить по URL
                    </label>
                    <div className="flex">
                      <input
                        id="imageUrlInput"
                        type="text"
                        className="flex-grow px-3 py-2 border border-neutral-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="https://example.com/image.jpg"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.target as HTMLInputElement;
                            if (input.value.trim()) {
                              setPreviewUrls(prev => [...prev, input.value.trim()]);
                              input.value = '';
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('imageUrlInput') as HTMLInputElement;
                          if (input.value.trim()) {
                            setPreviewUrls(prev => [...prev, input.value.trim()]);
                            input.value = '';
                          }
                        }}
                        className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary-dark"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingService(null);
                    setFormData({ 
                      name: '', 
                      description: '', 
                      shortDescription: '',
                      price: 0, 
                      category: '', 
                      isActive: true,
                      images: []
                    });
                    setImageFiles([]);
                    setPreviewUrls([]);
                  }}
                  className="px-4 py-2 text-neutral-700 bg-neutral-200 rounded-lg hover:bg-neutral-300"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                  {editingService ? 'Сохранить' : 'Добавить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage; 