import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getAllEventDataApi } from 'src/Utils/Apis';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';

const Container = styled.div`
    height: 92vh;
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

    .ongoingEventBtn:active, .ongoingEventBtn:hover{
        border: 1px solid var(--ongoingEventBtn) !important;
        color: var(--ongoingEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
        border-radius: 50px;
        font-size: 14px;
    }

    .ongoingEventBtn{
        border: 1px solid var(--ongoingEventBtn) !important;
        color: var(--ongoingEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
        border-radius: 50px;
        font-size: 14px;
    }

    .upcomingEventBtn:active, .upcomingEventBtn:hover{
        border: 1px solid var(--upcomingEventBtn) !important;
        color: var(--upcomingEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
        border-radius: 50px;
        font-size: 14px;
    }

    .upcomingEventBtn{
        border: 1px solid var(--upcomingEventBtn) !important;
        color: var(--upcomingEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
        border-radius: 50px;
        font-size: 14px;
    }

    .closedEventBtn:active, .closedEventBtn:hover{
        border: 1px solid var(--closedEventBtn) !important;
        color: var(--closedEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
        border-radius: 50px;
        font-size: 14px;
    }

    .closedEventBtn{
        border: 1px solid var(--closedEventBtn) !important;
        color: var(--closedEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
        border-radius: 50px;
        font-size: 14px;
    }
    
`;

const Event = () => {

    const token = sessionStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const searchByKey = '';

    const [EventData, setEventData] = useState([]);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getAllEvents();
    }, [token]);

    const getAllEvents = async () => {
        try {
            setloaderState(true);
            var response = await getAllEventDataApi(searchByKey, pageNo, pageSize);
            // console.log(response, 'holiday')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setEventData(response?.data?.events)
                    setCurrentPage(response?.data?.currentPage)
                    setTotalPages(response?.data?.totalPages)
                    // toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                // console.log(response?.data?.msg);
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log('Error Facing during Get All Event API - ', error)
        }
        finally {
            setloaderState(false);
        }
    }

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };



    return (

        <Container className="container-fluid p-4 overflow-scroll">
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="row pb-3">
                <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                    <ol className="breadcrumb mb-1">
                        <li className="breadcrumb-item">
                            <Link to="/" className='align-self-center bredcrumText text-decoration-none font14'>Home</Link>
                            <Icon className='ms-2' icon="ep:arrow-right-bold" width="1em" height="1em" style={{ color: '#78788C' }} />
                        </li>
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Event</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>Event Details</p>
            </div>
            <div className="row p-3 bg-white borderRadius5 pb-5">
                {EventData.length > 0 ?
                    <>
                        <div className="overflow-scroll">
                            <table className="table align-middle table-striped">
                                <thead>
                                    <tr>
                                        <td className='textWrapClass font14'>#</td>
                                        <td className='textWrapClass font14'>Event Name</td>
                                        <td className='textWrapClass font14'>Start Date & Time</td>
                                        <td className='textWrapClass font14'>End Date & Time</td>
                                        <td className='textWrapClass font14 text-center'>Status</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr></tr>
                                    {EventData.map((item, index) => (
                                        <tr key={item.holidayId}>
                                            <td className='textWrapClass font14 greyText'>{index + 1}</td>
                                            <td className='textWrapClass font14 greyText'>{item.eventName}</td>
                                            <td className='textWrapClass font14 greyText'>{item.startDate} {item.startTime}</td>
                                            <td className='textWrapClass font14 greyText'>{item.endDate} {item.endTime}</td>
                                            <td className='textWrapClass font14 greyText text-center'><button className={`btn ${item.status === "UPCOMING" ? 'upcomingEventBtn' : item.status === "ONGOING" ? 'ongoingEventBtn' : item.status === "CLOSED" ? 'closedEventBtn' : ''}`} type='button'>{item.status}</button></td>
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
                                    breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                                    onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                                />
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="d-flex justify-content-center p-5 m-5">
                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className='img-fluid p-5' />
                        </div>
                    </>
                }
                <Toaster />
            </div>
        </Container>

    )
}

export default Event
