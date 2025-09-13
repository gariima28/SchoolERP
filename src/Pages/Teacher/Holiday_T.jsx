import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { TeacherHolidayPostApi } from 'src/Utils/Apis'
import { TeacherHolidayGetAllApi } from 'src/Utils/Apis'
import { TeacherHolidayDeleteApi } from 'src/Utils/Apis'
import { TeacherHolidayCSV } from 'src/Utils/Apis'
import { TeacherHolidayPDF } from 'src/Utils/Apis'
import { TeacherHolidayGetByIdApi } from 'src/Utils/Apis'
import { TeacherHolidayPutApi } from 'src/Utils/Apis'
import HashLoaderCom from 'src/Pages/HashLoaderCom';
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
    border-radius: 5px;

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
.label-color::placeholder{
  color: #bbbec1 ;
}
.label-color{
    color: #bbbec1 ;
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
  width: 150px;
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
    border-radius: 8px;
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
  .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #B50000;
    border-radius: 0%;
  }
  .my-button112233{
        background-color: #008479 !important;
        color: #fff  !important;
        border-radius: 0;
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
.my-i-button{
  border: none;
  background: none;
}
.no-wrap {
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* ############# offcanvas ############## */

/* ########## media query ###########  */
 @media only screen and (max-width: 735px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
 @media only screen and (max-width: 1155px) {
  .for-dislay-direction{
    display: none;
    flex-direction: column;
    margin-bottom: 18px;
    margin-left: 18px;
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


@media only screen and (max-width: 1060px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
@media only screen and (max-width: 1040px) {
    .for-media-query{
   display: flex;
   flex-direction: column;
  }
  .mrgn-btm{
    margin-bottom: 10px;
  }
}
@media only screen and (max-width: 925px) {
    .for-media-query-22{
    display: none;
  }
  .heading-responsive{
    margin-top: 10px !important;
  }
  .addbtn-response{
    display: block !important;

  }

}
@media only screen and (max-width: 605px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
`;
// ## style css area end ####  

const Holiday = () => {

  const [loader, setLoader] = useState(false)
  const [forDelete, setForDelete] = useState(false)
  const [show, setShow] = useState(true)
  const [hide, setHide] = useState(false)
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [holidayIdForDelete, setHolidayIdForDelete] = useState()
  const [holidayIdForUpdate, setHolidayIdForUpdate] = useState()
  const [editshow, setEditshow] = useState(true)
  const [edithide, setEdithide] = useState(false)
  const [holidayName, setHolidayName] = useState()
  const [holidayDate, setHolidayDate] = useState()
  const [holidayDescription, setHolidayDescription] = useState()
  const [holidayGetAllData, setHolidayGetAllData] = useState([])
  const [searchKey, setsearchKey] = useState('')
  const [isValidNameRequired, setIsValidNameRequired] = useState(false);
  const [isValidDateRequired, setIsValidDateRequired] = useState(false);
  const [isValidDescriptionRequired, setIsValidDescriptionRequired] = useState(false);
  const token = localStorage.getItem;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [PDFResponse, setPDFResponse] = useState()

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };
  useEffect(() => {
    MyHolidayGetAllApi();
    Download_Slip();
  }, [pageNo])

  const [csvData, setCsvData] = useState([]);

  const Download_Slip = async () => {
    try {
      const response = await TeacherHolidayCSV();
      if (response?.status === 200) {
        const rows = response?.data?.split('\n').map(row => row.split(','));
        setCsvData(rows);
      }
    } catch (err) {
      // console.log(err);
    }
  };
  // PDF 
  const base64ToBlob = (base64Data, contentType) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  useEffect(() => {
    DownloadPDF();
  }, [token])

  // PDF Download Response
  const DownloadPDF = async () => {
    try {
      const response = await TeacherHolidayPDF();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setPDFResponse(response?.data);
        }
      }
    } catch (err) {
      // console.log(err);
    }
  };
  // Handle PDF Download in Device
  const handleDownloadPdf = () => {
    const { pdf } = PDFResponse;
    const blob = base64ToBlob(pdf, 'application/pdf');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'driver.pdf';
    link.click();
  };
  // PDF 
  const [errors, setErrors] = useState({});
  // ###### validation ##########

  const FuncValidation = () => {
    let isVlaid = true
    // name 
    if (!holidayName || holidayName === "" || !/^[A-Za-z\s]+$/.test(holidayName)) {
      setIsValidNameRequired(true)
      isVlaid = false;
      setLoader(false)
    }
    else {
    }
    // date
    if (!holidayDate || holidayDate === "" || !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(holidayDate)) {
      setIsValidDateRequired(true)
      isVlaid = false;
      setLoader(false)
    }
    else {
    }
    // description
    if (!holidayDescription || holidayDescription === "" || ! /^[A-Za-z\s]+$/.test(holidayDescription)) {
      setIsValidDescriptionRequired(true)
      isVlaid = false;
      setLoader(false)
    }
    else {
    }
    return isVlaid;
  }
  // name 
  const handleName = (e2) => {
    setHolidayName(e2);
    const nameRegex = /^[A-Za-z\s]+$/;
    setIsValidNameRequired(nameRegex.test(e2));

    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidNameRequired(true)
    } else {
      setIsValidNameRequired(false)
    }
  }
  // date 
  const handleDate = (e2) => {
    setHolidayDate(e2);
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    setIsValidDateRequired(dateRegex.test(e2));

    if (e2 === "" || !dateRegex.test(e2)) {
      setIsValidDateRequired(true)
    } else {
      setIsValidDateRequired(false)
    }
  }
  const handleDescription = (e2) => {
    setHolidayDescription(e2);
    const dateRegex = /^[A-Za-z\s]+$/;
    setIsValidDescriptionRequired(dateRegex.test(e2));
    if (e2 === "" || !dateRegex.test(e2)) {
      setIsValidDescriptionRequired(true)
    } else {
      setIsValidDescriptionRequired(false)
    }
  }

  // ###### validation  end##########
  const offcanvasRef = useRef(null);
  const offcanvasRef22 = useRef(null);
  const offcanvasRef33 = useRef(null);

  // Holiday Post Api 
  const MyHolidayPostApi = async () => {
    if (FuncValidation()) {
      const formData = new FormData()
      formData.append('holidayTitle', holidayName);
      formData.append('holidayDescription', holidayDescription);
      formData.append('holidayDate', holidayDate);
      try {
        const response = await TeacherHolidayPostApi(formData);
        if (response?.status === 200) {
          if (response?.data?.status === "success") {
            toast.success(response?.data?.message);
            MyHolidayGetAllApi()
            setShow(false)
            setHide(true)
            setHolidayName('')
            setHolidayDate('')
            setHolidayDescription('')
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
            offcanvasInstance.hide();
            setShow(false)
            setTimeout(() => {
              setShow(true)
            }, 0.5)
          } else {
            toast.error(response?.data?.message);
            setLoader(false)
            setShow(true)
          }
        } else {
          setLoader(false)
          toast.error(response?.data?.message);
        }
      } catch (error) {
        setloaderState(false);
        setLoader(false)
        // console.log(error)
      }
    }

  }

  // Holiday Get All Api   
  const MyHolidayGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await TeacherHolidayGetAllApi(searchKey, pageNo, pageSize);
      console.log('my holiday data', response)
      if (response?.status === 200) {
        setHolidayGetAllData(response?.data?.holidays)
        setCurrentPage(response?.data?.currentPage);
        setTotalPages(response?.data?.totalPages);
        setLoader(false)

      } else {
        toast.error(response?.data?.classes?.msg);
        setLoader(false)
      }
    } catch (error) {
      setloaderState(false);
      setLoader(false)
      // console.log(error)
    }
  }

  // Delete api
  const MyHolidayDeleteApi = async (id) => {
    try {
      const response = await TeacherHolidayDeleteApi(id);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        MyHolidayGetAllApi()
        setShowdelete(false)
        setHidedelete(true)

        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef33.current);
        offcanvasInstance.hide();
        setShow(false)
        setTimeout(() => {
          setShowdelete(true)
          setForDelete(false)
          setShow(true)
        }, 0.5)
      } else {
        toast.error(response?.data?.message);
        setShowdelete(true)
        setLoader(false)
      }
    } catch (error) {
      setloaderState(false);
      setLoader(false)
      // console.log('catch')
    }
  }

  // Get by id 
  const MyHolidayGetByIdApi = async (id) => {
    setHolidayIdForUpdate(id)
    try {
      const response = await TeacherHolidayGetByIdApi(id);
      if (response?.status === 200) {
        // toast.success(response?.data?.msg);
        setHolidayName(response?.data?.Holiday?.holidayTitle)
        setHolidayDate(response?.data?.Holiday?.holidayDate)
        setHolidayDescription(response?.data?.Holiday?.holidayDescription)

      } else {
        toast.error(response?.data?.msg);
        setLoader(false)
      }
    } catch (error) {
      setloaderState(false);
      setLoader(false)
      // console.log(error)
    }
  }

  // Holiday Put api 
  const MyHolidayPutApi = async (id) => {
    if (FuncValidation()) {
      const formData = new FormData()
      formData.append('holidayTitle', holidayName)
      formData.append('holidayDescription', holidayDescription)
      formData.append('holidayDate', holidayDate)
      const response = await TeacherHolidayPutApi(id, formData);
      try {
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setEditshow(false)
          setEdithide(true)
          MyHolidayGetAllApi()
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
          offcanvasInstance.hide();
          setShow(false)
          setTimeout(() => {
            setEditshow(true)
            setShow(true)
          }, 0.5)
        } else {
          toast.error(response?.data?.message);
          setEditshow(true)
          setLoader(false)
        }

      } catch (error) {
        setloaderState(false);
        setLoader(false)
        // console.log(error)
      }
    }
  }

  const handleForDelete = () => {
    MyHolidayDeleteApi(holidayIdForDelete)
  }

  const handleChange = (e) => {
    const trimmedValue = e.target.value.trimStart();
    setsearchKey(trimmedValue);
  };

  const ClearData = () => {
    setHolidayName('')
    setHolidayDate('')
    setHolidayDescription('')
    setIsValidNameRequired(false)
    setIsValidDateRequired(false)
    setIsValidDescriptionRequired(false)
  }
   const [tooltip, setTooltip] = useState({
        show: false,
        content: '',
        position: { x: 0, y: 0 }
      });
  return (
    <Container>
      {
        loader && (
          <HashLoaderCom />
        )
      }
      <div className="container-fluid main-body p-3">

        <div className='d-flex justify-content-between for-dislay-direction'>
          <div className="breadCrum ms-2">
            <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
              <ol className="breadcrumb ms-2">
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Holiday</Link></li>
              </ol>
            </nav>
          </div>
          <div className='d-flex g-1 for-media-query'>
          </div>
        </div>
        <h5 className='ms-3 pt-2 mb-2 margin-minus22 heading-16 heading-responsive' style={{ marginTop: '-22px' }}>Holiday Details</h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}

          <div className="table-container px-3 table-responsive">

            <table className="table table-sm table-striped">
              <thead className=''>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className='no-wrap'>#</th>
                  <th className='no-wrap'>Holiday Name</th>
                  <th className='no-wrap'>start Date</th>
                  <th className='no-wrap'>End Date</th>
                  <th className='no-wrap'>Description</th>
                  <th className='no-wrap'>Actions</th>
                </tr>
              </thead>

              <tbody className='heading-14 align-middle greyTextColor'>
                {
                  holidayGetAllData && holidayGetAllData?.length > 0 ? (
                    holidayGetAllData?.map((item, index) => (
                      <tr className='heading-14' key={index}>
                        <td className=' greyText pe-0 no-wrap'>{index + 1 + (currentPage - 1) * pageSize}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.holidayTitle}</td>
                        {/* <td className=' greyText pe-0 no-wrap'>{item.holidayDate}</td> */}
                        <td className=' greyText pe-0 no-wrap'>{item.startDate}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.endDate}</td>
                        {/* <td className=' greyText pe-0 no-wrap'>{item.description}</td> */}
                              <td
                          className='greyText pe-0 no-wrap position-relative'
                          data-bs-toggle={item.description.length > 17 ? "tooltip" : undefined}
                          data-bs-placement="top"
                          title={item.description.length > 17 ? item.description : undefined}
                        >
                          {item.description?.length > 17 ? (
                            <div className="d-flex align-items-center">
                              <span className="text-truncate" style={{ maxWidth: 'calc(100% - 18px)' }}>
                                {item.description.substring(0, 17)}
                              </span>
                              <span className="info-indicator ms-1">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <circle cx="8" cy="8" r="7" fill="#aaa" stroke="#aaa" strokeWidth="0.5" />
                                  <text x="8" y="11"
                                    fontFamily="Arial, sans-serif"
                                    fontSize="10"
                                    fontWeight="bold"
                                    fill="white"
                                    textAnchor="middle"
                                    dominantBaseline="middle">i</text>
                                </svg>
                              </span>
                            </div>
                          ) : (
                            item.description
                          )}
                        </td>

                        <td className=' greyText  pe-0 no-wrap' >
                          <div className="dropdown my-button-show">
                            <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Action  &nbsp;
                              <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                                <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                              </svg>
                            </button>
                            <ul className="dropdown-menu anchor-color heading-14">
                              <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop101" aria-controls="staticBackdrop" onClick={(e) => MyHolidayGetByIdApi(item.holidayId)}>Edit</Link></li>
                              <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="staticBackdrop" onClick={(e) => setHolidayIdForDelete(item.holidayId)}>Delete</Link></li>
                            </ul>
                          </div>
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
                              <img src="/images/search.svg" alt="" />
                              <h2><b>No Data Found</b></h2>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                }

              </tbody>

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
        {/* ################## Add Off Canvas Area ####################  */}

        {
          show && (
            <>
              <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" ref={offcanvasRef}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Holiday</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >

                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Holiday Name</label>
                      <input type="email" className="form-control form-focus label-color  heading-14" value={holidayName} onChange={(e) => handleName(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Holiday" />
                    </div>
                    <div className='pt-1'>
                      {isValidNameRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Holiday name is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Date</label>
                      <input type="date" className="form-control form-focus  label-color heading-14" value={holidayDate} onChange={(e) => handleDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="14 Jan 2024" />
                    </div>
                    <div className='pt-1'>
                      {isValidDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Date is required
                        </p>
                      )}
                    </div>

                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Description</label>
                      <textarea class="form-control px-4 heading-14 label-color" id="exampleFormControlTextarea1" value={holidayDescription} onChange={(e) => handleDescription(e.target.value)} rows="3" placeholder='Enter Description'></textarea>
                    </div>
                    <div className='pt-1'>
                      {isValidDescriptionRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Description is required
                        </p>
                      )}
                    </div>
                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success my-button112233" onClick={(e) => MyHolidayPostApi()}> Add Holiday </button>
                      <button type="button" className="btn btn-outline-success" data-bs-dismiss="offcanvas" aria-label="Close" onClick={ClearData}>Cancel</button>
                      {/* <Toaster /> */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }

        {/* ################## Add Off Canvas Area end ####################  */}

        {/* ################## Edit Off Canvas Area end ####################  */}
        {
          editshow && (
            <>
              <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop101" aria-labelledby="staticBackdropLabel" ref={offcanvasRef22}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Holiday</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >

                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Holiday Name</label>
                      <input type="email" className="form-control form-focus   heading-14" value={holidayName} onChange={(e) => handleName(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Makara Sankranti" />
                    </div>
                    <div className='pt-1'>
                      {isValidNameRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Holiday name is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Date</label>
                      <input type="date" className="form-control form-focus   heading-14" value={holidayDate} onChange={(e) => handleDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="14 Jan 2024" />
                    </div>
                    <div className='pt-1'>
                      {isValidDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Description</label>
                      <textarea class="form-control heading-14 px-4" id="exampleFormControlTextarea1" rows="3" value={holidayDescription} onChange={(e) => handleDescription(e.target.value)} placeholder='Lorem Ipsum is simply dummy text of theprinting...'></textarea>
                    </div>
                    <div className='pt-1'>
                      {isValidDescriptionRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Description is required
                        </p>
                      )}
                    </div>
                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success my-button112233" onClick={(e) => MyHolidayPutApi(holidayIdForUpdate)}>Update</button>
                      <button type="button" className="btn btn-outline-success" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }

        {/* ################## Edit Off Canvas Area ####################  */}


        {/* ################ offcanvas delete start #############  */}

        {
          showdelete && (
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight22" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef33}>
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="/images/Vector (13).svg" alt="" /></Link>
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
                        <input className="form-check-input my-form-check-input" onClick={() => setForDelete(!forDelete)} type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label agree" for="flexCheckDefault">
                          I Agree to delete the Profile Data
                        </label>
                      </div>

                      <div className="mt-4">
                        <button type="button" className="btn my-btn button00" disabled={forDelete ? false : true} onClick={handleForDelete}>Delete</button>
                        <button type="button" className="btn cancel-btn ms-2" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          )
        }

      </div>
      {/* ################ offcanvas delete end #############  */}
    </Container>
  )
}

export default Holiday
