import styled from "styled-components";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Download from "@mui/icons-material/Download";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import ActionControls from "../../../Layouts/ActionControls";
import { Link, useNavigate } from "react-router-dom";
import DataLoader from 'src/Layouts/Loader';
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import {
  getAllRolesApi,
  getDataByRoleIdApi,
  getAllItemCategoryApi,
  getAllProductByCategoryId,
  addIssueApi,
  getAllIssuesApi,
  getIssueByIdApi,
  modifyIssueApi,
} from "../../../Utils/Apis";

const Container = styled.div`
    select:-internal-list-box {
        overflow: visible !important;
        background-color: #00A67E !important;
    }

    .form-select {
        color: var(--greyState);
        box-shadow: none;
        border: 1px solid var(--formInputBorder) !important;
    }

    .mainBreadCrum {
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText {
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText {
        color: var(--breadCrumActiveTextColor);
    }

    .ExportBtns {
        border-radius: 6px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-control::placeholder,
    .form-control,
    .form-select {
        color: var(--greyState);
    }

    .form-control,
    .form-select {
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .contbtn {
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv {
        background-color: #FBFBFB;
    }

    .formdltcheck:checked {
        background-color: #B50000;
        border-color: #B50000;
    }

    .formEditSpecFeatcheck:checked {
        background-color: #00A67E;
        border-color: #00A67E;
    }

    .modalHighborder {
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder {
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .correvtSVG {
        position: relative;
        width: fit-content;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .deleteSVG {
        position: relative;
        width: fit-content;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }
`;

const tableHeadingData = [
  "#",
  "Category",
  "Product",
  "Issue To",
  "User Type",
  "Issue Date",
  "Return Date",
  "Return Status",
  "Action",
];

