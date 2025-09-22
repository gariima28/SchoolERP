import styled from "styled-components";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Download from "@mui/icons-material/Download";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import DataLoader from "src/Layouts/Loader";
import ActionControls from "../../../Layouts/ActionControls";
import {
  addNewManageProductApi,
  deleteManageProductByIdApi,
  getAllItemCategoryApi,
  getAllManageProductApi,
  getManageProductByIdApi,
  updateManageProductByIdApi,
  getAllWarehouseApi,
  DownloadManageProductExcel,
  DownloadManageProductPDF,
} from "../../../Utils/Apis";
import * as bootstrap from "bootstrap";
import ReactPaginate from "react-paginate";
import { Icon } from "@iconify/react";

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
    border: 1px solid var(--formInputBorder);
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

const tableHeadingData = ["#", "Product Name", "Product Code", "Category", "Warehouse", "Action"];

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

const ManageProduct = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // State Management
  const [loaderState, setLoaderState] = useState(false);
  const [manageProductData, setManageProductData] = useState([]);
  const [itemCategoryData, setItemCategoryData] = useState([]);
  const [warehouseData, setWarehouseData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [pdfResponse, setPDFResponse] = useState(null);
  const [searchInputVal, setSearchInputVal] = useState("");
  const [editProductId, setEditProductId] = useState("");
  const [delProductId, setDelProductId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [initialFormValues, setInitialFormValues] = useState({});
  const [viewProductData, setViewProductData] = useState(null);

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

  // Fetch All Data
  useEffect(() => {
    getAllManageProductData(searchInputVal);
    getAllItemCategoryData();
    getAllWarehouseData();
  }, [token, pageNo, pageSize]);


  const getAllItemCategoryData = async (search = "") => {
    try {
      setLoaderState(true);
      const response = await getAllItemCategoryApi(search, pageNo, pageSize);
      if (response?.status === 200 && response?.data?.status === "success") {
        setItemCategoryData(response.data.itemCategories || []);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(response.data.currentPage || 1);
      } else {
        toast.error(response?.data?.message || "Failed to fetch item categories");
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
      toast.error("Error fetching item categories");
    } finally {
      setLoaderState(false);
    }
  };

  const getAllWarehouseData = async () => {
    try {
      setLoaderState(true);
      const response = await getAllWarehouseApi("", 1, 100); // Fetch all warehouses
      if (response?.status === 200 && response?.data?.status === "success") {
        setWarehouseData(response.data.warehouses || []);
      } else {
        toast.error(response?.data?.message || "Failed to fetch warehouses");
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
      toast.error("Error fetching warehouses");
    } finally {
      setLoaderState(false);
    }
  };

  const getAllManageProductData = async (search = "") => {
    try {
      setLoaderState(true);
      const response = await getAllManageProductApi(search, pageNo, pageSize);
      if (response?.status === 200 && response?.data?.status === "success") {
        setManageProductData(response.data.items || []);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(response.data.currentPage || 1);
      } else {
        toast.error(response?.data?.message || "Failed to fetch products");
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
      toast.error("Error fetching products");
    } finally {
      setLoaderState(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchInputVal(value);
    setPageNo(1); // Reset to first page on search change
  };

  // Fetch Product by ID for Editing or Viewing
  const getManageProductDataById = async (id, isView = false) => {
    try {
      setLoaderState(true);
      setEditProductId(isView ? "" : id);
      const response = await getManageProductByIdApi(id);
      if (response?.status === 200 && response?.data?.status === "success") {
        const data = response.data.item;
        const formValues = {
          categoryId: data.categoryId || "",
          warehouseId: data.warehouseId || "",
          itemName: data.itemName || "",
          productCode: data.productCode || "",
          description: data.description || "",
        };
        if (isView) {
          setViewProductData(data);
        } else {
          setValueEdit("categoryId", data.categoryId || "");
          setValueEdit("warehouseId", data.warehouseId || "");
          setValueEdit("itemName", data.itemName || "");
          setValueEdit("productCode", data.productCode || "");
          setValueEdit("description", data.description || "");
          setInitialFormValues(formValues);
        }
      } else {
        toast.error(response?.data?.message || `Failed to fetch ${isView ? "view" : "edit"} product`);
      }
    } catch (error) {
      toast.error(`Error fetching ${isView ? "view" : "edit"} product`);
    } finally {
      setLoaderState(false);
    }
  };

  // Add New Product
  const addNewManageProduct = async (data) => {
    try {
      setLoaderState(true);
      const formValues = {
        categoryId: data.categoryId || "",
        warehouseId: data.warehouseId || "",
        itemName: data.itemName || "",
        productCode: data.productCode || "",
        description: data.description || "",
      };
      const response = await addNewManageProductApi(formValues);
      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success(response.data.message);
        getAllManageProductData(searchInputVal);
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
        toast.error(response?.data?.message || "Failed to add product");
      }
    } catch (error) {
      toast.error("Error adding product");
    } finally {
      setLoaderState(false);
    }
  };

  // Update Product
  const updateManageProduct = async (data) => {
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append("categoryId", data.categoryId);
      formData.append("warehouseId", data.warehouseId);
      formData.append("itemName", data.itemName);
      formData.append("productCode", data.productCode);
      formData.append("description", data.description || "");
      const response = await updateManageProductByIdApi(editProductId, formData);
      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success(response.data.message);
        getAllManageProductData(searchInputVal);
        resetEdit();
        setInitialFormValues({});
        document
          .querySelector('#Edit_staticBackdrop [data-bs-dismiss="offcanvas"]')
          ?.click();
      } else {
        toast.error(response?.data?.message || "Failed to update product");
        setValueEdit("categoryId", initialFormValues.categoryId);
        setValueEdit("warehouseId", initialFormValues.warehouseId);
        setValueEdit("itemName", initialFormValues.itemName);
        setValueEdit("productCode", initialFormValues.productCode);
        setValueEdit("description", initialFormValues.description);
      }
    } catch (error) {
      toast.error("Error updating product");
      setValueEdit("categoryId", initialFormValues.categoryId);
      setValueEdit("warehouseId", initialFormValues.warehouseId);
      setValueEdit("itemName", initialFormValues.itemName);
      setValueEdit("productCode", initialFormValues.productCode);
      setValueEdit("description", initialFormValues.description);
    } finally {
      setLoaderState(false);
    }
  };

  // Delete Product
  const deleteManageProductById = async (id) => {
    if (!isChecked) return;
    try {
      setLoaderState(true);
      const response = await deleteManageProductByIdApi(id);
      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success(response.data.message);
        getAllManageProductData(searchInputVal);
        setIsChecked(false);
        document
          .querySelector('#Delete_staticBackdrop [data-bs-dismiss="offcanvas"]')
          ?.click();
      } else {
        toast.error(response?.data?.message || "Failed to delete product");
      }
    } catch (error) {
      toast.error("Error deleting product");
    } finally {
      setLoaderState(false);
    }
  };

  // Download CSV
  const DownloadCSV = async () => {
    try {
      const response = await DownloadManageProductExcel();
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
      const response = await DownloadManageProductPDF();
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
      link.download = "Product Data.pdf";
      link.click();
    } else {
      toast.error("No PDF data available");
    }
  };

  // Handle Pagination (Assuming ReactPaginate is used)
  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    setPageNo(selectedPage);
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
                  <a href="/" className="bredcrumText text-decoration-none">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/admin/inventory/itemsupplier" className="bredcrumText text-decoration-none">Inventory</a>
                </li>
                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Product</li>
              </ol>
            </nav>
            <p className="font14 ps-0 fontWeight500">Product Details</p>
          </div>
          <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
            <ActionControls
              showAddButton={true}
              addButtonText="Add Product"
              addButtonAction={() => {
                resetAdd();
                const offcanvasElement = document.getElementById("add_staticBackdrop");
                const offcanvas =
                  bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                  new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.show();
              }}
              showExportPDF={manageProductData.length > 0}
              exportPDFText="Export PDF"
              exportPDFAction={DownloadManageProductPDF}
              exportPDFFileName="Products.pdf"
              showExportCSV={manageProductData.length > 0}
              exportCSVText="Export CSV"
              exportCSVAction={DownloadManageProductExcel}
              exportCSVFileName="Products.xlsx"
              showSearch={true}
              searchValue={searchInputVal}
              searchAction={getAllManageProductData}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="row pb-3">
          <div className="bg-white rounded-2 p-3">
            {manageProductData.length > 0 ? (
              <div className="overflow-scroll">
                <table className="table align-middle table-striped">
                  <thead>
                    <tr>
                      {tableHeadingData.map((item) => (
                        <th key={item} className={`textWrapClass font14 text-start ${item === "Action" && "text-end"}`}>
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {manageProductData.map((item, index) => (
                      <tr key={item.id} className="align-middle">
                        <td className="textWrapClass greyText font14">{(pageNo - 1) * pageSize + index + 1}</td>
                        <td className="textWrapClass greyText font14">{item.itemName}</td>
                        <td className="textWrapClass greyText font14">{item.productCode}</td>
                        <td className="textWrapClass greyText font14">{item.categoryName}</td>
                        <td className="textWrapClass greyText font14">{item.warehouseName}</td>
                        <td className="text-end">
                          <span
                            className="ps-4 greyText"
                            data-bs-toggle="modal"
                            data-bs-target="#viewDetails"
                            style={{ cursor: "pointer" }}
                            onClick={() => getManageProductDataById(item.id, true)}
                          >
                            <RemoveRedEyeOutlinedIcon />
                          </span>
                          <span
                            className="ps-4 greyText"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#Edit_staticBackdrop"
                            aria-controls="Edit_staticBackdrop"
                            style={{ cursor: "pointer" }}
                            onClick={() => getManageProductDataById(item.id)}
                          >
                            <DriveFileRenameOutlineOutlinedIcon />
                          </span>
                          <span
                            className="ps-4 greyText"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#Delete_staticBackdrop"
                            aria-controls="Delete_staticBackdrop"
                            style={{ cursor: "pointer" }}
                            onClick={() => setDelProductId(item.id)}
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
                    <p className="font14">Showing {currentPage} of {totalPages} Pages</p>
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
              </div>
            ) : (
              <div className="d-flex justify-content-center p-5 m-5">
                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="No data" className="img-fluid p-5" />
              </div>
            )}
          </div>
        </div>

        {/* View Modal */}
        <div className="modal modal-lg fade" id="viewDetails" tabIndex="-1" aria-labelledby="viewDetailsLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header p-2 px-3">
                <h2 className="modal-title" id="viewDetailsLabel">View Product</h2>
                <div className="d-flex align-items-center">
                  <button className="btn greyText" type="button"><Download /></button>
                  <button type="button" className="btn-close greyText" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              </div>
              <div className="modal-body p-0">
                <div className="container-fluid bgGreen p-4">
                  <div className="row">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Product Name</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewProductData?.itemName || "-"}</span></div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Product Code</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewProductData?.productCode || "-"}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Category</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewProductData?.categoryName || "-"}</span></div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Warehouse</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewProductData?.warehouseName || "-"}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Description</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewProductData?.description || "-"}</span></div>
                      </div>
                    </div>
                    <div className="col-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Offcanvas */}
        <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="add_staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div className="offcanvas-header border-bottom border-2 p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
            </Link>
            <h2 className="offcanvas-title" id="staticBackdropLabel">Product Add</h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitAdd(addNewManageProduct)}>
              <div className="mb-3">
                <label htmlFor="categoryAdd" className="form-label font14">
                  Category <span className="text-danger">*</span>
                </label>
                <select
                  id="categoryAdd"
                  className={`form-select font14 ${errorsAdd.categoryId ? "border-danger" : ""}`}
                  {...registerAdd("categoryId", { required: "Category is required *" })}
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
                <label htmlFor="warehouseAdd" className="form-label font14">
                  Warehouse <span className="text-danger">*</span>
                </label>
                <select
                  id="warehouseAdd"
                  className={`form-select font14 ${errorsAdd.warehouseId ? "border-danger" : ""}`}
                  {...registerAdd("warehouseId", { required: "Warehouse is required *" })}
                >
                  <option value="">--- Choose ---</option>
                  {warehouseData.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.warehouseName}
                    </option>
                  ))}
                </select>
                {errorsAdd.warehouseId && <p className="font12 text-danger">{errorsAdd.warehouseId.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="productNameAdd" className="form-label font14">
                  Product Name <span className="text-danger">*</span>
                </label>
                <input
                  id="productNameAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.itemName ? "border-danger" : ""}`}
                  placeholder="Enter Product Name"
                  {...registerAdd("itemName", {
                    required: "Product Name is required *",
                    validate: {
                      startsWithUppercase: (value) => /^[A-Z]/.test(value) || "Product Name must start with an uppercase letter",
                      minLength: (value) => value.length >= 4 || "Minimum Length is 4",
                      validChars: (value) => /^[a-zA-Z\s'-]+$/.test(value) || "Invalid Characters in Product Name",
                    },
                  })}
                />
                {errorsAdd.itemName && <p className="font12 text-danger">{errorsAdd.itemName.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="productCodeAdd" className="form-label font14">
                  Product Code <span className="text-danger">*</span>
                </label>
                <input
                  id="productCodeAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.productCode ? "border-danger" : ""}`}
                  placeholder="Enter Product Code"
                  {...registerAdd("productCode", {
                    required: "Product Code is required *",
                    validate: {
                      validFormat: (value) => /^[A-Z0-9-]{4,}$/.test(value) || "Product Code must be alphanumeric, at least 4 characters, and may include hyphens",
                    },
                  })}
                />
                {errorsAdd.productCode && <p className="font12 text-danger">{errorsAdd.productCode.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionAdd" className="form-label font14">
                  Description
                </label>
                <input
                  id="descriptionAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.description ? "border-danger" : ""}`}
                  placeholder="Enter Description"
                  {...registerAdd("description", {
                    validate: (value) =>
                      !value ||
                      ((/^[A-Z]/.test(value) || "Description must start with an uppercase letter") &&
                        (value.length >= 4 || "Minimum Length is 4") &&
                        (/^[a-zA-Z\s'-]+$/.test(value) || "Invalid Characters in Description")),
                  })}
                />
                {errorsAdd.description && <p className="font12 text-danger">{errorsAdd.description.message}</p>}
              </div>
              <p className="text-center p-3">
                <button className="btn addButtons2 font14 text-white me-2" type="submit" disabled={!isValidAdd}>
                  Add Product
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
            <h2 className="offcanvas-title" id="staticBackdropLabel">Product Edit</h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitEdit(updateManageProduct)}>
              <div className="mb-3">
                <label htmlFor="categoryEdit" className="form-label font14">
                  Category <span className="text-danger">*</span>
                </label>
                <select
                  id="categoryEdit"
                  className={`form-select font14 ${errorsEdit.categoryId ? "border-danger" : ""}`}
                  {...registerEdit("categoryId", { required: "Category is required *" })}
                >
                  <option value="">--- Choose ---</option>
                  {itemCategoryData.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errorsEdit.categoryId && <p className="font12 text-danger">{errorsEdit.categoryId.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="warehouseEdit" className="form-label font14">
                  Warehouse <span className="text-danger">*</span>
                </label>
                <select
                  id="warehouseEdit"
                  className={`form-select font14 ${errorsEdit.warehouseId ? "border-danger" : ""}`}
                  {...registerEdit("warehouseId", { required: "Warehouse is required *" })}
                >
                  <option value="">--- Choose ---</option>
                  {warehouseData.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.warehouseName}
                    </option>
                  ))}
                </select>
                {errorsEdit.warehouseId && <p className="font12 text-danger">{errorsEdit.warehouseId.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="productNameEdit" className="form-label font14">
                  Product Name <span className="text-danger">*</span>
                </label>
                <input
                  id="productNameEdit"
                  type="text"
                  className={`form-control font14 ${errorsEdit.itemName ? "border-danger" : ""}`}
                  placeholder="Enter Product Name"
                  {...registerEdit("itemName", {
                    required: "Product Name is required *",
                    validate: {
                      startsWithUppercase: (value) => /^[A-Z]/.test(value) || "Product Name must start with an uppercase letter",
                      minLength: (value) => value.length >= 4 || "Minimum Length is 4",
                      validChars: (value) => /^[a-zA-Z\s'-]+$/.test(value) || "Invalid Characters in Product Name",
                    },
                  })}
                />
                {errorsEdit.itemName && <p className="font12 text-danger">{errorsEdit.itemName.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="productCodeEdit" className="form-label font14">
                  Product Code <span className="text-danger">*</span>
                </label>
                <input
                  id="productCodeEdit"
                  type="text"
                  className={`form-control font14 ${errorsEdit.productCode ? "border-danger" : ""}`}
                  placeholder="Enter Product Code"
                  {...registerEdit("productCode", {
                    required: "Product Code is required *",
                    validate: {
                      validFormat: (value) => /^[A-Z0-9-]{4,}$/.test(value) || "Product Code must be alphanumeric, at least 4 characters, and may include hyphens",
                    },
                  })}
                />
                {errorsEdit.productCode && <p className="font12 text-danger">{errorsEdit.productCode.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="descriptionEdit" className="form-label font14">
                  Description
                </label>
                <input
                  id="descriptionEdit"
                  type="text"
                  className={`form-control font14 ${errorsEdit.description ? "border-danger" : ""}`}
                  placeholder="Enter Description"
                  {...registerEdit("description", {
                    validate: (value) =>
                      !value ||
                      ((/^[A-Z]/.test(value) || "Description must start with an uppercase letter") &&
                        (value.length >= 4 || "Minimum Length is 4") &&
                        (/^[a-zA-Z\s'-]+$/.test(value) || "Invalid Characters in Description")),
                  })}
                />
                {errorsEdit.description && <p className="font12 text-danger">{errorsEdit.description.message}</p>}
              </div>
              <p className="text-center p-3">
                <button className="btn addButtons2 font14 text-white me-2" type="submit" disabled={!isValidEdit}>
                  Edit Product
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

        {/* Delete Offcanvas */}
        <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
          <div className="offcanvas-header ps-0 modalHighborder p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
            </Link>
            <span className="offcanvas-title" id="staticBackdropLabel">Product</span>
          </div>
          <div className="offcanvas-body p-0">
            {loaderState && <DataLoader />}
            <div style={{ zIndex: -1 }}>
              <p className="modalLightBorder p-2">Product</p>
              <p className="text-center p-3">
                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/errorI.svg" className="img-fluid" alt="Error" />
              </p>
              <p className="text-center warningHeading">Are you Sure?</p>
              <p className="text-center greyText warningText pt-2">
                This Action will permanently delete<br />the Product Data
              </p>
              <p className="text-center warningText p-2">
                <input
                  className="form-check-input formdltcheck me-2"
                  type="checkbox"
                  checked={isChecked}
                  id="flexCheckChecked"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                I Agree to delete the Product Data
              </p>
              <p className="text-center p-3">
                <button
                  className="btn deleteButtons text-white"
                  disabled={!isChecked}
                  onClick={() => deleteManageProductById(delProductId)}
                >
                  Delete
                </button>
                <button
                  className="btn dltcancelButtons ms-3"
                  data-bs-dismiss="offcanvas"
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

export default ManageProduct;
