import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { addNewExamScheduleApi, getAllClassApi, getExamScheduleDataByIdApi, getRoomDataApi, updateExamScheduleApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const Container = styled.div`
    .form-select, .form-control::placeholder, .form-control{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
    }

    .table-striped>tbody>tr:nth-of-type(odd)>* {
        --bs-table-bg-type: var(--tableGreyBackgroundColor);
    }
    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }


`;

const EditExam = ({ EditId, offlineUpdateState }) => {

    const { register, handleSubmit, formState: { errors, isValid }, watch, setValue, reset } = useForm({
        mode: 'onChange'
    });

    const token = localStorage.getItem('token');
    const [allRoomData, setAllRoomData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [allSubjectData, setAllSubjectData] = useState([]);
    const [ExamTermData, setExamTermData] = useState([]);

    const classsId = watch('classId');

    useEffect(() => {
        if (EditId) {
            getExamScheduleDataById(EditId)
        }
        getAllRoomData();
        getAllClassData();
        // getAllExamTermData();

        if (classsId) {
            handleClassChange(classsId);
        }
    }, [token, EditId, classsId])

    const [originalValues, setOriginalValues] = useState({});
    const formValues = watch();

    const getExamScheduleDataById = async (EditId) => {
        try {
            var response = await getExamScheduleDataByIdApi(EditId);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    const fetchedData = response?.data?.examDetails;
                    if (fetchedData) {
                        const formattedData = {
                            examTermId: response?.data?.examDetails?.examTermId,
                            classId: response?.data?.examDetails?.classId,
                            subjectId: response?.data?.examDetails?.subjectId,
                            roomId: response?.data?.examDetails?.roomNumber,
                            date: response?.data?.examDetails?.date,
                            startingTime: response?.data?.examDetails?.startingTime,
                            endingTime: response?.data?.examDetails?.endingTime,
                            totalMarks: response?.data?.examDetails?.totalMarks,
                        }
                        setOriginalValues(formattedData);
                        reset(formattedData);
                    }
                }
            }
            else {
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            setloaderState(false);
        }
        finally {
            setloaderState(false);
        }
    }

    // const getAllExamTermData = async () => {
    //     try {
    //         var response = await getExamTermDataApi('', '', '');
    //         if (response?.status === 200) {
    //             if (response?.data?.status === 'success') {
    //                 setExamTermData(response?.data?.categories);
    //             }
    //         }
    //         else {
    //             // console.log(response?.data?.message);
    //         }
    //     }
    //     catch (error) {
    //         setloaderState(false);
    //         // console.log('Error while fetching exam category data: ', error);
    //     }
    // }

    const getAllClassData = async () => {
        try {
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllClassData(response?.data?.classes);
                }
            }
            else {
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log('Error while fetching class data: ', error);
        }
        finally {
            setloaderState(false);
        }
    }

    const getAllRoomData = async () => {
        try {
            var response = await getRoomDataApi('', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllRoomData(response?.data?.rooms);
                }
            }
            else {
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log('Error while fetching room data: ', error);
        }
        finally {
            setloaderState(false);
        }
    }

    const updateNewExamSchedule = async (data) => {
        try {
            const formData = new FormData();
            formData.append('examTermId', data?.examTermId)
            formData.append('classId', data?.classId)
            formData.append('subjectId', data?.subjectId)
            formData.append('roomId', data?.roomId)
            formData.append('date', data?.date)
            formData.append('startingTime', data?.startingTime)
            formData.append('endingTime', data?.endingTime)
            // formData.append('totalMarks', data?.totalMarks)

            var response = await updateExamScheduleApi(EditId, formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message)
                    offlineUpdateState(true);
                }
                else {
                    toast.error(response?.data?.message)
                }
            }
            else {
                toast.error(response?.data?.message)
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log('Error while adding new data: ', error);
        }
        finally {
            setloaderState(false);
        }
    }

    const handleClassChange = (val) => {
        const classNoVal = parseInt(val);
        setValue('classId', classNoVal);
        const selectedClass = allClassData.find(c => c.classId === classNoVal);

        if (selectedClass) {
            setAllSubjectData(selectedClass.subjects || []);
        } else {
            setAllSubjectData([]);
        }
    };

    const validateDate = (value) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const selectedDate = new Date(value).setHours(0, 0, 0, 0);
        return selectedDate >= today || 'Date cannot be in the past';
    };

    const isFormChanged = () => {
        return JSON.stringify(originalValues) !== JSON.stringify(formValues);
    };

    const handleCancel = () => {
        reset(originalValues); // Revert to original values
    };

    return (
        <>
            <Container>
                <div className="container-fluid ">
                    <div className="row">
                        <form className='p-3' onSubmit={handleSubmit(AddNewExamSchedule)}>
                            <div className="mb-3">
                                <label htmlFor="examTermId" className="form-label font14">Exam Name / Term</label>
                                <select id="examTermId" className={`form-select font14 ${errors.examTermId ? 'border-danger' : ''}`} {...register('examTermId', { required: 'Exam Term selection is required *' })}>
                                    <option value="">-- Select --</option>
                                    {ExamTermData.map((ExamTerm) => (
                                        <option key={ExamTerm.examTermId} value={ExamTerm.examTermId}>{ExamTerm.examTermName}</option>
                                    ))}
                                </select>
                                {errors.examTermId && <p className="font12 text-danger">{errors.examTermId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="classId" className="form-label font14">Class</label>
                                <select id="classId" className={`form-select font14 ${errors.classId ? 'border-danger' : ''}`} {...register('classId', { required: 'Class selection is required *' })} onChange={(e) => handleClassChange(e.target.value)}>
                                    <option value="">-- Select --</option>
                                    {allClassData.map((clas) => (
                                        <option key={clas.classId} value={clas.classId}>{clas.classNo}</option>
                                    ))}
                                </select>
                                {errors.classId && <p className="font12 text-danger">{errors.classId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subjectId" className="form-label font14">Subject</label>
                                <select id="subjectId" className={`form-select font14 ${errors.subjectId ? 'border-danger' : ''}`} {...register('subjectId', { required: 'Subject selection is required *' })}>
                                    <option value="">-- Select --</option>
                                    {allSubjectData.map((subject) => (
                                        <option key={subject.subjectId} value={subject.subjectId}>{subject.subjectName}</option>
                                    ))}
                                </select>
                                {errors.subjectId && <p className="font12 text-danger">{errors.subjectId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomId" className="form-label font14">Class Room</label>
                                <select id="roomId" className={`form-select font14 ${errors.roomId ? 'border-danger' : ''}`} {...register('roomId', { required: 'Room selection is required *' })}>
                                    <option value="">-- Select --</option>
                                    {allRoomData.map((room) => (
                                        <option key={room.roomId} value={room.roomId}>{room.roomNo}</option>
                                    ))}
                                </select>
                                {errors.roomId && <p className="font12 text-danger">{errors.roomId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label font14">Date</label>
                                <input id="date" type="date" className={`form-control font14 ${errors.date ? 'border-danger' : ''}`} {...register('date', { required: 'Date is required *', validate: validateDate })} />
                                {errors.date && <p className="font12 text-danger">{errors.date.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="startingTime" className="form-label font14">Starting Time</label>
                                <input id="startingTime" type="time" className={`form-control font14 ${errors.startingTime ? 'border-danger' : ''}`} {...register('startingTime', { required: 'Starting Time is required *' })} />
                                {errors.startingTime && <p className="font12 text-danger">{errors.startingTime.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="endingTime" className="form-label font14">Ending Time</label>
                                <input id="endingTime" type="time" className={`form-control font14 ${errors.endingTime ? 'border-danger' : ''}`} {...register('endingTime', { required: 'Ending Time is required *' })} />
                                {errors.endingTime && <p className="font12 text-danger">{errors.endingTime.message}</p>}
                            </div>

                            <p className='text-center p-3'>
                                <button className='btn addButtons text-white' type='submit' disabled={!isFormChanged()} >Update Exam</button>
                                <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => handleCancel()}>Cancel</button>
                            </p>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default EditExam
