import React, { useState } from 'react';
import { addNewPackageApi } from 'src/Utils/Apis';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';

const AddPackage = ({ closingOfAddCanvas, closingCancel }) => {
    // Loader State
    const [loaderState, setLoaderState] = useState(false);

    // React Hook Form setup
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({
        mode: 'onChange'
    });

    // Sanitize data before submission
    const sanitizeData = (data) => ({
        planName: data?.planName.trim(),
        price: data?.price || null,
        type: data?.type,
        value: data?.value || null,
        studentLimit: data?.studentLimit || null,
        status: data?.status === 'true' // Convert to boolean
    });

    // Submit handler
    const AddNewPackage = async (data) => {
        setLoaderState(true);
        const sanitizedData = sanitizeData(data);

        try {
            const response = await addNewPackageApi(sanitizedData);

            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response?.data?.message);
                setLoaderState(false);
                setTimeout(() => closingOfAddCanvas(true), reset(), 2000);
            } else {
                toast.error(response?.data?.message || 'Failed to add package.');
                setLoaderState(false);
            }
        } catch (error) {
            setloaderState(false);
            toast.error('An error occurred. Please try again.');
            console.error('API Error:', error);
            setLoaderState(false);
        }
    };

    // Cancel handler
    const handleCancel = () => {
        reset(); // Reset form fields
        closingCancel(true);
    };

    return (
        <div className="container-fluid">
            {loaderState && <DataLoader />}
            <div className="row">
                <form className="p-3" onSubmit={handleSubmit(AddNewPackage)}>
                    <div className="row mb-3">
                        <label htmlFor="planName" className="form-label ps-0 font14">Package Name</label>
                        <input
                            id="planName"
                            type="text"
                            className={`form-control font14 ${errors.planName ? 'border-danger' : ''}`}
                            placeholder="Enter Plan Name"
                            {...register('planName', {
                                required: 'Plan Name is required *',
                                validate: (value) => {
                                    if (!/^[A-Z]/.test(value)) return 'Plan Name must start with an uppercase letter';
                                    if (value.length < 4) return 'Minimum Length is 4';
                                    if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Invalid Characters in Plan Name';
                                    return true;
                                }
                            })}
                        />
                        {errors.planName && <p className="font12 text-danger">{errors.planName.message}</p>}
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="price" className="form-label ps-0 font14">Price</label>
                        <div className="input-group p-0">
                            <span className="input-group-text font14" id="pricePrefix">₹</span>
                            <input
                                id="price"
                                type="text"
                                aria-describedby="pricePrefix"
                                className={`form-control font14 ${errors.price ? 'border-danger' : ''}`}
                                placeholder="Enter Price Value"
                                {...register('price', {
                                    required: 'Price is required *',
                                    validate: (value) => /^\d+(\.\d{1,2})?$/.test(value) || 'Please enter a valid Price Value'
                                })}
                            />
                        </div>
                        {errors.price && <p className="font12 text-danger">{errors.price.message}</p>}
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="type" className="form-label ps-0 font14">Interval</label>
                        <select
                            id="type"
                            className={`form-select font14 ${errors.type ? 'border-danger' : ''}`}
                            {...register('type', { required: 'Interval is required *' })}
                        >
                            <option value="">Select Interval</option>
                            <option value="YEARS">Years</option>
                            <option value="MONTHS">Months</option>
                            <option value="WEEKS">Weeks</option>
                            <option value="DAYS">Days</option>
                        </select>
                        {errors.type && <p className="font12 text-danger">{errors.type.message}</p>}
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="value" className="form-label ps-0 font14">Period</label>
                        <input
                            id="value"
                            type="text"
                            className={`form-control font14 ${errors.value ? 'border-danger' : ''}`}
                            placeholder="Enter Period Value"
                            {...register('value', {
                                required: 'Period is required *',
                                validate: (value) => /^\d+(\.\d{1,2})?$/.test(value) || 'Please enter a valid Period Value'
                            })}
                        />
                        {errors.value && <p className="font12 text-danger">{errors.value.message}</p>}
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="studentLimit" className="form-label ps-0 font14">Student Limit</label>
                        <input
                            id="studentLimit"
                            type="text"
                            className={`form-control font14 ${errors.studentLimit ? 'border-danger' : ''}`}
                            placeholder="Enter Student Limit"
                            {...register('studentLimit', {
                                required: 'Student Limit is required *',
                                validate: (value) => /^\d+$/.test(value) || 'Please enter a valid Limit Value'
                            })}
                        />
                        {errors.studentLimit && <p className="font12 text-danger">{errors.studentLimit.message}</p>}
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="status" className="form-label ps-0 font14">Status</label>
                        <select
                            id="status"
                            className={`form-select font14 ${errors.status ? 'border-danger' : ''}`}
                            {...register('status', { required: 'Status is required *' })}
                        >
                            <option value="">Select Status</option>
                            <option value="true">Active</option>
                            <option value="false">InActive</option>
                        </select>
                        {errors.status && <p className="font12 text-danger">{errors.status.message}</p>}
                    </div>

                    <p className="text-center p-3">
                        <button className="btn addButtons2 text-white" type="submit" disabled={!isValid}>Add Package</button>
                        <button className="btn cancelButtons ms-3" type="button" onClick={handleCancel}>Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AddPackage;
