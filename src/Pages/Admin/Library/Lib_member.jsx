import React, { useState, useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react/dist/iconify.js';
import styled from 'styled-components';
import HashLoader from 'src/Pages/HashLoaderCom';

import { Link } from 'react-router-dom';
import { GetAllMemberApi } from '../../../Utils/Apis'
import { RemoveLibraryMemberApi } from '../../../Utils/Apis'

const Container = styled.div`
  .breadcrum-li a{
  text-decoration: none;
  margin-top: 5px;
  color: #008479;
  }
  .main-body{
    background-color: #F2F3F6; 
  }
.main-content-conatainer{
    background-color: #fff;
    margin: 10px;
    /* height: 100vh; */
    border-radius: 5px;

}
.margin-minus22{
    margin-top: -18px;
    font-size: 16px;
}
th, td{
  padding: 10px;
}
.my-td-style-yellow span{
  background-color: #FFEED3;
    color: #FF914C;
    padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-td-style-green span{
  background-color:#E6FFE2;
  color: #00A67E;
  padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-button-drop{
  line-height: 13px !important;
  border: 1px solid var(--tableActionButtonBgColor)  !important;

}
.pagination-a{
  background-color: #f2f0f0;
  color: #000;
  padding: 0.00175rem 0.25rem;
  margin-left: 0px !important;
}
.form-focus:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: var(--greyInputborderColor) !important;
    outline: none !important;
    box-shadow: none !important;
}
.page-link-1122 {
    /* padding: 0.00175rem 0.05rem; */
    padding: 0rem 0rem;
}
.pagination-a a{
  gap: 2px;
}
.my-pagina li a:hover{
  background-color: #008479;
  color: #fff;
  border: none;
}
.input-bg{
  background-color: #F2F3F6;
}
.label-color::placeholder{
  color: #bbbec1;
}
.cont-drop-btn button:hover{
  background-color: transparent;
  color: #000;
  cursor: pointer;
  border: none;
}
.my-button11{
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-top: 30px;
}
.my-button11 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}

.my-button22{
    display: flex;
    gap: 4px;
    margin-top: 4px;
}

.my-button22 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}
.my-button22 button:hover{
    background-color: #008479;
    color: #fff;
}
.my-grey{
  color: #ADADBD;
}

.my-div-class p{
  border: 1px solid #ADADBD;
  padding: 10px;
  border-radius: 4px;
  background-color: #F2F3F6;
  color: #ADADBD;
  border: 1px solid #F2F3F6;
}
.my-div-class span a{
    text-decoration: none;
}
.anchor-color a{
  color: #8F8F8F;
}
.my-own-button{
  height: 33px;
  background-color: var(  --greenTextColor);
  line-height: 18px;
}
.my-own-outline-btn{
  height: 33px;
  width: 140px;
  line-height: 0px;
  color: #000;
  border: 1px solid var( --buttonBorder);
  background-color: #fff;
}

.img-div img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #b9b8b8;

}
/* ############# offcanvas ############## */
.forInput {
    background : #F2F3F6;
    color:  #ADADBD;
    /* font-family: 'Noto Sans'; */
    font-size: 14px;
  }
  .forInput::placeholder{
    color: #ADADBD;
  }

  .forInputFont{
    font-size: 14px;
  }
    .forLabel {
    color:  #ADADBD;
    font-size: 15px;
  }
  .button11{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #008479;
    border-radius: 0%;
  }

  .img-container{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    top: -16%;
  }
  .img-container22{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    border: 2px solid #cdcdcd;
    top: -16%;
  }
  .img-container img{
    height: 30px;
    width: 36px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container22 img{
    height: 27px;
    width: 32px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container{

  }
  .bg-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #dee2e6;
    width: 65%;
    background-color: #F2F3F6;
  }
  .delete-section {
    /* height: 30%; */
    position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  }
  .button-position{
    position: absolute;
    top: 78%;
  }
  .main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
  .image-container{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #F1F5FA;
  }
  .image-container img{
    width: 100%;
    height: 100%;
  }
  .delete-content{
    font-size: 20px;
  }
  .delete-content span{
    background-color: #0AAD24;
    color: #fff;
    font-size: 15px;
    padding: 2px 6px 2px 6px;
    border-radius: 4px;
  }
  .likeButton{
    background-color: #008479;
    color: #fff;
    font-size: 17px;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
    display: inline;
  }

  .view-details-background-color{
    background-color: var(--backgroundColor);
    border-radius: 8px;
  }

  .symbol-container img{
    object-fit: cover;
  }
  .subject{
    font-size: 14px;
  }
  .sure-main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .sure-content h5{
    font-weight: 200;
  }
  .sure-content p{
    font-size: 14px;
    color: #ADADBD;
  }
  .agree{
    font-size: 14px;
    color: #ADADBD;
  }
  .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #B50000;
    border-radius: 0%;
  }
  .my-button112233{
        background-color: #008479 !important;
        color: #fff  !important;
        border-radius: 0;
    }
    .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    background-color: #B50000;
    color: #fff;
    border-radius: 0%;
  }
.cancel-btn{
    color: #959494;
   border-color: #cdcdcd;
  
    --bs-btn-hover-bg: #fff;
    border-radius: 0%;
  }

  .my-btn.disabled, .my-btn:disabled, fieldset:disabled .btn {
    color: #fff ;
    pointer-events: none;
    background-color: #B50000;
    border-color: #cdcdcd;
    opacity: var(--bs-btn-disabled-opacity);
}
.my-form-check-input:checked{
  background-color: #B50000;
  border-color: #B50000;
} 
.pagination {
    display: flex;
    list-style: none;
    padding: 0;
}

.pagination li {
    margin: 0 5px;
}

.pagination li a {
    box-shadow: none !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    font-size: var(--font-size-14);
    border-radius: 8px;
    border: 1px solid #ddd;
    text-decoration: none;
    color: #000;
    /* background-color: #f5f5f5;
    transition: background-color 0.3s; */
}
.pagination li a:hover {
    background-color: #317a77 !important;
    color: #fff !important;
}

.pagination li.active a {
    background-color: #317a77 !important;
    color: #fff;
    font-weight: bold;
}
.my-i-button{
  border: none;
  background: none;
}
.disabled {
  pointer-events: none;
  opacity: 0.5;
  cursor: not-allowed;
}
.no-wrap {
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* ############# offcanvas ############## */

/* ########## media query ###########  */
 @media only screen and (max-width: 735px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
@media only screen and (max-width: 605px) {
  .for-media-query-22{
    flex: 0 0 auto !important;
    width: 53% !important;
  }
  .my-own-button{
    margin-top: 5px;
    margin-bottom: 25px;
  }
  .search-responsive{
    margin-top: 10px;
  }
  .export1{
    margin-top: 8px !important;
  }
  .export2{
    margin-top: 12px !important;
  }
}


@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
@media only screen and (max-width: 1233px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
@media only screen and (max-width: 735px) {
    .heading-responsive{
        margin-top: 5px !important;
    }

}
`;

const Lib_member = ({ data }) => {

  let { classNo, sectionName } = data;

  // console.log('classNo in member', classNo)
  // console.log('sectionName in member ', sectionName)
  const [Member, setMember] = useState('LIBRARY_MEMBER')
  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loader, setLoader] = useState(false)
  const [pop, setPop] = useState(false)

  const [AllMember, setAllMember] = useState([]);
  const [removeID, setRemoveID] = useState();
  // console.log('student id for remove', removeID)

  useEffect(() => {
    MyGetAllMemberApi()
  }, [data])

  // all library member Api
  const MyGetAllMemberApi = async () => {
    setLoader(true)
    try {
      const response = await GetAllMemberApi(classNo, sectionName, Member);
      // console.log('get all member--------', response)
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setAllMember(response?.data?.Members)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.msg);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }

  }
  // Remove Library Member Api
  const RemoveMemberApi = async () => {
    setLoader(true)
    try {
      const response = await RemoveLibraryMemberApi(removeID);
      console.log('all student in member', response)
      if (response?.status === 200) {
        toast.success(response?.data?.message)
        setLoader(false)
        setPop(true)
        MyGetAllMemberApi()
        const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
        modal.hide();
      } else {
        toast.error(response?.data?.classes?.msg);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }

  }



  return (
    <Container>
      {
        loader && (
          <HashLoader />
        )
      }
      <div className="main-content-conatainer pt-1 ">
        {/* ###### copy content till here for all component ######  */}

        <div className="table-container  table-responsive">
          {AllMember.length > 0 ?
            <>
              <table className="table table-sm table-striped text-center ">
                <thead className=''>
                  <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                    <th className='no-wrap'>#</th>
                    <th className='no-wrap'>Name</th>
                    <th className='no-wrap'>Student ID</th>
                    <th className='no-wrap'>Library ID</th>
                    <th className='no-wrap'>Class</th>
                    <th className='no-wrap'>Section</th>
                    <th className='no-wrap'>Roll Number</th>
                    <th className='no-wrap'>Action</th>
                  </tr>
                </thead>  <tbody className='heading-14 align-middle greyTextColor'>
                  {
                    AllMember && AllMember?.length > 0 ? (
                      AllMember?.map((item, index) => (
                        <tr className='heading-14' >
                          <td className=' greyText pe-0 no-wrap'>{index + 1 + (currentPage - 1) * pageSize}</td>
                          <td className=' greyText pe-0 no-wrap'>{item.studentName}</td>
                          <td className=' greyText pe-0 no-wrap'>{item.studentId}</td>
                          <td className=' greyText pe-0 no-wrap'>{item.libraryId ? item.libraryId : 'N-I-R'}</td>
                          <td className=' greyText pe-0 no-wrap my-anchor-view'>{item.classNo}</td>
                          <td className=' greyText pe-0 no-wrap'>{item.classSection}</td>
                          <td className=' greyText pe-0 no-wrap'>{item.rollNumber ? item.rollNumber : 'N-I-R'}</td>
                          <td className=' greyText  pe-0 no-wrap' >
                            <div className="dropdown my-button-show" >
                              <button className="btn btn-secondary dropdown-togg my-button-drop heading-10" style={{ backgroundColor: '#b50000', color: '#fff', padding: '3px 10px 3px 10px', fontSize: '14px', border: 'none' }} type="button" aria-expanded="false" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setRemoveID(item.studentId)}>
                                Remove Member
                              </button>
                            </div>

                          </td>
                        </tr>
                      ))
                    )
                      :
                      (
                        <tr>
                          <td colSpan="12" className="text-center">
                            <div className="d-flex justify-content-center align-items-center m-5 ">
                              <div className="text-center">
                                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className='img-fluid p-5' />
                                <h2><b>No Data Found</b></h2>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                  }

                </tbody>
              </table>
              <div className="d-flex" style={{ marginBottom: '10px' }}>
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
            </>
            :
            <>
              <div className="d-flex justify-content-center m-5">
                <img src="/images/search.svg" alt="" />
              </div>
            </>
          }
        </div>
        {/* modal */}
        <div class="modal " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden={pop ? false : true}>
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-center p-3">
              <div className='' style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className=''>
                <div style={{
                  height: '70px',
                  width: '70px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  margin: '0 auto',
                  marginBottom: " 30px"
                }}>
                  <img
                    src="/images/Group%20(8).svg"
                    alt="Descriptive text"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />
                </div>
                <div>
                  <h4>Are you sure to want Remove this member</h4>
                </div>
                <div className='my-button11 '>
                  <button type="button" className="btn btn-outline-success my-button112233" onClick={RemoveMemberApi}>Submit</button>
                  <button type="button" className="btn " style={{ backgroundColor: '#fff', color: '#000' }} data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* modal */}

      </div>
    </Container>
  )
}

export default Lib_member

