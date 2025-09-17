import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import DataLoader from 'src/Layouts/Loader';
import ActionControls from '../../../Layouts/ActionControls';
import {
    getAllExamScheduleApi,
    getExamScheduleDataByIdApi,
    updateExamScheduleApi,
    deleteExamScheduleApi,
    addNewExamScheduleApi,
    getAllClassApi,
    getAllSubjectByClassApi,
    getRoomDataApi,
    getSearchExamScheduleApi,
    getExamTermDataApi,
} from '../../../Utils/Apis';

const StyledContainer = styled.div`
    .form-control::placeholder, .form-control, .form-select {
        color: var(--greyState);
    }

    .formdltcheck:checked {
        background-color: #B50000;
        border-color: #B50000;
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

    .mainBreadCrum {
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText {
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText {
        color: var(--breadCrumActiveTextColor);
    }

    .eventablerow {
        background-color: var(--tableGreyBackgroundColor) !important;
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

    .form-select {
        color: var(--greyState);
        box-shadow: none;
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

    .modalHighborder {
        border-bottom: 2px solid var(--modalBorderColor);
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
`;

const ExamSchedule = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // State Management
    const [loaderState, setLoaderState] = useState(false);
    const [examScheduleData, setExamScheduleData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [allSearchSubjectData, setAllSearchSubjectData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);
    const [allSubjectData, setAllSubjectData] = useState([]);
    const [allRoomData, setAllRoomData] = useState([]);
    const [examTermData, setExamTermData] = useState([]);
    const [classNo_Search, setClassNo_Search] = useState('');
    const [subject_Search, setSubject_Search] = useState('');
    const [searchInputVal, setSearchInputVal] = useState('');
    const [editExamScheduleId, setEditExamScheduleId] = useState('');
    const [delExamScheduleId, setDelExamScheduleId] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [initialFormValues, setInitialFormValues] = useState({});
    const [updateSubjectId, setUpdateSubjectId] = useState();

    // Form instances
    const {
        register: registerAdd,
        handleSubmit: handleSubmitAdd,
        formState: { errors: errorsAdd, isValid: isValidAdd },
        setValue: setValueAdd,
        reset: resetAdd,
        watch: watchAdd,
    } = useForm({
        mode: 'onChange',
    });

    const {
        register: registerUpdate,
        handleSubmit: handleSubmitUpdate,
        formState: { errors: errorsUpdate, isValid: isValidUpdate },
        setValue: setValueUpdate,
        reset: resetUpdate,
        watch: watchUpdate,
    } = useForm({
        mode: 'onChange',
    });

    // Fetch Initial Data
    useEffect(() => {
        getAllClassData();
        getAllRoomData();
        getAllExamTermData()
    }, [token, pageNo, pageSize]);

    const getAllExamTermData = async () => {
        try {
            setLoaderState(true);
            const response = await getExamTermDataApi('', '', '');
            if (response?.status === 200 && response?.data?.status === 'success') {
                setExamTermData(response.data.data || []);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch exam terms');
            }
        } catch (error) {
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
            toast.error('Error fetching exam terms');
        } finally {
            setLoaderState(false);
        }
    };

    const getAllClassData = async () => {
        try {
            setLoaderState(true);
            const response = await getAllClassApi();
            if (response?.status === 200 && response?.data?.status === 'success') {
                setAllClassData(response.data.classes || []);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch classes');
            }
        } catch (error) {
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
            toast.error('Error fetching classes');
        } finally {
            setLoaderState(false);
        }
    };

    const getAllSubjectData = async (classNo) => {
        try {
            setLoaderState(true);
            const response = await getAllSubjectByClassApi(classNo);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setAllSubjectData(response.data.subjects || []);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch subjects');
            }
        } catch (error) {
            toast.error('Error fetching subjects');
        } finally {
            setLoaderState(false);
            setValueUpdate('subject', updateSubjectId);
        }
    };

    const getAllRoomData = async () => {
        try {
            setLoaderState(true);
            const response = await getRoomDataApi('', '', '');
            if (response?.status === 200 && response?.data?.status === 'success') {
                setAllRoomData(response.data.rooms || []);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch rooms');
            }
        } catch (error) {
            toast.error('Error fetching rooms');
        } finally {
            setLoaderState(false);
        }
    };

    const getSearchedExamScheduleData = async () => {
        if (!classNo_Search || !subject_Search) return;
        try {
            setLoaderState(true);
            const response = await getSearchExamScheduleApi(classNo_Search, subject_Search, searchInputVal, pageNo, pageSize);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setExamScheduleData(response.data.schedules || []);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch filtered exam schedules');
            }
        } catch (error) {
            toast.error('Error fetching filtered exam schedules');
        } finally {
            setLoaderState(false);
        }
    };

    const getExamScheduleDataById = async (id) => {
        try {
            setLoaderState(true);
            setEditExamScheduleId(id);
            const response = await getExamScheduleDataByIdApi(id);
            if (response?.status === 200 && response?.data?.status === 'success') {
                const data = response.data.examSchedule;
                const formValues = {
                    examTermId: data.examTermId || '',
                    classNo: data.classNo || '',
                    section: data.section || '',
                    subject: data.subject || '',
                    roomNo: data.roomNumber || '',
                    date: data.date || '',
                    startingTime: data.startingTime || '',
                    endingTime: data.endingTime || '',
                    passingMarks: data.passingMarks || '',
                    totalMarks: data.totalMarks || '',
                };
                setValueUpdate('examTermId', data.examTermId);
                setValueUpdate('classNo', data.classNo);
                setValueUpdate('section', data.section);
                setValueUpdate('roomNo', data.roomNumber);
                setValueUpdate('subject', data.subject);
                setValueUpdate('date', data.date);
                setValueUpdate('startingTime', data.startingTime);
                setValueUpdate('endingTime', data.endingTime);
                setValueUpdate('passingMarks', data.passingMarks);
                setValueUpdate('totalMarks', data.totalMarks);
                setInitialFormValues(formValues);
                setUpdateSubjectId(data.subject)
                // Fetch subjects and sections for the selected class
                if (data.classNo) {
                    const selectedClass = allClassData.find(c => c.classNo === data.classNo);
                    if (selectedClass) {
                        setAllSectionData(selectedClass.section || []);
                        getAllSubjectData(data.classNo);
                    }
                }
            } else {
                toast.error(response?.data?.message || 'Failed to fetch exam schedule');
            }
        } catch (error) {
            toast.error('Error fetching exam schedule');
        } finally {
            setLoaderState(false);
        }
    };

    const addNewExamSchedule = async (data) => {
        try {
            setLoaderState(true);
            const formData = new FormData();
            formData.append('examTermId', data.examTermId);
            formData.append('classNo', data.classNo);
            formData.append('section', data.section);
            formData.append('subject', data.subject);
            formData.append('roomNo', data.roomNo);
            formData.append('date', data.date);
            formData.append('startingTime', data.startingTime);
            formData.append('endingTime', data.endingTime);
            formData.append('passingMarks', data.passingMarks);
            formData.append('totalMarks', data.totalMarks);

            const response = await addNewExamScheduleApi(formData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getSearchedExamScheduleData();
                resetAdd();
                const offcanvasElement = document.getElementById('addExamSchedule');
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
                offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                    const backdrop = document.querySelector('.offcanvas-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }
                }, { once: true });
            } else {
                toast.error(response?.data?.message || 'Failed to add exam schedule');
            }
        } catch (error) {
            toast.error('Error adding exam schedule');
        } finally {
            setLoaderState(false);
        }
    };

    const updateExamSchedule = async (data) => {
        try {
            setLoaderState(true);
            const formData = new FormData();
            if (data.examTermId !== initialFormValues.examTermId) {
                formData.append('examTermId', data.examTermId);
            }
            if (data.classNo !== initialFormValues.classNo) {
                formData.append('classNo', data.classNo);
            }
            if (data.section !== initialFormValues.section) {
                formData.append('section', data.section);
            }
            if (data.subject !== initialFormValues.subject) {
                formData.append('subject', data.subject);
            }
            if (data.roomNo !== initialFormValues.roomNo) {
                formData.append('roomNo', data.roomNo);
            }
            if (data.date !== initialFormValues.date) {
                formData.append('date', data.date);
            }
            if (data.startingTime !== initialFormValues.startingTime) {
                formData.append('startingTime', data.startingTime);
            }
            if (data.endingTime !== initialFormValues.endingTime) {
                formData.append('endingTime', data.endingTime);
            }
            if (data.passingMarks !== initialFormValues.passingMarks) {
                formData.append('passingMarks', data.passingMarks);
            }
            if (data.totalMarks !== initialFormValues.totalMarks) {
                formData.append('totalMarks', data.totalMarks);
            }

            const response = await updateExamScheduleApi(editExamScheduleId, formData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getSearchedExamScheduleData();
                resetUpdate();
                setInitialFormValues({});
                const offcanvasElement = document.getElementById('editExamSchedule');
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
                offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                    const backdrop = document.querySelector('.offcanvas-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }
                }, { once: true });
            } else {
                toast.error(response?.data?.message || 'Failed to update exam schedule');
                Object.keys(initialFormValues).forEach(key => setValueUpdate(key, initialFormValues[key]));
            }
        } catch (error) {
            toast.error('Error updating exam schedule');
            Object.keys(initialFormValues).forEach(key => setValueUpdate(key, initialFormValues[key]));
        } finally {
            setLoaderState(false);
        }
    };

    const deleteExamScheduleById = async (id) => {
        if (!isChecked) return;
        try {
            setLoaderState(true);
            const response = await deleteExamScheduleApi(id);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getSearchedExamScheduleData();
                setIsChecked(false);
                const offcanvasElement = document.getElementById('deleteExamSchedule');
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
                offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                    const backdrop = document.querySelector('.offcanvas-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }
                }, { once: true });
            } else {
                toast.error(response?.data?.message || 'Failed to delete exam schedule');
            }
        } catch (error) {
            toast.error('Error deleting exam schedule');
        } finally {
            setLoaderState(false);
        }
    };

    const handleClassSearch = (classNo) => {
        setClassNo_Search(classNo);
        const selectedClass = allClassData.find(c => c.classNo === classNo);
        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
            setAllSearchSubjectData(selectedClass.subjects || []);
        } else {
            setAllSectionData([]);
            setAllSearchSubjectData([]);
            setSubject_Search('');
        }
        setValueAdd('classNo', classNo);
        setValueUpdate('classNo', classNo);
    };

    const watchClassNo = watchAdd('classNo');

    const handleClassChange = (classNo) => {
        setValueAdd('classNo', classNo);
        const selectedClass = allClassData.find(c => c.classNo === classNo);
        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
            getAllSubjectData(classNo);
        } else {
            setAllSectionData([]);
            setAllSubjectData([]);
            setSubject_Search('');
        }
        setValueAdd('classNo', classNo);
        setValueUpdate('classNo', classNo);
    };

    const validateDate = (value) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const selectedDate = new Date(value).setHours(0, 0, 0, 0);
        return selectedDate >= today || 'Date cannot be in the past';
    };

    const handleSearchChange = (value) => {
        setSearchInputVal(value);
        setPageNo(1); // Reset to first page on search change
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        setPageNo(selectedPage);
    };

    const handleAddOffcanvasOpen = () => {
        resetAdd();
        const offcanvasElement = document.getElementById('addExamSchedule');
        if (offcanvasElement) {
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
            offcanvas.show();
        } else {
            console.error('Offcanvas element with ID addExamSchedule not found');
            toast.error('Unable to open Add Exam Schedule form');
        }
    };

    return (
        <StyledContainer>
            {loaderState && <DataLoader />}
            <div className="container-fluid p-4">
                <div className="row pb-3 gap-xl-0 gap-3">
                    <div className="col-xxl-4 col-xl-4 col-lg-12 col-sm-12 flex-frow-1">
                        <nav className="mainBreadCrum font14 ps-0" aria-label="breadcrumb">
                            <ol className="breadcrumb mb-2">
                                <li className="breadcrumb-item">
                                    <a href="/" className="bredcrumText text-decoration-none">
                                        Home
                                    </a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="/examTerm" className="bredcrumText text-decoration-none">
                                        Examination
                                    </a>
                                </li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">
                                    Exam Schedule
                                </li>
                            </ol>
                        </nav>
                        <p className="font14 ps-0 fontWeight500">Exam Schedule Details</p>
                    </div>
                    <div className="col-xxl-8 col-xl-8 col-lg-12 col-sm-12 pe-0">
                        <ActionControls
                            showAddButton={true}
                            addButtonText="Add Exam Schedule"
                            addButtonAction={handleAddOffcanvasOpen}
                            showExportPDF={examScheduleData.length > 0}
                            exportPDFText="Export PDF"
                            exportPDFAction={''}
                            exportPDFFileName="Exam Schedule.pdf"
                            showExportCSV={examScheduleData.length > 0}
                            exportCSVText="Export CSV"
                            exportCSVAction={''}
                            exportCSVFileName="Exam Schedule.xlsx"
                            showSearch={true}
                            searchValue={searchInputVal}
                            searchAction={() => getSearchedExamScheduleData()}
                            onSearchChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="bg-white rounded-2 p-4">
                        <form className="row g-3">
                            <div className="col-md-6 col-12">
                                <label htmlFor="classNoFilter" className="form-label font14">Class</label>
                                <select
                                    id="classNoFilter"
                                    className="form-select borderRadius5 font14"
                                    value={classNo_Search}
                                    onChange={(e) => handleClassSearch(e.target.value)}
                                >
                                    <option value="">--- Choose ---</option>
                                    {allClassData?.map(option => (
                                        <option key={option.classNo} value={option.classNo}>
                                            {option.classNo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6 col-12">
                                <label htmlFor="subjectFilter" className="form-label font14">Subject</label>
                                <select
                                    id="subjectFilter"
                                    className="form-select borderRadius5 font14"
                                    value={subject_Search}
                                    onChange={(e) => setSubject_Search(e.target.value)}
                                >
                                    <option value="">--- Choose ---</option>
                                    {allSearchSubjectData.length > 0 ? (
                                        allSearchSubjectData?.map(option => (
                                            <option key={option.subject} value={option.subject}>
                                                {option.subjectName}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            {classNo_Search ? '-- No Sections Found --' : '-- Select Class First --'}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <p className="text-center p-3">
                                <button
                                    type="button"
                                    className="btn addCategoryButtons text-white"
                                    disabled={!classNo_Search || !subject_Search}
                                    onClick={getSearchedExamScheduleData}
                                >
                                    Search
                                </button>
                                <button
                                    type="button"
                                    className="btn cancelButtons ms-3"
                                    disabled={!classNo_Search || !subject_Search}
                                    onClick={() => {
                                        setClassNo_Search('');
                                        setSubject_Search('');
                                        getSearchedExamScheduleData();
                                    }}
                                >
                                    Cancel
                                </button>
                            </p>
                        </form>
                        <div className="row">
                            {examScheduleData.length > 0 ? (
                                <>
                                    <div className="row overflow-scroll">
                                        <table className="table align-middle table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="textWrapClass">
                                                        <span className="font14">#</span>
                                                    </th>
                                                    <th className="textWrapClass">
                                                        <span className="font14">Title</span>
                                                    </th>
                                                    <th className="textWrapClass">
                                                        <span className="font14">Room Number</span>
                                                    </th>
                                                    <th className="textWrapClass">
                                                        <span className="font14">Starting Time</span>
                                                    </th>
                                                    <th className="textWrapClass">
                                                        <span className="font14">Ending Time</span>
                                                    </th>
                                                    <th className="textWrapClass">
                                                        <span className="font14">Total Marks</span>
                                                    </th>
                                                    <th className="textWrapClass text-center">
                                                        <span className="font14">Action</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {examScheduleData.map((item, index) => (
                                                    <tr key={item.id} className="align-middle">
                                                        <th className="textWrapClass greyText">
                                                            <h3>{(pageNo - 1) * pageSize + index + 1}</h3>
                                                        </th>
                                                        <td className="textWrapClass greyText">
                                                            <h3>{item.examTermName} - {item.subject}</h3>
                                                        </td>
                                                        <td className="textWrapClass greyText">
                                                            <h3>{item.roomNumber}</h3>
                                                        </td>
                                                        <td className="textWrapClass greyText">
                                                            <h3>{item.startingTime || '-'}</h3>
                                                        </td>
                                                        <td className="textWrapClass greyText">
                                                            <h3>{item.endingTime || '-'}</h3>
                                                        </td>
                                                        <td className="textWrapClass greyText">
                                                            <h3>{item.totalMarks}</h3>
                                                        </td>
                                                        <td className="textWrapClass text-center">
                                                            <button
                                                                className="btn ps-1 pe-1 text-black text-decoration-none"
                                                                type="button"
                                                                data-bs-toggle="offcanvas"
                                                                data-bs-target="#editExamSchedule"
                                                                aria-controls="editExamSchedule"
                                                                onClick={() => getExamScheduleDataById(item.id)}
                                                            >
                                                                <Icon icon="carbon:edit" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                                                            </button>
                                                            <button
                                                                className="btn ps-1 pe-1 text-black text-decoration-none"
                                                                type="button"
                                                                data-bs-toggle="offcanvas"
                                                                data-bs-target="#deleteExamSchedule"
                                                                aria-controls="deleteExamSchedule"
                                                                onClick={() => setDelExamScheduleId(item.id)}
                                                            >
                                                                <Icon icon="mi:delete" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="d-flex">
                                        <p className="font14">
                                            Showing {currentPage} of {totalPages} Pages
                                        </p>
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
                            ) : (
                                <div className="d-flex justify-content-center p-5 m-5">
                                    <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="No data" className="img-fluid" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Add Exam Schedule */}
                <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="addExamSchedule" aria-labelledby="addExamScheduleLabel">
                    <div className="offcanvas-header border-bottom border-2 p-2">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path
                                    fill="#008479"
                                    fillRule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                                />
                            </svg>
                        </Link>
                        <h2 className="offcanvas-title" id="addExamScheduleLabel">
                            Add Exam Schedule
                        </h2>
                    </div>
                    <div className="offcanvas-body p-3 scrollBarHide">
                        <form onSubmit={handleSubmitAdd(addNewExamSchedule)}>
                            <div className="mb-3">
                                <label htmlFor="categoryIdAdd" className="form-label font14">
                                    Exam Name / Term <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="categoryIdAdd"
                                    className={`form-select font14 ${errorsAdd.examTermId ? 'border-danger' : ''}`}
                                    {...registerAdd('examTermId', { required: 'Exam Term is required *' })}
                                >
                                    <option value="">-- Select --</option>
                                    {examTermData.map((examTerm) => (
                                        <option key={examTerm.examTermId} value={examTerm.examTermId}>
                                            {examTerm.examTermName}
                                        </option>
                                    ))}
                                </select>
                                {errorsAdd.examTermId && <p className="font12 text-danger">{errorsAdd.examTermId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="classNoAdd" className="form-label font14">
                                    Class <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="classNoAdd"
                                    className={`form-select font14 ${errorsAdd.classNo ? 'border-danger' : ''}`}
                                    {...registerAdd('classNo', { required: 'Class is required *' })}
                                    onChange={(e) => handleClassChange(e.target.value)}
                                >
                                    <option value="">-- Select --</option>
                                    {allClassData.map((clas) => (
                                        <option key={clas.classNo} value={clas.classNo}>
                                            {clas.classNo}
                                        </option>
                                    ))}
                                </select>
                                {errorsAdd.classNo && <p className="font12 text-danger">{errorsAdd.classNo.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sectionAdd" className="form-label font14">
                                    Sections <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="sectionAdd"
                                    className={`form-select font14 ${errorsAdd.section ? 'border-danger' : ''}`}
                                    {...registerAdd('section', { required: 'Section is required *' })}
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
                                            {watchClassNo ? '-- No Sections Found --' : '-- Select Class First --'}
                                        </option>
                                    )}
                                </select>
                                {errorsAdd.section && <p className="font12 text-danger">{errorsAdd.section.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subjectAdd" className="form-label font14">
                                    Subject <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="subjectAdd"
                                    className={`form-select font14 ${errorsAdd.subject ? 'border-danger' : ''}`}
                                    {...registerAdd('subject', { required: 'Subject is required *' })}
                                >
                                    <option value="">-- Select --</option>
                                    {allSubjectData.length > 0 ? (
                                        allSubjectData.map((subject) => (
                                            <option key={subject.subjectId} value={subject.subjectName}>
                                                {subject.subjectName}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            {watchClassNo ? '-- No Subjects Found --' : '-- Select Class First --'}
                                        </option>
                                    )}
                                </select>
                                {errorsAdd.subject && <p className="font12 text-danger">{errorsAdd.subject.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomNoAdd" className="form-label font14">
                                    Class Room <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="roomNoAdd"
                                    className={`form-select font14 ${errorsAdd.roomNo ? 'border-danger' : ''}`}
                                    {...registerAdd('roomNo', { required: 'Room is required *' })}
                                >
                                    <option value="">-- Select --</option>
                                    {allRoomData.map((room) => (
                                        <option key={room.roomNo} value={room.roomNo}>
                                            {room.roomNo}
                                        </option>
                                    ))}
                                </select>
                                {errorsAdd.roomNo && <p className="font12 text-danger">{errorsAdd.roomNo.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dateAdd" className="form-label font14">
                                    Date <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="dateAdd"
                                    type="date"
                                    className={`form-control font14 ${errorsAdd.date ? 'border-danger' : ''}`}
                                    {...registerAdd('date', {
                                        required: 'Date is required *',
                                        validate: validateDate,
                                    })}
                                />
                                {errorsAdd.date && <p className="font12 text-danger">{errorsAdd.date.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="startingTimeAdd" className="form-label font14">
                                    Starting Time <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="startingTimeAdd"
                                    type="time"
                                    className={`form-control font14 ${errorsAdd.startingTime ? 'border-danger' : ''}`}
                                    {...registerAdd('startingTime', { required: 'Starting Time is required *' })}
                                />
                                {errorsAdd.startingTime && <p className="font12 text-danger">{errorsAdd.startingTime.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="endingTimeAdd" className="form-label font14">
                                    Ending Time <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="endingTimeAdd"
                                    type="time"
                                    className={`form-control font14 ${errorsAdd.endingTime ? 'border-danger' : ''}`}
                                    {...registerAdd('endingTime', { required: 'Ending Time is required *' })}
                                />
                                {errorsAdd.endingTime && <p className="font12 text-danger">{errorsAdd.endingTime.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passingMarksAdd" className="form-label font14">
                                    Passing Marks <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="passingMarksAdd"
                                    type="number"
                                    className={`form-control font14 ${errorsAdd.passingMarks ? 'border-danger' : ''}`}
                                    {...registerAdd('passingMarks', {
                                        required: 'Passing Marks are required *',
                                        min: { value: 0, message: 'Marks cannot be negative' },
                                    })}
                                />
                                {errorsAdd.passingMarks && <p className="font12 text-danger">{errorsAdd.passingMarks.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="totalMarksAdd" className="form-label font14">
                                    Total Marks <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="totalMarksAdd"
                                    type="number"
                                    className={`form-control font14 ${errorsAdd.totalMarks ? 'border-danger' : ''}`}
                                    {...registerAdd('totalMarks', {
                                        required: 'Total Marks are required *',
                                        min: { value: 0, message: 'Marks cannot be negative' },
                                    })}
                                />
                                {errorsAdd.totalMarks && <p className="font12 text-danger">{errorsAdd.totalMarks.message}</p>}
                            </div>
                            <p className="text-center p-3">
                                <button
                                    className="btn addButtons3 font14 text-white me-2"
                                    type="submit"
                                    disabled={!isValidAdd}
                                >
                                    Add Exam Schedule
                                </button>
                                <button
                                    className="btn cancelButtons font14"
                                    type="button"
                                    data-bs-dismiss="offcanvas"
                                    onClick={() => resetAdd()}
                                >
                                    Cancel
                                </button>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Edit Exam Schedule */}
                <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="editExamSchedule" aria-labelledby="editExamScheduleLabel">
                    <div className="offcanvas-header border-bottom border-2 p-2">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path
                                    fill="#008479"
                                    fillRule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                                />
                            </svg>
                        </Link>
                        <h2 className="offcanvas-title" id="editExamScheduleLabel">
                            Edit Exam Schedule
                        </h2>
                    </div>
                    <div className="offcanvas-body p-3 scrollBarHide">
                        <form onSubmit={handleSubmitUpdate(updateExamSchedule)}>
                            <div className="mb-3">
                                <label htmlFor="categoryIdEdit" className="form-label font14">
                                    Exam Name / Term <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="categoryIdEdit"
                                    className={`form-select font14 ${errorsUpdate.examTermId ? 'border-danger' : ''}`}
                                    {...registerUpdate('examTermId', { required: 'Exam Term is required *' })}
                                >
                                    <option value="">-- Select --</option>
                                    {examTermData.map((examTerm) => (
                                        <option key={examTerm.examTermId} value={examTerm.examTermId}>
                                            {examTerm.examTermName}
                                        </option>
                                    ))}
                                </select>
                                {errorsUpdate.examTermId && <p className="font12 text-danger">{errorsUpdate.examTermId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="classNoEdit" className="form-label font14">
                                    Class <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="classNoEdit"
                                    className={`form-select font14 ${errorsUpdate.classNo ? 'border-danger' : ''}`}
                                    {...registerUpdate('classNo', { required: 'Class is required *' })}
                                    onChange={(e) => handleClassChange(e.target.value)}
                                >
                                    <option value="">-- Select --</option>
                                    {allClassData.map((clas) => (
                                        <option key={clas.classNo} value={clas.classNo}>
                                            {clas.classNo}
                                        </option>
                                    ))}
                                </select>
                                {errorsUpdate.classNo && <p className="font12 text-danger">{errorsUpdate.classNo.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sectionEdit" className="form-label font14">
                                    Sections <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="sectionEdit"
                                    className={`form-select font14 ${errorsUpdate.section ? 'border-danger' : ''}`}
                                    {...registerUpdate('section', { required: 'Section is required *' })}
                                >
                                    <option value="">-- Select --</option>
                                    {allSectionData.map((section) => (
                                        <option key={section.classSecId} value={section.section}>
                                            {section.sectionName}
                                        </option>
                                    ))}
                                </select>
                                {errorsUpdate.section && <p className="font12 text-danger">{errorsUpdate.section.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subjectEdit" className="form-label font14">
                                    Subject <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="subjectEdit"
                                    className={`form-select font14 ${errorsUpdate.subject ? 'border-danger' : ''}`}
                                    {...registerUpdate('subject', { required: 'Subject is required *' })}
                                >
                                    <option value="">-- Select --</option>
                                    {allSubjectData.map((subject) => (
                                        <option key={subject.subject} value={subject.subjectName}>
                                            {subject.subjectName}
                                        </option>
                                    ))}
                                </select>
                                {errorsUpdate.subject && <p className="font12 text-danger">{errorsUpdate.subject.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomNoEdit" className="form-label font14">
                                    Class Room <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="roomNoEdit"
                                    className={`form-select font14 ${errorsUpdate.roomNo ? 'border-danger' : ''}`}
                                    {...registerUpdate('roomNo', { required: 'Room is required *' })}
                                >
                                    <option value="">-- Select --</option>
                                    {allRoomData.map((room) => (
                                        <option key={room.roomNo} value={room.roomNo}>
                                            {room.roomNo}
                                        </option>
                                    ))}
                                </select>
                                {errorsUpdate.roomNo && <p className="font12 text-danger">{errorsUpdate.roomNo.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dateEdit" className="form-label font14">
                                    Date <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="dateEdit"
                                    type="date"
                                    className={`form-control font14 ${errorsUpdate.date ? 'border-danger' : ''}`}
                                    {...registerUpdate('date', {
                                        required: 'Date is required *',
                                        validate: validateDate,
                                    })}
                                />
                                {errorsUpdate.date && <p className="font12 text-danger">{errorsUpdate.date.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="startingTimeEdit" className="form-label font14">
                                    Starting Time <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="startingTimeEdit"
                                    type="time"
                                    className={`form-control font14 ${errorsUpdate.startingTime ? 'border-danger' : ''}`}
                                    {...registerUpdate('startingTime', { required: 'Starting Time is required *' })}
                                />
                                {errorsUpdate.startingTime && <p className="font12 text-danger">{errorsUpdate.startingTime.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="endingTimeEdit" className="form-label font14">
                                    Ending Time <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="endingTimeEdit"
                                    type="time"
                                    className={`form-control font14 ${errorsUpdate.endingTime ? 'border-danger' : ''}`}
                                    {...registerUpdate('endingTime', { required: 'Ending Time is required *' })}
                                />
                                {errorsUpdate.endingTime && <p className="font12 text-danger">{errorsUpdate.endingTime.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="passingMarksEdit" className="form-label font14">
                                    Passing Marks <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="passingMarksEdit"
                                    type="number"
                                    className={`form-control font14 ${errorsUpdate.passingMarks ? 'border-danger' : ''}`}
                                    {...registerUpdate('passingMarks', {
                                        required: 'Passing Marks are required *',
                                        min: { value: 0, message: 'Marks cannot be negative' },
                                    })}
                                />
                                {errorsUpdate.passingMarks && <p className="font12 text-danger">{errorsUpdate.passingMarks.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="totalMarksEdit" className="form-label font14">
                                    Total Marks <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="totalMarksEdit"
                                    type="number"
                                    className={`form-control font14 ${errorsUpdate.totalMarks ? 'border-danger' : ''}`}
                                    {...registerUpdate('totalMarks', {
                                        required: 'Total Marks are required *',
                                        min: { value: 0, message: 'Marks cannot be negative' },
                                    })}
                                />
                                {errorsUpdate.totalMarks && <p className="font12 text-danger">{errorsUpdate.totalMarks.message}</p>}
                            </div>
                            <p className="text-center p-3">
                                <button
                                    className="btn addButtons4 font14 text-white me-2"
                                    type="submit"
                                    disabled={!isValidUpdate}
                                >
                                    Update Exam Schedule
                                </button>
                                <button
                                    className="btn cancelButtons font14"
                                    data-bs-dismiss="offcanvas"
                                    type="button"
                                    onClick={() => resetUpdate()}
                                >
                                    Cancel
                                </button>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Delete Exam Schedule */}
                <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="deleteExamSchedule" aria-labelledby="deleteExamScheduleLabel">
                    <div className="offcanvas-header border-bottom border-2 p-2">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path
                                    fill="#008479"
                                    fillRule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 1 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                                />
                            </svg>
                        </Link>
                        <h2 className="offcanvas-title" id="deleteExamScheduleLabel">
                            Delete Exam Schedule
                        </h2>
                    </div>
                    <div className="offcanvas-body p-3">
                        <div>
                            <p className="text-center p-3">
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/errorI.svg" className="img-fluid" alt="Error" />
                            </p>
                            <p className="text-center warningHeading">Are you Sure?</p>
                            <p className="text-center greyText warningText pt-2">
                                This Action will permanently delete<br />the Exam Schedule Data
                            </p>
                            <p className="text-center warningText p-2">
                                <input
                                    className="form-check-input formdltcheck me-2"
                                    type="checkbox"
                                    checked={isChecked}
                                    id="flexCheckChecked"
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                I Agree to delete the Exam Schedule Data
                            </p>
                            <p className="text-center p-3">
                                <button
                                    className="btn deleteButtons text-white"
                                    disabled={!isChecked}
                                    onClick={() => deleteExamScheduleById(delExamScheduleId)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn dltcancelButtons ms-3"
                                    data-bs-dismiss="offcanvas"
                                    type="button"
                                    onClick={() => setIsChecked(false)}
                                >
                                    Cancel
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </StyledContainer>
    );
};

export default ExamSchedule;
