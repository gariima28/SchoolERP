import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getAllSubjectDataApi } from 'src/Utils/Apis';
import DataLoader from 'src/Layouts/Loader';

const Container = styled.div`
    height: 92vh;
    width: 100%;
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

`;

const Subject = () => {

    const token = sessionStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const searchByKey = '';

    const [SubjectData, setSubjectData] = useState([]);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getAllSubjects();
    }, [token, pageNo]);

    const getAllSubjects = async () => {
        try {
            setloaderState(true);
            var response = await getAllSubjectDataApi(pageNo, pageSize);
            // console.log(response, 'subject')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setSubjectData(response?.data?.subjects)
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
            setloaderState(false);
            // console.log(error)
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

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };



    return (

        <Container>
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="container-fluid p-4 overflow-scroll">
                <div className="row px-2">
                    <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                        <ol className="breadcrumb mb-1">
                            <li className="breadcrumb-item">
                                <Link to="/" className='align-self-center bredcrumText text-decoration-none font14'>Home</Link>
                                <Icon className='ms-2' icon="ep:arrow-right-bold" width="1em" height="1em" style={{ color: '#78788C' }} />
                            </li>
                            <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Subject</li>
                        </ol>
                    </nav>
                    <p className='font14 ps-0 fw-bolder'>Subject Details</p>
                </div>
                <div className="row p-2">
                    <div className="col-12 bg-white borderRadius5 px-4 py-2">
                        <div className="row">
                            {SubjectData.length > 0 ?
                                <>
                                    <table className="table align-middle table-striped">
                                        <thead>
                                            <tr>
                                                <td className='font14'>#</td>
                                                <td className='font14'>Subject Name</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr></tr>
                                            {SubjectData.map((item, index) => (
                                                <tr key={item.holidayId}>
                                                    <td className='font14 greyText'>{index + 1}</td>
                                                    <td className='font14 greyText'>{item.subjectName}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

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
                        </div>
                    </div>
                    <Toaster />
                </div>
            </div>
        </Container>

    )
}

export default Subject
