import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { ClassGetApi } from '../../../Utils/Apis'
import HashLoader from 'src/Pages/HashLoaderCom';
import { PayrollPostApi } from '../../../Utils/Apis'
import { PayrollGetAllApi } from '../../../Utils/Apis'
import { PayrollGetAllBtIdApi } from '../../../Utils/Apis'
import { PayrollDeleteApi } from '../../../Utils/Apis'
import { PayrollPaidUnPaidPostApi } from '../../../Utils/Apis'
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react/dist/iconify.js';
import ActionControls from '../../../Layouts/ActionControls';
import SchoolLogoGetApi from '../../../../public/images/schoolLogo.svg'
import DownloadArrow from '../../../../public/images/upperArrow.svg'

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
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

.my-navlink-tabs a{
color: #000 !important;
}
.nav-link{
    color: #000 !important;
} 
.font-background{
    width: 62px;

    background-color: #00A67E;
    color: #fff;
    padding: 2px 0px 2px 0px !important;
    text-align: center;
    border-radius: 33px;
}
.font-background22{
    width: 88px;
    background-color: #B50000;
    color: #fff;
    padding: 2px;
    text-align: center;
    border-radius: 33px;
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
  .staff-image-adjust img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 8px;
    object-fit: cover;
    border: 1px solid #b9b8b8;
  }
  .contentWithLogo{
    font-size: 14px;
  }
  .contentWithLogo22{
    font-size: 18px !important;
  }
  .font14{
    font-size: 14px ;
  }
  .font13{
    font-size: 13px ;
  }
  .paid{
    background-color: #008479;
    padding: 2px 10px 2px 10px;
    color: #fff;
    border-radius: 33px;
    width: fit-content;
  }
  .dataTable{
    border: 1px solid #F2F3F6;
  }
  #rowBorder{
    border: 1px solid #F2F3F6;
    background-color:' #D7E7E5' !important;
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

