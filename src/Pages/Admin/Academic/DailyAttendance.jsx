import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import { ClassGetApi } from 'src/Utils/Apis'
import { SyllabusSectionGetAllApi } from 'src/Utils/Apis'
import { DailyAttendancehGetAll } from 'src/Utils/Apis'
import { DailyAttendancePostApi } from 'src/Utils/Apis'
import { MyDailyAttendancePutApi } from 'src/Utils/Apis'
import { DailyAttendancehGetAllBymonth } from 'src/Utils/Apis'
import { DailyAttendanceCSV } from 'src/Utils/Apis'
import HashLoader from 'src/Pages/HashLoaderCom';
import ActionControls from '../../../Layouts/ActionControls';
import { Icon } from '@iconify/react/dist/iconify.js';

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
  background-color: #F2F3F6;
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
.my-button22{
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
  height: 37px;
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
.my-i-button{
  border: none;
  background: none;
}
.disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}
.stu-present{
  background-color: #4CAF50;
  color: #fff;
  padding: 1px 8px 1px 8px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
  width: 25px;
}
.stu-absent{
  background-color: #F44336;
  color: #fff;
  padding: 1px 8px 1px 8px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
  width: 25px;
}
.stu-weekend{
  background-color: #9E9E9E;
  color: #fff;
  padding: 1px 8px 1px 8px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
  width: 28px;
}
.stu-leave{
  background-color: #FFC107;
  color: #fff;
  padding: 1px 8px 1px 8px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
  width: 25px;
}
.stu-holiday{
  background-color: #2196F3;
  color: #fff;
  padding: 1px 8px 1px 8px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
  width: 25px;
}
.show-attendance{
  background-color: #FFF9F6;
  border: 1px dashed #EECEBE;
  padding: 10px;
}
.fontSize{
  font-size: 16px !important;
}
/* ############# offcanvas ############## */

/* ########## media query ###########  */
 @media only screen and (max-width: 950px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
  .search-responsive {
    margin-top: 10px;
  }
}
 @media only screen and (max-width: 735px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
@media only screen and (max-width: 605px) {
  .for-media-query-22 {
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
@media only screen and (max-width: 590px) {
        .my-own-outline-btn{
          height: 33px;
          width: 100%;
          color: #000;
          line-height: 1;
          border: 1px solid var( --buttonBorder);
          background-color: #fff;
        }
        .my-own-button {
      width: 100%;
    }
  }
@media only screen and (max-width: 1015px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }
}
@media only screen and (max-width: 768px) {
    .mrgn-btm-respnsve{
        margin-top: 5px !important;
    }
}
@media only screen and (max-width: 1000px) {
    .responsive-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
        width: 50%;
    }
    .rsnsve-pd{
      padding-left: 0px !important;
      width: 100%;
    }
    .responsive-direction{
      display: inline-block;
      padding: 0% !important;
    }
    .padding-left{
      padding-left: 8px;
    }
}
@media only screen and (max-width: 952px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }
}

