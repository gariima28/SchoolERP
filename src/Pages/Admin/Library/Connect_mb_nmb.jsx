import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Lib_member from './Lib_member';
import Lib_non_member from './Lib_non_member';


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
const Connect_mb_nmb = ({data}) => {
    
// console.log('section id by props', data)

    const { Id, userId } = '';
    const transferId = Id
    const myUserId = userId;
    const [singleState, setSingleState] = useState('member');

    return (
          <Container>
                <div className="container-fluid">
                    <div className="row">
                        <div className="row pb-3">
                            <div className="bg-white rounded-2 p-2 ">
                                <div className="row border-bottom border-2 ">
                                    <div className="col-xxl-12 col-xl-12 col-sm-12 col-12">
                                        <div className="row pb-2 gap-sm-0 gap-3 ">
                                            <div className="col-md-2 col-sm-6 col-12 text-center ">
                                                <span className={`font16 fontSizeResponsive px-0 fontWeight500 ps-3 pb-2 pe-3 heading-16  ${singleState === 'member' ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setSingleState('member') }}>Member</span>
                                            </div>
                                            <div className="col-md-2 col-sm-12 col-12 text-center px-0">
                                                <span className={`font16 fontSizeResponsive px-0 fontWeight500  ps-3 pb-2 pe-3 heading-16 ${singleState === 'non_member' ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setSingleState('non_member') }}>Non Member</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {
                                        singleState === 'member' && (<Lib_member data={data} />)
                                    }
                                    {
                                        singleState === 'non_member' && (<Lib_non_member data={data} />)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
    )
}

export default Connect_mb_nmb
