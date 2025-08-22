import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  newOrders: number;
  totalOrders: number;
}

const DashboardPage: React.FC = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    newOrders: 0,
    totalOrders: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch products count
        const productsResponse = await fetch('/api/admin/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const productsData = await productsResponse.json();
        
        // Fetch categories count
        const categoriesResponse = await fetch('/api/admin/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const categoriesData = await categoriesResponse.json();
        
        // Fetch orders count
        const ordersResponse = await fetch('/api/admin/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const ordersData = await ordersResponse.json();
        
        setStats({
          totalProducts: productsData.length,
          totalCategories: categoriesData.length,
          newOrders: ordersData.filter((order: any) => order.status === 'new').length,
          totalOrders: ordersData.length,
        });
      } catch (error) {
        setError('Ошибка при загрузке статистики');
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-card">
        <h1 className="text-2xl font-heading font-bold mb-6 text-neutral-800">Панель управления</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary text-sm font-medium">Всего товаров</p>
                <p className="text-3xl font-bold mt-1 text-primary-dark">{stats.totalProducts}</p>
              </div>
              <div className="bg-primary/20 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Новые заявки</p>
                <p className="text-3xl font-bold mt-1 text-red-700">{stats.newOrders}</p>
              </div>
              <div className="bg-red-500/20 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Всего заявок</p>
                <p className="text-3xl font-bold mt-1 text-blue-700">{stats.totalOrders}</p>
              </div>
              <div className="bg-blue-500/20 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary/10 border border-secondary/20 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-secondary text-sm font-medium">Категории</p>
                <p className="text-3xl font-bold mt-1 text-secondary-dark">{stats.totalCategories}</p>
              </div>
              <div className="bg-secondary/20 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-card">
        <h2 className="text-xl font-heading font-bold mb-5 text-neutral-800">Быстрые действия</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/orders" className="card border border-neutral-200 p-5 rounded-xl hover:bg-neutral-50 flex items-center gap-3 transition-colors">
            <div className="bg-red-500/10 rounded-full p-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-medium text-neutral-800">Просмотр заявок</span>
          </Link>
          
          <Link to="/admin/products/add" className="card border border-neutral-200 p-5 rounded-xl hover:bg-neutral-50 flex items-center gap-3 transition-colors">
            <div className="bg-primary/10 rounded-full p-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="font-medium text-neutral-800">Добавить товар</span>
          </Link>
          
          <Link to="/admin/categories" className="card border border-neutral-200 p-5 rounded-xl hover:bg-neutral-50 flex items-center gap-3 transition-colors">
            <div className="bg-accent/10 rounded-full p-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="font-medium text-neutral-800">Добавить категорию</span>
          </Link>
          
          <Link to="/admin/works/add" className="card border border-neutral-200 p-5 rounded-xl hover:bg-neutral-50 flex items-center gap-3 transition-colors">
            <div className="bg-green-500/10 rounded-full p-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-medium text-neutral-800">Добавить работу</span>
          </Link>
          
          <Link to="/admin/products" className="card border border-neutral-200 p-5 rounded-xl hover:bg-neutral-50 flex items-center gap-3 transition-colors">
            <div className="bg-blue-500/10 rounded-full p-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span className="font-medium text-neutral-800">Управление товарами</span>
          </Link>
          
          <Link to="/admin/categories" className="card border border-neutral-200 p-5 rounded-xl hover:bg-neutral-50 flex items-center gap-3 transition-colors">
            <div className="bg-purple-500/10 rounded-full p-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <span className="font-medium text-neutral-800">Управление категориями</span>
          </Link>
          
          <Link to="/admin/works" className="card border border-neutral-200 p-5 rounded-xl hover:bg-neutral-50 flex items-center gap-3 transition-colors">
            <div className="bg-orange-500/10 rounded-full p-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-medium text-neutral-800">Управление работами</span>
          </Link>
          
          <Link to="/admin/dashboard" className="card border border-neutral-200 p-5 rounded-xl hover:bg-neutral-50 flex items-center gap-3 transition-colors">
            <div className="bg-gray-500/10 rounded-full p-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="font-medium text-neutral-800">Обновить статистику</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;