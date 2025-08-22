import React, { useState, useEffect } from 'react';
import { Product, Category } from '../../types';
import { CategoryService } from '../../services/api';

interface ProductCardProps {
  product: Product;
}

// Компонент для отображения скидочного бейджа
const SaleBadge: React.FC<{ product: Product }> = ({ product }) => {
  if (!product.isOnSale || !product.salePrice || !product.saleEndDate) {
    return null;
  }

  const isExpired = new Date(product.saleEndDate) < new Date();
  if (isExpired) {
    return null;
  }

  return (
    <div className="absolute top-4 left-4 z-20">
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
        {product.salePercentage ? `-${product.salePercentage}%` : 'СКИДКА'}
      </div>
    </div>
  );
};

// Компонент для отображения даты окончания скидки
const SaleEndDateBadge: React.FC<{ product: Product }> = ({ product }) => {
  if (!product.isOnSale || !product.saleEndDate) {
    return null;
  }

  const isExpired = new Date(product.saleEndDate) < new Date();
  if (isExpired) {
    return null;
  }

  return (
    <div className="absolute bottom-3 right-3 z-30">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg border border-white/20 flex items-center gap-1">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        До {new Date(product.saleEndDate).toLocaleDateString('ru-RU')}
      </div>
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await CategoryService.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.log('Could not fetch categories:', error);
        setCategories([]);
      }
    };
    
    fetchCategories();
  }, []);

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
      case 'vertical': return 'Вертикальный';
      case 'horizontal': return 'Горизонтальный';
      case 'monuments': return 'Памятники';
      default: return 'Новинка';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'single': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'double': return 'bg-green-100 text-green-800 border-blue-200';
      case 'exclusive': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'kids': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'granite': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'complex': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'art': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'fences': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'vases': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'vertical': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'horizontal': return 'bg-green-100 text-green-800 border-green-200';
      case 'monuments': return 'bg-primary/20 text-primary-dark border-primary/30';
      default: return 'bg-primary/20 text-primary-dark border-primary/30';
    }
  };

  // Get the primary category for display (first category from the array)
  const getPrimaryCategory = () => {
    if (product.categories && product.categories.length > 0) {
      // Try to find the category name from the categories array
      const firstCategoryId = product.categories[0];
      const apiCategory = categories.find(cat => cat.id === firstCategoryId);
      if (apiCategory) {
        return {
          id: apiCategory.id,
          name: apiCategory.name,
          color: getCategoryColor(apiCategory.name.toLowerCase())
        };
      }
    }
    
    // Fallback to legacy category field
    return {
      id: product.category,
      name: getCategoryLabel(product.category),
      color: getCategoryColor(product.category)
    };
  };

  const primaryCategory = getPrimaryCategory();

  const getMaterialColor = (material: string) => {
    const materialLower = material.toLowerCase();
    if (materialLower.includes('гранит') || materialLower.includes('granite')) {
      return 'bg-gray-100 text-gray-800 border-gray-200';
    } else if (materialLower.includes('мрамор') || materialLower.includes('marble')) {
      return 'bg-white text-gray-800 border-gray-200';
    } else if (materialLower.includes('бетон') || materialLower.includes('concrete')) {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    } else if (materialLower.includes('черный') || materialLower.includes('black')) {
      return 'bg-gray-800 text-white border-gray-600';
    } else if (materialLower.includes('серый') || materialLower.includes('gray')) {
      return 'bg-gray-100 text-gray-800 border-gray-200';
    } else {
      return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-200 relative flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Fixed aspect ratio and better image display */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <img 
          src={(product.images && product.images.length > 0) ? product.images[0] : '/placeholder-image.svg'} 
          alt={product.name} 
          className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-image.svg';
          }}
        />
        
        {/* Sale Badges */}
        <SaleBadge product={product} />
        <SaleEndDateBadge product={product} />
        
        {/* Category Badge - Improved positioning and styling */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${primaryCategory.color} shadow-sm`}>
            {primaryCategory.name}
          </span>
        </div>
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
        
        {/* Quick view button on hover */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <a 
            href={`/products/detail/${product.id}`}
            className="px-4 py-2 bg-white text-primary font-medium rounded-lg transform transition-transform duration-300 hover:scale-105 flex items-center shadow-lg"
          >
            Быстрый просмотр
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold text-neutral-800 mb-2 font-heading group-hover:text-primary transition-colors break-words leading-tight">
          {product.name}
        </h3>    
        
        {/* Description */}
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2 break-words">{product.description}</p>
        
        {/* Material and Type Tags - Improved styling and layout */}
        <div className="mt-auto mb-4 flex flex-wrap gap-2">
          {product.material && (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getMaterialColor(product.material)}`}>
              {product.material}
            </span>
          )}
          {product.type && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
              {product.type}
            </span>
          )}
          {product.color && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
              {product.color}
            </span>
          )}
        </div>

        {/* Categories Tags - Show all categories */}
        {product.categories && product.categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {product.categories.slice(0, 3).map((categoryId, index) => {
              const category = categories.find(cat => cat.id === categoryId);
              if (category) {
                return (
                  <span 
                    key={categoryId}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200"
                  >
                    {category.name}
                  </span>
                );
              }
              return null;
            })}
            {product.categories.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-neutral-200 text-neutral-600 border border-neutral-300">
                +{product.categories.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Price and CTA */}
        <div className="flex justify-between items-center pt-3 border-t border-neutral-200 mt-auto">
          <div className="flex flex-col">
            {product.isOnSale && product.salePrice ? (
              <>
                <span className="text-xs text-neutral-500">Цена со скидкой:</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold text-red-600">
                    {product.salePrice.toFixed(2)} руб.
                  </span>
                  <span className="text-sm line-through text-neutral-400">
                    {product.price.toFixed(2)} руб.
                  </span>
                </div>
                {product.salePercentage && (
                  <span className="text-xs text-red-600 font-medium">
                    Экономия {product.salePercentage}%
                  </span>
                )}
              </>
            ) : (
              <>
                <span className="text-xs text-neutral-500">Цена:</span>
                <span className="text-lg sm:text-xl font-bold text-neutral-800">
                  {product.price > 0 ? `${product.price.toFixed(2)} руб.` : 'По запросу'}
                </span>
              </>
            )}
          </div>
          
          <a 
            href={`/products/detail/${product.id}`}
            className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-all shadow-sm hover:shadow"
            aria-label={`Подробнее о модели ${product.name}`}
          >
            Подробнее
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;