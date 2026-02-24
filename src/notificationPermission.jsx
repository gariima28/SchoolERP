import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  try {
    // 1️⃣ Register service worker
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    // 2️⃣ Ask permission
    const permission = await Notification.requestPermission();

    
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BL0Msuf4cJ3p7ItHYNRAQyfdUM-ofm6kWHI1LjVkMw1Sc8NYyLRnHu4-WdpaWE-g-uy3OJN6Kirt7t7pKyCTHwk",
        serviceWorkerRegistration: registration,
      });
      sessionStorage.setItem("fcmToken", token);
      // console.log("🔥 FCM Token:", token);
      return token;
    } else {
      console.log("❌ Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};
