import { createContext, useState } from 'react';

export const MyContext = createContext(0);


// export const IdContext = createContext({
//   sharedId: 0,
//   setSharedId: () => {} 
// });

export const IdProvider = ({children}) => {

  const [sharedId, setSharedId] = useState('');  

  console.log('Provider rendered with sharedId:', sharedId);

  return  (
    <MyContext.Provider value={{ sharedId, setSharedId }}> 
      {children}
    </MyContext.Provider>
  )
};