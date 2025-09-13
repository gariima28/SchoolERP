import React, { useEffect, useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MyUseContext } from '../ContextApi/UseContext';
import { useForm, Controller } from 'react-hook-form';
import * as bootstrap from 'bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { StaffGetById, StaffPostApi, StaffPutApi } from '../../../Utils/Apis';

// Styled components (unchanged)
const Container = styled.div`
  .modal-image {
    width: 100%;
    max-width: 200px;
    height: auto;
    border-radius: 50%;
    border: 2px solid #008479;
  }

  .saveIconButtons {
    width: fit-content;
    background-color: #008479;
    color: #fff;
    border-radius: 8px;
    padding: 8px 16px;
  }
  .cancelIconButtons {
    width: fit-content;
    background-color: #fff;
    border: 1px solid #c9c9c9;
    border-radius: 8px;
    padding: 8px 16px;
  }
  .modal-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .main-body {
    background-color: #f2f3f6;
  }
  .main-content-container {
    background-color: #fff;
    margin: 15px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  .container-div-content {
    padding: 24px;
    background-color: #fff;
    border-radius: 10px;
  }
  .profile-card {
    background: linear-gradient(135deg, #e5f3f2 0%, #f8fafc 100%);
    border-radius: 12px;
    padding: 24px;
    min-height: 450px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  .profile-card:hover {
    transform: translateY(-4px);
  }
  .mainContainer img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 4px solid #ffffff;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .mainContainer img:hover {
    transform: scale(1.05);
  }
  .mainContainer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    margin: 0 auto;
  }
  .camera-icon-container {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: #ffffff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 2px solid #f5f5f5;
  }
  .camera-icon-container:hover {
    transform: scale(1.15);
    box-shadow: 0 4px 12px rgba(0, 118, 110, 0.25);
    background: #f8f8f8;
  }
  .camera-icon {
    width: 20px;
    height: 20px;
    color: #008479;
    transition: transform 0.3s ease;
  }
  .camera-icon-container:hover .camera-icon {
    transform: scale(1.1);
    color: #006b63;
  }
  .file-input {
    display: none;
  }
  .profile-info {
    margin-top: 16px;
    text-align: center;
  }
  .profile-info h2 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  .profile-info p {
    font-size: 16px;
    color: #666;
  }
  .profile-info .role {
    font-size: 18px;
    font-weight: 600;
    color: #008479;
  }
  .nav-tabs-container {
    margin-top: 24px;
    border-top: 1px solid #d7e7e5;
    padding-top: 16px;
  }
  .nav-link {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    padding: 12px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
  }
  .nav-link:hover {
    background-color: #f8f8f8;
    color: #008479;
  }
  .nav-link.active {
    background-color: #008479;
    color: #fff;
    border-radius: 8px;
    font-weight: 600;
  }
  .my-nav-link {
    color: #666 !important;
    background-color: #edf5f6 !important;
    opacity: 0.6;
    pointer-events: fill !important;
    position: relative;
  }
  .my-nav-link:hover::after {
    content: 'Please complete Basic Information first';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #1d1d1d;
    color: #fff;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10;
    opacity: 1;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }
  .modal-content {
    border-radius: 16px;
    background: #f8fafc;
  }
  .modal-title {
    font-size: 14px;
    font-weight: 600;
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .error-message {
    color: #dc3545;
    font-size: 12px;
    text-align: center;
  }
  video {
    width: 100%;
    max-width: 200px;
    border-radius: 50%;
    border: 2px solid #008479;
  }
  @media only screen and (max-width: 1260px) {
    .mainContainer img {
      width: 120px;
      height: 120px;
    }
    .mainContainer {
      width: 120px;
      height: 120px;
    }
  }
  @media only screen and (max-width: 991px) {
    .profile-info h2 {
      font-size: 16px;
    }
    .profile-info p {
      font-size: 14px;
    }
    .profile-info .role {
      font-size: 16px;
    }
    .profile-card {
      min-height: 400px;
    }
    .nav-link {
      padding: 10px 12px;
    }
    .my-nav-link:hover::after {
      font-size: 10px;
      padding: 4px 8px;
      top: -25px;
    }
  }
`;

