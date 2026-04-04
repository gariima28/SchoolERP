import React, { useEffect, useState, useContext } from 'react'
import { MyUseContext } from "../ContextApi/UseContext";
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getSchoolDataByIdAPI, updateSchoolDataByIdAPI } from '../../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import { useForm } from 'react-hook-form';

const Container = styled.div`
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }
/* 
    .form-control::placeholder{
        text-decoration
    } */

    .form-control, .form-select{
        border-radius: 5px;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .formimagetext{
        border-radius: 5px 0px 0px 5px;
    }
    
    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .eventablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
    }

    .ExportBtns{
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .greenBgModal{
        background-color: var(--breadCrumActiveTextColor);
    }

    .greenText{
        color: var(--breadCrumActiveTextColor);
    }

    .orangeText{
        color: var(--OrangeBtnColor);
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    .infoIcon{
        cursor: pointer;
    }
    
`;

const SchoolSetting = () => {

    const { setBooleanForLogoUpdate } = useContext(MyUseContext);

    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const [loaderState, setLoaderState] = useState(false);
    const [updateForLogo, setUpdateForLogo] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue, watch, getValues } = useForm({
        mode: 'onChange'
    });

    const [schoolLogoVal, setSchoolLogoVal] = useState('');
    const [changeImageType, setChangeImageType] = useState(true);
    const [initialValues, setInitialValues] = useState({});
    const [isUpdated, setIsUpdated] = useState(false);

    // More efficient way to watch for changes
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            checkForChanges();
        });
        return () => subscription.unsubscribe();
    }, [watch, initialValues]); // Added initialValues to dependencies

    useEffect(() => {
        getSchoolDataById();
    }, [token]);

    const getSchoolDataById = async () => {
        try {
            setLoaderState(true);
            const response = await getSchoolDataByIdAPI();
            if (response?.status === 200 && response?.data?.status === 'success') {
                const schoolDataById = response?.data?.school;
                const defaultValues = {
                    schoolName: schoolDataById?.schoolName || '',
                    schoolPhone: schoolDataById?.schoolPhone || '',
                    schoolAddress: schoolDataById?.schoolAddress || '',
                    schoolInfo: schoolDataById?.description || '',
                    email: schoolDataById?.schoolEmail || '',
                    warningText: schoolDataById?.warningText || '',
                    socialLink1: schoolDataById?.socialLink1 || '',
                    socialLink2: schoolDataById?.socialLink2 || '',
                    socialLink3: schoolDataById?.socialLink3 || '',
                    schoolLogo: schoolDataById?.schoolPhoto === null ? '' : schoolDataById?.schoolPhoto,
                };
                setSchoolLogoVal(schoolDataById?.schoolPhoto === null ? '' : schoolDataById?.schoolPhoto);
                setChangeImageType(schoolDataById?.schoolPhoto === null ? false : true);
                setInitialValues(defaultValues);

                // Reset form with new values
                Object.keys(defaultValues).forEach((key) => {
                    setValue(key, defaultValues[key], { shouldDirty: false });
                });

                setLoaderState(false);
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            setLoaderState(false);
            console.error(error);
            if (error?.response?.data?.statusCode === 401) {
                sessionStorage.removeItem('token');
                setTimeout(() => navigate('/'), 200);
            }
        }
        finally {
            setLoaderState(false);
        }
        console.log(schoolLogoVal)
    };

    // Improved change detection
    const checkForChanges = () => {
        const currentValues = getValues();
        let hasChanges = false;

        // Check all fields except schoolLogo
        for (const key in initialValues) {
            if (key !== 'schoolLogo' && currentValues[key] !== initialValues[key]) {
                hasChanges = true;
                break;
            }
        }

        // Special handling for schoolLogo
        if (!hasChanges) {
            const logoFile = currentValues.schoolLogo?.[0];
            if (logoFile) {
                // If there's a new file, consider it a change
                hasChanges = true;
            } else if (currentValues.schoolLogo !== initialValues.schoolLogo) {
                // If the value changed but no file was selected
                hasChanges = true;
            }
        }

        setIsUpdated(hasChanges);
    };

    // Rest of your component remains the same...
    const UpdateSchoolSettingFun = async (data) => {
        setLoaderState(true);
        try {
            const formData = new FormData();
            formData.append('schoolPrefix', '');
            formData.append('schoolName', data?.schoolName);
            formData.append('schoolAddress', data?.schoolAddress);
            formData.append('schoolPhone', data?.schoolPhone);
            formData.append('email', data?.email);
            formData.append('schoolInfo', data?.schoolInfo);
            formData.append('socialLink1', data?.socialLink1);
            formData.append('socialLink2', data?.socialLink2);
            formData.append('socialLink3', data?.socialLink3);
            formData.append('warningText', data?.warningText);

            if (data?.schoolLogo?.[0]) {
                formData.append('schoolLogo', data?.schoolLogo[0]);
            }

            const response = await updateSchoolDataByIdAPI(formData);
            console.log('result of update logo', response)
            if (response?.status === 200) {
                if (response.data.status === 'success') {
                    toast.success(response?.data?.message);
                       setBooleanForLogoUpdate(prev => !prev);
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                    setLoaderState(false);
                    setIsUpdated(false);
                    // Refresh the initial values after successful update
                    getSchoolDataById();
                }
            } else {
                toast.error(response?.error);
                setLoaderState(false);
            }
        } catch (error) {
            setLoaderState(false);
            console.error('Error during update:', error);
        }
        finally {
            setLoaderState(false);
        }
    };

    const handleSocialLink3Change = (value) => {
        setSchoolSocial3(value);
        setSchoolSocial3Error(validateSocialLink3(value))
    }

    const validateSocialLink3 = (value) => {
        if (value.trim() === '') {
            return '* Social Media Link is required';
        }
        const socialLinkPattern = /^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/;
        if (!socialLinkPattern.test(value)) {
            return 'Invalid social media link';
        }
    }

    const [showModal, setShowModal] = useState(false);

    const handleImageClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <>
            <Container>
                {
                    loaderState && (
                        <DataLoader />
                    )
                }
                <div className="container-fluid pt-4">
                    <div className="row px-4 ">
                        <div className="row pb-3">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='font14 bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/admin/settings/schoolSetting" className='font14 bredcrumText text-decoration-none'>Settings</a></li>
                                    <li className="font14 breadcrumb-item active bredcrumActiveText" aria-current="page">School Settings</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>School Settings</p>
                        </div>
                        <div className="row pb-3">
                            <div className="overflow-scroll cardradius bg-white p-3">
                                <form className="row" onSubmit={handleSubmit(UpdateSchoolSettingFun)}>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">School Name</label>
                                        <input id="schoolName" onChange={checkForChanges} type="text" className={`form-control font14 ${errors.schoolName ? 'border-danger' : ''}`} placeholder="Enter School Name" {...register('schoolName', { required: 'School Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'School Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in School Name'; } return true; } })} />
                                        {errors.schoolName && <p className="font12 text-danger">{errors.schoolName.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">School Phone</label>
                                        <input id="schoolPhone" onChange={checkForChanges} type="tel" className={`form-control font14 ${errors.schoolPhone ? 'border-danger' : ''}`} placeholder="Enter School's Phone Number" {...register('schoolPhone', { required: `School Phone Number is required *`, validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                                        {errors.schoolPhone && <p className="font12 text-danger">{errors.schoolPhone.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Address</label>
                                        <textarea id="schoolAddress" onChange={checkForChanges} type="text" className={`form-control font14 ${errors.schoolAddress ? 'border-danger' : ''}`} placeholder="Entes Address" {...register("schoolAddress", { required: 'School Address is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'Address must contain only letters, digits, and spaces'; } return true; } })} />
                                        {errors.schoolAddress && <p className="font12 text-danger">{errors.schoolAddress.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">School Information</label>
                                        <textarea id="schoolInfo" onChange={checkForChanges} type="text" className={`form-control font14 ${errors.schoolInfo ? 'border-danger' : ''}`} placeholder="Entes School Info" {...register("schoolInfo", { validate: value => { if (!value) return true; if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'School Info must contain only letters, digits, and spaces'; } return true; } })} />
                                        {errors.schoolInfo && <p className="font12 text-danger">{errors.schoolInfo.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">School Email</label>
                                        <input id="email" onChange={checkForChanges} type="email" className={`form-control font14 ${errors.email ? 'border-danger' : ''}`} placeholder="Enter School's Email" {...register('email', { required: `School Email is required *`, validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
                                        {errors.email && <p className="font12 text-danger">{errors.email.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Social Link 1</label>
                                        <input id="socialLink1" onChange={checkForChanges} type="text" className={`form-control font14 ${errors.socialLink1 ? 'border-danger' : ''}`} placeholder="Enter Social Link" {...register('socialLink1', { validate: value => { if (!value) return true; if (!/^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/.test(value)) { return 'Not a valid social link format'; } return true; } })} />
                                        {errors.socialLink1 && <p className="font12 text-danger">{errors.socialLink1.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="warningText" className="form-label font14">Warning Text</label>
                                        <input id="warningText" onChange={checkForChanges} type="text" className={`form-control font14 ${errors.warningText ? 'border-danger' : ''}`} placeholder="Enter Warning Text" {...register("warningText", { validate: value => { if (!value) return true; if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'Address must contain only letters, digits, and spaces'; } return true; } })} />
                                        {errors.warningText && <p className="font12 text-danger">{errors.warningText.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Social Link 2</label>
                                        <input id="socialLink2" onChange={checkForChanges} type="text" className={`form-control font14 ${errors.socialLink2 ? 'border-danger' : ''}`} placeholder="Enter Social Link" {...register('socialLink2', { validate: value => { if (!value) return true; if (!/^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/.test(value)) { return 'Not a valid social link format'; } return true; } })} />
                                        {errors.socialLink2 && <p className="font12 text-danger">{errors.socialLink2.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Social Link 3</label>
                                        <input id="socialLink3" onChange={checkForChanges} type="text" className={`form-control font14 ${errors.socialLink3 ? 'border-danger' : ''}`} placeholder="Enter Social Link" {...register('socialLink3', { validate: value => { if (!value) return true; if (!/^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/.test(value)) { return 'Not a valid social link format'; } return true; } })} />
                                        {errors.socialLink3 && <p className="font12 text-danger">{errors.socialLink3.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Update Logo</label>
                                        <div className="d-flex bg-white">
                                            {schoolLogoVal !== null && changeImageType ?
                                                // <input id="schoolLogo" type="text" className='form-control formimagetext font14' value={schoolLogoVal.split('/').pop()} disabled />
                                                <div style={{ width: '100%', border: '1px solid #E4E7EB' }}>
                                                    <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src={schoolLogoVal} alt="School Logo" height={33} width={70} style={{ cursor: "pointer" }} onClick={handleImageClick} />
                                                </div>
                                                :
                                                <input id="schoolLogo" onChange={checkForChanges} type="file" className={`form-control formimagetext font14 ${errors.schoolLogo ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('schoolLogo', { required: 'Student Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                                            }
                                            <div className='formcontrolButtonborder p-1 ps-3 pe-3 text-center'>
                                                <span className="text-white font14 align-self-center" onClick={() => { setChangeImageType(!changeImageType) }}>
                                                    {schoolLogoVal !== null && changeImageType ? 'Edit' : 'View'}
                                                </span>
                                            </div>
                                        </div>
                                        {errors.schoolLogo && <p className="font12 text-danger">{errors.schoolLogo.message}</p>}
                                    </div>
                                    <div className="row p-3">
                                        <div className="col-md-6 col-sm-6 col-6 text-end">
                                            <button className='btn addCategoryButtons font16 text-white' type='submit' disabled={!isUpdated} >Update Settings</button>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-6 text-start">
                                            <Link className='btn cancelButtons font16' to='/'>Cancel</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Logo Preview</h5>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body text-center">
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src={schoolLogoVal} alt="Preview" className="img-fluid" style={{ maxHeight: "70vh" }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default SchoolSetting




