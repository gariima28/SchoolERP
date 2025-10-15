import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react/dist/iconify.js';
import { DocumentPostApi, DocumentPutApi, DocumentDeleteApi, getDocumentByDocumentId, getDocumentByStaffId } from '../../../Utils/Apis';
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
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 132, 121, 0.1);
    padding: 16px;
    margin-top: 20px;
  }
  .table {
    margin-bottom: 0;
  }
  .table th {
    background: #f8fafc;
    color: #1a3c34;
    font-weight: 600;
    padding: 12px;
  }
  .table td {
    padding: 12px;
    vertical-align: middle;
    color: #4a4a4a;
  }

  .action-btn {
    padding: 6px 12px;
    font-size: 12px;
    border-radius: 6px;
    transition: all 0.3s ease;
  }
  .action-btn.edit {
    background: #008479;
    color: #fff;
    border: none;
  }
  .action-btn.delete {
    background: #B50000;
    color: #fff;
    border: none;
  }
  .action-btn:hover {
    transform: scale(1.05);
  }
  .table tr:hover {
    background: #e6f4f1;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 10px;
  }
  .pagination li {
    display: inline-block;
  }
  .pagination li a {
    padding: 6px 12px;
    border-radius: 6px;
    color: #008479;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .pagination li.active a {
    background: #008479;
    color: #fff;
  }
  .pagination li a:hover {
    background: #e6f4f1;
  }
