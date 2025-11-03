import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import * as bootstrap from 'bootstrap';
import styled from 'styled-components';
import DataLoader from 'src/Layouts/Loader';
import {
  Conatct_Deduction_getById,
  Conatct_Deduction_PutApi,
  getAllHRDeductionName,
  AssignDeductionToStaff,
  getAllHRDeductionByStaffID,
  DeleteItemAssignDeductionToStaff,
} from '../../../Utils/Apis';
import { MyUseContext } from '../ContextApi/UseContext';
import Deduction from './DeductionsModal';

// Styled components (consolidated from inline styles)
const StyledContainer = styled.div`
  .form-check-input:checked {
    background-color: #008479 !important;
    border-color: #008479 !important;
  }
  .form-container {
    background: linear-gradient(145deg, #ffffff 0%, #e6f4f1 100%);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 6px 20px rgba(0, 132, 121, 0.1);
    transition: all 0.3s ease;
    animation: slideIn 0.5s ease-out;
  }
  .form-container:hover {
    box-shadow: 0 8px 24px rgba(0, 132, 121, 0.15);
  }
  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .form-control, .form-select {
    border-radius: 8px;
    font-size: 14px;
    padding: 10px;
    transition: all 0.3s ease;
    border: 1px solid #ced4da;
    background: #f8fafc;
  }
  .form-control:hover, .form-select:hover {
    border-color: #008479;
    background: #fff;
  }
  .form-control:focus, .form-select:focus {
    border-color: #008479;
    box-shadow: 0 0 0 0.2rem rgba(0, 132, 121, 0.25);
    outline: none;
    background: #fff;
  }
  .form-label {
    font-weight: 600;
    color: #1a3c34;
    margin-bottom: 5px;
    position: relative;
    display: inline-block;
  }
  .form-label:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: #008479;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10;
    opacity: 0;
    animation: fadeIn 0.2s ease forwards;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  .my-green {
    background: linear-gradient(135deg, #008479 0%, #006b63 100%) !important;
    border: none !important;
    color: #fff !important;
    padding: 10px 20px;
    border-radius: 8px;
    transition: transform 0.2s ease, background 0.3s ease;
  }
  .my-green:hover {
    background: linear-gradient(135deg, #006b63 0%, #005a50 100%) !important;
    transform: scale(1.05);
  }
  .my-green:disabled {
    background: #b0b0b0 !important;
    cursor: not-allowed;
    transform: none;
  }
  .btn-outline-success {
    border-color: #008479;
    color: #008479;
    padding: 7px 14px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  .btn-outline-success:hover {
    background: linear-gradient(135deg, #008479 0%, #006b63 100%);
    color: #fff;
    transform: scale(1.05);
  }
  .error-message {
    font-size: 12px;
    color: #B50000;
    margin-top: 3px;
    min-height: 16px;
    animation: fadeIn 0.3s ease;
  }
  .valid-indicator::after {
    content: '✔';
    color: #008479;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
  }
  .form-group {
    margin-bottom: 0.4rem;
    position: relative;
  }
  .row-margin {
    margin-bottom: 0.5rem;
  }
  .buttons-tops {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .loader {
    border: 2px solid #fff;
    border-top: 2px solid #008479;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    display: inline-block;
    margin-left: 10px;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .table-container {
    margin-top: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 132, 121, 0.1);
    overflow-x: auto;
  }
  .table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }
  .table thead {
    background: linear-gradient(135deg, #008479 0%, #006b63 100%);
    color: #fff;
  }
  .table th {
    padding: 12px;
    font-weight: 600;
    text-align: left;
    font-size: 14px;
  }
  .table td {
    padding: 12px;
    font-size: 14px;
    color: #1a3c34;
    border-bottom: 1px solid #e9ecef;
  }
  .table tbody tr:nth-child(even) {
    background: #f8fafc;
  }
  .table tbody tr:hover {
    background: #e6f4f1;
    transition: background 0.3s ease;
  }

  .formdltcheck:checked {
    background-color: #b50000 !important;
    border-color: #b50000 !important;
  }
  .action-btn {
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 6px;
    transition: all 0.3s ease;
  }
  .action-btn.edit {
    background: #008479;
    color: #fff;
    border: none;
  }
  .action-btn.delete {
    background: #B50000;
    color: #fff;
    border: none;
  }
  .action-btn:hover {
    transform: scale(1.05);
  }
  .offcanvas {
    background: #f8fafc;
    border-radius: 0 16px 16px 0;
  }
  .offcanvas-header {
    /* background: linear-gradient(135deg, #008479 0%, #006b63 100%);
    color: #fff; */
    padding: 16px;
  }
  .offcanvas-title {
    font-size: 16px;
    font-weight: 600;
  }
  .offcanvas-body {
    padding: 24px;
  }
`;

