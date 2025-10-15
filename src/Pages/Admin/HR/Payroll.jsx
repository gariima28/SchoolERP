import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { ClassGetApi } from '../../../Utils/Apis'
import HashLoader from 'src/Pages/HashLoaderCom';
import { PayrollPostApi } from '../../../Utils/Apis'
import { PayrollGetAllApi } from '../../../Utils/Apis'
import { PayrollDeleteApi } from '../../../Utils/Apis'
import { PayrollPaidUnPaidPostApi } from '../../../Utils/Apis'
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react/dist/iconify.js';
import ActionControls from '../../../Layouts/ActionControls';

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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    MyPayrollGetAllApi()
  }, [])

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
      console.log('payroll post api response', response);
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
      if (response?.status === 200) {
        setPayrollData(response?.data?.payrolls)
        setLoader(false)
      } else {
        // toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      setloaderState(false);
      // console.log(error)
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
    setPayrollData([])
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
              exportPDFFileName="Daily Attendance.pdf"
              showExportCSV={false}
              exportCSVFileName="Daily Attendance.xlsx"
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
              <button type="button" class="btn btn-outline-success" onClick={MyPayrollGetAllApi} style={{ backgroundColor: '#008479', color: "#fff" }}>Search</button>
              <button type="button" class="btn btn-outline-success" onClick={() => handleClear()}>Cancel</button>
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
                        <td className=' greyText staff-image-adjust d-flex'><span><img src={item.staffImage} alt="Staff Image" /></span><span className='mt-1'>{item.staffName}</span></td>
                        <td className=' greyText'>
                          <div className=''>
                            <p className={`${item.payrollStatus === "PAID" ? 'font-background' : 'font-background22'}`}>{item.payrollStatus === "PAID" ? 'Paid' : 'Unpaid'}</p>
                          </div>
                        </td>
                        <td className=' greyText'>{item.basicPay}</td>
                        <td className=' greyText'>{item.allowedPaidLeaves}</td>
                        <td className=' greyText'>{item.unpaidLeaves}</td>
                        <td className=' greyText'>{item.paidLeaves ? paidLeaves : 'N-I-R'}</td>
                        <td className=' greyText'>{item.takenLeaves}</td>
                        <td className=' greyText'>{item.leaveDeduction}</td>
                        <td className=' greyText'>{item.allowanceTotal}</td>
                        <td className=' greyText'>{item.deductionsTotal}</td>
                        <td className=' greyText'>{item.totalWorkingDays}</td>
                        <td className=' greyText'>{item.netSalary}</td>
                        <td className=' greyText'>{item.generateInove ? generateInove : 'N-I-R'}</td>

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

      </div>
    </Container>
  )
}

export default Payroll
