import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmv6v3AdI06V57ypoYMJUnoty5AvnUoAM",
    authDomain: "portfoolio-2690a.firebaseapp.com",
    projectId: "portfoolio-2690a",
    storageBucket: "portfoolio-2690a.appspot.com",
    messagingSenderId: "695211633195",
    appId: "1:695211633195:web:a68e0126d19965fd58586e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);