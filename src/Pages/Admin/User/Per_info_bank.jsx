import React, { useEffect, useState, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BankGetAllApi, personal_Bank_details__GetById, BankPostApi, BankPutApi } from '../../../Utils/Apis';
import { MyUseContext } from '../ContextApi/UseContext';
import { useParams } from 'react-router-dom';

const Per_info_bank = () => {

  const { roleId, userId } = useParams();
  // const { userId } = useContext(MyUseContext);
  const myUserID = userId ?? roleId ?? "";

  const [loader, setLoader] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [updateStatus, setUpdateStatus] = useState('');

  const [errors, setErrors] = useState({
    accountNumber: false,
    bankName: false,
    ifscCode: false,
    bankBranch: false,
  });

  // Validation regex
  const accountNumberRegex = /^\d{9,18}$/;
  const nameRegex = /^[A-Za-z\s]+$/;
  const ifscRegex = /^[a-zA-Z0-9]{4}0[a-zA-Z0-9]{6}$/;

  const validateField = (value, field, regex, emptyMessage, invalidMessage) => {
    if (!value || value.trim() === '') {
      setErrors((prev) => ({ ...prev, [field]: emptyMessage }));
      return false;
    }
    if (regex && !regex.test(value)) {
      setErrors((prev) => ({ ...prev, [field]: invalidMessage }));
      return false;
    }
    setErrors((prev) => ({ ...prev, [field]: false }));
    return true;
  };

  const handleInputChange = (setter, field, regex, emptyMessage, invalidMessage) => (e) => {
    const value = e.target.value;
    setter(value);
    validateField(value, field, regex, emptyMessage, invalidMessage);
  };

  const validateForm = () => {
    const validations = [
      validateField(accountNumber, 'accountNumber', accountNumberRegex, 'Account number is required', 'Invalid account number'),
      validateField(bankName, 'bankName', nameRegex, 'Bank name is required', 'Invalid bank name'),
      validateField(ifscCode, 'ifscCode', ifscRegex, 'IFSC code is required', 'Invalid IFSC code'),
      validateField(bankBranch, 'bankBranch', nameRegex, 'Bank branch is required', 'Invalid bank branch'),
    ];
    return validations.every((v) => v);
  };

  const ContactDataApi = async () => {
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const formData = new FormData();
    formData.append('accountNumber', accountNumber);
    formData.append('bankName', bankName);
    formData.append('ifscCode', ifscCode);
    formData.append('bankBranch', bankBranch);

    setLoader(true);
    try {
      // Assuming BankPostApi for adding and BankPutApi for updating
      const response = updateStatus === 'success'
        ? await BankPutApi(myUserID, formData)
        : await BankPostApi(myUserID, formData);
      if (response?.data?.status === 'success') {
        toast.success(response?.data?.message);
        setUpdateStatus(response?.data?.status);
      } else {
        toast.error(response?.data?.message || 'Failed to save bank details');
      }
    } catch (error) {
      toast.error('An error occurred while saving bank details');
    } finally {
      setLoader(false);
    }
  };

  const MyStaffGetById = async () => {
    setLoader(true);
    try {
      const response = await personal_Bank_details__GetById(myUserID);
      if (response?.status === 200) {
        setAccountNumber(response?.data?.bankDetails?.accountNumber || '');
        setBankName(response?.data?.bankDetails?.bankName || '');
        setIfscCode(response?.data?.bankDetails?.ifscCode || '');
        setBankBranch(response?.data?.bankDetails?.bankBranch || '');
        setUpdateStatus(response?.data?.status || '');
      } else {
        toast.error(response?.data?.message || 'Failed to fetch bank details');
      }
    } catch (error) {
      toast.error('An error occurred while fetching bank details');
    } finally {
      setLoader(false);
    }
  };

  const clearData = () => {
    setAccountNumber('');
    setBankName('');
    setIfscCode('');
    setBankBranch('');
    setUpdateStatus('');
    setErrors({
      accountNumber: false,
      bankName: false,
      ifscCode: false,
      bankBranch: false,
    });
  };

  useEffect(() => {
    if (myUserID) {
      MyStaffGetById();
    }
  }, []);

  return (
    <>
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
          .form-control {
            border-radius: 8px;
            font-size: 14px;
            padding: 10px;
            transition: all 0.3s ease;
            border: 1px solid #ced4da;
            background: #f8fafc;
          }
          .form-control:hover {
            border-color: #008479;
            background: #fff;
          }
          .form-control:focus {
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
        `}
      </style>
      <div className="container-fluid">
        <div className="form-container">
          <p className="heading-16 mb-3" style={{ color: '#1a3c34', fontWeight: '700' }}>Bank Details</p>
          <div className="row px-1 pt-2 row-margin">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="accountNumber"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter 9-18 digit account number"
                  aria-label="Account Number"
                >
                  Account Number <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!errors.accountNumber && accountNumber ? 'valid-indicator' : ''}`}
                  id="accountNumber"
                  placeholder="Enter Account Number"
                  value={accountNumber}
                  onChange={handleInputChange(setAccountNumber, 'accountNumber', accountNumberRegex, 'Account number is required', 'Invalid account number')}
                  tabIndex="1"
                  aria-describedby="accountNumberError"
                />
                {errors.accountNumber && (
                  <div id="accountNumberError" className="error-message">
                    {errors.accountNumber}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="bankName"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter bank name (letters only)"
                  aria-label="Bank Name"
                >
                  Bank Name <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!errors.bankName && bankName ? 'valid-indicator' : ''}`}
                  id="bankName"
                  placeholder="Enter Bank Name"
                  value={bankName}
                  onChange={handleInputChange(setBankName, 'bankName', nameRegex, 'Bank name is required', 'Invalid bank name')}
                  tabIndex="2"
                  aria-describedby="bankNameError"
                />
                {errors.bankName && (
                  <div id="bankNameError" className="error-message">
                    {errors.bankName}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="ifscCode"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter 11-character IFSC code (e.g., SBIN0001234)"
                  aria-label="IFSC Code"
                >
                  IFSC Code <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  className={`uppercase-input form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!errors.ifscCode && ifscCode ? 'valid-indicator' : ''}`}
                  id="ifscCode"
                  placeholder="Enter IFSC Code"
                  value={ifscCode}
                  onChange={handleInputChange(setIfscCode, 'ifscCode', ifscRegex, 'IFSC code is required', 'Invalid IFSC code')}
                  tabIndex="3"
                  aria-describedby="ifscCodeError"
                />
                {errors.ifscCode && (
                  <div id="ifscCodeError" className="error-message">
                    {errors.ifscCode}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="bankBranch"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter bank branch name (letters only)"
                  aria-label="Bank Branch"
                >
                  Bank Branch <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!errors.bankBranch && bankBranch ? 'valid-indicator' : ''}`}
                  id="bankBranch"
                  placeholder="Enter Bank Branch"
                  value={bankBranch}
                  onChange={handleInputChange(setBankBranch, 'bankBranch', nameRegex, 'Bank branch is required', 'Invalid bank branch')}
                  tabIndex="4"
                  aria-describedby="bankBranchError"
                />
                {errors.bankBranch && (
                  <div id="bankBranchError" className="error-message">
                    {errors.bankBranch}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row buttons-tops text-center">
            <div className="my-button11 heading-14">
              <button
                type="button"
                className="btn btn-outline-success my-green heading-12"
                onClick={ContactDataApi}
                disabled={loader}
                tabIndex="5"
                aria-label={updateStatus === 'success' ? 'Update Bank Details' : 'Submit Bank Details'}
              >
                {loader ? (
                  <>
                    <span>Loading</span>
                    <span className="loader"></span>
                  </>
                ) : (
                  updateStatus === 'success' ? 'Update Bank Details' : 'Submit Bank Details'
                )}
              </button>
              <button
                type="button"
                className="btn cancelButtons text-black heading-12 ms-2"
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
      </div>
    </>
  );
};

export default Per_info_bank;
