import React, { useState, useEffect } from 'react';
import { Service } from '../types';
import { ServiceService } from '../services/api';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const servicesData = await ServiceService.getHierarchicalServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Failed to fetch services:', error);
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'default':
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="text-lg text-neutral-600">Загрузка услуг...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">
          Наши услуги
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          Профессиональные услуги по изготовлению памятников, оград и других изделий из натурального камня
        </p>
      </div>

      {/* Search and Sort */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Поиск услуг..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <svg className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
        >
          <option value="default">По умолчанию</option>
          <option value="name-asc">По названию (А-Я)</option>
          <option value="name-desc">По названию (Я-А)</option>
        </select>
      </div>

      {/* Services Count */}
      <div className="mb-8">
        <p className="text-neutral-600 text-sm">
          Найдено {filteredServices.length} {filteredServices.length === 1 ? 'услуга' : filteredServices.length < 5 ? 'услуги' : 'услуг'}
        </p>
      </div>

      {/* Services Grid */}
      {sortedServices.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-neutral-800 mb-2">
            Услуги не найдены
          </h3>
          <p className="text-neutral-600">
            Попробуйте изменить параметры поиска
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedServices.map((service) => (
            <div
              key={service.id}
              className="group service-card"
            >
              {/* Service Image */}
              <div className="h-56 relative overflow-hidden">
                {service.images && service.images.length > 0 ? (
                  <img
                    src={service.images[0]}
                    alt={service.name}
                    className="service-card-image"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center service-card-image">
                    <div className="text-center text-neutral-400">
                      <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium">Фото отсутствует</p>
                    </div>
                  </div>
                )}
                
                {/* Service Badge */}
                {service.children && service.children.length > 0 && (
                  <div className="absolute top-4 right-4">
                    <span className="service-card-badge">
                      {service.children.length} подуслуг
                    </span>
                  </div>
                )}
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-primary transition-colors duration-200 break-words leading-tight">
                  {service.name}
                </h3>
                
                {service.shortDescription ? (
                  <p className="text-neutral-600 mb-6 leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                ) : service.description ? (
                  <p className="text-neutral-600 mb-6 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                ) : null}

                {/* Action Button */}
                <div className="pt-2">
                  <a
                    href={`/services/${service.id}`}
                    className="service-card-button"
                  >
                    Подробнее
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
