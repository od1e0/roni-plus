import React, { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import { Product } from '../types';
import { ProductService } from '../services/api';

const SalePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        setIsLoading(true);
        const allProducts = await ProductService.getAllProducts();
        
        const saleProducts = allProducts.filter((product: Product) => {
          if (!product.isOnSale || !product.salePrice || product.salePrice <= 0) {
            return false;
          }
          if (product.saleEndDate) {
            const endDate = new Date(product.saleEndDate);
            const now = new Date();
            if (endDate < now) {
              return false;
            }
          }
          return true;
        });
        
        setProducts(saleProducts);
      } catch (err) {
        setError('Не удалось загрузить товары распродажи');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-neutral-200 rounded-lg w-1/3 mx-auto mb-8"></div>
            <div className="h-6 bg-neutral-200 rounded w-1/2 mx-auto mb-12"></div>
            <div className="h-32 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="h-48 bg-neutral-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">Ошибка загрузки</h1>
            <p className="text-neutral-600 text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary-dark opacity-95"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-fixed opacity-20"></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-full text-sm font-semibold mb-8 shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Ограниченное время
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white font-heading leading-tight mb-8">
              Распродажа памятников
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto mb-10 leading-relaxed font-light">
              Специальные предложения на качественные памятники и сопутствующие товары. 
              Выгодные цены при сохранении высокого качества исполнения.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/products" 
                className="btn-primary text-lg py-4 px-10 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Перейти к каталогу
              </a>
              
              <a 
                href="/contact" 
                className="btn-secondary text-lg py-4 px-10 rounded-xl border-2 border-white text-black hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Получить консультацию
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293H9.414a1 1 0 01-.707-.293L6.293 15.707A1 1 0 005 15.414V13M4 13h2m8 0h2" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6 font-heading">
                Товары распродажи не найдены
              </h2>
              <p className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                В данный момент нет товаров со скидкой. Загляните позже или свяжитесь с нами 
                для получения специальных предложений и индивидуальных условий.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="/products" 
                  className="btn-primary text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Перейти к каталогу
                </a>
                <a 
                  href="/contact" 
                  className="btn-secondary text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Связаться с нами
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 font-heading">
                  Товары со скидкой
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                  Найдено {products.length} товаров с привлекательными скидками. 
                  Выберите подходящий вариант и воспользуйтесь выгодным предложением.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="relative group">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-neutral-900 mb-8 font-heading">
              Преимущества покупки на распродаже
            </h3>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Мы предлагаем не только выгодные цены, но и гарантированное качество всех товаров
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-neutral-900 mb-4">Ограниченное время</h4>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Скидки действуют только до указанной даты. Не упустите возможность 
                приобрести качественный товар по выгодной цене.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-neutral-900 mb-4">Специальные цены</h4>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Скидки до 50% на выбранные товары. Мы регулярно обновляем ассортимент 
                распродажи для вашего удобства.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-neutral-900 mb-4">Гарантия качества</h4>
              <p className="text-neutral-600 leading-relaxed text-lg">
                Все товары распродажи имеют такую же гарантию качества, как и товары 
                по полной цене. Мы не экономим на качестве.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-dark to-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl lg:text-5xl font-bold text-white mb-8 font-heading">
            Нужна консультация по товарам?
          </h3>
          <p className="text-xl text-white/95 mb-10 max-w-3xl mx-auto leading-relaxed">
            Наши специалисты помогут выбрать подходящий товар и ответят на все ваши вопросы
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/contact" 
              className="btn-primary text-lg py-4 px-10 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Получить консультацию
            </a>
            
            <a 
              href="tel:+375291234567" 
              className="btn-secondary text-lg py-4 px-10 rounded-xl border-2 border-white text-black hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Позвонить сейчас
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SalePage; 