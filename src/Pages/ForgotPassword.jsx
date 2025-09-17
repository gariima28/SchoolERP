import React, { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { getOTPByMailApi } from 'src/Utils/Apis';
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


    .geycoloricon{
        color: #ADADBD;
    }


`;

const Span14Font = styled.span`
    font-size: 14px;
    font-family: Noto Sans;
`;



const ForgotPassword = () => {

    const navigate = useNavigate();

    const [mail, setMail] = useState('');
    const [mailError, setMailError] = useState('');

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setMail(email);
        setMailError(validateMail(email));
    };

    // *********************************************************************************
    //                        Validation of all inputs
    // *********************************************************************************

    const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;

    const validateMail = (value) => {
        if (!value.trim()) {
            return 'Email is required';
        } else if (!emailRegex.test(value)) {
            return 'Invalid characters !!';
        }
        return '';
    };

    const validateFields = () => {
        let isValid = true;

        if (!mail) {
            setMailError('* Email is required');
            isValid = false;
        } else {
            setMailError('');
        }

        return isValid;
    };

    // *********************************************************************************
    //                        Validation of all inputs
    // *********************************************************************************


    const getOtp = async () => {
        if (validateFields()) {
            try {
                // console.log('mail', mail)
                var response = await getOTPByMailApi(mail);
                if (response?.status === 200) {
                    if (response?.data?.status === 'success') {
                        // console.log(response?.data?.token, 'Forget Token')
                        sessionStorage.setItem('ERPForgetToken', response?.data?.token)
                        setTimeout(() => {
                            navigate('/verifyOtp');
                            setTimeout(() => {
                                window.location.reload();
                            }, 700);
                        }, 1000)
                        toast.success(response?.data?.message)
                    }
                    else {
                        toast.error(response?.data?.message)
                    }
                }
                else {
                    toast.error(response?.data?.message)
                }
            }
            catch (error) {
                setloaderState(false);
                setloaderState(false);

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
                                    <p className='font18 mb-1'>Forgot Your Password?</p>
                                    <h2 className='text-grey font16 mb-3'>Enter your email to reset it?</h2>
                                    <form>
                                        {/* <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label font16">Email</label>
                                            <input type="email" className={`form-control formcontrolinput${mailError ? 'border-1 border-danger' : ''} `} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='&#xF0E0; Your Email Address' onChange={handleEmailChange} />
                                            <span className="text-danger">{mailError}</span>
                                        </div> */}

                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                            <div className="input-group">
                                                <span className={`input-group-text ${mailError ? 'input-group-text-danger' : ''}`}>
                                                    <i className="bi bi-envelope geycoloricon"></i>
                                                </span>
                                                <input
                                                    type="email"
                                                    className={`form-control formcontrolinputEmail ${mailError ? 'border_danger_text' : ''}`}
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Your Email Address"
                                                    onChange={handleEmailChange}
                                                />
                                            </div>
                                            <div>
                                                <span className='text-danger font12'>{mailError}</span>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2 col-12 mx-auto">
                                            <Link type="submit" className="btn btnsubmitOwn text-white" onClick={getOtp}>Confirm</Link>
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

export default ForgotPassword
