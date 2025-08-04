import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components';
import AddSchoolIdPage from 'src/Pages/Admin/AddSchoolIdPage';
import SchoolPrefixSuccess from 'src/Pages/Admin/SchoolPrefixSuccess';

const Container = styled.div`
  background-color: #F2F3F6;
`;

const Prefix = () => {
    return (
        <>
            <Container>
                <Routes>
                    <Route path='/' element={<AddSchoolIdPage />} />
                    <Route path='/schoolPrefixSuccess' element={<SchoolPrefixSuccess />} />
                </Routes>
            </Container>
        </>
    )
}

export default Prefix
