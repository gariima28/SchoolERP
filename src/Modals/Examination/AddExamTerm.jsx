import React, { useEffect, useState } from 'react'
import { addNewExamTermApi } from 'src/Utils/Apis'
import toast from 'react-hot-toast'
import DataLoader from 'src/Layouts/Loader';
import { useForm } from 'react-hook-form';

const AddExamTerm = ({ setAddedExam }) => {

    // loader State
    const [loaderState, setloaderState] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid }, setValue, reset } = useForm({
        mode: 'onChange'
    });

    // Add new Exam category data
    const AddNewExamTerm = async (data) => {
        try {
            setloaderState(true);
            const formData = new FormData();
            formData.append('examTermName', data?.examTermName)
            formData.append('totalMarks', data?.totalMarks)
            formData.append('passingMarks', data?.passingMarks)
            var response = await addNewExamTermApi(formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message);
                    setAddedExam(true)
                    setTimeout(() => {
                        setValue('examTermName', '')
                    }, 500);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            } else {
                setloaderState(false);
                toast.error(response?.data?.message)
            }
        } catch (error) {
            setloaderState(false);
            setloaderState(false);
            toast.error('Error during add:', error)
        }
    }


    return (
        <div className="container-fluid p-0">
            {loaderState && (<DataLoader />)}
            <div className="row">
                <form onSubmit={handleSubmit(AddNewExamTerm)}>
                    <div className="mb-3">
                        <label htmlFor="examTermName" className="form-label font14">Exam Term</label>
                        <input id="examTermName" type="text" className={`form-control font14 ${errors.examTermName ? 'border-danger' : ''}`} placeholder="Enter Exam Term Name" {...register('examTermName', { required: 'Exam Term Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Exam Term Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Exam Term Name'; } return true; } })} />
                        {errors.examTermName && <p className="font12 text-danger">{errors.examTermName.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="totalMarks" className="form-label font14">Total Marks</label>
                        <input id="totalMarks" type="number" className={`form-control font14 ${errors.totalMarks ? 'border-danger' : ''}`} {...register('totalMarks', { required: 'Total Marks are required *', min: { value: 0, message: 'Marks cannot be negative' } })} />
                        {errors.totalMarks && <p className="font12 text-danger">{errors.totalMarks.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passingMarks" className="form-label font14">Passing Marks</label>
                        <input id="passingMarks" type="number" className={`form-control font14 ${errors.passingMarks ? 'border-danger' : ''}`} {...register('passingMarks', { required: 'Passing Marks are required *', min: { value: 0, message: 'Marks cannot be negative' } })} />
                        {errors.passingMarks && <p className="font12 text-danger">{errors.passingMarks.message}</p>}
                    </div>
                    <p className='text-center p-3'>
                        <button className='btn updateCategoryButtons text-white' disabled={!isValid} type='submit'>Create Term</button>
                        <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => reset()}>Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default AddExamTerm
