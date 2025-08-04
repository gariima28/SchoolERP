import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthExpired = () => {
            setShowModal(true);
            setCountdown(3);
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    const next = prev - 1;
                    if (next < 0) {
                        clearInterval(timer);
                        setShowModal(false);
                        sessionStorage.removeItem('token');
                        sessionStorage.removeItem('ERPForgetToken');
                        navigate('/login');
                        return 0;
                    }
                    return next;
                });
            }, 1000);
        };

        window.addEventListener('auth-expired', handleAuthExpired);
        return () => {
            window.removeEventListener('auth-expired', handleAuthExpired);
        };
    }, [navigate]);

    return (
        <AuthContext.Provider value={{}}>
            {showModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    aria-labelledby="authExpiredModalLabel"
                    aria-hidden="false"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="authExpiredModalLabel">
                                    Authentication Expired
                                </h5>
                            </div>
                            <div className="modal-body">
                                <p>
                                    You will be logged out in {countdown} second{countdown !== 1 ? 's' : ''}...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {children}
        </AuthContext.Provider>
    );
};

