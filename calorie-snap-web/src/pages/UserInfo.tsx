import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import './UserInfo.css';

export default function UserInfoPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isim, setIsim] = useState('');
  const [soyisim, setSoyisim] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else navigate('/');
    });
    return unsubscribe;
  }, [navigate]);

  const handleContinue = async () => {
    if (!isim || !soyisim || !gender || !age || !weight || !height) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      await setDoc(doc(db, 'profiles', user.uid), {
        isim,
        soyisim,
        gender,
        age: Number(age),
        weight: Number(weight),
        height: Number(height),
        email: user.email
      });
      navigate('/home');
    } catch (err) {
      alert('Hata: Veriler kaydedilemedi.');
      console.error(err);
    }
  };

  return (
    <div className="user-info-container">
      <h2>Kişisel Bilgilerini Gir</h2>
      <input placeholder="İsim" value={isim} onChange={(e) => setIsim(e.target.value)} />
      <input placeholder="Soyisim" value={soyisim} onChange={(e) => setSoyisim(e.target.value)} />
      <input type="number" placeholder="Yaş" value={age} onChange={(e) => setAge(e.target.value)} />
      <input type="number" placeholder="Kilo (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <input type="number" placeholder="Boy (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />

      <div className="gender-buttons">
        <button
          className={gender === 'Erkek' ? 'selected' : ''}
          onClick={() => setGender('Erkek')}>Erkek</button>
        <button
          className={gender === 'Kadın' ? 'selected' : ''}
          onClick={() => setGender('Kadın')}>Kadın</button>
      </div>

      <button className="continue-button" onClick={handleContinue}>
        Kaydet ve Devam Et
      </button>
    </div>
  );
}
