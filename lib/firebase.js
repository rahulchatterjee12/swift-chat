import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCbaNu8O4ROpa9XerRzOxdv5tkAgTF8cwE",
    authDomain: "swift-chat-dab19.firebaseapp.com",
    projectId: "swift-chat-dab19",
    storageBucket: "swift-chat-dab19.appspot.com",
    messagingSenderId: "251376751797",
    appId: "1:251376751797:web:02a5c72621f23eb26fdafc",
    measurementId: "G-Y9J0DWNP8Z"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth }