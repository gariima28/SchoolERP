import React, { useEffect, useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { NavLink, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MyUseContext } from '../ContextApi/UseContext';
import { useForm, Controller } from 'react-hook-form';
import * as bootstrap from 'bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { StaffGetById, StaffImageUpdate, RolePermissionGetApi } from '../../../Utils/Apis';

const Container = styled.div`
  .modal-image {
    width: 100%;
    max-width: 300px;
    height: 170px;
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
  .profile-card {
    background: linear-gradient(135deg, #e5f3f2 0%, #f8fafc 100%);
    border-radius: 12px;
    padding: 12px;
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
  .profile-info {
    margin-top: 16px;
    text-align: center;
  }
  .profile-info .role {
    font-size: 18px;
    font-weight: 600;
    color: #008479;
  }
  .nav-tabs-container {
    margin-top: 14px;
    border-top: 1px solid #d7e7e5;
    padding-top: 16px;
  }

  @media only screen and (max-width: 1260px) {
    .nav-tabs-container {
      margin-top: 0px !important;
      border-top: none !important;
      padding-top: 0px !important;
    }
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
    pointer-events: none !important;
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
  }
  .modal-content {
    border-radius: 16px;
    background: #f8fafc;
  }
  .error-message {
    color: #dc3545;
    font-size: 12px;
    text-align: center;
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
    .profile-info .role {
      font-size: 16px;
    }
    .profile-card {
      min-height: 400px;
    }
  }
`;

const UserSidebar = () => {
  const { roleName, roleId: roleIdFromParams, userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { myId, setProfileImageForBasicInfo } = useContext(MyUseContext);

  const myUserID = myId ?? userId ?? "";
  const isAddFlow = location.pathname.includes('/add/');
  const isUpdateFlow = location.pathname.includes('/update/');

  const isTabsDisabled = isAddFlow && !myUserID;

  const roleMapping = {
    '1': 'Teacher',
    '2': 'Accountant',
    '3': 'Librarian',
    '4': 'Other Staff',
    '5': 'Driver'
  };

  const [staffImage, setStaffImage] = useState('/SampleProfile.png');
  const [modalImage, setModalImage] = useState(null);
  const [previousImage, setPreviousImage] = useState(null);
  const [loaderState, setLoaderState] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [myroleName, setMyroleName] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // React Hook Form for Image Modal only
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: { image: null },
  });

  // Fetch initial data
  useEffect(() => {
    if (myUserID) {
      MyRolPermisGetAllApi();
      GetProfileImageById();
    } else {
      setStaffImage('/SampleProfile.png');
    }
  }, [myUserID]);

  // Modal cleanup on close
  useEffect(() => {
    const modalElement = document.getElementById('imageModal');
    if (modalElement) {
      const handleModalHidden = () => {
        reset();
        setModalImage(null);
        setIsCameraOpen(false);
        stopCamera();
      };

      modalElement.addEventListener('hidden.bs.modal', handleModalHidden);

      return () => {
        modalElement.removeEventListener('hidden.bs.modal', handleModalHidden);
      };
    }
  }, [reset]);

  const GetProfileImageById = async () => {
    try {
      const response = await StaffGetById(myUserID);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setStaffImage(response?.data?.user?.staffImage || '/SampleProfile.png');
        setMyroleName(response?.data?.user?.role || roleMapping[roleIdFromParams] || '');
      }
    } catch (error) {
      setStaffImage('/SampleProfile.png');
    }
  };

  const MyRolPermisGetAllApi = async () => {
    try {
      const response = await RolePermissionGetApi();
      if (response?.status === 200) {
        const roles = response?.data?.roles || [];
        const matchedRole = roles.find((role) => role.roleId === Number(roleIdFromParams));
        if (matchedRole) setMyroleName(matchedRole.roleName);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleImageClick = () => {
    setPreviousImage(staffImage);
    setModalImage(null);
    reset(); // Important: Reset form when opening modal
    const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('imageModal'));
    modal.show();
  };

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

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Main Submit Handler - This prevents form reset issue
  const handleFormSubmit = async (data) => {
    if (!data.image) {
      toast.error('Please select an image');
      return;
    }

    setLoaderState(true);

    try {
      if (!myUserID) {
        // Add Flow → Send to Basic Information via Context
        const imageUrl = URL.createObjectURL(data.image);

        setProfileImageForBasicInfo({
          file: data.image,
          preview: imageUrl
        });

        setStaffImage(imageUrl);
        toast.success('Image selected successfully for profile');
      } else {
        // Update Flow → Direct API call
        const formData = new FormData();
        formData.append('staffImage', data.image);

        const response = await StaffImageUpdate(myUserID, formData);
        if (response?.data?.status === 'success') {
          toast.success('Profile image updated successfully');
          setStaffImage(response?.data?.user?.staffImage || imageUrl);
        } else {
          toast.error(response?.data?.message || 'Failed to update image');
        }
      }
    } catch (error) {
      toast.error('Failed to process image');
      console.error(error);
    } finally {
      setLoaderState(false);
      // Close modal after operation
      const modal = bootstrap.Modal.getInstance(document.getElementById('imageModal'));
      if (modal) modal.hide();
    }
  };

  // Navigation Helpers
  const getNavLinkPath = (section) => {
    if (isAddFlow) {
      if (section === 'userbasicinformation') {
        return `/admin/users/${roleName}/${roleIdFromParams}/add/mainuserform/userbasicinformation`;
      }
      return myUserID
        ? `/admin/users/${roleName}/${roleIdFromParams}/add/mainuserform/${myUserID}/${section}`
        : '#';
    }
    if (isUpdateFlow) {
      return `/admin/users/${roleName}/${roleIdFromParams}/update/mainuserform/${myUserID}/${section}`;
    }
    return `/admin/users/${roleName}/${roleIdFromParams}/add/mainuserform/userbasicinformation`;
  };

  const isNavLinkActive = (match, loc, section) => {
    if (!match) return false;
    const paths = [
      `/admin/users/${roleName}/${roleIdFromParams}/update/mainuserform/${myUserID}/${section}`,
      `/admin/users/${roleName}/${roleIdFromParams}/add/mainuserform/${myUserID}/${section}`,
      `/admin/users/${roleName}/${roleIdFromParams}/add/mainuserform/${section}`
    ];
    return paths.includes(loc.pathname);
  };

  const isBasicInfoDisabled = isAddFlow && myUserID;

  return (
    <Container>
      <div className="container-fluid profile-card">
        <div className="row">
          <div className="col-xl-12 col-md-3 col-3">
            <div className="mainContainer">
              <img
                src={staffImage || '/SampleProfile.png'}
                alt="Profile"
                onClick={handleImageClick}
              />
              <label className="camera-icon-container" onClick={handleImageClick}>
                <svg className="camera-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  <circle cx="12" cy="10" r="1" fill="currentColor" />
                </svg>
              </label>
            </div>
            <div className="profile-info">
              <p className="role heading-18 font-rsponsive">{myroleName}</p>
            </div>
          </div>

          <div className="col-xl-12 col-md-9 col-9">
            <div className="nav-tabs-container">
              <div className="nav flex-column nav-pills">
                <NavLink
                  className={({ isActive }) => `nav-link d-flex align-items-center ${isBasicInfoDisabled ? 'my-nav-link' : ''} ${isActive ? 'active' : ''}`}
                  to={getNavLinkPath('userbasicinformation')}
                  isActive={(match, loc) => isNavLinkActive(match, loc, 'userbasicinformation')}
                  end
                >
                  <span className="flex-grow-1 heading-16">Basic Information</span>
                  <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
                </NavLink>

                <NavLink
                  className={({ isActive }) => `nav-link d-flex align-items-center ${isTabsDisabled ? 'my-nav-link' : ''} ${isActive && !isTabsDisabled ? 'active' : ''}`}
                  to={isTabsDisabled ? '#' : getNavLinkPath('usercontact')}
                  isActive={(match, loc) => isNavLinkActive(match, loc, 'usercontact')}
                >
                  <span className="flex-grow-1 heading-16">Contract</span>
                  <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
                </NavLink>

                <NavLink
                  className={({ isActive }) => `nav-link d-flex align-items-center ${isTabsDisabled ? 'my-nav-link' : ''} ${isActive && !isTabsDisabled ? 'active' : ''}`}
                  to={isTabsDisabled ? '#' : getNavLinkPath('userperinfo')}
                  isActive={(match, loc) => isNavLinkActive(match, loc, 'userperinfo')}
                >
                  <span className="flex-grow-1 heading-16">Personal Information</span>
                  <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
                </NavLink>

                <NavLink
                  className={({ isActive }) => `nav-link d-flex align-items-center ${isTabsDisabled ? 'my-nav-link' : ''} ${isActive && !isTabsDisabled ? 'active' : ''}`}
                  to={isTabsDisabled ? '#' : getNavLinkPath('userdocuments')}
                  isActive={(match, loc) => isNavLinkActive(match, loc, 'userdocuments')}
                >
                  <span className="flex-grow-1 heading-16">Documents</span>
                  <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font14" id="imageModalLabel">Edit Profile Image</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex justify-content-center">
              <form className="d-flex justify-content-center flex-column" onSubmit={handleSubmit(handleFormSubmit)}>
                {isCameraOpen ? (
                  <video ref={videoRef} autoPlay className="modal-image" />
                ) : (
                  <img
                    src={modalImage || previousImage || staffImage || '/SampleProfile.png'}
                    alt="Profile Preview"
                    className="modal-image align-self-center"
                  />
                )}

                <canvas ref={canvasRef} style={{ display: 'none' }} />

                <div className="modal-buttons d-flex gap-2 mt-4">
                  <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <label className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2">
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
                </div>

                {modalImage && (
                  <div className="modal-buttons mt-4">
                    <button
                      type="submit"
                      className="btn saveIconButtons me-2"
                      disabled={loaderState}
                    >
                      {loaderState ? 'Saving...' : 'Save Image'}
                    </button>
                    <button
                      type="button"
                      className="btn cancelIconButtons"
                      data-bs-dismiss="modal"
                    >
                      Cancel
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