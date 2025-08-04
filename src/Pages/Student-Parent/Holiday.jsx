import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
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
    .mainBreadCrum {
        --bs-breadcrumb-divider: none !important;
    }

    .bredcrumText {
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText {
        color: var(--breadCrumActiveTextColor);
    }

    .greyText {
        color: var(--greyTextColor);
    }

    .table td {
        border-right: 0.3px solid #dee2e6;
    }
`;

const Holiday = () => {
    const token = sessionStorage.getItem('token');
    const [loaderState, setLoaderState] = useState(false);
    const [calendarView, setCalendarView] = useState(false);
    const [searchByKey, setSearchByKey] = useState('');
    const [holidayData, setHolidayData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        defaultValues: { searchByKey: '' }
    });

    useEffect(() => {
        getAllHolidays();
        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));
        return () => {
            tooltipList.forEach(tooltip => tooltip.dispose());
        };
    }, [pageNo, searchByKey]);

    const getAllHolidays = async () => {
        try {
            setLoaderState(true);
            const response = await getAllHolidayDataApiByStu(searchByKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setLoaderState(false);
                    const validatedData = response?.data?.holidays.filter(item =>
                        item.holidayTitle && item.startDate && item.endDate
                    );
                    if (validatedData.length < response?.data?.holidays.length) {
                        toast.error('Some holiday data is incomplete and has been filtered out.');
                    }
                    setHolidayData(validatedData);
                    setCurrentPage(response?.data?.currentPage);
                    setTotalPages(response?.data?.totalPages);
                } else {
                    setLoaderState(false);
                    toast.error(response?.data?.message);
                }
            } else {
                setLoaderState(false);
            }
        } catch (error) {
            setLoaderState(false);
            toast.error('Error fetching holidays');
        }
    };

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1);
    };

    const onSearchSubmit = (data) => {
        setSearchByKey(data.searchByKey);
    };

    // Prepare holiday data for calendar
    const dailyHolidayData = holidayData.map(holiday => ({
        date: holiday.startDate,
        status: 'holiday'
    })).concat(
        holidayData.flatMap(holiday => {
            const start = new Date(holiday.startDate);
            const end = new Date(holiday.endDate);
            const dates = [];
            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                dates.push({ date: d.toISOString().split('T')[0], status: 'holiday' });
            }
            return dates;
        })
    );

    return (
        <Container className="container-fluid px-5 py-4 overflow-scroll">
            {loaderState && <DataLoader />}
            <div className="row pb-3">
                <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                    <ol className="breadcrumb mb-1">
                        <li className="breadcrumb-item">
                            <Link to="/" className='align-self-center bredcrumText text-decoration-none font14'>Home</Link>
                            <Icon className='ms-2' icon="ep:arrow-right-bold" width="1em" height="1em" style={{ color: '#78788C' }} />
                        </li>
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Holiday</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>Holiday Details</p>
            </div>
            <div className="row p-3 bg-white borderRadius5 pb-5">
                <div className="d-flex justify-content-end align-items-center mb-3">
                    <span className='border greyText p-2 borderradius8 cursorPointer' onClick={() => setCalendarView(!calendarView)}>
                        {calendarView ? 'List View' : 'Calendar View'}
                    </span>
                </div>
                {holidayData.length > 0 ? (
                    calendarView ? (
                        <HolidayCalendar
                            DailyAttendanceData={dailyHolidayData}
                            month={new Date().getMonth() + 1}
                            year={new Date().getFullYear()}
                            monthUpdate={(month) => { }}
                            yearUpdate={(year) => { }}
                            smallBox={false}
                        />
                    ) : (
                        <>
                            <div className="overflow-scroll mt-2">
                                <table className="table align-middle table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <td className='textWrapClass font14'>#</td>
                                            <td className='textWrapClass font14'>Holiday Name</td>
                                            <td className='textWrapClass font14'>Start Date</td>
                                            <td className='textWrapClass font14'>End Date</td>
                                            <td className='textWrapClass font14'>Description</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {holidayData.map((item, index) => (
                                            <tr key={item.holidayId}>
                                                <td className='textWrapClass font14 greyText'>{index + 1}</td>
                                                <td className='textWrapClass font14 greyText'>{item.holidayTitle}</td>
                                                <td className='textWrapClass font14 greyText'>{item.startDate}</td>
                                                <td className='textWrapClass font14 greyText'>{item.endDate}</td>
                                                <td className='textWrapClass font14 greyText'>
                                                    {item.description.length > 60 ? (
                                                        <>
                                                            <span className='me-2'>{item.description.substring(0, 60) + "..."}</span>
                                                            <button
                                                                className='btn p-0'
                                                                type='button'
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                data-bs-title={item.description}
                                                            >
                                                                <Icon
                                                                    className=''
                                                                    icon="ph:info-fill"
                                                                    width="1.5em"
                                                                    height="1.5em"
                                                                    style={{ color: '#C1C1C1' }}
                                                                />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <span>{item.description}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex">
                                <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
                                <div className="ms-auto">
                                    <ReactPaginate
                                        previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                                        nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={totalPages}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={10}
                                        onPageChange={handlePageClick}
                                        containerClassName={'pagination'}
                                        subContainerClassName={'pages pagination'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            </div>
                        </>
                    )
                ) : (
                    <div className="d-flex justify-content-center p-5 m-5">
                        <img src="/images/search.svg" alt="" className='img-fluid p-5' />
                    </div>
                )}
                <Toaster />
            </div>
        </Container>
    );
};

export default Holiday;
