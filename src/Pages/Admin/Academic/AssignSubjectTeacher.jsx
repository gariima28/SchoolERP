import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { usePDF } from 'react-to-pdf';
import { ClassGetApi } from 'src/Utils/Apis'
import { GetAllAssignSubjectTeahcer } from 'src/Utils/Apis'
import { TeacherGetAllApi } from 'src/Utils/Apis'
import { AssignTeaSubPostApi } from 'src/Utils/Apis'
import { AssignGetAllApi } from 'src/Utils/Apis'
import { AssignDeleteDeleteApi } from 'src/Utils/Apis'
import { GetAlSectionWithClass } from 'src/Utils/Apis'
import HashLoader from 'src/Pages/HashLoaderCom';
import { Icon } from '@iconify/react/dist/iconify.js';
import ReactPaginate from 'react-paginate';

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
  background-color: var(  --greenTextColor);
  line-height: 18px;
}
.my-own-outline-btn{
  height: 33px;
  line-height: 0px;
  color: #000;
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
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #B50000;
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
  max-height: 300px; 
  overflow-y: auto; 
}
.my-own-outline-btn{
    border: 1px solid #008479;
    color: #008479;
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
  background-color: #B50000;
  border-color: #B50000;
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

@media only screen and (max-width: 605px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
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

const AssignSubjectTeacher = () => {

  const [loader, setLoader] = useState(false)
  const [forDelete, setForDelete] = useState(false)

  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)
  const [practical, setPractical] = useState(true)

  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)


  const [subjectClassForDelete, setSubjectClassForDelete] = useState()
  const [subjectSectionsForDelete, setSubjectSectionsForDelete] = useState()
  const [subjectIdForDelete, setSubjectIdForDelete] = useState()
  const [staffIdForDelete, setStaffIdForDelete] = useState()

  const [classSectiomData, setClassSectiomData] = useState([])
  const addClassWithSections = (classId, sectionIds) => {

    setClassSectiomData(prev => [
      ...prev,
      {
        classId: classId,
        sectionIds: Array.isArray(sectionIds) ? sectionIds : [sectionIds]
      }
    ])
  }

  const [classId, setClassId] = useState()
  // console.log('class id ', classId)
  const [classNo, setClassNo] = useState()
  // console.log('my class id ', classId)
  const [showadd, setShowadd] = useState(true)
  const [hideedit, setHideedit] = useState(false)
  const [titleName, setTitleName] = useState()
  const [titleNamegetById, setTitleNamegetById] = useState()
  const [subjectId, setSubjectId] = useState()
  const [teacherId, setTeacherId] = useState()
  // console.log('my subject id is', subjectId)

  const [classData, setClassData] = useState([])
  const [subjectData, setSubjectData] = useState([])
  const [teacherAllData, setTeacherAllData] = useState([])
  const [assignSubTeaAllData, setAssignSubTeaAllData] = useState([])
  const [SectionWithClass, setAllSectionWithClass] = useState([])

  const [selectedClassSections, setSelectedClassSections] = useState([]);
  const [transformedSections, setTransformedSections] = useState([]);
  // console.log("Assign subject teacher post", transformedSections);

  useEffect(() => {
    const transformed = selectedClassSections.reduce((acc, curr) => {
      const found = acc.find(item => item.classId === curr.classId);
      if (found) {
        found.sectionIds.push(curr.sectionId);
      } else {
        acc.push({ classId: curr.classId, sectionIds: [curr.sectionId] });
      }
      return acc;
    }, []);
    setTransformedSections(transformed);
  }, [selectedClassSections]);

  const selectedSections = selectedClassSections;

  const isClassChecked = (classItem) => {
    return classItem.sections.some(section =>
      selectedClassSections.some(s =>
        s.classId === classItem.classId &&
        s.sectionId === section.classSecId
      )
    );
  };

  const toggleAllSectionsInClass = (classItem) => {
    setSelectedClassSections(prev => {
      const isChecked = isClassChecked(classItem);

      if (isChecked) {
        // Uncheck all sections of this class
        return prev.filter(s => s.classId !== classItem.classId);
      } else {
        // Check all sections of this class
        const newSelections = classItem.sections.map(section => ({
          classId: classItem.classId,
          sectionId: section.classSecId
        }));
        const filtered = prev.filter(s => s.classId !== classItem.classId);
        return [...filtered, ...newSelections];
      }
    });
  };

  const toggleSection = (classId, sectionId) => {
    setSelectedClassSections(prev => {
      const exists = prev.some(s => s.classId === classId && s.sectionId === sectionId);

      if (exists) {
        return prev.filter(s => !(s.classId === classId && s.sectionId === sectionId));
      } else {
        return [...prev, { classId, sectionId }];
      }
    });
  };




  useEffect(() => {
    MyGetAllSectionWithClass()
  }, [])

  useEffect(() => {
    UpdatClassGetApi()

    MyTeacherGetAllApi()
  }, [classId, subjectId])

  useEffect(() => {
    MySubjectByClassIdGetApi()
  }, [])

  const [searchKey, setSearchKey] = useState('')

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchKey2, setSearchKey2] = useState('')
  const [pageNo2, setPageNo2] = useState('');
  const [pageSize2, setPageSize2] = useState('');

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  const handle = (e) => {
    const value = e.target.value;
    const [val1, val2] = value.split(',').map(item => item.trim());
    setClassId(parseInt(val1));
    setClassNo(val2);
  }

  // class Get all data from class page for class id  
  const UpdatClassGetApi = async () => {
    setLoader(true)
    try {
      const response = await ClassGetApi(searchKey2, pageNo2, pageSize2);
      if (response?.status === 200) {
        // toast.success(response?.data?.classes?.message)
        setClassData(response?.data?.classes)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.message);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  // get all section with class
  const MyGetAllSectionWithClass = async () => {
    setLoader(true)
    try {
      const response = await GetAlSectionWithClass();
      if (response?.status === 200) {
        // toast.success(response?.data?.classes?.message)
        setAllSectionWithClass(response?.data?.allClasses)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.message);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }

  // Subject by class id From class get all api 
  const MySubjectByClassIdGetApi = async () => {
    setLoader(true)
    try {
      const response = await GetAllAssignSubjectTeahcer();
      console.log(' subject in assign subject techer', response)
      if (response?.status === 200) {
        // toast.success(response?.data?.classes?.message)
        setSubjectData(response?.data?.subjects)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.message);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  // Teacher  Get All Api from teacher api 
  const MyTeacherGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await TeacherGetAllApi(searchKey, pageNo, pageSize);
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setTeacherAllData(response?.data?.staffList)
        setLoader(false)
      } else {
        toast.error(response?.data?.message);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }

  const offcanvasRef = useRef(null)
  const offcanvasRef22 = useRef(null)
  const offcanvasRef33 = useRef(null)

  // Assign Post Api 
  const MyAssignPostApi = async () => {
    const formData = {
      "teacherId": teacherId,
      "subjectId": subjectId,
      "classSection": transformedSections
    }
    setLoader(true)
    try {
      const response = await AssignTeaSubPostApi(formData);
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setShow(false)
          setHide(true)
          setLoader(false)
          setSubjectId('')
          setTeacherId('')
          setTransformedSections([])
          setAllSectionWithClass([])
          UpdatClassGetApi()
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
          offcanvasInstance.hide();
          setTimeout(() => {
            setShow(true)
          }, 0.5)
        } else {
          toast.error(response?.data?.message);
          setShow(true)
          setLoader(false)
        }
      } else {
        toast.error(response?.data?.message);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  // Assign Get all Api 
  const MyAssignGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await AssignGetAllApi(classId, subjectId, pageNo, pageSize);
      if (response?.status === 200) {
        // toast.success(response?.data?.msg)
        setAssignSubTeaAllData(response?.data?.teacher)
        setCurrentPage(response?.data?.currentPage)
        setTotalPages(response?.data?.totalPages)
        setLoader(false)
      } else {
        toast.error(response?.data?.msg);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  // Delete api
  const MyStaffDeleteApi = async () => {
    const data = {
      "subjectId": subjectIdForDelete,
      "teacherId": staffIdForDelete,
      "classSection": classSectiomData
    }
    setLoader(true)
    try {
      const response = await AssignDeleteDeleteApi(data);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        MyAssignGetAllApi()
        setShowdelete(false)
        setHidedelete(true)
        setLoader(false)
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
        offcanvasInstance.hide();
        setTimeout(() => {
          setShowdelete(true)
          setForDelete(false)
        }, 0.5)
      } else {
        toast.error(response?.data?.message);
        setShowdelete(true)
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  const handleForDelete = () => {
    MyStaffDeleteApi(subjectIdForDelete, staffIdForDelete)
  }
  const ClearHandle = () => {
    setClassId('')
    setClassNo('')
    setSubjectId('')
    setTeacherId('')
    setForDelete(false)
  }
  const ClearDataInSearch = () => {
    setClassId('');
    setClassNo('');
    setSubjectId('');
    setAssignSubTeaAllData([]);
    setForDelete(false)
  };

  const heading = [
    { class: 'Class', section: 'Section', },
  ];

  const mainPeriod = [
    {
      class: '1', Section: [
        { section: 'A' },
        { section: 'B' },
        { section: 'C' },
        { section: 'D' },
        { section: 'E' },
        { section: 'F' },]
    },
    {
      class: '2', Section: [
        { section: 'A' },
        { section: 'B' },
        { section: 'C' },
        { section: 'D' },
        { section: 'E' },
        { section: 'F' },
      ]
    },
    {
      class: '3', Section: [
        { section: 'A' },
        { section: 'B' },
        { section: 'C' },
        { section: 'D' },
        { section: 'E' },
        { section: 'F' },]
    },
    {
      class: '4', Section: [
        { section: 'A' },
        { section: 'B' },
        { section: 'C' },
        { section: 'D' },
        { section: 'E' },
        { section: 'F' },]
    },
    {
      class: '5', Section: [
        { section: 'A' },
        { section: 'B' },
        { section: 'C' },
        { section: 'D' },
        { section: 'E' },
        { section: 'F' },]
    },

  ];

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
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#" onClick={MyAssignGetAllApi}>Assign Subject Teacher</Link></li>
              </ol>
            </nav>
          </div>

          <div className='d-flex g-1 for-media-query'>
            <Link type="button" className="btn btn-success heading-16 my-own-button me-3 " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" to={''} onClick={ClearHandle}>+ Assign Subject Teacher</Link>
          </div>

        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-12px' }}>Subject & Teacher</h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}
          <div className="row p-3">
            <div className="col-lg-6 col-md-6 col-sm-12  ">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label mb-1 label-text-color focus heading-14">
                  Class
                </label>
                <select
                  className="form-select form-select-sm form-focus label-color"
                  value={`${classId}, ${classNo}`}
                  onChange={handle}
                  aria-label="Default select example"
                >
                  <option value="">--Choose--</option>
                  {classData?.map(item => (
                    <option key={item.classId} value={`${item.classId}, ${item.classNo}`}>
                      {item.classNo}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Subject</label>
                <select
                  className="form-select form-select-sm form-focus label-color"
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  aria-label="Default select example"
                >
                  <option value="">--Choose--</option>
                  {subjectData?.map(item =>
                    <option key={item.subjectId} value={item.subjectId}>
                      {item.subjectName}
                    </option>
                  )}
                </select>

              </div>
            </div>
          </div>
          {/* ####### buttons ######  */}
          <div className="row mb-3 buttons-topss">
            <div className='my-button11 heading-16'>
              <button type="button" class="btn btn-outline-success" style={{ backgroundColor: "#008479", color: '#fff' }} onClick={MyAssignGetAllApi} disabled={!(classId && subjectId)}>Search</button>
              <button type="button" class="btn btn-outline-success" onClick={ClearDataInSearch}>Cancel</button>
            </div>
          </div>

          <div className="table-container px-3 table-responsive">
            <table className="table table-sm table-striped">
              <thead className=''>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className=' no-wrap' style={{ width: '' }}>#</th>
                  <th className='no-wrap' style={{ width: '' }}>Teacher</th>
                  <th className='no-wrap' style={{ width: '' }}>Class</th>
                  <th className='no-wrap' style={{ width: '500px' }}>Section</th>
                  <th >Actions</th>
                </tr>
              </thead>

              <tbody className='heading-14 align-middle greyTextColor'>
                {
                  assignSubTeaAllData?.map((item, index) => (
                    <tr className='heading-14' >
                      <td className=' greyText no-wrap'>{index + 1 + (currentPage - 1) * pageSize}</td>
                      <td className=' greyText no-wrap'>{item.staffName}</td>
                      <td className=' greyText no-wrap  '>{item.classNo}</td>
                      <td className=' greyText no-wrap  '>
                        {
                          item?.sectionNames?.map((item, index) => (
                            <td className=' greyText no-wrap ' key={index}>{item}</td>
                          ))
                        }
                      </td>

                      <td className=' greyText no-wrap ' >
                        <div className="dropdown my-button-show">
                          <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Action  &nbsp;
                            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                              <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                            </svg>
                          </button>
                          <ul className="dropdown-menu anchor-color heading-14">
                            <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight" onClick={(e) => { setSubjectIdForDelete(item.subjectId), setStaffIdForDelete(item.staffId), addClassWithSections(item.classId, item.sectionIds) }}>Remove</Link></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              {/* <Toaster /> */}
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
                  <Link data-bs-dismiss="offcanvas" ><img src="/images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Assign Subject Teacher</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="offcanvas-body pt-0">
               

                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label  heading-16">Subject Name</label>
                    <select class="form-select  form-select-sm form-focus  label-color" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} aria-label="Default select example">
                      <option selected>--Choose--</option>
                      {
                        subjectData?.map(item =>
                          <option value={item.subjectId}>{item.subjectName}</option>
                        )
                      }
                    </select>
                  </div>

                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label  heading-16">Teacher</label>
                    <select class="form-select  form-select-sm form-focus  label-color" value={teacherId} onChange={(e) => setTeacherId(e.target.value)} aria-label="Default select example">
                      <option selected>--Choose--</option>
                      {
                        teacherAllData?.map(item =>
                          <option value={item.id}>{item.staffName}</option>
                        )
                      }
                    </select>
                  </div>
                  <div className="table-container px-3 table-responsive">
                    <table className="table table-sm table-striped">
                      <thead className=''>
                        {
                          heading?.map((item, index) => (
                            <tr key={index} className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                              <th className=' no-wrap' style={{ width: '100px' }}>{item.class}</th>
                              <th className=' no-wrap' style={{ width: '100px' }}>{item.section}</th>
                            </tr>
                          ))
                        }
                      </thead>
                      <tbody className='heading-14 align-middle greyTextColor'>
                        {SectionWithClass?.map((classItem, index) => (
                          <tr key={index} className='heading-14'>
                            <td className='greyText no-wrap'>
                              <div className="d-flex align-items-center gap-2">
                                <input
                                  className="form-check-input my-form-check-input"
                                  type="checkbox"
                                  checked={isClassChecked(classItem)}
                                  onChange={() => toggleAllSectionsInClass(classItem)}
                                  id={`class-all-${classItem.classId}`}
                                />
                                <label htmlFor={`class-all-${classItem.classId}`}>
                                  {classItem.classNo}
                                </label>
                              </div>
                            </td>
                            {classItem.sections?.map((sectionItem, sectionIndex) => (
                              <td key={sectionIndex} className='greyText no-wrap'>
                                <div className="d-flex align-items-center gap-2">
                                  <input
                                    className="form-check-input my-form-check-input"
                                    type="checkbox"
                                    checked={selectedSections.some(s =>
                                      s.classId === classItem.classId &&
                                      s.sectionId === sectionItem.classSecId
                                    )}
                                    onChange={() =>
                                      toggleSection(classItem.classId, sectionItem.classSecId)
                                    }
                                    id={`section-${classItem.classId}-${sectionItem.classSecId}`}
                                  />
                                  <label htmlFor={`section-${classItem.classId}-${sectionItem.classSecId}`}>
                                    {sectionItem.sectionName}
                                  </label>
                                </div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>
                  <div className='my-button11 '>
                    <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" onClick={(e) => { MyAssignPostApi() }} style={{ backgroundColor: '#008479', color: '#fff' }}>Add</button>
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
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight1234" aria-labelledby="offcanvasRightLabel">
          {
            showadd && (
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="/images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Class Routine</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />

                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label heading-16">Title</label>
                  <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" value={titleNamegetById} onChange={(e) => setTitleNamegetById(e.target.value)} placeholder="Select Class" />
                </div>

                <div className="mb-1  ">
                  <label for="exampleFormControlInput1" className="form-label heading-16">Class</label>
                  <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => handleClass(e)} aria-label="Default select example">
                    <option selected >{''}</option>
                   
                  </select>
                </div>
                <div className="mb-1  ">
                  <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                  <select class="form-select  form-select-sm form-focus  label-color" value={''} onChange={(e) => setSectionNameGetById(e.target.value)} aria-label="Default select example">
                    <option selected>{''}</option>
                   
                  </select>
                </div>
                <div className="mb-1  ">
                  <label for="exampleFormControlInput1" className="form-label  heading-16">Subject</label>
                  <select class="form-select  form-select-sm form-focus label-color" value={''} onChange={(e) => setSubjectGetById(e.target.value)} aria-label="Default select example">
                    <option selected>{''}</option>
                   
                  </select>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label heading-16">Upload Syllabus</label>
                  <input type="file" class="form-control form-control-sm" value={''} id="exampleFormControlInput1" placeholder="Select Class" />
                </div>

                <div className='my-button11'>
                  <button type="button" className="btn btn-outline-success heading-16" onClick={(e) => { MySyllabusPutApi(IdForUpdate) }}>Update Syllabus</button>
                  <button type="button" className="btn btn-outline-success heading-16" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                </div>
              </div>
            )
          }
          {/* ################# After click ###############  */}
          {
            hideedit && (
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="/images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Successfully Message</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="delete-section  mt-5">
                  <div className="bg-container">
                    <div className="img-container">
                      <img src="/images/XMLID_1_.png" alt="" />
                    </div>
                    <div className="content mt-5">
                      <p >Successful Edit</p>
                      <hr style={{ width: '' }} />
                      <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your Changes has been <br /> Successfully Saved</p>
                    </div>
                    <div className='button-position'>
                      <button type="button" data-bs-dismiss="offcanvas" className="btn btn-outline-primary button11 mt-4 mb" style={{ fontSize: '14px' }}>Continue</button>
                    </div>

                  </div>
                </div>
              </div>
            )
          }
          {/* ##### offcanvase edit end ########  */}
        </div>

        {/* ################ offcanvas delete start #############  */}


        {
          showdelete && (
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight22" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef22}>
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3' onClick={ClearHandle}><img src="/images/Vector (13).svg" alt="" /></Link>
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
                        <input
                          className="form-check-input my-form-check-input"
                          onChange={() => setForDelete(!forDelete)}
                          type="checkbox"
                          checked={forDelete}
                          value=""
                          id="flexCheckDefault"
                          name="deleteAgreement" // Added name attribute
                        />
                        <label className="form-check-label agree" htmlFor="flexCheckDefault">
                          I Agree to delete the Profile Data
                        </label>
                      </div>

                      <div className="mt-4">
                        <button type="button" className="btn my-btn  button00 my-button112233RedDelete" disabled={forDelete ? false : true} onClick={handleForDelete}>Delete</button>
                        <button type="button" className="btn cancel-btn  ms-2" data-bs-dismiss="offcanvas" aria-label="Close" onClick={ClearHandle}>Cancel</button>
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

export default AssignSubjectTeacher