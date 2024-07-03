import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHmmL55lQfhOBOtZkq1z5F37n5Qw2q7oI",
  authDomain: "tissue-dispenser-fe5fc.firebaseapp.com",
  projectId: "tissue-dispenser-fe5fc",
  storageBucket: "tissue-dispenser-fe5fc.appspot.com",
  messagingSenderId: "381360546549",
  appId: "1:381360546549:web:b09065d3b9bb601134dbbc",
  measurementId: "G-TD2TXWNDDQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs };