import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { getAllFeeTypeApi, getAllClassApi, getAllFeeDiscountApi, addNewInvoiceApi } from 'src/Utils/Apis';
import DataLoader from 'src/Layouts/Loader';
import { toast } from 'react-hot-toast';

const Container = styled.div`
  overflow: scroll;

  .checkedinputsbg {
    background-color: #F9F9F9;
  }

  .hideScrollBar::-webkit-scrollbar {
    display: none !important;
  }

  .form-control::placeholder,
  .form-control,
  .form-select {
    color: var(--greyState);
  }

  .form-control,
  .form-select {
    border-radius: 5px ;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .AddBtnn,
  .AddBtnn:visited,
  .AddBtnn:active {
    border: 1px solid var(--breadCrumActiveTextColor);
    background-color: var(--breadCrumActiveTextColor);
  }

  .CancelBtnn,
  .CancelBtnn:active {
    border: 1px solid var(--BtnBorder);
  }

  .form-check-input:checked {
    background-color: #008479;
    border-color: #008479;
    box-shadow: none !important;
  }

  .form-check-input:focus {
    box-shadow: none !important;
    outline: none;
  }

  .custom-dropdown-month {
    position: relative;
  }

  .custom-dropdown-month-toggle {
    width: 100%;
    text-align: left;
    padding: 0.375rem 0.75rem;
    background-color: #fff;
    border: 1px solid var(--fontControlBorder);
    border-radius: 5px;
    cursor: pointer;
  }

  .custom-dropdown-month-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    background-color: #fff;
    border: 1px solid var(--fontControlBorder);
    border-radius: 5px;
    padding: 0.5rem;
    display: none;
  }

  .custom-dropdown-month.open .custom-dropdown-month-menu {
    display: block;
  }

  .form-check {
    margin-bottom: 0.5rem;
  }

  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;

const CreateSingleInvoice = () => {
    const [loaderState, setLoaderState] = useState(false);
    const [feeTypeData, setFeeTypeData] = useState([]);
    const [feeDiscountData, setFeeDiscountData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);
    const [allStudentsData, setAllStudentsData] = useState([]);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const months = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
    ];

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            classNo: '',
            section: '',
            studentId: [],
            feeTypeId: [],
            feeAmount: '',
            months: [],
            dueDate: '',
            applicableDiscount: '',
            discountId: '',
            status: '',
            description: '',
        },
        mode: 'onChange',
    });

    const watchClassNo = watch('classNo');
    const watchSection = watch('section');
    const watchApplicableDiscount = watch('applicableDiscount');
    const watchFeeTypeId = watch('feeTypeId');

    useEffect(() => {
        getAllFeeTypeData();
        getAllFeeDiscountData();
        getAllClassData();

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                dropdownRef.current.classList.remove('open');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getAllClassData = async () => {
        try {
            setLoaderState(true);
            const response = await getAllClassApi();
            if (response?.status === 200 && response?.data?.status === 'success') {
                setAllClassData(response.data.classes || []);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch classes');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch classes');
            if (error?.response?.data?.statusCode === 401) {
                sessionStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/');
                }, 200);
            }
        } finally {
            setLoaderState(false);
        }
    };

    const getAllFeeTypeData = async () => {
        try {
            setLoaderState(true);
            const response = await getAllFeeTypeApi('', '', '');
            if (response?.status === 200 && response?.data?.status === 'success') {
                setFeeTypeData(response.data.feeTypes || []);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch fee types');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error fetching fee types');
            if (error?.response?.data?.statusCode === 401) {
                sessionStorage.removeItem('token');
            }
        } finally {
            setLoaderState(false);
        }
    };

    const getAllFeeDiscountData = async () => {
        try {
            setLoaderState(true);
            const response = await getAllFeeDiscountApi('', '', '');
            if (response?.status === 200 && response?.data?.status === 'success') {
                setFeeDiscountData(response.data.discounts || []);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch fee discounts');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error fetching fee discounts');
            if (error?.response?.data?.statusCode === 401) {
                sessionStorage.removeItem('token');
                navigate('/');
            }
        } finally {
            setLoaderState(false);
        }
    };

    const handleClassChange = (value) => {
        setValue('classNo', value);
        setValue('section', '');
        setValue('studentId', []);
        const selectedClass = allClassData.find((c) => c.classNo === value);
        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
            setAllStudentsData([]);
        } else {
            setAllSectionData([]);
            setAllStudentsData([]);
        }
    };

    const handleSectionChange = (value) => {
        setValue('section', value);
        setValue('studentId', []);
        const selectedSection = allSectionData.find((c) => c.sectionName === value);
        if (selectedSection && selectedSection.studentDTO) {
            setAllStudentsData(selectedSection.studentDTO);
        } else {
            setAllStudentsData([]);
        }
    };

    const handleFeeTypeChange = (e) => {
        const id = Number(e.target.value);
        const currentFeeTypes = watchFeeTypeId || [];
        const updatedFeeTypes = e.target.checked
            ? [...currentFeeTypes, id]
            : currentFeeTypes.filter((item) => item !== id);
        setValue('feeTypeId', updatedFeeTypes, { shouldValidate: true });
    };

    const toggleDropdown = () => {
        if (dropdownRef.current) {
            dropdownRef.current.classList.toggle('open');
        }
    }; useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                dropdownRef.current.classList.remove("open");
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const addNewInvoice = async (data) => {
        try {
            setLoaderState(true);
            const formData = new FormData();

            // Append basic fields
            formData.append('classNo', data.classNo);
            formData.append('section', data.section);

            // Process studentId as an array and extract numeric part
            if (Array.isArray(data.studentId)) {
                data.studentId.forEach((id, index) => {
                    formData.append(`studentId`, isNaN(id) ? id : id);
                });
            } else {
                const numericId = Number(data.studentId.replace(/^\D+/g, ''));
                formData.append('studentId[0]', isNaN(numericId) ? parseInt(data.studentId) : numericId);
            }

            if (Array.isArray(data.feeTypeId)) {
                data.feeTypeId.forEach((id, index) => {
                    formData.append(`feeTypeId`, Number(id)); // Convert to number
                });
            } else {
                formData.append('feeTypeId[0]', Number(data.feeTypeId));
            }

            formData.append('months', data.months);
            formData.append('dueDate', data.dueDate);
            formData.append('applicableDiscount', data.applicableDiscount === 'Yes');
            formData.append('discountId', data.applicableDiscount === 'Yes' ? data.discountId : '');
            formData.append('status', data.status);
            formData.append('description', data.description || '');

            const response = await addNewInvoiceApi(formData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                toast.success(response.data.message || 'Invoice added successfully');
                reset();
                setAllSectionData([]);
                setAllStudentsData([]);
            } else {
                toast.error(response?.data?.message || 'Failed to add invoice');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error adding invoice');
            if (error?.response?.data?.statusCode === 401) {
                sessionStorage.removeItem('token');
                navigate('/');
            }
        } finally {
            setLoaderState(false);
        }
    };

    return (
        <Container className="container-fluid p-4">
            {loaderState && <DataLoader />}
            <form onSubmit={handleSubmit(addNewInvoice)}>
                <div className="row g-3">
                    <div className="col-12 col-sm-6 col-md-4">
                        <label htmlFor="classNo" className="form-label font14">Class</label>
                        <select
                            id="classNo"
                            className={`form-select font14 ${errors.classNo ? 'border-danger' : ''}`}
                            {...register('classNo', { required: 'Class is required * ' })}
                            onChange={(e) => handleClassChange(e.target.value)}
                        >
                            <option value="">-- Select --</option>
                            {allClassData?.map((option) => (
                                <option key={option.classId} value={option.classNo}>
                                    {option.classNo}
                                </option>
                            ))}
                        </select>
                        {errors.classNo && <span className="error-message">{errors.classNo.message}</span>}
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <label htmlFor="section" className="form-label font14">Section</label>
                        <select
                            id="section"
                            className={`form-select font14 ${errors.section ? 'border-danger' : ''}`}
                            {...register('section', { required: 'Section is required * ' })}
                            onChange={(e) => handleSectionChange(e.target.value)}
                        >
                            <option value="">-- Select --</option>
                            {allSectionData.length > 0 ? (
                                allSectionData.map((option) => (
                                    <option key={option.classSecId} value={option.sectionName}>
                                        {option.sectionName}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    {watchClassNo ? '-- No Sections Found --' : '-- Select Class First --'}
                                </option>
                            )}
                        </select>
                        {errors.section && <span className="error-message">{errors.section.message}</span>}
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <label htmlFor="studentId" className="form-label font14">Student</label>
                        <select
                            id="studentId"
                            className={`form-select font14 ${errors.studentId ? 'border-danger' : ''}`}
                            {...register('studentId', {
                                required: 'Student is required * ',
                                setValueAs: (value) => [value]
                            })}
                            onChange={(e) => {
                                setValue('studentId', [e.target.value], { shouldValidate: true });
                            }}
                        >
                            <option value="">-- Select --</option>
                            {allStudentsData.length > 0 ? (
                                allStudentsData.map((option) => (
                                    <option key={option.studentId} value={option.id}>
                                        {option.studentName}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    {watchSection ? '-- No Students Found --' : '-- Select Section First --'}
                                </option>
                            )}
                        </select>
                        {errors.studentId && <span className="error-message">{errors.studentId.message}</span>}
                    </div>
                    <div className="col-12">
                        <label className="form-label font14">Fee Type</label>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-2 checkedinputsbg px-2 py-2 mt-1">
                            {feeTypeData.map((feeType) => (
                                <div className="col" key={feeType.feeTypeModelId}>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="feeTypeId"
                                            value={feeType.feeTypeModelId}
                                            checked={watchFeeTypeId?.includes(feeType.feeTypeModelId) || false}
                                            onChange={handleFeeTypeChange}
                                        />
                                        <label className="form-check-label font14">{feeType.title}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {errors.feeTypeId && <span className="error-message">{errors.feeTypeId.message}</span>}
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <label htmlFor="months" className="form-label font14">Month</label>
                        <div className="custom-dropdown-month" ref={dropdownRef}>
                            <button type="button" className="custom-dropdown-month-toggle font14" onClick={toggleDropdown}>
                                {watch('months')?.length > 0 ? watch('months').join(', ') : 'Select Month'}
                            </button>
                            <div className="custom-dropdown-month-menu">
                                {months.map((month) => (
                                    <div className="form-check" key={month}>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            value={month}
                                            {...register('months', {
                                                validate: (value) => value.length > 0 || 'At least one month is required * ',
                                            })}
                                            onChange={(e) => {
                                                const currentMonths = watch('months') || [];
                                                const updatedMonths = e.target.checked
                                                    ? [...currentMonths, e.target.value]
                                                    : currentMonths.filter((m) => m !== e.target.value);
                                                setValue('months', updatedMonths, { shouldValidate: true });
                                            }}
                                        />
                                        <label className="form-check-label font14">{month}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {errors.months && <span className="error-message">{errors.months.message}</span>}
                    </div>
                    {/* <div className="col-12 col-sm-6 col-md-4">
                        <label htmlFor="months" className="form-label font14">
                            Month
                        </label>

                        <div className="custom-dropdown-month" ref={dropdownRef}>
                            <button
                                type="button"
                                className="custom-dropdown-month-toggle font14"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleDropdown();
                                }}
                            >
                                {watch("months")?.length > 0
                                    ? watch("months").join(", ")
                                    : "Select Month"}
                            </button>

                            <div className="custom-dropdown-month-menu">
                                {months.map((month) => (
                                    <div className="form-check" key={month}>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            value={month}
                                            {...register("months", {
                                                validate: (value) =>
                                                    value.length > 0 || "At least one month is required * ",
                                            })}
                                            onChange={(e) => {
                                                const currentMonths = watch("months") || [];

                                                const updatedMonths = e.target.checked
                                                    ? [...currentMonths, e.target.value]
                                                    : currentMonths.filter((m) => m !== e.target.value);

                                                setValue("months", updatedMonths, { shouldValidate: true });
                                            }}
                                        />

                                        <label className="form-check-label font14">{month}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {errors.months && (
                            <span className="error-message">{errors.months.message}</span>
                        )}
                    </div> */}

                    <div className="col-12 col-sm-6 col-md-4">
                        <label htmlFor="dueDate" className="form-label font14">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            className={`form-control font14 ${errors.dueDate ? 'border-danger' : ''}`}
                            {...register('dueDate', { required: 'Due date is required * ' })}
                        />
                        {errors.dueDate && <span className="error-message">{errors.dueDate.message}</span>}
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <label htmlFor="applicableDiscount" className="form-label font14">Is Applicable Discount?</label>
                        <select
                            id="applicableDiscount"
                            className={`form-select font14 ${errors.applicableDiscount ? 'border-danger' : ''}`}
                            {...register('applicableDiscount', { required: 'Discount selection is required * ' })}
                        >
                            <option value="">Select Discount</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {errors.applicableDiscount && (
                            <span className="error-message">{errors.applicableDiscount.message}</span>
                        )}
                    </div>
                    {watchApplicableDiscount === 'Yes' && (
                        <div className="col-12 col-sm-6 col-md-4" >
                            <label htmlFor="discountId" className="form-label font14">Fee Discount</label>
                            <select
                                id="discountId"
                                className={`form-select font14 ${errors.discountId ? 'border-danger' : ''}`}

                                {...register('discountId', { required: 'Discount is required when applicable' })}
                            >
                                <option value="">Select Discount</option>
                                {feeDiscountData?.map((option) => (
                                    <option key={option.discountId} value={option.discountId}>
                                        {option.title}
                                    </option>
                                ))}
                            </select>
                            {errors.discountId && <span className="error-message">{errors.discountId.message}</span>}
                        </div>
                    )}
                    <div className="col-12 col-sm-6 col-md-4">
                        <label htmlFor="status" className="form-label font14">Paid Status</label>
                        <select
                            id="status"
                            className={`form-select font14 ${errors.status ? 'border-danger' : ''}`}
                            {...register('status', { required: 'Paid status is required * ' })}
                        >
                            <option value="">Select Status</option>
                            <option value="PAID">Paid</option>
                            <option value="UNPAID">Unpaid</option>
                        </select>
                        {errors.status && <span className="error-message">{errors.status.message}</span>}
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <label htmlFor="description" className="form-label machine">Description</label>
                        <input
                            type="text"
                            id="description"
                            className={`form-control font14 ${errors.description ? 'border-danger' : ''}`}
                            placeholder="Enter Description"
                            {...register('description', {
                                validate: (value) =>
                                    !value ||
                                    ((/^[A-Z]/.test(value) || 'Description must start with an uppercase letter') &&
                                        (value.length >= 4 || 'Minimum Length is 4') &&
                                        (/^[a-zA-Z\s'.]+$/.test(value) || 'Invalid Characters in Description')),
                            })}
                        />
                    </div>
                    <div className="col-12 text-center">
                        <button className="btn AddBtnn font14 text-white" type="submit" disabled={!isValid}>
                            Submit
                        </button>
                        <button
                            className="btn CancelBtnn font14 ms-2"
                            type="button"
                            onClick={() => {
                                reset();
                                setAllSectionData([]);
                                setAllStudentsData([]);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </Container>
    );
};

export default CreateSingleInvoice;
