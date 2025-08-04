import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllStudentAttendanceApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import Calendar from '../../Layouts/Calender';
import { Icon } from '@iconify/react';

const Container = styled.div`

  .mainBreadCrum{
    --bs-breadcrumb-divider: none !important;
  }
  .bredcrumText{
    color: var(--breadCrumTextColor);
  }
  .bredcrumActiveText{
    color: var(--breadCrumActiveTextColor);
  }
  .greyText{
    color: var(--greyTextColor);
  }
  .table td {
    border-right: 0.3px solid #dee2e6;
  }
  .form-control::placeholder, .form-control, .form-select{
    color: var(--greyState);
  }
  .form-control, .form-select{
    border-radius: 5px ;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }
  
`;

const DailyAttendance = () => {
  const token = sessionStorage.getItem('token');
  const [loaderState, setLoaderState] = useState(false);
  const [attendanceSearch, setAttendanceSearch] = useState(false);
  const [attendanceMonthSearch, setAttendanceMonthSearch] = useState(false);
  const [dailyAttendanceData, setDailyAttendanceData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (token) {
      getAllDailyAttendance('token');
    }
    if (attendanceSearch) {
      getAllDailyAttendance('attendanceSearch');
    }
    if (attendanceMonthSearch) {
      getAllDailyAttendance('attendanceMonthSearch');
    }
  }, [token, attendanceSearch, attendanceMonthSearch]);

  const getAllDailyAttendance = async (msg) => {

    setLoaderState(true);
    try {
      const response = await getAllStudentAttendanceApi(month, year);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setDailyAttendanceData(response?.data?.attendance);
        setAttendanceSearch(false);
        setAttendanceMonthSearch(false);
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      setloaderState(false);
      console.error(error);
      if (error?.response?.data?.statusCode === 401) {
        sessionStorage.removeItem('token');
        setTimeout(() => {
          navigate('/');
        }, 200);
      }
    } finally {
      setLoaderState(false);
    }
  };

  const updateMonth = (newMonth) => {
    // console.log('Parent received new month:', newMonth);
    if (month !== newMonth) {
      setMonth(newMonth); // Update state
      setAttendanceMonthSearch(true)
    }
  };

  // Function to update year
  const updateYear = (newYear) => {
    // console.log('Parent received new year:', newYear);
    if (year !== newYear) {
      setYear(newYear);  // Update state
      setAttendanceMonthSearch(true)
    }
  };

  return (
    <Container className="container-fluid p-4 overflow-scroll">
      {loaderState && <DataLoader />}
      <div className="row pb-3">
        <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
          <ol className="breadcrumb mb-1">
            <li className="breadcrumb-item">
              <Link to="/" className='align-self-center bredcrumText text-decoration-none font14'>Home</Link>
              <Icon className='ms-2' icon="ep:arrow-right-bold" width="1em" height="1em" style={{ color: '#78788C' }} />
            </li>
            <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Daily Attendance</li>
          </ol>
        </nav>
        <p className='font14 ps-0 fw-bolder'>Daily Attendance Details</p>
      </div>
      <div className="row p-3 bg-white borderRadius5 pb-5">
        <div className="col-12">
          <div className="row mb-4">
            <div className="col-6">
              <label htmlFor="inputState" className="form-label font14">Month</label>
              <select id="inputState" className="form-select font14" onChange={(e) => setMonth(e.target.value)}>
                <option selected disabled>Choose...</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                ))}
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="inputYear" className="form-label font14">Year</label>
              <select id="inputYear" className="form-select font14" onChange={(e) => setYear(e.target.value)}>
                <option selected disabled>Choose...</option>
                {Array.from({ length: 71 }, (_, i) => (
                  <option key={i} value={1990 + i}>{1990 + i}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <p className='text-center p-3'>
              <button type='button' className='btn printButtons text-white' onClick={() => setAttendanceSearch(true)}>Search</button>
              <button type='button' className='btn cancelButtons ms-3' onClick={() => setAttendanceSearch(false)}>Cancel</button>
            </p>
          </div>
          <div className="row">
            <Calendar DailyAttendanceData={dailyAttendanceData} month={month} year={year} monthUpdate={updateMonth} yearUpdate={updateYear} />
          </div>
        </div>
        <Toaster />
      </div>
    </Container>
  );
};

export default DailyAttendance;
