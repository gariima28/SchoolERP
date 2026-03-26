import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { DownloadStudentFeeDataCSVById, DownloadStudentFeeDataPDFById, getCollectedStudentFeeByStuIdApi, getFeeDataByIdApi, getStudentProfileDataApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import ReactPaginate from 'react-paginate';
import { CSVLink } from 'react-csv';

const Container = styled.div`

    .formcontrolsearch {
        border-radius: 5px 0px 0px 5px !important;
        border: 1.5px solid var(--fontControlBorder) !important;
    }

    .borderrr{
        border: 1px solid var(--viewBtn)
    }

    .table thead tr{
        --bs-table-bg-type: #F2F3F6 !important;
    }
    
    .table tbody tr:last-child {
        background-color: #1f47c0 !important;
    }

    .form-control::placeholder{
        color: var(--greyState);
    }

    .form-control, .form-select{
        color: var(--greyState);
        border-radius: 5px;
        box-shadow: none;
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

    .ExportBtns{
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .greenBG{
        background-color: var(--headingBackgroundColor);
    }

    .darkgreentext{
        color: var(--greenTextColor);
    }

    .greyText{
      color: var(--greyTextColor) !important;
    }

    .greenText{
      color: var(--greenTextColor) !important;
    }

    .modal-footer{
        border: none !important;
    }
    
    .dropdown-item:active,
    .dropdown-item:hover,
    .dropdown-item:focus{
        background-color: var(--hoverBtn);
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

    .partialbutton {
        border-radius: 30px;
        background-color: #FF914C;
        color: #fff;
        padding: 0.34rem 1rem;
    }

    .recieptbutton {
        border-radius: 30px;
        background-color: #FF914C;
        color: #fff;
        padding: 0.34rem 1rem;
    }

    .paynowbutton {
        border-radius: 30px;
        background-color: #B50000;
        color: #fff;
        padding: 0.34rem 1rem;
    }
    .paid{
        background-color: rgba(0, 166, 126, 1);
        color: #fff;
        text-align: center;
        border-radius: 20px;
        padding: 1px 2px;
    }
    .unPaid{
        background-color: rgba(181, 0, 0, 1);
        color: #fff;
        text-align: center;
        border-radius: 20px;
        padding: 1px 2px;
    }
    .partial{
        background-color: rgba(255, 145, 76, 1);
        color: #fff;
        text-align: center;
        border-radius: 20px;
        padding: 1px 2px;
    }
`;

const Fees = () => {

    const navigate = useNavigate('')
    const token = sessionStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [searchByKey, setSearchByKey] = useState('');
    const [studentFeeRes, setStudentFeeRes] = useState([]);
    // Variable State
    const [studentId, setStudentId] = useState('')
    const [studentName, setStudentName] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [classNo, setClassNo] = useState(0);
    const [section, setSection] = useState('');
    const [studentRollNo, setStudentRollNo] = useState('')
    const [studentPh, setStudentPh] = useState('')
    const [studentImage, setStudentImage] = useState('')
    const [motherName, setMotherName] = useState('')
    console.log('imageee studenttt', studentImage)
    const [feeId, setFeeId] = useState('')
    const [feeIdData, setFeeIdData] = useState('')
    const [invoiceData, setInvoiceData] = useState()

    // CSV State
    const [csvData, setCSVData] = useState([])
    const [PDFResponse, setPDFResponse] = useState()

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getStudentDataById();
        getAllCollectFeesByStudentId();
    }, [token, pageNo])

    // comment the both below DownloadCSV(); DownloadPDF() beacuse page nit render 
    useEffect(() => {
        // DownloadCSV();
        // DownloadPDF();
    }, [token])

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1);
    };

    // const getStudentDataById = async () => {
    //     try {
    //         setloaderState(true);
    //         var response = await getStudentProfileDataApi();
    //         console.log('data of fees collection in parent module', response)
    //         if (response?.status === 200) {
    //             if (response?.data?.status === 'success') {
    //                 setInvoiceData(response?.data?.studentInvoice.invoices)
    //                 const data = response?.data?.studentInvoice.studentInfo
    //                 setStudentImage(data.studentImage)
    //                 setStudentName(data.studentName)
    //                 setFatherName(data.fatherName)
    //                 setClassNo(data.classNo)
    //                 setStudentRollNo(data.rollNumber)
    //                 setStudentPh(data.studentPh)
    //                 setStudentId(data.studentId)
    //                 setClassNo(data.classNo)
    //                 setMotherName(data.motherName)
    //                 // setInvoiceData(response?.data?.studentInvoice)
    //                 // toast.success(response?.data?.message);
    //                 setloaderState(false);
    //             }
    //             else {
    //                 // console.log('error')
    //                 toast.error(response?.data?.message);
    //             }
    //         }
    //         else {
    //             // console.log('error')
    //             toast.error(response?.data?.message);
    //         }
    //     }
    //     catch (error) {
    //         setloaderState(false);
    //         // console.log(error)
    //     }
    //     finally {
    //         setloaderState(false);
    //     }
    // }
    const getStudentDataById = async () => {
    try {
        setloaderState(true);

        const response = await getStudentProfileDataApi();
        console.log('data of fees collection in parent module', response);

       if (response?.status === 200 && response?.data?.status === 'success') {

            const studentInvoice = response?.data?.studentInvoice;
            const studentInfo = studentInvoice?.studentInfo;

            // ✅ Flatten invoice + feeDetails
            const invoiceData =
                studentInvoice?.invoices?.flatMap((invoice) =>
                    invoice?.feeDetails?.map((fee) => ({
                        invoiceNo: invoice.invoiceNo,
                        issueDate: invoice.issueDate,
                        paidDate: invoice.paidDate,
                        status: invoice.status,
                        paymentMode: invoice.paymentMode,
                        paidAmount: invoice.paidAmount,

                        feeType: fee.feeType,
                        totalAmount: fee.totalAmount,
                        discountAmount: fee.discountAmount,
                        dueAmount: fee.dueAmount,
                    }))
                ) || [];

            // ✅ save for table
            setInvoiceData(invoiceData);

            // ✅ student info
            setStudentImage(studentInfo?.studentImage);
            setStudentName(studentInfo?.studentName);
            setFatherName(studentInfo?.fatherName);
            setMotherName(studentInfo?.motherName);
            setClassNo(studentInfo?.classNo);
            setSection(studentInfo?.classSection);
            setStudentRollNo(studentInfo?.rollNumber);
            setStudentPh(studentInfo?.studentPh);
            setStudentId(studentInfo?.studentId);

        } else {
            toast.error(response?.data?.message);
        }

    } catch (error) {
        console.log(error);
    } finally {
        setloaderState(false);
    }
};

    const getFeeDataById = async (feeIddd) => {
        setFeeId(feeIddd)
        setloaderState(true);
        try {
            var response = await getFeeDataByIdApi(feeIddd);
            // console.log(response, 'idddddd')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setFeeIdData(response?.data?.feePaid)
                    // toast.success(response?.data?.message);
                    setloaderState(false);
                }
                else {
                    // console.log('error')
                    toast.error(response?.data?.message);
                }
            }
            else {
                // console.log('error')
                toast.error(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            // console.log(error)
        }
        finally {
            setloaderState(false);
        }
    }

    const getAllCollectFeesByStudentId = async () => {
        try {
            setloaderState(true);
            var response = await getCollectedStudentFeeByStuIdApi(id, searchByKey, pageSize, pageNo);
            // // console.log(response, 'feeeeee')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setStudentFeeRes(response?.data?.feePaid)
                    // toast.success(response?.data?.message);
                    setCurrentPage(response?.data?.currentPage)
                    setTotalPages(response?.data?.totalPages)
                    setloaderState(false);
                }
                else {
                    // console.log('error')
                    toast.error(response?.data?.message);
                }
            }
            else {
                // console.log('error')
                toast.error(response?.data?.message);
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

    return (

        <Container>
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="container-fluid pt-4 ">
                <div className="row gap-xl-0 gap-3">
                    <div className="col-xxl-9 col-xl-8 col-lg-7 col-sm-6 flex-frow-1 ">
                        <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Fee Collection </a></li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Fees</li>
                            </ol>
                        </nav>
                        <p className='font14 ps-0 fontWeight500'>Fees List</p>
                    </div>
                    <div className="col-xxl-3 col-xl-4 col-lg-4 col-sm-5">
                        <div className="row">
                            {/* <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                                <CSVLink className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" data={csvData} filename={"Student Fee Data.csv"}>
                                    <span className='font14 textVerticalCenter'>
                                        <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                        <span className='ms-1'>Export to CSV</span>
                                    </span>
                                </CSVLink>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-4 text-md-center text-sm-end text-start ps-0 align-self-center">
                                <button className="btn ps-2 pe-2 ExportBtns bg-white" type="button" onClick={handleDownloadPdf}>
                                    <span className='font14 textVerticalCenter'>
                                        <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                        <span className='ms-1'>Export to PDF</span>
                                    </span>
                                </button>
                            </div> */}
                        </div>
                        <div className="row gap-sm-0 gap-3">

                            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12 text-end">
                            </div>
                            {/* <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12 text-end align-self-center">
                                <div className="d-flex">
                                    <input className="form-control formcontrolsearch font14" type="text" placeholder="Search" onChange={(e) => setSearchByKey(e.target.value)} onKeyDown={handleKeyDown} />
                                    <button className="btn searchhhButtons text-white font14" type="button" onClick={getAllCollectFeesByStudentId}>Search</button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-4">
                <div className="row bg-white cardradius2">
                    <div className="col-12">
                        <div className="row p-3">
                            <div className="col-sm-9 col-12">
                                <div className="row greenBG cardradius2 p-3">
                                    <div className="col-md-2 col-3 align-self-center">
                                        <div className="row">
                                            {/* <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src={invoiceData?.invoices[0]?.studentImage} alt="" /> */}
                                            <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src={studentImage ? studentImage : "/images/fallback.png"} alt="" />

                                        </div>
                                    </div>
                                    <div className="col-md-10 col-9 ">
                                        <div className="row mt-4f mt-sm-0">
                                            <h2 className='darkgreentext p-1 ps-md-2'>Details info</h2>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-12">
                                                <div className="row p-md-2">
                                                    <form>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Name</label>
                                                            <div className="col-md-8 col-6">
                                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={studentName} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Father Name: </label>
                                                            <div className="col-md-8 col-6">
                                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={fatherName} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Mother Name: </label>
                                                            <div className="col-md-8 col-6">
                                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={motherName} />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div className="row p-md-2">
                                                    <form>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Class (Section): </label>
                                                            <div className="col-md-8 col-6">
                                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={`${classNo} (${section})`} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Student Id: </label>
                                                            <div className="col-md-8 col-6">
                                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={studentId} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Roll No: </label>
                                                            <div className="col-md-8 col-6">
                                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={studentRollNo} />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row p-3">
                            <div className="overflow-scroll">
                                <table className="table align-middle table-striped">
                                    <thead>
                                        <tr>
                                            <th className='textWrapClass'><span className='font14'>#</span></th>
                                            <th className='textWrapClass'><span className='font14'>Invoice No</span></th>
                                            <th className='textWrapClass'><span className='font14'>Fee Type</span></th>
                                            <th className='textWrapClass'><span className='font14'>Total Amount</span></th>
                                            <th className='textWrapClass'><span className='font14'>Discount</span></th>
                                            <th className='textWrapClass'><span className='font14'>Due Amount</span></th>
                                            <th className='textWrapClass'><span className='font14'>Paid Amount</span></th>
                                            <th className='textWrapClass'><span className='font14'>Payment Date</span></th>
                                            <th className='textWrapClass'><span className='font14'>Paid Status</span></th>
                                            <th className='textWrapClass'><span className='font14'>Payment Mode</span></th>
                                            <th className='text-center textWrapClass'><span className='font14'>Action</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr></tr>
                                        {invoiceData?.map((item, index) => (
                                            <tr className='align-middle' key={item?.feePaidId}>
                                                <th className='textWrapClass greyText font14'>{index + 1}</th>
                                                <td className='textWrapClass greyText font14'>{item?.invoiceNo}</td>
                                                <td className='textWrapClass greyText font14'>{item?.feeType}</td>
                                                <td className='textWrapClass greyText font14'>
                                                    <p className='blueText mb-0'>{item?.totalAmount}</p>
                                                    <p className='mb-0 '>Created at: <br /> {item?.issueDate}</p>
                                                </td>
                                                <td className='textWrapClass greyText font14'>{item?.discountAmount}</td>
                                                <td className='textWrapClass deactiveText'>{item?.dueAmount}</td>
                                                <td className='textWrapClass greyText font14'>{item?.paidAmount}</td>
                                                <td className='textWrapClass greyText font14'>{item?.paidDate}</td>
                                                <td className='textWrapClass greyText font14'>
                                                    <p className={`paid mb-0 ${item?.status === 'PAID' ? 'paid' : item?.status === 'UNPAID' ? 'unPaid' : 'partial' }`}>{item?.status}</p>
                                                </td>
                                                <td className='textWrapClass greyText font14'>{item?.paymentMode ? item?.paymentMode : 'N/A'}</td>
                                                <td className='textWrapClass text-end'>
                                                    <button className="btn btn-sm actionButtons" type='button'>
                                                        <span>Action</span>
                                                    </button>
                                                    <button className="btn btn-sm actionButtons ms-2" type='button'>
                                                        <span>Action</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                      </table>
                                    {/* {invoiceData?.invoices[0]?.feeDetails.map((item, index) => (
                                            <tr className='align-middle' key={item?.feePaidId}>
                                                <th className='textWrapClass greyText font14'>{index + 1}</th>
                                                <td className='textWrapClass greyText font14'>{item?.invoiceNo}</td>
                                                <td className='textWrapClass greyText font14'>{item?.feeType}</td>
                                                <td className='textWrapClass greyText font14'>
                                                    <p className='blueText'>{item?.totalAmount}</p>
                                                    <p>Created at: {item?.createdAt}</p>
                                                </td>
                                                <td className='textWrapClass greyText font14'>{item?.discountAmount}</td>
                                                <td className='textWrapClass deactiveText'>{item?.dueAmount}</td>
                                                <td className='textWrapClass greyText font14'>{item?.paidAmount}</td>
                                                <td className='textWrapClass greyText font14'>{item?.paymentDate}</td>
                                                <td className='textWrapClass greyText font14'>{item?.paidStatus}</td>
                                                <td className='textWrapClass greyText font14'>{item?.paymentMode}</td>
                                                <td className='textWrapClass text-end'>
                                                    <button className="btn btn-sm actionButtons" type='button'>
                                                        <span>Action</span>
                                                    </button>
                                                    <button className="btn btn-sm actionButtons ms-2" type='button'>
                                                        <span>Action</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))} */}
                              
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
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal modal-lg fade" id="AddFee" tabIndex="-1" aria-labelledby="AddFeeLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content ps-4 pe-4 p-2">
                        <div className="modal-header ps-0 pe-0">
                            <span className="modal-title font16 greenText" id="AddFeeLabel">Fees Payment Details</span>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-3">
                            <div className="container-fluid p-0">
                                <div className="row borderrr rounded-1 p-2">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <p className='font14'>Description</p>
                                                </div>
                                                <div className="p">
                                                    <p className='font14'>Amount</p>
                                                </div>
                                            </div>
                                            <hr className='mt-2' />
                                            <div className="d-flex pb-3" key={feeIdData?.feePaidId}>
                                                <div className="flex-grow-1">
                                                    <p className='font14 greenText'>{feeIdData ? feeIdData.feeGroup.split('_').join(' ') : ''}</p>
                                                    <p className='font14 greyText'>{feeIdData.feeType}</p>
                                                    <p className='font14 text-danger'>Fine</p>

                                                </div>
                                                <div className="align-self-center">
                                                    <p className='font14'></p>
                                                    <p className='font14'>{feeIdData.amount}</p>
                                                    <p className='font14 text-danger'>{feeIdData.fineAmount}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <hr className='mt-2 mb-2' />
                                            <div className="d-flex">
                                                <span className="flex-grow-1 font14 fw-bold">Total Fees</span>
                                                <span className="font14 fw-bold">{feeIdData?.amount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button className='btn saveButtons text-white' type='button'>Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Fees
