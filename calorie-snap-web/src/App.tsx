import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register'; // eksikti, eklendi
import Home from './pages/Home';
import UserInfoPage from './pages/UserInfo';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* bu eklendi */}
        <Route path="/home" element={<Home />} />
        <Route path="/userinfo" element={<UserInfoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
