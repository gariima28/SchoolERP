import React, { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { getOTPByMailApi, setPassApi, verifyOTPApi } from 'src/Utils/Apis';
import toast from 'react-hot-toast';
import { Icon } from '@iconify/react';

const Container = styled.div`
    height: 100vh;
    .btnsubmitOwn{
        background-color: #008479 !important;
    }

    .geycoloricon{
        color: #ADADBD;
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

    .form-control{
        box-shadow: none !important;
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



const NewPassSet = () => {

    const navigate = useNavigate();

    const [pass, setPass] = useState('');
    const [passError, setPassError] = useState('');

    const handlePassChange = (e) => {
        const passValue = e.target.value;
        setPass(passValue);
        setPassError(validatePassword(passValue));
    };


    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    // *********************************************************************************
    //                        Validation of all inputs
    // *********************************************************************************

    const PasswordRegex = /^(?!.*#)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@./_])\S{8,}$/;

    const validatePassword = (value) => {
        if (!value.trim()) {
            return 'Password is required';
        } else if (!PasswordRegex.test(value)) {
            return 'Must have a uppercase letter, lower case letter, a digit, and a special character !!';
        }

        return '';
    };

    const validateFields = () => {
        let isValid = true;

        if (!pass) {
            setPassError('* Password is required');
            isValid = false;
        } else {
            setPassError('');
        }

        return isValid;
    };

    // *********************************************************************************
    //                        Validation of all inputs
    // *********************************************************************************


    const setPassword = async () => {
        if (validateFields()) {
            try {
                // console.log(pass, pass)
                var response = await setPassApi(pass);
                if (response?.status === 200) {
                    if (response?.data?.status === 'success') {
                        toast.success(response?.data?.message)
                        navigate('/forgetsuccess');
                    }
                    else {
                        toast.error(response?.data?.message)
                    }
                }
            }
            catch (error) {
                // setloaderx/State(false);
                // console.log(error)
            }
            finally {
                // setloaderState(false);
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
                                    <h2 className='text-grey font16 mb-3'>We have sent a verification code to your mobile number</h2>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            {/* <div className="d-flex bg-white">
                                                <input type={showPassword ? 'text' : 'password'} className={`form-control formcontrolinputpass ${passError ? 'border-1 border-danger' : ''} `} id="exampleInputPassword1" placeholder='Password' onChange={handlePassChange} />
                                                <div className="formcontrolinputpasseye p-1 ps-2 pe-2"><span className="align-self-center" onClick={toggleShowPassword}> {showPassword ? <Icon icon="clarity:eye-show-line" width="2em" height="2em" style={{ color: '#e2e2e2' }} /> : <Icon icon="clarity:eye-hide-line" width="2em" height="2em" style={{ color: '#e2e2e2' }} />} </span></div>
                                            </div> */}
                                            <div className="input-group">
                                                <span className={`input-group-text ${passError ? 'input-group-text-danger' : ''}`}>
                                                    <i className="bi bi-key geycoloricon"></i>
                                                </span>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    className={`form-control formcontrolinputpass ${passError ? 'border_danger' : ''}`}
                                                    id="exampleInputPassword1"
                                                    placeholder="6+ Strong Character"
                                                    onChange={handlePassChange}
                                                />

                                                <div className={`formcontrolinputpasseye p-1 ps-2 pe-2  ${passError ? 'border_danger_eye' : ''} `}><span className="align-self-center" onClick={toggleShowPassword}> {showPassword ? <Icon icon="clarity:eye-show-line" width="2em" height="2em" style={{ color: '#008479' }} /> : <Icon icon="clarity:eye-hide-line" width="2em" height="2em" style={{ color: '#d9d7d7' }} />} </span></div>
                                            </div>
                                            <div>
                                                <span className='text-danger'>{passError}</span>
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2 col-12 mx-auto">
                                            <Link type="submit" className="btn btnsubmitOwn text-white" onClick={setPassword}>Save Password</Link>
                                        </div>
                                        <div className="d-grid gap-2 col-12 mx-auto">
                                            <Link type="submit" className="m-2 text-center text-black text-decoration-none" to='/' onClick={() => sessionStorage.removeItem('ERPForgetToken')}>
                                                <svg className='me-2' xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16">
                                                    <path fill="#008479" fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                                </svg>
                                                Return to the Login Page
                                            </Link>
                                        </div>
                                    </form>
                                </Span14Font>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default NewPassSet
