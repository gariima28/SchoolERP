import React, { useEffect, useState, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import { Conatct_allowance_getById, Conatct_allowance_PutApi, getAllHRAllowanceName, AssignAllowanceToStaff, getAllHRAllowanceByStaffID, DeleteItemAssignAllowanceToStaff } from '../../../Utils/Apis';
import { MyUseContext } from '../ContextApi/UseContext';
const Conta_allown = () => {

  const { myId, setMyId } = useContext(MyUseContext)
  const myUserID = myId !== undefined ? myId : '';

  const [loaderState, setLoaderState] = useState(false);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(true);
  const [updateStatus, setUpdateStatus] = useState();
  const [allowance, setAllowance] = useState('');
  const [title, setTitle] = useState('');
  const [amountOption, setAmountOption] = useState('');
  const [amount, setAmount] = useState('');
  const [isValidAllowanceRequired, setIsValidAllowanceRequired] = useState(false);
  const [isValidTitleRequired, setIsValidTitleRequired] = useState(false);
  const [isValidAmountOptionRequired, setIsValidAmountOptionRequired] = useState(false);
  const [isValidAmountRequired, setIsValidAmountRequired] = useState(false);
  const [allowanceList, setAllowanceList] = useState([]);
  const [editAllowance, setEditAllowance] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [allowanceData, setAllowanceData] = useState([]);
  const [setAllowanceDataOfStaff, setSetAllowanceDataOfStaff] = useState([])
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (myUserID) {
      MyStaffGetById();
    }
    getAllAllowanceName();
  }, []);

  const FuncValidation = () => {
    let isValid = true;
    const textRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^\d+(\.\d{1,2})?$/;

    if (!allowance || !textRegex.test(allowance)) {
      setIsValidAllowanceRequired(true);
      isValid = false;
      setLoader(false);
    } else {
      setIsValidAllowanceRequired(false);
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

  const handleAllowance = (e2) => {
    console.log(e2);
    setAllowance(e2);
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


  const getAllAllowanceName = async () => {
    try {
      setLoaderState(true);
      const response = await getAllHRAllowanceName('', pageNo, pageSize);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setAllowanceData(response.data.allowanceNames || []);
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

  const MyStaffGetById = async () => {
    setLoader(true);
    try {
      const response = await Conatct_allowance_getById(myUserID);
      if (response?.status === 200) {
        setUpdateStatus(response?.data?.status);
        setSetAllowanceDataOfStaff(response.data.allowance || []);
        setAllowance(response?.data?.allowance?.allowanceOption || '');
        setTitle(response?.data?.allowance?.title || '');
        setAmountOption(response?.data?.allowance?.amountOption || '');
        setAmount(response?.data?.allowance?.amount || '');
        setLoader(false);
      } else {
        toast.error(response?.data?.msg || 'Failed to fetch allowance data');
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      toast.error('Failed to fetch allowance data');
    }
  };


  const getAllAllowanceNameByStaffId = async () => {
    try {
      setLoaderState(true);
      const response = await getAllHRAllowanceByStaffID(myUserID);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setSetAllowanceDataOfStaff(response.data.allowance || []);
        setTotalPages(response.data.totalPages || 1);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch allowances');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem('token');
      }
      toast.error('Error fetching allowances');
    } finally {
      setLoaderState(false);
    }
  };


  const MyStaffePutApi = async () => {
    const formData = new FormData();
    formData.append('allowanceNameId', allowance);
    formData.append('allowanceType', amountOption);
    formData.append('amount', amount);
    setLoader(true);
    try {
      const response = await AssignAllowanceToStaff(myUserID, formData);
      console.log(response, "Update Allowance");
      if (response?.status === 200) {
        getAllAllowanceNameByStaffId();
        toast.success(response?.data?.message);
        setShow(false);
        setLoader(false);
        clearData();
      } else {
        toast.error(response?.data?.message || 'Failed to update allowance');
        setShow(true);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      toast.error('Failed to update allowance');
    }
  };


  const handleEdit = (item) => {
    setEditAllowance(item);
    setAllowance(item.allowanceOption);
    setTitle(item.title);
    setAmountOption(item.amountOption);
    setAmount(item.amount);
    setShowOffcanvas(true);
  };

  const handleDelete = async (ids) => {
    setLoader(true);
    try {
      const response = await DeleteItemAssignAllowanceToStaff(myUserID, ids);
      if (response?.data?.status === "success") {
        toast.success('Allowance deleted successfully');
        getAllAllowanceNameByStaffId();
      } else {
        toast.error(response?.data?.message || 'Failed to delete allowance');
      }
    } catch (error) {
      toast.error('Failed to delete allowance');
    } finally {
      setLoader(false);
    }
  };

  const handleUpdateAllowance = async () => {
    if (FuncValidation()) {
      const formData = new FormData();
      formData.append('allowanceOption', allowance);
      formData.append('amountOption', amountOption);
      formData.append('title', title);
      formData.append('amount', amount);

      setLoader(true);
      try {
        const response = await Conatct_allowance_PutApi(editAllowance.id, formData);
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setShowOffcanvas(false);

          clearData();
        } else {
          toast.error(response?.data?.message || 'Failed to update allowance');
        }
      } catch (error) {
        toast.error('Failed to update allowance');
      } finally {
        setLoader(false);
      }
    }
  };

  const clearData = () => {
    setAllowance('');
    setTitle('');
    setAmountOption('');
    setAmount('');
    setIsValidAllowanceRequired(false);
    setIsValidTitleRequired(false);
    setIsValidAmountOptionRequired(false);
    setIsValidAmountRequired(false);
    setEditAllowance(null);
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
          <p className="heading-16 mb-3" style={{ color: '#1a3c34', fontWeight: '700' }}>Add Allowance</p>
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

                {allowanceData.length > 0 ? (
                  <select
                    className="form-select form-select-sm form-focus label-color"
                    id="allowance"
                    value={allowance}
                    onChange={(e) => handleAllowance(e.target.value)}
                    tabIndex="1"
                    aria-describedby="allowanceError"
                  >
                    <option value="">--Choose--</option>
                    {allowanceData.map((item, index) => (
                      <option key={item.id || index} value={item.id}>
                        {item.allowanceName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-muted small mt-2">No allowances found</p>
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
                aria-label={updateStatus === "success" ? 'Update Allowance' : 'Add Allowance'}
              >
                {loader ? (
                  <>
                    <span>Loading</span>
                    <span className="loader"></span>
                  </>
                ) : (
                  updateStatus === "success" ? 'Update Allowance' : 'Add Allowance'
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
              {setAllowanceDataOfStaff.length > 0 ? (
                setAllowanceDataOfStaff.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.allowanceName}</td>
                    <td>{item.allowanceType}</td>
                    <td>{item.amount}</td>
                    <td>
                      <button
                        className="action-btn edit me-2"
                        onClick={() => handleEdit(item)}
                        tabIndex={7 + index * 2}
                        aria-label={`Edit allowance ${item.allowanceNameId}`}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(item.allowanceId)}
                        tabIndex={8 + index * 2}
                        aria-label={`Delete allowance ${item.allowanceOption}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No allowances found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={`offcanvas offcanvas-end ${showOffcanvas ? 'show' : ''}`} tabIndex="-1" id="editAllowanceOffcanvas" aria-labelledby="editAllowanceOffcanvasLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="editAllowanceOffcanvasLabel">Edit Allowance</h5>
            <button type="button" className="btn-close btn-close-white" onClick={clearData} aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <div className="form-group mb-3">
              <label
                htmlFor="editAllowance"
                className="form-label heading-14 label-color"
                data-tooltip="Select allowance name"
                aria-label="Allowance Name"
              >
                Allowance Name <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <select
                className="form-select form-select-sm form-focus label-color"
                id="editAllowance"
                value={allowance}
                onChange={(e) => handleAllowance(e.target.value)}
                tabIndex="8"
                aria-describedby="editAllowanceError"
              >
                <option value="">--Choose--</option>
                <option value="Housing">Housing</option>
                <option value="Travel">Travel</option>
              </select>
              {isValidAllowanceRequired && (
                <div id="editAllowanceError" className="error-message">
                  Allowance name is required
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
                onClick={handleUpdateAllowance}
                disabled={loader}
                tabIndex="12"
                aria-label="Update Allowance"
              >
                {loader ? (
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