import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import DataLoader from 'src/Layouts/Loader';
import { getFeeTypeByIdApi, updateFeeTypeByIdApi } from 'src/Utils/Apis';

const EditFeeType = ({ editId, editedSuccess }) => {

    // loader State
    const [loaderState, setloaderState] = useState(false);

    const [OriginalFeeTypeName, setOriginalFeeTypeName] = useState('');
    const [OriginalFeeTypeCode, setOriginalFeeTypeCode] = useState('');
    const [OriginalFeeTypeDescription, setOriginalFeeTypeDescription] = useState('');

    const { registerUpdate, handleSubmit, formState: { errorsUpdate }, setValue, watch, reset } = useForm({
        mode: 'onChange'
    });

    const feeTypeNameVal = watch('feeTypeName')
    const feeTypeCodeVal = watch('feeTypeCode')
    const descriptionVal = watch('description')

    useEffect(() => {
        getFeeTypeDataById()
    }, [editId])


    const getFeeTypeDataById = async () => {
        try {
            setloaderState(true);
            var response = await getFeeTypeByIdApi(editId);
            // // console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setValue('feeTypeName', response?.data?.feeType?.feeTypeName)
                    setValue('feeTypeCode', response?.data?.feeType?.feeTypeCode)
                    setValue('description', response?.data?.feeType?.description)
                    setOriginalFeeTypeName(response?.data?.feeType?.feeTypeName)
                    setOriginalFeeTypeCode(response?.data?.feeType?.feeTypeCode)
                    setOriginalFeeTypeDescription(response?.data?.feeType?.description)
                    toast.success(response?.data?.message);
                }
                else {
                    setloaderState(false);
                    // toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                // // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            // // console.log('Error Facing during Get All Fee Type API - ', error)
        }
    }

    const updateFeeType = async (data) => {
        try {
            const formData = new FormData();
            if (data?.feeTypeName !== OriginalFeeTypeName) {
                formData.append('feeTypeName', data?.feeTypeName);
            }
            if (data?.feeTypeCode !== OriginalFeeTypeCode) {
                formData.append('feeTypeCode', data?.feeTypeCode);
            }
            if (data?.description !== OriginalFeeTypeDescription) {
                formData.append('description', data?.description);
            }

            var response = await updateFeeTypeByIdApi(editId, formData);
            // // console.log(response);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message)
                    editedSuccess(true);
                    setTimeout(() => {
                        reset()
                    }, 700);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            }
            else {
                setloaderState(false);
                toast.error(response?.data?.message)
            }
        }
        catch (error) {
            setloaderState(false);
            // // console.log('Error facing while adding fee type', error)
        }
    }

    const handleCancelButton = () => {
        reset();
        setValue('feeTypeName', OriginalFeeTypeName);
        setValue('feeTypeCode', OriginalFeeTypeCode);
        setValue('description', OriginalFeeTypeDescription);
    }


    return (
        <div className="container-fluid p-0">
            {loaderState && (<DataLoader />)}
            <div className="row">
                <form onSubmit={handleSubmit(updateFeeType)}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Name</label>
                        <input id="feeTypeName" type="text" className={`form-control font14 ${errorsUpdate.feeTypeName ? 'border-danger' : ''}`} placeholder="Enter Fee Type Name" {...registerUpdate('feeTypeName', { required: 'Fee Type Name is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Fee Type Name'; } return true; } })} />
                        {errorsUpdate.feeTypeName && <p className="font12 text-danger">{errorsUpdate.feeTypeName.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label font14">Description</label>
                        <input id="description" type="text" className={`form-control font14 ${errorsUpdate.description ? 'border-danger' : ''}`} placeholder="Enter Description" {...registerUpdate('description', { validate: value => { if (!value) return true; if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Description'; } return true; } })} />
                        {errorsUpdate.description && <p className="font12 text-danger">{errorsUpdate.description.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Fees Code*</label>
                        <input id="feeTypeCode" type="text" className={`form-control font14 ${errorsUpdate.feeTypeCode ? 'border-danger' : ''}`} placeholder="Enter Fee Type Code" {...registerUpdate('feeTypeCode', { required: 'Fee Type Code is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Fee Type Code'; } return true; } })} />
                        {errorsUpdate.feeTypeCode && <p className="font12 text-danger">{errorsUpdate.feeTypeCode.message}</p>}
                    </div>
                    <p className='text-center p-3'>
                        <button className='btn addButtons font14 text-white me-2' type='submit' disabled={OriginalFeeTypeName === feeTypeNameVal && OriginalFeeTypeCode === feeTypeCodeVal} >Update Fee Type</button>
                        <button className='btn cancelButtons font14' data-bs-dismiss="offcanvas" aria-label="Close" type='button' onClick={() => handleCancelButton()}>Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default EditFeeType
