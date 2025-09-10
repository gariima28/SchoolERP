import { Icon } from "@iconify/react";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import DataLoader from "src/Layouts/Loader";
import {
  DownloadFeeTypeExcel,
  DownloadFeeTypePDF,
  deleteFeeTypeByIdApi,
  getAllFeeTypeApi,
} from "src/Utils/Apis";
import ActionControls from "../../../Layouts/ActionControls";
import * as bootstrap from "bootstrap";
import debounce from "lodash/debounce";
import {
  addNewFeeTypeApi,
  getAllClassApi,
  getFeeTypeByIdApi,
  updateFeeTypeByIdApi,
} from "../../../Utils/Apis";
import { addFeesApi, getAllFeesApi, updateFeesApi } from "../../../Utils/Apis";

const Container = styled.div`
  .blueText {
    color: var(--blueTextColor);
  }

  .form-check-input {
    height: 18px !important;
    width: 18px !important;
  }

  .form-check-input:checked {
    align-self: center;
    background-color: #008479;
    border-color: #008479;
    box-shadow: none !important;
  }

  .form-check-input:focus {
    box-shadow: none !important;
    outline: none;
  }

  .custom-fee-table > :not(caption) > * > * {
    border-bottom: 1px solid #fff !important;
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
    border-radius: 5px;
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
    --bs-breadcrumb-divider: ">" !important;
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

// base64ToBlob function remains the same
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

const FeesType = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // State Management
  const [loaderState, setloaderState] = useState(false);
  const [feeTypeData, setFeeTypeData] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [pdfResponse, setPDFResponse] = useState(null);
  const [searchInputVal, setSearchInputVal] = useState("");
  const [editId, setEditId] = useState("");
  const [Originaltitle, setOriginaltitle] = useState("");
  const [OriginalDescription, setOriginalDescription] = useState("");
  const [delFeeTypeId, setDelFeeTypeId] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [allClassData, setAllClassData] = useState([]);

  // Form instances remain the same
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
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    formState: { errors: errorsUpdate, isValid: isValidUpdate },
    setValue: setValueUpdate,
    reset: resetUpdate,
  } = useForm({
    mode: "onChange",
  });

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value.trim() === "") {
        setPageNo(1);
        getAllFeeTypeData(value);
      } else {
        setPageNo(1);
        getAllFeeTypeData(value);
      }
    }, 2000),
    []
  );

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchInputVal(value);
    debouncedSearch(value);
  };

  // Fetch All Fee Types
  useEffect(() => {
    getAllFeeTypeData(searchInputVal);
    getAllClassData();
  }, [token, pageNo, pageSize]);

  const getAllFeeTypeData = async (searchKey) => {
    try {
      setloaderState(true);
      var response = await getAllFeeTypeApi(
        searchKey === "search" ? "" : searchKey,
        pageNo,
        pageSize
      );
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          setloaderState(false);
          setFeeTypeData(response?.data?.feeTypes);
          setTotalPages(response?.data?.totalPages);
          setCurrentPage(response?.data?.currentPage);
        } else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      } else {
        setloaderState(false);
        toast.error(response?.data?.message);
      }
    } catch (error) {
      setloaderState(false);
      toast.error(error?.response?.data?.message);
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem("token");
        setTimeout(() => {}, 200);
      }
    }
    finally {
      setloaderState(false);
    }
  };

  const DeleteFeeTypeById = async (id) => {
    if (isChecked) {
      try {
        var response = await deleteFeeTypeByIdApi(id);
        if (response?.status === 200) {
          if (response.data.status === "success") {
            toast.success(response?.data?.message);
            setIsChecked(false);
            const offcanvasElement = document.getElementById("deleteFeeType");
            const offcanvas =
              bootstrap.Offcanvas.getInstance(offcanvasElement) ||
              new bootstrap.Offcanvas(offcanvasElement);
            offcanvas.hide();
            getAllFeeTypeData("");
          }
        } else {
          toast.error(response?.error);
        }
      } catch (error) {
        setloaderState(false);
        toast.error(error?.response?.data?.message);
      }
      finally {
        setloaderState(false);
      }
    }
  };

  // Handle Search Button Click
  const handleSearchButton = () => {
    if (searchInputVal.trim() === "") {
      toast.error("Search key is empty");
      return;
    }
    setPageNo(1);
    getAllFeeTypeData(searchInputVal);
  };

  // Add New Fee Type
  const addNewFeeType = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description || "");

      setloaderState(true);
      const response = await addNewFeeTypeApi(formData);
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          setloaderState(false);
          toast.success(response?.data?.message);
          const offcanvasElement = document.getElementById("addFeeType");
          const offcanvas =
            bootstrap.Offcanvas.getInstance(offcanvasElement) ||
            new bootstrap.Offcanvas(offcanvasElement);
          offcanvas.hide();
          getAllFeeTypeData("");
          setTimeout(() => {
            resetAdd();
          }, 700);
        } else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      } else {
        setloaderState(false);
        toast.error(response?.data?.message);
      }
    } catch (error) {
      setloaderState(false);
      toast.error(error?.response?.data?.message);
    }
    finally {
      setloaderState(false);
    }
  };

  const getFeeTypeDataById = async (editId) => {
    setEditId(editId);
    try {
      setloaderState(true);
      var response = await getFeeTypeByIdApi(editId);
      // // console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          setloaderState(false);
          setValueUpdate("title", response?.data?.feeType?.title);
          setValueUpdate("description", response?.data?.feeType?.description);
          setOriginaltitle(response?.data?.feeType?.title);
          setOriginalDescription(response?.data?.feeType?.description);
        } else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      } else {
        setloaderState(false);
        toast.error(response?.data?.message);
      }
    } catch (error) {
      setloaderState(false);
      toast.error(error?.response?.data?.message);
    }
    finally {
      setloaderState(false);
    }
  };

  const updateFeeType = async (data) => {
    try {
      const formData = new FormData();
      if (data?.title !== Originaltitle) {
        formData.append("title", data?.title);
      }
      if (data?.description !== OriginalDescription) {
        formData.append("description", data?.description);
      }

      var response = await updateFeeTypeByIdApi(editId, formData);
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          setloaderState(false);
          toast.success(response?.data?.message);
          const offcanvasElement = document.getElementById("editFeeType");
          const offcanvas =
            bootstrap.Offcanvas.getInstance(offcanvasElement) ||
            new bootstrap.Offcanvas(offcanvasElement);
          offcanvas.hide();
          getAllFeeTypeData("");
          setTimeout(() => {
            resetUpdate();
          }, 700);
        } else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      } else {
        setloaderState(false);
        toast.error(response?.data?.message);
      }
    } catch (error) {
      setloaderState(false);
      toast.error(error?.response?.data?.message);
    }
    finally {
      setloaderState(false);
    }
  };

  // Download CSV
  const DownloadCSV = async () => {
    try {
      const response = await DownloadFeeTypeExcel();
      if (response?.status === 200) {
        const rows = response?.data?.split("\n").map((row) => row.split(","));
        setCsvData(rows); // Update csvData state
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
    finally {
      setloaderState(false);
    }
  };

  // Download PDF
  const DownloadPDF = async () => {
    try {
      const response = await DownloadFeeTypePDF();
      if (response?.status === 200 && response?.data?.status === "success") {
        setPDFResponse(response.data);
      } else {
        toast.error("Failed to download PDF");
      }
    } catch (error) {
      toast.error("Error downloading PDF");
    }
    finally {
      setloaderState(false);
    }
  };

  // Handle PDF Download
  const handleDownloadPdf = () => {
    if (pdfResponse?.pdf) {
      const blob = base64ToBlob(pdfResponse.pdf, "application/pdf");
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Fee Type Data.pdf";
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
    const offcanvasElement = document.getElementById("addFeeType");
    if (offcanvasElement) {
      const offcanvas =
        bootstrap.Offcanvas.getInstance(offcanvasElement) ||
        new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.show();
    } else {
      console.error("Offcanvas element with ID addFeeType not found");
      toast.error("Unable to open Add Fee Type form");
    }
  };

  // Reset Add form when offcanvas opens
  const handleSecondAddAction = () => {
    resetAdd();
    const offcanvasElement = document.getElementById("addFees");
    if (offcanvasElement) {
      const offcanvas =
        bootstrap.Offcanvas.getInstance(offcanvasElement) ||
        new bootstrap.Offcanvas(offcanvasElement);
      offcanvas.show();
    } else {
      console.error("Offcanvas element with ID add Fees not found");
      toast.error("Unable to open Add Fees form");
    }
  };

  const getAllClassData = async () => {
    setloaderState(true);
    try {
      var response = await getAllClassApi();
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          setloaderState(false);
          setAllClassData(response?.data?.classes);
        }
      } else {
        setloaderState(false);
        // console.log(response?.data?.message);
      }
    } catch (error) {
      setloaderState(false);
      setloaderState(false);
      // console.log(error)
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem("token");
        setTimeout(() => {
          navigate("/");
        }, 200);
      }
    }
    finally {
      setloaderState(false);
    }
  };

  return (
    <Container>
      {loaderState && <DataLoader />}
      <div className="container-fluid p-4">
        <div className="row pb-3 gap-xl-0 gap-3">
          <div className="col-xxl-3 col-xl-3 col-lg-12 col-sm-12 flex-frow-1">
            <nav className="mainBreadCrum font14 ps-0" aria-label="breadcrumb">
              <ol className="breadcrumb mb-2">
                <li className="breadcrumb-item">
                  <a href="/" className="bredcrumText text-decoration-none">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a
                    href="/collectFees"
                    className="bredcrumText text-decoration-none"
                  >
                    Fee Collection
                  </a>
                </li>
                <li
                  className="breadcrumb-item active bredcrumActiveText"
                  aria-current="page"
                >
                  Fee Type
                </li>
              </ol>
            </nav>
            <p className="font14 ps-0 fontWeight500">Fee Type Details</p>
          </div>
          <div className="col-xxl-9 col-xl-9 col-lg-12 col-sm-12 pe-0">
            <ActionControls
              showAddButton={true}
              addButtonText="Add Fee Type"
              addButtonAction={handleAddOffcanvasOpen}
              showSecondAddButton={true} // Enable second button
              secondAddButtonText="Add Fees" // Custom text
              secondAddButtonAction={handleSecondAddAction} // Custom action
              showExportPDF={feeTypeData.length > 0}
              exportPDFText="Export PDF"
              exportPDFAction={DownloadFeeTypePDF}
              exportPDFFileName="Fee Type.pdf"
              showExportCSV={feeTypeData.length > 0}
              exportCSVText="Export CSV"
              exportCSVAction={DownloadFeeTypeExcel}
              exportCSVFileName="Fee Type.xlsx"
              showSearch={true}
              searchValue={searchInputVal}
              searchAction={handleSearchButton}
              onSearchChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-3 overflow-scroll">
            {feeTypeData.length > 0 ? (
              <>
                <table className="table align-middle table-striped">
                  <thead>
                    <tr>
                      <th className="textWrapClass">
                        <span className="font14">#</span>
                      </th>
                      <th className="textWrapClass">
                        <span className="font14">Title</span>
                      </th>
                      <th className="textWrapClass">
                        <span className="font14">Description</span>
                      </th>
                      <th className="text-center">
                        <span className="font14">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeTypeData.map((item, index) => (
                      <tr key={index} className="align-middle">
                        <th className="textWrapClass greyText">
                          <h3>{(pageNo - 1) * pageSize + index + 1}</h3>
                        </th>
                        <td className="textWrapClass greyText font14">
                          {item.title}
                        </td>
                        <td className="textWrapClass greyText font14">
                          {item.description || "-"}
                        </td>
                        <td className="textWrapClass text-center">
                          <button
                            className="btn ps-1 pe-1 text-black text-decoration-none"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#editFeeType"
                            aria-controls="editFeeType"
                            onClick={() =>
                              getFeeTypeDataById(item.feeTypeModelId)
                            }
                          >
                            <Icon
                              icon="carbon:edit"
                              width="1.5em"
                              height="1.5em"
                              style={{ color: "#8F8F8F" }}
                            />
                          </button>
                          <button
                            className="btn ps-1 pe-1 text-black text-decoration-none"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#deleteFeeType"
                            aria-controls="deleteFeeType"
                            onClick={() => setDelFeeTypeId(item.feeTypeModelId)}
                          >
                            <Icon
                              icon="mi:delete"
                              width="1.5em"
                              height="1.5em"
                              style={{ color: "#8F8F8F" }}
                            />
                          </button>
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
                        previousLabel={
                          <Icon
                            icon="tabler:chevrons-left"
                            width="1.4em"
                            height="1.4em"
                          />
                        }
                        nextLabel={
                          <Icon
                            icon="tabler:chevrons-right"
                            width="1.4em"
                            height="1.4em"
                          />
                        }
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
                  className="img-fluid"
                />
              </div>
            )}
          </div>
        </div>

        {/* Add Fees */}
        <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="addFees">
          <div className="offcanvas-header border-bottom border-2 p-2">
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
            <h2 className="offcanvas-title" id="addFeesLabel">
              Add Fees
            </h2>
          </div>
          <div className="offcanvas-body p-2">
            <Fees />
          </div>
        </div>

        {/* Add Fee Type */}
        <div
          className="offcanvas offcanvas-end p-2"
          tabIndex="-1"
          id="addFeeType"
        >
          <div className="offcanvas-header border-bottom border-2 p-2">
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
            <h2 className="offcanvas-title" id="addFeeTypeLabel">
              Add Fees Type
            </h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitAdd(addNewFeeType)}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label font14">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  className={`form-control font14 ${
                    errorsAdd.title ? "border-danger" : ""
                  }`}
                  placeholder="Enter Title"
                  {...registerAdd("title", {
                    required: "Title is required *",
                    validate: (value) => {
                      if (value.length < 4) return "Minimum Length is 4";
                      if (!/^[a-zA-Z\s'-]+$/.test(value))
                        return "Invalid Characters in Title";
                      return true;
                    },
                  })}
                />
                {errorsAdd.title && (
                  <p className="font12 text-danger">
                    {errorsAdd.title.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label font14">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  className={`form-control font14 ${
                    errorsAdd.description ? "border-danger" : ""
                  }`}
                  placeholder="Enter Description"
                  {...registerAdd("description", {
                    validate: (value) => {
                      if (!value) return true; // Allow empty string
                      if (!/^[a-zA-Z0-9\s'-]+$/.test(value))
                        return "Invalid Characters in Description";
                      return true;
                    },
                  })}
                />
                {errorsAdd.description && (
                  <p className="font12 text-danger">
                    {errorsAdd.description.message}
                  </p>
                )}
              </div>
              <p className="text-center p-3">
                <button
                  className="btn addButtons2 font14 text-white me-2"
                  type="submit"
                  disabled={!isValidAdd}
                >
                  Add Fee Type
                </button>
                <button
                  className="btn cancelButtons font14"
                  type="button"
                  data-bs-dismiss="offcanvas"
                  onClick={() => {
                    resetAdd();
                    setTypeType("");
                  }}
                >
                  Cancel
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* Edit Fee Type */}
        <div
          className="offcanvas offcanvas-end p-2"
          tabIndex="-1"
          id="editFeeType"
          aria-labelledby="editFeeTypeLabel"
        >
          <div className="offcanvas-header border-bottom border-2 p-2">
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
            <h2 className="offcanvas-title" id="editFeeTypeLabel">
              Edit Fees Type
            </h2>
          </div>
          <div className="offcanvas-body p-3">
            <form onSubmit={handleSubmitUpdate(updateFeeType)}>
              <div className="mb-3">
                <label htmlFor="titleEdit" className="form-label font14">
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  id="titleEdit"
                  type="text"
                  className={`form-control font14 ${
                    errorsUpdate.title ? "border-danger" : ""
                  }`}
                  placeholder="Enter Title"
                  {...registerUpdate("title", {
                    required: "Title is required *",
                    validate: (value) => {
                      if (value.length < 4) {
                        return "Minimum Length is 4";
                      }
                      if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                        return "Invalid Characters in Title";
                      }
                      return true;
                    },
                  })}
                />
                {errorsUpdate.title && (
                  <p className="font12 text-danger">
                    {errorsUpdate.title.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label font14"
                >
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  className={`form-control font14 ${
                    errorsUpdate.description ? "border-danger" : ""
                  }`}
                  placeholder="Enter Description"
                  {...registerUpdate("description", {
                    validate: (value) => {
                      if (!value) return true;
                      if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) {
                        return "Invalid Characters in Description";
                      }
                      return true;
                    },
                  })}
                />
                {errorsUpdate.description && (
                  <p className="font12 text-danger">
                    {errorsUpdate.description.message}
                  </p>
                )}
              </div>
              <p className="text-center p-3">
                <button
                  className="btn addButtons3 font14 text-white me-2"
                  type="submit"
                  disabled={!isValidUpdate}
                >
                  Update Fee Type
                </button>
                <button
                  className="btn cancelButtons font14"
                  data-bs-dismiss="offcanvas"
                  type="button"
                  onClick={() => {
                    resetUpdate();
                  }}
                >
                  Cancel
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* Delete Fee Type */}
        <div
          className="offcanvas offcanvas-end p-2"
          tabIndex="-1"
          id="deleteFeeType"
          aria-labelledby="deleteFeeTypeLabel"
        >
          <div className="offcanvas-header border-bottom border-2 p-2">
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
            <h2 className="offcanvas-title" id="deleteFeeTypeLabel">
              Delete Fees Type
            </h2>
          </div>
          <div className="offcanvas-body p-3">
            <div>
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
                the Profile Data
              </p>
              <p className="text-center warningText p-2">
                <input
                  className="form-check-input formdltcheck me-2"
                  type="checkbox"
                  checked={isChecked}
                  id="flexCheckChecked"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                I Agree to delete the Profile Data
              </p>
              <p className="text-center p-3">
                <button
                  className="btn deleteButtons text-white"
                  disabled={!isChecked}
                  onClick={() => DeleteFeeTypeById(delFeeTypeId)}
                >
                  Delete
                </button>
                <button
                  className="btn dltcancelButtons ms-3"
                  data-bs-dismiss="offcanvas"
                  type="button"
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

export default FeesType;
const Fees = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [loaderState, setLoaderState] = useState(false);
  const [feeTypeId, setFeeTypeId] = useState("");
  const [feeTypeData, setFeeTypeData] = useState([]);
  const [classData, setClassData] = useState([]); // Store classes from API response
  const [checkedClasses, setCheckedClasses] = useState({});
  const [amounts, setAmounts] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [initialFeeData, setInitialFeeData] = useState({}); // Classes with non-zero amounts
  const [initialAmounts, setInitialAmounts] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setFeeTypeId("");
    getAllFeeTypeData();
  }, [token]);

  useEffect(() => {
    if (feeTypeId) {
      getAllFeesDataByFeeType(feeTypeId);
    }
  }, [feeTypeId]);

  const getAllFeeTypeData = async () => {
    try {
      setLoaderState(true);
      const response = await getAllFeeTypeApi("", "", "");
      if (response?.status === 200 && response?.data?.status === "success") {
        setFeeTypeData(response?.data?.feeTypes);
      } else {
        toast.error(response?.data?.message || "Failed to load fee types");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load fee types");
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } finally {
      setLoaderState(false);
    }
  };

  const getAllFeesDataByFeeType = async (feeTypeId) => {
    try {
      setLoaderState(true);
      const response = await getAllFeesApi(feeTypeId);
      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success(response.data.message);
        const feeTypeData = response.data.feeType;

        // Map response to classData
        const newClassData = feeTypeData.map((item, index) => ({
          classId: `class-${index}`, // Generate unique ID since response doesn't provide one
          classNo: item.classNo,
          amount: item.amount,
        }));

        const newChecked = {};
        const newAmounts = {};
        const newInitialFeeData = {};
        const newInitialAmounts = {};

        // Set checked and amounts, and determine initial data based on amount !== 0
        newClassData.forEach((classObj) => {
          const classId = classObj.classId;
          newChecked[classId] = classObj.amount !== 0; // Check only if amount is non-zero
          newAmounts[classId] = classObj.amount !== 0 ? classObj.amount : "";
          if (classObj.amount !== 0) {
            newInitialFeeData[classId] = true;
            newInitialAmounts[classId] = classObj.amount;
          }
        });

        setClassData(newClassData);
        setCheckedClasses(newChecked);
        setAmounts(newAmounts);
        setInitialFeeData(newInitialFeeData);
        setInitialAmounts(newInitialAmounts);
      } else {
        toast.error(response?.data?.message || "Failed to fetch fees data");
        setClassData([]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch fees data");
      setClassData([]);
    } finally {
      setLoaderState(false);
    }
  };

  const handleCheckboxChange = (classId) => {
    setCheckedClasses((prev) => ({
      ...prev,
      [classId]: !prev[classId],
    }));
  };

  const handleAmountChange = (classId, value) => {
    setAmounts((prev) => ({
      ...prev,
      [classId]: value,
    }));
  };

  const handleEditToggle = () => {
    if (!editMode) {
      // Reset non-initial fields when entering edit mode
      const resetChecked = { ...initialFeeData };
      const resetAmounts = { ...initialAmounts };
      setCheckedClasses(resetChecked);
      setAmounts(resetAmounts);
    }
    setEditMode(!editMode);
  };

  const onSubmit = async (data) => {
    const selected = Object.keys(checkedClasses)
      .filter((classId) => checkedClasses[classId])
      .map((classId) => {
        const classInfo = classData.find((item) => item.classId === classId);
        return {
          classNo: classInfo.classNo,
          amount: amounts[classId] || 0,
        };
      });

    const formData = new FormData();
    selected.forEach((item) => {
      formData.append("classNo", item.classNo);
      formData.append("amount", item.amount);
    });

    try {
      setLoaderState(true);
      if (editMode) {
        const response = await updateFeesApi(feeTypeId, formData);
        if (response?.status === 200 && response?.data?.status === "success") {
          toast.success(response.data.message);
          handleCancel();
        } else {
          toast.error(response.data.message || "Failed to update fees");
        }
      } else {
        const response = await addFeesApi(feeTypeId, formData);
        if (response?.status === 200 && response?.data?.status === "success") {
          toast.success(response.data.message);
          handleCancel();
        } else {
          toast.error(response.data.message || "Failed to add fees");
        }
      }
    } catch (error) {
      toast.error(
        "API Error: " + (error?.response?.data?.message || error.message)
      );
    } finally {
      setLoaderState(false);
    }
  };

  const handleCancel = () => {
    setClassData([]);
    setFeeTypeId("");
    reset();
    setCheckedClasses({});
    setAmounts({});
    setEditMode(false);
    setInitialFeeData({});
    setInitialAmounts({});
  };

  return (
    <div className="container-fluid p-0">
      {loaderState && <DataLoader />}
      <div className="row">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 p-1">
            <div className="d-flex justify-content-between align-items-center">
              <label className="form-label font14 fw-bold">
                Fee Type <span className="text-danger">*</span>
              </label>
              {classData.length > 0 && (
                <span
                  className="font14 text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={handleEditToggle}
                >
                  {editMode ? "Back" : "Edit"}
                </span>
              )}
            </div>
            <select
              id="feeType"
              className={`form-select font14 ${
                errors.feeType ? "border-danger" : ""
              }`}
              {...register("feeType", {
                required: "Fee Type is required *",
              })}
              value={feeTypeId}
              disabled={editMode}
              onChange={(e) => setFeeTypeId(e.target.value)}
            >
              <option value="" disabled>
                Select Fee Type
              </option>
              {feeTypeData.map((type) => (
                <option key={type.feeTypeModelId} value={type.feeTypeModelId}>
                  {type.title}
                </option>
              ))}
            </select>
            {errors.feeType && (
              <p className="font12 text-danger">{errors.feeType.message}</p>
            )}
          </div>

          {classData.length > 0 && (
            <div className="mb-2">
              <div className="table-responsive">
                <table className="table custom-fee-table align-middle">
                  <thead>
                    <tr>
                      <th className="font14">Class</th>
                      <th className="font14">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classData.map((classItem) => (
                      <tr key={classItem.classId}>
                        <td>
                          <div className="d-flex align-self-center">
                            <input
                              type="checkbox"
                              className="me-2 form-check-input"
                              id={classItem.classId}
                              checked={
                                checkedClasses[classItem.classId] || false
                              }
                              onChange={() =>
                                handleCheckboxChange(classItem.classId)
                              }
                              disabled={
                                editMode
                                  ? !initialFeeData[classItem.classId]
                                  : initialFeeData[classItem.classId]
                              }
                            />
                            {classItem.classNo}
                          </div>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control font14"
                            placeholder="0.00"
                            value={amounts[classItem.classId] || ""}
                            onChange={(e) =>
                              handleAmountChange(
                                classItem.classId,
                                e.target.value
                              )
                            }
                            disabled={
                              editMode
                                ? !initialFeeData[classItem.classId]
                                : initialFeeData[classItem.classId] ||
                                  !checkedClasses[classItem.classId]
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {classData.length > 0 && (
            <div className="text-center p-3">
              <button
                className="btn addButtons2 font14 text-white me-2"
                type="submit"
              >
                {editMode ? "Update Fees" : "Add Fees"}
              </button>
              <button
                className="btn cancelButtons font14"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
