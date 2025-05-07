// src/pages/MealAdd.tsx
import { useState } from 'react';
import './MealAdd.css';

export default function MealAddPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async () => {
    setSearchResults([
      { name: 'Egg', calories: 155 },
      { name: 'Chicken Breast', calories: 165 },
      { name: 'Rice', calories: 130 }
    ]);
  };

  const handleSelectFood = (food: any) => {
    setSelectedFood(food);
    setShowModal(true);
  };

  const handleMealTimeSelection = (mealTime: string) => {
    console.log(`Selected: ${selectedFood.name} for ${mealTime}`);
    setShowModal(false);
  };

  return (
    <div className="meal-container">
      <h2>Yemek Ekle</h2>
      <input
        className="meal-input"
        type="text"
        placeholder="Yemek ara..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />

      <ul className="meal-list">
        {searchResults.map((item) => (
          <li key={item.name} onClick={() => handleSelectFood(item)} className="meal-item">
            <span>{item.name}</span>
            <strong>{item.calories} kcal</strong>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Öğün Seç</h3>
            <button onClick={() => handleMealTimeSelection('kahvaltı')}>🍳 Kahvaltı</button>
            <button onClick={() => handleMealTimeSelection('öğle')}>🍽️ Öğle</button>
            <button onClick={() => handleMealTimeSelection('akşam')}>🍲 Akşam</button>
            <button onClick={() => setShowModal(false)} className="cancel-button">İptal</button>
          </div>
        </div>
      )}
    </div>
  );
}
