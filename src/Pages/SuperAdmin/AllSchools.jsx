import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import toast, { Toaster } from 'react-hot-toast';
import { deleteSchoolApi, getAllActiveInActiveSpeFeatApi, getAllPlanApi, getSchoolDataApi, getSchoolDataByIdApi, updateSchoolApi, updateSpecialFeatureInSchoolApi } from 'src/Utils/Apis';
import { Icon } from '@iconify/react';
import DataLoader from 'src/Layouts/Loader';
import ActionControls from 'src/Layouts/ActionControls';
import ReactPaginate from 'react-paginate';
import { useForm } from 'react-hook-form';

const Container = styled.div`
  width: 100%;
  .scrollHide::-webkit-scrollbar{
    display: none !important;
  }

  .table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
}
  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }

  .eventablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
  }

  .oddModaltablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
    border-bottom: 1.5px solid var(--darkGreenBorderColor);
  }

  .form-check-input{
    box-shadow: none ;
  }

  .formdltcheck:checked{
    background-color: #B50000;
    border-color: #B50000;
  }

  .formEditSpecFeatcheck:checked{
    background-color: #00A67E;
    border-color: #00A67E;
  }

  .modalHighborder{
    border-bottom: 2px solid var(--modalBorderColor);
  }

  .modalLightBorder{
    border-bottom: 1px solid var(--modalBorderColor);
  }

  .correvtSVG{
    position: relative;
    width: fit-content ;
    margin-left: 43% !important;
    margin-bottom: -16% !important;
    background-color: #2BB673;
    width: 73px;
    height: 73px;
    align-items: center;
  }

  .deleteSVG{
    position: relative;
    width: fit-content ;
    margin-left: 43% !important;
    margin-bottom: -18% !important;
    background-color: #fff;
  }
  
  .warningHeading{
    font-size: var(--font-size-20);
  }

  .warningText{
    font-size: var(--font-size-15);
    line-height: 22px;
    color: var(--greyInputTextColor) !important;
  }

  .textVerticalCenter{
    line-height: 22px;
  }
  
  .form-check-input{
    width: 18px;
    height: 18px;
  }

  .formcontrolinput{
    border-radius: 0px !important;
  }

  .contbtn{
    margin-left: 41% !important;
    margin-top: -20% !important;
  }

  .greydiv{
    background-color: #FBFBFB;
  }
  .for-margin-top{
    margin-top: -11px;
  }

  .form-control, .form-control::placeholder, .form-select{
    font-size: var(--font-size-14) !important;
    color: var(--greyInputTextColor);
    
  }

  .form-control, .form-select{
    background-color: #fff !important;
    box-shadow: none !important;
    border-color: var(--greyInputborderColor);
  }

  .form-control:focus, .form-select:focus{
    box-shadow: none !important;
    color: var(--greyInputTextColor) !important;
    border-color: var(--greyInputborderColor);
  }

  .formcontrolFile{
    color: Black;
  }


`;

