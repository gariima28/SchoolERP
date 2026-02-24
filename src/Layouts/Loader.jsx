import React from 'react';
import { BallTriangle, Circles, ThreeCircles } from "react-loader-spinner"
import styled from 'styled-components';

const DataLoaderContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const DataLoader = () => {
    return (
        <DataLoaderContainer>
            <p className='font20 mb-4' style={{ color: "#029084" }}>
                Please be patient, data is loading...
            </p>
            <Circles height="100" width="100" color="#008479" ariaLabel="circles-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        </DataLoaderContainer>
    );
};

export default DataLoader;