@media only screen and (max-width: 1215px) {
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

const Payroll = () => {

  const [loader, setLoader] = useState(false)

  const [show, setShow] = useState(true)
  const [hide, setHide] = useState(false)

  const [showadd, setShowadd] = useState(true)
  const [hideedit, setHideedit] = useState(false)

  const [stateChange, setStateChange] = useState(false)
  const [defaultState, setDefaultState] = useState(true)
  const [searchKey, setSearchKey] = useState('')

  const [classData, setClassData] = useState([])
  const [payrollData, setPayrollData] = useState([])
  const [subjectData, setSubjectData] = useState([])
  const [teacherData, setTeacherData] = useState([])
  const [classRoutineData, setClassRoutineData] = useState([])
  const [payrollId, setPayrollId] = useState([])
  const [breakType, setBreakType] = useState('')
  const [classNo, setClassNo] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [tabclick, setTabclick] = useState('tab3')

  const [payrollDataByIdAllowance, setPayrollDataByIdAllowance] = useState([])
  const [payrollDataByIdDeduction, setPayrollDataByIdDeduction] = useState([])
  const [payrollDataByIdPaySlip, setPayrollDataByIdPaySlip] = useState()
  const [payrollDataByIdStaffName, setPayrollDataByIdStaffName] = useState()
  const [payrollDataByIdAddress, setPayrollDataByIdAddress] = useState()
  const [payrollDataByIdBankAccount, setPayrollDataByIdBankAccount] = useState()
  const [payrollDataByIdStatus, setPayrollDataByIdStatus] = useState()
  const [payrollDataByIdAllwPaidLev, setPayrollDataByIdAllwPaidLev] = useState()
  const [payrollDataByIdUnPaidLev, setPayrollDataByIdUnPaidLev] = useState()
  const [payrollDataByIdPaidLev, setPayrollDataByIdPaidLev] = useState()
  const [payrollDataByIdTakenLeave, setPayrollDataByIdTakenLeave] = useState()
  const [payrollDataByIdLevDeduction, setPayrollDataByIdLevDeduction] = useState()
  const [payrollDataByIdTotalDaysSalary, setPayrollDataByIdTotalDaysSalary] = useState()
  const [payrollDataByIdBasicSalary, setPayrollDataByIdBasicSalary] = useState()
  const [payrollDataByIdTotalAllowance, setPayrollDataByIdTotalAllowance] = useState()
  const [payrollDataByIdTotalDeduction, setPayrollDataByIdTotalDeduction] = useState()
  const [payrollDataByIdNetSalary, setPayrollDataByIdNetSalary] = useState()
  const [payrollDataByIdSchoolName, setPayrollDataByIdSchoolName] = useState()
  const [payrollDataByIdSchoolAddress, setPayrollDataByIdSchoolAddress] = useState()
  const [payrollDataByIdSchoolImage, setPayrollDataByIdSchoolImage] = useState()

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const pdfRef = useRef();

  useEffect(() => {
    MyPayrollGetAllApi()
  }, [])

  const handleDownloadPDF = async () => {
    const element = pdfRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    // Calculate width and height for proper fit
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`Payslip_${payrollDataByIdStaffName || "Employee"}.pdf`);
  };




  const handleCheckboxChange = (id) => {
    setPayrollId((prev) => {
      if (prev.includes(id)) {
        // If ID already exists → remove it
        return prev.filter((item) => item !== id);
      } else {
        // If ID doesn’t exist → add it
        return [...prev, id];
      }
    });
  };

  // Post Api 
  const MyPayrollPostAllApi = async () => {
    setLoader(true)
    try {
      const response = await PayrollPostApi();
      if (response?.status === 200) {
        toast.success(response?.data?.message)
        setLoader(false)
        MyPayrollGetAllApi()
      } else {
        toast.error(response?.data?.classes?.message);
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
    }
  }

  // Post paid unPaid Api 
  const MyPayrollPostPaidUnPaidApi = async () => {
    const paidUnPaid = {
      payrollIds: payrollId
    }
    setLoader(true)
    try {
      const response = await PayrollPaidUnPaidPostApi(paidUnPaid);
      if (response?.status === 200) {
        toast.success(response?.data?.message)
        setLoader(false)
        MyPayrollGetAllApi()
        setPayrollId([])
      } else {
        toast.error(response?.data?.classes?.message);
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
    }
  }
  // Get All api 
  const MyPayrollGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await PayrollGetAllApi(month, year, searchKey, pageNo, pageSize);
      console.log('payroll get all api response--', response)
      if (response?.status === 200) {
        setPayrollData(response?.data?.payrolls)
        setLoader(false)
      } else {
      }
    } catch (error) {
      setloaderState(false);
      // console.log(error)
    }
  }
  // Get All by id api  
  const MyPayrollGetAllByIdApi = async (id) => {
    setLoader(true)
    try {
      const response = await PayrollGetAllBtIdApi(id);
      console.log('payroll get by id api response--', response)
      if (response?.status === 200) {
        setPayrollDataByIdAllowance(response?.data?.payroll?.allowances)
        setPayrollDataByIdPaySlip(response?.data?.payroll?.paySlipInvoiceNo)
        setPayrollDataByIdDeduction(response?.data?.payroll?.deductions)
        setPayrollDataByIdStaffName(response?.data?.payroll?.staffName)
        setPayrollDataByIdAddress(response?.data?.payroll?.staffAddress)
        setPayrollDataByIdBankAccount(response?.data?.payroll?.accountNumber)
        setPayrollDataByIdStatus(response?.data?.payroll?.payrollStatus)
        setPayrollDataByIdAllwPaidLev(response?.data?.payroll?.allowedPaidLeaves)
        setPayrollDataByIdUnPaidLev(response?.data?.payroll?.unpaidLeaves)
        setPayrollDataByIdPaidLev(response?.data?.payroll?.paidLeaves)
        setPayrollDataByIdTakenLeave(response?.data?.payroll?.takenLeaves)
        setPayrollDataByIdLevDeduction(response?.data?.payroll?.leaveDeduction)
        setPayrollDataByIdTotalDaysSalary(response?.data?.payroll?.totalWorkingDays)
        setPayrollDataByIdBasicSalary(response?.data?.payroll?.basicPay)
        setPayrollDataByIdTotalAllowance(response?.data?.payroll?.allowanceTotal)
        setPayrollDataByIdTotalDeduction(response?.data?.payroll?.deductionsTotal)
        setPayrollDataByIdNetSalary(response?.data?.payroll?.netSalary)
        setPayrollDataByIdSchoolName(response?.data?.payroll?.schoolName)
        setPayrollDataByIdSchoolAddress(response?.data?.payroll?.staffAddress)
        setPayrollDataByIdSchoolImage(response?.data?.payroll?.schoolPhoto)
        setLoader(false)
      } else {
        // toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      setLoader(false)
    }
  }
  // Delete api
  const MyPayrollDeleteApi = async () => {
    setLoader(true)
    try {
      const response = await PayrollDeleteApi();
      if (response?.status === 200) {
        toast.success(response?.data?.message)
        MyPayrollGetAllApi()
        // setPayrollData(response?.data?.payroll)
        setLoader(false)
      } else {
        // toast.error(response?.data?.classes?.message);
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)

    }
  }

  const handleChange = (e) => {
    const trimmedValue = e.target.value.trimStart();
    setSearchKey(trimmedValue);
  };

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };
  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchKey(value);
    setPageNo(1);
  };

  const handleClear = () => {
    setMonth('')
    setYear('')
    // setPayrollData([])
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
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Human Resource</li>
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Payroll</Link></li>
              </ol>
            </nav>
          </div>
          <div className="d-flex g-1 for-media-query">
            <ActionControls
              showAddButton={false}
              addButtonText=""
              addButtonAction={''}
              showExportPDF={false}
              exportPDFText="Export PDF"
              exportPDFAction={''}
              exportPDFFileName="Daily Payroll.pdf"
              showExportCSV={false}
              exportCSVFileName="Daily Payroll.xlsx"
              showSearch={true}
              searchValue={searchKey}
              searchAction={''}
              onSearchChange={handleSearchChange}
            />
            <div >
              <Link style={{ height: '38px', padding: '10px' }} type="button" className="btn btn-success heading-16 my-own-button me-1 " onClick={() => MyPayrollPostAllApi()}>Create PaySlip</Link>
            </div>
            <div >
              <Link style={{ height: '38px', padding: '10px', backgroundColor: 'red', color: '#fff', border: '1px solid red' }} type="button" className="btn btn-success heading-16 my-own-button me-3 " onClick={() => MyPayrollDeleteApi()}>Delete PaySlip</Link>
            </div>
            <div >
              <Link style={{ height: '38px', padding: '10px', backgroundColor: '#008479', color: '#fff', border: '1px solid #008479' }} type="button" className="btn btn-success heading-16 my-own-button me-3 " onClick={() => MyPayrollPostPaidUnPaidApi()}>Submit</Link>
            </div>
          </div>
        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16 heading-responsive' style={{ marginTop: '-22px' }}>Payroll Details</h5>

        <div className="main-content-conatainer pt-1">
          {/* ###### copy content till here for all component ######  */}
          <div className="row p-3">
            <div className="col-lg-6 col-md-6 col-sm-12  ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Month</label>
                <select class="form-select  form-select-sm" value={month} onChange={(e) => setMonth(e.target.value)} aria-label="Default select example">
                  <option >--Choose--</option>
                  <option value='01'>January</option>
                  <option value='02'>February</option>
                  <option value='03'>March</option>
                  <option value='04'>April</option>
                  <option value='05'>May</option>
                  <option value='06'>June</option>
                  <option value='07'>July</option>
                  <option value='08'>August</option>
                  <option value='09'>September</option>
                  <option value='10'>October</option>
                  <option value='11'>November</option>
                  <option value='12'>December</option>
                </select>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Year</label>
                <select class="form-select  form-select-sm" value={year} onChange={(e) => setYear(e.target.value)} aria-label="Default select example">
                  <option >--Choose--</option>
                  <option value='2024'>2024</option>
                  <option value='2025'>2025</option>
                  <option value='2026'>2026</option>
                  <option value='2027'>2027</option>
                  <option value='2028'>2028</option>
                  <option value='2029'>2029</option>
                  <option value='2030'>2030</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row mb-3 buttons-topss">
            <div className='my-button11 heading-16'>
              <button type="button" class="btn btn-outline-success" onClick={MyPayrollGetAllApi} style={{ backgroundColor: '#008479', color: "#fff" }} disabled={!(month || year) ? true : false}>Search</button>
              <button type="button" class="btn btn-outline-success" onClick={() => handleClear()} disabled={!(month || year) ? true : false}>Cancel</button>
            </div>
          </div>
          {/* table  */}
          <div className="table-container px-3 table-responsive">
            <table className="table table-sm ">
              <thead className=''>
                <tr className='heading-16 text-color-000 ' style={{ fontWeight: '500', whiteSpace: 'nowrap', gap: '5px' }}>
                  <th className='table-row-bg-color greyText'></th>
                  <th className='table-row-bg-color greyText'>#</th>
                  <th className='table-row-bg-color greyText'>Name</th>
                  <th className='table-row-bg-color greyText'>Status</th>
                  <th className='table-row-bg-color greyText'>Basic Salary</th>
                  <th className='table-row-bg-color greyText'>Allowed Paid Leaves</th>
                  <th className='table-row-bg-color greyText'>Un Paid Leaves</th>
                  <th className='table-row-bg-color greyText'>Paid Leaves</th>
                  <th className='table-row-bg-color greyText'>Taken Leaves</th>
                  <th className='table-row-bg-color greyText'>Leave Deduction</th>
                  <th className='table-row-bg-color greyText'>Allowances</th>
                  <th className='table-row-bg-color greyText'>Deductions</th>
                  <th className='table-row-bg-color greyText'>Total Days Salary</th>
                  <th className='table-row-bg-color greyText'>Net Salary</th>
                  <th className='table-row-bg-color greyText'>Generate Invoice</th>
                </tr>
              </thead>
              <tbody className='heading-14 align-middle greyTextColor'>
                {
                  payrollData && payrollData?.length > 0 ? (
                    payrollData?.map((item, index) => (
                      <tr className='heading-14' >
                        <td className=' greyText'>
                          <div class="form-check">
                            {/* <input class="form-check-input" type="checkbox" value="" id="checkDefault" onChange={() => setPayrollId(item.id) }/> */}
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`check-${item.id}`}
                              checked={payrollId.includes(item.id)}
                              onChange={() => handleCheckboxChange(item.id)}
                            />
                          </div>
                        </td>
                        <td className=' greyText'>{index + 1 + (currentPage - 1) * pageSize}</td>
                        <td className=' greyText staff-image-adjust d-flex'><span><img src={item.staffImage} /></span><span className='mt-1'>{item.staffName}</span></td>
                        <td className=' greyText'>
                          <div className=''>
                            <p className={`${item.payrollStatus === "PAID" ? 'font-background' : 'font-background22'}`}>{item.payrollStatus === "PAID" ? 'Paid' : 'Unpaid'}</p>
                          </div>
                        </td>
                        <td className=' greyText'>{item.basicPay}</td>
                        <td className=' greyText'>{item.allowedPaidLeaves}</td>
                        <td className=' greyText'>{item.unpaidLeaves}</td>
                        <td className=' greyText'>{item.paidLeaves}</td>
                        <td className=' greyText'>{item.takenLeaves}</td>
                        <td className=' greyText'>{item.leaveDeduction}</td>
                        <td className=' greyText'>{item.allowanceTotal}</td>
                        <td className=' greyText'>{item.deductionsTotal}</td>
                        <td className=' greyText'>{item.totalWorkingDays}</td>
                        <td className=' greyText'>{item.netSalary}</td>
                        <td className=' greyText'>
                          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal123" style={{ backgroundColor: '#008479', border: '1px solid #008479', padding: '2px 4px', fontSize: '14px' }} onClick={() => MyPayrollGetAllByIdApi(item.id)}>
                            Download
                          </button>
                        </td>

                      </tr>
                    ))
                  )
                    :
                    (
                      <tr>
                        <td colSpan="12" className="text-center">
                          <div className="d-flex justify-content-center align-items-center m-5 ">
                            <div className="text-center">
                              <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" />
                              <h2><b>No Data Found</b></h2>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                }
              </tbody>
            </table>
          </div>
          <div className="d-flex p-2" style={{ marginBottom: "10px" }}>
            <p className="font14">
              Showing {currentPage} of {totalPages} Pages
            </p>
            <div className="ms-auto">
              <ReactPaginate
                previousLabel={
                  <Icon
                    icon="tabler:chevrons-left"
                    width="1.4em"
                    height="1.4em"
                  />
                }
                nextLabel={
                  <Icon
                    icon="tabler:chevrons-right"
                    width="1.4em"
                    height="1.4em"
                  />
                }
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={10}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>

        {/* Modal  */}
        <div
          className="modal fade"
          id="exampleModal123"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "1000px" }}>
            <div className="modal-content" ref={pdfRef}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: "#008479" }}>
                  Payslip Details
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="conatiner-fluid p-3">
                <div className="row myBorder">
                  <div className="col-lg-8 p-3 pb-0">
                    <div className='d-flex'>
                      <div>
                        <img src={payrollDataByIdSchoolImage ? payrollDataByIdSchoolImage : SchoolLogoGetApi} alt="" />
                      </div>
                      <div className='p-2 mt-1 '>
                        <h2 className='contentWithLogo22'>{payrollDataByIdSchoolName ? payrollDataByIdSchoolName : 'School Name'}</h2>
                        <p className='pt-1 contentWithLogo'>{payrollDataByIdSchoolAddress ? payrollDataByIdSchoolAddress : 'School Address'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 p-3 pb-0">
                    <div className="d-flex justify-content-end mt-3">
                      <button
                        className="btn"
                        style={{ backgroundColor: "#F16145", color: "#fff" }}
                        onClick={handleDownloadPDF}
                      >
                        <img style={{ width: "15px" }} src={DownloadArrow} alt="" /> &nbsp;
                        Download
                      </button>
                    </div>
                  </div>
                 
                </div>
                <hr className='mx-1' style={{ color: '#aaa', }} />
                <div className="row m-1 pt-0">
                  <div className="col-lg-6 p-3 pt-0">
                    <div className="row  pb-0">
                      <div className="col-lg-6 p-3 pt-0 pb-0">
                        <div className='pt-1 d-flex justify-content-between font14'>
                          <p style={{ color: '#8F8F8F' }}>Payslip No</p>
                          <p>:</p>
                        </div>
                      </div>
                      <div className="col-lg-6 p-3 pt-0 pb-0">
                        <div className='pt-1 fs-2'>
                          <h2>{payrollDataByIdPaySlip}</h2>
                        </div>
                      </div>
                    </div>
                    <div className="row  pb-0">
                      <div className="col-lg-6 p-3 pt-0 pb-0">
                        <div className='pt-1 d-flex justify-content-between font14'>
                          <p style={{ color: '#8F8F8F' }}>Employee Name</p>
                          <p>:</p>
                        </div>
                      </div>
                      <div className="col-lg-6 p-3 pt-0 pb-0">
                        <div className='pt-1 fs-2'>
                          <h2><b>{payrollDataByIdStaffName}</b></h2>
                        </div>
                      </div>
                    </div>
                    <div className="row pt-0 pb-0">
                      <div className="col-lg-6 p-3 pt-0 pb-0">
                        <div className='pt-1 d-flex justify-content-between font14'>
                          <p style={{ color: '#8F8F8F' }}>Address</p>
                          <p>:</p>
                        </div>
                      </div>
                      <div className="col-lg-6 p-3 pt-0 pb-0">
                        <div className='pt-1 font14' style={{ color: '#2C2C2C' }} >
                          <p>{payrollDataByIdAddress}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row  pb-0">
                      <div className="col-lg-6 p-3 pt-0 pb-0">
                        <div className='pt-1 d-flex justify-content-between font14'>
                          <p style={{ color: '#8F8F8F' }}>Bank Account</p>
                          <p>:</p>
                        </div>
                      </div>
                      <div className="col-lg-6 p-3 pt-0 pb-0 ">
                        <div className='pt-1 font14'>
                          <p>{payrollDataByIdBankAccount}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row  pb-0">
                      <div className="col-lg-6 p-3 pt-0 pb-0">
                        <div className='pt-1 d-flex justify-content-between font14'>
                          <p style={{ color: '#8F8F8F' }}>Status</p>
                          <p>:</p>
                        </div>
                      </div>
                      <div className="col-lg-6 p-3 pt-0 pb-0 ">
                        <div className='pt-1 font14'>
                          <p className='paid'>{payrollDataByIdStatus}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6  dataTable ">
                    <div className="row  p-2 " id='' style={{ backgroundColor: '#D7E7E5' }}>
                      <div className="col-lg-4 font14 ">Allowed Paid Leave</div>
                      <div className="col-lg-4 font14 ">Un Paid Leave</div>
                      <div className="col-lg-4 font14 ">Paid Leave</div>
                    </div>
                    <div className="row mt-2 p-1 " id=''>
                      <div className="col-lg-4 font14 ">{payrollDataByIdAllwPaidLev}</div>
                      <div className="col-lg-4 font14 ">{payrollDataByIdUnPaidLev}</div>
                      <div className="col-lg-4 font14 ">{payrollDataByIdPaidLev}</div>
                    </div>
                    <div className="row mt-2 p-2 " style={{ backgroundColor: '#D7E7E5' }}>
                      <div className="col-lg-4 font14 ">Taken Leave</div>
                      <div className="col-lg-4 font14 ">Leave Deduction</div>
                      <div className="col-lg-4 font14 ">Total Days Salary</div>
                    </div>
                    <div className="row mt-2 p-1 " id=''>
                      <div className="col-lg-4 font14 ">{payrollDataByIdTakenLeave}</div>
                      <div className="col-lg-4 font14 ">{payrollDataByIdLevDeduction}</div>
                      <div className="col-lg-4 font14 ">{payrollDataByIdTotalDaysSalary}</div>
                    </div>
                  </div>
                </div>
                <div className="row m-1">
                  <div className="col-lg-6 ps-0">
                    <div className='my-2' style={{ fontSize: '22px' }}>
                      <p ><b>Allowance Summery</b></p>
                    </div>
                    <div>
                      <div className="table-container  table-responsive">
                        <table className="table table-sm " style={{ border: '1px solid #F2F3F6' }}>
                          <thead className=''>
                            <tr className='heading-16 text-color-000 ' >
                              <th className='' style={{ backgroundColor: '#E1EDEC' }}>#</th>
                              <th className='' style={{ backgroundColor: '#E1EDEC' }}>Allowance Details</th>
                              <th className='' style={{ backgroundColor: '#E1EDEC' }}>Amount</th>
                            </tr>
                          </thead>
                          <tbody className='heading-14 align-middle greyTextColor'>
                            {
                              payrollDataByIdAllowance && payrollDataByIdAllowance.length > 0 ? (
                                payrollDataByIdAllowance?.map((item, index) => (
                                  <tr className='heading-14' >
                                    <td className=' greyText'>{index + 1}</td>
                                    <td className=' greyText'>{item?.allowanceName}</td>
                                    <td className=' greyText'>{item?.allowanceAmount}</td>
                                  </tr>
                                ))
                              )
                                :
                                (
                                  <tr>
                                    <td colSpan="6" className="text-center">
                                      <div className="d-flex justify-content-center align-items-center m-5 ">
                                        <div className="text-center" style={{ height: 'auto' }}>
                                          <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" />
                                          <h2><b>No Data Found</b></h2>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 ps-0 pe-0">
                    <div className='my-2' style={{ fontSize: '22px' }}>
                      <p ><b>Deduction Summery</b></p>
                    </div>
                    <div>
                      <div className="table-container  table-responsive">
                        <table className="table table-sm " style={{ border: '1px solid #F2F3F6' }}>
                          <thead className=''>
                            <tr className='heading-16 text-color-000 ' >
                              <th className='' style={{ backgroundColor: '#E1EDEC' }}>#</th>
                              <th className='' style={{ backgroundColor: '#E1EDEC' }}>Deduction Details</th>
                              <th className='' style={{ backgroundColor: '#E1EDEC' }}>Amount</th>
                            </tr>
                          </thead>
                          <tbody className='heading-14 align-middle greyTextColor'>
                            {
                              payrollDataByIdDeduction && payrollDataByIdDeduction.length > 0 ? (
                                payrollDataByIdDeduction?.map((item, index) => (
                                  <tr className='heading-14' >
                                    <td className=' greyText'>{index + 1}</td>
                                    <td className=' greyText'>{item?.deductionName}</td>
                                    <td className=' greyText'>{item?.deductionAmount}</td>
                                  </tr>
                                ))
                              )
                                :
                                (
                                  <tr>
                                    <td colSpan="6" className="text-center">
                                      <div className="d-flex justify-content-center align-items-center m-5 ">
                                        <div className="text-center">
                                          <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" />
                                          <h2><b>No Data Found</b></h2>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row m-1">
                  <div className=" ps-0 pe-0">
                    <div className='my-2' style={{ fontSize: '22px' }}>
                      <p ><b>Payslip Summery </b></p>
                    </div>
                    <div>
                      <div className="table-container  table-responsive">
                        <table className="table table-sm " style={{ border: '1px solid #F2F3F6' }}>
                          <thead className=''>
                            <tr className='heading-16 text-color-000 ' >
                              <th className='' style={{ backgroundColor: '#E1EDEC' }}>#</th>
                              <th className='' style={{ backgroundColor: '#E1EDEC' }}>Payslip Details</th>
                              <th className='' style={{ backgroundColor: '#E1EDEC' }}>Amount</th>
                            </tr>
                          </thead>
                          <tbody className='heading-14 align-middle greyTextColor'>
                            <tr className='heading-14' >
                              <td className=' greyText'>1</td>
                              <td className=' greyText'>Basic Salary</td>
                              <td className=' greyText'>{payrollDataByIdBasicSalary}</td>
                            </tr>
                            <tr className='heading-14' >
                              <td className=' greyText'>2</td>
                              <td className=' greyText'>Total Allowances</td>
                              <td className=' greyText'>{payrollDataByIdTotalAllowance}</td>
                            </tr>
                            <tr className='heading-14' >
                              <td className=' greyText'>3</td>
                              <td className=' greyText'>Total Deductions </td>
                              <td className=' greyText'>{payrollDataByIdTotalDeduction}</td>
                            </tr>
                            <tr className='heading-14' >
                              <td className=' greyText'></td>
                              <td className='  bold' style={{ fontWeight: '400', fontSize: '16px' }}>Net Salary </td>
                              <td className=' '>{payrollDataByIdNetSalary}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Payroll