const Conta_deduction = () => {
  const { roleId, userId } = useParams();
  // const { userId } = useContext(MyUseContext);

  const [loaderState, setLoaderState] = useState(false);
  const [deductionData, setDeductionData] = useState([]);
  const [delDeductionId, setDelDeductionId] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [staffDeductionData, setStaffDeductionData] = useState([]);
  const [editDeduction, setEditDeduction] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Form hooks for Add and Edit forms
  const {
    control: addControl,
    handleSubmit: handleAddSubmit,
    reset: resetAddForm,
    formState: { errors: addErrors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      deductionNameId: '',
      amount: '',
      deductionOption: '',
    },
  });

  useEffect(() => {
    const handleDeductionAdded = () => {
      getAllDeductionName(); // Refresh dropdown
    };

    window.addEventListener('deductionAdded', handleDeductionAdded);

    return () => {
      window.removeEventListener('deductionAdded', handleDeductionAdded);
    };
  }, [pageNo, pageSize]);

  const {
    control: editControl,
    handleSubmit: handleEditSubmit,
    reset: resetEditForm,
    formState: { errors: editErrors },
    setValue: setEditValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      deductionNameId: '',
      amount: '',
      deductionOption: '',
    },
  });

  // Initialize Bootstrap offcanvas
  useEffect(() => {
    const offcanvasElement = document.getElementById('editDeductionOffcanvas');
    if (offcanvasElement) {
      const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
      offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
        resetEditForm();
        setEditDeduction(null);
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) backdrop.remove();
      });
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    if (userId) {
      getAllDeductionName();
      getAllDeductionNameByStaffId();
    } else {
      toast.error('User ID not found');
      // Optionally redirect: navigate('/');
    }
  }, [userId, pageNo]);

  // Fetch all deduction names for dropdown
  const getAllDeductionName = async () => {
    try {
      setLoaderState(true);
      const response = await getAllHRDeductionName('', pageNo, pageSize);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setDeductionData(response.data.deductionNames || []);
        // setTotalPages(response.data.totalPages || 1);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch deductions');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        sessionStorage.removeItem('token');
        // navigate('/');
      }
      toast.error('Error fetching deductions');
    } finally {
      setLoaderState(false);
    }
  };

  // Fetch staff-specific deductions
  const getAllDeductionNameByStaffId = async () => {
    try {
      setLoaderState(true);
      const response = await getAllHRDeductionByStaffID(userId);
      console.log(response)
      if (response?.status === 200 && response?.data?.status === 'success') {
        setStaffDeductionData(response.data.statutory || []);
        setTotalPages(response.data.totalPages || 1);
        console.log(response.data.statutory, 'deductiondata')
      } else {
        // toast.error(response?.data?.message || 'Failed to fetch staff deductions');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        sessionStorage.removeItem('token');
        // navigate('/');
      }
      toast.error('Error fetching staff deductions');
    } finally {
      setLoaderState(false);
    }
  };

  // Add new deduction
  const handleAddDeduction = async (data) => {
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append('deductionNameId', data.deductionNameId);
      formData.append('deductionOption', data.deductionOption);
      formData.append('deductionValueType', data.deductionType);
      formData.append('amount', data.amount);

      console.log('Adding deduction with FormData:', Object.fromEntries(formData)); // Debug log

      const response = await AssignDeductionToStaff(userId, formData);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success(response.data.message);
        resetAddForm();
        getAllDeductionNameByStaffId();
      } else {
        toast.error(response?.data?.message || 'Failed to add deduction');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error adding deduction');
    } finally {
      setLoaderState(false);
    }
  };

  // Edit deduction
  const handleEdit = (item) => {
    console.log('Editing item:', item); // Debug log
    setEditDeduction(item);
    setEditValue('deductionNameId', item.deductionNameId || item.statutoryDeductionId || '');
    setEditValue('amount', item.amount || '');
    setEditValue('deductionOption', item.deductionOption || '');
    const offcanvasElement = document.getElementById('editDeductionOffcanvas');
    if (offcanvasElement) {
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.show();
    }
  };

  // Update deduction
  const handleUpdateDeduction = async (data) => {
    if (!editDeduction) {
      toast.error('No deduction selected for update');
      return;
    }
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append('deductionNameId', data.deductionNameId);
      formData.append('deductionOption', data.deductionOption);
      formData.append('deductionValueType', data.deductionType);
      formData.append('amount', data.amount);

      console.log('Updating deduction with ID:', editDeduction.statutoryDeductionId || editDeduction.id); // Debug log
      console.log('FormData:', Object.fromEntries(formData)); // Debug log

      const response = await Conatct_Deduction_PutApi(userId, formData);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success(response.data.message);
        getAllDeductionNameByStaffId();
        const offcanvasElement = document.getElementById('editDeductionOffcanvas');
        if (offcanvasElement) {
          const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
          offcanvas.hide();
        }
        offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
          const backdrop = document.querySelector('.offcanvas-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }, { once: true });
      } else {
        toast.error(response?.data?.message || 'Failed to update deduction');
      }
    } catch (error) {
      console.error('Update error:', error.response?.data); // Debug log
      toast.error(error?.response?.data?.message || 'Error updating deduction');
    } finally {
      setLoaderState(false);
    }
  };

  // Delete deduction
  const handleDelete = async (ids) => {
    try {
      setLoaderState(true);
      const response = await DeleteItemAssignDeductionToStaff(userId, ids);
      if (response?.data?.status === 'success') {
        toast.success('Deduction deleted successfully');
        getAllDeductionNameByStaffId();
        setIsChecked(false)
        const offcanvasElement = document.getElementById('deleteFeeDiscount');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
        offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
          const backdrop = document.querySelector('.offcanvas-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }, { once: true });
      } else {
        toast.error(response?.data?.message || 'Failed to delete deduction');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error deleting deduction');
    } finally {
      setLoaderState(false);
    }
  };
  const [showAddModal, setShowAddModal] = useState(false);
  return (
    <StyledContainer className="container-fluid">
      {loaderState && <DataLoader />}
      <div className="form-container">
        <p className="heading-16 mb-3" style={{ color: '#1a3c34', fontWeight: '700' }}>
          Add Deduction
        </p>
        <form onSubmit={handleAddSubmit(handleAddDeduction)}>
          <div className="row px-1 row-margin">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="deduction"
                  className="form-label font14 label-color"
                  data-tooltip="Select deduction name"
                  aria-label="Deduction Name"
                >
                  Deduction Name <span style={{ color: '#B50000' }}>*</span>
                </label>
                <Controller
                  name="deductionNameId"
                  control={addControl}
                  rules={{
                    required: 'Deduction name is required',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Please select a valid deduction',
                    },
                  }}
                  render={({ field }) => (
                    <select
                      className={`form-select form-select-sm form-focus label-color ${addErrors.deductionNameId ? 'border-danger' : ''}`}
                      id="deduction"
                      {...field}
                      aria-describedby="deductionError"
                    >
                      <option value="">--Choose--</option>
                      {deductionData.length > 0
                        ?
                        (
                          <>
                            {deductionData?.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.deductionName}
                              </option>
                            ))}
                          </>
                        )
                        :
                        <option value="no" disabled>-- No Deduction Created Yet --</option>
                      }
                    </select>
                  )}
                />
                <button
                  type="button"
                  className="blueText font12 mt-2 text-decoration-underline cursorPointer border-0 bg-transparent p-0"
                  onClick={() => setShowAddModal(true)}
                >
                  + Add Deduction
                </button>
                {addErrors.deductionNameId && (
                  <div id="deductionError" className="error-message">
                    {addErrors.deductionNameId.message}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="deductionType"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select deduction type"
                  aria-label="Deduction Type"
                >
                  Deduction Type <span style={{ color: '#B50000' }}>*</span>
                </label>
                <Controller
                  name="deductionType"
                  control={addControl}
                  rules={{ required: 'Deduction type is required' }}
                  render={({ field }) => (
                    <select
                      className={`form-select form-select-sm form-focus label-color ${addErrors.deductionType ? 'border-danger' : ''}`}
                      id="deductionType"
                      {...field}
                      aria-describedby="deductionTypeError"
                    >
                      <option value="">--Choose--</option>
                      <option value="PERCENT">Percent</option>
                      <option value="FLAT">Flat</option>
                    </select>
                  )}
                />
                {addErrors.deductionType && (
                  <div id="deductionTypeError" className="error-message">
                    {addErrors.deductionType.message}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="amount"
                  className="form-label font14 label-color"
                  data-tooltip="Enter amount (e.g., 1000.00)"
                  aria-label="Amount"
                >
                  Amount <span style={{ color: '#B50000' }}>*</span>
                </label>
                <Controller
                  name="amount"
                  control={addControl}
                  rules={{
                    required: 'Amount is required',
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: 'Enter a valid amount (e.g., 1000.00)',
                    },
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`form-control form-control-sm font14 grey-input-text-color input-border-color ${!addErrors.amount && field.value ? 'valid-indicator' : ''}`}
                      id="amount"
                      placeholder="Enter amount"
                      {...field}
                      aria-describedby="amountError"
                    />
                  )}
                />
                {addErrors.amount && (
                  <div id="amountError" className="error-message">
                    {addErrors.amount.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row px-1 row-margin">
            <div className="col-lg-8 col-md-6 col-sm-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-check">
                    <Controller
                      name="deductionOption"
                      control={addControl}
                      rules={{ required: 'Please select a deduction type' }}
                      render={({ field }) => (
                        <input
                          className="form-check-input"
                          type="radio"
                          name="applyOption"
                          id="instantApply"
                          value="INSTANT_APPLY"
                          checked={field.value === 'INSTANT_APPLY'}
                          onChange={() => field.onChange('INSTANT_APPLY')}
                        />
                      )}
                    />
                    <label className="form-check-label font14" htmlFor="instantApply">
                      Instant Apply
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-check">
                    <Controller
                      name="deductionOption"
                      control={addControl}
                      rules={{ required: 'Please select a deduction type' }}
                      render={({ field }) => (
                        <input
                          className="form-check-input"
                          type="radio"
                          name="applyOption"
                          id="nextMonthApply"
                          value="NEXT_MONTH_APPLY"
                          checked={field.value === 'NEXT_MONTH_APPLY'}
                          onChange={() => field.onChange('NEXT_MONTH_APPLY')}
                        />
                      )}
                    />
                    <label className="form-check-label font14" htmlFor="nextMonthApply">
                      Next Month Apply
                    </label>
                  </div>
                </div>
                {addErrors.deductionOption && (
                  <div className="error-message">
                    {addErrors.deductionOption.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row buttons-tops text-center">
            <div className="my-button11 font14">
              <button
                type="submit"
                className="btn btn-outline-success my-green font14 me-1"
                disabled={loaderState}
                aria-label="Add Deduction"
              >
                {loaderState ? (
                  <>
                    <span>Loading</span>
                    <span className="loader"></span>
                  </>
                ) : (
                  'Add Deduction'
                )}
              </button>
              <button
                type="button"
                className="btn cancelButtons font14"
                onClick={() => resetAddForm()}
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="table-container mt-4">
        {staffDeductionData.length > 0 ? (
          <table className="table" aria-label="Deduction List">
            <thead>
              <tr>
                <th scope="col">Deduction Name</th>
                <th scope="col">Deduction Type</th>
                <th scope="col">Amount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {staffDeductionData.map((item, index) => (
                <tr key={item.statutoryDeductionId || item.id}>
                  <td>{item.title || 'N/A'}</td>
                  <td>{item.deductionOption}</td>
                  <td>{item.amount}</td>
                  <td>
                    <button
                      className="action-btn edit me-2"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#editDeductionOffcanvas"
                      aria-controls="editDeductionOffcanvas"
                      onClick={() => handleEdit(item)}
                      tabIndex={7 + index * 2}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete btn text-white text-decoration-none"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#deleteFeeDiscount"
                      aria-controls="deleteFeeDiscount"
                      onClick={() => setDelDeductionId(item.statutoryDeductionId)} //delDeductionId
                    >
                      {/* <Icon icon="mi:delete" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} /> */}
                      Delete
                    </button>
                    {/* <button
                      className="action-btn delete"
                      onClick={() => handleDelete(item.statutoryDeductionId || item.id)}
                      aria-label={`Delete deduction ${item.deductionName || 'N/A'}`}
                      tabIndex={8 + index * 2}
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="d-flex justify-content-center p-5">
            <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className='img-fluid' />
          </div>
        )}
      </div>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="editDeductionOffcanvas"
        aria-labelledby="editDeductionOffcanvasLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title font14" id="editDeductionOffcanvasLabel">
            Edit Deduction
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            onClick={() => {
              resetEditForm();
              setEditDeduction(null);
            }}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleEditSubmit(handleUpdateDeduction)}>
            <div className="form-group mb-3">
              <label
                htmlFor="editDeduction"
                className="form-label font14 label-color"
                data-tooltip="Select deduction name"
                aria-label="Deduction Name"
              >
                Deduction Name <span style={{ color: '#B50000' }}>*</span>
              </label>
              <Controller
                name="deductionNameId"
                control={editControl}
                rules={{
                  required: 'Deduction name is required',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Please select a valid deduction',
                  },
                }}
                render={({ field }) => (
                  <select
                    className={`form-select form-select-sm form-focus label-color ${editErrors.deductionNameId ? 'border-danger' : ''}`}
                    id="editDeduction"
                    {...field}
                    aria-describedby="editDeductionError"
                  >
                    <option value="">--Choose--</option>
                    {deductionData.length > 0 ? (
                      deductionData.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.deductionName}
                        </option>
                      ))
                    ) : (
                      <option disabled>No deductions found</option>
                    )}
                  </select>
                )}
              />
              {editErrors.deductionNameId && (
                <div id="editDeductionError" className="error-message">
                  {editErrors.deductionNameId.message}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label
                htmlFor="editDeductionType"
                className="form-label heading-14 label-color"
                data-tooltip="Select deduction type"
                aria-label="Deduction Type"
              >
                Deduction Type <span style={{ color: '#B50000' }}>*</span>
              </label>
              <Controller
                name="deductionType"
                control={editControl}
                rules={{ required: 'Deduction type is required' }}
                render={({ field }) => (
                  <select
                    className={`form-select form-select-sm form-focus label-color ${editErrors.deductionType ? 'border-danger' : ''}`}
                    id="editDeductionType"
                    {...field}
                    aria-describedby="editDeductionTypeError"
                  >
                    <option value="">--Choose--</option>
                    <option value="PERCENT">Percent</option>
                    <option value="FLAT">Flat</option>
                  </select>
                )}
              />
              {editErrors.deductionType && (
                <div id="editDeductionTypeError" className="error-message">
                  {editErrors.deductionType.message}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label
                htmlFor="editAmount"
                className="form-label font14 label-color"
                data-tooltip="Enter amount (e.g., 1000.00)"
                aria-label="Amount"
              >
                Amount <span style={{ color: '#B50000' }}>*</span>
              </label>
              <Controller
                name="amount"
                control={editControl}
                rules={{
                  required: 'Amount is required',
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Enter a valid amount (e.g., 1000.00)',
                  },
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    className={`form-control form-control-sm font14 grey-input-text-color input-border-color ${!editErrors.amount && field.value ? 'valid-indicator' : ''}`}
                    id="editAmount"
                    placeholder="Enter amount"
                    {...field}
                    aria-describedby="editAmountError"
                  />
                )}
              />
              {editErrors.amount && (
                <div id="editAmountError" className="error-message">
                  {editErrors.amount.message}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <div className="row">
                <div className="col-6">
                  <div className="form-check">
                    <Controller
                      name="deductionOption"
                      control={editControl}
                      rules={{ required: 'Please select a deduction type' }}
                      render={({ field }) => (
                        <input
                          className="form-check-input"
                          type="radio"
                          name="editApplyOption"
                          id="editInstantApply"
                          value="INSTANT_APPLY"
                          checked={field.value === 'INSTANT_APPLY'}
                          onChange={() => field.onChange('INSTANT_APPLY')}
                        />
                      )}
                    />
                    <label className="form-check-label font14" htmlFor="editInstantApply">
                      Instant Apply
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-check">
                    <Controller
                      name="deductionOption"
                      control={editControl}
                      rules={{ required: 'Please select a deduction type' }}
                      render={({ field }) => (
                        <input
                          className="form-check-input"
                          type="radio"
                          name="editApplyOption"
                          id="editNextMonthApply"
                          value="NEXT_MONTH_APPLY"
                          checked={field.value === 'NEXT_MONTH_APPLY'}
                          onChange={() => field.onChange('NEXT_MONTH_APPLY')}
                        />
                      )}
                    />
                    <label className="form-check-label font14" htmlFor="editNextMonthApply">
                      Next Month Apply
                    </label>
                  </div>
                </div>
                {editErrors.deductionOption && (
                  <div className="error-message">
                    {editErrors.deductionOption.message}
                  </div>
                )}
              </div>
            </div>
            <div className="buttons-tops text-center">
              <button
                type="submit"
                className="btn btn-outline-success my-green font14 me-1"
                disabled={loaderState}
                aria-label="Update Deduction"
              >
                {loaderState ? (
                  <>
                    <span>Loading</span>
                    <span className="loader"></span>
                  </>
                ) : (
                  'Update Deduction'
                )}
              </button>
              <button
                type="button"
                className="btn cancelButtons font14"
                data-bs-dismiss="offcanvas"
                onClick={() => {
                  resetEditForm();
                  setEditDeduction(null);
                }}
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Deduction */}
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
            Delete Deduction
          </h2>
        </div>
        <div className="offcanvas-body p-3">
          <div>
            <p className="text-center p-3">
              <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/errorI.svg" className="img-fluid" alt="Error" />
            </p>
            <p className="text-center warningHeading">Are you Sure?</p>
            <p className="text-center greyText warningText pt-2">
              This Action will permanently delete<br />the Deduction
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
                onClick={() => handleDelete(delDeductionId)}
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

      {showAddModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title font16 fw-bold">Add Deduction</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <Deduction onSuccess={() => setShowAddModal(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </StyledContainer>
  );
};

export default Conta_deduction;
