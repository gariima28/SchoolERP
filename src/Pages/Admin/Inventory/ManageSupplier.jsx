import styled from "styled-components";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Download from "@mui/icons-material/Download";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import DataLoader from "src/Layouts/Loader";
import ActionControls from "../../../Layouts/ActionControls";
import * as bootstrap from "bootstrap";
import {
  addNewSupplierApi,
  deleteSupplierByIdApi,
  getAllSupplierApi,
  getSupplierByIdApi,
  updateSupplierByIdApi,
  DownloadSupplierExcel,
  DownloadSupplierPDF,
} from "src/Utils/Apis";
import { Icon } from "@iconify/react";

const Container = styled.div`
  .blueText {
    color: var(--blueTextColor);
  }
  .form-control::placeholder,
  .form-control,
  .form-select {
    color: var(--greyState);
  }
  .formdltcheck:checked {
    background-color: #b50000 !important;
    border-color: #b50000 !important;
  }
  .form-control,
  .form-select {
    border-radius: 5px ;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }
  .contbtn {
    margin-left: 41% !important;
    margin-top: -20% !important;
  }
  .greydiv {
    background-color: #fbfbfb;
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
  .eventablerow {
    background-color: var(--tableGreyBackgroundColor) !important;
  }
  .ExportBtns {
    border-radius: 3px;
    border: 1.5px solid var(--fontControlBorder);
  }
  .form-check-input {
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }
  .form-check-input:checked {
    background-color: #008479;
  }
  .greenBgModal {
    background-color: var(--breadCrumActiveTextColor);
  }
  .greenText {
    color: var(--breadCrumActiveTextColor);
  }
  .form-select {
    color: var(--greyState);
    box-shadow: none;
  }
  .orangeText {
    color: var(--OrangeBtnColor);
  }
  .scrollBarHide::-webkit-scrollbar {
    display: none;
  }
  .infoIcon {
    cursor: pointer;
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
    background-color: #2bb673;
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
  .greyText {
    color: var(--greyTextColor) !important;
  }
`;

const base64ToBlob = (base64Data, contentType) => {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: contentType });
};

const tableHeadingData = [
  "#",
  "Supplier Name",
  "Contact Name",
  "Contact Email",
  "Contact Phone",
  "Address",
  "Action",
];

