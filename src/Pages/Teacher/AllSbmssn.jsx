import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from 'src/Pages/HashLoaderCom';
import { Icon } from '@iconify/react/dist/iconify.js';
import ReactPaginate from 'react-paginate';
import { TeacherSubmissionGetByIdApi } from 'src/Utils/Apis'
import { TeacherSubmissionPutByIdApi } from 'src/Utils/Apis'



// ## style css area start ####  

const Container = styled.div`
  .breadcrum-li a{
  text-decoration: none;
  margin-top: 5px;
  color: #008479;
  }
  .main-body{
    background-color: #F2F3F6; 
  }
  .myTableResponsive{
    height: 160px;
  }
.main-content-conatainer{
    background-color: #fff;
    margin: 10px;
    /* height: 100vh; */
    border-radius: 15px;

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
.label-color{
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
.my-button11 button:hover{
    background-color: #008479;
    color: #fff;
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
.no-wrap {
  white-space: nowrap;
  text-overflow: ellipsis;
}
.edit{
    background: #008479;
    border: 1px solid #008479;
    color: #fff;
    padding: 2px 7px;
    border-radius: 3px;
}
.upload{
    background: #034F95;
      border: 1px solid #034F95;
    color: #fff;
    padding: 2px 7px;
    border-radius: 3px;
}
.marksSubmit{
    background: #FF914D;
    border: 1px solid #FF914D;
    color: #fff;
    padding: 2px 7px;
    border-radius: 3px;
}
/* ############# offcanvas ############## */

/* ########## media query ###########  */
 @media only screen and (max-width: 950px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
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

@media only screen and (max-width: 1220px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }
}
@media only screen and (max-width: 965px) {
    .heading-responsive{
        margin-top: 5px !important;
    }
}

@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
`;
// ## style css area end ####  


