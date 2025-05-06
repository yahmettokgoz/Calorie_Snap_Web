// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-b7YfReIp_CWm0RFLwhDDezgK01yHD_E",
  authDomain: "mobilcaloriesnap-a8174.firebaseapp.com",
  projectId: "mobilcaloriesnap-a8174",
  storageBucket: "mobilcaloriesnap-a8174.appspot.com", // ← düzeltildi
  messagingSenderId: "741887630026",
  appId: "1:741887630026:web:6b603bc9f33c7ee5123233",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
