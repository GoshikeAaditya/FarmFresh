import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Farmers from './components/Farmers/Farmers';
import UglyProduce from './components/UglyProduce/UglyProduce';
import Recipes from './components/Recipes/Recipes';
import Cart from './components/Cart/Cart';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/farmers" element={<Farmers />} />
            <Route path="/ugly-produce" element={<UglyProduce />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
