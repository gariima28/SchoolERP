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
import { GetBookIdApi } from '../../../Utils/Apis'
import HashLoader from 'src/Pages/HashLoaderCom';
// import HashLoader from 'src/Pages/HashLoaderCom';
import { CSVLink } from 'react-csv';
import toast, { Toaster } from 'react-hot-toast';
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
// ## style css area end ####  


const BookListManager = () => {

  const [loader, setLoader] = useState(false)
  const [forDelete, setForDelete] = useState(false)

  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)
  const [PDFResponse, setPDFResponse] = useState()
  const [show12, setShow12] = useState(true)

  const [bookName, setBookName] = useState()
  const [bookID, setBookID] = useState()
  const [edition, setEdition] = useState()
  const [Author, setAuthor] = useState()
  const [language, setLanguage] = useState()
  const [price, setPrice] = useState()
  const [quantity, setQuantity] = useState()
  const [rackNumber, setRackNumber] = useState()
  const [shelfNumber, setShelfNumber] = useState()
  const [coverPage, setCoverPage] = useState()
  const [NumberAvailableBook, setNumberAvailableBook] = useState()

  const [IdForDelete, setIdForDelete] = useState()
  const [idForUpdate, setIdForUpdate] = useState()
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [BookManagerData, setBookManagerData] = useState([])

  const [isValidBookNameRequired, setIsValidBookNameRequired] = useState(false);
  const [isValidAuthorNameRequired, setIsValidAuthorNameRequired] = useState(false);
  const [isValidEditionRequired, setIsValidEditionRequired] = useState(false);
  const [isValidLanguageRequired, setIsValidLanguageRequired] = useState(false);
  const [isValidPriceRequired, setIsValidPriceRequired] = useState(false);
  const [isValidQuantityRequired, setIsValidQuantityRequired] = useState(false);
  const [isValidRackNumberRequired, setIsValidRackNumberRequired] = useState(false);
  const [isValidShelfNumberRequired, setIsValidShelfNumberRequired] = useState(false);


  const [updateStatus, setUpdateStatus] = useState()
  const [manageButton, setManageButton] = useState(false);
  const [imageFile, setImageFile] = useState()
  const [preview, setPreview] = useState(null);


  const token = localStorage.getItem;
  // CSV 
  const [csvData, setCsvData] = useState([]);

  const Download_Slip = async () => {
    try {
      const response = await BookManCSV();
      if (response?.status === 200) {
        // const rows = response?.data?.split('\n').map(row => row.split(','));
        const rows = typeof response?.data === 'string'
          ? response.data.split('\n').map(row => row.split(','))
          : [];
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

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  useEffect(() => {
    MyRolPermisGetAllApi()
    Download_Slip()
    MyBookIdApi()
  }, [pageNo])

  const [errors, setErrors] = useState({});
  // ###### validation ##########

  const FuncValidation = () => {
    let inValid = true;
    // name 
    if (!bookName || bookName === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/.test(bookName)) {
      setIsValidBookNameRequired(true)
      inValid = false
      setLoader(false)
    }
    else {
    }
    // Edition name 
    if (!edition || edition === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/.test(edition)) {
      setIsValidEditionRequired(true)
      inValid = false
      setLoader(false)
    }
    else {
    }
    // author name 
    if (!Author || Author === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/.test(Author)) {
      setIsValidAuthorNameRequired(true)
      inValid = false
      setLoader(false)
    }
    else {
    }
    // language name 
    if (!language || language === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/.test(language)) {
      setIsValidLanguageRequired(true)
      inValid = false
      setLoader(false)
    }
    else {
    }
    //  price 
    if (!price || price === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/.test(price)) {
      setIsValidPriceRequired(true)
      inValid = false
      setLoader(false)
    }
    else {
    }
    //  Quantity
    if (!quantity || quantity === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/.test(quantity)) {
      setIsValidQuantityRequired(true)
      inValid = false
      setLoader(false)
    }
    else {
    }
    //  rack number
    if (!rackNumber || rackNumber === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/.test(rackNumber)) {
      setIsValidRackNumberRequired(true)
      inValid = false
      setLoader(false)
    }
    else {
    }

    return inValid;
  }

  const handleName = (e2) => {
    setBookName(e2);
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/;
    setIsValidBookNameRequired(nameRegex.test(e2));
    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidBookNameRequired(true)
    } else {
      setIsValidBookNameRequired(false)
    }
  }
  const handleEdition = (e2) => {
    setEdition(e2);
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/;
    setIsValidEditionRequired(nameRegex.test(e2));
    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidEditionRequired(true)
    } else {
      setIsValidEditionRequired(false)
    }
  }
  const handleAuthorName = (e2) => {
    setAuthor(e2);
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/;
    setIsValidAuthorNameRequired(nameRegex.test(e2));

    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidAuthorNameRequired(true)
    } else {
      setIsValidAuthorNameRequired(false)
    }
  }
  const handleLanguage = (e2) => {
    setLanguage(e2);
    const noRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/;
    setIsValidLanguageRequired(noRegex.test(e2));
    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidLanguageRequired(true)
    } else {
      setIsValidLanguageRequired(false)
    }
  }
  const handlePrice = (e2) => {
    setPrice(e2);
    const noRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/;
    setIsValidPriceRequired(noRegex.test(e2));
    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidPriceRequired(true)
    } else {
      setIsValidPriceRequired(false)
    }
  }
  const handleQuantity = (e2) => {
    setQuantity(e2);
    const noRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/;
    setIsValidQuantityRequired(noRegex.test(e2));
    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidQuantityRequired(true)
    } else {
      setIsValidQuantityRequired(false)
    }
  }
  const handleRackNumber = (e2) => {
    setRackNumber(e2);
    const noRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/;
    setIsValidRackNumberRequired(noRegex.test(e2));
    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidRackNumberRequired(true)
    } else {
      setIsValidRackNumberRequired(false)
    }
  }
  const handleShelfNumber = (e2) => {
    setShelfNumber(e2);
    const noRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\- \s]+$/;
    setIsValidShelfNumberRequired(noRegex.test(e2));
    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidShelfNumberRequired(true)
    } else {
      setIsValidShelfNumberRequired(false)
    }
  }

  // ###### validation  end##########

  const offcanvasRef = useRef(null);
  const offcanvasRef22 = useRef(null);
  const offcanvasRef33 = useRef(null);

  //  Get All Api   
  const MyBookIdApi = async () => {
    setLoader(true)
    try {
      const response = await GetBookIdApi();
      console.log('book id generateeee--------', response)
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setBookID(response?.data?.nextBookId);
        setLoader(false)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  }

  // post Api 
  const SubcPutDataApi = async () => {

    if (FuncValidation()) {
      const formData = new FormData()
      formData.append('bookName', bookName);
      formData.append('authorName', Author);
      formData.append('edition', edition);
      formData.append('language', language);
      formData.append('price', price);
      formData.append('numberOfCopies', quantity);
      formData.append('almirahNo', rackNumber);
      formData.append('selfNo', shelfNumber);
      formData.append('coverPage', coverPage);
      setLoader(true)
      try {
        const response = await BookManagerPostApi(formData);
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          MyRolPermisGetAllApi()
          MyBookIdApi()
          setShow(false)
          setHide(true)
          setLoader(false)
          setBookName('')
          setAuthor('')
          // setNumberBook('')
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
      } catch (error) {
        console.log(error)
        setLoader(false)
      }
    }

  }
  //  Get All Api   
  const MyRolPermisGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await BookManagerGetAllApi(searchKey, pageNo, pageSize);
      console.log('book list manager data', response)
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setBookManagerData(response?.data?.Books)
        setCurrentPage(response?.data?.currentPage);
        setTotalPages(response?.data?.totalPages);
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
  // Get by id 
  const BookManGetByIdApi = async (id) => {
    setIdForUpdate(id)
    setLoader(true)
    try {
      const response = await BookmanGetById(id);
      console.log('get by id', response)
      if (response?.status === 200) {
        // toast.success(response?.data?.msg);
        setUpdateStatus(response?.data?.status)
        setBookName(response?.data?.Books?.bookName)
        setAuthor(response?.data?.Books?.authorName)
        setEdition(response?.data?.Books?.edition)
        setLanguage(response?.data?.Books?.language)
        setPrice(response?.data?.Books?.price)
        setQuantity(response?.data?.Books?.noOfCopies)
        setCoverPage(response?.data?.Books?.coverPage)
        setRackNumber(response?.data?.Books?.almirahNo)
        setShelfNumber(response?.data?.Books?.selfNo)
        setNumberAvailableBook(response?.data?.Books?.availableCopies)
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
  const BookManDeleteApi = async (id) => {
    setLoader(true)
    try {
      const response = await BookManagerDeleteApi(id);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        MyRolPermisGetAllApi()
        setShowdelete(false)
        setHidedelete(true)
        setLoader(false)
        MyRolPermisGetAllApi()
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef33.current);
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
  // Teacher Put api 
  const MyNoticePutApi = async (id) => {
    if (FuncValidation()) {
      setLoader(true)
      try {
        const formData = new FormData()
        formData.append('bookName', bookName);
        formData.append('authorName', Author);
        formData.append('edition', edition);
        formData.append('language', language);
        formData.append('price', price);
        formData.append('numberOfCopies', quantity);
        formData.append('almirahNo', rackNumber);
        formData.append('selfNo', shelfNumber);
        formData.append('coverPage', imageFile);
        const response = await BookManPutApi(id, formData);
        console.log('MY_BOOK____put-Api', response)
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          // setHide12(true)
          MyRolPermisGetAllApi()
          setLoader(false)

          setShow12(false)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
          offcanvasInstance.hide();
          // setShow(false)
          setTimeout(() => {
            setShow12(true)
          }, 0.5)
        } else {
          toast.error(response?.data?.message);
          setShow12(true)
          setLoader(false)
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
  const ClearData = () => {
    setBookName('')
    setAuthor('')
    setEdition('')
    setLanguage('')
    setPrice('')
    setQuantity('')
    setRackNumber('')
    setShelfNumber('')
    setCoverPage('')
    setIsValidBookNameRequired(false);
    setIsValidAuthorNameRequired(false);
    setIsValidEditionRequired(false);
    setIsValidLanguageRequired(false);
    setIsValidPriceRequired(false);
    setIsValidQuantityRequired(false);
    setIsValidRackNumberRequired(false);
    setIsValidShelfNumberRequired(false);
    setForDelete(false)

  } 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // // console.log('my imageeee---000',file)
    setImageFile(file);
  };
  const buttManage = () => {
    setManageButton(!manageButton)
  }
  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchKey(value);
    setPageNo(1); // Reset to first page on search change
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
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Back Office</li>
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Book List Manager</Link></li>
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
              searchAction={MyRolPermisGetAllApi}
              onSearchChange={handleSearchChange}
            />
            <div >
              <Link style={{ height: '38px', padding: '10px' }} type="button" className="btn btn-success heading-16 my-own-button me-3" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" onClick={ClearData}>+ Add Book</Link>

            </div>
          </div>

        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16 heading-responsive' style={{ marginTop: '-22px' }}>Book List Manager Details</h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}

          <div className="table-container px-3 table-responsive">

            <table className="table table-sm table-striped text-center ">
              <thead className=''>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className='no-wrap'>#</th>
                  <th className='no-wrap'>Title</th>
                  <th className='no-wrap'>Book Id</th>
                  <th className='no-wrap'>Author</th>
                  <th className='no-wrap'>Book Cover</th>
                  <th className='no-wrap'>Price</th>
                  <th className='no-wrap'>Quantity</th>
                  <th className='no-wrap'>Action</th>
                </tr>
              </thead>

              <tbody className='heading-14 align-middle greyTextColor'>
                {
                  BookManagerData && BookManagerData?.length > 0 ? (
                    BookManagerData?.map((item, index) => (
                      <tr className='heading-14' >
                        <td className=' greyText pe-0 no-wrap'>{index + 1 + (currentPage - 1) * pageSize}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.bookName}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.bookId}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.authorName}</td>
                        <td className=' greyText pe-0 no-wrap'>
                          <div>
                            <img style={{ width: '60px', height: '50px' }} src={item.coverPage} alt="Book Image" />
                          </div>
                        </td>
                        <td className=' greyText pe-0 no-wrap my-anchor-view'>{item.price}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.noOfCopies}</td>
                        <td className=' greyText  pe-0 no-wrap' >
                          <div className="dropdown my-button-show d-flex justify-content-around align-items-start">
                            <div className="dropdown-item" data-bs-toggle="offcanvas" style={{ cursor: 'pointer' }} data-bs-target="#staticBackdrop1234" aria-controls="staticBackdrop" onClick={(e) => BookManGetByIdApi(item.bookId)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g fill="none" stroke="#008479" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
                                  <path d="M19.09 14.441v4.44a2.37 2.37 0 0 1-2.369 2.369H5.12a2.37 2.37 0 0 1-2.369-2.383V7.279a2.356 2.356 0 0 1 2.37-2.37H9.56" />
                                  <path d="M6.835 15.803v-2.165c.002-.357.144-.7.395-.953l9.532-9.532a1.36 1.36 0 0 1 1.934 0l2.151 2.151a1.36 1.36 0 0 1 0 1.934l-9.532 9.532a1.36 1.36 0 0 1-.953.395H8.197a1.36 1.36 0 0 1-1.362-1.362M19.09 8.995l-4.085-4.086" />
                                </g>
                              </svg>
                            </div>
                            <div className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" style={{ cursor: 'pointer' }} aria-controls="staticBackdrop" onClick={(e) => setIdForDelete(item.bookId)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="red" d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1zM6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7zm12-1V5h-4l-1-1h-3L9 5H5v1zM8 9h1v10H8zm6 0h1v10h-1z" />
                              </svg>
                            </div>
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
            <>
              <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" ref={offcanvasRef}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" onClick={ClearData}>
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Book</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Book Name <span style={{ color: 'red' }}>*</span></label>
                      <input type="email" className="form-control form-focus  label-color heading-14" value={bookName} onChange={(e) => handleName(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Book Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidBookNameRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Book name is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Book Id <span style={{ color: 'red' }}>*</span></label>
                      <input type="email" className="form-control form-focus  label-color heading-14" value={bookID} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Book Id" />
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Edition <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className="form-control form-focus  label-color heading-14" value={edition} onChange={(e) => handleEdition(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Edition" />
                    </div>
                    <div className='pt-1'>
                      {isValidEditionRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Edition is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Author <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className="form-control form-focus  label-color heading-14" value={Author} onChange={(e) => handleAuthorName(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Author Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidAuthorNameRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Author name is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Language <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className="form-control form-focus  label-color heading-14" value={language} onChange={(e) => handleLanguage(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Language" />
                    </div>
                    <div className='pt-1'>
                      {isValidLanguageRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Number language is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Price <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className="form-control form-focus  label-color heading-14" value={price} onChange={(e) => handlePrice(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Price" />
                    </div>
                    <div className='pt-1'>
                      {isValidPriceRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Price is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Quantity <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className="form-control form-focus  label-color heading-14" value={quantity} onChange={(e) => handleQuantity(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Quantity" />
                    </div>
                    <div className='pt-1'>
                      {isValidQuantityRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Quantity is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Rack Number <span style={{ color: 'red' }}>*</span></label>
                      <input type="text" className="form-control form-focus  label-color heading-14" value={rackNumber} onChange={(e) => handleRackNumber(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Rack Number" />
                    </div>
                    <div className='pt-1'>
                      {isValidRackNumberRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Rack Number is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Shelf Number </label>
                      <input type="text" className="form-control form-focus  label-color heading-14" value={shelfNumber} onChange={(e) => handleShelfNumber(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Shelf Numbe" />
                    </div>
                    <div className='pt-1'>
                      {isValidShelfNumberRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Shelf Number is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Cover Page</label>
                      <input type="file" className="form-control form-focus  label-color heading-14" onChange={(e) => setCoverPage(e.target.files[0])} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Number of Copy" />
                    </div>
                 

                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success my-button112233" onClick={(e) => SubcPutDataApi()}>Submit</button>
                      <button type="button" className="btn btn-outline-success" data-bs-dismiss="offcanvas" aria-label="Close" onClick={ClearData}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
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
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Book</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Book Name</label>
                      <input type="email" className="form-control form-focus  label-color heading-14" value={bookName} onChange={(e) => handleName(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Book Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidBookNameRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Book name is required
                        </p>
                      )}
                    </div>

                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Book Id</label>
                      <input type="email" className="form-control form-focus  label-color heading-14" value={bookID} onChange={(e) => handleNumberOfCopy(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Book Id" />
                    </div>

                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Edition</label>
                      <input type="email" className="form-control form-focus  label-color heading-14" value={edition} onChange={(e) => handleEdition(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Edition" />
                    </div>
                    <div className='pt-1'>
                      {isValidEditionRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Edition is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Author</label>
                      <input type="email" className="form-control form-focus  label-color heading-14" value={Author} onChange={(e) => handleAuthorName(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Author Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidAuthorNameRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Author name is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Language</label>
                      <input type="email" className="form-control form-focus  label-color heading-14" value={language} onChange={(e) => handleLanguage(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Language" />
                    </div>
                    <div className='pt-1'>
                      {isValidLanguageRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Language is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Price</label>
                      <input type="email" className="form-control form-focus  label-color heading-14" value={price} onChange={(e) => handlePrice(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Price" />
                    </div>
                    <div className='pt-1'>
                      {isValidPriceRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Price is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Quantity</label>
                      <input type="email" className="form-control form-focus  label-color heading-14" value={quantity} onChange={(e) => handleQuantity(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Quantity" />
                    </div>
                    <div className='pt-1'>
                      {isValidQuantityRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Quantity is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Rack Number</label>
                      <input type="email" className="form-control form-focus  label-color heading-14" value={rackNumber} onChange={(e) => handleRackNumber(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Rack Number" />
                    </div>
                    <div className='pt-1'>
                      {isValidRackNumberRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Rack Number is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Shelf Number</label>
                      <input type="email" className="form-control form-focus  label-color heading-14" value={shelfNumber} onChange={(e) => handleShelfNumber(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Shelf Numbe" />
                    </div>
                    <div className='pt-1'>
                      {isValidShelfNumberRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Shelf Number is required
                        </p>
                      )}
                    </div>

                    <div className='row pe-1 '>
                      <div className='col-lg-12 col-md-12 col-sm-12 pe-0'>
                        {
                          updateStatus === "success"
                            ?
                            <div class="mb-3 " style={{ display: 'flex', }}>
                              <div className='w-100'>
                                <label for="exampleFormControlInput1" className="form-label heading-14 label-color">Cover Page </label>
                                {
                                  manageButton ?
                                    <input type="file" class="form-control" id="exampleFormControlInput1" onChange={handleFileChange} placeholder="select file" accept='.jpg, .png, .jpeg' />
                                    :
                                    <input type="text" class="form-control" id="exampleFormControlInput1" value={coverPage} placeholder="name@example.com" />
                                }
                              </div>
                              <div style={{ margin: 'auto', paddingTop: '30px', paddingLeft: '5px' }}>
                                {
                                  manageButton ? (
                                    <button type="button" class="btn btn-outline-success my-green heading-14 " onClick={buttManage} >View </button>
                                  )
                                    :
                                    (
                                      <button type="button" class="btn btn-outline-success my-green heading-14 " onClick={buttManage}>Edit</button>
                                    )
                                }
                              </div>
                            </div>
                            :
                            <div className="mb-3  for-media-margin">
                              <label for="exampleFormControlInput1" className="form-label heading-14 label-color">User Image <span style={{ color: 'red' }}>*</span></label>
                              <input type="file" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={handleFileChange} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Doe" />
                            </div>
                        }
                      </div>
                    </div>
                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success my-button112233" onClick={(e) => MyNoticePutApi(idForUpdate)}>Update Book</button>
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
                <div className="offcanvas-header p-0 pt-3" onClick={ClearData}>
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
                        <input
                          className="form-check-input my-form-check-input"
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

export default BookListManager