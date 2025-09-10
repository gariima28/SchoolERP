import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getAllClassApi,
  getTeacherBySubjectApi,
  addSamplePaperApi,
} from "src/Utils/Apis";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

const Container = styled.div`
  .form-check-input:checked {
    background-color: #008479;
    border-color: #008479;
    box-shadow: none !important;
  }

  .form-check-input:focus {
    box-shadow: none !important;
    outline: none;
  }

  .form-select,
  .form-control::placeholder,
  .form-control {
    color: var(--greyState);
    box-shadow: none;
    border-color: var(--greyState);
  }

  .form-select.border-danger {
    border-color: #dc3545 !important;
  }

  .table-striped > tbody > tr:nth-of-type(odd) > * {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
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

  .contbtn {
    margin-left: 41% !important;
    margin-top: -20% !important;
  }

  .greydiv {
    background-color: #fbfbfb;
  }

  .scrollBarHide::-webkit-scrollbar {
    display: none;
  }

  .section-container {
    padding: 0.5rem;
    background-color: #f8f9fa;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5rem;
    width: 100%;
  }

  .grid-item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 4px;
  }

  .form-check {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .form-check-input {
    margin-right: 0.5rem;
  }

  .form-check-label {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 576px) {
    .grid-container {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
  }

  @media (min-width: 1200px) {
    .grid-container {
      grid-template-columns: repeat(auto-fit, minmax(150px, 2fr));
    }
  }
`;

