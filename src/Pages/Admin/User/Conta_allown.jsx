import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import * as bootstrap from 'bootstrap';
import styled from 'styled-components';
import DataLoader from 'src/Layouts/Loader';
import {
  Conatct_allowance_getById,
  Conatct_allowance_PutApi,
  getAllHRAllowanceName,
  AssignAllowanceToStaff,
  getAllHRAllowanceByStaffID,
  DeleteItemAssignAllowanceToStaff,
} from '../../../Utils/Apis';
import { MyUseContext } from '../ContextApi/UseContext';

// Styled components for CSS (unchanged)
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
  .formdltcheck:checked {
    background-color: #b50000 !important;
    border-color: #b50000 !important;
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

const Conta_allown = () => {
  const { roleId, userId } = useParams();
  const myUserID = userId ?? roleId ?? '';

  const [loaderState, setLoaderState] = useState(false);
  const [allowanceData, setAllowanceData] = useState([]);
  const [delAllowanceId, setDelAllowanceId] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [staffAllowanceData, setStaffAllowanceData] = useState([]);
  const [editAllowance, setEditAllowance] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Form hooks for Add and Edit forms
  const {
    control: addControl,
    handleSubmit: handleAddSubmit,
    reset: resetAddForm,
    formState: { errors: addErrors },
    setValue: setAddValue,
    watch: watchAddForm,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      allowanceNameId: '',
      allowanceType: '',
      percentage: '',
      amount: '',
      amountOption: '',
    },
  });

  const {
    control: editControl,
    handleSubmit: handleEditSubmit,
    reset: resetEditForm,
    formState: { errors: editErrors },
    setValue: setEditValue,
    watch: watchEditForm,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      allowanceNameId: '',
      allowanceType: '',
      percentage: '',
      amount: '',
      amountOption: '',
    },
  });

  // Watch form fields to enable/disable inputs
  const addAllowanceType = watchAddForm('allowanceType');
  const editAllowanceType = watchEditForm('allowanceType');

  // Reset percentage and amount when allowance type changes
  useEffect(() => {
    if (addAllowanceType === 'PERCENTAGE') {
      setAddValue('amount', '0');
      setAddValue('percentage', '');
    } else if (addAllowanceType === 'AMOUNT') {
      setAddValue('percentage', '0');
      setAddValue('amount', '');
    } else {
      setAddValue('percentage', '');
      setAddValue('amount', '');
    }
  }, [addAllowanceType, setAddValue]);

  useEffect(() => {
    if (editAllowanceType === 'PERCENTAGE') {
      setEditValue('amount', '0');
      setEditValue('percentage', editAllowance?.percentage || '');
    } else if (editAllowanceType === 'AMOUNT') {
      setEditValue('percentage', '0');
      setEditValue('amount', editAllowance?.amount || '');
    } else {
      setEditValue('percentage', '');
      setEditValue('amount', '');
    }
  }, [editAllowanceType, setEditValue, editAllowance]);

  // Initialize Bootstrap offcanvas
  useEffect(() => {
    const offcanvasElement = document.getElementById('editAllowanceOffcanvas');
    if (offcanvasElement) {
      const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
      offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
        resetEditForm();
        setEditAllowance(null);
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) backdrop.remove();
      });
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    if (myUserID) {
      getAllAllowanceName();
      getAllAllowanceNameByStaffId();
    }
  }, [myUserID, pageNo]);

  // Fetch all allowance names for dropdown
  const getAllAllowanceName = async () => {
    try {
      setLoaderState(true);
      const response = await getAllHRAllowanceName('', pageNo, pageSize);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setAllowanceData(response.data.allowanceNames || []);
        setTotalPages(response.data.totalPages || 1);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch allowances');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        sessionStorage.removeItem('token');
      }
      toast.error('Error fetching allowances');
    } finally {
      setLoaderState(false);
    }
  };

  // Fetch staff-specific allowances
  const getAllAllowanceNameByStaffId = async () => {
    try {
      setLoaderState(true);
      const response = await getAllHRAllowanceByStaffID(myUserID);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setStaffAllowanceData(response.data.allowance || []);
        setTotalPages(response.data.totalPages || 1);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch staff allowances');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        sessionStorage.removeItem('token');
      }
      toast.error('Error fetching staff allowances');
    } finally {
      setLoaderState(false);
    }
  };

  // Add new allowance
  const handleAddAllowance = async (data) => {
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append('allowanceNameId', data.allowanceNameId);
      formData.append('allowanceValueType', data.allowanceType);
      if (data.allowanceType === 'PERCENTAGE') {
        formData.append('amount', data.percentage);
      }
      else {
        formData.append('amount', data.amount);
      }
      formData.append('allowanceType', data.amountOption);

      const response = await AssignAllowanceToStaff(myUserID, formData);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success(response.data.message);
        resetAddForm();
        getAllAllowanceNameByStaffId();
      } else {
        toast.error(response?.data?.message || 'Failed to add allowance');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error adding allowance');
    } finally {
      setLoaderState(false);
    }
  };

  // Edit allowance
  const handleEdit = (item) => {
    console.log("Editing allowance:", item);
    setEditAllowance(item);

    setEditValue('allowanceNameId', item.allowanceNameId || '', { shouldValidate: true });
    setEditValue('allowanceType', item.amount ? 'AMOUNT' : 'PERCENTAGE', { shouldValidate: true });
    setEditValue('percentage', item.amount || '', { shouldValidate: true });
    setEditValue('amount', item.amount || '', { shouldValidate: true });
    setEditValue('amountOption', item.allowanceType || '', { shouldValidate: true });

    const offcanvasElement = document.getElementById('editAllowanceOffcanvas');
    if (offcanvasElement) {
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.show();
    }
  };




  // Update allowance
  const handleUpdateAllowance = async (data) => {
    if (!editAllowance) {
      toast.error('No allowance selected for update');
      return;
    }
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append('allowanceNameId', data.allowanceNameId);
      formData.append('allowanceValueType', data.allowanceType);
      if (data.allowanceType === 'PERCENTAGE'){
        formData.append('amount', data.percentage);
      }
      else{
        formData.append('amount', data.amount);
      }
      formData.append('allowanceType', data.amountOption);

      const response = await Conatct_allowance_PutApi(editAllowance.staffId || editAllowance.id, formData);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success(response.data.message);
        getAllAllowanceNameByStaffId();
        const offcanvasElement = document.getElementById('editAllowanceOffcanvas');
        if (offcanvasElement) {
          const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
          offcanvas.hide();
        }
        resetEditForm();
        setEditAllowance(null);
      } else {
        toast.error(response?.data?.message || 'Failed to update allowance');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error updating allowance');
    } finally {
      setLoaderState(false);
    }
  };

  // Delete allowance
  const handleDelete = async (ids) => {
    try {
      setLoaderState(true);
      const response = await DeleteItemAssignAllowanceToStaff(myUserID, ids);
      if (response?.data?.status === 'success') {
        toast.success('Allowance deleted successfully');
        getAllAllowanceNameByStaffId();
        setIsChecked(false);
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
        toast.error(response?.data?.message || 'Failed to delete allowance');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error deleting allowance');
    } finally {
      setLoaderState(false);
    }
  };

  return (
    <StyledContainer className="container-fluid">
      {loaderState && <DataLoader />}
      <div className="form-container">
        <p className="heading-16 mb-3" style={{ color: '#1a3c34', fontWeight: '700' }}>
          Add Allowance
        </p>
        <form onSubmit={handleAddSubmit(handleAddAllowance)}>
          <div className="row px-1 row-margin">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="allowance"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select allowance name"
                  aria-label="Allowance Name"
                >
                  Allowance Name <span style={{ color: '#B50000' }}>*</span>
                </label>
                <Controller
                  name="allowanceNameId"
                  control={addControl}
                  rules={{
                    required: 'Allowance name is required',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Please select a valid allowance',
                    },
                  }}
                  render={({ field }) => (
                    <select
                      className={`form-select form-select-sm form-focus label-color ${addErrors.allowanceNameId ? 'border-danger' : ''}`}
                      id="allowance"
                      {...field}
                      aria-describedby="allowanceError"
                    >
                      <option value="">--Choose--</option>
                      {allowanceData.length > 0 ? (
                        allowanceData.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.allowanceName}
                          </option>
                        ))
                      ) : (
                        <option value="no" disabled>-- No Allowance Created Yet --</option>
                      )}
                    </select>
                  )}
                />
                {addErrors.allowanceNameId && (
                  <div id="allowanceError" className="error-message">
                    {addErrors.allowanceNameId.message}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="allowanceType"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select allowance type"
                  aria-label="Allowance Type"
                >
                  Allowance Type <span style={{ color: '#B50000' }}>*</span>
                </label>
                <Controller
                  name="allowanceType"
                  control={addControl}
                  rules={{ required: 'Allowance type is required' }}
                  render={({ field }) => (
                    <select
                      className={`form-select form-select-sm form-focus label-color ${addErrors.allowanceType ? 'border-danger' : ''}`}
                      id="allowanceType"
                      {...field}
                      aria-describedby="allowanceTypeError"
                    >
                      <option value="">--Choose--</option>
                      <option value="PERCENTAGE">Percentage</option>
                      <option value="FLAT">Flat</option>
                    </select>
                  )}
                />
                {addErrors.allowanceType && (
                  <div id="allowanceTypeError" className="error-message">
                    {addErrors.allowanceType.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row px-1 row-margin">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="percentage"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter percentage (e.g., 10.00)"
                  aria-label="Percentage"
                >
                  Percentage <span style={{ color: '#B50000' }}>*</span>
                </label>
                <Controller
                  name="percentage"
                  control={addControl}
                  rules={{
                    required: addAllowanceType === 'PERCENTAGE' ? 'Percentage is required' : false,
                    pattern: addAllowanceType === 'PERCENTAGE' ? {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: 'Enter a valid percentage (e.g., 10.00)',
                    } : undefined,
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${!addErrors.percentage && field.value && addAllowanceType === 'PERCENTAGE' ? 'valid-indicator' : ''}`}
                      id="percentage"
                      placeholder="Enter percentage"
                      disabled={addAllowanceType !== 'PERCENTAGE'}
                      {...field}
                      aria-describedby="percentageError"
                    />
                  )}
                />
                {addErrors.percentage && (
                  <div id="percentageError" className="error-message">
                    {addErrors.percentage.message}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="amount"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter amount (e.g., 1000.00)"
                  aria-label="Amount"
                >
                  Amount <span style={{ color: '#B50000' }}>*</span>
                </label>
                <Controller
                  name="amount"
                  control={addControl}
                  rules={{
                    required: addAllowanceType === 'AMOUNT' ? 'Amount is required' : false,
                    pattern: addAllowanceType === 'AMOUNT' ? {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: 'Enter a valid amount (e.g., 1000.00)',
                    } : undefined,
                  }}
                  render={({ field }) => (
                    <input
                      type="text"
                      className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${!addErrors.amount && field.value && addAllowanceType === 'AMOUNT' ? 'valid-indicator' : ''}`}
                      id="amount"
                      placeholder="Enter amount"
                      disabled={addAllowanceType !== 'AMOUNT'}
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
            <div className="col-lg-12 col-md-6 col-sm-12">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="form-check">
                    <Controller
                      name="amountOption"
                      control={addControl}
                      rules={{ required: 'Please select an allowance type' }}
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
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="form-check">
                    <Controller
                      name="amountOption"
                      control={addControl}
                      rules={{ required: 'Please select an allowance type' }}
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
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="form-check">
                    <Controller
                      name="amountOption"
                      control={addControl}
                      rules={{ required: 'Please select an allowance type' }}
                      render={({ field }) => (
                        <input
                          className="form-check-input"
                          type="radio"
                          name="applyOption"
                          id="alreadyApplied"
                          value="ALREADY_APPLIED"
                          checked={field.value === 'ALREADY_APPLIED'}
                          onChange={() => field.onChange('ALREADY_APPLIED')}
                        />
                      )}
                    />
                    <label className="form-check-label font14" htmlFor="alreadyApplied">
                      Already Applied
                    </label>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="form-check">
                    <Controller
                      name="amountOption"
                      control={addControl}
                      rules={{ required: 'Please select an allowance type' }}
                      render={({ field }) => (
                        <input
                          className="form-check-input"
                          type="radio"
                          name="applyOption"
                          id="annual"
                          value="ANNUAL"
                          checked={field.value === 'ANNUAL'}
                          onChange={() => field.onChange('ANNUAL')}
                        />
                      )}
                    />
                    <label className="form-check-label font14" htmlFor="annual">
                      Annual
                    </label>
                  </div>
                </div>
                {addErrors.amountOption && (
                  <div className="error-message">
                    {addErrors.amountOption.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row buttons-tops text-center">
            <div className="my-button11 heading-14">
              <button
                type="submit"
                className="btn btn-outline-success my-green font14 me-1"
                disabled={loaderState}
                aria-label="Add Allowance"
              >
                {loaderState ? (
                  <>
                    <span>Loading</span>
                    <span className="loader"></span>
                  </>
                ) : (
                  'Add Allowance'
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
        {staffAllowanceData.length > 0 ? (
          <table className="table" aria-label="Allowance List">
            <thead>
              <tr>
                <th scope="col">Allowance Name</th>
                <th scope="col">Allowance Type</th>
                <th scope="col">Percentage</th>
                <th scope="col">Amount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {staffAllowanceData.map((item) => (
                <tr key={item.id}>
                  <td>{item.allowanceName}</td>
                  <td>{item.allowanceType}</td>
                  <td>{item.percentage || '0'}</td>
                  <td>{item.amount || '0'}</td>
                  <td>
                    <button
                      className="action-btn edit me-2"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#editAllowanceOffcanvas"
                      aria-controls="editAllowanceOffcanvas"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete btn text-white text-decoration-none"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#deleteFeeDiscount"
                      aria-controls="deleteFeeDiscount"
                      onClick={() => setDelAllowanceId(item.allowanceId)}
                    >
                      Delete
                    </button>
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
        id="editAllowanceOffcanvas"
        aria-labelledby="editAllowanceOffcanvasLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" id="editAllowanceOffcanvasLabel">
            Edit Allowance
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            onClick={() => {
              resetEditForm();
              setEditAllowance(null);
            }}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleEditSubmit(handleUpdateAllowance)}>
            <div className="form-group mb-3">
              <label
                htmlFor="editAllowance"
                className="form-label heading-14 label-color"
                data-tooltip="Select allowance name"
                aria-label="Allowance Name"
              >
                Allowance Name <span style={{ color: '#B50000' }}>*</span>
              </label>
              <Controller
                name="allowanceNameId"
                control={editControl}
                rules={{
                  required: 'Allowance name is required',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Please select a valid allowance',
                  },
                }}
                render={({ field }) => (
                  <select
                    className={`form-select form-select-sm form-focus label-color ${editErrors.allowanceNameId ? 'border-danger' : ''}`}
                    id="editAllowance"
                    {...field}
                    aria-describedby="editAllowanceError"
                  >
                    <option value="">--Choose--</option>
                    {allowanceData.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.allowanceName}
                      </option>
                    ))}
                  </select>
                )}
              />
              {editErrors.allowanceNameId && (
                <div id="editAllowanceError" className="error-message">
                  {editErrors.allowanceNameId.message}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label
                htmlFor="editAllowanceType"
                className="form-label heading-14 label-color"
                data-tooltip="Select allowance type"
                aria-label="Allowance Type"
              >
                Allowance Type <span style={{ color: '#B50000' }}>*</span>
              </label>
              <Controller
                name="allowanceType"
                control={editControl}
                rules={{ required: 'Allowance type is required' }}
                render={({ field }) => (
                  <select
                    className={`form-select form-select-sm form-focus label-color ${editErrors.allowanceType ? 'border-danger' : ''}`}
                    id="editAllowanceType"
                    {...field}
                    aria-describedby="editAllowanceTypeError"
                  >
                    <option value="">--Choose--</option>
                    <option value="PERCENTAGE">Percentage</option>
                    <option value="FLAT">Flat</option>
                  </select>
                )}
              />
              {editErrors.allowanceType && (
                <div id="editAllowanceTypeError" className="error-message">
                  {editErrors.allowanceType.message}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label
                htmlFor="editPercentage"
                className="form-label heading-14 label-color"
                data-tooltip="Enter percentage (e.g., 10.00)"
                aria-label="Percentage"
              >
                Percentage <span style={{ color: '#B50000' }}>*</span>
              </label>
              <Controller
                name="percentage"
                control={editControl}
                rules={{
                  required: editAllowanceType === 'PERCENTAGE' ? 'Percentage is required' : false,
                  pattern: editAllowanceType === 'PERCENTAGE' ? {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Enter a valid percentage (e.g., 10.00)',
                  } : undefined,
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${!editErrors.percentage && field.value && editAllowanceType === 'PERCENTAGE' ? 'valid-indicator' : ''}`}
                    id="editPercentage"
                    placeholder="Enter percentage"
                    disabled={editAllowanceType !== 'PERCENTAGE'}
                    {...field}
                    aria-describedby="editPercentageError"
                  />
                )}
              />
              {editErrors.percentage && (
                <div id="editPercentageError" className="error-message">
                  {editErrors.percentage.message}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label
                htmlFor="editAmount"
                className="form-label heading-14 label-color"
                data-tooltip="Enter amount (e.g., 1000.00)"
                aria-label="Amount"
              >
                Amount <span style={{ color: '#B50000' }}>*</span>
              </label>
              <Controller
                name="amount"
                control={editControl}
                rules={{
                  required: editAllowanceType === 'AMOUNT' ? 'Amount is required' : false,
                  pattern: editAllowanceType === 'AMOUNT' ? {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Enter a valid amount (e.g., 1000.00)',
                  } : undefined,
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${!editErrors.amount && field.value && editAllowanceType === 'AMOUNT' ? 'valid-indicator' : ''}`}
                    id="editAmount"
                    placeholder="Enter amount"
                    disabled={editAllowanceType !== 'AMOUNT'}
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
                <div className="col-md-6 col-12">
                  <div className="form-check">
                    <Controller
                      name="amountOption"
                      control={editControl}
                      rules={{ required: 'Please select an allowance type' }}
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
                <div className="col-md-6 col-12">
                  <div className="form-check">
                    <Controller
                      name="amountOption"
                      control={editControl}
                      rules={{ required: 'Please select an allowance type' }}
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
                <div className="col-md-6 col-12">
                  <div className="form-check">
                    <Controller
                      name="amountOption"
                      control={addControl}
                      rules={{ required: 'Please select an allowance type' }}
                      render={({ field }) => (
                        <input
                          className="form-check-input"
                          type="radio"
                          name="editApplyOption"
                          id="editAlreadyApplied"
                          value="ALREADY_APPLIED"
                          checked={field.value === 'ALREADY_APPLIED'}
                          onChange={() => field.onChange('ALREADY_APPLIED')}
                        />
                      )}
                    />
                    <label className="form-check-label font14" htmlFor="editAlreadyApplied">
                      Already Applied
                    </label>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="form-check">
                    <Controller
                      name="amountOption"
                      control={addControl}
                      rules={{ required: 'Please select an allowance type' }}
                      render={({ field }) => (
                        <input
                          className="form-check-input"
                          type="radio"
                          name="editApplyOption"
                          id="editAnnual"
                          value="ANNUAL"
                          checked={field.value === 'ANNUAL'}
                          onChange={() => field.onChange('ANNUAL')}
                        />
                      )}
                    />
                    <label className="form-check-label font14" htmlFor="editAnnual">
                      Annual
                    </label>
                  </div>
                </div>
                {editErrors.amountOption && (
                  <div className="error-message">
                    {editErrors.amountOption.message}
                  </div>
                )}
              </div>
            </div>
            <div className="buttons-tops text-center">
              <button
                type="submit"
                className="btn btn-outline-success my-green font14 me-1"
                disabled={loaderState}
                aria-label="Update Allowance"
              >
                {loaderState ? (
                  <>
                    <span>Loading</span>
                    <span className="loader"></span>
                  </>
                ) : (
                  'Update Allowance'
                )}
              </button>
              <button
                type="button"
                className="btn cancelButtons font14"
                data-bs-dismiss="offcanvas"
                onClick={() => {
                  resetEditForm();
                  setEditAllowance(null);
                }}
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

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
            Delete Allowance
          </h2>
        </div>
        <div className="offcanvas-body p-3">
          <div>
            <p className="text-center p-3">
              <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/errorI.svg" className="img-fluid" alt="Error" />
            </p>
            <p className="text-center warningHeading">Are you Sure?</p>
            <p className="text-center greyText warningText pt-2">
              This Action will permanently delete<br />the Allowance
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
                onClick={() => handleDelete(delAllowanceId)}
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
      <Toaster />
    </StyledContainer>
  );
};

export default Conta_allown;
