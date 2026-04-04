import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NotificationGetAll } from "./Utils/Apis";
import { NotificationCountGetAll } from "./Utils/Apis";
import { NotificationMarkAsReadGetAll } from "./Utils/Apis";
import { NotificationGetByIdData } from "./Utils/Apis";
import styled from 'styled-components';

// ## style css area start ####  

const Container = styled.div`
  .main{
    border: none;
    background: rgba(232, 231, 231, 1);
    color: #000;
    padding: 4px 17px;
    border-radius: 11px;
  }
.offcanvas.show {
  overflow: visible;
}

.dropdown-menu {
  z-index: 9999 !important;
}
.custom-dropdown {
  position: absolute;
  right: 0;
  top: 45px;
  width: 180px;
  background: #fff;
  border-radius: 12px;
  padding: 8px 0;
  z-index: 9999;
  border: 1px solid #e5e5e5;
}

.custom-dropdown .dropdown-item {
  width: 100%;
  text-align: left;
  padding: 10px 16px;
  background: none;
  border: none;
}

.custom-dropdown .dropdown-item:hover {
  background: #f5f5f5;
}


  .my-btn-secondary{
    background: transparent;
    padding: 0px;
    border: none;
  }
  .my-btn-secondary span{
    font-size: 16px !important;
    color: #000;
  }
.my-btn-secondary,
.my-btn-secondary:focus,
.my-btn-secondary:active,
.my-btn-secondary.show {
  background-color: transparent !important;
  box-shadow: none !important;
  border-color: #6c757d; 
}
.main-notification{
    border: 2px solid rgba(240, 248, 247, 1);;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(203, 199, 199, 0.25);
}
.readUnreadBackground{
    background-color: #bccac9;
}
  .noti-img{
    width: 65px;
    height: 56px;
    border-radius: 37px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .custom-modal {
  background: rgba(0, 0, 0, 0.45);
}

.custom-modal-content {
  border-radius: 16px;
  overflow: hidden;
  border: none;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
}

.custom-modal-header {
  background: linear-gradient(135deg, #008479, #00a89a);
  padding: 16px 20px;
}

.custom-modal-body {
  background: #f6fbfa;
  padding: 24px;
}

.notification-box {
  background: #ffffff;
  border-left: 5px solid #008479;
  padding: 16px;
  border-radius: 10px;
}

.notification-box .label {
  font-size: 18px !important;
  color: #008479;
  font-weight: 500;
}

.notification-box .value {
  font-size: 14px;
  font-weight: 600;
  color: #6c757d;
  margin: 4px 0 0;
}

.custom-modal-footer {
  background: #f6fbfa;
  border-top: none;
  padding: 16px 20px;
}

.btn-custom {
  background-color: #008479;
  color: #fff;
  padding: 8px 24px;
  border-radius: 30px;
  border: none;
  font-weight: 500;
  transition: all 0.3s ease;
}
.btn-custom:hover {
  background-color: #006f66;
  color: #fff;
}
`;
// ## style css area end ####  

