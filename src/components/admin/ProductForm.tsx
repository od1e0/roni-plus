import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AdminService } from '../../services/api';

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  isEditing?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ isEditing = false }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  // Specifications
  const [material, setMaterial] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [finish, setFinish] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [depth, setDepth] = useState('');
  const [weight, setWeight] = useState('');
  
  // Sale fields
  const [isOnSale, setIsOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState('');
  const [salePercentage, setSalePercentage] = useState('');
  const [saleEndDate, setSaleEndDate] = useState('');
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!token) throw new Error('No token provided');
        const data = await AdminService.getAdminCategories(token);
        setCategories(data);
      } catch (error) {
        setError('Ошибка при загрузке категорий');
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [token]);

  // Fetch product data if editing
  useEffect(() => {
    if (isEditing && id) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          if (!token) throw new Error('No product ID provided');
          const product = await AdminService.getAdminProduct(id.toString(), token);
          
          setName(product.name);
          setDescription(product.description || '');
          setPrice(product.price.toString());
          setSelectedCategories(product.categories || []);
          setPreviewUrls(product.images || []);
          
          // Set specifications
          setMaterial(product.material || '');
          setType(product.type || '');
          setColor(product.color || '');
          setFinish(product.finish || '');
          setWidth(product.width ? product.width.toString() : '');
          setHeight(product.height ? product.height.toString() : '');
          setDepth(product.depth ? product.depth.toString() : '');
          setWeight(product.weight ? product.weight.toString() : '');
          
          // Set sale fields
          setIsOnSale(product.isOnSale || false);
          setSalePrice(product.salePrice ? product.salePrice.toString() : '');
          setSalePercentage(product.salePercentage ? product.salePercentage.toString() : '');
          setSaleEndDate(product.saleEndDate || '');
        } catch (error) {
          setError('Ошибка при загрузке товара');
          console.error('Error fetching product:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProduct();
    }
  }, [isEditing, id, token]);

  // Автоматический расчет процента скидки при изменении цен
  useEffect(() => {
    if (isOnSale && salePrice && price) {
      const regularPrice = parseFloat(price);
      const discountPrice = parseFloat(salePrice);
      
      if (regularPrice > 0 && discountPrice > 0 && discountPrice < regularPrice) {
        const percentage = Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
        setSalePercentage(percentage.toString());
      }
    }
  }, [isOnSale, salePrice, price]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      setImageFiles(prev => [...prev, ...newFiles]);
      
      // Create preview URLs for each file
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const handleImageUrlAdd = () => {
    const url = document.getElementById('imageUrlInput') as HTMLInputElement;
    if (url.value) {
      setPreviewUrls(prev => [...prev, url.value]);
      setPreviewUrls(prev => [...prev, url.value]);
      url.value = '';
    }
  };
  
  const removeImage = (index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    
    // If it's a file, remove from imageFiles
    if (index < imageFiles.length) {
      setImageFiles(prev => prev.filter((_, i) => i !== index));
    } else {
      // If it's a URL, remove from imageUrls
      const urlIndex = index - imageFiles.length;
      // This part of the logic is no longer needed as imageUrls is removed
      // setImageUrls(prev => prev.filter((_, i) => i !== urlIndex));
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Валидация скидочных полей
      if (isOnSale) {
        if (!salePrice || parseFloat(salePrice) <= 0) {
          setError('Для товара на распродаже необходимо указать цену со скидкой');
          setIsSubmitting(false);
          return;
        }
        
        if (parseFloat(salePrice) >= parseFloat(price)) {
          setError('Цена со скидкой должна быть меньше обычной цены');
          setIsSubmitting(false);
          return;
        }
        
        if (!saleEndDate) {
          setError('Для товара на распродаже необходимо указать дату окончания скидки');
          setIsSubmitting(false);
          return;
        }
      }
      
      // Автоматический расчет процента скидки
      let calculatedSalePercentage: number | undefined;
      if (isOnSale && salePrice && price) {
        const regularPrice = parseFloat(price);
        const discountPrice = parseFloat(salePrice);
        calculatedSalePercentage = Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
      }
      
      const productData = {
        name,
        description,
        price: parseFloat(price),
        categories: selectedCategories,
        images: [...previewUrls], // Combining all images (both uploaded and URLs)
        material,
        type,
        color,
        finish,
        width: width ? parseFloat(width) : undefined,
        height: height ? parseFloat(height) : undefined,
        depth: depth ? parseFloat(depth) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        // Sale fields
        isOnSale,
        salePrice: isOnSale && salePrice ? parseFloat(salePrice) : undefined,
        salePercentage: calculatedSalePercentage,
        saleEndDate: isOnSale && saleEndDate ? saleEndDate : undefined,
      };
      
      // Логирование для отладки
      console.log('=== PRODUCT FORM SUBMIT DEBUG ===');
      console.log('Form data:', {
        isOnSale,
        salePrice,
        saleEndDate,
        calculatedSalePercentage
      });
      console.log('Product data to send:', productData);
      console.log('=== PRODUCT FORM SUBMIT DEBUG END ===\n');
      
      if (isEditing && id && token) {
        await AdminService.updateProduct(id, productData, token);
      } else {
        if (!token) throw new Error('No token provided');
        await AdminService.createProduct(productData, token);
      }
      
      // Redirect to products list
      navigate('/admin/products');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка при сохранении товара';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Редактирование товара' : 'Добавление товара'}
      </h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Specifications section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Технические характеристики</h3>
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Материал *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  required
                  placeholder="Например: Черный гранит"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Тип *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                  placeholder="Например: Одиночный"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Цвет *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                    placeholder="Например: Черный"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Отделка *</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={finish}
                    onChange={(e) => setFinish(e.target.value)}
                    required
                    placeholder="Например: Полировка"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ширина (см) *</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    required
                    min="0"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Высота (см) *</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Глубина (см) *</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    required
                    min="0"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Вес (кг)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[150px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Цена *
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
                required
              />
            </div>
            
            {/* Sale Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Управление скидками
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isOnSale"
                    checked={isOnSale}
                    onChange={(e) => setIsOnSale(e.target.checked)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isOnSale" className="ml-2 block text-sm font-medium text-gray-700">
                    Товар на распродаже
                  </label>
                </div>
                
                {isOnSale && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-red-200">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Цена со скидкой (руб.)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                        min="0"
                        step="0.01"
                        placeholder="Введите цену со скидкой"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Процент скидки (%)
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={salePercentage}
                        onChange={(e) => setSalePercentage(e.target.value)}
                        min="0"
                        max="100"
                        step="1"
                        placeholder="Например: 20"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Дата окончания скидки
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={saleEndDate}
                        onChange={(e) => setSaleEndDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="bg-red-50 border border-red-200 rounded-md p-3">
                        <div className="flex">
                          <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="text-sm text-red-700">
                            <p className="font-medium">Информация о скидке:</p>
                            <ul className="mt-1 list-disc list-inside space-y-1">
                              <li>Цена со скидкой должна быть меньше обычной цены</li>
                              <li>Процент скидки рассчитывается автоматически</li>
                              <li>После окончания скидки товар вернется к обычной цене</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Изображения *
              </label>
              <div className="mb-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={url} 
                        alt={`Preview ${index + 1}`} 
                        className="w-full h-24 object-cover border rounded-md"
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
                
                <div className="flex flex-col space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Загрузить новые изображения
                    </label>
                    <input 
                      type="file" 
                      multiple
                      accept="image/*" 
                      onChange={handleImageChange} 
                      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Или добавить по URL
                    </label>
                    <div className="flex">
                      <input
                        id="imageUrlInput"
                        type="text"
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="https://example.com/image.jpg"
                      />
                      <button
                        type="button"
                        onClick={handleImageUrlAdd}
                        className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary-dark"
                      >
                        Добавить
                      </button>
                    </div>
                  </div>
                </div>
                
                {previewUrls.length === 0 && (
                  <p className="text-red-500 text-sm mt-2">* Необходимо добавить хотя бы одно изображение</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Категории
              </label>
              <div className="border border-gray-300 rounded-md p-3 max-h-[200px] overflow-y-auto">
                {categories.length === 0 ? (
                  <p className="text-sm text-gray-500">Нет доступных категорий</p>
                ) : (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded text-primary focus:ring-primary"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryToggle(category.id)}
                        />
                        <span className="text-sm">{category.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={() => navigate('/admin/products')}
          >
            Отмена
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;