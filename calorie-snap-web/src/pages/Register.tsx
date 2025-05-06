import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import './Register.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !firstName || !lastName) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    const fullName = `${firstName} ${lastName}`; // ✔️ eksik tanım düzeltildi

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'profiles', user.uid), {
        fullName,
        email
      });

      alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
      navigate('/'); // login.tsx sayfasına yönlendir
    } catch (error: any) {
      alert(`Kayıt Hatası: ${error.message}`);
    }
  };

  return (
    <div className="register-container">
      <h2>Kayıt Ol</h2>
      <input placeholder="İsim" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input placeholder="Soyisim" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Hesap oluştur</button>
      <p className="login-redirect" onClick={() => navigate('/')}>
        Zaten hesabınız var mı? Giriş yap
      </p>
    </div>
  );
}
