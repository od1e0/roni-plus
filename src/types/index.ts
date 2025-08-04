export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description: string;
  materials?: string[];
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export type AccessibilityMode = 'default' | 'blind' | 'deaf';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}