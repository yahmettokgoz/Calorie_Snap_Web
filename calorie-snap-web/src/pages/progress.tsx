import './Progress.css';

export default function ProgressPage() {
  const mockData = [
    { date: '01/05/2025', calories: 1800 },
    { date: '02/05/2025', calories: 2200 },
    { date: '03/05/2025', calories: 2000 },
  ];

  return (
    <div className="progress-container">
      <h2>📊 İlerlemeni Gör</h2>
      <div className="progress-list">
        {mockData.map((entry, index) => (
          <div key={index} className="progress-item">
            <span>{entry.date}</span>
            <span>{entry.calories} kcal</span>
          </div>
        ))}
      </div>
    </div>
  );
}
