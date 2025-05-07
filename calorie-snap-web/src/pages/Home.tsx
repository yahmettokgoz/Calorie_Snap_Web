// src/pages/Home.tsx
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2>Hoş geldin, Kullanıcı 👋</h2>
      <p>Web uygulamasına başarıyla giriş yaptınız!</p>

      <div className="button-group">
        <button onClick={() => navigate('/meal-add')}>🍽️ Öğün Ekle</button>
        <button onClick={() => navigate('/progress')}>📊 İlerlemeni Gör</button>
        <button onClick={() => navigate('/photo-gallery')}>🖼️ Öğün Yükle (Galeri)</button>
      </div>
    </div>
  );
}
