import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import DataLoader from 'src/Layouts/Loader';
import { addNewFeeTypeApi } from 'src/Utils/Apis';

const AddFeeType = ({ addedSuccess }) => {
    const [loaderState, setloaderState] = useState(false);
    const { registerAdd, handleSubmit, formState: { errorsAdd, isValid }, reset } = useForm({
        mode: 'onChange',
    });

    const handleCancelButton = () => {
        reset();
    };

    const addNewFeeType = async (data) => {
        try {
            const formData = new FormData();
            formData.append('feeTypeName', data?.feeTypeName);
            formData.append('feeTypeCode', data?.feeTypeCode);
            formData.append('description', data?.description || ''); // Ensure empty string if undefined

            setloaderState(true);
            const response = await addNewFeeTypeApi(formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message);
                    addedSuccess(true);
                    setTimeout(() => {
                        reset();
                    }, 700);
                } else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            } else {
                setloaderState(false);
                toast.error(response?.data?.message);
            }
        } catch (error) {
            setloaderState(false);
            toast.error('Error adding fee type');
        }
        finally {
            setloaderState(false);
        }
    };

    return (
        <div className="container-fluid p-0">
            {loaderState && <DataLoader />}
            <div className="row">
                <form onSubmit={handleSubmit(addNewFeeType)}>
                    <div className="mb-3">
                        <label htmlFor="feeTypeName" className="form-label font14">Name</label>
                        <input
                            id="feeTypeName"
                            type="text"
                            className={`form-control font14 ${errorsAdd.feeTypeName ? 'border-danger' : ''}`}
                            placeholder="Enter Fee Type Name"
                            {...registerAdd('feeTypeName', {
                                required: 'Fee Type Name is required *',
                                validate: (value) => {
                                    if (value.length < 4) return 'Minimum Length is 4';
                                    if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Invalid Characters in Fee Type Name';
                                    return true;
                                },
                            })}
                        />
                        {errorsAdd.feeTypeName && <p className="font12 text-danger">{errorsAdd.feeTypeName.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="feeTypeCode" className="form-label font14">Fees Code*</label>
                        <input
                            id="feeTypeCode"
                            type="text"
                            className={`form-control font14 ${errorsAdd.feeTypeCode ? 'border-danger' : ''}`}
                            placeholder="Enter Fee Type Code"
                            {...registerAdd('feeTypeCode', {
                                required: 'Fee Type Code is required *',
                                validate: (value) => {
                                    if (value.length < 4) return 'Minimum Length is 4';
                                    if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Invalid Characters in Fee Type Code';
                                    return true;
                                },
                            })}
                        />
                        {errorsAdd.feeTypeCode && <p className="font12 text-danger">{errorsAdd.feeTypeCode.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label font14">Description</label>
                        <input
                            id="description"
                            type="text"
                            className={`form-control font14 ${errorsAdd.description ? 'border-danger' : ''}`}
                            placeholder="Enter Description"
                            {...registerAdd('description', {
                                validate: (value) => {
                                    if (!value) return true; // Allow empty string
                                    if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) return 'Invalid Characters in Description';
                                    return true;
                                },
                            })}
                        />
                        {errorsAdd.description && <p className="font12 text-danger">{errorsAdd.description.message}</p>}
                    </div>
                    <p className="text-center p-3">
                        <button
                            className="btn addButtons font14 text-white me-2"
                            type="submit"
                            disabled={!isValid}
                        >
                            Add Fee Type
                        </button>
                        <button
                            className="btn cancelButtons font14"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            type="button"
                            onClick={handleCancelButton}
                        >
                            Cancel
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AddFeeType;
