
import React from 'react';
import ReactDOM from 'react-dom';
import { IdProvider } from './Context/IdContext';
import MainUserForm from './MainUserForm';
import User_basic_infomation from './User_basic_infomation';

return (
  <IdProvider>
    <MainUserForm />
    <User_basic_infomation />
  </IdProvider>
);


// ReactDOM.render(
//   <Routing>
//     {/* <App /> */}
//       <MainUserForm />
//         <User_basic_infomation />
//   </Routing>,
//   document.getElementById('root')
// );

