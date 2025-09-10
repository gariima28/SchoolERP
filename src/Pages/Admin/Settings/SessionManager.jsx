import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { activeSessionDataApi, addNewSessionApi, deleteSessionApi, getAllSessionDataAPI, getSessionDataByIdAPI, updateSessionApi } from '../../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import DataLoader from 'src/Layouts/Loader';
import ActionControls from '../../../Layouts/ActionControls';


const Container = styled.div`

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
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

    .activeSession{
        background-color: var(--activebglightgreen);
    }

    .orangeText{
        color: var(--activeOrangeBorder);
    }
    
    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px ;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }


    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .deleteSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }
    
    .contbtn{
        margin-left: 43% !important;
        margin-top: -20% !important;
    }


`;

const SessionManager = () => {

    const token = sessionStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [activeSessionData, setActiveSession] = useState();
    const [activeSessionId, setActiveSessionId] = useState();
    const [sessionData, setSessionData] = useState([]);
    const [sessionError, setSessionError] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [startDateEdit, setStartDateEdit] = useState('');
    const [startDateEditVal, setStartDateEditVal] = useState('');
    const [endDateEdit, setEndDateEdit] = useState('');
    const [endDateEditVal, setEndDateEditVal] = useState('');
    const [startDateEditError, setStartDateEditError] = useState('');
    const [endDateEditError, setEndDateEditError] = useState('');
    const [sessionEditId, setSessionEditId] = useState('');
    const [DeleteId, setDeleteId] = useState('');
    const [isChecked, setIsChecked] = useState();
    const [disableUpdateBtn, setDisableUpdateBtn] = useState(true);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const [activeSessionItem, setActiveSessionItem] = useState('');
    const [searchKeyData, setSearchKeyData] = useState('');

    useEffect(() => {
        getAllSession()
    }, [token, pageNo])


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const handleStartDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const formattedDate = selectedDate.toISOString().split('T')[0];
        setStartDate(formattedDate);
        setStartDateError('')
    };

    const handleEndDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const formattedDate = selectedDate.toISOString().split('T')[0];
        setEndDate(formattedDate);
        setEndDateError('')
    };

    const handleStartDateEditChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const formattedDate = selectedDate.toISOString().split('T')[0];
        setStartDateEdit(formattedDate);
        setStartDateEditError('')
        // console.log(startDateEdit)
        if (formattedDate !== startDateEditVal) {
            setDisableUpdateBtn(false)
        }
        else {
            setDisableUpdateBtn(true)
        }
    };

    const handleEndDateEditChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const formattedDate = selectedDate.toISOString().split('T')[0];
        setEndDateEdit(formattedDate);
        setEndDateEditError('')
        // console.log(endDateEdit)
        if (formattedDate !== endDateEditVal) {
            setDisableUpdateBtn(false)
        }
        else {
            setDisableUpdateBtn(true)
        }
    };

    const getAllSession = async () => {
        try {
            var response = await getAllSessionDataAPI(pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setSessionData(response?.data?.sessions);
                    setActiveSessionItem(response?.data?.activeSession);
                    setActiveSession(response?.data?.activeSession?.currentYear)
                    setActiveSessionId(response?.data?.activeSession?.sessionId)
                    setSessionId(response?.data?.activeSession?.sessionId)
                    setOpenDropdownId(null);
                }
            }
        }
        catch (error) {
            setloaderState(false);
            setloaderState(false);
            // console.log(error)
            if (error?.response?.data?.statusCode === 401) {
                sessionStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                }, 200);
            }

        }
        finally {
            setloaderState(false);
        }
    }

    const getSessionById = async (id) => {
        try {
            setSessionEditId(id);
            var response = await getSessionDataByIdAPI(id);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setStartDateEdit(response?.data?.session?.startDate);
                    setEndDateEdit(response?.data?.session?.endDate);
                    setStartDateEditVal(response?.data?.session?.startDate);
                    setEndDateEditVal(response?.data?.session?.endDate);
                    // console.log(response?.data?.session?.endDate);
                    // toast.success(response?.data?.message)
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
            // console.log('Error During Get Session', error);
        }
        finally {
            setloaderState(false);
        }
    }

    const AddNewSession = async () => {
        if (validateFields()) {
            try {
                const formData = new FormData();
                formData.append("startDate", startDate);
                formData.append("endDate", endDate);
                var response = await addNewSessionApi(formData);
                if (response?.status === 200) {
                    if (response?.data?.status === 'success') {
                        toast.success(response?.data?.message)
                        const offcanvasElement = document.getElementById('Add_staticBackdrop');
                        if (offcanvasElement) {
                            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                            if (!offcanvas) {
                                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                            }
                            offcanvas.hide();
                        }
                        getAllSession();
                        // Clear form
                        setStartDate('');
                        setEndDate('');
                    }
                    else {
                        toast.error(response?.data?.message)
                    }
                }
                else {
                    toast.error(response?.data?.message)
                    // console.log(response?.data?.message);
                }
            }
            catch (error) {
                setloaderState(false);
                toast.error(error?.response?.data?.message)
                // console.log(error, 'error')
            }
            finally {
                setloaderState(false);
            }
        }
    }

    const activeSession = async (id) => {
        try {
            // console.log(sessionId, 'idddd')
            var response = await activeSessionDataApi(id);
            // console.log(response, 'active session response')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message)
                    getAllSession();
                }
            }
            else {
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log(error, 'error')
        }
        finally {
            setloaderState(false);
        }
    }

    const UpdateSessionById = async () => {
        try {
            const formData = new FormData();
            formData.append('startDate', startDateEdit)
            formData.append('endDate', endDateEdit)

            var response = await updateSessionApi(sessionEditId, formData);
            // console.log(response, 'session manager')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message)
                    getAllSession();
                    const offcanvasElement = document.getElementById('Edit_staticBackdrop');
                    if (offcanvasElement) {
                        let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                        if (!offcanvas) {
                            offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                        }
                        offcanvas.hide();
                    }
                }
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log('Error During Get Session', error);
        }
        finally {
            setloaderState(false);
        }
    }

    const validateFields = () => {
        let isValid = true;

        if (!startDate) {
            setStartDateError('* This Field is required');
            isValid = false;
        } else {
            setStartDateError('');
        }

        if (!endDate) {
            setEndDateError('* This Field is required');
            isValid = false;
        } else {
            setEndDateError('');
        }
        return isValid;
    };

    const DeleteSessionById = async (id) => {
        if (isChecked) {
            try {
                var response = await deleteSessionApi(id);
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        toast.success(response?.data?.message)
                        getAllSession();
                        const offcanvasElement = document.getElementById('Delete_staticBackdrop');
                        if (offcanvasElement) {
                            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                            if (!offcanvas) {
                                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                            }
                            offcanvas.hide();
                        }
                    }
                }
                else {
                    toast.error(response?.error);
                }
            }
            catch (error) {
                setloaderState(false);
                console.error('Error during delete:', error);
            }
            finally {
                setloaderState(false);
            }
        }
    }


    const handleSearchButton = () => {
        getAllPlans(searchKeyData)
    }

    const openAddCanvas = () => {
        const offcanvasElement = document.getElementById('Add_staticBackdrop');
        // const bsOffcanvas = new Offcanvas(offcanvasElement);
        // bsOffcanvas.show();
        if (offcanvasElement) {
            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (!offcanvas) {
                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
            }
            offcanvas.show();
        }
    };

    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = (id) => {
        if (openDropdownId === id) {
            setOpenDropdownId(null); // close if clicked again
        } else {
            setOpenDropdownId(id);
        }
    };

    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (

        <Container>
            <div className="container-fluid p-4">
                <div className="row pb-3 gap-xl-0 gap-3">
                    <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                        <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                <li className="breadcrumb-item"><a href="/admin/settings/schoolSetting" className='bredcrumText text-decoration-none'>Settings</a></li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Session Manager</li>
                            </ol>
                        </nav>
                        <p className='font16 ps-0 fontWeight500'>Session Manager</p>
                    </div>
                    <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                        <ActionControls
                            showAddButton={true}
                            addButtonText="Add Session"
                            addButtonAction={openAddCanvas}
                            showSearch={true}
                            searchAction={handleSearchButton}
                            showExportPDF={false}
                            exportPDFText="Export PDF"
                            exportPDFAction={''}
                            exportPDFFileName="Sessions.pdf"
                            showExportCSV={false}
                            exportCSVText="Export CSV"
                            exportCSVAction={''}
                            exportCSVFileName="Sessions.xlsx"
                        />
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="cardradius bg-white p-3">
                        {/* <p className='activeSession font18 p-2 ps-3 fontWeight500'>Active session - <small className='font18 orangeText fontWeight500'>{activeSessionData}</small></p> */}
                        {/* <form action="" className="row">
                            <div className="mb-3 mt-3">
                                <label htmlFor="validationDefault02" className="form-label font14">Session*</label>
                                <select className={`form-select font14 ${sessionError ? 'border-1 border-danger' : ''} `} value={sessionId} aria-label="Default select example" onChange={(e) => setSessionId(e.target.value)} disabled={!sessionData.length > 0}>
                                    <option >--- Choose ---</option>
                                    {sessionData?.map(option => (
                                        <option key={option.sessionId} value={option.sessionId}>
                                            {option.sessionName}
                                        </option>
                                    ))}
                                </select>
                                <span className='text-danger'>{sessionError}</span>
                            </div>
                            <p className='text-center m-3'><button className='btn addButtons text-white' type='button' disabled={sessionId === activeSessionId ? true : false} onClick={activeSession}> Active</button></p>
                        </form> */}

                        {/* <h2 className='orangeText mb-3'>Active Session</h2>
                        <div className="overflow-scroll mb-3">
                            <table className="table align-middle table-striped">
                                <thead>
                                    <tr>
                                        <th className='textWrapClass'><h2>#</h2></th>
                                        <th className='textWrapClass'><h2>Session</h2></th>
                                        <th className='textWrapClass'><h2>Status</h2></th>
                                        <th className='textWrapClass text-start'><h2>Action</h2></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={activeSessionItem.sessionId} className='my-bg-color align-middle'>
                                        <th className='textWrapClass font14 greyText'>1</th>
                                        <td className='textWrapClass font14 greyText'>{activeSessionItem.sessionName}</td>
                                        <td className='textWrapClass font14 orangeText'>{activeSessionItem.status ? <h3>Active</h3> : <h3>InActive</h3>}</td>
                                        <td className='textWrapClass text-start'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                                <path fill="#262626" d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm-7 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 3 7.8zm14 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 17 7.8z" stroke-width="0.2" stroke="#262626" />
                                            </svg>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h2 className='orangeText mb-3'>Other Session</h2> */}
                        {sessionData.length > 0 ?
                            <>
                                <div className="overflow-scroll">
                                    <table className="table align-middle table-striped">
                                        <thead>
                                            <tr>
                                                <th className='textWrapClass'><h2>#</h2></th>
                                                <th className='textWrapClass'><h2>Session title</h2></th>
                                                <th className='textWrapClass'><h2>Status</h2></th>
                                                <th className='textWrapClass text-start'><h2>Action</h2></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sessionData.map((item, index) => (
                                                <tr key={item.sessionId} className='my-bg-color align-middle'>
                                                    <th className='textWrapClass greyText'><h3>{index + 1}</h3></th>
                                                    <td className='textWrapClass greyText'><h3>{item.sessionName}</h3></td>
                                                    <td className='textWrapClass orangeText'>{item.status ? <h3>Active</h3> : <h3>Deactivate</h3>}</td>
                                                    <td>
                                                        <span
                                                            className="cursor-pointer"
                                                            onClick={() => toggleDropdown(item.sessionId)}
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fill="#262626"
                                                                    d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm-7 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 3 7.8zm14 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 17 7.8z"
                                                                    strokeWidth="0.2"
                                                                    stroke="#262626"
                                                                />
                                                            </svg>
                                                        </span>

                                                        {openDropdownId === item.sessionId && (
                                                            <ul className="dropdown-menu show" style={{ position: "absolute" }}>
                                                                <li>
                                                                    <button
                                                                        className="dropdown-item greyText"
                                                                        type="button"
                                                                        data-bs-toggle="offcanvas"
                                                                        data-bs-target="#Delete_staticBackdrop"
                                                                        aria-controls="Delete_staticBackdrop"
                                                                        onClick={() => setDeleteId(item.sessionId)}
                                                                    >
                                                                        Delete Session
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button
                                                                        className="dropdown-item greyText"
                                                                        type="button"
                                                                        data-bs-toggle="offcanvas"
                                                                        data-bs-target="#Edit_staticBackdrop"
                                                                        aria-controls="Edit_staticBackdrop"
                                                                        onClick={() => activeSession(item.sessionId)}
                                                                    >
                                                                        Active Session
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex">
                                    <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
                                    <div className="ms-auto">
                                        <ReactPaginate
                                            previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                                            nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                                            breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                                            onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                                        />
                                    </div>
                                </div>
                            </>
                            :
                            <div className='h-100 text-center m-5'>
                                <img src='/images/search.svg' style={{ height: '30vh' }} />
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/* Add */}
            <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Add_staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header border-bottom border-2 p-1">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title" id="staticBackdropLabel">Add Session</h2>
                </div>
                <div className="offcanvas-body p-0">
                    {loaderState && (<DataLoader />)}
                    <div className="p-3" style={{ zIndex: -1 }}>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="validationDefault02" className="form-label font14">Start Date*</label>
                                <input className={`form-control font14 ${startDateError ? 'border-1 border-danger' : ''}`} value={startDate} type="date" onChange={(e) => handleStartDateChange(e)} min="1970-04-01" />
                                <span className='text-danger'>{startDateError}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="validationDefault02" className="form-label font14">End Date*</label>
                                <input className={`form-control font14 ${endDateError ? 'border-1 border-danger' : ''}`} value={endDate} type="date" onChange={(e) => handleEndDateChange(e)} min="1970-04-01" />
                                <span className='text-danger'>{endDateError}</span>
                            </div>
                        </form>
                        <p className='text-center p-3'>
                            <button className='btn addButtons text-white' onClick={AddNewSession}>Create</button>
                            <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => { setEndDate(''); setStartDate('') }}>Cancel</button>
                        </p>
                    </div>
                </div>
            </div>

            {/* Edit
            <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header border-bottom border-2 p-1">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title" id="staticBackdropLabel">Session Edit</h2>
                </div>
                <div className="offcanvas-body p-0">
                    {loaderState && (<DataLoader />)}
                    <div className="p-3" style={{ zIndex: -1 }}>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="validationDefault02" className="form-label font14">Start Date*</label>
                                <input className={`form-control font14 ${startDateEditError ? 'border-1 border-danger' : ''}`} type="date" value={startDateEdit} onChange={(e) => handleStartDateEditChange(e)} min="1970-04-01" />
                                <span className='text-danger'>{startDateEditError}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="validationDefault02" className="form-label font14">End Date*</label>
                                <input className={`form-control font14 ${endDateEditError ? 'border-1 border-danger' : ''}`} type="date" value={endDateEdit} onChange={(e) => handleEndDateEditChange(e)} min="1970-04-01" />
                                <span className='text-danger'>{endDateEditError}</span>
                            </div>
                        </form>
                        <p className='text-center p-3'>
                            <button className='btn addButtons text-white' onClick={UpdateSessionById} disabled={disableUpdateBtn}>Update</button>
                            <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" >Cancel</button>
                        </p>
                    </div>
                </div>
            </div> */}

            {/* Delete */}
            <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header ps-0 modalHighborder p-1">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <span className="offcanvas-title" id="staticBackdropLabel">Session</span>
                </div>
                <div className="offcanvas-body p-0">
                    {loaderState && (<DataLoader />)}
                    <div className="" style={{ zIndex: -1 }}>
                        <p className='modalLightBorder p-2'>Session</p>
                        <p className='text-center p-3'> <img src="/images/errorI.svg" className='img-fluid' alt="" /></p>
                        <p className='text-center warningHeading'>Are you Sure?</p>
                        <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Session Manager Data</p>
                        <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" checked={isChecked} id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Session Manager Data</p>
                        <p className='text-center p-3'>
                            <button className='btn deleteButtons text-white' disabled={!isChecked} onClick={() => DeleteSessionById(DeleteId)}>Delete</button>
                            <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setIsChecked(false)}>Cancel</button>
                        </p>
                    </div>
                </div>
            </div>
        </Container>

    )
}

export default SessionManager
