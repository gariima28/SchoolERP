import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllClassApi, getAllMarksheetDataAPI, getExamTermDataApi } from '../../../Utils/Apis';
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react';
import DataLoader from 'src/Layouts/Loader';

const Container = styled.div`

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .deleteSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }
    
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ExportBtns{
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .greenBgModal{
        background-color: var(--breadCrumActiveTextColor);
    }

    .greenText{
        color: var(--breadCrumActiveTextColor);
    }

    .orangeText{
        color: var(--OrangeBtnColor);
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    .infoIcon{
        cursor: pointer;
    }
    
    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px ;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

`;

const Marksheet = () => {
    const [loaderState, setloaderState] = useState(false);
    const token = sessionStorage.getItem('token');
    const [MarksheetData, setMarksheetData] = useState([]);
    // console.log(MarksheetData)
    const [isSearched, setIsSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [classNo, setClassId] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [examTermSelect, setExamTermSelect] = useState('');
    const [allClassData, setAllClassData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);
    const [allSubjectData, setAllSubjectData] = useState([]);
    const [ExamTermData, setExamTermData] = useState([]);
    const [viewMarksheetType, setViewMarksheetType] = useState('percentGrade');

    useEffect(() => {
        getAllClassData();
        getAllExamTermData();
        if (classNo) {
            handleClassChange(classNo)
        }
    }, [token, pageNo, classNo]);

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1);
    };

    const getAllClassData = async () => {
        setloaderState(true)
        try {
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setAllClassData(response?.data?.classes);
                }
            }
            else {
                setloaderState(false)
                // console.log(response?.data?.message);
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

    const getAllExamTermData = async () => {
        setloaderState(true)
        try {
            const response = await getExamTermDataApi('', pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setExamTermData(response?.data?.data);
                    // toast.success(response.data.message);
                }
                else {
                    setloaderState(false)
                    // console.log(response?.data?.message);
                }
            }
            else {
                setloaderState(false)
                // console.log(response?.data?.message);
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

    const handleClassChange = (val) => {
        const classNoVal = val;
        setClassId(classNoVal);
        const selectedClass = allClassData.find(c => c.classNo === classNoVal);

        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
            // setAllSubjectData(selectedClass.subjects || []);
        } else {
            setAllSectionData([]);
            // setAllSubjectData([]);
        }
    };

    const getAllMarksheet = async () => {
        try {
            setIsSearched(true);
            setloaderState(true);
            const searchKey = ''
            const response = await getAllMarksheetDataAPI(sectionId, classNo, examTermSelect, searchKey, pageNo, pageSize);
            // console.log(response, 'marksheet data here')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setMarksheetData(response?.data?.marksheets);
                    // setAllSubjectData(response?.data?.subjectList);
                    setTotalPages(response?.data?.totalPages)
                    setCurrentPage(response?.data?.currentPage)
                    // toast.success(response?.data?.message);
                }
                else {
                    setloaderState(false);
                    setIsSearched(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                setIsSearched(false);
                toast.error(response?.data?.message);
            }
        } catch (error) {
            setloaderState(false);
            setloaderState(false);
            setIsSearched(false);
            console.error('Error During Get Marksheet', error);
        }
        finally {
            setloaderState(false);
        }
    };

    return (
        <Container>
            {loaderState && (<DataLoader />)}
            <div className="container-fluid">
                <div className="row p-4">
                    <div className="row pb-3">
                        <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                <li className="breadcrumb-item"><a href="/ExamTerm" className='bredcrumText text-decoration-none'>Exam Term</a></li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Marksheet</li>
                            </ol>
                        </nav>
                        <p className='font14 ps-0 fontWeight500'>Marksheet</p>
                    </div>
                    <div className="row pb-3">
                        <div className="bg-white rounded-2 p-4">
                            <form className="row g-3">
                                <div className="col-md-4 col-sm-6 col-12">
                                    <label htmlFor="inputEmail4" className="form-label font14">Class</label>
                                    <select
                                        className="form-select borderRadius5 font14"
                                        aria-label="Default select example"
                                        value={classNo}
                                        onChange={(e) => handleClassChange(e.target.value)}
                                    >
                                        <option value="">--- Choose ---</option>
                                        {allClassData?.map((option, index) => (
                                            <option key={option.classId} value={option?.classNo}>
                                                {option.classNo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 col-12">
                                    <label htmlFor="inputEmail4" className="form-label font14">Section</label>
                                    <select
                                        className="form-select borderRadius5 font14"
                                        aria-label="Default select example"
                                        value={sectionId}
                                        onChange={(e) => setSectionId(e.target.value)}
                                    >
                                        <option value="">--- Choose ---</option>
                                        {allSectionData.length > 0 ? (
                                            allSectionData.map((section) => (
                                                <option key={section.classSecId} value={section.sectionName}>
                                                    {section.sectionName}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>
                                                {classNo ? '-- No Sections Found --' : '-- Select Class First --'}
                                            </option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 col-12">
                                    <label htmlFor="inputEmail4" className="form-label font14">Exam Term</label>
                                    <select
                                        className="form-select borderRadius5 font14"
                                        aria-label="Default select example"
                                        value={examTermSelect}
                                        onChange={(e) => setExamTermSelect(e.target.value)}
                                    >
                                        <option value="">Select an Exam Term</option>
                                        {ExamTermData?.map((option) => (
                                            <option key={option.examTermId} value={option?.examTermId}>
                                                {option.examTermName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <p className="text-center p-3">
                                    <button
                                        type="button"
                                        className="btn updateButtons text-white"
                                        onClick={getAllMarksheet}
                                    >
                                        Search
                                    </button>
                                    <button
                                        type="button"
                                        className="btn cancelButtons ms-3"
                                        onClick={() => {
                                            setClassId('');
                                            setSectionId('');
                                            setExamTermSelect('');
                                            setIsSearched(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </p>
                            </form>

                            <div className="row">
                                {!isSearched ? (
                                    <div className="d-flex justify-content-center p-5">
                                        <img src="/images/search.svg" alt="Search" className='img-fluid' />
                                    </div>
                                ) : (
                                    <>
                                        {/* <div className='d-flex col-3'>
                                            <select className="form-select borderRadius5 font14 " aria-label="Default select example" onChange={(e) => setViewMarksheetType(e.target.value)}>
                                                <option value='' disabled> -- Select View Mode -- </option>
                                                <option value='percent'>Percent</option>
                                                <option value='grade'>Grade</option>
                                                <option value='percentGrade' selected>Percent-Grade</option>
                                            </select>
                                        </div> */}
                                        <div className="overflow-scroll cardradius bg-white p-3">
                                            <table className="table align-middle table-striped">
                                                <thead>
                                                    <tr>
                                                        <th className='font14 textWrapClass'>#</th>
                                                        <th className='font14 textWrapClass'>Student Name</th>
                                                        <th className='font14 textWrapClass'>Total</th>
                                                        <th className='font14 textWrapClass'>%</th>
                                                        <th className='font14 textWrapClass'>Grade</th>
                                                        <th className='font14 text-end'>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* Marksheet data */}
                                                    {MarksheetData.map((item, index) => (
                                                        <tr key={item.studentId} className='my-bg-color align-middle'>
                                                            <th className='textWrapClass greyText font14'>{index + 1}</th>
                                                            <td className='textWrapClass greyText font14'>{item.studentName}</td>
                                                            <td className='textWrapClass greyText font14'>{item.totalMaxMarks}</td>
                                                            <td className='textWrapClass greyText font14'>{item.percentage}</td>
                                                            <td className='textWrapClass greyText font14'>{item.grade}</td>
                                                            <td className='text-end'>
                                                                <div className="dropdown dropdownbtn">
                                                                    <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                        <span>Action</span>
                                                                    </button>
                                                                    <ul className="dropdown-menu">
                                                                        <li>
                                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop">
                                                                                View
                                                                            </button>
                                                                        </li>
                                                                        <li>
                                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop">
                                                                                Download
                                                                            </button>
                                                                        </li>
                                                                    </ul>
                                                                </div>
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
                                                    breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                                                    onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Marksheet;
