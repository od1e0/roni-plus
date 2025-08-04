import React, { useState } from 'react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

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
      default: return 'Новинка';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'single': return 'bg-primary-light/20 text-primary-dark';
      case 'double': return 'bg-secondary-light/20 text-secondary';
      case 'exclusive': return 'bg-accent/20 text-accent';
      default: return 'bg-primary-light/20 text-primary-dark';
    }
  };

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-card transition-all duration-300 border border-neutral-200 relative flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative pt-[80%] overflow-hidden bg-neutral-100">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
            {getCategoryLabel(product.category)}
          </span>
        </div>
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-primary-dark/70 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
        
        {/* Quick view button on hover */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <a 
            href={`/product/${product.id}`}
            className="px-5 py-2.5 bg-white text-primary font-medium rounded-lg transform transition-transform duration-300 hover:scale-105 flex items-center"
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
        <h3 className="text-lg font-bold text-neutral-800 mb-2 font-heading group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Ratings */}
        <div className="flex items-center mb-3">
          <div className="flex">
            {Array(5).fill(0).map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-neutral-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <span className="text-2xs sm:text-xs text-neutral-500 ml-2">(18 отзывов)</span>
        </div>
        
        {/* Description */}
        <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{product.description}</p>
        
        {/* Material Tags */}
        <div className="mt-auto mb-4 flex flex-wrap gap-1.5">
          {product.materials?.map((material, index) => (
            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-md text-2xs sm:text-xs font-medium bg-neutral-100 text-neutral-600">
              {material}
            </span>
          ))}
        </div>

        {/* Price and CTA */}
        <div className="flex justify-between items-center pt-3 border-t border-neutral-200 mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-neutral-500">Цена:</span>
            <span className="text-lg sm:text-xl font-bold text-neutral-800">
              {product.price > 0 ? `${product.price.toFixed(2)} руб.` : 'По запросу'}
            </span>
          </div>
          
          <a 
            href={`/product/${product.id}`}
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