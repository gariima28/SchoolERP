import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styled from 'styled-components';
import ActionControls from '../../../Layouts/ActionControls';
import { getAllClassApi } from 'src/Utils/Apis';
import DataLoader from 'src/Layouts/Loader';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import StudentFeeDetails from './StudentFeeDetails';
import toast from 'react-hot-toast';
import { getAllRecieptApi, getRecieptCsvApi } from '../../../Utils/Apis';

// Styled components remain unchanged
const Container = styled.div`
    select:-internal-list-box {
        overflow: visible !important;
        background-color: #00A67E !important;
    }

    .padding-daterange {
        padding: 0.4rem 0.5rem !important;
        margin-top: 0.12rem !important;
    }

    .form-select {
        color: var(--greyState);
        box-shadow: none;
        border: 1px solid var(--formInputBorder) !important;
    }
    
    .mainBreadCrum {
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText {
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText {
        color: var(--breadCrumActiveTextColor);
    }

    .ExportBtns {
        border-radius: 6px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-control::placeholder, .form-control, .form-select {
        color: var(--greyState);
    }

    .form-control, .form-select {
        box-shadow: none !important;
        border: 1px solid var(--formInputBorder);
    }

    //date range
    .rdrCalendarWrapper{
        background-color: #eff8f7 !important;
    }

    .rdrSelected, .rdrInRange, .rdrStartEdge, .rdrEndEdge {
        background-color: #008479;
    }

    .rdrDayHovered {
        outline: #008479;
    }
    //date range

    .contbtn {
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv {
        background-color: #FBFBFB;
    }

    .formdltcheck:checked {
        background-color: #B50000;
        border-color: #B50000;
    }

    .formEditSpecFeatcheck:checked {
        background-color: #00A67E;
        border-color: #00A67E;
    }

    .modalHighborder {
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder {
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .correvtSVG {
        position: relative;
        width: fit-content;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .deleteSVG {
        position: relative;
        width: fit-content;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }

    .w-fitcontent {
        width: fit-content;
    }

    .greyText {
        color: #8F8F8F;
    }

    .blueText {
        color: #008ECA;
    }

    .paidbutton {
        border-radius: 30px;
        background-color: #00A67E;
        color: #fff;
        padding: 0.34rem 1rem;
    }

    .unPaidbutton {
        border-radius: 30px;
        background-color: #B50000;
        color: #fff;
        padding: 0.34rem 1rem;
    }
`;

