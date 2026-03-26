import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getAllClassApi, getAllMarksheetDataAPI, getExamTermDataApi, viewMarksheetApi } from '../../../Utils/Apis';
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react';
import DataLoader from 'src/Layouts/Loader';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Container = styled.div`
    .modalHighborder {
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .formdltcheck:checked {
        background-color: #B50000;
        border-color: #B50000;
    }

    .modalLightBorder {
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .correvtSVG {
        position: relative;
        width: fit-content;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .deleteSVG {
        position: relative;
        width: fit-content;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }
    
    .mainBreadCrum {
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText {
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText {
        color: var(--breadCrumActiveTextColor);
    }

    .ExportBtns {
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-check-input {
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .greenBgModal {
        background-color: var(--breadCrumActiveTextColor);
    }

    .greenText {
        color: var(--breadCrumActiveTextColor);
    }

    .orangeText {
        color: var(--OrangeBtnColor);
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    .infoIcon {
        cursor: pointer;
    }
    
    .form-control::placeholder, .form-control, .form-select {
        color: var(--greyState)
    }

    .form-control, .form-select {
        border-radius: 5px;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .contbtn {
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv {
        background-color: #FBFBFB;
    }

    .modal-content {
        width: 100%;
        max-width: 1000px; /* Adjust as needed for PDF */
    }
`;

