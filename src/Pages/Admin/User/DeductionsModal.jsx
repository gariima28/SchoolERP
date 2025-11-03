import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import DataLoader from 'src/Layouts/Loader';
import { addNewDeductionName } from 'src/Utils/Apis';

const Deduction = ({ onSuccess }) => { // ← ADD THIS
    const [loaderState, setLoaderState] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({ mode: 'onChange' });

    const onSubmit = async (data) => {
        try {
            setLoaderState(true);
            const formData = new FormData();
            formData.append('deductionName', data.deductionName);
            const response = await addNewDeductionName(formData);

            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                reset();
                onSuccess(); // ← NOW WORKS
                window.dispatchEvent(new Event('deductionAdded'));
            } else {
                toast.error(response?.data?.message || 'Failed to add deduction');
            }
        } catch (error) {
            toast.error('Error adding deduction');
        } finally {
            setLoaderState(false);
        }
    };

    return (
        <>
            {loaderState && <DataLoader />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label font14 fw-lighter">Deduction Name</label>
                    <input
                        type="text"
                        className="form-control font14"
                        placeholder="Enter Deduction Name"
                        {...register('deductionName', {
                            required: 'Deduction Name is required',
                        })}
                    />
                    {errors.deductionName && (
                        <p className="font12 text-danger">{errors.deductionName.message}</p>
                    )}
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="font12 btn addButtons2 text-white"
                        disabled={!isValid || loaderState}
                    >
                        Add Deduction
                    </button>
                </div>
            </form>
        </>
    );
};

export default Deduction;
