
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { EventPostApi } from 'src/Utils/Apis'
import { EventGetAllApi } from 'src/Utils/Apis'
import { EventDeleteApi } from 'src/Utils/Apis'
import { EventGetByIdApi } from 'src/Utils/Apis'
import { EventPutApi } from 'src/Utils/Apis'
import { EventCSV } from 'src/Utils/Apis'
import { TeacherEventPDF } from 'src/Utils/Apis'
import { ClassGetApi } from 'src/Utils/Apis'
import { AllRolesGetAllApiInEvent } from 'src/Utils/Apis'
import HashLoaderCom from 'src/Pages/HashLoaderCom';
import { CSVLink } from 'react-csv';
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
    .my-Ongoing-status{
     border: 1px solid var( --OnGoingStatus) ;
     border-radius: 15px;
     width: 60%;
     color: #41AD49 !important;
     padding: 1px 0px;
     text-align: center;
    }
    .my-Upcoming-status{
     border: 1px solid var(--UpcomingStatus) ;
     border-radius: 15px;
     width: 60%;
     color: #4F3EE0 !important;
     padding: 1px 0px;
    
     text-align: center;
    }
    .my-Closed-status{
     border: 1px solid var(  --ClosedStatus) ;
     border-radius: 15px;
     width: 60%;
     color: #B50000 !important;
     padding: 1px;
     text-align: center;
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

.hover-reveal {
  position: relative;
  cursor: pointer;
}

.custom-tooltip {
  background-color: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  max-width: 300px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: fadeIn 0.1s ease-out;
  transform: translateX(-50%);
  white-space: normal;
  word-wrap: break-word;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-50%) translateY(5px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

.info-indicator {
  display: inline-flex;
  transition: transform 0.1s;
}

.info-indicator:hover {
  transform: scale(1.1);
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
@media only screen and (max-width: 1040px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
@media only screen and (max-width: 735px) {
    .heading-responsive{
        margin-top: 0px !important;
    }

}
`;

// ## style css area end ####  

const Event = () => {
  const cellText = "students and teachersdebfeyuduysd cbhewubfuewbfehbehbd "
  const [loader, setLoader] = useState(false)
  const [forDelete, setForDelete] = useState(false)

  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)
  const [addshow, setAddshow] = useState(true)
  const [addhide, setaddhide] = useState(false)
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)

  const [eventName, setEventName] = useState()
  const [startDate, setStartDate] = useState()
  const [startTime, setStartTime] = useState()
  const [endDate, setEndDate] = useState()
  const [endTime, setEndTime] = useState()
  const [eventStatus, setEventStatus] = useState()
  const [eventDescription, setEventDescription] = useState()
  const [eventAllData, setEventAllData] = useState([])
  const [idForDelete, setIdForDelete] = useState()
  const [searchKey, setSearchKey] = useState('')
  const [allEventRole, setAllEventRole] = useState([])
  const [eventStatusDataById, setEventStatusDataById] = useState()
  const [eventIdForUpdate, setEventIdForUpdate] = useState()
  const [isValidNameRequired, setIsValidNameRequired] = useState(false);
  const [isValidTimeRequired, setIsValidTimeRequired] = useState(false);
  const [isValidEndTimeRequired, setIsValidEndTimeRequired] = useState(false);
  const [isValidDateRequired, setIsValidDateRequired] = useState(false);
  const [isValidEndDateRequired, setIsValidEndDateRequired] = useState(false);
  const [isValidDescriptionRequired, setIsValidDescriptionRequired] = useState(false);
  const [searchKey2, setSearchKey2] = useState('')
  const [pageNo2, setPageNo2] = useState('');
  const [pageSize2, setPageSize2] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [eventFile, setEventFile] = useState();
  const [eventImage, setEventImage] = useState([]);

  const [classData, setClassData] = useState([])
  const [classId, setClassId] = useState([])

  const [selectedRoles, setSelectedRoles] = useState([]);

  const [roleNameStore, setRoleNameStore] = useState([]);
  const [selectedClassIds, setSelectedClassIds] = useState([]);
  const [selectedClassNos, setSelectedClassNos] = useState([]);

  const [coverPage, setCoverPage] = useState()
  const [updateStatus, setUpdateStatus] = useState()
  const [manageButton, setManageButton] = useState(false);

  const [coverPage2, setCoverPage2] = useState()
  const [updateStatus2, setUpdateStatus2] = useState()
  const [manageButton2, setManageButton2] = useState(false);

  const [imageFile, setImageFile] = useState()
  const [imageFile2, setImageFile2] = useState()

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const buttManage = () => {
    setManageButton(!manageButton)
  }
  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    setImageFile2(file);
  };
  const buttManage2 = () => {
    setManageButton2(!manageButton2)
  }

  // select multiple roles in dropdown 
  const handleRoleSelection = (roleName) => {
    setRoleNameStore(prev => {
      const allRoleNames = allEventRole.map(item => item.roleName);
      const allRolesExceptAll = allEventRole
        .filter(item => item.roleName !== "All")
        .map(item => item.roleName);
      if (roleName === "All") {
        return prev.includes("All") ? [] : allRoleNames;
      }
      if (prev.includes("All")) {
        return allRolesExceptAll.filter(name => name !== roleName);
      }
      let newSelection;
      if (prev.includes(roleName)) {
        newSelection = prev.filter(item => item !== roleName);
      } else {
        newSelection = [...prev, roleName];
      }
      const allNonAllSelected = allRolesExceptAll.every(role =>
        newSelection.includes(role)
      );
      if (allNonAllSelected) {
        return ["All", ...allRolesExceptAll];
      }
      return newSelection;
    });
  };

  // Class functionlity with checkBox

  // select multiple classes in dropdown 
  const handleClassSelection = (classId) => {
    setSelectedClassIds(prev => {
      const allClassIds = classData?.map(item => item.classId) || [];
      if (classId === "All") {
        return prev.length === allClassIds.length ? [] : [...allClassIds];
      }
      const allCurrentlySelected = prev.length === allClassIds.length;
      if (allCurrentlySelected) {
        return allClassIds.filter(id => id !== classId);
      }
      let newSelection;
      if (prev.includes(classId)) {
        newSelection = prev.filter(id => id !== classId);
      } else {
        newSelection = [...prev, classId];
      }
      if (newSelection.length === allClassIds.length) {
        return [...allClassIds];
      }
      return newSelection;
    });
  };

  // Class functionlity with checkBox

  useEffect(() => {
    UpdatClassGetApi()
  }, []);

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
      }
    } catch (error) {
      console.log(error)
    }
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  useEffect(() => {
    MyEventGetAllApi()
    // Download_Slip()
    MyRolesInEventAllApi()
  }, [pageNo])


  const [regex, setRegex] = useState('/^[a-zA-Z0-9!@#$%^&*()_+=-]+$/');
  // const [csvData, setCsvData] = useState([]);

  // const Download_Slip = async () => {
  //   try {
  //     const response = await EventCSV();
  //     if (response?.status === 200) {
  //       const rows = response?.data?.split('\n').map(row => row.split(','));
  //       setCsvData(rows);
  //       // setTableData(rows.slice(1));
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setLoader(false)
  //   }
  // };

  const [errors, setErrors] = useState({});
  // ###### validation ##########

  const FuncValidation = () => {
    let isValid = true;
    // name 
    if (!eventName || eventName === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=\- .]+$/.test(eventName)) {
      setIsValidNameRequired(true)
      isValid = false
      setLoader(false)
    }
    else {
    }
    // if (!eventDescription || eventDescription === "" || !/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? \s]+$/.test(eventDescription)) {
    //   setIsValidDescriptionRequired(true)
    //   isValid = false
    //   setLoader(false)
    // }
    // else {
    // }
    // date
    if (!startDate || startDate === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=\- .]+$/.test(startDate)) {
      setIsValidDateRequired(true)
      isValid = false
      setLoader(false)

    }
    else {
    }
    // time
    if (!startTime || startTime === "" || !/^(?:[01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(startTime)) {
      setIsValidTimeRequired(true)
      isValid = false
      setLoader(false)
    }
    else {
    }

    // end date
    if (!endDate || endDate === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=\- .]+$/.test(endDate)) {
      setIsValidEndDateRequired(true)
      isValid = false
      setLoader(false)
    }
    else {
    }
    // end time
    if (!endTime || endTime === "" || !/^(?:[01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(endTime)) {
      setIsValidEndTimeRequired(true)
      isValid = false
      setLoader(false)
    }
    else {
    }
    return isValid;
  }
  const handleName = (e2) => {
    setEventName(e2);
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\- .]+$/;
    setIsValidNameRequired(nameRegex.test(e2));

    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidNameRequired(true)
    } else {
      setIsValidNameRequired(false)
    }
  }
  const handleDescription = (e2) => {
    setEventDescription(e2);
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? \s]+$/;
    setIsValidDescriptionRequired(nameRegex.test(e2));

    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidDescriptionRequired(true)
    } else {
      setIsValidDescriptionRequired(false)
    }
  }
  const handleDate = (e2) => {
    setStartDate(e2);
    const dateRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\- .]+$/;
    setIsValidDateRequired(dateRegex.test(e2));
    if (e2 === "" || !dateRegex.test(e2)) {
      setIsValidDateRequired(true)
    } else {
      setIsValidDateRequired(false)
    }
  }
  const handleEndDate = (e2) => {
    setEndDate(e2);
    const dateRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\- .]+$/;
    setIsValidEndDateRequired(dateRegex.test(e2));
    if (e2 === "" || !dateRegex.test(e2)) {
      setIsValidEndDateRequired(true)
    } else {
      setIsValidEndDateRequired(false)
    }
  }
  const handleTime = (e2) => {
    setStartTime(e2);
    const timeRegex = /^(?:[01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    // const timeRegex = /^[0-2][0-3]:[0-5][0-9]$/;
    setIsValidTimeRequired(timeRegex.test(e2));
    if (e2 === "" || !timeRegex.test(e2)) {
      setIsValidTimeRequired(true)
    } else {
      setIsValidTimeRequired(false)
    }
  }
  const handleEndTime = (e2) => {
    setEndTime(e2);
    const timeRegex = /^(?:[01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    // const timeRegex = /^[0-2][0-3]:[0-5][0-9]$/;
    setIsValidEndTimeRequired(timeRegex.test(e2));
    if (e2 === "" || !timeRegex.test(e2)) {
      setIsValidEndTimeRequired(true)
    } else {
      setIsValidEndTimeRequired(false)
    }
  }

  //  Alll roles in events   
  const MyRolesInEventAllApi = async () => {
    setLoader(true)
    try {
      const response = await AllRolesGetAllApiInEvent();
      console.log('All roles in event', response);
      if (response?.status === 200) {
        setAllEventRole(response?.data?.role)
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

  // ###### validation  end##########

  const offcanvasRef = useRef(null);
  const offcanvasRef22 = useRef(null);
  const offcanvasRef33 = useRef(null);

  // Event Post Api   
  const MyEventPostApi = async () => {
    setLoader(true)
    if (FuncValidation()) {
      const formData = new FormData()
      formData.append('eventName', eventName);
      formData.append('eventStatus', eventStatus);
      formData.append('startDate', startDate);
      formData.append('startTime', startTime);
      formData.append('endDate', endDate);
      formData.append('endTime', endTime);
      formData.append('eventDescription', eventDescription);
      formData.append('eventForRoleTypeNames', roleNameStore);
      formData.append('eventForClassIds', selectedClassIds);
      formData.append('eventImages', eventImage);
      formData.append('eventFiles', eventFile);
      try {
        const response = await EventPostApi(formData);
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          MyEventGetAllApi()
          setAddshow(false)
          setaddhide(true)
          setLoader(false)
          setEventName('')
          setStartDate('')
          setStartTime('')
          setEndDate('')
          setEndTime('')
          setEventStatus('')
          setRoleNameStore([])
          setSelectedClassIds([])
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
          offcanvasInstance.hide();
          setTimeout(() => {
            setAddshow(true)
          }, 0.5)
        } else {
          toast.error(response?.data?.message);
          setAddshow(true)
          setLoader(false)
        }
      } catch (error) {
        console.log(error)
        setLoader(false)
      }
    }

  }
  // Event Get All Api   
  const MyEventGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await EventGetAllApi(searchKey, pageNo, pageSize);
      console.log('Event get All Api data------------', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setEventAllData(response?.data?.events)
        setCurrentPage(response?.data?.currentPage);
        setTotalPages(response?.data?.totalPages);
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
  // Delete api
  const MyEventDeleteApi = async (id) => {
    setLoader(true)
    try {
      const response = await EventDeleteApi(id);
      // console.log('my-subs-api',response)
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        MyEventGetAllApi()
        setShowdelete(false)
        setHidedelete(true)
        setLoader(false)
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
  // Get by id 
  const MyEventGetByIdApi = async (id) => {
    setLoader(true);
    setEventIdForUpdate(id);
    try {
      const response = await EventGetByIdApi(id);
      console.log('Event get by id Api data--', response);

      if (response?.status === 200) {
        const ev = response.data.events;

        setEventName(ev.eventName);
        setUpdateStatus2(response.data.status);
        setEventDescription(ev.eventDescription);
        setStartDate(ev.startingDate);
        setStartTime(ev.startingTime);
        setEndDate(ev.endingDate);
        setEndTime(ev.endingTime);
        setEventStatusDataById(ev.eventStatus);
        setUpdateStatus(response.data.status);
        setCoverPage(ev.eventImage);
        setCoverPage2(ev.eventFiles);
        setEventStatus(ev.eventStatus);

        setRoleNameStore(ev.eventForRoleType || []);
        setSelectedClassIds(ev.eventForClassIds || []);
        setSelectedClassNos(ev.eventForClassNos || []);

        setLoader(false);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };  
  // Event Put api 
  const MyEventPutApi = async (id) => {
    setLoader(true)
    try {
      const formData = new FormData()
      formData.append('eventName', eventName);
      formData.append('eventStatus', eventStatus);
      formData.append('startDate', startDate);
      formData.append('startTime', startTime);
      formData.append('endDate', endDate);
      formData.append('endTime', endTime);
      formData.append('eventDescription', eventDescription);
      formData.append('eventForRoleTypeNames', roleNameStore);
      formData.append('eventForClassIds', selectedClassIds);
      formData.append('eventImages', eventImage);
      formData.append('eventFiles', eventFile);

      const response = await EventPutApi(id, formData);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setShow(false)
        setHide(true)
        MyEventGetAllApi()
        setLoader(false)
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
        offcanvasInstance.hide();
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
  const handleForDelete = () => {
    MyEventDeleteApi(idForDelete)
  }
  const handleChange = (e) => {
    const trimmedValue = e.target.value.trimStart();
    setSearchKey(trimmedValue);
  };
  const ClearAndCancelHandle = () => {
    setEventName('')
    setStartDate('')
    setStartTime('')
    setEndDate('')
    setEndTime('')
    setEventStatus('')
    setIsValidDescriptionRequired(false)
    setIsValidNameRequired(false)
  }
  const handleRoleChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedRoles(selected);
  };

  const handleClassChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedClasses(selected);
  };
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
    ClearAndCancelHandle()
    const offcanvasElement = document.getElementById('staticBackdrop');
    if (offcanvasElement) {
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.show();
    } else {
      console.error('Offcanvas element with ID addFeeType not found');
      toast.error('Unable to open Add event form');
    }
  };
  const [tooltip, setTooltip] = useState({
    show: false,
    content: '',
    position: { x: 0, y: 0 }
  });
  const clearHandler = () => {
    setForDelete(false)
  }

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
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Event</Link></li>
              </ol>
            </nav>
          </div>
          {/* new csv design */}
          <div className="d-flex g-1 for-media-query">
            <ActionControls
              showAddButton={true}
              addButtonText={`Add Event`}
              addButtonAction={handleAddOffcanvasOpen}
              showSearch={true}
              searchAction={handleSearchButton}
              showExportPDF={false}
              exportPDFText="Export PDF"
              exportPDFAction={TeacherEventPDF}
              showExportCSV={eventAllData?.length > 0}
              exportCSVText="Export CSV"
              exportCSVAction={EventCSV}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16 heading-responsive' style={{ marginTop: '-22px' }}>Event Details</h5>
        <div className="main-content-conatainer pt-1 ">
          <div className="table-container px-3 table-responsive">
            <table className="table table-sm table-striped ">
              <thead className=''>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className='no-wrap'>#</th>
                  <th className='no-wrap'>Event Name</th>
                  <th className='no-wrap'>Start Date & Time</th>
                  <th className='no-wrap'>End Date & Time</th>
                  <th className='no-wrap'>Event for Role</th>
                  <th className='no-wrap'>Event for Class</th>
                  <th className='no-wrap'>Status</th>
                  <th className='no-wrap'>Actions</th>
                </tr>
              </thead>
              <tbody className='heading-14 align-middle greyTextColor'>
                {
                  eventAllData && eventAllData?.length > 0 ? (
                    eventAllData?.map((item, index) => (
                      <tr className='heading-14' >
                        <td className=' greyText pe-0 no-wrap'>{index + 1 + (currentPage - 1) * pageSize}</td>
                        <td
                          className='greyText pe-0 no-wrap position-relative'
                          data-bs-toggle={item.eventName.length > 17 ? "tooltip" : undefined}
                          data-bs-placement="top"
                          // data-bs-delay='{"show":0,"hide":100}' 
                          title={item.eventName.length > 17 ? item.eventName : undefined}
                        >
                          {item.eventName?.length > 17 ? (
                            <div className="d-flex align-items-center">
                              <span className="text-truncate" style={{ maxWidth: 'calc(100% - 18px)' }}>
                                {item.eventName.substring(0, 17)}
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
                            item.eventName
                          )}
                        </td>

                        <td className=' greyText pe-0 no-wrap'>{item.startDate} {item.startTime}</td>
                        <td className=' greyText pe-0 no-wrap'>{item.endDate} {item.endTime}</td>
                        <td
                          className='greyText pe-0 no-wrap position-relative'
                          data-bs-toggle={item.eventForRoleType.length > 17 ? "tooltip" : undefined}
                          title={item.eventForRoleType.length > 17 ? item.eventForRoleType : undefined}
                        >
                          {item.eventForRoleType?.length > 17 ? (
                            <div className="d-flex align-items-center">
                              <span className="text-truncate" style={{ maxWidth: 'calc(100% - 18px)' }}>
                                {item.eventForRoleType.substring(0, 17)}
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
                            item.eventForRoleType
                          )}
                        </td>

                          <td
                          className='greyText pe-0 no-wrap position-relative'
                          data-bs-toggle={item.eventForClassNos.length > 17 ? "tooltip" : undefined}
                          title={item.eventForClassNos.length > 17 ? item.eventForClassNos : undefined}
                        >
                          {item.eventForClassNos?.length > 17 ? (
                            <div className="d-flex align-items-center">
                              <span className="text-truncate" style={{ maxWidth: 'calc(100% - 18px)' }}>
                                {item.eventForClassNos.substring(0, 17)}
                              </span>
                              <span className="info-indicator ms-1">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <circle  cx="8" cy="8" r="7" fill="#aaa" stroke="#aaa" strokeWidth="0.5" />
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
                            item.eventForClassNos
                          )}
                        </td>
                        {/* <td className=' greyText pe-0 no-wrap'>{item.eventForRoleType}</td> */}
                        {/* <td className=' greyText pe-0 no-wrap'>{item.eventForClassNos}</td> */}

                        <td className='greyText ps-1 no-wrap'>
                          <p className={`greyText pe-0 ${item.status === "Ongoing" ? 'my-Ongoing-status' : `${item.status === "Upcoming" ? 'my-Upcoming-status' : 'my-Closed-status'}`}`}>{item.status}</p>
                        </td>
                        <td className=' greyText  pe-0 no-wrap' >
                          <div className="dropdown my-button-show" >
                            <button className="btn btn-secondary dropdown-toggle my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Action  &nbsp;
                            </button>
                            <ul className="dropdown-menu anchor-color heading-14" style={{ position: 'fixed' }}>
                              <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop1212" aria-controls="offcanvasRight" onClick={(e) => MyEventGetByIdApi(item.eventId)} >Edit</Link></li>
                              <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight" onClick={(e) => setIdForDelete(item.eventId)}>Delete</Link></li>
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
                              <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className='img-fluid p-5' />
                              <h2><b>No Data Found</b></h2>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                }
              </tbody>
            </table>
            {
              tooltip.show && (
                <div
                  className="custom-tooltip"
                  style={{
                    position: 'fixed',
                    left: `${tooltip.position.x}px`,
                    top: `${tooltip.position.y - 40}px`,
                    zIndex: 9999
                  }}
                >
                  {tooltip.content}
                </div>
              )
            }

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

        </div>
        {/* ################## Off Canvas Area ####################  */}

        {/* ################## Off Canvas Area ####################  */}

        {
          addshow && (
            <>
              <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" ref={offcanvasRef} >
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" onClick={ClearAndCancelHandle}>
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Event </h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Event Name</label>
                      <input type="text" className="form-control form-focus label-color  heading-14" value={eventName} onChange={(e) => handleName(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Event Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidNameRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Event name is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Start Date</label>
                      <input type="date" className="form-control form-focus label-color  heading-14" value={startDate} onChange={(e) => handleDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Book Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Start Time</label>
                      <input type="time" className="form-control form-focus label-color  heading-14" value={startTime} onChange={(e) => handleTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="9:30   AM" />
                    </div>
                    <div className='pt-1'>
                      {isValidTimeRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Time is required
                        </p>
                      )}
                    </div>

                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14" style={{ color: "#000000" }}>End Date</label>
                      <input type="date" className="form-control form-focus   heading-14" value={endDate} onChange={(e) => handleEndDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Book Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidEndDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          End date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label heading-14">End Time</label>
                      <input type="time" className="form-control form-focus label-color  heading-14" value={endTime} onChange={(e) => handleEndTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="00:00   AM" />
                    </div>
                    <div className='pt-1'>
                      {isValidEndTimeRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          End time is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      {/* Event for */}
                      <div className="mb-3" style={{ marginTop: '-4px' }}>
                        <div className="mb-3">
                          <label htmlFor="eventForDropdown" className="form-label mb-1 label-text-color focus heading-14">
                            Event For
                          </label>
                          <div className="dropdown">

                            <button
                              className="form-select form-select-sm form-focus label-color dropdown-toggle"
                              type="button"
                              id="eventForDropdown"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {roleNameStore?.length === allEventRole?.length
                                ? "All"
                                : roleNameStore.length > 1
                                  ? `${roleNameStore.length} Selected`
                                  : roleNameStore.length === 1
                                    ? roleNameStore[0]
                                    : "--Choose--"}
                            </button>

                            <ul
                              className="dropdown-menu"
                              aria-labelledby="eventForDropdown"
                              style={{
                                width: '90%',
                                maxHeight: '200px',
                                overflowY: 'auto',    // add vertical scroll
                                overflowX: 'hidden'   // prevent horizontal scroll
                              }}
                            >
                              {allEventRole?.map(item => (
                                <li key={item.roleId || item.classId}>
                                  <div className="dropdown-item">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input my-form-check-input"
                                        type="checkbox"
                                        checked={roleNameStore.includes(item.roleName)}
                                        onChange={() => handleRoleSelection(item.roleName)}
                                        id={`event-role-${item.roleId || item.classId}`}
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor={`event-role-${item.roleId || item.classId}`}
                                      >
                                        {item.roleName}
                                      </label>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>

                          </div>
                        </div>
                      </div>

                      {/* Class for  */}
                      <div className="mb-3">
                        <label htmlFor="classDropdown" className="form-label mb-1 label-text-color focus heading-14">
                          Class
                        </label>
                        <div className="dropdown">
                          <button
                            className="form-select form-select-sm form-focus label-color dropdown-toggle"
                            type="button"
                            id="classDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {selectedClassIds.length === classData?.length
                              ? "All "
                              : selectedClassIds?.length > 0
                                ? selectedClassIds?.map(id => {
                                  const classItem = classData.find(item => item.classId === id);
                                  return classItem ? classItem.classNo : "";
                                }).join(", ")
                                : "--Choose--"}
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="classDropdown" style={{ width: '90%', }}>
                            <li key="all">
                              <div className="dropdown-item">
                                <div className="form-check">
                                  <input
                                    className="form-check-input my-form-check-input"
                                    type="checkbox"
                                    checked={selectedClassIds.length === classData?.length}
                                    onChange={() => handleClassSelection("All")}
                                    id="class-all"
                                  />
                                  <label className="form-check-label" htmlFor="class-all">
                                    All Classes
                                  </label>
                                </div>
                              </div>
                            </li>

                            {/* Individual class options */}
                            {classData?.map(item => (
                              <li key={item.classId}>
                                <div className="dropdown-item">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input my-form-check-input"
                                      type="checkbox"
                                      checked={selectedClassIds.includes(item.classId)}
                                      onChange={() => handleClassSelection(item.classId)}
                                      id={`class-${item.classId}`}
                                    />
                                    <label className="form-check-label" htmlFor={`class-${item.classId}`}>
                                      {item.classNo}
                                    </label>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {/* <small className="text-muted">* You can Select multiple classes.</small> */}
                    </div>

                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Description</label>
                      <textarea class="form-control heading-14 px-3" id="exampleFormControlTextarea1" rows="5" onChange={(e) => handleDescription(e.target.value)} placeholder='Enter Event Description'>
                      </textarea>
                      {errors.putemail && <span style={{ color: 'red' }}>{errors.putemail}</span>}
                    </div>
                    <div className='pt-1'>
                      {isValidDescriptionRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Description is required
                        </p>
                      )}
                    </div>



                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label htmlFor="eventFile" className="form-label heading-14">Upload File</label>
                      <input
                        type="file"
                        className="form-control form-focus label-color heading-14"
                        id="eventFile"
                        onChange={(e) => setEventFile(e.target.files[0])}
                      />
                    </div>

                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label htmlFor="eventFile" className="form-label heading-14">Upload Image</label>
                      <input
                        type="file"
                        className="form-control form-focus label-color heading-14"
                        id="eventFile"
                        onChange={(e) => setEventImage(e.target.files[0])}
                      />
                    </div>
                    {/* Status Dropdown */}
                    <div className="mb-1">
                      <label for="exampleFormControlInput1" className="form-label label-color heading-16" style={{ color: "#000000" }}>Status</label>
                      <select class="form-select  form-select-sm form-focus  " value={eventStatus} onChange={(e) => setEventStatus(e.target.value)} aria-label="Default select example">
                        <option >--Select--</option>
                        <option value="UPCOMING">Upcoming</option>
                        <option value="CLOSED">Closed</option>
                        <option value="ONGOING">Ongoing</option>
                      </select>
                    </div>
                    <div className='my-button11'>
                      <button type="button" className="btn btn-outline-success my-button112233" onClick={(e) => MyEventPostApi()}>Add Events</button>
                      <button type="button" className="btn btn-outline-success" data-bs-dismiss="offcanvas" aria-label="Close" onClick={ClearAndCancelHandle}>Cancel</button>
                      <Toaster />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }

        {/* ################## Off Canvas Area ####################  */}

        {
          show && (
            <>
              <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop1212" aria-labelledby="staticBackdropLabel" ref={offcanvasRef22}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Event</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Event Name</label>
                      <input type="text" className="form-control form-focus   heading-14" onChange={(e) => handleName(e.target.value)} value={eventName} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Event Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidNameRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Event name is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Start Date</label>
                      <input type="date" className="form-control form-focus   heading-14" onChange={(e) => handleDate(e.target.value)} value={startDate} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="19 Mar 2024" />
                    </div>
                    <div className='pt-1'>
                      {isValidDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Start Time</label>
                      <input type="text" className="form-control form-focus   heading-14" onChange={(e) => handleTime(e.target.value)} value={startTime} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="9:30   AM" />
                    </div>
                    <div className='pt-1'>
                      {isValidTimeRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Time is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">End Date</label>
                      <input type="date" className="form-control form-focus   heading-14" onChange={(e) => handleEndDate(e.target.value)} value={endDate} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Book Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidEndDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          End date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">End Time</label>
                      <input type="text" className="form-control form-focus   heading-14" onChange={(e) => handleEndTime(e.target.value)} value={endTime} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="9:30   AM" />
                    </div>
                    <div className='pt-1'>
                      {isValidEndTimeRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          End time is required
                        </p>
                      )}
                    </div>


                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      {/* Event for */}
                      <div className="mb-3" style={{ marginTop: '-4px' }}>
                        <div className="mb-3">
                          <label htmlFor="eventForDropdown" className="form-label mb-1 label-text-color focus heading-14">
                            Event For
                          </label>
                          <div className="dropdown">
                            <button
                              className="form-select form-select-sm form-focus label-color dropdown-toggle"
                              type="button"
                              id="eventForDropdown"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {roleNameStore.length === 0
                                ? '--Choose--'
                                : roleNameStore.includes('All')
                                  ? 'All'
                                  : roleNameStore.join(', ')}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="eventForDropdown" style={{ width: '90%' }}>
                              {allEventRole?.map(item => (
                                <li key={item.roleId || item.classId}>
                                  <div className="dropdown-item">
                                    <div className="form-check">
                                      <input
                                        className="form-check-input my-form-check-input"
                                        type="checkbox"
                                        checked={roleNameStore.includes(item.roleName)}
                                        onChange={() => handleRoleSelection(item.roleName)}
                                        id={`event-role-${item.roleId || item.classId}`}
                                      />
                                      <label className="form-check-label" htmlFor={`event-role-${item.roleId || item.classId}`}>
                                        {item.roleName}
                                      </label>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* Class for  */}
                      <div className="mb-3">
                        <label htmlFor="classDropdown" className="form-label mb-1 label-text-color focus heading-14">
                          Class
                        </label>
                        <div className="dropdown">
                          <button
                            className="form-select form-select-sm form-focus label-color dropdown-toggle"
                            type="button"
                            id="eventClassDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >

                            {selectedClassIds.length === 0
                              ? '--Choose--'
                              : selectedClassIds.includes('')
                                ? 'All'
                                : selectedClassNos.join(', ')}
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="classDropdown" style={{ width: '90%' }}>
                            {/* "All" checkbox - doesn't add to array, just controls selection */}
                            <li key="all">
                              <div className="dropdown-item">
                                <div className="form-check">
                                  <input
                                    className="form-check-input my-form-check-input"
                                    type="checkbox"
                                    checked={selectedClassIds.length === classData?.length}
                                    onChange={() => handleClassSelection("All")}
                                    id="class-all"
                                  />
                                  <label className="form-check-label" htmlFor="class-all">
                                    All Classes
                                  </label>
                                </div>
                              </div>
                            </li>

                            {/* Individual class options */}
                            {classData?.map(item => (
                              <li key={item.classId}>
                                <div className="dropdown-item">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input my-form-check-input"
                                      type="checkbox"
                                      checked={selectedClassIds.includes(item.classId)}
                                      onChange={() => handleClassSelection(item.classId)}
                                      id={`class-${item.classId}`}
                                    />
                                    <label className="form-check-label" htmlFor={`class-${item.classId}`}>
                                      {item.classNo}
                                    </label>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/*Description */}
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Description</label>
                      <textarea class="form-control heading-14 px-2" id="exampleFormControlTextarea1" rows="5" value={eventDescription} onChange={(e) => handleDescription(e.target.value)} placeholder='Enter Event Description'>
                      </textarea>
                      {errors.putemail && <span style={{ color: 'red' }}>{errors.putemail}</span>}
                    </div>

                    <div className='pt-1'>
                      {isValidDescriptionRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Description is required
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
                                <label for="exampleFormControlInput1" className="form-label heading-14 label-color">Upload Image </label>
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
                    <div className='row pe-1 '>
                      <div className='col-lg-12 col-md-12 col-sm-12 pe-0'>
                        {
                          updateStatus2 === "success"
                            ?
                            <div class="mb-3 " style={{ display: 'flex', }}>
                              <div className='w-100'>
                                <label for="exampleFormControlInput1" className="form-label heading-14 label-color">Upload File </label>
                                {
                                  manageButton2 ?
                                    <input type="file" class="form-control" id="exampleFormControlInput1" onChange={handleFileChange2} placeholder="select file" accept='.jpg, .png, .jpeg' />
                                    :
                                    <input type="text" class="form-control" id="exampleFormControlInput1" value={coverPage2} placeholder="name@example.com" />
                                }
                              </div>
                              <div style={{ margin: 'auto', paddingTop: '30px', paddingLeft: '5px' }}>
                                {
                                  manageButton2 ? (
                                    <button type="button" class="btn btn-outline-success my-green heading-14 " onClick={buttManage2} >View </button>
                                  )
                                    :
                                    (
                                      <button type="button" class="btn btn-outline-success my-green heading-14 " onClick={buttManage2}>Edit</button>
                                    )
                                }
                              </div>
                            </div>
                            :
                            <div className="mb-3  for-media-margin">
                              <label for="exampleFormControlInput1" className="form-label heading-14 label-color">User Image <span style={{ color: 'red' }}>*</span></label>
                              <input type="file" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={handleFileChange2} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Doe" />
                            </div>
                        }
                      </div>
                    </div>

                    <div className="mb-1">
                      <label for="exampleFormControlInput1" className="form-label label-color heading-16" style={{ color: "#000000" }}>Status</label>
                      <select class="form-select  form-select-sm form-focus  " value={eventStatus} onChange={(e) => setEventStatus(e.target.value)} aria-label="Default select example">
                        <option >--Select--</option>
                        <option value="UPCOMING">Upcoming</option>
                        <option value="CLOSED">Closed</option>
                        <option value="ONGOING">Ongoing</option>
                      </select>
                    </div>

                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success my-button112233" onClick={(e) => MyEventPutApi(eventIdForUpdate)}>Update</button>
                      <button type="button" className="btn btn-outline-success" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      {/* <Toaster /> */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }

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
                        <button type="button" className="btn  my-btn button00" disabled={forDelete ? false : true} onClick={handleForDelete} >Delete</button>
                        <button type="button" className="btn cancel-btn ms-2" data-bs-dismiss="offcanvas" aria-label="Close" onClick={clearHandler}>Cancel</button>
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
    </Container >
  )
}

export default Event
