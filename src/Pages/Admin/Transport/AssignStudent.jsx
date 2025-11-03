import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import AssignStudentFrom from 'src/Modals/AssignStudent/AssignStudentFrom';
import { DownloadAssignStudentsPdf, getAssignStudentDataApi, unAssignStudentApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import ReactPaginate from 'react-paginate';
import ActionControls from '../../../Layouts/ActionControls';
import { DownloadAssignStudentsCsv } from '../../../Utils/Apis';

// Styled-Component (unchanged)
const Container = styled.div`
  .mainBreadCrum {
    --bs-breadcrumb-divider: '>' !important;
  }

  .bredcrumText {
    color: var(--breadCrumTextColor);
  }

  .bredcrumActiveText {
    color: var(--breadCrumActiveTextColor);
  }

  .eventablerow {
    background-color: var(--tableGreyBackgroundColor) !important;
  }

  .ExportBtns {
    border-radius: 3px;
    border: 1.5px solid var(--fontControlBorder);
  }

  .form-check-input {
    border-radius: 5px !important;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .greenBgModal {
    background-color: var(--breadCrumActiveTextColor);
  }

  .greenText {
    color: var(--breadCrumActiveTextColor);
  }

  .orangeText {
    color: var(--OrangeBtnColor);
  }

  .scrollBarHide::-webkit-scrollbar {
    display: none;
  }

  .modalHighborder {
    border-bottom: 2px solid var(--modalBorderColor);
  }

  .modalLightBorder {
    border-bottom: 1px solid var(--modalBorderColor);
  }

  .form-control::placeholder,
  .form-control,
  .form-select {
    color: var(--greyState);
  }

  .form-control,
  .form-select {
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .pointer {
    cursor: pointer;
  }
`;

const AssignStudent = () => {
    const token = sessionStorage.getItem('token');
    const [loaderState, setLoaderState] = useState(false);
    const [assignStudentState, setAssignStudentState] = useState(false);
    const [assignStudentData, setAssignStudentData] = useState([]);
    const [assignStudentTableData, setAssignStudentTableData] = useState([]);
    const [searchByKey, setSearchByKey] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        getAllAssignStudentData();
    }, [token, currentPage, pageNo]);

    useEffect(() => {
        if (assignStudentState) {
            closeOffcanvas();
            getAllAssignStudentData();
        }
    }, [assignStudentState]);

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1);
    };

    const getAllAssignStudentData = async () => {
        try {
            setLoaderState(true);
            const response = await getAssignStudentDataApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setAssignStudentData(response?.data?.vehicles);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.currentPage);
            } else {
                toast.error(response?.data?.message || 'Failed to fetch data');
            }
        } catch (error) {
            if (error?.response?.data?.statusCode === 401) {
                sessionStorage.removeItem('token');
                navigate('/');
            } else {
                toast.error('Error fetching data: ' + (error.response?.data?.message || 'Unknown error'));
            }
        } finally {
            setLoaderState(false);
        }
    };

    const unAssignStudentData = async (studentId) => {
        try {
            setLoaderState(true);
            const formData = new FormData();
            formData.append('studentId', studentId);
            const response = await unAssignStudentApi(formData);
            if (response?.status === 200 && response?.data?.status === 'success') {
                getAllAssignStudentData();
                toast.success(response.data.message);
            } else {
                toast.error(response?.data?.message || 'Failed to unassign student');
            }
        } catch (error) {
            toast.error('Error unassigning student: ' + (error.response?.data?.message || 'Unknown error'));
        } finally {
            setLoaderState(false);
        }
    };

    const closeOffcanvas = () => {
        const offcanvasElement = document.getElementById('assignStudent_staticBackdrop');
        if (offcanvasElement) {
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
            offcanvas.hide();
            offcanvasElement.addEventListener(
                'hidden.bs.offcanvas',
                () => {
                    setAssignStudentState(false); // Reset state after offcanvas is hidden
                    const backdrop = document.querySelector('.offcanvas-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }
                },
                { once: true }
            );
        }
    };

    const handleAssignStudentValue = (val) => {
        setAssignStudentState(val);
    };

    const handleAddOffcanvasOpen = () => {
        setAssignStudentState(false); // Reset state when opening offcanvas
        const offcanvasElement = document.getElementById('assignStudent_staticBackdrop');
        if (offcanvasElement) {
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
            offcanvas.show();
        } else {
            toast.error('Unable to open Assign Student form');
        }
    };

    const handleSearchChange = (value) => {
        setSearchByKey(value);
        setPageNo(1);
    };

    return (
        <Container>
            {loaderState && <DataLoader />}
            <div className="container-fluid p-4">
                <div className="row pb-3 gap-xl-0 gap-3">
                    <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1">
                        <nav className="mainBreadCrum font14 ps-0" aria-label="breadcrumb">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item">
                                    <a href="/" className="bredcrumText text-decoration-none">
                                        Home
                                    </a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="/admin/transport/route" className="bredcrumText text-decoration-none">
                                        Transport
                                    </a>
                                </li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">
                                    Admin
                                </li>
                            </ol>
                        </nav>
                        <p className="font14 ps-0 fontWeight500">Admin List</p>
                    </div>
                    <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                        <ActionControls
                            showAddButton={true}
                            addButtonText="Assign Students"
                            addButtonAction={handleAddOffcanvasOpen}
                            showExportPDF={false}
                            exportPDFText="Export PDF"
                            exportPDFAction={DownloadAssignStudentsPdf}
                            exportPDFFileName="Assigned Students.pdf"
                            showExportCSV={assignStudentData.length > 0}
                            exportCSVText="Export CSV"
                            exportCSVAction={DownloadAssignStudentsCsv}
                            exportCSVFileName="Assigned Students.xlsx"
                            showSearch={true}
                            searchValue={searchByKey}
                            searchAction={getAllAssignStudentData}
                            onSearchChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="bg-white p-3 cardradius">
                        {assignStudentData.length > 0 ? (
                            <>
                                <div className="overflow-scroll">
                                    <table className="table align-middle table-striped">
                                        <thead>
                                            <tr>
                                                <th className="textWrapClass">
                                                    <span className="font14">#</span>
                                                </th>
                                                <th className="textWrapClass">
                                                    <span className="font14">Vehicle info</span>
                                                </th>
                                                <th className="textWrapClass">
                                                    <span className="font14">Route</span>
                                                </th>
                                                <th className="textWrapClass">
                                                    <span className="font14">Driver Name</span>
                                                </th>
                                                <th className="textWrapClass">
                                                    <span className="font14">Driver No</span>
                                                </th>
                                                <th className="textWrapClass">
                                                    <span className="font14">Student Details</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assignStudentData.map((item, index) => (
                                                <tr key={item.vehicleId} className="my-bg-color align-middle">
                                                    <th className="textWrapClass greyText">
                                                        <h3>{index + 1}</h3>
                                                    </th>
                                                    <td className="textWrapClass greyText">
                                                        <h3>{item.vehicleNo}</h3>
                                                    </td>
                                                    <td className="textWrapClass greyText">
                                                        <h3>{item.route}</h3>
                                                    </td>
                                                    <td className="textWrapClass greyText">
                                                        <h3>{item.driverName}</h3>
                                                    </td>
                                                    <td className="textWrapClass greyText">
                                                        <h3>{item.driverNo}</h3>
                                                    </td>
                                                    <td className="textWrapClass greyText">
                                                        <h3
                                                            className="align-self-center pointer"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#StudentDetailsModal"
                                                            onClick={() => setAssignStudentTableData(item.students)}
                                                        >
                                                            Details{' '}
                                                            <Icon
                                                                icon="material-symbols:info-outline"
                                                                width="1.4em"
                                                                height="1.4em"
                                                                style={{ color: '#008479' }}
                                                            />
                                                        </h3>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex">
                                    <p className="font14">
                                        Showing {currentPage} of {totalPages} Pages
                                    </p>
                                    <div className="ms-auto">
                                        <ReactPaginate
                                            previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                                            nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                                            breakLabel={'...'}
                                            breakClassName={'break-me'}
                                            pageCount={totalPages}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={10}
                                            onPageChange={handlePageClick}
                                            containerClassName={'pagination'}
                                            subContainerClassName={'pages pagination'}
                                            activeClassName={'active'}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="d-flex justify-content-center p-5 m-5">
                                <img
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/images/fallback.png';
                                    }}
                                    src="/images/search.svg"
                                    alt=""
                                    className="img-fluid p-5"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div
                className="offcanvas offcanvas-end p-2"
                data-bs-backdrop="static"
                tabIndex="-1"
                id="assignStudent_staticBackdrop"
                aria-labelledby="staticBackdropLabel"
            >
                <div className="offcanvas-header ps-0 modalHighborder p-1">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path
                                fill="#008479"
                                fillRule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                            />
                        </svg>
                    </Link>
                    <span className="offcanvas-title font14" id="staticBackdropLabel">
                        Assign Student
                    </span>
                </div>
                <div className="offcanvas-body p-0">
                    <AssignStudentFrom setAssignStudent={handleAssignStudentValue} />
                </div>
            </div>

            <div className="modal modal-lg fade" id="StudentDetailsModal" tabIndex="-1" aria-labelledby="StudentDetailsModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header pb-2">
                            <h2 className="modal-title" id="StudentDetailsModalLabel">
                                Student Details
                            </h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {assignStudentTableData.length > 0 ? (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="textWrapClass">#</th>
                                            <th className="textWrapClass">Student Id</th>
                                            <th className="textWrapClass">Student Name</th>
                                            <th className="textWrapClass">Drop Name</th>
                                            <th className="text-center textWrapClass">
                                                <span className="font14">Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assignStudentTableData.map((item, index) => (
                                            <tr key={item.studentId} className="my-bg-color align-middle">
                                                <th className="textWrapClass greyText">
                                                    <h3>{index + 1}</h3>
                                                </th>
                                                <td className="textWrapClass greyText">
                                                    <h3>{item.studentId}</h3>
                                                </td>
                                                <td className="textWrapClass greyText">
                                                    <h3>{item.studentName}</h3>
                                                </td>
                                                <td className="textWrapClass greyText">
                                                    <h3>{item.dropName}</h3>
                                                </td>
                                                <td className="textWrapClass text-center">
                                                    <img
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = '/images/fallback.png';
                                                        }}
                                                        src="/images/dlt_Icon.svg"
                                                        data-bs-dismiss="modal"
                                                        onClick={() => unAssignStudentData(item.studentId)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="d-flex justify-content-center p-5">
                                    <img
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/fallback.png';
                                        }}
                                        src="/images/search.svg"
                                        alt=""
                                        className="img-fluid"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Toaster />
        </Container>
    );
};

export default AssignStudent;
