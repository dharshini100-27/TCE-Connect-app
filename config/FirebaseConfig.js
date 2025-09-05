// config/firebaseConfig.js
/*import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALjO7je2TsES5kXq6-Lym6IYAV2_Zvm5Q",

  authDomain: "tce-connect-47725.firebaseapp.com",

  projectId: "tce-connect-47725",

  storageBucket: "tce-connect-47725.firebasestorage.app",

  messagingSenderId: "77746529355",

  appId: "1:77746529355:web:4d534793936a18c3fb59ce",

  measurementId: "G-Y2SBNKH1X5"

};

const app = initializeApp(firebaseConfig);

// ✅ Proper for React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { app, auth, db };*/
// config/FirebaseConfig.js
// config/FirebaseConfig.js
// config/FirebaseConfig.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALjO7je2TsES5kXq6-Lym6IYAV2_Zvm5Q",

  authDomain: "tce-connect-47725.firebaseapp.com",

  projectId: "tce-connect-47725",

  storageBucket: "tce-connect-47725.firebasestorage.app",

  messagingSenderId: "77746529355",

  appId: "1:77746529355:web:4d534793936a18c3fb59ce",

  measurementId: "G-Y2SBNKH1X5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

export { auth, db };

