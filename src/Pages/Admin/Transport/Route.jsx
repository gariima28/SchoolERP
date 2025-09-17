import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { deleteRouteApi, getAllRouteApi, getRouteDataByIdApi, updateRouteDataApi } from 'src/Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import ReactPaginate from 'react-paginate';
import { useForm } from 'react-hook-form';
import ActionControls from '../../../Layouts/ActionControls';

const Container = styled.div`
    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

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

`;

const AllRoute = () => {

    const navigate = useNavigate()
    const token = sessionStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [RouteData, setRouteData] = useState([]);
    const [searchByKey, setSearchByKey] = useState('')
    // CSV State
    const [csvData, setCSVData] = useState([])
    // Id States
    const [RouteIDD, setRouteIDD] = useState('')
    const [delRouteIDD, setDelRouteIDD] = useState('')
    const [isChecked, setIsChecked] = useState(false);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: 'onChange'
    });

    useEffect(() => {
        getAllRouteData();
        // if (token) {
        //     DownloadCSV();
        // }
    }, [token, pageNo])

    // // CSV Download
    // const DownloadCSV = async () => {
    //     try {
    //         const response = await DownloadDriverExcel();
    //         if (response?.status === 200) {
    //             const rows = response?.data?.split('\n').map(row => row.split(','));
    //             setCSVData(rows);
    //             // setTableData(rows.slice(1));
    //         }
    //     } catch (err) {
    //         // console.log(err);
    //     }
    // };

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1);
    };

    const getAllRouteData = async () => {
        try {
            setloaderState(true);
            var response = await getAllRouteApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setRouteData(response?.data?.routes);
                    setCurrentPage(response?.data?.currentPage)
                    setTotalPages(response?.data?.totalPages)
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            } else {
                setloaderState(false);
                toast.error(response?.data?.message)
            }
        } catch (error) {
            setloaderState(false);
            setloaderState(false);
            console.error('Error during get All:', error);
            toast.error('Error during get All:', error)
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

    const getRouteDataById = async (id) => {
        setloaderState(true)
        try {
            setRouteIDD(id);
            var response = await getRouteDataByIdApi(id);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setValue('routeName', response?.data?.route?.routeName);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            } else {
                setloaderState(false);
                toast.error(response?.data?.message)
            }
        } catch (error) {
            setloaderState(false);
            setloaderState(false);
            console.error('Error during Get By Id:', error);
            toast.error('Error during Get By Id:', error)
        }
        finally {
            setloaderState(false);
        }
    }

    const UpdateRouteDataById = async (data) => {
        setloaderState(true)
        try {
            const formData = new FormData();
            formData.append("routeName", data?.routeName)
            var response = await updateRouteDataApi(RouteIDD, formData);
            if (response?.status === 200) {
                if (response.data.status === 'success') {
                    setloaderState(false)
                    toast.success(response?.data?.message)
                    getAllRouteData()
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
                        const backdrop = document.querySelector('.offcanvas-backdrop');
                        if (backdrop) {
                            backdrop.remove();
                        }
                    }

                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            } else {
                setloaderState(false);
                toast.error(response?.data?.message)
            }
        } catch (error) {
            setloaderState(false);
            setloaderState(false);
            console.error('Error during update:', error);
            toast.error('Error during update:', error)
        }
        finally {
            setloaderState(false);
        }
    };

    const deleteRouteDataById = async (id) => {
        if (isChecked) {
            try {
                const response = await deleteRouteApi(id);
                if (response?.status === 200 && response.data.status === 'success') {
                    toast.success(response.data.message);
                    getAllRouteData()
                    setTimeout(() => {
                        const offcanvasElement = document.getElementById('Delete_staticBackdrop');
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
                        }
                        setIsChecked(false)
                    }, 400);
                } else {
                    toast.error(response?.error || 'Something went wrong');
                }
            } catch (error) {
                setloaderState(false);
                console.error('Error during deletion:', error);
                toast.error('An error occurred while deleting the route');
            }
            finally {
                setloaderState(false);
            }
        } else {
            toast.error('You must agree to delete the Route Data');
        }
    };

    const handleAddButton = () => {
        navigate('/admin/transport/route/addRoute')
    }

    // Handle search input change
    const handleSearchChange = (value) => {
        setSearchByKey(value);
        setPageNo(1); // Reset to first page on search change
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(null);

    const toggleDropdown = (index) => {
        setIsDropdownOpen(isDropdownOpen === index ? null : index);
    };


    return (
        <>
            <Container>
                {loaderState && (<DataLoader />)}
                <div className="container-fluid p-4">
                    <div className="row pb-3 gap-xl-0 gap-3">
                        <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/admin/transport/route" className='bredcrumText text-decoration-none'>Transport</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Route</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Route List</p>
                        </div>
                        <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                            <ActionControls
                                showAddButton={true}
                                addButtonText="Add Route"
                                addButtonAction={handleAddButton}
                                showExportPDF={false}
                                exportPDFText="Export PDF"
                                exportPDFAction={''}
                                exportPDFFileName="Routes.pdf"
                                showExportCSV={false}
                                exportCSVText="Export CSV"
                                exportCSVAction={''}
                                exportCSVFileName="Routes.xlsx"
                                showSearch={true}
                                searchValue={searchByKey}
                                searchAction={getAllRouteData}
                                onSearchChange={handleSearchChange}
                            />
                        </div>
                    </div>
                    <div className="row pb-3 pe-0">
                        <div className=" cardradius bg-white p-3">
                            {RouteData.length > 0 ?
                                <>
                                    <div className="overflow-scrolling">
                                        <table className="table align-middle table-striped w-100">
                                            <thead>
                                                <tr>
                                                    <th className='textWrapClass'><h2>#</h2></th>
                                                    <th className='textWrapClass'><h2>Name</h2></th>
                                                    <th className='text-end textWrapClass'><h2>Action</h2></th> {/* Added min-width */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {RouteData.map((item, index) => (
                                                    <tr key={item.routeId} className='my-bg-color align-middle'>
                                                        <th className='textWrapClass greyText'><h3>{index + 1}</h3></th>
                                                        <td className='textWrapClass greyText'><h3>{item.routeName}</h3></td>
                                                        <td className='textWrapClass text-end' style={{ minWidth: '120px', position: 'relative' }}>
                                                            <div className="dropdown dropdownbtn">
                                                                <button className="btn btn-sm actionButtons dropdown-toggle" type="button" onClick={() => toggleDropdown(index)}>
                                                                    <span>Action</span>
                                                                </button>
                                                                <ul className={`dropdown-menu dropdown-menu-end ${isDropdownOpen === index ? 'show' : ''}`} style={{ position: 'absolute', right: 0 }}>
                                                                    <li>
                                                                        <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getRouteDataById(item.routeId)}>Edit</button>
                                                                    </li>
                                                                    <li>
                                                                        <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDelRouteIDD(item.routeId)}>Delete</button>
                                                                    </li>
                                                                </ul>
                                                            </div>
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
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllRouteData}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <h2 className="offcanvas-title" id="staticBackdropLabel">Route Edit</h2>
                    </div>
                    <div className="offcanvas-body p-0">
                        {loaderState && (<DataLoader />)}
                        <div className="" style={{ zIndex: -1 }}>
                            <div className="p-3">
                                <form onSubmit={handleSubmit(UpdateRouteDataById)}>
                                    <div className="mb-3">
                                        <label htmlFor="routeName" className="form-label font14">Route</label>
                                        <input id="routeName" type="text" className={`form-control font14 ${errors.routeName ? 'border-danger' : ''}`} placeholder="Enter Route Name" {...register('routeName', { required: 'Route Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Route Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Route Name'; } return true; } })} />
                                        {errors.routeName && <p className="font12 text-danger">{errors.routeName.message}</p>}
                                    </div>
                                    <p className='text-center p-3'>
                                        <button className='btn addButtons text-white' type='submit'>Update Route</button>
                                        <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" >Cancel</button>
                                    </p>
                                </form>
                            </div>
                        </div>
                        {/* <div>
                            {EditWarning
                                ?
                                <>
                                </>
                                :
                                <>
                                    <div>
                                        <p className='modalLightBorder p-2 mb-0'>Route List</p>
                                        <div className="mt-3  ">
                                            <div className='correvtSVG p-3 pt-4 rounded-circle'><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Correct.svg" alt="" /></div>
                                            <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                                <p className='warningHeading'>Successful Updated</p>
                                                <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                            </div>
                                            <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllRouteData}>Continue</button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div> */}
                    </div>
                </div>
                {/* Delete */}
                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header ps-0 modalHighborder p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllRouteData}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <span className="offcanvas-title" id="staticBackdropLabel">Route</span>
                    </div>
                    <div className="offcanvas-body p-0">
                        {loaderState && (<DataLoader />)}
                        <div className="" style={{ zIndex: -1 }}>
                            <p className='modalLightBorder p-2'>Route</p>
                            <p className='text-center p-3'>
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/errorI.svg" className='img-fluid' alt="" />
                            </p>
                            <p className='text-center warningHeading'>Are you Sure?</p>
                            <p className='text-center greyText warningText pt-2'>
                                This action will permanently delete <br /> the Route Data.
                            </p>
                            <p className='text-center warningText p-2'>
                                <input className="form-check-input formdltcheck me-2" type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} /> I Agree to delete the Profile Dat </p>
                            <p className='text-center p-3'>
                                <button className='btn deleteButtons text-white' onClick={() => deleteRouteDataById(delRouteIDD)} > Delete </button>
                                <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" > Cancel </button>
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AllRoute




