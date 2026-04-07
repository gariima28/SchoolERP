import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import * as bootstrap from 'bootstrap';
import DataLoader from 'src/Layouts/Loader';
import ActionControls from '../../../Layouts/ActionControls';
import {
    getExamScheduleDataByIdApi,
    updateExamScheduleApi,
    deleteExamScheduleApi,
    addNewExamScheduleApi,
    getAllClassApi,
    getAllSubjectByClassApi,
    getRoomDataApi,
    getSearchExamScheduleApi,
    getExamTermDataApi,
    getExamScheduleDataCSVApi,
} from '../../../Utils/Apis';

const StyledContainer = styled.div`
    .form-control::placeholder, .form-control, .form-select {
        color: var(--greyState);
    }

    .formcheckBox:not(:checked) {
        background-color: #f3fffe !important;
        border-color: #00847A !important;
        height: 18px;
        width: 18px;
        border-radius: 2px !important;
    }

    .formcheckBox:checked {
        background-color: #00847A !important;
        border-color: #00847A !important;
        height: 18px;
        width: 18px;
        border-radius: 2px !important;
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
    const token = sessionStorage.getItem('token');
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
    const [isPracticalAdd, setIsPracticalAdd] = useState(false);
    const [isPracticalEdit, setIsPracticalEdit] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

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
        defaultValues: {
            examTermId: '',
            classNo: '',
            section: '',
            subject: '',
            roomNo: '',
            theoryDate: '',
            theoryStartingTime: '',
            theoryEndingTime: '',
            theoryPassingMarks: '',
            theoryTotalMarks: '',
            practicalDate: '',
            practicalStartingTime: '',
            practicalEndingTime: '',
            practicalPassingMarks: '',
            practicalTotalMarks: '',
            isPractical: false,
        },
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
        defaultValues: {
            examTermId: '',
            classNo: '',
            section: '',
            subject: '',
            roomNo: '',
            theoryDate: '',
            theoryStartingTime: '',
            theoryEndingTime: '',
            theoryPassingMarks: '',
            theoryTotalMarks: '',
            practicalDate: '',
            practicalStartingTime: '',
            practicalEndingTime: '',
            practicalPassingMarks: '',
            practicalTotalMarks: '',
            isPractical: false,
        },
    });

    // Watch isPractical checkbox
    const watchIsPracticalAdd = watchAdd('isPractical');
    const watchIsPracticalUpdate = watchUpdate('isPractical');

    // Update isPractical state based on checkbox
    useEffect(() => {
        setIsPracticalAdd(watchIsPracticalAdd);
    }, [watchIsPracticalAdd]);

    useEffect(() => {
        setIsPracticalEdit(watchIsPracticalUpdate);
    }, [watchIsPracticalUpdate]);

    // Initialize Bootstrap offcanvas
    useEffect(() => {
        const addOffcanvasElement = document.getElementById('addExamSchedule');
        const editOffcanvasElement = document.getElementById('editExamSchedule');
        const deleteOffcanvasElement = document.getElementById('deleteExamSchedule');

        if (addOffcanvasElement) {
            addOffcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                resetAdd();
                setIsPracticalAdd(false);
                const backdrop = document.querySelector('.offcanvas-backdrop');
                if (backdrop) backdrop.remove();
            }, { once: true });
        }

        if (editOffcanvasElement) {
            editOffcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                resetUpdate();
                setIsPracticalEdit(false);
                setInitialFormValues({});
                setAllSectionData([]);
                setAllSubjectData([]);
                const backdrop = document.querySelector('.offcanvas-backdrop');
                if (backdrop) backdrop.remove();
            }, { once: true });
        }

        if (deleteOffcanvasElement) {
            deleteOffcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                setIsChecked(false);
                const backdrop = document.querySelector('.offcanvas-backdrop');
                if (backdrop) backdrop.remove();
            }, { once: true });
        }

        return () => {
            if (addOffcanvasElement) addOffcanvasElement.removeEventListener('hidden.bs.offcanvas', () => { });
            if (editOffcanvasElement) editOffcanvasElement.removeEventListener('hidden.bs.offcanvas', () => { });
            if (deleteOffcanvasElement) deleteOffcanvasElement.removeEventListener('hidden.bs.offcanvas', () => { });
        };
    }, [resetAdd, resetUpdate]);

    // Fetch Initial Data
    useEffect(() => {
        const fetchInitialData = async () => {
            if (!token) {
                console.log('No token found, redirecting to /');
                navigate('/');
                return;
            }

            setIsInitialLoading(true);
            try {
                await Promise.all([
                    getAllClassData(),
                    getAllRoomData(),
                    getAllExamTermData(),
                    getSearchedExamScheduleData(),
                ]);
            } catch (error) {
                console.error('Error during initial data fetch:', error);
                toast.error('Failed to load initial data');
            } finally {
                setIsInitialLoading(false);
            }
        };

        fetchInitialData();
    }, [token, pageNo, pageSize]);

    const getAllExamTermData = async () => {
        try {
            setLoaderState(true);
            const response = await getExamTermDataApi('', '', '');
            if (response?.status === 200 && response?.data?.status === 'success') {
                setExamTermData(response.data.data || []);
            } else {
                console.error('Failed to fetch exam terms:', response?.data?.message);
                toast.error(response?.data?.message || 'Failed to fetch exam terms');
            }
        } catch (error) {
            console.error('Error fetching exam terms:', error);
            if (error?.response?.data?.statusCode === 401) {
                console.log('Unauthorized, clearing token and redirecting');
                sessionStorage.removeItem('token');
                navigate('/');
            } else {
                toast.error('Error fetching exam terms');
            }
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
                console.error('Failed to fetch classes:', response?.data?.message);
                toast.error(response?.data?.message || 'Failed to fetch classes');
            }
        } catch (error) {
            console.error('Error fetching classes:', error);
            if (error?.response?.data?.statusCode === 401) {
                console.log('Unauthorized, clearing token and redirecting');
                sessionStorage.removeItem('token');
                navigate('/');
            } else {
                toast.error('Error fetching classes');
            }
        } finally {
            setLoaderState(false);
        }
    };

    const getAllRoomData = async () => {
        try {
            setLoaderState(true);
            const response = await getRoomDataApi('', '', '');
            if (response?.status === 200 && response?.data?.status === 'success') {
                setAllRoomData(response.data.rooms || []);
            } else {
                console.error('Failed to fetch rooms:', response?.data?.message);
                toast.error(response?.data?.message || 'Failed to fetch rooms');
            }
        } catch (error) {
            console.error('Error fetching rooms:', error);
            toast.error('Error fetching rooms');
        } finally {
            setLoaderState(false);
        }
    };

    const getSearchedExamScheduleData = async () => {
        try {
            setLoaderState(true);
            const response = await getSearchExamScheduleApi(classNo_Search, subject_Search, searchInputVal, pageNo, pageSize);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setExamScheduleData(response.data.schedules || []);
                setTotalPages(response.data.totalPages || 1);
                setCurrentPage(pageNo);
            } else {
                console.error('Failed to fetch exam schedules:', response?.data?.message);
                toast.error(response?.data?.message || 'Failed to fetch exam schedules');
            }
        } catch (error) {
            console.error('Error fetching exam schedules:', error);
            toast.error('Error fetching exam schedules');
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
                console.log('API Response:', data); // Debug API response

                // Fetch sections and subjects for the class
                let sections = [];
                let subjects = [];
                if (data?.classNo) {
                    console.log('Fetching sections and subjects for class:', data.classNo);
                    const result = await handleClassChangeById(data.classNo); // Await the result
                    sections = result.sections;
                    subjects = result.subjects;
                } else {
                    console.log('No classNo found, resetting sections and subjects');
                    setAllSectionData([]);
                    setAllSubjectData([]);
                }

                console.log('Sections:', sections);
                console.log('Subjects:', subjects);

                // Map section and subject more robustly
                const selectedSection = sections.find(s => s.classSecId === data.section || s.sectionName === data.section);
                const selectedSubject = subjects.find(s => s.subjectId === data.subject || s.subjectName === data.subject);

                console.log('Selected Section:', selectedSection);
                console.log('Selected Subject:', selectedSubject);

                const formValues = {
                    examTermId: data.examTermId || '',
                    classNo: data.classNo || '',
                    section: selectedSection ? selectedSection.sectionName : '',
                    subject: selectedSubject ? selectedSubject.subjectName : '',
                    roomNo: data.roomNumber || '',
                    theoryDate: data.date || '',
                    theoryStartingTime: data.startingTime || '',
                    theoryEndingTime: data.endingTime || '',
                    theoryPassingMarks: data.passingMarks || '',
                    theoryTotalMarks: data.totalMarks || '',
                    practicalDate: data.practicalDate || '',
                    practicalStartingTime: data.practicalStartTime || '',
                    practicalEndingTime: data.practicalEndTime || '',
                    practicalPassingMarks: data.practicalPassMarks || '',
                    practicalTotalMarks: data.practicalMarks || '',
                    isPractical: !!data.practicalDate,
                };

                console.log('Form Values:', formValues);

                // Set form values
                Object.keys(formValues).forEach(key => setValueUpdate(key, formValues[key]));
                setInitialFormValues(formValues);
                setIsPracticalEdit(!!data.practicalDate);
            } else {
                console.error('Failed to fetch exam schedule:', response?.data?.message);
                toast.error(response?.data?.message || 'Failed to fetch exam schedule');
            }
        } catch (error) {
            console.error('Error fetching exam schedule:', error);
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
            formData.append('date', data.theoryDate);
            formData.append('startingTime', data.theoryStartingTime);
            formData.append('endingTime', data.theoryEndingTime);
            formData.append('passingMarks', data.theoryPassingMarks);
            formData.append('totalMarks', data.theoryTotalMarks);
            formData.append('isPractical', data.isPractical);
            if (data.isPractical) {
                formData.append('practicalDate', data.practicalDate);
                formData.append('practicalStartTime', data.practicalStartingTime);
                formData.append('practicalEndTime', data.practicalEndingTime);
                formData.append('practicalPassMarks', data.practicalPassingMarks);
                formData.append('practicalMarks', data.practicalTotalMarks);
            }

            const response = await addNewExamScheduleApi(formData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getSearchedExamScheduleData();
                resetAdd();
                setIsPracticalAdd(false);
                const offcanvasElement = document.getElementById('addExamSchedule');
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
            } else {
                console.error('Failed to add exam schedule:', response?.data?.message);
                toast.error(response?.data?.message || 'Failed to add exam schedule');
            }
        } catch (error) {
            console.error('Error adding exam schedule:', error);
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
            if (data.theoryDate !== initialFormValues.theoryDate) {
                formData.append('date', data.theoryDate);
            }
            if (data.theoryStartingTime !== initialFormValues.theoryStartingTime) {
                formData.append('startingTime', data.theoryStartingTime);
            }
            if (data.theoryEndingTime !== initialFormValues.theoryEndingTime) {
                formData.append('endingTime', data.theoryEndingTime);
            }
            if (data.theoryPassingMarks !== initialFormValues.theoryPassingMarks) {
                formData.append('passingMarks', data.theoryPassingMarks);
            }
            if (data.theoryTotalMarks !== initialFormValues.theoryTotalMarks) {
                formData.append('totalMarks', data.theoryTotalMarks);
            }
            formData.append('isPractical', data.isPractical);
            if (data.isPractical) {
                if (data.practicalDate !== initialFormValues.practicalDate) {
                    formData.append('practicalDate', data.practicalDate);
                }
                if (data.practicalStartingTime !== initialFormValues.practicalStartingTime) {
                    formData.append('practicalStartTime', data.practicalStartingTime);
                }
                if (data.practicalEndingTime !== initialFormValues.practicalEndingTime) {
                    formData.append('practicalEndTime', data.practicalEndingTime);
                }
                if (data.practicalPassingMarks !== initialFormValues.practicalPassingMarks) {
                    formData.append('practicalPassMarks', data.practicalPassingMarks);
                }
                if (data.practicalTotalMarks !== initialFormValues.practicalTotalMarks) {
                    formData.append('practicalMarks', data.practicalTotalMarks);
                }
            } else {
                formData.append('practicalDate', '');
                formData.append('practicalStartTime', '');
                formData.append('practicalEndTime', '');
                formData.append('practicalPassMarks', '');
                formData.append('practicalMarks', '');
            }

            const response = await updateExamScheduleApi(editExamScheduleId, formData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getSearchedExamScheduleData();
                resetUpdate();
                const offcanvasElement = document.getElementById('editExamSchedule');
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
                setIsPracticalEdit(false);
                setInitialFormValues({});
            } else {
                console.error('Failed to update exam schedule:', response?.data?.message);
                toast.error(response?.data?.message || 'Failed to update exam schedule');
                Object.keys(initialFormValues).forEach(key => setValueUpdate(key, initialFormValues[key]));
            }
        } catch (error) {
            console.error('Error updating exam schedule:', error);
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
            } else {
                console.error('Failed to delete exam schedule:', response?.data?.message);
                toast.error(response?.data?.message || 'Failed to delete exam schedule');
            }
        } catch (error) {
            console.error('Error deleting exam schedule:', error);
            toast.error('Error deleting exam schedule');
        } finally {
            setLoaderState(false);
        }
    };

    const handleClassSearch = (classNo) => {
        setClassNo_Search(classNo);
        const selectedClass = allClassData.find(c => c.classNo === classNo);
        if (selectedClass) {
            setAllSearchSubjectData(selectedClass.subjects || []);
        } else {
            setAllSearchSubjectData([]);
            setSubject_Search('');
        }
    };

    const handleClassChange = async (classNo) => {
        const selectedClass = allClassData.find(c => c.classNo === classNo);
        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
            setAllSubjectData(selectedClass.subjects || []);
        } else {
            setAllSectionData([]);
            setAllSubjectData([]);
        }
        setValueAdd('classNo', classNo);
        setValueUpdate('classNo', classNo);
    };

    const handleClassChangeById = async (classNo) => {
        const selectedClass = allClassData.find(c => c.classNo === classNo);
        if (selectedClass) {
            const sections = selectedClass.section || [];
            const subjects = selectedClass.subjects || [];
            await Promise.all([
                setAllSectionData(sections),
                setAllSubjectData(subjects)
            ]);
            setValueAdd('classNo', classNo);
            setValueUpdate('classNo', classNo);
            return { sections, subjects }; // Return the updated data
        } else {
            await Promise.all([
                setAllSectionData([]),
                setAllSubjectData([])
            ]);
            setValueAdd('classNo', '');
            setValueUpdate('classNo', '');
            return { sections: [], subjects: [] };
        }
    };

    const validateDate = (value) => {
        if (!value) return 'Date is required *';
        const today = new Date().setHours(0, 0, 0, 0);
        const selectedDate = new Date(value).setHours(0, 0, 0, 0);
        return selectedDate >= today || 'Date cannot be in the past';
    };

    const validateMarks = (value, totalMarksField) => {
        const totalMarks = watchAdd(totalMarksField) || watchUpdate(totalMarksField);
        if (!value) return 'Passing Marks are required *';
        if (parseFloat(value) > parseFloat(totalMarks)) {
            return 'Passing Marks cannot exceed Total Marks';
        }
        return true;
    };

    const handleSearchChange = (value) => {
        setSearchInputVal(value);
        setPageNo(1);
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        setPageNo(selectedPage);
    };

    const handleAddOffcanvasOpen = () => {
        resetAdd();
        setIsPracticalAdd(false);
        const offcanvasElement = document.getElementById('addExamSchedule');
        if (offcanvasElement) {
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
            offcanvas.show();
        } else {
            console.error('Offcanvas element with ID addExamSchedule not found');
            toast.error('Unable to open Add Exam Schedule form');
        }
    };

    if (isInitialLoading) {
        return <DataLoader />;
    }

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
                            showExportPDF={false}
                            exportPDFText="Export PDF"
                            exportPDFAction={''}
                            exportPDFFileName="Exam Schedule.pdf"
                            showExportCSV={examScheduleData.length > 0}
                            exportCSVText="Export XLSX"
                            exportCSVAction={() =>
                             getExamScheduleDataCSVApi(classNo_Search, subject_Search)
                            }
                            // exportCSVAction={getExamScheduleDataCSVApi(classNo_Search, subject_Search )}
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
                                            <option key={option.subjectId} value={option.subjectName}>
                                                {option.subjectName}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            {classNo_Search ? '-- No Subjects Found --' : '-- Select Class First --'}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <p className="text-center p-3">
                                <button
                                    type="button"
                                    className="btn addCategoryButtons text-white"
                                    disabled={!classNo_Search || !subject_Search}
                                    onClick={getSearchedExamScheduleData}>
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
                                    }}>
                                    Cancel
                                </button>
                            </p>
                        </form>
                        <div className="row">
                            {examScheduleData?.length > 0 ? (
                                <>
                                    <div className="row overflow-scroll">
                                        <table className="table align-middle table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="textWrapClass pe-4"><span className="font14">#</span></th>
                                                    <th className="textWrapClass pe-4"><span className="font14">Exam Term</span></th>
                                                    <th className="textWrapClass pe-4"><span className="font14">Room Number</span></th>
                                                    <th className="textWrapClass pe-4"><span className="font14">Subject</span></th>
                                                    <th className="textWrapClass pe-4"><span className="font14">Theory Date</span></th>
                                                    <th className="textWrapClass pe-4"><span className="font14">Theory Start Time</span></th>
                                                    <th className="textWrapClass pe-4"><span className="font14">Theory End Time</span></th>
                                                    <th className="textWrapClass pe-4"><span className="font14">Theory Pass Marks</span></th>
                                                    <th className="textWrapClass pe-4"><span className="font14">Theory Total Marks</span></th>
                                                    <th className="textWrapClass pe-4"><span className="font14">Practical Date</span></th>
                                                    <th className="textWrapClass pe-4"><span className="font14">Practical Start Time</span></th>
                                                    <th className="textWrapClass pe-4"><span className="font14">Practical End Time</span></th>
                                                    <th className="textWrapClass pe-4"><span className="font14">Practical Pass Marks</span></th>
                                                    <th className="textWrapClass pe-4"><span className="font14">Practical Total Marks</span></th>
                                                    <th className="textWrapClass text-center"><span className="font14">Action</span></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {examScheduleData.map((item, index) => (
                                                    <tr key={item.id} className="align-middle">
                                                        <th className="textWrapClass greyText"><h3>{(pageNo - 1) * pageSize + index + 1}</h3></th>
                                                        <td className="textWrapClass greyText"><h3>{item.examTermName}</h3></td>
                                                        <td className="textWrapClass greyText"><h3>{item.roomNumber}</h3></td>
                                                        <td className="textWrapClass greyText"><h3>{item.subject}</h3></td>
                                                        <td className="textWrapClass greyText"><h3>{item.date || '-'}</h3></td>
                                                        <td className="textWrapClass greyText"><h3>{item.startingTime?.slice(0, 5) || '-'}</h3></td>
                                                        <td className="textWrapClass greyText"><h3>{item.endingTime?.slice(0, 5) || '-'}</h3></td>
                                                        <td className="textWrapClass greyText"><h3>{item.passingMarks || '-'}</h3></td>
                                                        <td className="textWrapClass greyText"><h3>{item.totalMarks || '-'}</h3></td>
                                                        <td className="textWrapClass greyText"><h3>{item.practicalDate || '-'}</h3></td>
                                                        <td className="textWrapClass greyText"><h3>{item.practicalStartTime?.slice(0, 5) || '-'}</h3></td>
                                                        <td className="textWrapClass greyText"><h3>{item.practicalEndTime?.slice(0, 5) || '-'}</h3></td>
                                                        <td className="textWrapClass greyText"><h3>{item.practicalPassMarks || '-'}</h3></td>
                                                        <td className="textWrapClass greyText"><h3>{item.practicalMarks || '-'}</h3></td>
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
                                <label htmlFor="examTermIdAdd" className="form-label font14">
                                    Exam Name <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="examTermIdAdd"
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
                                            {watchAdd('classNo') ? '-- No Sections Found --' : '-- Select Class First --'}
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
                                            {watchAdd('classNo') ? '-- No Subjects Found --' : '-- Select Class First --'}
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
                                <label htmlFor="theoryDateAdd" className="form-label font14">
                                    Theory Date <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="theoryDateAdd"
                                    type="date"
                                    className={`form-control font14 ${errorsAdd.theoryDate ? 'border-danger' : ''}`}
                                    {...registerAdd('theoryDate', {
                                        required: 'Theory Date is required *',
                                        validate: validateDate,
                                    })}
                                />
                                {errorsAdd.theoryDate && <p className="font12 text-danger">{errorsAdd.theoryDate.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="theoryStartingTimeAdd" className="form-label font14">
                                    Theory Start Time <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="theoryStartingTimeAdd"
                                    type="time"
                                    className={`form-control font14 ${errorsAdd.theoryStartingTime ? 'border-danger' : ''}`}
                                    {...registerAdd('theoryStartingTime', { required: 'Theory Starting Time is required *' })}
                                />
                                {errorsAdd.theoryStartingTime && <p className="font12 text-danger">{errorsAdd.theoryStartingTime.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="theoryEndingTimeAdd" className="form-label font14">
                                    Theory End Time <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="theoryEndingTimeAdd"
                                    type="time"
                                    className={`form-control font14 ${errorsAdd.theoryEndingTime ? 'border-danger' : ''}`}
                                    {...registerAdd('theoryEndingTime', { required: 'Theory Ending Time is required *' })}
                                />
                                {errorsAdd.theoryEndingTime && <p className="font12 text-danger">{errorsAdd.theoryEndingTime.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="theoryTotalMarksAdd" className="form-label font14">
                                    Theory Total Marks <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="theoryTotalMarksAdd"
                                    type="number"
                                    className={`form-control font14 ${errorsAdd.theoryTotalMarks ? 'border-danger' : ''}`}
                                    {...registerAdd('theoryTotalMarks', {
                                        required: 'Theory Total Marks are required *',
                                        min: { value: 0, message: 'Marks cannot be negative' },
                                    })}
                                />
                                {errorsAdd.theoryTotalMarks && <p className="font12 text-danger">{errorsAdd.theoryTotalMarks.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="theoryPassingMarksAdd" className="form-label font14">
                                    Theory Passing Marks <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="theoryPassingMarksAdd"
                                    type="number"
                                    className={`form-control font14 ${errorsAdd.theoryPassingMarks ? 'border-danger' : ''}`}
                                    {...registerAdd('theoryPassingMarks', {
                                        required: 'Theory Passing Marks are required *',
                                        min: { value: 0, message: 'Marks cannot be negative' },
                                        validate: value => validateMarks(value, 'theoryTotalMarks'),
                                    })}
                                />
                                {errorsAdd.theoryPassingMarks && <p className="font12 text-danger">{errorsAdd.theoryPassingMarks.message}</p>}
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input formcheckBox"
                                    type="checkbox"
                                    id="isPracticalAdd"
                                    {...registerAdd('isPractical')}
                                />
                                <label className="form-check-label" htmlFor="isPracticalAdd">
                                    Is Practical
                                </label>
                            </div>
                            {isPracticalAdd && (
                                <>
                                    <hr />
                                    <p className="greenText font16 mb-3">Practical Details</p>
                                    <div className="mb-3">
                                        <label htmlFor="practicalDateAdd" className="form-label font14">
                                            Practical Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="practicalDateAdd"
                                            type="date"
                                            className={`form-control font14 ${errorsAdd.practicalDate ? 'border-danger' : ''}`}
                                            {...registerAdd('practicalDate', {
                                                required: isPracticalAdd ? 'Practical Date is required *' : false,
                                                validate: isPracticalAdd ? validateDate : undefined,
                                            })}
                                        />
                                        {errorsAdd.practicalDate && <p className="font12 text-danger">{errorsAdd.practicalDate.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="practicalStartingTimeAdd" className="form-label font14">
                                            Practical Start Time <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="practicalStartingTimeAdd"
                                            type="time"
                                            className={`form-control font14 ${errorsAdd.practicalStartingTime ? 'border-danger' : ''}`}
                                            {...registerAdd('practicalStartingTime', {
                                                required: isPracticalAdd ? 'Practical Starting Time is required *' : false,
                                            })}
                                        />
                                        {errorsAdd.practicalStartingTime && <p className="font12 text-danger">{errorsAdd.practicalStartingTime.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="practicalEndingTimeAdd" className="form-label font14">
                                            Practical End Time <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="practicalEndingTimeAdd"
                                            type="time"
                                            className={`form-control font14 ${errorsAdd.practicalEndingTime ? 'border-danger' : ''}`}
                                            {...registerAdd('practicalEndingTime', {
                                                required: isPracticalAdd ? 'Practical Ending Time is required *' : false,
                                            })}
                                        />
                                        {errorsAdd.practicalEndingTime && <p className="font12 text-danger">{errorsAdd.practicalEndingTime.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="practicalTotalMarksAdd" className="form-label font14">
                                            Practical Total Marks <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="practicalTotalMarksAdd"
                                            type="number"
                                            className={`form-control font14 ${errorsAdd.practicalTotalMarks ? 'border-danger' : ''}`}
                                            {...registerAdd('practicalTotalMarks', {
                                                required: isPracticalAdd ? 'Practical Total Marks are required *' : false,
                                                min: { value: 0, message: 'Marks cannot be negative' },
                                            })}
                                        />
                                        {errorsAdd.practicalTotalMarks && <p className="font12 text-danger">{errorsAdd.practicalTotalMarks.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="practicalPassingMarksAdd" className="form-label font14">
                                            Practical Passing Marks <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="practicalPassingMarksAdd"
                                            type="number"
                                            className={`form-control font14 ${errorsAdd.practicalPassingMarks ? 'border-danger' : ''}`}
                                            {...registerAdd('practicalPassingMarks', {
                                                required: isPracticalAdd ? 'Practical Passing Marks are required *' : false,
                                                min: { value: 0, message: 'Marks cannot be negative' },
                                                validate: value => isPracticalAdd ? validateMarks(value, 'practicalTotalMarks') : true,
                                            })}
                                        />
                                        {errorsAdd.practicalPassingMarks && <p className="font12 text-danger">{errorsAdd.practicalPassingMarks.message}</p>}
                                    </div>
                                </>
                            )}
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
                                <label htmlFor="examTermIdEdit" className="form-label font14">
                                    Exam Name <span className="text-danger">*</span>
                                </label>
                                <select
                                    id="examTermIdEdit"
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
                                    {allSectionData.length > 0 ? (
                                        allSectionData.map((section) => (
                                            <option key={section.classSecId} value={section.sectionName}>
                                                {section.sectionName}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            {watchUpdate('classNo') ? '-- No Sections Found --' : '-- Select Class First --'}
                                        </option>
                                    )}
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
                                    {allSubjectData.length > 0 ? (
                                        allSubjectData.map((subject) => (
                                            <option key={subject.subjectId} value={subject.subjectName}>
                                                {subject.subjectName}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            {watchUpdate('classNo') ? '-- No Subjects Found --' : '-- Select Class First --'}
                                        </option>
                                    )}
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
                                <label htmlFor="theoryDateEdit" className="form-label font14">
                                    Theory Date <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="theoryDateEdit"
                                    type="date"
                                    className={`form-control font14 ${errorsUpdate.theoryDate ? 'border-danger' : ''}`}
                                    {...registerUpdate('theoryDate', {
                                        required: 'Theory Date is required *',
                                        validate: validateDate,
                                    })}
                                />
                                {errorsUpdate.theoryDate && <p className="font12 text-danger">{errorsUpdate.theoryDate.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="theoryStartingTimeEdit" className="form-label font14">
                                    Theory Start Time <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="theoryStartingTimeEdit"
                                    type="time"
                                    className={`form-control font14 ${errorsUpdate.theoryStartingTime ? 'border-danger' : ''}`}
                                    {...registerUpdate('theoryStartingTime', { required: 'Theory Starting Time is required *' })}
                                />
                                {errorsUpdate.theoryStartingTime && <p className="font12 text-danger">{errorsUpdate.theoryStartingTime.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="theoryEndingTimeEdit" className="form-label font14">
                                    Theory End Time <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="theoryEndingTimeEdit"
                                    type="time"
                                    className={`form-control font14 ${errorsUpdate.theoryEndingTime ? 'border-danger' : ''}`}
                                    {...registerUpdate('theoryEndingTime', { required: 'Theory Ending Time is required *' })}
                                />
                                {errorsUpdate.theoryEndingTime && <p className="font12 text-danger">{errorsUpdate.theoryEndingTime.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="theoryTotalMarksEdit" className="form-label font14">
                                    Theory Total Marks <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="theoryTotalMarksEdit"
                                    type="number"
                                    className={`form-control font14 ${errorsUpdate.theoryTotalMarks ? 'border-danger' : ''}`}
                                    {...registerUpdate('theoryTotalMarks', {
                                        required: 'Theory Total Marks are required *',
                                        min: { value: 0, message: 'Marks cannot be negative' },
                                    })}
                                />
                                {errorsUpdate.theoryTotalMarks && <p className="font12 text-danger">{errorsUpdate.theoryTotalMarks.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="theoryPassingMarksEdit" className="form-label font14">
                                    Theory Passing Marks <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="theoryPassingMarksEdit"
                                    type="number"
                                    className={`form-control font14 ${errorsUpdate.theoryPassingMarks ? 'border-danger' : ''}`}
                                    {...registerUpdate('theoryPassingMarks', {
                                        required: 'Theory Passing Marks are required *',
                                        min: { value: 0, message: 'Marks cannot be negative' },
                                        validate: value => validateMarks(value, 'theoryTotalMarks'),
                                    })}
                                />
                                {errorsUpdate.theoryPassingMarks && <p className="font12 text-danger">{errorsUpdate.theoryPassingMarks.message}</p>}
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input formcheckBox"
                                    type="checkbox"
                                    id="isPracticalEdit"
                                    {...registerUpdate('isPractical')}
                                />
                                <label className="form-check-label" htmlFor="isPracticalEdit">
                                    Is Practical
                                </label>
                            </div>
                            {isPracticalEdit && (
                                <>
                                    <hr />
                                    <p className="greenText font16 mb-3">Practical Details</p>
                                    <div className="mb-3">
                                        <label htmlFor="practicalDateEdit" className="form-label font14">
                                            Practical Date <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="practicalDateEdit"
                                            type="date"
                                            className={`form-control font14 ${errorsUpdate.practicalDate ? 'border-danger' : ''}`}
                                            {...registerUpdate('practicalDate', {
                                                required: isPracticalEdit ? 'Practical Date is required *' : false,
                                                validate: isPracticalEdit ? validateDate : undefined,
                                            })}
                                        />
                                        {errorsUpdate.practicalDate && <p className="font12 text-danger">{errorsUpdate.practicalDate.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="practicalStartingTimeEdit" className="form-label font14">
                                            Practical Start Time <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="practicalStartingTimeEdit"
                                            type="time"
                                            className={`form-control font14 ${errorsUpdate.practicalStartingTime ? 'border-danger' : ''}`}
                                            {...registerUpdate('practicalStartingTime', {
                                                required: isPracticalEdit ? 'Practical Starting Time is required *' : false,
                                            })}
                                        />
                                        {errorsUpdate.practicalStartingTime && <p className="font12 text-danger">{errorsUpdate.practicalStartingTime.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="practicalEndingTimeEdit" className="form-label font14">
                                            Practical End Time <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="practicalEndingTimeEdit"
                                            type="time"
                                            className={`form-control font14 ${errorsUpdate.practicalEndingTime ? 'border-danger' : ''}`}
                                            {...registerUpdate('practicalEndingTime', {
                                                required: isPracticalEdit ? 'Practical Ending Time is required *' : false,
                                            })}
                                        />
                                        {errorsUpdate.practicalEndingTime && <p className="font12 text-danger">{errorsUpdate.practicalEndingTime.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="practicalTotalMarksEdit" className="form-label font14">
                                            Practical Total Marks <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="practicalTotalMarksEdit"
                                            type="number"
                                            className={`form-control font14 ${errorsUpdate.practicalTotalMarks ? 'border-danger' : ''}`}
                                            {...registerUpdate('practicalTotalMarks', {
                                                required: isPracticalEdit ? 'Practical Total Marks are required *' : false,
                                                min: { value: 0, message: 'Marks cannot be negative' },
                                            })}
                                        />
                                        {errorsUpdate.practicalTotalMarks && <p className="font12 text-danger">{errorsUpdate.practicalTotalMarks.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="practicalPassingMarksEdit" className="form-label font14">
                                            Practical Passing Marks <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="practicalPassingMarksEdit"
                                            type="number"
                                            className={`form-control font14 ${errorsUpdate.practicalPassingMarks ? 'border-danger' : ''}`}
                                            {...registerUpdate('practicalPassingMarks', {
                                                required: isPracticalEdit ? 'Practical Passing Marks are required *' : false,
                                                min: { value: 0, message: 'Marks cannot be negative' },
                                                validate: value => isPracticalEdit ? validateMarks(value, 'practicalTotalMarks') : true,
                                            })}
                                        />
                                        {errorsUpdate.practicalPassingMarks && <p className="font12 text-danger">{errorsUpdate.practicalPassingMarks.message}</p>}
                                    </div>
                                </>
                            )}
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
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
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