const Reciept = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [loaderState, setLoaderState] = useState(false);
    const [searchBtn, setSearchBtn] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [classNo, setClassNo] = useState('');
    const [section, setSection] = useState('');
    const [status, setStatus] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateRange, setDateRange] = useState([
        {
            startDate: null,
            endDate: null,
            key: 'selection',
        },
    ]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(null);
    const [allClassData, setAllClassData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);
    const [RecieptData, setRecieptData] = useState([]);
    const datePickerRef = useRef(null);
    const {
        register: registerAdd,
        handleSubmit: handleSubmitAdd,
        formState: { errors: errorsAdd, isValid: isValidAdd },
        setValue: setValueAdd,
        reset: resetAdd,
    } = useForm({
        mode: 'onChange',
    });

    const {
        register: registerUpdate,
        handleSubmit: handleSubmitUpdate,
        formState: { errors: errorsUpdate, isValid: isValidUpdate },
        setValue: setValueUpdate,
        reset: resetUpdate,
    } = useForm({
        mode: 'onChange',
    });

    // useEffect for click-outside detection
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
        };
        if (showDatePicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDatePicker]);

    useEffect(() => {
        getAllClassData();
    }, [token]);

    const getAllClassData = async () => {
        try {
            setLoaderState(true);
            const response = await getAllClassApi();
            if (response?.status === 200 && response?.data?.status === 'success') {
                setTimeout(() => {
                    setLoaderState(false);
                }, 800);
                setAllClassData(response?.data?.classes || []);
            }
        } catch (error) {
            setTimeout(() => {
                setLoaderState(false);
            }, 800);
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/');
                }, 200);
            }
        }
        finally {
            setLoaderState(false);
        }
    };

    const handleClassChange = (value) => {
        setClassNo(value);
        setSection('');
        const selectedClass = allClassData.find((c) => c.classNo === value);
        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
        } else {
            setAllSectionData([]);
        }
    };

    const handleSectionChange = (value) => {
        setSection(value);
    };

    const [pickerKey, setPickerKey] = useState(0); // Added to force re-render of DateRange

    // Handler for date range change
    const handleDateRangeChange = (item) => {
        setDateRange([item.selection]);
        const { startDate, endDate } = item.selection;
        // Convert to local date string without timezone offset
        const formatDate = (date) => {
            if (date) {
                return date.toISOString().split('T')[0]; // This will now be adjusted manually if needed
                // Alternatively, use toLocaleDateString with specific options:
                // return date.toLocaleDateString('en-CA').replace(/\//g, '-'); // e.g., '2025-09-01'
            }
            return '';
        };
        setStartDate(formatDate(startDate));
        setEndDate(formatDate(endDate));
        console.log('DateRange updated:', { startDate: formatDate(startDate), endDate: formatDate(endDate) }); // Debug log
    };

    // Format date range for display
    const formattedDate = dateRange[0].startDate && dateRange[0].endDate
        ? `${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`
        : 'Select Date Range';

    // Updated cancelSearch to reset dateRange and pickerKey
    const cancelSearch = () => {
        setSearchBtn(true);
        setClassNo('');
        setSection('');
        setStartDate('');
        setEndDate('');
        setDateRange([
            {
                startDate: null,
                endDate: null,
                key: 'selection',
            },
        ]);
        setPickerKey((prev) => prev + 1); // Increment to force re-render
        setAllSectionData([]);
        setRecieptData([]);
    };

    const getAllReciept = async () => {
        try {
            setLoaderState(true);
            const response = await getAllRecieptApi(startDate, endDate, classNo, section, status);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setRecieptData(response?.data?.receipts || []);
                setSearchBtn(true);
                toast.success(response?.data?.message || 'Invoices fetched successfully');
            } else {
                toast.error(response?.data?.message || 'Failed to fetch invoices');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error fetching invoices');
        } finally {
            setLoaderState(false);
        }
    };

    const handleSearchButton = () => {
        getAllReciept();
    };

    const handleAddButton = () => {
        navigate('/admin/feeCollection/collectFees');
    };

    const [invoiceId, setInvoiceId] = useState('');
    const toggleDropdown = (index) => {
        setIsDropdownOpen(isDropdownOpen === index ? null : index);
        setInvoiceId(index);
    };

    return (
        <Container>
            {loaderState && <DataLoader />}
            <div className="container-fluid p-4">
                <div className="row pb-2 gap-xl-0 px-0">
                    <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1">
                        <nav className="mainBreadCrum font14 ps-0" aria-label="breadcrumb">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item">
                                    <a href="/" className="bredcrumText text-decoration-none">Home</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="/admin/feeCollection/feesDiscount" className="bredcrumText text-decoration-none">Fee Collection</a>
                                </li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Reciept</li>
                            </ol>
                        </nav>
                        <p className="font14 ps-0 fontWeight500">Reciept</p>
                    </div>
                    <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                        <ActionControls
                            showAddButton={true}
                            addButtonText="Add Invoice"
                            addButtonAction={handleAddButton}
                            showSearch={true}
                            searchAction={handleSearchButton}
                            showExportPDF={false}
                            exportPDFText="Export PDF"
                            exportPDFAction={''}
                            exportPDFFileName="Receipts.pdf"
                            showExportCSV={RecieptData.length > 0}
                            exportCSVText="Export CSV"
                            exportCSVAction={getRecieptCsvApi}
                            exportCSVFileName="Receipts.xlsx"
                        />
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="bg-white rounded-2 p-4">
                        <form className="row g-3">
                            <div className="col-md-3 col-sm-6 col-12 d-flex flex-column position-relative">
                                <label htmlFor="dateRange" className="form-label font14">Date Range</label>
                                <div className="position-relative">
                                    <input
                                        readOnly
                                        value={formattedDate}
                                        onClick={() => {
                                            setDateRange([
                                                {
                                                    startDate: null,
                                                    endDate: null,
                                                    key: 'selection',
                                                },
                                            ]);
                                            setShowDatePicker(!showDatePicker);
                                        }}
                                        className="border border-gray-300 rounded padding-daterange font14 cursor-pointer w-100"
                                    />
                                    {showDatePicker && (
                                        <div ref={datePickerRef} style={{ position: 'absolute', zIndex: 1000, top: '100%', left: 0, marginTop: '2%' }}>
                                            <DateRange
                                                editableDateInputs={true}
                                                onChange={handleDateRangeChange}
                                                moveRangeOnFirstSelection={false}
                                                ranges={dateRange}
                                                preventSnapRefocus={true}
                                                showDateDisplay={false}
                                                rangeColors={['transparent']}
                                                showSelectionPreview={false}
                                                focusedRange={[0, 0]}
                                                showMonthAndYearPickers={true}
                                                retainEndDateOnFirstSelection={false}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label htmlFor="classNo" className="form-label font14">Class</label>
                                <select
                                    className="form-select bordeRadius5 font14"
                                    aria-label="Default select example"
                                    value={classNo}
                                    onChange={(e) => handleClassChange(e.target.value)}
                                >
                                    <option value="">-- Select --</option>
                                    {allClassData?.map((option) => (
                                        <option key={option.classId} value={option.classNo}>
                                            {option.classNo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label htmlFor="section" className="form-label font14">Section</label>
                                <select
                                    className="form-select bordeRadius5 font14"
                                    aria-label="Default select example"
                                    value={section}
                                    onChange={(e) => handleSectionChange(e.target.value)}
                                >
                                    <option value="" disabled>-- Select --</option>
                                    {classNo !== '' ? (
                                        allSectionData.length > 0 ? (
                                            allSectionData.map((option) => (
                                                <option key={option.classSecId} value={option.sectionName}>
                                                    {option.sectionName}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>-- No Sections Found --</option>
                                        )
                                    ) : (
                                        <option value="" disabled>-- Select Class First --</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <label htmlFor="section" className="form-label font14">Status</label>
                                <select
                                    className="form-select bordeRadius5 font14"
                                    aria-label="Default select example"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">All Status</option>
                                    <option value="PAID"> PAID </option>
                                    <option value="UNPAID"> UNPAID </option>
                                </select>
                            </div>
                            <div className="text-center p-3 col-12">
                                <button
                                    type="button"
                                    className="btn addCategoryButtons text-white"
                                    onClick={handleSearchButton}
                                    disabled={!classNo || !section}
                                >
                                    Search
                                </button>
                                <button
                                    type="button"
                                    className="btn cancelButtons ms-3"
                                    onClick={cancelSearch}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                        {searchBtn ? (
                            <div className="row">
                                {RecieptData.length > 0 ? (
                                    <>
                                        <div className="overflow-scroll">
                                            <table className="table align-middle table-striped">
                                                <thead>
                                                    <tr>
                                                        <th className="font14 textWrapClass tableHeading text-center">#</th>
                                                        <th className="font14 textWrapClass tableHeading">Invoice No</th>
                                                        <th className="font14 textWrapClass tableHeading">Student</th>
                                                        <th className="font14 textWrapClass tableHeading">Class & Section</th>
                                                        <th className="font14 textWrapClass tableHeading">Net Amount</th>
                                                        <th className="font14 textWrapClass tableHeading">Paid Amount</th>
                                                        <th className="font14 textWrapClass tableHeading">Due Amount</th>
                                                        <th className="font14 textWrapClass tableHeading">Paid Status</th>
                                                        <th className="font14 textWrapClass tableHeading text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {RecieptData.map((reciept, index) => (
                                                        <tr key={reciept.invoiceId} className="align-top">
                                                            <th className="font14 pt-3 textWrapClass text-center greyText">{index + 1}.</th>
                                                            <td className="font14 pt-3 textWrapClass greyText">{reciept?.invoice?.invoiceNo}</td>
                                                            <td className="font14 pt-3 textWrapClass greyText">{reciept?.invoice?.studentName}</td>
                                                            <td className="font14 pt-3 textWrapClass greyText">{reciept?.invoice?.classNo} - {reciept?.invoice?.section}</td>
                                                            <td className="font14 pt-3 textWrapClass greyText">{reciept?.invoice?.totalAmount}</td>
                                                            <td className="font14 pt-3 textWrapClass greyText">{reciept?.invoice?.paidAmount}</td>
                                                            <td className="font14 pt-3 textWrapClass greyText">{reciept?.invoice?.dueAmount}</td>
                                                            <td className=' pt-3 textWrapClass'><span className={`font14 ${reciept?.status === 'Paid' || reciept?.status === 'PAID' ? 'paidbutton' : 'unPaidbutton'}`}>{reciept?.status}</span></td>
                                                            <td className="font14 pt-3 textWrapClass text-center">
                                                                <div className="dropdown dropdownbtn">
                                                                    <button
                                                                        className="btn btn-sm actionButtons dropdown-toggle"
                                                                        type="button"
                                                                        onClick={() => toggleDropdown(reciept.invoiceId)}
                                                                    >
                                                                        Action
                                                                    </button>
                                                                    <ul className={`dropdown-menu dropdown-menu-end ${isDropdownOpen === reciept.invoiceId ? 'show z-index-high' : ''}`}>
                                                                        <li>
                                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#collectFees" aria-controls="collectFees">Collect Fees</button>
                                                                        </li>
                                                                        <li>
                                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="modal" data-bs-target="#viewDetails">View</button>
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
                                            {/* Pagination component can be added here if needed */}
                                        </div>
                                    </>
                                ) : (
                                    <div className="d-flex justify-content-center p-5">
                                        <img src="/images/search.svg" alt="" className="img-fluid" />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="d-flex justify-content-center p-5">
                                <img src="/images/search.svg" alt="" className="img-fluid" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="collectFees" aria-labelledby="collectFeesLabel">
                <div className="offcanvas-header border-bottom border-2 p-2">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path
                                fill="#008479"
                                fillRule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                            />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title" id="collectFeesLabel">
                        Collect Fees
                    </h2>
                </div>
                <div className="offcanvas-body p-3">
                    <form onSubmit={handleSubmitUpdate()}>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label font14">Amount</label>
                            <input
                                id="amount"
                                type="number"
                                className={`form-control font14 ${errorsUpdate.amount ? 'border-danger' : ''}`}
                                placeholder="Enter Amount"
                                {...registerUpdate('amount', {
                                    required: 'Amount is required *',
                                    min: { value: 0.01, message: 'Amount must be greater than 0' },
                                })}
                            />
                            {errorsUpdate.amount && <p className="font12 text-danger">{errorsUpdate.amount.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="paymentMethod" className="form-label font14">Payment Method</label>
                            <select
                                id="paymentMethod"
                                className="form-select font14"
                                {...registerUpdate('paymentMethod', { required: 'Payment method is required *' })}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="CASH">CASH</option>
                                <option value="UPI">UPI</option>
                                <option value="BANK_TRANSFER">BANK_TRANSFER</option>
                            </select>
                            {errorsUpdate.paymentMethod && <p className="font12 text-danger">{errorsUpdate.paymentMethod.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label font14">Description</label>
                            <input
                                id="description"
                                type="text"
                                className={`form-control font14 ${errorsUpdate.description ? 'border-danger' : ''}`}
                                placeholder="Enter Description"
                                {...registerUpdate('description', {
                                    validate: (value) =>
                                        !value ||
                                        (/^[a-zA-Z0-9\s'-]+$/.test(value) || 'Invalid Characters in Description'),
                                })}
                            />
                            {errorsUpdate.description && <p className="font12 text-danger">{errorsUpdate.description.message}</p>}
                        </div>
                        <p className="text-center p-3">
                            <button className="btn addButtons font14 text-white me-2" type="submit" disabled={!isValidUpdate}>
                                Submit
                            </button>
                            <button
                                className="btn cancelButtons font14"
                                data-bs-dismiss="offcanvas"
                                type="button"
                                onClick={() => {
                                    resetUpdate();
                                }}
                            >
                                Cancel
                            </button>
                        </p>
                    </form>
                </div>
            </div>

            <div className="modal modal-lg fade" id="viewDetails" tabIndex="-1" aria-labelledby="viewDetailsLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header pb-2">
                            <h2 className="modal-title" id="viewDetailsLabel">Windsor Park High School</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <StudentFeeDetails />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Reciept;
// 146-631
