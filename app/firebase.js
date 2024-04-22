// Import the functions you need from the SDKs you need
import { getFirestore, initializeFirestore } from 'firebase/firestore';

import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyANxg8vktU1blonyijQI1rsDBqWIzMQAmo",
    authDomain: "owlchat-ce4ba.firebaseapp.com",
    projectId: "owlchat-ce4ba",
    storageBucket: "owlchat-ce4ba.appspot.com",
    messagingSenderId: "1087985514941",
    appId: "1:1087985514941:web:b912dc5fba252783357ad4",
    measurementId: "G-23497DPLQQ"
};


const app = initializeApp(firebaseConfig); // This initializes your Firebase app
const auth = getAuth(app); // This gets the auth service linked to your Firebase app
const db = getFirestore(app);

export { auth, db };
