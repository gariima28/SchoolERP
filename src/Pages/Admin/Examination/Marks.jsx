import React, { Suspense, lazy, useEffect, useState } from 'react'
import styled from 'styled-components'
// import MarksTable from 'src/Modals/Marks/MarksTable';
import { getAllClassApi, getAllMarksApi, getAllSessionDataAPI, getExamTermDataApi } from '../../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react';

const MarksTable = lazy(() => import('src/Modals/Marks/MarksTable'));

const Container = styled.div`
    .form-select{
        color: var(--greyState);
        box-shadow: none;
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

`;

const Marks = () => {

    //loader State
    const [loaderState, setloaderState] = useState(false);

    const token = localStorage.getItem('token');
    const [isSearched, setIsSearched] = useState(false);
    const [indexxx, setIndexxx] = useState('');
    const [classNo, setClassNo] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [subjectName, setSubjectName] = useState('');

    const [marksData, setMarksData] = useState([]);
    const [marksPageData, setMarksPageData] = useState();
    // // console.log(marksData[0], 'Marks')
    const [sessionData, setSessionData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [ExamTermData, setExamTermData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);
    const [allSubjectData, setAllSubjectData] = useState([]);

    const [sessionSelect, setSessionSelect] = useState('');
    const [examTermSelect, setExamTermSelect] = useState('');
    const [totalMarksSelect, setTotalMarksSelect] = useState(0);

    const [reloadMarks, setReloadMarks] = useState(false)

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };



    useEffect(() => {
        getAllSession();
        getAllClassData();
        getAllExamTermData();
    }, []);

    const handleReloadMarksData = () => {
        setReloadMarks(true)
    }

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
                localStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                }, 200);
            }

        }
        finally {
            setloaderState(false);
        }
    }

    const getAllSession = async () => {
        try {
            var response = await getAllSessionDataAPI('', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setSessionData(response?.data?.sessions);
                    // toast.success(response?.data?.message)
                    // setTotalItems(10);
                }
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log('Error During Get Session', error);
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token')
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
        setloaderState(true);
        try {
            var response = await getExamTermDataApi('', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setExamTermData(response?.data?.data);
                }
            }
            else {
                setloaderState(false);
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            setloaderState(false);
            // console.log(error)
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                }, 200);
            }

        }
        finally {
            setloaderState(false);
        }
    }

    const getAllMarksData = async () => {
        try {
            setIsSearched(true);
            setloaderState(true);
            // var response = await getAllMarksApi(2, 52, 54, '2025 - 2026', 'Finall Exam', pageNo, pageSize);
            var response = await getAllMarksApi(classNo, sectionName, subjectName, sessionSelect, examTermSelect, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setMarksData(response?.data?.studentMarksList?.students);
                    setTotalMarksSelect(response?.data?.studentMarksList?.totalMarks);
                    setCurrentPage(response?.data?.currentPage);
                    setTotalPages(response?.data?.totalPages);
                }
                else {
                    setloaderState(false);
                    setIsSearched(false)
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                setIsSearched(false)
            }
        }
        catch (e) {
            setIsSearched(false)
            toast.error(e.response?.data?.message);
            setloaderState(false);
        }
        finally {
            setloaderState(false);
        }
    }

    const handleCancelSearch = () => {
        setIndexxx('');
        setClassNo('');
        setSectionName('');
        setSubjectName('');
        setSessionSelect('');
        setExamTermSelect('');
        setIsSearched(false);
        setMarksData([])
    }


    const handleClassChange = (classNo) => {
        setClassNo(classNo)
        const selectedClass = allClassData.find(c => c.classNo === classNo);
        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
            setAllSubjectData(selectedClass.subjects || []);
        } else {
            setAllSectionData([]);
            setAllSubjectData([]);
        }
        setClassNo(classNo);
    };

    return (
        <>
            <Container className='h-100 overflow-scroll'>
                {
                    loaderState && (
                        <DataLoader />
                    )
                }
                <div className="container-fluid p-4">
                    <div className="row pb-3 gap-xl-0 gap-3">
                        <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/ExamTerm" className='bredcrumText text-decoration-none'>Examination</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Marks</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Manage Marks</p>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="bg-white rounded-2 p-4">
                            <form className="row g-3">
                                <div className="col-lg-7 col-md-12 col-sm-12 col-12">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-6 col-12">
                                            <label htmlFor="inputEmail4" className="form-label font14">Session</label>
                                            <select
                                                className="form-select borderRadius5 font14"
                                                aria-label="Default select example"
                                                value={sessionSelect}
                                                onChange={(e) => setSessionSelect(e.target.value)}
                                            >
                                                <option value="">Select a Session</option>
                                                {sessionData?.map((option) => (
                                                    <option key={option.sessionId} value={option.sessionName}>
                                                        {option.sessionName}
                                                    </option>
                                                ))}
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
                                                    <option key={option.examTermId} value={option.examTermId}>
                                                        {option.examTermName}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                        <div className="col-md-4 col-sm-6 col-12">
                                            <label htmlFor="classNoAdd" className="form-label font14">Class</label>
                                            <select
                                                id="classNoAdd"
                                                className='form-select font14'
                                                value={classNo}
                                                onChange={(e) => handleClassChange(e.target.value)}
                                            >
                                                <option value="">-- Select --</option>
                                                {allClassData.map((clas) => (
                                                    <option key={clas.classId} value={clas.classNo}>
                                                        {clas.classNo}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-12 col-sm-12 col-12">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-4 col-sm-6 col-12">
                                            <label htmlFor="sectionAdd" className="form-label font14">Section</label>
                                            <select
                                                id="sectionAdd"
                                                className='form-select font14'
                                                value={sectionName}
                                                onChange={(e) => setSectionName(e.target.value)}
                                            >
                                                <option value="">-- Select --</option>
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
                                        <div className="col-lg-6 col-md-4 col-sm-6 col-12">
                                            <label htmlFor="subjectAdd" className="form-label font14">Subject</label>
                                            <select
                                                id="subjectAdd"
                                                className='form-select font14'
                                                value={subjectName}
                                                onChange={(e) => setSubjectName(e.target.value)}
                                            >
                                                <option value="">-- Select --</option>
                                                {allSubjectData.length > 0 ? (
                                                    allSubjectData.map((subject) => (
                                                        <option key={subject.subjectName} value={subject.subjectName}>
                                                            {subject.subjectName}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="" disabled>
                                                        {classNo ? '-- No Sections Found --' : '-- Select Class First --'}
                                                    </option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-center p-3'>
                                    <button type='button' className='btn updateButtons text-white' disabled={classNo === '' || sectionName === '' || subjectName === '' || sessionSelect === '' || examTermSelect === ''} onClick={getAllMarksData}>Search</button>
                                    <button type='button' className='btn cancelButtons ms-3' disabled={classNo === '' || sectionName === '' || subjectName === '' || sessionSelect === '' || examTermSelect === ''} onClick={handleCancelSearch}>Cancel</button>
                                </p>
                            </form>
                            <div className="row">
                                {!isSearched ? (
                                    <div className="d-flex justify-content-center p-5">
                                        <img src="/images/search.svg" alt="Search" className='img-fluid' />
                                    </div>
                                ) : (
                                    <Suspense fallback={<DataLoader />}>
                                        {marksData.length > 0 ? (
                                            <>
                                                <MarksTable
                                                    marksData={marksData}
                                                    marksPageData={marksPageData}
                                                    subjectName={subjectName}
                                                    className={classNo}
                                                    sectionName={sectionName}
                                                    sessionSelect={sessionSelect}
                                                    examTermSelect={examTermSelect}
                                                    totalMarksSelect={totalMarksSelect}
                                                    ReloadMarksData={handleReloadMarksData}
                                                />
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
                                        )

                                            :
                                            <div className="d-flex justify-content-center p-5">
                                                <img src="/images/search.svg" alt="Search" className='img-fluid' />
                                            </div>
                                        }
                                    </Suspense>

                                )}
                            </div>
                            {/* <MarksTable marksData={marksData} className={className} sectionName={sectionName} subjectName={subjectName} sessionSelect={sessionSelect} examTermSelect={examTermSelect} /> */}
                        </div>
                    </div>
                    <Toaster />
                </div>
            </Container>
        </>
    )
}

export default Marks

