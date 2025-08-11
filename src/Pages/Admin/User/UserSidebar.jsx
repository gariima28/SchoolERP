import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { MyUseContext } from '../ContextApi/UseContext';

const Container = styled.div`
  .main-body {
    background-color: #F2F3F6;
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
    background: linear-gradient(135deg, #E5F3F2 0%, #F8FAFC 100%);
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
    border-top: 1px solid #D7E7E5;
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
    background-color: #EDF5F6 !important;
    opacity: 0.6;
    pointer-events: fill !important;
    position: relative;
  }
  .my-nav-link:hover::after {
    content: 'Please complete Basic Information first';
    position: absolute;
    top: -10px; /* Adjusted to appear above the tab */
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
    pointer-events: none; /* Ensure tooltip doesn't interfere with hover */
  }
  @media only screen and (max-width: 1260px) {
    .mainContainer img {
      width: 120px;
      height: 120px;
    }
    .mainContainer {
      width: 130px;
      height: 130px;
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
      top: -25px; /* Adjusted for smaller screens */
    }
  }
`;

const UserSidebar = () => {
  const { id } = useParams();
  const { myId, setMyId } = useContext(MyUseContext);
  const [image, setImage] = useState();
  const [userMyRole, setUserMyRole] = useState('');
  const [transferData, setTransferData] = useState();

  console.log(myId, "IDs set hui ya nahi ")

  useEffect(() => {
    userData();
  }, [id]);

  const userData = (value) => {
    setTransferData(value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Determine if tabs should be disabled based on myId
  const isTabsDisabled = !myId;

  return (
    <Container>
      <div className="profile-card">
        <div className="mainContainer">
          <img
            src={image || transferData?.staffImage || '/images/user-image.png'}
            alt="Profile"
          />
          <label htmlFor="staff-image-upload" className="camera-icon-container">
            <svg className="camera-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              <circle cx="12" cy="10" r="1" fill="currentColor" />
            </svg>
          </label>
          <input
            id="staff-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input"
          />
        </div>
        <div className="profile-info">
          <p className="role heading-18 font-rsponsive">
            {transferData?.userRole || userMyRole || 'Role'}
          </p>
        </div>
        <div className="nav-tabs-container">
          <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <NavLink
              className="nav-link d-flex align-items-center"
              to={`/admin/users/mainuserform/${id}/userbasicinformation`}
              end
            >
              <span className="flex-grow-1 heading-16">Basic Information</span>
              <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
            </NavLink>
            <NavLink
              className={({ isActive }) => 
                `nav-link d-flex align-items-center ${isTabsDisabled ? 'my-nav-link' : ''} ${isActive && !isTabsDisabled ? 'active' : ''}`
              }
              to={isTabsDisabled ? '#' : `/admin/users/mainuserform/${id}/usercontact`}
              end
            >
              <span className="flex-grow-1 heading-16">Contact</span>
              <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
            </NavLink>
            <NavLink
              className={({ isActive }) => 
                `nav-link d-flex align-items-center ${isTabsDisabled ? 'my-nav-link' : ''} ${isActive && !isTabsDisabled ? 'active' : ''}`
              }
              to={isTabsDisabled ? '#' : `/admin/users/mainuserform/${id}/userperinfo`}
              end
            >
              <span className="flex-grow-1 heading-16">Personal Information</span>
              <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
            </NavLink>
            <NavLink
              className={({ isActive }) => 
                `nav-link d-flex align-items-center ${isTabsDisabled ? 'my-nav-link' : ''} ${isActive && !isTabsDisabled ? 'active' : ''}`
              }
              to={isTabsDisabled ? '#' : `/admin/users/mainuserform/${id}/userdocuments`}
              end
            >
              <span className="flex-grow-1 heading-16">Documents</span>
              <Icon icon="iconamoon:arrow-right-2-light" width="1.5em" height="1.5em" />
            </NavLink>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserSidebar;