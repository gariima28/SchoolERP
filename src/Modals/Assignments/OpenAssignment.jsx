import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getAssignmentByIdDataApi,
  getDownloadAssignmentDataApi,
} from "src/Utils/Apis";
import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";
import DataLoader from "src/Layouts/Loader";

const Container = styled.div`
  .mainBreadCrum {
    --bs-breadcrumb-divider: ">" !important;
  }

  .bredcrumText {
    color: var(--breadCrumTextColor);
  }

  .bredcrumActiveText {
    color: var(--breadCrumActiveTextColor);
  }

  .tableBgColor {
    background-color: var(--bgColordiv);
  }

  .evenTableRow {
    background-color: var(--bgEvenColordiv);
  }

  .pointer {
    cursor: pointer;
  }
`;

const OpenAssignment = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loaderState, setloaderState] = useState(false);
  const [allAssignmentData, setAllAssignmentData] = useState("");

  useEffect(() => {
    getAssignmentById();
  }, [token]);

  const getAssignmentById = async () => {
    try {
      const response = await getAssignmentByIdDataApi(id);
      if (response?.status === 200 && response?.data?.status === "success") {
        setAllAssignmentData(response?.data?.assignment);
      } else {
        // // console.log(response?.data?.message);
      }
    } catch (error) {
      setloaderState(false);
      // // console.log(error)
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

  const downloadFileFunction = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    //creates a temporary URL that points to the Blob object. This URL can be used as a link to access the file data.
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    //releases the memory used by the temporary URL. This is important to prevent memory leaks,
    //as the URL was only needed for the duration of the file download process.
  };

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
    finally {
      setloaderState(false);
    }
  };

  return (
    <>
      <Container>
        {loaderState && <DataLoader />}
        <div className="container-fluid">
          <div className="row pt-3 ps-3">
            <div className="col-lg-3 col-md-8 col-sm-12 flex-frow-1 p-0">
              <nav
                className="mainBreadCrum font14 ps-0"
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item">
                    <Link to="/" className="bredcrumText text-decoration-none">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    <Link
                      className="bredcrumText text-decoration-none"
                      to="/admin/assignment/allAssignments"
                    >
                      Assignment
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active bredcrumActiveText"
                    aria-current="page"
                  >
                    <Link className="bredcrumActiveText text-decoration-none">
                      Open Assignment
                    </Link>
                  </li>
                </ol>
              </nav>
              <p className="font14 ps-0 fontWeight500">
                Assignment - {allAssignmentData?.title}
              </p>
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12"></div>
          </div>
          <div className="row pt-3 ps-3 pb-3">
            <div className="bg-white rounded-2 p-3">
              <div className="tableBgColor p-4">
                <div className="row">
                  <h3>Assignment Details</h3>
                </div>
                <div className="row mt-2 mt-lg-0">
                  <div className="col-md-4">
                    <div className="row p-3">
                      <div className="col-6 greyText">
                        <h3>Start Date</h3>
                      </div>
                      <div className="col-6">
                        <h3>{allAssignmentData?.startDate}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row p-3">
                      <div className="col-6 greyText">
                        <h3>End Date</h3>
                      </div>
                      <div className="col-6">
                        <h3>{allAssignmentData?.endDate}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row p-3">
                      <div className="col-6 greyText">
                        <h3>Total Marks:</h3>
                      </div>
                      <div className="col-6">
                        <h3>{allAssignmentData?.totalMarks}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2 mt-lg-0 evenTableRow">
                  <div className="col-md-4">
                    <div className="row p-3">
                      <div className="col-6 greyText">
                        <h3>Title</h3>
                      </div>
                      <div className="col-6">
                        <h3>{allAssignmentData?.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row p-3">
                      <div className="col-6 greyText">
                        <h3>Section</h3>
                      </div>
                      <div className="col-6">
                        <h3>{allAssignmentData?.sectionName}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row p-3">
                      <div className="col-6 greyText">
                        <h3>Class</h3>
                      </div>
                      <div className="col-6">
                        <h3>{allAssignmentData?.classNo}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-sm-2 mt-lg-0">
                  <div className="col-md-4">
                    <div className="row p-3">
                      <div className="col-6 greyText">
                        <h3>Create by</h3>
                      </div>
                      <div className="col-6">
                        <h3>{allAssignmentData?.createdBy}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row p-3">
                      <div className="col-6 greyText">
                        <h3>Subject</h3>
                      </div>
                      <div className="col-6">
                        <h3>{allAssignmentData?.subjectName}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row p-3">
                      <div className="col-6 greyText">
                        <h3>Total Students</h3>
                      </div>
                      <div className="col-6">
                        <h3>{allAssignmentData?.totalSubmissions}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2 mt-lg-0 evenTableRow">
                  <div className="col-md-4">
                    <div className="row p-3">
                      <div className="col-6 greyText">
                        <h3>Assignment File</h3>
                      </div>
                      <div className="col-6">
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
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="row p-3">
                      <div className="col-6 greyText">
                        <h3>Status</h3>
                      </div>
                      <div className="col-6">
                        {allAssignmentData.status === "PUBLISHED" ? (
                          <span className="font14 align-self-start activeText">
                            Published
                          </span>
                        ) : allAssignmentData.status === "DRAFT" ? (
                          <span className="font14 align-self-start orangeText">
                            Draft
                          </span>
                        ) : (
                          <span className="font14 align-self-start deactiveText">
                            Archive
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-2 mt-lg-0">
                  <div className="col-md-12 d-flex justify-content-center mt-4">
                    <button
                      className="btn cancelButtons ms-3"
                      type="button"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                      onClick={() => navigate('/admin/assignment/allAssignments')}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </Container>
    </>
  );
};

export default OpenAssignment;
