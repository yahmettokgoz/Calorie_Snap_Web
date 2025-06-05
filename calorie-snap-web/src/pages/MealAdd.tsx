import { useState } from 'react';
import './MealAdd.css';

export default function MealAdd() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    // Sahte veri
    setResults([
      { name: 'Egg', calories: 155 },
      { name: 'Chicken Breast', calories: 165 },
      { name: 'Rice', calories: 130 }
    ]);
  };

  return (
    <div className="mealadd-container">
      <h2>Yemek Ekle</h2>
      <input
        placeholder="Yemek ara..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />

      <div className="results">
        {results.map((item) => (
          <div key={item.name} className="food-card">
            <span>{item.name}</span>
            <span className="calories">{item.calories} kcal</span>
          </div>
        ))}
      </div>
    </div>
  );
}
