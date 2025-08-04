import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import { CSVLink } from 'react-csv';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import {
  addNewFeeDiscountApi,
  deleteFeeDiscountByIdApi,
  getAllFeeDiscountApi,
  getFeeDiscountByIdApi,
  updateFeeDiscountByIdApi,
  DownloadFeeDiscountExcel,
  DownloadFeeDiscountPDF,
} from 'src/Utils/Apis';
import ActionControls from '../../../Layouts/ActionControls';
import * as bootstrap from 'bootstrap';

const Container = styled.div`
  .blueText {
    color: var(--blueTextColor);
  }
  .form-control::placeholder,
  .form-control,
  .form-select {
    color: var(--greyState);
  }
  .formdltcheck:checked {
    background-color: #b50000 !important;
    border-color: #b50000 !important;
  }
  .form-control,
  .form-select {
    border-radius: 5px ;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }
  .contbtn {
    margin-left: 41% !important;
    margin-top: -20% !important;
  }
  .greydiv {
    background-color: #fbfbfb;
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
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }
  .form-check-input:checked {
    background-color: #008479;
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
    background-color: #2bb673;
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
  .greyText {
    color: var(--greyTextColor) !important;
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

const FeesDiscount = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // State Management
  const [loaderState, setLoaderState] = useState(false);
  const [feeDiscountData, setFeeDiscountData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [pdfResponse, setPDFResponse] = useState(null);
  const [searchInputVal, setSearchInputVal] = useState('');
  const [editFeeDiscountId, setEditFeeDiscountId] = useState('');
  const [delFeeDiscountId, setDelFeeDiscountId] = useState('');
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

  // Fetch All Fee Discounts
  useEffect(() => {
    getAllFeeDiscountData(searchInputVal);
  }, [token, pageNo, pageSize]);

  const getAllFeeDiscountData = async (search = '') => {
    try {
      setLoaderState(true);
      const response = await getAllFeeDiscountApi(search, pageNo, pageSize);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setFeeDiscountData(response.data.discounts || []);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(response.data.currentPage || 1);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch fee discounts');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
      toast.error('Error fetching fee discounts');
    } finally {
      setLoaderState(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchInputVal(value);
    setPageNo(1); // Reset to first page on search change
  };

  // Fetch Fee Discount by ID for Editing
  const getFeeDiscountDataById = async (id) => {
    try {
      setLoaderState(true);
      setEditFeeDiscountId(id);
      const response = await getFeeDiscountByIdApi(id);
      if (response?.status === 200 && response?.data?.status === 'success') {
        const data = response.data.discount
        const formValues = {
          title: data.title || '',
          discountType: data.discountType || '',
          description: data.description || '',
          amount: data.amount || '',
        };
        setValueUpdate('title', data.title);
        setValueUpdate('discountType', data.discountType);
        setValueUpdate('description', data.description || '');
        setValueUpdate('amount', data.amount || '');
        setInitialFormValues(formValues);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch fee discount');
      }
    } catch (error) {
      toast.error('Error fetching fee discount');
    } finally {
      setLoaderState(false);
    }
  };

  // Add New Fee Discount
  const addNewFeeDiscount = async (data) => {
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('discountType', data.discountType);
      formData.append('description', data.description || '');
      formData.append('amount', data.amount);

      const response = await addNewFeeDiscountApi(formData);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success(response.data.message);
        getAllFeeDiscountData(searchInputVal);
        resetAdd();
        const offcanvasElement = document.getElementById('addFeeDiscount');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
      } else {
        toast.error(response?.data?.message || 'Failed to add fee discount');
      }
    } catch (error) {
      toast.error('Error adding fee discount');
    } finally {
      setLoaderState(false);
    }
  };

  // Update Fee Discount
  const updateFeeDiscount = async (data) => {
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('discountType', data.discountType);
      formData.append('description', data.description || '');
      formData.append('amount', data.amount);
      formData.append('fineType', discountType);

      const response = await updateFeeDiscountByIdApi(editFeeDiscountId, formData);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success(response.data.message);
        getAllFeeDiscountData(searchInputVal);
        resetUpdate();
        setInitialFormValues({});
        const offcanvasElement = document.getElementById('editFeeDiscount');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
      } else {
        toast.error(response?.data?.message || 'Failed to update fee discount');
        setValueUpdate('title', initialFormValues.title);
        setValueUpdate('discountType', initialFormValues.discountType);
        setValueUpdate('description', initialFormValues.description);
        setValueUpdate('amount', initialFormValues.amount);
      }
    } catch (error) {
      toast.error('Error updating fee discount');
      setValueUpdate('title', initialFormValues.title);
      setValueUpdate('discountType', initialFormValues.discountType);
      setValueUpdate('description', initialFormValues.description);
      setValueUpdate('amount', initialFormValues.amount);
    } finally {
      setLoaderState(false);
    }
  };

  // Delete Fee Discount
  const deleteFeeDiscountById = async (id) => {
    if (!isChecked) return;
    try {
      setLoaderState(true);
      const response = await deleteFeeDiscountByIdApi(id);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success(response.data.message);
        getAllFeeDiscountData(searchInputVal);
        setIsChecked(false);
        const offcanvasElement = document.getElementById('deleteFeeDiscount');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
      } else {
        toast.error(response?.data?.message || 'Failed to delete fee discount');
      }
    } catch (error) {
      toast.error('Error deleting fee discount');
    } finally {
      setLoaderState(false);
    }
  };

  // Download CSV
  const DownloadCSV = async () => {
    try {
      const response = await DownloadFeeDiscountExcel();
      if (response?.status === 200) {
        const rows = response?.data?.split('\n').map((row) => row.split(','));
        setCsvData(rows);
      } else {
        toast.error('Failed to download CSV');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
      toast.error('Error downloading CSV');
    }
  };

  // Download PDF
  const DownloadPDF = async () => {
    try {
      const response = await DownloadFeeDiscountPDF();
      if (response?.status === 200 && response?.data?.status === 'success') {
        setPDFResponse(response.data);
      } else {
        toast.error('Failed to download PDF');
      }
    } catch (error) {
      toast.error('Error downloading PDF');
    }
  };

  // Handle PDF Download
  const handleDownloadPdf = () => {
    if (pdfResponse?.pdf) {
      const blob = base64ToBlob(pdfResponse.pdf, 'application/pdf');
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Fee Discount Data.pdf';
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

  // Reset Add form when offcanvas opens
  const handleAddOffcanvasOpen = () => {
    resetAdd();
    const offcanvasElement = document.getElementById('addFeeDiscount');
    if (offcanvasElement) {
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.show();
    } else {
      console.error('Offcanvas element with ID addFeeDiscount not found');
      toast.error('Unable to open Add Fee Discount form');
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
                  <a href="/collectFees" className="bredcrumText text-decoration-none">
                    Fee Collection
                  </a>
                </li>
                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">
                  Discount
                </li>
              </ol>
            </nav>
            <p className="font14 ps-0 fontWeight500">Discount Details</p>
          </div>
          <div className="col-xxl-8 col-xl-8 col-lg-12 col-sm-12 pe-0">
            <ActionControls
              showAddButton={true}
              addButtonText="Add Discount"
              addButtonAction={handleAddOffcanvasOpen}
              showExportPDF={feeDiscountData.length > 0}
              exportPDFText="Export PDF"
              exportPDFAction={DownloadFeeDiscountPDF}
              exportPDFFileName="Fee Discounts.pdf"
              showExportCSV={feeDiscountData.length > 0}
              exportCSVText="Export CSV"
              exportCSVAction={DownloadFeeDiscountExcel}
              exportCSVFileName="Fee Discounts.xlsx"
              showSearch={true}
              searchValue={searchInputVal}
              searchAction={getAllFeeDiscountData}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-3 overflow-scroll">
            {feeDiscountData.length > 0 ? (
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
                        <span className="font14">Discount Type</span>
                      </th>
                      <th className="textWrapClass">
                        <span className="font14">Amount</span>
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
                    {feeDiscountData.map((item, index) => (
                      <tr key={item.feeDiscountId} className="align-middle">
                        <th className="textWrapClass greyText">
                          <h3>{(pageNo - 1) * pageSize + index + 1}</h3>
                        </th>
                        <td className="textWrapClass greyText font14">{item.title}</td>
                        <td className="textWrapClass greyText font14">{item.discountType}</td>
                        <td className="textWrapClass greyText font14">{item.amount}</td>
                        <td className="textWrapClass greyText font14">{item.description || '-'}</td>
                        <td className="textWrapClass text-center">
                          <button
                            className="btn ps-1 pe-1 text-black text-decoration-none"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#editFeeDiscount"
                            aria-controls="editFeeDiscount"
                            onClick={() => getFeeDiscountDataById(item.discountId)}
                          >
                            <Icon icon="carbon:edit" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                          </button>
                          <button
                            className="btn ps-1 pe-1 text-black text-decoration-none"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#deleteFeeDiscount"
                            aria-controls="deleteFeeDiscount"
                            onClick={() => setDelFeeDiscountId(item.discountId)}
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
                <img src="/images/search.svg" alt="No data" className="img-fluid" />
              </div>
            )}
          </div>
        </div>

        {/* Add Fee Discount */}
        <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="addFeeDiscount" aria-labelledby="addFeeDiscountLabel">
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
            <h2 className="offcanvas-title" id="addFeeDiscountLabel">
              Add Fees Discount
            </h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitAdd(addNewFeeDiscount)}>
              <div className="mb-3">
                <label htmlFor="titleAdd" className="form-label font14">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  id="titleAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.title ? 'border-danger' : ''} `}
                  placeholder="Enter Discount Name"
                  {...registerAdd('title', {
                    required: 'Title is required *',
                    validate: {
                      startsWithUppercase: (value) =>
                        /^[A-Z]/.test(value) || 'Discount Name must start with an uppercase letter',
                      minLength: (value) => value.length >= 4 || 'Minimum Length is 4',
                      validChars: (value) =>
                        /^[a-zA-Z\s'-]+$/.test(value) || 'Invalid Characters in Discount Name',
                    },
                  })}
                />
                {errorsAdd.title && <p className="font12 text-danger">{errorsAdd.title.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="discountTypeAdd" className="form-label font14">
                  Discount Type <span className="text-danger">*</span>
                </label>
                <select
                  id="discountTypeAdd"
                  className={`form-select font14 ${errorsAdd.discountType ? 'border-danger' : ''} `}
                  {...registerAdd('discountType', { required: 'Discount Type is required *' })}
                >
                  <option value="">--- Choose ---</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Flat_Amount">Flat Amount</option>
                </select>
                {errorsAdd.discountType && (
                  <p className="font12 text-danger">{errorsAdd.discountType.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="amountAdd" className="form-label font14">
                  Amount <span className="text-danger">*</span>
                </label>
                <input
                  id="amountAdd"
                  type="number"
                  className={`form-control font14 ${errorsAdd.amount ? 'border-danger' : ''} `}
                  placeholder="Enter Discount Value"
                  {...registerAdd('amount', {
                    required: 'Discount Value is required *',
                    min: { value: 0, message: 'Discount Value cannot be negative' }
                  })}
                />
                {errorsAdd.amount && <p className="font12 text-danger">{errorsAdd.amount.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionAdd" className="form-label font14">
                  Description
                </label>
                <input
                  id="descriptionAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.description ? 'border-danger' : ''} `}
                  placeholder="Enter Description"
                  {...registerAdd('description', {
                    validate: (value) =>
                      !value ||
                      ((/^[A-Z]/.test(value) || 'Description must start with an uppercase letter') &&
                        (value.length >= 4 || 'Minimum Length is 4') &&
                        (/^[a-zA-Z\s'-]+$/.test(value) || 'Invalid Characters in Description')),
                  })}
                />
                {errorsAdd.description && (
                  <p className="font12 text-danger">{errorsAdd.description.message}</p>
                )}
              </div>
              <p className="text-center p-3">
                <button
                  className="btn addButtons2 font14 text-white me-2"
                  type="submit"
                  disabled={!isValidAdd}
                >
                  Add Fee Discount
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

        {/* Edit Fee Discount */}
        <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="editFeeDiscount" aria-labelledby="editFeeDiscountLabel">
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
            <h2 className="offcanvas-title" id="editFeeDiscountLabel">
              Edit Fees Discount
            </h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitUpdate(updateFeeDiscount)}>
              <div className="mb-3">
                <label htmlFor="titleEdit" className="form-label font14">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  id="titleEdit"
                  type="text"
                  className={`form-control font14 ${errorsUpdate.title ? 'border-danger' : ''} `}
                  placeholder="Enter Discount Name"
                  {...registerUpdate('title', {
                    required: 'Discount Name is required *',
                    validate: {
                      startsWithUppercase: (value) =>
                        /^[A-Z]/.test(value) || 'Discount Name must start with an uppercase letter',
                      minLength: (value) => value.length >= 4 || 'Minimum Length is 4',
                      validChars: (value) =>
                        /^[a-zA-Z\s'-]+$/.test(value) || 'Invalid Characters in Discount Name',
                    },
                  })}
                />
                {errorsUpdate.title && <p className="font12 text-danger">{errorsUpdate.title.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="discountTypeEdit" className="form-label font14">
                  Discount Type <span className="text-danger">*</span>
                </label>
                <select
                  id="discountTypeEdit"
                  className={`form-select font14 ${errorsUpdate.discountType ? 'border-danger' : ''} `}
                  {...registerUpdate('discountType', { required: 'Discount Type is required *' })}
                >
                  <option value="">--- Choose ---</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Flat_Amount">Flat Amount</option>
                </select>
                {errorsUpdate.discountType && (
                  <p className="font12 text-danger">{errorsUpdate.discountType.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="amountEdit" className="form-label font14">
                  Amount <span className="text-danger">*</span>
                </label>
                <input
                  id="amountEdit"
                  type="number"
                  className={`form-control font14 ${errorsUpdate.amount ? 'border-danger' : ''} `}
                  placeholder="Enter Discount Value"
                  {...registerUpdate('amount', {
                    required: 'Discount Value is required *',
                    min: { value: 0, message: 'Discount Value cannot be negative' },
                  })}
                />
                {errorsUpdate.amount && <p className="font12 text-danger">{errorsUpdate.amount.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionEdit" className="form-label font14">
                  Description
                </label>
                <input
                  id="descriptionEdit"
                  type="text"
                  className={`form-control font14 ${errorsUpdate.description ? 'border-danger' : ''} `}
                  placeholder="Enter Description"
                  {...registerUpdate('description', {
                    validate: (value) =>
                      !value ||
                      ((/^[A-Z]/.test(value) || 'Description must start with an uppercase letter') &&
                        (value.length >= 4 || 'Minimum Length is 4') &&
                        (/^[a-zA-Z\s'-]+$/.test(value) || 'Invalid Characters in Description')),
                  })}
                />
                {errorsUpdate.description && (
                  <p className="font12 text-danger">{errorsUpdate.description.message}</p>
                )}
              </div>
              <p className="text-center p-3">
                <button
                  className="btn addButtons3 font14 text-white me-2"
                  type="submit"
                  disabled={!isValidUpdate}
                >
                  Update Fee Discount
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

        {/* Delete Fee Discount */}
        <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="deleteFeeDiscount" aria-labelledby="deleteFeeDiscountLabel">
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
            <h2 className="offcanvas-title" id="deleteFeeDiscountLabel">
              Delete Fees Discount
            </h2>
          </div>
          <div className="offcanvas-body p-3">
            <div>
              <p className="text-center p-3">
                <img src="/images/errorI.svg" className="img-fluid" alt="Error" />
              </p>
              <p className="text-center warningHeading">Are you Sure?</p>
              <p className="text-center greyText warningText pt-2">
                This Action will permanently delete<br />the Profile Data
              </p>
              <p className="text-center warningText p-2">
                <input
                  className="form-check-input formdltcheck me-2"
                  type="checkbox"
                  checked={isChecked}
                  id="flexCheckChecked"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                I Agree to delete the Profile Data
              </p>
              <p className="text-center p-3">
                <button
                  className="btn deleteButtons text-white"
                  disabled={!isChecked}
                  onClick={() => deleteFeeDiscountById(delFeeDiscountId)}
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

export default FeesDiscount;





