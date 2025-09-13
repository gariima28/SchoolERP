import React, { useEffect, useState, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { UserContactGetAllApi, Conatct_conat_ById, Conatct_conat_PutApi, TeacherLeaveTeacherAllApi } from '../../../Utils/Apis';
import { MyUseContext } from '../ContextApi/UseContext';
import { useParams } from 'react-router-dom';


const Conta_contac = ({ data }) => {
  const { transferId, myUserId } = data;
  const staffId = transferId;

  const { roleIdUser } = useParams();
  const { userId } = useContext(MyUseContext);
  const myUserID = userId ?? roleIdUser ?? "";

  console.log(myUserID, "myUserID");

  const [loader, setLoader] = useState(false);
  const [leaveAllData, setLeaveAllData] = useState([]);
  const [leaveError, setLeaveError] = useState('');
  const [updateStatus, setUpdateStatus] = useState();
  const [contractStart, setContractStart] = useState('');
  const [contractEnd, setContractEnd] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [payslip, setPayslip] = useState('');
  const [officeShift, setOfficeShift] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [leaveCategory, setLeaveCategory] = useState('');
  const [isValidContractStartRequired, setIsValidContractStartRequired] = useState(false);
  const [isValidBasicSalaryRequired, setIsValidBasicSalaryRequired] = useState(false);
  const [isValidHourlyRateRequired, setIsValidHourlyRateRequired] = useState(false);
  const [isValidPayslipRequired, setIsValidPayslipRequired] = useState(false);

  useEffect(() => {
    if (myUserID) {
      MyStaffGetById();
    }
    MyGetallLeaveOfTeacher();
  }, []);

  const FuncValidation = () => {
    let isValid = true;
    const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    const salaryRegex = /^\d+$/;
    const rateRegex = /^\d+(\.\d{1,2})?$/;

    if (!contractStart || !dateRegex.test(contractStart)) {
      setIsValidContractStartRequired(true);
      isValid = false;
    } else {
      setIsValidContractStartRequired(false);
    }

    if (payslip === 'PER_MONTH' && (!basicSalary || !salaryRegex.test(basicSalary))) {
      setIsValidBasicSalaryRequired(true);
      isValid = false;
    } else {
      setIsValidBasicSalaryRequired(false);
    }

    if (payslip === 'CONTRACTUAL' && (!hourlyRate || !rateRegex.test(hourlyRate))) {
      setIsValidHourlyRateRequired(true);
      isValid = false;
    } else {
      setIsValidHourlyRateRequired(false);
    }

    if (!payslip) {
      setIsValidPayslipRequired(true);
      isValid = false;
    } else {
      setIsValidPayslipRequired(false);
    }

    return isValid;
  };

  const handleStartDate = (e) => {
    const value = e;
    setContractStart(value);
    const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    setIsValidContractStartRequired(!value || !dateRegex.test(value));
  };

  const MyGetallLeaveOfTeacher = async () => {
    setLoader(true);
    setLeaveError('');
    try {
      const response = await TeacherLeaveTeacherAllApi();
      if (response?.status === 200 && response?.data?.status === 'success') {
        setLeaveAllData(response?.data?.leave || []);
        setLoader(false);
      } else {
        setLeaveError(response?.data?.msg || 'Failed to fetch leave categories');
        toast.error(response?.data?.msg || 'Failed to fetch leave categories');
        setLoader(false);
      }
    } catch (error) {
      setLeaveError('Failed to fetch leave categories');
      toast.error('Failed to fetch leave categories');
      setLoader(false);
    }
  };

  const handleEndDate = (e) => {
    setContractEnd(e.target.value);
  };

  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleDesignation = (e) => {
    setDesignation(e.target.value);
  };

  const handleBasicSalary = (e) => {
    const value = e.target.value;
    setBasicSalary(value);
    const salaryRegex = /^\d+$/;
    setIsValidBasicSalaryRequired(!value || !salaryRegex.test(value));
  };

  const handleHourlyRate = (e) => {
    const value = e.target.value;
    setHourlyRate(value);
    const rateRegex = /^\d+(\.\d{1,2})?$/;
    setIsValidHourlyRateRequired(!value || !rateRegex.test(value));
  };

  const handlePayslip = (e) => {
    const value = e.target.value;
    setPayslip(value);
    setIsValidPayslipRequired(!value);
    setBasicSalary('');
    setHourlyRate('');
    setIsValidBasicSalaryRequired(false);
    setIsValidHourlyRateRequired(false);
  };

  const handleOfficeShift = (e) => {
    setOfficeShift(e.target.value);
  };

  const handleLeaveCategory = (e) => {
    setLeaveCategory(e.target.value);
  };

  const ContactDataApi = async () => {
    if (FuncValidation()) {
      const formData = new FormData();
      formData.append('contactDate', contractStart);
      formData.append('basicSalary', basicSalary);
      formData.append('hourlyRate', hourlyRate);
      formData.append('contractEnd', contractEnd);
      formData.append('paySlipType', payslip);
      formData.append('shift', officeShift);
      formData.append('department', department);
      formData.append('designation', designation);
      formData.append('leaveCategory', leaveCategory);

      setLoader(true);
      try {
        const response = await UserContactGetAllApi(myUserID, formData);
        if (response?.data?.status === 'success') {
          toast.success(response?.data?.message);
          setUpdateStatus(response?.data?.status);
          clearData();
          setLoader(false);
        } else {
          toast.error(response?.data?.message || 'Failed to add contract');
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        toast.error('Failed to add contract');
      }
    }
  };

  const MyStaffGetById = async () => {
    setLoader(true);
    try {
      const response = await Conatct_conat_ById(myUserID);
      if (response?.status === 200) {
        setUpdateStatus(response?.data?.status);
        setContractStart(response?.data?.contact?.contractStart || '');
        setContractEnd(response?.data?.contact?.contractEnd || '');
        setBasicSalary(response?.data?.contact?.basicSalary || '');
        setHourlyRate(response?.data?.contact?.hourlyRate || '');
        setPayslip(response?.data?.contact?.paySlipType || '');
        setOfficeShift(response?.data?.contact?.shift || '');
        setDepartment(response?.data?.contact?.department || '');
        setDesignation(response?.data?.contact?.designation || '');
        setLeaveCategory(response?.data?.contact?.leaveCategory || '');
        setLoader(false);
      } else {
        toast.error(response?.data?.msg || 'Failed to fetch contract data');
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      toast.error('Failed to fetch contract data');
    }
  };

  const MyStaffPutApi = async () => {
    if (FuncValidation()) {
      const formData = new FormData();
      formData.append('contactDate', contractStart);
      formData.append('basicSalary', basicSalary);
      formData.append('hourlyRate', hourlyRate);
      formData.append('contractEnd', contractEnd);
      formData.append('paySlipType', payslip);
      formData.append('shift', officeShift);
      formData.append('department', department);
      formData.append('designation', designation);
      formData.append('leaveCategory', leaveCategory);

      setLoader(true);
      try {
        const response = await Conatct_conat_PutApi(myUserID, formData);
        if (response?.status === 200) {
          toast.success(response?.data?.message || 'Contract updated successfully');
          clearData();
          setLoader(false);
        } else {
          toast.error(response?.data?.message || 'Failed to update contract');
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        toast.error('Failed to update contract');
      }
    }
  };

  const clearData = () => {
    setContractStart('');
    setContractEnd('');
    setBasicSalary('');
    setHourlyRate('');
    setPayslip('');
    setOfficeShift('');
    setDepartment('');
    setDesignation('');
    setLeaveCategory('');
    setIsValidContractStartRequired(false);
    setIsValidBasicSalaryRequired(false);
    setIsValidHourlyRateRequired(false);
    setIsValidPayslipRequired(false);
    setLeaveError('');
  };

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
          .form-control:disabled, .form-select:disabled {
            background: #e9ecef;
            cursor: not-allowed;
            opacity: 0.7;
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
          .note-text {
            font-size: 12px;
            color: #ADADBD;
            margin-top: 5px;
          }
        `}
      </style>
      <div className="container-fluid px-0 mt-3">
        <div className="form-container">
          <p className="heading-16 mb-3" style={{ color: '#1a3c34', fontWeight: '700' }}>
            Contract Information
          </p>
          <div className="row px-1 pt-2 row-margin">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="contractStart"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select contract start date (YYYY-MM-DD)"
                  aria-label="Contract Start Date"
                >
                  Contract Start Date <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="date"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidContractStartRequired && contractStart ? 'valid-indicator' : ''}`}
                  id="contractStart"
                  value={contractStart}
                  onChange={(e) => handleStartDate(e.target.value)}
                  tabIndex="1"
                  aria-describedby="contractStartError"
                />
                {isValidContractStartRequired && (
                  <div id="contractStartError" className="error-message">
                    Valid date is required
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="department"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select department"
                  aria-label="Department"
                >
                  Department
                </label>
                <select
                  className="form-select form-select-sm form-focus label-color"
                  id="department"
                  value={department}
                  onChange={handleDepartment}
                  tabIndex="2"
                  aria-describedby="departmentError"
                >
                  <option value="">--Choose--</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="designation"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter designation (letters only)"
                  aria-label="Designation"
                >
                  Designation
                </label>
                <input
                  type="text"
                  className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color"
                  id="designation"
                  placeholder="Enter designation"
                  value={designation}
                  onChange={handleDesignation}
                  tabIndex="3"
                  aria-describedby="designationError"
                />
              </div>
            </div>
          </div>
          <div className="row px-1 row-margin">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="payslip"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select payslip type"
                  aria-label="Payslip Type"
                >
                  Payslip Type <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <select
                  className={`form-select form-select-sm form-focus label-color ${!isValidPayslipRequired && payslip ? 'valid-indicator' : ''}`}
                  id="payslip"
                  value={payslip}
                  onChange={handlePayslip}
                  tabIndex="4"
                  aria-describedby="payslipError"
                >
                  <option value="">--Choose--</option>
                  <option value="PER_MONTH">Per Month</option>
                  <option value="CONTRACTUAL">Contractual</option>
                </select>
                {isValidPayslipRequired && (
                  <div id="payslipError" className="error-message">
                    Payslip type is required
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="basicSalary"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter basic salary (whole numbers only)"
                  aria-label="Basic Salary"
                >
                  Basic Salary {payslip === 'PER_MONTH' && <span style={{ color: '#dc3545' }}>*</span>}
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidBasicSalaryRequired && basicSalary && payslip === 'PER_MONTH' ? 'valid-indicator' : ''}`}
                  id="basicSalary"
                  placeholder="Enter amount"
                  value={basicSalary}
                  onChange={handleBasicSalary}
                  disabled={payslip !== 'PER_MONTH'}
                  tabIndex="5"
                  aria-describedby="basicSalaryError"
                />
                {isValidBasicSalaryRequired && payslip === 'PER_MONTH' && (
                  <div id="basicSalaryError" className="error-message">
                    Valid salary is required
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="hourlyRate"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter per day rate (e.g., 100.00)"
                  aria-label="Per Day"
                >
                  Per Day {payslip === 'CONTRACTUAL' && <span style={{ color: '#dc3545' }}>*</span>}
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidHourlyRateRequired && hourlyRate && payslip === 'CONTRACTUAL' ? 'valid-indicator' : ''}`}
                  id="hourlyRate"
                  placeholder="Enter amount"
                  value={hourlyRate}
                  onChange={handleHourlyRate}
                  disabled={payslip !== 'CONTRACTUAL'}
                  tabIndex="6"
                  aria-describedby="hourlyRateError"
                />
                {isValidHourlyRateRequired && payslip === 'CONTRACTUAL' && (
                  <div id="hourlyRateError" className="error-message">
                    Valid per day rate is required
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row px-1 row-margin">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="officeShift"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select office shift"
                  aria-label="Office Shift"
                >
                  Office Shift
                </label>
                <select
                  className="form-select form-select-sm form-focus label-color"
                  id="officeShift"
                  value={officeShift}
                  onChange={handleOfficeShift}
                  tabIndex="7"
                  aria-describedby="officeShiftError"
                >
                  <option value="">--Choose--</option>
                  <option value="Day">Day</option>
                  <option value="Night">Night</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="contractEnd"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select contract end date (YYYY-MM-DD)"
                  aria-label="Contract End Date"
                >
                  Contract End Date
                </label>
                <input
                  type="date"
                  className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color"
                  id="contractEnd"
                  value={contractEnd}
                  onChange={handleEndDate}
                  tabIndex="8"
                  aria-describedby="contractEndError"
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="leaveCategories"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select leave categories"
                  aria-label="Leave Categories"
                >
                  Leave Categories
                </label>
                {loader ? (
                  <div className="note-text" style={{ textAlign: 'center' }}>
                    <span className="loader"></span> Loading leave categories...
                  </div>
                ) : leaveError ? (
                  <div className="error-message">{leaveError}</div>
                ) : (
                  <select
                    className={`form-select form-select-sm form-focus label-color ${leaveCategory ? 'valid-indicator' : ''}`}
                    id="leaveCategories"
                    value={leaveCategory}
                    onChange={handleLeaveCategory}
                    tabIndex="9"
                    aria-describedby="leaveCategoriesNote"
                  >
                    <option value="">--Choose--</option>
                    {leaveAllData.map((item, index) => (
                      <option key={index} value={item.leaveType}>
                        {item.leaveType}
                      </option>
                    ))}
                    <option value="All">All</option>
                  </select>
                )}
                <p id="leaveCategoriesNote" className="note-text">
                  If All is selected, all leave categories added in the system will apply.
                </p>
              </div>
            </div>
          </div>
          <div className="row px-1 row-margin">
            <div className="col-12">
              <p className="note-text">
                Note: Basic Salary is required for Per Month payslip type; Per Day is required for Contractual payslip type.
              </p>
            </div>
          </div>
          <div className="row buttons-tops text-center">
            <div className="my-button11 heading-14">
              <button
                type="button"
                className="btn btn-outline-success my-green heading-14 me-1"
                onClick={updateStatus === 'success' ? MyStaffPutApi : ContactDataApi}
                disabled={loader}
                tabIndex="10"
                aria-label={updateStatus === 'success' ? 'Update Contract' : 'Submit Contract'}
              >
                {loader ? (
                  <>
                    <span>Loading</span>
                    <span className="loader"></span>
                  </>
                ) : updateStatus === 'success' ? (
                  'Update Contract'
                ) : (
                  'Submit Contract'
                )}
              </button>
              <button
                type="button"
                className="btn cancelButtons heading-14"
                onClick={clearData}
                tabIndex="11"
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

export default Conta_contac;
