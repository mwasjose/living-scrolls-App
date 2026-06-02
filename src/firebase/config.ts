import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCiGbw60JJwi1G8goUuiknaDEJEFaYmUk0",
  authDomain: "living-scrolls.firebaseapp.com",
  databaseURL: "https://living-scrolls-default-rtdb.firebaseio.com",
  projectId: "living-scrolls",
  storageBucket: "living-scrolls.firebasestorage.app",
  messagingSenderId: "247898058346",
  appId: "1:247898058346:web:f2083684cea9f1b0276413",
  measurementId: "G-73NEYND3E3"
};

// Initialize Firebase only in browser environment
let app: any = null;
let db: any = null;
let storage: any = null;
let auth: any = null;

if (typeof window !== 'undefined') {
  app = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp();

  // Firebase services
  db = getFirestore(app);
  storage = getStorage(app);
  auth = getAuth(app);
}

export { app, db, storage, auth };

// Analytics only in browser with support check
export const initializeAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};

export default app;