import React, { useState, useEffect } from 'react';

const TopPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Скрываем панель при скролле вниз, показываем при скролле вверх
      if (currentScrollY > 50) {
        setIsVisible(currentScrollY < lastScrollY);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [lastScrollY]);

  return (
    <div 
      className={`hidden md:block bg-neutral-100 border-b border-neutral-200 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-2 text-sm text-neutral-700">
          {/* Social Media */}
          <div className="flex items-center space-x-4">
            <a 
              href="https://instagram.com/stonekar.by" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-primary transition-colors"
            >
              <div className="w-6 h-6 bg-neutral-300 rounded flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </a>
          </div>

          {/* Contact Information */}
          <div className="flex flex-wrap items-center space-x-6 text-xs sm:text-sm">
            {/* Brest Location 1 */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className="flex flex-col">
                <span className="font-medium">г. Брест, ул. Бульвар Космонавтов, 49/51</span>
                <div className="flex space-x-3">
                  <a href="tel:+375336777711" className="flex items-center space-x-1 hover:text-primary">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span>+375 (33) 6 777 711</span>
                  </a>
                  <a href="tel:+375292715715" className="flex items-center space-x-1 hover:text-primary">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span>+375 (29) 2 715 715</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Brest Location 2 */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="flex flex-col">
                <span className="font-medium">г. Брест, ул. Дубровская, 54/14</span>
                <a href="tel:+375336180180" className="flex items-center space-x-1 hover:text-primary">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <span>+375 (33) 6 180 180</span>
                </a>
              </div>
            </div>

            {/* Gomel Location */}
            <div className="hidden xl:flex items-center space-x-2">
              <div className="flex flex-col">
                <span className="font-medium">г. Гомель, ул. Киселева, дом 3А</span>
                <a href="tel:+375447995995" className="flex items-center space-x-1 hover:text-primary">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <span>+375 (44) 7 995 995</span>
                </a>
              </div>
            </div>

            {/* Minsk Location */}
            <div className="hidden 2xl:flex items-center space-x-2">
              <div className="flex flex-col">
                <span className="font-medium">г. Минск, пр. Дзержинского, 94</span>
                <div className="flex space-x-3">
                  <a href="tel:+375291299191" className="flex items-center space-x-1 hover:text-primary">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span>+375 (29) 129 91 91</span>
                  </a>
                  <a href="tel:+375333227222" className="flex items-center space-x-1 hover:text-primary">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span>+375 (33) 322 72 22</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Email and Hours */}
          <div className="flex flex-wrap items-center space-x-4 text-xs sm:text-sm">
            <a 
              href="mailto:info@stonekar.by" 
              className="flex items-center space-x-1 hover:text-primary transition-colors"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <span className="hidden sm:inline">info@stonekar.by</span>
            </a>
            <div className="hidden md:flex items-center space-x-1">
              <span className="font-medium">пн-пт: 10:00-19:00</span>
              <span className="text-neutral-500">|</span>
              <span className="font-medium">сб: 10:00-16:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPanel; 