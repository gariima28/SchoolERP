import React, { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Header from "../Layouts/Navbar";
import Main from "../Main/Main";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

const Dashboard = () => {
    const [openSidebar, setOpenSidebar] = useState(true);

    return (
        <DashboardMainContainer>
            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
            <ContentWrapper>
                <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
                <Main />
            </ContentWrapper>
        </DashboardMainContainer>
    );
};

export default Dashboard;

const DashboardMainContainer = styled("div")`
  display: flex;
  height: 100vh;
`;

const ContentWrapper = styled("div")`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: scroll;
`;
