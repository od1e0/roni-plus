import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Product, Category, CalculatorOrderData } from '../types';
import { ProductService, CategoryService } from '../services/api';
import ProductCalculator from '../components/ProductCalculator';
import OrderModal from '../components/OrderModal';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState<number>(0);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingRelated, setIsLoadingRelated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [calculatorOrderData, setCalculatorOrderData] = useState<CalculatorOrderData | undefined>(undefined);
  
  // Fetch product data from the API
  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Fetch categories first
        try {
          const categoriesData = await CategoryService.getAllCategories();
          setCategories(categoriesData);
        } catch (categoriesError) {
          console.log('Could not fetch categories:', categoriesError);
          setCategories([]);
        }
        
        const productData = await ProductService.getProduct(id);
        setProduct(productData);
        
        // Fetch related products (same category)
        if (productData.category) {
          setIsLoadingRelated(true);
          try {
            const relatedData = await ProductService.getProductsByCategory(productData.category);
            // Filter out the current product and limit to 4
            const filtered = relatedData
              .filter((p: { id: string; }) => p.id !== id)
              .slice(0, 4);
              
            setRelatedProducts(filtered);
          } catch (relatedError) {
            console.log('Could not fetch related products:', relatedError);
            // If we can't fetch related products, we'll show an empty state
            setRelatedProducts([]);
          } finally {
            setIsLoadingRelated(false);
          }
        }
      } catch (err) {
        setError('Не удалось загрузить данные о товаре');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProductData();
  }, [id]);

  // Get category label
  const getCategoryLabel = (category: string) => {
    // First try to find in API categories
    const apiCategory = categories.find(cat => cat.id === category);
    if (apiCategory) {
      return apiCategory.name;
    }
    
    // Fallback to hardcoded categories
    switch (category) {
      case 'single': return 'Одиночный';
      case 'double': return 'Двойной';
      case 'exclusive': return 'Эксклюзивный';
      case 'kids': return 'Детский';
      case 'granite': return 'Гранитная крошка';
      case 'complex': return 'Комплекс';
      case 'art': return 'Худ. оформление';
      case 'fences': return 'Ограда';
      case 'vases': return 'Ваза';
      default: return category;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          {error || 'Товар не найден'}
        </h2>
        <p className="text-neutral-600 mb-4">К сожалению, запрашиваемый товар недоступен.</p>
        <button 
          onClick={() => navigate('/products')}
          className="btn-primary px-6 py-2"
        >
          Вернуться в каталог
        </button>
      </div>
    );
  }
  
  // Get images array from the product
  const productImages = product.images && product.images.length > 0 ? 
    product.images : 
    [ ''];  // Fallback for old product format

  return (
    <>
      {/* Page Header - Breadcrumbs */}
      <section className="bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm">
            <a href="/" className="text-neutral-600 hover:text-primary">Главная</a>
            <span className="mx-2 text-neutral-400">/</span>
            <a href="/products" className="text-neutral-600 hover:text-primary">Каталог</a>
            <span className="mx-2 text-neutral-400">/</span>
            <a href={`/products/${product.category}`} className="text-neutral-600 hover:text-primary">
              {getCategoryLabel(product.category)}
            </a>
            <span className="mx-2 text-neutral-400">/</span>
            <span className="text-primary">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-neutral-200">
            <div className="p-6 md:p-8 lg:flex lg:gap-12">
              {/* Product Images Gallery */}
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <div className="relative aspect-w-4 aspect-h-3 bg-neutral-100 rounded-xl overflow-hidden mb-4">
                  <img 
                    src={productImages[activeImage]} 
                    alt={`${product.name} - изображение ${activeImage + 1}`} 
                    className="object-cover w-full h-full"
                  />
                  
                  {/* Image navigation buttons */}
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <button 
                      onClick={() => setActiveImage(prev => (prev === 0 ? productImages.length - 1 : prev - 1))}
                      className="bg-white/70 hover:bg-white text-neutral-800 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
                      aria-label="Предыдущее изображение"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setActiveImage(prev => (prev === productImages.length - 1 ? 0 : prev + 1))}
                      className="bg-white/70 hover:bg-white text-neutral-800 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
                      aria-label="Следующее изображение"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Image counter indicator */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    {activeImage + 1} / {productImages.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {productImages.map((img, index) => (
                    <button 
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${
                        activeImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={img}
                        alt={`${product.name} - миниатюра ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Product Details */}
              <div className="lg:w-1/2">
                {/* Category badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-light/20 text-primary-dark break-words text-center max-w-32">
                    {getCategoryLabel(product.category)}
                  </span>
                </div>

                {/* Product title */}
                <h1 className="text-3xl sm:text-4xl font-bold font-heading text-neutral-900 mb-4 break-words leading-tight">
                  {product.name}
                </h1>
                
                {/* Description */}
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed break-words">
                  {product.description}
                </p>

                {/* Specifications */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">Характеристики</h2>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                    <dl className="space-y-3">
                      {product.material && (
                        <div className="grid grid-cols-2">
                          <dt className="text-neutral-600">Материал:</dt>
                          <dd className="font-medium text-neutral-900 break-words">{product.material}</dd>
                        </div>
                      )}
                      {product.type && (
                        <div className="grid grid-cols-2">
                          <dt className="text-neutral-600">Тип:</dt>
                          <dd className="font-medium text-neutral-900 break-words">{product.type}</dd>
                        </div>
                      )}
                      {product.color && (
                        <div className="grid grid-cols-2">
                          <dt className="text-neutral-600">Цвет:</dt>
                          <dd className="font-medium text-neutral-900 break-words">{product.color}</dd>
                        </div>
                      )}
                      {product.finish && (
                        <div className="grid grid-cols-2">
                          <dt className="text-neutral-600">Отделка:</dt>
                          <dd className="font-medium text-neutral-900 break-words">{product.finish}</dd>
                        </div>
                      )}
                      {product.width && (
                        <div className="grid grid-cols-2">
                          <dt className="text-neutral-600">Ширина:</dt>
                          <dd className="font-medium text-neutral-900">{product.width} см</dd>
                        </div>
                      )}
                      {product.height && (
                        <div className="grid grid-cols-2">
                          <dt className="text-neutral-600">Высота:</dt>
                          <dd className="font-medium text-neutral-900">{product.height} см</dd>
                        </div>
                      )}
                      {product.depth && (
                        <div className="grid grid-cols-2">
                          <dt className="text-neutral-600">Глубина:</dt>
                          <dd className="font-medium text-neutral-900">{product.depth} см</dd>
                        </div>
                      )}
                      {product.weight && (
                        <div className="grid grid-cols-2">
                          <dt className="text-neutral-600">Вес:</dt>
                          <dd className="font-medium text-neutral-900">{product.weight} кг</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>

                {/* Price section */}
                <div className="mb-8 bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                  <div className="flex flex-wrap justify-between items-end">
                    <div>
                      <p className="text-neutral-500 text-sm">Цена:</p>
                      <div className="flex items-baseline">
                        <h3 className="text-3xl font-bold text-neutral-900 mr-3">
                          {product.price > 0 ? `${product.price.toFixed(2)} руб.` : 'По запросу'}
                        </h3>
                      </div>
                    </div>
                    <div className="text-xs text-neutral-500 mt-2 sm:mt-0">
                      * Окончательная стоимость зависит от выбранных опций
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setIsOrderModalOpen(true)}
                    className="btn-primary flex-1 py-3 text-center flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Оставить заявку
                  </button>
                  <a 
                    href="tel:+375297912384" 
                    className="btn-secondary flex-1 py-3 text-center flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Консультация
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Calculator */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                      <ProductCalculator 
              onAddToOrder={(selections) => {
                console.log('Order selections:', selections);
                // Здесь можно добавить логику для отправки заказа
                alert('Заказ добавлен! Общая стоимость: ' + 
                  selections.reduce((sum, s) => sum + s.totalPrice, 0).toFixed(2) + ' руб.');
              }}
              onOpenOrderModal={(calculatorData) => {
                setCalculatorOrderData(calculatorData);
                setIsOrderModalOpen(true);
              }}
              onOrderSubmitted={() => {
                // Сбрасываем данные калькулятора после успешной отправки заявки
                setCalculatorOrderData(undefined);
              }}
            />
        </div>
      </section>

      {/* Additional Information Tabs */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProductInfoTabs product={product} />
        </div>
      </section>
      
      {/* Related Products */}
      <section className="py-10 sm:py-12 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-heading text-neutral-900 mb-6">Похожие памятники</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Display related product cards here */}
            {isLoadingRelated ? (
              // Loading skeleton for related products
              [1, 2, 3, 4].map((num) => (
                <div key={num} className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                  <div className="aspect-w-3 aspect-h-2 bg-neutral-100">
                    <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100 animate-pulse"></div>
                  </div>
                  <div className="p-4">
                    <div className="h-6 bg-neutral-200 rounded w-2/3 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-neutral-200 rounded w-1/2 mb-4 animate-pulse"></div>
                    <div className="h-8 bg-neutral-200 rounded w-1/3 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : relatedProducts.length > 0 ? (
              relatedProducts.map((relatedProduct) => (
                <a 
                  href={`/products/detail/${relatedProduct.id}`}
                  key={relatedProduct.id} 
                  className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-w-3 aspect-h-2 bg-neutral-100">
                    <img 
                      src={(relatedProduct.images && relatedProduct.images[0]) || ''}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1">{relatedProduct.name}</h3>
                    <p className="text-sm text-neutral-600 mb-2">{getCategoryLabel(relatedProduct.category)}</p>
                    <p className="font-bold text-lg">{relatedProduct.price.toFixed(2)} руб.</p>
                  </div>
                </a>
              ))
            ) : (
              // Show message when no related products are available
              <div className="col-span-full text-center py-12">
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">Нет похожих памятников</h3>
                  <p className="text-neutral-600 mb-6">В данной категории пока нет других памятников</p>
                  <a 
                    href="/products" 
                    className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Посмотреть все памятники
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
                 </div>
       </section>
       
             {/* Order Modal */}
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => {
          setIsOrderModalOpen(false);
          setCalculatorOrderData(undefined);
        }} 
        calculatorData={calculatorOrderData}
        onCalculatorReset={() => {
          setCalculatorOrderData(undefined);
          // Здесь можно также сбросить данные в калькуляторе, если нужно
        }}
        onOrderSubmitted={() => {
          setCalculatorOrderData(undefined);
        }}
      />
     </>
   );
 };

// Product Info Tabs Component
const ProductInfoTabs: React.FC<{ product: Product }> = ({ product }) => {
  const [activeTab, setActiveTab] = useState<string>('description');
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-neutral-200 overflow-x-auto">
        <TabButton 
          isActive={activeTab === 'description'} 
          onClick={() => setActiveTab('description')}
        >
          Описание
        </TabButton>
        <TabButton 
          isActive={activeTab === 'characteristics'} 
          onClick={() => setActiveTab('characteristics')}
        >
          Характеристики
        </TabButton>
        <TabButton 
          isActive={activeTab === 'delivery'} 
          onClick={() => setActiveTab('delivery')}
        >
          Доставка и установка
        </TabButton>
        <TabButton 
          isActive={activeTab === 'warranty'} 
          onClick={() => setActiveTab('warranty')}
        >
          Гарантия
        </TabButton>
      </div>
      
      {/* Tab Content */}
      <div className="p-6 md:p-8">
        {activeTab === 'description' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral-900">Детальное описание памятника</h3>
            {product.description ? (
              <div>
                <p>{product.description}</p>
                <div>
                  <h4 className="text-md font-bold text-neutral-900 mb-2">Возможные варианты оформления:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Фотогравировка портрета</li>
                    <li>Художественная гравировка с объемным эффектом</li>
                    <li>Нанесение эпитафии любой сложности</li>
                    <li>Декоративные элементы (розы, кресты, ангелы и т.д.)</li>
                    <li>Золочение текста и элементов декора</li>
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-neutral-500">Описание товара отсутствует</p>
            )}
          </div>
        )}
        
        {activeTab === 'characteristics' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral-900">Технические характеристики</h3>
            <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {product.material && (
                    <div className="grid grid-cols-2">
                      <dt className="text-neutral-600">Материал:</dt>
                      <dd className="font-medium text-neutral-900">{product.material}</dd>
                    </div>
                  )}
                  {product.type && (
                    <div className="grid grid-cols-2">
                      <dt className="text-neutral-600">Тип:</dt>
                      <dd className="font-medium text-neutral-900">{product.type}</dd>
                    </div>
                  )}
                  {product.color && (
                    <div className="grid grid-cols-2">
                      <dt className="text-neutral-600">Цвет:</dt>
                      <dd className="font-medium text-neutral-900">{product.color}</dd>
                    </div>
                  )}
                  {product.finish && (
                    <div className="grid grid-cols-2">
                      <dt className="text-neutral-600">Отделка:</dt>
                      <dd className="font-medium text-neutral-900">{product.finish}</dd>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {product.width && (
                    <div className="grid grid-cols-2">
                      <dt className="text-neutral-600">Ширина:</dt>
                      <dd className="font-medium text-neutral-900">{product.width} см</dd>
                    </div>
                  )}
                  {product.height && (
                    <div className="grid grid-cols-2">
                      <dt className="text-neutral-600">Высота:</dt>
                      <dd className="font-medium text-neutral-900">{product.height} см</dd>
                    </div>
                  )}
                  {product.depth && (
                    <div className="grid grid-cols-2">
                      <dt className="text-neutral-600">Глубина:</dt>
                      <dd className="font-medium text-neutral-900">{product.depth} см</dd>
                    </div>
                  )}
                  {product.weight && (
                    <div className="grid grid-cols-2">
                      <dt className="text-neutral-600">Вес:</dt>
                      <dd className="font-medium text-neutral-900">{product.weight} кг</dd>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p>
              Возможно изготовление памятника по индивидуальным размерам. 
              Для получения точной информации о доступных вариантах, пожалуйста, обратитесь к нашим специалистам.
            </p>
          </div>
        )}
        
        {activeTab === 'delivery' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral-900">Доставка и установка</h3>
            <p>
              Наша компания предлагает полный комплекс услуг по доставке и установке памятников. 
              После изготовления памятника мы доставим его к месту установки и профессионально установим 
              с соблюдением всех технологических требований.
            </p>
            <div className="space-y-4 mt-6">
              <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                <h4 className="text-primary font-bold mb-2">Доставка</h4>
                <p>
                  Доставка осуществляется специализированным транспортом с соблюдением всех мер 
                  предосторожности для исключения повреждений изделия. Стоимость доставки 
                  рассчитывается индивидуально в зависимости от расстояния и сложности подъезда.
                </p>
              </div>
              <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                <h4 className="text-primary font-bold mb-2">Установка</h4>
                <p>
                  Установка включает в себя подготовку основания, устройство фундамента и монтаж 
                  памятника с использованием профессионального оборудования. Все работы проводятся 
                  опытными специалистами с многолетним стажем.
                </p>
              </div>
              <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                <h4 className="text-primary font-bold mb-2">Сроки</h4>
                <p>
                  Стандартный срок изготовления памятника составляет от 20 до 30 рабочих дней. 
                  Доставка и установка занимают от 1 до 3 дней в зависимости от расстояния и 
                  сложности работ. В летний период возможно увеличение сроков из-за высокой загрузки.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'warranty' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral-900">Гарантийные обязательства</h3>
            <p>
              Мы предоставляем гарантию на все изготовленные нами памятники. Срок гарантии составляет 
              5 лет с момента установки памятника и распространяется на качество материала, качество 
              изготовления и установки памятника.
            </p>
            
            <div className="mt-4">
              <h4 className="text-md font-bold text-neutral-900 mb-2">Гарантия распространяется на:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Целостность конструкции памятника</li>
                <li>Отсутствие трещин и сколов, вызванных производственным браком</li>
                <li>Устойчивость памятника на фундаменте</li>
                <li>Качество гравировки и нанесенных изображений</li>
              </ul>
            </div>
            
            <div className="mt-4">
              <h4 className="text-md font-bold text-neutral-900 mb-2">Гарантия не распространяется на случаи:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Механических повреждений, нанесенных после установки памятника</li>
                <li>Естественного износа и выцветания под воздействием окружающей среды</li>
                <li>Повреждений, вызванных стихийными бедствиями</li>
                <li>Нарушения правил ухода за памятником</li>
              </ul>
            </div>
            
            <p className="mt-4">
              При обнаружении дефектов, подпадающих под условия гарантии, мы бесплатно устраним их 
              или заменим изделие на аналогичное. Для получения гарантийного обслуживания необходимо 
              предоставить документы, подтверждающие факт приобретения памятника у нашей компании.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Tab Button Component
const TabButton: React.FC<{
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 text-sm font-medium whitespace-nowrap flex-shrink-0 border-b-2 transition-all ${
      isActive 
        ? 'border-primary text-primary' 
        : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
    }`}
  >
    {children}
  </button>
);

export default ProductDetailPage;