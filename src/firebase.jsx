import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD-bNa_LWqo5MdRzSdzEiW00rQCezuM2yw",
  authDomain: "school-erp-notifications.firebaseapp.com",
  projectId: "school-erp-notifications",
  storageBucket: "school-erp-notifications.firebasestorage.app",
  messagingSenderId: "178535768962",
  appId: "1:178535768962:web:e3372804e87d144aab659b",
  measurementId: "G-MC1NVMJZ8G"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
