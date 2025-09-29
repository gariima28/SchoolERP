import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllClassApi, getTeacherBySubjectApi, addNewAssignmentAPI } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const Container = styled.div`
    .form-select, .form-control::placeholder, .form-control {
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
    }

    .form-select.border-danger {
        border-color: #dc3545 !important;
    }

    .table-striped>tbody>tr:nth-of-type(odd)>* {
        --bs-table-bg-type: var(--tableGreyBackgroundColor);
    }

    .correvtSVG {
        position: relative;
        width: fit-content;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .contbtn {
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv {
        background-color: #FBFBFB;
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    .tooltip-container {
        position: relative;
        display: inline-block;
        width: 100%;
    }

    .tooltip-container::before {
        content: attr(data-tooltip);
        position: absolute;
        bottom: -35px;
        right: -15%;
        transform: translateX(-50%);
        background: rgba(135, 135, 135, 0.8);
        color: #fff;
        padding: 5px 8px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.3s, visibility 0.3s;
    }

    .tooltip-container:hover::before {
        visibility: visible;
        opacity: 1;
    }
`;

const AddAssignment = ({ addedSuccess }) => {
    const token = sessionStorage.getItem('token');

    const [allClassData, setAllClassData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);
    const [allSubjectData, setAllSubjectData] = useState([]);
    const [allTeacherData, setAllTeacherData] = useState([]);
    const [classIdSelected, setClassIdSelected] = useState(false);
    const [subjectIdSelected, setSubjectIdSelected] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid }, setValue, watch, reset } = useForm({
        mode: 'onChange'
    });

    const classIdVal = watch('classId');

    useEffect(() => {
        getAllClassData();
    }, [token]);

    const getAllClassData = async () => {
        try {
            const response = await getAllClassApi();
            if (response?.status === 200 && response?.data?.status === 'success') {
                setAllClassData(response?.data?.classes);
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            // setloaderState(false);
        }
    };

    const getAllTeacherData = async (val) => {
        try {
            const response = await getTeacherBySubjectApi(classIdVal, val);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setAllTeacherData(response?.data?.teacher);
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            // setloaderState(false);
        }
    };

    const handleSubjectChange = (value) => {
        const SubjectId = parseInt(value);
        setValue('subjectId', SubjectId);
        setSubjectIdSelected(true);
        getAllTeacherData(SubjectId);
    };

    const handleClassChange = (value) => {
        const classIdValue = parseInt(value);
        setValue('classId', classIdValue);
        setValue('sectionId', '');
        setValue('subjectId', '');
        setClassIdSelected(true);
        const selectedClass = allClassData.find(c => c.classId === classIdValue);

        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
            setAllSubjectData(selectedClass.subjects || []);
        } else {
            setAllSectionData([]);
            setAllSubjectData([]);
        }
    };

    const AddAssignment = async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data?.title);
            formData.append('classId', data?.ClassId);
            formData.append('sectionId', data?.sectionId);
            formData.append('subjectId', data?.subjectId);
            formData.append('teacherId', data?.teacherId);
            formData.append('totalMarks', data?.totalMarks);
            formData.append('status', data?.status);
            formData.append('startDate', data?.startDate);
            formData.append('endDate', data?.endDate);
            formData.append('description', data?.description);
            formData.append('file', data?.file[0]);

            const response = await addNewAssignmentAPI(formData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response?.data?.message);
                reset(); // Reset the form after successful submission
                addedSuccess(); // Trigger the parent component's modal closing logic
            } else {
                toast.error(response?.data?.message || 'Failed to add assignment');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while adding the assignment');
        }
        finally {
            // setloaderState(false);
        }
    };

    return (
        <Container>
            <div className="container-fluid">
                <div className="row">
                    <form className='p-3' onSubmit={handleSubmit(AddAssignment)}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label font14">Title <span className='text-danger'>*</span></label>
                            <input
                                id="title"
                                type="text"
                                className={`form-control font14 ${errors.title ? 'border-danger' : ''}`}
                                placeholder="Enter Title"
                                {...register('title', {
                                    required: 'Title is required *',
                                    validate: value => {
                                        if (!/^[A-Z]/.test(value)) return 'Title must start with an uppercase letter';
                                        if (value.length < 2) return 'Minimum Length is 2';
                                        if (!/^[a-zA-Z0-9'\-\(\)\[\]\{\}\s]+$/.test(value)) return 'Invalid Characters in Title';
                                        return true;
                                    }
                                })}
                            />
                            {errors.title && <p className="font12 text-danger">{errors.title.message}</p>}
                        </div>
                        <div className="mb-3 teacher-input">
                            <label htmlFor="ClassId" className="form-label font14">Class <span className='text-danger'>*</span></label>
                            <select
                                id="ClassId"
                                className={`form-select font14 ${errors.ClassId ? 'border-danger' : ''}`}
                                {...register('ClassId', { required: 'Class selection is required *' })}
                                onChange={(e) => handleClassChange(e.target.value)}
                            >
                                <option value="">-- Select --</option>
                                {allClassData?.map((option) => (
                                    <option key={option.classId} value={option?.classId}>
                                        {option?.classNo}
                                    </option>
                                ))}
                            </select>
                            {errors.ClassId && <p className="font12 text-danger">{errors.ClassId.message}</p>}
                        </div>
                        <div className="mb-3 teacher-input">
                            <label htmlFor="sectionId" className="form-label font14">Section <span className='text-danger'>*</span></label>
                            <div className={`${classIdSelected ? '' : 'tooltip-container'}`} data-tooltip="Select Class First">
                                <select
                                    id="sectionId"
                                    className={`form-select font14 ${errors.sectionId ? 'border-danger' : ''}`}
                                    {...register('sectionId', { required: 'Section selection is required *' })}
                                    disabled={!classIdSelected}
                                >
                                    <option value="">-- Select --</option>
                                    {allSectionData.length > 0 ? (
                                        allSectionData?.map(option => (
                                            <option key={option.classSecId} value={option.classSecId}>
                                                {option.sectionName}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>-- No Section found for this Class --</option>
                                    )}
                                </select>
                            </div>
                            {errors.sectionId && <p className="font12 text-danger">{errors.sectionId.message}</p>}
                        </div>
                        <div className="mb-3 teacher-input">
                            <label htmlFor="subjectId" className="form-label font14">Subject <span className='text-danger'>*</span></label>
                            <div className={`${classIdSelected ? '' : 'tooltip-container'}`} data-tooltip="Select Class First">
                                <select
                                    id="subjectId"
                                    className={`form-select font14 ${errors.subjectId ? 'border-danger' : ''}`}
                                    {...register('subjectId', { required: 'Subject selection is required *' })}
                                    disabled={!classIdSelected}
                                    onChange={(e) => handleSubjectChange(e.target.value)}
                                >
                                    <option value="">-- Select --</option>
                                    {allSubjectData.length > 0 ? (
                                        allSubjectData?.map((option) => (
                                            <option key={option.subjectId} value={option.subjectId}>
                                                {option.subjectName}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>-- No Subject found for this Class --</option>
                                    )}
                                </select>
                            </div>
                            {errors.subjectId && <p className="font12 text-danger">{errors.subjectId.message}</p>}
                        </div>
                        <div className="mb-3 teacher-input">
                            <label htmlFor="teacherId" className="form-label font14">Teacher <span className='text-danger'>*</span></label>
                            <div className={`${subjectIdSelected ? '' : 'tooltip-container'}`} data-tooltip="Select Subject First">
                                <select
                                    id="teacherId"
                                    className={`form-select font14 ${errors.teacherId ? 'border-danger' : ''}`}
                                    {...register('teacherId', { required: 'Teacher selection is required *' })}
                                    disabled={!subjectIdSelected}
                                >
                                    <option value="">-- Select --</option>
                                    {allTeacherData.length > 0 ? (
                                        allTeacherData?.map(option => (
                                            <option key={option.staffId} value={option.staffId}>
                                                {option.staffName}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>-- No Teacher found for this Subject --</option>
                                    )}
                                </select>
                            </div>
                            {errors.teacherId && <p className="font12 text-danger">{errors.teacherId.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="totalMarks" className="form-label font14">Total Marks <span className='text-danger'>*</span></label>
                            <input
                                id="totalMarks"
                                type="number"
                                className={`form-control font14 ${errors.totalMarks ? 'border-danger' : ''}`}
                                placeholder='0'
                                {...register('totalMarks', {
                                    required: 'Total Marks are required *',
                                    min: { value: 0, message: 'Marks cannot be negative' }
                                })}
                            />
                            {errors.totalMarks && <p className="font12 text-danger">{errors.totalMarks.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="startDate" className="form-label font14">Starting Date <span className='text-danger'>*</span></label>
                            <input
                                id="startDate"
                                type="date"
                                className={`form-control font14 ${errors.startDate ? 'border-danger' : ''}`}
                                {...register('startDate', { required: 'Starting Time is required *' })}
                            />
                            {errors.startDate && <p className="font12 text-danger">{errors.startDate.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="endDate" className="form-label font14">Ending Date <span className='text-danger'>*</span></label>
                            <input
                                id="endDate"
                                type="date"
                                className={`form-control font14 ${errors.endDate ? 'border-danger' : ''}`}
                                {...register('endDate', { required: 'Ending Time is required *' })}
                            />
                            {errors.endDate && <p className="font12 text-danger">{errors.endDate.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className='form-label font14'>Status <span className='text-danger'>*</span></label>
                            <select
                                id="status"
                                className={`form-select font14 ${errors.status ? 'border-danger' : ''}`}
                                {...register('status', { required: 'Status selection is required *' })}
                            >
                                <option value="">-- Select --</option>
                                <option value='PUBLISHED'>Published</option>
                                <option value='DRAFT'>Draft</option>
                                <option value='ARCHIVE'>Archive</option>
                            </select>
                            {errors.status && <p className="font12 text-danger">{errors.status.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label font14">Description</label>
                            <input
                                id="description"
                                type="text"
                                className={`form-control font14 ${errors.description ? 'border-danger' : ''}`}
                                placeholder="Enter Description"
                                {...register('description', {
                                    validate: value => {
                                        if (!value) return true;
                                        if (value.length < 2) return 'Minimum Length is 2';
                                        if (!/^[a-zA-Z0-9,.;"*%_?><!`~|\/'\-\(\)\[\]\{\}\s]+$/.test(value)) return 'Invalid Characters in Description';
                                        return true;
                                    }
                                })}
                            />
                            {errors.description && <p className="font12 text-danger">{errors.description.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label font14">Assignment Upload <span className='text-danger'>*</span></label>
                            <input
                                id="file"
                                type="file"
                                className={`form-control font14 ${errors.file ? 'border-danger' : ''}`}
                                accept='.pdf, .docx, .png'
                                {...register('file', {
                                    required: 'File is required *',
                                    // validate: value => {
                                    //     if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800))
                                    //         return 'File size must be between 10 KB to 200 KB';
                                    //     return true;
                                    // }
                                })}
                            />
                            {errors.file && <p className="font12 text-danger">{errors.file.message}</p>}
                        </div>
                        <p className='text-center p-3'>
                            <button className='btn updateCreateButtons text-white' disabled={!isValid} type='submit'>Create</button>
                            <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => reset()}>Cancel</button>
                        </p>
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default AddAssignment;
