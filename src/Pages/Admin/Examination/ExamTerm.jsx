import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { addNewExamTermApi, deleteExamTermApi, getExamTermDataApi, getExamTermDataByIdApi, updateExamTermDataApi } from '../../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import ReactPaginate from 'react-paginate';
import { useForm } from 'react-hook-form';
import ActionControls from '../../../Layouts/ActionControls';

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

const ExamTerm = () => {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    // State Management
    const [loaderState, setLoaderState] = useState(false);
    const [examTermData, setExamTermData] = useState([]);
    const [searchInputVal, setSearchInputVal] = useState('');
    const [editExamTermId, setEditExamTermId] = useState('');
    const [delExamTermId, setDelExamTermId] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [initialFormValues, setInitialFormValues] = useState({});

    // Form instances
    const {
        register: registerAdd,
        handleSubmit: handleSubmitAdd,
        formState: { errors: errorsAdd, isValid: isValidAdd },
        setValue: setValueAdd,
        reset: resetAdd,
    } = useForm({
        mode: 'onChange',
    });

    const {
        register: registerUpdate,
        handleSubmit: handleSubmitUpdate,
        formState: { errors: errorsUpdate, isValid: isValidUpdate },
        setValue: setValueUpdate,
        reset: resetUpdate,
    } = useForm({
        mode: 'onChange',
    });

    // Fetch All Exam Terms
    useEffect(() => {
        getAllExamTermData(searchInputVal);
    }, [token, pageNo, pageSize]);

    const getAllExamTermData = async (search = '') => {
        try {
            setLoaderState(true);
            const response = await getExamTermDataApi(search, pageNo, pageSize);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setExamTermData(response.data.data || []);
                setTotalPages(response.data.totalPages || 1);
                setCurrentPage(response.data.currentPage || 1);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch exam terms');
            }
        } catch (error) {
            if (error?.response?.data?.statusCode === 401) {
                sessionStorage.removeItem('token');
                navigate('/');
            }
            toast.error('Error fetching exam terms');
        } finally {
            setLoaderState(false);
        }
    };

    // Handle search input change
    const handleSearchChange = (value) => {
        setSearchInputVal(value);
        setPageNo(1); // Reset to first page on search change
    };

    // Fetch Exam Term by ID for Editing
    const getExamTermDataById = async (id) => {
        try {
            setLoaderState(true);
            setEditExamTermId(id);
            const response = await getExamTermDataByIdApi(id);
            if (response?.status === 200 && response?.data?.status === 'success') {
                const data = response.data.data;
                const formValues = {
                    examTermName: data.examTermName || '',
                    startDate: data.startDate || '',
                    description: data.description || '',
                };
                setValueUpdate('examTermName', data.examTermName);
                setValueUpdate('startDate', data.startDate);
                setValueUpdate('description', data.description || '');
                setInitialFormValues(formValues);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch exam term');
            }
        } catch (error) {
            toast.error('Error fetching exam term');
        } finally {
            setLoaderState(false);
        }
    };

    // Add New Exam Term
    const addNewExamTerm = async (data) => {
        try {
            setLoaderState(true);
            const formData = new FormData();
            formData.append('examTermName', data.examTermName);
            formData.append('startDate', data.startDate);
            formData.append('description', data.description || '');

            const response = await addNewExamTermApi(formData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getAllExamTermData(searchInputVal);
                resetAdd();
                const offcanvasElement = document.getElementById('addExamTerm');
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
                offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                    const backdrop = document.querySelector('.offcanvas-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }
                }, { once: true });
            } else {
                toast.error(response?.data?.message || 'Failed to add exam term');
            }
        } catch (error) {
            toast.error('Error adding exam term');
        } finally {
            setLoaderState(false);
        }
    };

    // Update Exam Term
    const updateExamTerm = async (data) => {
        try {
            setLoaderState(true);
            const formData = new FormData();
            if (data.examTermName !== initialFormValues.examTermName) {
                formData.append('examTermName', data.examTermName);
            }
            if (data.startDate !== initialFormValues.startDate) {
                formData.append('startDate', data.startDate);
            }
            if (data.description !== initialFormValues.description) {
                formData.append('description', data.description || '');
            }

            const response = await updateExamTermDataApi(editExamTermId, formData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getAllExamTermData(searchInputVal);
                resetUpdate();
                setInitialFormValues({});
                const offcanvasElement = document.getElementById('editExamTerm');
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
                offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                    const backdrop = document.querySelector('.offcanvas-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }
                }, { once: true });
            } else {
                toast.error(response?.data?.message || 'Failed to update exam term');
                setValueUpdate('examTermName', initialFormValues.examTermName);
                setValueUpdate('startDate', initialFormValues.startDate);
                setValueUpdate('description', initialFormValues.description);
            }
        } catch (error) {
            toast.error('Error updating exam term');
            setValueUpdate('examTermName', initialFormValues.examTermName);
            setValueUpdate('startDate', initialFormValues.startDate);
            setValueUpdate('description', initialFormValues.description);
        } finally {
            setLoaderState(false);
        }
    };

    // Delete Exam Term
    const deleteExamTermById = async (id) => {
        if (!isChecked) return;
        try {
            setLoaderState(true);
            const response = await deleteExamTermApi(id);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getAllExamTermData(searchInputVal);
                setIsChecked(false);
                const offcanvasElement = document.getElementById('deleteExamTerm');
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
                offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                    const backdrop = document.querySelector('.offcanvas-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }
                }, { once: true });
            } else {
                toast.error(response?.data?.message || 'Failed to delete exam term');
            }
        } catch (error) {
            toast.error('Error deleting exam term');
        } finally {
            setLoaderState(false);
        }
    };

    // Handle Pagination
    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        setPageNo(selectedPage);
    };

    // Reset Add form when offcanvas opens
    const handleAddOffcanvasOpen = () => {
        resetAdd();
        const offcanvasElement = document.getElementById('addExamTerm');
        if (offcanvasElement) {
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
            offcanvas.show();
        } else {
            console.error('Offcanvas element with ID addExamTerm not found');
            toast.error('Unable to open Add Exam Term form');
        }
    };

    return (
        <Container>
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
                                    Exam Term
                                </li>
                            </ol>
                        </nav>
                        <p className="font14 ps-0 fontWeight500">Exam Term Details</p>
                    </div>
                    <div className="col-xxl-8 col-xl-8 col-lg-12 col-sm-12 pe-0">
                        <ActionControls
                            showAddButton={true}
                            addButtonText="Add Exam Term"
                            addButtonAction={handleAddOffcanvasOpen}
                            showExportPDF={false}
                            exportPDFText="Export PDF"
                            exportPDFAction={''}
                            showExportCSV={examTermData.length > 0}
                            exportCSVText="Export CSV"
                            exportCSVAction={''}
                            showSearch={true}
                            searchValue={searchInputVal}
                            searchAction={getAllExamTermData}
                            onSearchChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="bg-white rounded-2 p-3 overflow-scroll">
                        {examTermData.length > 0 ? (
                            <>
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
                                                <span className="font14">Start Date</span>
                                            </th>
                                            <th className="textWrapClass">
                                                <span className="font14">Description</span>
                                            </th>
                                            <th className="text-center">
                                                <span className="font14">Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {examTermData.map((item, index) => (
                                            <tr key={item.examTermId} className="align-middle">
                                                <th className="textWrapClass greyText">
                                                    <h3>{(pageNo - 1) * pageSize + index + 1}</h3>
                                                </th>
                                                <td className="textWrapClass greyText font14">{item.examTermName}</td>
                                                <td className="textWrapClass greyText font14">{item.startDate || '-'}</td>
                                                <td className="textWrapClass greyText font14">{item.description || '-'}</td>
                                                <td className="textWrapClass text-center">
                                                    <button
                                                        className="btn ps-1 pe-1 text-black text-decoration-none"
                                                        type="button"
                                                        data-bs-toggle="offcanvas"
                                                        data-bs-target="#editExamTerm"
                                                        aria-controls="editExamTerm"
                                                        onClick={() => getExamTermDataById(item.examTermId)}
                                                    >
                                                        <Icon icon="carbon:edit" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                                                    </button>
                                                    <button
                                                        className="btn ps-1 pe-1 text-black text-decoration-none"
                                                        type="button"
                                                        data-bs-toggle="offcanvas"
                                                        data-bs-target="#deleteExamTerm"
                                                        aria-controls="deleteExamTerm"
                                                        onClick={() => setDelExamTermId(item.examTermId)}
                                                    >
                                                        <Icon icon="mi:delete" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="overflow-scroll">
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
                                </div>
                            </>
                        ) : (
                            <div className="d-flex justify-content-center p-5 m-5">
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="No data" className="img-fluid" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Add Exam Term */}
                <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="addExamTerm" aria-labelledby="addExamTermLabel">
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
                        <h2 className="offcanvas-title" id="addExamTermLabel">
                            Add Exam Term
                        </h2>
                    </div>
                    <div className="offcanvas-body p-3">
                        <form onSubmit={handleSubmitAdd(addNewExamTerm)}>
                            <div className="mb-3">
                                <label htmlFor="examTermNameAdd" className="form-label font14">
                                    Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="examTermNameAdd"
                                    type="text"
                                    className={`form-control font14 ${errorsAdd.examTermName ? 'border-danger' : ''}`}
                                    placeholder="Enter Exam Term Name"
                                    {...registerAdd('examTermName', {
                                        required: 'Exam Term Name is required *',
                                        validate: {
                                            startsWithUppercase: (value) =>
                                                /^[A-Z]/.test(value) || 'Exam Term Name must start with an uppercase letter',
                                            minLength: (value) => value.length >= 4 || 'Minimum Length is 4',
                                            validChars: (value) =>
                                                /^[a-zA-Z\s'-]+$/.test(value) || 'Invalid Characters in Exam Term Name',
                                        },
                                    })}
                                />
                                {errorsAdd.examTermName && <p className="font12 text-danger">{errorsAdd.examTermName.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="startDateAdd" className="form-label font14">
                                    Start Date <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="startDateAdd"
                                    type="date"
                                    className={`form-control font14 ${errorsAdd.startDate ? 'border-danger' : ''}`}
                                    placeholder="Select Start Date"
                                    {...registerAdd('startDate', {
                                        required: 'Start Date is required *',
                                        validate: {
                                            validDate: (value) =>
                                                !isNaN(new Date(value).getTime()) || 'Invalid date format',
                                        },
                                    })}
                                />
                                {errorsAdd.startDate && <p className="font12 text-danger">{errorsAdd.startDate.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descriptionAdd" className="form-label font14">
                                    Description
                                </label>
                                <input
                                    id="descriptionAdd"
                                    type="text"
                                    className={`form-control font14 ${errorsAdd.description ? 'border-danger' : ''}`}
                                    placeholder="Enter Description"
                                    {...registerAdd('description', {
                                        validate: (value) =>
                                            !value ||
                                            ((/^[A-Z]/.test(value) || 'Description must start with an uppercase letter') &&
                                                (value.length >= 4 || 'Minimum Length is 4') &&
                                                (/^[a-zA-Z\s'-]+$/.test(value) || 'Invalid Characters in Description')),
                                    })}
                                />
                                {errorsAdd.description && <p className="font12 text-danger">{errorsAdd.description.message}</p>}
                            </div>
                            <p className="text-center p-3">
                                <button
                                    className="btn addButtons2 font14 text-white me-2"
                                    type="submit"
                                    disabled={!isValidAdd}
                                >
                                    Add Exam Term
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

                {/* Edit Exam Term */}
                <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="editExamTerm" aria-labelledby="editExamTermLabel">
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
                        <h2 className="offcanvas-title" id="editExamTermLabel">
                            Edit Exam Term
                        </h2>
                    </div>
                    <div className="offcanvas-body p-3">
                        <form onSubmit={handleSubmitUpdate(updateExamTerm)}>
                            <div className="mb-3">
                                <label htmlFor="examTermNameEdit" className="form-label font14">
                                    Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="examTermNameEdit"
                                    type="text"
                                    className={`form-control font14 ${errorsUpdate.examTermName ? 'border-danger' : ''}`}
                                    placeholder="Enter Exam Term Name"
                                    {...registerUpdate('examTermName', {
                                        required: 'Exam Term Name is required *',
                                        validate: {
                                            startsWithUppercase: (value) =>
                                                /^[A-Z]/.test(value) || 'Exam Term Name must start with an uppercase letter',
                                            minLength: (value) => value.length >= 4 || 'Minimum Length is 4',
                                            validChars: (value) =>
                                                /^[a-zA-Z\s'-]+$/.test(value) || 'Invalid Characters in Exam Term Name',
                                        },
                                    })}
                                />
                                {errorsUpdate.examTermName && <p className="font12 text-danger">{errorsUpdate.examTermName.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="startDateEdit" className="form-label font14">
                                    Start Date <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="startDateEdit"
                                    type="date"
                                    className={`form-control font14 ${errorsUpdate.startDate ? 'border-danger' : ''}`}
                                    placeholder="Select Start Date"
                                    {...registerUpdate('startDate', {
                                        required: 'Start Date is required *',
                                        validate: {
                                            validDate: (value) =>
                                                !isNaN(new Date(value).getTime()) || 'Invalid date format',
                                        },
                                    })}
                                />
                                {errorsUpdate.startDate && <p className="font12 text-danger">{errorsUpdate.startDate.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="descriptionEdit" className="form-label font14">
                                    Description
                                </label>
                                <input
                                    id="descriptionEdit"
                                    type="text"
                                    className={`form-control font14 ${errorsUpdate.description ? 'border-danger' : ''}`}
                                    placeholder="Enter Description"
                                    {...registerUpdate('description', {
                                        validate: (value) =>
                                            !value ||
                                            ((/^[A-Z]/.test(value) || 'Description must start with an uppercase letter') &&
                                                (value.length >= 4 || 'Minimum Length is 4') &&
                                                (/^[a-zA-Z\s'-]+$/.test(value) || 'Invalid Characters in Description')),
                                    })}
                                />
                                {errorsUpdate.description && <p className="font12 text-danger">{errorsUpdate.description.message}</p>}
                            </div>
                            <p className="text-center p-3">
                                <button
                                    className="btn addButtons3 font14 text-white me-2"
                                    type="submit"
                                    disabled={!isValidUpdate}
                                >
                                    Update Exam Term
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

                {/* Delete Exam Term */}
                <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="deleteExamTerm" aria-labelledby="deleteExamTermLabel">
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
                        <h2 className="offcanvas-title" id="deleteExamTermLabel">
                            Delete Exam Term
                        </h2>
                    </div>
                    <div className="offcanvas-body p-3">
                        <div>
                            <p className="text-center p-3">
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/errorI.svg" className="img-fluid" alt="Error" />
                            </p>
                            <p className="text-center warningHeading">Are you Sure?</p>
                            <p className="text-center greyText warningText pt-2">
                                This Action will permanently delete<br />the Exam Term Data
                            </p>
                            <p className="text-center warningText p-2">
                                <input
                                    className="form-check-input formdltcheck me-2"
                                    type="checkbox"
                                    checked={isChecked}
                                    id="flexCheckChecked"
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                I Agree to delete the Exam Term Data
                            </p>
                            <p className="text-center p-3">
                                <button
                                    className="btn deleteButtons text-white"
                                    disabled={!isChecked}
                                    onClick={() => deleteExamTermById(delExamTermId)}
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
        </Container>
    );
};

export default ExamTerm;
