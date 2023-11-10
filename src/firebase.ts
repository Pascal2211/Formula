import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBufYAA0xdS4G5A6W5aOpowqHSBNj4dLH4",
    authDomain: "formula-30243.firebaseapp.com",
    projectId: "formula-30243",
    storageBucket: "formula-30243.appspot.com",
    messagingSenderId: "839518724587",
    appId: "1:839518724587:web:42154e6a3e3fc5b90839ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export { db };