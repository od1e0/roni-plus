import React, { useState } from 'react';
import type { Product } from '../types';
import { useParams } from 'react-router-dom';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState<number>(0);
  
  // Mock data for demonstration
  const product: Product = {
    id: '1',
    name: 'О-1',
    category: 'single',
    price: 1433.25,
    imageUrl: '/images/products/o-1.jpg',
    description: 'Одиночный памятник из черного гранита',
    materials: ['Черный гранит'],
    dimensions: {
      width: 100,
      height: 120,
      depth: 50,
    }
  };

  // Mock additional images
  const additionalImages = [
    '/images/products/o-1.jpg',
    '/images/products/o-1-side.jpg',
    '/images/products/o-1-back.jpg',
    '/images/products/o-1-detail.jpg',
  ];

  // Get category label
  const getCategoryLabel = (category: string) => {
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
                    src={additionalImages[activeImage]} 
                    alt={`${product.name} - изображение ${activeImage + 1}`} 
                    className="object-cover w-full h-full"
                  />
                  
                  {/* Image navigation buttons */}
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                    <button 
                      onClick={() => setActiveImage(prev => (prev === 0 ? additionalImages.length - 1 : prev - 1))}
                      className="bg-white/70 hover:bg-white text-neutral-800 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
                      aria-label="Предыдущее изображение"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => setActiveImage(prev => (prev === additionalImages.length - 1 ? 0 : prev + 1))}
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
                    {activeImage + 1} / {additionalImages.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {additionalImages.map((img, index) => (
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
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-light/20 text-primary-dark">
                    {getCategoryLabel(product.category)}
                  </span>
                </div>

                {/* Product title */}
                <h1 className="text-3xl sm:text-4xl font-bold font-heading text-neutral-900 mb-4">
                  {product.name}
                </h1>
                
                {/* Description */}
                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Specifications */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-neutral-900 mb-4">Характеристики</h2>
                  <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
                    <dl className="space-y-3">
                      {product.materials && (
                        <div className="grid grid-cols-2">
                          <dt className="text-neutral-600">Материалы:</dt>
                          <dd className="font-medium text-neutral-900">{product.materials.join(', ')}</dd>
                        </div>
                      )}
                      {product.dimensions && (
                        <>
                          {product.dimensions.width && (
                            <div className="grid grid-cols-2">
                              <dt className="text-neutral-600">Ширина:</dt>
                              <dd className="font-medium text-neutral-900">{product.dimensions.width} см</dd>
                            </div>
                          )}
                          {product.dimensions.height && (
                            <div className="grid grid-cols-2">
                              <dt className="text-neutral-600">Высота:</dt>
                              <dd className="font-medium text-neutral-900">{product.dimensions.height} см</dd>
                            </div>
                          )}
                          {product.dimensions.depth && (
                            <div className="grid grid-cols-2">
                              <dt className="text-neutral-600">Глубина:</dt>
                              <dd className="font-medium text-neutral-900">{product.dimensions.depth} см</dd>
                            </div>
                          )}
                        </>
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
                        {product.price > 0 && (
                          <span className="text-neutral-500">с установкой</span>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-neutral-500 mt-2 sm:mt-0">
                      * Окончательная стоимость зависит от выбранных опций
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/order-form"
                    className="btn-primary flex-1 py-3 text-center flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Заказать памятник
                  </a>
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

      {/* Additional Information Tabs */}
      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProductInfoTabs />
        </div>
      </section>
      
      {/* Related Products */}
      <section className="py-10 sm:py-12 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold font-heading text-neutral-900 mb-6">Похожие памятники</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Display related product cards here */}
            {[1, 2, 3, 4].map((num) => (
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Product Info Tabs Component
const ProductInfoTabs: React.FC = () => {
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
            <p>
              Памятник представляет собой классическую вертикальную стелу из высококачественного черного гранита. 
              Изделие отличается элегантной простотой форм и традиционным дизайном, что делает его универсальным 
              решением для установки на любом кладбище.
            </p>
            <p>
              Поверхность памятника тщательно отполирована до зеркального блеска, что придает изделию благородный внешний вид 
              и обеспечивает дополнительную защиту от атмосферных воздействий.
            </p>
            <p>
              На лицевой стороне памятника возможно нанесение портрета, эпитафии, имени и дат усопшего. 
              Гравировка выполняется современным оборудованием, что гарантирует высокое качество и долговечность изображения.
            </p>
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
        )}
        
        {activeTab === 'characteristics' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral-900">Технические характеристики</h3>
            <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <dt className="text-neutral-600">Материал:</dt>
                    <dd className="font-medium text-neutral-900">Черный гранит</dd>
                  </div>
                  <div className="grid grid-cols-2">
                    <dt className="text-neutral-600">Тип:</dt>
                    <dd className="font-medium text-neutral-900">Одиночный</dd>
                  </div>
                  <div className="grid grid-cols-2">
                    <dt className="text-neutral-600">Цвет:</dt>
                    <dd className="font-medium text-neutral-900">Черный</dd>
                  </div>
                  <div className="grid grid-cols-2">
                    <dt className="text-neutral-600">Отделка:</dt>
                    <dd className="font-medium text-neutral-900">Полировка</dd>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <dt className="text-neutral-600">Ширина:</dt>
                    <dd className="font-medium text-neutral-900">100 см</dd>
                  </div>
                  <div className="grid grid-cols-2">
                    <dt className="text-neutral-600">Высота:</dt>
                    <dd className="font-medium text-neutral-900">120 см</dd>
                  </div>
                  <div className="grid grid-cols-2">
                    <dt className="text-neutral-600">Глубина:</dt>
                    <dd className="font-medium text-neutral-900">50 см</dd>
                  </div>
                  <div className="grid grid-cols-2">
                    <dt className="text-neutral-600">Вес:</dt>
                    <dd className="font-medium text-neutral-900">~350 кг</dd>
                  </div>
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