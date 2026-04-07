import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAllExamScheduleApi } from "src/Utils/Apis";
import DataLoader from "src/Layouts/Loader";
import { getExamTermDataApi } from "../../Utils/Apis";

const Container = styled.div`
  height: 92vh;
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

const ExamSchedule = () => {
  const token = sessionStorage.getItem("token");
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [examScheduleSearch, setExamScheduleSearch] = useState(false);
  const [selectedExam, setSelectedExam] = useState('');
  const [examTermData, setExamTermData] = useState([]);
  const [OfflineExamData, setOfflineExamData] = useState([]);

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getAllExamTermData();
  }, []);

  const getAllOfflineExam = async () => {
    try {
      setloaderState(true);
      var response = await getAllExamScheduleApi("", pageNo, pageSize);
      console.log('offline exams---------', response);
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          setloaderState(false);
          setOfflineExamData(response?.data?.schedules);
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
      // console.log('Error Facing during Get All Exam Schedule API - ', error)
    }
    finally {
      setloaderState(false);
    }
  };

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };

  const getAllExamTermData = async (search = "") => {
    try {
      setloaderState(true);
      const response = await getExamTermDataApi("", "", "");
      if (response?.status === 200 && response?.data?.status === "success") {
        setExamTermData(response.data.data || []);
      } else {
        toast.error(response?.data?.message || "Failed to fetch exam terms");
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 401) {
        sessionStorage.removeItem("token");
        navigate("/");
      }
      toast.error("Error fetching exam terms");
    } finally {
      setloaderState(false);
    }
  };

  return (
    <Container className="container-fluid p-4 overflow-scroll">
      {loaderState && <DataLoader />}
      <div className="row pb-3">
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
              Exam Schedule
            </li>
          </ol>
        </nav>
        <p className="font14 ps-0 fw-bolder">Exam Schedule Details</p>
      </div>
      <div className="row p-3 bg-white borderRadius5 pb-5">
        <div className="col-12">
          <div className="d-flex mb-2 justify-content-center">
            <div className="w-50">
              <label htmlFor="inputState" className="form-label font14">
                Exam Term
              </label>
              <select
                value={selectedExam}
                id="inputState"
                className="form-select font14"
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                <option value='' disabled>
                  Select Exam Term
                </option>
                {examTermData.map((item, index) => (
                  <option key={index} value={item.examTermId}>
                    {item.examTermName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-4">
            <p className="text-center p-3">
              <button
                type="button"
                className="btn printButtons text-white"
                onClick={() => {
                  setExamScheduleSearch(true), getAllOfflineExam();
                }}
              >
                Search
              </button>
              <button
                type="button"
                className="btn cancelButtons ms-3"
                onClick={() => {
                  setExamScheduleSearch(false), setSelectedExam("");
                }}
              >
                Cancel
              </button>
            </p>
          </div>
          {/* {examScheduleSearch ? ( */}
          <div className="row">
            {/* {OfflineExamData.length > 0 ? ( */}
            <>
              <div className="overflow-scroll">
                <table className="table align-middle table-striped table-bordered">
                  <thead>
                    <tr>
                      <th className="textWrapClass pe-4"> <span className="font14">#</span> </th>
                      <th className="textWrapClass pe-4"> <span className="font14">Exam Term</span> </th>
                      <th className="textWrapClass pe-4"> <span className="font14">Room Number</span> </th>
                      <th className="textWrapClass pe-4"> <span className="font14">Subject</span> </th>
                      <th className="textWrapClass pe-4"> <span className="font14">Theory Date</span> </th>
                      <th className="textWrapClass pe-4"> <span className="font14">Theory Start Time</span> </th>
                      <th className="textWrapClass pe-4"> <span className="font14">Theory End Time</span> </th>
                      <th className="textWrapClass pe-4"> <span className="font14">Theory Pass Marks</span> </th>
                      <th className="textWrapClass pe-4"> <span className="font14">Theory Total Marks</span> </th>
                      <th className="textWrapClass pe-4"> <span className="font14">Practical Date</span> </th>
                      <th className="textWrapClass pe-4"> <span className="font14">Practical Start Time</span> </th>
                      <th className="textWrapClass pe-4"> <span className="font14">Practical End Time</span> </th>
                      <th className="textWrapClass pe-4"> <span className="font14">Practical Pass Marks</span> </th>
                      <th className="textWrapClass pe-4"> <span className="font14">Practical Total Marks</span> </th>
                    </tr>
                    
                  </thead>
                  <tbody>
                    <tr></tr>
                    {OfflineExamData?.map((item, index) => (
                      <tr key={item.id} className="align-middle">
                        <th className="textWrapClass greyText"> <h3>{(pageNo - 1) * pageSize + index + 1}</h3> </th>
                        <th className="textWrapClass greyText"> <h3>{item.examTermName}</h3> </th>
                        <td className="textWrapClass greyText"> <h3>{item.roomNumber}</h3> </td>
                        <td className="textWrapClass greyText"> <h3> {item.subject}</h3> </td>
                        <td className="textWrapClass greyText"> <h3>{item.date}</h3> </td>
                        <td className="textWrapClass greyText"> <h3>{item.startingTime.slice(0, 5) || '-'}</h3> </td>
                        <td className="textWrapClass greyText"> <h3>{item.endingTime.slice(0, 5) || '-'}</h3> </td>
                        <td className="textWrapClass greyText"> <h3>{item.passingMarks || '-'}</h3> </td>
                        <td className="textWrapClass greyText"> <h3>{item.totalMarks || '-'}</h3> </td>
                        <td className="textWrapClass greyText"> <h3>{item.practicalDate ? item.practicalDate : 'N/A'}</h3> </td>
                        <td className="textWrapClass greyText"> <h3>{item.practicalStartTime ? item.practicalStartTime.slice(0, 5) : 'N/A'}</h3></td>
                        <td className="textWrapClass greyText"> <h3>{item.practicalEndTime ? item.practicalEndTime.slice(0, 5) : 'N/A'}</h3></td>
                        <td className="textWrapClass greyText"> <h3>{item.practicalPassMarks ? item.practicalPassMarks : 'N/A'}</h3></td>
                        <td className="textWrapClass greyText"> <h3>{item.practicalMarks ? item.practicalMarks : 'N/A'}</h3> </td>
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
            {/* ) : (
                <>
                  <div className="d-flex justify-content-center p-5 m-5">
                    <img
                      src="/images/search.svg"
                      alt=""
                      className="img-fluid p-5"
                    />
                  </div>
                </>
              )} */}
          </div>
          {/* ) : (
            <div className="d-flex justify-content-center p-5 m-5">
              <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className="img-fluid p-5" />
            </div>
          )} */}
        </div>
        <Toaster />
      </div>
    </Container>
  );
};

export default ExamSchedule;
