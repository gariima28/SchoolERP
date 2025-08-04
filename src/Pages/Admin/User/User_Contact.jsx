import React, { useState } from 'react'
import styled from 'styled-components'
import Fee_collec_1 from '../X-Extra/Fee_collec_1';
import Fee_collec_2 from '../X-Extra/Fee_collec_2';
import { Link, useParams } from 'react-router-dom';
import Conta_contac from './Conta_contac';
import Conta_allown from './Conta_allown';
import Contac_commis from './Contac_commis';
import Contact_statu from './Contact_statu';
import Conta_reimburse from './Conta_reimburse';
// import SingleStudentAdmission from './SingleStudentAdmission';
// import ExcelUploadForm from './ExcelUpload';

const Container = styled.div`
height: fit-content;
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
        background-color: #F0F8F7;
        padding: 10px;
        cursor: pointer;
        /* height: 20px; */
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

const User_Contact = ({ data }) => {
    // const { Id, userId } = data;
    const transferId = 233
    const myUserId = useParams();

    const [singleState, setSingleState] = useState('contact');

    return (
        <>
            <Container>
                <div className="container-fluid">
                    <div className="row">
                        <div className="row pb-3">
                            <div className="bg-white rounded-2 p-2 ">
                                <div className="row border-bottom border-2 ">
                                    <div className="col-xxl-12 col-xl-12 col-sm-12 col-12">

                                        <div className="row pb-2 gap-sm-0 gap-3 ">
                                            <div className="col-md-2 col-sm-6 col-12 text-center ">
                                                <span className={`font16 fontSizeResponsive px-0 fontWeight500 ps-3 pb-2 pe-3 heading-16  ${singleState === 'contact' ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setSingleState('contact') }}>Contract</span>
                                            </div>
                                            <div className="col-md-2 col-sm-12 col-12 text-center px-0">
                                                <span className={`font16 fontSizeResponsive px-0 fontWeight500  ps-3 pb-2 pe-3 heading-16 ${singleState === 'allowance' ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setSingleState('allowance') }}>Allowances</span>
                                            </div>
                                            <div className="col-md-2 col-sm-12 col-12 text-center">
                                                <span className={`font16 fontSizeResponsive px-0 fontWeight500  ps-3 pb-2 pe-3 heading-16  ${singleState === 'commission' ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setSingleState('commission') }}>Deduction</span>
                                            </div>
                                       
                                        </div>


                                    </div>
                                </div>
                                <div className="row">
                                    {
                                        singleState === 'contact' && (<Conta_contac data={{ transferId, myUserId }} />)
                                    }
                                    {
                                        singleState === 'allowance' && (<Conta_allown data={{ transferId, myUserId }} />)
                                    }
                                    {
                                        singleState === 'commission' && (<Contac_commis data={{ transferId, myUserId }} />)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default User_Contact
