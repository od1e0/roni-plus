import React, { useState, useRef, useEffect } from 'react';
import { Category, Service } from '../../types';

interface DropdownMenuProps {
  items: (Category | Service)[];
  title: string;
  type: 'category' | 'service';
  onItemClick?: (item: Category | Service) => void;
  isLoading?: boolean;
  onButtonClick?: () => void; // Новый пропс для обработки клика по кнопке
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  items, 
  title, 
  type, 
  onItemClick, 
  isLoading = false,
  onButtonClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (!isLoading) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 100); 
  };

  const handleItemClick = (item: Category | Service) => {
    if (onItemClick) {
      onItemClick(item);
    }
    setIsOpen(false);
  };

  const renderCategoryColumns = () => {
    if (type !== 'category') return null;

    const categories = items as Category[];
    
    // Получаем только родительские категории (основные категории)
    const parentCategories = categories.filter(cat => !cat.parentId);
    
    // Если у нас есть иерархические категории, используем их
    if (parentCategories.length > 0) {
      return (
        <div className="grid grid-cols-5 gap-6 p-8">
          {parentCategories.map((parentCategory) => (
            <div key={parentCategory.id} className="space-y-4 mega-menu-column min-w-0">
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2 break-words">
                {parentCategory.name.toUpperCase()}
              </h3>
              <ul className="space-y-2">
                {/* Показываем подкатегории, если они есть, иначе показываем саму родительскую категорию */}
                {parentCategory.children && parentCategory.children.length > 0 ? (
                  <>
                    {parentCategory.children.map((child) => (
                      <li key={child.id} className="mega-menu-item">
                        <a
                          href={`/products/category/${child.id}`}
                          className="block text-sm text-neutral-700 hover:text-primary transition-colors duration-200 py-1 hover:font-medium break-words"
                          onClick={() => handleItemClick(child)}
                        >
                          {child.name}
                        </a>
                      </li>
                    ))}
                  </>
                ) : (
                  <li className="mega-menu-item">
                    <a
                      href={`/products/category/${parentCategory.id}`}
                      className="block text-sm text-neutral-700 hover:text-primary transition-colors duration-200 py-1 hover:font-medium group"
                      onClick={() => handleItemClick(parentCategory)}
                    >
                      <span className="group-hover:underline">{parentCategory.name}</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      );
    }
    
    // Fallback: если нет иерархических категорий, используем старую логику
    const monuments = categories.filter(cat => 
      cat.name.toLowerCase().includes('памятник') || 
      cat.name.toLowerCase().includes('мемориальный')
    );
    
    const additional = categories.filter(cat => 
      !cat.name.toLowerCase().includes('памятник') && 
      !cat.name.toLowerCase().includes('ограда') && 
      !cat.name.toLowerCase().includes('гравировка') && 
      !cat.name.toLowerCase().includes('медальон') &&
      !cat.name.toLowerCase().includes('ваза') &&
      !cat.name.toLowerCase().includes('стол') &&
      !cat.name.toLowerCase().includes('мемориальный')
    );
    
    const decoration = categories.filter(cat => 
      cat.name.toLowerCase().includes('гравировка') || 
      cat.name.toLowerCase().includes('медальон') ||
      cat.name.toLowerCase().includes('оформление')
    );
    
    const otherProducts = categories.filter(cat => 
      cat.name.toLowerCase().includes('стол') || 
      cat.name.toLowerCase().includes('скамейка') ||
      cat.name.toLowerCase().includes('ваза') ||
      cat.name.toLowerCase().includes('лампада') ||
      cat.name.toLowerCase().includes('камин') ||
      cat.name.toLowerCase().includes('подоконник')
    );
    
    const fences = categories.filter(cat => 
      cat.name.toLowerCase().includes('ограда')
    );

    const columns = [
      {
        title: 'ПАМЯТНИКИ',
        items: monuments
      },
      {
        title: 'ДОПОЛНИТЕЛЬНО',
        items: additional
      },
      {
        title: 'ОФОРМЛЕНИЕ',
        items: decoration
      },
      {
        title: 'ДРУГИЕ ИЗДЕЛИЯ',
        items: otherProducts
      },
      {
        title: 'ОГРАДЫ',
        items: fences
      }
    ];

    return (
      <div className="grid grid-cols-5 gap-6 p-8">
        {columns.map((column, index) => (
          <div key={index} className="space-y-4 mega-menu-column min-w-0">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2 break-words">
              {column.title}
            </h3>
            <ul className="space-y-2">
              {column.items.length > 0 ? (
                column.items.map((category) => (
                  <li key={category.id} className="mega-menu-item">
                    <a
                      href={`/products/category/${category.id}`}
                      className="block text-sm text-neutral-700 hover:text-primary transition-colors duration-200 py-1 hover:font-medium group"
                      onClick={() => handleItemClick(category)}
                    >
                      <span className="group-hover:underline">{category.name}</span>
                    </a>
                    {category.children && category.children.length > 0 && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {category.children.map((child) => (
                          <li key={child.id} className="mega-menu-item">
                            <a
                              href={`/products/category/${child.id}`}
                              className="block text-xs text-neutral-500 hover:text-primary transition-colors duration-200 py-0.5 hover:font-medium break-words"
                              onClick={() => handleItemClick(child)}
                            >
                              {child.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))
              ) : (
                <li className="text-xs text-neutral-400">
                  Нет категорий
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const renderServiceColumns = () => {
    if (type !== 'service') return null;

    const services = items as Service[];
    
    // Если у нас есть услуги, группируем их по категориям или просто делим пополам
    if (services.length === 0) {
      return (
        <div className="p-8 text-center text-neutral-500">
          Нет доступных услуг
        </div>
      );
    }

    // Если услуг меньше 4, показываем в одной колонке
    if (services.length <= 4) {
      return (
        <div className="grid grid-cols-1 gap-8 p-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2">
              НАШИ УСЛУГИ
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={`/services/${service.id}`}
                    className="block text-sm text-neutral-700 hover:text-primary transition-colors duration-200 py-1"
                    onClick={() => handleItemClick(service)}
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    // Если услуг больше 4, делим на две колонки
    const midPoint = Math.ceil(services.length / 2);
    const columns = [
      {
        title: 'ОСНОВНЫЕ УСЛУГИ',
        items: services.slice(0, midPoint)
      },
      {
        title: 'ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ',
        items: services.slice(midPoint)
      }
    ];

    return (
      <div className="grid grid-cols-2 gap-8 p-8">
        {columns.map((column, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider border-b border-neutral-200 pb-2">
              {column.title}
            </h3>
            <ul className="space-y-2">
              {column.items.length > 0 ? (
                column.items.map((service) => (
                  <li key={service.id}>
                    <a
                      href={`/services/${service.id}`}
                      className="block text-sm text-neutral-700 hover:text-primary transition-colors duration-200 py-1"
                      onClick={() => handleItemClick(service)}
                    >
                      {service.name}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-xs text-neutral-400">
                  Нет услуг
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const renderLoadingState = () => (
    <div className="p-8">
      <div className="flex items-center justify-center space-x-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="text-sm text-neutral-500">Загрузка...</span>
      </div>
    </div>
  );

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <a
          href={type === 'category' ? '/products' : '/services'}
          onClick={(e) => {
            if (onButtonClick) {
              e.preventDefault();
              onButtonClick();
            }
          }}
          className={`flex items-center px-3 py-2 rounded-lg text-neutral-800 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:text-primary transition-all duration-200 font-medium hover-lift ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {title}
          {isLoading && (
            <div className="ml-1.5 animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
          )}
          {!isLoading && (
            <svg 
              className={`ml-1.5 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </a>
      </div>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 bg-white shadow-2xl border border-neutral-200 rounded-xl min-w-[1000px] max-w-[1200px] z-50 overflow-hidden animate-in mega-menu"
          role="menu"
          aria-label={`Мега-меню ${title}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 px-8 py-4 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-primary uppercase tracking-wider">
                {type === 'category' ? 'Каталог товаров' : 'Наши услуги'}
              </h3>
              {!isLoading && (
                <span className="text-xs text-neutral-500 bg-white px-3 py-1 rounded-full shadow-sm">
                  {items.length} {type === 'category' ? 'категорий' : 'услуг'}
                </span>
              )}
            </div>
          </div>
          
          {/* Mega Menu Content */}
          <div className="max-h-[500px] overflow-y-auto dropdown-scrollbar">
            {isLoading ? (
              renderLoadingState()
            ) : items.length === 0 ? (
              <div className="p-8 text-center text-neutral-500">
                {type === 'category' ? 'Категории не найдены' : 'Услуги не найдены'}
              </div>
            ) : (
              <>
                {type === 'category' ? renderCategoryColumns() : renderServiceColumns()}
                
                {/* Footer */}
                <div className="bg-neutral-50 px-8 py-4 border-t border-neutral-100">
                  <div className="flex items-center justify-between">
                    <a 
                      href={type === 'category' ? '/products' : '/services'}
                      className="text-sm text-neutral-500 hover:text-primary transition-colors duration-200 flex items-center space-x-2 hover:font-medium"
                    >
                      <span>Посмотреть все {type === 'category' ? 'категории' : 'услуги'}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-neutral-400">
                        Быстрая навигация
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu; 