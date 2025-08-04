import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getAllClassApi,
  getTeacherBySubjectApi,
  addSamplePaperApi,
  addNewAssignmentAPI,
  getAssignmentByIdDataApi,
  EditNewAssignmentAPI,
} from "src/Utils/Apis";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

const Container = styled.div`
  .formimagetext {
    border-radius: 5px 0px 0px 5px;
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
`;

const EditAssignment = ({ EditItemId, editedSuccess }) => {
  const token = localStorage.getItem("token");
  const [AddSamplePaper, setAddSamplePaper] = useState(true);

  const [allClassData, setAllClassData] = useState([]);
  const [allSectionData, setAllSectionData] = useState([]);
  const [allSubjectData, setAllSubjectData] = useState([]);
  const [allTeacherData, setAllTeacherData] = useState([]);

  const [fileVal, setFileVal] = useState("");

  // Chnage type of input State
  const [changeImageType, setChangeImageType] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
  });
  const [originalValues, setOriginalValues] = useState({});
  const formValues = watch();

  const classIdVal = watch("ClassId");
  const subjectIdVal = watch("subjectId");
  // // console.log(teacherIdVal)

  useEffect(() => {
    getAllClassData();
    getAssignmentById();
  }, [token, EditItemId]);

  useEffect(() => {
    handleClassChange(classIdVal);
  }, [classIdVal]);

  useEffect(() => {
    getAllTeacherData(subjectIdVal);
  }, [subjectIdVal]);

  const getAllClassData = async () => {
    try {
      var response = await getAllClassApi();
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          setAllClassData(response?.data?.classes);
        }
      } else {
        // toast.error(response?.data?.message);
      }
    } catch (error) {
      // setloaderState(false);
    }
  };

  const getAllTeacherData = async (val) => {
    try {
      var response = await getTeacherBySubjectApi(classIdVal, val);
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          setAllTeacherData(response?.data?.teacher);
        }
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      // setloaderState(false);
    }
  };

  const handleClassChange = (value) => {
    // setLoaderState(true);
    setValue("ClassId", value);
    const selectedClass = allClassData.find(
      (c) => c.classId === parseInt(value)
    );

    if (selectedClass) {
      setAllSectionData(selectedClass.section || []);
      setAllSubjectData(selectedClass.subjects || []);
    } else {
      setAllSectionData([]);
      setAllSubjectData([]);
    }
  };

  const getAssignmentById = async () => {
    try {
      var response = await getAssignmentByIdDataApi(EditItemId);
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          setFileVal(response?.data?.assignment?.assignmentPath);
          const fetchedData = response?.data?.assignment;
          const formattedData = {
            title: fetchedData.title,
            ClassId: fetchedData.classId,
            sectionId: fetchedData.sectionId,
            subjectId: fetchedData.subjectId,
            teacherId: fetchedData.teacherId,
            totalMarks: fetchedData.totalMarks,
            startDate: fetchedData.startDate,
            endDate: fetchedData.endDate,
            status: fetchedData.status,
            description: fetchedData.description,
            file: fetchedData.assignmentPath,
          };
          setOriginalValues(formattedData);
          reset(formattedData);
        }
      } else {
        // toast.error(response?.data?.message);
      }
    } catch (e) {}
  };

  const UpdateAssignment = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("ClassId", data?.ClassId);
      formData.append("sectionId", data?.sectionId);
      formData.append("subjectId", data?.subjectId);
      formData.append("teacherId", data?.teacherId);
      formData.append("totalMarks", data?.totalMarks);
      formData.append("status", data?.status);
      formData.append("startDate", data?.startDate);
      formData.append("endDate", data?.endDate);
      formData.append("file", data?.file[0]);

      var response = await EditNewAssignmentAPI(EditItemId, formData);
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setAddSamplePaper(!AddSamplePaper);
          editedSuccess(true);
        }
      }
    } catch (error) {
      // setloaderState(false);
      // // console.log(error)
    }
  };

  const isFormChanged = () => {
    return JSON.stringify(originalValues) !== JSON.stringify(formValues);
  };

  // Function to reset form on cancel
  const handleCancel = () => {
    reset(originalValues); // Revert to original values
  };

  return (
    <>
      <Container>
        <div className="container-fluid ">
          <div className="row">
            <form className="p-3" onSubmit={handleSubmit(UpdateAssignment)}>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label font14"
                >
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
                      if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) {
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
              <div className="mb-3">
                <label htmlFor="ClassId" className="form-label font14">
                  Class <span className="text-danger">*</span>
                </label>
                <select
                  id="ClassId"
                  className={`form-select font14 ${
                    errors.ClassId ? "border-danger" : ""
                  }`}
                  value={formValues?.classId}
                  {...register("ClassId", {
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
                {errors.ClassId && (
                  <p className="font12 text-danger">{errors.ClassId.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="sectionId" className="form-label font14">
                  Section <span className="text-danger">*</span>
                </label>
                <select
                  id="sectionId"
                  className={`form-select font14 ${
                    errors.sectionId ? "border-danger" : ""
                  }`}
                  value={formValues?.sectionId}
                  {...register("sectionId", {
                    required: "Selection selection is required *",
                  })}
                >
                  <option value="">-- Select --</option>
                  {allSectionData?.map((option) => (
                    <option key={option.classSecId} value={option.classSecId}>
                      {option.sectionName}
                    </option>
                  ))}
                </select>
                {errors.sectionId && (
                  <p className="font12 text-danger">
                    {errors.sectionId.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="subjectId" className="form-label font14">
                  Subject <span className="text-danger">*</span>
                </label>
                <select
                  id="subjectId"
                  className={`form-select font14 ${
                    errors.subjectId ? "border-danger" : ""
                  }`}
                  value={formValues?.subjectId}
                  {...register("subjectId", {
                    required: "Subject selection is required *",
                  })}
                >
                  <option value="">-- Select --</option>
                  {allSubjectData?.map((option) => (
                    <option key={option.subjectId} value={option.subjectId}>
                      {option.subjectName}
                    </option>
                  ))}
                </select>
                {errors.subjectId && (
                  <p className="font12 text-danger">
                    {errors.subjectId.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="teacherId" className="form-label font14">
                  Teacher <span className="text-danger">*</span>
                </label>
                <select
                  id="teacherId"
                  className={`form-select font14 ${
                    errors.teacherId ? "border-danger" : ""
                  }`}
                  value={formValues?.teacherId}
                  {...register("teacherId", {
                    required: "Teacher selection is required *",
                  })}
                >
                  <option value="">-- Select --</option>
                  {allTeacherData.map((option) => (
                    <option key={option.staffId} value={option.staffId}>
                      {option.staffName}
                    </option>
                  ))}
                </select>
                {errors.teacherId && (
                  <p className="font12 text-danger">
                    {errors.teacherId.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="totalMarks" className="form-label font14">
                  Total Marks <span className="text-danger">*</span>
                </label>
                <input
                  id="totalMarks"
                  type="number"
                  className={`form-control font14 ${
                    errors.totalMarks ? "border-danger" : ""
                  }`}
                  {...register("totalMarks", {
                    required: "Total Marks are required *",
                    min: { value: 0, message: "Marks cannot be negative" },
                  })}
                />
                {errors.totalMarks && (
                  <p className="font12 text-danger">
                    {errors.totalMarks.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label font14">
                  Starting Date <span className="text-danger">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  className={`form-control font14 ${
                    errors.startDate ? "border-danger" : ""
                  }`}
                  {...register("startDate", {
                    required: "Starting Time is required *",
                  })}
                />
                {errors.startDate && (
                  <p className="font12 text-danger">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label font14">
                  Ending Date <span className="text-danger">*</span>
                </label>
                <input
                  id="endDate"
                  type="date"
                  className={`form-control font14 ${
                    errors.endDate ? "border-danger" : ""
                  }`}
                  {...register("endDate", {
                    required: "Ending Time is required *",
                  })}
                />
                {errors.endDate && (
                  <p className="font12 text-danger">{errors.endDate.message}</p>
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
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                  <option value="ARCHIVE">Archive</option>
                </select>
                {errors.status && (
                  <p className="font12 text-danger">{errors.status.message}</p>
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
                    errors.description ? "border-danger" : ""
                  }`}
                  placeholder="Enter Description"
                  {...register("description", {
                    validate: (value) => {
                      if (!value) return true;
                      if (value.length < 2) return "Minimum Length is 2";
                      if (!/^[a-zA-Z0-9\s'-]+$/.test(value))
                        return "Invalid Characters in Description";
                      return true;
                    },
                  })}
                />
                {errors.description && (
                  <p className="font12 text-danger">{errors.description.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="file" className="form-label font14">
                  Assignment Upload <span className="text-danger">*</span>
                </label>
                <div className="d-flex bg-white align-items-center">
                  {fileVal !== null && changeImageType ? (
                    <div className="position-relative w-100">
                      <input
                        type="text"
                        className="form-control formimagetext font14 ps-4" // left padding for icon
                        value={fileVal?.split("/").pop()}
                        disabled
                      />
                      <span
                        className="position-absolute start-0 top-0 h-100 d-flex align-items-center ps-2 pe-2 cursor-pointer"
                        onClick={() => window.open(fileVal, "_blank")}
                        title="View PDF"
                      >
                        📄
                      </span>
                    </div>
                  ) : (
                    <input
                      id="file"
                      type="file"
                      className={`form-control formimagetext font14 ${
                        errors.file ? "border-danger" : ""
                      }`}
                      accept=".pdf,.docs"
                      {...register("file", {
                        required: "Admin file is required *",
                        validate: (value) => {
                          if (
                            value.length > 0 &&
                            (value[0].size < 10240 || value[0].size > 204800)
                          ) {
                            return "File size must be between 10 KB to 200 KB";
                          }
                          return true;
                        },
                      })}
                    />
                  )}

                  <div className="formcontrolButtonborder p-1 ps-3 pe-3 text-center">
                    <span
                      className="text-white font14 align-self-center cursor-pointer"
                      onClick={() => setChangeImageType(!changeImageType)}
                    >
                      {fileVal !== null && changeImageType ? "Edit" : "View"}
                    </span>
                  </div>
                </div>

                {errors.file && (
                  <p className="font12 text-danger">{errors.file.message}</p>
                )}
              </div>
              <p className="text-center p-3">
                <button
                  className="btn updateCreateButtons text-white"
                  type="submit"
                  disabled={!isFormChanged}
                >
                  Update
                </button>
                <button
                  className="btn cancelButtons ms-3"
                  type="button"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </button>
              </p>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EditAssignment;
