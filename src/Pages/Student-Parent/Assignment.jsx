import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getAllAssignmentsDataApi, getAllHolidayDataApi } from 'src/Utils/Apis';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import { getDownloadAssignmentDataApi } from '../../Utils/Apis';

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

    /* .hoverIcon{
        position: relative;
        cursor: pointer;

        &:hover .hoveringDescriptionDiv{
            display: block;
            cursor: pointer;
            position: absolute;
            background-color: var(--hoveringDivBg) !important;
            border: 1px solid var(--hoveringDivBorder);
            color: #fff;
            width: 260px;
            z-index: 1;
        }
    }

    .hoveringDescriptionDiv{
        display: none;
    } */
/* 
    .custom-tooltip {
        --bs-tooltip-bg: var(--bd-violet-bg);
        --bs-tooltip-color: var(--bs-white);
    } */

`;

const Assignment = () => {

    const token = sessionStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const searchByKey = '';

    const [AssignmentData, setAssignmentData] = useState([]);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getAllAssignments();
    }, [token, pageNo]);

    const getAllAssignments = async () => {
        try {
            setloaderState(true);
            var response = await getAllAssignmentsDataApi(pageNo, pageSize);
            // console.log(response, 'Assignment')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setAssignmentData(response?.data?.assignment)
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
            // console.log('Error Facing during Get All Assignment API - ', error)
        }
    }

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };


    const downloadAssignment = async (id) => {
        try {
            setloaderState(true);
            const data = {
                "responseType": "blob"
            };
            const response = await getDownloadAssignmentDataApi(id, data);
            if (response?.status === 200) {
                const pdfData = response?.data;
                downloadFileFunction(pdfData, 'Assignment.pdf');
                toast.success('Assignment Downloaded Successfully');
                setloaderState(false);
            } else {
                toast.error('Failed to download the Assignment.');
            }
        } catch (error) {
            setloaderState(false);
            toast.error('An error occurred while downloading the Assignment-', error);
        }
    };

    const downloadFileFunction = (blob, filename) => {
        const url = window.URL.createObjectURL(blob);
        //creates a temporary URL that points to the Blob object. This URL can be used as a link to access the file data.
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        //releases the memory used by the temporary URL. This is important to prevent memory leaks, 
        //as the URL was only needed for the duration of the file download process.
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
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Assignment</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>Assignment Details</p>
            </div>
            <div className="row p-3 bg-white borderRadius5 pb-5">
                {AssignmentData.length > 0 ?
                    <>
                        <div className="overflow-scroll">
                            <table className="table align-middle table-striped">
                                <thead>
                                    <tr>
                                        <td className='textWrapClass font14'>#</td>
                                        <td className='textWrapClass font14'>Title</td>
                                        <td className='textWrapClass font14'>Teacher</td>
                                        <td className='textWrapClass font14'>Subject</td>
                                        <td className='textWrapClass font14'>Download</td>
                                        <td className='textWrapClass font14'>Start Time</td>
                                        <td className='textWrapClass font14'>End Time</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr></tr>
                                    <tr></tr>
                                    {AssignmentData.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className='textWrapClass font14 greyText'>{index + 1}</td>
                                            <td className='textWrapClass font14 greyText'>{item.title}</td>
                                            <td className='textWrapClass font14 greyText'>{item.createdBy}</td>
                                            <td className='textWrapClass font14 greyText'>{item.subjectName}</td>
                                            <td className='textWrapClass greyText'>
                                                <p className='font14 align-self-start m-0'>
                                                    <Icon icon="bxs:file-pdf" width="1.3em" height="1.3em" style={{ color: 'red' }} />
                                                    <Link className='ms-2' to='' onClick={() => downloadAssignment(item.id)}>Download</Link>
                                                </p>
                                            </td>
                                            <td className='textWrapClass font14 greyText'>{item.startDate}</td>
                                            <td className='textWrapClass font14 greyText'>{item.endDate}</td>
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
                            <img src="/images/search.svg" alt="" className='img-fluid p-5' />
                        </div>
                    </>
                }
                <Toaster />
            </div>
        </Container>

    )
}

export default Assignment
