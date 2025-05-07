// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import UserInfo from './pages/UserInfo'; 
import MealAdd from './pages/MealAdd';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userinfo" element={<UserInfo />} /> {/* ✅ Yeni rota */}
        <Route path="/home" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/meal-add" element={<MealAdd />} />

      </Routes>
    </Router>
  );
};

export default App;
