import { useState, useEffect } from 'react';
import styled from 'styled-components'

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

const StudentFeeDetails = ({ recieptDataAll }) => {

    console.log(recieptDataAll, 'recieptDataAll')

    const [itemData, setItemData] = useState([
{ key: 'Subtotal :', value: null },
{ key: 'Discount :', value: null },
{ key: 'Total :', value: null },
{ key: 'Paid Amount :', value: null },
{ key: 'Due Amount :', value: null },
{ key: 'Paid Date :', value: null },
]);
 
// Update itemData when recieptDataAll changes or component mounts
useEffect(() => {
// Only update if recieptDataAll is provided and has valid data
if (recieptDataAll && Object.keys(recieptDataAll).length > 0) {
setItemData([
{ key: 'Subtotal :', value: recieptDataAll.totalAmount || null },
{ key: 'Discount :', value: recieptDataAll.discount || null },
{ key: 'Total :', value: recieptDataAll.totalAmount || null },
{ key: 'Paid Amount :', value: recieptDataAll.paidAmount || null },
{ key: 'Due Amount :', value: recieptDataAll.dueAmount || null },
{ key: 'Paid Date :', value: recieptDataAll.paidDate || null },
]);
} else {
// Set all values to null if recieptDataAll is empty or undefined
setItemData([
{ key: 'Subtotal :', value: null },
{ key: 'Discount :', value: null },
{ key: 'Total :', value: null },
{ key: 'Paid Amount :', value: null },
{ key: 'Due Amount :', value: null },
{ key: 'Paid Date :', value: null },
]);
}
}, [recieptDataAll]);



    return (

        <Container>
            <div className="container-fluid">
                <div className="row purpleBg cardradius2">
                    <div className="col-md-2 col-4 align-self-center">
                        <div className="row">
                            {recieptDataAll?.studentName === null ? (
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} className="border rounded-circle p-1" src="/images/userProfile.png" alt="..." />
                            ) : (
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} className="border rounded-circle p-1" src={recieptDataAll?.studentName} alt="..." />
                            )}
                            {/* <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} className='' src={recieptDataAll?.studentName} alt="Not found !!" onError={(e) => e.target.src = gender === 'Male' ? '/images/boyImage.png' : '/images/girlImage.png'} /> */}
                        </div>
                    </div>
                    <div className="col-md-10 col-8 mt-2">
                        <div className="row">
                            <h2 className='text-black p-1 ps-md-3'>{recieptDataAll?.studentName}</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="row p-md-2">
                                    <form>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Class: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={recieptDataAll?.classNo} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Section: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={recieptDataAll?.section} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Email: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={recieptDataAll?.email} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Phone: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={recieptDataAll?.phoneNumber} />
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
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={recieptDataAll?.invoiceNo} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Status: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={recieptDataAll?.status} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Date: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={recieptDataAll?.studentName} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label htmlFor="inputEmail3" className="textWrapClass col-md-4 col-6 col-form-label greyText font14 p-1">Month: </label>
                                            <div className="col-md-8 col-6">
                                                <input type="email" readOnly className="textWrapClass form-control-plaintext font14 p-1" id="inputEmail3" value={recieptDataAll?.studentName} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row overflow-scroll mt-4">
                    {recieptDataAll?.feeDetails.length > 0 ?
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
                                {recieptDataAll?.feeDetails.map((invoice, index) => (
                                    <tr key={invoice.id} className="align-middle">
                                        <th className="font14 pt-3 textWrapClass text-center greyText">{index + 1}.</th>
                                        <td className="font14 pt-3 textWrapClass greyText">{invoice?.feeType}</td>
                                        <td className="font14 pt-3 textWrapClass greyText">{invoice?.totalAmount}</td>
                                        <td className="font14 pt-3 textWrapClass greyText">{invoice?.discountAmount}</td>
                                        <td className="font14 pt-3 textWrapClass greyText">{invoice?.dueAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :
                        <>
                            <p className='font14 greyText'>Fees Details</p>
                            <hr />
                            <div className="d-flex justify-content-center">
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className='img-fluid' />
                            </div>
                        </>
                    }
                </div>
                <div className="row">
                    <div className="col-6"></div>
                    <div className="col-6">
                        <table className="table align-middle border">
                            <tbody>
                                <tr></tr>
                                {itemData.map((data, index) => (
                                    <tr key={index} className="align-middle">
                                        <td className="font14 pt-3 textWrapClass text-start greyText">{data.key}</td>
                                        <td className="font14 pt-3 textWrapClass text-end greyText">{data.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12 text-center">
                        <button className='btn AddBtnn font14 text-white' disabled type='button'>Download</button>
                        <button className='btn AddBtnn font14 text-white ms-2' disabled type='button'>Print</button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default StudentFeeDetails



{/* {recieptDataAll?.feeTypeIds.length > 0 ?
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
                                {recieptDataAll?.feeTypeIds.map((invoice, index) => (
                                    <tr key={invoice.id} className="align-middle">
                                        <th className="font14 pt-3 textWrapClass text-center greyText">{index + 1}.</th>
                                        <td className="font14 pt-3 textWrapClass greyText">{invoice?.feeType}</td>
                                        <td className="font14 pt-3 textWrapClass greyText">{invoice?.totalAmount}</td>
                                        <td className="font14 pt-3 textWrapClass greyText">{invoice?.discount}</td>
                                        <td className="font14 pt-3 textWrapClass greyText">{invoice?.dueAmount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :
                        <>
                            <p className='font14 greyText'>Fees Details</p>
                            <hr />
                            <div className="d-flex justify-content-center">
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className='img-fluid' />
                            </div>
                        </>
                    } */}
