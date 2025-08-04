// src/context/IdContext.js
import React, { createContext, useState } from 'react';

export const IdContext = createContext();

export const IdProvider = ({ children }) => {
  const [sharedId, setSharedId] = useState(null);

  return (
    <IdContext.Provider value={{ sharedId, setSharedId }}>
      {children}
    </IdContext.Provider>
  );
};