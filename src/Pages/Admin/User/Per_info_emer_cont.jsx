import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react/dist/iconify.js';
import { personal_Emergeny__GetById, EmergencyPostApi, EmergencyPutApi, EmergencyDeleteApi, getEmergencyByEmergencyId } from '../../../Utils/Apis';
import { MyUseContext } from '../ContextApi/UseContext';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  .form-container {
    background: linear-gradient(145deg, #ffffff 0%, #e6f4f1 100%);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 6px 20px rgba(0, 132, 121, 0.1);
    transition: all 0.3s ease;
    animation: slideIn 0.5s ease-out;
  }
  .form-container:hover {
    box-shadow: 0 8px 24px rgba(0, 132, 121, 0.15);
  }
  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .form-control, .form-select {
    border-radius: 8px;
    font-size: 14px;
    padding: 10px;
    transition: all 0.3s ease;
    border: 1px solid #ced4da;
    background: #f8fafc;
  }
  .form-control:hover, .form-select:hover {
    border-color: #008479;
    background: #fff;
  }
  .form-control:focus, .form-select:focus {
    border-color: #008479;
    box-shadow: 0 0 0 0.2rem rgba(0, 132, 121, 0.25);
    outline: none;
    background: #fff;
  }
  .form-label {
    font-weight: 600;
    color: #1a3c34;
    margin-bottom: 5px;
    position: relative;
    display: inline-block;
  }
  .form-label:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: #008479;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 10;
    opacity: 0;
    animation: fadeIn 0.2s ease forwards;
  }
  @keyframes fadeIn {
    to { opacity: 1; }
  }
  .my-green {
    background: linear-gradient(135deg, #008479 0%, #006b63 100%) !important;
    border: none !important;
    color: #fff !important;
    padding: 10px 20px;
    border-radius: 8px;
    transition: transform 0.2s ease, background 0.3s ease;
  }
  .my-green:hover {
    background: linear-gradient(135deg, #006b63 0%, #005a50 100%) !important;
    transform: scale(1.05);
  }
  .my-green:disabled {
    background: #b0b0b0 !important;
    cursor: not-allowed;
    transform: none;
  }
  .btn-outline-success {
    border-color: #008479;
    color: #008479;
    padding: 10px 20px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  .btn-outline-success:hover {
    background: linear-gradient(135deg, #008479 0%, #006b63 100%);
    color: #fff;
    transform: scale(1.05);
  }
  .error-message {
    font-size: 12px;
    color: #dc3545;
    margin-top: 3px;
    min-height: 16px;
    animation: fadeIn 0.3s ease;
  }
  .valid-indicator::after {
    content: '✔';
    color: #28a745;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
  }
  .form-group {
    margin-bottom: 0.4rem;
    position: relative;
  }
  .row-margin {
    margin-bottom: 0.5rem;
  }
  .buttons-tops {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .loader {
    border: 2px solid #fff;
    border-top: 2px solid #008479;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    display: inline-block;
    margin-left: 10px;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .table-container {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 132, 121, 0.1);
    margin-top: 20px;
  }
  .table {
    font-size: 14px;
    color: #1a3c34;
  }
  .table thead th {
    font-weight: 600;
    color: #1a3c34;
    background: #e6f4f1;
  }
  .table tbody tr:hover {
    background: #f0f4f8;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    font-size: 14px;
  }
  .pagination .page-item.active .page-link {
    background: #008479;
    border-color: #008479;
    color: #fff;
  }
  .pagination .page-link {
    border-radius: 6px;
    color: #008479;
    transition: all 0.3s ease;
  }
  .pagination .page-link:hover {
    background: #e6f4f1;
    color: #006b63;
  }
`;

const Per_info_emer_cont = () => {

  const { roleIdUser } = useParams();
  const { userId } = useContext(MyUseContext);
  const myUserID = userId ?? roleIdUser ?? "";

  // State Management
  const [loader, setLoader] = useState(false);
  const [status, setStatus] = useState();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [relationship, setRelationship] = useState('');
  const [isValidNameRequired, setIsValidNameRequired] = useState(false);
  const [isValidContactRequired, setIsValidContactRequired] = useState(false);
  const [isValidRelationshipRequired, setIsValidRelationshipRequired] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [editContactId, setEditContactId] = useState('');
  const [deleteContactId, setDeleteContactId] = useState('');
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);

  // Form instance for edit modal
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit, isValid: isValidEdit },
    setValue: setValueEdit,
    reset: resetEdit,
  } = useForm({
    mode: 'onChange',
  });

  // Fetch emergency contacts
  useEffect(() => {
    if (myUserID) {
      fetchEmergencyContacts();
    }
  }, [ currentPage, pageSize]);

  const fetchEmergencyContacts = async () => {
    setLoader(true);
    try {
      const response = await personal_Emergeny__GetById(myUserID, currentPage, pageSize);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setEmergencyContacts(response?.data?.emergency || []);
        setTotalPages(response?.data?.totalPages || 1);
      } else {
        toast.error(response?.data?.msg || 'Failed to fetch emergency contacts');
      }
    } catch (error) {
      toast.error('Failed to fetch emergency contacts');
    } finally {
      setLoader(false);
    }
  };

  // Validation for add form
  const FuncValidation = () => {
    let isValid = true;
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!name || !nameRegex.test(name)) {
      setIsValidNameRequired(true);
      isValid = false;
    } else {
      setIsValidNameRequired(false);
    }

    if (!contact || !phoneRegex.test(contact)) {
      setIsValidContactRequired(true);
      isValid = false;
    } else {
      setIsValidContactRequired(false);
    }

    if (!relationship) {
      setIsValidRelationshipRequired(true);
      isValid = false;
    } else {
      setIsValidRelationshipRequired(false);
    }

    return isValid;
  };

  const handleName = (e2) => {
    setName(e2);
    const nameRegex = /^[A-Za-z\s]+$/;
    setIsValidNameRequired(!e2 || !nameRegex.test(e2));
  };

  const handleContact = (e2) => {
    setContact(e2);
    const phoneRegex = /^[0-9]{10}$/;
    setIsValidContactRequired(!e2 || !phoneRegex.test(e2));
  };

  const handleRelationship = (e2) => {
    setRelationship(e2);
    setIsValidRelationshipRequired(!e2);
  };

  // Add new emergency contact
  const ContactDataApi = async () => {
    if (FuncValidation()) {
      const formData = new FormData();
      formData.append('fullName', name);
      formData.append('phoneNumber', contact);
      formData.append('relationship', relationship);

      setLoader(true);
      try {
        const response = await EmergencyPostApi(myUserID, formData);
        if (response?.data?.status === 'success') {
          toast.success(response?.data?.message);
          setStatus(response?.data?.status);
          fetchEmergencyContacts();
          clearData();
        } else {
          toast.error(response?.data?.message || 'Failed to save emergency contact');
        }
      } catch (error) {
        toast.error('Failed to save emergency contact');
      } finally {
        setLoader(false);
      }
    }
  };

  // Fetch contact by ID for editing
  const handleEdit = async (Ids) => {
    setLoader(true);
    try {
      const response = await getEmergencyByEmergencyId(Ids);
      if (response?.status === 200 && response?.data?.status === 'success') {
        const data = response?.data?.emergency;
        setEditContactId(data.emergencyId);
        setValueEdit('fullName', data.fullName || '');
        setValueEdit('phoneNumber', data.phoneNumber || '');
        setValueEdit('relationship', data.relationship || '');
      } else {
        toast.error(response?.data?.msg || 'Failed to fetch emergency contact');
      }
    } catch (error) {
      toast.error('Failed to fetch emergency contact');
    } finally {
      setLoader(false);
    }
  };

  // Update emergency contact
  const updateContact = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('relationship', data.relationship);
      const response = await EmergencyPutApi(editContactId, formData);
      if (response?.data?.status === 'success') {
        toast.success(response?.data?.message);
        fetchEmergencyContacts();
        resetEdit();
        setEditContactId('');
        const offcanvasElement = document.getElementById('editEmergencyContact');
        const offcanvas =
          bootstrap.Offcanvas.getInstance(offcanvasElement) ||
          new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
      } else {
        toast.error(response?.data?.message || 'Failed to update emergency contact');
      }
    } catch (error) {
      toast.error('Failed to update emergency contact');
    } finally {
      setLoader(false);
    }
  };

  // Delete emergency contact
  const handleDelete = (emergencyId) => {
    console.log('id')
    setDeleteContactId(emergencyId);
    setIsDeleteConfirmed(false);
  };

  const deleteContact = async () => {
    if (!isDeleteConfirmed) return;
    setLoader(true);
    try {
      const response = await EmergencyDeleteApi(deleteContactId);
      if (response?.data?.status === 'success') {
        toast.success(response?.data?.message);
        fetchEmergencyContacts();
        setIsDeleteConfirmed(false);
        setDeleteContactId('');
        const offcanvasElement = document.getElementById('deleteEmergencyContact');
        const offcanvas =
          bootstrap.Offcanvas.getInstance(offcanvasElement) ||
          new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
      } else {
        toast.error(response?.data?.message || 'Failed to delete emergency contact');
      }
    } catch (error) {
      toast.error('Failed to delete emergency contact');
    } finally {
      setLoader(false);
    }
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };

  const clearData = () => {
    setName('');
    setContact('');
    setRelationship('');
    setIsValidNameRequired(false);
    setIsValidContactRequired(false);
    setIsValidRelationshipRequired(false);
  };

  return (
    <Container>
      <Toaster />
      <div className="container-fluid px-0 mt-3">
        <div className="form-container">
          <p className="heading-16 mb-3" style={{ color: '#1a3c34', fontWeight: '700' }}>
            Emergency Contact Information
          </p>
          <div className="row px-1 pt-2 row-margin">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="name"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter full name (letters only)"
                  aria-label="Full Name"
                >
                  Full Name <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${
                    !isValidNameRequired && name ? 'valid-indicator' : ''
                  }`}
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => handleName(e.target.value)}
                  tabIndex="1"
                  aria-describedby="nameError"
                />
                {isValidNameRequired && (
                  <div id="nameError" className="error-message">
                    Valid name is required
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="contact"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter 10-digit phone number"
                  aria-label="Contact Number"
                >
                  Contact Number <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${
                    !isValidContactRequired && contact ? 'valid-indicator' : ''
                  }`}
                  id="contact"
                  placeholder="Enter number"
                  value={contact}
                  onChange={(e) => handleContact(e.target.value)}
                  tabIndex="2"
                  aria-describedby="contactError"
                />
                {isValidContactRequired && (
                  <div id="contactError" className="error-message">
                    Valid 10-digit phone number is required
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="relationship"
                  className="form-label heading-14 label-color"
                  data-tooltip="Select relationship"
                  aria-label="Relationship"
                >
                  Relationship <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <select
                  className={`form-select form-select-sm form-focus label-color ${
                    !isValidRelationshipRequired && relationship ? 'valid-indicator' : ''
                  }`}
                  id="relationship"
                  value={relationship}
                  onChange={(e) => handleRelationship(e.target.value)}
                  tabIndex="3"
                  aria-describedby="relationshipError"
                >
                  <option value="">--Choose--</option>
                  <option value="parent">Parent</option>
                  <option value="spouse">Spouse</option>
                  <option value="sibling">Sibling</option>
                  <option value="friend">Friend</option>
                </select>
                {isValidRelationshipRequired && (
                  <div id="relationshipError" className="error-message">
                    Relationship is required
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row buttons-tops text-center">
            <div className="my-button11 heading-14">
              <button
                type="button"
                className="btn btn-outline-success my-green heading-12"
                onClick={ContactDataApi}
                disabled={loader}
                tabIndex="6"
                aria-label="Add Emergency Contact"
              >
                Add Emergency Contact {loader && <span className="loader"></span>}
              </button>
              <button
                type="button"
                className="btn btn-outline-success heading-12 ms-2"
                onClick={clearData}
                tabIndex="7"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="table-container">
          
          <div className="table-responsive">
            <table className="table table-sm table-striped text-center">
              <thead>
                <tr className="heading-16 text-color-000">
                  <th style={{ width: '100px' }}>Sr no.</th>
                  <th style={{ width: '300px' }}>Name</th>
                  <th style={{ width: '200px' }}>Contact Number</th>
                  <th style={{ width: '200px' }}>Relationship</th>
                  <th style={{ width: '200px' }}>Action</th>
                </tr>
              </thead>
              <tbody className="heading-14 align-middle greyTextColor">
                {emergencyContacts.length > 0 ? (
                  emergencyContacts.map((contact, index) => (
                    <tr key={contact.emergencyId}>
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{contact.fullName}</td>
                      <td>{contact.phoneNumber}</td>
                      <td>{contact.relationship}</td>
                      <td>
                        <button
                          className="action-btn edit me-2"
                          onClick={() => handleEdit(contact.emergencyId)}
                          data-bs-toggle="offcanvas"
                          data-bs-target="#editEmergencyContact"
                          tabIndex={7 + index * 2}
                          aria-label={`Edit contact ${contact.emergencyId}`}
                        >
                          <Icon icon="tabler:edit" width="1.4em" height="1.4em" />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(contact.emergencyId)}
                          data-bs-toggle="offcanvas"
                          data-bs-target="#deleteEmergencyContact"
                          tabIndex={8 + index * 2}
                          aria-label={`Delete contact ${contact.emergencyId}`}
                        >
                          <Icon icon="tabler:trash" width="1.4em" height="1.4em" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No emergency contacts found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex" style={{ marginBottom: '10px' }}>
            <p className="font14">Showing {currentPage} of {totalPages} Pages</p>
            <div className="ms-auto">
              <ReactPaginate
                previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={10}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
          </div>

          {/* Edit Offcanvas */}
          <div
            className="offcanvas offcanvas-end p-2"
            data-bs-backdrop="static"
            tabIndex="-1"
            id="editEmergencyContact"
            aria-labelledby="editEmergencyContactLabel"
          >
            <div className="offcanvas-header border-bottom border-2 p-1">
              <a type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path
                    fill="#008479"
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                  />
                </svg>
              </a>
              <h2 className="offcanvas-title heading-16" id="editEmergencyContactLabel">
                Edit Emergency Contact
              </h2>
            </div>
            <div className="offcanvas-body p-3">
              <form onSubmit={handleSubmitEdit(updateContact)}>
                <div className="form-group mb-3">
                  <label
                    htmlFor="editFullName"
                    className="form-label heading-14 label-color"
                    data-tooltip="Enter full name (letters only)"
                  >
                    Full Name <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${
                      errorsEdit.fullName ? 'border-danger' : ''
                    }`}
                    id="editFullName"
                    placeholder="John Doe"
                    {...registerEdit('fullName', {
                      required: 'Valid name is required',
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: 'Name must contain only letters and spaces',
                      },
                    })}
                  />
                  {errorsEdit.fullName && (
                    <div className="error-message">{errorsEdit.fullName.message}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label
                    htmlFor="editPhoneNumber"
                    className="form-label heading-14 label-color"
                    data-tooltip="Enter 10-digit phone number"
                  >
                    Contact Number <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${
                      errorsEdit.phoneNumber ? 'border-danger' : ''
                    }`}
                    id="editPhoneNumber"
                    placeholder="Enter number"
                    {...registerEdit('phoneNumber', {
                      required: 'Valid 10-digit phone number is required',
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Phone number must be 10 digits',
                      },
                    })}
                  />
                  {errorsEdit.phoneNumber && (
                    <div className="error-message">{errorsEdit.phoneNumber.message}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label
                    htmlFor="editRelationship"
                    className="form-label heading-14 label-color"
                    data-tooltip="Select relationship"
                  >
                    Relationship <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <select
                    className={`form-select form-select-sm label-color ${
                      errorsEdit.relationship ? 'border-danger' : ''
                    }`}
                    id="editRelationship"
                    {...registerEdit('relationship', {
                      required: 'Relationship is required',
                    })}
                  >
                    <option value="">--Choose--</option>
                    <option value="parent">Parent</option>
                    <option value="spouse">Spouse</option>
                    <option value="sibling">Sibling</option>
                    <option value="friend">Friend</option>
                  </select>
                  {errorsEdit.relationship && (
                    <div className="error-message">{errorsEdit.relationship.message}</div>
                  )}
                </div>
                <div className="text-center p-3">
                  <button
                    type="submit"
                    className="btn btn-outline-success my-green heading-12 me-2"
                    disabled={!isValidEdit || loader}
                  >
                    Update Contact {loader && <span className="loader"></span>}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-success heading-12"
                    data-bs-dismiss="offcanvas"
                    onClick={() => {
                      resetEdit();
                      setEditContactId('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Delete Offcanvas */}
          <div
            className="offcanvas offcanvas-end p-2"
            data-bs-backdrop="static"
            tabIndex="-1"
            id="deleteEmergencyContact"
            aria-labelledby="deleteEmergencyContactLabel"
          >
            <div className="offcanvas-header ps-0 p-1">
              <a type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path
                    fill="#B50000"
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                  />
                </svg>
              </a>
              <span className="offcanvas-title heading-16" id="deleteEmergencyContactLabel">
                Delete Emergency Contact
              </span>
            </div>
            <div className="offcanvas-body p-0">
              <div style={{ zIndex: -1 }}>
                <p className="p-2">Emergency Contact</p>
                <p className="text-center p-3">
                  <img src="/images/errorI.svg" className="img-fluid" alt="Error" />
                </p>
                <p className="text-center heading-16" style={{ color: '#1a3c34', fontWeight: '700' }}>
                  Are you Sure?
                </p>
                <p className="text-center greyTextColor heading-14 pt-2">
                  This action will permanently delete<br />the Emergency Contact Data
                </p>
                <p className="text-center heading-14 p-2">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    checked={isDeleteConfirmed}
                    id="deleteConfirm"
                    onChange={(e) => setIsDeleteConfirmed(e.target.checked)}
                  />
                  I Agree to delete the Emergency Contact Data
                </p>
                <p className="text-center p-3">
                  <button
                    className="btn btn-outline-success my-green heading-12"
                    disabled={!isDeleteConfirmed || loader}
                    onClick={deleteContact}
                  >
                    Delete {loader && <span className="loader"></span>}
                  </button>
                  <button
                    className="btn cancelButtons heading-12 ms-2"
                    data-bs-dismiss="offcanvas"
                    onClick={() => {
                      setIsDeleteConfirmed(false);
                      setDeleteContactId('');
                    }}
                  >
                    Cancel
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Per_info_emer_cont;
