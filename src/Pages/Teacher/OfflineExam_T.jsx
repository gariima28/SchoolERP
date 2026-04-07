import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import HashLoader from 'src/Pages/HashLoaderCom';

import { addNewExamScheduleApi } from 'src/Utils/Apis'
import { TeacherClassGetApi } from 'src/Utils/Apis'
import { SubjectByClassIdInSyllabusGetAllApi } from 'src/Utils/Apis'
import { TeacherExamTermGetAll } from 'src/Utils/Apis'
import { TeacherClassRoomGetApi } from 'src/Utils/Apis'
import { TeacherSectionRoomByIdGetApi } from 'src/Utils/Apis'
import { getAllExamScheduleApiForTeacher } from 'src/Utils/Apis'
// import { addNewExamScheduleApi } from 'src/Utils/Apis'
import { deleteExamScheduleApi } from 'src/Utils/Apis'
import { getExamScheduleDataByIdApi } from 'src/Utils/Apis'
import { updateExamScheduleApi } from 'src/Utils/Apis'

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
/* .my-form-check-input:checked{
  background-color: #008479 !important;
  border-color: #008479 !important;
} 
.my-form-check-input2:checked{
  background-color: #B50000;
  border-color: #B50000;
}  */
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
@media only screen and (max-width: 610px) {

  .search-responsive22{
    display: flex;
    flex-direction: column;
  }

}


