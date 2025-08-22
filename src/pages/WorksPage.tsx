import React, { useState, useEffect } from 'react';
import { Work } from '../types';
import { WorksService } from '../services/api';

const WorksPage: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch works data from the API
  useEffect(() => {
    const fetchWorksData = async () => {
      try {
        setIsLoading(true);
        const worksData = await WorksService.getAllWorks();
        setWorks(worksData);
      } catch (err) {
        setError('Не удалось загрузить данные о работах');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWorksData();
  }, []);

  // Filter categories
  const categories = [
    { id: 'all', name: 'Все работы' },
    { id: 'single', name: 'Одиночные' },
    { id: 'double', name: 'Двойные' },
    { id: 'complex', name: 'Комплексы' },
    { id: 'kids', name: 'Детские' },
    { id: 'art', name: 'Художественное оформление' },
    { id: 'fences', name: 'Ограды' },
    { id: 'vases', name: 'Вазы' },
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  const [activeWork, setActiveWork] = useState<Work | null>(null);

  // Get category label
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'single': return 'Одиночные';
      case 'double': return 'Двойные';
      case 'exclusive': return 'Эксклюзивные';
      case 'kids': return 'Детские';
      case 'granite': return 'Гранитная крошка';
      case 'complex': return 'Комплексы';
      case 'art': return 'Художественное оформление';
      case 'fences': return 'Ограды';
      case 'vases': return 'Вазы';
      default: return category;
    }
  };

  // Filter works based on selected category
  const filteredWorks = activeFilter === 'all' 
    ? works 
    : works.filter(work => work.category === activeFilter);

  // Open work modal
  const openWorkModal = (work: Work) => {
    setActiveWork(work);
    document.body.classList.add('overflow-hidden');
  };

  // Close work modal
  const closeWorkModal = () => {
    setActiveWork(null);
    document.body.classList.remove('overflow-hidden');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          {error}
        </h2>
        <p className="text-neutral-600 mb-4">К сожалению, не удалось загрузить данные о работах.</p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-primary px-6 py-2"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading">Наши работы</h1>
            <p className="mt-4 text-lg text-white/80">
              Примеры выполненных памятников и мемориальных комплексов
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors text-center break-words max-w-xs ${
                  activeFilter === category.id
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Works Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">Работы не найдены</h3>
                <p className="text-neutral-600">Пока нет добавленных работ в портфолио</p>
              </div>
            ) : filteredWorks.length > 0 ? (
              filteredWorks.map((work) => (
                <div
                  key={work.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 cursor-pointer transition-all hover:shadow-md"
                  onClick={() => openWorkModal(work)}
                >
                  {/* Work Image */}
                  <div className="aspect-w-4 aspect-h-3 bg-neutral-100">
                    {work.imageUrl ? (
                      <img 
                        src={work.imageUrl} 
                        alt={work.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100 flex items-center justify-center">
                        <p className="text-center text-neutral-500">{work.title}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-neutral-900 line-clamp-1">{work.title}</h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {work.year}
                      </span>
                    </div>
                    <p className="text-neutral-600 text-sm mb-2 line-clamp-2">{work.description}</p>
                    <div className="text-xs text-neutral-500">{work.location}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-neutral-600 text-lg">Работы данной категории не найдены</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 sm:py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-neutral-900">
              Процесс нашей работы
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              От идеи до готового памятника
            </p>
          </div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-24 left-0 w-full h-0.5 bg-neutral-200"></div>
            
            {/* Timeline Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <TimelineStep 
                number="01"
                title="Консультация и дизайн"
                description="Обсуждение всех деталей заказа и разработка индивидуального дизайн-проекта"
              />
              <TimelineStep 
                number="02"
                title="Изготовление"
                description="Работа с камнем, точная резка и обработка по согласованным размерам"
              />
              <TimelineStep 
                number="03"
                title="Художественное оформление"
                description="Гравировка, нанесение изображений, декоративных элементов"
              />
              <TimelineStep 
                number="04"
                title="Доставка и установка"
                description="Профессиональная доставка и установка памятника на месте"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">Гарантия качества</span>
              <h2 className="mt-3 text-3xl font-bold font-heading text-neutral-900">
                Мы гарантируем качество наших работ
              </h2>
              <div className="mt-6 prose prose-lg text-neutral-600">
                <p>
                  Каждый памятник создается с особым вниманием к деталям и качеству исполнения. 
                  Мы используем только проверенные материалы и современные технологии.
                </p>
                <p>
                  На все наши работы предоставляется гарантия 5 лет. В течение гарантийного срока 
                  мы бесплатно устраняем любые дефекты, возникшие по нашей вине.
                </p>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-neutral-600">Качественные материалы от проверенных поставщиков</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-neutral-600">Опытные мастера с многолетним стажем работы</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-neutral-600">Современное оборудование для обработки камня</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-neutral-600">Строгий контроль качества на всех этапах производства</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Image placeholders - in real implementation these would be actual images */}
              <div className="rounded-xl overflow-hidden bg-neutral-100 h-64">
                <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100"></div>
              </div>
              <div className="rounded-xl overflow-hidden bg-neutral-100 h-64">
                <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100"></div>
              </div>
              <div className="rounded-xl overflow-hidden bg-neutral-100 h-64 col-span-2">
                <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-neutral-200 max-w-5xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-neutral-900 mb-4">
                Готовы заказать памятник?
              </h2>
              <p className="text-lg text-neutral-600 mb-8 max-w-3xl mx-auto">
                Свяжитесь с нами для консультации и оформления заказа. Мы поможем выбрать подходящую модель и материалы.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/contact" className="btn-primary py-3 px-8">
                  Оформить заказ
                </a>
                <a href="/products" className="btn-secondary py-3 px-8">
                  Смотреть каталог
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Detail Modal */}
      {activeWork && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-neutral-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeWorkModal}></div>
            
            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button 
                  type="button"
                  className="bg-white rounded-full p-1 text-neutral-400 hover:text-neutral-500"
                  onClick={closeWorkModal}
                >
                  <span className="sr-only">Закрыть</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="sm:flex sm:items-start p-0">
                <div className="sm:flex-1 sm:flex sm:flex-col">
                  {/* Work Image */}
                  <div className="aspect-w-16 aspect-h-9 bg-neutral-100">
                    {activeWork.imageUrl ? (
                      <img 
                        src={activeWork.imageUrl} 
                        alt={activeWork.title}
                        className="w-full h-72 object-cover"
                      />
                    ) : (
                      <div className="w-full h-72 bg-gradient-to-br from-neutral-200 to-neutral-100 flex items-center justify-center">
                        <p className="text-center text-neutral-500">Изображение работы</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-neutral-900 break-words leading-tight flex-1 mr-4">{activeWork.title}</h3>
                      <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full flex-shrink-0">
                        {activeWork.year}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-neutral-600 mb-4 break-words">{activeWork.description}</p>
                        <div className="space-y-2">
                          <div className="flex">
                            <span className="font-medium text-neutral-700 w-24">Категория:</span>
                            <span className="text-neutral-600 break-words">
                              {getCategoryLabel(activeWork.category)}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="font-medium text-neutral-700 w-24">Локация:</span>
                            <span className="text-neutral-600 break-words">{activeWork.location}</span>
                          </div>
                          <div className="flex">
                            <span className="font-medium text-neutral-700 w-24">Год:</span>
                            <span className="text-neutral-600">{activeWork.year}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-neutral-900 mb-3">Особенности работы</h4>
                        <ul className="space-y-2 text-neutral-600">
                          <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Индивидуальный дизайн
                          </li>
                          <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Высококачественные материалы
                          </li>
                          <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Точная гравировка
                          </li>
                          <li className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Профессиональная установка
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-neutral-200">
                      <h4 className="text-lg font-medium text-neutral-900 mb-3">Хотите похожую работу?</h4>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a href="/contact" className="btn-primary">
                          Получить консультацию
                        </a>
                        <a href="/products" className="btn-secondary">
                          Смотреть каталог
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Timeline Step Component
const TimelineStep: React.FC<{
  number: string;
  title: string;
  description: string;
}> = ({ number, title, description }) => (
  <div className="relative">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mb-4 z-10">
        {number}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-2 text-center break-words leading-tight">{title}</h3>
      <p className="text-neutral-600 text-center break-words leading-relaxed">{description}</p>
    </div>
  </div>
);

export default WorksPage;