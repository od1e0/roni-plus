import React, { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import { Product } from '../types';
import { ProductService, WorksService } from '../services/api';
import OrderForm from '../components/OrderForm';

interface Work {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const HomePage: React.FC = () => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch recent products and works from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch products
        const productsData = await ProductService.getAllProducts();
        // Take the 3 most recent products
        const recent = productsData.slice(0, 3);
        setRecentProducts(recent);
        
        // Fetch works using the service
        try {
          const worksData = await WorksService.getAllWorks();
          setWorks(worksData);
        } catch (worksError) {
          console.log('Works data not available yet:', worksError);
          // Use placeholder data for works if API not ready
          setWorks([
            {
              id: '1',
              title: 'Памятник из гранита',
              description: 'Одиночный памятник из черного гранита с гравировкой',
              imageUrl: 'https://www.roni.by/storage/products/October2022/6zwKri3lTZMLzl0RWRJE.jpg'
            },
            {
              id: '2',
              title: 'Комплекс из гранита',
              description: 'Двойной памятник с оградой и благоустройством',
              imageUrl: 'https://www.roni.by/storage/products/October2022/ZZqLBdK5TrDO3f9VtmBE.jpg'
            },
            {
              id: '3',
              title: 'Эксклюзивный памятник',
              description: 'Индивидуальный дизайн с резными элементами',
              imageUrl: 'https://www.roni.by/storage/products/October2022/luDrZZlgSNIdmwxt6JRa.jpg'
            },
            {
              id: '4',
              title: 'Памятник с фотогравировкой',
              description: 'Детализированная гравировка портрета',
              imageUrl: 'https://www.roni.by/storage/products/January2022/TlkKyrxYJq6mvTjcWYvi.jpg'
            }
          ]);
        }
      } catch (err) {
        setError('Не удалось загрузить данные');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        {/* Hero Background with Monument Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-80 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://th.bing.com/th/id/OIP.JylY0qRvPHz3dyZaXH9p5wHaFZ?w=292&h=213&c=7&r=0&o=5&pid=1.7')] bg-cover bg-center"></div>
        
        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl xs:text-5xl sm:text-6xl font-bold text-white font-heading leading-tight">
              Памятники в городе Ивацевичи
            </h1>
            <p className="mt-6 text-base sm:text-xl text-white/90 max-w-xl mx-auto">
              Изготовление и продажа памятников с индивидуальным подходом к каждому заказу
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/products" 
                className="btn-primary text-lg py-3 px-8"
              >
                Посмотреть каталог
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="/contact" 
                className="btn-secondary text-lg py-3 px-8"
              >
                Связаться с нами
              </a>
            </div>
          </div>
        </div>
        
        {/* Hero wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#F7FAFC" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,224C384,224,480,256,576,261.3C672,267,768,245,864,213.3C960,181,1056,139,1152,138.7C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Наши преимущества</span>
            <h2 className="mt-3 text-3xl font-bold font-heading text-neutral-900 sm:text-4xl lg:text-5xl">Почему выбирают нас</h2>
            <div className="mx-auto mt-4 max-w-3xl">
              <p className="text-neutral-600">Мы предлагаем полный комплекс услуг по изготовлению и установке памятников с безупречным качеством</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="Высокое качество"
              description="Мы используем только лучшие материалы и современное оборудование для создания памятников, которые служат десятилетиями."
            />
            
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Быстрые сроки"
              description="Мы понимаем важность времени и гарантируем изготовление памятника в оптимальные сроки без потери качества."
            />
            
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="Доступные цены"
              description="Работаем напрямую с производителями сырья, что позволяет нам предлагать выгодные цены без посредников."
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Каталог</span>
            <h2 className="mt-3 text-3xl font-bold font-heading text-neutral-900 sm:text-4xl lg:text-5xl">Популярные модели</h2>
            <div className="mx-auto mt-4 max-w-3xl">
              <p className="text-neutral-600">Качественные памятники различных типов и размеров для любых требований и бюджета</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              // Loading placeholders
              [...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
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
            ) : error ? (
              <div className="col-span-3 py-10 text-center">
                <p className="text-red-500">{error}</p>
              </div>
            ) : recentProducts.length === 0 ? (
              <div className="col-span-3 py-10 text-center">
                <p className="text-neutral-500">Нет доступных товаров</p>
              </div>
            ) : (
              recentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/products" 
              className="btn-primary"
            >
              Смотреть все памятники
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">О компании</span>
              <h2 className="mt-3 text-3xl font-bold font-heading text-neutral-900 sm:text-4xl">
                РоНи-плюс — 15 лет опыта
              </h2>
              <p className="mt-6 text-neutral-600">
                Наша компания предлагает широкий ассортимент памятников различных типов и размеров. 
                Мы изготавливаем памятники из высококачественных материалов с учетом всех пожеланий заказчика.
              </p>
              <p className="mt-4 text-neutral-600">
                Мы предлагаем полный комплекс услуг: от разработки дизайна до установки и ухода за памятником. Наша команда состоит из профессионалов с многолетним опытом работы.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  'Большой выбор моделей памятников',
                  'Индивидуальный подход к каждому заказу',
                  'Гарантия качества на все изделия',
                  'Профессиональный монтаж и установка'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-3 text-neutral-600">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <a 
                  href="/about" 
                  className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
                >
                  Узнать больше о нас
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src="https://talkingstone.ru/wp-content/uploads/2024/01/rabota-lazernogo-stanka-v-magazine-pamyatnikov-scaled-1110x600.jpg" 
                    alt="Мастерская по изготовлению памятников" 
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Works Section with Carousel */}
      <section className="py-16 sm:py-24 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Портфолио</span>
            <h2 className="mt-3 text-3xl font-bold font-heading text-neutral-900 sm:text-4xl lg:text-5xl">Наши работы</h2>
            <div className="mx-auto mt-4 max-w-3xl">
              <p className="text-neutral-600">Примеры выполненных нами работ и уже установленных памятников</p>
            </div>
          </div>
          
          {/* Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: 'translateX(0%)' }} id="worksCarousel">
                {/* Work Items */}
                {isLoading ? (
                  // Loading placeholders
                  [...Array(4)].map((_, index) => (
                    <div key={index} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                      <div className="rounded-xl overflow-hidden shadow-md mb-4 bg-white">
                        <div className="relative pt-[75%] bg-neutral-100 animate-pulse"></div>
                        <div className="p-4">
                          <div className="h-5 bg-neutral-200 rounded w-2/3 mb-2 animate-pulse"></div>
                          <div className="h-4 bg-neutral-200 rounded w-full animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : works.length === 0 ? (
                  <div className="w-full text-center py-10">
                    <p className="text-neutral-500">Нет доступных работ</p>
                  </div>
                ) : (
                  works.map((work) => (
                    <div key={work.id} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3">
                      <div className="rounded-xl overflow-hidden shadow-md mb-4 bg-white">
                        <div className="relative pt-[75%]">
                          <img 
                            src={work.imageUrl}
                            alt={work.title} 
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-neutral-800">{work.title}</h4>
                          <p className="text-neutral-600 text-sm mt-2">{work.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button 
              className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none hover:bg-neutral-100 z-10"
              id="prevButton"
              onClick={() => {
                const carousel = document.getElementById('worksCarousel');
                if (carousel) {
                  const currentTranslate = parseInt(carousel.style.transform.replace(/[^-0-9]/g, '') || '0');
                  const newTranslate = Math.min(0, currentTranslate + 100);
                  carousel.style.transform = `translateX(${newTranslate}%)`;
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md focus:outline-none hover:bg-neutral-100 z-10"
              id="nextButton"
              onClick={() => {
                const carousel = document.getElementById('worksCarousel');
                if (carousel) {
                  const currentTranslate = parseInt(carousel.style.transform.replace(/[^-0-9]/g, '') || '0');
                  // Limit to -300% (4 items * 100% - number of visible items)
                  const newTranslate = Math.max(-200, currentTranslate - 100);
                  carousel.style.transform = `translateX(${newTranslate}%)`;
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-6">
            <button className="h-3 w-3 rounded-full bg-primary"></button>
            <button className="h-3 w-3 rounded-full bg-neutral-300 hover:bg-primary-light transition-colors"></button>
            <button className="h-3 w-3 rounded-full bg-neutral-300 hover:bg-primary-light transition-colors"></button>
          </div>
          
          <div className="text-center mt-10">
            <a 
              href="/works" 
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
            >
              Смотреть все работы
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Отзывы</span>
            <h2 className="mt-3 text-3xl font-bold font-heading text-neutral-900 sm:text-4xl lg:text-5xl">
              Что говорят наши клиенты
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Елена Иванова"
              role="Клиент"
              content="Очень благодарна компании за качественную работу и внимательное отношение. Памятник для моего отца сделали точно в срок, с учетом всех пожеланий."
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
            />
            <TestimonialCard
              name="Алексей Петров"
              role="Клиент"
              content="Профессиональный подход и высокое качество исполнения. Мастера РоНи-плюс воплотили в камне именно то, что мы хотели. Спасибо за чуткое отношение в трудный для нас период."
              featured={true}
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
            />
            <TestimonialCard
              name="Ирина Сидорова"
              role="Клиент"
              content="Выражаю благодарность всему коллективу за отзывчивость и понимание. Памятник получился очень красивый, а цена приятно удивила."
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150"
            />
          </div>
        </div>
      </section>

      {/* Contact Section with Map */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">Контакты</span>
            <h2 className="mt-3 text-3xl font-bold font-heading text-neutral-900 sm:text-4xl lg:text-5xl">
              Свяжитесь с нами
            </h2>
            <div className="mx-auto mt-4 max-w-3xl">
              <p className="text-neutral-600">
                У вас есть вопросы? Мы всегда готовы помочь и проконсультировать по любым вопросам.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact information */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden p-6 lg:col-span-1">
              <h3 className="text-xl font-bold font-heading text-neutral-800 mb-6">Наши контакты</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral-800">Адрес</p>
                    <p className="mt-1 text-sm text-neutral-600">Брестская область, Ивацевичский район, д. Плехово, ул Центральная, 1</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral-800">Телефоны</p>
                    <p className="mt-1 text-sm text-neutral-600">+375 (29) 791 23 84</p>
                    <p className="mt-1 text-sm text-neutral-600">+375 (29) 791 23 95</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral-800">Email</p>
                    <p className="mt-1 text-sm text-primary">info@roniplus.by</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-neutral-800">Режим работы</p>
                    <p className="mt-1 text-sm text-neutral-600">Пн-Пт: 9:00 - 18:00</p>
                    <p className="text-sm text-neutral-600">Сб: 10:00 - 15:00</p>
                    <p className="text-sm text-neutral-600">Вс: Выходной</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form and map */}
            <div className="lg:col-span-2">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 h-full">
                <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
                  <h3 className="text-xl font-bold font-heading text-neutral-800 mb-6">Оставьте заявку</h3>
                  
                  <OrderForm />
                </div>
                
                <div className="rounded-2xl overflow-hidden shadow-card h-full bg-neutral-100 flex flex-col">
                  {/* Interactive Yandex Map  52.787312, 25.432513*/}
                  <div className="h-full min-h-[350px] relative flex-grow">
                    <iframe
                       src="https://yandex.ru/map-widget/v1/?z=15&ll=25.432305%2C52.787380&l=map&pt=25.432305%2C52.787380,pm2rdm"
                      width="100%"
                      height="100%"
                      style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      allowFullScreen={true}
                      loading="lazy"
                      title="Местоположение компании РоНи-плюс"
                    ></iframe>
                  </div>
                  <div className="p-3 bg-white border-t border-neutral-200">
                    <a 
                      href="https://yandex.ru/maps/?rtext=~52.787380,25.432305&rtt=auto"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Построить маршрут
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      

    </>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-white rounded-2xl p-8 shadow-card border border-neutral-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold font-heading text-neutral-800 mb-4">{title}</h3>
    <p className="text-neutral-600">{description}</p>
  </div>
);

// Testimonial Card Component
const TestimonialCard: React.FC<{
  name: string;
  role: string;
  content: string;
  featured?: boolean;
  image?: string;
}> = ({ name, role, content, featured = false }) => (
  <div className={`rounded-2xl p-8 ${
    featured 
      ? 'bg-primary text-white shadow-lg transform md:-translate-y-4' 
      : 'bg-white text-neutral-800 shadow-card'
  }`}>
    <div className={`mb-6 ${featured ? 'text-white/90' : 'text-neutral-600'}`}>
      <svg className="h-8 w-8 mb-4 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
      </svg>
      <p className="text-base sm:text-lg">"{content}"</p>
    </div>
    <div className="flex items-center">
      <div className={`h-10 w-10 rounded-full bg-${featured ? 'white/20' : 'primary/10'} flex items-center justify-center mr-3`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${featured ? 'text-white' : 'text-primary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      <div>
        <h4 className={`font-bold ${featured ? 'text-white' : 'text-neutral-800'}`}>{name}</h4>
        <p className={`text-sm ${featured ? 'text-white/70' : 'text-neutral-500'}`}>{role}</p>
      </div>
    </div>
  </div>
);

export default HomePage;