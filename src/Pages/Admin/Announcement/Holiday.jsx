import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { HolidayPostApi } from '../../../Utils/Apis'
import { HolidayCSV } from '../../../Utils/Apis'
import { HolidayPDF } from '../../../Utils/Apis'
import { HolidayGetAllApi } from '../../../Utils/Apis'
import { HolidayDeleteApi } from '../../../Utils/Apis'
import { HolidayGetByIdApi } from '../../../Utils/Apis'
import { HolidayPutApi } from '../../../Utils/Apis'
import HashLoaderCom from 'src/Pages/HashLoaderCom';
import { CSVLink } from 'react-csv';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react/dist/iconify.js';
// import { Tooltip } from 'bootstrap';
import ActionControls from '../../../Layouts/ActionControls';
import { useForm } from 'react-hook-form';
import { getAllHolidayDataApiByStu } from 'src/Utils/Apis';
import HolidayCalendar from '../../../Layouts/HolidayCalender';

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
    /* background-color: #fff; */
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
.disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
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


@media only screen and (max-width: 800px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
  }

}
@media only screen and (max-width: 1070px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
@media only screen and (max-width: 1150px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
@media only screen and (max-width: 1017px) {
.for-media-query-22{
  display: flex;
  flex-direction: column;
    flex: 0 0 auto !important;
    width: 75% !important;
  }
}
@media only screen and (max-width: 1017px) {
.for-media-query-22{
  display: flex;
  flex-direction: column;
  }
}
@media only screen and (max-width: 735px) {
    .heading-responsive{
        margin-top: 5px !important;
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
  const [holidayGetAllData, setHolidayGetAllData] = useState([])

  const [holidayName, setHolidayName] = useState()
  const [holidayDescription, setHolidayDescription] = useState()
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [holidayStartDate, setHolidayStartDate] = useState()
  const [holidayEndDate, setHolidayEndDate] = useState()

  const [isValidNameRequired, setIsValidNameRequired] = useState(false);
  const [isValidEndDateRequired, setIsValidEndDateRequired] = useState(false);
  const [isValidDescriptionRequired, setIsValidDescriptionRequired] = useState(false);
  const [isValidStartDateRequired, setIsValidStartDateRequired] = useState(false);
  const [loaderState, setLoaderState] = useState(false);

  const [PDFResponse, setPDFResponse] = useState()
  const [holidayData, setHolidayData] = useState([]);
  console.log('my new holiday data', holidayData)
  const token = sessionStorage.getItem;

  const [searchKey, setSearchKey] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [regexForAll, setRegexForAll] = useState(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? \s]+$/);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  useEffect(() => {
    MyHolidayGetAllApi();
    // Download_Slip();
  }, [pageNo])


  const monthMap = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  const parseBackendDate = (dateStr) => {
    if (!dateStr) return null;

    // support "2026-09-14"
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split('-').map(Number);
      return new Date(y, m - 1, d);
    }

    // support "14 Sep 2026"
    const [day, mon, year] = dateStr.split(' ');
    return new Date(Number(year), monthMap[mon], Number(day));
  };

  const formatLocalDateKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const [csvData, setCsvData] = useState([]);


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


  const [calendarView, setCalendarView] = useState(false);
  // const [errors, setErrors] = useState({});

  const [searchByKey, setSearchByKey] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: { searchByKey: '' }
  });
  // ###### validation ##########

  const FuncValidation = () => {
    let isValid = true;

    // name 
    if (!holidayName || holidayName === "" || !regexForAll.test(holidayName)) {
      setIsValidNameRequired(true)
      isValid = false;
      setLoader(false)
    }
    else {
    }
    // Start date
    if (!holidayStartDate || holidayStartDate === "" || !regexForAll.test(holidayStartDate)) {
      setIsValidStartDateRequired(true)
      isValid = false;
      setLoader(false)
    }
    else {
    }
    // End date
    if (!holidayEndDate || holidayEndDate === "" || !regexForAll.test(holidayEndDate)) {
      setIsValidEndDateRequired(true)
      isValid = false;
      setLoader(false)
    }
    else {
    }
    // description
    if (!holidayDescription || holidayDescription === "" || !regexForAll.test(holidayDescription)) {
      setIsValidDescriptionRequired(true)
      isValid = false;
      setLoader(false)
    }
    else {
    }
    return isValid;
  }
  // name 
  const handleName = (e2) => {
    setHolidayName(e2);
    const nameRegex = regexForAll;
    setIsValidNameRequired(nameRegex.test(e2));

    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidNameRequired(true)
    } else {
      setIsValidNameRequired(false)
    }
  }
  // start date 
  const handleSatrtDate = (e2) => {
    setHolidayStartDate(e2);
    const dateRegex = regexForAll;
    setIsValidStartDateRequired(dateRegex.test(e2));

    if (e2 === "" || !dateRegex.test(e2)) {
      setIsValidStartDateRequired(true)
    } else {
      setIsValidStartDateRequired(false)
    }
  }

  // end date 
  const handleEndDate = (e2) => {
    setHolidayEndDate(e2);
    const dateRegex = regexForAll;
    setIsValidEndDateRequired(dateRegex.test(e2));

    if (e2 === "" || !dateRegex.test(e2)) {
      setIsValidEndDateRequired(true)
    } else {
      setIsValidEndDateRequired(false)
    }
  }
  // description 
  const handleDescription = (e2) => {
    setHolidayDescription(e2);
    const dateRegex = regexForAll;
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
      formData.append('startDate', holidayStartDate);
      formData.append('endDate', holidayEndDate);
      setLoader(true)
      try {
        const response = await HolidayPostApi(formData);
        // console.log('holiday-post-api', response)
        if (response?.status === 200) {
          if (response?.data?.status === "success") {
            toast.success(response?.data?.message);
            MyHolidayGetAllApi()
            getAllHolidays()
            setShow(false)
            setHide(true)
            setLoader(false)
            setHolidayName('')
            setHolidayStartDate('')
            setHolidayEndDate('')
            setHolidayDescription('')
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
            offcanvasInstance.hide();
            setShow(false)
            setTimeout(() => {
              setShow(true)
            }, 0.5)
          } else {
            toast.error(response?.data?.message);
            setShow(true)
            setLoader(false)
          }
        } else {
          toast.error(response?.data?.msg);
          setLoader(false)
        }
      } catch (error) {
        // setloaderState(false);
        // console.log(error)
        setLoader(false)
      }
    }

  }
  // Holiday Get All Api   
  const MyHolidayGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await HolidayGetAllApi(searchKey, pageNo, pageSize);
      console.log('my holiday all data', response)
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setHolidayGetAllData(response?.data?.holidays)
        setCurrentPage(response?.data?.currentPage);
        setTotalPages(response?.data?.totalPages);
        setLoader(false)

      } else {
        // toast.error(response?.data?.classes?.msg);
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
    setLoader(true)
    try {
      const response = await HolidayDeleteApi(id);
      // // console.log('my-subs-api',response)
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        MyHolidayGetAllApi()
        setShowdelete(false)
        setHidedelete(true)
        setLoader(false)
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef33.current);
        offcanvasInstance.hide();
        setShow(false)
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
      setloaderState(false);
      // console.log('catch')
      setLoader(false)
    }
  }
  // Get by id 
  const MyHolidayGetByIdApi = async (id) => {
    setHolidayIdForUpdate(id)
    setLoader(true)

    try {
      const response = await HolidayGetByIdApi(id);
      console.log('HOLIDAY data get by id', response)

      if (response?.status === 200) {
        // toast.success(response?.data?.msg);
        setHolidayName(response?.data?.Holiday?.holidayTitle)
        setHolidayStartDate(response?.data?.Holiday?.startDate)
        setHolidayEndDate(response?.data?.Holiday?.endDate)
        setHolidayDescription(response?.data?.Holiday?.holidayDescription)
        setLoader(false)

      } else {
        toast.error(response?.data?.msg);
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      // console.log(error)
    }
  }
  // Holiday Put api 
  const MyHolidayPutApi = async (id) => {
    if (FuncValidation()) {
      setLoader(true)
      try {
        const formData = new FormData()
        formData.append('holidayTitle', holidayName);
        formData.append('holidayDescription', holidayDescription);
        formData.append('startDate', holidayStartDate);
        formData.append('endDate', holidayEndDate);
        const response = await HolidayPutApi(id, formData);
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setEditshow(false)
          setEdithide(true)
          MyHolidayGetAllApi()
          setHolidayName('')
          setHolidayDescription('')
          setHolidayStartDate('')
          setHolidayEndDate('')
          setLoader(false)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
          offcanvasInstance.hide();
          // setShow(false)
          setTimeout(() => {
            setEditshow(true)
          }, 0.5)
        } else {
          toast.error(response?.data?.message);
          setEditshow(true)
          setLoader(false)
        }

      } catch (error) {
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
    setSearchKey(trimmedValue);
  };

  const ClearDataAndClose = () => {
    setIsValidNameRequired(false)
    setIsValidEndDateRequired(false)
    setIsValidDescriptionRequired(false)
    setIsValidStartDateRequired(false)
    setHolidayName('')
    setHolidayDescription('')
    setHolidayStartDate('')
    setHolidayEndDate('')
  }

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchKey(value);
    debouncedSearch(value);
  };

  // Handle Search Button Click
  const handleSearchButton = () => {
    if (searchKey.trim() === '') {
      toast.error('Search key is empty');
      return;
    }
    setPageNo(1);
    MyClassRoutineGetAllApi(searchKey);
  };

  const handleAddOffcanvasOpen = () => {
    const offcanvasElement = document.getElementById('staticBackdrop');
    if (offcanvasElement) {
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.show();
    } else {
      console.error('Offcanvas element with ID addFeeType not found');
      toast.error('Unable to open Add Fee Type form');
    }
  };
  const cleardata = () => {
    setForDelete(false)
  }
  useEffect(() => {
    getAllHolidays();
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));
    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
  }, [pageNo, searchByKey, selectedMonth, selectedYear]);

  const getAllHolidays = async () => {
    try {
      setLoaderState(true);
      const response = await getAllHolidayDataApiByStu(searchByKey, pageNo, pageSize);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setLoaderState(false);
          const validatedData = response?.data?.holidays.filter(item =>
            item.holidayTitle && item.startDate && item.endDate
          );
          if (validatedData.length < response?.data?.holidays.length) {
            toast.error('Some holiday data is incomplete and has been filtered out.');
          }
          setHolidayData(validatedData);
          setCurrentPage(response?.data?.currentPage);
          setTotalPages(response?.data?.totalPages);
        } else {
          setLoaderState(false);
          toast.error(response?.data?.message);
        }
      } else {
        setLoaderState(false);
      }
    } catch (error) {
      setLoaderState(false);
      toast.error('Error fetching holidays');
    }
    finally {
      // setloaderState(false);
      setLoaderState(false);
    }
  };


  // Prepare holiday data for calendar
  const dailyHolidayData = holidayData.flatMap((holiday) => {
    const start = parseBackendDate(holiday.startDate);
    const end = parseBackendDate(holiday.endDate);

    if (!start || !end) return [];

    const dates = [];
    for (
      let d = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      d <= end;
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)
    ) {
      if (d.getMonth() === selectedMonth - 1 && d.getFullYear() === selectedYear) {
        dates.push({
          date: formatLocalDateKey(d),
          status: 'holiday',
          holiday: {
            name: holiday.holidayTitle || holiday.name || '',
            description: holiday.holidayDescription || holiday.description || ''
          }
        });
      }
    }

    return dates;
  });


  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, [holidayData]);
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

          {/* new csv design */}
          <div className="d-flex g-1 for-media-query">
            <ActionControls
              showAddButton={true}
              addButtonText={`Add Holiday`}
              addButtonAction={handleAddOffcanvasOpen}
              showSearch={false}
              searchAction={handleSearchButton}
              showExportPDF={false}
              exportPDFText="Export PDF"
              exportPDFAction={HolidayPDF}
              showExportCSV={false}
              exportCSVText="Export XLSX"
              exportCSVAction={HolidayCSV}
              onSearchChange={handleSearchChange}
            />
          </div>

        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-22px' }}>Holiday Details</h5>

        <div className="main-content-conatainer pt-1 " style={{ backgroundColor: 'none' }}>
          <div className="row p-3 bg-white borderRadius5 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className='font16 mb-0'>Holiday Details</h2>
              <span className='border greyText p-2 borderradius8 cursorPointer' onClick={() => setCalendarView(!calendarView)}>
                {calendarView ? 'List View' : 'Calendar View'}
              </span>
            </div>
            {holidayData.length > 0 ? (
              calendarView ? (
                <HolidayCalendar
                  DailyAttendanceData={dailyHolidayData}
                  month={selectedMonth}
                  year={selectedYear}
                  monthUpdate={setSelectedMonth}
                  yearUpdate={setSelectedYear}
                  smallBox={false}
                />
              ) : (
                <>
                  <div className="overflow-scroll mt-2">
                    <table className="table align-middle table-striped table-bordered">
                      <thead>
                        <tr>
                          <td className='textWrapClass font14'>#</td>
                          <td className='textWrapClass font14'>Holiday Name</td>
                          <td className='textWrapClass font14'>Start Date</td>
                          <td className='textWrapClass font14'>End Date</td>
                          <td className='textWrapClass font14'>Description</td>
                        </tr>
                      </thead>
                      <tbody>
                        {holidayData?.map((item, index) => (
                          <tr key={item.holidayId}>
                            <td className='textWrapClass font14 greyText'>{index + 1}</td>
                            <td className='textWrapClass font14 greyText'>{item.holidayTitle}</td>
                            <td className='textWrapClass font14 greyText'>{item.startDate}</td>
                            <td className='textWrapClass font14 greyText'>{item.endDate}</td>
                            <td className='textWrapClass font14 greyText'>
                              {item.description.length > 60 ? (
                                <>
                                  <span className='me-2'>{item.description.substring(0, 60) + "..."}</span>
                                  <button
                                    className='btn p-0'
                                    type='button'
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title={item.description}
                                  >
                                    <Icon
                                      className=''
                                      icon="ph:info-fill"
                                      width="1.5em"
                                      height="1.5em"
                                      style={{ color: '#C1C1C1' }}
                                    />
                                  </button>
                                </>
                              ) : (
                                <span>{item.description}</span>
                              )}
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
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={10}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                      />
                    </div>
                  </div>
                </>
              )
            ) : (
              <div className="d-flex justify-content-center p-5 m-5">
                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className='img-fluid p-5' />
              </div>
            )}
            <Toaster />
          </div>

        </div>
        {/* ################## Add Off Canvas Area ####################  */}

        {
          show && (
            <>
              <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" ref={offcanvasRef}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" onClick={ClearDataAndClose}>
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
                      <input type="email" className="form-control form-focus label-color  heading-14" value={holidayName} onChange={(e) => handleName(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter holiday" />
                    </div>
                    <div className='pt-1'>
                      {isValidNameRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Holiday name is required
                        </p>
                      )}
                    </div>

                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Start Date</label>
                      <input type="date" className="form-control form-focus  label-color heading-14" value={holidayStartDate} onChange={(e) => handleSatrtDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="14 Jan 2024" />
                    </div>
                    <div className='pt-1'>
                      {isValidStartDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Start Date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">End Date</label>
                      <input type="date" className="form-control form-focus  label-color heading-14" value={holidayEndDate} onChange={(e) => handleEndDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="14 Jan 2024" />
                    </div>
                    <div className='pt-1'>
                      {isValidEndDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          End Date is required
                        </p>
                      )}
                    </div>

                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Description</label>
                      <textarea class="form-control px-2 heading-14 label-color" id="exampleFormControlTextarea1" value={holidayDescription} onChange={(e) => handleDescription(e.target.value)} rows="3" placeholder='Enter Description'></textarea>
                    </div>
                    <div className='pt-1'>
                      {isValidDescriptionRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Description is required
                        </p>
                      )}
                    </div>
                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success my-button112233" onClick={(e) => MyHolidayPostApi()}>Add Holiday</button>
                      <button type="button" className="btn cancelButtons text-black" data-bs-dismiss="offcanvas" aria-label="Close" onClick={ClearDataAndClose}>Cancel</button>
                      <Toaster />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }
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
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Start Date</label>
                      <input type="date" className="form-control form-focus  label-color heading-14" value={holidayStartDate} onChange={(e) => handleSatrtDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="14 Jan 2024" />
                    </div>
                    <div className='pt-1'>
                      {isValidStartDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Start Date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">End Date</label>
                      <input type="date" className="form-control form-focus  label-color heading-14" value={holidayEndDate} onChange={(e) => handleEndDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="14 Jan 2024" />
                    </div>
                    <div className='pt-1'>
                      {isValidEndDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          End Date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Description</label>
                      <textarea class="form-control heading-14 px-2" id="exampleFormControlTextarea1" rows="3" value={holidayDescription} onChange={(e) => handleDescription(e.target.value)} placeholder='Lorem Ipsum is simply dummy text of theprinting...'></textarea>
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
                      <button type="button" className="btn cancelButtons text-black" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      <Toaster />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }
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
                        <input
                          className="form-check-input my-form-check-input2"
                          onChange={() => setForDelete(!forDelete)}
                          type="checkbox"
                          checked={forDelete}
                          value=""
                          id="flexCheckDefault"
                          name="deleteAgreement"
                        />
                        <label className="form-check-label agree" htmlFor="flexCheckDefault">
                          I Agree to delete the Profile Data
                        </label>
                      </div>
                      <div className="mt-4">
                        <button type="button" className="btn my-btn button00" disabled={forDelete ? false : true} onClick={handleForDelete}>Delete</button>
                        <button type="button" className="btn cancel-btn ms-2" data-bs-dismiss="offcanvas" aria-label="Close" onClick={cleardata}>Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </Container>
  )
}
export default Holiday