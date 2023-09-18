// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYaIuGqFmRFzmOYeawl_7ZZvUlSIRC9Fc",
    authDomain: "email-password-auth-a5e2a.firebaseapp.com",
    projectId: "email-password-auth-a5e2a",
    storageBucket: "email-password-auth-a5e2a.appspot.com",
    messagingSenderId: "492836570648",
    appId: "1:492836570648:web:05c8360d7289953067656d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;