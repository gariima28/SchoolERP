import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Layouts/Sidebar";
import Header from "../Layouts/Navbar";
import Main from "../Main/Main";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import introJs from "intro.js";
import "intro.js/introjs.css";

const Dashboard = ({ fireBaseId }) => {
  console.log('message id in main layout',fireBaseId)

  const [openSidebar, setOpenSidebar] = useState(true);
  const [tourData, setTourData] = useState(false);
  
  // const tourData = JSON.parse(
  //   sessionStorage.getItem('booleanForTour')
  // );
  // console.log('valid type of ------ ', tourData)

  const [showVideo, setShowVideo] = useState(false);

  console.log('vale check in main layout', tourData)

  const funcZindex = (value) => {
    setTourData(value);
  };

  useEffect(() => {
    window.handlePlayGuide = () => funcZindex(true);
    return () => {
      delete window.handlePlayGuide;
    };
  }, []);

  useEffect(() => {
    let timer = 0
    if (tourData) {
      timer = setTimeout(() => {
        introJs()
          .setOptions({
            showProgress: true,
            showBullets: false,
            exitOnOverlayClick: false,
            nextLabel: "Next →",
            prevLabel: "← Back",
            doneLabel: "Finish",
          })
          .start();
      }, 500);
    };
    return () => {
      clearTimeout(timer);
      introJs().exit();
    };
  }, [tourData]);

  return (
    <>
      <DashboardMainContainer>
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} funcZindex={funcZindex} />
        <ContentWrapper>
          <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} fireBaseId={fireBaseId} />
          <Main showVideo={showVideo} />
        </ContentWrapper>
      </DashboardMainContainer>
    </>
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






// useEffect(() => {
//   const observer = new MutationObserver(() => {
//     const btn = document.getElementById("play-guide-btn");
//     if (btn) {
//       btn.onclick = () => setShowVideo(true);
//     }
//   });

//   observer.observe(document.body, { childList: true, subtree: true });
//   return () => observer.disconnect();
// }, []);