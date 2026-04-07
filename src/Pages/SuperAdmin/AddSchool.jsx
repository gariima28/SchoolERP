
// correct code with validation

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { addNewSchoolApi, getAllPlanApi, getAllByIdPlanApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import { useForm } from 'react-hook-form';
//phone input
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Container = styled.div`
.table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
}
  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }

  .fontSize{
    font-size: 16px !important;
  }

  .main-span span{
    font-size: 20px !important;
  }

  .headingbg {
    background-color: var(--headingBackgroundColor);
    border-radius: 5px;
  }
  .card {
    border: none;
  }

  .form-control, .form-control::placeholder, .form-select {
    font-size: var(--font-size-14) !important;
    color: var(--greyInputTextColor);
  }

  .form-control, .form-select {
    background-color: #fff !important;
    box-shadow: none !important;
    border-color: var(--greyInputborderColor);
  }

  .form-control:focus, .form-select:focus {
    box-shadow: none !important;
    border-color: var(--greyInputborderColor);
  }

  .formcontrolFile {
    color: Black;
  }

  .text-danger {
    color: #dc3545;
    font-size: 0.875em;
    margin-top: 0.25rem;
  }

  .orderModal{
  border-radius:20px;
}

.planCard{
  border:3px solid #008479;
  border-radius:18px;
  padding:22px;
  background:#f7f7f7;
}

.priceText{
  color:#008479;
  font-weight:700;
}
.priceText span{
  font-size:16px;
  color:#555;
  font-weight:500;
}

.priceRow{
  display:flex;
  justify-content:space-between;
  font-size:18px;
  margin:12px 0;
}

.grandTotal{
  color:#008479;
  font-weight:800;
}

/* .features{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:12px;
  color:#008479;
  font-weight:600;
  margin-top:10px;
  font-size:12px;
} */
.features{
  max-height: 120px;   /* adjust height as needed */
  overflow-y: auto;
    grid-template-columns:repeat(2,1fr);
  color:#008479;

  padding-right: 6px;  /* optional: space for scrollbar */
}

/* optional nice scrollbar */
.features::-webkit-scrollbar {
  width: 6px;
}
.features::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}
.features{
  position: relative;
  max-height: 120px;
  overflow-y: scroll !important;
  padding-bottom: 12px;
}

/* bottom fade shadow */
.features::after{
  content: "";
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(255,255,255,0), #fff);
}
.features{
  position: relative;
  max-height: 120px;
  overflow-y: scroll;   /* force scrollbar always visible */
  padding-bottom: 12px;
}

/* visible scrollbar styling */
.features::-webkit-scrollbar {
  width: 6px;
}
.features::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.features::-webkit-scrollbar-thumb {
  background: #008479;
  border-radius: 10px;
}
.features{
  height: 120px;          /* FIX: force fixed height */
  max-height: 120px;
  overflow-y: scroll !important; 
}

/* make scrollbar visible on all browsers */
.features{
  scrollbar-width: thin;           /* Firefox */
  scrollbar-color: #008479 #f1f1f1;
}

.features::-webkit-scrollbar {
  width: 6px;
  display: block;
}
.features::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.features::-webkit-scrollbar-thumb {
  background: #008479;
  border-radius: 10px;
}
.features{
  height:120px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 14px;   /* reserve space for scrollbar */
  box-sizing: content-box;
}
.include span{
  border-bottom:2px solid #008479;
  font-size:18px !important;
}
/* visible scrollbar */
.features::-webkit-scrollbar {
  width: 12px;
}
.features::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.features::-webkit-scrollbar-thumb {
  background: #008479;
  border-radius: 10px;
  border: 3px solid #f1f1f1; 
}

/* Firefox */
.features{
  scrollbar-width: auto;
  scrollbar-color: #008479 #f1f1f1;
}

.paymentBtn{
  background:#008479;
  color:#fff;
  padding:6px 20px;
  border-radius:8px;
  font-size:16px;
}

.cancelBtn{
  background:#fff;
  border:1px solid #ccc;
  padding:6px 20px;
  border-radius:8px;
}


`;
const CollapsedContainer = styled.div`
  .collapse {
    transition: height 0.3s ease;
  }
  
`;

const AddSchool = () => {

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const [loaderState, setLoaderState] = useState(false);
  const [schoolFormOpen, setSchoolFormOpen] = useState(true);
  const [adminInfoOpen, setAdminInfoOpen] = useState(false);
  const [paymentInfoOpen, setPaymentInfoOpen] = useState(false);
  const [allPlans, setAllPlan] = useState([]);
  const [loader, setLoader] = useState(false)

  const [planPrice, setPlanPrice] = useState('');

  const [duration, setDuration] = useState('');
  const [totalDays, setTotalDays] = useState('');
  const [studentlimit, setStudentLimit] = useState('');
  const [planName, setPlanName] = useState('');
  const [allFeatureForPay, setAllFeatureForPay] = useState([]);
  const [checkPayment, setCheckPayment] = useState(false);
  const [checkProceedBtn, setCheckProceedBtn] = useState(false);
  const [adminFile, setAdminFile] = useState('');
  const [schoolFile, setSchoolFile] = useState('');

  const [paymentLink, setPaymentLink] = useState('');
  console.log('linkk for payment gateway', paymentLink)
  const [call, setCall] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    getAllPlans();
  }, [token]);


  // useEffect(() => {
  //   if (call) {
  //     handleSubmit(addNewSchool)();   
  //   }
  // }, [call]);

  const getAllPlans = async () => {
    setLoaderState(true);
    try {
      const response = await getAllPlanApi('', '', '');
      console.log('all packages with price', response)
      if (response?.status === 200 && response?.data?.status === 'success') {
        setLoaderState(false);
        setAllPlan(response?.data?.plans);
      } else {
        setLoaderState(false);
        toast.error(response?.data.message);
      }
    }
    catch (error) {
      setLoaderState(false);
      // setLoaderState(false);
      console.error('Error fetching student data:', error);
      if (error?.response?.data?.statusCode === 401) {
        sessionStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }
    } finally {
      setLoaderState(false);
    }
  };
  // Get All Api by id
  const getByIdPlans = async (id) => {
    console.log('value id for get by id', id)
    setLoader(true)
    try {
      const response = await getAllByIdPlanApi(id);
      console.log('value of plan by id', response)
      if (response?.status === 200) {
        setPlanPrice(response?.data?.plans?.price);
        setDuration(response?.data?.plans?.type);
        setTotalDays(response?.data?.plans?.totalDays);
        setStudentLimit(response?.data?.plans?.studentLimit);
        setPlanName(response?.data?.plans?.planName);
        setAllFeatureForPay(response?.data?.plans?.usedAddons);
        setLoader(false)
        setCheckProceedBtn(true);
      } else {
        toast.error(response?.data?.message);
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
    }
  }

  const toggleSchoolForm = () => {
    setSchoolFormOpen(!schoolFormOpen);
    setAdminInfoOpen(false);
    setPaymentInfoOpen(false);
  };

  const toggleAdminInfo = () => {
    setAdminInfoOpen(!adminInfoOpen);
    setSchoolFormOpen(false);
    setPaymentInfoOpen(false);
  };

  const togglePaymentInfo = () => {
    setPaymentInfoOpen(!paymentInfoOpen);
    setSchoolFormOpen(false);
    setAdminInfoOpen(false);
  };
  
  const addNewSchool = async (data) => {
    setLoaderState(true);
    try {
      const formData = new FormData();
      formData.append('schoolName', data?.schoolName);
      formData.append('schoolAddress', data?.schoolAddress);
      formData.append('schoolEmail', data?.schoolEmail);
      formData.append('schoolPhone', data?.schoolPhone);
      formData.append('planId', data?.planId);
      formData.append('schoolDis', data?.schoolDis);
      // formData.append('schoolImage', schoolFile);
      formData.append('schoolImage', data?.schoolLogo[0]);
      formData.append('adminName', data?.adminName);
      formData.append('gender', data?.gender);
      formData.append('adminAddress', data?.adminAddress);
      formData.append('adminPhone', data?.adminPhone);
      formData.append('adminEmail', data?.adminEmail);
      formData.append('adminImage', data?.adminPhoto[0]);
      // formData.append('adminImage', adminFile);

      const response = await addNewSchoolApi(formData);
      if (response?.status === 200) {

        if (response?.data?.status === 'success') {
          toast.success(response?.data?.message)
          setPaymentLink(response?.data?.linkUrl)
          setCheckPayment(true)
          setTimeout(() => {
            // navigate('/superadmin/schools/allSchools')
          }, 2000);
        } else {
          toast.error(response?.data.message, 'else1');
        }
      } else {
        toast.error(response?.data.message, 'else2');
      }
    } catch (error) {
      setLoaderState(false);
      toast.error('Error adding school', error);
    } finally {
      setLoaderState(false);
    }
  };

  return (
    <>
      <Container>
        {loaderState && <DataLoader />}
        <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
          <div className="row pt-2 pb-3">
            <nav className='breadcrumnav' aria-label="breadcrumb">
              <ol className="breadcrumb mb-2">
                <li className="breadcrumb-item">
                  <Link to="/" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/superadmin/schools/allSchools" className='greyText text-decoration-none'><h2>Schools &gt; </h2></Link>
                </li>
                <li className="breadcrumb-item active greenText" aria-current="page"><h2> Add Schools</h2></li>
              </ol>
            </nav>
            <h2>Add School</h2>
          </div>

          {/* <form > */}
          <form onSubmit={handleSubmit(addNewSchool)}>
            <div className="row ps-2 pe-2">
              <div className="bg-white cardradius p-3">
                {/* School Form Collapse */}
                <div className={`d-inline-flex gap-1 p-2 col-12 headingbg ${schoolFormOpen ? 'active' : ''}`}>
                  <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#SchoolFormCollapse" role="button" aria-expanded={schoolFormOpen} aria-controls="SchoolFormCollapse">
                    School Form
                  </h2>
                  <span className='text-end' onClick={toggleSchoolForm} style={{ cursor: 'pointer' }}>
                    {schoolFormOpen ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> :
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
                  </span>
                </div>
                <CollapsedContainer>
                  <div className={`collapse ${schoolFormOpen ? 'show' : ''}`} id="SchoolFormCollapse">
                    <div className="p-3">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="schoolName" className="form-label font14">School Name</label>
                          <input id="schoolName" type="text" className={`form-control font14 ${errors.schoolName ? 'border-danger' : ''}`} placeholder="School Name" {...register('schoolName', { required: 'School Name is required *', validate: value => { if (!/^[A-Z0-9]/.test(value)) { return 'School Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s.'-]+$/.test(value)) { return 'Invalid Characters in School Name'; } return true; } })} />
                          {errors.schoolName && <p className="font12 text-danger">{errors.schoolName.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="schoolAddress" className="form-label font14">School Address</label>
                          <input id="schoolAddress" type="text" className={`form-control font14 ${errors.schoolAddress ? 'border-danger' : ''}`} placeholder="School Address" {...register("schoolAddress", { required: 'School Address is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } return true; } })} />
                          {errors.schoolAddress && <p className="font12 text-danger">{errors.schoolAddress.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="schoolEmail" className="form-label font14">School Email</label>
                          <input id="schoolEmail" type="email" className={`form-control font14 ${errors.schoolEmail ? 'border-danger' : ''}`} placeholder="School Email" {...register('schoolEmail', { required: 'School Email is required *', validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
                          {errors.schoolEmail && <p className="font12 text-danger">{errors.schoolEmail.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="schoolPhone" className="form-label font14">School Phone</label>
                          <input id="schoolPhone" type="tel" className={`form-control font14 ${errors.schoolPhone ? 'border-danger' : ''}`} placeholder="Enter Phone Number" {...register('schoolPhone', { required: 'School Phone Number is required *', validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                          {errors.schoolPhone && <p className="font12 text-danger">{errors.schoolPhone.message}</p>}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="schoolDis" className="form-label font14">School Description</label>
                          <input id="schoolDis" type="text" className={`form-control font14 ${errors.schoolDis ? 'border-danger' : ''}`} placeholder="School Description" {...register('schoolDis', { required: 'School Description is required *', validate: value => { if (!/^[A-Za-z]/.test(value)) { return 'School Description must start with a Character'; } return true; } })} />
                          {errors.schoolDis && <p className="font12 text-danger">{errors.schoolDis.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="schoolLogo" className="form-label font14">School Logo</label>
                          <input id="schoolLogo" type="file" className={`form-control font14 ${errors.schoolLogo ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('schoolLogo', { required: 'School Logo is required *' })} />
                          {errors.schoolLogo && <p className="font12 text-danger">{errors.schoolLogo.message}</p>}
                        </div>
                        {/* <div className="col-md-6 mb-3">
                          <label htmlFor="schoolLogo" className="form-label font14">School Logo</label>
                          <input id="schoolLogo" type="file" className='form-control font14' onChange={(e) => setSchoolFile(e.target.files[0])}  accept='.jpg, .jpeg, .png' />
                          {errors.schoolLogo && <p className="font12 text-danger">{errors.schoolLogo.message}</p>}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </CollapsedContainer>

                {/* Admin Form Collapse */}
                <div className={`d-inline-flex gap-1 p-2 col-12 mt-3 headingbg ${adminInfoOpen ? 'active' : ''}`}>
                  <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#AdminFormCollapse" role="button" aria-expanded={adminInfoOpen} aria-controls="AdminFormCollapse">
                    Admin Form
                  </h2>
                  <span className='text-end' onClick={toggleAdminInfo} style={{ cursor: 'pointer' }}>
                    {adminInfoOpen ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> :
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
                  </span>
                </div>
                <CollapsedContainer>
                  <div className={`collapse ${adminInfoOpen ? 'show' : ''}`} id="AdminFormCollapse">
                    <div className="p-3">
                      <div className="row">

                        {/* Admin Fields */}
                        <div className="col-md-6 mb-3">
                          <label htmlFor="adminName" className="form-label font14">Admin Name</label>
                          <input id="adminName" type="text" className={`form-control font14 ${errors.adminName ? 'border-danger' : ''}`} placeholder="Admin Name" {...register('adminName', { required: 'Admin Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Admin Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Admin Name'; } return true; } })} />
                          {errors.adminName && <p className="font12 text-danger">{errors.adminName.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="gender" className="form-label font14">Gender</label>
                          <select id="gender" className={`form-select font14 ${errors.gender ? 'border-danger' : ''}`} {...register('gender', { required: 'Admin Gender is required *' })}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.gender && <p className="font12 text-danger">{errors.gender.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="adminAddress" className="form-label font14">Admin Address</label>
                          <input id="adminAddress" type="text" className={`form-control font14 ${errors.adminAddress ? 'border-danger' : ''}`} placeholder="Admin Address" {...register("adminAddress", { required: 'Admin Address is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } return true; } })} />
                          {errors.adminAddress && <p className="font12 text-danger">{errors.adminAddress.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="adminPhone" className="form-label font14">Admin Phone Number</label>
                          <input id="adminPhone" type="tel" className={`form-control font14 ${errors.adminPhone ? 'border-danger' : ''}`} placeholder="Enter Phone Number" {...register('adminPhone', { required: 'Admin Phone Number is required *', validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                          {errors.adminPhone && <p className="font12 text-danger">{errors.adminPhone.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="adminEmail" className="form-label font14">Admin Email</label>
                          <input id="adminEmail" type="email" className={`form-control font14 ${errors.adminEmail ? 'border-danger' : ''}`} placeholder="Enter Admin Email" {...register('adminEmail', { required: 'Admin Email is required *', validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
                          {errors.adminEmail && <p className="font12 text-danger">{errors.adminEmail.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="adminPhoto" className="form-label font14">Photo</label>
                          <input id="adminPhoto" type="file" className={`form-control font14 ${errors.adminPhoto ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('adminPhoto', { required: 'Photo is required *' })} />
                          {errors.adminPhoto && <p className="font12 text-danger">{errors.adminPhoto.message}</p>}
                        </div>
                        {/* <div className="col-md-6 mb-3">
                          <label htmlFor="adminPhoto" className="form-label font14">Photo</label>
                          <input id="adminPhoto" type="file" className='form-control font14'  onChange={(e) => setAdminFile(e.target.files[0])}  accept='.jpg, .jpeg, .png'  />
                          {errors.adminPhoto && <p className="font12 text-danger">{errors.adminPhoto.message}</p>}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </CollapsedContainer>

                {/* new payment section collapse */}
                <div className={`d-inline-flex gap-1 p-2 col-12 mt-3 headingbg ${adminInfoOpen ? 'active' : ''}`}>
                  <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#payment" role="button" aria-expanded={adminInfoOpen} aria-controls="payment">
                    Payment Details
                  </h2>
                  <span className='text-end' onClick={togglePaymentInfo} style={{ cursor: 'pointer' }}>
                    {paymentInfoOpen ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> :
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
                  </span>
                </div>
                <CollapsedContainer>
                  <div className={`collapse ${paymentInfoOpen ? 'show' : ''}`} id="payment">
                    <div className="p-3">
                      <div className='row'>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="planId" className="form-label font14">School Package</label>
                          <select
                            id="planId"
                            className={`form-select font14 ${errors.planId ? 'border-danger' : ''}`}
                            {...register('planId', { required: 'Package selection is required *' })}
                            onChange={(e) => getByIdPlans(e.target.value)}
                          >
                            <option value="">Select Package</option>

                            {allPlans?.map((plan) => (
                              <option key={plan.planId} value={plan.planId}>
                                {plan.planName}
                              </option>
                            ))}
                          </select>
                          {errors.planId && <p className="font12 text-danger">{errors.planId.message}</p>}
                        </div>
                        {
                          planPrice && (
                            <div className="col-md-6 mb-3">
                              <div className='mb-0 main-span'>
                                <p className="fontSize" style={{ paddingTop: '30px' }}> Package Price: <span style={{ color: '#008479', fontSize: '20px' }}>{`₹ ${planPrice}/-`}</span></p>
                              </div>
                            </div>
                          )
                        }

                      </div>
                    </div>
                  </div>
                </CollapsedContainer>

                <div className="d-flex justify-content-center mt-3 mb-3">
                  <button className='me-2 btn addButtons text-white' type="button" aria-expanded="false" style={{ backgroundColor: "#008479", color: "#fff", border: '1px solid #008479' }} class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" disabled={!checkProceedBtn}>Next</button>
                  {/* <button className='me-2 btn addButtons text-white' type="submit">Submit</button> */}
                  <Link className='ms-2 btn cancelButtons text-black' type="button" to='/superadmin/schools/allSchools'>Cancel</Link>
                </div>

                {/* modal area  */}

                <div class="modal " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content orderModal p-4">
                      {
                        !checkPayment ? (
                          <>

                            <div className="d-flex align-items-center gap-2 mb-3">
                              <svg width="24" height="24" viewBox="0 0 21 20" fill="none">
                                <path d="M0 16L0.5 14H6L5.5 16H0ZM2 12L2.5 10H9L8.5 12H2ZM5 20C4.45 20 3.97 19.80 3.58 19.41C3.19 19.02 3 18.55 3 18H17.57L19.05 6.02H4.5C4.56 5.45 4.78 4.97 5.15 4.58C5.51 4.19 5.96 4 6.5 4H19C19.6 4.01 20.1 4.25 20.5 4.7C20.9 5.15 21.05 5.67 20.97 6.27L19.47 18.27C19.40 18.77 19.18 19.18 18.81 19.51C18.43 19.83 18 20 17.5 20H5Z" fill="#008479" />
                              </svg>
                              <h4 className="mb-0 fw-bold">Order Summary</h4>
                            </div>
                            <div className="planCard">
                              <div className="d-flex justify-content-between align-items-center">
                                <h3 className="fw-bold">{planName}</h3>
                                <h2 className="priceText">₹{planPrice} <span>/ {duration}</span></h2>
                              </div>
                              <hr />
                              <div className="priceRow">
                                <span>Sub Total</span>
                                <span>₹{planPrice}</span>
                              </div>
                              <div className="priceRow">
                                <span>Total Days</span>
                                <span>{totalDays}</span>
                              </div>
                              <div className="priceRow">
                                <span>Student Limit</span>
                                <span>{studentlimit}</span>
                              </div>
                              <hr />

                              <div className="d-flex justify-content-between align-items-center mt-2">
                                <h3 className="fw-bold">Grand Total</h3>
                                <h1 className="grandTotal">₹{planPrice}/-</h1>
                              </div>

                            </div>

                            {/* FEATURES */}
                            <p className="mt-4 fw-bold include" style={{ fontSize: '18px' }}>What's Include in <span >{planName}</span></p>

                            <div className="features" style={{ border: '1px solid #dbdbdb', padding: '8px', borderRadius: '10px' }}>
                              {
                                allFeatureForPay?.map((item, index) => (
                                  <>
                                    <div>✔ {item?.featureName}</div>
                                  </>
                                ))
                              }
                            </div>
                          </>

                        )
                          :
                          (
                            <>
                              {/* <div >
                                <iframe style={{width:'-webkit-fill-available'}} src={paymentLink} frameborder="0"></iframe>
                              </div> */}
                              <div>
                                <iframe
                                  title="Payment Gateway"
                                  src={paymentLink}
                                  style={{ width: "100%", height: "600px", border: "none" }}
                                />
                              </div>
                            </>
                          )
                      }
                      {/* BUTTONS */}
                      <div className="text-center mt-4">
                        {/* <button type='button' className="btn paymentBtn" onClick={()=> setCall(true)} >{`${!checkPayment ? 'Proceed to Payment' : 'Back to Plan Details'}`}</button> */}
                        <button type='submit' className="btn paymentBtn" >{`${!checkPayment ? 'Proceed to Payment' : 'Back to Plan Details'}`}</button>
                        {/* <button type='submit' className="btn paymentBtn" onClick={()=> setCheckPayment(!checkPayment)} >{`${!checkPayment ? 'Proceed to Payment' : 'Back to Plan Details'}`}</button> */}
                        <button type='button' className="btn cancelBtn ms-3" data-bs-dismiss="modal" onClick={() => setCheckPayment(false)}>Cancel</button>
                      </div>

                    </div>
                  </div>
                </div>


              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default AddSchool;
{/* <div className='' style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                        <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                      </div> */}