const ManageIssue = () => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  // State Management
  const [loaderState, setLoaderState] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [issuesData, setIssuesData] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [rolesData, setRolesData] = useState([]);
  const [dataByRoleId, setDataByRoleId] = useState([]);
  const [itemCategoryData, setItemCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);

  // Form instances
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd, isValid: isValidAdd },
    setValue: setValueAdd,
    reset: resetAdd,
    watch: watchAdd,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      userType: '',
      userId: '',
      categoryId: '',
      itemId: '',
      quantity: '',
      issueDate: '',
      returnDate: '',
    },
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit, isValid: isValidEdit },
    setValue: setValueEdit,
    reset: resetEdit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: '',
      quantity: '',
      returnDate: '',
      returnStatus: '',
    },
  });

  const watchUserType = watchAdd('userType');
  const watchCategoryId = watchAdd('categoryId');

  // Fetch initial data
  useEffect(() => {
    getAllRoles();
    getAllItemCategoryData();
    getAllIssues();
  }, []);

  // Fetch staff by role
  useEffect(() => {
    if (watchUserType && typeof watchUserType === 'string' && watchUserType.trim() !== '') {
      getAllDataByRoleId();
    } else {
      setDataByRoleId([]);
    }
  }, [watchUserType]);

  // Fetch products by category
  useEffect(() => {
    if (watchCategoryId && typeof watchCategoryId === 'string' && watchCategoryId.trim() !== '') {
      getAllProductData(watchCategoryId);
    } else {
      setProductData([]);
    }
  }, [watchCategoryId]);

  const getAllRoles = async () => {
    try {
      setLoaderState(true);
      const response = await getAllRolesApi();
      if (response?.status === 200 && response?.data?.status === 'success') {
        setRolesData(response.data.roles || []);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch roles');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
      toast.error('Error fetching roles');
    } finally {
      setLoaderState(false);
    }
  };

  const getAllDataByRoleId = async () => {
    try {
      setLoaderState(true);
      const response = await getDataByRoleIdApi(watchUserType, '', 1, 100);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setDataByRoleId(response.data.staff || []);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch staff data');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
      toast.error('Error fetching staff data');
    } finally {
      setLoaderState(false);
    }
  };

  const getAllItemCategoryData = async () => {
    try {
      setLoaderState(true);
      const response = await getAllItemCategoryApi('', 1, 100);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setItemCategoryData(response.data.itemCategories || []);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch item categories');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
      toast.error('Error fetching item categories');
    } finally {
      setLoaderState(false);
    }
  };

  const getAllProductData = async (categoryId) => {
    try {
      setLoaderState(true);
      const response = await getAllProductByCategoryId(categoryId);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setProductData(response.data.items || []);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch products');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
      toast.error('Error fetching products');
    } finally {
      setLoaderState(false);
    }
  };

  const getAllIssues = async () => {
    try {
      setLoaderState(true);
      const response = await getAllIssuesApi();
      if (response?.status === 200 && response?.data?.status === 'success') {
        setIssuesData(response.data.issues || []);
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      } else {
        toast.error(response?.data?.message || 'Failed to fetch issues');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
      toast.error('Error fetching issues');
    } finally {
      setLoaderState(false);
    }
  };

  const getIssueById = async (id) => {
    try {
      setLoaderState(true);
      const response = await getIssueByIdApi(id);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setSelectedIssue(response.data.issue || null);
        // Prepopulate edit form
        setValueEdit('id', response.data.issue.id);
        setValueEdit('quantity', response.data.issue.quantity);
        setValueEdit('returnDate', response.data.issue.returnDate);
        setValueEdit('returnStatus', response.data.issue.returnStatus);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch issue details');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
      toast.error('Error fetching issue details');
    } finally {
      setLoaderState(false);
    }
  };
  // Add Issue
  const addIssue = async (data) => {
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append("userId", parseInt(data.userId) || 0);
      formData.append("userType", data.userType || '');
      formData.append("categoryId", parseInt(data.categoryId) || 0);
      formData.append("itemId", parseInt(data.itemId) || 0);
      formData.append("quantity", parseInt(data.quantity) || 0);
      formData.append("issueDate", data.issueDate || '');
      formData.append("returnDate", data.returnDate || '');

      const response = await addIssueApi(formData);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success(response.data.message || 'Issue added successfully');
        resetAdd();
        getAllIssues();
        document.getElementById('Add_staticBackdrop').classList.remove('show');
        // Remove backdrop
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      } else {
        toast.error(response?.data?.message || 'Failed to add issue');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
      toast.error('Error adding issue');
    } finally {
      setLoaderState(false);
    }
  };

  // Modify Issue
  const modifyIssue = async (data) => {
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append("id", parseInt(data.id) || 0);
      formData.append("quantity", parseInt(data.quantity) || 0);
      formData.append("returnDate", data.returnDate || '');
      formData.append("returnStatus", data.returnStatus || '');

      const response = await modifyIssueApi(data.id, formData);
      if (response?.status === 200 && response?.data?.status === 'success') {
        document.getElementById('Edit_staticBackdrop').classList.remove('show');
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
        toast.success(response.data.message || 'Issue updated successfully');
        resetEdit();
        getAllIssues();
      } else {
        toast.error(response?.data?.message || 'Failed to update issue');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
      toast.error('Error updating issue');
    } finally {
      setLoaderState(false);
    }
  };

  const openAddCanvas = () => {
    const offcanvasElement = document.getElementById('Add_staticBackdrop');
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
    bsOffcanvas.show();
  };

  const handleViewClick = (id) => {
    getIssueById(id);
  };

  const handleEditClick = (id) => {
    getIssueById(id);
    const offcanvasElement = document.getElementById('Edit_staticBackdrop');
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
    bsOffcanvas.show();
  };

  return (
    <>
      <Container>
        {loaderState && <DataLoader />}
        <Toaster />
        <div className="container-fluid p-4">
          <div className="row pb-3 gap-xl-0 gap-3">
            <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 p-0">
              <nav className="mainBreadCrum font14 ps-0" aria-label="breadcrumb">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <a href="/" className="bredcrumText text-decoration-none">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/admin/inventory" className="bredcrumText text-decoration-none">Inventory</a>
                  </li>
                  <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Issue</li>
                </ol>
              </nav>
              <p className="font14 ps-0 fontWeight500">Issue Details</p>
            </div>
            <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
              <ActionControls
                showAddButton={true}
                addButtonText="Add Issue"
                addButtonAction={openAddCanvas}
                showSearch={false}
                searchAction={''}
                showExportPDF={false}
                exportPDFText="Export PDF"
                exportPDFAction={''}
                exportPDFFileName="Issues.pdf"
                showExportCSV={false}
                exportCSVText="Export XLSX"
                exportCSVAction={''}
                exportCSVFileName="Issues.xlsx"
              />
            </div>
          </div>

          <div className="row pb-3">
            <div className="bg-white rounded-2 p-3">
              {issuesData.length > 0 ? (
                <div className="overflow-scroll">
                  <table className="table align-middle table-striped">
                    <thead>
                      <tr>
                        {tableHeadingData.map((item, index) => (
                          <th key={index} className={`textWrapClass font14 ${item === 'Action' ? 'text-end' : 'text-center'}`}>
                            {item}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {issuesData.map((item, index) => (
                        <tr key={item.id} className="align-middle">
                          <td className="textWrapClass greyText font14">{index + 1}</td>
                          <td className="textWrapClass greyText font14">{item.categoryName}</td>
                          <td className="textWrapClass greyText font14">{item.itemName}</td>
                          <td className="textWrapClass greyText font14">{item.issueTo}</td>
                          <td className="textWrapClass greyText font14">{item.userType}</td>
                          <td className="textWrapClass greyText font14">{item.issueDate}</td>
                          <td className="textWrapClass greyText font14">{item.returnDate}</td>
                          <td className="textWrapClass greyText font14">{item.returnStatus}</td>
                          <td className="text-end">
                            <span
                              className="ps-4 greyText"
                              data-bs-toggle="modal"
                              data-bs-target="#viewDetails"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleViewClick(item.id)}
                            >
                              <RemoveRedEyeOutlinedIcon />
                            </span>
                            <span
                              className="ps-4 greyText"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#Edit_staticBackdrop"
                              aria-controls="Edit_staticBackdrop"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEditClick(item.id)}
                            >
                              <DriveFileRenameOutlineOutlinedIcon />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="d-flex justify-content-center p-5 m-5">
                  <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className="img-fluid p-5" />
                </div>
              )}
            </div>
          </div>

          {/* View Modal */}
          <div className="modal modal-lg fade" id="viewDetails" tabIndex="-1" aria-labelledby="viewDetailsLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header p-2 px-3">
                  <h2 className="modal-title" id="viewDetailsLabel">View Issue</h2>
                  <div className="d-flex align-items-center py-2">
                    {/* <button className="btn greyText" type="button">
                      <Download />
                    </button> */}
                    <button type="button" className="btn-close greyText" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                </div>
                <div className="modal-body p-0">
                  <div className="container-fluid bgGreen p-4">
                    {selectedIssue ? (
                      <>
                        <div className="row">
                          <div className="col-6">
                            <div className="row">
                              <div className="col-5"><span>User Type</span></div>
                              <div className="col-2"><span>:</span></div>
                              <div className="col-5"><span>{selectedIssue.userType}</span></div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row">
                              <div className="col-5"><span>Category</span></div>
                              <div className="col-2"><span>:</span></div>
                              <div className="col-5"><span>{selectedIssue.categoryName}</span></div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-6">
                            <div className="row">
                              <div className="col-5"><span>Issue To</span></div>
                              <div className="col-2"><span>:</span></div>
                              <div className="col-5"><span>{selectedIssue.issueTo}</span></div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row">
                              <div className="col-5"><span>Product</span></div>
                              <div className="col-2"><span>:</span></div>
                              <div className="col-5"><span>{selectedIssue.itemName}</span></div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-6">
                            <div className="row">
                              <div className="col-5"><span>Quantity</span></div>
                              <div className="col-2"><span>:</span></div>
                              <div className="col-5"><span>{selectedIssue.quantity}</span></div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row">
                              <div className="col-5"><span>Issue Date</span></div>
                              <div className="col-2"><span>:</span></div>
                              <div className="col-5"><span>{selectedIssue.issueDate}</span></div>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-2">
                          <div className="col-6">
                            <div className="row">
                              <div className="col-5"><span>Return Date</span></div>
                              <div className="col-2"><span>:</span></div>
                              <div className="col-5"><span>{selectedIssue.returnDate}</span></div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="row">
                              <div className="col-5"><span>Return Status</span></div>
                              <div className="col-2"><span>:</span></div>
                              <div className="col-5"><span>{selectedIssue.returnStatus}</span></div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-5">No issue data available</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Offcanvas */}
          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Add_staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header border-bottom border-2 p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">Issue Add</h2>
            </div>
            <div className="offcanvas-body p-3">
              <form onSubmit={handleSubmitAdd(addIssue)}>
                <div className="mb-3">
                  <label htmlFor="userTypeAdd" className="form-label font14">
                    User Type <span className="text-danger">*</span>
                  </label>
                  <select
                    id="userTypeAdd"
                    className={`form-select font14 ${errorsAdd.userType ? 'border-danger' : ''}`}
                    {...registerAdd('userType', { required: 'User Type is required *' })}
                  >
                    <option value="">--- Choose ---</option>
                    {rolesData.map((role) => (
                      <option key={role.roleId} value={role.roleId}>
                        {role.roleName}
                      </option>
                    ))}
                  </select>
                  {errorsAdd.userType && <p className="font12 text-danger">{errorsAdd.userType.message}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="userIdAdd" className="form-label font14">
                    Issue To <span className="text-danger">*</span>
                  </label>
                  <select
                    id="userIdAdd"
                    className={`form-select font14 ${errorsAdd.userId ? 'border-danger' : ''}`}
                    {...registerAdd('userId', { required: 'Issue To is required *' })}
                  >
                    <option value="">--- Choose ---</option>
                    {dataByRoleId.length > 0 ? (
                      dataByRoleId.map((staff) => (
                        <option key={staff.id} value={staff.id}>
                          {staff.staffName}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        {watchUserType ? '-- No Staff Found --' : '-- Select User Type First --'}
                      </option>
                    )}
                  </select>
                  {errorsAdd.userId && <p className="font12 text-danger">{errorsAdd.userId.message}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="categoryIdAdd" className="form-label font14">
                    Category <span className="text-danger">*</span>
                  </label>
                  <select
                    id="categoryIdAdd"
                    className={`form-select font14 ${errorsAdd.categoryId ? 'border-danger' : ''}`}
                    {...registerAdd('categoryId', { required: 'Category is required *' })}
                  >
                    <option value="">--- Choose ---</option>
                    {itemCategoryData.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errorsAdd.categoryId && <p className="font12 text-danger">{errorsAdd.categoryId.message}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="itemIdAdd" className="form-label font14">
                    Product <span className="text-danger">*</span>
                  </label>
                  <select
                    id="itemIdAdd"
                    className={`form-select font14 ${errorsAdd.itemId ? 'border-danger' : ''}`}
                    {...registerAdd('itemId', { required: 'Product is required *' })}
                  >
                    <option value="">--- Choose ---</option>
                    {productData.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.itemName}
                      </option>
                    ))}
                  </select>
                  {errorsAdd.itemId && <p className="font12 text-danger">{errorsAdd.itemId.message}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="quantityAdd" className="form-label font14">
                    Quantity <span className="text-danger">*</span>
                  </label>
                  <input
                    id="quantityAdd"
                    type="text"
                    className={`form-control font14 ${errorsAdd.quantity ? 'border-danger' : ''}`}
                    placeholder="Enter Quantity"
                    {...registerAdd('quantity', {
                      required: 'Quantity is required *',
                      pattern: {
                        value: /^[0-9]+$/, // only digits allowed
                        message: "Only numbers are allowed",
                      },
                      min: { value: 1, message: "Quantity must be at least 1" },
                      validate: (value) =>
                        Number.isInteger(Number(value)) || "Quantity must be an integer",
                    })}
                  />
                  {errorsAdd.quantity && <p className="font12 text-danger">{errorsAdd.quantity.message}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="issueDateAdd" className="form-label font14">
                    Issue Date <span className="text-danger">*</span>
                  </label>
                  <input
                    id="issueDateAdd"
                    type="date"
                    className={`form-control font14 ${errorsAdd.issueDate ? 'border-danger' : ''}`}
                    {...registerAdd('issueDate', {
                      required: 'Issue Date is required *',
                    })}
                  />
                  {errorsAdd.issueDate && <p className="font12 text-danger">{errorsAdd.issueDate.message}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="returnDateAdd" className="form-label font14">
                    Return Date <span className="text-danger">*</span>
                  </label>
                  <input
                    id="returnDateAdd"
                    type="date"
                    className={`form-control font14 ${errorsAdd.returnDate ? 'border-danger' : ''}`}
                    {...registerAdd('returnDate', {
                      required: 'Return Date is required *',
                    })}
                  />
                  {errorsAdd.returnDate && <p className="font12 text-danger">{errorsAdd.returnDate.message}</p>}
                </div>
                <p className="text-center p-3">
                  <button className="btn addButtons2 font14 text-white me-2" type="submit" disabled={!isValidAdd}>
                    Add Issue
                  </button>
                  <button
                    className="btn cancelButtons font14"
                    type="button"
                    data-bs-dismiss="offcanvas"
                    onClick={() => resetAdd()}
                  >
                    Cancel
                  </button>
                </p>
              </form>
            </div>
          </div>

          {/* Edit Offcanvas */}
          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header border-bottom border-2 p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">Issue Edit</h2>
            </div>
            <div className="offcanvas-body p-3">
              <form onSubmit={handleSubmitEdit(modifyIssue)}>
                <input type="hidden" {...registerEdit('id')} />
                <div className="mb-3">
                  <label htmlFor="quantityEdit" className="form-label font14">
                    Quantity <span className="text-danger">*</span>
                  </label>
                  <input
                    id="quantityEdit"
                    type="text"
                    className={`form-control font14 ${errorsEdit.quantity ? 'border-danger' : ''}`}
                    placeholder="Enter Quantity"
                    {...registerEdit('quantity', {
                      required: 'Quantity is required *',
                      pattern: {
                        value: /^[0-9]+$/, // only digits allowed
                        message: "Only numbers are allowed",
                      },
                      min: { value: 1, message: "Quantity must be at least 1" },
                      validate: (value) =>
                        Number.isInteger(Number(value)) || "Quantity must be an integer",
                    })}
                  />
                  {errorsEdit.quantity && <p className="font12 text-danger">{errorsEdit.quantity.message}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="returnDateEdit" className="form-label font14">
                    Return Date <span className="text-danger">*</span>
                  </label>
                  <input
                    id="returnDateEdit"
                    type="date"
                    className={`form-control font14 ${errorsEdit.returnDate ? 'border-danger' : ''}`}
                    {...registerEdit('returnDate', {
                      required: 'Return Date is required *',
                    })}
                  />
                  {errorsEdit.returnDate && <p className="font12 text-danger">{errorsEdit.returnDate.message}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="returnStatusEdit" className="form-label font14">
                    Return Status <span className="text-danger">*</span>
                  </label>
                  <select
                    id="returnStatusEdit"
                    className={`form-select font14 ${errorsEdit.returnStatus ? 'border-danger' : ''}`}
                    {...registerEdit('returnStatus', { required: 'Return Status is required *' })}
                  >
                    <option value="">--- Choose ---</option>
                    <option value="ISSUED">ISSUED</option>
                    <option value="PARTIALLY_RETURNED">PARTIALLY_RETURNED</option>
                    <option value="RETURNED">RETURNED</option>
                  </select>
                  {errorsEdit.returnStatus && <p className="font12 text-danger">{errorsEdit.returnStatus.message}</p>}
                </div>
                <p className="text-center p-3">
                  <button className="btn addButtons2 font14 text-white me-2" type="submit" disabled={!isValidEdit}>
                    Edit Issue
                  </button>
                  <button
                    className="btn cancelButtons font14"
                    type="button"
                    data-bs-dismiss="offcanvas"
                    onClick={() => resetEdit()}
                  >
                    Cancel
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ManageIssue;
