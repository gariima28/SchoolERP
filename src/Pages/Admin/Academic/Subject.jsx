import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { SubjectPostApi } from 'src/Utils/Apis'
import { Download_CSV } from 'src/Utils/Apis'
import { ClassGetApi } from 'src/Utils/Apis'
import { SubjectGetAllApi } from 'src/Utils/Apis'
import { SubjectDeleteApi } from 'src/Utils/Apis'
import { SubjectGetById } from 'src/Utils/Apis'
import { SubjectPutApi } from 'src/Utils/Apis'
import { DepartmentSearchGetAllApi } from 'src/Utils/Apis'
import HashLoader from 'src/Pages/HashLoaderCom';
import { Icon } from '@iconify/react/dist/iconify.js';
import ReactPaginate from 'react-paginate';
import { CSVLink } from 'react-csv';


// ## style css area start ####  

const Container = styled.div`
  .breadcrum-li a{
  text-decoration: none;
  margin-top: 5px;
  color: #008479;
  }
  .main-body{
    background-color: #F2F3F6; 
  }
.main-content-conatainer{
    background-color: #fff;
    margin: 10px;
    /* height: 100vh; */
    border-radius: 15px;

}
.margin-minus22{
    margin-top: -18px;
    font-size: 16px;
}
th, td{
  padding: 10px;
}
.my-td-style-yellow span{
  background-color: #FFEED3;
    color: #FF914C;
    padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-td-style-green span{
  background-color:#E6FFE2;
  color: #00A67E;
  padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-button-drop{
  line-height: 13px !important;
  border: 1px solid var(--tableActionButtonBgColor)  !important;

}
.pagination-a{
  background-color: #f2f0f0;
  color: #000;
  padding: 0.00175rem 0.25rem;
  margin-left: 0px !important;
}
.form-focus:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: var(--greyInputborderColor) !important;
    outline: none !important;
    box-shadow: none !important;
}
.page-link-1122 {
    /* padding: 0.00175rem 0.05rem; */
    padding: 0rem 0rem;
}
.pagination-a a{
  gap: 2px;
}
.my-pagina li a:hover{
  background-color: #008479;
  color: #fff;
  border: none;
}
.input-bg{
  background-color: #F2F3F6 !important;
}
.label-color{
  color: #bbbec1;
}
.cont-drop-btn button:hover{
  background-color: transparent;
  color: #000;
  cursor: pointer;
  border: none;
}


.my-button11{
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-top: 30px;
}

.my-button11 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}
.my-button11 button:hover{
    background-color: #008479;
    color: #fff;
}

.my-button22{
    display: flex;
    gap: 4px;
    margin-top: 4px;
}

.my-button22 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}

.my-button22 button:hover{
    background-color: #008479;
    color: #fff;
}
.my-grey{
  color: #ADADBD;
}

.my-div-class p{
  border: 1px solid #ADADBD;
  padding: 10px;
  border-radius: 4px;
  background-color: #F2F3F6;
  color: #ADADBD;
  border: 1px solid #F2F3F6;
}
.my-div-class span a{
    text-decoration: none;
}
.anchor-color a{
  color: #8F8F8F;
}
.my-own-button{

  height: 33px;
  width: 30% !important;
  background-color: var(  --greenTextColor);
  line-height: 18px;
}
.my-own-outline-btn{
  height: 33px;
  width: 25%;
  color: #000;
  line-height: 1;
  border: 1px solid var( --buttonBorder);
  background-color: #fff;
}
.img-div img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #b9b8b8;

}
/* ############# offcanvas ############## */
.forInput {
    background : #F2F3F6;
    color:  #ADADBD;
    /* font-family: 'Noto Sans'; */
    font-size: 14px;
  }
  .forInput::placeholder{
    color: #ADADBD;
  }

  .forInputFont{
    font-size: 14px;
  }
    .forLabel {
    color:  #ADADBD;
    font-size: 15px;
  }
  .button11{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #008479;
    border-radius: 0%;
  }

  .img-container{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    top: -16%;
  }
  .img-container22{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    border: 2px solid #cdcdcd;
    top: -16%;
  }
  .img-container img{
    height: 30px;
    width: 36px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container22 img{
    height: 27px;
    width: 32px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container{

  }
  .bg-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #dee2e6;
    width: 65%;
    background-color: #F2F3F6;
  }
  .delete-section {
    /* height: 30%; */
    position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  }
  .button-position{
    position: absolute;
    top: 78%;
  }
  .main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
  .image-container{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #F1F5FA;
  }
  .image-container img{
    width: 100%;
    height: 100%;
  }
  .delete-content{
    font-size: 20px;
  }
  .delete-content span{
    background-color: #0AAD24;
    color: #fff;
    font-size: 15px;
    padding: 2px 6px 2px 6px;
    border-radius: 4px;
  }
  .likeButton{
    background-color: #008479;
    color: #fff;
    font-size: 17px;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
    display: inline;
  }

.view-details-background-color{
    background-color: var(--backgroundColor);
  }

  .symbol-container img{
    object-fit: cover;
  }
  .subject{
    font-size: 14px;
  }
  .sure-main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .sure-content h5{
    font-weight: 200;
  }
  .sure-content p{
    font-size: 14px;
    color: #ADADBD;
  }
  .agree{
    font-size: 14px;
    color: #ADADBD;
  }
  .buttons-topss{
    margin-top: -35px;
  }
  .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    background-color: #B50000;
    color: #fff;
    border-radius: 0%;
  }
  .bg-color-pink{
    border: 1px dashed #EECEBE;
    background: #FFF9F6;
  }
  .my-non-clickable button{
    border-radius: 5px;
    border: 1px solid #ECEBF3;
    background: #FFF;
    color: #000;
  }
  .my-form-check-input123:checked {
    background-color: var( --greenTextColor);
    border-color: var( --greenTextColor);
}
.overflow-y {
  max-height: 300px; /* Set the maximum height as needed */
  overflow-y: auto; /* Add vertical scrollbar if necessary */
}
.button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    background-color: #B50000;
    color: #fff;
    border-radius: 0%;
  }
.cancel-btn{
    color: #959494;
   border-color: #cdcdcd;
  
    --bs-btn-hover-bg: #fff;
    border-radius: 0%;
  }

  .my-btn.disabled, .my-btn:disabled, fieldset:disabled .btn {
    color: #fff ;
    pointer-events: none;
    background-color: #B50000;
    border-color: #cdcdcd;
    opacity: var(--bs-btn-disabled-opacity);
}
.my-form-check-input:checked{
  background-color: #008479;
  border-color: #008479;
  box-shadow: none;
} 

.pagination {
    display: flex;
    list-style: none;
    padding: 0;
}

.pagination li {
    margin: 0 5px;
}

.pagination li a {
    box-shadow: none !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    font-size: var(--font-size-14);
    border-radius: 8px;
    border: 1px solid #ddd;
    text-decoration: none;
    color: #000;
    /* background-color: #f5f5f5;
    transition: background-color 0.3s; */
}

.pagination li a:hover {
    background-color: #317a77 !important;
    color: #fff !important;
}

.pagination li.active a {
    background-color: #317a77 !important;
    color: #fff;
    font-weight: bold;
}
.no-wrap {
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* ############# offcanvas ############## */

/* ########## media query ###########  */
 @media only screen and (max-width: 950px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
 @media only screen and (max-width: 735px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
@media only screen and (max-width: 605px) {
  .for-media-query-22{
    flex: 0 0 auto !important;
    width: 53% !important;
  }
  .my-own-button{
    margin-top: 5px;
    margin-bottom: 25px;
    width: 100% !important;
  }
  .search-responsive{
    margin-top: 10px;
  }
  .export1{
    margin-top: 8px !important;
  }
  .export2{
    margin-top: 12px !important;
  }
}
.my-form-check-input:checked {
    background-color: #008479 !important;
    border-color: #008479 !important;
}
.my-form-check-input12:checked {
    background-color: #B50000 !important;
    border-color: #B50000 !important;
}
@media only screen and (max-width: 1152px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
@media only screen and (max-width: 950px) {
    .heading-responsive{
        margin-top: 5px !important;
    }
}
@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
`;
// ## style css area end ####  

