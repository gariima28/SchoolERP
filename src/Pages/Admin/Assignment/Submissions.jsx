import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  DownloadSubmissionExcel,
  DownloadSubmissionPDF,
  deleteSubmissionApi,
  getAllClassApi,
  getSearhSubmissionDataApi,
} from 'src/Utils/Apis';
import DataLoader from 'src/Layouts/Loader';
import ProgressBar from '@ramonak/react-progress-bar';
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import ActionControls from '../../../Layouts/ActionControls';
import { Offcanvas } from 'bootstrap';
import * as bootstrap from 'bootstrap';

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
    width: 73px;
    height: 73px;
    margin-left: 43% !important;
    margin-bottom: -16% !important;
    background-color: #2BB673;
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

const base64ToBlob = (base64Data, contentType) => {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = Array.from(slice, (char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

const Submission = () => {
  const navigate = useNavigate();

  const [loaderState, setLoaderState] = useState(false);
  const [searchBtn, setsearchBtn] = useState(false);
  const [searchByKey, setSearchByKey] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [editItemId, setEditItemId] = useState('');
  const [deleteItemId, setDeleteItemId] = useState('');
  const [classId, setClassId] = useState(0);
  const [sectionId, setSectionId] = useState(0);
  const [subjectId, setSubjectId] = useState(0);
  const [allClassData, setAllClassData] = useState([]);
  const [allSectionData, setAllSectionData] = useState([]);
  const [allSubjectData, setAllSubjectData] = useState([]);
  const [allSubmissionData, setAllSubmissionData] = useState([]);
  const [closeAddModal, setCloseAddModal] = useState(false);
  const [closeEditModal, setCloseEditModal] = useState(false);
  const [csvData, setCSVData] = useState([]);
  const [PDFResponse, setPDFResponse] = useState();
  const [allowCsvPdf, setAllowCsvPdf] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize] = useState(10);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [click, setClick] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    getAllClassData();

    if (pageNo || allowCsvPdf) {
      getAllSubmission(searchByKey);
    }

    if (token) {
      DownloadCSV();
      DownloadPDF();
    }

    if (closeAddModal) {
      const el = document.getElementById('add_staticBackdrop');
      if (el) bootstrap.Offcanvas.getOrCreateInstance(el).hide();
      setCloseAddModal(false);
    }

    if (closeEditModal) {
      const el = document.getElementById('Edit_staticBackdrop');
      if (el) bootstrap.Offcanvas.getOrCreateInstance(el).hide();
      setCloseEditModal(false);
      getAllClassData();
    }

    const backdrop = document.querySelector('.offcanvas-backdrop');
    if (backdrop) backdrop.remove();
  }, [token, pageNo, closeAddModal, closeEditModal, allowCsvPdf, searchByKey]);

  const handlePageClick = (event) => setPageNo(event.selected + 1);

  const DownloadCSV = async () => {
    try {
      const res = await DownloadSubmissionExcel();
      if (res?.status === 200) {
        const rows = res?.data?.split('\n').map((r) => r.split(','));
        setCSVData(rows);
      }
    } catch (err) {
      console.error('CSV Download Error', err);
    }
  };

  const DownloadPDF = async () => {
    try {
      const res = await DownloadSubmissionPDF();
      if (res?.status === 200 && res?.data?.status === 'success') {
        setPDFResponse(res?.data);
      }
    } catch (err) {
      console.error('PDF Download Error', err);
    }
  };

  const handleDownloadPdf = () => {
    if (!PDFResponse?.pdf) return;
    const blob = base64ToBlob(PDFResponse.pdf, 'application/pdf');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Submission Record.pdf';
    link.click();
  };

  const getAllSubmission = async (searchKey = '') => {
    try {
      setLoaderState(true);
      const res = await getSearhSubmissionDataApi(
        searchKey === 'search' ? '' : searchKey,
        classId,
        sectionId,
        subjectId,
        pageNo,
        pageSize
      );
      if (res?.status === 200 && res?.data?.status === 'success') {
        setsearchBtn(true);
        setAllSubmissionData(res?.data?.submissions);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
        setAllowCsvPdf(true);
      }
    } catch (err) {
      console.error('Submission fetch error:', err);
    } finally {
      setLoaderState(false);
    }
  };

  const getAllClassData = async () => {
    try {
      setLoaderState(true);
      const res = await getAllClassApi();
      if (res?.status === 200 && res?.data?.status === 'success') {
        setAllClassData(res?.data?.classes);
      }
    } catch (err) {
      if (err?.response?.data?.statusCode === 401) {
        localStorage.removeItem('token');
        navigate('/');
      }
    } finally {
      setLoaderState(false);
    }
  };

  const DeleteSubmissionDataById = async (id) => {
    if (!isChecked) return;
    try {
      setLoaderState(true);
      const res = await deleteSubmissionApi(id);
      if (res?.status === 200 && res?.data?.status === 'success') {
        toast.success(res?.data?.message);
        const el = document.getElementById('Delete_staticBackdrop');
        if (el) bootstrap.Offcanvas.getOrCreateInstance(el).hide();
        setIsChecked(false);
        getAllSubmission('');
      }
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setLoaderState(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      setTimeout(() => {
        const updatedValue = e.target.value.trim();
        setSearchByKey(updatedValue);
        if (!updatedValue && click) {
          getAllSubmission('search');
          setClick(false);
        } else if (updatedValue) {
          getAllSubmission(updatedValue);
          setClick(true);
        }
      }, 200);
    }
  };

  const handleChange = (value) => {
    const val = parseInt(value);
    setClassId(val);
    const selectedClass = allClassData.find((c) => c.classId === val);
    if (selectedClass) {
      setAllSectionData(selectedClass.section || []);
      setAllSubjectData(selectedClass.subjects || []);
    } else {
      setAllSectionData([]);
      setAllSubjectData([]);
    }
  };

  const handleSearchButton = () => getAllSubmission(searchByKey);

  const openAddCanvas = () => {
    const el = document.getElementById('add_staticBackdrop');
    if (el) bootstrap.Offcanvas.getOrCreateInstance(el).show();
  };

  const cancelSearch = () => setsearchBtn(false);

  const toggleDropdown = (index) =>
    setIsDropdownOpen(isDropdownOpen === index ? null : index);


  const downloadAssignment = async () => {
    try {
      setloaderState(true);
      const data = {
        responseType: "blob",
      };
      const response = await getDownloadAssignmentDataApi(id, data);
      if (response?.status === 200) {
        const pdfData = response?.data;
        downloadFileFunction(pdfData, "Assignment.pdf");
        toast.success("Assignment Downloaded Successfully");
        setloaderState(false);
      } else {
        toast.error("Failed to download the assignment.");
      }
    } catch (error) {
      setloaderState(false);
      toast.error("An error occurred while downloading the assignment-", error);
    }
  };


    return (
      <>
        <Container>
          {loaderState && <DataLoader />}
          <div className="container-fluid p-4">
            <div className="row pb-3 gap-xl-0 gap-3">
              <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                <nav
                  className="mainBreadCrum font14 ps-0"
                  aria-label="breadcrumb"
                >
                  <ol className="breadcrumb mb-1">
                    <li className="breadcrumb-item">
                      <a href="/" className="bredcrumText text-decoration-none">
                        Home
                      </a>
                    </li>
                    <li
                      className="breadcrumb-item active bredcrumActiveText"
                      aria-current="page"
                    >
                      Submission
                    </li>
                  </ol>
                </nav>
                <p className="font14 ps-0 fontWeight500">Submission</p>
              </div>
              <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                <ActionControls
                  showAddButton={false}
                  addButtonText="Add Submission"
                  addButtonAction={openAddCanvas}
                  showSearch={true}
                  searchAction={handleSearchButton}
                  showExportPDF={(allSubmissionData || []).length > 0}
                  exportPDFText="Export PDF"
                  exportPDFAction={""}
                  exportPDFFileName="Receipts.pdf"
                  showExportCSV={(allSubmissionData || []).length > 0}
                  exportCSVText="Export CSV"
                  exportCSVAction={""}
                  exportCSVFileName="Receipts.xlsx"
                />
              </div>
            </div>
            <div className="row pb-3">
              <div className="bg-white rounded-2 p-4">
                <form className="row g-3">
                  <div className="col-md-4 col-sm-6 col-12">
                    <label htmlFor="inputEmail4" className="form-label font14">
                      Class
                    </label>
                    <select
                      className="form-select bordeRadius5 font14"
                      aria-label="Default select example"
                      onChange={(e) => handleChange(e.target.value)}
                    >
                      <option value="">-- Select --</option>
                      {allClassData?.map((option) => (
                        <option key={option.classId} value={option?.classId}>
                          {option?.classNo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12">
                    <label htmlFor="inputEmail4" className="form-label font14">
                      Section
                    </label>
                    <select
                      className="form-select bordeRadius5 font14"
                      aria-label="Default select example"
                      onChange={(e) => setSectionId(e.target.value)}
                    >
                      <option value="">-- Select --</option>
                      {allSectionData?.map((option) => (
                        <option
                          key={option.classSecId}
                          value={option.classSecId}
                        >
                          {option.sectionName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 col-sm-6 col-12">
                    <label htmlFor="inputEmail4" className="form-label font14">
                      Subject
                    </label>
                    <select
                      className="form-select bordeRadius5 font14"
                      aria-label="Default select example"
                      onChange={(e) => setSubjectId(e.target.value)}
                    >
                      <option value="">-- Select --</option>
                      {allSubjectData?.map((option) => (
                        <option key={option.subjectId} value={option.subjectId}>
                          {option.subjectName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-center p-3">
                    <button
                      type="button"
                      className="btn addCategoryButtons text-white"
                      onClick={() => getAllSubmission("")}
                      disabled={
                        classId === 0 || sectionId === 0 || subjectId === 0
                          ? true
                          : false
                      }
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      className="btn cancelButtons ms-3"
                      onClick={cancelSearch}
                    >
                      Cancel
                    </button>
                  </p>
                </form>
                {searchBtn ? (
                  <>
                    <div className="row">
                      {!allSubmissionData || allSubmissionData.length === 0 ? (
                        <div className="d-flex justify-content-center p-5">
                          <img
                            src="/images/search.svg"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="overflow-scroll">
                            <table className="table align-middle table-striped">
                              <thead>
                                <tr>
                                  <th className="textWrapClass tableHeading text-center">
                                    <span className="font14">#</span>
                                  </th>
                                  <th className="textWrapClass tableHeading ">
                                    <span className="font14">Name</span>
                                  </th>
                                  <th className="textWrapClass tableHeading ">
                                    <span className="font14">Email</span>
                                  </th>
                                  <th className="textWrapClass tableHeading ">
                                    <span className="font14">
                                      Submission File
                                    </span>
                                  </th>
                                  <th className="textWrapClass tableHeading ">
                                    <span className="font14">Status</span>
                                  </th>
                                  <th className="textWrapClass tableHeading ">
                                    <span className="font14">Result</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {allSubmissionData &&
                                  allSubmissionData.map((item, index) => (
                                    <tr key={item.id} className="align-middle">
                                      <th className="textWrapClass text-center greyText">
                                        <span className="font14">
                                          {index + 1}
                                        </span>
                                      </th>
                                      <td className="textWrapClass greyText align-items-center">
                                        <img
                                          className="border-rounded"
                                          src={item.studentImage}
                                          alt=""
                                          height={25}
                                        />
                                        <span className="font14 align-self-start">
                                          {item.studentName}
                                        </span>
                                      </td>
                                      <td className="textWrapClass greyText">
                                        <span className="font14 align-self-start">
                                          {item.studentEmail}
                                        </span>
                                      </td>
                                      <td className="textWrapClass greyText">
                                        <p className="font14 align-self-start m-0">
                                          <Icon
                                            icon="bxs:file-pdf"
                                            width="1.3em"
                                            height="1.6em"
                                            style={{ color: "red" }}
                                          />
                                          <span
                                            className="ms-1 pointer align-self-center blueText text-decoration-underline"
                                            onClick={downloadAssignment}
                                          >
                                            Download
                                          </span>
                                        </p>
                                      </td>
                                      <td className="textWrapClass greyText">
                                        {item.status === "PUBLISHED" ? (
                                          <span className="font14 align-self-start activeText">
                                            Published
                                          </span>
                                        ) : item.status === "DRAFT" ? (
                                          <span className="font14 align-self-start orangeText">
                                            Draft
                                          </span>
                                        ) : item.status === "MARKS_PENDING" ? (
                                          <span className="font14 align-self-start orangeText">
                                            Marks Pending
                                          </span>
                                        ) : (
                                          <span className="font14 align-self-start deactiveText">
                                            Archive
                                          </span>
                                        )}
                                      </td>
                                      <td className="textWrapClass greyText">
                                        <span className="font14 align-self-start">
                                          {item.resultMarks}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>

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
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="d-flex justify-content-center p-5">
                      <img
                        src="/images/search.svg"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </>
    );
}

export default Submission
