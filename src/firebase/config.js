// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT8Jpr7QHZD_up4o8mAASYnXmO_4BBj1k",
  authDomain: "finalproject-bd009.firebaseapp.com",
  projectId: "finalproject-bd009",
  storageBucket: "finalproject-bd009.appspot.com",
  messagingSenderId: "148014252079",
  appId: "1:148014252079:web:6285ebbaaeb334bf7ec6da",
  measurementId: "G-BHPKM6YYBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Export all the necessary Firebase services
export { auth, db, storage };
