import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { addNewRouteApi } from 'src/Utils/Apis';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import DataLoader from 'src/Layouts/Loader';

const Container = styled.div`
  height: 92vh;

  .mainBreadCrum {
    --bs-breadcrumb-divider: '>' !important;
  }

  .bredcrumText {
    color: var(--breadCrumTextColor);
  }

  .bredcrumActiveText {
    color: var(--breadCrumActiveTextColor);
  }

  .form-control::placeholder, .form-control {
    color: var(--greyState);
  }

  .form-control {
    border-radius: 5px ;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .AddBtnn, .AddBtnn:visited, .AddBtnn:active {
    width: fit-content;
    border: 1px solid var(--breadCrumActiveTextColor);
    background-color: var(--breadCrumActiveTextColor);
  }

  .EyeViewBtnn, .EyeViewBtnn:active {
    width: fit-content;
    border: 1px solid var(--breadCrumActiveTextColor);
    background-color: var(--OrangeBtnColor);
  }

`;

const AddRoute = () => {

  const navigate = useNavigate();
  // loader State
  const [loaderState, setloaderState] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const AddNewRoute = async (data) => {
    try {
      const formData = new FormData();
      formData.append("routeName", data.routeName);
      var response = await addNewRouteApi(formData);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          toast.success(response?.data?.message);
          setTimeout(() => {
            navigate('/admin/transport/route');
          }, 1000);
        }
        else {
          toast.error(response?.data?.message, 'else 1');
          setloaderState(false)
        }
      }
      else {
        toast.error(response?.data?.message, 'else 2');
        setloaderState(false)
      }
    }
    catch (error) {
      toast.error(error);
      // console.log(error, 'catch error')
      setloaderState(false)
      if (error?.response?.data?.statusCode === 401) {
        sessionStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }
    }
  }

  const handleCancleButton = () => {
    navigate('/admin/transport/route')
  }

  return (
    <>
      <Container>
        {loaderState && (<DataLoader />)}
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-lg-7 col-md-8 col-sm-12 flex-grow-1">
              <div className="row ps-2">
                <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                  <ol className="breadcrumb mb-1">
                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                    <li className="breadcrumb-item"><a href="/driver" className='bredcrumText text-decoration-none'>Transport</a></li>
                    <li className="breadcrumb-item"><a href="/route" className='bredcrumText text-decoration-none'>Route</a></li>
                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Add Route</li>
                  </ol>
                </nav>
                <p className='font14 ps-0 fontWeight500'>Add Route</p>
              </div>
            </div>
          </div>
          <div className="row ps-2 pe-2 pt-3">
            <div className="bg-white cardradius p-3">
              <form className="row g-3" onSubmit={handleSubmit(AddNewRoute)}>
                <div className="col-md-6 col-sm-12 col-12">
                  <label htmlFor="routeName" className="form-label font14">Route  <span className='text-danger'>*</span></label>
                  <input id="routeName" type="text" className={`form-control font14 ${errors.routeName ? 'border-danger' : ''}`} placeholder="Enter Route Name" {...register('routeName', { required: 'Route Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Route Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Route Name'; } return true; } })} />
                  {errors.routeName && <p className="font12 text-danger">{errors.routeName.message}</p>}
                </div>
                <div className="row p-3">
                  <button className='col-lg-2 col-md-3 col-sm-4 col-6 btn addButtons font16 text-white' type='submit'>
                    Add Route
                  </button>
                  <button type="button" className='col-lg-2 col-md-3 col-sm-4 col-6 btn cancelButtons font14 ms-2' onClick={handleCancleButton} >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Toaster />
        </div>
      </Container>
    </>
  );
}

export default AddRoute;
