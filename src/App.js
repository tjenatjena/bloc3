import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import LoginForm from './components/LoginForm';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Chargez les produits existants depuis votre API Flask, indépendamment de l'état de connexion
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching data:', error));

    // Vérifiez le stockage local pour voir si l'utilisateur est déjà connecté
    const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setLoggedIn(storedLoggedIn);

    // Si l'utilisateur est connecté, chargez ses informations
    if (storedLoggedIn) {
      axios.get('http://localhost:5000/api/status')
        .then(response => setUser(response.data))
        .catch(error => console.error('Error fetching user status:', error));
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    // Stockez l'état de connexion dans le stockage local
    localStorage.setItem('isLoggedIn', 'true');
    
    // Chargez les informations de l'utilisateur après la connexion
    axios.get('http://localhost:5000/api/status')
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user status:', error));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    // Supprimez l'état de connexion du stockage local lors de la déconnexion
    localStorage.removeItem('isLoggedIn');
    setUser(null); // Réinitialisez les informations de l'utilisateur
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <p>{`Vous êtes connecté`}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <ProductList
        products={products}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
};

export default App;
