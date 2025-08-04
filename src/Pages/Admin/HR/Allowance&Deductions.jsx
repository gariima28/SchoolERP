import React, { useState } from 'react'
import styled from 'styled-components'
import Allowance from './Allowance';
import Deductions from './Deductions';

const Container = styled.div`
    overflow : scroll;

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ActiveState{
        cursor: pointer;
        color: #000;
        border-bottom: 3px solid orange;
    }

    .InActiveState{
        cursor: pointer;
        color: var(--greyState);
    }

    @media screen and (max-width: 598px) and (min-width: 576px) {
        .fontSizeResponsive{
            font-size: 14px !important;
        }
    }

    @media screen and (max-width: 575px) and (min-width: 6px) {
        .fontSizeResponsive{
            
        }
    }

`;

const Allowance_Deductions = () => {

    const [AllowanceTab, setAllowanceTab] = useState(true);
    const [DeductionTab, setDeductionTab] = useState(false);

    return (
        <>
            <Container>
                <div className="container-fluid">
                    <div className="row p-3">
                        <div className="row pb-3">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item" aria-current="page"><a href="/admin/feeCollection/feesDiscount" className='bredcrumText text-decoration-none'>Fee Collection</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Fee Collection</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>{AllowanceTab ? 'Allowance Details' : 'Deduction Details'}</p>
                        </div>
                        <div className="row pb-3">
                            <div className="bg-white rounded-2 p-4">
                                <div className="row border-bottom border-2 ">
                                    <div className="col-xxl-6 col-xl-12 col-sm-12 col-12">
                                        <div className="row pb-2 gap-sm-0 gap-3">
                                            <div className="col-md-3 col-sm-6 col-5 text-center">
                                                <span className={`font14 fontSizeResponsive fontWeight500 ps-3 pb-2 pe-3 ${AllowanceTab ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setAllowanceTab(true); setDeductionTab(false) }}>Allowances</span>
                                            </div>
                                            <div className="col-md-3 col-sm-6 col-5 text-center">
                                                <span className={`font14 fontSizeResponsive fontWeight500 ps-3 pb-2 pe-3 ${DeductionTab ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setAllowanceTab(false); setDeductionTab(true) }}>Deductions</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {AllowanceTab ? <Allowance /> : <Deductions />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Allowance_Deductions
