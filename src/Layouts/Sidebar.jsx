import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { getSidebarDataApi, logoutApi } from "src/Utils/Apis";
import DataLoader from 'src/Layouts/Loader';
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import styled from "styled-components";
import introJs from "intro.js";
import "intro.js/introjs.css";
// Styled component for the sidebar
const Container = styled.div`
  height: 100%;
  z-index: 1;

  .drawerSidebar {
    border-right: 1px solid #D7E7E5;
  }

  .menus {
    position: relative;
    padding: 0.7rem;
    display: flex;
    color: #000;
    align-items: center;
    white-space: nowrap;
    text-decoration: none !important;
    transition: background-color 0.3s, color 0.3s;

    &:first-child {
      border-top: 1px solid #D7E7E5;
    }

    &:hover {
      background-color: #008479;
      color: #ffffff;
      border-right: 5px solid orange;
    }

    &:hover::before {
      content: "";
      position: absolute;
      right: -2.5px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-right: 10px solid orange;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }

    &:hover .sidebar-icon {
      filter: brightness(100); // White on hover
    }

    &:hover .MuiSvgIcon-root {
      color: #ffffff; // White on hover for arrow icons
    }

    &.active {
      background-color: var(--greenTextColor);
      color: #ffffff;
      border-right: 5px solid orange;
    }

    &.active::before {
      content: "";
      position: absolute;
      right: -2.5px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-right: 10px solid orange;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }

    &.active .sidebar-icon {
      filter: brightness(100); // White when active
    }

    &.active .MuiSvgIcon-root {
      color: #ffffff; // White when active for arrow icons
    }

    &.hover-active {
      background-color: #008479;
      color: #ffffff;
      border-right: 5px solid orange;
    }

    &.hover-active::before {
      content: "";
      position: absolute;
      right: -2.5px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-right: 10px solid orange;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }

    .menu-text {
      display: ${({ sidebarOpen }) => (sidebarOpen ? "inline" : "none")};
      margin-left: 10px;
      transition: margin-left 0.3s ease;
    }

    .sidebar-icon {
      width: 16px;
      height: 16px;
      filter: brightness(0);
    }

    .MuiSvgIcon-root {
      color: #000000;
    }
  }

  .subItemContainer {
    background-color: #fff;
  }

  .borderTopBottom {
    border-bottom: 1px solid #D7E7E5;
    border-top: 1px solid #D7E7E5;
  }

  .subItemContainer .menus {
    padding-left: 1.5rem;
    border-bottom: 1px solid #D7E7E5;

    &:first-child {
      border-top: 1px solid #D7E7E5;
    }

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: #008479;
      color: #ffffff;
    }

    &:hover .sidebar-icon {
      filter: brightness(100); // White on hover for sub-items
    }

    &.active {
      background-color: var(--greenTextColor);
      color: #ffffff;
    }

    &.active .sidebar-icon {
      filter: brightness(100); // White when active for sub-items
    }
  }

  .hover-menu {
    background-color: #eff8f7;
    border-radius: 5px;
    position: relative;

    .main-item {
      padding: 0.7rem;
      font-weight: bold;
      font-size: 0.85rem;
      color: #fff;
      background-color: #008479;
      border-bottom: 1px solid #D7E7E5;

      .sidebar-icon {
        filter: brightness(100); // White for main item in hover menu
        margin-right: 10px;
      }
    }

    .main-item-radius {
      border-radius: 5px 5px 0px 0px;
    }

    .main-item-no-radius {
      border-radius: 5px;
    }

    .sub-item {
      display: flex;
      align-items: center;
      padding: 0.7rem;
      color: #000;
      text-decoration: none !important;
      border-bottom: 1px solid #D7E7E5;
      position: relative;

      &:first-child {
        border-top: 1px solid #D7E7E5;
      }

      &:last-child {
        border-bottom: none;
        &:hover {
          border-radius: 0px 0px 5px 5px;
        }
        &.active {
          border-radius: 0px 0px 5px 5px !important;
        }
      }

      &:hover {
        color: #fff;
        background-color: #008479;
      }

      &:hover .sidebar-icon {
        filter: brightness(100); // White on hover
      }

      &.active {
        color: #fff;
        background-color: var(--greenTextColor);
      }

      &.active .sidebar-icon {
        filter: brightness(100); // White when active
      }

      .menu-text {
        margin-left: 10px;
      }
    }
  }

  ul {
    max-height: calc(100vh - 10vh);
    overflow: auto;
    list-style-type: none;
  }

  .dashed {
    list-style: none !important;
  }

  .show {
    height: 100%;
    overflow: hidden;
    transition: height 0.35s ease !important;
  }

  .hide {
    height: 0;
    overflow: hidden;
    transition: height 0.35s !important;
  }

  .modalHighborder {
    border-bottom: 2px solid var(--modalBorderColor);
  }

  .modalLightBorder {
    border-bottom: 1px solid var(--modalBorderColor);
  }

  .deleteSVG {
    position: relative;
    width: fit-content;
    margin-left: 43% !important;
    margin-bottom: -18% !important;
    background-color: #fff;
  }

  .greydiv {
    background-color: #FBFBFB;
  }

  .borderTOP {
    border-top: 1px solid var(--borderSidebar);
  }

  .borderBottom {
    border-bottom: 1px solid var(--borderSidebar);
  }

  .correvtSVG {
    position: relative;
    width: fit-content;
    margin-left: 43% !important;
    margin-bottom: -16% !important;
    background-color: #2BB673;
    width: 73px;
    height: 73px;
    align-items: center;
  }

  .contbtn {
    margin-left: 41% !important;
    margin-top: -20% !important;
  }
   /* Add this for iframe positioning */
  .video-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10050 !important; /* Higher than intro.js overlay */
  }

  .video-container {
    position: relative;
    width: 80%;
    max-width: 900px;
    z-index: 10051 !important; /* Higher than the overlay */
  }

  .video-close-btn {
    position: absolute;
    top: -15px;
    right: -15px;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    cursor: pointer;
    font-size: 18px;
    z-index: 10052 !important; /* Highest priority */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-iframe-wrapper {
    position: relative;
    z-index: 10051 !important;
  }

  .video-iframe-wrapper iframe {
    position: relative;
    z-index: 10051 !important;
  }
`;

