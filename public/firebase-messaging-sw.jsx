importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD-bNa_LWqo5MdRzSdzEiW00rQCezuM2yw",
  authDomain: "school-erp-notifications.firebaseapp.com",
  projectId: "school-erp-notifications",
  storageBucket: "school-erp-notifications.firebasestorage.app",
  messagingSenderId: "178535768962",
  appId: "1:178535768962:web:e3372804e87d144aab659b",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Background message received:", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png",
  });
});
