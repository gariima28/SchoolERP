import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BookManagerPostApi } from '../../../Utils/Apis'
import { BookManagerGetAllApi } from '../../../Utils/Apis'
import { BookManagerDeleteApi } from '../../../Utils/Apis'
import { BookmanGetById } from '../../../Utils/Apis'
import { BookManPutApi } from '../../../Utils/Apis'
import { BookManCSV } from '../../../Utils/Apis'
import { BookManPDF } from '../../../Utils/Apis'
import HashLoader from 'src/Pages/HashLoaderCom';
import { ClassGetApi } from '../../../Utils/Apis'
import { SectionRoomByIdGetApi } from '../../../Utils/Apis'
import { BookBtId } from '../../../Utils/Apis'
import { GettAllBookByIssueBook } from '../../../Utils/Apis'
import { GetAllMemberApi } from '../../../Utils/Apis'
import { BookIssue } from '../../../Utils/Apis'
import { BookIssueGetAllApi } from '../../../Utils/Apis'
import { retunIssueById } from '../../../Utils/Apis'
import { BookIssueReturn } from '../../../Utils/Apis'

// import HashLoader from 'src/Pages/HashLoaderCom';
import { CSVLink } from 'react-csv';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react/dist/iconify.js';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import ActionControls from '../../../Layouts/ActionControls';

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
  width: 140px;
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
.input-custom-bg {
  background-color: #f0f0f0 !important; 
}
.custom-tooltip {
  --bs-tooltip-bg: var(--bd-violet-bg);
  --bs-tooltip-color: var(--bs-white);
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


@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
@media only screen and (max-width: 1233px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
@media only screen and (max-width: 735px) {
    .heading-responsive{
        margin-top: 5px !important;
    }

}
`;

const Issue_Report = () => {
  const [loader, setLoader] = useState(false)
  const [forDelete, setForDelete] = useState(false)

  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)
  const [PDFResponse, setPDFResponse] = useState()
  const [show12, setShow12] = useState(true)
  const [hide12, setHide12] = useState(false)
  const [bookName, setBookName] = useState()
  const [Author, setAuthor] = useState()
  const [NumberBook, setNumberBook] = useState()
  const [NumberAvailableBook, setNumberAvailableBook] = useState()

  const [IdForDelete, setIdForDelete] = useState()
  const [idForUpdate, setIdForUpdate] = useState()
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [BookManagerData, setBookManagerData] = useState([])
  const [bookIssueAllData, setBookIssueAllData] = useState([])

  const [isValidDateRequired, setIsValidDateRequired] = useState(false);
  const [isValidAuthorNameRequired, setIsValidAuthorNameRequired] = useState(false);
  const [isValidNoOfCopyRequired, setIsValidNoOfCopyRequired] = useState(false);


  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [returnDate, setReturnDate] = useState('');


  const token = sessionStorage.getItem;
  // CSV 
  const [csvData, setCsvData] = useState([]);

  const Download_Slip = async () => {
    try {
      const response = await BookManCSV();
      if (response?.status === 200) {
        const rows = response?.data?.split('\n').map(row => row.split(','));
        setCsvData(rows);
        // setTableData(rows.slice(1));
      }
    } catch (err) {
      console.log(err);
    }
  };
  // CSV 
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
      const response = await BookManPDF();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setPDFResponse(response?.data);
        }
      }
    } catch (err) {
      console.log(err);
      setLoader(false)
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
  const [searchKey, setSearchKey] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [searchKey2, setSearchKey2] = useState('')
  const [pageNo2, setPageNo2] = useState('');
  const [pageSize2, setPageSize2] = useState('');

  const [classId, setClassID] = useState()
  const [studentId, setStudentId] = useState()
  // const [sectionId, setSectionID] = useState()

  const [classData, setClassdata] = useState([])
  const [sectionData, setSectionData] = useState([])
  const [allBook, setAllBook] = useState([])
  const [allBookDataById, setAllBookDataById] = useState([])
  const [booById, setBooById] = useState()
  const [bookName1, setBookName1] = useState()
  const [edition, setEdition] = useState()
  const [language, setLanguage] = useState()
  const [price, setPrice] = useState()
  const [rackNumber, setRackNumber] = useState()
  const [shelfNumber, setShelfNumber] = useState()
  const [Author2, setAuthor2] = useState()
  const [quantity, setQuantity] = useState()
  const [mainStatus, setMainStatus] = useState('')
  const [mainReturnDate, setMainReturnDate] = useState()

  const [Class, setClass] = useState('')
  console.log('class idddddd for issue', Class)

  const [classNo, setClassNo] = useState();
  const [sectionId, setSectionId] = useState('')
  console.log('section idddddd for issue ', sectionId)

  const [sectionName, setSectionName] = useState()
  const [AllMember, setAllMember] = useState([]);
  const [studentMembberId, setStudentMembberId] = useState();

  const [Member, setMember] = useState('LIBRARY_MEMBER')

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  useEffect(() => {
    // MyRolPermisGetAllApi()
    Download_Slip()
    UpdatClassGetApi()
    MySectionGetApi()
    MyGetAllBookApi()
    MyGetAllMemberApi()

  }, [pageNo, Class])

  useEffect(() => {
    MyGetBookBtIdApi()

  }, [booById, pageNo])
  useEffect(() => {
    MyBookIssueGetAllApi()
  }, [])

  const [errors, setErrors] = useState({});
  // ###### validation ##########


  const FuncValidation = () => {
    let inValid = true;
    // name 
    if (!returnDate || returnDate === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=\-\s]+$/.test(returnDate)) {
      setIsValidDateRequired(true)
      inValid = false
      setLoader(false)
    }
    else {
    }
    return inValid;
  }

  const handleDate = (e2) => {
    setReturnDate(e2);
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\-\s]+$/;
    setIsValidDateRequired(nameRegex.test(e2));

    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidDateRequired(true)
    } else {
      setIsValidDateRequired(false)
    }
  }

  // ###### validation  end ##########

  const offcanvasRef = useRef(null);
  const offcanvasRef22 = useRef(null);
  const offcanvasRef33 = useRef(null);

  const handle = (e) => {
    const value = e.target.value;
    const [val1, val2] = value.split(',');
    setClass(parseInt(val1))
    const num = val2.trim()
    setClassNo(num)
  }
  const SectionHandle = (e) => {
    console.log('my section iddd01010', e)
    const value = e.target.value;
    const [val1, val2] = value.split(',');
    setSectionId(parseInt(val1))
    const name = val2.trim()
    setSectionName(name)
  }

  // class data api 
  const UpdatClassGetApi = async () => {
    setLoader(true)
    try {
      const response = await ClassGetApi(searchKey2, pageNo2, pageSize2);
      // console.log('class all data ', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.classes?.message)
        setClassdata(response?.data?.classes)
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
  // Section Get All Api from section page for id 
  const MySectionGetApi = async () => {
    setLoader(true)
    try {
      const response = await SectionRoomByIdGetApi(Class);
      // console.log('all section data in issue return  ', response)
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setSectionData(response?.data?.allSections)
        setLoader(false)
      } else {
        // toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  // all book 
  const MyGetAllBookApi = async () => {
    setLoader(true)
    try {
      const response = await GettAllBookByIssueBook();
      // console.log('all book in issue ', response)
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setAllBook(response?.data?.Books)
        setLoader(false)
      } else {
        // toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  // book by id 
  const MyGetBookBtIdApi = async () => {
    setLoader(true)
    try {
      const response = await BookBtId(booById);
      // console.log('book by id all single book data', response)
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setAllBookDataById(response?.data?.Books)
        setEdition(response?.data?.Books?.edition)
        setAuthor2(response?.data?.Books?.authorName)
        setLanguage(response?.data?.Books?.language)
        setPrice(response?.data?.Books?.price)
        setRackNumber(response?.data?.Books?.almirahNo)
        setShelfNumber(response?.data?.Books?.selfNo)
        setQuantity(response?.data?.Books?.noOfCopies)
        setLoader(false)
      } else {
        // toast.error(response?.data?.message);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  // all library member Api
  const MyGetAllMemberApi = async () => {
    setLoader(true)
    try {
      const response = await GetAllMemberApi(classNo, sectionName, Member);
      // console.log('get all member--in issue book page', response)
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setAllMember(response?.data?.Members)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.msg);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  //   const claaApi = () =>{
  //  MyBookIssueGetAllApi()
  //   }
  // post Api of issue book
  const MyIssueBookApi = async () => {
    if (FuncValidation()) {
      const formData = new FormData()
      formData.append('returnDate', returnDate);
      formData.append('classId', Class);
      formData.append('sectionId', sectionId);
      formData.append('studentId', studentMembberId);
      formData.append('bookId', booById);
      setLoader(true)
      try {
        const response = await BookIssue(formData);
        console.log('issue book post api', response)
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          // MyRolPermisGetAllApi()
          MyBookIssueGetAllApi()
          setLoader(false)
          setShow(false)
          // Reset all form fields
          setBooById('')
          setEdition('')
          setLanguage('')
          setRackNumber('')
          setShelfNumber('')
          setAuthor2('')
          setQuantity('')
          setClass('')
          setClassNo('')
          setSectionId('')
          setStudentMembberId('')
          setReturnDate('')
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
          offcanvasInstance.hide();
          setTimeout(() => {
            setShow(true)
          }, 0.5)
          // Reset show state after a delay if needed
          setTimeout(() => {
            setShow(false)
          }, 500)
        } else {
          toast.error(response?.data?.message);
          setLoader(false)
        }
      } catch (error) {
        console.log(error)
        setLoader(false)
      }
    }
  }
  //  Get All Api issue book 
  const MyBookIssueGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await BookIssueGetAllApi(searchKey, pageNo, pageSize, Class, sectionId, startDate, endDate);
      console.log('book issue all data', response)
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setBookIssueAllData(response?.data?.bookTransaction)
        setCurrentPage(response?.data?.currentPage);
        setTotalPages(response?.data?.totalPages);
        setLoader(false)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  // Delete api
  const BookManDeleteApi = async (id) => {
    setLoader(true)
    try {
      const response = await BookManagerDeleteApi(id);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        // MyRolPermisGetAllApi()
        setShowdelete(false)
        setHidedelete(true)
        setLoader(false)
        MyBookIssueGetAllApi()
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
      console.log(error)
      setLoader(false)
    }
  }
  // issue return Get by id 
  const issueRetunrGetApi = async (id) => {
    console.log('issue return get by id', id)
    setIdForUpdate(id)
    setLoader(true)
    try {
      const response = await retunIssueById(id);
      console.log('issue retun get by id data---', response)
      if (response?.status === 200) {
        // toast.success(response?.data?.msg);
        setBooById(response?.data?.transaction?.bookId)
        setBookName1(response?.data?.transaction?.bookName)
        setEdition(response?.data?.transaction?.edition)
        setAuthor2(response?.data?.transaction?.authorName)
        setLanguage(response?.data?.transaction?.language)
        setPrice(response?.data?.transaction?.price)
        setRackNumber(response?.data?.transaction?.almirahNo)
        setShelfNumber(response?.data?.shelfNo)
        setQuantity(response?.data?.transaction?.noOfCopies)
        setClassID(response?.data?.transaction?.classNo)
        setSectionId(response?.data?.transaction?.classSection)
        setStudentId(response?.data?.transaction?.studentName)

        setLoader(false)

      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }
  // Teacher Put api 
  const MyNoticePutApi = async (id) => {
    if (FuncValidation()) {
      setLoader(true)
      try {
        const formData = new FormData()
        formData.append('returnDate', returnDate)
        formData.append('status', mainStatus)

        const response = await BookIssueReturn(id, formData);
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setShow12(false)
          claaApi()
          setLoader(false)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
          offcanvasInstance.hide();
          // setShow(false)
          setTimeout(() => {
            setShow12(true)
          }, 0.5)
        } else {
          toast.error(response?.data?.message);
          setShow12(true)
        }

      } catch (error) {
        console.log(error)
        setLoader(false)
      }
    }
  }

  const handleForDelete = () => {
    BookManDeleteApi(IdForDelete)
  }
  const handleChange = (e) => {
    const trimmedValue = e.target.value.trimStart();
    setSearchKey(trimmedValue);
  };


  const handleDateChange = (dates) => {
    setStartDate(formatDate(dates[0]));
    setEndDate(formatDate(dates[1]));
  };
  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const clearData = () => {
    setBooById('')
    setEdition('')
    setLanguage('')
    setRackNumber('')
    setShelfNumber('')
    setAuthor2('')
    setQuantity('')
    setClass('')
    setClassNo('')
    setSectionId('')
    setStudentMembberId('')
    setReturnDate('')
    setLoader(false)
  }

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchKey(value);
    setPageNo(1);
  };

  // keep a reference so we can hide later
  const tooltipInstances = [...document.querySelectorAll('[data-bs-toggle="tooltip"]')]
    .map(el => new bootstrap.Tooltip(el));

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
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Back Office</li>
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Book Issue Report</Link></li>
              </ol>
            </nav>
          </div>
          {/* new csv design */}
          <div className="d-flex g-1 for-media-query">
            <ActionControls
              showAddButton={false}
              addButtonText=""
              addButtonAction={''}
              showExportPDF={true}
              exportPDFText="Export PDF"
              exportPDFAction={''}
              exportPDFFileName="Daily Attendance.pdf"
              showExportCSV={true}
              exportCSVFileName="Daily Attendance.xlsx"
              showSearch={true}
              searchValue={searchKey}
              searchAction={MyBookIssueGetAllApi}
              onSearchChange={handleSearchChange}
            />
            <div >
              <Link style={{ height: '38px', padding: '10px' }} type="button" className="btn btn-success heading-16 my-own-button me-3" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" onClick={clearData}>+ Issue Book</Link>
            </div>
          </div>

        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16 heading-responsive' style={{ marginTop: '-22px' }}>Book Issue Report Details</h5>

        <div className="main-content-conatainer pt-1 ">

          <div className="row p-4 d-flex justify-content-center">
            <div className="ps-0 col-lg-4 col-md-6 col-sm-12">
              <label htmlFor="date-range-picker" className='ps-1 heading-18'>Date</label>
              <div className="date-picker-container">
                <Flatpickr
                  className="form-control form-control-sm"
                  id="date-range-picker"
                  placeholder='Select date range'
                  value={[startDate, endDate]}
                  options={{
                    mode: 'range',
                    dateFormat: 'Y-n-j',
                  }}
                  onClick={() => handleButtonClick("custom")}
                  onChange={handleDateChange}
                  render={({ defaultValue, ...props }, ref) => (
                    <div className="input-group d-flex mt-2">
                      <input
                        {...props}
                        ref={ref}
                        defaultValue={defaultValue}
                        className="form-control form-control-sm"
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="ps-0 col-lg-4 col-md-6 col-sm-12">

              <div className="mb-1  ">
                <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                <select class="form-select form-select-sm form-focus  label-color" value={`${Class}, ${classNo}`} onChange={handle} aria-label="Default select example">
                  <option selected value="">--Choose--</option>
                  {
                    classData?.map(item => (
                      <option value={`${item.classId}, ${item.classNo}`}>{item.classNo}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="ps-0 col-lg-4 col-md-6 col-sm-12">

              <div className="mb-1  ">
                <label for="exampleFormControlInput1" className="form-label  heading-16">Section</label>
                <select class="form-select  form-select-sm form-focus  label-color" value={`${sectionId}, ${sectionName}`} onChange={(e) => SectionHandle(e)} aria-label="Default select example">
                  <option selected value="">--Choose--</option>
                  {
                    sectionData?.map(item => (
                      <option value={`${item.sectionId}, ${item.sectionName}`}>{item.sectionName}</option>
                    ))
                  }

                </select>
              </div>

            </div>
          </div>
          <div className='my-button11 mb-3'>
            <button type="button" className="btn btn-outline-success my-button112233" onClick={MyBookIssueGetAllApi} disabled={!(startDate && classNo && sectionName)}>Search</button>
            <button type="button" className="btn btn-outline-success" data-bs-dismiss="offcanvas" aria-label="Close" onClick={clearData}>Cancel</button>
          </div>

          {/* ###### copy content till here for all component ######  */}
          <div className="table-container px-3 table-responsive">
            <table className="table table-sm table-striped text-center ">
              <thead className=''>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className='no-wrap'>#</th>
                  <th className='no-wrap'>Student</th>
                  <th className='no-wrap'>Book Name</th>
                  <th className='no-wrap'>Book ID</th>
                  <th className='no-wrap'>Book Cover</th>
                  <th className='no-wrap'>Class</th>
                  <th className='no-wrap'>Section</th>
                  <th className='no-wrap'>Issue ID</th>
                  <th className='no-wrap'>Delay Days</th>
                  <th className='no-wrap'>Return Date</th>
                  <th className='no-wrap'>Status</th>
                  <th className='no-wrap'>Action</th>
                </tr>
              </thead>
              <tbody className='heading-14 align-middle greyTextColor'>
                {
                  bookIssueAllData && bookIssueAllData?.length > 0 ? (
                    bookIssueAllData?.map((item, index) => (
                      <tr className='heading-14' >
                        <td className=' greyText pe-0 no-wrap'>{index + 1 + (currentPage - 1) * pageSize}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.studentName}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.bookName}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.bookId}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.bookCover ? item.bookCover : 'N-I-R'}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.classNo}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.classSection}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.issueId ? item.issueId : 'N-I-R'}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.returnDelay}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.returnDate}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.status ? item.status : 'N-I-R'}</td>
                        <td className=' greyText  pe-0 no-wrap' >
                          {
                            item.bookStatus === "RETURNED" || item.bookStatus === "LOST" ? (
                              <div style={{ color: '#fff ', fontWeight: '600', backgroundColor: '#008479', borderRadius: '5px', padding: '5px 10px', width: 'fit-content', margin: '0px auto' }}>
                                <p>
                                  {item.bookStatus}
                                </p>
                              </div>
                            )
                              :
                              (
                                <div className="dropdown my-button-show d-flex justify-content-around align-items-start">
                                  {/* <div className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop1234" aria-controls="staticBackdrop" style={{ cursor: 'pointer' }} onClick={(e) => issueRetunrGetApi(item.transactionId)}>
                                    <button className="btn btn-secondary dropdown-togg my-button-drop heading-10" style={{ backgroundColor: '#b50000', color: '#fff', padding: '3px 10px 3px 10px', fontSize: '14px', border: 'none', cursor: 'pointer' }} type="button" >
                                      Return Book
                                    </button>
                                  </div> */}

                                  <div
                                    className="dropdown-item"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-custom-class="custom-tooltip"
                                    data-bs-title="You can Return, Re-Issue and Lost"
                                    style={{ cursor: 'pointer' }}
                                    onClick={(e) => {
                                      // hide this element's tooltip
                                      const instance = bootstrap.Tooltip.getInstance(e.currentTarget);
                                      instance?.hide();

                                      issueRetunrGetApi(item.transactionId);
                                    }}
                                  >
                                    <div
                                      data-bs-toggle="offcanvas"
                                      data-bs-target="#staticBackdrop1234"
                                      aria-controls="staticBackdrop"
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256">
                                        <path fill="red" d="M180 104v32a4 4 0 0 1-4 4H89.66l17.17 17.17a4 4 0 0 1-5.66 5.66l-24-24a4 4 0 0 1 0-5.66l24-24a4 4 0 0 1 5.66 5.66L89.66 132H172v-28a4 4 0 0 1 8 0m48-48v144a12 12 0 0 1-12 12H40a12 12 0 0 1-12-12V56a12 12 0 0 1 12-12h176a12 12 0 0 1 12 12m-8 0a4 4 0 0 0-4-4H40a4 4 0 0 0-4 4v144a4 4 0 0 0 4 4h176a4 4 0 0 0 4-4Z" />
                                      </svg>
                                    </div>
                                  </div>

                                  {/* <div className="dropdown-item" data-bs-toggle="offcanvas" style={{ cursor: 'pointer' }} data-bs-target="#staticBackdrop1234" aria-controls="staticBackdrop" onClick={(e) => issueRetunrGetApi(item.transactionId)}>
                                    <button className="btn btn-secondary dropdown-togg my-button-drop heading-10" style={{ backgroundColor: ' #008479', color: '#fff', padding: '3px 10px 3px 10px', fontSize: '14px', border: 'none', cursor: 'pointer' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop1234" aria-controls="staticBackdrop" >
                                      Re Issue Book
                                    </button>
                                  </div> */}
                                </div>
                              )
                          }
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
                              <img src="/images/search.svg" alt="" className='img-fluid p-5' />
                              <h2><b>No Data Found</b></h2>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
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


        {
          show && (
            <div className="offcanvas offcanvas-end" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" ref={offcanvasRef}>
              <div className="offcanvas-header">
                <Link data-bs-dismiss="offcanvas" onClick={clearData}>
                  <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                  </svg>
                </Link>
                <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Issue Book</h5>
              </div>
              <hr className='mx-3' style={{ marginTop: '-3px' }} />

              <div className="offcanvas-body">
                <div className="input " >

                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label  heading-16">Book</label>
                    <select class="form-select form-select-sm form-focus  label-color" value={booById} onChange={(e) => setBooById(e.target.value)} aria-label="Default select example">
                      <option selected value="">--Choose--</option>
                      {
                        allBook?.map(item => (
                          <option value={item.bookId}>{item.bookName}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="mt-1" style={{ marginTop: '-6px' }}>
                    <label for="exampleFormControlInput1" className="form-label label-color heading-14 ">Edition</label>
                    <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={edition} style={{ marginTop: '-4px', backgroundColor: '#aaa' }} id="exampleFormControlInput1" placeholder="Enter Edition" disabled />
                  </div>
                  <div className="mt-1 mb-2" style={{ marginTop: '-4px' }}>
                    <label for="exampleFormControlInput1" className="form-label label-color heading-14">Author</label>
                    <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={Author2} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Author Name" disabled />
                  </div>
                  <div className="mb-3" style={{ marginTop: '-6px' }}>
                    <label for="exampleFormControlInput1" className="form-label label-color heading-14">Language</label>
                    <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={language} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Language" disabled />
                  </div>
                  <div className="mb-3" style={{ marginTop: '-6px' }}>
                    <label for="exampleFormControlInput1" className="form-label label-color heading-14">Rack Number</label>
                    <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={rackNumber} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Price" disabled />
                  </div>
                  <div className="mb-3" style={{ marginTop: '-6px' }}>
                    <label for="exampleFormControlInput1" className="form-label label-color heading-14">Shelf Number</label>
                    <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={shelfNumber} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Book Id" disabled />
                  </div>
                  <div className="mb-3" style={{ marginTop: '-6px' }}>
                    <label for="exampleFormControlInput1" className="form-label label-color heading-14">Quantity</label>
                    <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={quantity} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Quantity" disabled />
                  </div>
                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                    <select class="form-select form-select-sm form-focus  label-color" value={`${Class}, ${classNo}`} onChange={handle} aria-label="Default select example">
                      <option selected value="">--Choose--</option>
                      {
                        classData?.map(item => (
                          <option value={`${item.classId}, ${item.classNo}`}>{item.classNo}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label  heading-16">Section</label>
                    <select class="form-select  form-select-sm form-focus  label-color" value={`${sectionId}, ${sectionName}`} onChange={(e) => SectionHandle(e)} aria-label="Default select example">
                      <option selected value="">--Choose--</option>
                      {
                        sectionData?.map(item => (
                          <option value={`${item.sectionId}, ${item.sectionName}`}>{item.sectionName}</option>
                          // <option value={item.sectionId}>{item.sectionName}</option>
                        ))
                      }

                    </select>

                  </div>
                  <div className="mt-1  ">
                    <label for="exampleFormControlInput1" className="form-label  heading-16">Library Member</label>
                    <select class="form-select form-select-sm form-focus  label-color" value={studentMembberId} onChange={(e) => setStudentMembberId(e.target.value)} aria-label="Default select example">
                      <option selected value="">--Choose--</option>
                      {
                        AllMember?.map(item => (
                          <option value={item.studentId}>{item.studentName}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="mt-2" style={{ marginTop: '-6px' }}>
                    <label for="exampleFormControlInput1" className="form-label label-color heading-14">Return date</label>
                    <input type="date" className="form-control form-focus  label-color heading-14" style={{ marginTop: '-4px' }} value={returnDate} onChange={(e) => handleDate(e.target.value)} id="exampleFormControlInput1" placeholder="Number of Copy" />
                  </div>
                  <div className='pt-3'>
                    {isValidDateRequired && (
                      <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                        Date is required
                      </p>
                    )}
                  </div>
                  <div className='my-button11 '>
                    <button type="button" className="btn btn-outline-success my-button112233" onClick={MyIssueBookApi}>Submit</button>
                    <button type="button" className="btn btn-outline-success" data-bs-dismiss="offcanvas" aria-label="Close" onClick={clearData}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        {/* ################## Off Canvas Area ####################  */}

        {
          show12 && (
            <>
              <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop1234" aria-labelledby="staticBackdropLabel" ref={offcanvasRef22}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Re Issue Book</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >
                    <div className="mt-1" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Book</label>
                      <input type="email" className="form-control form-focu  label-color heading-14 input-custom-bg" value={bookName1} style={{ marginTop: '-4px', backgroundColor: 'red ', opacity: 1 }} id="exampleFormControlInput1" placeholder="Enter Edition" disabled />
                    </div>
                    <div className="mt-1" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Edition</label>
                      <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={edition} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Edition" disabled />
                    </div>

                    <div className="mt-1 mb-2" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Author</label>
                      <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={Author2} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Author Name" disabled />
                    </div>

                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Language</label>
                      <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={language} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Language" disabled />
                    </div>

                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Rack Number</label>
                      <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={rackNumber} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Price" disabled />
                    </div>

                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Shelf Number</label>
                      <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={shelfNumber} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Book Id" disabled />
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Quantity</label>
                      <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={quantity} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Quantity" disabled />
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Class</label>
                      <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={classId} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Quantity" disabled />
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Section</label>
                      <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={sectionId} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Quantity" disabled />
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Library Member</label>
                      <input type="email" className="form-control form-focus  label-color heading-14 input-custom-bg" value={studentId} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Quantity" disabled />
                    </div>

                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Return date</label>
                      <input type="date" className="form-control form-focus  label-color heading-14" onChange={(e) => handleDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Number of Copy" />
                    </div>
                    <div className='pt-1'>
                      {isValidDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label  heading-16">Status</label>
                      <select class="form-select form-select-sm form-focus  label-color" onChange={(e) => setMainStatus(e.target.value)} aria-label="Default select example">
                        <option selected value="">--Choose--</option>
                        {/* <option value='ISSUED'>Issue</option> */}
                        <option value='RETURNED'>Return</option>
                        <option value='REISSUED'>ReIssued</option>
                        <option value='LOST'>Lost</option>
                      </select>

                    </div>

                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success my-button112233" onClick={(e) => MyNoticePutApi(idForUpdate)}>Issue Book</button>
                      <button type="button" className="btn btn-outline-success" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }

        {/* ################## Off Canvas Area ####################  */}


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
                        <button type="button" className="btn my-btn  button00" disabled={forDelete ? false : true} onClick={handleForDelete} >Delete</button>
                        <button type="button" className="btn cancel-btn ms-2" data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setForDelete(!forDelete)}>Cancel</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          )
        }
        {/* ############## After click ##############  */}

      </div>
      {/* ################ offcanvas delete end #############  */}




    </Container>
  )
}

export default Issue_Report
