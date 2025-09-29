import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TeachergetAllAssignmentsDataApi, TeachergetAllClassRoutineDataApi, TeachergetAllEventDataApi, TeachergetAllHolidayDataApi, TeachergetAllLeaveOfTeacherDataApi, teacherGetAllDashDataApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from 'src/Pages/HashLoaderCom';
import TeacherDashChart from '../../Charts/TeacherDashChart'
// import { eventImage } from '../../../public/images/event.png'

const Container = styled.div`

  .cards{
    border : 1px solid var(--cardsBorder);
    background-color: #fff;
    border-radius: var(--borderRadius10px);
  }

  .borderOrange{
    border: 1px solid var(--activeOrangeBorder) !important;
  }

  .continueLesson{
    background-color: var(--greenTextColor);
    border-radius: var(--borderRadius17px);
  }

  .borderLeftOrange{
    border-left: 4px solid var(--orangeTextColor) !important;
  }

  .timeTableCard{
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
  .my-btn12{
  border: 1px solid #aaa;
  padding: 5px 7px;
}
.progress-bar{
  width: 100% !important;
  height: 5px !important;
  border-radius: 0px !important;
  background-color: #FF914C;
}
.my-progress-bar {
    /* width: 10% ; */
    height: 6px!important ;
    border-radius: 10px !important;
    background-color: #FF914D;
    margin-top: -3px ;
}
.my-graph-length{
height: 10px;
border:1px solid #aaa;
width: "100%" !important;
border-radius: 10px !important;
}
.imageSize img{
  width: 120px;}

`;

