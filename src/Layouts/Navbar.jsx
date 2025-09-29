import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAdminProfileApi, getParentProfileApi, getStudentProfileApi, selectStudentInParentApi, getStudentsListInParentApi, getSuperAdminProfileApi, getTeacherProfileApi } from 'src/Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from './Loader';

const Container = styled.div`
    padding: 0% !important;
    /* z-index: 1; */

    .display-nonee{
        display: block;
    }

    @media screen and (max-width : 750px) and (min-width : 0px) {
        .display-nonee{
            display: none !important;
        }
    }

    .fitContent{
        width: fit-content;
    }

    .cursorrrr{
        cursor: default;
    }

    .dropdown-menu{
        width: 200px;
        padding: 10px;
        left: 2% !important;
        top: 1% !important;
    }

    .dropdown-toggle::after{
        display: none !important;
    }

`;

const Navbar = ({ openSidebar, setOpenSidebar }) => {
    const handleEvents = () => {
        setOpenSidebar(!openSidebar);
    };
    const navigate = useNavigate()

    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('loggedInUserRole');
    const showParentModal = sessionStorage.getItem('showParentModal');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [data, setData] = useState();
    const [StudentsData, setStudentsData] = useState();

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [initialSelectedStudent, setInitialSelectedStudent] = useState(null);

    useEffect(() => {
        getProfileData();
        // Load selected student from sessionStorage
        const storedStudentId = sessionStorage.getItem('selectedStudentId');
        if (storedStudentId) {
            setSelectedStudent(storedStudentId);
            setInitialSelectedStudent(storedStudentId);
        }


        // Auto-open modal for PARENT on first dashboard visit
        if (role === 'PARENT' && sessionStorage.getItem('showParentModal') === 'true') {
            getStudentsListInParent(); // Fetch student list
            setTimeout(() => {
                const modal = new bootstrap.Modal(document.getElementById('exampleModal'), {
                    backdrop: 'static', // Prevent closing by clicking outside
                    keyboard: false, // Prevent closing with keyboard
                });
                modal.show();
                // Clear the flag to prevent re-opening on redirect
                sessionStorage.removeItem('showParentModal');
            }, 500); // Small delay to ensure DOM is ready
        }
    }, [role]);

    const ProfileApi = role === 'SUPERADMIN' ? getSuperAdminProfileApi() : role === 'ADMIN' ? getAdminProfileApi() : role === 'USER' ? getTeacherProfileApi() : role === 'PARENT' ? getParentProfileApi() : role === 'STUDENT' ? getStudentProfileApi() : '';

    const getProfileData = async () => {
        try {
            setloaderState(true);
            var response = await ProfileApi;
            if (response?.status === 200) {
                setData(response?.data)
                setloaderState(false);
            }
            else {
                setloaderState(false);
                // // console.log(response.data.message)
            }
        }
        catch (error) {
            setloaderState(false);
            setloaderState(false);
            // // console.log(error.message)
            toast.error(error.message)
        }

        finally {
            setloaderState(false);
        }
    }

    const getStudentsListInParent = async () => {
        try {
            setloaderState(true);
            var response = await getStudentsListInParentApi();
            if (response?.status === 200) {
                if (response.data.status === 'success') {
                    setStudentsData(response.data.students)
                    setloaderState(false);
                }
            }
            else {
                setloaderState(false);
                // // console.log(response.data.message)
            }
        }
        catch (error) {
            setloaderState(false);
            setloaderState(false);
            // // console.log(error.message)
            toast.error(error.message)
        }
        finally {
            setloaderState(false);
        }
    }


    const handleStudentSelect = (studentId) => {
        setSelectedStudent(studentId)
    };

    const handleContinue = async () => {
        try {
            // setloaderState(true);
            var response = await selectStudentInParentApi(selectedStudent);
            if (response?.status === 200) {
                if (response.data.status === 'success') {
                    setStudentsData(response.data.students)
                    sessionStorage.setItem('selectedStudentId', selectedStudent);
                    sessionStorage.removeItem(token);
                    sessionStorage.setItem('token', response.data.token);
                    const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
                    modal.hide();
                    navigate('/')
                    setTimeout(() => {
                        window.location.reload()
                    }, 300);
                }
            }
            else {
                // setloaderState(false);
                // // console.log(response.data.message)
            }
        }
        catch (error) {
            // setloaderState(false);
            // // console.log(error.message)
            toast.error(error.message)
        }
        finally {
            setloaderState(false);
        }
    };

    return (
        <Container>
            {loaderState && (<DataLoader />)}
            <div className="container-fluid bg-white">
                <div className="row p-1">
                    <div className="col-md-4 col-sm-6 col-6">
                        <div className="d-flex">
                            <div className="flex-grow-1 p-2 align-self-center">
                                <button className="btn togglebtn" onClick={handleEvents}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style={{ cursor: 'pointer' }} >
                                        <path fill="#008479" stroke="#008479" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17h14M5 12h14M5 7h14" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-2 align-self-center">
                                {/* <form className="d-flex" role="search">
                                    <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                                    <button className="btn searchhhButtons text-white " type="button"><span className='font14'>Search</span></button>
                                </form> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-6 col-6">
                        <div className="d-flex align-self-center mt-1">
                            <div className="flex-grow-1 p-2 align-self-center"></div>
                            <div className="p-2 align-self-center">
                                {/* <Icon icon="mingcute:notification-newdot-line" width="1.8em" height="1.8em" style={{ color: '#000' }} /> */}
                            </div>
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
                                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} className="border rounded-circle p-1" src="/images/userProfile.png" alt="..." height={35} />
                                            ) : (
                                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} className="border rounded-circle p-1" src={data?.image} alt="..." height={35} />
                                            )}
                                        </div>
                                        <div className="col-md-9 display-nonee text-start3">
                                            <div className="row">
                                                <p className="font14 pe-0">{data?.name}</p>
                                                <p className="font14 pe-0">{data?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="dropdown-menu" aria-labelledby="parentDropdown">
                                        {role === 'PARENT' &&
                                            <li>
                                                <button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getStudentsListInParent()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path fill="#008479" d="M14.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L16.586 8H5a1 1 0 0 1 0-2h11.586l-2.293-2.293a1 1 0 0 1 0-1.414m-4.586 10a1 1 0 0 1 0 1.414L7.414 16H19a1 1 0 1 1 0 2H7.414l2.293 2.293a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0" stroke-width="0.2" stroke="#008479" />
                                                    </svg>
                                                    <span className='ms-3 font14'>
                                                        Switch Account
                                                    </span>
                                                </button>
                                            </li>
                                        }
                                        <li>
                                            {/* <Link className="dropdown-item" to="/parent/profile">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <g fill="none" fill-rule="evenodd">
                                                        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                                                        <path fill="#008479" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.99 7.99 0 0 1 12 20a7.99 7.99 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984" stroke-width="0.2" stroke="#008479" />
                                                    </g>
                                                </svg>
                                                <span className='ms-3 font14'>
                                                    Profile Details
                                                </span>
                                            </Link> */}
                                            <Link
                                                className={`dropdown-item d-flex text-decoration-none text-black p-0 ${role === 'SUPERADMIN' ? 'cursorrrr' : ''}`}
                                                to={
                                                    role === 'SUPERADMIN'
                                                        ? ''
                                                        : role === 'ADMIN'
                                                            ? '/admin/settings/myAccount'
                                                            : role === 'USER'
                                                                ? '/teacher/profile'
                                                                : role === 'STUDENT'
                                                                    ? '/student/profile'
                                                                : role === 'PARENT'
                                                                    ? '/parent/profile' : ''
                                                }
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <g fill="none" fill-rule="evenodd">
                                                        <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                                                        <path fill="#008479" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.99 7.99 0 0 1 12 20a7.99 7.99 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984" stroke-width="0.2" stroke="#008479" />
                                                    </g>
                                                </svg>
                                                <span className='ms-3 font14'>
                                                    Profile Details
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/parent/profile">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32">
                                                    <path fill="#008479" d="M21 2a8.998 8.998 0 0 0-8.612 11.612L2 24v6h6l10.388-10.388A9 9 0 1 0 21 2m0 16a7 7 0 0 1-2.032-.302l-1.147-.348l-.847.847l-3.181 3.181L12.414 20L11 21.414l1.379 1.379l-1.586 1.586L9.414 23L8 24.414l1.379 1.379L7.172 28H4v-3.172l9.802-9.802l.848-.847l-.348-1.147A7 7 0 1 1 21 18" stroke-width="1" stroke="#008479" />
                                                    <circle cx="22" cy="10" r="2" fill="#008479" stroke-width="1" stroke="#008479" />
                                                </svg>
                                                <span className='ms-3 font14'>
                                                    Change Password
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/parent/profile">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="#008479" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2a9.99 9.99 0 0 1 8 4h-2.71a8 8 0 1 0 .001 12h2.71A9.99 9.99 0 0 1 12 22m7-6v-3h-8v-2h8V8l5 4z" stroke-width="0.2" stroke="#008479" />
                                                </svg>
                                                <span className='ms-3 font14'>
                                                    Logout
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

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
                                {StudentsData?.map((student) => (
                                    <div
                                        key={student.studentId}
                                        className={`border rounded p-3 text-center ${selectedStudent === student.studentId ? 'border-success' : ''
                                            }`}
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
