import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllClassApi, getTeacherBySubjectApi, getSamplePaperByIdApi, updateSamplePaperApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import DataLoader from 'src/Layouts/Loader';

const Container = styled.div`

    .formimagetext{
      border-radius: 5px 0px 0px 5px !important;
    }

    .form-select, .form-control::placeholder, .form-control{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
    }

    .form-select.border-danger {
        border-color: #dc3545 !important;
    }

    .table-striped>tbody>tr:nth-of-type(odd)>* {
        --bs-table-bg-type: var(--tableGreyBackgroundColor);
    }

    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }


`;

const EditSamplePaper = ({ EditItemId, EditedSuccess }) => {

  const token = sessionStorage.getItem('token');
  const [loaderState, setLoaderState] = useState(false);
  const [allClassData, setAllClassData] = useState([]);
  const [allSectionData, setAllSectionData] = useState([]);
  const [allSubjectData, setAllSubjectData] = useState([]);
  const [allTeacherData, setAllTeacherData] = useState([]);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    mode: 'onChange'
  });

  const classIdVal = watch('ClassId')
  const sectionIdVal = watch('sectionId')
  const subjectIdVal = watch('subjectId')
  const teacherIdVal = watch('teacherId')

  const [fileVal, setFileVal] = useState('')

  // Chnage type of input State
  const [changeImageType, setChangeImageType] = useState(true)


  useEffect(() => {
    getAllClassData();
    getSamplePaperById()
  }, [token, EditItemId])

  useEffect(() => {
    handleClassChange(classIdVal);
  }, [classIdVal])

  useEffect(() => {
    getAllTeacherData(subjectIdVal);
  }, [subjectIdVal])

  const getAllClassData = async () => {
    try {
      var response = await getAllClassApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setAllClassData(response?.data?.classes);
        }
        else {
          // console.log(response?.data?.message);
        }
      }
      else {
        // console.log(response?.data?.message);
      }
    }
    catch (error) {
      setLoaderState(false);
      // console.log(error);
    }
    finally {
      setLoaderState(false);
    }
  }

  const getSamplePaperById = async () => {
    setLoaderState(true);
    try {
      var response = await getSamplePaperByIdApi(EditItemId);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          const data = response.data.SamplePaper;

          // Set title and file first
          setValue("title", data?.title);
          setFileVal(data?.samplePaperPath);

          // Set class and wait for section/subject setup
          setValue("ClassId", data?.classId);
          const selectedClass = allClassData.find(
            (c) => c.classId === data?.classId
          );

          if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
            setAllSubjectData(selectedClass.subjects || []);
          }

          // Wait for subject to be available before calling teacher API
          setValue("sectionId", data?.sectionId);
          setValue("subjectId", data?.subjectId);

          // Now call teacher API with classId + subjectId
          const teacherResponse = await getTeacherBySubjectApi(
            data?.classId,
            data?.subjectId
          );
          if (
            teacherResponse?.status === 200 &&
            teacherResponse?.data?.status === "success"
          ) {
            setAllTeacherData(teacherResponse?.data?.teacher);
          }

          // Now set teacher and status
          setValue("teacherId", data?.teacherId);
          setValue("status", data?.status);
          setValue("year", data?.year);
          setValue("description", data?.description);
          setLoaderState(false);
        }
        else {
          setLoaderState(false);
        }
      }
      else {
        setLoaderState(false);
        // console.log(response?.data?.message);
      }
    }
    catch (error) {
      // setLoaderState(false);
      // console.log('error', error);
      setLoaderState(false);
    }
    finally {
      setLoaderState(false);
    }
  }

  const getAllTeacherData = async (val) => {
    try {
      var response = await getTeacherBySubjectApi(classIdVal, val);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setAllTeacherData(response?.data?.teacher);
        }
        else {
          // console.log(response?.data?.message);
        }
      }
      else {
        // console.log(response?.data?.message);
      }
    }
    catch (error) {
      setLoaderState(false);
      // console.log(error);
    }
    finally {
      setLoaderState(false);
    }
  }

  const handleClassChange = (value) => {
    setLoaderState(true);
    setValue('ClassId', value);
    const selectedClass = allClassData.find(c => c.classId === value)

    if (selectedClass) {
      setAllSectionData(selectedClass.section || []);
      setAllSubjectData(selectedClass.subjects || []);
      setLoaderState(false)
    } else {
      setAllSectionData([]);
      setAllSubjectData([]);
      setLoaderState(false)
    }
  }

  const UpdateSamplePaper = async (data) => {
    console.log(1);
    setLoaderState(true);
    console.log(2);
    try {
      console.log(3);
      const formData = new FormData();
      formData.append("title", data?.title);
      formData.append("ClassId", data?.ClassId);
      formData.append("sectionId", data?.sectionId);
      formData.append("subjectId", data?.subjectId);
      formData.append("teacherId", data?.teacherId);
      formData.append("year", data?.year);
      formData.append("description", data?.description);
      formData.append("status", data?.status);

      if (data?.file === fileVal) {
        formData.append("file", data.file[0]);
      }

      console.log(4);
      var response = await updateSamplePaperApi(EditItemId, formData);
      console.log(5, response);
      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          EditedSuccess(true);
          setLoaderState(false);
        } else {
          // console.log(response?.data?.message);
        }
      } else {
        // console.log(response?.data?.message);
      }
    } catch (error) {
      setLoaderState(false);
      // console.log(error);
    }
    finally {
      setLoaderState(false);
    }
  }

  return (
    <>
      <Container>
        {loaderState && <DataLoader />}
        <div className="container-fluid ">
          <div className="row">
            <form className="p-3" onSubmit={handleSubmit(UpdateSamplePaper)}>
              <div className="mb-3">
                <label
                  htmlF or="exampleInputEmail1"
                  className="form-label font14"
                >
                  Title <span className="text-danger">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  className={`form-control font14 ${errors.title ? "border-danger" : ""
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
              <div className="mb-3">
                <label htmlFor="ClassId" className="form-label font14">
                  Class <span className="text-danger">*</span>
                </label>
                <select
                  id="ClassId"
                  className={`form-select font14 ${errors.ClassId ? "border-danger" : ""
                    }`}
                  value={classIdVal}
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
                  <p className="font12 text-danger">
                    {errors.ClassId.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="sectionId" className="form-label font14">
                  Section <span className="text-danger">*</span>
                </label>
                <select
                  id="sectionId"
                  className={`form-select font14 ${errors.sectionId ? "border-danger" : ""
                    }`}
                  value={sectionIdVal}
                  {...register("sectionId", {
                    required: "Section selection is required *",
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
                  className={`form-select font14 ${errors.subjectId ? "border-danger" : ""
                    }`}
                  value={subjectIdVal}
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
                  className={`form-select font14 ${errors.teacherId ? "border-danger" : ""
                    }`}
                  value={teacherIdVal}
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
                <label htmlFor="year" className="form-label font14">
                  Year <span className="text-danger">*</span>
                </label>
                <input
                  id="year"
                  type="number"
                  className={`form-control font14 ${errors.year ? "border-danger" : ""
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
                  className={`form-select font14 ${errors.status ? "border-danger" : ""
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
                  <p className="font12 text-danger">
                    {errors.status.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label font14"
                >
                  Description
                </label>
                <input
                  id="note"
                  type="text"
                  className={`form-control font14 ${errors.note ? "border-danger" : ""
                    }`}
                  placeholder="Enter Description"
                  {...register("note", {
                    validate: (value) => {
                      if (!value) return true;
                      if (value.length < 2) {
                        return "Minimum Length is 2";
                      }
                      if (!/^[a-zA-Z0-9,.;"*%_?><!`~|\/'\-\(\)\[\]\{\}\s]+$/.test(value)) {
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
                {/* <input id="file" type="file" className={`form-control font14 ${errors.file ? 'border-danger' : ''}`} placeholder="Enter Drop Point Name" accept='.pdf, .docx' {...register('file', { required: 'File is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                                {errors.file && <p className="font12 text-danger">{errors.file.message}</p>} */}
                <div className="d-flex bg-white">
                  {fileVal !== null && changeImageType ? (
                    <input
                      id="file"
                      type="text"
                      className="form-control formimagetext font14"
                      value={fileVal.split("/").pop()}
                      disabled
                    />
                  ) : (
                    <input
                      id="file"
                      type="file"
                      className={`form-control formimagetext font14 ${errors.file ? "border-danger" : ""
                        }`}
                      accept=".pdf, .docx"
                      {...register("file", {
                        required: "Sample Paper document is required *",
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
                  )}
                  <div className="formcontrolButtonborder p-1 ps-3 pe-3 text-center">
                    <span
                      className="text-white font14 align-self-center"
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
                >
                  Update
                </button>
                <button
                  className="btn cancelButtons ms-3"
                  type="button"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  Cancel
                </button>
              </p>
            </form>
          </div>
          <Toaster />
        </div>
      </Container>
    </>
  );
}

export default EditSamplePaper
