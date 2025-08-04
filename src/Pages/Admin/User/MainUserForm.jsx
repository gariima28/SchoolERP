import React from 'react';
import styled from 'styled-components';
import UserMain from './UserMain';
import UserSidebar from './UserSidebar';

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
    min-height: 450px; /* Increased height */
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
  }
  .nav-link:hover {
    background-color: #f8f8f8;
    color: #008479;
  }
  .nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    background-color: #008479;
    color: #fff;
    border-radius: 8px;
    font-weight: 600;
  }
  .my-nav-link {
    color: #000 !important;
    background-color: #f0f0f0 !important;
    pointer-events: none !important;
    border-radius: 8px;
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
  }
`;

const MainUserForm = () => {

  return (
    <Container>
      <div className="container-fluid p-2">
        <div className="main-content-container">
          <div className="container-div-content">
            <div className="row">
              <div className="col-lg-3 div-col-3">
                <UserSidebar />
              </div>
              <div className="col-lg-9">
                <UserMain />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MainUserForm;