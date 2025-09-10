import React, { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { Icon } from '@iconify/react';

const Container = styled.div`

    height: 100vh;

    .geycoloricon{
        color: #ADADBD;
    }

    .form-check-input:checked{
        background-color: var(--greenTextColor);
        border-color: var(--greenTextColor);
    }

    .form-check-input{
        box-shadow: none !important;
    }

    .loginmain{
        height: 100vh;
    }

    .btnsubmitOwn{
        background-color: #008479 !important;
    }

    .loginrow{
        height: 100%;
        align-items: center;
        justify-content: center;
        background:linear-gradient(#F0F8F7, white);
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

const Login = () => {

    const navigate = useNavigate('')
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");
    const [toastDisplayed, setToastDisplayed] = useState(false);
    const [isRemeberChecked, setIsRemeberChecked] = useState(false);

    const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,15}[.]{1}[A-Za-z.]{2,6}$/;
    const PasswordRegex = /^(?=.*[a-z])(?=.*[@./_])(?=.*[0-9])(?=^\S*$).{4,}$/;
    // const PasswordRegex = /^(?=.*[A-Z])(?=.*[@./_])(?=.*[0-9])(?=^\S*$).{4,}$/;

    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (value) => {
        if (!value.trim()) {
            return 'Email is required *';
        } else if (!emailRegex.test(value)) {
            return 'Invalid email format *';
        }
        return '';
    };

    const validatePassword = (value) => {
        if (!value.trim()) {
            return 'Password is required *';
        }
        // else if (!PasswordRegex.test(value)) {
        //     return 'Invalid password format';
        // }
        return '';
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(validateEmail(e.target.value));
        setToastDisplayed(false);
    };

    const handlePassword = (e) => {
        setPass(e.target.value);
        setPassError(validatePassword(e.target.value));
        setToastDisplayed(false);
    };

    const validateFields = () => {
        const emailValid = validateEmail(email);
        const passwordValid = validatePassword(pass);

        setEmailError(emailValid);
        setPassError(passwordValid);

        return !emailValid && !passwordValid; // true only if both valid
    };

    const SubmitLogin = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            if (!toastDisplayed) {
                setToastDisplayed(true);
                toast.error('Please validate all fields first.');
            }
            return;
        }

        try {
            const data = {
                email: email,
                password: pass,
            };

            const response = await loginApi(data);

            if (response?.status === 200) {
                const responseData = response.data;

                if (responseData.status === 'success') {
                    const loginTimestamp = Date.now();
                    sessionStorage.setItem('loginTimestamp', loginTimestamp);

                    if (responseData.isNewLogin) {
                        sessionStorage.setItem('forgetToken', responseData.token);
                        navigate('/verifyOtp');
                    } else {
                        sessionStorage.setItem('loggedInUserRole', responseData.role);
                        // Set flag for PARENT to show modal on first dashboard visit
                        if (responseData.role === 'PARENT') {
                            sessionStorage.setItem('showParentModal', 'true');
                        }
                        if (responseData.role === 'ADMIN' && responseData.subscription === 'setPrefix') {
                            sessionStorage.setItem('subscription', responseData.subscription);
                        }

                        sessionStorage.setItem('token', responseData.token);
                        window.location.reload()
                        navigate('/');
                    }
                } else {
                    if (!toastDisplayed) {
                        setToastDisplayed(true);
                        toast.error(responseData?.message || 'Login failed. Please try again.');
                    }
                    
                }
            } else {
                if (!toastDisplayed) {
                    setToastDisplayed(true);
                    toast.error(response?.error || 'Unexpected error occurred.');
                }
            }
        } catch (error) {
            // setloaderState(false);
            if (error?.response?.status === 401) {
                sessionStorage.clear();
                if (!toastDisplayed) {
                    setToastDisplayed(true);
                    toast.error('Session expired. Please log in again.');
                }
                navigate('/');
            } else {
                console.error('Error during login:', error);
                if (!toastDisplayed) {
                    setToastDisplayed(true);
                    toast.error('An unexpected error occurred. Please try again later.');
                }
            }
        }
        finally{
            window.location.reload()
            navigate('/');
        }
    };

    return (

        <Container>
            <div className="conatiner-fluid loginmain">
                <div className="row loginrow">
                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center">
                        <img src="/images/loginimg.svg" alt="" className='img-fluid m-4' />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="row me-xl-5 ms-xl-5 ps-xl-5 pe-xl-5 ps-lg-5 pe-lg-5 p-sm-5 m-sm-5 p-3 m-3">
                            <p className='text-center'><img src="/images/edu2alllogo.svg" alt="" className='img-fluid' /></p>
                            <form className='pt-xl-3 pe-xl-5 ps-xl-5 pt-lg-2 pe-lg-2 ps-lg-2'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                    <div className="input-group">
                                        <span className={`input-group-text ${emailError ? 'input-group-text-danger' : ''}`}>
                                            <i className="bi bi-envelope geycoloricon"></i>
                                        </span>
                                        <input
                                            type="email"
                                            className={`form-control formcontrolinputEmail ${emailError ? 'border_danger_text' : ''}`}
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Your Email Address"
                                            onChange={handleEmailChange}
                                        />
                                    </div>
                                    <div>
                                        <span className='text-danger font12'>{emailError}</span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <div className="input-group">
                                        <span className={`input-group-text ${passError ? 'input-group-text-danger' : ''}`}>
                                            <i className="bi bi-key geycoloricon"></i>
                                        </span>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className={`form-control formcontrolinputpass ${passError ? 'border_danger' : ''}`}
                                            id="exampleInputPassword1"
                                            placeholder="6+ Strong Character"
                                            onChange={handlePassword}
                                        />

                                        <div className={`formcontrolinputpasseye p-1 ps-2 pe-2  ${passError ? 'border_danger_eye' : ''} `}><span className="align-self-center" onClick={toggleShowPassword}> {showPassword ? <Icon icon="clarity:eye-show-line" width="2em" height="2em" style={{ color: '#008479' }} /> : <Icon icon="clarity:eye-hide-line" width="2em" height="2em" style={{ color: '#d9d7d7' }} />} </span></div>
                                    </div>
                                    <div>
                                        <span className='text-danger font12'>{passError}</span>
                                    </div>
                                </div>



                                <div className="mb-4 mt-4 form-check d-flex">
                                    <div className="col-6">
                                        {/* <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={() => setIsRemeberChecked(!isRemeberChecked)} />
                                        <label className="form-check-label ps-2" htmlFor="exampleCheck1">Remember Me</label> */}
                                    </div>
                                    <div className="col-6 text-end">
                                        <Link className='text-primary text-decoration-none' to='/forgotPassword'>Forget Password?</Link>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 col-12 mx-auto">
                                    <Link type="submit" className="btn btnsubmitOwn text-white" onClick={(e) => SubmitLogin(e)}>Submit</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Toaster />
            </div>


        </Container>
    )
}

export default Login