const UserSidebar = () => {
  const { roleIdUser } = useParams();
  const navigate = useNavigate();
  const { myId, setUserId } = useContext(MyUseContext);

  const myUserID = myId ?? roleIdUser ?? "";
  const isAddForm = !myId && !roleIdUser;

  const [image, setImage] = useState(null);
  const [updateStatus, setUpdateStatus] = useState();
  const [staffImage, setStaffImage] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const [userMyRole, setUserMyRole] = useState('');
  const [transferData, setTransferData] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    mode: 'onChange',
    defaultValues: {
      image: null,
    },
  });

  // Initialize Bootstrap modal
  useEffect(() => {
    if (!isAddForm) {
      GetProfileImageById();
    } else {
      setStaffImage('/SampleProfile.png');
    }
  }, [myUserID, isAddForm]);

  useEffect(() => {
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modalElement.addEventListener('hidden.bs.modal', () => {
        setIsCameraOpen(false);
        stopCamera();
        setModalImage(null);
        setValue('image', null);
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
      });
      return () => {
        modalElement.removeEventListener('hidden.bs.modal', () => { });
        modal.dispose();
      };
    }
  }, [setValue]);

  // Handle file upload
  const handleImageUpload = (e, onChange) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setModalImage(event.target.result);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image click to open modal
  const handleImageClick = () => {
    setPreviousImage(staffImage || '/SampleProfile.png');
    setModalImage(null);
    setValue('image', null);
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
      modal.show();
    }
  };

  const GetProfileImageById = async () => {
    try {
      const response = await StaffGetById(myUserID);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setUpdateStatus(response?.data?.status);
        setStaffImage(response?.data?.user?.staffImage || '/SampleProfile.png');
      } else {
        if (roleIdUser) {

        } else {
          toast.error(response?.data?.message);
        }

        setStaffImage('/SampleProfile.png');
      }
    } catch (error) {
      // toast.error('Failed to fetch user data');
      setStaffImage('/SampleProfile.png');
    }
  };

  const UpdateProfileImage = async (data) => {
    if (!data.image) {
      toast.error('Please select an image');
      return;
    }
    setLoaderState(true);
    const formData = new FormData();
    formData.append('staffImage', data.image);
    try {
      const response = await StaffPutApi(myUserID, formData);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success('Image updated successfully');
        setStaffImage(response?.data?.user?.staffImage || URL.createObjectURL(data.image));
        const modalElement = document.getElementById('imageModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        }
      } else {
        toast.error(response?.data?.message || 'Failed to update profile image');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update profile image');
    } finally {
      setLoaderState(false);
    }
  };

  const AddProfileImage = async (data) => {
    if (!data.image) {
      toast.error('Please select an image');
      return;
    }
    setLoaderState(true);
    const formData = new FormData();
    formData.append('staffImage', data.image);
    try {
      const response = await StaffPostApi(formData);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success('Image updated successfully');
        setStaffImage(response?.data?.user?.staffImage || URL.createObjectURL(data.image));
        setUserId(response?.data?.otherstaff?.id);
        const modalElement = document.getElementById('imageModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal.hide();
        }
        navigate(`/admin/users/mainuserform/${response?.data?.otherstaff?.id}/usercontact`);
      } else {
        toast.error(response?.data?.message || 'Failed to add profile image');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add profile image');
    } finally {
      setLoaderState(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const isTabsDisabled = !myId && !roleIdUser;

  // Function to generate dynamic NavLink paths
  const getNavLinkPath = (section) => {
    return isAddForm
      ? `/admin/users/mainuserform/${roleIdUser}/${section}`
      : `/admin/users/mainuserform/${myUserID}/${section}`;
  };

  // Custom isActive matcher for NavLinks
  const isNavLinkActive = (match, location, section) => {
    if (!match) return false;
    const basePathWithId = `/admin/users/mainuserform/${myUserID}/${section}`;
    const basePathWithoutId = `/admin/users/mainuserform/${roleIdUser}/${section}`;
    return (
      location.pathname === basePathWithId ||
      location.pathname === basePathWithoutId
    );
  };

  return (
    <Container>
      <div className="profile-card">
        <div className="mainContainer">
          <img
            src={staffImage || '/SampleProfile.png'}
            alt="Profile"
            onClick={handleImageClick}
            aria-label="Click to expand and edit profile image"
          />
          <label className="camera-icon-container">
            <svg
              className="camera-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              onClick={handleImageClick}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              <circle cx="12" cy="10" r="1" fill="currentColor" />
            </svg>
          </label>
        </div>
        <div className="profile-info">
          <p className="role heading-18 font-rsponsive">
            {transferData?.userRole || userMyRole || 'Role'}
          </p>
        </div>
        <div className="nav-tabs-container">
          <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <NavLink
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${isActive ? 'active' : ''}`
              }
              to={getNavLinkPath('userbasicinformation')}
              isActive={(match, location) => isNavLinkActive(match, location, 'userbasicinformation')}
              end
            >
              <span className="flex-grow-1 heading-16">Basic Information</span>
              <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${isTabsDisabled ? 'my-nav-link' : ''} ${isActive && !isTabsDisabled ? 'active' : ''}`
              }
              to={isTabsDisabled ? '#' : getNavLinkPath('usercontact')}
              isActive={(match, location) => isNavLinkActive(match, location, 'usercontact')}
              end
            >
              <span className="flex-grow-1 heading-16">Contact</span>
              <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${isTabsDisabled ? 'my-nav-link' : ''} ${isActive && !isTabsDisabled ? 'active' : ''}`
              }
              to={isTabsDisabled ? '#' : getNavLinkPath('userperinfo')}
              isActive={(match, location) => isNavLinkActive(match, location, 'userperinfo')}
              end
            >
              <span className="flex-grow-1 heading-16">Personal Information</span>
              <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${isTabsDisabled ? 'my-nav-link' : ''} ${isActive && !isTabsDisabled ? 'active' : ''}`
              }
              to={isTabsDisabled ? '#' : getNavLinkPath('userdocuments')}
              isActive={(match, location) => isNavLinkActive(match, location, 'userdocuments')}
              end
            >
              <span className="flex-grow-1 heading-16">Documents</span>
              <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font14" id="imageModalLabel">Edit Profile Image</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex justify-content-center">
              <form className="d-flex justify-content-center flex-column" onSubmit={handleSubmit(isAddForm ? AddProfileImage : UpdateProfileImage)}>
                {isCameraOpen ? (
                  <video ref={videoRef} autoPlay className="modal-image" />
                ) : (
                  <img
                    src={modalImage || previousImage || '/SampleProfile.png'}
                    alt="Profile Preview"
                    className="modal-image align-self-center"
                  />
                )}
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <div className="modal-buttons d-flex gap-2 mt-3">
                  <Controller
                    name="image"
                    control={control}
                    rules={{ required: 'Please select or capture an image' }}
                    render={({ field: { onChange } }) => (
                      <label className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2 mb-0">
                        <Icon icon="mdi:desktop-mac" width="18" height="18" />
                        <span>Upload from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => handleImageUpload(e, onChange)}
                        />
                      </label>
                    )}
                  />
                  {isCameraOpen && (
                    <Controller
                      name="image"
                      control={control}
                      rules={{ required: 'Please select or capture an image' }}
                      render={({ field: { onChange } }) => (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2"
                          onClick={() => captureImage(onChange)}
                          aria-label="Capture Image"
                        >
                          <Icon icon="mdi:camera" width="18" height="18" />
                          <span>Capture</span>
                        </button>
                      )}
                    />
                  )}
                </div>
                {errors.image && <div className="error-message">{errors.image.message}</div>}
                {modalImage && modalImage !== previousImage && (
                  <div className="modal-buttons mt-3">
                    <button
                      type="submit"
                      className="btn saveIconButtons"
                      disabled={loaderState}
                      aria-label="Save Image"
                    >
                      {loaderState ? (
                        <>
                          <span>Saving</span>
                          <span
                            className="loader"
                            style={{
                              border: '2px solid #fff',
                              borderTop: '2px solid #008479',
                              borderRadius: '50%',
                              width: '16px',
                              height: '16px',
                              animation: 'spin 1s linear infinite',
                              display: 'inline-block',
                              marginLeft: '8px',
                            }}
                          ></span>
                        </>
                      ) : (
                        '✓'
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn cancelIconButtons"
                      data-bs-dismiss="modal"
                      onClick={() => setModalImage(null)}
                      aria-label="Cancel"
                    >
                      ✗
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </Container>
  );
};

export default UserSidebar;
