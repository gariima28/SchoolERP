
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import DashboardLayout from './Dashboard/DashboardLayout';
import DashboardLayout from './Dashboard/MainLayout';
import WithoutAuth from './Main/WithoutAuth';
import Prefix from './Main/Prefix';
import GlobalNotification from './globalNotification';
import { requestNotificationPermission } from "./notificationPermission";
import { onMessage } from "firebase/messaging";
import { messaging } from "./firebase";
import 'react-notifications-component/dist/theme.css'

function App() {

  const [fireBaseValue, setFireBaseValue] = useState(null);
  const [fireBaseId, setFireBaseId] = useState(null);
  console.log('value in state ', fireBaseValue)

  // useEffect(() => {
  //   const unsubscribe = onMessage(messaging, (payload) => {
  //     console.log("Foreground message app:", payload);
  //     setFireBaseValue(payload.notification);
  //     setFireBaseId(payload?.data?.messageId);
  //   });
  //   return () => unsubscribe();
  // }, []);
useEffect(() => {
  const unsubscribe = onMessage(messaging, (payload) => {
    console.log("Foreground message app:", payload);

    // notification data (optional)
    setFireBaseValue(payload.notification);

    // 🔥 FORCE UNIQUE TRIGGER
    setFireBaseId({
      messageId: payload?.data?.messageId,
      trigger: Date.now()
    });
  });

  return () => unsubscribe();
}, []);

  useEffect(() => {
    const initFCM = async () => {
      const existingToken = sessionStorage.getItem("fcmToken");

      if (!existingToken) {
        await requestNotificationPermission();
      }
    };

    initFCM();
  }, []);

  const token = sessionStorage.getItem('token');
  const subscriptionVal = sessionStorage.getItem('subscription');

  return (
    <>
      <GlobalNotification fireBaseValue={fireBaseValue} />
      {/* <div>App Loaded</div> */}
      {token
        ?
        <>
          {subscriptionVal === 'setPrefix'
            ?
            <Prefix />
            :
            <Routes>
              <Route path="/*" element={<DashboardLayout fireBaseId={fireBaseId} />} />
              {/* <Route path="/error" element={<ErrorLayout />} /> */}
            </Routes>
          }
        </>
        :
        <WithoutAuth />
      }
    </>
  );
}

export default App;
