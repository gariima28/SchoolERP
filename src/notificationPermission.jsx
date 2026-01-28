import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "YOUR_VAPID_KEY_FROM_FIREBASE",
      });

      console.log("FCM Token:", token);

      // 🔁 Send this token to backend API
      // await saveTokenApi(token);

      return token;
    } else {
      console.log("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting notification permission", error);
  }
};
