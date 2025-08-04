import React, { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SuperAdminDashboard = React.lazy(() => import('src/Pages/SuperAdmin/SuperAdminDashboard'));
const AdminDashboard = React.lazy(() => import('src/Pages/Admin/AdminDashboard'));
const ParentDashboardPage = React.lazy(() => import('src/Pages/Student-Parent/ParentDashboardPage'));
const StudentDashboardPage = React.lazy(() => import('src/Pages/Student-Parent/StudentDashboardPage'));
const TeacherDashboardPage = React.lazy(() => import('src/Pages/Teacher/TeacherDashboard'));

import { RoleBasedRoutes } from './RoleBasedRoutes';
import DataLoader from 'src/Layouts/Loader';

const Container = styled.div`
  height: 100%;
  overflow: scroll;
  background-color: #f2f3f6;

  .mainScroll::-webkit-scrollbar {
    display: none;
  }
`;

const Main = () => {
  const location = useLocation();
  const role = sessionStorage.getItem('loggedInUserRole');
  const allowedRoutes = RoleBasedRoutes[role] || [];

  const isRouteAllowed = Object.values(RoleBasedRoutes)
    .flat()
    .some(route => route.path === location.pathname);

  return (
    <Container className='mainScroll'>
      <Suspense fallback={<DataLoader />}>
        <Routes>
          {role === 'SUPERADMIN' && <Route path='/' element={<SuperAdminDashboard />} />}
          {role === 'ADMIN' && <Route path='/' element={<AdminDashboard />} />}
          {role === 'PARENT' && <Route path='/' element={<ParentDashboardPage />} />}
          {role === 'STUDENT' && <Route path='/' element={<StudentDashboardPage />} />}
          {role === 'USER' && <Route path='/' element={<TeacherDashboardPage />} />}
          {allowedRoutes?.map((route, index) => (
            <Route key={route.path || index} path={route.path} element={route.element}>
              {route.children?.map((child, childIndex) => (
                <Route
                  key={child.path || childIndex}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          ))}
          {isRouteAllowed && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
      </Suspense>
    </Container>
  );
};

export default Main;