const Marksheet = () => {
    const [loaderState, setloaderState] = useState(false);
    const token = sessionStorage.getItem('token');
    const [MarksheetData, setMarksheetData] = useState([]);
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
    const [ExamTermData, setExamTermData] = useState([]);
    const [selectedStudentMarksheetData, setSelectedStudentMarksheetData] = useState();
    console.log('value of marksgertttt data', selectedStudentMarksheetData);
    const [selectedStudentId, setSelectedStudentId] = useState();
    const modalRef = useRef(null);

    useEffect(() => {
        getAllClassData();
        getAllExamTermData();
        if (classNo) {
            handleClassChange(classNo);
        }
    }, [token, pageNo, classNo]);

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1);
    };

    const getAllClassData = async () => {
        setloaderState(true);
        try {
            const response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setAllClassData(response?.data?.classes);
                }
            } else {
                setloaderState(false);
            }
        } catch (error) {
            setloaderState(false);
            if (error?.response?.data?.statusCode === 401) {
                sessionStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/');
                }, 200);
            }
        } finally {
            setloaderState(false);
        }
    };

    const handleViewClick = async (studentId) => {
        setSelectedStudentId(studentId);
        try {
            setloaderState(true);
            const response = await viewMarksheetApi(sectionId, classNo, examTermSelect, studentId);
            console.log('View Marksheet Response:', response);
            if (response?.data?.status === 'success') {
                setSelectedStudentMarksheetData(response?.data);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch student data');
            }
        } catch (error) {
            toast.error('Failed to fetch student data');
            console.error('Error fetching student marksheet:', error);
        } finally {
            setloaderState(false);
        }
    };

    const handleCloseModal = () => {
        setSelectedStudentMarksheetData(null);
    };

    const getAllExamTermData = async () => {
        setloaderState(true);
        try {
            const response = await getExamTermDataApi('', pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setExamTermData(response?.data?.data);
                } else {
                    setloaderState(false);
                }
            } else {
                setloaderState(false);
            }
        } catch (error) {
            setloaderState(false);
            if (error?.response?.data?.statusCode === 401) {
                sessionStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/');
                }, 200);
            }
        } finally {
            setloaderState(false);
        }
    };

    const handleClassChange = (val) => {
        const classNoVal = val;
        setClassId(classNoVal);
        const selectedClass = allClassData.find(c => c.classNo === classNoVal);
        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
        } else {
            setAllSectionData([]);
        }
    };

    const getAllMarksheet = async () => {
        try {
            setIsSearched(true);
            setloaderState(true);
            const searchKey = '';
            const response = await getAllMarksheetDataAPI(sectionId, classNo, examTermSelect, searchKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setMarksheetData(response?.data?.marksheets);
                    toast.success(response?.data?.message);
                    setTotalPages(response?.data?.totalPages);
                    setCurrentPage(response?.data?.currentPage);
                } else {
                    setloaderState(false);
                    setIsSearched(false);
                    toast.error(response?.data?.message);
                }
            } else {
                setloaderState(false);
                setIsSearched(false);
                toast.error(response?.data?.message);
            }
        } catch (error) {
            setloaderState(false);
            setIsSearched(false);
            console.error('Error During Get Marksheet', error);
        } finally {
            setloaderState(false);
        }
    };

    const handleDownloadPDF = () => {
        setloaderState(true);
        const modalContent = modalRef.current.querySelector('.modal-content');
        if (!modalContent) {
            toast.error('Modal content not found');
            return;
        }

        // Ensure the modal content is visible for capturing
        modalContent.style.display = 'block';
        modalContent.style.position = 'absolute';
        modalContent.style.top = '0';
        modalContent.style.left = '0';

        html2canvas(modalContent, { scale: 2 }).then((canvas) => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('SeeMarksheetModal'));
            modal.hide();
            setloaderState(false);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${selectedStudentMarksheetData?.data?.student?.studentName || 'Marksheet'}.pdf`);
            // handleCloseModal();
            // setSelectedStudentMarksheetData(null);

            // Restore modal styles
            modalContent.style.display = '';
            modalContent.style.position = '';
            modalContent.style.top = '';
            modalContent.style.left = '';
        }).catch((error) => {
            console.error('Error generating PDF:', error);
            toast.error('Failed to generate PDF');
        });

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
                                        <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="Search" className='img-fluid' />
                                    </div>
                                ) : (
                                    <>
                                        {MarksheetData?.length > 0 ? (
                                            <>
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
                                                            {MarksheetData?.map((item, index) => (
                                                                <tr key={item.studentId} className='my-bg-color align-middle'>
                                                                    <th className='textWrapClass greyText font14'>{index + 1}</th>
                                                                    <td className='textWrapClass greyText font14'>{item.studentName}</td>
                                                                    <td className='textWrapClass greyText font14'>{item.totalMaxMarks}</td>
                                                                    <td className='textWrapClass greyText font14'>{item.percentage}</td>
                                                                    <td className='textWrapClass greyText font14'>{item.grade}</td>
                                                                    <td className='d-flex justify-content-end'>
                                                                        <button
                                                                            className="dropdown-item MyActionButtons text-center"
                                                                            type="button"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target="#SeeMarksheetModal"
                                                                            onClick={() => handleViewClick(item.studentId)}>
                                                                            View
                                                                        </button>
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
                                        ) : (
                                            <div className="d-flex justify-content-center p-5 m-5">
                                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="No data" className="img-fluid" />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal modal-lg" id="SeeMarksheetModal" tabIndex="-1" aria-labelledby="SeeMarksheetLabel" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* <div className="modal-header">
                            <h5 className="modal-title" id="SeeMarksheetLabel">Student Marksheet</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleCloseModal}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div> */}
                        <div className="modal-body">
                            {selectedStudentMarksheetData ? (
                                <div>
                                    <h6 className='text-center font4'>{selectedStudentMarksheetData?.data?.student.schoolName || <span className='greyText font14'>-- School Name Not Available --</span>}</h6>
                                    <div className="d-flex align-items-start mt-3">
                                        <div className="col-2 text-center">
                                            <img src='/images/marksheetlogo.webp' alt="School Logo" height={100} />
                                        </div>
                                        <div className="col-8 text-center">
                                            <h6 className='text-center'>Address : {selectedStudentMarksheetData?.data?.student.schoolAddress || <span className='greyText font14'>-- Board Name Not Available --</span>}</h6>
                                            <h6 className='text-center'>Ph : {selectedStudentMarksheetData?.data?.student.schoolPhone || <span className='greyText font14'>-- School Contact Not Available --</span>} &nbsp; Email: {selectedStudentMarksheetData?.data?.student.schoolEmail || <span className='greyText font14'>-- School Mail Not Available --</span>},</h6>
                                            <p>Visit us: <a className="text-decoration-none" href="mailto:hshs">{selectedStudentMarksheetData?.data?.student.websiteLink || <span className='greyText font14'> --School Website Not Available --</span>}</a></p>
                                            <div className="mt-3">
                                                <p>Academic Report</p>
                                                <p>Academic Session: {selectedStudentMarksheetData?.data.student?.session || <span className='greyText'>-- Not available --</span>}</p>
                                                <p>Class: {selectedStudentMarksheetData?.data.student?.classNo || <span className='greyText'>-- Not available --</span>}/{selectedStudentMarksheetData?.data.student?.classSection || <span className='greyText'>-- Not available --</span>}</p>
                                            </div>
                                        </div>
                                        <div className="col-2 text-center">
                                            <img src='/images/marksheetStudentImage.png' alt="Student Image" height={100} />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className='font14 greyText'><strong>Name of Student</strong></p>
                                                    <p className='font14 greyText'><strong>Mother's Name</strong></p>
                                                    <p className='font14 greyText'><strong>Father's Name</strong></p>
                                                    <p className='font14 greyText'><strong>Address</strong></p>
                                                </div>
                                                <div className="col-6">
                                                    <p className='font14 fontWeight900'> : {selectedStudentMarksheetData?.data.student.studentName}</p>
                                                    <p className='font14 fontWeight900'> : {selectedStudentMarksheetData?.data.student.motherName}</p>
                                                    <p className='font14 fontWeight900'> : {selectedStudentMarksheetData?.data.student.fatherName}</p>
                                                    <p className='font14 fontWeight900'> : {selectedStudentMarksheetData?.data.student.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p className='font14 greyText'><strong>Roll Number</strong></p>
                                                    <p className='font14 greyText'><strong>Admission Date</strong></p>
                                                    <p className='font14 greyText'><strong>Date of Birth</strong></p>
                                                </div>
                                                <div className="col-6">
                                                    <p className='font14 fontWeight900'> : {selectedStudentMarksheetData?.data.student.rollNumber}</p>
                                                    <p className='font14 fontWeight900'> : {new Date(selectedStudentMarksheetData?.data.student.admissionDate).toLocaleDateString()}</p>
                                                    <p className='font14 fontWeight900'> : {new Date(selectedStudentMarksheetData?.data.student.dateOfBirth).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <table className="table table-bordered mt-4">
                                        <thead>
                                            <tr>
                                                <th className='font14 bg-blue'>Subject</th>
                                                <th className='font14 bg-blue'>Theory Marks</th>
                                                <th className='font14 bg-blue'>Practical Marks</th>
                                                <th className='font14 bg-blue'>Total Marks</th>
                                                <th className='font14 bg-blue'>Percentage</th>
                                                <th className='font14 bg-blue'>Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedStudentMarksheetData?.data.subjectMarks.map((subject, index) => (
                                                <tr key={index}>
                                                    <td className='font14'>{subject.subject}</td>
                                                    <td className='font14'>{subject.theoryMarks}</td>
                                                    <td className='font14'>{subject.practicalMarks}</td>
                                                    <td className='font14'>{subject.obtainMarks}</td>
                                                    <td className='font14'>{subject.percentage}</td>
                                                    <td className='font14'>{subject.grade}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <table className="table table-bordered mt-4">
                                        <thead>
                                            <tr>
                                                <th className='font14 bg-blue'>CO-SCHOLASTIC: (3 POINT GRADING SCALE A,B,C)</th>
                                                <th className='font14 text-center bg-blue'>Term-I</th>
                                                <th className='font14 text-center bg-blue'>Term-II</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='font14'>UNIFORM</td>
                                                <td className='text-center font14'>{selectedStudentMarksheetData?.data?.student?.uniform || <span className="greyText font14"> --</span>}</td>
                                                <td className='text-center font14'>{selectedStudentMarksheetData?.data?.student?.uniform || <span className="greyText font14"> --</span>}</td>
                                            </tr>
                                            <tr>
                                                <td className='font14'>ACTIVITIES</td>
                                                <td className='text-center font14'>{selectedStudentMarksheetData?.data?.student?.activities || <span className="greyText font14"> --</span>}</td>
                                                <td className='text-center font14'>{selectedStudentMarksheetData?.data?.student?.activities || <span className="greyText font14"> --</span>}</td>
                                            </tr>
                                            <tr>
                                                <td className='font14'>DIGITAL CLASS</td>
                                                <td className='text-center font14'>{selectedStudentMarksheetData?.data?.student?.digitalclass || <span className="greyText font14"> --</span>}</td>
                                                <td className='text-center font14'>{selectedStudentMarksheetData?.data?.student?.digitalclass || <span className="greyText font14"> --</span>}</td>
                                            </tr>
                                            <tr>
                                                <td className='font14'>WRITTENSKILLS</td>
                                                <td className='text-center font14'>{selectedStudentMarksheetData?.data?.student?.writtenskills || <span className="greyText font14"> --</span>}</td>
                                                <td className='text-center font14'>{selectedStudentMarksheetData?.data?.student?.writtenskills || <span className="greyText font14"> --</span>}</td>
                                            </tr>
                                            <tr>
                                                <td className='font14'>SPEAKING SKILLS</td>
                                                <td className='text-center font14'>{selectedStudentMarksheetData?.data?.student?.speakingskills || <span className="greyText font14"> --</span>}</td>
                                                <td className='text-center font14'>{selectedStudentMarksheetData?.data?.student?.speakingskills || <span className="greyText font14"> --</span>}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div className="d-flex text-center mt-4">
                                        <div className="col-4"><i className='font12'>Sign. of Class Teacher</i></div>
                                        <div className="col-4"><i className='font12'>Sign. of Principal</i></div>
                                        <div className="col-4"><i className='font12'>Sign. of Manager</i></div>
                                    </div>
                                    <hr className='mt-1 mb-1' />
                                    <p className="text-center font14">Instructions</p>
                                    <div className='mt-4 mb-3'><strong className='font14'>Grading scale for scholastic areas:</strong> <span className='greyText font14'>Grades are awarded on a 8-point grading scale as follows-</span></div>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className='font14 text-center'>Marks Range in (%)</th>
                                                <th className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeKey || <span className="greyText font14"> --</span>}</th>
                                                <th className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeKey || <span className="greyText font14"> --</span>}</th>
                                                <th className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeKey || <span className="greyText font14"> --</span>}</th>
                                                <th className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeKey || <span className="greyText font14"> --</span>}</th>
                                                <th className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeKey || <span className="greyText font14"> --</span>}</th>
                                                <th className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeKey || <span className="greyText font14"> --</span>}</th>
                                                <th className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeKey || <span className="greyText font14"> --</span>}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='font14 text-center'>Grade</td>
                                                <td className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeValue || <span className="greyText font14"> --</span>}</td>
                                                <td className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeValue || <span className="greyText font14"> --</span>}</td>
                                                <td className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeValue || <span className="greyText font14"> --</span>}</td>
                                                <td className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeValue || <span className="greyText font14"> --</span>}</td>
                                                <td className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeValue || <span className="greyText font14"> --</span>}</td>
                                                <td className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeValue || <span className="greyText font14"> --</span>}</td>
                                                <td className='font14 text-center'>{selectedStudentMarksheetData?.data?.student?.gradeValue || <span className="greyText font14"> --</span>}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-center">No data available</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-sm addButtons text-white font14"
                                onClick={handleDownloadPDF}
                            >
                                Download PDF
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm cancelButtons"
                                onClick={handleCloseModal}
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Marksheet;
