import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { MyUseContext } from '../src/Pages/Admin/ContextApi/UseContext.jsx';

// Create a wrapper component to hold the state
const ContextWrapper = ({ children }) => {
  const [myId, setMyId] = useState(10)

  return (
    <MyUseContext.Provider value={{ myId, setMyId }}>
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

