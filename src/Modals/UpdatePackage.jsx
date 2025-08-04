import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import { getPlanByIdApi, updatePlanApi } from 'src/Utils/Apis';

const UpdatePackage = ({ planId, closingEditCanvas, closingCancel }) => {


    const [loaderState, setLoaderState] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm({
        mode: 'onChange',
    });

    const watchedValues = watch();

    useEffect(() => {
        getPlanById(planId);
    }, [planId]);

    useEffect(() => {
        if (initialValues) {
            Object.keys(initialValues).forEach(key => setValue(key, initialValues[key]));
        }
    }, [initialValues, setValue]);

    const getPlanById = async (planId) => {
        if (planId < 0 || !planId) {
            reset(initialValues);
            return;
        }

        setLoaderState(true);
        try {
            const response = await getPlanByIdApi(planId);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setLoaderState(false);
                const planData = response?.data?.plans;
                setInitialValues(planData);
                reset(planData);
            } else {
                setLoaderState(false);
                console.error(response?.data?.message);
            }
        } catch (error) {
            setloaderState(false);
            setLoaderState(false);
            console.error(error);
        }
    };

    const UpdatePackageFunc = async (data) => {
        setLoaderState(true);
        try {
            const response = await updatePlanApi(planId, data);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setLoaderState(false);
                closingCancel(true);
                toast.success(response?.data?.message);
                setTimeout(() => closingEditCanvas(true), 2000);
            } else {
                setLoaderState(false);
                console.error(response?.data?.message);
            }
        } catch (error) {
            setloaderState(false);
            setLoaderState(false);
            console.error(error);
        }
    };

    const handleCancel = () => {
        setTimeout(() => {
            reset(initialValues);
        }, 300);
        closingCancel(true);
    };

    // Compare the watched values with initial values to determine if the form has changed
    const isFormChanged = () => {
        // // console.log(JSON.stringify(initialValues) !== JSON.stringify(watchedValues), 'isFormChanged')
        // // console.log(JSON.stringify(initialValues), 'initialValues 2')
        // // console.log(JSON.stringify(watchedValues), 'watchedValues 2')
        return JSON.stringify(initialValues) !== JSON.stringify(watchedValues);
    };


    return (
        <div className="container-fluid">
            {loaderState && <DataLoader />}
            <form className="p-3" onSubmit={handleSubmit(UpdatePackageFunc)}>
                <div className="row mb-3">
                    <label htmlFor="planName" className="form-label ps-0 font14">Package Name</label>
                    <input
                        id="plan Namwksfs sjhfh hdsjhk jjhdfhssj hsjjks hhsfjhs"
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

                <div className="text-center p-3">
                    <button className="btn addButtons2 text-white" type="submit" disabled={!isFormChanged()}>Update Package</button>
                    <button className="btn cancelButtons ms-3" type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePackage;
