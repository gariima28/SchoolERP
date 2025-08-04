import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { getStudentDataByIdApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';

const Container = styled.div`

    .table thead tr{
        --bs-table-bg-type: #F2F3F6 !important;
    }

    .AddBtnn, .AddBtnn:visited, .AddBtnn:active {
        border: 1px solid var(--breadCrumActiveTextColor);
        background-color: var(--breadCrumActiveTextColor);
    }

    .CancelBtnn, .CancelBtnn:active {
        border: 1px solid var(--greyState);
    }
    
    .greenText{
        color: var(--breadCrumActiveTextColor);
    }
    
    .table tbody tr:last-child {
        background-color: #1f47c0 !important;
    }

    .form-control::placeholder{
        color: var(--greyState);
    }

    .form-control, .form-select{
        color: var(--greyState);
        border-radius: 5px ;
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

    .purpleBg{
        background-color: #F0F0FF;
    }

    .darkgreentext{
        color: var(--greenTextColor);
    }

    .nav-link{
        background-color: #fff !important;
        color: var(--greyTextColor) !important;
        border-radius: 0px !important;
    }

    .nav-link.active{
        background-color: var(--headingBackgroundColor) !important;
        color: #000 !important;
        border-bottom: 3px solid var(--activeOrangeBorder) !important;
        border-radius: none !important;
    }

`;

const StudentPayFeeDetails = () => {

    //loader State
    const [loaderState, setloaderState] = useState(false);
    // Variable State
    const [studentId, setStudentId] = useState('')
    const [studentName, setStudentName] = useState('')
    const [gender, setGender] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [classNo, setClassNo] = useState(0);
    const [studentRollNo, setStudentRollNo] = useState('')
    const [studentPh, setStudentPh] = useState('')
    const [studentImage, setStudentImage] = useState('')
    const [invoices, setInvoices] = useState([
        {
            id: 1,
            feeType: 'Tuition Fee (March, April)',
            paymentMethod: 'Cash',
            paidDate: '1 April 2024',
            totalAmount: '18,950',
            discount: '100',
            dueAmount: '0',
        },
    ]);

    // useEffect(() => {
    //     getStudentDataById();
    // }, [token])

    // const getStudentDataById = async () => {
    //     try {
    //         setloaderState(true);
    //         var response = await getStudentDataByIdApi(id);
    //         if (response?.status === 200) {
    //             if (response?.data?.status === 'success') {
    //                 setStudentName(response?.data?.student?.studentName);
    //                 setGender(response?.data?.student?.gender);
    //                 setStudentId(response?.data?.student?.studentId);
    //                 setFatherName(response?.data?.student?.fatherName);
    //                 setClassNo(response?.data?.student?.classNo);
    //                 setStudentPh(response?.data?.student?.studentPhone);
    //                 setStudentImage(response?.data?.student?.studentImage);
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
    //         setloaderState(false);
    //         // console.log(error)
    //         if (error?.response?.data?.statusCode === 401) {
    //             sessionStorage.removeItem('token')
    //             setTimeout(() => {
    //                 navigate('/')
    //             }, 200);
    //         }

    //     }
    // }

    return (

        <Container>
            {loaderState && (<DataLoader />)}
            <div className="container-fluid">
                <div className="row purpleBg cardradius2">
                    <div className="col-md-2 col-4 align-self-center">
                        <div className="row">
                            {/* <img src={studentImage} alt="" /> */}
                            <img className='' src={studentImage} alt="Not found !!" onError={(e) => e.target.src = gender === 'Male' ? '/images/boyImage.png' : '/images/girlImage.png'} />
                        </div>
                    </div>
                    <div className="col-md-10 col-8 mt-2">
                        <div className="row">
                            <h2 className='text-black p-1 ps-md-3'>ABC Sharma</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="row p-md-2">
                                    <form>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Class: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={studentName} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Section: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={studentName} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Email: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={studentName} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Phone: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={studentName} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div className="row p-md-2">
                                    <form>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Invoice: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={classNo} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Status: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={classNo} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Date: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={classNo} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Month: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={classNo} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row overflow-scroll mt-4">
                    <table className="table align-middle table-striped">
                        <thead>
                            <tr>
                                <th className="font14 textWrapClass tableHeading text-center">#</th>
                                <th className="font14 textWrapClass tableHeading">Fee Type</th>
                                <th className="font14 textWrapClass tableHeading">Payment Method</th>
                                <th className="font14 textWrapClass tableHeading">Paid Date</th>
                                <th className="font14 textWrapClass tableHeading">Total Amount</th>
                                <th className="font14 textWrapClass tableHeading">Discount</th>
                                <th className="font14 textWrapClass tableHeading">Due Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr></tr>
                            {invoices.map((invoice, index) => (
                                <tr key={invoice.id} className="align-middle">
                                    <th className="font14 pt-3 textWrapClass text-center greyText">{index + 1}.</th>
                                    <td className="font14 pt-3 textWrapClass greyText">{invoice.feeType}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{invoice.paymentMethod}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{invoice.paidDate}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{invoice.totalAmount}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{invoice.discount}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{invoice.dueAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="row my-3">
                    <div className="col-12 text-center">
                        <button className='btn AddBtnn font14 text-white' type='submit'>Pay Amount</button>
                        <button className='btn CancelBtnn font14 ms-2' type='button'>Cancel</button>
                    </div>
                </div>
            </div>
            <Toaster />
        </Container>
    )
}

export default StudentPayFeeDetails
