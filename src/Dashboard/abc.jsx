import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.css"; // Your existing CSS file

const ABC = () => {
    return (
        <div className="container-scroller">
            <div className="row p-0 m-0 proBanner" id="proBanner">
                <div className="col-md-12 p-0 m-0">
                    <div className="card-body card-body-padding d-flex align-items-center justify-content-between">
                        <div className="ps-lg-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <p className="mb-0 font-weight-medium me-3 buy-now-text">
                                    Free 24/7 customer support, updates, and more with this template!
                                </p>
                                <a
                                    href="https://www.bootstrapdash.com/product/purple-bootstrap-admin-template/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn me-2 buy-now-btn border-0"
                                >
                                    Buy Now
                                </a>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <a href="https://www.bootstrapdash.com/product/purple-bootstrap-admin-template/">
                                <i className="mdi mdi-home me-3 text-white"></i>
                            </a>
                            <button id="bannerClose" className="btn border-0 p-0">
                                <i className="mdi mdi-close text-white mr-0"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
                    {/* Brand/logo can go here */}
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-stretch">
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                        <span className="mdi mdi-menu"></span>
                    </button>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                        <span className="mdi mdi-menu"></span>
                    </button>
                </div>
            </nav>

            <div className="container-fluid page-body-wrapper">
                <nav className="sidebar sidebar-offcanvas" id="sidebar">
                    <ul className="nav">
                        <li className="nav-item nav-profile">
                            <a href="#" className="nav-link">
                                <div className="nav-profile-image">
                                    <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="assets/images/faces/face1.jpg" alt="profile" />
                                    <span className="login-status online"></span>
                                </div>
                                <div className="nav-profile-text d-flex flex-column">
                                    <span className="font-weight-bold mb-2">David Grey. H</span>
                                    <span className="text-secondary text-small">Project Manager</span>
                                </div>
                                <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="index.html">
                                <span className="menu-title">Dashboard</span>
                                <i className="mdi mdi-home menu-icon"></i>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-bs-toggle="collapse"
                                href="#ui-basic"
                                aria-expanded="false"
                                aria-controls="ui-basic"
                            >
                                <span className="menu-title">Basic UI Elements</span>
                                <i className="menu-arrow"></i>
                                <i className="mdi mdi-crosshairs-gps menu-icon"></i>
                            </a>
                            <div className="collapse" id="ui-basic">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item">
                                        <a className="nav-link" href="pages/ui-features/buttons.html">Buttons</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="pages/ui-features/dropdowns.html">Dropdowns</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="pages/ui-features/typography.html">Typography</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-bs-toggle="collapse"
                                href="#icons"
                                aria-expanded="false"
                                aria-controls="icons"
                            >
                                <span className="menu-title">Icons</span>
                                <i className="mdi mdi-contacts menu-icon"></i>
                            </a>
                            <div className="collapse" id="icons">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item">
                                        <a className="nav-link" href="pages/icons/font-awesome.html">Font Awesome</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-bs-toggle="collapse"
                                href="#forms"
                                aria-expanded="false"
                                aria-controls="forms"
                            >
                                <span className="menu-title">Forms</span>
                                <i className="mdi mdi-format-list-bulleted menu-icon"></i>
                            </a>
                            <div className="collapse" id="forms">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item">
                                        <a className="nav-link" href="pages/forms/basic_elements.html">Form Elements</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-bs-toggle="collapse"
                                href="#charts"
                                aria-expanded="false"
                                aria-controls="charts"
                            >
                                <span className="menu-title">Charts</span>
                                <i className="mdi mdi-chart-bar menu-icon"></i>
                            </a>
                            <div className="collapse" id="charts">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item">
                                        <a className="nav-link" href="pages/charts/chartjs.html">ChartJs</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-bs-toggle="collapse"
                                href="#tables"
                                aria-expanded="false"
                                aria-controls="tables"
                            >
                                <span className="menu-title">Tables</span>
                                <i className="mdi mdi-table-large menu-icon"></i>
                            </a>
                            <div className="collapse" id="tables">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item">
                                        <a className="nav-link" href="pages/tables/basic-table.html">Basic table</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                data-bs-toggle="collapse"
                                href="#auth"
                                aria-expanded="false"
                                aria-controls="auth"
                            >
                                <span className="menu-title">User Pages</span>
                                <i className="menu-arrow"></i>
                                <i className="mdi mdi-lock menu-icon"></i>
                            </a>
                            <div className="collapse" id="auth">
                                <ul className="nav flex-column sub-menu">
                                    <li className="nav-item">
                                        <a className="nav-link" href="pages/samples/blank-page.html">Blank Page</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="pages/samples/login.html">Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="pages/samples/register.html">Register</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="pages/samples/error-404.html">404</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="pages/samples/error-500.html">500</a>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="docs/documentation.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="menu-title">Documentation</span>
                                <i className="mdi mdi-file-document-box menu-icon"></i>
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="main-panel">
                    <div className="content-wrapper">
                        {/* Your main content will go here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ABC;
