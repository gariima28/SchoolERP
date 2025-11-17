import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { TeacherNoticeGetByIdApi } from '../../../Utils/Apis';
import toast from 'react-hot-toast';

// ============== NEW STYLED CONTAINER (Updated for your exact design) ==============
const Container = styled.div`
  .main-body {
    background-color: #f8f9fa;
    min-height: 100vh;
    padding: 20px 0;
  }

  .notice-container {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 25px rgba(0,0,0,0.06);
    overflow: hidden;
    margin: 15px;
  }

  .notice-header {
    padding: 30px 40px 20px;
  }

  .notice-title {
    font-size: 24px;
    font-weight: 600;
    color: #212529;
    margin: 0 0 8px 0;
    line-height: 1.4;
  }

  .notice-date {
    font-size: 14px;
    color: #6c757d;
    margin: 0;
  }

  .notice-content {
    padding: 30px 40px;
    font-size: 16px;
    line-height: 1.8;
    color: #444;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  .notice-footer {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fcfcfc;
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .author-img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #e9ecef;
  }

  .author-name {
    font-weight: 600;
    color: #333;
    font-size: 15px;
    margin: 0;
  }

  .back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: transparent;
    border: 1.5px solid #dee2e6;
    border-radius: 8px;
    color: #495057;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    text-decoration: none;
  }

  .back-btn:hover {
    background-color: #f8f9fa;
    border-color: #adb5bd;
    color: #212529;
  }

  .back-btn svg {
    width: 16px;
    height: 16px;
  }

  /* Breadcrumb Styling */
  .breadcrumb {
    background: transparent;
    padding: 0;
    margin: 0 0 15px 15px;
    font-size: 14px;
  }

  .breadcrumb-item a {
    color: #008479;
    text-decoration: none;
  }

  .breadcrumb-item.active {
    color: #6c757d;
  }

  @media (max-width: 768px) {
    .notice-header,
    .notice-content,
    .notice-footer {
      padding: 20px;
    }
    .notice-title {
      font-size: 20px;
    }
  }
`;

const NoticeViewPage = () => {
  const location = useLocation();
  const [notice, setNotice] = useState({});

  useEffect(() => {
    if (location.state?.id) {
      fetchNotice();
    }
  }, [location.state?.id]);

  const fetchNotice = async () => {
    try {
      const response = await TeacherNoticeGetByIdApi(location.state.id);
      if (response?.status === 200) {
        setNotice(response.data.notice || {});
      } else {
        toast.error(response?.data?.msg || "Failed to load notice");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  // Handle broken or placeholder image
  const getStaffImage = () => {
    const img = notice.staffImage;
    if (!img || img.includes("xxxxxxxxxxx") || img.trim() === "") {
      return "/SampleProfile.png"; // अपनो डिफ़ॉल्ट इमेज पाथ डाल दो
    }
    return img;
  };

  return (
    <Container>
      <div className="">

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/admin/notice">Notice</Link></li>
            <li className="breadcrumb-item active" aria-current="page">View Notice</li>
          </ol>
        </nav>

        <h5 className="ms-3 mb-3" style={{ color: '#212529', fontWeight: '600' }}>
          Notice Details
        </h5>

        {/* Main Notice Card */}
        <div className="container-fluid main-body p-3">
          {/* Title + Date */}
          <div className="notice-header">
            <h1 className="notice-title">
              {notice.noticeTitle || "Loading..."}
            </h1>
            <p className="notice-date">
              {notice.noticeDate} {notice.noticeTime ? `• ${notice.noticeTime}` : ''}
            </p>
          </div>

          {/* Description */}
          <div className="notice-content">
            <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>
              {notice.description || "No description available."}
            </p>
          </div>

          {/* Footer: Author + Back Button */}
          <div className="notice-footer">
            <div className="author-info">
              <img
                src={getStaffImage()}
                alt={notice.createdBy}
                className="author-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/default-avatar.jpg";
                }}
              />
              <p className="author-name">{notice.createdBy || "Admin"}</p>
            </div>

            <Link to="/admin/notice" className="back-btn">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                <path d="M6.81266 11.0217L0 5.51083L6.81266 0L7.8 0.804501L1.97469 5.51083L7.8 10.2172L6.81266 11.0217Z" fill="currentColor" />
              </svg>
              Back
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NoticeViewPage;