const Subject = () => {

  const [forDelete, setForDelete] = useState(false)

  const [loader, setLoader] = useState(false)
  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [showadd, setShowadd] = useState(true)
  const [hideedit, setHideedit] = useState(false)

  const [classId, setClassId] = useState()

  const [subjectName, setSubjectName] = useState()

  const [classIds, setClassIds] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [classData, setClassData] = useState([])
  const [subjectAllData, setSubjectAllData] = useState([])
  const [subjectDatById, setSubjectDataById] = useState()
  const [classIdForSearch, setClassIdForSearch] = useState('')
  const [IdForDelete, setIdForDelete] = useState()
  const [practical, setPractical] = useState(false)
  const [IdForUpdate, setIdForUpdate] = useState()
  const [isValidNameRequired, setIsValidNameRequired] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchKey2, setSearchKey2] = useState('')
  const [pageNo2, setPageNo2] = useState('');
  const [pageSize2, setPageSize2] = useState('');


  // check box with class 
  const [selectedClasses, setSelectedClasses] = useState([]);
  const toggleClass = (classId) => {
    setSelectedClasses(prev => {
      if (prev.includes(classId)) {
        return prev.filter(id => id !== classId);
      } else {
        return [...prev, classId];
      }
    });
  };

  // Toggle class selected 
  // Toggle class selection
  const toggleClass2 = (classId) => {
    setClassIds(prev => {
      if (prev.includes(classId)) {
        return prev.filter(id => id !== classId);
      } else {
        return [...prev, classId];
      }
    });
  };

  // Type-safe comparison function
  const isClassSelected = (classId) => {
    return classIds.some(id => String(id) === String(classId));
  };
  // check box with class 

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };


  const [errors, setErrors] = useState({});
  // ###### validation ##########

  useEffect(() => {
    fetchAllClasses();
    // UpdatClassGetApi();
    MySubjectGetApi();
  }, [pageNo])

  const FuncValidation = () => {
    let isValid = true;
    // name 
    if (!subjectName || subjectName === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=\- ]+$/.test(subjectName)) {
      setIsValidNameRequired(true)
      setLoader(false)
      isValid = false;
    }
    else {
      setIsValidNameRequired(false)
    }
    return isValid;
  }

  // name 
  const handleSubject = (e2) => {
    setSubjectName(e2);
    const noRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\- ]+$/;
    setIsValidNameRequired(noRegex.test(e2));
    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidNameRequired(true)
    } else {
      setIsValidNameRequired(false)
    }
  }
  // ###### validation ##########

  const fetchAllClasses = async () => {
    setLoader(true);
    try {
      const response = await ClassGetApi(searchKey2, pageNo2, pageSize2);
      if (response?.status === 200) {
        // setClassData(response?.data?.classes || []);
        setClassData(response?.data?.classes || []);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch classes');
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast.error('Failed to fetch classes');
    } finally {
      setLoader(false);
    }
  };

  const offcanvasRef = useRef()
  const offcanvasRef22 = useRef()
  const offcanvasRef33 = useRef()

  // Subject Post Api 
  const MyHolidayPostApi = async () => {

    if (FuncValidation()) {
      const formData = new FormData()
      formData.append('classIds', selectedClasses);
      formData.append('subjectName', subjectName);
      formData.append('isPracticalSubject', practical);
      setLoader(true)
      try {
        const response = await SubjectPostApi(formData);
        console.log('class-post-api response', response)
        if (response?.status === 200) {
          if (response?.data?.status === "success") {
            toast.success(response?.data?.message);
            setShow(false)
            setHide(true)
            MySubjectGetApi()
            setLoader(false)
            setClassId('')
            setSubjectName('')
            setPractical(false)
            fetchSubjectById()
            setSelectedClasses([])
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
            offcanvasInstance.hide();
            setTimeout(() => {
              setShow(true)
            }, 0.5)
          } else {
            toast.error(response?.data?.message);
            setShow(true)

            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
            offcanvasInstance.hide();
            setTimeout(() => {
              setShow(true)
              setLoader(false)
              setClassId('')
              setSubjectName('')
            }, 0.5)
          }
        } else {
          toast.error(response?.data?.msg);
        }
      } catch (error) {
        console.log(error)
      }
    }

  }
  // Get all api 
  const MySubjectGetApi = async () => {
    setLoader(true)
    try {
      const response = await SubjectGetAllApi(searchKey, classIdForSearch, pageNo, pageSize);

      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setSubjectAllData(response?.data?.subjects)
        setCurrentPage(response?.data?.currentPage)
        setTotalPages(response?.data?.totalPages)
        setLoader(false)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Delete api
  const SubsDeleteApi = async (id) => {
    setLoader(true)
    try {
      const response = await SubjectDeleteApi(id);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setHidedelete(true)
        setShowdelete(false)
        MySubjectGetApi()
        setLoader(false)
        setForDelete(false)
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef33.current);
        offcanvasInstance.hide();
        setTimeout(() => {
          setShowdelete(true)
        }, 0.5)
      } else {
        toast.error(response?.data?.message);
      }

    } catch (error) {
      console.log('catch')
    }
  }
  // Get by id 
  const fetchSubjectById = async (id) => {
    setIdForUpdate(id);
    setLoader(true);
    try {
      const response = await SubjectGetById(id);
      console.log('get by id data in subject', response)
      if (response?.status === 200) {
        const subjectData = response?.data?.subjects;
        setSubjectName(subjectData?.subjectName || '');

        const ids = subjectData?.classes?.map(cls => cls.classId) || [];
        setClassIds(ids);
      } else {
        toast.error(response?.data?.msg || 'Failed to fetch subject');
      }
    } catch (error) {
      console.error('Error fetching subject:', error);
      toast.error('Failed to fetch subject');
    } finally {
      setLoader(false);
    }
  };
  // Subject Put api 
  const MySubjectPutApi = async (id) => {
    if (FuncValidation()) {
      setLoader(true)
      try {
        const formData = new FormData()
        formData.append('classIds', classIds);
        formData.append('subjectName', subjectName);
        formData.append('isPracticalSubject', practical);
        const response = await SubjectPutApi(id, formData);
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setShowadd(false)
          setHideedit(true)
          MySubjectGetApi()
          setLoader(false)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
          offcanvasInstance.hide();
          setTimeout(() => {
            setShowadd(true)
          }, 0.5)
        } else {
          toast.error(response?.data?.message);
          setShowadd(true)
        }

      } catch (error) {
        console.log(error)
      }
    }

  }
  const handleForDelete = () => {
    SubsDeleteApi(IdForDelete)
  }
  const handleChange = (e) => {
    const trimmedValue = e.target.value.trimStart();
    setSearchKey(trimmedValue);
  };
  const ClearHandle = () => {
    setSubjectAllData([])
    setClassId('')
    setSubjectName('')
    setIsValidNameRequired(false)
    setClassIdForSearch('')
    setPractical(false)
    setSelectedClasses([])
    MySubjectGetApi()

  }

  return (
    <Container>
      {
        loader && (
          <HashLoader />
        )
      }
      <div className="container-fluid main-body p-3">

        <div className='d-flex justify-content-between for-dislay-direction'>
          <div className="breadCrum ms-2">
            <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
              <ol className="breadcrumb ms-2">
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Academic</li>
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#" onClick={MySubjectGetApi}>Subject</Link></li>
              </ol>
            </nav>
          </div>
          <div className='d-flex g-1 for-media-query'>
            <div className='me-2 search-responsive'>
              <div className="input-group mb-3 ">
                <input type="text" className="form-control form-focus font-color" style={{ height: '34px' }} placeholder="Search" aria-label="Recipient's username" onChange={handleChange} value={searchKey} aria-describedby="basic-addon2" />
                <span className="input-group-text button-bg-color button-color heading-14 font-color " style={{ cursor: 'pointer', height: "34px" }} id="basic-addon2" onClick={MySubjectGetApi}>Search</span>
              </div>
            </div>
            <Link type="button" className="btn btn-success heading-16 my-own-button me-3 " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={ClearHandle}>+ ADD Subject</Link>
          </div>
        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16 heading-responsive' style={{ marginTop: '-22px' }}>Subject List</h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}
          <div className="row p-3 d-flex justify-content-center">

            <div className="col-lg-6 col-md-6 col-sm-12">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Class</label>
                <select class="form-select  form-select-sm" value={classIdForSearch} onChange={(e) => setClassIdForSearch(e.target.value)} aria-label="Default select example">
                  <option selected>--choose--</option>
                  {
                    classData?.map((item =>
                      <option value={item.classNo}>{item.classNo}</option>
                    ))
                  }
                </select>
              </div>
            </div>

          </div>
          {/* ####### buttons ######  */}
          <div className="row buttons-topss">
            <div className='my-button11 heading-16'>
              <button type="button" class="btn btn-outline-success" style={{ color: '#fff', backgroundColor: "#008479" }} onClick={MySubjectGetApi} disabled={!classIdForSearch}>Search</button>
              <button type="button" class="btn btn-outline-success" onClick={ClearHandle}>Cancel</button>
            </div>
          </div>

          <div className="table-container px-3 table-responsive">
            <table className="table table-sm table-striped">
              <thead className=''>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className='no-wrap' >#</th>
                  <th className='no-wrap' >Subject Name</th>
                  <th className='no-wrap' style={{ width: '60%' }}>Subject Id</th>
                  <th >Actions</th>
                </tr>
              </thead>
              <tbody className='heading-14 align-middle greyTextColor'>
                {
                  subjectAllData && subjectAllData?.length > 0 ? (
                    subjectAllData?.map((item, index) => (
                      <tr className='heading-14' >
                        <td className=' greyText no-wrap'>{index + 1 + (currentPage - 1) * pageSize}</td>
                        <td className=' greyText no-wrap'>{item.subjectName}</td>
                        <td className=' greyText no-wrap'>{item.subjectId}</td>
                        <td className=' greyText  no-wrap' >
                          <div className="dropdown my-button-show">
                            <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Action  &nbsp;
                              <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                                <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                              </svg>
                            </button>
                            <ul className="dropdown-menu anchor-color heading-14">
                              <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1234" aria-controls="offcanvasRight" onClick={(e) => fetchSubjectById(item.subjectId)} >Edit</Link></li>
                              {/* <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1234" aria-controls="offcanvasRight" onClick={(e) => SubjectGetByIdApi(item.subjectId)} >Edit</Link></li> */}
                              <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight" onClick={(e) => setIdForDelete(item.subjectId)}>Delete</Link></li>
                            </ul>
                          </div>
                        </td>
                      </tr>

                    ))
                  )
                    :
                    (
                      <tr>
                        <td colSpan="6" className="text-center">
                          <div className="d-flex justify-content-center align-items-center m-5 ">
                            <div className="text-center">
                              <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className='img-fluid p-5' />

                              <h2><b>No Data Found</b></h2>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                }
                {
                }
              </tbody>
              <Toaster />
            </table>
            <div className="d-flex" style={{ marginBottom: '10px' }}>
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
          </div>

        </div>
        {/* ################## Off Canvas Area ####################  */}

        {/* ##### offcanvas added start ########  */}
        {
          show && (
            <>
              <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" onClick={ClearHandle}><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Subject</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body pt-0 " style={{ overflowX: 'hidden' }}>

                  <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                  <div className="table-responsive">
                    <table className="table">
                      {
                        classData.length > 0 ? (
                          <tbody className='heading-14 align-middle greyTextColor'>
                            {classData?.reduce((rows, classItem, index) => {
                              if (index % 4 === 0) rows.push([]);
                              rows[rows.length - 1].push(classItem);
                              return rows;
                            }, []).map((row, rowIndex) => (
                              <tr key={rowIndex} className='heading-14'>
                                {row.map((classItem) => (
                                  <td
                                    key={classItem.classId}
                                    className='greyText p-2'
                                    style={{
                                      width: '25%',
                                      minWidth: '120px',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis'
                                    }}
                                  >
                                    <div className="d-flex align-items-center gap-2">
                                      <input
                                        className="form-check-input my-form-check-input"
                                        type="checkbox"
                                        style={{
                                          width: '20px',
                                          height: '20px',
                                          flexShrink: 0
                                        }}
                                        checked={selectedClasses.includes(classItem.classId)}
                                        onChange={() => toggleClass(classItem.classId)}
                                        id={`class-${classItem.classId}`}
                                      />
                                      <label
                                        htmlFor={`class-${classItem.classId}`}
                                        className="text-truncate"
                                        style={{
                                          display: 'inline-block',
                                          maxWidth: 'calc(100% - 30px)'
                                        }}
                                      >
                                        {classItem.classNo}
                                      </label>
                                    </div>
                                  </td>
                                ))}
                                {/* Fill remaining cells */}
                                {row.length < 4 && Array(4 - row.length).fill().map((_, i) => (
                                  <td
                                    key={`empty-${i}`}
                                    style={{ width: '25%' }}
                                  ></td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        )
                          :
                          (
                            <div><p>Classes Not Created Yet...</p></div>
                          )
                      }

                    </table>
                  </div>

                  <div className="mb-1  ">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label heading-16">Subject</label>
                      <input type="email" class="form-control form-control-sm" value={subjectName} onChange={((e) => handleSubject(e.target.value))} id="exampleFormControlInput1" placeholder="Enter Subject Name" />
                    </div>
                  </div>
                  <div className='pt-1'>
                    {isValidNameRequired && (
                      <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                        Subject is  required
                      </p>
                    )}
                  </div>
                  {/* <div class="form-check">
                    <input class="form-check-input my-form-check-input " onClick={(e) => setPractical(!practical)} type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                      Practical Subject
                    </label>
                  </div> */}

                  <div className='my-button11 '>
                    <button type="button" style={{ backgroundColor: '#008479', color: '#fff' }} className="btn btn-outline-success heading-16 btn-bgAndColor" onClick={(e) => { MyHolidayPostApi() }}>Add Subject</button>
                    <button type="button" className="btn btn-outline-success heading-16" data-bs-dismiss="offcanvas" aria-label="Close" onClick={ClearHandle}>Cancel</button>
                  </div>

                </div>


              </div>
            </>


          )
        }
        {/* ################# After click ###############  */}

        {/* ##### offcanvase added  end ########  */}

        {/* ##### offcanvas edit start ########  */}
        {
          showadd && (
            <>
              <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight1234" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef22}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Add subject</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div class="offcanvas-body pt-0">
                  <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                  <div className="table-responsive">
                    {/* {loader && <div className="text-center">Loading...</div>} */}

                    <table className="table">
                      <tbody className='heading-14 align-middle greyTextColor'>
                        {classData?.reduce((rows, classItem, index) => {
                          if (index % 4 === 0) rows.push([]);
                          rows[rows.length - 1].push(classItem);
                          return rows;
                        }, []).map((row, rowIndex) => (
                          <tr key={rowIndex} className='heading-14'>
                            {row.map((classItem) => (
                              <td
                                key={classItem.classId}
                                className='greyText p-2'
                                style={{
                                  width: '25%',
                                  minWidth: '120px',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <input
                                    className="form-check-input my-form-check-input"
                                    type="checkbox"
                                    style={{
                                      width: '20px',
                                      height: '20px',
                                      flexShrink: 0
                                    }}
                                    checked={isClassSelected(classItem.classId)}
                                    onChange={() => toggleClass2(classItem.classId)}
                                    id={`class-${classItem.classId}`}
                                  />
                                  <label
                                    htmlFor={`class-${classItem.classId}`}
                                    className="text-truncate"
                                  >
                                    {classItem.classNo}
                                  </label>
                                </div>
                              </td>
                            ))}
                            {/* Fill empty cells if needed */}
                            {row.length < 4 && Array(4 - row.length).fill().map((_, i) => (
                              <td key={`empty-${i}`} style={{ width: '25%' }}></td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-1  ">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label heading-16">Subject</label>
                      <input type="email" class="form-control form-control-sm" value={subjectName} onChange={((e) => handleSubject(e.target.value))} id="exampleFormControlInput1" placeholder="Enter Subject Name" />
                    </div>
                  </div>
                  <div className='pt-1'>
                    {isValidNameRequired && (
                      <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                        Subject is  required
                      </p>
                    )}
                  </div>
                  {/* <div class="form-check">
                    <input class="form-check-input my-form-check-input " onClick={(e) => setPractical(!practical)} type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                      Practical Subject
                    </label>
                  </div> */}

                  <div className='my-button11 '>
                    <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" onClick={(e) => { MySubjectPutApi(IdForUpdate) }} style={{ backgroundColor: '#008479', color: '#fff' }}>Update subject</button>
                    <button type="button" className="btn btn-outline-success heading-16" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                  </div>
                </div>

              </div>
            </>
          )
        }
        {/* ################# After click ###############  */}

        {/* ##### offcanvase edit end ########  */}



        {/* ################ offcanvas delete start #############  */}
        {
          showdelete && (
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight22" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef33}>
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Delete Section</h5>
                </div>
                <hr className='' />

                <div className="offcanvas-body">

                  <div className="sure-main-container mt-4">
                    <div className="sure-container">
                      <div>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.5312 0.46875C13.2656 0.46875 0 13.7344 0 30C0 46.2656 13.2656 59.5312 29.5312 59.5312C45.7969 59.5312 59.0625 46.2656 59.0625 30C59.0625 13.7344 45.7969 0.46875 29.5312 0.46875ZM29.5312 55.7812C15.3281 55.7812 3.75 44.2031 3.75 30C3.75 15.7969 15.3281 4.21875 29.5312 4.21875C43.7344 4.21875 55.3125 15.7969 55.3125 30C55.3125 44.2031 43.7344 55.7812 29.5312 55.7812Z" fill="#B50000" />
                          <path d="M31.4062 25.5469H27.6562V44.2969H31.4062V25.5469Z" fill="#B50000" />
                          <path d="M31.4062 16.6406H27.6562V20.3906H31.4062V16.6406Z" fill="#B50000" />
                        </svg>
                      </div>

                      <div className="sure-content mt-2">
                        <h5 className='heading-20'>Are you sure?</h5>
                        <p>This Action will be permanently <br /> delete the Profile Data</p>
                      </div>
                      <div className="form-check mt-1">
                        <input className="form-check-input my-form-check-input12" type="checkbox" onClick={() => setForDelete(!forDelete)} value="" id="flexCheckDefault" />
                        <label className="form-check-label agree" for="flexCheckDefault">
                          I Agree to delete the Profile Data
                        </label>
                      </div>

                      <div className="mt-4">
                        <button type="button" className="btn my-btn  button00 my-button112233RedDelete" disabled={forDelete ? false : true} onClick={handleForDelete} >Delete</button>
                        <button type="button" className="btn cancel-btn  ms-2" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          )
        }
        {/* ############## After click ##############  */}
        {/* ################ offcanvas delete end #############  */}

      </div>
    </Container>
  )
}

export default Subject
