import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Service } from '../types';
import { ServiceService } from '../services/api';

const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const serviceData = await ServiceService.getService(id);
        setService(serviceData);
      } catch (error) {
        console.error('Failed to fetch service:', error);
        setError('Не удалось загрузить информацию об услуге');
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // Собираем все изображения услуги в один массив
  const getAllImages = () => {
    const images: string[] = [];
    if (service?.images && service.images.length > 0) {
      images.push(...service.images);
    }
    return images;
  };

  const images = getAllImages();
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openImageModal = () => {
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeImageModal();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="text-lg text-neutral-600">Загрузка услуги...</span>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold text-neutral-800 mb-2">
            Ошибка загрузки
          </h3>
          <p className="text-neutral-600 mb-4">
            {error || 'Услуга не найдена'}
          </p>
          <a
            href="/services"
            className="text-primary hover:text-primary-dark font-medium transition-colors duration-200"
          >
            ← Вернуться к услугам
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-neutral-600">
            <li>
              <a href="/" className="hover:text-primary transition-colors duration-200">
                Главная
              </a>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <a href="/services" className="hover:text-primary transition-colors duration-200">
                Услуги
              </a>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-neutral-800 font-medium break-words max-w-xs">
              {service.name}
            </li>
          </ol>
        </nav>

        {/* Service Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 mb-4 break-words leading-tight">
            {service.name}
          </h1>
        </div>

        {/* Service Images Gallery */}
        <div className="bg-white rounded-lg shadow-lg border border-neutral-200 p-8 mb-8">
          {images.length > 0 ? (
            <div className="text-center">
              {/* Main Image */}
              <div className="relative mb-6">
                <div className="h-96 rounded-lg overflow-hidden cursor-pointer" onClick={openImageModal}>
                  <img
                    src={images[currentImageIndex]}
                    alt={`${service.name} - изображение ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain bg-neutral-100"
                  />
                </div>

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      aria-label="Предыдущее изображение"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                      aria-label="Следующее изображение"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Image Counter */}
              {hasMultipleImages && (
                <div className="mb-6">
                  <p className="text-sm text-neutral-600">
                    {currentImageIndex + 1} из {images.length}
                  </p>
                </div>
              )}

              {/* Thumbnails */}
              {hasMultipleImages && (
                <div className="flex justify-center space-x-2 mb-6">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'border-primary scale-110'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${service.name} - миниатюра ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Image Description */}
              <div className="text-center">
                <p className="text-neutral-600">
                  {hasMultipleImages 
                    ? `Показано ${images.length} фотографий работ. Используйте стрелки для перелистывания или кликайте по миниатюрам. Кликните на фото для увеличения.`
                    : 'Фотография работы по данной услуге. Кликните на фото для увеличения.'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                Фотографии отсутствуют
              </h3>
              <p className="text-neutral-600">
                Для данной услуги пока нет загруженных фотографий работ
              </p>
            </div>
          )}
        </div>

        {/* Service Description */}
        <div className="bg-white rounded-lg shadow-lg border border-neutral-200 p-8 mb-8">
          <div className="prose max-w-none">
            <h3 className="text-2xl font-bold text-neutral-800 mb-6">
              Описание услуги "{service.name}"
            </h3>
            
            {service.description ? (
              <div className="text-lg text-neutral-700 leading-relaxed">
                {service.description}
              </div>
            ) : (
              <p className="text-neutral-500 italic">
                Подробное описание услуги отсутствует
              </p>
            )}
          </div>
        </div>

        {/* Subservices */}
        {service.children && service.children.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg border border-neutral-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">Подуслуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.children.map((subservice) => (
                <div
                  key={subservice.id}
                  className="bg-neutral-50 rounded-lg p-6 border border-neutral-200 hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                    {subservice.name}
                  </h3>
                  {subservice.description && (
                    <p className="text-neutral-600 mb-4 line-clamp-3">
                      {subservice.description}
                    </p>
                  )}
                  <a
                    href={`/services/${subservice.id}`}
                    className="text-primary hover:text-primary-dark font-medium transition-colors duration-200"
                  >
                    Подробнее →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Services */}
        <div className="text-center">
          <a
            href="/services"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Вернуться к услугам
          </a>
        </div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200"
              aria-label="Закрыть"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Main Image */}
            <img
              src={images[currentImageIndex]}
              alt={`${service.name} - изображение ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-200"
                  aria-label="Предыдущее изображение"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors duration-200"
                  aria-label="Следующее изображение"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Counter */}
            {hasMultipleImages && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                <span className="text-sm">
                  {currentImageIndex + 1} из {images.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetailPage;
