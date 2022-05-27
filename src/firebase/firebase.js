// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF4MVqV8NnwsxfPVeQjUjRRUe2s5gijck",
  authDomain: "subwars-1f229.firebaseapp.com",
  projectId: "subwars-1f229",
  storageBucket: "subwars-1f229.appspot.com",
  messagingSenderId: "327959736505",
  appId: "1:327959736505:web:56980ef1f644112c17eb68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;