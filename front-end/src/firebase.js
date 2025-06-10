// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4gAFnjEyYRFJOZppo4r5tUEtGwga9TKI",
    authDomain: "mern-immobilier.firebaseapp.com",
    projectId: "mern-immobilier",
    storageBucket: "mern-immobilier.firebasestorage.app",
    messagingSenderId: "685694308521",
    appId: "1:685694308521:web:657e32198540126e4399b8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
