import styled from "styled-components";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Download from "@mui/icons-material/Download";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import ActionControls from "../../../Layouts/ActionControls";
import { Offcanvas } from "bootstrap";
import { Link, useNavigate } from "react-router-dom";
import DataLoader from 'src/Layouts/Loader';
import { useForm } from "react-hook-form";
import { addNewWarehouseApi, getAllRolesApi, getAllWarehouseApi, getByIdWarehouseApi, getDataByRoleIdApi, updateByIdWarehouseApi, deleteByIdWarehouseApi } from "../../../Utils/Apis";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

const Container = styled.div`
    
    select:-internal-list-box{
        overflow: visible !important;
        background-color: #00A67E !important;
    }

    .form-select{
        color: var(--greyState);
        box-shadow: none;
        border: 1px solid var(--formInputBorder) !important;
    }
    
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ExportBtns{
        border-radius: 6px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
    }

    .formEditSpecFeatcheck:checked{
        background-color: #00A67E;
        border-color: #00A67E;
    }

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .deleteSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }
`;

const tableHeadingData = [
  "#",
  "Name",
  "Warehouse Keeper",
  "Email",
  "Phone",
  "Address",
  "Action",
];

const ManageWareHouse = () => {
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  // State Management
  const [loaderState, setLoaderState] = useState(false);
  const [WarehouseData, setWarehouseData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [pdfResponse, setPDFResponse] = useState(null);
  const [searchInputVal, setSearchInputVal] = useState('');
  const [editWarehouseId, setEditWarehouseId] = useState('');
  const [delWarehouseId, setDelWarehouseId] = useState('');
  const [viewWarehouse, setViewWarehouse] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [initialFormValues, setInitialFormValues] = useState({});
  const [RolesData, setRolesData] = useState([]);
  const [DataByRoleId, setDataByRoleId] = useState([]);

  const openAddCanvas = () => {
    const offcanvasElement = document.getElementById('add_staticBackdrop');
    if (offcanvasElement) {
      let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (!offcanvas) {
        offcanvas = new bootstrap.Offcanvas(offcanvasElement);
      }
      offcanvas.show();
    }
  };

  const openEditCanvas = async (id) => {
    setLoaderState(true);
    try {
      await getWarehouseDataById(id);
      setTimeout(() => {
        const offcanvasElement = document.getElementById('Edit_staticBackdrop');
        if (offcanvasElement) {
          let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
          if (!offcanvas) {
            offcanvas = new bootstrap.Offcanvas(offcanvasElement);
          }
          offcanvas.show();
        }
      }, 0);
    } catch (error) {
      toast.error('Failed to load warehouse data');
    } finally {
      setLoaderState(false);
    }
  };

  // Form instances
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd, isValid: isValidAdd },
    setValue: setValueAdd,
    reset: resetAdd,
    watch: addWatch
  } = useForm({
    mode: 'onChange',
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit, isValid: isValidEdit },
    setValue: setValueUpdate,
    reset: resetEdit,
    watch: editWatch
  } = useForm({
    mode: 'onChange',
  });

  const watchAddRole = addWatch('role');
  const watchEditRole = editWatch('role');

  // Fetch All Warehouses
  useEffect(() => {
    getAllWarehouseData(searchInputVal);
    getAllRoles();
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));
    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
  }, [token, pageNo, pageSize]);

  useEffect(() => {
    if (watchAddRole && typeof watchAddRole === 'string' && watchAddRole.trim() !== '') {
      getAllDataByRoleId(watchAddRole);
    }
  }, [watchAddRole]);

  useEffect(() => {
    if (watchEditRole && typeof watchEditRole === 'string' && watchEditRole.trim() !== '') {
      getAllDataByRoleId(watchEditRole);
    }
  }, [watchEditRole]);

  const getAllWarehouseData = async (search = '') => {
    try {
      setLoaderState(true);
      const response = await getAllWarehouseApi(search, pageNo, pageSize);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setWarehouseData(response.data.warehouses || []);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(response.data.currentPage || 1);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch warehouses');
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
      toast.error('Error fetching warehouses');
    } finally {
      setLoaderState(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchInputVal(value);
    setPageNo(1); // Reset to first page on search change
  };

  // Fetch Warehouse by ID for Editing
  const getWarehouseDataById = async (id) => {
    try {
      setLoaderState(true);
      setEditWarehouseId(id);
      const response = await getByIdWarehouseApi(id);
      if (response?.status === 200 && response?.data?.status === 'success') {
        const data = response.data.warehouse;
        await getAllDataByRoleId(data.roleType);
        // Use reset to populate the form after async data load
        resetEdit({
          warehouseName: data.warehouseName,
          role: String(data.roleType),
          warehouseKeeper: String(data.warehouseKeeperId),
          warehouseKeeperName: data.warehouseKeeperName || '',
          email: data.keeperEmail || '',
          phoneNumber: data.keeperPhone || '',
          address: data.keeperAddress || '',
          description: data.description || '',
        });
        setInitialFormValues({
          warehouseName: data.warehouseName,
          role: String(data.roleType),
          warehouseKeeper: String(data.warehouseKeeperId),
          email: data.keeperEmail || '',
          phoneNumber: data.keeperPhone || '',
          address: data.keeperAddress || '',
          description: data.description || '',
          warehouseKeeperName: data.warehouseKeeperName || '',
        });
      } else {
        toast.error(response?.data?.message || 'Failed to fetch Warehouse');
      }
    } catch (error) {
      toast.error('Error fetching Warehouse');
    } finally {
      setLoaderState(false);
    }
  };

  // Fetch Warehouse by ID for Viewing
  const getWarehouseForView = async (id) => {
    try {
      setLoaderState(true);
      const response = await getByIdWarehouseApi(id);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setViewWarehouse(response.data.warehouse);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch Warehouse');
      }
    } catch (error) {
      toast.error('Error fetching Warehouse');
    } finally {
      setLoaderState(false);
    }
  };

  const getAllRoles = async () => {
    try {
      setLoaderState(true);
      const response = await getAllRolesApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setLoaderState(false);
          setRolesData(response?.data?.roles);
        } else {
          setLoaderState(false);
          toast.error(response?.data?.message || 'Failed to fetch roles');
        }
      } else {
        setLoaderState(false);
        toast.error(response?.data?.message || 'Failed to fetch roles');
      }
    } catch (error) {
      setLoaderState(false);
      toast.error('Error fetching roles');
    }
    finally {
      setLoaderState(false);
    }
  };

  const getAllDataByRoleId = async (roleId) => {
    try {
      setLoaderState(true);
      const response = await getDataByRoleIdApi(roleId, '', '', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setLoaderState(false);
          const staffData = response?.data?.staff || [];
          setDataByRoleId(staffData);
          // Log to debug
          console.log('DataByRoleId:', staffData);
        } else {
          setLoaderState(false);
          toast.error(response?.data?.message || 'Failed to fetch staff data');
        }
      } else {
        setLoaderState(false);
        toast.error(response?.data?.message || 'Failed to fetch staff data');
      }
    } catch (error) {
      setLoaderState(false);
      toast.error('Error fetching staff data');
      console.error('Error in getAllDataByRoleId:', error);
    }
    finally {
      setLoaderState(false);
    }
  };

  // Add New Warehouse
  const addNewWarehouse = async (data) => {
    try {
      setLoaderState(true);
      console.log('Form Data:', data); // Debug form data
      const rawJson = {
        warehouseName: data.warehouseName || '',
        roleType: data.role || '',
        warehouseKeeperId: parseInt(data.warehouseKeeper) || '',
        warehouseKeeperName: data.warehouseKeeperName || '',
        keeperEmail: data.email || '',
        keeperPhone: data.phoneNumber || '',
        keeperAddress: data.address || '',
        description: data.description || '',
      };
      console.log('Payload:', rawJson); // Debug payload
      const response = await addNewWarehouseApi(rawJson);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success(response.data.message);
        getAllWarehouseData(searchInputVal);
        resetAdd();
        const offcanvasElement = document.getElementById('add_staticBackdrop');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
        offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
          const backdrop = document.querySelector('.offcanvas-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }, { once: true });
      } else {
        toast.error(response?.data?.message || 'Failed to add Warehouse');
      }
    } catch (error) {
      toast.error('Error adding Warehouse');
      console.error('Error in addNewWarehouse:', error);
    } finally {
      setLoaderState(false);
    }
  };

  // Update Warehouse
  const updateWarehouse = async (data) => {
    try {
      setLoaderState(true);
      const rawJson = {
        warehouseName: data.warehouseName || '',
        roleType: data.role || '',
        warehouseKeeperId: parseInt(data.warehouseKeeper) || '',
        warehouseKeeperName: data.warehouseKeeperName || '',
        keeperEmail: data.email || '',
        keeperPhone: data.phoneNumber || '',
        keeperAddress: data.address || '',
        description: data.description || '',
      };

      const response = await updateByIdWarehouseApi(editWarehouseId, rawJson);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success(response.data.message);
        getAllWarehouseData(searchInputVal);
        resetEdit();
        setInitialFormValues({});
        const offcanvasElement = document.getElementById('Edit_staticBackdrop');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
        offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
          const backdrop = document.querySelector('.offcanvas-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }, { once: true });
      } else {
        toast.error(response?.data?.message || 'Failed to update Warehouse');
        Object.keys(initialFormValues).forEach(key => setValueUpdate(key, initialFormValues[key]));
      }
    } catch (error) {
      toast.error('Error updating Warehouse');
      Object.keys(initialFormValues).forEach(key => setValueUpdate(key, initialFormValues[key]));
    } finally {
      setLoaderState(false);
    }
  };

  // Delete Warehouse
  const deleteWarehouseById = async (id) => {
    if (!isChecked) return;
    try {
      setLoaderState(true);
      const response = await deleteByIdWarehouseApi(id);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success(response.data.message);
        getAllWarehouseData(searchInputVal);
        setIsChecked(false);
        const offcanvasElement = document.getElementById('Delete_staticBackdrop');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement) || new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
        offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
          const backdrop = document.querySelector('.offcanvas-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }, { once: true });
      } else {
        toast.error(response?.data?.message || 'Failed to delete Warehouse');
      }
    } catch (error) {
      toast.error('Error deleting Warehouse');
    } finally {
      setLoaderState(false);
    }
  };

  return (
    <Container>
      {loaderState && <DataLoader />}
      <div className="container-fluid p-4">
        <div className="row pb-3 gap-xl-0 gap-3">
          <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 p-0">
            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                <li className="breadcrumb-item"><a href="/admin/inventory/itemsupplier" className='bredcrumText text-decoration-none'>Inventory</a></li>
                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Warehouse</li>
              </ol>
            </nav>
            <p className='font14 ps-0 fontWeight500'>Warehouse</p>
          </div>
          <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
            <ActionControls
              showAddButton={true}
              addButtonText="Add Warehouse"
              addButtonAction={openAddCanvas}
              showSearch={true}
              searchAction={handleSearchChange}
              // showExportPDF={WarehouseData.length > 0}
              showExportPDF={false}
              exportPDFText="Export PDF"
              exportPDFAction={''}
              exportPDFFileName="Warehouse.pdf"
              // showExportCSV={WarehouseData.length > 0}
              showExportCSV={false}
              exportCSVText="Export XLSX"
              exportCSVAction={''}
              exportCSVFileName="Warehouse.xlsx"
            />
          </div>
        </div>

        <div className="row pb-3">
          <div className="bg-white rounded-2 p-3">
            {WarehouseData.length > 0 ? (
              <div className="overflow-scroll">
                <table className="table align-middle table-striped">
                  <thead>
                    <tr>
                      {tableHeadingData.map((item) => (
                        <th key={item} className={`textWrapClass font14 text-start ${item === "Action" && 'text-end'}`}>{item}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {WarehouseData.map((item, index) => (
                      <tr key={item.id} className='align-middle'>
                        <td className='textWrapClass greyText font14'>{index + 1}</td>
                        <td className='textWrapClass greyText font14'>{item.warehouseName}</td>
                        <td className='textWrapClass greyText font14'>{item.warehouseKeeperName}</td>
                        <td className='textWrapClass greyText font14'>{item.keeperEmail}</td>
                        <td className='textWrapClass greyText font14'>{item.keeperPhone}</td>
                        <td className='textWrapClass greyText font14'>{item.keeperAddress}</td>
                        <td className='text-end'>
                          <span className="ps-4 greyText" data-bs-toggle="modal" data-bs-target="#viewDetails" style={{ cursor: "pointer" }} onClick={() => getWarehouseForView(item.id)}><RemoveRedEyeOutlinedIcon className="viewIcon"/></span>
                          <span
                            className="ps-4 greyText"
                            style={{ cursor: "pointer" }}
                            onClick={() => openEditCanvas(item.id)}
                          >
                            <DriveFileRenameOutlineOutlinedIcon className="editIcon"/>
                          </span>
                          <span className="ps-4 greyText" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" style={{ cursor: "pointer" }} onClick={() => setDelWarehouseId(item.id)}><DeleteOutlinedIcon  className="deleteIcon"/></span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="d-flex justify-content-center p-5 m-5">
                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className='img-fluid p-5' />
              </div>
            )}
          </div>
        </div>

        {/* View */}
        <div className="modal modal-lg fade" id="viewDetails" tabIndex="-1" aria-labelledby="viewDetailsLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header p-2 px-3">
                <h2 className="modal-title" id="viewDetailsLabel">View Warehouse</h2>
                <div className="d-flex align-items-center">
                  {/* <button className="btn greyText" type="button"><Download /></button> */}
                  <button type="button" className="btn-close greyText" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              </div>
              <div className="modal-body p-0">
                <div className="container-fluid bgGreen p-4">
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Name</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5">
                          <span>
                            {viewWarehouse?.warehouseName.length > 13 ? (
                              <>
                                <span className='me-2'>{viewWarehouse?.warehouseName.substring(0, 13) + "..."}</span>
                                <button
                                  className='btn p-0'
                                  type='button'
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-title={viewWarehouse.warehouseName}
                                >
                                  <Icon
                                    className='mb-2 viewIcon'
                                    icon="ph:info-fill"
                                    width="1.2em"
                                    height="1.2em"
                                    // style={{ color: '#C1C1C1' }}

                                  />
                                </button>
                              </>
                            ) : (
                              <span>{viewWarehouse?.warehouseName}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Warehouse Keeper</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5">
                          <span>
                            {viewWarehouse?.warehouseKeeperName.length > 13 ? (
                              <>
                                <span className='me-2'>{viewWarehouse?.warehouseKeeperName.substring(0, 13) + "..."}</span>
                                <button
                                  className='btn p-0'
                                  type='button'
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-title={viewWarehouse?.warehouseKeeperName}
                                >
                                  <Icon
                                    className='mb-2'
                                    icon="ph:info-fill"
                                    width="1.2em"
                                    height="1.2em"
                                    style={{ color: '#C1C1C1' }}
                                  />
                                </button>
                              </>
                            ) : (
                              <span>{viewWarehouse?.warehouseKeeperName}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Email</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5">
                          <span>
                            {viewWarehouse?.keeperEmail.length > 13 ? (
                              <>
                                <span className='me-2'>{viewWarehouse?.keeperEmail.substring(0, 13) + "..."}</span>
                                <button
                                  className='btn p-0'
                                  type='button'
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-title={viewWarehouse?.keeperEmail}
                                >
                                  <Icon
                                    className='mb-2'
                                    icon="ph:info-fill"
                                    width="1.2em"
                                    height="1.2em"
                                    style={{ color: '#C1C1C1' }}
                                  />
                                </button>
                              </>
                            ) : (
                              <span>{viewWarehouse?.keeperEmail}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Phone</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5">
                          <span>
                            {viewWarehouse?.keeperPhone.length > 13 ? (
                              <>
                                <span className='me-2'>{viewWarehouse?.keeperPhone.substring(0, 13) + "..."}</span>
                                <button
                                  className='btn p-0'
                                  type='button'
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-title={viewWarehouse?.keeperPhone}
                                >
                                  <Icon
                                    className='mb-2'
                                    icon="ph:info-fill"
                                    width="1.2em"
                                    height="1.2em"
                                    style={{ color: '#C1C1C1' }}
                                  />
                                </button>
                              </>
                            ) : (
                              <span>{viewWarehouse?.keeperPhone}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Address</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5">
                          <span>
                            {viewWarehouse?.keeperAddress.length > 13 ? (
                              <>
                                <span className='me-2'>{viewWarehouse?.keeperAddress.substring(0, 13) + "..."}</span>
                                <button
                                  className='btn p-0'
                                  type='button'
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  data-bs-title={viewWarehouse?.keeperAddress}
                                >
                                  <Icon
                                    className='mb-2'
                                    icon="ph:info-fill"
                                    width="1.2em"
                                    height="1.2em"
                                    style={{ color: '#C1C1C1' }}
                                  />
                                </button>
                              </>
                            ) : (
                              <span>{viewWarehouse?.keeperAddress}</span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add */}
        <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="add_staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div className="offcanvas-header border-bottom border-2 p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
            </Link>
            <h2 className="offcanvas-title" id="staticBackdropLabel">Warehouse Add</h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitAdd(addNewWarehouse)}>
              <div className="mb-3">
                <label htmlFor="warehouseNameAdd" className="form-label font14">
                  Warehouse Name <span className='text-danger'>*</span>
                </label>
                <input
                  id="warehouseNameAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.warehouseName ? 'border-danger' : ''}`}
                  placeholder="Enter Warehouse Name"
                  {...registerAdd('warehouseName', {
                    required: 'Title is required *',
                    validate: {
                      startsWithUppercase: (value) => /^[A-Z]/.test(value) || 'Warehouse Name must start with an uppercase letter',
                      minLength: (value) => value.length >= 4 || 'Minimum Length is 4',
                      validChars: (value) => /^[a-zA-Z\s'-]+$/.test(value) || 'Invalid Characters in Warehouse Name',
                    },
                  })}
                />
                {errorsAdd.warehouseName && <p className="font12 text-danger">{errorsAdd.warehouseName.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="roleAdd" className="form-label font14">
                  Role <span className='text-danger'>*</span>
                </label>
                <select
                  id="roleAdd"
                  className={`form-select font14 ${errorsAdd.role ? 'border-danger' : ''}`}
                  {...registerAdd('role', { required: 'Role is required *' })}
                >
                  <option value="">--- Choose ---</option>
                  {RolesData?.map((role) => (
                    <option key={role.roleId} value={String(role.roleId)}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
                {errorsAdd.role && <p className="font12 text-danger">{errorsAdd.role.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="warehouseKeeperAdd" className="form-label font14">
                  Warehouse Keeper <span className='text-danger'>*</span>
                </label>
                <select
                  id="warehouseKeeperAdd"
                  className={`form-select font14 ${errorsAdd.warehouseKeeper ? 'border-danger' : ''}`}
                  {...registerAdd('warehouseKeeper', { required: 'Warehouse Keeper is required *' })}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const selectedStaff = DataByRoleId.find((staff) => String(staff.id) === selectedId);
                    console.log('Selected ID:', selectedId, 'Selected Staff:', selectedStaff); // Debug
                    setValueAdd('warehouseKeeperName', selectedStaff ? selectedStaff.staffName : '');
                  }}
                >
                  <option value="">--- Choose ---</option>
                  {DataByRoleId.length > 0 ? (
                    DataByRoleId.map((staff) => (
                      <option key={staff.id} value={String(staff.id)}>
                        {staff.staffName}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      {watchAddRole ? '-- No Staff Found --' : '-- Select Role First --'}
                    </option>
                  )}
                </select>
                {errorsAdd.warehouseKeeper && <p className="font12 text-danger">{errorsAdd.warehouseKeeper.message}</p>}
              </div>
              <input
                type="hidden"
                {...registerAdd('warehouseKeeperName')}
              />
              <div className="mb-3">
                <label htmlFor="emailAdd" className="form-label font14">
                  Email <span className='text-danger'>*</span>
                </label>
                <input
                  id="emailAdd"
                  type="email"
                  className={`form-control font14 ${errorsAdd.email ? 'border-danger' : ''}`}
                  placeholder="Enter Email Id"
                  {...registerAdd('email', {
                    required: 'Email is required *',
                    validate: (value) =>
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Not a valid email format',
                  })}
                />
                {errorsAdd.email && <p className="font12 text-danger">{errorsAdd.email.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumberAdd" className="form-label font14">
                  Phone Number <span className='text-danger'>*</span>
                </label>
                <input
                  id="phoneNumberAdd"
                  type="tel"
                  className={`form-control font14 ${errorsAdd.phoneNumber ? 'border-danger' : ''}`}
                  placeholder="Enter Phone Number"
                  {...registerAdd('phoneNumber', {
                    required: 'Phone Number is required *',
                    validate: (value) => {
                      if (!value) return 'Phone Number is required *';
                      if (!/^[6-9][0-9]{9}$/.test(value)) {
                        return 'Phone number must start with 6, 7, 8, or 9 and be exactly 10 digits';
                      }
                      return true;
                    },
                  })}
                />
                {errorsAdd.phoneNumber && <p className="font12 text-danger">{errorsAdd.phoneNumber.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="addressAdd" className="form-label font14">
                  Address <span className='text-danger'>*</span>
                </label>
                <input
                  id="addressAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.address ? 'border-danger' : ''}`}
                  placeholder="Enter Address"
                  {...registerAdd('address', {
                    required: 'Address is required *',
                    validate: (value) => {
                      if (!value) return 'Address is required *';
                      if (value.length < 4) return 'Minimum length is 4 characters';
                      if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) {
                        return 'Address must contain only letters, digits, and spaces, with allowed punctuation (, . \' -)';
                      }
                      return true;
                    },
                  })}
                />
                {errorsAdd.address && <p className="font12 text-danger">{errorsAdd.address.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionAdd" className="form-label font14">
                  Description
                </label>
                <input
                  id="descriptionAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.description ? 'border-danger' : ''}`}
                  placeholder="Enter Description"
                  {...registerAdd('description', {
                    validate: (value) =>
                      !value ||
                      (/^[A-Z]/.test(value) || 'Description must start with an uppercase letter') &&
                      (value.length >= 4 || 'Minimum Length is 4') &&
                      (/^[a-zA-Z\s'-]+$/.test(value) || 'Invalid Characters in Description'),
                  })}
                />
                {errorsAdd.description && (
                  <p className="font12 text-danger">{errorsAdd.description.message}</p>
                )}
              </div>
              <p className="text-center p-3">
                <button className="btn addButtons2 font14 text-white me-2" type="submit" disabled={!isValidAdd}>
                  Add Warehouse
                </button>
                <button
                  className="btn cancelButtons font14"
                  type="button"
                  data-bs-dismiss="offcanvas"
                  onClick={() => {
                    resetAdd();
                  }}
                >
                  Cancel
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* Edit */}
        <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div className="offcanvas-header border-bottom border-2 p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
            </Link>
            <h2 className="offcanvas-title" id="staticBackdropLabel">Warehouse Edit</h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitEdit(updateWarehouse)}>
              <div className="mb-3">
                <label htmlFor="warehouseNameEdit" className="form-label font14">
                  Warehouse Name <span className='text-danger'>*</span>
                </label>
                <input
                  id="warehouseNameEdit"
                  type="text"
                  className={`form-control font14 ${errorsEdit.warehouseName ? 'border-danger' : ''}`}
                  placeholder="Enter Warehouse Name"
                  {...registerEdit('warehouseName', {
                    required: 'Title is required *',
                    validate: {
                      startsWithUppercase: (value) => /^[A-Z]/.test(value) || 'Warehouse Name must start with an uppercase letter',
                      minLength: (value) => value.length >= 4 || 'Minimum Length is 4',
                      validChars: (value) => /^[a-zA-Z\s'-]+$/.test(value) || 'Invalid Characters in Warehouse Name',
                    },
                  })}
                />
                {errorsEdit.warehouseName && <p className="font12 text-danger">{errorsEdit.warehouseName.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="roleEdit" className="form-label font14">
                  Role <span className='text-danger'>*</span>
                </label>
                <select
                  id="roleEdit"
                  className={`form-select font14 ${errorsEdit.role ? 'border-danger' : ''}`}
                  {...registerEdit('role', { required: 'Role is required *' })}
                >
                  <option value="">--- Choose ---</option>
                  {RolesData?.map((role) => (
                    <option key={role.roleId} value={String(role.roleId)}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
                {errorsEdit.role && <p className="font12 text-danger">{errorsEdit.role.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="warehouseKeeperEdit" className="form-label font14">
                  Warehouse Keeper <span className='text-danger'>*</span>
                </label>
                <select
                  id="warehouseKeeperEdit"
                  className={`form-select font14 ${errorsEdit.warehouseKeeper ? 'border-danger' : ''}`}
                  {...registerEdit('warehouseKeeper', { required: 'Warehouse Keeper is required *' })}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const selectedStaff = DataByRoleId.find((staff) => String(staff.id) === selectedId);
                    setValueUpdate('warehouseKeeperName', selectedStaff ? selectedStaff.staffName : '');
                  }}
                >
                  <option value="">--- Choose ---</option>
                  {DataByRoleId.length > 0 ? (
                    DataByRoleId.map((staff) => (
                      <option key={staff.id} value={String(staff.id)}>
                        {staff.staffName}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      {watchEditRole ? '-- No Staff Found --' : '-- Select Role First --'}
                    </option>
                  )}
                </select>
                {errorsEdit.warehouseKeeper && <p className="font12 text-danger">{errorsEdit.warehouseKeeper.message}</p>}
              </div>
              <input
                type="hidden"
                {...registerEdit('warehouseKeeperName')}
              />
              <div className="mb-3">
                <label htmlFor="emailEdit" className="form-label font14">
                  Email <span className='text-danger'>*</span>
                </label>
                <input
                  id="emailEdit"
                  type="email"
                  className={`form-control font14 ${errorsEdit.email ? 'border-danger' : ''}`}
                  placeholder="Enter Email Id"
                  {...registerEdit('email', {
                    required: 'Email is required *',
                    validate: (value) =>
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) || 'Not a valid email format',
                  })}
                />
                {errorsEdit.email && <p className="font12 text-danger">{errorsEdit.email.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumberEdit" className="form-label font14">
                  Phone Number <span className='text-danger'>*</span>
                </label>
                <input
                  id="phoneNumberEdit"
                  type="tel"
                  className={`form-control font14 ${errorsEdit.phoneNumber ? 'border-danger' : ''}`}
                  placeholder="Enter Phone Number"
                  {...registerEdit('phoneNumber', {
                    required: 'Phone Number is required *',
                    validate: (value) => {
                      if (!value) return 'Phone Number is required *';
                      if (!/^[6-9][0-9]{9}$/.test(value)) {
                        return 'Phone number must start with 6, 7, 8, or 9 and be exactly 10 digits';
                      }
                      return true;
                    },
                  })}
                />
                {errorsEdit.phoneNumber && <p className="font12 text-danger">{errorsEdit.phoneNumber.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="addressEdit" className="form-label font14">
                  Address <span className='text-danger'>*</span>
                </label>
                <input
                  id="addressEdit"
                  type="text"
                  className={`form-control font14 ${errorsEdit.address ? 'border-danger' : ''}`}
                  placeholder="Enter Address"
                  {...registerEdit('address', {
                    required: 'Address is required *',
                    validate: (value) => {
                      if (!value) return 'Address is required *';
                      if (value.length < 4) return 'Minimum length is 4 characters';
                      if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) {
                        return 'Address must contain only letters, digits, and spaces, with allowed punctuation (, . \' -)';
                      }
                      return true;
                    },
                  })}
                />
                {errorsEdit.address && <p className="font12 text-danger">{errorsEdit.address.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionEdit" className="form-label font14">
                  Description
                </label>
                <input
                  id="descriptionEdit"
                  type="text"
                  className={`form-control font14 ${errorsEdit.description ? 'border-danger' : ''}`}
                  placeholder="Enter Description"
                  {...registerEdit('description', {
                    validate: (value) =>
                      !value ||
                      (/^[A-Z]/.test(value) || 'Description must start with an uppercase letter') &&
                      (value.length >= 4 || 'Minimum Length is 4') &&
                      (/^[a-zA-Z\s'-]+$/.test(value) || 'Invalid Characters in Description'),
                  })}
                />
                {errorsEdit.description && (
                  <p className="font12 text-danger">{errorsEdit.description.message}</p>
                )}
              </div>
              <p className="text-center p-3">
                <button className="btn addButtons2 font14 text-white me-2" type="submit" disabled={!isValidEdit}>
                  Edit Warehouse
                </button>
                <button
                  className="btn cancelButtons font14"
                  type="button"
                  data-bs-dismiss="offcanvas"
                  onClick={() => {
                    resetEdit();
                  }}
                >
                  Cancel
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* Delete */}
        <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div className="offcanvas-header ps-0 modalHighborder p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
            </Link>
            <span className="offcanvas-title" id="staticBackdropLabel">Warehouse</span>
          </div>
          <div className="offcanvas-body p-0">
            {loaderState && <DataLoader />}
            <div style={{ zIndex: -1 }}>
              <p className='modalLightBorder p-2'>Warehouse</p>
              <p className='text-center p-3'><img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/errorI.svg" className='img-fluid' alt="" /></p>
              <p className='text-center warningHeading'>Are you Sure?</p>
              <p className='text-center greyText warningText pt-2'>This Action will permanently delete<br />the Warehouse Data</p>
              <p className='text-center warningText p-2'>
                <input
                  className="form-check-input formdltcheck me-2"
                  type="checkbox"
                  checked={isChecked}
                  id="flexCheckChecked"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                I Agree to delete the Warehouse Data
              </p>
              <p className='text-center p-3'>
                <button className='btn deleteButtons text-white' disabled={!isChecked} onClick={() => deleteWarehouseById(delWarehouseId)}>Delete</button>
                <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" onClick={() => setIsChecked(false)}>Cancel</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ManageWareHouse;
