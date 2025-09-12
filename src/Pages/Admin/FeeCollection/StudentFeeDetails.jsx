import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components'
import { getStudentDataByIdApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from 'src/Layouts/Loader';
import { getRecieptByIdApi } from '../../../Utils/Apis';

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

const StudentFeeDetails = ({ RecieptViewId }) => {

    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [RecieptIdData, setRecieptIdData] = useState();
    const [FeeIdData, setFeeIdData] = useState([]);
    useEffect(() => {
        getAllRecieptById(RecieptViewId)
    }, [RecieptViewId])

    const getAllRecieptById = async (id) => {
        try {
            // setLoaderState(true);
            const response = await getRecieptByIdApi(id);
            if (response?.status === 200 && response?.data?.status === 'success') {
                setRecieptIdData(response?.data?.receipt);
                setFeeIdData(response?.data?.receipt?.invoice?.feeDetails || []);
                // setSearchBtn(true);
                toast.success(response?.data?.message || 'Invoices fetched successfully');
            } else {
                // toast.error(response?.data?.message || 'Failed to fetch invoices');
            }
        } catch (error) {
            // toast.error(error?.response?.data?.message || 'Error fetching invoices');
        } finally {
        }
    };


    const [itemData, setItemData] = useState([
        {
            key: 'Subtotal :',
            value: '23,750'
        },
        {
            key: 'Discount :',
            value: '500'
        },
        {
            key: 'Total :',
            value: '23,250'
        },
        {
            key: 'Paid Amount :',
            value: '23,250'
        },
        {
            key: 'Due Amount :',
            value: '0'
        },
        {
            key: 'Paid Date :',
            value: 'Apr 1, 2024'
        },
    ]);

    return (

        <Container>
            {loaderState && (<DataLoader />)}
            <div className="container-fluid">
                <div className="row purpleBg cardradius2">
                    <div className="col-md-2 col-4 align-self-center">
                        <div className="row">
                            {RecieptIdData?.invoice?.studentName === null ? (
                                <img className="border rounded-circle p-1" src="/images/userProfile.png" alt="..." height={35} />
                            ) : (
                                <img className="border rounded-circle p-1" src={RecieptIdData?.invoice?.studentName} alt="..." height={35} />
                            )}
                            {/* <img className='' src={RecieptIdData?.invoice?.studentName} alt="Not found !!" onError={(e) => e.target.src = gender === 'Male' ? '/images/boyImage.png' : '/images/girlImage.png'} /> */}
                        </div>
                    </div>
                    <div className="col-md-10 col-8 mt-2">
                        <div className="row">
                            <h2 className='text-black p-1 ps-md-3'>{RecieptIdData?.invoice?.studentName}</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="row p-md-2">
                                    <form>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Class: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={RecieptIdData?.invoice?.classNo} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Section: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={RecieptIdData?.invoice?.section} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Email: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={RecieptIdData?.invoice?.email} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Phone: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={RecieptIdData?.invoice?.phoneNumber} />
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
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={RecieptIdData?.invoice?.invoiceNo} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Status: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={RecieptIdData?.invoice?.status} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Date: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={RecieptIdData?.invoice?.studentName} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Month: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={RecieptIdData?.invoice?.studentName} />
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
                                <th className="font14 textWrapClass tableHeading">Total Amount</th>
                                <th className="font14 textWrapClass tableHeading">Discount</th>
                                <th className="font14 textWrapClass tableHeading">Due Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr></tr>
                            {FeeIdData.map((invoice, index) => (
                                <tr key={invoice.id} className="align-middle">
                                    <th className="font14 pt-3 textWrapClass text-center greyText">{index + 1}.</th>
                                    <td className="font14 pt-3 textWrapClass greyText">{invoice.feeType}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{invoice.totalAmount}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{invoice.discount}</td>
                                    <td className="font14 pt-3 textWrapClass greyText">{invoice.dueAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <div className="col-6"></div>
                    <div className="col-6">
                        <table className="table align-middle border">
                            <tbody>
                                <tr></tr>
                                {/* {itemData.map((data, index) => (
                                    <tr key={index} className="align-middle">
                                        <td className="font14 pt-3 textWrapClass text-start greyText">{data.key}</td>
                                        <td className="font14 pt-3 textWrapClass text-end greyText">{data.value}</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12 text-center">
                        <button className='btn AddBtnn font14 text-white' type='button'>Download</button>
                        <button className='btn AddBtnn font14 text-white ms-2' type='button'>Print</button>
                    </div>
                </div>
            </div>
            <Toaster />
        </Container>
    )
}

export default StudentFeeDetails
