import React from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../../components/admin/ProductForm';

const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return <ProductForm isEditing={!!id} />;
};

export default ProductFormPage;