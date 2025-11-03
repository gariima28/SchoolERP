import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DataLoader from './Loader';
import { getAdminProfileApi, getParentProfileApi, getStudentProfileApi, selectStudentInParentApi, getStudentsListInParentApi, getSuperAdminProfileApi, getTeacherProfileApi, changePasswordAPI } from 'src/Utils/Apis';

const Container = styled.div`
    padding: 0% !important;

    .display-nonee {
        display: block;
    }

    @media screen and (max-width: 750px) and (min-width: 0px) {
        .display-nonee {
            display: none !important;
        }
    }

    .fitContent {
        width: fit-content;
    }

    .cursorrrr {
        cursor: default;
    }

    .eyebutton{
        padding-bottom: 30px;
        border: 1px solid #dfe1e5 !important;
    }

    .dropdown-menu {
        width: 200px;
        padding: 10px;
        left: 2% !important;
        top: 1% !important;
    }

    .dropdown-toggle::after {
        display: none !important;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 32rem;
`;

const Navbar = ({ openSidebar, setOpenSidebar }) => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [loaderState, setLoaderState] = useState(false);
    const [data, setData] = useState();
    const [studentsData, setStudentsData] = useState();
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [initialSelectedStudent, setInitialSelectedStudent] = useState(null);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('loggedInUserRole');
    const showParentModal = sessionStorage.getItem('showParentModal');

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const newPassword = watch('newPassword');

    const ProfileApi = role === 'SUPERADMIN' ? getSuperAdminProfileApi() :
        role === 'ADMIN' ? getAdminProfileApi() :
            role === 'USER' ? getTeacherProfileApi() :
                role === 'PARENT' ? getParentProfileApi() :
                    role === 'STUDENT' ? getStudentProfileApi() : '';

    useEffect(() => {
        getProfileData();
        const storedStudentId = sessionStorage.getItem('selectedStudentId');
        if (storedStudentId) {
            setSelectedStudent(storedStudentId);
            setInitialSelectedStudent(storedStudentId);
        }

        if (role === 'PARENT' && showParentModal === 'true') {
            getStudentsListInParent();
            setTimeout(() => {
                const modal = new bootstrap.Modal(document.getElementById('exampleModal'), {
                    backdrop: 'static',
                    keyboard: false,
                });
                modal.show();
                sessionStorage.removeItem('showParentModal');
            }, 500);
        }
    }, [role]);

    const getProfileData = async () => {
        try {
            setLoaderState(true);
            const response = await ProfileApi;
            if (response?.status === 200) {
                setData(response?.data);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoaderState(false);
        }
    };

    const getStudentsListInParent = async () => {
        try {
            setLoaderState(true);
            const response = await getStudentsListInParentApi();
            if (response?.status === 200 && response.data.status === 'success') {
                setStudentsData(response.data.students);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoaderState(false);
        }
    };

    const handleStudentSelect = (studentId) => {
        setSelectedStudent(studentId);
    };

    const handleContinue = async () => {
        try {
            const response = await selectStudentInParentApi(selectedStudent);
            if (response?.status === 200 && response.data.status === 'success') {
                setStudentsData(response.data.students);
                sessionStorage.setItem('selectedStudentId', selectedStudent);
                sessionStorage.removeItem('token');
                sessionStorage.setItem('token', response.data.token);
                const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
                modal.hide();
                navigate('/');
                setTimeout(() => window.location.reload(), 300);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoaderState(false);
        }
    };

    const onSubmit = async (formData) => {
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const PayloadFormData = new FormData();
        PayloadFormData.append('email', formData.email);
        PayloadFormData.append('oldPassword', formData.oldPassword);
        PayloadFormData.append('password', formData.newPassword);

        try {
            setLoaderState(true);
            const response = await changePasswordAPI(PayloadFormData);
            if (response?.status === 200) {
                if (response.data.status === 'success') {
                    toast.success('Password updated successfully');
                    setShowPasswordModal(false);
                    reset();
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            toast.error(error.message || 'Failed to update password');
        } finally {
            setLoaderState(false);
        }
    };

    return (
        <Container>
            {loaderState && <DataLoader />}
            <div className="container-fluid bg-white">
                <div className="row p-1">
                    <div className="col-md-4 col-sm-6 col-6">
                        <div className="d-flex">
                            <div className="flex-grow-1 p-2 align-self-center">
                                <button className="btn togglebtn" onClick={() => setOpenSidebar(!openSidebar)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                                        <path fill="#008479" stroke="#008479" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17h14M5 12h14M5 7h14" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-2 align-self-center"></div>
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-6 col-6">
                        <div className="d-flex align-self-center mt-1">
                            <div className="flex-grow-1 p-2 align-self-center"></div>
                            <div className="p-2 align-self-center"></div>
                            <div className="row p-2 ms-2 me-md-0 me-1">
                                <div className="dropdown">
                                    <div
                                        className="d-flex text-decoration-none text-black p-0 dropdown-toggle"
                                        id="parentDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="col-md-3 align-self-center">
                                            {data?.image === null ? (
                                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} className="border rounded-circle p-1 roundeImage" src="/images/userProfile.png" alt="..." height={35} />
                                            ) : (
                                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} className="border rounded-circle p-1 roundeImage" src={data?.image} alt="..." height={35} />
                                            )}
                                        </div>
                                        <div className="col-md-9 display-nonee text-start3">
                                            <div className="row">
                                                <p className="font14 pe-0">{data?.name}</p>
                                                <p className="font14 pe-0">{data?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="dropdown-menu px-3" aria-labelledby="parentDropdown">
                                        {role === 'PARENT' && (
                                            <li>
                                                <button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={getStudentsListInParent}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path fill="#008479" d="M14.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L16.586 8H5a1 1 0 0 1 0-2h11.586l-2.293-2.293a1 1 0 0 1 0-1.414m-4.586 10a1 1 0 0 1 0 1.414L7.414 16H19a1 1 0 1 1 0 2H7.414l2.293 2.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0" stroke-width="0.2" stroke="#008479" />
                                                    </svg>
                                                    <span className='ms-3 font14'>Switch Account</span>
                                                </button>
                                            </li>
                                        )}
<<<<<<<<< Temporary merge branch 1
                                        <li>
=========
                                          <li>
                                             <Link className="dropdown-item p-0 my-2" to="/parent/profile">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                                                    <path fill="#008479" d="M21 2a8.998 8.998 0 0 0-8.612 11.612L2 24v6h6l10.388-10.388A9 9 0 1 0 21 2m0 16a7 7 0 0 1-2.032-.302l-1.147-.348l-.847.847l-3.181 3.181L12.414 20L11 21.414l1.379 1.379l-1.586 1.586L9.414 23L8 24.414l1.379 1.379L7.172 28H4v-3.172l9.802-9.802l.848-.847l-.348-1.147A7 7 0 1 1 21 18" stroke-width="1" stroke="#008479" />
                                                    <circle cx="22" cy="10" r="2" fill="#008479" stroke-width="1" stroke="#008479" />
                                                </svg>
                                                <span className='ms-3 font14'>
                                                    Change Password
                                                </span>
                                            </Link>
                                        </li> */}
                                        {/* <li>
                                            <Link
                                            <Link className="dropdown-item p-0 my-2" to="/parent/profile">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                                                    <path fill="#008479" d="M21 2a8.998 8.998 0 0 0-8.612 11.612L2 24v6h6l10.388-10.388A9 9 0 1 0 21 2m0 16a7 7 0 0 1-2.032-.302l-1.147-.348l-.847.847l-3.181 3.181L12.414 20L11 21.414l1.379 1.379l-1.586 1.586L9.414 23L8 24.414l1.379 1.379L7.172 28H4v-3.172l9.802-9.802l.848-.847l-.348-1.147A7 7 0 1 1 21 18" stroke-width="1" stroke="#008479" />
                                                    <circle cx="22" cy="10" r="2" fill="#008479" stroke-width="1" stroke="#008479" />
                                                </svg>
                                                <span className='ms-3 font14'>
                                                    Change Password
                                                </span>
                                            </Link>
                                        </Link>
                                        </li> */}
                                        {/* <li>
                                            <Link className="dropdown-item" to="/parent/profile">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="#008479" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.99 9.99 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.99 9.99 0 0 1 12 22m7-6v-3h-8v-2h8V8l5 4z" stroke-width="0.2" stroke="#008479" />
                                                </svg>
                                                <span className='ms-3 font14'>
                                                    Logout
                                                </span>
                                            </Link>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showPasswordModal && (
                <ModalOverlay>
                    <ModalContent>
                        <div className="flex justify-between items-center">
                            <h2 className="font16 font-semibold text-gray-800">Change Password</h2>
                            <hr />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-3">
                            <div className='mb-3'>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                    className="mt-1 block w-full form-control rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {errors.email && <p className="mt-1 text-danger font12">{errors.email.message}</p>}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                                <div className="input-group">
                                    <input
                                        id="oldPassword"
                                        type={showOldPassword ? "text" : "password"}
                                        {...register('oldPassword', {
                                            required: 'Old password is required',
                                            minLength: {
                                                value: 8,
                                                message: 'Password must be at least 8 characters'
                                            }
                                        })}
                                        className="form-control rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    <button
                                        type="button"
                                        className="btn cancelButtons eyebutton shadow-sm"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                    >
                                        {showOldPassword ?

                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1024 1024">
                                                < path fill="#000" d="M515.472 321.408c-106.032 0-192 85.968-192 192c0 106.016 85.968 192 192 192s192-85.968 192-192s-85.968-192-192-192m0 320c-70.576 0-129.473-58.816-129.473-129.393s57.424-128 128-128c70.592 0 128 57.424 128 128s-55.935 129.393-126.527 129.393m508.208-136.832c-.368-1.616-.207-3.325-.688-4.91c-.208-.671-.624-1.055-.864-1.647c-.336-.912-.256-1.984-.72-2.864c-93.072-213.104-293.663-335.76-507.423-335.76S95.617 281.827 2.497 494.947c-.4.897-.336 1.824-.657 2.849c-.223.624-.687.975-.895 1.567c-.496 1.616-.304 3.296-.608 4.928c-.591 2.88-1.135 5.68-1.135 8.592c0 2.944.544 5.664 1.135 8.591c.32 1.6.113 3.344.609 4.88c.208.72.672 1.024.895 1.68c.336.88.256 1.968.656 2.848c93.136 213.056 295.744 333.712 509.504 333.712c213.776 0 416.336-120.4 509.44-333.505c.464-.912.369-1.872.72-2.88c.224-.56.655-.976.848-1.6c.496-1.568.336-3.28.687-4.912c.56-2.864 1.088-5.664 1.088-8.624c0-2.816-.528-5.6-1.104-8.497M512 800.595c-181.296 0-359.743-95.568-447.423-287.681c86.848-191.472 267.68-289.504 449.424-289.504c181.68 0 358.496 98.144 445.376 289.712C872.561 704.53 693.744 800.595 512 800.595" stroke-width="25.5" stroke="#fff" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                <g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                    <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                                                    <path d="M16.681 16.673A8.7 8.7 0 0 1 12 18q-5.4 0-9-6q1.908-3.18 4.32-4.674m2.86-1.146A9 9 0 0 1 12 6q5.4 0 9 6q-1 1.665-2.138 2.87M3 3l18 18" />
                                                </g>
                                            </svg>
                                        }
                                    </button>
                                </div>
                                {errors.oldPassword && <p className="mt-1 text-danger font12">{errors.oldPassword.message}</p>}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                                <div className="input-group">
                                    <input
                                        id="newPassword"
                                        type={showNewPassword ? "text" : "password"}
                                        {...register('newPassword', {
                                            required: 'New password is required',
                                            minLength: {
                                                value: 8,
                                                message: 'Password must be at least 8 characters'
                                            }
                                        })}
                                        className="form-control rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    <button
                                        type="button"
                                        className="btn cancelButtons eyebutton shadow-sm"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ?

                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1024 1024">
                                                < path fill="#000" d="M515.472 321.408c-106.032 0-192 85.968-192 192c0 106.016 85.968 192 192 192s192-85.968 192-192s-85.968-192-192-192m0 320c-70.576 0-129.473-58.816-129.473-129.393s57.424-128 128-128c70.592 0 128 57.424 128 128s-55.935 129.393-126.527 129.393m508.208-136.832c-.368-1.616-.207-3.325-.688-4.91c-.208-.671-.624-1.055-.864-1.647c-.336-.912-.256-1.984-.72-2.864c-93.072-213.104-293.663-335.76-507.423-335.76S95.617 281.827 2.497 494.947c-.4.897-.336 1.824-.657 2.849c-.223.624-.687.975-.895 1.567c-.496 1.616-.304 3.296-.608 4.928c-.591 2.88-1.135 5.68-1.135 8.592c0 2.944.544 5.664 1.135 8.591c.32 1.6.113 3.344.609 4.88c.208.72.672 1.024.895 1.68c.336.88.256 1.968.656 2.848c93.136 213.056 295.744 333.712 509.504 333.712c213.776 0 416.336-120.4 509.44-333.505c.464-.912.369-1.872.72-2.88c.224-.56.655-.976.848-1.6c.496-1.568.336-3.28.687-4.912c.56-2.864 1.088-5.664 1.088-8.624c0-2.816-.528-5.6-1.104-8.497M512 800.595c-181.296 0-359.743-95.568-447.423-287.681c86.848-191.472 267.68-289.504 449.424-289.504c181.68 0 358.496 98.144 445.376 289.712C872.561 704.53 693.744 800.595 512 800.595" stroke-width="25.5" stroke="#fff" />
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                <g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                    <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                                                    <path d="M16.681 16.673A8.7 8.7 0 0 1 12 18q-5.4 0-9-6q1.908-3.18 4.32-4.674m2.86-1.146A9 9 0 0 1 12 6q5.4 0 9 6q-1 1.665-2.138 2.87M3 3l18 18" />
                                                </g>
                                            </svg>
                                        }
                                    </button>
                                </div>
                                {errors.newPassword && <p className="mt-1 text-danger font12">{errors.newPassword.message}</p>}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="input-group">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        {...register('confirmPassword', {
                                            required: 'Please confirm your password',
                                            validate: value => value === newPassword || 'Passwords do not match'
                                        })}
                                        className="form-control rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    />
                                    <button
                                        type="button"
                                        className="btn cancelButtons eyebutton shadow-sm"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? 
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1024 1024">
                                            < path fill="#000" d="M515.472 321.408c-106.032 0-192 85.968-192 192c0 106.016 85.968 192 192 192s192-85.968 192-192s-85.968-192-192-192m0 320c-70.576 0-129.473-58.816-129.473-129.393s57.424-128 128-128c70.592 0 128 57.424 128 128s-55.935 129.393-126.527 129.393m508.208-136.832c-.368-1.616-.207-3.325-.688-4.91c-.208-.671-.624-1.055-.864-1.647c-.336-.912-.256-1.984-.72-2.864c-93.072-213.104-293.663-335.76-507.423-335.76S95.617 281.827 2.497 494.947c-.4.897-.336 1.824-.657 2.849c-.223.624-.687.975-.895 1.567c-.496 1.616-.304 3.296-.608 4.928c-.591 2.88-1.135 5.68-1.135 8.592c0 2.944.544 5.664 1.135 8.591c.32 1.6.113 3.344.609 4.88c.208.72.672 1.024.895 1.68c.336.88.256 1.968.656 2.848c93.136 213.056 295.744 333.712 509.504 333.712c213.776 0 416.336-120.4 509.44-333.505c.464-.912.369-1.872.72-2.88c.224-.56.655-.976.848-1.6c.496-1.568.336-3.28.687-4.912c.56-2.864 1.088-5.664 1.088-8.624c0-2.816-.528-5.6-1.104-8.497M512 800.595c-181.296 0-359.743-95.568-447.423-287.681c86.848-191.472 267.68-289.504 449.424-289.504c181.68 0 358.496 98.144 445.376 289.712C872.561 704.53 693.744 800.595 512 800.595" stroke-width="25.5" stroke="#fff" />
                                        </svg>
                                        :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                                                <g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                    <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                                                    <path d="M16.681 16.673A8.7 8.7 0 0 1 12 18q-5.4 0-9-6q1.908-3.18 4.32-4.674m2.86-1.146A9 9 0 0 1 12 6q5.4 0 9 6q-1 1.665-2.138 2.87M3 3l18 18" />
                                                </g>
                                            </svg>
                                        }
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="mt-1 text-danger font12">{errors.confirmPassword.message}</p>}
                            </div>
                            <div className="d-flex justify-content-center space-x-3 mt-4">
                                <button
                                    type="submit"
                                    className="btn addButtons3 font14 text-white"
                                >
                                    Update Password
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="btn cancelButtons font14 text-black ms-3"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}

            <div className="modal modal-lg fade" id="exampleModal" role="dialog" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header border-bottom">
                            <h5 className="modal-title activeText font16">Child Details</h5>
                            {!showParentModal && <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>}
                        </div>
                        <div className="modal-body text-center font14">
                            <p className='mb-3'>Please select the child you want to log in with,<br />and then click the Continue button.</p>
                            <div className="d-flex flex-wrap justify-content-center gap-3">
                                {studentsData?.map((student) => (
                                    <div
                                        key={student.studentId}
                                        className={`border rounded p-3 text-center ${selectedStudent === student.studentId ? 'border-success' : ''}`}
                                        style={{ width: '140px', cursor: 'pointer' }}
                                        onClick={() => handleStudentSelect(student.studentId)}
                                    >
                                        <img
                                            onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }}
                                            src={student.studentImage}
                                            alt={student.studentName}
                                            className="rounded-circle mb-2"
                                            width="70"
                                            height="70"
                                        />
                                        <div className="fw-bold">{student.studentName}</div>
                                        <div className="text-muted small">{student.classNo}</div>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="btn btn-success mt-4 px-4"
                                onClick={handleContinue}
                                disabled={selectedStudent === initialSelectedStudent}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Navbar;
