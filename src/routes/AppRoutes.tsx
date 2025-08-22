import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../components/admin/AdminLayout';
import AuthGuard from '../components/admin/AuthGuard';
import { AuthProvider } from '../contexts/AuthContext';

// Public pages
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import DeliveryPage from '../pages/DeliveryPage';
import WorksPage from '../pages/WorksPage';
import SalePage from '../pages/SalePage';
import PublicServicesPage from '../pages/ServicesPage';
import ServiceDetailPage from '../pages/ServiceDetailPage';

// Admin pages
import LoginPage from '../pages/admin/LoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import AdminProductsPage from '../pages/admin/ProductsPage';
import ProductFormPage from '../pages/admin/ProductFormPage';
import CategoriesPage from '../pages/admin/CategoriesPage';
import ServicesPage from '../pages/admin/ServicesPage';
import AdminWorksPage from '../pages/admin/WorksPage';
import OrdersPage from '../pages/admin/OrdersPage';
import CalculatorPage from '../pages/admin/CalculatorPage';
import { useAuth } from '../contexts/AuthContext';

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        
        {/* Product Routes */}
        <Route path="/products" element={<MainLayout><ProductsPage /></MainLayout>} />
        <Route path="/products/category/:categoryId" element={<MainLayout><ProductsPage /></MainLayout>} />
        <Route path="/products/detail/:id" element={<MainLayout><ProductDetailPage /></MainLayout>} />
        
        {/* Category Routes - now handled by /products/category/:categoryId */}
        
        {/* Sale Routes */}
        <Route path="/sale" element={<MainLayout><SalePage /></MainLayout>} />
        
        {/* Service Routes */}
        <Route path="/services" element={<MainLayout><PublicServicesPage /></MainLayout>} />
        <Route path="/services/:id" element={<MainLayout><ServiceDetailPage /></MainLayout>} />
        
        {/* Information Pages */}
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
        <Route path="/delivery" element={<MainLayout><DeliveryPage /></MainLayout>} />
        <Route path="/works" element={<MainLayout><WorksPage /></MainLayout>} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        
        <Route path="/admin" element={<AuthGuard><AdminLayout><DashboardPage /></AdminLayout></AuthGuard>} />
        <Route path="/admin/dashboard" element={<AuthGuard><AdminLayout><DashboardPage /></AdminLayout></AuthGuard>} />
        
        {/* Admin Product Routes */}
        <Route path="/admin/products" element={<AuthGuard><AdminLayout><AdminProductsPage /></AdminLayout></AuthGuard>} />
        <Route path="/admin/products/add" element={<AuthGuard><AdminLayout><ProductFormPage /></AdminLayout></AuthGuard>} />
        <Route path="/admin/products/edit/:id" element={<AuthGuard><AdminLayout><ProductFormPage /></AdminLayout></AuthGuard>} />
        
        {/* Admin Category Routes */}
        <Route path="/admin/categories" element={<AuthGuard><AdminLayout><CategoriesPage /></AdminLayout></AuthGuard>} />
        
        {/* Admin Service Routes */}
        <Route path="/admin/services" element={<AuthGuard><AdminLayout><ServicesPage /></AdminLayout></AuthGuard>} />
        
        {/* Admin Works Routes */}
        <Route path="/admin/works" element={<AuthGuard><AdminLayout><AdminWorksPage /></AdminLayout></AuthGuard>} />
        
        {/* Admin Orders Routes */}
        <Route path="/admin/orders" element={<AuthGuard><AdminLayout><OrdersPage /></AdminLayout></AuthGuard>} />
        
        {/* Admin Calculator Routes */}
        <Route path="/admin/calculator" element={<AuthGuard><AdminLayout><CalculatorPage /></AdminLayout></AuthGuard>} />
        
        {/* Admin Logout Route */}
        <Route 
          path="/admin/logout"
          element={<LogoutRoute />}
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
    </AuthProvider>
  );
};

// Helper component for logout
const LogoutRoute: React.FC = () => {
  const { logout } = useAuth();
  
  React.useEffect(() => {
    logout();
  }, [logout]);
  
  return null;
};

export default AppRoutes;