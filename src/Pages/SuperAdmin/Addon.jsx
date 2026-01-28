import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { deleteSpeFeaByidApi, getAllSpeFeatApi, getSpeFeaByIdApi, updateSpeFeaNameApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import ReactPaginate from 'react-paginate';
import { useForm } from 'react-hook-form';
import ActionControls from '../../Layouts/ActionControls';

const ContainerCSS = styled.div`

.table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
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

  .greyText{
    color: var(--greyInputTextColor);
  }

  .successText{
    color: var(--darkGreenBorderColor);
  }

  .form-control, .form-select{
    box-shadow: none !important;
    border: 1px solid var(--greyInputborderColor);
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
    border-color: var(--greyInputborderColor);
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
    margin-left: 43% !important;
    margin-top: -20% !important;
  }

  .greydiv{
    background-color: #FBFBFB;
  }
  .for-margin-top{
    margin-top: -6px;
  }


`;

const Addon = () => {

  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);

  const [DeleteWarning, setDeleteWarning] = useState(true);
  const [EditFeatureWarn, setEditFeatureWarn] = useState(true);

  const [EditFeatureId, setEditFeatureId] = useState('');
  const [deletFeatureId, setdeletFeatureId] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [allSpeFeature, setAllSpeFeature] = useState([]);
  const [searchKeyData, setSearchKeyData] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  useEffect(() => {
    getAllSpecialFeature(searchKeyData);
  }, [token, pageNo])

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };


  const getAllSpecialFeature = async (searchKey) => {
    try {
      setloaderState(true);
      var response = await getAllSpeFeatApi(searchKey === 'search' ? '' : searchKey, pageNo, pageSize);
      // console.log(response, 'feathdbfvghjendvfrd')
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setAllSpeFeature(response?.data?.addons);
          setCurrentPage(response?.data?.currentPage)
          setTotalPages(response?.data?.totalPages)
          setTimeout(() => {
            setDeleteWarning(true);
            setEditFeatureWarn(true);
          }, 1200);
          // toast.success(response?.data?.message)
        }
        else {
          setloaderState(false);
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
      console.error('Error fetching student data:', error);
      if (error?.response?.data?.statusCode === 401) {
        sessionStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }
    }
    finally {
      setloaderState(false);
    }
  }

  const UpdateSpeFeaName = async (data) => {
    try {
      // console.log(EditFeatureId, 'feature Id')
      const Jsondata = {
        "featureName": data.newFeatureName
      }
      // console.log(data)
      var response = await updateSpeFeaNameApi(EditFeatureId, Jsondata);
      if (response?.status === 200) {
        // console.log('200')
        if (response?.data?.status === 'success') {
          toast.success(response?.data?.message)
          // setEditFeatureWarn(!EditFeatureWarn)
          // console.log('success')
          setTimeout(async () => {
            await getAllSpecialFeature('');
            // After the table is updated, close the off-canvas
            const offcanvasElement = document.getElementById('Edit_Feature');
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvas) {
              offcanvas.hide();
              offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                const backdrop = document.querySelector('.offcanvas-backdrop');
                if (backdrop) {
                  backdrop.remove();
                }
              }, { once: true });
            }
          }, 700);
        }
        else {
          toast.error(response?.data?.message)
          // console.log(response?.data?.message)
        }
      }
      else {
        // console.log(response?.data?.message);
      }
    }
    catch (error) {
      setloaderState(false);
      // console.log(error)
    }
    finally {
      setloaderState(false);
    }
  }

  const getSpeFeatureById = async (id) => {
    setEditFeatureId(id)
    try {
      var response = await getSpeFeaByIdApi(id);
      // console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setValue('newFeatureName', response?.data?.features?.featureName);
        }
      }
      else {
        // console.log(response?.data?.message);
      }
    }
    catch (error) {
      setloaderState(false);
      setloaderState(false);

    }
    finally {
      setloaderState(false);
    }
  }

  const deleteSpeFeaById = async (speFeaID) => {
    if (isChecked) {
      try {
        var response = await deleteSpeFeaByidApi(speFeaID);
        if (response?.status === 200) {
          if (response.data.status === 'success') {
            // setDeleteWarning(!DeleteWarning)
            toast.success(response?.data?.message)
            setTimeout(async () => (
              await getAllSpecialFeature('')
            ), 1000);


            // After the table is updated, close the off-canvas
            const offcanvasElement = document.getElementById('Delete_staticBackdrop');
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            offcanvas.hide();
            offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
              const backdrop = document.querySelector('.offcanvas-backdrop');
              if (backdrop) {
                backdrop.remove();
              }
            }, { once: true });
          }
        }
        else {
          toast.error(response?.error);
        }
      }
      catch (error) {
        setloaderState(false);
        console.error('Error during login:', error);
      }
      finally {
        setloaderState(false);
      }
    }
  }


  const [click, setClick] = useState(true);

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      setTimeout(() => {
        const updatedValue = e.target.value.trim();
        // console.log(updatedValue, 'updatedValue');

        // If the value is empty for the first time, call getAllSpecialFeature and set click to false
        if (updatedValue === '' && click) {
          getAllSpecialFeature('search');
          setClick(false); // Ensure this is only triggered once
          return;
        }

        // If updatedValue is not empty, reset click to true so it can trigger again in future
        if (updatedValue !== '') {
          getAllSpecialFeature(updatedValue);
          setClick(true);
        }

        // Update state with the current input value
        setSearchKeyData(updatedValue);

        // Fetch school data based on the updated input value

      }, 200);
    }
  };

  const handleSearchButton = () => {
    getAllSpecialFeature(searchKeyData)
  }

  const handleAddButton = () => {
    navigate('/superadmin/addon/addAddon')
  }


  return (
    <>
      <ContainerCSS>
        {loaderState && (<DataLoader />)}
        <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
          <div className="row pt-2">
            <div className="col-xl-6 col-lg-5 col-md-5 col-sm-12 flex-grow-1">
              <div className="row">
                <nav className='breadcrumnav' aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
                    <li className="breadcrumb-item active greenText" aria-current="page"><h2> Addons</h2></li>
                  </ol>
                </nav>
              </div>
              <div className="row mb-3 for-margin-top"><h2>Manage Addons</h2></div>
            </div>
            <div className="col-xl-6 col-lg-7 col-md-7 col-sm-12 mb-lg-0 mb-md-0 mb-3">
              <ActionControls
                showAddButton={true}
                addButtonText="Add Addon"
                addButtonAction={handleAddButton}
                showSearch={true}
                searchAction={handleSearchButton}
                showExportPDF={false}
                exportPDFText="Export PDF"
                exportPDFAction={''}
                showExportCSV={false}
                exportCSVText="Export XLSX"
                exportCSVAction={''}
              />
              {/* <div className="row">
                <div className="col-md-9 col-sm-6 col-8">
                  <div className="d-flex">
                    <input className="form-control formcontrolsearch" type="text" placeholder="Search" value={searchKeyData} onChange={(e) => setSearchKeyData(e.target.value.trimStart())} onKeyDown={handleKeyDown} onPaste={(e) => { e.preventDefault(); const pastedValue = e.clipboardData.getData('text'); setSearchKeyData(pastedValue.trimStart()); }} />
                    <button className="btn searchButtons text-white" type="button" onClick={() => getAllSpecialFeature(searchKeyData)}><h2>Search</h2></button>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-4">
                  <div className="row">
                    <Link className="btn ps-0 pe-0 addButtons text-white" type="submit" to='/superadmin/addon/addAddon'><h2 className='textVerticalCenter'>+ ADD Feature</h2></Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          <div className="row ps-2 pe-2">
            <div className=" cardradius bg-white p-3">
              {allSpeFeature.length > 0 ?
                <>
                  <div className="overflow-scroll">
                    <table className="table align-middle table-striped">
                      <thead>
                        <tr>
                          <th className='textWrapClass'><h2>#</h2></th>
                          <th className='textWrapClass'><h2>Feature Name</h2></th>
                          <th className='textWrapClass text-center'><h2>Status <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/StatusArrow.svg" alt="" /></h2></th>
                          <th className='textWrapClass text-end'><h2>Action</h2></th>
                        </tr>
                      </thead>
                      <tbody>
                        {allSpeFeature.map((item, index) => (
                          <tr key={item.planFeatureId}>
                            <th className='textWrapClass greyText'><h3>{index + 1 + (currentPage - 1) * pageSize}</h3></th>{/*  + (pageNo - 1) * pageSize */}
                            <td className='textWrapClass greyText'><h3>{item.featureName}</h3></td>
                            <td className='textWrapClass text-center'>{item.status ? <h3 className='activeText textWrapClass'> Active </h3> : <h3 className='deactiveText textWrapClass'> InActive </h3>}</td>
                            <td className='textWrapClass text-end'>
                              <div className="dropdown">
                                <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                  <span>Action</span>
                                </button>
                                <ul className="dropdown-menu">
                                  <li className='p-0'>
                                    <button className="dropdown-item greyText font14" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_Feature" aria-controls="Edit_Feature" onClick={() => getSpeFeatureById(item?.planFeatureId)}>
                                      Edit Feature
                                    </button>
                                  </li>
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
                      <ReactPaginate previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />} nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />} breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10} onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'} />
                    </div>
                  </div>
                </>
                :
                <div className='h-100 text-center m-5'>
                  <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src='/images/search.svg' style={{ height: '40vh' }} />
                </div>
              }
            </div>
          </div>

          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_Feature" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header modalHighborder p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">Edit Feature Name</h2>
            </div>
            <div className="offcanvas-body p-0">
              {loaderState && (<DataLoader />)}
              <div style={{ zIndex: -1 }}>
                <div className="p-3">
                  <form onSubmit={handleSubmit(UpdateSpeFeaName)}>
                    <div className="mb-3">
                      <label htmlFor="FeatureName" className="form-label greyText font14">Feature Name</label>
                      <input
                        type="text"
                        className={`form-control p-2 formcontrolinput ${errors.newFeatureName ? 'border border-danger' : ''}`}
                        id="FeatureName"
                        {...register('newFeatureName', {
                          required: 'Feature Name is required',
                          validate: value => { if (!/^[A-Z]/.test(value)) { return 'Feature Name must start with an uppercase letter'; } if (value.length < 3) { return 'Minimum Length is 3'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Feature Name'; } return true; }
                        })}
                      />
                      <span className='text-danger'>{errors.newFeatureName?.message}</span>
                    </div>
                    <p className='text-center p-3'>
                      <button className='btn updateButtons text-white' type="submit">Update</button>
                      <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" type='button'>Cancel</button>
                    </p>
                  </form>
                </div>
                {/* {EditFeatureWarn
                  ?
                  <>
                    
                  </>
                  :
                  <>
                    <div>
                      <p className='modalLightBorder p-2 mb-0'>Feature Name</p>
                      <div className="mt-3  ">
                        <div className='correvtSVG p-3 pt-4 rounded-circle'><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Correct.svg" alt="" /></div>
                        <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                          <p className='warningHeading'>Successful Updated</p>
                          <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                        </div>
                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close">Success</button>
                      </div>
                    </div>
                  </>
                } */}
              </div>
            </div>
          </div>
          {/* <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
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
                      <p className='text-center p-3'> <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/errorI.svg" className='img-fluid' alt="" /></p>
                      <p className='text-center warningHeading'>Are you Sure?</p>
                      <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Feature Data</p>
                      <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Feature Data</p>
                      <p className='text-center p-3'>
                        <button className='btn deleteButtons text-white' onClick={() => deleteSpeFeaById(deletFeatureId)}>Delete</button>
                        <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      </p>
                    </div>
                  </>
                  :
                  <>
                    <div >
                      <p className='border-bottom p-3'>School List</p>
                      <div className="">
                        <div className='deleteSVG border border-2 p-4 rounded-circle'><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/deleteicon.svg" alt="" /></div>
                        <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                          <p className='warningHeading'>Successful Deleted</p>
                          <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                        </div>
                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close">Success</button>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </div> */}

          <Toaster />
        </div>
      </ContainerCSS>
    </>
  )
}

export default Addon
