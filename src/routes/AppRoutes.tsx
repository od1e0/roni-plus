import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../components/admin/AdminLayout';

// Import all pages
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import DeliveryPage from '../pages/DeliveryPage';
import WorksPage from '../pages/WorksPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
      
      {/* Product Routes */}
      <Route path="/products" element={<MainLayout><ProductsPage /></MainLayout>} />
      <Route path="/products/:category" element={<MainLayout><ProductsPage /></MainLayout>} />
      <Route path="/product/:id" element={<MainLayout><ProductDetailPage /></MainLayout>} />
      
      {/* Information Pages */}
      <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
      <Route path="/delivery" element={<MainLayout><DeliveryPage /></MainLayout>} />
      <Route path="/works" element={<MainLayout><WorksPage /></MainLayout>} />
      
      {/* Admin Routes */}
      <Route 
        path="/admin/*" 
        element={
          <AdminLayout>
            {/* Admin content will go here */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-4">Панель администратора</h1>
              <p>Добро пожаловать в панель администратора. Используйте меню слева для навигации.</p>
            </div>
          </AdminLayout>
        } 
      />
      
      {/* 404 Not Found Route */}
      <Route 
        path="*" 
        element={
          <MainLayout>
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-6xl font-bold text-neutral-300">404</h1>
              <h2 className="text-3xl font-bold text-neutral-800 mt-4 mb-6">Страница не найдена</h2>
              <p className="text-neutral-600 max-w-md mb-8">
                Извините, запрашиваемая вами страница не существует или была перемещена.
              </p>
              <a 
                href="/" 
                className="btn-primary flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Вернуться на главную
              </a>
            </div>
          </MainLayout>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;