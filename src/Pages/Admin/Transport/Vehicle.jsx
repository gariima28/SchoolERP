import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { DownloadVehicleExcel, deleteVehicleApi, getAllRouteApi, getVehicleDriverApi, getVehicleDataApi, getVehicleDataByIdApi, updateVehicleDataApi } from 'src/Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import ReactPaginate from 'react-paginate';
import { useForm } from 'react-hook-form';
import ActionControls from '../../../Layouts/ActionControls';
import { DownloadVehiclePdf } from '../../../Utils/Apis';

const Container = styled.div`

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
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

    .oddModaltablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
        border-bottom: 1.5px solid var(--darkGreenBorderColor);
    }
    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
    }

    .formEditSpecFeatcheck:checked{
        background-color: #00A67E;
        border-color: #00A67E;
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
    
    .warningHeading{
        font-size: var(--font-size-20);
    }

    .warningText{
        font-size: var(--font-size-15);
        line-height: 22px;
        color: var(--greyInputTextColor) !important;
    }

    .textVerticalCenter{
        line-height: 22px;
    }
    
    .form-check-input{
        width: 18px;
        height: 18px;
    }

    .formcontrolinput{
        border-radius: 0px !important;
    }

    .contbtn{
        margin-left: 43% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

`;

const Vehicle = () => {

    const navigate = useNavigate()
    const token = sessionStorage.getItem('token');
    // loader State
    const [loaderState, setloaderState] = useState(false);
    // Data States
    const [vehicleData, setVehicleData] = useState([]);
    const [allRouteData, setAllRouteData] = useState([]);
    const [driverData, setDriverData] = useState([]);
    const [searchByKey, setSearchByKey] = useState('')
    const [isChecked, setIsChecked] = useState(false);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    // Id States
    const [driverById, setDriverById] = useState();
    const [vehicleId, setVehicleId] = useState('');
    const [delVehicleId, setDelVehicleId] = useState('');

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        mode: 'onChange'
    });


    const [initialValues, setInitialValues] = useState({});
    const [isFormChanged, setIsFormChanged] = useState(false);

    const watchFields = watch();

    useEffect(() => {
        const isChanged = Object.keys(initialValues).some((key) => {
            return initialValues[key] !== watchFields[key];
        });
        setIsFormChanged(isChanged);
    }, [watchFields, initialValues]);


    useEffect(() => {
        getAllVehicleData();
        getAllDriverData();
        getAllRouteData();
    }, [token, pageNo]);

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };


    const getAllVehicleData = async () => {
        setloaderState(true);
        try {
            const response = await getVehicleDataApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setloaderState(false);
                setVehicleData(response?.data?.vehicles);
                setTotalPages(response?.data?.totalPages);
                setCurrentPage(response?.data?.currentPage);
            } else {
                // console.log(response?.data?.message);
            }
        } catch (error) {
            setloaderState(false);
            console.error('Error fetching vehicle data:', error);
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
    };

    const getAllRouteData = async () => {
        setloaderState(true);
        try {
            const response = await getAllRouteApi('', '', '');
            if (response?.status === 200 && response?.data?.status === 'success') {
                setloaderState(false);
                setAllRouteData(response?.data?.routes);
            } else {
                setloaderState(false);
                toast.error(response?.data?.message);
            }
        } catch (error) {
            setloaderState(false);
            setloaderState(false);
            console.error('Error fetching route data:', error);
        }
        finally {
            setloaderState(false);
        }
    };

    const getAllDriverData = async () => {
        setloaderState(true);
        try {
            const response = await getVehicleDriverApi();
            if (response?.status === 200 && response?.data?.status === 'success') {
                setloaderState(false);
                setDriverData(response?.data?.drivers);
            } else {
                setloaderState(false);
                toast.error(response?.data?.message);
            }
        } catch (error) {
            setloaderState(false);
            setloaderState(false);
            console.error('Error fetching driver data:', error);
        }
        finally {
            setloaderState(false);
        }
    };

    const DeleteVehicleDataById = async (id) => {
        setloaderState(true)
        if (isChecked) {
            try {
                const response = await deleteVehicleApi(id);
                if (response?.status === 200 && response.data.status === 'success') {
                    setloaderState(false)
                    toast.success(response?.data?.message);
                    const offcanvasElement = document.getElementById('Delete_staticBackdrop');
                    getAllVehicleData();
                    if (offcanvasElement) {
                        let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                        if (!offcanvas) {
                            offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                        }
                        offcanvas.hide();
                        offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                            const backdrop = document.querySelector('.offcanvas-backdrop');
                            if (backdrop) {
                                backdrop.remove();
                            }
                        }, { once: true });
                        offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                            const backdrop = document.querySelector('.offcanvas-backdrop');
                            if (backdrop) {
                                backdrop.remove();
                            }
                        }, { once: true });
                    }
                } else {
                    setloaderState(false)
                    toast.error(response?.error);
                }
            } catch (error) {
                setloaderState(false);
                setloaderState(false)
                console.error('Error deleting vehicle:', error);
            }
            finally {
                setloaderState(false);
            }
        }
        else {
            toast.error("Firstly, agree to delete the Data");
            setloaderState(false)
        }
    };

    const getVehicleDataById = async (id) => {
        setloaderState(true)
        try {
            setVehicleId(id);
            const response = await getVehicleDataByIdApi(id);
            if (response?.status === 200 && response?.data?.status === 'success') {
                const vehicle = response?.data?.vehicles;
                setValue('vehicleNo', vehicle?.vehicleNumber);
                setValue('vehicleNo', vehicle?.vehicleNumber);
                setValue('vehicleModel', vehicle?.vehicleModel);
                setValue('chassisNo', vehicle?.chassisNumber);
                setValue('driverId', vehicle?.driverId);
                setValue('totalSeat', vehicle?.seatCapacity);
                setValue('routeId', vehicle?.routeClass?.routeId);
                setValue('vehicleStatus', vehicle?.vehicleStatus);
                setInitialValues({
                    vehicleNo: vehicle?.vehicleNumber,
                    vehicleModel: vehicle?.vehicleModel,
                    chassisNo: vehicle?.chassisNumber,
                    driverId: vehicle?.driver?.driverId,
                    totalSeat: vehicle?.seatCapacity,
                    routeId: vehicle?.routeClass?.routeId,
                    vehicleStatus: vehicle?.vehicleStatus,
                })

                setloaderState(false)
            } else {
                setloaderState(false)
                // console.log(response?.data?.message);
            }
        } catch (error) {
            setloaderState(false);
            setloaderState(false)
            console.error('Error fetching vehicle data by id:', error);
        }
        finally {
            setloaderState(false);
        }
    };

    const updateVehicleDataById = async (data) => {
        setloaderState(true)
        try {
            const formData = new FormData();
            formData.append("vehicleNo", data?.vehicleNo);
            formData.append("vehicleModel", data?.vehicleModel);
            formData.append("chassisNo", data?.chassisNo);
            formData.append("driverId", data?.driverId);
            formData.append("totalSeat", data?.totalSeat);
            formData.append("routeId", data?.routeId);
            formData.append("vehicleStatus", data?.vehicleStatus);
            const response = await updateVehicleDataApi(vehicleId, formData);
            if (response?.status === 200 && response.data.status === 'success') {
                setloaderState(false)
                toast.success(response?.data?.message);
                getAllVehicleData();
                const offcanvasElement = document.getElementById('Edit_staticBackdrop');
                if (offcanvasElement) {
                    let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                    if (!offcanvas) {
                        offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                    }
                    offcanvas.hide();
                    offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                        const backdrop = document.querySelector('.offcanvas-backdrop');
                        if (backdrop) {
                            backdrop.remove();
                        }
                    }, { once: true });
                    offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
                        const backdrop = document.querySelector('.offcanvas-backdrop');
                        if (backdrop) {
                            backdrop.remove();
                        }
                    }, { once: true });
                }
            } else {
                setloaderState(false)
                toast.error(response?.data?.message);
            }
        } catch (error) {
            setloaderState(false);
            setloaderState(false)
            console.error('Error during update:', error);
        }
        finally {
            setloaderState(false);
        }
    };

    const handleAddButton = () => {
        navigate('/admin/transport/vehicle/addVehicle')
    }

    // Handle search input change
    const handleSearchChange = (value) => {
        setSearchByKey(value);
        setPageNo(1); // Reset to first page on search change
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(null);

    const toggleDropdown = (index, e) => {
        e.preventDefault(); // Prevent default to avoid conflicts
        e.stopPropagation(); // Stop event bubbling to keep dropdown open
        setIsDropdownOpen(isDropdownOpen === index ? null : index);
    };

    const handleEditClick = (vehicleId, e, driverId) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(null); // Close dropdown after action
        getVehicleDataById(vehicleId);
        setDriverById(driverId);
        getAllDriverData()
    };

    const handleDeleteClick = (vehicleId, e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDropdownOpen(null); // Close dropdown after action
        setDelVehicleId(vehicleId);
    };

    // Close dropdown when clicking outside (optional, for better UX)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isDropdownOpen !== null && !e.target.closest('.dropdown')) {
                setIsDropdownOpen(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    return (
        <>
            <Container>
                {
                    loaderState && (
                        <DataLoader />
                    )
                }
                <div className="container-fluid p-4">
                    <div className="row pb-3 gap-xl-0 gap-3">
                        <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/admin/transport/route" className='bredcrumText text-decoration-none'>Transport</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Vehicle</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Vehicle List</p>
                        </div>
                        <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                            <ActionControls
                                showAddButton={true}
                                addButtonText="Add Vehicle"
                                addButtonAction={handleAddButton}
                                showExportPDF={false}
                                exportPDFText="Export PDF"
                                exportPDFAction={DownloadVehiclePdf}
                                exportPDFFileName="Vehicles.pdf"
                                showExportCSV={vehicleData.length>0}
                                exportCSVText="Export CSV"
                                exportCSVAction={DownloadVehicleExcel}
                                exportCSVFileName="Vehicles.xlsx"
                                showSearch={true}
                                searchValue={searchByKey}
                                searchAction={getAllVehicleData}
                                onSearchChange={handleSearchChange}
                            />
                        </div>
                    </div>
                    <div className="row pb-3 pe-0">
                        <div className="cardradius bg-white p-3">
                            {vehicleData.length > 0 ?
                                <>
                                    <div className="overflow-scroll">
                                        <table className="table align-middle table-striped">
                                            <thead>
                                                <tr>
                                                    <th className='textWrapClass'><span className='font14'>#</span></th>
                                                    <th className='textWrapClass'><span className='font14'>Vehicle Type</span></th>
                                                    <th className='textWrapClass'><span className='font14'>Vehicle Info</span></th>
                                                    <th className='textWrapClass'><span className='font14'>Driver Name</span></th>
                                                    <th className='textWrapClass'><span className='font14'>Driver Contact</span></th>
                                                    <th className='textWrapClass'><span className='font14'>Capacity</span></th>
                                                    <th className='textWrapClass'><span className='font14'>Route</span></th>
                                                    <th className='textWrapClass'><span className='font14'>Status</span></th>
                                                    <th className='text-end textWrapClass'><span className='font14'>Action</span></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {vehicleData.map((item, index) => (
                                                    <tr key={item.vehicleId} className='my-bg-color align-middle'>
                                                        <th className='textWrapClass font14 greyText'>{index + 1}</th>
                                                        <td className='textWrapClass font14 greyText'>{item.vehicleModel}</td>
                                                        <td className='textWrapClass font14 greyText'>{item.vehicleNumber}</td>
                                                        <td className='textWrapClass font14 greyText'>{item.driverName}</td>
                                                        <td className='textWrapClass font14 greyText'>{item.driverPhone}</td>
                                                        <td className='textWrapClass font14 greyText'>{item.seatCapacity}</td>
                                                        <td className='textWrapClass font14 greyText'>{item.routeClass.routeName}</td>
                                                        <td className={`textWrapClass font14 ${item.vehicleStatus ? 'activeText' : 'deactiveText'}`}>{item.vehicleStatus ? 'Active' : 'InActive'}</td>
                                                        <td className='textWrapClass text-end'>
                                                            <div className={`dropdown dropdownbtn ${isDropdownOpen === index ? 'show' : ''}`}>
                                                                {/* Toggle button: Use onClick to manage state */}
                                                                <button
                                                                    className="btn btn-sm actionButtons dropdown-toggle"
                                                                    type="button"
                                                                    onClick={(e) => toggleDropdown(index, e)}
                                                                    aria-expanded={isDropdownOpen === index}
                                                                >
                                                                    <span>Action</span>
                                                                </button>
                                                                {/* Dropdown menu: Show/hide based on state */}
                                                                <ul className={`dropdown-menu ${isDropdownOpen === index ? 'show' : ''}`}>
                                                                    <li>
                                                                        <button
                                                                            className="dropdown-item greyText"
                                                                            type="button"
                                                                            data-bs-toggle="offcanvas"
                                                                            data-bs-target="#Edit_staticBackdrop"
                                                                            aria-controls="Edit_staticBackdrop"
                                                                            onClick={(e) => handleEditClick(item.vehicleId, e, item.driverId)}
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            className="dropdown-item greyText"
                                                                            type="button"
                                                                            data-bs-toggle="offcanvas"
                                                                            data-bs-target="#Delete_staticBackdrop"
                                                                            aria-controls="Delete_staticBackdrop"
                                                                            onClick={(e) => handleDeleteClick(item.vehicleId, e)}
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            {/* <div className="dropdown dropdownbtn">
                                                                <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <span>Action</span>
                                                                </button>
                                                                <ul className="dropdown-menu">
                                                                    <li>
                                                                        <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getVehicleDataById(item.vehicleId)}>
                                                                            Edit
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDelVehicleId(item.vehicleId)}>
                                                                            Delete
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div> */}
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

                                <div className="d-flex justify-content-center p-5 m-5">
                                    <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className='img-fluid p-5' />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {/* Edit */}
                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header border-bottom border-2 p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllVehicleData}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <h2 className="offcanvas-title" id="staticBackdropLabel">Vehicle Edit</h2>
                    </div>
                    <div className="offcanvas-body p-0">
                        {loaderState && (<DataLoader />)}
                        <div className="p-3" style={{ zIndex: -1 }}>
                            <form onSubmit={handleSubmit(updateVehicleDataById)}>
                                <div className="mb-3">
                                    <label htmlFor="vehicleNo" className="form-label font14">Vehicle Number <span className='text-danger'>*</span></label>
                                    <input id="vehicleNo" type="text" className={`form-control font14 ${errors.vehicleNo ? 'border-danger' : ''}`} placeholder="Enter Vehicle Number" {...register('vehicleNo', {
                                        required: 'Vehicle Number is required *'
                                        // validate: value => { if (!/^[A-Z0-9]+$/.test(value)) { return 'Vehicle Number can only contain uppercase letters and digits, no special characters or lowercase letters'; } return true; }
                                    })} />
                                    {errors.vehicleNo && <p className="font12 text-danger">{errors.vehicleNo.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="vehicleModel" className="form-label font14">Vehicle Type <span className='text-danger'>*</span></label>
                                    <input id="vehicleModel" type="text" className={`form-control font14 ${errors.vehicleModel ? 'border-danger' : ''}`} placeholder="Enter Vehicle Type" {...register('vehicleModel', { required: 'Vehicle Type is required *' })} />
                                    {errors.vehicleModel && <p className="font12 text-danger">{errors.vehicleModel.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="chassisNo" className="form-label font14">Chassis Number <span className='text-danger'>*</span></label>
                                    <input id="chassisNo" type="text" className={`form-control font14 ${errors.chassisNo ? 'border-danger' : ''}`} placeholder="Enter Chassis Number" {...register('chassisNo', { required: 'Chassis Number is required *' })} />
                                    {errors.chassisNo && <p className="font12 text-danger">{errors.chassisNo.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="driverId" className="form-label font14">Assign Driver <span className='text-danger'>*</span></label>
                                    <select id="driverId" className={`form-select font14 ${errors.driverId ? 'border-danger' : ''}`} {...register('driverId', { required: 'Driver selection is required *' })}>
                                        <option value="">Select Driver</option>
                                        {driverData.map((driver) => (
                                            <option key={driver.id} value={driver.id}>{driver.staffName}</option>
                                        ))}
                                    </select>
                                    {errors.driverId && <p className="font12 text-danger">{errors.driverId.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="totalSeat" className="form-label font14">Seat Capacity <span className='text-danger'>*</span></label>
                                    <input id="totalSeat" type="number" className={`form-control font14 ${errors.totalSeat ? 'border-danger' : ''}`} placeholder="Enter Seat Capacity" {...register('totalSeat', { required: 'Seat Capacity is required *' })} />
                                    {errors.totalSeat && <p className="font12 text-danger">{errors.totalSeat.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="routeId" className="form-label font14">Route <span className='text-danger'>*</span></label>
                                    <select id="routeId" className={`form-select font14 ${errors.routeId ? 'border-danger' : ''}`} {...register('routeId', { required: 'Route selection is required *' })}>
                                        <option value="">Select Route</option>
                                        {allRouteData.map((route) => (
                                            <option key={route.routeId} value={route.routeId}>{route.routeName}</option>
                                        ))}
                                    </select>
                                    {errors.routeId && <p className="font12 text-danger">{errors.routeId.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="vehicleStatus" className="form-label font14">Status <span className='text-danger'>*</span></label>
                                    <select id="vehicleStatus" className={`form-select font14 ${errors.vehicleStatus ? 'border-danger' : ''}`} {...register('vehicleStatus', { required: 'Status selection is required *' })}>
                                        <option value="">Select Status</option>
                                        <option value={true}>Active</option>
                                        <option value={false}>InActive</option>
                                    </select>
                                    {errors.vehicleStatus && <p className="font12 text-danger">{errors.vehicleStatus.message}</p>}
                                </div>
                                <p className="text-center p-3">
                                    <button className="btn addButtons2 text-white" type='submit' disabled={!isFormChanged}>Update Vehicle</button>
                                    <button className="btn cancelButtons ms-3" data-bs-dismiss="offcanvas" aria-label="Close" type='button'>Cancel</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                {/* Delete */}
                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header ps-0 modalHighborder p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllVehicleData}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <span className="offcanvas-title" id="staticBackdropLabel">Vehicle</span>
                    </div>
                    <div className="offcanvas-body p-0">
                        {loaderState && (<DataLoader />)}
                        <div className="" style={{ zIndex: -1 }}>
                            <p className='modalLightBorder p-2'>Vehicle</p>
                            <p className='text-center p-3'> <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/errorI.svg" className='img-fluid' alt="" /></p>
                            <p className='text-center warningHeading'>Are you Sure?</p>
                            <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Vehicle Data</p>
                            <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Vehicle Data</p>
                            <p className='text-center p-3'>
                                <button className='btn deleteButtons text-white' onClick={() => DeleteVehicleDataById(delVehicleId)}>Delete</button>
                                <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" type='button'>Cancel</button>
                            </p>
                        </div>
                        {/* <div>
                            {DeleteWarning
                                ?
                                <>
                                </>
                                :
                                <>
                                    <div >
                                        <p className='border-bottom p-3'>Vehicle</p>
                                        <div className="">
                                            <div className='deleteSVG border border-2 p-4 rounded-circle'><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/deleteicon.svg" alt="" /></div>
                                            <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                                                <p className='warningHeading'>Successful Deleted</p>
                                                <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                                            </div>
                                            <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllVehicleData}>Continue</button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div> */}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Vehicle
