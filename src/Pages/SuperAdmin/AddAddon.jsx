import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { addNewSpecialFeatureApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const Container = styled.div`
  height: 92vh;
  
.table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
}
  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }

  .headingbg{
    background-color: var(--headingBackgroundColor);
    border-radius: 5px;
  }

  .card{
    border: none;
  }

  .form-control, .form-control::placeholder, .form-select{
    font-size: var(--font-size-14) !important;
    color: var(--greyInputTextColor);
    
  }

  .form-control, .form-select{
    background-color: #fff !important;
    box-shadow: none !important;
    border-color: var(--greyInputborderColor);
  }

  .form-control:focus, .form-select:focus{
    box-shadow: none !important;
    border-color: var(--greyInputborderColor);
  }

  .formcontrolFile{
    color: Black;
  }

`;

const AddSpecialFeature = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await addNewSpecialFeatureApi(data);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success(response?.data?.message);
        setTimeout(() => navigate('/superadmin/addon/allAddons'), 1000);
      } else {
        toast.error(response?.data?.message || 'Something went wrong');
      }
    } catch (error) {
      setloaderState(false);
      toast.error('Invalid request');
    }
  };

  return (
    <>
      <Container>

        <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
          <div className="row pt-3 pb-3">
            <nav className='breadcrumnav' aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/superadmin/addon/allAddons" className='greyText text-decoration-none'><h2>Addon &gt; </h2></Link>
                </li>
                <li className="breadcrumb-item active greenText" aria-current="page">
                  <h2> Add Addon</h2>
                </li>
              </ol>
            </nav>
            <h2>Add Addon</h2>
          </div>
          <div className='cardradius bg-white p-3'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-4 col-sm-12">
                  <label htmlFor="FeatureName" className="form-label greyText">Feature Name</label>
                  <input
                    type="text"
                    placeholder='Enter Feature Name'
                    className={`form-control ${errors.featureName ? 'border-danger' : ''}`}
                    {...register('featureName', {
                      required: 'Feature Name is required',
                      minLength: { value: 3, message: 'Minimum length is 3' },
                      validate: value => { if (!/^[A-Z]/.test(value)) { return 'Feature Name must start with an uppercase letter'; } if (value.length < 3) { return 'Minimum Length is 3'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Feature Name'; } return true; }
                    })}
                  />
                  <span className='text-danger'>{errors.featureName?.message}</span>
                </div>
                <div className="col-md-4 col-sm-12">
                  <label htmlFor="Status" className="form-label greyText">Status</label>
                  <select
                    className={`form-select ${errors.status ? 'border-danger' : ''}`}
                    {...register('status', { required: 'Status is required' })}
                  >
                    <option value=''>-- Select --</option>
                    <option value='true'>Active</option>
                    <option value='false'>Inactive</option>
                  </select>
                  <span className='text-danger'>{errors.status?.message}</span>
                </div>
                <div className="col-md-4 col-sm-12">
                  <label htmlFor="IdentityName" className="form-label greyText">Identity Name</label>
                  <input
                    type="text"
                    placeholder='Enter Identity Name'
                    className={`form-control ${errors.featureIdentity ? 'border-danger' : ''}`}
                    {...register('featureIdentity', {
                      required: 'Identity Name is required',
                      pattern: { value: /^[A-Za-z0-9\s]+$/, message: 'Invalid characters' }
                    })}
                  />
                  <span className='text-danger'>{errors.featureIdentity?.message}</span>
                </div>
              </div>
              <p className='text-center p-3'>
                <button className='btn addButtons2 text-white' type='submit'>Add Addon</button>
                <button className='btn cancelButtons ms-3' type='button' onClick={() => navigate('/superadmin/addon/allAddons')}>Cancel</button>
              </p>
            </form>
          </div>
          <Toaster />
        </div>
      </Container>
    </>
  );
};

export default AddSpecialFeature;
