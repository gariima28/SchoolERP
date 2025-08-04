import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const Container = styled.div`
  .react-calendar__tile--active:active, 
  .react-calendar__tile--active:enabled, 
  .react-calendar__tile--active:focus,
  .react-calendar__tile--now {
    background: #fff;
    color: #000;
  }

  .react-calendar__tile {
    height: ${({ smallBox }) => (smallBox ? '75px' : '90px')};
    border: 1px solid #E7E7E7;
    position: relative;
  }

  abbr[title] {
    text-decoration: none;
    color: #FF904A;
  }

  .react-calendar__month-view__weekdays {
    text-transform: none !important;
    font-weight: 400;
  }

  .react-calendar__navigation {
    display: none !important;
  }

  .react-calendar {
    width: 100%;
    border: none !important;
  }

  .react-calendar__month-view__weekdays {
    padding: 1%;
  }

  .holiday-tile {
    border-left: 4px solid #008479;
    background-color: #FFF8E9 !important;
    padding-left: 5px;
  }

  .holiday-name {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 80%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 10px);
    text-align: left;
  }

  .legend {
    display: flex;
    margin-top: 20px;
  }

  .legend-item {
    margin-right: 20px;
    display: flex;
    align-items: center;
  }

  .react-calendar__tile--active{
    background-color: #eff8f7 !important;
  }

  .react-calendar__tile:hover{
    background-color: #eff8f7 !important;
    border-bottom: 4px solid #008479
  }
`;

const HolidayCalendar = ({ DailyAttendanceData, month, year, monthUpdate, yearUpdate, smallBox }) => {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    if (month || year) {
      const newDate = new Date(year || new Date().getFullYear(), (month || new Date().getMonth() + 1) - 1);
      setValue(newDate);
    }
  }, [month, year]);

  const getHolidayInfoForDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(`Checking date: ${formattedDate}, Data length: ${DailyAttendanceData.length}, Sample:`, DailyAttendanceData.slice(0, 2)); // Debug log
    const holiday = DailyAttendanceData.find((entry) => entry.date === formattedDate && entry.status === 'holiday');
    console.log(`Found holiday for ${formattedDate}:`, holiday); // Debug log
    return holiday || { status: null, holidayTitle: '' };
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    const newMonth = activeStartDate.getMonth() + 1;
    const newYear = activeStartDate.getFullYear();

    if (newMonth !== month) {
      monthUpdate(newMonth);
    }

    if (newYear !== year) {
      yearUpdate(newYear);
    }
  };

  return (
    <Container smallBox={smallBox}>
      <Calendar
        onChange={setValue}
        value={value}
        onActiveStartDateChange={handleActiveStartDateChange}
        tileClassName={({ date, view }) =>
          view === 'month' && getHolidayInfoForDate(date).status === 'holiday' ? 'holiday-tile' : ''
        }
        tileContent={({ date, view }) => {
          const holidayInfo = getHolidayInfoForDate(date);
          if (view === 'month' && holidayInfo.status === 'holiday') {
            console.log(`Rendering tile for ${date.toISOString().split('T')[0]}, Title: ${holidayInfo.holidayTitle}`); // Debug log
            return (
              <div className="holiday-name">
                {/* {holidayInfo.holidayTitle || 'No Title'} */}
              </div>
            );
          }
          return null;
        }}
      />
    </Container>
  );
};

export default HolidayCalendar;
