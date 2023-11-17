import React, { useState } from 'react';
import EditProductForm from './EditProductForm';

const ProductList = ({ products, isLoggedIn }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleEditClick = (productId) => {
    setSelectedProductId(productId);
  };

  const handleCloseEditForm = () => {
    setSelectedProductId(null);
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <strong>Name:</strong> {product.name},&nbsp;
            <strong>Price:</strong> {product.price},&nbsp;
            <strong>Category:</strong> {product.category},&nbsp;
            {isLoggedIn && selectedProductId === product.id && (
              <EditProductForm
                productId={product.id}
                onClose={handleCloseEditForm}
              />
            )}
            {isLoggedIn && selectedProductId !== product.id && (
              <button onClick={() => handleEditClick(product.id)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
