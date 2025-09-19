import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addNewStudentApi, getAllClassApi, getAllFeeMasterApi } from '../../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import DataLoader from 'src/Layouts/Loader';
import { useForm } from 'react-hook-form';

const Container = styled.div`
    overflow: scroll;

    .hideScrollBar::-webkit-scrollbar {
        display: none !important;
    }

    .form-control::placeholder, .form-control, .form-select {
        color: var(--greyState);
    }

    .form-control, .form-select {
        border-radius: 5px ;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .AddBtnn, .AddBtnn:visited, .AddBtnn:active {
        border: 1px solid var(--breadCrumActiveTextColor);
        background-color: var(--breadCrumActiveTextColor);
    }

    .CancelBtnn, .CancelBtnn:active {
        border: 1px solid var(--breadCrumActiveTextColor);
    }
`;

const SingleStudentAdmission = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const apiKey = 'ZGpVTFdPWU03YVRmcGJtd3NWWEYyT2JhQWNKMzNmYXR6ZjNYME1Rcw==';
    const headers = { 'X-CSCAPI-KEY': apiKey };

    // Loader and Data States
    const [loaderState, setLoaderState] = useState(false);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [FeeMasterData, setFeeMasterData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);

    const { register, handleSubmit, formState: { errors, isValid }, setValue, watch } = useForm({
        mode: 'onChange'
    });

    // Fetch API Data
    const fetchCountries = async () => {
        try {
            const response = await fetch('https://api.countrystatecity.in/v1/countries', { headers });
            if (response.ok) {
                const data = await response.json();
                setCountries(data);
            } else {
                toast.error('Failed to fetch countries');
            }
        } catch (error) {
            toast.error('Error fetching countries');
        }
    };

    const fetchStates = async (countryCode) => {
        try {
            const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, { headers });
            if (response.ok) {
                const data = await response.json();
                setStates(data);
                setCities([]); // Reset cities when state changes
                setSelectedState(''); // Reset selected state
                setValue('state', ''); // Reset form state
                setValue('city', ''); // Reset form city
            } else {
                toast.error('Failed to fetch states');
            }
        } catch (error) {
            toast.error('Error fetching states');
        }
    };

    const fetchCities = async (countryCode, stateCode) => {
        try {
            const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, { headers });
            if (response.ok) {
                const data = await response.json();
                setCities(data);
            } else {
                toast.error('Failed to fetch cities');
            }
        } catch (error) {
            toast.error('Error fetching cities');
        }
    };

    // UseEffect Calls
    useEffect(() => {
        getAllClassData();
        fetchCountries();
    }, [token]);

    useEffect(() => {
        if (selectedCountry) {
            fetchStates(selectedCountry);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedState && selectedCountry) {
            fetchCities(selectedCountry, selectedState);
        }
    }, [selectedState, selectedCountry]);

    // Existing API Functions
    const getAllClassData = async () => {
        setLoaderState(true);
        try {
            const response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllClassData(response?.data?.classes);
                    setLoaderState(false);
                } else {
                    setLoaderState(false);
                    toast.error(response?.data?.message);
                }
            } else {
                setLoaderState(false);
            }
        } catch (error) {
            setLoaderState(false);
            if (error?.response?.data?.statusCode === 401) {
                sessionStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/');
                }, 200);
            }
        }
        finally {
            setLoaderState(false);
        }
    };

    const AddNewStudent = async (data) => {
        try {
            const formData = new FormData();
            formData.append("studentName", data.studentName);
            formData.append("bloodGroup", data.bloodGroup);
            formData.append("fatherName", data.fatherName);
            formData.append("motherName", data.motherName);
            formData.append("parentNo", data.parentNo);
            formData.append("studentEmail", data.studentEmail);
            formData.append("parentEmail", data.parentEmail);
            formData.append("fatherOccupation", data.fatherOccupation);
            formData.append("motherOccupation", data.motherOccupation);
            formData.append("classNo", data.classNo);
            formData.append("section", data.section);
            formData.append("studentDOB", data.studentDOB);
            formData.append("admissionDate", data.admissionDate);
            formData.append("gender", data.gender);
            formData.append("studentAddress", data.studentAddress);
            formData.append("country", data.country || '');
            formData.append("state", data.state || '');
            formData.append("city", data.city || '');
            formData.append("pinCode", data.pinCode || '');
            // formData.append("stuStatus", data.stuStatus || '');
            formData.append("emergencyNo", data.emergencyNo);
            formData.append("studentPh", data.studentPh);
            formData.append("studentImage", data.studentImage[0]);
            formData.append("parentImage", data.parentImage[0]);

            setLoaderState(true);
            const response = await addNewStudentApi(formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message);
                    setTimeout(() => {
                        navigate('/admin/admission/allStudents');
                    }, 700);
                } else {
                    toast.error(response?.data?.message);
                }
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            setLoaderState(false);
            toast.error(error?.response?.data?.message || 'Error adding student');
            console.error('Error during update:', error);
        } finally {
            setLoaderState(false);
        }
    };

    const handleClassChange = (val) => {
        const classNoVal = val;
        setValue('classNo', classNoVal);
        const selectedClass = allClassData.find(c => c.classNo === classNoVal);
        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
        } else {
            setAllSectionData([]);
        }
    };

    const handleCountryChange = (e) => {
        const countryCode = e.target.value;
        setSelectedCountry(countryCode);
        setValue('country', countryCode);
    };

    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        setSelectedState(stateCode);
        setValue('state', stateCode);
    };

    const watchClassNo = watch('classNo');

    return (
        <>
            <Container className='hideScrollBar p-3'>
                {loaderState && <DataLoader />}
                <div className="container-fluid">
                    <form className="row g-3 h-100 overflow-scroll" onSubmit={handleSubmit(AddNewStudent)}>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="studentName" className="form-label font14">Name <span className='text-danger'>*</span></label>
                            <input id="studentName" type="text" className={`form-control font14 ${errors.studentName ? 'border-danger' : ''}`} placeholder="Enter Student Name" {...register('studentName', { required: 'Student Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Student Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Student Name'; } return true; } })} />
                            {errors.studentName && <p className="font12 text-danger">{errors.studentName.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="bloodGroup" className="form-label font14">Blood Group <span className='text-danger'>*</span></label>
                            <select id="bloodGroup" className={`form-select font14 ${errors.bloodGroup ? 'border-danger' : ''}`} {...register('bloodGroup', { required: 'BloodGroup is required *' })}>
                                <option value="">Select Blood Group</option>
                                <option value='AB+'>AB+</option>
                                <option value='A+'>A+</option>
                                <option value='B+'>B+</option>
                                <option value='O+'>O+</option>
                            </select>
                            {errors.bloodGroup && <p className="font12 text-danger">{errors.bloodGroup.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="fatherName" className="form-label font14">Father Name <span className='text-danger'>*</span></label>
                            <input id="fatherName" type="text" className={`form-control font14 ${errors.fatherName ? 'border-danger' : ''}`} placeholder="Enter Father's Name" {...register('fatherName', { required: 'Father Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Father Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Father Name'; } return true; } })} />
                            {errors.fatherName && <p className="font12 text-danger">{errors.fatherName.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="motherName" className="form-label font14">Mother Name <span className='text-danger'>*</span></label>
                            <input id="motherName" type="text" className={`form-control font14 ${errors.motherName ? 'border-danger' : ''}`} placeholder="Enter Mother's Name" {...register('motherName', { required: 'Mother Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Mother Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Mother Name'; } return true; } })} />
                            {errors.motherName && <p className="font12 text-danger">{errors.motherName.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="parentNo" className="form-label font14">Parent Contact Details <span className='text-danger'>*</span></label>
                            <input id="parentNo" type="tel" className={`form-control font14 ${errors.parentNo ? 'border-danger' : ''}`} placeholder="Enter Parent's Phone Number" {...register('parentNo', { required: `Parent's Phone Number is required *`, validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                            {errors.parentNo && <p className="font12 text-danger">{errors.parentNo.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="studentPh" className="form-label font14">Student Contact Details <span className='text-danger'>*</span></label>
                            <input id="studentPh" type="tel" className={`form-control font14 ${errors.studentPh ? 'border-danger' : ''}`} placeholder="Enter Student's Phone Number" {...register('studentPh', { required: `Student's Phone Number is required *`, validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                            {errors.studentPh && <p className="font12 text-danger">{errors.studentPh.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="studentEmail" className="form-label font14">Student Email <span className='text-danger'>*</span></label>
                            <input id="studentEmail" type="email" className={`form-control font14 ${errors.studentEmail ? 'border-danger' : ''}`} placeholder="Enter Student's Email" {...register('studentEmail', { required: `Student's Email is required *`, validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
                            {errors.studentEmail && <p className="font12 text-danger">{errors.studentEmail.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="parentEmail" className="form-label font14">Parent Email <span className='text-danger'>*</span></label>
                            <input id="parentEmail" type="email" className={`form-control font14 ${errors.parentEmail ? 'border-danger' : ''}`} placeholder="Enter Parent's Email" {...register('parentEmail', { required: `Parent's Email is required *`, validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
                            {errors.parentEmail && <p className="font12 text-danger">{errors.parentEmail.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="fatherOccupation" className="form-label font14">Father Occupation <span className='text-danger'>*</span></label>
                            <select id="fatherOccupation" className={`form-select font14 ${errors.fatherOccupation ? 'border-danger' : ''}`} {...register('fatherOccupation', { required: 'Father Occupation is required *' })}>
                                <option value=''>--- Choose ---</option>
                                <option value='Private'>Private</option>
                                <option value='Service Man'>Service Man</option>
                                <option value='Government'>Government</option>
                                <option value='Accountant'>Accountant</option>
                                <option value='Lawyer'>Lawyer</option>
                                <option value='Teacher'>Teacher</option>
                                <option value='Doctor'>Doctor</option>
                                <option value='Unemployment'>Unemployment</option>
                                <option value='Bussiness Man'>Bussiness Man</option>
                                <option value='Retired'>Retired</option>
                            </select>
                            {errors.fatherOccupation && <p className="font12 text-danger">{errors.fatherOccupation.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="motherOccupation" className="form-label font14">Mother Occupation <span className='text-danger'>*</span></label>
                            <select id="motherOccupation" className={`form-select font14 ${errors.motherOccupation ? 'border-danger' : ''}`} {...register('motherOccupation', { required: 'Mother Occupation is required *' })}>
                                <option value=''>--- Choose ---</option>
                                <option value='House Wife'>House Wife</option>
                                <option value='Government'>Government</option>
                                <option value='Working'>Working</option>
                                <option value='Accountant'>Accountant</option>
                                <option value='Lawyer'>Lawyer</option>
                                <option value='Teacher'>Teacher</option>
                                <option value='Doctor'>Doctor</option>
                                <option value='Unemployment'>Unemployment</option>
                                <option value='Retired'>Retired</option>
                            </select>
                            {errors.motherOccupation && <p className="font12 text-danger">{errors.motherOccupation.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="classNo" className="form-label font14">Class <span className='text-danger'>*</span></label>
                            <select id="classNo" className={`form-select font14 ${errors.classNo ? 'border-danger' : ''}`} {...register('classNo', { required: 'Class is required *' })} onChange={(e) => handleClassChange(e.target.value)}>
                                <option value="">Select Class</option>
                                {allClassData.map((classs) => (<option key={classs.classId} value={classs.classNo}>{classs.classNo}</option>))}
                            </select>
                            {errors.classNo && <p className="font12 text-danger">{errors.classNo.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="section" className="form-label font14">Section <span className='text-danger'>*</span></label>
                            <select id="section" className={`form-select font14 ${errors.section ? 'border-danger' : ''}`} {...register('section', { required: 'Section is required *' })}>
                                <option value="">Select Section</option>
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
                            {errors.section && <p className="font12 text-danger">{errors.section.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="studentDOB" className="form-label font14">Birthday <span className='text-danger'>*</span></label>
                            <input id="studentDOB" type="date" className={`form-control font14 ${errors.studentDOB ? 'border-danger' : ''}`} placeholder="Enter Date Of Birth" {...register("studentDOB", { required: 'Date Of Birth is required *' })} />
                            {errors.studentDOB && <p className="font12 text-danger">{errors.studentDOB.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="admissionDate" className="form-label font14">Admission Date <span className='text-danger'>*</span></label>
                            <input id="admissionDate" type="date" className={`form-control font14 ${errors.admissionDate ? 'border-danger' : ''}`} placeholder="Enter Admission Date" {...register("admissionDate", { required: 'Admission Date is required *' })} />
                            {errors.admissionDate && <p className="font12 text-danger">{errors.admissionDate.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="gender" className="form-label font14">Gender <span className='text-danger'>*</span></label>
                            <select id="gender" className={`form-select font14 ${errors.gender ? 'border-danger' : ''}`} {...register('gender', { required: 'Gender is required *' })}>
                                <option value=''>--- Choose ---</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                            {errors.gender && <p className="font12 text-danger">{errors.gender.message}</p>}
                        </div>
                        {/* <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="stuStatus" className="form-label font14">Status <span className='text-danger'>*</span></label>
                            <select id="stuStatus" className={`form-select font14 ${errors.stuStatus ? 'border-danger' : ''}`} {...register('stuStatus', { required: 'Status is required *' })}>
                                <option value=''>--- Choose ---</option>
                                <option value={true}>Active</option>
                                <option value={false}>InActive</option>
                            </select>
                            {errors.stuStatus && <p className="font12 text-danger">{errors.stuStatus.message}</p>}
                        </div> */}
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="studentAddress" className="form-label font14">Address <span className='text-danger'>*</span></label>
                            <input id="studentAddress" type="text" className={`form-control font14 ${errors.studentAddress ? 'border-danger' : ''}`} placeholder="Enter Address" {...register("studentAddress", { required: 'Address is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'Address must contain only letters, digits, and spaces'; } return true; } })} />
                            {errors.studentAddress && <p className="font12 text-danger">{errors.studentAddress.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="country" className="form-label font14">Country</label>
                            <select id="country" className={`form-select font14 ${errors.country ? 'border-danger' : ''}`} {...register('country')} onChange={handleCountryChange} value={selectedCountry}>
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.iso2} value={country.iso2}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            {errors.country && <p className="font12 text-danger">{errors.country.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="state" className="form-label font14">State</label>
                            <select id="state" className={`form-select font14 ${errors.state ? 'border-danger' : ''}`} {...register('state')} onChange={handleStateChange} value={selectedState} disabled={!selectedCountry}>
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state.iso2} value={state.iso2}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                            {errors.state && <p className="font12 text-danger">{errors.state.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="city" className="form-label font14">City</label>
                            <select id="city" className={`form-select font14 ${errors.city ? 'border-danger' : ''}`} {...register('city')} disabled={!selectedState}>
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.name}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                            {errors.city && <p className="font12 text-danger">{errors.city.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="pinCode" className="form-label font14">Pin Code</label>
                            <input id="pinCode" type="text" className={`form-control font14 ${errors.pinCode ? 'border-danger' : ''}`} placeholder="Enter Pin Code" {...register("pinCode", {
                                validate: value => {
                                    if (value && !/^\d{6}$/.test(value)) {
                                        return 'Pin Code must be a 6-digit number';
                                    }
                                    return true;
                                }
                            })} />
                            {errors.pinCode && <p className="font12 text-danger">{errors.pinCode.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="emergencyNo" className="form-label font14">Emergency Contact Details <span className='text-danger'>*</span></label>
                            <input id="emergencyNo" type="tel" className={`form-control font14 ${errors.emergencyNo ? 'border-danger' : ''}`} placeholder="Enter Emergency Phone Number" {...register('emergencyNo', { required: 'Emergency Phone Number is required *', validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                            {errors.emergencyNo && <p className="font12 text-danger">{errors.emergencyNo.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="studentImage" className="form-label font14">Student Image <span className='text-danger'>*</span></label>
                            <input id="studentImage" type="file" className={`form-control font14 ${errors.studentImage ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('studentImage', { required: 'Student Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                            {errors.studentImage && <p className="font12 text-danger">{errors.studentImage.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="parentImage" className="form-label font14">Parent Image <span className='text-danger'>*</span></label>
                            <input id="parentImage" type="file" className={`form-control font14 ${errors.parentImage ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('parentImage', { required: 'Parent Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                            {errors.parentImage && <p className="font12 text-danger">{errors.parentImage.message}</p>}
                        </div>
                        <div className="row p-4">
                            <div className="col-md-6 col-sm-6 col-6 text-end">
                                <button className='btn AddBtnn font14 text-white' type='submit' >+ Add Student</button>
                            </div>
                            <div className="col-md-6 col-sm-6 col-6 text-start">
                                <Link className='btn CancelBtnn font14' type='button' to='/admin/admission/allStudents'>Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
            <Toaster />
        </>
    );
};

export default SingleStudentAdmission;
