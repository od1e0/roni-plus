export interface Product {
  id: string;
  name: string;
  category: string;
  categoryName?: string; // Legacy поле для названия основной категории
  slug?: string; // Добавляем поле для slug
  price: number;
  images: string[];
  imageUrl?: string; // URL основного изображения (первое из массива)
  description: string;
  material?: string;
  type?: string;
  color?: string;
  finish?: string;
  width?: number;
  height?: number;
  depth?: number;
  weight?: number;
  categories: string[]; // Массив ID категорий (обязательное поле)
  categoryNames?: string[]; // NEW: Массив названий всех категорий товара
  // Поля для скидок
  isOnSale?: boolean; // Товар на распродаже
  salePrice?: number; // Цена со скидкой
  salePercentage?: number; // Процент скидки
  saleEndDate?: string; // Дата окончания скидки
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  order?: number;
  children?: Category[];
  isActive?: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  shortDescription?: string; // Краткое описание для карточек
  price?: number;
  category?: string;
  isActive: boolean;
  parentId?: string;
  order?: number;
  children?: Service[];
  // Изображения для услуг
  image?: string; // Основное изображение (первое из массива)
  images?: string[]; // Массив всех изображений услуги
}

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  type: 'page' | 'category' | 'service' | 'sale';
  children?: MenuItem[];
  order?: number;
  isActive: boolean;
}

export type AccessibilityMode = 'default' | 'blind' | 'deaf';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Work {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  location: string;
  year: number;
}

export interface Order {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: 'new' | 'viewed';
  createdAt: string;
  updatedAt: string;
}

export interface TelegramOrderStatus {
  orderId: string;
  status: 'new' | 'viewed';
  timestamp: string;
}

export interface CalculatorOrderData {
  selections: CalculatorSelection[];
  totalPrice: number;
  source: 'calculator' | 'form';
}

// Типы для калькулятора
export interface CalculatorPart {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  order: number;
  materials: CalculatorMaterial[];
  sizes: CalculatorSize[];
}

export interface CalculatorMaterial {
  id: string;
  name: string;
  origin: string;
  isActive: boolean;
  order: number;
}

export interface CalculatorSize {
  id: string;
  name: string;
  dimensions: string;
  price: number;
  isActive: boolean;
  order: number;
}

export interface CalculatorService {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
  order: number;
}

export interface CalculatorSelection {
  part: CalculatorPart;
  material: CalculatorMaterial;
  size: CalculatorSize;
  quantity: number;
  services: CalculatorService[];
  totalPrice: number;
}

export interface CalculatorOrder {
  selections: CalculatorSelection[];
  services: CalculatorService[];
  totalPrice: number;
}