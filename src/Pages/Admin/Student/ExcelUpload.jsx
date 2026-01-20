import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AddStudentByCSVApi, DownloadStudentExcelForm, getAllClassApi } from '../../../Utils/Apis';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  .form-control::placeholder,
  .form-control,
  .form-select {
    color: var(--greyState);
    box-shadow: none !important;
  }

  .form-control,
  .form-select {
    border-radius: 5px;
    border: 1px solid var(--fontControlBorder);
  }

  .AddBtnn {
    width: fit-content;
    border: 1px solid var(--breadCrumActiveTextColor);
    background-color: var(--breadCrumActiveTextColor);
  }

  .EyeViewBtnn {
    width: fit-content;
    border: 1px solid var(--breadCrumActiveTextColor);
    background-color: var(--OrangeBtnColor);
  }
`;

const ExcelUpload = () => {
  const navigate = useNavigate();
  const [allClassData, setAllClassData] = useState([]);
  const [allSectionData, setAllSectionData] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    getAllClassData();
  }, []);

  const getAllClassData = async () => {
    try {
      const response = await getAllClassApi();
      if (response?.status === 200 && response?.data?.status === 'success') {
        setAllClassData(response.data.classes || []);
      } else {
        toast.error(response?.data?.message || 'Failed to fetch classes');
      }
    } catch (error) {
      toast.error('Something went wrong while fetching classes');
    }
  };

  const handleClassChange = (classNoVal) => {
    setValue('classNo', classNoVal);
    const selectedClass = allClassData.find((c) => c.classNo === classNoVal);
    setAllSectionData(selectedClass?.section || []);
  };

  // ✅ CORRECT EXCEL DOWNLOAD (Direct URL)
  const Download_Slip = async () => {
    try {
      const response = await DownloadStudentExcelForm();

      if (response?.status === 200 && response?.data?.csvUrl) {
        const fileUrl = response.data.csvUrl;

        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', 'Student_List.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error('Excel file URL not found');
      }
    } catch (err) {
      toast.error('Excel download failed');
    }
  };

  // ✅ UPLOAD CSV FILE
  const AddStudentByCSV = async (data) => {
    try {
      const formData = new FormData();
      formData.append('csvFile', data.csvFile[0]);

      const response = await AddStudentByCSVApi(
        data.classNo,
        data.sectionName,
        formData
      );

      if (response?.status === 200) {
        toast.success(response?.data?.message || 'Students added successfully');
        navigate('/admin/admission/allStudents');
      } else {
        toast.error('Failed to upload CSV');
      }
    } catch (err) {
      toast.error('CSV upload failed');
    }
  };

  return (
    <Container>
      <div className="container-fluid">
        <div className="row">
          <div className="pt-3">
            {/* ✅ EXCEL DOWNLOAD BUTTON */}
            <button
              type="button"
              className="col-lg-2 col-md-3 col-sm-4 col-6 btn AddBtnn font14 text-white"
              onClick={Download_Slip}
            >
              Generate Excel File
            </button>
          </div>

          {/* ✅ CSV UPLOAD FORM */}
          <form className="row g-3 m-0" onSubmit={handleSubmit(AddStudentByCSV)}>
            <div className="col-md-6">
              <label className="form-label font14">Class *</label>
              <select
                className={`form-select font14 ${errors.classNo ? 'border-danger' : ''}`}
                {...register('classNo', { required: 'Class is required' })}
                onChange={(e) => handleClassChange(e.target.value)}
              >
                <option value="">Select Class</option>
                {allClassData.map((cls) => (
                  <option key={cls.classId} value={cls.classNo}>
                    {cls.classNo}
                  </option>
                ))}
              </select>
              {errors.classNo && (
                <p className="font12 text-danger">{errors.classNo.message}</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label font14">Section *</label>
              <select
                className={`form-select font14 ${errors.sectionName ? 'border-danger' : ''}`}
                {...register('sectionName', { required: 'Section is required' })}
              >
                <option value="">Select Section</option>
                {allSectionData.map((sec) => (
                  <option key={sec.classSecId} value={sec.sectionName}>
                    {sec.sectionName}
                  </option>
                ))}
              </select>
              {errors.sectionName && (
                <p className="font12 text-danger">{errors.sectionName.message}</p>
              )}
            </div>

            <div className="col-md-12">
              <label className="form-label font14">Upload CSV *</label>
              <input
                type="file"
                accept=".csv"
                className={`form-control font14 ${errors.csvFile ? 'border-danger' : ''}`}
                {...register('csvFile', { required: 'CSV file is required' })}
                onChange={(e) => setValue('csvFile', e.target.files)}
              />
              {errors.csvFile && (
                <p className="font12 text-danger">{errors.csvFile.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="col-lg-2 col-md-3 col-sm-4 col-6 btn AddBtnn font14 text-white"
            >
              + Add Student
            </button>
          </form>
        </div>
      </div>

      {/* CSV FORMAT MODAL */}
      <div className="modal modal-lg fade" id="abc" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">CSV Format</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <p className="font14">Use the downloaded Excel as sample format.</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ExcelUpload;
