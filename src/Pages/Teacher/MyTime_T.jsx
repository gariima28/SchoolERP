import React, { useEffect, useState } from 'react';
import { TeachergetAllDashboardAttendanceDataApi } from 'src/Utils/Apis';
import HashLoader from 'src/Pages/HashLoaderCom';

const MyTime = ({ data }) => {
  const [loaderState, setloaderState] = useState(false);
  const [timeDiff, setTimeDiff] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(null);

  // Convert HH:MM:SS to seconds
  const timeStringToSeconds = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Convert seconds to HH:MM:SS
  const secondsToTimeString = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle check-in/check-out
  useEffect(() => {
    if (data) {
      // Check-in logic
      setSessionStartTime(Date.now());
      setTimeDiff(totalTime);
    } else {
      // Check-out logic
      if (sessionStartTime) {
        const sessionDuration = Math.floor((Date.now() - sessionStartTime) / 1000);
        const newTotalTime = totalTime + sessionDuration;
        setTotalTime(newTotalTime);
      }
      setSessionStartTime(null);
    }
  }, [data]);

  // Timer increment logic
  useEffect(() => {
    let interval = null;
    if (data && sessionStartTime) {
      interval = setInterval(() => {
        const currentSessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
        setTimeDiff(totalTime + currentSessionTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [data, sessionStartTime, totalTime]);

  // Fetch initial total time
  useEffect(() => {
    const MyAttendanceShowOfTeacher = async () => {
      try {
        setloaderState(true);
        const response = await TeachergetAllDashboardAttendanceDataApi();
        console.log('timing show on t tiime component', response);
        if (response?.status === 200 && response?.data?.status === 'success') {
          const timeInSeconds = timeStringToSeconds(response?.data?.workHour);
          setTotalTime(timeInSeconds);
          setTimeDiff(timeInSeconds);
        }
      } catch (error) {
        console.log('Error Facing during Get All Event API - ', error);
      } finally {
        setloaderState(false);
      }
    };

    MyAttendanceShowOfTeacher();
  }, [data]);

  return (
    <>
  {loaderState && <HashLoader />}
  <div className="timer" style={{ fontSize: '20px', paddingTop: '3px' }}>
    {timeDiff ?? timeDiff === 0
      ? secondsToTimeString(timeDiff ?? 0)
      : '00:00:00'}
  </div>
</>

    // <>
    //   {loaderState && <HashLoader />}
    //   <div className="timer" style={{ fontSize: '20px', paddingTop: '3px' }}>
    //     {secondsToTimeString(timeDiff) ? secondsToTimeString(timeDiff) : '00:00:00'}
    //   </div>
    // </>
  );
};

export default MyTime;













// import React, { useEffect, useState } from 'react';
// import { TeachergetAllDashboardAttendanceDataApi } from 'src/Utils/Apis';
// import HashLoader from 'src/Pages/HashLoaderCom';

// const MyTime = ({ data }) => {
//   const [loaderState, setloaderState] = useState(false);

//   const [timeDiff, setTimeDiff] = useState(0);
//   const [totalTime, setTotalTime] = useState(0); 


//   // Convert HH:MM:SS to seconds
//   const timeStringToSeconds = (timeStr) => {
//     if (!timeStr) return 0;
//     const [hours, minutes, seconds] = timeStr.split(':').map(Number);
//     return hours * 3600 + minutes * 60 + seconds;
//   };

//   useEffect(() => {
//     if (data) {
//       const storedTime = localStorage.getItem('checkInTime');
//       if (storedTime) {
//         const diffInSeconds = Math.floor((new Date() - new Date(storedTime)) / 1000);
//         const totalSeconds = diffInSeconds + timeStringToSeconds(totalTime);
//         setTimeDiff(totalSeconds);
//       }
//     } else {
//       setTimeDiff(timeStringToSeconds(totalTime));
//     }
//   }, [data, totalTime]); 

//   useEffect(() => {
//     let interval = null;
//     if (data) {
//       interval = setInterval(() => {
//         setTimeDiff(prev => prev + 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [data]);

//   const hours = Math.floor((timeDiff % (60 * 60 * 24)) / 3600);
//   const minutes = Math.floor((timeDiff % 3600) / 60);
//   const seconds = timeDiff % 60;


//   useEffect(() => {
//     MyAttendanceShowOfTeacher()
//   }, [])

//   const MyAttendanceShowOfTeacher = async () => {
//     try {
//       setloaderState(true);
//       const response = await TeachergetAllDashboardAttendanceDataApi();
//       console.log('timing show on t tiime component', response)
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setTotalTime(response?.data?.workHour)
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         console.log(response?.data?.msg);
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Event API - ', error)
//     }
//   }

//   return (
//     <>
//       {
//         loaderState && (
//           <HashLoader />
//         )
//       }
//       <div className="timer" style={{ fontSize: '20px', paddingTop: '3px' }}>
//         {`${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`}
//       </div>
//     </>

//   );
// };

// export default MyTime;