const ManageSupplier = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // State Management
  const [loaderState, setLoaderState] = useState(false);
  const [supplierData, setSupplierData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [pdfResponse, setPDFResponse] = useState(null);
  const [searchInputVal, setSearchInputVal] = useState("");
  const [editSupplierId, setEditSupplierId] = useState("");
  const [delSupplierId, setDelSupplierId] = useState("");
  const [viewSupplierData, setViewSupplierData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [initialFormValues, setInitialFormValues] = useState({});

  // Form instances
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd, isValid: isValidAdd },
    setValue: setValueAdd,
    reset: resetAdd,
  } = useForm({
    mode: "onChange",
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit, isValid: isValidEdit },
    setValue: setValueEdit,
    reset: resetEdit,
  } = useForm({
    mode: "onChange",
  });

  // Fetch All Suppliers
  useEffect(() => {
    getAllSupplierData(searchInputVal);
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));
    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
  }, [token, pageNo, pageSize]);

  const getAllSupplierData = async (search = "") => {
    try {
      setLoaderState(true);
      const response = await getAllSupplierApi(search, pageNo, pageSize);
      if (response?.status === 200 && response?.data?.status === "success") {
        setSupplierData(response.data.itemSuppliers || []);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(response.data.currentPage || 1);
      } else {
        toast.error(response?.data?.message || "Failed to fetch suppliers");
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
      toast.error("Error fetching suppliers");
    } finally {
      setLoaderState(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchInputVal(value);
    setPageNo(1); // Reset to first page on search change
  };

  // Fetch Supplier by ID for Editing or Viewing
  const getSupplierDataById = async (id, isView = false) => {
    try {
      setLoaderState(true);
      setEditSupplierId(id);
      console.log(id, "Supplier ID");
      const response = await getSupplierByIdApi(id);
      console.log(response, "Supplier Data")
      if (response?.status === 200 && response?.data?.status === "success") {
        const data = response.data.itemSupplier;
        const formValues = {
          supplierName: data.supplierName || "",
          contactPersonName: data.contactPersonName || "",
          contactPersonEmail: data.contactPersonEmail || "",
          contactPersonPhone: data.contactPersonPhone || "",
          supplierAddress: data.supplierAddress || "",
          supplierDescription: data.supplierDescription || "",
        };
        if (isView) {
          setViewSupplierData(formValues);
        } else {
          setValueEdit("supplierName", data.supplierName);
          setValueEdit("contactPersonName", data.contactPersonName);
          setValueEdit("contactPersonEmail", data.contactPersonEmail);
          setValueEdit("contactPersonPhone", data.contactPersonPhone);
          setValueEdit("supplierAddress", data.supplierAddress);
          setValueEdit("supplierDescription", data.supplierDescription || "");
          setInitialFormValues(formValues);
        }
      } else {
        toast.error(response?.data?.message || "Failed to fetch supplier");
      }
    } catch (error) {
      toast.error("Error fetching supplier");
    } finally {
      setLoaderState(false);
    }
  };

  // Add New Supplier
  const addNewSupplier = async (data) => {
    try {
      setLoaderState(true);
      const payload = {
        supplierName: data.supplierName,
        contactPersonName: data.contactPersonName,
        contactPersonEmail: data.contactPersonEmail,
        contactPersonPhone: data.contactPersonPhone,
        supplierAddress: data.supplierAddress,
        supplierDescription: data.supplierDescription || undefined,
      };

      const response = await addNewSupplierApi(payload);
      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success(response.data.message);
        getAllSupplierData(searchInputVal);
        resetAdd();
        const offcanvasElement = document.getElementById("add_staticBackdrop");
        const offcanvas =
          bootstrap.Offcanvas.getInstance(offcanvasElement) ||
          new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
        offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
          const backdrop = document.querySelector('.offcanvas-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }, { once: true });
      } else {
        toast.error(response?.data?.message || "Failed to add supplier");
      }
    } catch (error) {
      toast.error("Error adding supplier");
    } finally {
      setLoaderState(false);
    }
  };

  // Update Supplier
  const updateSupplier = async (data) => {
    try {
      console.log('1')
      setLoaderState(true);
      console.log('1')
      const payload = {
        supplierName: data.supplierName,
        contactPersonName: data.contactPersonName,
        contactPersonEmail: data.contactPersonEmail,
        contactPersonPhone: data.contactPersonPhone,
        supplierAddress: data.supplierAddress,
        supplierDescription: data.supplierDescription || undefined,
      };
      console.log('1')

      const response = await updateSupplierByIdApi(editSupplierId, payload);
      console.log('1')
      if (response?.status === 200 && response?.data?.status === "success") {
        console.log('1')
        toast.success(response.data.message);
        console.log('1')
        getAllSupplierData(searchInputVal);
        resetEdit();
        setInitialFormValues({});
        const offcanvasElement = document.getElementById("Edit_staticBackdrop");
        const offcanvas =
          bootstrap.Offcanvas.getInstance(offcanvasElement) ||
          new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
        offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
          const backdrop = document.querySelector('.offcanvas-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }, { once: true });
      } else {
        toast.error(response?.data?.message || "Failed to update supplier");
        setValueEdit("supplierName", initialFormValues.supplierName);
        setValueEdit("contactPersonName", initialFormValues.contactPersonName);
        setValueEdit("contactPersonEmail", initialFormValues.contactPersonEmail);
        setValueEdit("contactPersonPhone", initialFormValues.contactPersonPhone);
        setValueEdit("supplierAddress", initialFormValues.supplierAddress);
        setValueEdit("supplierDescription", initialFormValues.supplierDescription);
      }
    } catch (error) {
      toast.error("Error updating supplier");
      setValueEdit("supplierName", initialFormValues.supplierName);
      setValueEdit("contactPersonName", initialFormValues.contactPersonName);
      setValueEdit("contactPersonEmail", initialFormValues.contactPersonEmail);
      setValueEdit("contactPersonPhone", initialFormValues.contactPersonPhone);
      setValueEdit("supplierAddress", initialFormValues.supplierAddress);
      setValueEdit("supplierDescription", initialFormValues.supplierDescription);
    } finally {
      setLoaderState(false);
    }
  };

  // Delete Supplier
  const deleteSupplierById = async (id) => {
    if (!isChecked) return;
    try {
      setLoaderState(true);
      const response = await deleteSupplierByIdApi(id);
      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success(response.data.message);
        getAllSupplierData(searchInputVal);
        setIsChecked(false);
        const offcanvasElement = document.getElementById("Delete_staticBackdrop");
        const offcanvas =
          bootstrap.Offcanvas.getInstance(offcanvasElement) ||
          new bootstrap.Offcanvas(offcanvasElement);
        offcanvas.hide();
        offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
          const backdrop = document.querySelector('.offcanvas-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }, { once: true });
      } else {
        toast.error(response?.data?.message || "Failed to delete supplier");
      }
    } catch (error) {
      toast.error("Error deleting supplier");
    } finally {
      setLoaderState(false);
    }
  };

  // Download CSV
  const DownloadCSV = async () => {
    try {
      const response = await DownloadSupplierExcel();
      if (response?.status === 200) {
        const rows = response?.data?.split("\n").map((row) => row.split(","));
        setCsvData(rows);
      } else {
        toast.error("Failed to download CSV");
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
      toast.error("Error downloading CSV");
    }
  };

  // Download PDF
  const DownloadPDF = async () => {
    try {
      const response = await DownloadSupplierPDF();
      if (response?.status === 200 && response?.data?.status === "success") {
        setPDFResponse(response.data);
      } else {
        toast.error("Failed to download PDF");
      }
    } catch (error) {
      toast.error("Error downloading PDF");
    }
  };

  // Handle PDF Download
  const handleDownloadPdf = () => {
    if (pdfResponse?.pdf) {
      const blob = base64ToBlob(pdfResponse.pdf, "application/pdf");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Supplier Data.pdf";
      link.click();
    } else {
      toast.error("No PDF data available");
    }
  };

  // Handle Pagination
  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setPageNo(selectedPage);
  };

  // Reset Add form when offcanvas opens
  const handleAddOffcanvasOpen = () => {
    resetAdd();
    const offcanvasElement = document.getElementById("add_staticBackdrop");
    if (offcanvasElement) {
      const offcanvas =
        bootstrap.Offcanvas.getInstance(offcanvasElement) ||
        new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.show();
    } else {
      console.error("Offcanvas element with ID add_staticBackdrop not found");
      toast.error("Unable to open Add Supplier form");
    }
  };

  return (
    <Container>
      {loaderState && <DataLoader />}
      <div className="container-fluid p-4">
        <div className="row pb-3 gap-xl-0 gap-3">
          <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 p-0">
            <nav className="mainBreadCrum font14 ps-0" aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <a href="/" className="bredcrumText text-decoration-none">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a
                    href="/admin/inventory/itemsupplier"
                    className="bredcrumText text-decoration-none"
                  >
                    Inventory
                  </a>
                </li>
                <li
                  className="breadcrumb-item active bredcrumActiveText"
                  aria-current="page"
                >
                  Supplier
                </li>
              </ol>
            </nav>
            <p className="font14 ps-0 fontWeight500">Supplier</p>
          </div>
          <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
            <ActionControls
              showAddButton={true}
              addButtonText="Add Supplier"
              addButtonAction={handleAddOffcanvasOpen}
              showExportPDF={supplierData.length > 0}
              exportPDFText="Export PDF"
              exportPDFAction={DownloadSupplierPDF}
              exportPDFFileName="Supplier.pdf"
              showExportCSV={supplierData.length > 0}
              exportCSVText="Export CSV"
              exportCSVAction={DownloadSupplierExcel}
              exportCSVFileName="Supplier.xlsx"
              showSearch={true}
              searchValue={searchInputVal}
              searchAction={getAllSupplierData}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-3 overflow-scroll">
            {supplierData.length > 0 ? (
              <>
                <table className="table align-middle table-striped">
                  <thead>
                    <tr>
                      {tableHeadingData.map((item, index) => (
                        <th
                          key={index}
                          className={`textWrapClass font14 ${item === "Action" ? "text-end" : ""
                            }`}
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {supplierData.map((item, index) => (
                      <tr key={item.supplierId} className="align-middle">
                        <td className="textWrapClass greyText font14">
                          {(pageNo - 1) * pageSize + index + 1}
                        </td>
                        <td className="textWrapClass greyText font14">
                          {item.supplierName}
                        </td>
                        <td className="textWrapClass greyText font14">
                          {item.contactPersonName}
                        </td>
                        <td className="textWrapClass greyText font14">
                          {item.contactPersonEmail}
                        </td>
                        <td className="textWrapClass greyText font14">
                          {item.contactPersonPhone}
                        </td>
                        <td className="textWrapClass greyText font14">
                          {item.supplierAddress}
                        </td>
                        <td className="text-end">
                          <span
                            className="ps-4 greyText"
                            data-bs-toggle="modal"
                            data-bs-target="#viewDetails"
                            style={{ cursor: "pointer" }}
                            onClick={() => getSupplierDataById(item.id, true)}
                          >
                            <RemoveRedEyeOutlinedIcon />
                          </span>
                          <span
                            className="ps-4 greyText"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#Edit_staticBackdrop"
                            aria-controls="Edit_staticBackdrop"
                            style={{ cursor: "pointer" }}
                            onClick={() => getSupplierDataById(item.id)}
                          >
                            <DriveFileRenameOutlineOutlinedIcon />
                          </span>
                          <span
                            className="ps-4 greyText"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#Delete_staticBackdrop"
                            aria-controls="Delete_staticBackdrop"
                            style={{ cursor: "pointer" }}
                            onClick={() => setDelSupplierId(item.id)}
                          >
                            <DeleteOutlinedIcon />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="overflow-scroll">
                  <div className="d-flex">
                    <p className="font14">
                      Showing {currentPage} of {totalPages} Pages
                    </p>
                    <div className="ms-auto">
                      <ReactPaginate
                        previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                        nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={10}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-center p-5 m-5">
                <img
                  src="/images/search.svg"
                  alt="No data"
                  className="img-fluid p-5"
                />
              </div>
            )}
          </div>
        </div>

        {/* View Supplier */}
        <div
          className="modal modal-lg fade"
          id="viewDetails"
          tabIndex="-1"
          aria-labelledby="viewDetailsLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header p-2 px-3">
                <h2 className="modal-title" id="viewDetailsLabel">
                  View Supplier
                </h2>
                <div className="d-flex align-items-center">
                  {/* <button
                    className="btn greyText"
                    type="button"
                    onClick={DownloadPDF}
                  >
                    <Download />
                  </button> */}
                  <button
                    type="button"
                    className="btn-close greyText"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
              <div className="modal-body p-0">
                <div className="container-fluid bgGreen p-4">
                  {viewSupplierData ? (
                    <>
                      <div className="row">
                        <div className="col-6">
                          <div className="row">
                            <div className="col-5">
                              <span>Supplier Name</span>
                            </div>
                            <div className="col-2">
                              <span>:</span>
                            </div>
                            <div className="col-5">
                              <span>
                                {viewSupplierData?.supplierName.length > 13 ? (
                                  <>
                                    <span className='me-2'>{viewSupplierData?.supplierName.substring(0, 13) + "..."}</span>
                                    <button
                                      className='btn p-0'
                                      type='button'
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title={viewSupplierData?.supplierName}
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
                                  <span>{viewSupplierData?.supplierName}</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-5">
                              <span>Contact Name</span>
                            </div>
                            <div className="col-2">
                              <span>:</span>
                            </div>
                            <div className="col-5">
                              <span>
                                {viewSupplierData?.contactPersonName.length > 13 ? (
                                  <>
                                    <span className='me-2'>{viewSupplierData?.contactPersonName.substring(0, 13) + "..."}</span>
                                    <button
                                      className='btn p-0'
                                      type='button'
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title={viewSupplierData?.contactPersonName}
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
                                  <span>{viewSupplierData?.contactPersonName}</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-6">
                          <div className="row">
                            <div className="col-5">
                              <span>Contact Email</span>
                            </div>
                            <div className="col-2">
                              <span>:</span>
                            </div>
                            <div className="col-5">
                              <span>
                                {viewSupplierData?.contactPersonEmail.length > 13 ? (
                                  <>
                                    <span className='me-2'>{viewSupplierData?.contactPersonEmail.substring(0, 13) + "..."}</span>
                                    <button
                                      className='btn p-0'
                                      type='button'
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title={viewSupplierData?.contactPersonEmail}
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
                                  <span>{viewSupplierData?.contactPersonEmail}</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-5">
                              <span>Contact Phone</span>
                            </div>
                            <div className="col-2">
                              <span>:</span>
                            </div>
                            <div className="col-5">
                              <span>{viewSupplierData?.contactPersonPhone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-6">
                          <div className="row">
                            <div className="col-5">
                              <span>Address</span>
                            </div>
                            <div className="col-2">
                              <span>:</span>
                            </div>
                            <div className="col-5">
                              <span>
                                {viewSupplierData?.supplierAddress.length > 13 ? (
                                  <>
                                    <span className='me-2'>{viewSupplierData?.supplierAddress.substring(0, 13) + "..."}</span>
                                    <button
                                      className='btn p-0'
                                      type='button'
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title={viewSupplierData?.supplierAddress}
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
                                  <span>{viewSupplierData?.supplierAddress}</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="row">
                            <div className="col-5">
                              <span>Description</span>
                            </div>
                            <div className="col-2">
                              <span>:</span>
                            </div>
                            <div className="col-5">
                              <span>
                                {viewSupplierData?.supplierDescription.length > 13 ? (
                                  <>
                                    <span className='me-2'>{viewSupplierData?.supplierDescription.substring(0, 13) + "..."}</span>
                                    <button
                                      className='btn p-0'
                                      type='button'
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-bs-title={viewSupplierData?.supplierDescription}
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
                                  <span>{viewSupplierData?.supplierDescription}</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">Loading supplier data...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Supplier */}
        <div
          className="offcanvas offcanvas-end p-2"
          data-bs-backdrop="static"
          tabIndex="-1"
          id="add_staticBackdrop"
          aria-labelledby="add_staticBackdropLabel"
        >
          <div className="offcanvas-header border-bottom border-2 p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#008479"
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
            <h2 className="offcanvas-title" id="add_staticBackdropLabel">
              Add Supplier
            </h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitAdd(addNewSupplier)}>
              <div className="mb-3">
                <label htmlFor="supplierNameAdd" className="form-label font14">
                  Supplier Name <span className="text-danger">*</span>
                </label>
                <input
                  id="supplierNameAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.supplierName ? "border-danger" : ""
                    }`}
                  placeholder="Enter Supplier Name"
                  {...registerAdd("supplierName", {
                    required: "Supplier Name is required *",
                    validate: {
                      startsWithUppercase: (value) =>
                        /^[A-Z]/.test(value) ||
                        "Supplier Name must start with an uppercase letter",
                      minLength: (value) =>
                        value.length >= 4 || "Minimum Length is 4",
                      validChars: (value) =>
                        /^[a-zA-Z\s'-]+$/.test(value) ||
                        "Invalid Characters in Supplier Name",
                    },
                  })}
                />
                {errorsAdd.supplierName && (
                  <p className="font12 text-danger">
                    {errorsAdd.supplierName.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="contactPersonNameAdd"
                  className="form-label font14"
                >
                  Contact Name <span className="text-danger">*</span>
                </label>
                <input
                  id="contactPersonNameAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.contactPersonName ? "border-danger" : ""
                    }`}
                  placeholder="Enter Contact Name"
                  {...registerAdd("contactPersonName", {
                    required: "Contact Name is required *",
                    validate: {
                      startsWithUppercase: (value) =>
                        /^[A-Z]/.test(value) ||
                        "Contact Name must start with an uppercase letter",
                      minLength: (value) =>
                        value.length >= 4 || "Minimum Length is 4",
                      validChars: (value) =>
                        /^[a-zA-Z\s'-]+$/.test(value) ||
                        "Invalid Characters in Contact Name",
                    },
                  })}
                />
                {errorsAdd.contactPersonName && (
                  <p className="font12 text-danger">
                    {errorsAdd.contactPersonName.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="contactPersonEmailAdd"
                  className="form-label font14"
                >
                  Contact Email <span className="text-danger">*</span>
                </label>
                <input
                  id="contactPersonEmailAdd"
                  type="email"
                  className={`form-control font14 ${errorsAdd.contactPersonEmail ? "border-danger" : ""
                    }`}
                  placeholder="Enter Contact Email"
                  {...registerAdd("contactPersonEmail", {
                    required: "Contact Email is required *",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Not a valid email format",
                    },
                  })}
                />
                {errorsAdd.contactPersonEmail && (
                  <p className="font12 text-danger">
                    {errorsAdd.contactPersonEmail.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="contactPersonPhoneAdd"
                  className="form-label font14"
                >
                  Contact Phone <span className="text-danger">*</span>
                </label>
                <input
                  id="contactPersonPhoneAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.contactPersonPhone ? "border-danger" : ""
                    }`}
                  placeholder="Enter Contact Phone"
                  {...registerAdd("contactPersonPhone", {
                    required: "Contact Phone is required *",
                    validate: {
                      validPhone: (value) =>
                        /^[6-9][0-9]{9}$/.test(value) ||
                        "Phone number must be 10 digits starting with 6-9",
                    },
                  })}
                />
                {errorsAdd.contactPersonPhone && (
                  <p className="font12 text-danger">
                    {errorsAdd.contactPersonPhone.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="supplierAddressAdd" className="form-label font14">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  id="supplierAddressAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.supplierAddress ? "border-danger" : ""
                    }`}
                  placeholder="Enter Address"
                  {...registerAdd("supplierAddress", {
                    required: "Address is required *",
                    validate: {
                      minLength: (value) =>
                        value.length >= 4 || "Minimum Length is 4",
                      validChars: (value) =>
                        /^[a-zA-Z0-9\s,.'-]+$/.test(value) ||
                        "Address must contain only letters, digits, spaces, commas, hyphens, or apostrophes",
                    },
                  })}
                />
                {errorsAdd.supplierAddress && (
                  <p className="font12 text-danger">
                    {errorsAdd.supplierAddress.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="supplierDescriptionAdd"
                  className="form-label font14"
                >
                  Description
                </label>
                <input
                  id="supplierDescriptionAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.supplierDescription ? "border-danger" : ""
                    }`}
                  placeholder="Enter Description"
                  {...registerAdd("supplierDescription", {
                    validate: (value) =>
                      !value ||
                      ((/^[A-Z]/.test(value) ||
                        "Description must start with an uppercase letter") &&
                        (value.length >= 4 || "Minimum Length is 4")
                        // &&
                        // (/^[a-zA-Z\s'-]+$/.test(value) ||
                        //   "Invalid Characters in Description")
                      ),
                  })}
                />
                {errorsAdd.supplierDescription && (
                  <p className="font12 text-danger">
                    {errorsAdd.supplierDescription.message}
                  </p>
                )}
              </div>
              <p className="text-center p-3">
                <button
                  className="btn addButtons2 font14 text-white me-2"
                  type="submit"
                  disabled={!isValidAdd}
                >
                  Add Supplier
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

        {/* Edit Supplier */}
        <div
          className="offcanvas offcanvas-end p-2"
          data-bs-backdrop="static"
          tabIndex="-1"
          id="Edit_staticBackdrop"
          aria-labelledby="Edit_staticBackdropLabel"
        >
          <div className="offcanvas-header border-bottom border-2 p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#008479"
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
            <h2 className="offcanvas-title" id="Edit_staticBackdropLabel">
              Edit Supplier
            </h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitEdit(updateSupplier)}>
              <div className="mb-3">
                <label htmlFor="supplierNameEdit" className="form-label font14">
                  Supplier Name <span className="text-danger">*</span>
                </label>
                <input
                  id="supplierNameEdit"
                  type="text"
                  className={`form-control font14 ${errorsEdit.supplierName ? "border-danger" : ""
                    }`}
                  placeholder="Enter Supplier Name"
                  {...registerEdit("supplierName", {
                    required: "Supplier Name is required *",
                    validate: {
                      startsWithUppercase: (value) =>
                        /^[A-Z]/.test(value) ||
                        "Supplier Name must start with an uppercase letter",
                      minLength: (value) =>
                        value.length >= 4 || "Minimum Length is 4",
                      validChars: (value) =>
                        /^[a-zA-Z\s'-]+$/.test(value) ||
                        "Invalid Characters in Supplier Name",
                    },
                  })}
                />
                {errorsEdit.supplierName && (
                  <p className="font12 text-danger">
                    {errorsEdit.supplierName.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="contactPersonNameEdit"
                  className="form-label font14"
                >
                  Contact Name <span className="text-danger">*</span>
                </label>
                <input
                  id="contactPersonNameEdit"
                  type="text"
                  className={`form-control font14 ${errorsEdit.contactPersonName ? "border-danger" : ""
                    }`}
                  placeholder="Enter Contact Name"
                  {...registerEdit("contactPersonName", {
                    required: "Contact Name is required *",
                    validate: {
                      startsWithUppercase: (value) =>
                        /^[A-Z]/.test(value) ||
                        "Contact Name must start with an uppercase letter",
                      minLength: (value) =>
                        value.length >= 4 || "Minimum Length is 4",
                      validChars: (value) =>
                        /^[a-zA-Z\s'-]+$/.test(value) ||
                        "Invalid Characters in Contact Name",
                    },
                  })}
                />
                {errorsEdit.contactPersonName && (
                  <p className="font12 text-danger">
                    {errorsEdit.contactPersonName.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="contactPersonEmailEdit"
                  className="form-label font14"
                >
                  Contact Email <span className="text-danger">*</span>
                </label>
                <input
                  id="contactPersonEmailEdit"
                  type="email"
                  className={`form-control font14 ${errorsEdit.contactPersonEmail ? "border-danger" : ""
                    }`}
                  placeholder="Enter Contact Email"
                  {...registerEdit("contactPersonEmail", {
                    required: "Contact Email is required *",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Not a valid email format",
                    },
                  })}
                />
                {errorsEdit.contactPersonEmail && (
                  <p className="font12 text-danger">
                    {errorsEdit.contactPersonEmail.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="contactPersonPhoneEdit"
                  className="form-label font14"
                >
                  Contact Phone <span className="text-danger">*</span>
                </label>
                <input
                  id="contactPersonPhoneEdit"
                  type="text"
                  className={`form-control font14 ${errorsEdit.contactPersonPhone ? "border-danger" : ""
                    }`}
                  placeholder="Enter Contact Phone"
                  {...registerEdit("contactPersonPhone", {
                    required: "Contact Phone is required *",
                    validate: {
                      validPhone: (value) =>
                        /^[6-9][0-9]{9}$/.test(value) ||
                        "Phone number must be 10 digits starting with 6-9",
                    },
                  })}
                />
                {errorsEdit.contactPersonPhone && (
                  <p className="font12 text-danger">
                    {errorsEdit.contactPersonPhone.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="supplierAddressEdit" className="form-label font14">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  id="supplierAddressEdit"
                  type="text"
                  className={`form-control font14 ${errorsEdit.supplierAddress ? "border-danger" : ""
                    }`}
                  placeholder="Enter Address"
                  {...registerEdit("supplierAddress", {
                    required: "Address is required *",
                    validate: {
                      minLength: (value) =>
                        value.length >= 4 || "Minimum Length is 4",
                      validChars: (value) =>
                        /^[a-zA-Z0-9\s,.'-]+$/.test(value) ||
                        "Address must contain only letters, digits, spaces, commas, hyphens, or apostrophes",
                    },
                  })}
                />
                {errorsEdit.supplierAddress && (
                  <p className="font12 text-danger">
                    {errorsEdit.supplierAddress.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="supplierDescriptionEdit"
                  className="form-label font14"
                >
                  Description
                </label>
                <input
                  id="supplierDescriptionEdit"
                  type="text"
                  className={`form-control font14 ${errorsEdit.supplierDescription ? "border-danger" : ""
                    }`}
                  placeholder="Enter Description"
                  {...registerEdit("supplierDescription", {
                    validate: (value) =>
                      !value ||
                      ((/^[A-Z]/.test(value) ||
                        "Description must start with an uppercase letter") &&
                        (value.length >= 4 || "Minimum Length is 4")
                        // &&
                        // (/^[a-zA-Z\s'-]+$/.test(value) ||
                        //   "Invalid Characters in Description")
                      ),
                  })}
                />
                {errorsEdit.supplierDescription && (
                  <p className="font12 text-danger">
                    {errorsEdit.supplierDescription.message}
                  </p>
                )}
              </div>
              <p className="text-center p-3">
                <button
                  className="btn addButtons2 font14 text-white me-2"
                  type="submit"
                  disabled={!isValidEdit}
                >
                  Update Supplier
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

        {/* Delete Supplier */}
        <div
          className="offcanvas offcanvas-end p-2"
          data-bs-backdrop="static"
          tabIndex="-1"
          id="Delete_staticBackdrop"
          aria-labelledby="Delete_staticBackdropLabel"
        >
          <div className="offcanvas-header ps-0 modalHighborder p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="#B50000"
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
            <span className="offcanvas-title" id="Delete_staticBackdropLabel">
              Delete Supplier
            </span>
          </div>
          <div className="offcanvas-body p-0">
            <div className="" style={{ zIndex: -1 }}>
              <p className="modalLightBorder p-2">Supplier</p>
              <p className="text-center p-3">
                <img
                  src="/images/errorI.svg"
                  className="img-fluid"
                  alt="Error"
                />
              </p>
              <p className="text-center warningHeading">Are you Sure?</p>
              <p className="text-center greyText warningText pt-2">
                This Action will permanently delete
                <br />
                the Supplier Data
              </p>
              <p className="text-center warningText p-2">
                <input
                  className="form-check-input formdltcheck me-2"
                  type="checkbox"
                  checked={isChecked}
                  id="flexCheckChecked"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                I Agree to delete the Supplier Data
              </p>
              <p className="text-center p-3">
                <button
                  className="btn deleteButtons text-white"
                  disabled={!isChecked}
                  onClick={() => deleteSupplierById(delSupplierId)}
                >
                  Delete
                </button>
                <button
                  className="btn dltcancelButtons ms-3"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={() => setIsChecked(false)}
                >
                  Cancel
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </Container>
  );
};

export default ManageSupplier;
