import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
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

// Styled components for CSS (unchanged from your provided code)
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
    color: #dc3545;
    margin-top: 3px;
    min-height: 16px;
    animation: fadeIn 0.3s ease;
  }
  .valid-indicator::after {
    content: '✔';
    color: #28a745;
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
    background: #28a745;
    color: #fff;
    border: none;
  }
  .action-btn.delete {
    background: #dc3545;
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
  const { roleIdUser } = useParams();
  const { userId } = useContext(MyUseContext);
  const myUserID = userId ?? roleIdUser ?? '';

  const [loaderState, setLoaderState] = useState(false);
  const [allowanceData, setAllowanceData] = useState([]);
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
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      allowanceNameId: '',
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
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      allowanceNameId: '',
      amount: '',
      amountOption: '',
    },
  });

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
    } else {
      toast.error('User ID not found');
      // Optionally redirect: navigate('/');
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
        localStorage.removeItem('token');
        // navigate('/');
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
        localStorage.removeItem('token');
        // navigate('/');
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
      formData.append('allowanceType', data.amountOption);
      formData.append('amount', data.amount);

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
    console.log('Editing item:', item); // Debug log to check item structure
    setEditAllowance(item);
    setEditValue('allowanceNameId', item.allowanceNameId || '');
    setEditValue('amount', item.amount || '');
    setEditValue('amountOption', item.allowanceType || '');
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
      formData.append('allowanceType', data.amountOption);
      formData.append('amount', data.amount);

      console.log('Updating allowance with ID:', editAllowance.staffId || editAllowance.staffId); // Debug log
      console.log('FormData:', Object.fromEntries(formData)); // Debug log

      const response = await Conatct_allowance_PutApi(editAllowance.staffId || editAllowance.staffId, formData);
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
      console.error('Update error:', error.response?.data); // Debug log
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
                  Allowance Name <span style={{ color: '#dc3545' }}>*</span>
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
                      {allowanceData.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.allowanceName}
                        </option>
                      ))}
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
                  htmlFor="amount"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter amount (e.g., 1000.00)"
                  aria-label="Amount"
                >
                  Amount <span style={{ color: '#dc3545' }}>*</span>
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
                      className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${!addErrors.amount && field.value ? 'valid-indicator' : ''}`}
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
                <div className="col-lg-6 col-md-6 col-sm-12">
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
                <th scope="col">Amount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {staffAllowanceData.map((item) => (
                <tr key={item.id}>
                  <td>{item.allowanceName}</td>
                  <td>{item.allowanceType}</td>
                  <td>{item.amount}</td>
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
                      className="action-btn delete"
                      onClick={() => handleDelete(item.allowanceId)}
                      aria-label={`Delete allowance ${item.allowanceName}`}
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
            <img src="/images/search.svg" alt="" className='img-fluid' />
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
                Allowance Name <span style={{ color: '#dc3545' }}>*</span>
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
                htmlFor="editAmount"
                className="form-label heading-14 label-color"
                data-tooltip="Enter amount (e.g., 1000.00)"
                aria-label="Amount"
              >
                Amount <span style={{ color: '#dc3545' }}>*</span>
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
                    className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${!editErrors.amount && field.value ? 'valid-indicator' : ''}`}
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
                <div className="col-6">
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
      <Toaster />
    </StyledContainer>
  );
};

export default Conta_allown;
