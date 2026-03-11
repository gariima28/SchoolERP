import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { MyUseContext } from '../src/Pages/Admin/ContextApi/UseContext.jsx';

import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Create a wrapper component to hold the state
const ContextWrapper = ({ children }) => {
  const [myId, setMyId] = useState();
  const [profileImageForBasicInfo, setProfileImageForBasicInfo] = useState(null);
  const [booleanForLogoUpdate, setBooleanForLogoUpdate] = useState(false);
  return (
    <MyUseContext.Provider value={{
      myId, setMyId, profileImageForBasicInfo,
      setProfileImageForBasicInfo, booleanForLogoUpdate, setBooleanForLogoUpdate}}>
      {children}
    </MyUseContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ContextWrapper>
          <App />
          <Toaster />
        </ContextWrapper>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)



//Saqib_New