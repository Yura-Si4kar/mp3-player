import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";
// import { getFirestore } from "firebase/firestore";

// const db = getFirestore(app);

const auth = getAuth(app);

export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const getAuthUserId = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribe();
        resolve(user.uid);
      } else {
        reject(new Error("Користувач не авторизований"));
      }
    });
  });
};