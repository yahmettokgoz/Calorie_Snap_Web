import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import './UserInfo.css';

export default function UserInfoPage() {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = async () => {
    if (!age || !height || !weight || !gender || !goal) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        alert('Kullanıcı oturumu bulunamadı.');
        return;
      }

      const profileRef = doc(db, 'profiles', user.uid);
      await setDoc(profileRef, {
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        gender,
        goal,
      }, { merge: true }); // önceki verileri silmesin

      navigate('/home');
    } catch (error: any) {
      alert(`Hata: ${error.message}`);
    }
  };

  return (
    <div className="userinfo-container">
      <h2>Profil Bilgileri</h2>
      <input placeholder="Yaş" value={age} onChange={(e) => setAge(e.target.value)} />
      <input placeholder="Boy (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
      <input placeholder="Kilo (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <input placeholder="Cinsiyet" value={gender} onChange={(e) => setGender(e.target.value)} />
      <input placeholder="Hedefiniz" value={goal} onChange={(e) => setGoal(e.target.value)} />
      <button onClick={handleSubmit}>Kaydet ve Devam Et</button>
    </div>
  );
}
