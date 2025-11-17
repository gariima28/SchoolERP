import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Calender from '../../Layouts/Calender'
import { getAllAssignmentsDataApi, getAllDashDataApi, getAllEventDataApi, getAllHolidayDataApi, getAllNoticeDataApi, getAllStudentAttendanceApi, getFeeDashDataApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import BarChart from '../../Charts/BarChart';

const Container = styled.div`

.bgOrange{
  width: fit-content;
  background-color: var(--activeOrangeBorder);
}
.cards{
  border : 1px solid var(--cardsBorder);
  background-color: #fff;
  border-radius: var(--borderRadius10px);
}

.borderOrange{
  border: 1px solid var(--activeOrangeBorder) !important;
}

.borderLeftOrange{
  border-left: 4px solid var(--orangeTextColor) !important;
}

.timeTableCard{
  border : 1px solid var(--timeTableCardBorder);
  background-color: var(--timeTableCardBg);
  border-radius: var(--borderRadius5px);
}

.chartCard{
  border : 1px solid var(--timeTableCardBorder);
  background-color: var(--timeTableCardBg);
  border-radius: var(--borderRadius5px);
}

.holidayCard{
  border : 1px solid var(--timeTableCardBorder);
  background-image: url(/images/holidayBg.svg);
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: var(--borderRadius5px);
}

.eventCards{
  border : 1px solid var(--timeTableCardBorder);
  background-color: var(--timeTableCardBg);
  border-radius: 0px !important;
}

.greyText{
  color: var(--greyTextColor);
}

.greenText{
  color: var(--greenTextColor);
}

.carousel-indicators [data-bs-target] {
  background-color: #D9D9D9;
  border-radius: 50%;
  width: 10px;
  height: 10px;
}

.carousel-indicators .active {
  background-color: #01CCBB;
}


`;

const DashboardPage = () => {

  const token = sessionStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [DashData, setDashData] = useState();
  const [RoutineData, setRoutineData] = useState([]);
  const [DailyAttendanceData, setDailyAttendanceData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const monthUpdate = (newMonth) => setMonth(newMonth);
  const yearUpdate = (newYear) => setYear(newYear);

  useEffect(() => {
    getAllDashData();
  }, [token]);


  const getAllDashData = async () => {
    try {
      setloaderState(true);
      var response = await getAllDashDataApi('', '', '', '', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setDashData(response?.data?.data);
          setRoutineData(response?.data?.data?.timetable[0]?.periodTable);
          setDailyAttendanceData(response?.data?.data?.attendance?.attendance);
          setloaderState(false);
        }
      }
      else {
        setloaderState(false);
      }
    }
    catch (error) {
      setloaderState(false);
      console.error('Error fetching student data:', error);
      if (error?.response?.data?.statusCode === 401) {
        sessionStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }
    }
    finally {
      setloaderState(false);
    }
  }

  return (
    <Container className='container-fluid px-4 pb-4'>
      {
        loaderState && (
          <DataLoader />
        )
      }
      <div className="row">
        <div className="col-lg-6 col-12 ps-3 pe-3 pt-3" >
          <div className="row cards borderradius8 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-3 bgDarkGreen bordeRadiusTop text-white">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>TimeTable Details</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12' type="button" to='/student/classRoutines'>View All</Link>
                </div>
              </div>
              <div className="row">
                {RoutineData?.length > 0 ? RoutineData?.map((item) => (
                  <div className="col-sm-6 col-12 p-1" key={item.classRouteId}>
                    <div className="timeTableCard p-2">
                      <p className='greenText font18'>{item.subject}</p>
                      <div className="d-flex pt-2">
                        <div className="flex-grow-1 align-self-center">
                          <p className='font12'>{item?.period?.startHourTime.slice(0, 5)}-{item?.period?.endHourTime.slice(0, 5)}</p>
                        </div>
                        <div className="">
                          <p className='font12 greyText'>Class - {item.classNo} {`( ${item.section} )`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )) :
                  <div className='d-flex justify-content-center h-100 align-item-center'><span className='text-danger'>TimeTable not Assigned</span></div>
                }
              </div>
            </div>
          </div>
        </div >
        <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards borderradius8 h-100">
            <div className="col-12">
              <div className="row bgDarkGreen bordeRadiusTop text-white p-1 py-2">
                <div className="d-flex p-0 align-items-center justify-content-between">
                  <span className='font14 ms-3'>Attendance</span>
                  <button className="btn" onClick={() => monthUpdate(month === 1 ? 12 : month - 1) || yearUpdate(month === 1 ? year - 1 : year)}><Icon icon="lsicon:double-arrow-left-filled" width="16" height="16" style={{ color: '#fff' }} /></button>
                  <span className="mx-2">{new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year}</span>
                  <button className="btn" onClick={() => monthUpdate(month === 12 ? 1 : month + 1) || yearUpdate(month === 12 ? year + 1 : year)}><Icon icon="lsicon:double-arrow-right-filled" width="16" height="16" style={{ color: '#fff' }} /></button>
                  <span></span>
                </div>
              </div>
              <div className="row mt-3">
                <Calender
                  className='calenderp0'
                  DailyAttendanceData={DailyAttendanceData}
                  month={month}
                  year={year}
                  monthUpdate={monthUpdate}
                  yearUpdate={yearUpdate}
                  smallBox={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards borderradius8 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-3 bgDarkGreen bordeRadiusTop text-white">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Assignment Details</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12' type="button" to='/parent/assignments'>View All</Link>
                </div>
              </div>
              <div className="row p-2">
                {DashData?.assignments.length > 0
                  ?
                  DashData?.assignments.slice(0, 3).map((item) => (
                    <div className="col-12 p-1" key={item.id}>
                      <div className="timeTableCard p-2">
                        <div className="row">
                          <div className="col-4 align-self-center">
                            <p className='greenText font16'>{item.title}</p>
                          </div>
                          <div className="col-4 align-self-center">
                            <p className='font14'>{item.subjectName}</p>
                          </div>
                          <div className="col-4 align-self-center">
                            <p className='font12'></p>
                          </div>
                        </div>
                        <div className="row pt-1">
                          <div className="col-4 align-self-center">
                            <p className='font12 greyText'>Class - {item.sectionName}</p>
                          </div>
                          <div className="col-4 align-self-center">
                            <p className='font12 greyText'>Start Date - {item.startDate}</p>
                          </div>
                          <div className="col-4 align-self-center">
                            <p className='font12 greyText'>End Date - {item.endDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  :

                  <div className="col-12">
                    <div className="d-flex justify-content-center p-5 m-5">
                      <span className='text-danger'>No Assignment Data Yet !!!</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards borderradius8 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-3 bgDarkGreen bordeRadiusTop text-white">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Notice Board</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12' type="button" to='/parent/notice'>View All</Link>
                </div>
              </div>
              <div className="row p-2 py-3">
                {DashData?.notices.length > 0
                  ?
                  DashData?.notices.slice(0, 2).map((item, index) => (
                    <>
                      <div className="pt-2" key={index}>
                        <h2 className='p-1 ps-2 pe-2 text-white bgOrange rounded-4 text-decoration-none'>{item?.date}</h2>
                        <h2 className='border-bottom border-1 pt-3 pb-3 text-grey'>{item?.message}</h2>
                        <h5 className='greyText pt-3'>{item?.author} | {item?.daysAgo === 0 ? 'Today' : `${item?.daysAgo} days ago`}</h5>
                      </div>
                    </>
                  ))
                  :

                  <div className="col-12">
                    <div className="d-flex justify-content-center p-5 m-5">
                      <span className='text-danger'>No Notice Data Yet !!!</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards borderradius8 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-3 bgDarkGreen bordeRadiusTop text-white">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Upcoming Events</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12' to='/parent/event'>View All</Link>
                </div>
              </div>
              <div className="row">
                {DashData?.events.length > 0
                  ? (
                    DashData?.events.slice(0, 6).map((item, index) => (
                      <div className="col-12 p-0" key={item.eventId}>
                        <div className={`border-bottom p-2 pt-3 pb-3 overflow-hidden ${index % 2 === 0 ? 'bg-cream' : 'bg-white'}`}>
                          <div className="row g-0">
                            {/* Left Image */}
                            <div className="col-md-2 d-flex justify-content-center alignHeight">
                              <img
                                src={item.eventImage || "/images/svg.png"}
                                alt={item.title}
                                className="img-fluid font14 eventImgHeight"
                              />
                            </div>

                            {/* Right Content */}
                            <div className="col-md-10 ps-3">
                              <div className="card-body d-flex flex-column justify-content-center">
                                {/* Date */}
                                <div className="d-flex justify-content-between">
                                  <p className="greenText font14 mb-1 fw-semibold">
                                    {new Date(item.startDate).toLocaleDateString("en-US", { weekday: 'short', month: 'long', day: '2-digit', year: 'numeric' })}
                                  </p>
                                  {item.comingSoon === true && (
                                    <span className="badge orangeBg text-dark align-self-start">Coming Soon</span>
                                  )}
                                </div>

                                {/* Title */}
                                <h6 className="fw-bold font14 mb-1">{item.title}</h6>

                                {/* Description */}
                                <p className="greyText font12 small mb-2">
                                  {item.eventDescription || "-- No Description --"}
                                </p>
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
        <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards borderradius8 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-3 bgDarkGreen bordeRadiusTop text-white">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Upcoming Holiday</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12' type="button" to='/parent/holiday'>View All</Link>
                </div>
              </div>
              <div className="row p-2">
                {DashData?.holidays.length > 0
                  ?
                  DashData?.holidays.slice(0, 6).map((item) => (
                    <div className="col-4 p-2" key={item.holidayId}>
                      <div className="holidayCard p-4">
                        <p className='font14 text-center'>{item.title}</p>
                        <p className='greyText font14 text-center'>{item.date}</p>
                      </div>
                    </div>
                  ))
                  :

                  <div className="col-12">
                    <div className="d-flex justify-content-center p-5 m-5">
                      <span className='text-danger'>No Holiday Data Yet !!!</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </Container>
  )
}

export default DashboardPage
