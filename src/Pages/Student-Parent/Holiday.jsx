import { Icon } from '@iconify/react';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAllHolidayDataApiByStu } from 'src/Utils/Apis';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import HolidayCalendar from '../../Layouts/HolidayCalender';
import { useForm } from 'react-hook-form';

const Container = styled.div`
    height: 92vh;
    .mainBreadCrum { --bs-breadcrumb-divider: none !important; }
    .bredcrumText { color: var(--breadCrumTextColor); }
    .bredcrumActiveText { color: var(--breadCrumActiveTextColor); }
    .greyText { color: var(--greyTextColor); }
    .table td { border-right: 0.3px solid #dee2e6; }
`;

const Holiday = () => {
    const token = sessionStorage.getItem('token');

    const [loaderState, setLoaderState] = useState(false);
    const [calendarView, setCalendarView] = useState(false);
    const [holidayData, setHolidayData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize] = useState(10);

    const [searchByKey, setSearchByKey] = useState('');
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const { handleSubmit } = useForm({
        mode: 'onChange',
        defaultValues: { searchByKey: '' }
    });

    useEffect(() => {
        getAllHolidays();

        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(el => new window.bootstrap.Tooltip(el));

        return () => {
            tooltipList.forEach(t => t.dispose());
        };
    }, [pageNo, searchByKey, selectedMonth, selectedYear]);

    const getAllHolidays = async () => {
        try {
            setLoaderState(true);

            const response = await getAllHolidayDataApiByStu(searchByKey, pageNo, pageSize);

            if (response?.status === 200 && response?.data?.status === 'success') {

                const validatedData = response?.data?.holidays?.filter(
                    item => item.holidayTitle && item.startDate && item.endDate
                );

                if (validatedData.length < response?.data?.holidays.length) {
                    toast.error('Some holiday data is incomplete and has been filtered out.');
                }

                setHolidayData(validatedData);
                setCurrentPage(response?.data?.currentPage || 1);
                setTotalPages(response?.data?.totalPages || 1);

            } else {
                toast.error(response?.data?.message || 'Failed to fetch holidays');
            }

        } catch (error) {
            toast.error('Error fetching holidays');
        } finally {
            setLoaderState(false);
        }
    };

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1);
    };

    const onSearchSubmit = (data) => {
        setPageNo(1);
        setSearchByKey(data.searchByKey);
    };

    const dailyHolidayData = useMemo(() => {
        return holidayData.flatMap((holiday) => {
            const start = new Date(holiday.startDate);
            const end = new Date(holiday.endDate);
            const dates = [];

            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                if (
                    d.getMonth() === selectedMonth - 1 &&
                    d.getFullYear() === selectedYear
                ) {
                    dates.push({
                        date: d.toISOString().split('T')[0],
                        status: 'holiday',
                        holiday: {
                            name: holiday.holidayTitle || '',
                            description: holiday.description || ''
                        }
                    });
                }
            }

            return dates;
        });
    }, [holidayData, selectedMonth, selectedYear]);

    return (
        <Container className="container-fluid px-5 py-4 overflow-scroll">
            {loaderState && <DataLoader />}

            <div className="row pb-3">
                <nav className='mainBreadCrum font14 ps-0'>
                    <ol className="breadcrumb mb-1">
                        <li className="breadcrumb-item">
                            <Link to="/" className='bredcrumText text-decoration-none'>Home</Link>
                            <Icon className='ms-2' icon="ep:arrow-right-bold" />
                        </li>
                        <li className="breadcrumb-item active bredcrumActiveText">Holiday</li>
                    </ol>
                </nav>
                <p className='fw-bolder'>Holiday Details</p>
            </div>

            <div className="row p-3 bg-white borderRadius5 pb-5">

                <div className="d-flex justify-content-end mb-3">
                    <span className='border greyText p-2 cursorPointer'
                        onClick={() => setCalendarView(!calendarView)}>
                        {calendarView ? 'List View' : 'Calendar View'}
                    </span>
                </div>

                {holidayData?.length > 0 ? (
                    calendarView ? (
                        <HolidayCalendar
                            DailyAttendanceData={dailyHolidayData}
                            month={selectedMonth}
                            year={selectedYear}
                            monthUpdate={setSelectedMonth}
                            yearUpdate={setSelectedYear}
                            smallBox={false}
                        />
                    ) : (
                        <>
                            <div className="overflow-scroll mt-2">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>Name</td>
                                            <td>Start</td>
                                            <td>End</td>
                                            <td>Description</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {holidayData.map((item, index) => (
                                            <tr key={item.holidayId}>
                                                <td>{index + 1}</td>
                                                <td>{item.holidayTitle}</td>
                                                <td>{item.startDate}</td>
                                                <td>{item.endDate}</td>
                                                <td>
                                                    {item.description?.length > 60 ? (
                                                        <>
                                                            {item.description.substring(0, 60)}...
                                                            <button
                                                                className='btn p-0'
                                                                data-bs-toggle="tooltip"
                                                                title={item.description}
                                                            >
                                                                <Icon icon="ph:info-fill" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        item.description
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex">
                                <p>Showing {currentPage} of {totalPages}</p>
                                <div className="ms-auto">
                                    <ReactPaginate
                                        previousLabel={<Icon icon="tabler:chevrons-left" />}
                                        nextLabel={<Icon icon="tabler:chevrons-right" />}
                                        pageCount={totalPages}
                                        onPageChange={handlePageClick}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            </div>
                        </>
                    )
                ) : (
                    <h5 className="text-center mt-5">No holidays found</h5>
                )}

                <Toaster />
            </div>
        </Container>
    );
};

export default Holiday;