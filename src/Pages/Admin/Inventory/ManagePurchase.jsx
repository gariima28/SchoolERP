import styled from "styled-components";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Download from "@mui/icons-material/Download";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import DataLoader from "src/Layouts/Loader";
import ActionControls from "../../../Layouts/ActionControls";
import {
  addNewManagePurchaseApi,
  getAllManagePurchaseApi,
  getManagePurchaseByIdApi,
  updateManagePurchaseByIdApi,
  deleteManagePurchaseByIdApi,
  getAllItemCategoryApi,
  getAllManageProductApi,
  getAllSupplierApi,
  GeyAllTeacherLightWeightGetAll,
  DownloadManagePurchaseExcel,
  DownloadManagePurchasePDF,
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

const tableHeadingData = [
  "#",
  "Supplier",
  "Category",
  "Product Name",
  "Purchase By",
  "Quantity",
  "Purchase Price",
  "Purchase Date",
  "Action",
];

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

const ManagePurchase = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // State Management
  const [loaderState, setLoaderState] = useState(false);
  const [managePurchaseData, setManagePurchaseData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [itemCategoryData, setItemCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [pdfResponse, setPDFResponse] = useState(null);
  const [searchInputVal, setSearchInputVal] = useState("");
  const [editPurchaseId, setEditPurchaseId] = useState("");
  const [delPurchaseId, setDelPurchaseId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [initialFormValues, setInitialFormValues] = useState({});
  const [viewPurchaseData, setViewPurchaseData] = useState(null);

  // Form instances
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd, isValid: isValidAdd },
    setValue: setValueAdd,
    reset: resetAdd,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit, isValid: isValidEdit },
    setValue: setValueEdit,
    reset: resetEdit,
    watch: watchEdit,
  } = useForm({
    mode: "onChange",
  });

  // Watch form values for totalPrice calculation
  const addFormValues = watch();
  const editFormValues = watchEdit();

  // Auto-calculate totalPrice
  useEffect(() => {
    const purchasePricePer = parseFloat(addFormValues.purchasePricePer) || 0;
    const quantity = parseInt(addFormValues.quantity) || 0;
    if (purchasePricePer && quantity) {
      setValueAdd("totalPrice", (purchasePricePer * quantity).toFixed(2));
    }
  }, [addFormValues.purchasePricePer, addFormValues.quantity, setValueAdd]);

  useEffect(() => {
    const purchasePricePer = parseFloat(editFormValues.purchasePricePer) || 0;
    const quantity = parseInt(editFormValues.quantity) || 0;
    if (purchasePricePer && quantity) {
      setValueEdit("totalPrice", (purchasePricePer * quantity).toFixed(2));
    }
  }, [editFormValues.purchasePricePer, editFormValues.quantity, setValueEdit]);

  // Fetch All Data
  useEffect(() => {
    getAllManagePurchaseData(searchInputVal);
    getAllSupplierData();
    getAllItemCategoryData();
    getAllProductData();
    getAllUserData();
  }, [token, pageNo, pageSize]);

  const getAllSupplierData = async () => {
    try {
      setLoaderState(true);
      const response = await getAllSupplierApi("", 1, 100);
      if (response?.status === 200 && response?.data?.status === "success") {
        setSupplierData(response.data.itemSuppliers || []);
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

  const getAllItemCategoryData = async () => {
    try {
      setLoaderState(true);
      const response = await getAllItemCategoryApi('', '', '');
      if (response?.status === 200 && response?.data?.status === "success") {
        setItemCategoryData(response.data.itemCategories || []);
      } else {
        toast.error(response?.data?.message || "Failed to fetch categories");
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
      toast.error("Error fetching categories");
    } finally {
      setLoaderState(false);
    }
  };

  const getAllProductData = async () => {
    try {
      setLoaderState(true);
      const response = await getAllManageProductApi('', '', '');
      if (response?.status === 200 && response?.data?.status === "success") {
        setProductData(response.data.items || []);
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

  const getAllUserData = async () => {
    try {
      setLoaderState(true);
      const response = await GeyAllTeacherLightWeightGetAll();
      if (response?.status === 200 && response?.data?.status === "success") {
        setUserData(response.data.allStaff || []);
      } else {
        toast.error(response?.data?.message || "Failed to fetch users");
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
      toast.error("Error fetching users");
    } finally {
      setLoaderState(false);
    }
  };

  const getAllManagePurchaseData = async (search = "") => {
    try {
      setLoaderState(true);
      const response = await getAllManagePurchaseApi(searchInputVal, pageNo, pageSize);
      if (response?.status === 200 && response?.data?.status === "success") {
        setManagePurchaseData(response.data.purchases || []);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(response.data.currentPage || 1);
      } else {
        toast.error(response?.data?.message || "Failed to fetch purchases");
      }
    } catch (error) {
      if (error?.response?.data?.statusType === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
      toast.error("Error fetching purchases");
    } finally {
      setLoaderState(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchInputVal(value);
    setPageNo(1);
  };

  // Fetch Purchase by ID for Editing or Viewing
  const getManagePurchaseDataById = async (id, isView = false) => {
    try {
      setLoaderState(true);
      setEditPurchaseId(isView ? "" : id);
      const response = await getManagePurchaseByIdApi(id);
      console.log(response, "Helo Response")
      if (response?.status === 200) {
        const data = response.data;
        console.log(data)
        console.log('first 1')
        const formValues = {
          supplierId: data.supplierId || "",
          categoryId: data.categoryId || "",
          itemId: data.itemId || "",
          userId: data.userId || "",
          unit: data.unit || "",
          purchasePricePer: data.purchasePrice || "",
          quantity: data.quantity || "",
          totalPrice: data.totalPrice || "",
          purchaseDate: data.purchaseDate || "",
        };
        console.log('first 2')
        if (isView) {
          console.log('first 3')
          setViewPurchaseData(data);
        } else {
          console.log('first 4')
          setValueEdit("supplierId", data.supplierId || "");
          setValueEdit("categoryId", data.categoryId || "");
          setValueEdit("itemId", data.itemId || "");
          setValueEdit("userId", data.userId || "");
          setValueEdit("unit", data.unit || "");
          setValueEdit("purchasePricePer", data.purchasePricePerPiece || "");
          setValueEdit("quantity", data.purchaseQuantity || "");
          setValueEdit("totalPrice", data.totalPrice || "");
          setValueEdit("purchaseDate", data.purchaseDate || "");
          setInitialFormValues(formValues);
        }
      } else {
        console.log('first 5')
        toast.error(response?.data?.message || `Failed to fetch ${isView ? "view" : "edit"} purchase`);
      }
    } catch (error) {
      console.log('first 6')
      toast.error(`Error fetching ${isView ? "view" : "edit"} purchase`);
    } finally {
      setLoaderState(false);
    }
  };

  // Add New Purchase
  const addNewManagePurchase = async (data) => {
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append("supplierId", data.supplierId);
      formData.append("categoryId", data.categoryId);
      formData.append("itemId", data.itemId);
      formData.append("userId", data.userId);
      formData.append("unit", data.unit);
      formData.append("purchasePrice", data.purchasePricePer);
      formData.append("quantity", data.quantity);
      formData.append("totalPrice", data.totalPrice);
      formData.append("purchaseDate", data.purchaseDate);
      const response = await addNewManagePurchaseApi(formData);
      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success(response.data.message);
        getAllManagePurchaseData(searchInputVal);
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
        toast.error(response?.data?.message || "Failed to add purchase");
      }
    } catch (error) {
      toast.error("Error adding purchase");
    } finally {
      setLoaderState(false);
    }
  };

  // Update Purchase
  const updateManagePurchase = async (data) => {
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append("supplierId", data.supplierId);
      formData.append("categoryId", data.categoryId);
      formData.append("itemId", data.itemId);
      formData.append("userId", data.userId);
      formData.append("unit", data.unit);
      formData.append("purchasePrice", data.purchasePricePer);
      formData.append("quantity", data.quantity);
      formData.append("totalPrice", data.totalPrice);
      formData.append("purchaseDate", data.purchaseDate);
      const response = await updateManagePurchaseByIdApi(editPurchaseId, formData);
      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success(response.data.message);
        getAllManagePurchaseData(searchInputVal);
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
        toast.error(response?.data?.message || "Failed to update purchase");
        setValueEdit("supplierId", initialFormValues.supplierId);
        setValueEdit("categoryId", initialFormValues.categoryId);
        setValueEdit("itemId", initialFormValues.itemId);
        setValueEdit("userId", initialFormValues.userId);
        setValueEdit("unit", initialFormValues.unit);
        setValueEdit("purchasePricePer", initialFormValues.purchasePricePer);
        setValueEdit("quantity", initialFormValues.quantity);
        setValueEdit("totalPrice", initialFormValues.totalPrice);
        setValueEdit("purchaseDate", initialFormValues.purchaseDate);
      }
    } catch (error) {
      toast.error("Error updating purchase");
      setValueEdit("supplierId", initialFormValues.supplierId);
      setValueEdit("categoryId", initialFormValues.categoryId);
      setValueEdit("itemId", initialFormValues.itemId);
      setValueEdit("userId", initialFormValues.userId);
      setValueEdit("unit", initialFormValues.unit);
      setValueEdit("purchasePricePer", initialFormValues.purchasePricePer);
      setValueEdit("quantity", initialFormValues.quantity);
      setValueEdit("totalPrice", initialFormValues.totalPrice);
      setValueEdit("purchaseDate", initialFormValues.purchaseDate);
    } finally {
      setLoaderState(false);
    }
  };

  // Delete Purchase
  const deleteManagePurchaseById = async (id) => {
    if (!isChecked) return;
    try {
      setLoaderState(true);
      const response = await deleteManagePurchaseByIdApi(id);
      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success(response.data.message);
        getAllManagePurchaseData(searchInputVal);
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
        toast.error(response?.data?.message || "Failed to delete purchase");
      }
    } catch (error) {
      toast.error("Error deleting purchase");
    } finally {
      setLoaderState(false);
    }
  };

  // Download CSV
  const DownloadCSV = async () => {
    try {
      const response = await DownloadManagePurchaseExcel();
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
      const response = await DownloadManagePurchasePDF();
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
      link.download = "Purchase Data.pdf";
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
                  <a href="/admin/inventory/issueItem" className="bredcrumText text-decoration-none">Inventory</a>
                </li>
                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Purchase</li>
              </ol>
            </nav>
            <p className="font14 ps-0 fontWeight500">Manage Purchase</p>
          </div>
          <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
            <ActionControls
              showAddButton={true}
              addButtonText="Add Purchase"
              addButtonAction={() => {
                resetAdd();
                const offcanvasElement = document.getElementById("add_staticBackdrop");
                const offcanvas =
                  bootstrap.Offcanvas.getInstance(offcanvasElement) ||
                  new bootstrap.Offcanvas(offcanvasElement);
                offcanvas.show();
              }}
              showExportPDF={managePurchaseData.length > 0}
              exportPDFText="Export PDF"
              exportPDFAction={DownloadManagePurchasePDF}
              exportPDFFileName="Purchase.pdf"
              showExportCSV={managePurchaseData.length > 0}
              exportCSVText="Export CSV"
              exportCSVAction={DownloadManagePurchaseExcel}
              exportCSVFileName="Purchase.xlsx"
              showSearch={true}
              searchValue={searchInputVal}
              searchAction={getAllManagePurchaseData}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="row pb-3">
          <div className="bg-white rounded-2 p-3">
            {managePurchaseData.length > 0 ? (
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
                    {managePurchaseData.map((item, index) => (
                      <tr key={item.id} className="align-middle">
                        <td className="textWrapClass greyText font14">{(pageNo - 1) * pageSize + index + 1}</td>
                        <td className="textWrapClass greyText font14">{item.supplierName}</td>
                        <td className="textWrapClass greyText font14">{item.categoryName}</td>
                        <td className="textWrapClass greyText font14">{item.itemName}</td>
                        <td className="textWrapClass greyText font14">{item.purchaseBy}</td>
                        <td className="textWrapClass greyText font14">{item.purchaseQuantity}</td>
                        <td className="textWrapClass greyText font14">{item.purchasePricePerPiece}</td>
                        <td className="textWrapClass greyText font14">{item.purchaseDate}</td>
                        <td className="text-end">
                          <span
                            className="ps-4 greyText"
                            data-bs-toggle="modal"
                            data-bs-target="#viewDetails"
                            style={{ cursor: "pointer" }}
                            onClick={() => getManagePurchaseDataById(item.id, true)}
                          >
                            <RemoveRedEyeOutlinedIcon />
                          </span>
                          <span
                            className="ps-4 greyText"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#Edit_staticBackdrop"
                            aria-controls="Edit_staticBackdrop"
                            style={{ cursor: "pointer" }}
                            onClick={() => getManagePurchaseDataById(item.id)}
                          >
                            <DriveFileRenameOutlineOutlinedIcon />
                          </span>
                          <span
                            className="ps-4 greyText"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#Delete_staticBackdrop"
                            aria-controls="Delete_staticBackdrop"
                            style={{ cursor: "pointer" }}
                            onClick={() => setDelPurchaseId(item.id)}
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
                <img src="/images/search.svg" alt="No data" className="img-fluid p-5" />
              </div>
            )}
          </div>
        </div>

        {/* View Modal */}
        <div className="modal modal-lg fade" id="viewDetails" tabIndex="-1" aria-labelledby="viewDetailsLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header p-2 px-3">
                <h2 className="modal-title" id="viewDetailsLabel">View Purchase</h2>
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
                        <div className="col-5"><span>Supplier</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewPurchaseData?.supplierName || "-"}</span></div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Category</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewPurchaseData?.categoryName || "-"}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Product Name</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewPurchaseData?.itemName || "-"}</span></div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Purchase By</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewPurchaseData?.purchaseBy || "-"}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Unit</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewPurchaseData?.unit || "-"}</span></div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Purchase Price</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewPurchaseData?.purchasePricePerPiece || "-"}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Quantity</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewPurchaseData?.purchaseQuantity || "-"}</span></div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Total Price</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewPurchaseData?.totalPrice || "-"}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6">
                      <div className="row">
                        <div className="col-5"><span>Purchase Date</span></div>
                        <div className="col-2"><span>:</span></div>
                        <div className="col-5"><span>{viewPurchaseData?.purchaseDate || "-"}</span></div>
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
            <h2 className="offcanvas-title" id="staticBackdropLabel">Purchase Add</h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitAdd(addNewManagePurchase)}>
              <div className="mb-3">
                <label htmlFor="supplierAdd" className="form-label font14">
                  Supplier <span className="text-danger">*</span>
                </label>
                <select
                  id="supplierAdd"
                  className={`form-select font14 ${errorsAdd.supplierId ? "border-danger" : ""}`}
                  {...registerAdd("supplierId", { required: "Supplier is required *" })}
                >
                  <option value="">--- Choose ---</option>
                  {supplierData.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.supplierName}
                    </option>
                  ))}
                </select>
                {errorsAdd.supplierId && <p className="font12 text-danger">{errorsAdd.supplierId.message}</p>}
              </div>
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
                <label htmlFor="productNameAdd" className="form-label font14">
                  Product Name <span className="text-danger">*</span>
                </label>
                <select
                  id="productNameAdd"
                  className={`form-select font14 ${errorsAdd.itemId ? "border-danger" : ""}`}
                  {...registerAdd("itemId", { required: "Product Name is required *" })}
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
                <label htmlFor="purchaseByAdd" className="form-label font14">
                  Purchase By <span className="text-danger">*</span>
                </label>
                <select
                  id="purchaseByAdd"
                  className={`form-select font14 ${errorsAdd.userId ? "border-danger" : ""}`}
                  {...registerAdd("userId", { required: "Purchase By is required *" })}
                >
                  <option value="">--- Choose ---</option>
                  {userData.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.staffName}
                    </option>
                  ))}
                </select>
                {errorsAdd.userId && <p className="font12 text-danger">{errorsAdd.userId.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="unitAdd" className="form-label font14">
                  Unit <span className="text-danger">*</span>
                </label>
                <select
                  id="unitAdd"
                  className={`form-select font14 ${errorsAdd.unit ? "border-danger" : ""}`}
                  {...registerAdd("unit", { required: "Unit is required *" })}
                >
                  <option value="">--- Choose ---</option>
                  <option value="PIECE">PIECE</option>
                  <option value="KG">KG</option>
                  <option value="LITER">LITER</option>
                  <option value="METER">METER</option>
                  <option value="BOX">BOX</option>
                  <option value="PACKET">PACKET</option>
                </select>
                {errorsAdd.unit && <p className="font12 text-danger">{errorsAdd.unit.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="purchasePricePerAdd" className="form-label font14">
                  Purchase Price Per <span className="text-danger">*</span>
                </label>
                <input
                  id="purchasePricePerAdd"
                  type="number"
                  step="0.01"
                  className={`form-control font14 ${errorsAdd.purchasePricePer ? "border-danger" : ""}`}
                  placeholder="Enter Purchase Price Per"
                  {...registerAdd("purchasePricePer", {
                    required: "Purchase Price Per is required *",
                    min: { value: 0.01, message: "Purchase Price Per must be greater than 0" },
                    validate: (value) =>
                      /^\d+(\.\d{1,2})?$/.test(value) || "Purchase Price Per must have up to 2 decimal places",
                  })}
                />
                {errorsAdd.purchasePricePer && <p className="font12 text-danger">{errorsAdd.purchasePricePer.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="quantityAdd" className="form-label font14">
                  Quantity <span className="text-danger">*</span>
                </label>
                <input
                  id="quantityAdd"
                  type="number"
                  className={`form-control font14 ${errorsAdd.quantity ? "border-danger" : ""}`}
                  placeholder="Enter Quantity"
                  {...registerAdd("quantity", {
                    required: "Quantity is required *",
                    min: { value: 1, message: "Quantity must be at least 1" },
                    validate: (value) => Number.isInteger(Number(value)) || "Quantity must be an integer",
                  })}
                />
                {errorsAdd.quantity && <p className="font12 text-danger">{errorsAdd.quantity.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="totalPurchasePriceAdd" className="form-label font14">
                  Total Purchase Price <span className="text-danger">*</span>
                </label>
                <input
                  id="totalPurchasePriceAdd"
                  type="number"
                  step="0.01"
                  className={`form-control font14 ${errorsAdd.totalPrice ? "border-danger" : ""}`}
                  placeholder="Auto-calculated"
                  readOnly
                  {...registerAdd("totalPrice", {
                    required: "Total Purchase Price is required *",
                    min: { value: 0.01, message: "Total Purchase Price must be greater than 0" },
                    validate: (value) =>
                      /^\d+(\.\d{1,2})?$/.test(value) || "Total Purchase Price must have up to 2 decimal places",
                  })}
                />
                {errorsAdd.totalPrice && <p className="font12 text-danger">{errorsAdd.totalPrice.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="purchaseDateAdd" className="form-label font14">
                  Purchase Date <span className="text-danger">*</span>
                </label>
                <input
                  id="purchaseDateAdd"
                  type="date"
                  className={`form-control font14 ${errorsAdd.purchaseDate ? "border-danger" : ""}`}
                  placeholder="Enter Purchase Date"
                  {...registerAdd("purchaseDate", {
                    required: "Purchase Date is required *",
                    validate: (value) =>
                      /^\d{4}-\d{2}-\d{2}$/.test(value) || "Purchase Date must be in YYYY-MM-DD format",
                  })}
                />
                {errorsAdd.purchaseDate && <p className="font12 text-danger">{errorsAdd.purchaseDate.message}</p>}
              </div>
              <p className="text-center p-3">
                <button className="btn addButtons2 font14 text-white me-2" type="submit" disabled={!isValidAdd}>
                  Add Purchase
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
            <h2 className="offcanvas-title" id="staticBackdropLabel">Purchase Edit</h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitEdit(updateManagePurchase)}>
              <div className="mb-3">
                <label htmlFor="supplierEdit" className="form-label font14">
                  Supplier <span className="text-danger">*</span>
                </label>
                <select
                  id="supplierEdit"
                  className={`form-select font14 ${errorsEdit.supplierId ? "border-danger" : ""}`}
                  {...registerEdit("supplierId", { required: "Supplier is required *" })}
                >
                  <option value="">--- Choose ---</option>
                  {supplierData.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.supplierName}
                    </option>
                  ))}
                </select>
                {errorsEdit.supplierId && <p className="font12 text-danger">{errorsEdit.supplierId.message}</p>}
              </div>
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
                <label htmlFor="productNameEdit" className="form-label font14">
                  Product Name <span className="text-danger">*</span>
                </label>
                <select
                  id="productNameEdit"
                  className={`form-select font14 ${errorsEdit.itemId ? "border-danger" : ""}`}
                  {...registerEdit("itemId", { required: "Product Name is required *" })}
                >
                  <option value="">--- Choose ---</option>
                  {productData.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.itemName}
                    </option>
                  ))}
                </select>
                {errorsEdit.itemId && <p className="font12 text-danger">{errorsEdit.itemId.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="purchaseByEdit" className="form-label font14">
                  Purchase By <span className="text-danger">*</span>
                </label>
                <select
                  id="purchaseByEdit"
                  className={`form-select font14 ${errorsEdit.userId ? "border-danger" : ""}`}
                  {...registerEdit("userId", { required: "Purchase By is required *" })}
                >
                  <option value="">--- Choose ---</option>
                  {userData.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.staffName}
                    </option>
                  ))}
                </select>
                {errorsEdit.userId && <p className="font12 text-danger">{errorsEdit.userId.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="unitEdit" className="form-label font14">
                  Unit <span className="text-danger">*</span>
                </label>
                <select
                  id="unitEdit"
                  className={`form-select font14 ${errorsEdit.unit ? "border-danger" : ""}`}
                  {...registerEdit("unit", { required: "Unit is required *" })}
                >
                  <option value="">--- Choose ---</option>
                  <option value="PIECE">PIECE</option>
                  <option value="KG">KG</option>
                  <option value="LITER">LITER</option>
                  <option value="METER">METER</option>
                  <option value="BOX">BOX</option>
                  <option value="PACKET">PACKET</option>
                </select>
                {errorsEdit.unit && <p className="font12 text-danger">{errorsEdit.unit.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="purchasePricePerEdit" className="form-label font14">
                  Purchase Price Per <span className="text-danger">*</span>
                </label>
                <input
                  id="purchasePricePerEdit"
                  type="number"
                  step="0.01"
                  className={`form-control font14 ${errorsEdit.purchasePricePer ? "border-danger" : ""}`}
                  placeholder="Enter Purchase Price Per"
                  {...registerEdit("purchasePricePer", {
                    required: "Purchase Price Per is required *",
                    min: { value: 0.01, message: "Purchase Price Per must be greater than 0" },
                    validate: (value) =>
                      /^\d+(\.\d{1,2})?$/.test(value) || "Purchase Price Per must have up to 2 decimal places",
                  })}
                />
                {errorsEdit.purchasePricePer && <p className="font12 text-danger">{errorsEdit.purchasePricePer.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="quantityEdit" className="form-label font14">
                  Quantity <span className="text-danger">*</span>
                </label>
                <input
                  id="quantityEdit"
                  type="number"
                  className={`form-control font14 ${errorsEdit.quantity ? "border-danger" : ""}`}
                  placeholder="Enter Quantity"
                  {...registerEdit("quantity", {
                    required: "Quantity is required *",
                    min: { value: 1, message: "Quantity must be at least 1" },
                    validate: (value) => Number.isInteger(Number(value)) || "Quantity must be an integer",
                  })}
                />
                {errorsEdit.quantity && <p className="font12 text-danger">{errorsEdit.quantity.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="totalPurchasePriceEdit" className="form-label font14">
                  Total Purchase Price <span className="text-danger">*</span>
                </label>
                <input
                  id="totalPurchasePriceEdit"
                  type="number"
                  step="0.01"
                  className={`form-control font14 ${errorsEdit.totalPrice ? "border-danger" : ""}`}
                  placeholder="Auto-calculated"
                  readOnly
                  {...registerEdit("totalPrice", {
                    required: "Total Purchase Price is required *",
                    min: { value: 0.01, message: "Total Purchase Price must be greater than 0" },
                    validate: (value) =>
                      /^\d+(\.\d{1,2})?$/.test(value) || "Total Purchase Price must have up to 2 decimal places",
                  })}
                />
                {errorsEdit.totalPrice && <p className="font12 text-danger">{errorsEdit.totalPrice.message}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="purchaseDateEdit" className="form-label font14">
                  Purchase Date <span className="text-danger">*</span>
                </label>
                <input
                  id="purchaseDateEdit"
                  type="date"
                  className={`form-control font14 ${errorsEdit.purchaseDate ? "border-danger" : ""}`}
                  placeholder="Enter Purchase Date"
                  {...registerEdit("purchaseDate", {
                    required: "Purchase Date is required *",
                    validate: (value) =>
                      /^\d{4}-\d{2}-\d{2}$/.test(value) || "Purchase Date must be in YYYY-MM-DD format",
                  })}
                />
                {errorsEdit.purchaseDate && <p className="font12 text-danger">{errorsEdit.purchaseDate.message}</p>}
              </div>
              <p className="text-center p-3">
                <button className="btn addButtons2 font14 text-white me-2" type="submit" disabled={!isValidEdit}>
                  Edit Purchase
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
            <span className="offcanvas-title" id="staticBackdropLabel">Purchase</span>
          </div>
          <div className="offcanvas-body p-0">
            {loaderState && <DataLoader />}
            <div style={{ zIndex: -1 }}>
              <p className="modalLightBorder p-2">Purchase</p>
              <p className="text-center p-3">
                <img src="/images/errorI.svg" className="img-fluid" alt="Error" />
              </p>
              <p className="text-center warningHeading">Are you Sure?</p>
              <p className="text-center greyText warningText pt-2">
                This Action will permanently delete<br />the Purchase Data
              </p>
              <p className="text-center warningText p-2">
                <input
                  className="form-check-input formdltcheck me-2"
                  type="checkbox"
                  checked={isChecked}
                  id="flexCheckChecked"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                I Agree to delete the Purchase Data
              </p>
              <p className="text-center p-3">
                <button
                  className="btn deleteButtons text-white"
                  disabled={!isChecked}
                  onClick={() => deleteManagePurchaseById(delPurchaseId)}
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

export default ManagePurchase;