const Sidebar = ({ openSidebar, setOpenSidebar, funcZindex }) => {
  // console.log('boolean value in sidebar', tourData)

  const [expandedMenu, setExpandedMenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const hoverTimerRef = useRef(null);
  const [dashboardItems, setDashboardItems] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
  const location = useLocation();
  const navigate = useNavigate();
  const logoutTimerRef = useRef(null);
  const [LogoutSuccess, setLogoutSuccess] = useState(true);
  const [loaderState, setLoaderState] = useState(false);

  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    const storedExpandedMenu = sessionStorage.getItem("expandedMenu");
    if (storedExpandedMenu) {
      setExpandedMenu(storedExpandedMenu);
    }
  }, []);

  useEffect(() => {
    if (expandedMenu) {
      sessionStorage.setItem("expandedMenu", expandedMenu);
    } else {
      sessionStorage.removeItem("expandedMenu");
    }
  }, [expandedMenu]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  useEffect(() => {
    if (!openSidebar) setExpandedMenu(null);
  }, [openSidebar]);

  useEffect(() => {
    if (isMobile) {
      setOpenSidebar(false);
    }
  }, [isMobile, setOpenSidebar]);

  useEffect(() => {
    const getSidebarData = async () => {
      try {
        setLoaderState(true);
        const response = await getSidebarDataApi("", "", "", "");
        console.log('sidebar response---',response)
        if (response?.status === 200 && response?.data?.status === "success") {
          setDashboardItems(response?.data?.data);
        } else {
          console.log(response?.data?.message);
        }
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setLoaderState(false);
      }
    };
    getSidebarData();
  }, []);

  useEffect(() => {
    const inactivityPeriod = 24 * 60 * 60 * 1000;
    logoutTimerRef.current = setTimeout(() => {
      handleLogout();
    }, inactivityPeriod);
    return () => clearTimeout(logoutTimerRef.current);
  }, []);

  useEffect(() => {
    const validateSession = () => {
      const token = sessionStorage.getItem("token");
      const loginTimestamp = sessionStorage.getItem("loginTimestamp");
      const maxSessionDuration = 12 * 60 * 60 * 1000;

      if (token && loginTimestamp) {
        const sessionAge = Date.now() - parseInt(loginTimestamp, 10);
        if (sessionAge > maxSessionDuration) {
          sessionStorage.clear();
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 300);
          toast.error("Session expired. Please log in again.");
        }
      } else {
        sessionStorage.clear();
        navigate("/");
      }
    };
    validateSession();
  }, [navigate]);

  const handleExpand = (key) => {
    setExpandedMenu((prev) => (prev === key ? null : key));
  };

  const handleMouseEnter = (event, item) => {
    if (!openSidebar) {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      setAnchorEl(event.currentTarget);
      setHoveredItem(item);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setHoveredItem(null);
      setAnchorEl(null);
    }, 300);
  };

  const handleUserLogout = () => {
    clearTimeout(logoutTimerRef.current);
    handleLogout();
  };

  const handleLogout = async () => {
    try {
      setLoaderState(true);
      const response = await logoutApi();
      if (response?.status === 200 && response?.data?.status === "success") {
        sessionStorage.removeItem("token");
        setLogoutSuccess(false);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        console.log(response?.data?.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoaderState(false);
    }
  };

  const isActiveLink = (activeLinks) => {
    if (!activeLinks) return false;
    const normalizedPathname = location.pathname.startsWith("/")
      ? location.pathname.slice(1)
      : location.pathname;

    return activeLinks.some((link) => {
      const normalizedLink = link.startsWith("/") ? link.slice(1) : link;
      const baseLink = normalizedLink.split("/:")[0];
      return (
        normalizedPathname === baseLink ||
        normalizedPathname.startsWith(baseLink + "/") ||
        normalizedPathname === normalizedLink ||
        normalizedPathname.startsWith(normalizedLink + "/")
      );
    });
  };


  useEffect(() => {
    const observer = new MutationObserver(() => {
      const btn = document.getElementById("play-guide-btn");
      if (btn) {
        btn.onclick = () => {
          setShowVideo(true)
          // setMyWalk(false)
          funcZindex(true)
          console.log('checkkkk me')

        };
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [funcZindex]);

  const sideBarData = {
    title: "Your Management Toolkit",
    intro: `
    This is your main control panel. Navigate through distinct modules like 
    <b>Student Info</b>, <b>Fees Collection</b>, and <b>Examinations</b> here. 
    Click any category to expand its options.
    <br/><br/>
    <b>Need help?</b> Please click here
    <br/><br/>
    <button 
      id="play-guide-btn"
      style="
        display:flex;
        align-items:center;
        gap:8px;
        padding:6px 14px;
        border:none;
        border-radius:6px;
        background:#008479;
        color:#fff;
        cursor:pointer;
      "
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1200 1200">
        <path fill="#ffffff" d="M600 1200C268.65 1200 0 931.35 0 600S268.65 0 600 0s600 268.65 600 600s-268.65 600-600 600M450 300.45v599.1L900 600z" />
      </svg>
      Play Guide 
    </button>
  `
  };



  return (

    <Container sidebarOpen={openSidebar}>
      {loaderState && <DataLoader />}
      {showVideo && (
        <div
          className=""
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}>

          <div style={{ position: "relative", width: "80%", maxWidth: "900px" }}>

            <button
              onClick={() => setShowVideo(false)}
              style={{
                position: "absolute",
                top: "-15px",
                right: "-15px",
                background: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "35px",
                height: "35px",
                cursor: "pointer",
                fontSize: "18px",
                zIndex: 10001,
              }} >
              ✕
            </button>
            <div className="ratio ratio-16x9 " >
              <iframe style={{ zIndex: 10000, }} src="https://www.youtube.com/embed/iEasMXu72No" title="YouTube video" allowFullScreen ></iframe>
            </div>

          </div>
        </div>
      )}
      <div data-title={`${sideBarData.title}`} data-intro={`${sideBarData.intro}`} className="card-demo" data-step="1" >
        <div className="card shadow--md ">
          {(!isMobile || (isMobile && openSidebar)) && (
            <div
              className="drawerSidebar"
              style={{
                width: isMobile ? (openSidebar ? 300 : 0) : openSidebar ? 240 : 60,
                opacity: isMobile && !openSidebar ? 0 : 1,
                transition: isMobile
                  ? "width 0.3s ease, opacity 0.3s ease"
                  : "width 0.5s ease, opacity 0.3s ease",
                height: "100vh",
                overflowY: "auto",
                margin: 0,
                zIndex: 1000,
                position: isMobile ? "absolute" : "relative",
              }}
            >
              <div className="logoContainer">
                {openSidebar ? (
                  <img
                    className="logoImage"
                    src="/images/edu2all-logo.png"
                    alt="ERP Logo"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <div className="scrizaImageContainer">
                    <img
                      className="scrizaImage"
                      src="/images/edu2allSmall.svg"
                      alt="ERP Logo"
                      onClick={() => navigate('/')}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                )}
              </div>

              {dashboardItems.map((item, index) => {
                const hasSubItems = item.subItems && item.children?.length > 0;
                const isExpanded = expandedMenu === item.key;

                if (item.key === "logout") {
                  return (
                    <Link
                      key={item.key || index}
                      className={`menus d-flex borderTopBottom ${activeMenu === item.key || isActiveLink(item.activeLink)
                        ? " active"
                        : ""
                        } ${!openSidebar ? "justify-content-center" : ""}`}
                      data-bs-toggle="offcanvas"
                      data-bs-target="#logoutCanvas"
                      aria-controls="logoutCanvas"
                      style={{
                        justifyContent: openSidebar ? "space-between" : "center",
                        height: openSidebar ? "45px" : "50px",
                      }}
                    >
                      <div className="titleAndIcon">
                        {item.icon && (
                          <img
                            src={item.icon}
                            alt={`${item.title} icon`}
                            className="sidebar-icon"
                          />
                        )}
                        {openSidebar && <h3 className="menu-text">{item.title}</h3>}
                      </div>
                    </Link>
                  );
                } else {
                  return (
                    <div key={item.key || index}>
                      <NavLink
                        style={{
                          justifyContent: openSidebar ? "space-between" : "center",
                          height: openSidebar ? "45px" : "50px",
                        }}
                        to={item.route}
                        onClick={() => {
                          if (hasSubItems) {
                            openSidebar ? handleExpand(item.key) : handleExpand(null);
                          } else if (isMobile) {
                            setOpenSidebar(false);
                          } else {
                            handleExpand(null);
                          }
                        }}
                        onMouseEnter={(e) => handleMouseEnter(e, item)}
                        onMouseLeave={() => handleMouseLeave()}
                        className={({ isActive }) =>
                          `menus${isActive || isActiveLink(item.activeLink) ? " active" : ""
                          }${hoveredItem && hoveredItem.key === item.key
                            ? " hover-active"
                            : ""
                          }`
                        }
                      >
                        <div className="titleAndIcon">
                          {item.icon && (
                            <img
                              src={item.icon}
                              alt={`${item.title} icon`}
                              className="sidebar-icon"
                            />
                          )}
                          {openSidebar && <h3 className="menu-text">{item.title}</h3>}
                        </div>
                        {hasSubItems && openSidebar && (
                          <div>
                            {isExpanded ? (
                              <ArrowDropUpOutlinedIcon />
                            ) : (
                              <ArrowDropDownOutlinedIcon />
                            )}
                          </div>
                        )}
                      </NavLink>

                      {hasSubItems && (
                        <div
                          className="subItemContainer"
                          style={{
                            maxHeight: isExpanded ? "500px" : "0",
                            overflow: "hidden",
                            transition: openSidebar
                              ? "max-height 0.2s ease"
                              : "max-height ease",
                          }}
                        >
                          {item.children.map((sub, subIdx) => (
                            <NavLink
                              key={sub.key || subIdx}
                              onClick={
                                isMobile ? () => setOpenSidebar(false) : undefined
                              }
                              to={sub.route}
                              className={({ isActive }) =>
                                `menus${isActive || isActiveLink(sub.activeLink)
                                  ? " active"
                                  : ""
                                }`
                              }
                            >
                              {openSidebar && sub.icon && (
                                <img
                                  src={sub.icon}
                                  alt={`${sub.title} icon`}
                                  className="sidebar-icon"
                                />
                              )}
                              {openSidebar && (
                                <h3 className="menu-text">{sub.title}</h3>
                              )}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          )}

          {!openSidebar && hoveredItem && anchorEl && (
            <div
              className="hover-menu"
              onMouseEnter={() => {
                if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
              }}
              onMouseLeave={() => handleMouseLeave()}
              style={{
                position: "fixed",
                top: anchorEl.getBoundingClientRect().top + 3,
                left: anchorEl.getBoundingClientRect().right + 10,
                borderRadius: "4px",
                minWidth: "200px",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <div
                className={`main-item ${hoveredItem.children?.length ? "main-item-radius" : "main-item-no-radius"
                  }`}
              >
                
                {/* {hoveredItem.icon && (
              <img
                src={hoveredItem.icon}
                alt={`${hoveredItem.title} icon`}
                className="sidebar-icon"
                style={{ marginRight: "10px" }}
              />
            )} */}

                {hoveredItem.title}
              </div>
              {hoveredItem.children?.map((sub, idx) => (
                <NavLink
                  key={sub.key || idx}
                  to={sub.route}
                  onClick={() => setAnchorEl(null)}
                  className={({ isActive }) =>
                    `sub-item${isActive || isActiveLink(sub.activeLink) ? " active" : ""}`
                  }
                >
                  {sub.icon && (
                    <img
                      src={sub.icon}
                      alt={`${sub.title} icon`}
                      className="sidebar-icon"
                    />
                  )}
                  <h3 className="menu-text">{sub.title}</h3>
                </NavLink>
              ))}
            </div>
          )}
          <div
            className="offcanvas offcanvas-end p-2"
            data-bs-backdrop="static"
            tabIndex="-1"
            id="logoutCanvas"
            aria-labelledby="staticBackdropLabel"
          >
            <div className="offcanvas-header ps-0 border-bottom border-2 p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#B50000"
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                  />
                </svg>
              </Link>
              <h2 className="offcanvas-title fontWeight900" id="staticBackdropLabel">
                Logout Message
              </h2>
            </div>
            <div className="offcanvas-body p-0">
              {LogoutSuccess ? (
                <>
                  <div>
                    <p className="border-bottom p-2">Logout</p>
                    <div className="text-center p-5">
                      <p className="mb-2">
                        <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/logout.svg" alt="" />
                      </p>
                      <h1 className="mb-2">Are you Sure?</h1>
                      <h3 className="greyText">Are you Sure you want to logout?</h3>
                      <p className="text-center p-3">
                        <button
                          className="btn deleteButtons text-white"
                          onClick={() => handleUserLogout()}
                        >
                          Logout
                        </button>
                        <button
                          className="btn cancelButtons ms-3"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        >
                          Cancel
                        </button>
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="modalLightBorder p-2 mb-0">Logout</p>
                    <div className="mt-3">
                      <div className="correvtSVG p-3 pt-4 rounded-circle">
                        <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Correct.svg" alt="" />
                      </div>
                      <div className="updatetext border m-4 border-2 ms-5 greydiv rounded-3 text-center greyText p-5">
                        <p className="warningHeading">Successful Updated</p>
                        <p className="greyText warningText pt-2">
                          Your Changes has been<br />Successfully Saved
                        </p>
                      </div>
                      <button
                      style={{width:'100px'}}
                        className="btn contbtn continueButtons text-white"
                        type="button"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      >
                        Continuew
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>



    </Container>
  );
};

export default Sidebar;