@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
@media only screen and (max-width: 1210px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
`;

// ## style css area end ####  

const OfflineExam_T = () => {
    const [loader, setLoader] = useState(false)
    const [editshow, setEditshow] = useState(true)
    const [edithide, setEdithide] = useState(false)
    const [showdelete, setShowdelete] = useState(true)
    const [hidedelete, setHidedelete] = useState(false)
    const [forDelete, setForDelete] = useState(false)
    const [show, setShow] = useState(true)
    const [show2, setShow2] = useState(true)
    const [hide, setHide] = useState(false)
    const [IdForDelete, setIdForDelete] = useState()
    const [IdForUpdate, setIdForUpdate] = useState()
    const [examAllData, setExamAllData] = useState([])
    const [section, setSection] = useState('')

    const [classNoForApi, setClassNoForApi] = useState('')
    const [date, setDate] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [totalMarks, setTotalMarks] = useState()
    const [passingMarks, setPassingMarks] = useState('')
    const [classRoomId, setClassRoomId] = useState()
    const [ExamTerm, setExamTerm] = useState()
    const [sectionName, setSectionName] = useState('')
    const [subjectId, setSubjectId] = useState()
    const [classdata, setClassdata] = useState([])
    const [sectionData, setSectionData] = useState([])
    const [subjectData, setSubjectData] = useState([])
    const [examTermData, setExamTermData] = useState([])
    const [sessionAllData, setSessionAllData] = useState([])
    const [classroomdata, setClassroomdata] = useState([])
    const [practicalShow, setPracticalShow] = useState(false)
    // console.log('value by iddd api', practicalShow)

    const [theoryMarks, setTheoryMarks] = useState('')
    const [practicalDate, setPracticalDate] = useState('')
    const [practicalStartTime, setPracticalStartTime] = useState('')
    const [practicalEndTime, setPracticalEndTime] = useState('')
    const [practicalMrks, setPracticalMrks] = useState('')
    const [practicalPassPassingMarks, setPracticalPassPassingMarks] = useState('')

    const [isValidDateValiRequired, setIsValidDateValiRequired] = useState(false);
    const [isValidMarksValiRequired, setIsValidMarksValiRequired] = useState(false);
    const [isValidPassingMarksValiRequired, setIsValidPassingMarksValiRequired] = useState(false);
    const [isValidStartTimeValiRequired, setIsValidStartTimeValiRequired] = useState(false);
    const [isValidEndTimeValiRequired, setIsValidEndTimeValiRequired] = useState(false);

    const [isValidPracticalDateRequired, setIsValidPracticalDateRequired] = useState(false);
    const [isValidPracticalStartTimeRequired, setIsValidPracticalStartTimeRequired] = useState(false);
    const [isValidPracticalEndTimeRequired, setIsValidPracticalEndTimeRequired] = useState(false);
    const [isValidPracticalMarksRequired, setIsValidPracticalMarksRequired] = useState(false);
    const [isValidPracticalPassingMarksRequired, setIsValidPracticalPassingMarksRequired] = useState(false);


    const [classNo, setClassNo] = useState('')
    const [classId, setClassId] = useState('')


    const [searchKey, setSearchKey] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1);
    };
    useEffect(() => {
        MyExamTerm()
        UpdatClassGetApi()
        ClassRoomGetAllApi()
    }, [classId, pageNo, classNoForApi])

    useEffect(() => {
        MySectionGetApi()
        if (classNo) {
            MySubjectByClassIdGetApi()
        }
        MySubjectByClassIdGetApi()
    }, [classId, classNo])
    useEffect(() => {
        MyExamGetAllApi()
    }, [])
    const Handle = (e) => {
        const value = e.target.value;
        const [val1, val2] = value.split(',').map(item => item.trim());
        setClassId(parseInt(val1));
        setClassNo(val2);
    };
    const [errors, setErrors] = useState({});
    // ###### validation ##########

    const FuncValidation = () => {
        let isValid = true;
        // marks 
        if (!totalMarks || totalMarks === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=-]+$/.test(totalMarks)) {
            setIsValidMarksValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // passing marks 
        if (!passingMarks || passingMarks === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=-]+$/.test(passingMarks)) {
            setIsValidPassingMarksValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // date
        if (!date || date === "" || !/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(date)) {
            setIsValidDateValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // start itme
        if (!startTime || startTime === "" || !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(startTime)) {
            setIsValidStartTimeValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
            setIsValidStartTimeValiRequired(false)
        }
        // end itme
        if (!endTime || endTime === "" || !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(endTime)) {
            setIsValidEndTimeValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
            setIsValidEndTimeValiRequired(false)
        }
        return isValid;
    }

    const FuncValidation2 = () => {
        let isValid = true;
        // marks 
        if (!totalMarks || totalMarks === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=-]+$/.test(totalMarks)) {
            setIsValidMarksValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // passing marks 
        if (!passingMarks || passingMarks === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=-]+$/.test(passingMarks)) {
            setIsValidPassingMarksValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // date
        if (!date || date === "" || !/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(date)) {
            setIsValidDateValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // // start itme
        if (!startTime || startTime === "" || !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(startTime)) {
            setIsValidStartTimeValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
            setIsValidStartTimeValiRequired(false)
        }
        // end itme
        if (!endTime || endTime === "" || !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(endTime)) {
            setIsValidEndTimeValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
            setIsValidEndTimeValiRequired(false)
        }
        // practical date
        if (!practicalDate || practicalDate === "" || !/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(practicalDate)) {
            setIsValidPracticalDateRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // practical start itme
        if (!practicalStartTime || practicalStartTime === "" || !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(practicalStartTime)) {
            setIsValidPracticalStartTimeRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
            setIsValidPracticalStartTimeRequired(false)
        }
        // practical end itme
        if (!practicalEndTime || practicalEndTime === "" || !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(practicalEndTime)) {
            setIsValidPracticalEndTimeRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
            setIsValidPracticalEndTimeRequired(false)
        }
        // practical marks 
        if (!practicalMrks || practicalMrks === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=-]+$/.test(practicalMrks)) {
            setIsValidPracticalMarksRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // practical passing marks 
        if (!practicalMrks || practicalMrks === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=-]+$/.test(practicalMrks)) {
            setIsValidPracticalPassingMarksRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        return isValid;
    }
    // passing marks 
    const handlePassingMarks = (e2) => {
        setPassingMarks(e2);
        const noRegex = /^[a-zA-Z0-9!@#$%^&*()_+=-]+$/;
        setIsValidPassingMarksValiRequired(noRegex.test(e2));
        if (!e2 || e2 === "" || !noRegex.test(e2)) {
            setIsValidPassingMarksValiRequired(true)
        } else {
            setIsValidPassingMarksValiRequired(false)
        }
    }
    // marks 
    const handleMarks = (e2) => {
        setTotalMarks(e2);
        const noRegex = /^[a-zA-Z0-9!@#$%^&*()_+=-]+$/;
        setIsValidMarksValiRequired(noRegex.test(e2));
        if (!e2 || e2 === "" || !noRegex.test(e2)) {
            setIsValidMarksValiRequired(true)
        } else {
            setIsValidMarksValiRequired(false)
        }
    }
    // date 
    const handleDate = (e2) => {
        setDate(e2);
        const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        setIsValidDateValiRequired(dateRegex.test(e2));

        if (!e2 || e2 === "" || !dateRegex.test(e2)) {
            setIsValidDateValiRequired(true)
        } else {
            setIsValidDateValiRequired(false)
        }
    }
    // Practical date 
    const handleDate2 = (e2) => {
        setPracticalDate(e2);
        const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        setIsValidPracticalDateRequired(dateRegex.test(e2));

        if (!e2 || e2 === "" || !dateRegex.test(e2)) {
            setIsValidPracticalDateRequired(true)
        } else {
            setIsValidPracticalDateRequired(false)
        }
    }
    // start time 
    const handleStartTime = (e2) => {
        setStartTime(e2);
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

        // const dateRegex = /^[0-2][0-3]:[0-5][0-9]$/;
        setIsValidStartTimeValiRequired(timeRegex.test(e2));

        if (!e2 || e2 === "" || !timeRegex.test(e2)) {
            setIsValidStartTimeValiRequired(true)
        } else {
            setIsValidStartTimeValiRequired(false)
        }
    }
    // end time 
    const handleEndTime = (e2) => {
        setEndTime(e2);
        const dateRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        setIsValidEndTimeValiRequired(dateRegex.test(e2));

        if (!e2 || e2 === "" || !dateRegex.test(e2)) {
            setIsValidEndTimeValiRequired(true)
        } else {
            setIsValidEndTimeValiRequired(false)
        }
    }
    // Get All Api from class list page for id 
    const UpdatClassGetApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherClassGetApi();
            // console.log('class-get-all-api in  offline', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.classes?.message)
                setClassdata(response?.data?.data)
                setLoader(false)
            } else {
                toast.error(response?.data?.classes?.message);
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            // console.log(error)
        }
    }
    // Subject by class id From class get all api 
    const MySubjectByClassIdGetApi = async () => {
        setLoader(true)
        try {
            const response = await SubjectByClassIdInSyllabusGetAllApi(classNo);
            console.log('Subject-get-all-api in offline', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.classes?.message)
                setSubjectData(response?.data?.subjects)
                setLoader(false)
            } else {
                // toast.error(response?.data?.classes?.message);
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            // console.log(error)
        }
    }
    // ClassRomm Get All Api 
    const ClassRoomGetAllApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherClassRoomGetApi();
            if (response?.status === 200) {
                // toast.success(response?.data?.message)
                setClassroomdata(response?.data?.rooms)
                // setDeleteroomid(response?.data?.rooms?.roomId)
                setLoader(false)
            } else {
                toast.error(response?.data?.message);
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            // console.log(error)
        }
    }
    // Section Get All Api from section page for id 
    const MySectionGetApi = async (id) => {
        setLoader(true)
        try {
            const response = await TeacherSectionRoomByIdGetApi(classId);
            console.log('SECTION-get-all-api in offline paper', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.message)
                setSectionData(response?.data?.allSections)
                setLoader(false)
            } else {
                toast.error(response?.data?.message);
                setLoader(false)
            }
        } catch (error) {
            setloaderState(false);
            setLoader(false)
            // console.log(error)
        }
    }
    // Exam category 
    const MyExamTerm = async () => {
        setLoader(true)
        try {
            const response = await TeacherExamTermGetAll(searchKey);
            if (response?.status === 200) {
                setExamTermData(response?.data?.data)
                setLoader(false)
            } else {
                toast.error(response?.data?.message);
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            // console.log(error)
        }
    }
    // ----------------------------------------- 

    const offcanvasRef = useRef(null);
    const offcanvasRef22 = useRef(null);
    const offcanvasRef33 = useRef(null);

    // Post api 
    const MyMarksPostApi = async () => {
        if (FuncValidation()) {
            const formData = new FormData()
            formData.append('examTermId', ExamTerm);
            formData.append('classNo', classNo);
            formData.append('section', sectionName);
            formData.append('subject', subjectId);
            formData.append('roomNo', classRoomId);
            formData.append('totalMarks', totalMarks);
            formData.append('date', date);
            formData.append('startingTime', startTime);
            formData.append('endingTime', endTime);
            formData.append('passingMarks', passingMarks);

            formData.append('isPractical', practicalShow);
            formData.append('practicalDate', practicalDate);
            formData.append('practicalStartTime', practicalStartTime);
            formData.append('practicalEndTime', practicalEndTime);
            formData.append('practicalMarks', practicalMrks);
            formData.append('practicalPassMarks', practicalPassPassingMarks);
            setLoader(true)
            try {
                const response = await addNewExamScheduleApi(formData);
                // console.log('Post api in exam', response)
                if (response?.status === 200) {
                    if (response?.data?.status === "success") {
                        toast.success(response?.data?.message);
                        setShow(false)
                        MyExamGetAllApi()
                        setLoader(false)
                        setExamTerm('')
                        setClassId('')
                        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
                        offcanvasInstance.hide();
                        setTimeout(() => {
                            setShow(true)
                        }, 0.5)
                        setSubjectId('')
                        setClassRoomId('')
                        setDate('')
                        setStartTime('')
                        setEndTime('')
                        setMarks('')
                        setPassingMarks('')
                        setPracticalDate('')
                        setPracticalStartTime('')
                        setPracticalEndTime('')
                        setPracticalMrks('')
                        setPracticalPassPassingMarks('')
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
                setLoader(false)
                // console.log(error)
            }
        }

    }
    // Exam Get All Api   
    const MyExamGetAllApi = async () => {
        setLoader(true)
        try {
            const response = await getAllExamScheduleApiForTeacher(searchKey, pageNo, pageSize, classNo, sectionName);
            if (response?.status === 200) {
                setExamAllData(response?.data?.examSchedules)
                setCurrentPage(response?.data?.currentPage);
                setTotalPages(response?.data?.totalPages);
                setLoader(false)
            } else {
                toast.error(response?.data?.message);
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
            // console.log(error)
        }
    }
    // Delete api
    const MyOfflineExamDeleApi = async (id) => {
        setLoader(true)
        try {
            const response = await deleteExamScheduleApi(id);
            // console.log('my-delete-api in assign leave', response)
            if (response?.status === 200) {
                toast.success(response?.data?.message);
                MyExamGetAllApi()
                setShowdelete(false)
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
            setLoader(false)
            // console.log(error)
        }
    }

    // Get by id 
    const MyAssignLeaveGetByIdApi = async (id) => {
        // console.log('my idddd newwwww', id)
        setIdForUpdate(id)
        setLoader(true)
        try {
            const response = await getExamScheduleDataByIdApi(id);
            console.log('exam get by id all data-------', response)
            if (response?.status === 200) {
                // toast.success(response?.data?.msg);
                setPracticalShow(response?.data?.examSchedule?.isPractical)

                setExamTerm(response?.data?.examSchedule?.examTermId)
                setClassId(response?.data?.examSchedule?.classId)
                setPracticalDate(response?.data?.examSchedule?.practicalDate)
                setPracticalStartTime(response?.data?.examSchedule?.practicalStartTime)
                setPracticalEndTime(response?.data?.examSchedule?.practicalEndTime)
                setPracticalMrks(response?.data?.examSchedule?.practicalMarks)
                setPracticalPassPassingMarks(response?.data?.examSchedule?.practicalPassMarks)

                setClassNo(String(response?.data?.examSchedule?.classNo))
                setSectionName(response?.data?.examSchedule?.section)
                setPassingMarks(response?.data?.examSchedule?.passingMarks)
                setClassNoForApi(response?.data?.examSchedule?.classNo)
                setTotalMarks(response?.data?.examSchedule?.totalMarks)
                setSubjectId(response?.data?.examSchedule?.subject)
                setClassRoomId(response?.data?.examSchedule?.roomNumber)
                setDate(response?.data?.examSchedule?.date)
                setStartTime(response?.data?.examSchedule?.startingTime)
                setEndTime(response?.data?.examSchedule?.endingTime)
                setMarks(response?.data?.examSchedule?.totalMarks)
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
    // Put Api 
    const MyOfflinePutApi = async () => {
        // if (FuncValidation2()) {

        // }
        const formData = new FormData()
        formData.append('examTermId', ExamTerm);
        formData.append('classNo', classNo);
        formData.append('section', sectionName);
        formData.append('subject', subjectId);
        formData.append('roomNo', classRoomId);
        formData.append('totalMarks', totalMarks);
        formData.append('date', date);
        formData.append('startingTime', startTime);
        formData.append('endingTime', endTime);
        formData.append('passingMarks', passingMarks);

        formData.append('isPractical', practicalShow);
        formData.append('practicalDate', practicalDate);
        formData.append('practicalStartTime', practicalStartTime);
        formData.append('practicalEndTime', practicalEndTime);
        formData.append('practicalMarks', practicalMrks);
        formData.append('practicalPassMarks', practicalPassPassingMarks);
        try {
            const response = await updateExamScheduleApi(IdForUpdate, formData);
            console.log('My_offline_Api', response)
            if (response?.status === 200) {

                if (response?.data?.status === "success") {
                    toast.success(response?.data?.message);
                    setShow2(false)
                    MyExamGetAllApi()
                    ClearData()
                    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
                    offcanvasInstance.hide();
                    setTimeout(() => {
                        setShow2(true)
                    }, 0.5)
                }
            }
            else {
                toast.error(response?.data?.message);
                setEditshow(true)
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
    const ClearData = () => {
        setExamTerm('')
        setClassId('')
        setClassNo('')
        setSubjectId('')
        setSectionName('')
        setClassRoomId('')
        setDate('')
        setStartTime('')
        setEndTime('')
        setClassNoForApi('')
        setPracticalDate('')
        setPracticalStartTime('')
        setPracticalEndTime('')
        setPracticalMrks('')
        setPracticalShow(false)
        setPracticalPassPassingMarks('')
        setIsValidDateValiRequired(false)
        setIsValidStartTimeValiRequired(false)
        setIsValidEndTimeValiRequired(false)
        setIsValidMarksValiRequired(false)
        setTotalMarks('')
        setPassingMarks('')
        // setTimeout(() => {
        //     setExamAllData()
        // }, 0.5)

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
                                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Exam Category</li>
                                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Offline Exam </Link></li>
                            </ol>
                        </nav>
                    </div>

                    <div className='d-flex g-1 for-media-query'>

                        <div>

                        </div>
                        <div className='d-flex search-responsive22'>
                            <div className='me-2 search-responsive'>
                                <div className="input-group mb-3 search-responsive">
                                    <input type="text" className="form-control form-focus font-color" style={{ height: '34px' }} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange} value={searchKey} />
                                    <span className="input-group-text button-bg-color button-color heading-14 font-color " style={{ cursor: 'pointer', height: "34px" }} id="basic-addon2" onClick={MyExamGetAllApi}>Search</span>
                                </div>
                            </div>
                            <div><Link type="button" className="btn btn-success heading-16 my-own-button me-3" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" onClick={ClearData}>+ ADD Exam</Link>
                            </div>
                        </div>

                    </div>

                </div>
                <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-22px' }}>Offline Exam</h5>

                <div className="main-content-conatainer pt-1 ">

                    <div className="row p-3">
                        <div className="col-lg-6 col-md-6 col-sm-12 ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Class</label>
                                <select class="form-select  form-select-sm form-focus label-color"
                                    value={`${classId},${classNo}`}
                                    onChange={Handle}
                                    aria-label="Default select example">
                                    <option value="">--Choose--</option>
                                    {
                                        classdata?.map((item =>
                                            <option key={item.classId} value={`${item.classId},${item.classNo}`}>{item.classNo}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Section</label>
                                <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => setSectionName(e.target.value)} aria-label="Default select example">
                                    <option value="" >--Choose--</option>
                                    {
                                        sectionData?.map(item =>
                                            <option value={item.sectionName}>{item.sectionName}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* ####### buttons ######  */}
                    <div className="row mb-3 buttons-topss">
                        <div className='my-button11 heading-16'>
                            <button type="button" class="btn btn-outline-success my-green" style={{ backgroundColor: '#008479', color: '#fff' }} onClick={MyExamGetAllApi} disabled={!(classId && sectionName)}>Search</button>
                            <button type="button" class="btn cancelButtons text-black" onClick={ClearData}>Cancel</button>
                        </div>
                    </div>
                    {/* ###### copy content till here for all component ######  */}

                    <div className="table-container px-3 table-responsive">
                        <table className="table table-sm table-striped">
                            <thead className=''>
                                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                                    <th className='no-wrap'>#</th>
                                    <th className='no-wrap'>Exam Category</th>
                                    <th className='no-wrap'>Room Number</th>
                                    <th className='no-wrap'>Subject</th>
                                    <th className='no-wrap'>Theory Date</th>
                                    <th className='no-wrap'>Theory Starting Time</th>
                                    <th className='no-wrap'>Theory Ending Time</th>
                                    <th className='no-wrap'>Theory Passing Marks</th>
                                    <th className='no-wrap'>Theory Total Marks</th>
                                    <th className='no-wrap'>Practical Date</th>
                                    <th className='no-wrap'>Practical Start Time</th>
                                    <th className='no-wrap'>Practical End Time</th>
                                    <th className='no-wrap'>Practical Pass Marks</th>
                                    <th className='no-wrap'>Practical Total Marks</th>
                                    <th className='no-wrap'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='heading-14 align-middle greyTextColor'>
                                {
                                    examAllData?.map((item, index) => (
                                        <tr className='heading-14' key={index}>
                                            <td className=' greyText pe-0 no-wrap'>{index + 1 + (currentPage - 1) * pageSize}</td>
                                            <td className=' greyText pe-0 no-wrap'>{item.examTermName ? item.examTermName : 'N/A'}</td>
                                            <td className=' greyText pe-0 no-wrap'>{item.roomNumber ? item.roomNumber : 'N/A'}</td>
                                            <td className=' greyText pe-0 no-wrap'>{item.subject ? item.subject : 'N/A'}</td>
                                            <td className=' greyText pe-0 no-wrap'>{item.date ? item.date : 'N/A'}</td>
                                            <td className=' greyText pe-0 no-wrap'>{item.startingTime ? item.startingTime : 'N/A'}</td>
                                            <td className=' greyText pe-0 no-wrap'>{item.endingTime ? item.endingTime : 'N/A'}</td>
                                            <td className=' greyText pe-0 no-wrap' >{item.passingMarks ? item.passingMarks : 'N/A'}</td>
                                            <td className=' greyText pe-0 no-wrap' >{item.totalMarks ? item.totalMarks : 'N/A'}</td>
                                            <td className=' greyText pe-0 no-wrap' >{item.practicalDate ? item.practicalDate : 'N/A'}</td>
                                            <td className=' greyText pe-0 no-wrap' >{item.practicalStartTime ? item.practicalStartTime : 'N/A'}</td>
                                            <td className=' greyText pe-0 no-wrap' >{item.practicalEndTime ? item.practicalEndTime : 'N/A'}</td>
                                            <td className=' greyText pe-0 no-wrap' >{item.practicalPassMarks ? item.practicalPassMarks : 'N/A'}</td>
                                            <td className=' greyText pe-0 no-wrap' >{item.practicalMarks ? item.practicalMarks : 'N/A'}</td>
                                            <td className=' greyText  pe-0 no-wrap' >
                                                <div className="dropdown my-button-show">
                                                    <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Action  &nbsp;
                                                        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                                                            <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                                                        </svg>
                                                    </button>
                                                    <ul className="dropdown-menu anchor-color heading-14">
                                                        <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop101" aria-controls="staticBackdrop" onClick={() => MyAssignLeaveGetByIdApi(item.id)} >Edit</Link></li>
                                                        <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="staticBackdrop" onClick={() => setIdForDelete(item.id)}>Delete</Link></li>
                                                        {/* <Toaster /> */}
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
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
                </div>
                {/* ################## Add Off Canvas Area ####################  */}

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
                                    <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Create Exam</h5>
                                </div>
                                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                                <div class="offcanvas-body pt-0">
                                    <div className="input " >

                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label heading-14">Exam Name</label>
                                            <select class="form-select  form-select-sm form-focus  label-color" value={ExamTerm} onChange={(e) => setExamTerm(e.target.value)} aria-label="Default select example">
                                                <option value={''}>--Chosse--</option>
                                                {
                                                    examTermData?.map(item =>
                                                        <option value={item.examTermId}>{item.examTermName}</option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label   heading-14">Class</label>
                                            <select class="form-select  form-select-sm form-focus label-color"
                                                value={`${classId},${classNo}`}
                                                onChange={Handle}
                                                aria-label="Default select example">
                                                <option value="">--Choose--</option>
                                                {
                                                    classdata?.map((item =>
                                                        <option key={item.classId} value={`${item.classId},${item.classNo}`}>{item.classNo}</option>
                                                    ))
                                                }
                                            </select>

                                        </div>
                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label heading-16">Section</label>
                                            <select class="form-select  form-select-sm form-focus label-color " value={sectionName} onChange={(e) => setSectionName(e.target.value)} aria-label="Default select example">
                                                <option selected>--Choose--</option>
                                                {
                                                    sectionData?.map((item =>
                                                        <option value={item.sectionName}>{item.sectionName}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label heading-14">Subject</label>
                                            <select class="form-select  form-select-sm form-focus  label-color" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} aria-label="Default select example">
                                                <option selected>--Chosee--</option>
                                                {
                                                    subjectData?.map(item =>
                                                        <option value={item.subjectName}>{item.subjectName}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label heading-14">Class Room</label>
                                            <select class="form-select  form-select-sm form-focus  label-color" value={classRoomId} onChange={(e) => setClassRoomId(e.target.value)} aria-label="Default select example">
                                                <option selected>--Choose--</option>
                                                {
                                                    classroomdata.map(item =>
                                                        <option value={item.roomNo}>{item.roomNo}</option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label  heading-14">Theory Date </label>
                                            <input type="date" className="form-control form-focus label-color  heading-14" value={date} onChange={(e) => handleDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>
                                        <div className=''>
                                            {isValidDateValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    Date is required
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label  heading-14">Theory Start Time</label>
                                            <input type="time" className="form-control form-focus  label-color heading-14" value={startTime} onChange={(e) => handleStartTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>
                                        <div className=''>
                                            {isValidStartTimeValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    Start time is required
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label  heading-14">Theory End Time</label>
                                            <input type="time" className="form-control form-focus label-color  heading-14" value={endTime} onChange={(e) => handleEndTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>
                                        <div className=''>
                                            {isValidEndTimeValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    End time is required
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label heading-14">Theory Total Marks</label>
                                            <input type="text" className="form-control form-focus label-color  heading-14" value={totalMarks} onChange={(e) => handleMarks(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>
                                        <div className=''>
                                            {isValidMarksValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    Total marks is required
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label  heading-14">Theory Pass Marks </label>
                                            <input type="email" className="form-control form-focus label-color heading-14" value={passingMarks} onChange={(e) => handlePassingMarks(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                        </div>
                                        <div className=''>
                                            {isValidPassingMarksValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    Marks is required
                                                </p>
                                            )}
                                        </div>
                                        <hr className='mt-4' />

                                        <div class="form-check">
                                            <input class="form-check-input my-form-check-input" type="checkbox" id="flexCheckDefault" checked={practicalShow} onChange={(e) => setPracticalShow(!practicalShow)} />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                Practical
                                            </label>
                                        </div>
                                        <div className='mt-3'>
                                            <h2 style={{ color: '#008479' }}>Practical Marks</h2>
                                        </div>
                                        {
                                            practicalShow && (
                                                <>
                                                    <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                                        <label for="exampleFormControlInput1" className="form-label  heading-14">Practical Date </label>
                                                        <input type="date" className="form-control form-focus label-color heading-14" value={practicalDate} onChange={(e) => setPracticalDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                                    </div>
                                                    <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                                        <label for="exampleFormControlInput1" className="form-label  heading-14">Practical Start Time </label>
                                                        <input type="time" className="form-control form-focus label-color heading-14" value={practicalStartTime} onChange={(e) => setPracticalStartTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                                    </div>
                                                    <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                                        <label for="exampleFormControlInput1" className="form-label  heading-14">Practical End Time </label>
                                                        <input type="time" className="form-control form-focus label-color heading-14" value={practicalEndTime} onChange={(e) => setPracticalEndTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                                    </div>
                                                    <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                                        <label for="exampleFormControlInput1" className="form-label  heading-14">Practical Marks</label>
                                                        <input type="text" className="form-control form-focus label-color heading-14" value={practicalMrks} onChange={(e) => setPracticalMrks(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                                    </div>
                                                    <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                                        <label for="exampleFormControlInput1" className="form-label  heading-14">Practical Pass Marks</label>
                                                        <input type="text" className="form-control form-focus label-color heading-14" value={practicalPassPassingMarks} onChange={(e) => setPracticalPassPassingMarks(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                                    </div>
                                                </>

                                            )
                                        }
                                        <div className='my-button11 '>
                                            <button type="button" className="btn btn-outline-success my-button112233" onClick={MyMarksPostApi}>Create Exam</button>
                                            <button type="button" className="btn cancelButtons text-black" data-bs-dismiss="offcanvas" aria-label="Close" onClick={ClearData}>Cancel</button>
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
                    show2 && (
                        <>
                            <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop101" aria-labelledby="staticBackdropLabel" ref={offcanvasRef22}>
                                <div className="offcanvas-header">
                                    <Link data-bs-dismiss="offcanvas" onClick={ClearData}>
                                        <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                                        </svg>
                                    </Link>
                                    <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Exam</h5>
                                </div>
                                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                                <div class="offcanvas-body pt-0">
                                    <div className="input " >

                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label heading-14">Exam Name</label>
                                            <select class="form-select  form-select-sm form-focus  label-color" value={ExamTerm} onChange={(e) => setExamTerm(e.target.value)} aria-label="Default select example">
                                                <option value={''}>--Chosse--</option>
                                                {
                                                    examTermData?.map(item =>
                                                        <option value={item.examTermId}>{item.examTermName}</option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label   heading-14">Class</label>
                                            <select class="form-select  form-select-sm form-focus label-color"
                                                value={`${classId},${classNo}`}
                                                onChange={Handle}
                                                aria-label="Default select example">
                                                <option value="">--Choose--</option>
                                                {
                                                    classdata?.map((item =>
                                                        <option key={item.classId} value={`${item.classId},${item.classNo}`}>{item.classNo}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label heading-16">Section</label>
                                            <select class="form-select  form-select-sm form-focus label-color " value={sectionName} onChange={(e) => setSectionName(e.target.value)} aria-label="Default select example">
                                                <option selected>--Choose--</option>
                                                {
                                                    sectionData?.map((item =>
                                                        <option value={item.sectionName}>{item.sectionName}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label heading-14">Subject</label>
                                            <select class="form-select  form-select-sm form-focus  label-color" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} aria-label="Default select example">
                                                <option selected>--Chosee--</option>
                                                {
                                                    subjectData?.map(item =>
                                                        <option value={item.subjectName}>{item.subjectName}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label heading-14">Class Room</label>
                                            <select class="form-select  form-select-sm form-focus  label-color" value={classRoomId} onChange={(e) => setClassRoomId(e.target.value)} aria-label="Default select example">
                                                <option selected>--Choose--</option>
                                                {
                                                    classroomdata.map(item =>
                                                        <option value={item.roomNo}>{item.roomNo}</option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label  heading-14">Theory Date </label>
                                            <input type="date" className="form-control form-focus label-color  heading-14" value={date} onChange={(e) => handleDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>
                                        <div className=''>
                                            {isValidDateValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    Date is required
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label  heading-14">Theory Start Time</label>
                                            <input type="time" className="form-control form-focus  label-color heading-14" value={startTime} onChange={(e) => handleStartTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>
                                        <div className=''>
                                            {isValidStartTimeValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    Start time is required
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label  heading-14">Theory End Time</label>
                                            <input type="time" className="form-control form-focus label-color  heading-14" value={endTime} onChange={(e) => handleEndTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>
                                        <div className=''>
                                            {isValidEndTimeValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    End time is required
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label heading-14">Theory Total Marks</label>
                                            <input type="text" className="form-control form-focus label-color  heading-14" value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>

                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label  heading-14">Theory Pass Marks </label>
                                            <input type="email" className="form-control form-focus label-color heading-14" value={passingMarks} onChange={(e) => handlePassingMarks(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                        </div>
                                        <div className=''>
                                            {isValidPassingMarksValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    Marks is required
                                                </p>
                                            )}
                                        </div>
                                        <hr className='mt-4' />

                                        <div class="form-check">
                                            <input class="form-check-input my-form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={practicalShow} onChange={(e) => setPracticalShow(e.target.checked)} />
                                            <label class="form-check-label" for="flexCheckDefault">
                                                Practical
                                            </label>
                                        </div>
                                        <div className='mt-3'>
                                            <h2 style={{ color: '#008479' }}>Practical Marks</h2>
                                        </div>
                                        {
                                            practicalShow && (
                                                <>
                                                    <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                                        <label for="exampleFormControlInput1" className="form-label  heading-14">Practical Date </label>
                                                        <input type="date" className="form-control form-focus label-color heading-14" value={practicalDate} onChange={(e) => handleDate2(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                                    </div>
                                                    <div className=''>
                                                        {isValidPracticalDateRequired && (
                                                            <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                                Practical date is required
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                                        <label for="exampleFormControlInput1" className="form-label  heading-14">Practical Start Time </label>
                                                        <input type="time" className="form-control form-focus label-color heading-14" value={practicalStartTime} onChange={(e) => setPracticalStartTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                                    </div>
                                                    <div className=''>
                                                        {isValidPracticalStartTimeRequired && (
                                                            <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                                Practical start time is required
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                                        <label for="exampleFormControlInput1" className="form-label  heading-14">Practical End Time </label>
                                                        <input type="time" className="form-control form-focus label-color heading-14" value={practicalEndTime} onChange={(e) => setPracticalEndTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                                    </div>
                                                    <div className=''>
                                                        {isValidPracticalEndTimeRequired && (
                                                            <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                                Practical end time is required
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                                        <label for="exampleFormControlInput1" className="form-label  heading-14">Practical Marks</label>
                                                        <input type="text" className="form-control form-focus label-color heading-14" value={practicalMrks} onChange={(e) => setPracticalMrks(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                                    </div>
                                                    <div className=''>
                                                        {isValidPracticalMarksRequired && (
                                                            <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                                Practical marks is required
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                                        <label for="exampleFormControlInput1" className="form-label  heading-14">Practical Pass Marks</label>
                                                        <input type="text" className="form-control form-focus label-color heading-14" value={practicalPassPassingMarks} onChange={(e) => setPracticalPassPassingMarks(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                                    </div>
                                                    <div className=''>
                                                        {isValidPracticalPassingMarksRequired && (
                                                            <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                                Practical passing marks is required
                                                            </p>
                                                        )}
                                                    </div>
                                                </>
                                            )
                                        }
                                        <div className='my-button11 '>
                                            <button type="button" className="btn btn-outline-success my-button112233" onClick={MyOfflinePutApi}>Update Exam</button>
                                            <button type="button" className="btn cancelButtons text-black" data-bs-dismiss="offcanvas" aria-label="Close" onClick={ClearData}>Cancel</button>
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
                                                <button type="button" className="btn my-btn button00" disabled={forDelete ? false : true} onClick={() => MyOfflineExamDeleApi(IdForDelete)}>Delete</button>
                                                <button type="button" className="btn cancel-btn ms-2" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
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

export default OfflineExam_T
