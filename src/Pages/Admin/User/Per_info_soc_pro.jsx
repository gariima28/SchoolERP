import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { SocialGetAllApi, personal_info_Social__GetById } from '../../../Utils/Apis';

const Per_info_soc_pro = () => {
    const { roleId, userId } = useParams();
    const myUserID = userId ?? roleId ?? "";

    const [loader, setLoader] = useState(false);
    const [updateStatus, setUpdateStatus] = useState('');
    const initialFormValues = useRef(null);

    const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)*[\w\d-]+\.[\w\d]{2,}(\/[\w\d-./?%&=]*)?$/;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            faceBookUrl: '',
            linkedInUrl: '',
            twitterUrl: '',
            instagramUrl: '',
            googlePlus: '',
        },
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('faceBookUrl', data.faceBookUrl);
        formData.append('linkedInUrl', data.linkedInUrl);
        formData.append('instagramUrl', data.instagramUrl);
        formData.append('twitterUrl', data.twitterUrl);
        formData.append('googlePlus', data.googlePlus);

        setLoader(true);
        try {
            const response = await SocialGetAllApi(myUserID, formData);
            if (response?.data?.status === 'success') {
                toast.success(response?.data?.message);
                setUpdateStatus(response?.data?.status);
                MyStaffGetById()
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.error('An error occurred');
            console.error(error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (myUserID) {
            MyStaffGetById();
        }
    }, []);

    const MyStaffGetById = async () => {
        setLoader(true);
        try {
            const response = await personal_info_Social__GetById(myUserID);
            if (response?.status === 200) {
                setUpdateStatus(response?.data?.status);
                const formValues = {
                    faceBookUrl: response?.data?.social?.faceBookUrl || '',
                    linkedInUrl: response?.data?.social?.linkedInUrl || '',
                    twitterUrl: response?.data?.social?.twitterUrl || '',
                    instagramUrl: response?.data?.social?.instagramUrl || '',
                    googlePlus: response?.data?.social?.googlePlus || '',
                };
                reset(formValues);
                initialFormValues.current = formValues;
            } else {
                toast.error(response?.data?.msg);
            }
        } catch (error) {
            toast.error('An error occurred');
            console.error(error);
        } finally {
            setLoader(false);
        }
    };

    const formValues = watch();
    const isFormChanged = initialFormValues.current && Object.keys(formValues).some(
        key => formValues[key] !== initialFormValues.current[key]
    );

    return (
        <div className="container-fluid">
            <div className="form-container">
                <Toaster />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row px-3 mt-4">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <label htmlFor="facebook" className="form-label mb-0 heading-14 label-color">
                                Facebook <span style={{ color: 'red' }}>*</span>
                            </label>
                            <div className="input-group mb-3">
                                <span className="input-group-text p-0" id="facebook-addon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 1024 1024">
                                        <path
                                            fill="#1877f2"
                                            d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32m-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6c44.2 0 82.1 3.3 93.2 4.8v107.9z"
                                            stroke-width="25.5"
                                            stroke="#1877f2"
                                        />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${errors.faceBookUrl ? 'is-invalid' : ''
                                        }`}
                                    {...register('faceBookUrl', {
                                        required: 'Valid Facebook URL is required',
                                        pattern: {
                                            value: /^(https?:\/\/)?(www\.)?facebook\.com\/(profile\.php\?id=\d+|pages\/[A-Za-z0-9\-\._]+\/\d+|[A-Za-z0-9\.]{5,})\/?$/,
                                            message: 'Please enter a valid URL (e.g., https://www.facebook.com)',
                                        },
                                    })}
                                    placeholder="Enter Facebook URL"
                                    aria-label="Facebook"
                                    aria-describedby="facebook-addon"
                                />
                            </div>
                            {errors.faceBookUrl && (
                                <p className="ms-1" style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    {errors.faceBookUrl.message}
                                </p>
                            )}

                            <label htmlFor="twitter" className="form-label mb-0 heading-14 label-color">
                                Twitter <span style={{ color: 'red' }}>*</span>
                            </label>
                            <div className="input-group mb-3">
                                <span className="input-group-text p-2" id="twitter-addon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 128 128">
                                        <path d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${errors.twitterUrl ? 'is-invalid' : ''
                                        }`}
                                    {...register('twitterUrl', {
                                        required: 'Valid Twitter URL is required',
                                        pattern: {
                                            value: /^(https?:\/\/)?(www\.)?twitter\.com\/([A-Za-z0-9_]{1,15})\/?$/,
                                            message: 'Please enter a valid URL (e.g., https://www.twitter.com)',
                                        },
                                    })}
                                    placeholder="Enter Twitter URL"
                                    aria-label="Twitter"
                                    aria-describedby="twitter-addon"
                                />
                            </div>
                            {errors.twitterUrl && (
                                <p className="ms-1" style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    {errors.twitterUrl.message}
                                </p>
                            )}

                            <label htmlFor="instagram" className="form-label mb-0 heading-14 label-color">
                                Instagram <span style={{ color: 'red' }}>*</span>
                            </label>
                            <div className="input-group mb-3">
                                <span className="input-group-text p-1" id="instagram-addon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 256 256">
                                        <g fill="none">
                                            <rect width="256" height="256" fill="url(#SVGWRUqebek)" rx="60" />
                                            <rect width="256" height="256" fill="url(#SVGfkNpldMH)" rx="60" />
                                            <path
                                                fill="#fff"
                                                d="M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355s22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334s-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334" />
                                            <defs>
                                                <radialGradient
                                                    id="SVGWRUqebek"
                                                    cx="0"
                                                    cy="0"
                                                    r="1"
                                                    gradientTransform="matrix(0 -253.715 235.975 0 68 275.717)"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stop-color="#fd5" />
                                                    <stop offset=".1" stop-color="#fd5" />
                                                    <stop offset=".5" stop-color="#ff543e" />
                                                    <stop offset="1" stop-color="#c837ab" />
                                                </radialGradient>
                                                <radialGradient
                                                    id="SVGfkNpldMH"
                                                    cx="0"
                                                    cy="0"
                                                    r="1"
                                                    gradientTransform="matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stop-color="#3771c8" />
                                                    <stop offset=".128" stop-color="#3771c8" />
                                                    <stop offset="1" stop-color="#60f" stop-opacity="0" />
                                                </radialGradient>
                                            </defs>
                                        </g>
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${errors.instagramUrl ? 'is-invalid' : ''
                                        }`}
                                    {...register('instagramUrl', {
                                        required: 'Valid Instagram URL is required',
                                        pattern: {
                                            value: /^(https?:\/\/)?(www\.)?instagram\.com\/([A-Za-z0-9._]{1,30})\/?$/,
                                            message: 'Please enter a valid URL (e.g., https://www.instagram.com)',
                                        },
                                    })}
                                    placeholder="Enter Instagram URL"
                                    aria-label="Instagram"
                                    aria-describedby="instagram-addon"
                                />
                            </div>
                            {errors.instagramUrl && (
                                <p className="ms-1" style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    {errors.instagramUrl.message}
                                </p>
                            )}

                            <label htmlFor="googlePlus" className="form-label mb-0 heading-14 label-color">
                                Google Plus <span style={{ color: 'red' }}>*</span>
                            </label>
                            <div className="input-group mb-3">
                                <span className="input-group-text p-1" id="googlePlus-addon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 1024 1024">
                                        <path
                                            fill="#eb4335"
                                            d="M879.5 470.4c-.3-27-.4-54.2-.5-81.3h-80.8c-.3 27-.5 54.1-.7 81.3c-27.2.1-54.2.3-81.2.6v80.9c27 .3 54.2.5 81.2.8c.3 27 .3 54.1.5 81.1h80.9c.1-27 .3-54.1.5-81.3c27.2-.3 54.2-.4 81.2-.7v-80.9c-26.9-.2-54.1-.2-81.1-.5m-530 .4c-.1 32.3 0 64.7.1 97c54.2 1.8 108.5 1 162.7 1.8c-23.9 120.3-187.4 159.3-273.9 80.7c-89-68.9-84.8-220 7.7-284c64.7-51.6 156.6-38.9 221.3 5.8c25.4-23.5 49.2-48.7 72.1-74.7c-53.8-42.9-119.8-73.5-190-70.3c-146.6-4.9-281.3 123.5-283.7 270.2c-9.4 119.9 69.4 237.4 180.6 279.8c110.8 42.7 252.9 13.6 323.7-86c46.7-62.9 56.8-143.9 51.3-220c-90.7-.7-181.3-.6-271.9-.3"
                                            stroke-width="25.5"
                                            stroke="#eb4335"
                                        />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${errors.googlePlus ? 'is-invalid' : ''
                                        }`}
                                    {...register('googlePlus', {
                                        required: 'Valid Google Plus URL is required',
                                        pattern: {
                                            value: /^(https?:\/\/)?(www\.)?(plus\.google\.com\/(\+?[A-Za-z0-9\.\-]+|\d{10,})|google\.com\/\+[A-Za-z0-9\.\-]+)\/?$/,
                                            message: 'Please enter a valid URL (e.g., https://www.googleplus.com)',
                                        },
                                    })}
                                    placeholder="Enter Google Plus URL"
                                    aria-label="Google Plus"
                                    aria-describedby="googlePlus-addon"
                                />
                            </div>
                            {errors.googlePlus && (
                                <p className="ms-1" style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    {errors.googlePlus.message}
                                </p>
                            )}

                            <label htmlFor="linkedin" className="form-label mb-0 heading-14 label-color">
                                LinkedIn <span style={{ color: 'red' }}>*</span>
                            </label>
                            <div className="input-group mb-3">
                                <span className="input-group-text p-1" id="linkedin-addon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 256 256">
                                        <path
                                            fill="#0a66c2"
                                            d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.91 39.91 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186zM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009s9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97zM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
                                        />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${errors.linkedInUrl ? 'is-invalid' : ''
                                        }`}
                                    {...register('linkedInUrl', {
                                        required: 'Valid s required',
                                        pattern: {
                                            value: /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company|pub)\/[A-Za-z0-9\-\_]{2,100}\/?$/,
                                            message: 'Please enter a valid URL (e.g., https://www.linkedin.com)',
                                        },
                                    })}
                                    placeholder="Enter LinkedIn URL"
                                    aria-label="LinkedIn"
                                    aria-describedby="linkedin-addon"
                                />
                            </div>
                            {errors.linkedInUrl && (
                                <p className="ms-1" style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    {errors.linkedInUrl.message}
                                </p>
                            )}

                            <div className="row mt-4 buttons-tops">
                                <div className="my-button11 heading-14">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-success my-green heading-12"
                                        style={{ backgroundColor: '#008479', color: '#fff' }}
                                        disabled={loader || isSubmitting || !isFormChanged}
                                    >
                                        {updateStatus === 'success' ? 'Update Social' : 'Submit Social'}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn cancelButtons heading-12 ms-1"
                                        onClick={() => reset(initialFormValues.current)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Per_info_soc_pro;
