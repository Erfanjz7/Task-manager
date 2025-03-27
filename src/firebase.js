import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCC8UMbBbbqgazTBYmWOaS1gMXMDBmwoRQ",
  authDomain: "task-manager-163b4.firebaseapp.com",
  projectId: "task-manager-163b4",
  storageBucket: "task-manager-163b4.appspot.com",
  messagingSenderId: "712380495186",
  appId: "1:712380495186:web:1766f5773623fbac6bf68b",
  measurementId: "G-98NBWFY83P",
};

// مقداردهی اولیه Firebase
const app = initializeApp(firebaseConfig);

// مقداردهی اولیه Authentication
const auth = getAuth(app);

// مقداردهی اولیه Firestore با فعال کردن `experimentalForceLongPolling`
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,  // این گزینه رو هم غیرفعال کن
});

export { auth, db };
