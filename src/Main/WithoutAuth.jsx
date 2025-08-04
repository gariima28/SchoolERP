import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ForgetSuccess from 'src/Pages/ForgetSuccess';
import ForgotPassword from 'src/Pages/ForgotPassword';
import VerifyOTP from 'src/Pages/VerifyOTP';
import NewPassSet from 'src/Pages/NewPassSet';
import Login from 'src/Pages/Login';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #F2F3F6;
`;

const WithoutAuth = () => {
  return (
    <>
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgetsuccess" element={<ForgetSuccess />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/verifyOtp" element={<VerifyOTP />} />
          <Route path="/setNewPass" element={<NewPassSet />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      </Container>
    </>
  );
}

export default WithoutAuth