const AllSchools = () => {

  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');
  const [schoolData, setSchoolData] = useState([]);
  //loader State
  const [loaderState, setloaderState] = useState(false);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [getSchoolIdDataName, setgetSchoolIdDataName] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [deleteSchoolId, setDeleteSchoolId] = useState(false);
  const [allActiveInActiveSpeFeature, SetAllActiveInActiveSpeFeature] = useState([]);
  const [allPlans, setAllPlan] = useState([])
  const [originalFeatures, setOriginalFeatures] = useState([]);
  const [viewFeaturesData, setViewFeaturesData] = useState([])
  const [DeleteWarning, setDeleteWarning] = useState(true);
  const [EditWarning, setEditWarning] = useState(true);
  const [SpecialFeatureWarning, setSpecialFeatureWarning] = useState(true);
  const [UpdateSpecialFeatureWarning, setUpdateSpecialFeatureWarning] = useState(true);
  const [updateSchoolId, setupdateSchoolId] = useState('')
  const [searchKeyData, setSearchKeyData] = useState('');
  const [isCheckedFeature, setIsCheckedFeature] = useState([]);
  const [addFeature, setAddFeature] = useState([]);
  const [removeFeature, setRemoveFeature] = useState([]);
  const [currentSchoolPlanId, setCurrentSchoolPlanId] = useState();
  const [checkedFeaId, setCheckedFeaId] = useState();

  // form validate
  const { register, handleSubmit, formState: { errors }, setValue, values } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    getAllSchoolData(searchKeyData);
    getAllPlans();
  }, [token, pageNo])

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  const getAllSchoolData = async (searchKey) => {
    try {
      setloaderState(true);
      var response = await getSchoolDataApi(searchKey === 'search' ? '' : searchKey, pageNo, pageSize);

      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setSchoolData(response?.data?.schools);
          setCurrentPage(response?.data?.currentPage);
          setTotalPages(response?.data?.totalPages);

          setTimeout(() => {
            setDeleteWarning(true);
            setEditWarning(true);
            setUpdateSpecialFeatureWarning(true);
            setSpecialFeatureWarning(true);
          }, 1200);
        }
      } else {
        setloaderState(false);
        // console.log(response.data.message);
      }
    } catch (error) {
      setloaderState(false);
      setloaderState(false);
      console.error('Error fetching student data:', error);

      if (error?.response?.data?.statusCode === 401) {
        sessionStorage.removeItem('token');
        setTimeout(() => {
          navigate('/');
        }, 200);
      }
    }
    finally {
      setloaderState(false);
    }
  };

  const getAllPlans = async () => {
    setloaderState(true);
    try {
      const searchKey = ''
      const pageNo = 1
      const size = 10
      var response = await getAllPlanApi('', '', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setAllPlan(response?.data?.plans);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message)
        }
      }
      else {
        setloaderState(false);
        toast.error(response?.data?.message)
      }
    }
    catch (error) {
      setloaderState(false);
      setloaderState(false);
      toast.error(error)
    }
    finally {
      setloaderState(false);
    }
  }

  const getSchoolDataById = async (id) => {
    try {
      setloaderState(true);
      setupdateSchoolId(id)
      var response = await getSchoolDataByIdApi(id);
      // // console.log(response, 'school get by id')
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setgetSchoolIdDataName(response?.data?.school?.schoolName);
          setValue('schoolAddress', response?.data?.school?.schoolAddress);
          setValue('schoolPhone', response?.data?.school?.schoolPhone);
          setValue('planId', response?.data?.school?.plans?.planId);
          setValue('status', response?.data?.school?.status);
          // toast.success(response?.data?.message)
          setloaderState(false);
        }
        else {
          setloaderState(false);
        }
      }
      else {
        setloaderState(false);
        // console.log(response.data.message)
      }
    }
    catch (error) {
      setloaderState(false);
      setloaderState(false);
      // console.log(error)
    }
    finally {
      setloaderState(false);
    }
  }

  const UpdateFeatureInPlan = async () => {
    setloaderState(true);
    try {
      const data = {
        "addFeature": addFeature,
        "removeFeature": removeFeature
      }
      var response = await updateSpecialFeatureInSchoolApi(currentSchoolPlanId, data);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          // setSpecialFeatureWarning(false);
          setTimeout(async () => {
            await getAllSchoolData('');
            // After the table is updated, close the off-canvas
            // const offcanvasElement = document.getElementById('Edit_staticBackdrop');
            // const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            // if (offcanvas) {
            //   offcanvas.hide();
            // }

            const offcanvasElement = document.getElementById('SpeFeature_staticBackdrop');
            if (offcanvasElement) {
              let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
              if (!offcanvas) {
                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
              }
              offcanvas.hide();
            }

          }, 1500);
        }
        else {
          setloaderState(false);
        }
      }
      else {
        setloaderState(false);
        // console.log(response.data.message)
      }
    }
    catch (error) {
      setloaderState(false);
      setloaderState(false);
      // console.log(error)
    }
    finally {
      setloaderState(false);
    }
  }

  const UpdateSchoolByID = async (values) => {
    setloaderState(true);
    try {
      const formData = new FormData();
      formData.append("schoolAddress", values.schoolAddress),
        formData.append("schoolPhone", values.schoolPhone),
        formData.append("planId", values.planId),
        formData.append("status", values.status)
      var response = await updateSchoolApi(updateSchoolId, formData);
      if (response?.status === 200) {
        if (response.data.status === 'success') {
          // setEditWarning(!EditWarning);
          toast.success(response?.data?.message)
          setTimeout(async () => {
            await getAllSchoolData('');
            // After the table is updated, close the off-canvas
            const offcanvasElement = document.getElementById('Edit_staticBackdrop');
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvas) {
              offcanvas.hide();
            }
          }, 300);
        }
        else {
          setloaderState(false);
        }
      }
      else {
        setloaderState(false);
        // console.log(response.data.message)
      }
    }
    catch (error) {
      setloaderState(false);
      setloaderState(false);
      // console.log(error)
    }
    finally {
      setloaderState(false);
    }
  }

  const DeleteSchoolIdData = async (schoolId) => {
    setloaderState(true);
    if (isChecked) {
      try {
        var response = await deleteSchoolApi(schoolId);
        if (response?.status === 200) {
          if (response.data.status === 'success') {
            // setDeleteWarning(!DeleteWarning)
            setloaderState(false);
            toast.success(response?.data?.message)
            setTimeout(() => (
              getAllSchoolData('')
            ), 1000);
          }
          else {
            setloaderState(false);
            toast.error(response?.data?.message);
          }
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      catch (error) {
        setloaderState(false);
        setloaderState(false);
        console.error('Error during login:', error);
      }
      finally {
        setloaderState(false);
      }
    }
    else {
      setloaderState(false);
      toast.error('Please Agree First !!')
    }
  }

  const getAllActiveInActiveSpeFeat = async () => {
    setloaderState(true);
    setUpdateSpecialFeatureWarning(false);
    try {
      var response = await getAllActiveInActiveSpeFeatApi(currentSchoolPlanId);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          SetAllActiveInActiveSpeFeature(response?.data?.features);
          setOriginalFeatures(response?.data?.features);
        }
      }
      else {
        setloaderState(false);
        // console.log(response?.data?.message);
      }
    }
    catch (error) {
      setloaderState(false);
      setloaderState(false);
      // console.log(error, 'catch 1')
    }
    finally {
      setloaderState(false);
    }
  }

  const getAllSpecialFeature = async (planIdd) => {
    // console.log('start')
    setloaderState(true);
    try {
      setCurrentSchoolPlanId(planIdd);
      var response = await getAllActiveInActiveSpeFeatApi(planIdd);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          // toast.success(response?.data?.message)
          SetAllActiveInActiveSpeFeature(response?.data?.features);
        }
      }
      else {
        setloaderState(false);
        // console.log(response?.data?.message);
      }
    }
    catch (error) {
      setloaderState(false);
      setloaderState(false);
      // console.log(error)
    }
    finally {
      setloaderState(false);
    }
  }

  const handleCheckboxChange = (featureId) => {
    setCheckedFeaId(featureId)
    setIsCheckedFeature((prev) => {
      const isChecked = prev.includes(featureId);

      if (isChecked) {
        setAddFeature((prev) => prev.filter((id) => id !== featureId));
        setRemoveFeature((prev) => [...new Set([...prev, featureId])]);
        return prev.filter((id) => id !== featureId);
      } else {
        setAddFeature((prev) => [...new Set([...prev, featureId])]);
        setRemoveFeature((prev) => prev.filter((id) => id !== featureId));
        return [...prev, featureId];
      }
    });
  };

  const handleCancel = () => {
    SetAllActiveInActiveSpeFeature(originalFeatures);
    setUpdateSpecialFeatureWarning(true);
    setAddFeature([])
    setRemoveFeature([])
    setIsCheckedFeature((prev) => prev.filter((id) => id !== checkedFeaId));
  };

  const [click, setClick] = useState(true);

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      setTimeout(() => {
        const updatedValue = e.target.value.trim();
        // console.log(updatedValue, 'updatedValue');

        // If the value is empty for the first time, call getAllSpecialFeature and set click to false
        if (updatedValue === '' && click) {
          getAllSchoolData('search');
          setClick(false); // Ensure this is only triggered once
          return;
        }

        // If updatedValue is not empty, reset click to true so it can trigger again in future
        if (updatedValue !== '') {
          getAllSchoolData(updatedValue);
          setClick(true);
        }

        // Update state with the current input value
        setSearchKeyData(updatedValue);

        // Fetch school data based on the updated input value

      }, 200);
    }
  };

  const handleSearchButton = () => {
    getAllSchoolData(searchKeyData)
  }

  const handleAddButton = () => {
    navigate('/superadmin/schools/addSchool')
  }


  return (
    <>
      <Container className='scrollHide'>
        {loaderState && (<DataLoader />)}
        <div className="container-fluid ps-3 pe-3 pt-2 pb-2 w-100">
          <div className="row pt-2">
            <div className="col-xl-6 col-lg-5 col-md-5 col-sm-12 flex-grow-1">
              <div className="row">
                <nav className='breadcrumnav' aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
                    <li className="breadcrumb-item active greenText" aria-current="page"><h2> Schools</h2></li>
                  </ol>
                </nav>
              </div>
              <div className="row mb-3 for-margin-top"><h2>School List</h2></div>
            </div>
            <div className="col-xl-6 col-lg-7 col-md-7 col-sm-12 mb-lg-0 mb-md-0 mb-3">
              <ActionControls
                showAddButton={true}
                addButtonText="Add School"
                addButtonAction={handleAddButton}
                showSearch={true}
                searchAction={handleSearchButton}
                showExportPDF={false}
                exportPDFText="Export PDF"
                exportPDFAction={''}
                showExportCSV={false}
                exportCSVText="Export CSV"
                exportCSVAction={''}
              />
            </div>
          </div>
        </div>
        {/* School Data Table */}

        <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
          <div className="row ps-2 pe-2">
            <div className=" cardradius bg-white p-3">
              {schoolData.length > 0 ?
                <>
                  <div className="overflow-scroll">
                    <table className="table align-middle table-striped">
                      <thead>
                        <tr>
                          <th style={{ textWrap: 'nowrap' }}><h2>#</h2></th>
                          <th style={{ textWrap: 'nowrap' }}><h2>School name</h2></th>
                          <th style={{ textWrap: 'nowrap' }}><h2>Address</h2></th>
                          <th style={{ textWrap: 'nowrap' }}><h2>Phone</h2></th>
                          <th style={{ textWrap: 'nowrap' }}><h2>Package <img src="/images/StatusArrow.svg" alt="" /></h2></th>
                          <th style={{ textWrap: 'nowrap' }} className='bolddText'><h2>Spe. Features</h2></th>
                          <th style={{ textWrap: 'nowrap' }}><h2>Status <img src="/images/StatusArrow.svg" alt="" /></h2></th>
                          <th style={{ textWrap: 'nowrap' }}><h2>Action</h2></th>
                        </tr>
                      </thead>
                      <tbody>
                        {schoolData.map((item, index) => (
                          <tr key={item.id} className='my-bg-color align-middle'>
                            <th className='greyText' style={{ textWrap: 'nowrap' }}><h3>{index + 1 + (currentPage - 1) * pageSize}</h3></th>
                            <td className='greyText' style={{ textWrap: 'nowrap' }}><h3>{item.schoolName}</h3></td>
                            <td className='greyText' style={{ textWrap: 'nowrap' }}><h3>{(item.schoolAddress).substring(0, 100)}</h3></td>
                            <td className='greyText' style={{ textWrap: 'nowrap' }}><h3>{item.schoolPhone}</h3></td>
                            <td className='greyText' style={{ textWrap: 'nowrap' }}><h3>{item.plans.planName}</h3></td>
                            <td style={{ textWrap: 'nowrap' }}><h3>{(item.plans.usedAddons).length > 0 ? <span className='blueText text-decoration-none' data-bs-toggle="modal" data-bs-target="#specialFeaturesModal" style={{ cursor: 'pointer' }} onClick={(e) => setViewFeaturesData(item.plans.usedAddons)}>View Features</span> : <span className='blueText text-decoration-none text-center' style={{ cursor: 'pointer' }}>---</span>}</h3></td>
                            <td style={{ textWrap: 'nowrap' }}>{item.status ? <h3 className='activeText'> Active </h3> : <h3 className='deactiveText'> InActive </h3>}</td>
                            <td style={{ textWrap: 'nowrap' }}>
                              <div className="dropdown dropdownbtn">
                                <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  <span>Action</span>
                                </button>
                                <ul className="dropdown-menu">
                                  <li> <button className="dropdown-item greyText font14" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getSchoolDataById(item.schoolBusinessId)}> Edit </button> </li>
                                  {/* <li> <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#SpeFeature_staticBackdrop" aria-controls="SpeFeature_staticBackdrop" onClick={() => getAllSpecialFeature(item.plans.planId)}> Spe. Features </button> </li> */}
                                  {/* <li> <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => DeleteBtnClicked(item.schoolBusinessId)}> Delete </button> </li> */}
                                </ul>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="d-flex">
                    <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
                    <div className="ms-auto">
                      <ReactPaginate
                        previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                        nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                        breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                        onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                      />
                    </div>
                  </div>
                </>
                :
                <div className='h-100 text-center m-5'>
                  <img src='/images/search.svg' style={{ height: '40vh' }} />
                </div>
              }
            </div>
          </div>
        </div>
        {/* Edit School */}
        <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div className="offcanvas-header border-bottom border-2 p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
            </Link>
            <h2 className="offcanvas-title" id="staticBackdropLabel">School Edit</h2>
          </div>
          <div className="offcanvas-body p-0">
            {loaderState && (<DataLoader />)}
            <div style={{ zIndex: -1 }}>
              {EditWarning
                ?
                <>
                  <div>
                    <p className='modalLightBorder orangeText p-2'>{getSchoolIdDataName}</p>
                    <div className="p-3">
                      <form onSubmit={handleSubmit(UpdateSchoolByID)}>
                        <div className="mb-3">
                          <label htmlFor="exampleInputAdd1" className='form-label font14'>Address</label>
                          <input id="schoolAddress" type="text" className={`form-control font14 ${errors.schoolAddress ? 'border-danger' : ''}`} placeholder="Enter School Address"
                            {...register('schoolAddress', {
                              required: 'School Address is required *',
                              minLength: { value: 5, message: 'Minimum length is 5 characters !!' }
                            })}
                          />
                          {errors.schoolAddress && <p className="pt-2 font12 text-danger">{errors.schoolAddress.message}</p>}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="exampleInputphone1" className='form-label font14'>Phone Number</label>
                          <input id="schoolPhone" type="tel" className={`form-control font14 ${errors.schoolPhone ? 'border-danger' : ''}`} placeholder="Enter Phone Number"
                            {...register('schoolPhone', {
                              required: 'School Phone Number is required',
                              validate: value => {
                                if (!/^[6-9][0-9]{3}/.test(value)) {
                                  return 'Phone number must start with digits between 6 and 9';
                                }
                                if (!/^[0-9]*$/.test(value)) {
                                  return 'Invalid character in phone number. Please enter only digits';
                                }
                                if (value.length < 10) {
                                  return 'Phone number must be of minimum 10 digits';
                                }
                                if (value.length > 10) {
                                  return 'Phone number can be of maximum 10 digits';
                                }
                                return true;
                              }
                            })}
                          />
                          {errors.schoolPhone && <p className="pt-2 font12 text-danger">{errors.schoolPhone.message}</p>}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="exampleInputEmail1" className='form-label font14'>Package</label>
                          <select id="planId" className={`form-select font14 ${errors.planId ? 'border-danger' : ''}`} {...register('planId', { required: 'Package selection is required' })} >
                            <option value="">Select Package</option>
                            {allPlans.map((plan) => (<option key={plan.planId} value={plan.planId}> {plan.planName} </option>))}
                          </select>
                          {errors.planId && <p className="pt-2 font12 text-danger">{errors.planId.message}</p>}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="exampleInputEmail1" className='form-label font14'>Status</label>
                          <select id="status" className={`form-select font14 ${errors.status ? 'border-danger' : ''}`} {...register('status', { required: 'Status selection is required' })} >
                            <option value="">Select Status</option>
                            <option value={true}>Active</option>
                            <option value={false}>Inactive</option>
                          </select>
                          {errors.status && <p className="pt-2 font12 text-danger">{errors.status.message}</p>}
                        </div>
                        <p className='text-center p-3'>
                          <button className='btn updateButtons text-white' type='submit' >Update</button>
                          <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                        </p>
                      </form>
                    </div>
                  </div>
                </>
                :
                <>
                  <div>
                    <p className='modalLightBorder p-2 mb-0'>School List</p>
                    <div className="mt-3  ">
                      <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="/images/Correct.svg" alt="" /></div>
                      <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                        <p className='warningHeading'>Successful Updated</p>
                        <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                      </div>
                      <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" >Success</button>
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>

        {/* Edit Special Feature */}
        <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="SpeFeature_staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div className="offcanvas-header modalHighborder p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
            </Link>
            <h2 className="offcanvas-title" id="staticBackdropLabel">Special Features Details</h2>
          </div>
          <div className="offcanvas-body p-0">
            {loaderState && (<DataLoader />)}
            <div style={{ zIndex: -1 }}>
              {SpecialFeatureWarning
                ?
                <>
                  {UpdateSpecialFeatureWarning ? (
                    <>
                      <p className='modalLightBorder p-2 mb-0'>Special Features</p>
                      <div className="ps-3 pe-3">
                        <table className="table table-striped mt-2">
                          <thead>
                            <tr height='40px'>
                              <th><h2>Details</h2></th>
                              <td className='text-end'>
                                <Link className='greenText text-decoration-none' onClick={getAllActiveInActiveSpeFeat}>
                                  <h2>Add Features</h2>
                                </Link>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {allActiveInActiveSpeFeature.map((item, index) => (
                              <tr height='40px' key={index}>
                                <td><h3 className='greyText ps-2'>{item?.featureName}</h3></td>
                                <td className='text-end'>
                                  {item?.planStatus ? (
                                    <h3 className='p-1 pe-2'>
                                      <Icon icon="simple-icons:ticktick" width="1.5em" height="1.5em" style={{ color: '#00A67E', cursor: 'pointer' }} />
                                    </h3>
                                  ) : (
                                    <h3 className='ps-3'>---</h3>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className='text-center p-3'>
                          <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" >Back</button>
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className='modalLightBorder p-2 mb-0'>Special Features</p>
                      <div className="ps-3 pe-3">
                        <table className="table table-striped mt-2">
                          <thead>
                            <tr height='40px'>
                              <th><h2>Details</h2></th>
                              <td className='greenText'></td>
                            </tr>
                          </thead>
                          <tbody>
                            {allActiveInActiveSpeFeature.map((item, index) => (
                              <tr height='40px' key={index}>
                                <td><h3 className='greyText ps-2'>{item?.featureName}</h3></td>
                                <td className='text-end'>
                                  {item?.planStatus ? (
                                    <h3 className='p-1 pe-1'>
                                      <Icon icon="ion:checkbox" width="1.5em" height="1.5em" style={{ color: '#00A67E', cursor: 'pointer' }} />
                                    </h3>
                                  ) : (
                                    <h3 onClick={() => handleCheckboxChange(item.planFeatureId)}>
                                      {isCheckedFeature.includes(item.planFeatureId) ? (
                                        <p className='p-1 pe-1'>
                                          <Icon icon="ion:checkbox" width="1.5em" height="1.5em" style={{ color: '#00a67e' }} />
                                        </p>
                                      ) : (
                                        <Icon icon="bxs:checkbox" width="2.1em" height="2.1em" style={{ color: '#00a67f5c', cursor: 'pointer' }} />
                                      )}
                                    </h3>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className='text-center p-3'>
                          <button className='btn updateButtons text-white' onClick={UpdateFeatureInPlan}>Update</button>
                          <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleCancel}>Cancel</button>
                        </p>
                      </div>
                    </>
                  )}
                </>
                :
                <>
                  <div>
                    <p className='modalLightBorder p-2 mb-0'>School List</p>
                    <div className="mt-3  ">
                      <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="/images/Correct.svg" alt="" /></div>
                      <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                        <p className='warningHeading'>Successful Updated</p>
                        <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                      </div>
                      <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" >Continue</button>
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>

        {/* Delete */}
        <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div className="offcanvas-header ps-0 modalHighborder p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
            </Link>
            <span className="offcanvas-title" id="staticBackdropLabel">School List</span>
          </div>
          <div className="offcanvas-body p-0">
            {loaderState && (<DataLoader />)}
            <div style={{ zIndex: -1 }}>
              {DeleteWarning
                ?
                <>
                  <div className=''>
                    <p className='modalLightBorder p-2'>School List</p>
                    <p className='text-center p-3'> <img src="/images/errorI.svg" className='img-fluid' alt="" /></p>
                    <p className='text-center warningHeading'>Are you Sure?</p>
                    <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the School Data</p>
                    <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the School Data</p>
                    <p className='text-center p-3'>
                      <button className='btn deleteButtons text-white' onClick={() => DeleteSchoolIdData(deleteSchoolId)}>Delete</button>
                      <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                    </p>
                  </div>
                </>
                :
                <>
                  <div >
                    <p className='border-bottom p-3'>School List</p>
                    <div className="">
                      <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="/images/deleteicon.svg" alt="" /></div>
                      <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                        <p className='warningHeading'>Successful Deleted</p>
                        <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                      </div>
                      <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" >Success</button>
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>

        {/* Display Special Features */}
        <div className="modal fade" id="specialFeaturesModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Special Features</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th className='font14'>S.No</th>
                      <th className='font14'>Feature Name</th>
                      <th className='font14'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewFeaturesData.map((item, index) => (
                      <tr key={item.id} className=' align-middle'>
                        <td><span>{index + 1}.</span></td>
                        <td><span>{item.featureName}</span></td>
                        <td>{item.status ? <span className='activeText'>Active</span> : <span className='deactiveText'>InActive</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Toaster />
      </Container>
    </>
  )
}

export default AllSchools