@media only screen and (max-width: 500px) {

  .responsive-direction{
    width: 80%;
  }

}
@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }
  .responsive-direction{
    width: 80%;
  }
}
`;
// ## style css area end ####  

const DailyAttendance = ({ items }) => {

  const [hide, setHide] = useState(false)
  const [loader, setLoader] = useState(false)
  const [show, setShow] = useState(true)
  const [showMonth, setShowMonth] = useState('')
  const [lastUpdate, setLastUpdate] = useState('')
  const [time, setTime] = useState('')
  const [attendance, setAttendance] = useState(false)
  const [present, setPresent] = useState([])
  const [absent, setAbsent] = useState([])
  const [classNumber, setClassNumber] = useState()
  const [sectionId2, setSectionId2] = useState()
  const [sectionId, setSectionId] = useState()
  const [classId, setClassId] = useState()
  const [month, setMonth] = useState()
  const [year, setYear] = useState()

  const [sectionName, setSectionName] = useState()
  const [search, setSearch] = useState('')
  const [date, setDate] = useState()
  const [name, setName] = useState()
  const [classData, setClassData] = useState([])
  const [sectionData, setSectionData] = useState([])
  const [dailyAttenSearDateData, setDailyAttenSearDateData] = useState([])
  const [dailyDataByMonth, setDailyDataByMonth] = useState([])
  const [myTrueFalse, setMyTrueFalse] = useState(true)

  const sectionHandle = (e) => {
    setSectionId2(parseInt(e))
  }
  const UpdateHandleBtn = (e) => {
    setMyTrueFalse(false)
  }

  useEffect(() => {
    UpdatClassGetApi()
    if (classId) {
      MySyllabusSectionGetApi()
    }
    MyDailyAttendanceGetApi()
  }, [classId, sectionId])

  useEffect(() => {
    MyDailyAttendanceGetApi()
  }, [date])

  const [searchKey, setSearchKey] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  // class Get all data from class page for class id  
  const UpdatClassGetApi = async () => {
    try {
      const response = await ClassGetApi(searchKey, pageNo, pageSize);
      if (response?.status === 200) {
        setClassData(response?.data?.classes)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Section by class for section 
  const MySyllabusSectionGetApi = async () => {
    try {
      const response = await SyllabusSectionGetAllApi(classId);
      if (response?.status === 200) {
        setSectionData(response?.data?.allSections)
      } else {
        toast.error(response?.data?.classes?.message);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  // Daily attendance get all aapi by search-date
  const MyDailyAttendanceGetApi = async () => {
    try {
      const response = await DailyAttendancehGetAll(sectionId, date);
      if (response?.status === 200) {
        setDailyAttenSearDateData(response?.data?.studentList)
      } else {
        toast.error(response?.data?.classes?.message);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  // Daily attendance get all aapi by month
  const MyDailyAttendanceGetAllApiByMonth = async () => {
    setLoader(true)
    try {
      const response = await DailyAttendancehGetAllBymonth(sectionId, month, year, search, pageNo, pageSize);
      if (response?.status === 200) {
        setDailyDataByMonth(response?.data?.attendance)
        setCurrentPage(response?.data?.currentPage)
        setTotalPages(response?.data?.totalPages)
        setShowMonth(response?.data?.requestInfo?.monthYear)
        setLastUpdate(response?.data?.requestInfo?.lastUpdated)
        setTime(response?.data?.requestInfo?.currentTime)
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

  const SectionHandle = (e) => {
    const value = e;
    const [val1, val2] = value.split(',');
    setSectionId(parseInt(val1))
    const name = val2.trim()
    setSectionName(name)
  }
  const SectionHandle22 = (e) => {
    const value = e;
    const [val1, val2] = value.split(',');
    setSectionId(parseInt(val1))
    const name = val2.trim()
    setSectionName(name)
  }
  const ClassHandle00 = (e) => {
    const value = e;
    const [val1, val2] = value.split(',');
    setClassId(parseInt(val1))
    const name = val2.trim()
    setClassNumber(name)
  }

  const offcanvasRef = useRef(null);
  const offcanvasRef22 = useRef(null);

  // Daily attendance Post Api 
  const MyDailyAttendancePostApi = async () => {
    const data = {
      "date": date,
      "sectionId": sectionId,
      "studentList": present
    }

    setLoader(true)
    try {
      const response = await DailyAttendancePostApi(data);
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setLoader(false)
          setShow(false)
          setHide(false)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
          offcanvasInstance.hide();
          setShow(false)

          setTimeout(() => {
            setShow(true)
            setMyTrueFalse(true)
          }, 0.5)

        } else {
          toast.error(response?.data?.message);
          // setShow(true)
          setLoader(false)

        }
      } else {
        toast.error(response?.data?.msg);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  // Daily attendance Put api 
  const MyNewDailyAttendancePutApi = async () => {
    const data = {
      "date": date,
      "sectionId": sectionId,
      "stuPresent": present,
      "stuAbsent": absent,
      "sectionName": sectionName
    }
    setLoader(true)
    try {
      const response = await MyDailyAttendancePutApi(data);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setLoader(false)
        setShow(false)
        setHide(false)
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
        offcanvasInstance.hide();
        setShow(false)
        setTimeout(() => {
          setShow(true)
          setMyTrueFalse(true)
        }, 0.5)
      } else {
        toast.error(response?.data?.msg);
        setEditshow(true)
        setLoader(false)
      }

    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  // ****************************************************************************************************************************
  const handleRadioChange = (index, value, name) => {
    const updatedData = dailyAttenSearDateData.map((item, i) =>
      i === index ? { ...item, present: value } : item
    );
    setDailyAttenSearDateData(updatedData);
    setAttendance(value)
    if (value === true) {
      let presentValue = name;
      setPresent([...present, presentValue])
    } else {
      let absentValue = name;
      setAbsent([...absent, absentValue])
    }
  };

  const handleChange = (e) => {
    const trimmedValue = e.target.value.trimStart();
    setSearchKey(trimmedValue);
  };
  const clearDataHandle = () => {
    setClassId('')
    setSectionId('')
    setSectionName('')
    setMonth('')
    setYear('')
    setDate('')
    setMyTrueFalse(true)
    setDailyDataByMonth([])
    setClassNumber('')
    setShowMonth('')
    setLastUpdate('')
    setTime('')
  }

  const handleSearchButton = () => {
    MyDailyAttendanceGetAllApiByMonth();
  };
  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchKey(value);
    setPageNo(1);
  };

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
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#" onClick={MyDailyAttendanceGetAllApiByMonth}>Daily Attendance</Link></li>
              </ol>
            </nav>
          </div>
          <div className="d-flex g-1 for-media-query">
            <ActionControls
              showAddButton={false}
              addButtonText=""
              addButtonAction={''}
              // searchAction={handleSearchButton}
              showExportPDF={false}
              exportPDFText="Export PDF"
              exportPDFAction={''}
              exportPDFFileName="Daily Attendance.pdf"
              showExportCSV={dailyDataByMonth?.length > 0}
              exportCSVText="Export CSV"
              // exportCSVAction={DailyAttendanceCSV()}
              exportCSVAction={() => DailyAttendanceCSV(sectionId, month, year)}
              exportCSVFileName="Daily Attendance.xlsx"
              showSearch={true}
              searchValue={searchKey}
              searchAction={MyDailyAttendanceGetAllApiByMonth}
              onSearchChange={handleSearchChange}
            />
            <div class="dropdown" >
              <button className="btn btn-success heading-16 my-own-button me-3  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                Attendance
              </button>
              <ul class="dropdown-menu">
                <li><Link class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" to="#" onClick={clearDataHandle} >Take Attendance</Link></li>
                <li><Link class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight123" aria-controls="offcanvasRight" to="#">Update Attendance</Link></li>
              </ul>
            </div>
          </div>

        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-22px' }}>Attendance</h5>

        <div className="main-content-conatainer pt-1">
          {/* ###### copy content till here for all component ######  */}
          <div className="row p-3">
            <div className="col-lg-3 col-md-6 col-sm-12  ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Month</label>
                <select class="form-select  form-select-sm" value={month} onChange={(e) => setMonth(e.target.value)} aria-label="Default select example">
                  <option >--Choose--</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Year</label>
                <select class="form-select  form-select-sm" value={year} onChange={(e) => setYear(e.target.value)} aria-label="Default select example">
                  <option >--Choose--</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color  heading-14">Class</label>
                <select class="form-select form-focus  form-select-sm " value={`${classId},${classNumber}`} onChange={(e) => ClassHandle00(e.target.value)} aria-label="Default select example">
                  <option value=''>--Choose--</option>
                  {
                    classData?.map((item) => (
                      <option value={`${item.classId},${item.classNo}`}>{item.classNo}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Section</label>
                <select class="form-select  form-select-sm" value={`${sectionId},${sectionName}`} onChange={(e) => SectionHandle22(e.target.value)} aria-label="Default select example">
                  <option value=''>--Choose--</option>
                  {
                    sectionData?.map((item) => (
                      <option value={`${item.sectionId},${item.sectionName}`}>{item.sectionName}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
          {/* ####### buttons ######  */}
          <div className="row buttons-topss">
            <div className='my-button11 heading-16'>
              <button type="button" class="btn btn-outline-success" style={{ backgroundColor: '#008479', color: '#fff ', cursor: 'pointer' }} onClick={MyDailyAttendanceGetAllApiByMonth} disabled={!(classId && sectionId && month && year) ? true : false} >Search</button>
              <button type="button" class={`btn cancelButtons text-black`} style={{ cursor: 'pointer' }} onClick={clearDataHandle} disabled={!(classId && sectionId && month && year) ? true : false} >Cancel</button>
            </div>
          </div>
          {dailyDataByMonth.length > 0 ?
            <>
              <div className="row mt-4 mb-4 bg-color-pink p-3 m-3 responsive-direction">
                <div className="col-2 p-0 ps-4 rsnsve-pd d-flex padding-lef ">
                  <span className='heading-16 greyText padding-left'>Class - </span> &nbsp; &nbsp;
                  <div >{classNumber}</div>
                </div>
                <div className="col-2 p-0 ps-3 d-flex rsnsve-pd">
                  <span className='heading-16 greyText padding-left'>Section - </span> &nbsp; &nbsp;
                  <div>{sectionName}</div>
                </div>
                <div className="col-3 p-0 d-flex rsnsve-pd">
                  <span className='heading-16 greyText padding-left'>Month -</span> &nbsp; &nbsp;
                  <div>{showMonth}</div>
                </div>
                <div className="col-3 p-0 d-flex  rsnsve-pd">
                  <span className='heading-16 greyText padding-left'>Last Update at  - </span> &nbsp; &nbsp;
                  <div >{lastUpdate ? lastUpdate : ''}</div>
                </div>
                <div className="col-2 p-0 d-flex rsnsve-pd">
                  <span className='heading-16 greyText  padding-left'>Time  - </span> &nbsp; &nbsp;
                  <div>{time ? time.slice(0, 8) : ''}</div>
                </div>
              </div>
              {
                dailyDataByMonth && dailyDataByMonth?.length > 0 && (
                  <div className="container ">
                    <div className="row m-1 mb-4 show-attendance">
                      <div className="col-md-1 "></div>
                      <div className="col-md-2 d-flex "><p className='stu-present'>P</p><span className='fontSize ms-2'>Present</span></div>
                      <div className="col-md-2 d-flex mrgn-btm-respnsve"><p className='stu-absent'>A</p><span className='fontSize ms-2'>Absent</span></div>
                      <div className="col-md-2 d-flex mrgn-btm-respnsve"><p className='stu-weekend'>W</p><span className='fontSize ms-2'>Weekend</span> </div>
                      <div className="col-md-2 d-flex mrgn-btm-respnsve"><p className='stu-leave'>L</p><span className='fontSize ms-2'>Leave</span></div>
                      <div className="col-md-2 d-flex mrgn-btm-respnsve"><p className='stu-holiday'>H</p><span className='fontSize ms-2'>Holiday</span></div>
                      <div className="col-md-1 "></div>
                    </div>
                  </div>
                )
              }
              <div className="table-container px-3 table-responsive">
                <table className="table table-sm ">
                  <thead className=''>
                    <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                      <th className='table-row-bg-color'>#</th>
                      <th className='table-row-bg-color'> Student Name</th>
                      <th className='table-row-bg-color'>1</th>
                      <th className='table-row-bg-color'>2</th>
                      <th className='table-row-bg-color'>3</th>
                      <th className='table-row-bg-color'>4</th>
                      <th className='table-row-bg-color'>5</th>
                      <th className='table-row-bg-color'>6</th>
                      <th className='table-row-bg-color'>7</th>
                      <th className='table-row-bg-color'>8</th>
                      <th className='table-row-bg-color'>9</th>
                      <th className='table-row-bg-color'>10</th>
                      <th className='table-row-bg-color'>11</th>
                      <th className='table-row-bg-color'>12</th>
                      <th className='table-row-bg-color'>13</th>
                      <th className='table-row-bg-color'>14</th>
                      <th className='table-row-bg-color'>15</th>
                      <th className='table-row-bg-color'>16</th>
                      <th className='table-row-bg-color'>17</th>
                      <th className='table-row-bg-color'>18</th>
                      <th className='table-row-bg-color'>19</th>
                      <th className='table-row-bg-color'>20</th>
                      <th className='table-row-bg-color'>21</th>
                      <th className='table-row-bg-color'>22</th>
                      <th className='table-row-bg-color'>23</th>
                      <th className='table-row-bg-color'>24</th>
                      <th className='table-row-bg-color'>25</th>
                      <th className='table-row-bg-color'>26</th>
                      <th className='table-row-bg-color'>27</th>
                      <th className='table-row-bg-color'>28</th>
                      <th className='table-row-bg-color'>29</th>
                      <th className='table-row-bg-color'>30</th>
                      <th className='table-row-bg-color'>31</th>
                      {/* {dates.map(date => (
                    <th key={date.toISOString()}>{date.toDateString()}</th>
                  ))} */}
                    </tr>
                  </thead>
                  <tbody className='heading-14 align-middle greyTextColor'>
                    {
                      dailyDataByMonth && dailyDataByMonth?.length > 0 ? (
                        dailyDataByMonth?.map((item, index) => (
                          <tr className="heading-14" key={index}>
                            <td className="greyText">{index + 1}</td>
                            <td className="greyText">{item.name.split('-')[1]}</td>
                            {item?.attendance.map((att, i) => (
                              <td className="greyText" key={i}>
                                {att.status === "present" ? (
                                  <p className="stu-present">P</p>
                                ) : att.status === "absent" ? (
                                  <p className="stu-absent">A</p>
                                ) : att.status === "weekend" ? (
                                  <p className="stu-weekend">W</p>
                                ) : att.status === "leave" ? (
                                  <p className="stu-leave">L</p>
                                ) : (
                                  <p className="stu-holiday">H</p>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="100%" style={{ minHeight: '100%' }}>
                            <div className="text-center">
                              <img
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/images/fallback.png";
                                }}
                                src="/images/search.svg"
                                alt=""
                                className="img-fluid p-5"
                              />
                              <h2><b>No Data Found</b></h2>
                            </div>
                          </td>
                        </tr>
                      )
                    }


                  </tbody>
                </table>
              </div>
              <div className="d-flex p-3" style={{ marginBottom: '10px' }}>
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
            <>
              <div className="d-flex justify-content-center m-5">
                <img src="/images/search.svg" alt="" />
              </div>
            </>
          }
        </div>
        {
          show && (
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef}>
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Vector (13).svg" alt="" onClick={clearDataHandle} /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Daily Attendance</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="inputs">

                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label label-color ">Date</label>
                    <input type="date" className="form-control form-focus input-bg label-color" value={date} onChange={(e) => setDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="John Doe" />
                  </div>

                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label label-color ">Class</label>
                  <select class="form-select form-focus input-bg label-color" value={classId} onChange={(e) => setClassId(e.target.value)} aria-label="Default select example">
                    <option value=''>--Choose--</option>
                    {
                      classData?.map((item) => (
                        <option value={item.classId}>{item.classNo}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label label-color ">Section</label>
                  <select class="form-select form-focus input-bg label-color" value={sectionId} onChange={(e) => setSectionId(e.target.value)} aria-label="Default select example">
                    <option value=''>--Choose--</option>

                    {
                      sectionData.map((item) => (
                        <option value={item.sectionId}>{item.sectionName}</option>
                      ))
                    }
                  </select>
                </div>

                {
                  myTrueFalse ?
                    (
                      <div className='my-button11 '>
                        <button type="button" className="btn  heading-16" style={{ backgroundColor: '#008479', color: '#fff' }} onClick={(e) => { UpdateHandleBtn() }}>Show Student List</button>
                        <button type="button" className="btn" style={{ fontSize: '14px' }} data-bs-dismiss="offcanvas" aria-label="Close" onClick={clearDataHandle} >Cancel</button>
                      </div>
                    ) :
                    (
                      <>
                        <div className='heading-14 d-flex  ps-1 pt-2 orangeText'>
                          <p>P - Present</p>
                          <p className='ps-4'>A - Absent</p>
                        </div>
                        <div className="table-container pt-3 table-responsive overflow-y">
                          <table className="table  ">
                            <thead className=''>
                              <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                                <th className='table-row-bg-color greyTextColor'>#</th>
                                <th className='table-row-bg-color greyTextColor'> Student Name</th>
                                <th className='table-row-bg-color greyTextColor'>Status</th>
                              </tr>
                            </thead>
                            <tbody className='heading-14 align-middle greyTextColor ' >
                              {
                                dailyAttenSearDateData?.map((item, index) => (
                                  <tr className='heading-14' key={index}>
                                    <td className='greyText'>{index + 1}</td>
                                    <td className='greyText'>{item.name ? item.name.split('-')[1] : ''}</td>
                                    <td className='heading-18 pe-0 d-flex'>
                                      <div className='d-flex'>
                                        <p className=''>P</p>
                                        <span className='pt-1 ps-2'>
                                          <input
                                            className="form-check-input my-form-check-input"
                                            checked={item.present === true}
                                            type="radio"
                                            onClick={() => handleRadioChange(index, true, item.name)}
                                          />
                                        </span>
                                      </div>
                                      <div className='d-flex ps-4'>
                                        <p>A</p>
                                        <span className='pt-1 ps-2'>
                                          <input
                                            className="form-check-input my-form-check-input"
                                            checked={item.present === false}
                                            type="radio"
                                            onClick={() => handleRadioChange(index, false, item.name)}
                                          />
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        <div className='my-button11 '>
                          <button type="button" className="btn  heading-16" style={{ backgroundColor: '#008479', color: '#fff' }} onClick={MyDailyAttendancePostApi}>Submit</button>
                          <button type="button" className="btn " data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                        </div>
                      </>
                    )
                }
              </div>
            </div>
          )
        }
        {
          show && (
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight123" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef22}>
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Update Attendance</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="inputs">
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label label-color ">Date</label>
                    <input type="date" className="form-control form-focus input-bg label-color" value={date} onChange={(e) => setDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="John Doe" />
                  </div>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label label-color ">Class</label>
                  <select class="form-select form-focus input-bg label-color" value={classId} onChange={(e) => setClassId(e.target.value)} aria-label="Default select example">
                    <option value=''>--Choose--</option>
                    {
                      classData?.map((item) => (
                        <option value={item.classId}>{item.classNo}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label label-color ">Section</label>
                  <select class="form-select form-focus input-bg label-color" value={`${sectionId},${sectionName}`} onChange={(e) => SectionHandle(e.target.value)} aria-label="Default select example">
                    <option value=''>--Choose--</option>
                    {
                      sectionData?.map((item) => (
                        <option value={`${item.sectionId},${item.sectionName}`}>{item.sectionName}</option>
                      ))
                    }
                  </select>
                </div>
                {
                  myTrueFalse ?
                    (
                      <div className='my-button11 '>
                        <button type="button" className="btn btn-outline-success heading-16" style={{ backgroundColor: '#008479', color: '#fff' }} onClick={(e) => { UpdateHandleBtn() }}>Show Student List</button>
                        <button type="button" className="btn cancelButtons text-black" data-bs-dismiss="offcanvas" aria-label="Close" onClick={clearDataHandle}>Cancel</button>
                      </div>
                    ) :
                    (
                      <>
                        <div className='heading-14 d-flex  ps-1 pt-2 orangeText'>
                          <p>P - Present</p>
                          <p className='ps-4'>A - Absent</p>
                        </div>
                        <div className="table-container pt-3 table-responsive overflow-y">
                          <table className="table  ">
                            <thead className=''>
                              <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                                <th className='table-row-bg-color greyTextColor'>#</th>
                                <th className='table-row-bg-color greyTextColor'> Student Name</th>
                                <th className='table-row-bg-color greyTextColor'>Status</th>
                              </tr>8077945599
                            </thead>
                            <tbody className='heading-14 align-middle greyTextColor ' >
                              {
                                dailyAttenSearDateData?.map((item, index) => (
                                  <tr className='heading-14' key={index}>
                                    <td className='greyText'>{index + 1}</td>
                                    <td className='greyText'>{item.name ? item.name.split('-')[1] : ''}</td>
                                    <td className='heading-18 pe-0 d-flex'>
                                      <div className='d-flex'>
                                        <p className=''>P</p>
                                        <span className='pt-1 ps-2'>
                                          <input
                                            className="form-check-input my-form-check-input"
                                            checked={item.present === true}
                                            type="radio"
                                            onClick={() => handleRadioChange(index, true, item.name)}
                                          />
                                        </span>
                                      </div>
                                      <div className='d-flex ps-4'>
                                        <p>A</p>
                                        <span className='pt-1 ps-2'>
                                          <input
                                            className="form-check-input my-form-check-input"
                                            checked={item.present === false}
                                            type="radio"
                                            onClick={() => handleRadioChange(index, false, item.name)}
                                          />
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        <div className='my-button11 '>
                          <button type="button" className="btn  heading-16" style={{ backgroundColor: '#008479', color: '#fff' }} onClick={MyNewDailyAttendancePutApi}>Update</button>
                          <button type="button" className="btn " data-bs-dismiss="offcanvas" aria-label="Close" onClick={clearDataHandle}>Cancel</button>
                        </div>
                      </>
                    )
                }
              </div>
            </div>
          )
        }
      </div>
    </Container>
  )
}

export default DailyAttendance;
// hira lal bara seni 
// 9927031200 prashant ji