const AllSbmssn = ({ data }) => {

  const submissionGetAllData = data || [];
  console.log('submissionGetAllData----in all page', submissionGetAllData)

  const [loader, setLoader] = useState(false)
  const [forDelete, setForDelete] = useState(false)
  const [show, setShow] = useState(true)
  const [hide, setHide] = useState(false)
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [IdForDelete, setIdForDelete] = useState()
  const [IdForUpdate, setIdForUpdate] = useState()
  const [searchKey, setSearchKey] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [result, setResult] = useState();
  // console.log('result in submission----', result)
  const [file, setFile] = useState();
  const [description, setDescription] = useState();

  const [showadd, setShowadd] = useState(true)

  const [coverPage, setCoverPage] = useState()
  const [coverPage2, setCoverPage2] = useState()
  const [updateStatus, setUpdateStatus] = useState()
  const [updateStatus2, setUpdateStatus2] = useState()
  const [manageButton, setManageButton] = useState(false);
  const [manageButton2, setManageButton2] = useState(false);
  const [imageFile, setImageFile] = useState()
  const [imageFile2, setImageFile2] = useState()

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const buttManage = () => {
    setManageButton(!manageButton)
  }

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  const offcanvasRef = useRef()
  const offcanvasRef22 = useRef()
  const offcanvasRef33 = useRef()

  // Get all submission by id api
  const MySubmissionGetAllApi = async (id) => {
    setIdForUpdate(id)
    setLoader(true)
    try {
      const response = await TeacherSubmissionGetByIdApi(id);
      console.log('Submission get all api by idd++++++++++++', response);
      if (response?.status === 200) {

        setResult(response?.data?.submission?.resultMarks)
        setFile(response?.data?.submission?.assignmentPath)
        setDescription(response?.data?.submission?.description)
        setUpdateStatus(response?.data?.status)

        // toast.success(response?.data?.msg)
        setLoader(false)
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      setLoader(false)
      // console.log(error)
    }
  }
  //  Update Api submission
  const MyDepartmentPostApi = async () => {
    const formData = new FormData()
    formData.append('resultMarks', result);
    formData.append('description', description);
    formData.append('submissionPath', file);
    setLoader(true)
    try {
      const response = await TeacherSubmissionPutByIdApi(IdForUpdate, formData);
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setShow(false)
          MySubmissionGetAllApi()
          setLoader(false)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
          offcanvasInstance.hide();
          setTimeout(() => {
            setShow(true)
          }, 0.5)

        } else {
          toast.error(response?.data?.message);
          setShow(true)
          setLoader(false)
        }
      } else {
        toast.error(response?.data?.msg);
        setLoader(false)
      }
    } catch (error) {
      setloaderState(false);
      // console.log(error)
    }

  }

  return (
    <Container>
      {
        loader && (
          <HashLoader />
        )
      }

      <div>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}

          <div className={`table-container px-3 table-responsive `}  >
            <table className="table table-sm  table-striped ">
              <thead className=''>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className='no-wrap' style={{ width: '150px' }}>#</th>
                  <th className='no-wrap' style={{ width: '860px' }}>Name</th>
                  <th className='no-wrap' style={{ width: '860px' }}>Email</th>
                  <th className='no-wrap' style={{ width: '860px' }}>Submission File</th>
                  <th className='no-wrap' style={{ width: '860px' }}>Status</th>
                  <th className='no-wrap' style={{ width: '860px' }}>Result</th>
                  <th className='no-wrap' >Actions</th>
                </tr>
              </thead>

              <tbody className={`heading-14 align-middle greyTextColor `}>
                {
                  submissionGetAllData && submissionGetAllData.length > 0 ? (
                    submissionGetAllData?.map((item, index) => (
                      <tr className='heading-14' >
                        <td className=' greyText no-wrap'>{index + 1 + (currentPage - 1) * pageSize}</td>
                        <td className=' greyText no-wrap'>{item.assignmentTitle}</td>
                        <td className=' greyText no-wrap'>{item.studentEmail}</td>
                        <td className=' greyText no-wrap'>{item.submissionPath ? item.submissionPath : 'N-I-R'}</td>
                        <td className=' greyText no-wrap'>{item.status}</td>
                        <td className=' greyText no-wrap'>{`${item.resultMarks}/${item.totalMarks}`}</td>
                        <td className=' greyText  no-wrap' >
                          <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1234" aria-controls="offcanvasRight1234" >
                            <button className={`${item.status === 'PENDING' ? 'upload' : item.status === 'SUBMITTED' ? 'edit' : 'marksSubmit'}`} onClick={() => MySubmissionGetAllApi(item.id)}>
                              {item.status}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                    :
                    (
                      <tr>
                        <td colSpan="6" className="text-center">
                          <div className="d-flex justify-content-center align-items-center m-5 ">
                            <div className="text-center">
                              <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" />
                              <h2><b>No Data Found</b></h2>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                }
              </tbody>
              <Toaster />
            </table>
          </div>
          <div className="d-flex px-3" style={{ marginBottom: '10px' }}>
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

        {/* offcanvas  */}
        {
          showadd && (
            <>
              <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight1234" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Marks Submission Details</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="offcanvas-body pt-0">
                  <div className="mb-1  ">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label heading-16">Result</label>
                      <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" value={result} onChange={(e) => setResult(e.target.value)} placeholder="Enter Result" />
                    </div>
                    {/* <div>
                      {isValidNameRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Department name is required
                        </p>
                      )}
                    </div> */}
                  </div>

                  <div className='row pe-1 '>
                    <div className='col-lg-12 col-md-12 col-sm-12 pe-0'>
                      {
                        updateStatus === "success"
                          ?
                          <div class="mb-3 " style={{ display: 'flex', }}>
                            <div className='w-100'>
                              <label for="exampleFormControlInput1" className="form-label heading-14 label-color">Upload Image </label>
                              {
                                manageButton ?
                                  <input type="file" class="form-control" id="exampleFormControlInput1" onChange={handleFileChange} placeholder="select file" accept='.jpg, .png, .jpeg' />
                                  :
                                  <input type="text" class="form-control" id="exampleFormControlInput1" value={file} placeholder="name@example.com" />
                              }
                            </div>
                            <div style={{ margin: 'auto', paddingTop: '30px', paddingLeft: '5px' }}>
                              {
                                manageButton ? (
                                  <button type="button" class="btn btn-outline-success my-green heading-14 " style={{ backgroundColor: '#008479', color: '#fff' }} onClick={buttManage} >View </button>
                                )
                                  :
                                  (
                                    <button type="button" class="btn btn-outline-success my-green heading-14 " style={{ backgroundColor: '#008479', color: '#fff' }} onClick={buttManage}>Edit</button>
                                  )
                              }
                            </div>
                          </div>
                          :
                          <div className="mb-3  for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label heading-14 label-color">User Image <span style={{ color: 'red' }}>*</span></label>
                            <input type="file" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" onChange={handleFileChange} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Doe" />
                          </div>
                      }
                    </div>
                  </div>
                  <div className="mb-3" style={{ marginTop: '-6px' }}>
                    <label for="exampleFormControlInput1" className="form-label  heading-14">Description ( Optional )</label>
                    <textarea class="form-control px-4 heading-14 label-color" id="exampleFormControlTextarea1" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" placeholder='Enter Description'></textarea>
                  </div>
                  <div className='my-button11 '>
                    <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" style={{ backgroundColor: '#008479', color: '#fff' }} onClick={MyDepartmentPostApi}>Update</button>
                    <button type="button" className="btn btn-outline-success heading-16" data-bs-dismiss="offcanvas" aria-label="Close" >Cancel</button>
                  </div>
                </div>

              </div>
            </>


          )
        }
        {/* offcanvas  */}
      </div>
    </Container>
  )
}

export default AllSbmssn
