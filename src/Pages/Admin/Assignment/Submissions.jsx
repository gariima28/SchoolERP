import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  DownloadSubmissionExcel,
  DownloadSubmissionPDF,
  submitSubmissionsByAdminApi,
  getAllClassApi,
  getSubmissionsByIdApi,
  getSearhSubmissionDataApi,
  getAllAssignmentDataApi,
  getDownloadAssignmentDataApi
} from 'src/Utils/Apis';
import DataLoader from 'src/Layouts/Loader';
import ProgressBar from '@ramonak/react-progress-bar';
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import ActionControls from '../../../Layouts/ActionControls';

import { useForm } from 'react-hook-form';

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

  .formimagetext{
    border-radius: 5px 0px 0px 5px;
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

  .editButton{
    background-color: var(--greenTextColor) !important;
    border-color: var(--greenTextColor) !important;
    color: #fff;
    width: fit-content;
    height: 35px;
    align-items: center;
  }

  .uploadButton{
    background-color: #034F95 !important;
    border-color: #034F95 !important;
    color: #fff;
    width: fit-content;
    height: 35px;
    align-items: center;
  }

  .submitButton{
    background-color: var(--orangeTextColor) !important;
    border-color: var(--orangeTextColor) !important;
    color: #fff;
    width: fit-content;
    height: 35px;
    align-items: center;
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
  const [submissionId, setSubmissionId] = useState();
  const [classId, setClassId] = useState(0);
  const [sectionId, setSectionId] = useState(0);
  const [subjectId, setSubjectId] = useState(0);
  const [assignmentId, setAssignmentId] = useState(0);
  const [allClassData, setAllClassData] = useState([]);
  const [allAssignments, setAllAssignments] = useState([]);
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
  const token = sessionStorage.getItem('token');
  const [originalValues, setOriginalValues] = useState({});
  const [submissionData, setSubmissionData] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [uploadType, setUploadType] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
  });
  const watchedValues = watch();
  const [changeImageTypeParent, setChangeImageTypeParent] = useState(true);

  useEffect(() => {
    const isChanged = Object.keys(originalValues).some(
      key => watchedValues[key] !== originalValues[key]
    );
    setIsFormChanged(isChanged);
  }, [watchedValues, originalValues]);



  useEffect(() => {
    getAllClassData();
    getAllAssignment();
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
      const response = await DownloadSubmissionExcel();
      if (response?.status === 200) {
        const rows = response?.data?.split('\n').map((r) => r.split(','));
        setCSVData(rows);
      }
    } catch (err) {
      console.error('CSV Download Error', err);
    }
    finally {
      // setloaderState(false);
    }
  };

  const DownloadPDF = async () => {
    try {
      const response = await DownloadSubmissionPDF();
      if (response?.status === 200 && response?.data?.status === 'success') {
        setPDFResponse(response?.data);
      }
    } catch (err) {
      console.error('PDF Download Error', err);
    }
    finally {
      // setloaderState(false);
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
      const response = await getSearhSubmissionDataApi(
        searchKey === 'search' ? '' : searchKey,
        classId,
        sectionId,
        subjectId,
        pageNo,
        pageSize
      );
      if (response?.status === 200 && response?.data?.status === 'success') {
        setsearchBtn(true);
        setAllSubmissionData(response?.data?.submissions);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
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
      const response = await getAllClassApi();
      if (response?.status === 200 && response?.data?.status === 'success') {
        setAllClassData(response?.data?.classes);
      }
    } catch (err) {
      if (err?.response?.data?.statusCode === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
    } finally {
      setLoaderState(false);
    }
  };

  const getAllAssignment = async (subjectIdVal) => {
    try {
      setLoaderState(true);
      const response = await getAllAssignmentDataApi(classId, sectionId, subjectIdVal);
      if (response?.status === 200 && response?.data?.status === 'success') {
        setAllAssignments(response?.data?.assignments);
      }
    } catch (err) {
      if (err?.response?.data?.statusCode === 401) {
        sessionStorage.removeItem('token');
        navigate('/');
      }
    } finally {
      setLoaderState(false);
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

  const downloadAssignment = async (id) => {
    try {
      setLoaderState(true);
      const data = {
        responseType: "blob",
      };
      const response = await getDownloadAssignmentDataApi(id, data);
      if (response?.status === 200) {
        const pdfData = response?.data;
        downloadFileFunction(pdfData, "Assignment.pdf");
        toast.success("Assignment Downloaded Successfully");
        setLoaderState(false);
      } else {
        toast.error("Failed to download the assignment.");
      }
    } catch (error) {
      setLoaderState(false);
      toast.error("An error occurred while downloading the assignment-", error);
    }
    finally {
      setLoaderState(false);
    }
  };


  const getSubmissionsById = async (id) => {
    setSubmissionId(id)
    try {
      const response = await getSubmissionsByIdApi(id);
      setSubmissionData(response?.data?.submission);
      reset({
        resultMarks: response?.data?.submission?.resultMarks || '',
        file: response?.data?.submission?.submissionPath === null ? '' : response?.data?.submission?.submissionPath,
        description: response?.data?.submission?.description || ''
      });
      setOriginalValues({
        resultMarks: response?.data?.submission?.resultMarks || '',
        file: response?.data?.submission?.submissionPath === null ? '' : response?.data?.submission?.submissionPath,
        description: response?.data?.submission?.description || ''
      });
    } catch (err) {
      toast.error("Failed to fetch submission");
    }
    finally {
      // setloaderState(false);
    }
  };

  const onSubmit = async (data) => {
    const updatedFields = {};
    Object.keys(data).forEach(key => {
      if (data[key] !== originalValues[key]) {
        updatedFields[key] = data[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      toast.error("No changes to update.");
      return;
    }
    try {
      setLoaderState(true);
      const formData = new FormData();
      formData.append("resultMarks", data.resultMarks);
      formData.append("submissionPath", data.file[0]);
      formData.append("description", data.description);

      const response = await submitSubmissionsByAdminApi(submissionId, formData);

      if (response?.status === 200) {
        if (response.data.status === 'success') {
          toast.success(response.data.message || 'Submissions Downloaded Successfully');

          // ✅ Close the offcanvas
          const el = document.getElementById('addSubmission');
          if (el) bootstrap.Offcanvas.getOrCreateInstance(el).hide();

          // Optionally remove backdrop if needed
          const backdrop = document.querySelector('.offcanvas-backdrop');
          if (backdrop) backdrop.remove();

          // ✅ Reset form after successful submission
          reset();

          // ✅ Refresh the list
          getAllSubmission('');
        } else {
          toast.error(response.data.message || 'Failed to submit the Submission.');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred while submitting the Submission');
    } finally {
      setLoaderState(false);
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
                exportCSVFileName="Submission.xlsx"
              />
            </div>
          </div>
          <div className="row pb-3">
            <div className="bg-white rounded-2 p-4">
              <form className="row g-3">
                <div className="col-md-3 col-sm-6 col-12">
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
                <div className="col-md-3 col-sm-6 col-12">
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
                <div className="col-md-3 col-sm-6 col-12">
                  <label htmlFor="inputEmail4" className="form-label font14">
                    Subject
                  </label>
                  <select
                    className="form-select bordeRadius5 font14"
                    aria-label="Default select example"
                    onChange={(e) => { setSubjectId(e.target.value), getAllAssignment(e.target.value) }}
                  >
                    <option value="">-- Select --</option>
                    {allSubjectData?.map((option) => (
                      <option key={option.subjectId} value={option.subjectId}>
                        {option.subjectName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <label htmlFor="inputEmail4" className="form-label font14">
                    Assignment
                  </label>
                  <select
                    className="form-select bordeRadius5 font14"
                    aria-label="Default select example"
                    onChange={(e) => setAssignmentId(e.target.value)}
                  >
                    <option value="">-- Select --</option>
                    {allAssignments?.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.title}
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
                      classId === 0 || sectionId === 0 || subjectId === 0 || assignmentId === 0
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
                                <th className="textWrapClass tableHeading ">
                                  <span className="font14">Action</span>
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
                                        className="rounded-circle"
                                        src={item.studentImage || '/images/fallback.png'}
                                        alt=""
                                        height={25}
                                      />
                                      <span className="font14 align-self-center ms-2">
                                        {item.studentName}
                                      </span>
                                    </td>
                                    <td className="textWrapClass greyText">
                                      <span className="font14 align-self-center">
                                        {item.studentEmail}
                                      </span>
                                    </td>
                                    <td className="textWrapClass greyText">
                                      {item.submissionPath ?
                                        <p className="font14 align-self-center m-0">
                                          <Icon
                                            icon="bxs:file-pdf"
                                            width="1.3em"
                                            height="1.6em"
                                            style={{ color: "red" }}
                                          />
                                          <span
                                            className="ms-1 pointer align-self-center blueText text-decoration-underline"
                                            onClick={() => downloadAssignment(item.id)}
                                          >
                                            Download
                                          </span>
                                        </p>
                                        : '-'}
                                    </td>
                                    <td className="textWrapClass greyText">
                                      {item.status === "SUBMITTED" ? (
                                        <span className="font14 align-self-center">
                                          Submitted
                                        </span>
                                      ) : item.status === "PENDING" ? (
                                        <span className="font14 align-self-center">
                                          Pending
                                        </span>
                                      ) : item.status === "MARKS_PENDING" ? (
                                        <span className="font14 align-self-center">
                                          Marks Pending
                                        </span>
                                      ) : (
                                        <span className="font14 align-self-center">
                                          -
                                        </span>
                                      )}
                                    </td>
                                    <td className="textWrapClass greyText">
                                      <span className="font14 align-self-center">
                                        {item.resultMarks === 0 ? 0 + '/' + item.totalMarks : item.resultMarks + '/' + item.totalMarks}
                                      </span>
                                    </td>
                                    <td>
                                      {item.status === "SUBMITTED" ? (
                                        <button className="btn font14 align-self-center editButton" data-bs-toggle="offcanvas" data-bs-target="#addSubmission" aria-controls="addSubmission" onClick={() => { getSubmissionsById(item.id); setUploadType(false) }}>
                                          Edit
                                        </button>
                                      ) : item.status === "PENDING" ? (
                                        <button className="btn font14 align-self-center uploadButton" data-bs-toggle="offcanvas" data-bs-target="#addSubmission" aria-controls="addSubmission" onClick={() => { getSubmissionsById(item.id); setUploadType(true) }}>
                                          Upload
                                        </button>
                                      ) : item.status === "MARKS_PENDING" ? (
                                        <button className="btn font14 align-self-center submitButton" data-bs-toggle="offcanvas" data-bs-target="#addSubmission" aria-controls="addSubmission" onClick={() => { getSubmissionsById(item.id); setUploadType(false) }}>
                                          Marks Submit
                                        </button>
                                      ) : (
                                        <span>-</span>
                                      )}
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

        <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="addSubmission" aria-labelledby="staticBackdropLabel">
          <div className="offcanvas-header border-bottom border-2 p-1">
            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
            </Link>
            <h2 className="offcanvas-title" id="staticBackdropLabel">Mark Submit</h2>
          </div>
          <div className="offcanvas-body p-0">
            <div className="container-fluid">
              <div className="row">
                <form className='p-3' onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3 teacher-input">
                    <label htmlFor="resultMarks" className="form-label font14">Result <span className='text-danger'>*</span></label>
                    <input id='resultMarks' type="text" className='form-control font14'
                      placeholder='Enter Marks'
                      {...register('resultMarks', {
                        required: 'Result Marks is required *',
                        validate: value => {
                          if (value <= 0)
                            return 'Result Marks should be more than 0';
                          return true;
                        }
                      })}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="file" className="form-label font14">Upload File <span className='text-danger'>*</span></label>
                    {uploadType ?
                      <input
                        id="file"
                        type="file"
                        className={`form-control formimagetext font14 ${errors.file ? 'border-danger' : ''}`}
                        accept='.pdf, .docx, .png, .jpg'
                        {...register('file', {
                          required: 'File is required *'
                        })}
                      />
                      :
                      <div className="d-flex bg-white">
                        {originalValues.file !== null && changeImageTypeParent ? (
                          <input
                            id="file"
                            type="text"
                            className="form-control formimagetext font14"
                            value={originalValues.file?.split('/').pop()}
                            disabled
                          />
                        ) : (
                          <input
                            id="file"
                            type="file"
                            className={`form-control formimagetext font14 ${errors.file ? 'border-danger' : ''}`}
                            accept='.pdf, .docx, .png, .jpg'
                            {...register('file', {
                              required: 'File is required *',
                              validate: value => {
                                if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800))
                                  return 'File size must be between 10 KB to 200 KB';
                                return true;
                              }
                            })}
                          />
                        )}
                        <div className="formcontrolButtonborder p-1 ps-3 pe-3 text-center">
                          <span
                            className="text-white font14 align-self-center"
                            onClick={() => setChangeImageTypeParent(!changeImageTypeParent)}
                            disabled={originalValues.file === null || originalValues.file === '' ? true : false}
                          >
                            {originalValues.file !== null && changeImageTypeParent ? 'Edit' : 'View'}
                          </span>
                        </div>
                      </div>
                    }
                    {errors.file && <p className="font12 text-danger">{errors.file.message}</p>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label font14">Description</label>
                    <input
                      id="description"
                      type="text"
                      className={`form-control font14 ${errors.description ? 'border-danger' : ''}`}
                      placeholder="Enter Description"
                      {...register('description', {
                        validate: value => {
                          if (!value) return true;
                          if (value.length < 2) return 'Minimum Length is 2';
                          if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) return 'Invalid Characters in Description';
                          return true;
                        }
                      })}
                    />
                    {errors.description && <p className="font12 text-danger">{errors.description.message}</p>}
                  </div>
                  <p className='text-center p-3'>
                    <button className='btn updateCreateButtons text-white' disabled={!isFormChanged} type='submit'>Submit</button>
                    <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => reset()}>Cancel</button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Submission
