import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { PostApi } from '../../../Utils/Apis'
import { SpeFeaGetAllApi } from '../../../Utils/Apis'
import HashLoader from 'src/Pages/HashLoaderCom';
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
.main-content-conatainer{
    background-color: #fff;
    margin: 10px;
    /* height: 40vh; */
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
  color: #bbbec1 ;
}
.label-color::placeholder{
  color: #bbbec1 ;
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
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #B50000;
    border-radius: 0%;
  }
  .my-placeholder::placeholder{
    color: #c9c8c8;
  }
  .my-anchor-tag a{
    text-decoration: none;
    color: var(  --AnchorTage) !important;

  }
  .my-anchor-tag{
    margin-top: -12px;
  }
  .my-form-check-input:checked {
    background-color: #008479;
    border-color: #008479;
}
.my-remove-button{
  display: flex;
  justify-content: end;
  border: 1px solid red;
}
.my-anchor a{
  text-decoration: none;
  color: var(  --addRemoveColor) !important;
}

.add-role{
  background-color: #008479;
  color: #fff !important;
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

@media only screen and (max-width: 605px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
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

const RolePermission = () => {

  // const [loader, setLoader] = useState(false)

  const navigate = useNavigate()

  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)

  const [hidedelete, setHidedelete] = useState(false)
  const [showdelete, setShowdelete] = useState(true)

  const [roletype, setRoletype] = useState('admin')
  const [read, setRead] = useState(false)
  const [write, setWrite] = useState(false)
  const [delete1, setDelete1] = useState(false)
  const [feature, setFeature] = useState()

  const [rolename, setRolename] = useState()
  const [isValidPasswordRequired, setIsValidPasswordRequired] = useState(false);
  const [loader, setLoader] = useState(false);
  // // console.log('stored data ',selectedFeatures)


  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [featureData, setFeatureData] = useState([]);
  const [formValues, setFormValues] = useState([{ name: "" }]);

  // Fetch features from API
  const SpeciFeaGetAllApi = async () => {
    setLoader(true);
    try {
      const response = await SpeFeaGetAllApi();
      // // console.log("my features from super admin panel", response);
      if (response?.status === 200) {
        setFeatureData(response?.data?.features || []);
      } else {
        console.error("Failed to fetch features.");
      }
    } catch (error) {
      setloaderState(false);
      console.error("Error fetching features:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    SpeciFeaGetAllApi();
  }, []);

  // Handle input change
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    // Update form values
    const updatedFormValues = [...formValues];
    updatedFormValues[index][name] = value;
    setFormValues(updatedFormValues);
    // Find the selected feature from the featureData
    const selectedFeature = featureData.find((item) => item.planFeatureId === parseInt(value));

    // Update selected features array
    const updatedFeatures = [...selectedFeatures];
    updatedFeatures[index] = selectedFeature || null;
    setSelectedFeatures(updatedFeatures);
  };

  // Add a new form field
  const addFormFields = () => {
    setFormValues([...formValues, { name: "" }]);
    setSelectedFeatures([...selectedFeatures, null]);
  };

  // Remove a form field
  const removeFormFields = (index) => {
    const updatedFormValues = [...formValues];
    updatedFormValues.splice(index, 1);
    setFormValues(updatedFormValues);

    const updatedFeatures = [...selectedFeatures];
    updatedFeatures.splice(index, 1);
    setSelectedFeatures(updatedFeatures);
  };

  useEffect(() => {
    SpeciFeaGetAllApi()
  }, [])

  const [errors, setErrors] = useState({});
  // ###### validation ##########

  const FuncValidation = () => {
    let isValid = true;
    if (!rolename || rolename === "" || !/^[a-zA-Z0-9!@#$%^&*()_+=\- ]+$/.test(rolename)) {
      setIsValidPasswordRequired(true)
      isValid = false
      setLoader(false)
    }
    else {
      setIsValidPasswordRequired(false)
    }
    return isValid;
  }

  const handleName = (e2) => {
    setRolename(e2);
    const nameRegex = /^[a-zA-Z0-9!@#$%^&*()_+=\- ]+$/;
    setIsValidPasswordRequired(nameRegex.test(e2));

    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidPasswordRequired(true)
    } else {
      setIsValidPasswordRequired(false)
    }
  }
  // ###### validation  end ##########

  // post Api 
  const SubcPutDataApi = async () => {
    const planFeature = selectedFeatures.map((item) => item?.planFeatureId);

    if (FuncValidation()) {
      const formData = {
        "roleType": roletype,
        "roleName": rolename,
        "read": read,
        "write": write,
        "delete": delete1,
        "addFeatureId": planFeature
      };
      setLoader(true)
      try {
        const response = await PostApi(formData);
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          navigate("/admin/hr/rolepermissiongetall")
          setLoader(false)
        } else {
          toast.error(response?.data?.message);
          setLoader(false)
        }
      } catch (error) {
        setloaderState(false);
        // console.log(error)
        setLoader(false)
      }
    }

  }

  const UpdateHandleBtn = (e) => {

    if (show === true && hide === false) {
      setShow(false)
      setHide(true)
    } else {
      setShow(true)
    }
  }

  const showNamedelete = () => {
    if (showdelete === true && hidedelete === false) {
      setShowdelete(false)
      setHidedelete(true)
    } else {
      setShowdelete(true)
    }
  }

  const ClearHandle = () => {
    setIsValidPasswordRequired(false)
    setRolename('')
  }

  return (
    <Container>
      {
        loader && (
          <HashLoader />
        )
      }
      <div className="container-fluid main-body p-3">

        <div className='d-flex justify-content-between for-dislay-direction'>

          <div className="breadCrum ms-2">
            <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
              <ol className="breadcrumb ms-2">
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Human Resource</li>
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">User Role</Link></li>
              </ol>
            </nav>
          </div>

        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-12px' }}>User Roles Details</h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}
          <div className="row p-3">
            <div className="col-lg-6 col-md-6 col-sm-12 ">

              <div>
                <label for="exampleFormControlInput1" className="form-label mb-1 label-text-color focus heading-14">Role Name</label>
                <input type="text" className="form-control label-color label-text-color form-control-sm" onChange={(e) => handleName(e.target.value)} id="exampleFormControlInput1" placeholder="Enter Name" />
              </div>
              <div className='pt-1'>
                {isValidPasswordRequired && (
                  <p className='ms-1' style={{ color: 'red', fontSize: '14px', float: 'left', marginTop: '-2px' }}>
                    Role Name is required
                  </p>
                )}
              </div>
              {/* -------  */}
              <div>
                {loader && <p>Loading features...</p>}
                {formValues.map((element, index) => (
                  <div className="form-inline" key={index}>
                    <div className="mb-3 pt-4">
                      <label
                        htmlFor={`select-${index}`}
                        className="form-label mb-1 label-text-color focus heading-14"
                      >
                        Special Feature <span className="label-color">(You can select multiple fields)</span>
                      </label>
                      <select
                        id={`select-${index}`}
                        className="form-select label-color form-select-sm"
                        aria-label="Default select example"
                        name="name"
                        value={element.name || ""}
                        onChange={(e) => handleChange(index, e)}
                      >
                        <option value="" disabled>
                          Select a feature
                        </option>
                        {featureData.map((item) => (
                          <option key={item.planFeatureId} value={item.planFeatureId}>
                            {item.featureName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {formValues.length > 1 && (
                  <div className="my-anchor mt-2">
                    <button
                      type="button"
                      className="button remove my-remove-button heading-14 btn cancelButtons text-black add-role"
                      style={{ backgroundColor: 'red' }}
                      onClick={() => removeFormFields(formValues.length - 1)}
                    >
                      - Remove
                    </button>
                  </div>
                )}

                <div className="button-section my-anchor mt-2">
                  <button
                    className="button add heading-14 btn cancelButtons text-black add-role"
                    // style={{borderColor: '1px solid #aaa'}}
                    type="button"
                    onClick={addFormFields}
                  >
                    + Add More
                  </button>
                </div>



              </div>
              {/* -------  */}

            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label mb-1 label-text-color heading-14">Role Type</label>
                <select className="form-select label-color  form-select-sm" value={roletype} onChange={(e) => setRoletype(e.target.value)} aria-label="Default select example">
                  <option value="admin">ADMIN</option>
                  <option value="user">USER</option>
                  <option value="staff">STAFF</option>
                </select>
              </div>
              <label for="exampleFormControlInput1" className="form-label mb-1 label-text-color focus heading-14">Permission <span className='label-color'>( You can select multiple fields )</span></label>
              <div className="row pt-2">
                <div className="col-sm-2">
                  <div className="form-check">
                    <input className="form-check-input my-form-check-input" onClick={(e) => setRead(!read)} type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label heading-14" for="flexCheckDefault">
                      Read
                    </label>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="form-check">
                    <input className="form-check-input my-form-check-input" type="checkbox" onClick={(e) => setWrite(!write)} value="" id="flexCheckDefault" />
                    <label className="form-check-label heading-14" for="flexCheckDefault">
                      Write
                    </label>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="form-check">
                    <input className="form-check-input my-form-check-input" type="checkbox" onClick={(e) => setDelete1(!delete1)} value="" id="flexCheckDefault" />
                    <label className="form-check-label heading-14" for="flexCheckDefault">
                      Delete
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3 buttons-topss">
              <div className='my-button11 heading-16'>
                <button type="button" className="btn btn-outline-success add-role" onClick={SubcPutDataApi}>Add Role & Permission</button>
                <button type="button" className="btn cancelButtons text-black" onClick={ClearHandle}>Cancel</button>
                {/* <Toaster />  */}
              </div>
            </div>
          </div>

        </div>
        {/* ################## Off Canvas Area ####################  */}

        {/* ##### offcanvas edit start ########  */}
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          {/* ########## content area #################  */}
          {
            show && (
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Role</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />

                <div className="mb-1  ">
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label heading-16  label-color">Subject</label>
                    <input type="email" className="form-control input-bg my-placeholder label-color form-control-md  heading-16" id="exampleFormControlInput1" placeholder="Enter Subject Name" />
                  </div>
                </div>
                <div className='my-button11 '>
                  <button type="button" className="btn btn-outline-success heading-16 " onClick={(e) => { UpdateHandleBtn() }}>Add Role</button>
                  <button type="button" className="btn cancelButtons text-black heading-16 ">Cancel</button>
                </div>

              </div>
            )
          }
          {/* ################# After click ###############  */}
          {
            hide && (
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Successfully Message</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="delete-section  mt-5">
                  <div className="bg-container">
                    <div className="img-container">
                      <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/XMLID_1_.png" alt="" />
                    </div>
                    <div className="content mt-5">
                      <p >Successful Added</p>
                      <hr style={{ width: '' }} />
                      <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your Changes has been <br /> Successfully Saved</p>
                    </div>
                    <div className='button-position'>
                      <button type="button" data-bs-dismiss="offcanvas" className="btn btn-outline-primary button11 mt-4 mb" style={{ fontSize: '14px' }}>Continue</button>
                    </div>

                  </div>
                </div>
              </div>
            )
          }
        </div>
        {/* ##### offcanvase edit  end ########  */}

        {/* ############## Offcanvas view profile ######### */}
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight33" aria-labelledby="offcanvasRightLabel">
          <div className="container-fluid">
            <div className="offcanvas-header p-0 pt-3">
              <Link data-bs-dismiss="offcanvas" className='ps-3' ><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Vector (13).svg" alt="" /></Link>

              <h5 className="offcanvas-title heading-16 pe-3" id="offcanvasRightLabel">View Profile</h5>
            </div>
            <hr />
            <div className="offcanvas-body">
              <div className="main-container">
                <div className="image-container">
                  <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Ellipse 26 (3).png" alt="" />
                </div>
                <div className="delete-content mt-2">
                  <p>John Doe</p>
                  <p className='heading-14'>admin@example.com</p>
                </div>
              </div>

              <div className='view-details-background-color p-3 mt-4'>

                <div className="between-content mt- ">
                  <div className='d-flex justify-content-between  '>
                    <div >
                      <p className='heading-14 label-color'>Address:</p>
                    </div>
                    <div >
                      <p className='heading-14 '>4290 Gregory Lane <br />Louisville, KY 40202</p>
                    </div>
                  </div>

                </div>

                <hr className='mt-4' />
                <div className='d-flex   justify-content-between mt-2'>
                  <div >
                    <p className='heading-14 label-color'>Phone No:</p>
                  </div>
                  <div >
                    <p className='heading-14 pe-4'>+91 0123456789</p>
                  </div>
                </div>
                <hr className='mt-4' />

                <div className='d-flex  justify-content-between '>
                  <div >
                    <p className='heading-14 label-color'>Gender</p>
                  </div>
                  <div >
                    <p className='heading-14 ' style={{ paddingRight: '90px' }}>Male</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* ############## Offcanvas view profile ######### */}

        {/* ################ offcanvas delete start #############  */}
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight22" aria-labelledby="offcanvasRightLabel">

          {
            showdelete && (
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Delete Section</h5>
                </div>
                <hr className='' />

                <div className="offcanvas-body">

                  <div className="sure-main-container mt-4">
                    <div className="sure-container">
                      <div>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.5312 0.46875C13.2656 0.46875 0 13.7344 0 30C0 46.2656 13.2656 59.5312 29.5312 59.5312C45.7969 59.5312 59.0625 46.2656 59.0625 30C59.0625 13.7344 45.7969 0.46875 29.5312 0.46875ZM29.5312 55.7812C15.3281 55.7812 3.75 44.2031 3.75 30C3.75 15.7969 15.3281 4.21875 29.5312 4.21875C43.7344 4.21875 55.3125 15.7969 55.3125 30C55.3125 44.2031 43.7344 55.7812 29.5312 55.7812Z" fill="#B50000" />
                          <path d="M31.4062 25.5469H27.6562V44.2969H31.4062V25.5469Z" fill="#B50000" />
                          <path d="M31.4062 16.6406H27.6562V20.3906H31.4062V16.6406Z" fill="#B50000" />
                        </svg>
                      </div>

                      <div className="sure-content mt-2">
                        <h5 className='heading-20'>Are you sure?</h5>
                        <p>This Action will be permanently <br /> delete the Profile Data</p>
                      </div>
                      <div className="form-check mt-1">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label agree" for="flexCheckDefault">
                          I Agree to delete the Profile Data
                        </label>
                      </div>

                      <div className="mt-4">
                        <button type="button" className="btn btn-outline-primary button00" onClick={(e) => showNamedelete()}>Delete</button>
                        <button type="button" className="btn btn-outline-primary button00 ms-2">Cancel</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            )
          }
          {/* ############## After click ##############  */}

          {
            hidedelete && (
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                </div>
                <hr className='' />
                <div className="delete-section mt-5">
                  <div className="bg-container">
                    <div className="img-container22">
                      <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/XMLID_1_.png" alt="" />
                    </div>
                    <div className="content mt-5">
                      <p >Successful Delete</p>
                      <hr style={{ width: '' }} />
                      <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your profile has been <br /> Successfully Delete</p>
                    </div>
                    <div className='button-position'>
                      <button type="button" className="btn btn-outline-primary button11 mt-4 mb" data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }}>Continue</button>

                    </div>

                  </div>
                </div>
              </div>

            )
          }
        </div>
        {/* ################ offcanvas delete end #############  */}

      </div>
    </Container>
  )
}

export default RolePermission



// {formValues.length > 1 && (
//   <div className="my-anchor mt-2">
//     <button
//       type="button"
//       className="button remove my-remove-button heading-14"
//       onClick={() => removeFormFields(formValues.length - 1)}
//     >
//       - Remove
//     </button>
//   </div>
// )}

// <div className="button-section my-anchor mt-2">
//   <button
//     className="button add heading-14"
//     style={{borderColor: '1px solid #aaa'}}
//     type="button"
//     onClick={addFormFields}
//   >
//     + Add More 
//   </button>
// </div>