const NotificationBell = ({ fireBaseId }) => {
    // console.log('message id in notification bell', fireBaseId)

    const bellid = fireBaseId?.messageId;
    const [all, setAll] = useState('');
    const [unRead, setUnRead] = useState('');

    const [notificationData, setNotificationData] = useState([]);
    // console.log('value of notification', notificationData)
    const [loader, setLoader] = useState(false)
    const [read, setRead] = useState(false)
    const [selectedId, setSelectedId] = useState(null);
    const [getByIdMsg, setSelectedByIdMsg] = useState('');
    const [getByIdTitle, setSelectedByIdTitle] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [openFilter, setOpenFilter] = useState(false);


    const [addshow, setAddshow] = useState(true)
    const [count, setCount] = useState(0);
    const [markAsReadCheck, setMarkAsReadCheck] = useState(true);
    // console.log('value read value check', read)

    // useEffect(() => {
    //     console.log("useEffect fired id:", bellid);
    //     GetAllNotificationCount();
    //     GetAllNotification();
    // }, [bellid]);

    // useEffect fired id: 44fe5497-3600-4ab1-b8e0-6726589db1fa

    useEffect(() => {
        // console.log('vakue use in useEffect', bellid)
        setTimeout(() => {
            GetAllNotificationCount();
        }, 3000);
        GetAllNotification();
    }, [bellid, all, unRead]);

    const GetAllNotification = async () => {
        setLoader(true)
        try {
            const response = await NotificationGetAll(all, unRead);
            // console.log(' All Data of notification', response)
            if (response?.status === 200) {
                setNotificationData(response?.data?.notifications);
            } else {
                // toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }
    // Get All count Apis 
    const GetAllNotificationCount = async () => {
        setLoader(true)
        try {
            const response = await NotificationCountGetAll();
            // console.log('Data of notification count', response)
            if (response?.status === 200) {
                setCount(response?.data?.count);
                GetAllNotification()

            } else {
                // toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }
    // Get All mark as read Apis 
    const GetAllNotificationMarkAsread = async () => {
        setLoader(true)
        try {
            const response = await NotificationMarkAsReadGetAll();
            // console.log('Data of notification mark as read', response)
            if (response?.status === 200) {
                toast.success(response?.data?.message);
                GetAllNotificationCount()
                GetAllNotification()
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }
    // Get by id Apis 
    const GetAllNotificationGetById = async (id) => {
        // console.log('get by id for data', id)
        setLoader(true)
        try {
            const response = await NotificationGetByIdData(id);
            // console.log('Data of notification get by id data', response)
            if (response?.status === 200) {
                //   toast.success(response?.data?.message);
                setSelectedByIdMsg(response?.data?.notification?.message);
                setSelectedByIdTitle(response?.data?.notification?.title);
                setCreatedAt(response?.data?.notification?.createdAt);
                GetAllNotificationCount()
                GetAllNotification()
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }

    const offcanvasRef = useRef(null);


    return (
        <Container>
            <div style={{ position: "relative", cursor: "pointer" }} data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop021" aria-controls="offcanvasExample">
                <FaBell size={22} />
                {count > 0 && (
                    <span
                        style={{
                            position: "absolute",
                            top: "-6px",
                            right: "-6px",
                            background: "rgba(255, 145, 76, 1)",
                            color: "white",
                            borderRadius: "50%",
                            padding: "2px 6px",
                            fontSize: "12px",
                            fontWeight: "bold",
                        }}>
                        {count}
                    </span>
                )}
            </div>
            {
                addshow && (
                    <>
                        <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop021" aria-labelledby="staticBackdropLabel" >
                            <div className="offcanvas-header">
                                <Link data-bs-dismiss="offcanvas" >
                                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                                    </svg>
                                </Link>
                                {
                                    count > 0 && (
                                        <div>
                                            <button className="btn main btn-sm btn-outline-secondary me-2" onClick={GetAllNotificationMarkAsread}>Mark all as read</button>
                                        </div>
                                    )
                                }
                                <div className="position-relative">
                                    <button
                                        className="btn btn-secondary my-btn-secondary"
                                        onClick={() => setOpenFilter(!openFilter)}
                                        style={{ color: '#000' }}
                                    >
                                        All Notification ▾
                                    </button>

                                    {openFilter && (
                                        <div className="custom-dropdown shadow">
                                            <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setAll("ALL");
                                                    setUnRead("");
                                                    setOpenFilter(false);
                                                }}
                                            >
                                                All
                                            </button>

                                            <button
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setUnRead("UNREAD");
                                                    setAll("");
                                                    setOpenFilter(false);
                                                }}
                                            >
                                                Unread
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr className='mx-3' style={{ marginTop: '-3px' }} />
                            <div className="offcanvas-body pt-0">

                                {notificationData?.length > 0 ? (
                                    notificationData.map((item, index) => (
                                        <div
                                            key={item.id || index}
                                            className={`row main-notification mb-2 p-2 mx-1 ${item.status === "READ" ? "" : "readUnreadBackground"
                                                }`}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setRead(true);
                                                setSelectedId(item.id);
                                                GetAllNotificationGetById(item.id);
                                            }}
                                        >
                                            {/* <div className="col-lg-3">
                                                <img
                                                    className="noti-img"
                                                    src="/images/cropped_circle_image.png"
                                                    alt="notification"
                                                />
                                            </div> */}

                                            <div className="col-lg-12" style={{ fontSize: "14px" }}>
                                                <h2 className="mb-1">
                                                    <b>{item.title}</b>
                                                </h2>
                                                <p className="mb-0">{item.message}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h2 className="text-center mt-3" style={{color:'red'}}>No notifications available..</h2>
                                )}
                            </div>


                        </div>
                    </>
                )
            }
            {read && (
                <>
                    <div className="modal fade show d-block custom-modal" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content custom-modal-content">

                                {/* Header */}
                                <div className="modal-header custom-modal-header">
                                    <h5 className="modal-title text-white">
                                        🔔 Notification Details
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        onClick={() => setRead(false)}
                                    />
                                </div>

                                {/* Body */}
                                <div className="modal-body custom-modal-body">
                                    <div className="notification-box">
                                        <span className="label">{getByIdTitle}</span>
                                        <p className="value">{getByIdMsg}</p>
                                        <div>
                                            <p className="value">{createdAt}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="modal-footer custom-modal-footer">
                                    <button
                                        className="btn btn-custom"
                                        onClick={() => setRead(false)}
                                    >
                                        Close
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>


                    {/* Backdrop */}
                    <div className="modal-backdrop fade show"></div>
                </>
            )}

            {/* modal  */}

        </Container>


    );
};

export default NotificationBell;
