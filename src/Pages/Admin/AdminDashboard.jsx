import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BarChart from "../../Charts/BarChart";
import DataLoader from "src/Layouts/Loader";
import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";
import {
  getAllEventsApi,
  getAllHolidayDataApi,
  getAllNoticeApi,
  getAdminDashDataApi,
  getAllDashDataApi,
} from "src/Utils/Apis";

const Container = styled.div`
  overflow-y: auto;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none !important;
  }

  .bg-blue {
    background-color: #e0edfb;
  }

  .bg-orange {
    background-color: #fbeee9;
  }

  .bg-lightgreen {
    background-color: #d9eff4;
  }

  .bg-pink {
    background-color: #f6eafb;
  }

  .holidayCard {
    border: 1px solid var(--timeTableCardBorder);
    background-image: url(/images/holidayBg.svg);
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: var(--borderRadius5px);
  }

  .card {
    border-radius: 10px;
    border: 1px solid var(--greyborderColor);
  }

  .latestreqDiv h3 {
    line-height: 26px !important;
  }

  .latestreqDiv {
    max-height: 5em !important;
    overflow-y: auto;
  }

  .eventablerow {
    background-color: var(--tableGreyBackgroundColor) !important;
  }

  .borderOrange {
    border: 1px solid var(--activeOrangeBorder) !important;
  }

  .bgOrange {
    width: fit-content;
    background-color: var(--activeOrangeBorder);
  }

  .eventBorder {
    border: 1px solid var(--greyborderColor) !important;
  }

  .eventBg {
    background-color: var(--dashEventBg) !important;
  }

  .border-left-orange {
    border-left: 5px solid var(--activeOrangeBorder) !important;
  }
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${day}-${month}-${year}`;

  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [DashData, setDashData] = useState();
  const [EventData, setEventData] = useState([]);
  const [NoticeData, setNoticeData] = useState([]);
  const [HolidayData, setHolidayData] = useState([]);
  const [searchByKey, setSearchByKey] = useState("");
  const [graphKeyData, setGraphKeyData] = useState("TODAY");
  const [graphFilter, setGrapFilter] = useState(true);

  const UpdateGraphFilterShown = (val) => {
    setGrapFilter(val);
  };

  useEffect(() => {
    getAllDashData();
  }, [token, graphKeyData]);

  const getAllDashData = async () => {
    try {
      setloaderState(true);
      var response = await getAllDashDataApi(graphKeyData, "", "", "", "");
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          setDashData(response?.data?.data);
          setloaderState(false);
          setGraphKeyData(response.data.data.attendance.filter);
          console.log(response.data.data.attendance.total);
        }
      } else {
        setloaderState(false);
        // console.log(response?.data?.message);
      }
    } catch (error) {
      setloaderState(false);
      setloaderState(false);

      console.error("Error fetching student data:", error);
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem("token");

        setTimeout(() => {
          navigate("/");
        }, 200);
      }
    }
    finally {
      setloaderState(false);
    }
  };

  return (
    <>
      <Container>
        {loaderState && <DataLoader />}
        <div className="container-fluid p-3">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 pt-2">
              <div className="row px-2">
                <div className="col-12 bg-blue greyborders cardradius">
                  <div className="row p-2">
                    <div className="col-12">
                      <div className="row pt-2">
                        <div className="d-flex">
                          <div className="w-100 d-flex align-self-center">
                            <h2>Students</h2>
                          </div>
                          <div className="flex-shrink-1">
                            <Icon
                              icon="ph:graduation-cap"
                              width="1.6em"
                              height="1.6em"
                              style={{ color: "#008479" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row py-2">
                        <div className="d-flex">
                          <div className="w-100">
                            <h1 className="orangeText">
                              {DashData?.counts?.students}
                            </h1>
                          </div>
                          <div className="flex-shrink-1 p-1">
                            <Link to="/admin/admission/allStudent">
                              <img
                                src="/images/Vector.svg"
                                alt=""
                                height={20}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 pt-2">
              <div className="row px-2">
                <div className="col-12 bg-orange greyborders cardradius">
                  <div className="row p-2">
                    <div className="col-12">
                      <div className="row pt-2">
                        <div className="d-flex">
                          <div className="w-100 d-flex align-self-center">
                            <h2>Vehicles</h2>
                          </div>
                          <div className="flex-shrink-1">
                            <Icon
                              icon="ph:chalkboard-teacher"
                              width="1.6em"
                              height="1.6em"
                              style={{ color: "#008479" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row py-2">
                        <div className="d-flex">
                          <div className="w-100">
                            <h1 className="orangeText">
                              {DashData?.counts?.vehicles}
                            </h1>
                          </div>
                          <div className="flex-shrink-1 p-1">
                            <Link to="/admin/transport/vehicle">
                              <img
                                src="/images/Vector.svg"
                                alt=""
                                height={20}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 pt-2">
              <div className="row px-2">
                <div className="col-12 bg-lightgreen greyborders cardradius">
                  <div className="row p-2">
                    <div className="col-12">
                      <div className="row pt-2">
                        <div className="d-flex">
                          <div className="w-100 d-flex align-self-center">
                            <h2>Drivers</h2>
                          </div>
                          <div className="flex-shrink-1">
                            <Icon
                              icon="ri:parent-line"
                              width="1.6em"
                              height="1.6em"
                              style={{ color: "#008479" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row py-2">
                        <div className="d-flex">
                          <div className="w-100">
                            <h1 className="orangeText">
                              {DashData?.counts?.drivers}
                            </h1>
                          </div>
                          <div className="flex-shrink-1 p-1">
                            <Link to="/admin/users/drivers/24">
                              <img
                                src="/images/Vector.svg"
                                alt=""
                                height={20}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 pt-2">
              <div className="row px-2">
                <div className="col-12 bg-pink greyborders cardradius">
                  <div className="row p-2">
                    <div className="col-12">
                      <div className="row pt-2">
                        <div className="d-flex">
                          <div className="w-100 d-flex align-self-center">
                            <h2>Total Staffs</h2>
                          </div>
                          <div className="flex-shrink-1">
                            <Icon
                              icon="f7:person-3"
                              width="1.6em"
                              height="1.6em"
                              style={{ color: "#008479" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row py-2">
                        <div className="d-flex">
                          <div className="w-100">
                            <h1 className="orangeText">
                              {DashData?.counts?.staff}
                            </h1>
                          </div>
                          <div className="flex-shrink-1 p-1">
                            <Link to="/admin/users/other_staff">
                              <img
                                src="/images/Vector.svg"
                                alt=""
                                height={20}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-md-12 col-sm-12 mt-3">
              <div className="row h-100 p-1">
                <div className="col-12 bg-white cards borderradius8 border">
                  <div className="row">
                    <div className="d-flex p-3 bgDarkGreen bordeRadiusTop text-white">
                      <div className="col-5 align-self-center">
                        <h2>
                          Todays Attendance -{" "}
                          <span className="font14 fontWeight900">
                            {DashData?.attendance?.total}
                          </span>
                        </h2>
                      </div>
                      <div className="col-7">
                        <div className="d-flex gap-2 justify-content-end">
                          <select
                            class="form-select align-items-center font12 py-1"
                            aria-label="Default select example"
                            onChange={(e) => setGraphKeyData(e.target.value)}
                            style={{ boxShadow: "none", width: "fit-content" }}
                          >
                            <option value="" disabled>
                              -Select-
                            </option>
                            <option value="TODAY" selected>
                              {formattedDate} - Today
                            </option>
                            <option value="WEEK">Week</option>
                            <option value="MONTH">Month</option>
                            <option value="YEAR">Year</option>
                          </select>
                          <Link
                            className="py-1 px-2 rounded-2 bg-white align-items-center text-black text-decoration-none font12"
                            to="/admin/academic/dailyattendance"
                            style={{ textWrap: "nowrap" }}
                          >
                            Go to Attendance
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="overflow-scroll pt-3 pb-1">
                      <BarChart
                        graphKey={graphKeyData}
                        graphFilterShow={UpdateGraphFilterShown}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-12 col-sm-12 mt-3">
              <div className="row h-100 p-1">
                <div className="col-12 bg-white cards borderradius8 border">
                  <div className="row">
                    <div className="d-flex p-3 bgDarkGreen bordeRadiusTop text-white">
                      <div className="flex-grow-1 align-self-center">
                        <p className="font14">Upcoming Holiday</p>
                      </div>
                      <Link
                        className="p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12"
                        type="button"
                        to="/admin/holiday"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                  <div className="py-2">
                    {DashData?.holidays.length > 0 ? (
                      DashData?.holidays.slice(0, 9).map((item, index) => (
                        <div className="col-4 p-1" key={index}>
                          <div className="holidayCard border-2 borderradius8 p-4 h-100">
                            <p className="font14 text-center">{item.title.slice(0, 14)}{item.title.length > 14 ? '...' : ''}</p>
                            <p className="greyText font14 text-center">
                              {item.date}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12">
                          <div className="d-flex justify-content-center p-5 m-5">
                            <span className='text-danger'>No Holiday Data Yet !!!</span>
                          </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-md-12 col-sm-12 mt-3">
              <div className="row h-100 p-1">
                <div className="col-12 bg-white cards borderradius8 border">
                  <div className="row">
                    <div className="d-flex p-3 bgDarkGreen bordeRadiusTop text-white">
                      <div className="flex-grow-1 align-self-center">
                        <p className="font14">Upcoming Notices</p>
                      </div>
                      <Link
                        className="p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12"
                        type="button"
                        to="/admin/notice"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                  <div className="p-2">
                    {DashData?.notices.length > 0 ? (
                      DashData?.notices.slice(0, 2).map((item, index) => (
                        <div className="pt-2" key={index}>
                          <h2 className="p-1 ps-2 pe-2 text-white bgOrange rounded-4 text-decoration-none">
                            {item?.date}
                          </h2>
                          <h2 className="border-bottom border-1 pt-3 pb-3 text-grey">
                            {item?.message}
                          </h2>
                          <h5 className="greyText pt-3">
                            {item?.author} | {item?.daysAgo} days ago
                          </h5>
                        </div>
                      ))
                    ) : (

                        <div className="d-flex justify-content-center p-5 m-5">
                          <span className='text-danger'>No Notice Data Yet !!!</span>
                        </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-md-12 col-sm-12 mt-3">
              <div className="row h-100 p-1">
                <div className="col-12 bg-white cards borderradius8 border">
                  <div className="row">
                    <div className="d-flex p-3 bgDarkGreen bordeRadiusTop text-white">
                      <div className="flex-grow-1 align-self-center">
                        <p className="font14">Upcoming Events</p>
                      </div>
                      <Link
                        className="p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12"
                        type="button"
                        to="/admin/event"
                      >
                        View All
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    {DashData?.events.length > 0 ? (
                      DashData?.events.slice(0, 6).map((item, index) => (
                        <div className="col-12 p-0" key={item.eventId}>
                          <div className={`border-bottom p-2 pt-3 overflow-hidden ${index % 2 === 0 ? 'bg-cream' : 'bg-white'}`}>
                            <div className="row g-0">
                              {/* Left Image */}
                              <div className="col-md-3">
                                <img
                                  src={item.imageUrl || "/images/svg.png"}
                                  alt={item.title}
                                  className="img-fluid h-100 w-100 object-fit-cover font14"
                                />
                              </div>

                              {/* Right Content */}
                              <div className="col-md-9">
                                <div className="card-body d-flex flex-column justify-content-center">
                                  {/* Date */}
                                  <div className="d-flex justify-content-between">
                                    <p className="greenText font14 mb-1 fw-semibold">
                                      {new Date(item.startDate).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: '2-digit', year: 'numeric' })}
                                    </p>
                                    <span className="greenText font14 mb-1 fw-semibold">
                                      {new Date(item.startDate).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: '2-digit', year: 'numeric' })}
                                    </span>
                                  </div>

                                  {/* Title */}
                                  <h6 className="fw-bold font14 mb-1">{item.title}</h6>

                                  {/* Description */}
                                  <p className="greyText font12 small mb-2">
                                    {item.description || "-- No Description --"}
                                  </p>

                                  {/* Badge */}
                                  {item.status === "upcoming" && (
                                    <span className="badge bg-warning text-dark align-self-start">Coming Soon</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (

                        <div className="col-12">
                          <div className="d-flex justify-content-center p-5 m-5">
                            <span className='text-danger'>No Event Data Yet !!!</span>
                          </div>
                        </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Toaster />
      </Container>
    </>
  );
};

export default AdminDashboard;
