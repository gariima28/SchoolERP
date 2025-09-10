import React, { useEffect, useState, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import { Conatct_Deduction_getById, Conatct_Deduction_PutApi, getAllHRDeductionName, AssignDeductionToStaff, getAllHRDeductionByStaffID, DeleteItemAssignDeductionToStaff } from '../../../Utils/Apis';
import { MyUseContext } from '../ContextApi/UseContext';
import { useParams } from 'react-router-dom';
const Conta_allown = () => {

  const { id } = useParams();
  const { myId } = useContext(MyUseContext);
  const myUserID = myId ?? id ?? "";

  const [loaderState, setLoaderState] = useState(false);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(true);
  const [updateStatus, setUpdateStatus] = useState();
  const [deduction, setDeduction] = useState('');
  const [title, setTitle] = useState('');
  const [amountOption, setAmountOption] = useState('');
  const [amount, setAmount] = useState('');
  const [isValidDeductionRequired, setIsValidDeductionRequired] = useState(false);
  const [isValidTitleRequired, setIsValidTitleRequired] = useState(false);
  const [isValidAmountOptionRequired, setIsValidAmountOptionRequired] = useState(false);
  const [isValidAmountRequired, setIsValidAmountRequired] = useState(false);
  const [deductionList, setDeductionList] = useState([]);
  const [editDeduction, setEditDeduction] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [deductionData, setDeductionData] = useState([]);
  const [setDeductionDataOfStaff, setSetDeductionDataOfStaff] = useState([])
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (myUserID) {
      MyStaffGetById();
    }
    getAllDeductionName();
  }, []);

  const FuncValidation = () => {
    let isValid = true;
    const textRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^\d+(\.\d{1,2})?$/;

    if (!deduction || !textRegex.test(deduction)) {
      setIsValidDeductionRequired(true);
      isValid = false;
      setLoader(false);
    } else {
      setIsValidDeductionRequired(false);
    }

    if (!title || !textRegex.test(title)) {
      setIsValidTitleRequired(true);
      isValid = false;
      setLoader(false);
    } else {
      setIsValidTitleRequired(false);
    }

    if (!amountOption || !numberRegex.test(amountOption)) {
      setIsValidAmountOptionRequired(true);
      isValid = false;
      setLoader(false);
    } else {
      setIsValidAmountOptionRequired(false);
    }

    if (!amount || !numberRegex.test(amount)) {
      setIsValidAmountRequired(true);
      isValid = false;
      setLoader(false);
    } else {
      setIsValidAmountRequired(false);
    }

    return isValid;
  };

  const handleDeduction = (e2) => {
    console.log(e2);
    setDeduction(e2);
    const textRegex = /^[A-Za-z\s]+$/;
  };

  const handleTitle = (e2) => {
    setTitle(e2);
    const textRegex = /^[A-Za-z\s]+$/;
    setIsValidTitleRequired(!e2 || !textRegex.test(e2));
  };

  const handleAmountOption = (e2) => {
    setAmountOption(e2);
    const numberRegex = /^\d+(\.\d{1,2})?$/;
    setIsValidAmountOptionRequired(!e2 || !numberRegex.test(e2));
  };

  const handleAmount = (e2) => {
    setAmount(e2);
    const numberRegex = /^\d+(\.\d{1,2})?$/;
    setIsValidAmountRequired(!e2 || !numberRegex.test(e2));
  };


  const getAllDeductionName = async () => {
    try {
      setLoaderState(true);
      const response = await getAllHRDeductionName('', pageNo, pageSize);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setDeductionData(response.data.deductionNames || []);
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


  const MyStaffGetById = async () => {
    setLoader(true);
    try {
      const response = await Conatct_Deduction_getById(myUserID);
      if (response?.status === 200) {
        setUpdateStatus(response?.data?.status)
        setSetDeductionDataOfStaff(response.data.statutory || []);
        setDeduction(response?.data?.deduction?.deductionOption || '');
        setTitle(response?.data?.deduction?.title || '');
        setAmountOption(response?.data?.deduction?.amountOption || '');
        setAmount(response?.data?.deduction?.amount || '');
        setLoader(false);
      } else {
        toast.error(response?.data?.msg || 'Failed to fetch Deduction data');
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      toast.error('Failed to fetch Deduction data');
    }
  };



  const getAllDeductionNameByStaffId = async () => {
    try {
      setLoaderState(true);
      const response = await getAllHRDeductionByStaffID(myUserID);
      console.log(response, "firsyt")
      if (response?.status === 200) {
        console.log(response.data.statutory, "sec")
        setSetDeductionDataOfStaff(response.data.statutory || []);
        setTotalPages(response.data.totalPages || 1);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch Deductions');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem('token');
      }
      toast.error('Error fetching Deductions');
    } finally {
      setLoaderState(false);
    }
  };


  const MyStaffePutApi = async () => {
    const formData = new FormData();
    formData.append('deductionNameId', deduction);
    formData.append('deductionOption', amountOption);
    formData.append('amount', amount);
    setLoader(true);
    try {
      const response = await AssignDeductionToStaff(myUserID, formData);
      console.log(response, "Update Deduction");
      if (response?.status === 200) {
        getAllDeductionNameByStaffId();
        toast.success(response?.data?.message);
        setShow(false);
        setLoader(false);
        clearData();
      } else {
        toast.error(response?.data?.message || 'Failed to update Deduction');
        setShow(true);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      toast.error('Failed to update Deduction');
    }
  };


  const handleEdit = (item) => {
    setEditDeduction(item);
    setDeduction(item.deductionOption);
    setTitle(item.title);
    setAmountOption(item.amountOption);
    setAmount(item.amount);
    setShowOffcanvas(true);
  };

  const handleDelete = async (ids) => {
    setLoader(true);
    try {
      const response = await DeleteItemAssignDeductionToStaff(myUserID, ids);
      if (response?.data?.status === "success") {
        toast.success('Deduction deleted successfully');
        getAllDeductionNameByStaffId();
      } else {
        toast.error(response?.data?.message || 'Failed to delete Deduction');
      }
    } catch (error) {
      toast.error('Failed to delete Deduction');
    } finally {
      setLoader(false);
    }
  };

  const handleUpdateDeduction = async () => {
    if (FuncValidation()) {
      const formData = new FormData();
      formData.append('DeductionOption', deduction);
      formData.append('amountOption', amountOption);
      formData.append('title', title);
      formData.append('amount', amount);

      setLoader(true);
      try {
        const response = await Conatct_Deduction_PutApi(editDeduction.id, formData);
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setShowOffcanvas(false);

          clearData();
        } else {
          toast.error(response?.data?.message || 'Failed to update Deduction');
        }
      } catch (error) {
        toast.error('Failed to update Deduction');
      } finally {
        setLoader(false);
      }
    }
  };

  const clearData = () => {
    setDeduction('');
    setTitle('');
    setAmountOption('');
    setAmount('');
    setIsValidDeductionRequired(false);
    setIsValidTitleRequired(false);
    setIsValidAmountOptionRequired(false);
    setIsValidAmountRequired(false);
    setEditDeduction(null);
    setShowOffcanvas(false);
  };

  return (
    <>
      {loaderState && <DataLoader />}
      <style>
        {`
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
            padding: 10px 20px;
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
            background: linear-gradient(135deg, #008479 0%, #006b63 100%);
            color: #fff;
            padding: 16px;
          }
          .offcanvas-title {
            font-size: 16px;
            font-weight: 600;
          }
          .offcanvas-body {
            padding: 24px;
          }
        `}
      </style>
      <div className="container-fluid">
        <div className="form-container">
          <p className="heading-16 mb-3" style={{ color: '#1a3c34', fontWeight: '700' }}>Add Deduction</p>
          <div className="row px-1 row-margin">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="Deduction"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select Deduction name"
                  aria-label="Deduction Name"
                >
                  Deduction Name <span style={{ color: '#dc3545' }}>*</span>
                </label>

                {deductionData.length > 0 ? (
                  <select
                    className="form-select form-select-sm form-focus label-color"
                    id="Deduction"
                    value={deduction}
                    onChange={(e) => handleDeduction(e.target.value)}
                    tabIndex="1"
                    aria-describedby="DeductionError"
                  >
                    <option value="">--Choose--</option>
                    {deductionData.map((item, index) => (
                      <option key={item.id || index} value={item.id}>
                        {item.deductionName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-muted small mt-2">No Deductions found</p>
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
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidAmountRequired && amount ? 'valid-indicator' : ''}`}
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => handleAmount(e.target.value)}
                  tabIndex="2"
                  aria-describedby="amountError"
                />
                {isValidAmountRequired && (
                  <div id="amountError" className="error-message">
                    Valid amount is required
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
                    <input
                      className="form-check-input"
                      type="radio"
                      name="applyOption"
                      id="instantApply"
                      value="instant"
                      checked={amountOption === 'INSTANT_APPLY'}
                      onChange={() => setAmountOption('INSTANT_APPLY')}
                      tabIndex="3"
                    />
                    <label className="form-check-label" htmlFor="instantApply">
                      Instant Apply
                    </label>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="applyOption"
                      id="nextMonthApply"
                      value="nextMonth"
                      checked={amountOption === 'NEXT_MONTH_APPLY'}
                      onChange={() => setAmountOption('NEXT_MONTH_APPLY')}
                      tabIndex="4"
                    />
                    <label className="form-check-label" htmlFor="nextMonthApply">
                      Next Month Apply
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12"></div>
          </div>
          <div className="row buttons-tops text-center">
            <div className="my-button11 heading-14">
              <button
                type="button"
                className="btn btn-outline-success my-green heading-12 me-1"
                onClick={MyStaffePutApi}
                disabled={loader}
                tabIndex="5"
                aria-label={updateStatus === "success" ? 'Update Deduction' : 'Add Deduction'}
              >
                {loader ? (
                  <>
                    <span>Loading</span>
                    <span className="loader"></span>
                  </>
                ) : (
                  updateStatus === "success" ? 'Update Deduction' : 'Add Deduction'
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-success heading-12"
                onClick={clearData}
                tabIndex="6"
                aria-label="Cancel"
              >
                Cancel
              </button>
              <Toaster />
            </div>
          </div>
        </div>

        <div className="table-container mt-4">
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
              {setDeductionDataOfStaff.length > 0 ? (
                setDeductionDataOfStaff.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.deductionOption}</td>
                    <td>{item.amount}</td>
                    <td>
                      <button
                        className="action-btn edit me-2"
                        onClick={() => handleEdit(item)}
                        tabIndex={7 + index * 2}
                        aria-label={`Edit Deduction ${item.deductionNameId}`}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(item.statutoryDeductionId)}
                        tabIndex={8 + index * 2}
                        aria-label={`Delete Deduction ${item.deductionOption}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Deductions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={`offcanvas offcanvas-end ${showOffcanvas ? 'show' : ''}`} tabIndex="-1" id="editDeductionOffcanvas" aria-labelledby="editDeductionOffcanvasLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="editDeductionOffcanvasLabel">Edit Deduction</h5>
            <button type="button" className="btn-close btn-close-white" onClick={clearData} aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <div className="form-group mb-3">
              <label
                htmlFor="editDeduction"
                className="form-label heading-14 label-color"
                data-tooltip="Select Deduction name"
                aria-label="Deduction Name"
              >
                Deduction Name <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <select
                className="form-select form-select-sm form-focus label-color"
                id="editDeduction"
                value={deduction}
                onChange={(e) => handleDeduction(e.target.value)}
                tabIndex="8"
                aria-describedby="editDeductionError"
              >
                <option value="">--Choose--</option>
                <option value="Housing">Housing</option>
                <option value="Travel">Travel</option>
              </select>
              {isValidDeductionRequired && (
                <div id="editDeductionError" className="error-message">
                  Deduction name is required
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
              <input
                type="text"
                className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidAmountRequired && amount ? 'valid-indicator' : ''}`}
                id="editAmount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => handleAmount(e.target.value)}
                tabIndex="9"
                aria-describedby="editAmountError"
              />
              {isValidAmountRequired && (
                <div id="editAmountError" className="error-message">
                  Valid amount is required
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <div className="row">
                <div className="col-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="editApplyOption"
                      id="editInstantApply"
                      value="instant"
                      checked={amountOption === 'instant'}
                      onChange={() => setAmountOption('instant')}
                      tabIndex="10"
                    />
                    <label className="form-check-label" htmlFor="editInstantApply">
                      Instant Apply
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="editApplyOption"
                      id="editNextMonthApply"
                      value="nextMonth"
                      checked={amountOption === 'nextMonth'}
                      onChange={() => setAmountOption('nextMonth')}
                      tabIndex="11"
                    />
                    <label className="form-check-label" htmlFor="editNextMonthApply">
                      Next Month Apply
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="buttons-tops text-center">
              <button
                type="button"
                className="btn btn-outline-success my-green heading-12 me-1"
                onClick={handleUpdateDeduction}
                disabled={loader}
                tabIndex="12"
                aria-label="Update Deduction"
              >
                {loader ? (
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
                className="btn btn-outline-success heading-12"
                onClick={clearData}
                tabIndex="13"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conta_allown;