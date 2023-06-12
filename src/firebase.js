import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzEjLfmPzwWz_aNV-0HaXUAOaed_pWPrI",
  authDomain: "audio-player-43da7.firebaseapp.com",
  projectId: "audio-player-43da7",
  storageBucket: "audio-player-43da7.appspot.com",
  messagingSenderId: "525019792093",
  appId: "1:525019792093:web:91646ce86a2474c8de9134"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}