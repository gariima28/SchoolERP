import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoleBasedRoutes } from '../Main/RoleBasedRoutes';

const ErrorLayout = () => {

  // console.log('im in error layout')
  const navigate = useNavigate();
  const location = useLocation();
  const [matchedRole, setMatchedRole] = useState(null);

  useEffect(() => {
    const role = sessionStorage.getItem('loggedInUserRole');
    const allowedRoutes = RoleBasedRoutes[role] || [];
    const isRouteAuthorized = allowedRoutes.some(route => route.path === location.pathname);

    if (!isRouteAuthorized) {
      navigate('/')
    }
  }, [location]);


  useEffect(() => {
    let foundRole = null;

    for (const role in RoleBasedRoutes) {
      const isMatch = RoleBasedRoutes[role].some(route => route.path === location.pathname);
      if (isMatch) {
        // console.log(isMatch)
        foundRole = role;
        break; // Exit loop if found
      }
    }

    setMatchedRole(foundRole);
  }, [location]);

  return (
    <div>
      {matchedRole ? (
        <div>
          <h1>Access Granted</h1>
          <p>The current path belongs to the <strong>{matchedRole}</strong> role.</p>
        </div>
      ) : (
        <div>
          <h1>Page Not Found</h1>
          <p>No path found in RoleBasedRoutes.</p>
        </div>
      )}
    </div>
  );
};

export default ErrorLayout;















// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { RoleBasedRoutes } from '../Main/RoleBasedRoutes'; // Assuming this is where your RoleBasedRoutes is imported from

// const ErrorLayout = () => {
//   const location = useLocation();
//   const [isUnauthorized, setIsUnauthorized] = useState(false);

//   useEffect(() => {
//     const role = sessionStorage.getItem('loggedInUserRole');
//     const allowedRoutes = RoleBasedRoutes[role] || [];
//     const isRouteAuthorized = allowedRoutes.some(route => route.path === location.pathname);

//     if (!isRouteAuthorized) {
//       setIsUnauthorized(true);
//     }
//   }, [location]);

//   return (
//     <div>
//       {isUnauthorized ? (
//         <div>
//           <h1>Unauthorized Access</h1>
//           <p>You do not have permission to access this page.</p>
//         </div>
//       ) : (
//         <div>
//           <h1>Page Not Found</h1>
//           <p>The requested page does not exist.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ErrorLayout;
