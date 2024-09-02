import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZfMGc1recDJhnDzOqCUET84-3bPbSZ7w",
  authDomain: "pod-bigly.firebaseapp.com",
  projectId: "pod-bigly",
  storageBucket: "pod-bigly.appspot.com",
  messagingSenderId: "418313384838",
  appId: "1:418313384838:web:a05d7a9a91301e8d43b207",
  measurementId: "G-QKW5E7H7FJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
