
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import DashboardLayout from './Dashboard/DashboardLayout';
import DashboardLayout from './Dashboard/MainLayout';
import WithoutAuth from './Main/WithoutAuth';
import Prefix from './Main/Prefix';
import { requestNotificationPermission } from "./notificationPermission";

function App() {

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const token = sessionStorage.getItem('token');
  const subscriptionVal = sessionStorage.getItem('subscription');

  return (
    <>
    {/* <div>App Loaded</div> */}
      {token
        ?
        <>
          {subscriptionVal === 'setPrefix'
            ?
            <Prefix />
            :
            <Routes>
              <Route path="/*" element={<DashboardLayout />} />
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
