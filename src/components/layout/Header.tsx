import React, { useState, useEffect } from 'react';
import DropdownMenu from './DropdownMenu';
import OrderModal from '../OrderModal';
import { Category, Service } from '../../types';
import { CategoryService, ServiceService } from '../../services/api';

interface HeaderProps {
  logo?: string;
}

const Header: React.FC<HeaderProps> = ({ logo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [categoriesData, servicesData] = await Promise.all([
          CategoryService.getCategoriesHierarchical(),
          ServiceService.getHierarchicalServices()
        ]);
        setCategories(categoriesData);
        setServices(servicesData);
      } catch (error) {
        console.error('Failed to fetch menu data:', error);
        // Если не удалось загрузить данные, используем пустые массивы
        setCategories([]);
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-neutral-800 shadow-md py-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">          
          {/* Logo and Company Name */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-1">
              {logo && (
                <img 
                  src={logo} 
                  alt="Логотип РоНи-плюс" 
                  className="h-10 w-auto sm:h-12 md:h-14 transition-all duration-200 hover:scale-105" 
                />
              )}
              <div className="text-2xl xs:text-3xl lg:text-4xl font-heading font-bold text-primary">
                РоНи-плюс
              </div>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink href="/">Главная</NavLink>
            <DropdownMenu 
              items={categories} 
              title="Каталог" 
              type="category"
              isLoading={isLoading}
              onButtonClick={() => window.location.href = '/products'}
            />
            <NavLink href="/sale">Распродажа</NavLink>
            <DropdownMenu 
              items={services} 
              title="Услуги" 
              type="service"
              isLoading={isLoading}
              onButtonClick={() => window.location.href = '/services'}
            />
            <NavLink href="/works">Наши работы</NavLink>
            <NavLink href="/about">О нас</NavLink>
            <NavLink href="/delivery">Доставка</NavLink>
          </nav>
          
          {/* Contact Button & Mobile Menu Controls */}
          <div className="flex items-center space-x-3">
            {/* Order Button - Desktop */}
            <button 
              onClick={() => setIsOrderModalOpen(true)}
              className="hidden md:flex items-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Оставить заявку
            </button>
            
            {/* Contact Button - Desktop */}
            <a 
              href="/contact" 
              className="hidden md:flex items-center px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white font-medium transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Контакты
            </a>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full lg:hidden bg-neutral-100 text-primary hover:bg-neutral-200"
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMenuOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <div className={`fixed inset-0 bg-neutral-900 bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setIsMenuOpen(false)} />
      
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            {logo && (
              <img 
                src={logo} 
                alt="Логотип РоНи-плюс" 
                className="h-6 w-auto" 
              />
            )}
            <h2 className="font-heading font-bold text-lg text-neutral-800">Меню</h2>
          </div>
          <button 
            onClick={() => setIsMenuOpen(false)} 
            className="p-2 text-neutral-500 hover:text-neutral-700"
            aria-label="Закрыть меню"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="py-4 px-4">
          <nav>
            <ul className="space-y-1">
              <li>
                <a href="/" className="block py-2.5 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-700 transition-all duration-200">
                  Главная
                </a>
              </li>
              <li>
                <details className="group">
                  <summary className="flex items-center justify-between py-2.5 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-700 cursor-pointer transition-all duration-200">
                    <span className="font-medium break-words text-left flex-1 mr-2">Каталог</span>
                    <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <ul className="ml-4 space-y-1 mt-1">
                    <li>
                      <a href="/products" className="block py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-600 transition-all duration-200 font-medium">
                        Все товары
                      </a>
                    </li>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <details className="group">
                          <summary className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-600 cursor-pointer transition-all duration-200">
                            <span className="font-medium break-words text-left flex-1 mr-2">{category.name}</span>
                            {category.children && category.children.length > 0 && (
                              <svg className="w-3 h-3 transition-transform duration-200 group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            )}
                          </summary>
                          {category.children && category.children.length > 0 && (
                            <ul className="ml-4 space-y-1 mt-1">
                              {category.children.map((child) => (
                                <li key={child.id}>
                                  <a href={`/products/category/${child.id}`} className="block py-1.5 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-500 transition-all duration-200 break-words">
                                    {child.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </details>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
              <li>
                <a href="/sale" className="block py-2.5 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-700 transition-all duration-200">
                  <span className="font-medium">Распродажа</span>
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Скидки
                  </span>
                </a>
              </li>
              <li>
                <details className="group">
                  <summary className="flex items-center justify-between py-2.5 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-700 cursor-pointer transition-all duration-200">
                    <span className="font-medium break-words text-left flex-1 mr-2">Услуги</span>
                    <svg className="w-4 h-4 transition-transform duration-200 group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <ul className="ml-4 space-y-1 mt-1">
                    <li>
                      <a href="/services" className="block py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-600 transition-all duration-200 font-medium">
                        Все услуги
                      </a>
                    </li>
                    {services.map((service) => (
                      <li key={service.id}>
                        <a href={`/services/${service.id}`} className="block py-1.5 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-500 transition-all duration-200 break-words">
                          {service.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
              <li>
                <a href="/works" className="block py-2.5 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-700 transition-all duration-200">
                  Наши работы
                </a>
              </li>
              <li>
                <a href="/about" className="block py-2.5 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-700 transition-all duration-200">
                  О нас
                </a>
              </li>
              <li>
                <a href="/delivery" className="block py-2.5 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-700 transition-all duration-200">
                  Доставка
                </a>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setIsOrderModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left block py-2.5 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-700 transition-all duration-200"
                >
                  Оставить заявку
                </button>
              </li>
              <li>
                <a href="/contact" className="block py-2.5 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary text-neutral-700 transition-all duration-200">
                  Контакты
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Mobile contact info */}
          <div className="mt-8 border-t pt-6 pb-2 border-neutral-200">
            <h3 className="text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-3">Контакты</h3>
            <div className="space-y-3">
              <a 
                href="tel:+375297912384" 
                className="flex items-center text-primary hover:text-primary-dark"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +375 (29) 791 23 84
              </a>
              <a 
                href="tel:+375297912395" 
                className="flex items-center text-primary hover:text-primary-dark"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +375 (29) 791 23 95
              </a>
              <a 
                href="mailto:info@roniplus.by" 
                className="flex items-center text-primary hover:text-primary-dark"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@roniplus.by
              </a>
              <a 
                href="/contact" 
                className="mt-4 block text-center py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Связаться с нами
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Order Modal */}
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
      
    </header>
  );
};

// Navigation Link component
const NavLink: React.FC<{href: string; children: React.ReactNode}> = ({href, children}) => (
  <a 
    href={href}
    className="px-3 py-2 rounded-lg text-neutral-800 hover:bg-neutral-100 transition-colors whitespace-nowrap"
  >
    {children}
  </a>
);

export default Header;