import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import type { Product, Category } from '../types';

const ProductsPage: React.FC = () => {
  // Get category from URL parameters
  const { category } = useParams<{ category?: string }>();

  // Mock categories for demonstration
  const categories: Category[] = [
    { id: 'single', name: 'Одиночные', slug: 'single' },
    { id: 'double', name: 'Двойные', slug: 'double' },
    { id: 'exclusive', name: 'Эксклюзивные', slug: 'exclusive' },
    { id: 'kids', name: 'Детские', slug: 'kids' },
    { id: 'granite', name: 'Из гранитно-мраморной крошки', slug: 'granite' },
    { id: 'complex', name: 'Комплексы', slug: 'complex' },
    { id: 'art', name: 'Художественное оформление', slug: 'art' },
    { id: 'fences', name: 'Ограды', slug: 'fences' },
    { id: 'vases', name: 'Вазы', slug: 'vases' },
  ];

  // Mock products for demonstration
  const allProducts: Product[] = [
    {
      id: '1',
      name: 'О-1',
      category: 'single',
      price: 1433.25,
      imageUrl: '/images/products/o-1.jpg',
      description: 'Одиночный памятник из черного гранита',
      materials: ['Черный гранит'],
    },
    {
      id: '2',
      name: 'Э-1',
      category: 'exclusive',
      price: 0.00,
      imageUrl: '/images/products/e-1.jpg',
      description: 'Эксклюзивный памятник из гранита и бронзы',
      materials: ['Гранит', 'Бронза'],
    },
    {
      id: '3',
      name: 'ДВ-1',
      category: 'double',
      price: 1651.65,
      imageUrl: '/images/products/dv-1.jpg',
      description: 'Двойной памятник из черного гранита',
      materials: ['Черный гранит'],
    },
    {
      id: '4',
      name: 'О-2',
      category: 'single',
      price: 1256.50,
      imageUrl: '/images/products/o-2.jpg',
      description: 'Одиночный памятник из темно-серого гранита',
      materials: ['Темно-серый гранит'],
    },
    {
      id: '5',
      name: 'ДВ-2',
      category: 'double',
      price: 1890.75,
      imageUrl: '/images/products/dv-2.jpg',
      description: 'Двойной памятник из гранита с художественным оформлением',
      materials: ['Гранит', 'Бронза'],
    },
    {
      id: '6',
      name: 'Д-1',
      category: 'kids',
      price: 980.50,
      imageUrl: '/images/products/d-1.jpg',
      description: 'Детский памятник с декоративными элементами',
      materials: ['Светлый гранит'],
    },
  ];

  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (category && categories.some(c => c.slug === category)) {
      setActiveCategory(category);
      setCurrentPage(1);
    }
  }, [category]);

  useEffect(() => {
    setCurrentPage(1);
    
    let result = allProducts.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => {
        if (a.price === 0) return 1;
        if (b.price === 0) return -1;
        return a.price - b.price;
      });
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => {
        if (a.price === 0) return 1;
        if (b.price === 0) return -1;
        return b.price - a.price;
      });
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(result);
  }, [activeCategory, searchTerm, sortBy]);
  
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const currentProducts = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredProducts, currentPage, itemsPerPage]);
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
    
    if (categoryId !== 'all') {
      const categorySlug = categories.find(c => c.id === categoryId)?.slug;
      navigate(`/products/${categorySlug}`);
    } else {
      navigate('/products');
    }
  };
  
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-8 xs:py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold font-heading">Каталог памятников</h1>
            <p className="mt-3 xs:mt-4 text-base xs:text-lg text-white/80 max-w-md sm:max-w-xl md:max-w-2xl">
              Широкий выбор памятников из различных материалов с возможностью индивидуального оформления
            </p>
          </div>
        </div>
      </section>

      <section className="py-6 xs:py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md mb-10 border border-neutral-200 overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-neutral-200">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Поиск памятников..."
                      className="w-full px-4 py-3 pl-11 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-neutral-500 absolute left-3 top-3.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex md:space-x-4">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="md:hidden flex items-center px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    {isFilterOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
                  </button>

                  <div className="relative">
                    <select 
                      className="appearance-none w-full px-4 py-3 pr-8 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white transition-all cursor-pointer"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="default">Сортировать по умолчанию</option>
                      <option value="price-asc">Цена (по возрастанию)</option>
                      <option value="price-desc">Цена (по убыванию)</option>
                      <option value="name">По названию</option>
                    </select>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-neutral-500 absolute right-3 top-3.5 pointer-events-none" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className={`border-b border-neutral-200 bg-neutral-50 transition-all duration-300 ${isFilterOpen ? 'block' : 'md:block hidden'}`}>
              <div className="p-4 sm:p-5 md:p-6">
                <div className="mb-4">
                  <h3 className="font-medium text-neutral-800 mb-3">Категории</h3>
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 xs:gap-3">
                    <button
                      className={`px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center ${
                        activeCategory === 'all'
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100'
                      }`}
                      onClick={() => handleCategoryChange('all')}
                    >
                      Все категории
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className={`px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center ${
                          activeCategory === category.id
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-100'
                        }`}
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      handleCategoryChange('all');
                      setSortBy('default');
                    }}
                    className="text-sm text-primary hover:text-primary-dark flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Сбросить все фильтры
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg xs:text-xl font-bold text-neutral-800">
                  {activeCategory === 'all' ? 'Все памятники' : 
                    categories.find(c => c.id === activeCategory)?.name || 'Памятники'}
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                  {filteredProducts.length} шт.
                </span>
              </div>
              <p className="text-neutral-500 text-xs xs:text-sm">
                {currentPage > 1 && filteredProducts.length > 0 && (
                  <>Страница {currentPage} из {totalPages}</>
                )}
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-2 xs:mt-0">
              <span className="text-xs xs:text-sm text-neutral-500 whitespace-nowrap">Товаров:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="text-xs xs:text-sm border border-neutral-300 rounded px-2 py-1 bg-white"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-16 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Памятники не найдены</h3>
              <p className="text-neutral-600 max-w-md mx-auto">
                К сожалению, по вашему запросу ничего не найдено. Попробуйте изменить параметры поиска или фильтрации.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  handleCategoryChange('all');
                  setSortBy('default');
                }}
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Сбросить все фильтры
              </button>
            </div>
          )}
          
          {filteredProducts.length > itemsPerPage && (
            <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col xs:flex-row justify-between items-center">
              <div className="text-xs sm:text-sm text-neutral-500 mb-4 xs:mb-0 text-center xs:text-left">
                Показано {Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)}-
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)} из {filteredProducts.length} товаров
              </div>
              
              <nav className="inline-flex flex-wrap justify-center items-center rounded-lg shadow-sm border border-neutral-200">
                <button 
                  onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-2 xs:px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-l-lg flex items-center ${
                    currentPage === 1 
                      ? 'bg-neutral-50 text-neutral-300 cursor-not-allowed' 
                      : 'bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                  aria-label="Предыдущая страница"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 xs:h-4 xs:w-4 mr-0.5 xs:mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="xs:inline hidden">Назад</span>
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  
                  if (
                    totalPages > 7 && 
                    ((pageNum > 2 && pageNum < currentPage - 1) || 
                    (pageNum > currentPage + 1 && pageNum < totalPages - 1))
                  ) {
                    if (pageNum === 3 || pageNum === totalPages - 2) {
                      return (
                        <span key={pageNum} className="px-2 xs:px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white text-neutral-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                  
                  if (
                    pageNum === 1 || 
                    pageNum === totalPages || 
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1) ||
                    totalPages <= 7
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-2 xs:px-3 sm:px-4 py-2 text-xs sm:text-sm ${
                          pageNum === currentPage 
                            ? 'bg-primary text-white font-medium' 
                            : 'bg-white text-neutral-700 hover:bg-neutral-50'
                        }`}
                        aria-current={pageNum === currentPage ? 'page' : undefined}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  
                  return null;
                })}
                
                <button 
                  onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-2 xs:px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-r-lg flex items-center ${
                    currentPage === totalPages 
                      ? 'bg-neutral-50 text-neutral-300 cursor-not-allowed' 
                      : 'bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                  aria-label="Следующая страница"
                >
                  <span className="xs:inline hidden">Вперед</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 xs:h-4 xs:w-4 ml-0.5 xs:ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </section>
      
      <section className="bg-neutral-100 py-8 xs:py-10 sm:py-12 md:py-16 border-t border-neutral-200">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-5 xs:p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm border border-neutral-200 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 xs:gap-6 md:gap-8">
              <div>
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold font-heading text-neutral-900">Нужна консультация?</h2>
                <p className="mt-2 text-sm xs:text-base text-neutral-600">
                  Наши специалисты ответят на все ваши вопросы и помогут с выбором
                </p>
              </div>
              <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 mt-4 md:mt-0">
                <a href="/contact" className="btn-primary whitespace-nowrap text-center text-sm xs:text-base py-2.5 xs:py-3">
                  Связаться с нами
                </a>
                <a href="tel:+375297912384" className="btn-secondary whitespace-nowrap text-center text-sm xs:text-base py-2.5 xs:py-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 xs:h-5 xs:w-5 mr-1.5 xs:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Позвонить нам
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsPage;