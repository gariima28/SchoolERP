import React, { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { getOTPByMailApi, verifyOTPApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
    height: 100vh;
    .btnsubmitOwn{
        background-color: #008479 !important;
    }

    .imagearea{
        background: linear-gradient(135deg, #D8E6FF, white);
    }

    .formarea{
        background:linear-gradient(#F0F8F7, white);
    }


    .geycoloricon{
        color: #ADADBD;
    }

    .formcontrolinput{
        border: 1px solid #E4E7EB;
        border-radius: 6px;
        font-size: 16px;
    }

    .formcontrolinput::placeholder{
        color: #ADADBD;
        font-size: 14px;
    }

    .text-grey{
        color: #8F8F8F;
    }

    .form-control,
    .form-control:active,
    .form-control:focus,
    .form-control:hover,
    .form-control:visited {
        padding: 0.55rem !important;
        font-size: 0.8rem !important;
    }


    .formcontrolinputEmail{
        border-top: 1px solid #E4E7EB !important;
        border-left: none !important;
        border-bottom: 1px solid #E4E7EB !important;
        border-right: 1px solid #E4E7EB !important;
        border-radius: 6px;
        box-shadow: none !important;
        padding: 0.55rem !important;
        font-size: 0.8rem;
    }

    .formcontrolinputpass{
        border-top: 1px solid #E4E7EB !important;
        border-left: none !important;
        border-bottom: 1px solid #E4E7EB !important;
        border-right: none !important;
        border-radius: 6px 0px 0px 6px;
        box-shadow: none !important;
        font-size: 0.8rem;
    }

    .input-group-text{
        background-color: #fff !important;
        padding-right: 0 !important;
    }

    .input-group-text-danger{
        border-top: 1px solid rgba(220, 53, 69,1) !important;
        border-left: 1px solid rgba(220, 53, 69,1) !important;
        border-bottom: 1px solid rgba(220, 53, 69,1) !important;
    }

    .font12{
        font-size: 0.8rem !important;
    }

    .border_danger{
        border-top: 1px solid rgba(220, 53, 69,1) !important;
        border-left: none !important;
        border-bottom: 1px solid rgba(220, 53, 69,1) !important;
        border-right: none !important;
        border-radius: 6px;
        box-shadow: none !important;
        font-size: 16px;
    }

    .border_danger_text{
        border-top: 1px solid rgba(220, 53, 69,1) !important;
        border-left: none !important;
        border-bottom: 1px solid rgba(220, 53, 69,1) !important;
        border-right: 1px solid rgba(220, 53, 69,1) !important;
        border-radius: 6px;
        box-shadow: none !important;
        font-size: 16px;
    }


    .formcontrolinputpasseye{
        border-top: 1px solid #E4E7EB !important;
        border-right: 1px solid #E4E7EB !important;
        border-bottom: 1px solid #E4E7EB !important;
        border-left: none !important;
        border-radius: 0px 6px 6px 0px;
        box-shadow: none !important;
        cursor: pointer;
        background-color: #fff !important;
    }

    .border_danger_eye{
        border-top: 1px solid rgba(220, 53, 69,1) !important;
        border-right: 1px solid rgba(220, 53, 69,1) !important;
        border-bottom: 1px solid rgba(220, 53, 69,1) !important;
        border-left: none !important;
        border-radius: 0px 6px 6px 0px;
        box-shadow: none !important;
        cursor: pointer;
    }

    .formcontrolinputEmail::placeholder, .formcontrolinputpass::placeholder{
        color: #ADADBD;
        font-size: 14px;
    }

`;

const Span14Font = styled.span`
    font-size: 14px;
    font-family: Noto Sans;
`;



const VerifyOTP = () => {

    const navigate = useNavigate();

    const [OTP, setOTP] = useState('');
    const [OTPError, setOTPError] = useState('');

    const handleOTPChange = (e) => {
        const email = e.target.value;
        setOTP(email);
        setOTPError(validateOTP(email));
    };

    // *********************************************************************************
    //                        Validation of all inputs
    // *********************************************************************************

    const OTPRegex = /^\d{4}$/;

    const validateOTP = (value) => {
        if (!value.trim()) {
            return 'OTP is required';
        } else if (!OTPRegex.test(value)) {
            return 'OTP must have 4 digits !!';
        }
        return '';
    };

    const validateFields = () => {
        let isValid = true;

        if (!OTP) {
            setOTPError('* OTP is required');
            isValid = false;
        } else {
            setOTPError('');
        }

        return isValid;
    };

    // *********************************************************************************
    //                        Validation of all inputs
    // *********************************************************************************


    const verifyOTP = async () => {
        if (validateFields()) {
            try {
                var response = await verifyOTPApi(OTP);
                if (response?.status === 200) {
                    if (response?.data?.status === 'success') {
                        toast.success(response?.data?.message)
                        setTimeout(() => {
                            navigate('/setNewPass');
                        }, 3000)
                    }     
                    else {
                        toast.error(response?.data?.message)
                    }
                } else {
                    toast.error(response?.data?.message)
                }
            }
            catch (error) {
                setloaderState(false);
                toast.error(error.response?.data?.message)
            }
            finally {
                setloaderState(false);
            }
        }
    }

    return (
        <>
            <Container>
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col-md-6 col-sm-12 p-5 imagearea">
                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/pana.svg" alt="" className='img-fluid m-5' />
                        </div>
                        <div className="col-md-6 col-sm-12 p-5 formarea">
                            <div className="row me-xl-5 ms-xl-5 ps-xl-5 pe-xl-5 ps-lg-5 pe-lg-5 p-sm-5 m-sm-5 p-3">
                                <p className='text-center mb-5'><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/edu2alllogo.svg" alt="" className='img-fluid' /></p>
                                <Span14Font>
                                    <p className='font18 mb-1'>Forgot Password?</p>
                                    <h2 className='text-grey font16 mb-3'>We have sent a verification code to your email</h2>
                                    <form>
                                        {/* <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label font16">OTP</label>
                                            <input type="email" className="form-control formcontrolinput" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='&#xF0E0; Enter OTP' onChange={handleOTPChange} />
                                            <span className="text-danger">{OTPError}</span>
                                        </div> */}

                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">OTP</label>
                                            <div className="input-group">
                                                <span className={`input-group-text ${OTPError ? 'input-group-text-danger' : ''}`}><i className="bi bi-key geycoloricon"></i></span>
                                                <input type="number" className={`form-control formcontrolinputEmail ${OTPError ? 'border_danger_text' : ''}`} placeholder=' Enter OTP' onChange={handleOTPChange} />
                                            </div>
                                            <div className='mt-2'>
                                                <span className='text-danger font12'>{OTPError}</span>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2 col-12 mx-auto">
                                            <button type="button" className="btn btnsubmitOwn text-white" onClick={() => verifyOTP()}>Verify OTP</button>
                                        </div>
                                        <div className="d-grid gap-2 col-12 mx-auto">
                                            <Link type="submit" className="m-2 text-center text-black text-decoration-none" to='/' onClick={() => sessionStorage.removeItem('ERPForgetToken')}>
                                                <svg className='me-2' xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16">
                                                    <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                                </svg>
                                                Return to the Login Page
                                            </Link>
                                        </div>
                                    </form>
                                </Span14Font>
                            </div>
                        </div>
                    </div>
                    <Toaster />
                </div>
            </Container>
        </>
    )
}

export default VerifyOTP

