import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import DataLoader from 'src/Layouts/Loader';
import ActionControls from 'src/Layouts/ActionControls';
import {
    getGradeDataApi,
    getGradeDataByIdApi,
    updateGradeByIdApi,
    deleteGradeApi,
    addNewGradeApi,
    PdfGradeApi,
    CsvGradeApi,
} from '../../../Utils/Apis';
// import { DownloadGradeExcel, DownloadGradePDF } from '../api/exportApi'; // Assumed export APIs

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

const base64ToBlob = (base64Data, contentType) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
};

const Grades = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // State Management
    const [loaderState, setLoaderState] = useState(false);
    const [allGradeData, setAllGradeData] = useState([]);
    const [searchByKey, setSearchByKey] = useState('');
    const [editGradeId, setEditGradeId] = useState('');
    const [deleteGradeId, setDeleteGradeId] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [csvData, setCsvData] = useState([]);
    const [pdfResponse, setPDFResponse] = useState(null);
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

    // Fetch Initial Data
    useEffect(() => {
        getAllGradeData(searchByKey);
    }, [token, pageNo, pageSize]);

    const getAllGradeData = async (searchKey) => {
        try {
            setLoaderState(true);
            const response = await getGradeDataApi(searchKey, pageNo, pageSize);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setAllGradeData(response.data.grades || []);
                setTotalPages(response.data.totalPages || 1);
                setCurrentPage(response.data.currentPage || 1);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch grades');
            }
        } catch (error) {
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
            toast.error('Error fetching grades');
        } finally {
            setLoaderState(false);
        }
    };

    const getGradeDataById = async (id) => {
        try {
            setLoaderState(true);
            setEditGradeId(id);
            const response = await getGradeDataByIdApi(id);
            if (response?.status === 200 && response?.data?.status === 'success') {
                const data = response.data.grade;
                const formValues = {
                    grade: data.grade || '',
                    percentageFrom: data.percentageFrom || '',
                    percentageUpTo: data.percentageUpTo || '',
                };
                setValueUpdate('grade', data.grade);
                setValueUpdate('percentageFrom', data.percentageFrom);
                setValueUpdate('percentageUpTo', data.percentageUpTo);
                setInitialFormValues(formValues);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch grade data');
            }
        } catch (error) {
            toast.error('Error fetching grade data');
        } finally {
            setLoaderState(false);
        }
    };

    const addNewGrade = async (data) => {
        try {
            setLoaderState(true);
            const formData = new FormData();
            formData.append('grade', data.grade);
            formData.append('percentageFrom', data.percentageFrom);
            formData.append('percentageUpTo', data.percentageUpTo);

            const response = await addNewGradeApi(formData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getAllGradeData(searchByKey);
                resetAdd();
                const offcanvasElement = document.getElementById('addGrade');
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
                offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                    const backdrop = document.querySelector('.offcanvas-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }
                }, { once: true });
            } else {
                toast.error(response?.data?.message || 'Failed to add grade');
            }
        } catch (error) {
            toast.error('Error adding grade');
        } finally {
            setLoaderState(false);
        }
    };

    const updateGrade = async (data) => {
        try {
            setLoaderState(true);
            const formData = new FormData();
            if (data.grade !== initialFormValues.grade) {
                formData.append('grade', data.grade);
            }
            if (data.percentageFrom !== initialFormValues.percentageFrom) {
                formData.append('percentageFrom', data.percentageFrom);
            }
            if (data.percentageUpTo !== initialFormValues.percentageUpTo) {
                formData.append('percentageUpTo', data.percentageUpTo);
            }

            const response = await updateGradeByIdApi(editGradeId, formData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getAllGradeData(searchByKey);
                resetUpdate();
                setInitialFormValues({});
                const offcanvasElement = document.getElementById('editGrade');
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
                offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                    const backdrop = document.querySelector('.offcanvas-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }
                }, { once: true });
            } else {
                toast.error(response?.data?.message || 'Failed to update grade');
                Object.keys(initialFormValues).forEach(key => setValueUpdate(key, initialFormValues[key]));
            }
        } catch (error) {
            toast.error('Error updating grade');
            Object.keys(initialFormValues).forEach(key => setValueUpdate(key, initialFormValues[key]));
        } finally {
            setLoaderState(false);
        }
    };

    const deleteGradeById = async () => {
        if (!isChecked) {
            toast.error('Please Agree to Delete Grade');
            return;
        }
        try {
            setLoaderState(true);
            const response = await deleteGradeApi(deleteGradeId);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getAllGradeData(searchByKey);
                setIsChecked(false);
                const offcanvasElement = document.getElementById('deleteGrade');
                const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
                offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                    const backdrop = document.querySelector('.offcanvas-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }
                }, { once: true });
            } else {
                toast.error(response?.data?.message || 'Failed to delete grade');
            }
        } catch (error) {
            toast.error('Error deleting grade');
        } finally {
            setLoaderState(false);
        }
    };

    const handleSearchChange = (value) => {
        setSearchByKey(value);
        setPageNo(1); // Reset to first page on search change
    };

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        setPageNo(selectedPage);
    };

    const handleAddOffcanvasOpen = () => {
        resetAdd();
        const offcanvasElement = document.getElementById('addGrade');
        if (offcanvasElement) {
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
            offcanvas.show();
        } else {
            console.error('Offcanvas element with ID addGrade not found');
            toast.error('Unable to open Add Grade form');
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
                                    <a href="/ExamTerm" className="bredcrumText text-decoration-none">
                                        Examination
                                    </a>
                                </li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">
                                    Grades
                                </li>
                            </ol>
                        </nav>
                        <p className="font14 ps-0 fontWeight500">Grades List</p>
                    </div>
                    <div className="col-xxl-8 col-xl-8 col-lg-12 col-sm-12 pe-0">
                        <ActionControls
                            showAddButton={true}
                            addButtonText="Add Grade"
                            addButtonAction={handleAddOffcanvasOpen}
                            showExportPDF={allGradeData.length > 0}
                            exportPDFText="Export PDF"
                            exportPDFAction={PdfGradeApi}
                            exportPDFFileName="Grades.pdf"
                            showExportCSV={allGradeData.length > 0}
                            exportCSVText="Export CSV"
                            exportCSVAction={CsvGradeApi}
                            exportCSVFileName="Grades.xlsx"
                            showSearch={true}
                            searchValue={searchByKey}
                            searchAction={getAllGradeData}
                            onSearchChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="bg-white rounded-2 p-4">
                        {allGradeData.length > 0 ? (
                            <>
                                <div className="row overflow-scroll">
                                    <table className="table align-middle table-striped">
                                        <thead>
                                            <tr>
                                                <th className="text-center textWrapClass">
                                                    <span className="font14">#</span>
                                                </th>
                                                <th className="textWrapClass">
                                                    <span className="font14">Grade</span>
                                                </th>
                                                <th className="textWrapClass">
                                                    <span className="font14">Percentage From</span>
                                                </th>
                                                <th className="textWrapClass">
                                                    <span className="font14">Percentage Upto</span>
                                                </th>
                                                <th className="text-center textWrapClass">
                                                    <span className="font14">Action</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allGradeData.map((item, index) => (
                                                <tr key={item.id} className="align-middle">
                                                    <th className="textWrapClass text-center greyText">
                                                        <h3>{(pageNo - 1) * pageSize + index + 1}</h3>
                                                    </th>
                                                    <td className="textWrapClass greyText">
                                                        <h3>{item.grade}</h3>
                                                    </td>
                                                    <td className="textWrapClass greyText">
                                                        <h3>{item.percentageFrom}</h3>
                                                    </td>
                                                    <td className="textWrapClass greyText">
                                                        <h3>{item.percentageUpTo}</h3>
                                                    </td>
                                                    <td className="textWrapClass text-center">
                                                        <button
                                                            className="btn ps-1 pe-1 text-black text-decoration-none"
                                                            type="button"
                                                            data-bs-toggle="offcanvas"
                                                            data-bs-target="#editGrade"
                                                            aria-controls="editGrade"
                                                            onClick={() => getGradeDataById(item.id)}
                                                        >
                                                            <Icon icon="carbon:edit" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                                                        </button>
                                                        <button
                                                            className="btn ps-1 pe-1 text-black text-decoration-none"
                                                            type="button"
                                                            data-bs-toggle="offcanvas"
                                                            data-bs-target="#deleteGrade"
                                                            aria-controls="deleteGrade"
                                                            onClick={() => setDeleteGradeId(item.id)}
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

                {/* Add Grade */}
                <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="addGrade" aria-labelledby="addGradeLabel">
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
                        <h2 className="offcanvas-title" id="addGradeLabel">
                            Add Grade
                        </h2>
                    </div>
                    <div className="offcanvas-body p-3 scrollBarHide">
                        <form onSubmit={handleSubmitAdd(addNewGrade)}>
                            <div className="mb-3">
                                <label htmlFor="gradeAdd" className="form-label font14">
                                    Grade <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="gradeAdd"
                                    type="text"
                                    placeholder="Enter Grade Name"
                                    className={`form-control font14 ${errorsAdd.grade ? 'border-danger' : ''}`}
                                    {...registerAdd('grade', {
                                        required: 'Grade is required *',
                                        // pattern: {
                                        //     value: /^[A-Za-z0-9+\s]+$/,
                                        //     message: 'Invalid grade format',
                                        // },
                                    })}
                                />
                                {errorsAdd.grade && <p className="font12 text-danger">{errorsAdd.grade.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="percentageFromAdd" className="form-label font14">
                                    Percentage From <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="percentageFromAdd"
                                    type="number"
                                    placeholder='Enter Mark Percentage From'
                                    className={`form-control font14 ${errorsAdd.percentageFrom ? 'border-danger' : ''}`}
                                    {...registerAdd('percentageFrom', {
                                        required: 'Percentage From is required *',
                                        min: { value: 0, message: 'Percentage From cannot be negative' },
                                        max: { value: 100, message: 'Percentage From cannot exceed 100' },
                                    })}
                                />
                                {errorsAdd.percentageFrom && <p className="font12 text-danger">{errorsAdd.percentageFrom.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="percentageUpToAdd" className="form-label font14">
                                    Percentage Upto <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="percentageUpToAdd"
                                    type="number"
                                    placeholder='Enter Mark Percentage Upto'
                                    className={`form-control font14 ${errorsAdd.percentageUpTo ? 'border-danger' : ''}`}
                                    {...registerAdd('percentageUpTo', {
                                        required: 'Percentage Upto is required *',
                                        min: { value: 0, message: 'Percentage Upto cannot be negative' },
                                        max: { value: 100, message: 'Percentage Upto cannot exceed 100' },
                                        validate: {
                                            greaterThanPercentageFrom: (value, { percentageFrom }) =>
                                                !percentageFrom || parseFloat(value) > parseFloat(percentageFrom) || 'Percentage Upto must be greater than Percentage From',
                                        },
                                    })}
                                />
                                {errorsAdd.percentageUpTo && <p className="font12 text-danger">{errorsAdd.percentageUpTo.message}</p>}
                            </div>
                            <p className="text-center p-3">
                                <button
                                    className="btn addButtons2 font14 text-white me-2"
                                    type="submit"
                                    disabled={!isValidAdd}
                                >
                                    Add Grade
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

                {/* Edit Grade */}
                <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="editGrade" aria-labelledby="editGradeLabel">
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
                        <h2 className="offcanvas-title" id="editGradeLabel">
                            Edit Grade
                        </h2>
                    </div>
                    <div className="offcanvas-body p-3 scrollBarHide">
                        <form onSubmit={handleSubmitUpdate(updateGrade)}>
                            <div className="mb-3">
                                <label htmlFor="gradeEdit" className="form-label font14">
                                    Grade <span className="text-danger">*</span>
                                </label>

                                <input
                                    id="gradeAdd"
                                    type="text"
                                    placeholder='Enter Grade Name'
                                    className={`form-control font14 ${errorsUpdate.grade ? 'border-danger' : ''}`}
                                    {...registerUpdate('grade', {
                                        required: 'Grade is required *',
                                    })}
                                />
                                {errorsUpdate.grade && <p className="font12 text-danger">{errorsUpdate.grade.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="percentageFromEdit" className="form-label font14">
                                    Percentage From <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="percentageFromEdit"
                                    type="number"
                                    placeholder='Enter Mark Percentage From'
                                    className={`form-control font14 ${errorsUpdate.percentageFrom ? 'border-danger' : ''}`}
                                    {...registerUpdate('percentageFrom', {
                                        required: 'Percentage From is required *',
                                        min: { value: 0, message: 'Percentage From cannot be negative' },
                                        max: { value: 100, message: 'Percentage From cannot exceed 100' },
                                    })}
                                />
                                {errorsUpdate.percentageFrom && <p className="font12 text-danger">{errorsUpdate.percentageFrom.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="percentageUpToEdit" className="form-label font14">
                                    Percentage Upto <span className="text-danger">*</span>
                                </label>
                                <input
                                    id="percentageUpToEdit"
                                    type="number"
                                    placeholder='Enter Mark Percentage Upto'
                                    className={`form-control font14 ${errorsUpdate.percentageUpTo ? 'border-danger' : ''}`}
                                    {...registerUpdate('percentageUpTo', {
                                        required: 'Percentage Upto is required *',
                                        min: { value: 0, message: 'Percentage Upto cannot be negative' },
                                        max: { value: 100, message: 'Percentage Upto cannot exceed 100' },
                                        validate: {
                                            greaterThanPercentageFrom: (value, { percentageFrom }) =>
                                                !percentageFrom || parseFloat(value) > parseFloat(percentageFrom) || 'Percentage Upto must be greater than Percentage From',
                                        },
                                    })}
                                />
                                {errorsUpdate.percentageUpTo && <p className="font12 text-danger">{errorsUpdate.percentageUpTo.message}</p>}
                            </div>
                            <p className="text-center p-3">
                                <button
                                    className="btn addButtons3 font14 text-white me-2"
                                    type="submit"
                                    disabled={!isValidUpdate}
                                >
                                    Update Grade
                                </button>
                                <button
                                    className="btn cancelButtons font14"
                                    type="button"
                                    data-bs-dismiss="offcanvas"
                                    onClick={() => resetUpdate()}
                                >
                                    Cancel
                                </button>
                            </p>
                        </form>
                    </div>
                </div>

                {/* Delete Grade */}
                <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="deleteGrade" aria-labelledby="deleteGradeLabel">
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
                        <h2 className="offcanvas-title" id="deleteGradeLabel">
                            Delete Grade
                        </h2>
                    </div>
                    <div className="offcanvas-body p-3">
                        <div>
                            <p className="text-center p-3">
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/errorI.svg" className="img-fluid" alt="Error" />
                            </p>
                            <p className="text-center warningHeading">Are you Sure?</p>
                            <p className="text-center greyText warningText pt-2">
                                This Action will permanently delete<br />the Grade Data
                            </p>
                            <p className="text-center warningText p-2">
                                <input
                                    className="form-check-input formdltcheck me-2"
                                    type="checkbox"
                                    checked={isChecked}
                                    id="flexCheckChecked"
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                I Agree to delete the Grade Data
                            </p>
                            <p className="text-center p-3">
                                <button
                                    className="btn deleteButtons text-white"
                                    disabled={!isChecked}
                                    onClick={deleteGradeById}
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

export default Grades;
