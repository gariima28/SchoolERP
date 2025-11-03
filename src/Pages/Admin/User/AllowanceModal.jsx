import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import DataLoader from 'src/Layouts/Loader';
import { addNewAllowanceName } from 'src/Utils/Apis';

const AllowanceModal = ({ onSuccess }) => {
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
            formData.append('allowanceName', data.allowanceName);
            const response = await addNewAllowanceName(formData);

            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message);
                reset();
                onSuccess(); // Close modal
                window.dispatchEvent(new Event('allowanceAdded')); // Refresh dropdown
            } else {
                toast.error(response?.data?.message || 'Failed to add allowance');
            }
        } catch (error) {
            toast.error('Error adding allowance');
        } finally {
            setLoaderState(false);
        }
    };

    return (
        <>
            {loaderState && <DataLoader />}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label font14 fw-lighter">Allowance Name</label>
                    <input
                        type="text"
                        className="form-control font14"
                        placeholder="Enter Allowance Name"
                        {...register('allowanceName', {
                            required: 'Allowance Name is required',
                        })}
                    />
                    {errors.allowanceName && (
                        <p className="font12 text-danger">{errors.allowanceName.message}</p>
                    )}
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="font12 btn addButtons2 text-white"
                        disabled={!isValid || loaderState}
                    >
                        Add Allowance
                    </button>
                </div>
            </form>
        </>
    );
};

export default AllowanceModal;
