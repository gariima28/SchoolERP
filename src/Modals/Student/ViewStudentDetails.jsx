import React, { useEffect, useState } from 'react'
import { getStudentDataByIdApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';

const ViewStudentDetails = ({ studentGetId }) => {

  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    getStudentDataById();
  }, [studentGetId])


  // **************************************   Edit Page And Validation   *************************************************

  const [studentId, setStudentId] = useState('')
  const [studentName, setStudentName] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [motherName, setMotherName] = useState('')
  const [parentNo, setParentNo] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [fatherOccupation, setFatherOccupation] = useState('')
  const [motherOccupation, setMotherOccupation] = useState('')
  const [classNo, setClassNo] = useState('')
  const [section, setSection] = useState('')
  const [studentPass, setStudentPass] = useState('')
  const [studentDOB, setstudentDOB] = useState('')
  const [gender, setGender] = useState('')
  const [studentAddress, setStudentAddress] = useState('')
  const [emergencyNo, setEmergencyNo] = useState('')
  const [studentPh, setStudentPh] = useState('')
  const [studentImage, setStudentImage] = useState('')

  const getStudentDataById = async () => {
    try {
      var response = await getStudentDataByIdApi(studentGetId);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setStudentId(response?.data?.student?.studentId);
          setStudentName(response?.data?.student?.studentName);
          setBloodGroup(response?.data?.student?.bloodGroup);
          setFatherName(response?.data?.student?.fatherName);
          setMotherName(response?.data?.student?.motherName);
          setParentNo(response?.data?.student?.parentNo);
          setStudentEmail(response?.data?.student?.studentEmail);
          setParentEmail(response?.data?.student?.parentEmail);
          setFatherOccupation(response?.data?.student?.fatherOccupation);
          setMotherOccupation(response?.data?.student?.motherOccupation);
          setClassNo(response?.data?.student?.classNo);
          setSection(response?.data?.student?.classSection);
          setStudentPass(response?.data?.student?.studentPass);
          setstudentDOB(response?.data?.student?.dateOfBirth);
          setGender(response?.data?.student?.studentGender);
          setStudentAddress(response?.data?.student?.address);
          setEmergencyNo(response?.data?.student?.emergencyNo);
          setStudentPh(response?.data?.student?.studentPhone);
          setStudentImage(response?.data?.student?.studentImage);
          // toast.success(response?.data?.message)
        }
      }
      else {
        // toast.error(response?.data?.message);
      }
    }
    catch (error) {
      // setloaderState(false);
      // setloaderState(false);

    }
    finally {
      // setloaderState(false);
    }
  }



  return (

    <div className="p-3">
      <p className='p-3 text-center'><img className='border rounded-5' src={studentImage} alt="Not found !!" height={100} onError={(e) => e.target.src = gender === 'Male' ? '/images/boyImage.png' : '/images/girlImage.png'} /></p>
      <p className='pb-1 font26 text-center'>{studentName}</p>
      <p className='pb-1 font16 text-center'>{studentEmail}</p>
      <p className='pb-1 font14 text-center'><span>Student Id - </span><span className='fw-bolder'>{studentId}</span></p>
      <div className="headingBgColor p-3 mt-4">
        <div className="row p-2">
          <div className="col-6">
            <p className='font14 viewTextHeading'>Class & Section:</p>
          </div>
          <div className="col-6">
            <p className='font14'>{classNo}</p>
          </div>
        </div>
        <div className="row p-2">
          <div className="col-6">
            <p className='font14 viewTextHeading'>Section:</p>
          </div>
          <div className="col-6">
            <p className='font14'>{section}</p>
          </div>
        </div>
        <div className="row p-2">
          <div className="col-6">
            <p className='font14 viewTextHeading'>Address:</p>
          </div>
          <div className="col-6">
            <p className='font14'>{studentAddress}</p>
          </div>
        </div>
        <div className="row p-2">
          <div className="col-6">
            <p className='font14 viewTextHeading'>Phone Number:</p>
          </div>
          <div className="col-6">
            <p className='font14'>{studentPh}</p>
          </div>
        </div>
        <div className="row p-2">
          <div className="col-6">
            <p className='font14 viewTextHeading'>Gender:</p>
          </div>
          <div className="col-6">
            <p className='font14'>{gender}</p>
          </div>
        </div>
        <p className='font14 greenText fw-bolder mt-3'>Parents Details</p>
        <hr className='mt-2 greenHr' />
        <div className="row p-2">
          <div className="col-6">
            <p className='font14 viewTextHeading'>Father’s Name:</p>
          </div>
          <div className="col-6">
            <p className='font14'>{fatherName}</p>
          </div>
        </div>
        <div className="row p-2">
          <div className="col-6">
            <p className='font14 viewTextHeading'>Contact No:</p>
          </div>
          <div className="col-6">
            <p className='font14'>{parentNo}</p>
          </div>
        </div>
        <div className="row p-2">
          <div className="col-6">
            <p className='font14 viewTextHeading'>Email:</p>
          </div>
          <div className="col-6">
            <p className='font14'>{parentEmail}</p>
          </div>
        </div>
      </div>
      <Toaster />
    </div>

  )
}

export default ViewStudentDetails
