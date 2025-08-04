import React, { useEffect, useState, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { MyUseContext } from '../ContextApi/UseContext';

import { StaffPostApi, StaffGetById, StaffPutApi, RolePermissionGetApi } from '../../../Utils/Apis';
// import { IdContext } from './Context/IdContext'
import { MyContext } from './Context/IdContext';
import { set } from 'lodash';

const User_basic_infomation = ({ data, setFunction, dataFunct }) => {
  const navigate = useNavigate();
  const myUserId = data;


  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(true);
  const [IdForUpdate, setIdForUpdate] = useState();
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState();
  const [maritalStatus, setMaritalstatus] = useState();
  const [bloodGroup, setBloodGroup] = useState();
  const [nationality, setNationality] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [religion, setReligion] = useState();
  const [emptyValue, setemptyValue] = useState();
  const [userId, setUserId] = useState();
  const [rolePermisAllData, setRolePermisAllData] = useState([]);
  const [roleId, setRoleId] = useState('');
  const [myroleName, setMyroleName] = useState('');
  const [dropdownDisabled, setDropdownDisabled] = useState(false);
  const [originalMail, setOriginalMail] = useState();
  const [updateStatus, setUpdateStatus] = useState();
  const [manageButton, setManageButton] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [preview, setPreview] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstAdd, setFirstAdd] = useState();
  const [secondAddress, setSecondAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState('');
  const [pinCode, setpinCode] = useState('');
  const [dob, setDob] = useState();
  const [citizenship, setCitizenship] = useState();
  const [isValidFirstNameRequired, setIsValidFirstNameRequired] = useState(false);
  const [isValidLastNameRequired, setIsValidLastNameRequired] = useState(false);
  const [isValidFirstAddRequired, setIsValidFirstAddRequired] = useState(false);
  const [isValidsecondAddressRequired, setIsValidsecondAddressRequired] = useState(false);
  const [isValidEmailRequired, setIsValidEmailRequired] = useState(false);
  const [isValidPhoneRequired, setIsValidPhoneRequired] = useState(false);
  const [isValidPinCodeRequired, setIsValidPinCodeRequired] = useState(false);
  const [isValidDobRequired, setIsValidDobRequired] = useState(false);



  useEffect(() => {
    MyRolPermisGetAllApi();
    MyStaffGetById();
  }, []);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const buttManage = () => {
    setManageButton(!manageButton);
  };

  const FuncValidation = () => {
    let isValid = true;
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!firstName || !nameRegex.test(firstName)) {
      setIsValidFirstNameRequired(true);
      isValid = false;
      setLoader(false);
    } else {
      setIsValidFirstNameRequired(false);
    }

    if (!lastName || !nameRegex.test(lastName)) {
      setIsValidLastNameRequired(true);
      isValid = false;
      setLoader(false);
    } else {
      setIsValidLastNameRequired(false);
    }

    if (!firstAdd || firstAdd === "" || !/^[a-zA-Z0-9\s,.'-/#%]+$/.test(firstAdd)) {
      setIsValidFirstAddRequired(true);
      isValid = false;
      setLoader(false);
    } else {
      setIsValidFirstAddRequired(false);
    }

    if (!secondAddress || secondAddress === "" || !/^[a-zA-Z0-9\s,.'-/#%]+$/.test(secondAddress)) {
      setIsValidsecondAddressRequired(true);
      isValid = false;
      setLoader(false);
    } else {
      setIsValidsecondAddressRequired(false);
    }

    if (!email || email === "" || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setIsValidEmailRequired(true);
      isValid = false;
      setLoader(false);
    } else {
      setIsValidEmailRequired(false);
    }

    if (!phone || phone === "" || !/^[0-9]{10}$/.test(phone)) {
      setIsValidPhoneRequired(true);
      isValid = false;
      setLoader(false);
    } else {
      setIsValidPhoneRequired(false);
    }

    if (!pinCode || pinCode === "" || !/^\d{6}(-\d{4})?$/.test(pinCode)) {
      setIsValidPinCodeRequired(true);
      isValid = false;
      setLoader(false);
    } else {
      setIsValidPinCodeRequired(false);
    }

    if (!dob || dob === "" || !/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(dob)) {
      setIsValidDobRequired(true);
      isValid = false;
      setLoader(false);
    } else {
      setIsValidDobRequired(false);
    }
    return isValid;
  };

  const handleName = (e2) => {
    setFirstName(e2);
    const nameRegex = /^[A-Za-z\s]+$/;
    setIsValidFirstNameRequired(!e2 || !nameRegex.test(e2));
  };

  const handleSecondName = (e2) => {
    setLastName(e2);
    const nameRegex = /^[A-Za-z\s]+$/;
    setIsValidLastNameRequired(!e2 || !nameRegex.test(e2));
  };

  const handleFirstAdd = (e2) => {
    setFirstAdd(e2);
    const addRegex = /^[a-zA-Z0-9\s,.'-/#%]+$/;
    setIsValidFirstAddRequired(!e2 || !addRegex.test(e2));
  };

  const handleSecondAdd = (e2) => {
    setSecondAddress(e2);
    const addRegex = /^[a-zA-Z0-9\s,.'-/#%]+$/;
    setIsValidsecondAddressRequired(!e2 || !addRegex.test(e2));
  };

  const handleEmail = (e2) => {
    setEmail(e2);
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValidEmailRequired(!e2 || !regexEmail.test(e2));
  };

  const handlePhone = (e2) => {
    setPhone(e2);
    const phoneRegex = /^[0-9]{10}$/;
    setIsValidPhoneRequired(!e2 || !phoneRegex.test(e2));
  };

  const handlePinCode = (e2) => {
    setpinCode(e2);
    const pinCodeRegex = /^\d{6}(-\d{4})?$/;
    setIsValidPinCodeRequired(!e2 || !pinCodeRegex.test(e2));
  };

  const handleDob = (e2) => {
    setDob(e2);
    const pinCodeRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    setIsValidDobRequired(!e2 || !pinCodeRegex.test(e2));
  };

  const MyRolPermisGetAllApi = async () => {
    try {
      const response = await RolePermissionGetApi();
      if (response?.status === 200) {
        const roles = response?.data?.roles || [];
        setRolePermisAllData(roles);

        const matchedRole = roles.find((role) => role.roleId === Number(myUserId));

        if (matchedRole && myUserId !== 0) {
          setRoleId(matchedRole.roleId.toString());
          setMyroleName(matchedRole.roleName);
          setDropdownDisabled(true);
        } else {
          setRoleId('');
          setMyroleName('');
          setDropdownDisabled(false);
        }
      }
    } catch (error) {
      setLoader(false);
      toast.error('Failed to fetch roles');
    }
  };

  const RoleIdName = (e) => {
    const value = e.target.value;
    if (value) {
      const [roleId, roleName] = value.split(', ');
      setRoleId(roleId.trim());
      setMyroleName(roleName.trim());
    } else {
      setRoleId('');
      setMyroleName('');
    }
  };



// const { sharedValue, setSharedValue } = useContext(MyContext);

//   const handleValue = (val) => {
//     setSharedValue(sharedValue + val);
//     console.log('inside the handle', sharedValue);
//   };
//     console.log('inside the handle', sharedValue);


 const { myId, setMyId} = useContext(MyUseContext);
  console.log('dynamic Id for all user iddd--',myId)

  // post api 
  const SubcPostDataApi = async () => {
    if (FuncValidation()) {
      const formData = new FormData();
      formData.append('staffName', firstName);
      formData.append('staffEmail', email);
      formData.append('staffAddress', firstAdd);
      formData.append('staffPhone', phone);
      formData.append('staffGender', gender);
      formData.append('roleId', roleId);
      formData.append('staffLastName', lastName);
      formData.append('staffDOB', dob);
      formData.append('address2', secondAddress);
      formData.append('bloodGroup', bloodGroup);
      formData.append('city', city);
      formData.append('maritalStatus', maritalStatus);
      formData.append('nationality', nationality);
      formData.append('pinCode', pinCode);
      formData.append('religion', religion);
      formData.append('staffImage', imageFile);
      formData.append('state', state);
      formData.append('citizenship', citizenship);

      setLoader(true);
      try {
        const response = await StaffPostApi(formData);
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setemptyValue(response?.data?.status);
          setUserId(response?.data?.status);
          setFunction(response?.data?.otherstaff?.id);
          setMyId(response?.data?.otherstaff?.id); 


          localStorage.setItem('MyUserID', response?.data?.otherstaff?.id);
          setLoader(false);
        } else {
          toast.error(response?.data?.message);
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        toast.error('Failed to add profile');
      }
    }
  };

  const MyStaffGetById = async (id) => {
    setIdForUpdate(id);
    setLoader(true);
    try {
      const response = await StaffGetById(myUserId);
      if (response?.status === 200) {
        setUpdateStatus(response?.data?.status);
        setFirstName(response?.data?.user?.staffName || '');
        setLastName(response?.data?.user?.staffLastName || '');
        setPhone(response?.data?.user?.staffPhone || '');
        setEmail(response?.data?.user?.staffEmail || '');
        setOriginalMail(response?.data?.user?.staffEmail || '');
        setpinCode(response?.data?.user?.pinCode || '');
        setFirstAdd(response?.data?.user?.staffAddress || '');
        setSecondAddress(response?.data?.user?.address2 || '');
        setGender(response?.data?.user?.staffGender || '');
        setStatus(response?.data?.user?.staffStatus || '');
        setMaritalstatus(response?.data?.user?.maritalStatus || '');
        setState(response?.data?.user?.state || '');
        setCity(response?.data?.user?.city || '');
        setNationality(response?.data?.user?.nationality || '');
        setBloodGroup(response?.data?.user?.bloodGroup || '');
        setReligion(response?.data?.user?.religion || '');
        setImageFile(response?.data?.user?.staffImage || '');
        setCitizenship(response?.data?.user?.citizenship || '');
        dataFunct(response?.data?.user);
        const timestamp = response?.data?.user?.staffDOB;
        const formattedDate = timestamp ? timestamp.split("T")[0] : '';
        setDob(formattedDate);
        setLoader(false);
      } else {
        toast.error(response?.data?.msg || 'Failed to fetch user data');
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      toast.error('Failed to fetch user data');
    }
  };

  const MyStaffePutApi = async () => {
    if (FuncValidation()) {
      const formData = new FormData();
      if (originalMail !== email) {
        formData.append("staffEmail", email);
      }
      formData.append('staffName', firstName);
      formData.append('staffAddress', firstAdd);
      formData.append('staffPhone', phone);
      formData.append('staffGender', gender);
      formData.append('roleId', roleId);
      formData.append('staffLastName', lastName);
      formData.append('staffDOB', dob);
      formData.append('address2', secondAddress);
      formData.append('bloodGroup', bloodGroup);
      formData.append('city', city);
      formData.append('maritalStatus', maritalStatus);
      formData.append('nationality', nationality);
      formData.append('pinCode', pinCode);
      formData.append('religion', religion);
      formData.append('staffImage', imageFile);
      formData.append('state', state);
      formData.append('citizenship', citizenship);

      setLoader(true);
      try {
        const response = await StaffPutApi(myUserId, formData);
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setShow(false);
          setLoader(false);
        } else {
          toast.error(response?.data?.message || 'Failed to update profile');
          setShow(true);
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        toast.error('Failed to update profile');
      }
    }
  };

  const clearData = () => {
    setStatus('');
    setMaritalstatus('');
    setBloodGroup('');
    setNationality('');
    setState('');
    setCity('');
    setReligion('');
    setemptyValue('');
    setOriginalMail('');
    setUpdateStatus('');
    setFirstName('');
    setLastName('');
    setFirstAdd('');
    setSecondAddress('');
    setEmail('');
    setPhone('');
    setpinCode('');
    setDob('');
    setCitizenship('');
    setIsValidFirstNameRequired(false);
    setIsValidLastNameRequired(false);
    setIsValidFirstAddRequired(false);
    setIsValidsecondAddressRequired(false);
    setIsValidPhoneRequired(false);
    setIsValidPinCodeRequired(false);
    setIsValidEmailRequired(false);
    setIsValidDobRequired(false);
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
        `}
      </style>
      <div className="container-fluid">
        <div className="form-container">
          <p className="heading-16 mb-3" style={{ color: '#1a3c34', fontWeight: '700' }}>Basic Information</p>
          <div className="row px-1 pt-2 row-margin">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="firstName"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter first name (letters only)"
                  aria-label="First Name"
                >
                  First Name <span style={{ color: '#dc3545' }}>*</span>
                </label>

                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidFirstNameRequired && firstName ? 'valid-indicator' : ''}`}
                  id="firstName"
                  placeholder="John"
                  value={emptyValue === "success" ? '' : firstName}
                  onChange={(e) => handleName(e.target.value)}
                  tabIndex="1"
                  aria-describedby="firstNameError"
                />
                {isValidFirstNameRequired && (
                  <div id="firstNameError" className="error-message">
                    Valid first name is required
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="lastName"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter last name (letters only)"
                  aria-label="Last Name"
                >
                  Last Name <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidLastNameRequired && lastName ? 'valid-indicator' : ''}`}
                  id="lastName"
                  placeholder="Doe"
                  value={emptyValue === "success" ? '' : lastName}
                  onChange={(e) => handleSecondName(e.target.value)}
                  tabIndex="2"
                  aria-describedby="lastNameError"
                />
                {isValidLastNameRequired && (
                  <div id="lastNameError" className="error-message">
                    Valid last name is required
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="phone"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter 10-digit phone number"
                  aria-label="Contact Number"
                >
                  Contact Number <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidPhoneRequired && phone ? 'valid-indicator' : ''}`}
                  id="phone"
                  placeholder="Number"
                  value={emptyValue === "success" ? '' : phone}
                  onChange={(e) => handlePhone(e.target.value)}
                  tabIndex="3"
                  aria-describedby="phoneError"
                />
                {isValidPhoneRequired && (
                  <div id="phoneError" className="error-message">
                    Valid phone is required
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row px-1 row-margin">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="gender"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select your gender"
                  aria-label="Gender"
                >
                  Gender <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <select
                  className="form-select form-select-sm form-focus label-color"
                  id="gender"
                  value={emptyValue === "success" ? '' : gender}
                  onChange={(e) => setGender(e.target.value)}
                  tabIndex="4"
                  aria-describedby="genderError"
                >
                  <option value="">--Choose--</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="email"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter a valid email address"
                  aria-label="Email"
                >
                  Email <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidEmailRequired && email ? 'valid-indicator' : ''}`}
                  id="email"
                  placeholder="Email"
                  disabled={updateStatus === "success"}
                  value={emptyValue === "success" ? '' : email}
                  onChange={(e) => handleEmail(e.target.value)}
                  tabIndex="5"
                  aria-describedby="emailError"
                />
                {isValidEmailRequired && (
                  <div id="emailError" className="error-message">
                    Valid email is required
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="dob"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select your date of birth (YYYY-MM-DD)"
                  aria-label="Date of Birth"
                >
                  Date of Birth <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="date"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidDobRequired && dob ? 'valid-indicator' : ''}`}
                  id="dob"
                  value={emptyValue === "success" ? '' : dob}
                  onChange={(e) => handleDob(e.target.value)}
                  tabIndex="6"
                  aria-describedby="dobError"
                />
                {isValidDobRequired && (
                  <div id="dobError" className="error-message">
                    Valid dob is required
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row px-1 row-margin">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="status"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select account status"
                  aria-label="Status"
                >
                  Status <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <select
                  className="form-select form-select-sm form-focus label-color"
                  id="status"
                  value={emptyValue === "success" ? '' : status}
                  onChange={(e) => setStatus(e.target.value)}
                  tabIndex="7"
                  aria-describedby="statusError"
                >
                  <option value="">--Choose--</option>
                  <option value="true">Active</option>
                  <option value="false">InActive</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="maritalStatus"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select marital status"
                  aria-label="Marital Status"
                >
                  Marital Status <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <select
                  className="form-select form-select-sm form-focus label-color"
                  id="maritalStatus"
                  value={emptyValue === "success" ? '' : maritalStatus}
                  onChange={(e) => setMaritalstatus(e.target.value)}
                  tabIndex="8"
                  aria-describedby="maritalStatusError"
                >
                  <option value="">--Choose--</option>
                  <option value="married">Married</option>
                  <option value="Unmarried">Unmarried</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="roleName"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select user role"
                  aria-label="Role Name"
                >
                  Role Name <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <select
                  className="form-select form-select-sm form-focus-input heading-14 grey-input-text-color input-border-color"
                  id="roleName"
                  disabled={dropdownDisabled || updateStatus === "success"}
                  value={roleId && myroleName ? `${roleId}, ${myroleName}` : ''}
                  onChange={RoleIdName}
                  tabIndex="9"
                  aria-describedby="roleNameError"
                >
                  <option value="">--Choose--</option>
                  {rolePermisAllData?.map((item) => (
                    <option key={item.roleId} value={`${item.roleId}, ${item.roleName}`}>
                      {item.roleName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row px-1 row-margin">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="state"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select your state or province"
                  aria-label="State or Province"
                >
                  State / Province <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <select
                  className="form-select form-select-sm form-focus label-color"
                  id="state"
                  value={emptyValue === "success" ? '' : state}
                  onChange={(e) => setState(e.target.value)}
                  tabIndex="10"
                  aria-describedby="stateError"
                >
                  <option value="">--Choose--</option>
                  <option value="uttar pradesh">Uttar Pradesh</option>
                  <option value="delhi">Delhi</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="city"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select your city"
                  aria-label="City"
                >
                  City <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <select
                  className="form-select form-select-sm form-focus label-color"
                  id="city"
                  value={emptyValue === "success" ? '' : city}
                  onChange={(e) => setCity(e.target.value)}
                  tabIndex="11"
                  aria-describedby="cityError"
                >
                  <option value="">--Choose--</option>
                  <option value="noida">Noida</option>
                  <option value="aligarh">Aligarh</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="pinCode"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter 6-digit pin code"
                  aria-label="Pin Code"
                >
                  Pin Code <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidPinCodeRequired && pinCode ? 'valid-indicator' : ''}`}
                  id="pinCode"
                  placeholder="Enter pin code"
                  value={emptyValue === "success" ? '' : pinCode}
                  onChange={(e) => handlePinCode(e.target.value)}
                  tabIndex="12"
                  aria-describedby="pinCodeError"
                />
                {isValidPinCodeRequired && (
                  <div id="pinCodeError" className="error-message">
                    Valid pin code is required
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row px-1 row-margin">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="nationality"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select your nationality"
                  aria-label="Nationality"
                >
                  Nationality <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <select
                  className="form-select form-select-sm form-focus label-color"
                  id="nationality"
                  value={emptyValue === "success" ? '' : nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  tabIndex="13"
                  aria-describedby="nationalityError"
                >
                  <option value="">--Choose--</option>
                  <option value="indian">Indian</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="citizenship"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select your citizenship"
                  aria-label="Citizenship"
                >
                  Citizenship <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <select
                  className="form-select form-select-sm form-focus label-color"
                  id="citizenship"
                  value={emptyValue === "success" ? '' : citizenship}
                  onChange={(e) => setCitizenship(e.target.value)}
                  tabIndex="14"
                  aria-describedby="citizenshipError"
                >
                  <option value="">--Choose--</option>
                  <option value="indian">Indian</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="religion"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select your religion"
                  aria-label="Religion"
                >
                  Religion <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <select
                  className="form-select form-select-sm form-focus label-color"
                  id="religion"
                  value={emptyValue === "success" ? '' : religion}
                  onChange={(e) => setReligion(e.target.value)}
                  tabIndex="15"
                  aria-describedby="religionError"
                >
                  <option value="">--Choose--</option>
                  <option value="muslim">Muslim</option>
                  <option value="hindu">Hindu</option>
                  <option value="sikh">Sikh</option>
                  <option value="isai">Isai</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row px-1 row-margin">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="bloodGroup"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select your blood group"
                  aria-label="Blood Group"
                >
                  Blood Group <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <select
                  className="form-select form-select-sm form-focus label-color"
                  id="bloodGroup"
                  value={emptyValue === "success" ? '' : bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  tabIndex="16"
                  aria-describedby="bloodGroupError"
                >
                  <option value="">--Choose--</option>
                  <option value="a">A</option>
                  <option value="b">B</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="address1"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter primary address"
                  aria-label="Address Line 1"
                >
                  Address Line 1 <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidFirstAddRequired && firstAdd ? 'valid-indicator' : ''}`}
                  id="address1"
                  placeholder="Address"
                  value={emptyValue === "success" ? '' : firstAdd}
                  onChange={(e) => handleFirstAdd(e.target.value)}
                  tabIndex="17"
                  aria-describedby="address1Error"
                />
                {isValidFirstAddRequired && (
                  <div id="address1Error" className="error-message">
                    Valid address is required
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="address2"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter secondary address"
                  aria-label="Address Line 2"
                >
                  Address Line 2 <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidsecondAddressRequired && secondAddress ? 'valid-indicator' : ''}`}
                  id="address2"
                  placeholder="Enter Address"
                  value={emptyValue === "success" ? '' : secondAddress}
                  onChange={(e) => handleSecondAdd(e.target.value)}
                  tabIndex="18"
                  aria-describedby="address2Error"
                />
                {isValidsecondAddressRequired && (
                  <div id="address2Error" className="error-message">
                    Valid address is required
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
                onClick={updateStatus === "success" ? MyStaffePutApi : SubcPostDataApi}
                disabled={loader}
                tabIndex="22"
                aria-label={updateStatus === "success" ? 'Update Profile' : 'Add Profile'}
              >
                {loader ? (
                  <>
                    <span>Loading</span>
                    <span className="loader"></span>
                  </>
                ) : (
                  updateStatus === "success" ? 'Update Profile' : 'Add Profile'
                )}
              </button>
              <button
                type="button"
                className="btn btn-outline-success heading-12 ms-2"
                onClick={clearData}
                tabIndex="23"
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

export default User_basic_infomation;