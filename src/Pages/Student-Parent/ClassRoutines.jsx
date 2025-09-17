import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getAllClassRoutineDataApi } from "src/Utils/Apis";
import toast, { Toaster } from "react-hot-toast";
import DataLoader from "src/Layouts/Loader";

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

  .greenText {
    color: var(--greenTextColor);
  }

  .table {
    table-layout: auto; /* Let browser decide widths based on content */
    width: 100%;
  }

  .table td,
  .table th {
    border-right: 0.3px solid #dee2e6;
    vertical-align: middle;
    text-align: center;
    white-space: nowrap;
    padding: 10px;
  }

  .table td,
  .table th {
    min-width: 150px; /* Ensures uniformity based on widest column */
  }

  .table-striped > thead > tr > * {
    --bs-table-bg-type: #f2f3f6;
  }

  .table-striped > tbody > tr:nth-of-type(odd) > * {
    --bs-table-bg-type: #fff9f6;
  }

  .textWrapClass {
    white-space: normal;
    word-break: break-word;
  }
`;


const ClassRoutines = () => {
  const token = sessionStorage.getItem("token");
  const [loaderState, setloaderState] = useState(false);
  const [RoutineData, setRoutineData] = useState([]);
  const [TimeSchedule, setTimeSchedule] = useState([]);

  useEffect(() => {
    getAllClassRoutine();
  }, []);

  const getAllClassRoutine = async () => {
    try {
      setloaderState(true);
      const response = await getAllClassRoutineDataApi();
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          setRoutineData(response?.data?.routine.timetable);
          setTimeSchedule(response?.data?.routine.periods);
        } else {
          toast.error(response?.data?.message);
        }
      }
      setloaderState(false);
    } catch (error) {
      setloaderState(false);
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
              Class Routine
            </li>
          </ol>
        </nav>

        <p className="font14 ps-0 fw-bolder">Class Routine Details</p>
      </div>
      <div className="row p-3 bg-white borderRadius5 pb-5">
        {RoutineData.length > 0 ? (
          <>
            <div className="col-12 p-0">
              <div className="row pb-3">
                <div className="col-md-4 col-6">
                  <p className="greenText">Class Routine Details</p>
                </div>
                <div className="col-md-4 col-6 text-center">
                  <span className="fw-bolder">
                    <Icon
                      className="pointer"
                      icon="mingcute:left-fill"
                      width="2.5em"
                      height="1.5em"
                      style={{ color: "#000" }}
                    />
                    20 May - 26 May
                    <Icon
                      className="pointer"
                      icon="mingcute:right-fill"
                      width="2.5em"
                      height="1.5em"
                      style={{ color: "#000" }}
                    />
                  </span>
                </div>
                <div className="col-md-4 col-12"></div>
              </div>
            </div>
            <div className="overflow-scroll">
              <table className="table align-middle table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="font14 text-start">Day</th>
                    {TimeSchedule.map((item, idx) => (
                      <th key={idx} className="font14">
                        {item.periodNo}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {RoutineData.map((item, index) => (
                    <tr key={index}>
                      <td className="font14 text-start">{item?.day}</td>
                      {item?.periods.map((timeTable, idx) => (
                        <td key={idx} className="font14">
                          <p className="text-center greyText">
                            Class - {timeTable.section}
                          </p>
                          <p className="text-center">{timeTable.subject}</p>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="d-flex justify-content-center p-5 m-5">
            <img onError={(e) => { e.target.onerror = null; e.target.src = "/images/fallback.png"; }} src="/images/search.svg" alt="" className="img-fluid" />
          </div>
        )}
        <Toaster />
      </div>
    </Container>
  );
};

export default ClassRoutines;
