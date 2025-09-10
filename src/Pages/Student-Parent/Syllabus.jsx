import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAllSyllabusDataApi, downloadSyllabusDataApi } from "src/Utils/Apis";
import DataLoader from "src/Layouts/Loader";

const Container = styled.div`
  height: 92vh;
  width: 100%;
  .mainBreadCrum {
    --bs-breadcrumb-divider: none !important;
  }

  .bredcrumText {
    color: var(--breadCrumTextColor);
  }

  .bredcrumActiveText {
    color: var(--breadCrumActiveTextColor);
  }

  .greyText {
    color: var(--greyTextColor);
  }

  .table td {
    border-right: 0.3px solid #dee2e6;
  }
`;

const Syllabus = () => {
  const token = sessionStorage.getItem("token");
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const searchByKey = "";

  const [SyllabusData, setSyllabusData] = useState([]);

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getAllSyllabuss();
  }, [token, pageNo]);

  const getAllSyllabuss = async () => {
    try {
      setloaderState(true);
      var response = await getAllSyllabusDataApi(pageNo, pageSize);
      // console.log(response, 'syllabus')
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          setloaderState(false);
          setSyllabusData(response?.data?.syllabus);
          setCurrentPage(response?.data?.currentPage);
          setTotalPages(response?.data?.totalPages);
          // toast.success(response.data.message);
        } else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      } else {
        setloaderState(false);
        // console.log(response?.data?.msg);
      }
    } catch (error) {
      setloaderState(false);
      setloaderState(false);
      // console.log(error)
      if (error?.response?.data?.statusCode === 401) {
        sessionStorage.removeItem("token");
        setTimeout(() => {
          navigate("/");
        }, 200);
      }
    }
    finally {
      setloaderState(false);
    }
  };
  const downloadFileFunction = (base64Data, fileName) => {
    // Decode base64 string
    const binaryString = window.atob(base64Data);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const downloadSyllabus = async (id) => {
    try {
      setloaderState(true);
      const response = await downloadSyllabusDataApi(id);
      if (response?.status === 200 && response?.data?.status === "success") {
        const base64Data = response.data.pdf; // Extract base64 string
        if (base64Data) {
          downloadFileFunction(base64Data, "Syllabus.pdf");
          toast.success("Syllabus Downloaded Successfully");
        } else {
          toast.error("No PDF data found in response");
        }
      } else {
        toast.error(
          response?.data?.message || "Failed to download the Syllabus"
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while downloading the Syllabus"
      );
    } finally {
      setloaderState(false);
    }
  };

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };

  return (
    <Container>
      {loaderState && <DataLoader />}
      <div className="container-fluid p-4 overflow-scroll">
        <div className="row px-2">
          <nav className="mainBreadCrum font14 ps-0" aria-label="breadcrumb">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item">
                <Link
                  to="/"
                  className="align-self-center bredcrumText text-decoration-none font14"
                >
                  Home
                </Link>
                <Icon
                  className="ms-2"
                  icon="ep:arrow-right-bold"
                  width="1em"
                  height="1em"
                  style={{ color: "#78788C" }}
                />
              </li>
              <li
                className="breadcrumb-item active bredcrumActiveText font14"
                aria-current="page"
              >
                Syllabus
              </li>
            </ol>
          </nav>
          <p className="font14 ps-0 fw-bolder">Syllabus Details</p>
        </div>
        <div className="row p-2">
          <div className="col-12 bg-white borderRadius5 px-4 py-2">
            <div className="row">
              {SyllabusData.length > 0 ? (
                <>
                  <table className="table align-middle table-striped">
                    <thead>
                      <tr>
                        <td className="font14">#</td>
                        <td className="font14">Title</td>
                        <td className="font14">Syllabus</td>
                        <td className="font14">Subject</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr></tr>
                      {SyllabusData.map((item, index) => (
                        <tr key={item.syllabusId}>
                          <td className="font14 greyText">{index + 1}</td>
                          <td className="font14 greyText">{item.titleName}</td>
                          <td className="textWrapClass greyText">
                            <p className="font14 align-self-start m-0">
                              <Icon
                                icon="bxs:file-pdf"
                                width="1.3em"
                                height="1.3em"
                                style={{ color: "red" }}
                              />
                              <Link
                                className="ms-2"
                                to=""
                                onClick={() =>
                                  downloadSyllabus(item.syllabusId)
                                }
                              >
                                Download
                              </Link>
                            </p>
                          </td>
                          <td className="font14 greyText">{item.subject}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

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
              ) : (
                <>
                  <div className="d-flex justify-content-center p-5 m-5">
                    <img
                      src="/images/search.svg"
                      alt=""
                      className="img-fluid p-5"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <Toaster />
        </div>
      </div>
    </Container>
  );
};

export default Syllabus;
