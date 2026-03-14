import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DataLoader from 'src/Layouts/Loader';
import { getNoticeDataByIdApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { Icon } from '@iconify/react';

const Container = styled.div`

    .backBtn{
        border: 1px solid var(--viewBtn) !important;
        color: var(--breadCrumTextColor) !important;
    }

`;


const ViewParticularNotice = ({ dataId, viewAllState }) => {


    const token = sessionStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [noticeTitleById, setNoticeTitleById] = useState('');
    const [noticeDateById, setNoticeDateById] = useState('');
    const [noticeTimeById, setNoticeTimeById] = useState('');
    const [noticeDescriptionById, setNoticeDescriptionById] = useState('');

    useEffect(() => {
        getNoticeDataById();
    }, [token])


    const getNoticeDataById = async () => {
        try {
            setloaderState(true);
            var response = await getNoticeDataByIdApi(dataId);
            // // console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setNoticeTitleById(response?.data?.notice?.noticeTitle)
                    setNoticeDateById(response?.data?.notice?.noticeDate)
                    setNoticeTimeById(response?.data?.notice?.noticeTime)
                    setNoticeDescriptionById(response?.data?.notice?.description)
                    // toast.success(response?.data?.message);
                    setloaderState(false);
                }
                else {
                    // // console.log('error')
                    toast.error(response?.data?.message);
                }
            }
            else {
                // // console.log('error')
                toast.error(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            setloaderState(false);
            // // console.log(error)
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

    const handlePage = (id) => {
        viewAllState(true)
    }

    return (
        <Container className="container-fluid">
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="row overflow-scroll">
                <div className="d-flex">
                    <div className="flex-grow-1">
                        <p className='font20'>{noticeTitleById}</p>
                        <p className='font12 greyText'>{noticeDateById} {noticeTimeById}</p>
                    </div>
                    
                </div>
                
            </div>
            <hr />
            <div className="row">
                <p className='font14'>{noticeDescriptionById}</p>
              
            </div>
            <div className="row mt-2">
                <div className="col-6"></div>
                <div className="col-6 flex justify-content-end float-end text-end"> 
                      <button className='btn  p-2' type='button'>
                        <div className="d-flex" onClick={handlePage} style={{border:'1px solid #aaa',padding:'5px 20px',borderRadius:'5px'}}>
                            <Icon className='align-self-center' icon="weui:back-filled" width="1.3em" height="1.3em" style={{ color: '#134563' }} />
                            <span className='font14 align-self-center'>Back</span>
                        </div>
                    </button>
                </div>
            </div>
            <Toaster />
        </Container>
    )
}

export default ViewParticularNotice
