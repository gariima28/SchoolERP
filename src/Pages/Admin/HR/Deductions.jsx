import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Icon } from '@iconify/react';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from "react-hot-toast";
import { debounce } from 'lodash';
import DataLoader from 'src/Layouts/Loader';
import {
    addNewDeductionName,
    getAllHRDeductionName,
    getDeductionByIdApi,
    updateDeductionByIdApi,
    deleteDeductionByIdApi,
    DownloadDeductionExcel,
    DownloadDeductionPDF,
} from 'src/Utils/Apis';

const Deduction = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // State Management
    const [loaderState, setLoaderState] = useState(false);
    const [DeductionData, setDeductionData] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [pdfResponse, setPDFResponse] = useState(null);
    const [searchInputVal, setSearchInputVal] = useState('');
    const [editDeductionId, setEditDeductionId] = useState('');
    const [delDeductionId, setDelDeductionId] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [initialFormValues, setInitialFormValues] = useState({});
    const [viewDeductionData, setViewDeductionData] = useState(null);

    // Form instances
    const {
        register: registerAdd,
        handleSubmit: handleSubmitAdd,
        formState: { errors: errorsAdd, isValid: isValidAdd },
        reset: resetAdd,
    } = useForm({
        mode: 'onChange',
    });

    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        formState: { errors: errorsEdit, isValid: isValidEdit },
        setValue: setValueEdit,
        reset: resetEdit,
    } = useForm({
        mode: 'onChange',
    });

    // Fetch All Deductions
    useEffect(() => {

        getAllDeductionName(searchInputVal);

    }, [token, pageNo, pageSize, searchInputVal]);

    const getAllDeductionName = async (search = '') => {
        try {
            setLoaderState(true);
            const response = await getAllHRDeductionName(search, pageNo, pageSize);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setDeductionData(response.data.deductionNames || []);
                setTotalPages(response.data.totalPages || 1);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch Deductions');
            }
        } catch (error) {
            if (error?.response?.data?.statusType === 401) {
                localStorage.removeItem('token');
                // navigate('/');
            }
            toast.error('Error fetching Deductions');
        } finally {
            setLoaderState(false);
        }
    };

    // Handle Search
    const debouncedSearch = debounce((value) => {
        setSearchInputVal(value);
        setPageNo(1);
        getAllDeductionName(value);
    }, 500);

    const handleSearchChange = (value) => {
        debouncedSearch(value);
    };

    // Add New Deduction
    const addNewDeduction = async (data) => {
        try {
            setLoaderState(true);
            const formData = new FormData();
            formData.append('deductionName', data.deductionName);
            const response = await addNewDeductionName(formData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getAllDeductionName(searchInputVal);
                resetAdd();
                const offcanvasElement = document.getElementById('add_staticBackdrop');
                const offcanvas =
                    bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                    new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
            } else {
                toast.error(response?.data?.message || 'Failed to add Deduction');
            }
        } catch (error) {
            // toast.error('Error adding Deduction');
        } finally {
            setLoaderState(false);
        }
    };

    // Fetch Deduction by ID for Editing or Viewing
    const getDeductionById = async (id, isView = false) => {
        try {
            setLoaderState(true);
            setEditDeductionId(isView ? '' : id);
            const response = await getDeductionByIdApi(id);
            if (response?.status === 200 && response?.data?.status === 'success') {
                const data = response?.data?.deductionName;
                if (isView) {
                    setViewDeductionData(data);
                } else {
                    setValueEdit('DeductionName', data.deductionName || '');
                    setInitialFormValues({ deductionName: data.deductionName || '' });
                }
            } else {
                toast.error(response?.data?.message || `Failed to fetch ${isView ? 'view' : 'edit'} Deduction`);
            }
        } catch (error) {
            if (error?.response?.data?.statusType === 401) {
                localStorage.removeItem('token');
                // navigate('/');
            }
            toast.error(`Error fetching ${isView ? 'view' : 'edit'} Deduction`);
        } finally {
            setLoaderState(false);
        }
    };
    

    // Update Deduction
    const updateDeduction = async (data) => {
        try {
            setLoaderState(true);
            const formData = new FormData();
            formData.append('deductionName', data.deductionName);
            const response = await updateDeductionByIdApi(editDeductionId, formData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getAllDeductionName(searchInputVal);
                resetEdit();
                setInitialFormValues({});
                setEditDeductionId('');
                const offcanvasElement = document.getElementById('Edit_staticBackdrop');
                const offcanvas =
                    bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                    new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
            } else {
                toast.error(response?.data?.message || 'Failed to update Deduction');
                setValueEdit('DeductionName', initialFormValues.deductionName);
            }
        } catch (error) {
            if (error?.response?.data?.statusType === 401) {
                localStorage.removeItem('token');
                // navigate('/');
            }
            toast.error('Error updating Deduction');
            setValueEdit('DeductionName', initialFormValues.deductionName);
        } finally {
            setLoaderState(false);
        }
    };

    // Delete Deduction
    const deleteDeductionById = async (id) => {
        if (!isChecked) return;
        try {
            setLoaderState(true);
            const response = await deleteDeductionByIdApi(id);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                getAllDeductionName(searchInputVal);
                setIsChecked(false);
                setDelDeductionId('');
                const offcanvasElement = document.getElementById('Delete_staticBackdrop');
                const offcanvas =
                    bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                    new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.hide();
            } else {
                toast.error(response?.data?.message || 'Failed to delete Deduction');
            }
        } catch (error) {
            if (error?.response?.data?.statusType === 401) {
                localStorage.removeItem('token');
                // navigate('/');
            }
            toast.error('Error deleting Deduction');
        } finally {
            setLoaderState(false);
        }
    };

    // Download CSV
    const DownloadCSV = async () => {
        try {
            const response = await DownloadDeductionExcel();
            if (response?.status === 200) {
                const rows = response?.data?.split('\n').map((row) => row.split(','));
                setCsvData(rows);
                handleDownloadCsv();
            } else {
                toast.error('Failed to download CSV');
            }
        } catch (error) {
            if (error?.response?.data?.statusType === 401) {
                localStorage.removeItem('token');
                // navigate('/');
            }
            toast.error('Error downloading CSV');
        }
    };

    const handleDownloadCsv = () => {
        if (csvData.length > 0) {
            const csvContent = csvData.map(row => row.join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'DeductionData.csv';
            link.click();
        } else {
            toast.error('No CSV data available');
        }
    };

    // Download PDF
    const DownloadPDF = async () => {
        try {
            const response = await DownloadDeductionPDF();
            if (response?.status === 200 && response?.data?.status === 'success') {
                setPDFResponse(response.data);
                handleDownloadPdf();
            } else {
                toast.error('Failed to download PDF');
            }
        } catch (error) {
            if (error?.response?.data?.statusType === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
            toast.error('Error downloading PDF');
        }
    };

    const base64ToBlob = (base64, mimeType) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    };

    const handleDownloadPdf = () => {
        if (pdfResponse?.pdf) {
            const blob = base64ToBlob(pdfResponse.pdf, 'application/pdf');
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Deduction Data.pdf';
            link.click();
        } else {
            toast.error('No PDF data available');
        }
    };

    // Handle Pagination
    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        setPageNo(selectedPage);
    };

    return (
        <>
            {loaderState && <DataLoader />}
            <div className="container-fluid px-4 py-3">
                <div className="row mb-4">
                    <p className="mb-3 font16 fw-bold">Add Deduction</p>
                    <form className="row" onSubmit={handleSubmitAdd(addNewDeduction)}>
                        <div className="col-xl-4 col-md-6 col-9">
                            <label htmlFor="PaymentId" className="form-label font14 fw-lighter">
                                Deductions Name
                            </label>
                            <input
                                id="PaymentId"
                                type="text"
                                className="form-control font14"
                                placeholder="Enter Deduction Name"
                                {...registerAdd('deductionName', {
                                    required: 'Deduction Name is required *',
                                    minLength: { value: 1, message: 'Deduction Name must be at least 1 character' },
                                })}
                            />
                            {errorsAdd.deductionName && (
                                <p className="font12 text-danger">{errorsAdd.deductionName.message}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="font12 btn col-1 addButtons2 text-white align-self-end"
                            disabled={!isValidAdd}
                        >
                            Add Deduction
                        </button>
                    </form>
                </div>

                <div className="row">
                    <p className="mb-2 font16 fw-bold">List All Deductions</p>
                    <div className="table-responsive">
                        <table className="table table-striped align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th className="font14 fw-lighter">Sr. No</th>
                                    <th className="font14 fw-lighter">Deduction Name</th>
                                    <th className="font14 fw-lighter">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DeductionData.length > 0 ? (
                                    DeductionData.map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="text-muted">{(pageNo - 1) * pageSize + index + 1}.</td>
                                            <td className="greyText font14 fw-lighter">{item.deductionName}</td>
                                            <td className="greyText font14 fw-lighter">
                                                <FaEdit
                                                    className="me-3 text-success"
                                                    style={{ cursor: 'pointer' }}
                                                    title="Edit"
                                                    onClick={() => getDeductionById(item.id)}
                                                    data-bs-toggle="offcanvas"
                                                    data-bs-target="#Edit_staticBackdrop"
                                                />
                                                <FaTrash
                                                    className="text-danger me-3"
                                                    style={{ cursor: 'pointer' }}
                                                    title="Delete"
                                                    onClick={() => setDelDeductionId(item.id)}
                                                    data-bs-toggle="offcanvas"
                                                    data-bs-target="#Delete_staticBackdrop"
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            No Deductions found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="overflow-scroll">
                            <div className="d-flex">
                                <p className="font14">Showing {pageNo} of {totalPages} Pages</p>
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

                        {/* Edit Offcanvas */}
                        <div
                            className="offcanvas offcanvas-end p-2"
                            data-bs-backdrop="static"
                            tabIndex="-1"
                            id="Edit_staticBackdrop"
                            aria-labelledby="staticBackdropLabel"
                        >
                            <div className="offcanvas-header border-bottom border-2 p-1">
                                <a type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="2em"
                                        height="2em"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill="#008479"
                                            fillRule="evenodd"
                                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                                        />
                                    </svg>
                                </a>
                                <h2 className="offcanvas-title" id="staticBackdropLabel">
                                    Edit Deduction
                                </h2>
                            </div>
                            <div className="offcanvas-body p-3">
                                <form onSubmit={handleSubmitEdit(updateDeduction)}>
                                    <div className="mb-3">
                                        <label htmlFor="DeductionNameEdit" className="form-label font14">
                                            Deduction Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            id="DeductionNameEdit"
                                            type="text"
                                            className={`form-control font14 ${errorsEdit.deductionName ? 'border-danger' : ''
                                                }`}
                                            placeholder="Enter Deduction Name"
                                            {...registerEdit('deductionName', {
                                                required: 'Deduction Name is required *',
                                                minLength: {
                                                    value: 1,
                                                    message: 'Deduction Name must be at least 1 character',
                                                },
                                            })}
                                        />
                                        {errorsEdit.deductionName && (
                                            <p className="font12 text-danger">{errorsEdit.deductionName.message}</p>
                                        )}
                                    </div>
                                    <p className="text-center p-3">
                                        <button
                                            className="btn addButtons2 font14 text-white me-2"
                                            type="submit"
                                            disabled={!isValidEdit}
                                        >
                                            Edit Deduction
                                        </button>
                                        <button
                                            className="btn cancelButtons font14"
                                            type="button"
                                            data-bs-dismiss="offcanvas"
                                            onClick={() => resetEdit()}
                                        >
                                            Cancel
                                        </button>
                                    </p>
                                </form>
                            </div>
                        </div>

                        {/* Delete Offcanvas */}
                        <div
                            className="offcanvas offcanvas-end p-2"
                            data-bs-backdrop="static"
                            tabIndex="-1"
                            id="Delete_staticBackdrop"
                            aria-labelledby="staticBackdropLabel"
                        >
                            <div className="offcanvas-header ps-0 modalHighborder p-1">
                                <a type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="2em"
                                        height="2em"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill="#B50000"
                                            fillRule="evenodd"
                                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                                        />
                                    </svg>
                                </a>
                                <span className="offcanvas-title" id="staticBackdropLabel">
                                    Delete Deduction
                                </span>
                            </div>
                            <div className="offcanvas-body p-0">
                                {loaderState && <DataLoader />}
                                <div style={{ zIndex: -1 }}>
                                    <p className="modalLightBorder p-2">Deduction</p>
                                    <p className="text-center p-3">
                                        <img src="/images/errorI.svg" className="img-fluid" alt="Error" />
                                    </p>
                                    <p className="text-center warningHeading">Are you Sure?</p>
                                    <p className="text-center greyText warningText pt-2">
                                        This Action will permanently delete<br />the Deduction Data
                                    </p>
                                    <p className="text-center warningText p-2">
                                        <input
                                            className="form-check-input formdltcheck me-2"
                                            type="checkbox"
                                            checked={isChecked}
                                            id="flexCheckChecked"
                                            onChange={(e) => setIsChecked(e.target.checked)}
                                        />
                                        I Agree to delete the Deduction Data
                                    </p>
                                    <p className="text-center p-3">
                                        <button
                                            className="btn deleteButtons text-white"
                                            disabled={!isChecked}
                                            onClick={() => deleteDeductionById(delDeductionId)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn dltcancelButtons ms-3"
                                            data-bs-dismiss="offcanvas"
                                            onClick={() => {
                                                setIsChecked(false);
                                                setDelDeductionId('');
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* View Offcanvas */}
                        <div
                            className="offcanvas offcanvas-end p-2"
                            data-bs-backdrop="static"
                            tabIndex="-1"
                            id="View_staticBackdrop"
                            aria-labelledby="viewBackdropLabel"
                        >
                            <div className="offcanvas-header border-bottom border-2 p-1">
                                <a type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="2em"
                                        height="2em"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill="#008479"
                                            fillRule="evenodd"
                                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                                        />
                                    </svg>
                                </a>
                                <h2 className="offcanvas-title" id="viewBackdropLabel">
                                    View Deduction
                                </h2>
                            </div>
                            <div className="offcanvas-body p-3">
                                {viewDeductionData ? (
                                    <div>
                                        <p>
                                            <strong>Deduction Name:</strong> {viewDeductionData.deductionName}
                                        </p>
                                    </div>
                                ) : (
                                    <p>No data available</p>
                                )}
                                <button
                                    className="btn cancelButtons font14"
                                    data-bs-dismiss="offcanvas"
                                    onClick={() => setViewDeductionData(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Deduction;
