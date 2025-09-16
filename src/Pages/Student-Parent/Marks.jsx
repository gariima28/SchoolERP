import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getAllMarksDataApi } from 'src/Utils/Apis';
import DataLoader from 'src/Layouts/Loader';
import { getExamTermDataApi } from '../../Utils/Apis';

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

`;

const Marks = () => {

    const token = sessionStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [examScheduleSearch, setExamScheduleSearch] = useState(false);
      const [selectedExam, setSelectedExam] = useState('');
    const searchByKey = '';

    const [MarksData, setMarksData] = useState([]);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
      const [examTermData, setExamTermData] = useState([]);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getAllMarks();
        getAllExamTermData()
    }, [token, pageNo]);

    const getAllExamTermData = async (search = "") => {
        try {
            setloaderState(true);
            const response = await getExamTermDataApi("", "", "");
            if (response?.status === 200 && response?.data?.status === "success") {
                setExamTermData(response.data.data || []);
            } else {
                toast.error(response?.data?.message || "Failed to fetch exam terms");
            }
        } catch (error) {
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem("token");
                navigate("/");
            }
            toast.error("Error fetching exam terms");
        } finally {
            setloaderState(false);
        }
    };

    const getAllMarks = async () => {
        try {
            setloaderState(true);
            var response = await getAllMarksDataApi(selectedExam, pageNo, pageSize);
            // console.log(response, 'marks')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setMarksData(response?.data?.marksheet?.subjectMarks || [])
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
            // console.log('Error Facing during Get All Marks API - ', error)
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
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Marks</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>Marks Details</p>
            </div>
            <div className="row p-3 bg-white borderRadius5 pb-5">
                <div className="d-flex mb-2 justify-content-center">
                    <div className="w-50">
                        <label htmlFor="inputState" className="form-label font14">
                            Exam Term
                        </label>
                        <select
                            value={selectedExam}
                            id="inputState"
                            className="form-select font14"
                            onChange={(e) => setSelectedExam(e.target.value)}
                        >
                            <option value='' disabled>
                                Select Exam Term
                            </option>
                            {examTermData.map((item, index) => (
                                <option key={index} value={item.examTermId}>
                                    {item.examTermName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row mb-4">
                    <p className="text-center p-3">
                        <button
                            type="button"
                            className="btn printButtons text-white"
                            onClick={() => {
                                setExamScheduleSearch(true), getAllMarks();
                            }}
                        >
                            Search
                        </button>
                        <button
                            type="button"
                            className="btn cancelButtons ms-3"
                            onClick={() => {
                                setExamScheduleSearch(false), setSelectedExam("");
                            }}
                        >
                            Cancel
                        </button>
                    </p>
                </div>
                {examScheduleSearch ? (
                    <div className="row">
                        {MarksData.length > 0 ?
                            <>
                                <div className="overflow-scroll">
                                    <table className="table align-middle table-striped">
                                        <thead>
                                            <tr>
                                                <td className='textWrapClass font14'>#</td>
                                                <td className='textWrapClass font14'>Subject</td>
                                                <td className='textWrapClass font14'>Theory Marks</td>
                                                <td className='textWrapClass font14'>Practical Marks</td>
                                                <td className='textWrapClass font14'>Obtain Marks</td>
                                                <td className='textWrapClass font14'>Grade</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr></tr>
                                            {MarksData.map((item, index) => (
                                                <tr key={item.holidayId}>
                                                    <td className='textWrapClass font14 greyText'>{index + 1}</td>
                                                    <td className='textWrapClass font14 greyText'>{item.subject || '-'}</td>
                                                    <td className='textWrapClass font14 greyText'>{item.theoryMarks || '-'}</td>
                                                    <td className='textWrapClass font14 greyText'>{item.practicalMarks || '-'}</td>
                                                    <td className='textWrapClass font14 greyText'>{item.obtainMarks || '-'}</td>
                                                    <td className='textWrapClass font14 greyText'>{item.grade}</td>
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
                    </div>
                ) : (
                    <div className="d-flex justify-content-center p-5 m-5">
                        <img src="/images/search.svg" alt="" className="img-fluid p-5" />
                    </div>
                )}
                <Toaster />
            </div>
        </Container>

    )
}

export default Marks
