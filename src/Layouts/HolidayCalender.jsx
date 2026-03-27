import React, { useEffect, useMemo, useState } from 'react';
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

  .calendar-header{
  background-color: #0c968b21;
  color: #fff;
  padding: 8px 16px;  
  }

  .react-calendar__tile {
    height: ${({ smallBox }) => (smallBox ? '75px' : '90px')};
    border: 1px solid #E7E7E7;
    position: relative;
  }

  abbr[title] {
    text-decoration: none;
    color: #fff;
  }

  .react-calendar__month-view__weekdays {
    background-color: #008479;
    color: #fff !important;
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

  .hovered-tile {
    outline: 2px solid rgba(0, 132, 121, 0.2);
    outline-offset: -2px;
  }

  .tile-hover-layer {
    position: absolute;
    inset: 0;
    cursor: pointer;
    z-index: 2;
  }

  .holiday-name {
    position: absolute;
    left: 6px;
    right: 6px;
    bottom: 6px;
    font-size: 12px;
    line-height: 1.2;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 1;
    pointer-events: none;
  }

  .react-calendar__tile:hover .holiday-name {
    color: #fff;
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
    background-color: #008479 !important;
    color: #fff !important;
  }

  .holiday-details {
    margin-top: 16px;
    padding: 14px 16px;
    border: 1px solid #E7E7E7;
    border-radius: 8px;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .holiday-details-title {
    font-size: 18px;
    font-weight: 700;
    color: #111;
  }

  .holiday-details-row {
    font-size: 14px;
    color: #444;
  }

  .holiday-details-row small {
    font-size: 14px;
    font-weight: 600;
    color: #111;
  }

  @media (max-width: 768px) {
    .react-calendar__tile {
      height: ${({ smallBox }) => (smallBox ? '65px' : '75px')};
    }

    .holiday-name {
      font-size: 11px;
    }

    .holiday-details {
      padding: 12px;
    }

    .holiday-details-title {
      font-size: 14px;
    }

    .holiday-details-row {
      font-size: 12px;
    }
  }
`;

const HolidayCalendar = ({ DailyAttendanceData = [], month, year, monthUpdate, yearUpdate, smallBox }) => {
  const [value, setValue] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);

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
    const holiday = DailyAttendanceData.find(
      (entry) => entry.date === formattedDate && entry.status === 'holiday'
    );
    if (!holiday) return { status: null, holiday: null };

    const normalizedHoliday =
      holiday.holiday ||
      (holiday.holidayTitle || holiday.holidayDescription || holiday.name || holiday.description
        ? {
            name: holiday.holidayTitle || holiday.name || '',
            description: holiday.holidayDescription || holiday.description || ''
          }
        : null);

    return { ...holiday, holiday: normalizedHoliday };
  };

  const truncateHolidayName = (name, maxLength = 15) => {
    if (!name) return '';
    if (name.length <= maxLength) return name;
    return `${name.slice(0, maxLength - 1)}...`;
  };

  const today = useMemo(() => new Date(), []);
  const selectedDate = hoveredDate || today;
  const selectedDateKey = selectedDate.toISOString().split('T')[0];
  const selectedHolidayInfo = getHolidayInfoForDate(selectedDate);
  const isHolidaySelected = selectedHolidayInfo.status === 'holiday' && selectedHolidayInfo.holiday?.name;

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

  const handleMonthSwitch = (direction) => {
    const nextDate = new Date(value.getFullYear(), value.getMonth() + direction, 1);
    setValue(nextDate);
    setHoveredDate(null);

    const nextMonth = nextDate.getMonth() + 1;
    const nextYear = nextDate.getFullYear();
    if (typeof monthUpdate === 'function') {
      monthUpdate(nextMonth);
    }
    if (typeof yearUpdate === 'function') {
      yearUpdate(nextYear);
    }
  };

  const monthLabel = value.toLocaleString(undefined, { month: 'long', year: 'numeric' });

  return (
    <Container smallBox={smallBox}>
      <div className="calendar-header d-flex justify-content-between align-items-center mb-3">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => handleMonthSwitch(-1)}
        >
          ←
        </button>
        <div className="holiday-details-title">{monthLabel}</div>
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => handleMonthSwitch(1)}
        >
          →
        </button>
      </div>
      <div onMouseLeave={() => setHoveredDate(null)}>
        <Calendar
          onChange={setValue}
          value={value}
          onActiveStartDateChange={handleActiveStartDateChange}
          tileClassName={({ date, view }) =>
            view === 'month'
              ? [
                  getHolidayInfoForDate(date).status === 'holiday' ? 'holiday-tile' : '',
                  hoveredDate && date.toDateString() === hoveredDate.toDateString() ? 'hovered-tile' : ''
                ]
                  .filter(Boolean)
                  .join(' ')
              : ''
          }
          tileContent={({ date, view }) => {
            if (view !== 'month') return null;
            const holidayInfo = getHolidayInfoForDate(date);
            return (
              <>
                <div
                  className="tile-hover-layer"
                  onMouseEnter={() => setHoveredDate(date)}
                  onFocus={() => setHoveredDate(date)}
                  onClick={() => setValue(date)}
                />
                {holidayInfo.status === 'holiday' && holidayInfo.holiday?.name ? (
                  <div className="holiday-name">
                    {truncateHolidayName(holidayInfo.holiday.name)}
                  </div>
                ) : null}
              </>
            );
          }}
        />
      </div>
      <div className="holiday-details">
        <div className="holiday-details-row">
          <small>Selected Date :</small> {selectedDateKey}
        </div>
        {isHolidaySelected ? (
          <>
            <div className="holiday-details-row">
              <small>Holiday Name :</small> {selectedHolidayInfo.holiday?.name}
            </div>
            <div className="holiday-details-row">
              <small>Description :</small> {selectedHolidayInfo.holiday?.description || '--'}
            </div>
          </>
        ) : (
          <div className="holiday-details-row">
            {hoveredDate ? 'No Holiday' : 'No Holiday Today'}
          </div>
        )}
      </div>
    </Container>
  );
};

export default HolidayCalendar;
