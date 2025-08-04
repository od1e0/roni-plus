import React, { useState } from 'react';

interface HeaderProps {
  logo?: string;
}

const Header: React.FC<HeaderProps> = ({ logo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-neutral-800 shadow-md py-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Skip to content link for accessibility */}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:p-2 focus:bg-primary focus:text-white absolute z-50">
            Перейти к содержимому
          </a>
          
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center space-x-3">
              {logo ? (
                <img src={logo} alt="РоНи-плюс" className="h-12 sm:h-14 w-auto" />
              ) : (
                <div className="text-2xl xs:text-3xl lg:text-4xl font-heading font-bold text-primary">
                  РоНи-плюс
                </div>
              )}
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink href="/products/single">Одиночные</NavLink>
            <NavLink href="/products/double">Двойные</NavLink>
            <NavLink href="/products/exclusive">Эксклюзивные</NavLink>
            <NavLink href="/products/kids">Детские</NavLink>
            <div className="group relative">
              <button className="px-3 py-2 rounded-lg flex items-center text-neutral-800 hover:bg-neutral-100">
                Больше
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <a href="/products/granite" className="block px-4 py-2 text-neutral-800 hover:bg-neutral-100">Из гранитно-мраморной крошки</a>
                <a href="/products/complex" className="block px-4 py-2 text-neutral-800 hover:bg-neutral-100">Комплексы</a>
                <a href="/products/art" className="block px-4 py-2 text-neutral-800 hover:bg-neutral-100">Художественное оформление</a>
                <a href="/products/fences" className="block px-4 py-2 text-neutral-800 hover:bg-neutral-100">Ограды</a>
                <a href="/products/vases" className="block px-4 py-2 text-neutral-800 hover:bg-neutral-100">Вазы</a>
                <a href="/works" className="block px-4 py-2 text-neutral-800 hover:bg-neutral-100">Наши работы</a>
              </div>
            </div>
          </nav>
          
          {/* Contact Button & Mobile Menu Controls */}
          <div className="flex items-center space-x-3">
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
          <h2 className="font-heading font-bold text-lg text-neutral-800">Меню</h2>
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
                <a href="/products/single" className="block py-2.5 px-4 rounded hover:bg-neutral-100 text-neutral-700">
                  Одиночные
                </a>
              </li>
              <li>
                <a href="/products/double" className="block py-2.5 px-4 rounded hover:bg-neutral-100 text-neutral-700">
                  Двойные
                </a>
              </li>
              <li>
                <a href="/products/exclusive" className="block py-2.5 px-4 rounded hover:bg-neutral-100 text-neutral-700">
                  Эксклюзивные
                </a>
              </li>
              <li>
                <a href="/products/kids" className="block py-2.5 px-4 rounded hover:bg-neutral-100 text-neutral-700">
                  Детские
                </a>
              </li>
              <li>
                <a href="/products/granite" className="block py-2.5 px-4 rounded hover:bg-neutral-100 text-neutral-700">
                  Из гранитно-мраморной крошки
                </a>
              </li>
              <li>
                <a href="/products/complex" className="block py-2.5 px-4 rounded hover:bg-neutral-100 text-neutral-700">
                  Комплексы
                </a>
              </li>
              <li>
                <a href="/products/art" className="block py-2.5 px-4 rounded hover:bg-neutral-100 text-neutral-700">
                  Художественное оформление
                </a>
              </li>
              <li>
                <a href="/products/fences" className="block py-2.5 px-4 rounded hover:bg-neutral-100 text-neutral-700">
                  Ограды
                </a>
              </li>
              <li>
                <a href="/products/vases" className="block py-2.5 px-4 rounded hover:bg-neutral-100 text-neutral-700">
                  Вазы
                </a>
              </li>
              <li>
                <a href="/works" className="block py-2.5 px-4 rounded hover:bg-neutral-100 text-neutral-700">
                  Наши работы
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
      
    </header>
  );
};

// Navigation Link component
const NavLink: React.FC<{href: string; children: React.ReactNode}> = ({href, children}) => (
  <a 
    href={href}
    className="px-3 py-2 rounded-lg text-neutral-800 hover:bg-neutral-100 transition-colors"
  >
    {children}
  </a>
);

export default Header;