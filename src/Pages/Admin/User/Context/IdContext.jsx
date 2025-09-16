import { createContext, useState } from 'react';

export const MyContext = createContext(0);


// export const IdContext = createContext({
//   sharedId: 0,
//   setSharedId: () => {} 
// });

export const IdProvider = ({children}) => {

  const [sharedId, setSharedId] = useState('');
  const [profileImageForBasicInfo, setProfileImageForBasicInfo] = useState(null);
  


  console.log('Provider rendered with sharedId:', profileImageForBasicInfo);

  return  (
    <MyContext.Provider value={{ sharedId, setSharedId, profileImageForBasicInfo, 
    setProfileImageForBasicInfo  }}> 
      {children}
    </MyContext.Provider>
  )
};