const AddSamplePaper = ({ addedSuccess }) => {
  const token = localStorage.getItem("token");
  const [AddSamplePaper, setAddSamplePaper] = useState(true);
  const [allClassData, setAllClassData] = useState([]);
  const [allSectionData, setAllSectionData] = useState([]);
  const [allSubjectData, setAllSubjectData] = useState([]);
  const [allTeacherData, setAllTeacherData] = useState([]);
  const [classIdSelected, setClassIdSelected] = useState(false);
  const [subjectIdSelected, setSubjectIdSelected] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      classSecIds: [],
      classId: "",
      subjectId: "",
      teacherId: "",
      title: "",
      year: "",
      status: "",
      note: "",
      file: null,
    },
    resolver: async (data) => {
      const errors = {};
      if (!data.sectionIds || data.sectionIds.length === 0) {
        errors.sectionIds = {
          type: "required",
          message: "At least one section is required *",
        };
      }
      return {
        values: data,
        errors,
      };
    },
  });

  const classIdVal = watch("classId");
  const subjectIdVal = watch("subjectId");
  const sectionIds = watch("sectionIds");

  useEffect(() => {
    getAllClassData();
  }, [token]);

  useEffect(() => {
    getAllTeacherData(subjectIdVal);
  }, [subjectIdVal]);

  const getAllClassData = async () => {
    try {
      const response = await getAllClassApi();
      if (response?.status === 200 && response?.data?.status === "success") {
        setAllClassData(response?.data?.classes);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch class data");
    }
    finally {
      // setloaderState(false);
    }
  };

  const getAllTeacherData = async (val) => {
    try {
      const response = await getTeacherBySubjectApi(classIdVal, val);
      if (response?.status === 200 && response?.data?.status === "success") {
        setAllTeacherData(response?.data?.teacher);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch teacher data");
    }
    finally {
      // setloaderState(false);
    }
  };

  const handleSubjectChange = (value) => {
    const SubjectId = parseInt(value);
    setValue("subjectId", SubjectId);
    setSubjectIdSelected(true);
    getAllTeacherData(SubjectId);
  };

  const handleClassChange = (value) => {
    const classIdValue = parseInt(value);
    setValue("classId", classIdValue);
    setValue("sectionIds", []);
    setValue("subjectId", "");
    setClassIdSelected(true);
    const selectedClass = allClassData.find((c) => c.classId === classIdValue);

    if (selectedClass) {
      setAllSectionData(selectedClass.section || []);
      setAllSubjectData(selectedClass.subjects || []);
      setValue("year", selectedClass.year || "");
    } else {
      setAllSectionData([]);
      setAllSubjectData([]);
      setValue("year", "");
    }
  };

  const handleSectionChange = (classSecId, isChecked) => {
    const currentSections = sectionIds || [];
    let updatedSections;

    if (isChecked) {
      updatedSections = [...currentSections, Number(classSecId)];
    } else {
      updatedSections = currentSections.filter(
        (id) => id !== Number(classSecId)
      );
    }

    setValue("sectionIds", updatedSections, { shouldValidate: true });
  };
  
  const AddNewSamplePaper = async (data) => {
    console.log(isValid);
    try {
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("ClassId", data?.classId);
      data?.sectionIds?.forEach((id) => {
        formData.append("sectionIds", id);
      });      
      formData.append("subjectId", data?.subjectId);
      formData.append("teacherId", data?.teacherId);
      formData.append("status", data?.status);
      formData.append("year", data?.year);
      formData.append("file", data?.file[0]);
      formData.append("note", data?.note || "");

      const response = await addSamplePaperApi(formData);
      if (response?.status === 200 && response?.data?.status === "success") {
        toast.success(response?.data?.message);
        setAddSamplePaper(!AddSamplePaper);
        addedSuccess(true);
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add sample paper");
    }
    finally {
      // setloaderState(false);
    }
  };

  return (
    <Container>
      <div className="container-fluid">
        <div className="row">
          <form className="p-3" onSubmit={handleSubmit(AddNewSamplePaper)}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label font14">
                Title <span className="text-danger">*</span>
              </label>
              <input
                id="title"
                type="text"
                className={`form-control font14 ${
                  errors.title ? "border-danger" : ""
                }`}
                placeholder="Enter Title"
                {...register("title", {
                  required: "Title is required *",
                  validate: (value) => {
                    if (!/^[A-Z]/.test(value)) {
                      return "Title must start with an uppercase letter";
                    }
                    if (value.length < 2) {
                      return "Minimum Length is 2";
                    }
                    if (!/^[a-zA-Z0-9'\-\(\)\[\]\{\}\s]+$/.test(value)) {
                      return "Invalid Characters in Title";
                    }
                    return true;
                  },
                })}
              />
              {errors.title && (
                <p className="font12 text-danger">{errors.title.message}</p>
              )}
            </div>
            <div className="mb-3 teacher-input">
              <label htmlFor="classId" className="form-label font14">
                Class <span className="text-danger">*</span>
              </label>
              <select
                id="classId"
                className={`form-select font14 ${
                  errors.classId ? "border-danger" : ""
                }`}
                {...register("classId", {
                  required: "Class selection is required *",
                })}
                onChange={(e) => handleClassChange(e.target.value)}
              >
                <option value="">-- Select --</option>
                {allClassData?.map((option) => (
                  <option key={option.classId} value={option?.classId}>
                    {option?.classNo}
                  </option>
                ))}
              </select>
              {errors.classId && (
                <p className="font12 text-danger">{errors.classId.message}</p>
              )}
            </div>
            <div className="mb-3 teacher-input">
              <label htmlFor="sectionIds" className="form-label font14">
                Section <span className="text-danger">*</span>
              </label>
              <div className="section-container px-2 py-2">
                {allSectionData.length > 0 ? (
                  <div className="grid-container">
                    {allSectionData.map((section) => (
                      <div className="grid-item" key={section.classSecId}>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`section-${section.classSecId}`}
                            value={section.classSecId}
                            checked={sectionIds?.includes(
                              Number(section.classSecId)
                            )}
                            onChange={(e) =>
                              handleSectionChange(
                                section.classSecId,
                                e.target.checked
                              )
                            }
                          />
                          <label
                            className="form-check-label font14"
                            htmlFor={`section-${section.classSecId}`}
                          >
                            {section.sectionName}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="mt-0 greyText">
                    {classIdVal
                      ? "-- No Sections Found --"
                      : "-- Select Class First --"}
                  </span>
                )}
              </div>
              {errors.sectionIds && (
                <p className="font12 text-danger">
                  {errors.sectionIds.message}
                </p>
              )}
            </div>
            <div className="mb-3 teacher-input">
              <label htmlFor="subjectId" className="form-label font14">
                Subject <span className="text-danger">*</span>
              </label>
              <div
                className={`${classIdSelected ? "" : "tooltip-container"}`}
                data-tooltip="Select Class First"
              >
                <select
                  id="subjectId"
                  className={`form-select font14 ${
                    errors.subjectId ? "border-danger" : ""
                  }`}
                  {...register("subjectId", {
                    required: "Subject selection is required *",
                  })}
                  disabled={!classIdSelected}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  {allSubjectData.length > 0 ? (
                    allSubjectData?.map((option) => (
                      <option key={option.subjectId} value={option.subjectId}>
                        {option.subjectName}
                      </option>
                    ))
                  ) : (
                    <option disabled>
                      -- No Subject found for this Class --
                    </option>
                  )}
                </select>
              </div>
              {errors.subjectId && (
                <p className="font12 text-danger">{errors.subjectId.message}</p>
              )}
            </div>
            <div className="mb-3 teacher-input">
              <label htmlFor="teacherId" className="form-label font14">
                Teacher <span className="text-danger">*</span>
              </label>
              <div
                className={`${subjectIdSelected ? "" : "tooltip-container"}`}
                data-tooltip="Select Subject First"
              >
                <select
                  id="teacherId"
                  className={`form-select font14 ${
                    errors.teacherId ? "border-danger" : ""
                  }`}
                  {...register("teacherId", {
                    required: "Teacher selection is required *",
                  })}
                  disabled={!subjectIdSelected}
                >
                  <option value="">-- Select --</option>
                  {allTeacherData.length > 0 ? (
                    allTeacherData?.map((option) => (
                      <option key={option.staffId} value={option.staffId}>
                        {option.staffName}
                      </option>
                    ))
                  ) : (
                    <option disabled>
                      -- No Teacher found for this Subject --
                    </option>
                  )}
                </select>
              </div>
              {errors.teacherId && (
                <p className="font12 text-danger">{errors.teacherId.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="year" className="form-label font14">
                Year <span className="text-danger">*</span>
              </label>
              <input
                id="year"
                type="number"
                className={`form-control font14 ${
                  errors.year ? "border-danger" : ""
                }`}
                placeholder="Enter Year"
                {...register("year", {
                  required: "Year is required *",
                  pattern: {
                    value: /^\d{4}$/,
                    message: "Year must be a 4-digit number",
                  },
                })}
              />
              {errors.year && (
                <p className="font12 text-danger">{errors.year.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label font14">
                Status <span className="text-danger">*</span>
              </label>
              <select
                id="status"
                className={`form-select font14 ${
                  errors.status ? "border-danger" : ""
                }`}
                {...register("status", {
                  required: "Status selection is required *",
                })}
              >
                <option value="">-- Select --</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">InActive</option>
              </select>
              {errors.status && (
                <p className="font12 text-danger">{errors.status.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="note" className="form-label font14">
                Description
              </label>
              <input
                id="note"
                type="text"
                className={`form-control font14 ${
                  errors.note ? "border-danger" : ""
                }`}
                placeholder="Enter Description"
                {...register("note", {
                  validate: (value) => {
                    if (!value) return true;
                    if (value.length < 2) {
                      return "Minimum Length is 2";
                    }
                    if (!/^[a-zA-Z0-9'\-\(\)\[\]\{\}\s]+$/.test(value)) {
                      return "Invalid Characters in Description";
                    }
                    return true;
                  },
                })}
              />
              {errors.note && (
                <p className="font12 text-danger">{errors.note.message}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label font14">
                Sample Paper Upload <span className="text-danger">*</span>
              </label>
              <input
                id="file"
                type="file"
                className={`form-control font14 ${
                  errors.file ? "border-danger" : ""
                }`}
                placeholder="Upload"
                accept=".pdf, .docx"
                {...register("file", {
                  required: "Sample Paper Document is required *",
                  // validate: (value) => {
                  //   if (
                  //     value.length > 0 &&
                  //     (value[0].size < 10240 || value[0].size > 204800)
                  //   ) {
                  //     return "File size must be between 10 KB to 200 KB";
                  //   }
                  //   return true;
                  // },
                })}
              />
              {errors.file && (
                <p className="font12 text-danger">{errors.file.message}</p>
              )}
            </div>
            <p className="text-center p-3">
              <button
                className="btn updateCreateButtons text-white"
                disabled={!isValid}
                type="submit"
              >
                Create
              </button>
              <button
                className="btn cancelButtons ms-3"
                type="button"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={() => reset()}
              >
                Cancel
              </button>
            </p>
          </form>
        </div>
        <Toaster />
      </div>
    </Container>
  );
};

export default AddSamplePaper;
