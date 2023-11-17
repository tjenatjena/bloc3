import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProductForm = ({ productId, onProductEdited, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${productId}`)
      .then(response => {
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
      })
      .catch(error => console.error('Error fetching product details:', error));
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/api/products/${productId}`, {
        name,
        price,
        category,
      });

      onProductEdited(response.data);
      onClose(); // Fermez le formulaire d'édition après soumission
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </label>
      <br />
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <br />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default EditProductForm;
