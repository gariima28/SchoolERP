import styled from "styled-components";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Download from "@mui/icons-material/Download";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Icon } from "@iconify/react";
import DataLoader from "src/Layouts/Loader";
import {
  getAllItemCategoryApi,
  getItemCategoryByIdApi,
  addNewItemCategoryApi,
  updateItemCategoryByIdApi,
  deleteItemCategoryByIdApi,
  DownloadItemCategoryExcel,
  DownloadItemCategoryPDF,
} from "src/Utils/Apis";
import ActionControls from "../../../Layouts/ActionControls";
import * as bootstrap from "bootstrap";

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

const tableHeadingData = ["#", "Category Name", "Description", "Action"];

const ItemCategory = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  // State Management
  const [loaderState, setLoaderState] = useState(false);
  const [itemCategoryData, setItemCategoryData] = useState([]);
  const [searchInputVal, setSearchInputVal] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [delCategoryId, setDelCategoryId] = useState("");
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

  // Fetch All Item Categories
  useEffect(() => {
    getAllItemCategoryData(searchInputVal);
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
        sessionStorage.removeItem("token");
        navigate("/");
      }
      toast.error("Error fetching item categories");
    } finally {
      setLoaderState(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchInputVal(value);
    setPageNo(1); // Reset to first page on search change
  };

  // Fetch Item Category by ID for Editing
  const getItemCategoryDataById = async (id) => {
    try {
      setLoaderState(true);
      setEditCategoryId(id);
      const response = await getItemCategoryByIdApi(id);
      if (response?.status === 200 && response?.data?.status === "success") {
        const data = response.data.itemCategory;
        const formValues = {
          name: data.name || "",
          description: data.description || "",
        };
        setValueEdit("name", data.name);
        setValueEdit("description", data.description || "");
        setInitialFormValues(formValues);
      } else {
        toast.error(response?.data?.message || "Failed to fetch item category");
      }
    } catch (error) {
      toast.error("Error fetching item category");
    } finally {
      setLoaderState(false);
    }
  };

  // Add New Item Category
  const addNewItemCategory = async (data) => {
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      const response = await addNewItemCategoryApi(formData);
      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success(response.data.message);
        getAllItemCategoryData(searchInputVal);
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
        toast.error(response?.data?.message || "Failed to add item category");
      }
    } catch (error) {
      toast.error("Error adding item category");
    } finally {
      setLoaderState(false);
    }
  };

  // Update Item Category
  const updateItemCategory = async (data) => {
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");
      const response = await updateItemCategoryByIdApi(editCategoryId, formData);
      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success(response.data.message);
        document
          .querySelector('#Edit_staticBackdrop [data-bs-dismiss="offcanvas"]')
          ?.click();
        getAllItemCategoryData('');
        resetEdit();
        setInitialFormValues({});
      } else {
        toast.error(response?.data?.message || "Failed to update item category");
        setValueEdit("name", initialFormValues.name);
        setValueEdit("description", initialFormValues.description);
      }
    } catch (error) {
      toast.error("Error updating item category");
      setValueEdit("name", initialFormValues.name);
      setValueEdit("description", initialFormValues.description);
    } finally {
      setLoaderState(false);
    }
  };

  // Delete Item Category
  const deleteItemCategoryById = async (id) => {
    if (!isChecked) return;
    try {
      setLoaderState(true);
      const response = await deleteItemCategoryByIdApi(id);
      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success(response.data.message);
        getAllItemCategoryData(searchInputVal);
        setIsChecked(false);
        document
          .querySelector('#Delete_staticBackdrop [data-bs-dismiss="offcanvas"]')
          ?.click();
      } else {
        toast.error(response?.data?.message || "Failed to delete item category");
      }
    } catch (error) {
      toast.error("Error deleting item category");
    } finally {
      setLoaderState(false);
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
      toast.error("Unable to open Add Item Category form");
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
                  <a href="/admin/inventory/itemsupplier" className="bredcrumText text-decoration-none">
                    Inventory
                  </a>
                </li>
                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">
                  Category
                </li>
              </ol>
            </nav>
            <p className="font14 ps-0 fontWeight500">Category</p>
          </div>
          <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
            <ActionControls
              showAddButton={true}
              addButtonText="Add Category"
              addButtonAction={handleAddOffcanvasOpen}
              // showExportPDF={false}
              showExportPDF={false}
              exportPDFText="Export PDF"
              exportPDFAction={DownloadItemCategoryPDF}
              // showExportCSV={itemCategoryData.length > 0}
              showExportCSV={false}
              exportCSVText="Export CSV"
              exportCSVAction={DownloadItemCategoryExcel}
              showSearch={true}
              searchValue={searchInputVal}
              searchAction={getAllItemCategoryData}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-3 overflow-scroll">
            {itemCategoryData.length > 0 ? (
              <>
                <table className="table align-middle table-striped">
                  <thead>
                    <tr>
                      {tableHeadingData.map((item) => (
                        <th
                          key={item}
                          className={`textWrapClass font14 ${item === "Action" ? "text-end" : ""}`}
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {itemCategoryData.map((item, index) => (
                      <tr key={item.id} className="align-middle">
                        <td className="textWrapClass greyText font14">{(pageNo - 1) * pageSize + index + 1}</td>
                        <td className="textWrapClass greyText font14">{item.name}</td>
                        <td className="textWrapClass greyText font14">{item.description || "-"}</td>
                        <td className="text-end">
                          <span
                            className="ps-4 greyText"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#Edit_staticBackdrop"
                            aria-controls="Edit_staticBackdrop"
                            style={{ cursor: "pointer" }}
                            onClick={() => getItemCategoryDataById(item.id)}
                          >
                            <DriveFileRenameOutlineOutlinedIcon />
                          </span>
                          <span
                            className="ps-4 greyText"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#Delete_staticBackdrop"
                            aria-controls="Delete_staticBackdrop"
                            style={{ cursor: "pointer" }}
                            onClick={() => setDelCategoryId(item.id)}
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
                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="No data" className="img-fluid p-5" />
              </div>
            )}
          </div>
        </div>

        {/* Add Item Category */}
        <div
          className="offcanvas offcanvas-end p-2"
          data-bs-backdrop="static"
          tabIndex="-1"
          id="add_staticBackdrop"
          aria-labelledby="staticBackdropLabel"
        >
          <div className="offcanvas-header border-bottom border-2 p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path
                  fill="#008479"
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
            <h2 className="offcanvas-title" id="staticBackdropLabel">
              Category Add
            </h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitAdd(addNewItemCategory)}>
              <div className="mb-3">
                <label htmlFor="nameAdd" className="form-label font14">
                  Category Name <span className="text-danger">*</span>
                </label>
                <input
                  id="nameAdd"
                  type="text"
                  className={`form-control font14 ${errorsAdd.name ? "border-danger" : ""}`}
                  placeholder="Enter Category Name"
                  {...registerAdd("name", {
                    required: "Category Name is required *",
                    validate: {
                      startsWithUppercase: (value) =>
                        /^[A-Z]/.test(value) || "Category Name must start with an uppercase letter",
                      minLength: (value) => value.length >= 4 || "Minimum Length is 4",
                      validChars: (value) =>
                        /^[a-zA-Z\s'-]+$/.test(value) || "Invalid Characters in Category Name",
                    },
                  })}
                />
                {errorsAdd.name && <p className="font12 text-danger">{errorsAdd.name.message}</p>}
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
                {errorsAdd.description && (
                  <p className="font12 text-danger">{errorsAdd.description.message}</p>
                )}
              </div>
              <p className="text-center p-3">
                <button
                  className="btn addButtons2 font14 text-white me-2"
                  type="submit"
                  disabled={!isValidAdd}
                >
                  Add Category
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

        {/* Edit Item Category */}
        <div
          className="offcanvas offcanvas-end p-2"
          data-bs-backdrop="static"
          tabIndex="-1"
          id="Edit_staticBackdrop"
          aria-labelledby="staticBackdropLabel"
        >
          <div className="offcanvas-header border-bottom border-2 p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path
                  fill="#008479"
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
            <h2 className="offcanvas-title" id="staticBackdropLabel">
              Category Edit
            </h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitEdit(updateItemCategory)}>
              <div className="mb-3">
                <label htmlFor="nameEdit" className="form-label font14">
                  Category Name <span className="text-danger">*</span>
                </label>
                <input
                  id="nameEdit"
                  type="text"
                  className={`form-control font14 ${errorsEdit.name ? "border-danger" : ""}`}
                  placeholder="Enter Category Name"
                  {...registerEdit("name", {
                    required: "Category Name is required *",
                    validate: {
                      startsWithUppercase: (value) =>
                        /^[A-Z]/.test(value) || "Category Name must start with an uppercase letter",
                      minLength: (value) => value.length >= 4 || "Minimum Length is 4",
                      validChars: (value) =>
                        /^[a-zA-Z\s'-]+$/.test(value) || "Invalid Characters in Category Name",
                    },
                  })}
                />
                {errorsEdit.name && <p className="font12 text-danger">{errorsEdit.name.message}</p>}
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
                {errorsEdit.description && (
                  <p className="font12 text-danger">{errorsEdit.description.message}</p>
                )}
              </div>
              <p className="text-center p-3">
                <button
                  className="btn addButtons2 font14 text-white me-2"
                  type="submit"
                  disabled={!isValidEdit}
                >
                  Edit Category
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

        {/* Delete Item Category */}
        <div
          className="offcanvas offcanvas-end p-2"
          data-bs-backdrop="static"
          tabIndex="-1"
          id="Delete_staticBackdrop"
          aria-labelledby="staticBackdropLabel"
        >
          <div className="offcanvas-header ps-0 modalHighborder p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path
                  fill="#B50000"
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
            <span className="offcanvas-title" id="staticBackdropLabel">
              Category
            </span>
          </div>
          <div className="offcanvas-body p-0">
            {loaderState && <DataLoader />}
            <div className="" style={{ zIndex: -1 }}>
              <p className="modalLightBorder p-2">Category</p>
              <p className="text-center p-3">
                <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/errorI.svg" className="img-fluid" alt="Error" />
              </p>
              <p className="text-center warningHeading">Are you Sure?</p>
              <p className="text-center greyText warningText pt-2">
                This Action will permanently delete<br />the Category Data
              </p>
              <p className="text-center warningText p-2">
                <input
                  className="form-check-input formdltcheck me-2"
                  type="checkbox"
                  checked={isChecked}
                  id="flexCheckChecked"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                I Agree to delete the Category Data
              </p>
              <p className="text-center p-3">
                <button
                  className="btn deleteButtons text-white"
                  disabled={!isChecked}
                  onClick={() => deleteItemCategoryById(delCategoryId)}
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

export default ItemCategory;
