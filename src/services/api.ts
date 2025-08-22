// API Base URL
import { API_BASE_URL } from '../config/api';

// Works service
export const WorksService = {
  // Get all works
  getAllWorks: async () => {
    const response = await fetch(`${API_BASE_URL}/works`);
    if (!response.ok) throw new Error('Failed to fetch works');
    return response.json();
  },

  // Get work by ID
  getWork: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/works/${id}`);
    if (!response.ok) throw new Error('Failed to fetch work');
    return response.json();
  },

  // Admin operations
  createWork: async (workData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/works`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(workData),
    });
    if (!response.ok) throw new Error('Failed to create work');
    return response.json();
  },

  updateWork: async (id: string, workData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/works/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(workData),
    });
    if (!response.ok) throw new Error('Failed to update work');
    return response.json();
  },

  deleteWork: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/works/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error('Failed to delete work');
    return response.json();
  }
};

// Product services
export const ProductService = {
  // Get all products
  getAllProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products/featured`);
    if (!response.ok) throw new Error('Failed to fetch featured products');
    return response.json();
  },

  // Get product by ID
  getProduct: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  // Get products by category
  getProductsByCategory: async (categoryId: string) => {
    const response = await fetch(`${API_BASE_URL}/products/category/${categoryId}`);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    return response.json();
  }
};

// Category services
export const CategoryService = {
  // Get all categories
  getAllCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  // Get category by ID
  getCategory: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  },

  // Get categories with children (hierarchical)
  getCategoriesHierarchical: async () => {
    const response = await fetch(`${API_BASE_URL}/categories/hierarchical`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  // Get parent categories only
  getParentCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories/parents`);
    if (!response.ok) throw new Error('Failed to fetch parent categories');
    return response.json();
  },

  // Admin operations
  createCategory: async (categoryData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error('Failed to create category');
    return response.json();
  },

  updateCategory: async (id: string, categoryData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error('Failed to update category');
    return response.json();
  },

  deleteCategory: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error('Failed to delete category');
    return response.json();
  }
};

// Service services
export const ServiceService = {
  // Get all services
  getAllServices: async () => {
    const response = await fetch(`${API_BASE_URL}/services`);
    if (!response.ok) throw new Error('Failed to fetch services');
    return response.json();
  },

  // Get service by ID
  getService: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/services/${id}`);
    if (!response.ok) throw new Error('Failed to fetch service');
    return response.json();
  },

  // Get active services
  getActiveServices: async () => {
    const response = await fetch(`${API_BASE_URL}/services/active`);
    if (!response.ok) throw new Error('Failed to fetch active services');
    return response.json();
  },

  // Get hierarchical services
  getHierarchicalServices: async () => {
    const response = await fetch(`${API_BASE_URL}/services/hierarchical`);
    if (!response.ok) throw new Error('Failed to fetch hierarchical services');
    return response.json();
  },

  // Admin operations
  createService: async (serviceData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });
    if (!response.ok) throw new Error('Failed to create service');
    return response.json();
  },

  updateService: async (id: string, serviceData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });
    if (!response.ok) throw new Error('Failed to update service');
    return response.json();
  },

  deleteService: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/services/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error('Failed to delete service');
    return response.json();
  }
};

// Menu services
export const MenuService = {
  // Get menu items
  getMenuItems: async () => {
    const response = await fetch(`${API_BASE_URL}/menu`);
    if (!response.ok) throw new Error('Failed to fetch menu items');
    return response.json();
  },

  // Admin operations
  createMenuItem: async (menuData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menuData),
    });
    if (!response.ok) throw new Error('Failed to create menu item');
    return response.json();
  },

  updateMenuItem: async (id: string, menuData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(menuData),
    });
    if (!response.ok) throw new Error('Failed to update menu item');
    return response.json();
  },

  deleteMenuItem: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error('Failed to delete menu item');
    return response.json();
  }
};

// Admin services
export const AdminService = {
  // Products
  getAdminProducts: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getAdminProduct: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  createProduct: async (productData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  updateProduct: async (id: string, productData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  deleteProduct: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  },

  // Categories
  getAdminCategories: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  createCategory: async (categoryData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error('Failed to create category');
    return response.json();
  },

  updateCategory: async (id: string, categoryData: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok) throw new Error('Failed to update category');
    return response.json();
  },

  deleteCategory: async (id: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error('Failed to delete category');
    return response.json();
  }
};

// Authentication service
export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Failed to login');
    return response.json();
  }
};

// Order service
export const OrderService = {
  // Create new order
  createOrder: async (orderData: { name: string; phone: string; message: string }) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  // Get all orders (admin)
  getAllOrders: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  // Update order status (admin)
  updateOrderStatus: async (id: string, status: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/orders/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return response.json();
  },


};