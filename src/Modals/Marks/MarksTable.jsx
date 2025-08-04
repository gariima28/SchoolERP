import { Icon } from "@iconify/react";
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { AddUpdateMarksApi } from "src/Utils/Apis";
import toast, { Toaster } from "react-hot-toast";

const Container = styled.div`
  .form-control::placeholder,
  .form-control {
    color: var(--greyState);
    box-shadow: none;
    border-color: var(--greyBorder);
  }

  .table-striped > tbody > tr:nth-of-type(odd) > * {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
  }

  .creamBg {
    border: 1px dashed var(--tableTopHeadingBorder);
    background-color: var(--tableTopHeadingBg);
  }

  .creamBgtext {
    color: var(--tableTopHeadText);
  }

  .tableHeading {
    background-color: var(--tableheadingbg) !important;
  }

  .heightOfTable {
    height: 37vh;
    overflow: auto;
  }

  .heightOfTable::-webkit-scrollbar {
    display: none;
  }

  /* Add grey background for disabled inputs */
  .form-control:disabled {
    background-color: #e9ecef; /* Bootstrap's default grey background for disabled inputs */
    opacity: 1; /* Ensure no transparency */
  }
`;

const MarksTable = ({
    marksData = [],
    className,
    sectionName,
    subjectName,
    sessionSelect,
    examTermSelect,
    totalMarksSelect,
    ReloadMarksData,
}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        console.log(
            className,
            sectionName,
            subjectName,
            sessionSelect,
            examTermSelect,
            totalMarksSelect,
            ReloadMarksData,
        );
        setRows(
            marksData.map((m) => ({
                ...m,
                gainMarks: m.gainMarks ?? "",
                comments: m.comments ?? "",
                isDirty: false,
                isSaving: false,
                // Ensure default values for theoryMarks and practicalMarks
                theoryMarks: m.theoryMarks ?? 0,
                practicalMarks: m.practicalMarks ?? 0,
            }))
        );
    }, [marksData]);

    const handleChange = useCallback((index, field, value) => {
        setRows((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [field]: value, isDirty: true };
            return copy;
        });
    }, []);

    const handleSave = async (index) => {
        setRows((prev) => {
            const copy = [...prev];
            copy[index].isSaving = true;
            return copy;
        });

        const r = rows[index];
        const formData = new FormData();
        formData.append("studentId", r.studentId);
        formData.append("examTermId", examTermSelect);
        formData.append("classNo", className);
        formData.append("classSec", sectionName);
        formData.append("subject", subjectName);
        formData.append("sessionName", sessionSelect);
        formData.append("theoryMarks", r.theoryMarks);
        formData.append("practicalMarks", r.practicalMarks);

        try {
            const response = await AddUpdateMarksApi(formData);
            if (response?.status === 200 && response?.data?.status === "success") {
                toast.success(response.data.message);
                const updated = response.data.marks;
                setRows((prev) => {
                    const copy = [...prev];
                    copy[index] = { ...updated, isDirty: false, isSaving: false };
                    return copy;
                });
                ReloadMarksData?.();
            } else {
                toast.error(response?.data?.message || "Failed to save");
            }
        } catch (err) {
            toast.error("Network error – please try again");
        } finally {
            setRows((prev) => {
                const copy = [...prev];
                if (copy[index]) copy[index].isSaving = false;
                return copy;
            });
        }
    };

    return (
        <Container className="heightOfTable">
            <div className="container-fluid pt-3">
                {/* Capsule summary */}
                <div className="row creamBg p-3 mb-4">
                    {[
                        ["Exam", examTermSelect],
                        ["Class", className],
                        ["Section", sectionName],
                        ["Total Marks", totalMarksSelect],
                        ["Subject", subjectName],
                        ["Session", sessionSelect],
                    ].map(([label, value]) => (
                        <div
                            className="col-12 col-sm-6 col-md-2 mb-2 d-flex flex-column text-center"
                            key={label}
                        >
                            <p className="m-0 text-wrap">
                                <span className="creamBgtext font14">{label} </span>
                                <span className="text-black font14 text-break">- {value}</span>
                            </p>
                        </div>
                    ))}
                </div>

                {/* table */}
                <div className="overflow-scroll">
                    <table className="table align-middle table-striped">
                        <thead>
                            <tr>
                                {[
                                    "#",
                                    "Student Name",
                                    "Theory Marks",
                                    "Practical Marks",
                                    "Marks Obtained",
                                    "Percentage",
                                    "Grade",
                                    "Action",
                                ].map((h) => (
                                    <th
                                        key={h}
                                        className={`textWrapClass tableHeading ${h === "#" || h === "Action" ? "text-center" : ""
                                            }`}
                                    >
                                        <span className="font14">{h}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => (
                                <tr key={row.markId ?? idx}>
                                    <th className="textWrapClass text-center greyText">
                                        <span className="font14">{idx + 1}</span>
                                    </th>

                                    {/* name */}
                                    <td className="textWrapClass greyText font14">{row.studentName}</td>

                                    {/* theory */}
                                    <td className="textWrapClass greyText">
                                        <input
                                            type="number"
                                            className="form-control text-start font14"
                                            placeholder="0.0"
                                            value={row.theoryMarks !== null && row.theoryMarks !== undefined ? row.theoryMarks : 0}
                                            onChange={(e) => handleChange(idx, "theoryMarks", e.target.value)}
                                        />
                                    </td>

                                    {/* practical */}
                                    <td className="textWrapClass greyText">
                                        <input
                                            type="number"
                                            className="form-control text-start font14"
                                            placeholder="0.0"
                                            value={row.practicalMarks !== null && row.practicalMarks !== undefined ? row.practicalMarks : 0}
                                            onChange={(e) => handleChange(idx, "practicalMarks", e.target.value)}
                                        />
                                    </td>

                                    {/* obtained */}
                                    <td className="textWrapClass greyText">
                                        <input
                                            type="number"
                                            placeholder="-"
                                            className="form-control text-start font14"
                                            value={row.obtainedMarks !== null && row.obtainedMarks !== undefined ? row.obtainedMarks : "--"}
                                            disabled
                                        />
                                    </td>

                                    {/* percentage (readonly) */}
                                    <td className="textWrapClass greyText">
                                        <input
                                            type="text"
                                            placeholder="-"
                                            className="form-control text-start font14"
                                            value={row.percentage !== null && row.percentage !== undefined ? row.percentage : "--"}
                                            disabled
                                        />
                                    </td>

                                    {/* grade (readonly) */}
                                    <td className="textWrapClass greyText">
                                        <input
                                            type="text"
                                            placeholder="-"
                                            className="form-control text-start font14"
                                            value={row.grade !== null && row.grade !== undefined ? row.grade : "--"}
                                            disabled
                                        />
                                    </td>

                                    {/* action */}
                                    <td className="textWrapClass text-center">
                                        <button
                                            className="btn CorrectSignButtons"
                                            disabled={!row.isDirty || row.isSaving}
                                            onClick={() => handleSave(idx)}
                                        >
                                            <Icon
                                                icon="charm:circle-tick"
                                                width="1.5em"
                                                height="1.5em"
                                                style={{ color: "white" }}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Toaster />
        </Container>
    );
};

export default MarksTable;
