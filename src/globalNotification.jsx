import { useEffect, useRef, useState } from "react";
import { Toast } from "bootstrap";
import styled from 'styled-components';
// ## style css area start ####  

const Container = styled.div`
/* Custom Toast Wrapper */
.custom-toast {
  border-radius: 14px;
  border-left: 5px solid #008479;
  box-shadow: 0 12px 30px rgba(0, 132, 121, 0.35);
  overflow: hidden;
  animation: slideIn 0.4s ease-out;
}

/* Header */
.custom-toast .toast-header {
  background: linear-gradient(135deg, #008479, #00a193);
  color: #fff;
  border-bottom: none;
  padding: 10px 14px;
}

/* Title */
.custom-toast .toast-header strong {
  font-weight: 600;
  letter-spacing: 0.3px;
}

/* Time text */
.custom-toast .toast-header small {
  color: rgba(255, 255, 255, 0.8);
}

/* Close button */
.custom-toast .btn-close {
  filter: invert(1);
  opacity: 0.8;
}

.custom-toast .btn-close:hover {
  opacity: 1;
}

/* Body */
.custom-toast .toast-body {
  background: #f6fffd;
  color: #333;
  padding: 14px 16px;
  font-size: 14px;
}

/* Slide animation */
@keyframes slideIn {
  from {
    transform: translateX(120%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

`;
const GlobalNotification = ({ fireBaseValue }) => {

    const toastRef = useRef(null);

    const toastEl = toastRef.current;
    if (toastEl) {
        const toast = new Toast(toastEl, {
            autohide: true,
            delay: 3000,
        });
        toast.show();
    }

    return (
        <Container>
        
            <div
                className="toast-container position-fixed top-0 end-0 p-3"
                style={{ zIndex: 9999 }}>
                <div
                    ref={toastRef}
                    className="toast custom-toast"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">
                            {fireBaseValue?.title || "Welcome"}
                        </strong>
                        <small>Just now</small>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="toast"
                            aria-label="Close" />
                    </div>
                    <div className="toast-body">
                        {fireBaseValue?.body || "Hello! Notification loaded successfully 🚀"}
                    </div>
                </div>
            </div>

        </Container>

    );
};

export default GlobalNotification;
