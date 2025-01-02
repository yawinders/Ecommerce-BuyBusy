// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHzUm0PxXjZvrkTg6ZTNRFnkIE0Y06RyE",
    authDomain: "ecommerce-buy-busy.firebaseapp.com",
    projectId: "ecommerce-buy-busy",
    storageBucket: "ecommerce-buy-busy.firebasestorage.app",
    messagingSenderId: "572061814218",
    appId: "1:572061814218:web:c7d53a896e823db8d71333"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app)

export const storage = getStorage(app);