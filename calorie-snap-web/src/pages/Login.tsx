import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './Login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const profileRef = doc(db, 'profiles', user.uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        navigate('/home');
      } else {
        navigate('/userinfo');
      }
    } catch (error: any) {
      alert(`Giriş Hatası: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Giriş Yap</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        Giriş Yap
      </button>
      <p className="register-link" onClick={() => navigate('/register')}>
        Hesabınız yok mu? Kayıt olun
      </p>
    </div>
  );
}
