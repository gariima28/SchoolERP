import React, { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateSchoolDataByIdAPI } from 'src/Utils/Apis';
import DataLoader from 'src/Layouts/Loader';


const Container = styled.div`
    height: 100vh;
    .btnsubmitOwn{
        background-color: #008479 !important;
    }

    .imagearea{
        background: linear-gradient(135deg, #D8E6FF, white);
    }

    .formarea{
        background:linear-gradient(#F0F8F7, white);
    }

    .formcontrolinput{
        border: 1px solid #E4E7EB;
        border-radius: 6px;
        font-size: 16px;
    }

    .formcontrolinput::placeholder{
        color: #ADADBD;
        font-size: 14px;
    }

    .text-grey{
        color: #8F8F8F;
    }

    .form-control{
        box-shadow: none !important;
    }


`;

const Span14Font = styled.span`
    font-size: 14px;
    font-family: Noto Sans;
`;



const AddSchoolIdPage = () => {

  const navigate = useNavigate('');
  const [loaderState, setloaderState] = useState('');
  const [prefix, setPrefix] = useState('');
  const [prefixError, setPrefixError] = useState('');

  const handlePrefixChange = (e) => {
    const prefixValue = e.target.value;
    setPrefix(prefixValue);
    setPrefixError(validateprefix(prefixValue));
  };

  // *********************************************************************************
  //                        Validation of all inputs
  // *********************************************************************************

  // const prefixRegex = /^(?=.*[A-Z])(?=.*[@./_])(?=.*[0-9])(?=^\S*$).{8,}$/;
  const prefixRegex = /^[A-Z]{3,}$/;

  const validateprefix = (value) => {
    if (!value.trim()) {
      return '* Prefix is required';
    } else if (!prefixRegex.test(value)) {
      return 'Only uppercase letters allowed and must be at least 3 characters long. E.g., XYZ !!';
    }
    return '';
  };

  const validateFields = () => {
    let isValid = true;

    if (!prefix) {
      setPrefixError('* This field is required');
      isValid = false;
    } else if (!prefixRegex.test(value)) {
      setPrefixError('Only uppercase letters allowed and must be at least 3 characters long. E.g., XYZ !!');
      isValid = false;
    } else {
      setPrefixError('');
    }

    return isValid;
  };


  // *********************************************************************************
  //                        Validation of all inputs
  // *********************************************************************************


  const setprefix = async () => {
    setloaderState(true)
    if (validateFields) {
      try {
        const formData = new FormData();
        formData.append('schoolPrefix', prefix)
        var response = await updateSchoolDataByIdAPI(formData);
        // console.log(response)
        if (response?.status === 200) {
          if (response.data.status === 'success') {
            setloaderState(false)
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('isNewLogin');
            navigate('/schoolPrefixSuccess')
          }
        } else {
          setloaderState(false)
          toast.error(response?.error);
        }
      } catch (error) {
        setloaderState(false);
        setloaderState(false)
        console.error('Error during adding prefix:', error);
      }
      finally {
        setloaderState(false);
      }
    }
  }

  return (
    <>
      <Container>
        {loaderState && (<DataLoader />)}
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-md-6 col-sm-12 p-5 imagearea d-flex align-item-center justify-content-center">
              <img src="/images/soft-skills/amico.svg" alt="" className='img-fluid m-5' />
            </div>
            <div className="col-md-6 col-sm-12 p-5 formarea  align-item-center">
              <div className="row me-xl-5 ms-xl-5 ps-xl-5 pe-xl-5 ps-lg-5 pe-lg-5 p-sm-5 m-sm-5 p-3">
                <p className='text-center mb-5'><img src="/images/edu2alllogo.svg" alt="" className='img-fluid' /></p>
                <Span14Font>
                  <p className='font18 mb-1'>School Prefix?</p>
                  <h2 className='text-grey font14 mb-3'>After adding prefix, we'll redirect you to login for accessing your Panel</h2>
                  <form>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label font14">Add Prefix</label>
                      <input type="text" className="form-control formcontrolinput font14" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter prefix' onChange={handlePrefixChange} />
                      <span className="text-danger pt-3">{prefixError}</span>
                    </div>
                    <div className="d-grid gap-2 col-12 mx-auto">
                      <button type="button" className="btn btnsubmitOwn text-white" onClick={setprefix}>Save prefix</button>
                    </div>
                  </form>
                </Span14Font>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default AddSchoolIdPage
