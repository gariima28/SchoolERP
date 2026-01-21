
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import DashboardLayout from './Dashboard/DashboardLayout';
import DashboardLayout from './Dashboard/MainLayout';
import WithoutAuth from './Main/WithoutAuth';
import Prefix from './Main/Prefix';

function App() {

  const token = sessionStorage.getItem('token');
  const subscriptionVal = sessionStorage.getItem('subscription');

  return (
    <>
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