const DashboardPage = () => {

  const token = sessionStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);

  const navigate = useNavigate()
  const [AssignmentData, setAssignmentData] = useState([]);
  const [HolidayData, setHolidayData] = useState([]);
  const [RoutineData, setRoutineData] = useState([]);
  const [DailyAttendanceData, setDailyAttendanceData] = useState([]);
  const [EventData, setEventData] = useState([]);
  console.log('Event data in dashboard page', EventData)
  const [leaveAllData, setLeaveAllData] = useState([]);
  const [availableLeave, setAvailableLeave] = useState([]);
  const [leaveAllDataTransfer, setLeaveAllDataTransfer] = useState([]);
  // console.log('leave data in dashboard page', leaveAllDataTransfer)

  const [showTime, setShowTime] = useState()
  const [showLateByHours, setShowLateByHours] = useState()
  const [showLateByMinutes, setShowLateByMinutes] = useState()
  const [showDate, setShowDate] = useState()
  const [showLate, setShowLate] = useState()
  const [showCheckIn, setShowCheckIn] = useState()
  const [showCheckOut, setShowCheckOut] = useState()
  const [showTimeHours, setShowTimeHours] = useState()
  const [showTimeMinutes, setShowTimeMinutes] = useState()
  const [showTimeSecond, setShowTimeSecond] = useState()
  const [showAttendanceBarGraph, setShowAttendanceBarGraph] = useState()
  const [totalTime, setTotalTime] = useState()

  const [timeTableDay, setTimeTableDay] = useState('');

  const date = new Date();
  const today = date.toLocaleDateString('en-US', { weekday: 'long' });

  useEffect(() => {
    MyAttendanceShowOfTeacher();
  }, [token, timeTableDay]);

  const ToLowerCase = (value) => {
    setTimeTableDay(value.toLowerCase());
  }


  // All dashboard data in this single api call
  const MyAttendanceShowOfTeacher = async () => {
    try {
      setloaderState(true);
      // const response = await TeachergetAllDashboardAttendanceDataApi();
      const response = await teacherGetAllDashDataApi();
      console.log('All data from dashboard api =============', response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);

          // routine data
          setRoutineData(response?.data?.data?.timetable)

          // assignment data 
          setAssignmentData(response?.data?.data?.assignments)

          // holiday data 
          setHolidayData(response?.data?.data?.holidays)

          // event data 
          setEventData(response?.data?.data?.events)

          // leave data
          setLeaveAllData(response?.data?.data?.leaveReport)
          setAvailableLeave(response?.data?.leave)
          setLeaveAllDataTransfer(response?.data?.leave)

          // attendance data 
          setShowTime(response?.data?.data?.checkInTimeInfo?.leave)
          setShowLateByHours(response?.data?.data?.checkInTimeInfo?.ByHour)
          setShowLateByMinutes(response?.data?.data?.checkInTimeInfo?.ByMin)
          setShowDate(response?.data?.data?.checkInTimeInfo?.attendanceDate)
          setShowLate(response?.data?.data?.checkInTimeInfo?.state)
          setShowCheckIn(response?.data?.data?.checkInTimeInfo?.checkInTime)
          setShowCheckOut(response?.data?.data?.checkInTimeInfo?.checkOutTime)
          setShowTimeHours(response?.data?.data?.checkInTimeInfo?.workHour?.hours)
          setShowTimeMinutes(response?.data?.data?.checkInTimeInfo?.workHour?.minutes)
          setShowTimeSecond(response?.data?.data?.checkInTimeInfo?.workHour?.seconds)
          setShowAttendanceBarGraph(response?.data?.data?.checkInTimeInfo?.percent)
          // setTotalTime(response?.data?.data?.checkInTimeInfo?.workHour)
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Event API - ', error)
    }
  }

  const AllDaysAttendanceHandle = () => {
    navigate('/teacher/assignleave')
  }


  // Pie chart data 

  return (

    <Container className='container-fluid pb-4'>

      {
        loaderState && (
          <HashLoader />
        )
      }

      <div className="row mx-2">
        <div className="col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3">
          <div className="row cards  h-100" style={{ borderRadius: '8px 8px 0px 0px' }}>
            <div className="col-12">
              <div className="row p-0" style={{ backgroundColor: '#008479', borderRadius: '8px 8px 0px 0px', color: '#fff' }}>
                <div className="d-flex p-2">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Timetable Details</p>
                  </div>
                  <div>
                    <select className="form-select rounded-2 borderOrange text-black font12" value={timeTableDay} aria-label="Default select example" onChange={(e) => ToLowerCase(e.target.value)}>
                      <option value={today}>Today</option>
                      <option value=''>Week</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row heading-16 px-2 pt-2">
                {
                  RoutineData && RoutineData.length > 0 ? (
                    RoutineData?.map((item) => (
                      <div className='row' key={item.day}>
                        {item?.periodTable?.map((item1) => (
                          <div div className="col-6 p-1" key={item1.classRouteId}>
                            <div className="timeTableCard p-2">
                              <p className='greenText font18'>{item1.subject}</p>
                              <div className="d-flex pt-2">
                                <div className="flex-grow-1 align-self-center">
                                  <p className='font12'>{item1?.period?.startHourTime} - {item1?.period?.endHourTime}</p>
                                </div>
                                <div>
                                  <p className='font12 greyText'>Class - {item1.classNo} {item1.section}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))
                  ) : (
                    <p className='text-center pt-3 pb-3' style={{ color: 'red' }}>No ClassRoutine Found...</p>
                  )
                }
              </div>

            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3">
          <div className="row cards  h-100 " style={{ borderRadius: '8px 8px 0px 0px' }}>
            <div className="col-12">
              <div className='row p-0' style={{ backgroundColor: '#008479', borderRadius: '8px 8px 0px 0px', color: '#fff' }}>
                <div className=" d-flex justify-content-between p-1" >
                  <div className="pt-2 ps-2">
                    <p >Attendance</p>
                  </div>
                  <div className="">
                    <div className='d-flex g-1 for-media-query'>
                      <div className='pe-2'  >
                      </div>
                      <div className='pe-2'>
                        {/* <Link className="btn my-btn12 heading-12  mt-1" data-bs-dismiss="offcanvas" onClick={() => AllDaysAttendanceHandle()} >Last 7 Days</Link> */}
                        <Link className="btn my-btn12 heading-12  mt-1" ><p style={{ color: '#fff' }}>Today</p></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row px-2">
                <div className='text-center mt-4'>
                  <h4 className='mb-0'>{`${showTimeHours ? showTimeHours : "00"}:${showTimeMinutes ? showTimeMinutes : "00"}:${showTimeSecond ? showTimeSecond : "00"}`} Hrs</h4>
                  {/* <h4 className='mb-0'>{`${showTimeHours ? showTimeHours : 0} : ${showTimeMinutes ? showTimeMinutes : 0} : ${showTimeSecond ? showTimeSecond : 0}`} Hrs</h4> */}
                  <p className='pt-0'>{showDate}</p>
                  <p className='heading-14 pb-3' style={{ color: '#FF914C' }}>{showLate} by {`${showLateByHours ? showLateByHours : 0} : ${showLateByMinutes ? showLateByMinutes : 0}`}</p>
                </div>
                <div className='pt-1 my-graph-length p-0' >
                  <div class="progress my-progress-bar  " style={{ width: `${showAttendanceBarGraph !== 0 ? `${showAttendanceBarGraph}%` : '0%'}` }} role="progressbar" aria-label="Animated striped example" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar  progress-bar-striped progress-bar-animated" ></div>
                  </div>
                </div>
                <div className='d-flex mb-3 mt-2 justify-content-between heading-14' style={{ color: '#8F8F8F' }}>
                  <p>{showCheckIn}</p>
                  <p>General</p>
                  <p>{showCheckOut}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="row mx-2">
        <div className="col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3">
          <div className="row cards  h-100" style={{ borderRadius: '8px 8px 0px 0px' }}>
            <div className="col-12">
              <div className="row p-0" style={{ backgroundColor: '#008479', borderRadius: '8px 8px 0px 0px', color: '#fff' }}>
                <div className="d-flex p-2">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Assignment Details</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' type="button" to='/teacher/assignmenttea'><p style={{ color: '#fff' }}>View All</p></Link>
                </div>
              </div>
              <div className="row px-2 pt-2">
                {
                  AssignmentData && AssignmentData.length > 0 ? (
                    AssignmentData?.slice(0, 3).map((item) => (
                      <div className="col-12 p-1" key={item.id}>
                        <div className="timeTableCard p-2">
                          <div className="row mb-2">
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
                          <div className="row pt-1 heading-16">
                            <div className="col-2 align-self-center">
                              <p className='font12 greyText'>Class - {item.classNo}</p>
                            </div>
                            <div className="col-5 align-self-center">
                              <p className='font12 greyText'>Start Date - {item.StartDate}</p>
                            </div>
                            <div className="col-5 align-self-center">
                              <p className='font12 greyText'>End Date - {item.endDate}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-center pt-3 pb-3' style={{ color: 'red' }}>No Assignment Found...</p>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3">
          <div className="row cards  h-100" style={{ borderRadius: '8px 8px 0px 0px' }}>
            <div className="col-12">
              <div className="row p-0" style={{ backgroundColor: '#008479', borderRadius: '8px 8px 0px 0px', color: '#fff' }}>
                <div className="d-flex p-2">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Leave Report</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' type="button" to='/teacher/leave'><p style={{ color: "#fff" }}>View All</p></Link>
                </div>
              </div>
              <div className="row px-2 pt-2">
                {
                  leaveAllData && leaveAllData?.length > 0 ? (
                    leaveAllData?.map((item, index) => (
                      <div className="col-6 p-1 " key={item.classRouteId}>
                        <div className='d-flex timeTableCard' >
                          <div className="p-2">
                            <p className='greenText font16'>{item?.leaveType}</p>
                            <div className="d-flex pt-2">
                              <div className="flex-grow-1 align-self-center">
                                <p className='font12'>Available {item?.leaveCount} day</p>
                                <p className='font12'>Booked {item?.bookedCount} day</p>
                              </div>
                            </div>
                          </div>
                          {

                          }
                          <div className='my-class'>
                            <p className='ps-3' >
                              <TeacherDashChart leaveData={[item]} />
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-center pt-3 pb-3' style={{ color: 'red' }}>No Leave Found...</p>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-2" >
        <div className="col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3">
          <div className="row cards  h-100" style={{ borderRadius: '8px 8px 0px 0px' }}>
            <div className="col-12">
              <div className="row p-0" style={{ backgroundColor: '#008479', borderRadius: '8px 8px 0px 0px', color: '#fff' }}>
                <div className="d-flex p-2" >
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Upcoming Events</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12 ' to='/teacher/event' ><p style={{ color: '#fff' }}>View All</p></Link>
                </div>
              </div>
              <div className="row px-2 pt-2">
                {EventData && EventData?.length > 0 ? (
                  EventData?.map((item) => (
                    <div className="col-12 p-1" key={item.eventId}>
                      <div className="eventCards">
                        <div className="borderLeftOrange p-2">
                          <div className="d-flex p-1">
                            <div className="flex-fill imageSize d-flex ">
                              <p>
                                {
                                  item.eventImage ? <img src={item.eventImage} alt="Event" /> : <img src="/images/event.png" alt="Event" />
                                }
                                {/* <img src="/images/event.png" alt="Event" /> */}
                              </p>
                              <div className='ps-3' style={{ fontSize: '14px' }}>
                                <p style={{ color: "#008479" }}>{item.eventDay} {item.startDate}</p>
                                <div style={{ width: '250px' }}>
                                  <p style={{ color: '#aaa' }}>{item.eventDescription}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink" style={{ backgroundColor: '#FF914C', color: 'red', borderRadius: '10px', height: 'fit-content', padding: '2px 12px' }}>
                              <p className="font14 text-end " style={{ color: '#fff', }}>{item.comingSoon ? "Coming Soon" : 'Upcoming'}</p>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center pt-3 pb-3" style={{ color: "red" }}>
                    No Event Found...
                  </p>
                )}
              </div>


            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3">
          <div className="row cards  h-100" style={{ borderRadius: '8px 8px 0px 0px' }}>
            <div className="col-12">
              <div className="row p-0" style={{ backgroundColor: '#008479', borderRadius: '8px 8px 0px 0px', color: '#fff' }}>
                <div className="d-flex p-2">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Upcoming Holiday</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' type="button" to='/teacher/holiday'><p style={{ color: '#fff' }}>View All</p></Link>
                </div>
              </div>
              <div className="row px-1 pt-2">
                {
                  HolidayData?.length > 0 ? (
                    HolidayData?.map((item) => (
                      <div className="col-6 p-2" key={item.holidayId}>
                        <div className="holidayCard p-3">
                          <p className='font16 text-center'>{item.title}</p>
                          <p className='greyText font14 text-center'>{item.startDate}</p>
                          <p className='greyText font14 text-center'>{item.endDate}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-center pt-3 pb-3' style={{ color: 'red' }}>No Holiday Found...</p>
                  )
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