`;

const User_Documnt = () => {

  const { roleId, userId } = useParams();
  // const { userId } = useContext(MyUseContext);
  const myUserID = userId ?? roleId ?? "";

  // State Management
  const [loader, setLoader] = useState(false);
  const [docName, setDocumentName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isValidDocumentNameRequired, setIsValidDocumentNameRequired] = useState(false);
  const [isValidDocumentTypeRequired, setIsValidDocumentTypeRequired] = useState(false);
  const [isValidFileRequired, setIsValidFileRequired] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [documents, setDocuments] = useState([]);
  const [editDocumentId, setEditDocumentId] = useState('');
  const [deleteDocumentId, setDeleteDocumentId] = useState('');
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

  // Fetch documents
  useEffect(() => {
    if (myUserID) {
      fetchDocuments();
    }
  }, [pageNo, pageSize]);

  const fetchDocuments = async () => {
    setLoader(true);
    try {
      const response = await getDocumentByStaffId(myUserID, { pageNo, pageSize });
      if (response?.status === 200 && response?.data?.status === 'success') {
        setDocuments(response?.data?.documents || []);
        setTotalPages(response?.data?.totalPages || 1);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {

      // toast.error('Failed to fetch documents');
    } finally {
      setLoader(false);
    }
  };

  // Validation for add form
  const FuncValidation = () => {
    let isValid = true;
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!docName || !nameRegex.test(docName)) {
      setIsValidDocumentNameRequired(true);
      isValid = false;
    } else {
      setIsValidDocumentNameRequired(false);
    }

    if (!imageFile) {
      setIsValidFileRequired(true);
      isValid = false;
    } else {
      setIsValidFileRequired(false);
    }

    return isValid;
  };

  const handleDocumentName = (e) => {
    const value = e;
    setDocumentName(value);
    const nameRegex = /^[A-Za-z\s]+$/;
    setIsValidDocumentNameRequired(!value || !nameRegex.test(value));
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setIsValidFileRequired(false);
    } else {
      setIsValidFileRequired(true);
      toast.error('Please upload a valid JPG or PNG file');
    }
  };

  // Add new document
  const addDocument = async () => {
    if (FuncValidation()) {
      const formData = new FormData();
      formData.append('docName', docName);
      formData.append('docPath', imageFile);
      formData.append('staffId', myUserID);

      setLoader(true);
      try {
        const response = await DocumentPostApi(myUserID, formData);
        if (response?.data?.status === 'success') {
          toast.success(response?.data?.message);
          fetchDocuments();
          clearForm();
        } else {
          toast.error(response?.data?.message || 'Failed to add document');
        }
      } catch (error) {
        toast.error('Failed to add document');
      } finally {
        setLoader(false);
      }
    }
  };


  const handleEdit = async (id) => {
    setLoader(true);
    try {
      const response = await getDocumentByDocumentId(id);
      if (response?.status === 200) {
        const data = response?.data?.document;
        setEditDocumentId(data.id);
        setValueEdit('docName', data.docName || '');
        setPreview(data.docPath || null);
      } else {
        toast.error(response?.data?.msg || 'Failed to fetch document');
      }
    } catch (error) {
      toast.error('Failed to fetch document');
    } finally {
      setLoader(false);
    }
  };

  // Update document
  const updateDocument = async (data) => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append('docName', data.docName);
      if (data.file && data.file[0]) {
        formData.append('docPath', data.file[0]);
      }
      formData.append('documentId', editDocumentId);
      const response = await DocumentPutApi(editDocumentId, formData);
      if (response?.data?.status === 'success') {
        toast.success(response?.data?.message);
        fetchDocuments();
        resetEdit();
        setEditDocumentId('');
        setPreview(null);
        const offcanvasElement = document.getElementById('editDocument');
        const offcanvas =
          bootstrap.Offcanvas.getInstance(offcanvasElement) ||
          new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
      } else {
        toast.error(response?.data?.message || 'Failed to update document');
      }
    } catch (error) {
      toast.error('Failed to update document');
    } finally {
      setLoader(false);
    }
  };

  // Delete document
  const handleDelete = (documentId) => {
    setDeleteDocumentId(documentId);
    setIsDeleteConfirmed(false);
  };

  const deleteDocument = async () => {
    if (!isDeleteConfirmed) return;
    setLoader(true);
    try {
      const response = await DocumentDeleteApi(deleteDocumentId);
      if (response?.data?.status === 'success') {
        toast.success(response?.data?.message);
        fetchDocuments();
        setIsDeleteConfirmed(false);
        setDeleteDocumentId('');
        const offcanvasElement = document.getElementById('deleteDocument');
        const offcanvas =
          bootstrap.Offcanvas.getInstance(offcanvasElement) ||
          new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
      } else {
        toast.error(response?.data?.message || 'Failed to delete document');
      }
    } catch (error) {
      toast.error('Failed to delete document');
    } finally {
      setLoader(false);
    }
  };

  const clearForm = () => {
    setDocumentName('');
    setImageFile(null);
    setPreview(null);
    setIsValidDocumentNameRequired(false);
    setIsValidDocumentTypeRequired(false);
    setIsValidFileRequired(false);
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setPageNo(selectedPage);
  };

  return (
    <Container>
      <Toaster />
      {loader && (
        <div className="loader" style={{ position: 'fixed', top: '50%', left: '50%', zIndex: 1000 }}></div>
      )}
      <div className="container-fluid px-0 mt-3">
        <div className="form-container">
          <p className="heading-16 mb-3" style={{ color: '#1a3c34', fontWeight: '700' }}>
            Add New Document
          </p>
          <div className="row row-margin">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="documentTitle"
                  className="form-label heading-14 label-color"
                  data-tooltip="Enter document title (letters only)"
                  aria-label="Document Title"
                >
                  Document Title <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!isValidDocumentNameRequired && docName ? 'valid-indicator' : ''
                    }`}
                  id="documentTitle"
                  placeholder="Enter document title"
                  value={docName}
                  onChange={(e) => handleDocumentName(e.target.value)}
                  tabIndex="1"
                  aria-describedby="documentTitleError"
                />
                {isValidDocumentNameRequired && (
                  <div id="documentTitleError" className="error-message">
                    Valid document title is required
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <label
                  htmlFor="documentFile"
                  className="form-label heading-14 label-color"
                  data-tooltip="Upload a JPG, JPEG, or PNG file"
                  aria-label="Document File"
                >
                  Document File <span style={{ color: '#dc3545' }}>*</span>
                </label>
                <input
                  type="file"
                  className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color"
                  id="documentFile"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png"
                  tabIndex="3"
                  aria-describedby="documentFileError"
                />
                {isValidFileRequired && (
                  <div id="documentFileError" className="error-message">
                    Valid file (JPG, JPEG, PNG) is required
                  </div>
                )}
              </div>
            </div>
            {preview && (
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <img
                    src={preview}
                    alt="Document Preview"
                    style={{ maxWidth: '100%', maxHeight: '100px', marginTop: '10px' }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="row buttons-tops text-center">
            <div className="my-button11 heading-14">
              <button
                type="button"
                className="btn btn-outline-success my-green heading-14 me-1"
                onClick={addDocument}
                disabled={loader}
                tabIndex="4"
                aria-label="Add Document"
              >
                {loader ? (
                  <>
                    <span>Loading</span>
                    <span className="loader"></span>
                  </>
                ) : (
                  'Add Document'
                )}
              </button>
              <button
                type="button"
                className="btn cancelButtons heading-14"
                onClick={clearForm}
                tabIndex="5"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </div>
          <h2 className="heading-16 mb-3" style={{ color: '#1a3c34', fontWeight: '700' }}>
            Document Details
          </h2>
          <div className="table-container table-responsive">
            {documents.length > 0 ?
              <>
                <table className="table table-sm table-striped text-center">
                  <thead>
                    <tr className="heading-16 text-color-000" style={{ fontWeight: '600' }}>
                      <th style={{ width: '100px' }}>Sr no.</th>
                      <th style={{ width: '600px' }}>Document Name</th>
                      <th style={{ width: '100px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody className="heading-14 align-middle greyTextColor">
                    {documents.length > 0 ? (
                      documents.map((doc, index) => (
                        <tr key={doc.id || index} className="heading-14">
                          <td>{(pageNo - 1) * pageSize + index + 1}</td>
                          <td>{doc.docName || 'N/A'}</td>
                          <td>
                            <div className="d-flex">
                              <button
                                className="btn action-btn edit me-2"
                                onClick={() => handleEdit(doc.id)}
                                data-bs-toggle="offcanvas"
                                data-bs-target="#editDocument"
                                tabIndex={6 + index * 2}
                                aria-label={`Edit document ${doc.docName}`}
                              >
                                {/* <Icon icon="tabler:edit" width="1.4em" height="1.4em" /> */}Edit
                              </button>
                              <button
                                className="btn action-btn delete"
                                onClick={() => handleDelete(doc.id)}
                                data-bs-toggle="offcanvas"
                                data-bs-target="#deleteDocument"
                                tabIndex={7 + index * 2}
                                aria-label={`Delete document ${doc.docName}`}
                              >
                                {/* <Icon icon="tabler:trash" width="1.4em" height="1.4em" /> */}Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No documents found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="d-flex" style={{ marginBottom: '10px' }}>
                  <p className="font14">Showing {pageNo} of {totalPages} Pages</p>
                  <div className="ms-auto">
                    <ReactPaginate
                      previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                      nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                      breakLabel="..."
                      breakClassName="break-me"
                      pageCount={totalPages}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={10}
                      onPageChange={handlePageClick}
                      containerClassName="pagination"
                      subContainerClassName="pages pagination"
                      activeClassName="active"
                    />
                  </div>
                </div>
              </>
              :

              <div className="d-flex justify-content-center">
                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className='img-fluid p-5' />
              </div>
            }

          </div>

          {/* Edit Offcanvas */}
          <div
            className="offcanvas offcanvas-end p-2"
            data-bs-backdrop="static"
            tabIndex="-1"
            id="editDocument"
            aria-labelledby="editDocumentLabel"
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
              <h2 className="offcanvas-title heading-16" id="editDocumentLabel">
                Edit Document
              </h2>
            </div>
            <div className="offcanvas-body p-3">
              <form onSubmit={handleSubmitEdit(updateDocument)}>
                <div className="form-group mb-3">
                  <label
                    htmlFor="editDocumentName"
                    className="form-label heading-14 label-color"
                    data-tooltip="Enter document title (letters only)"
                  >
                    Document Title <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${errorsEdit.docName ? 'border-danger' : ''
                      }`}
                    id="editDocumentName"
                    placeholder="Enter document title"
                    {...registerEdit('docName', {
                      required: 'Valid document title is required',
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: 'Document title must contain only letters and spaces',
                      },
                    })}
                  />
                  {errorsEdit.docName && (
                    <div className="error-message">{errorsEdit.docName.message}</div>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label
                    htmlFor="editDocumentFile"
                    className="form-label heading-14 label-color"
                    data-tooltip="Upload a JPG, JPEG, or PNG file (optional)"
                  >
                    Document File
                  </label>
                  <input
                    type="file"
                    className="form-control form-control-sm heading-14 grey-input-text-color input-border-color"
                    id="editDocumentFile"
                    accept=".jpg,.jpeg,.png"
                    {...registerEdit('file')}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Document Preview"
                      style={{ maxWidth: '100%', maxHeight: '100px', marginTop: '10px' }}
                    />
                  )}
                </div>
                <div className="text-center p-3">
                  <button
                    type="submit"
                    className="btn btn-outline-success my-green heading-14 me-2"
                    disabled={!isValidEdit || loader}
                  >
                    Update Document {loader && <span className="loader"></span>}
                  </button>
                  <button
                    type="button"
                    className="btn cancelButtons heading-14"
                    data-bs-dismiss="offcanvas"
                    onClick={() => {
                      resetEdit();
                      setEditDocumentId('');
                      setPreview(null);
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
            id="deleteDocument"
            aria-labelledby="deleteDocumentLabel"
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
              <span className="offcanvas-title heading-16" id="deleteDocumentLabel">
                Delete Document
              </span>
            </div>
            <div className="offcanvas-body p-0">
              <div style={{ zIndex: -1 }}>
                <p className="p-2">Document</p>
                <p className="text-center p-3">
                  <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/errorI.svg" className="img-fluid" alt="Error" />
                </p>
                <p className="text-center heading-16" style={{ color: '#1a3c34', fontWeight: '700' }}>
                  Are you Sure?
                </p>
                <p className="text-center greyTextColor heading-14 pt-2">
                  This action will permanently delete<br />the Document Data
                </p>
                <p className="text-center heading-14 p-2">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    checked={isDeleteConfirmed}
                    id="deleteConfirm"
                    onChange={(e) => setIsDeleteConfirmed(e.target.checked)}
                  />
                  I Agree to delete the Document Data
                </p>
                <p className="text-center p-3">
                  <button
                    className="btn btn-outline-success my-green heading-14"
                    disabled={!isDeleteConfirmed || loader}
                    onClick={deleteDocument}
                  >
                    Delete {loader && <span className="loader"></span>}
                  </button>
                  <button
                    className="btn cancelButtons heading-14 ms-2"
                    data-bs-dismiss="offcanvas"
                    onClick={() => {
                      setIsDeleteConfirmed(false);
                      setDeleteDocumentId('');
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

export default User_Documnt;
