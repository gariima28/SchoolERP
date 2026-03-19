import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { getAllClassApi, getStudentDataByIdApi, updateStudentApi } from 'src/Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DataLoader from 'src/Layouts/Loader';
import { useForm } from 'react-hook-form';

const Container = styled.div`
    overflow: scroll;

    .formimagetext {
      border-radius: 5px 0px 0px 5px !important;
    }

    .hideScrollBar::-webkit-scrollbar {
        display: none !important;
    }

    .form-control::placeholder, .form-control, .form-select {
        color: var(--greyState);
    }

    .form-control, .form-select {
        border-radius: 5px;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .AddBtnn, .AddBtnn:visited, .AddBtnn:active {
        border: 1px solid var(--breadCrumActiveTextColor);
        background-color: var(--breadCrumActiveTextColor);
    }

    .CancelBtnn, .CancelBtnn:active {
        border: 1px solid var(--breadCrumActiveTextColor);
    }
`;

const EditStudentDetails = ({ studentGetId, onReload }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const [loaderState, setLoaderState] = useState(false);

  const [studentEmailVal, setStudentEmailVal] = useState('');
  const [parentEmailVal, setParentEmailVal] = useState('');
  const [studentImageVal, setStudentImageVal] = useState('');
  const [parentImageVal, setParentImageVal] = useState('');
  const [changeImageType, setChangeImageType] = useState(true);
  const [changeImageTypeParent, setChangeImageTypeParent] = useState(true);

  const [allClassData, setAllClassData] = useState([]);
  // ✅ useRef se allClassData ka latest value milega bina dependency ke
  const allClassDataRef = useRef([]);

  const [allSectionData, setAllSectionData] = useState([]);
  const [initialValues, setInitialValues] = useState({});

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [pendingStateCode, setPendingStateCode] = useState('');
  const [pendingCityName, setPendingCityName] = useState('');

  const apiKey = 'ZGpVTFdPWU03YVRmcGJtd3NWWEYyT2JhQWNKMzNmYXR6ZjNYME1Rcw==';
  const headers = { 'X-CSCAPI-KEY': apiKey };

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    mode: 'onChange',
  });

  const watchFields = watch();
  const watchCountry = watch('country');
  const watchState = watch('state');

  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    const isChanged = Object.keys(initialValues).some((key) => {
      return initialValues[key] !== watchFields[key];
    });
    setIsFormChanged(isChanged);
  }, [watchFields, initialValues]);

  // ---------- Country / State / City APIs ----------
  const fetchCountries = async () => {
    try {
      const response = await fetch('https://api.countrystatecity.in/v1/countries', { headers });
      if (response.ok) {
        const data = await response.json();
        setCountries(data);
      } else {
        toast.error('Failed to fetch countries');
      }
    } catch (error) {
      toast.error('Error fetching countries');
    }
  };

  const fetchStates = async (countryCode) => {
    if (!countryCode) return;
    try {
      setLoaderState(true);
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, { headers });
      if (response.ok) {
        const data = await response.json();
        setStates(data);
        setCities([]);
        setSelectedState('');
        setValue('state', '');
        setValue('city', '');
      } else {
        toast.error('Failed to fetch states');
      }
    } catch (error) {
      toast.error('Error fetching states');
    }
  };

  const fetchCities = async (countryCode, stateCode) => {
    if (!countryCode || !stateCode) return;
    try {
      const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, { headers });
      if (response.ok) {
        const data = await response.json();
        setCities(data);
      } else {
        toast.error('Failed to fetch cities');
      }
    } catch (error) {
      toast.error('Error fetching cities');
    }
  };

  useEffect(() => { fetchCountries(); }, []);

  useEffect(() => {
    if (selectedCountry) fetchStates(selectedCountry);
    else {
      setStates([]); setCities([]); setSelectedState('');
      setValue('state', ''); setValue('city', '');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState && selectedCountry) fetchCities(selectedCountry, selectedState);
    else { setCities([]); setValue('city', ''); }
  }, [selectedState, selectedCountry]);

  useEffect(() => {
    if (states.length > 0 && pendingStateCode) {
      const matchingState = states.find(s => s.iso2 === pendingStateCode);
      if (matchingState) {
        setValue('state', matchingState.iso2);
        setSelectedState(matchingState.iso2);
        setInitialValues(prev => ({ ...prev, state: matchingState.iso2 }));
      } else {
        setValue('state', '');
        setSelectedState('');
        setInitialValues(prev => ({ ...prev, state: '' }));
      }
      setPendingStateCode('');
    }
    if (!pendingStateCode && !pendingCityName && states.length > 0) setLoaderState(false);
  }, [states, pendingStateCode, setValue]);

  useEffect(() => {
    if (cities.length > 0 && pendingCityName) {
      const matchingCity = cities.find(c => c.name.toLowerCase() === pendingCityName.toLowerCase());
      if (matchingCity) {
        setValue('city', matchingCity.name);
        setInitialValues(prev => ({ ...prev, city: matchingCity.name }));
      } else {
        setValue('city', '');
        setInitialValues(prev => ({ ...prev, city: '' }));
      }
      setPendingCityName('');
      setLoaderState(false);
    }
  }, [cities, pendingCityName, setValue]);

  // ---------- Class API ----------
  const getAllClassData = async () => {
    try {
      const response = await getAllClassApi();
      if (response?.status === 200 && response?.data?.status === 'success') {
        const classes = response?.data?.classes || [];
        setAllClassData(classes);
        allClassDataRef.current = classes; // ✅ Ref update karo
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error('Error fetching classes');
    }
  };

  // ✅ handleClassChange — ref se classes lo, sections return karo
  const handleClassChange = (val, classesData = null) => {
    const classes = classesData || allClassDataRef.current;
    if (!val || !classes || classes.length === 0) return [];

    const selectedClass = classes.find(c => c.classNo === val);
    const sections = selectedClass?.section || [];

    setValue('classNo', val);
    setAllSectionData(sections);

    return sections;
  };

  // ---------- Student Data API ----------
  const getStudentDataById = async (classesData) => {
    try {
      const response = await getStudentDataByIdApi(studentGetId);
      if (response?.status === 200 && response?.data?.status === 'success') {
        const student = response?.data?.student;

        setValue('studentName', student?.studentName || '');
        setValue('fatherName', student?.fatherName || '');
        setValue('motherName', student?.motherName || '');
        setValue('studentPh', student?.studentPhone || '');
        setValue('parentNo', student?.parentNo || '');
        setValue('studentEmail', student?.studentEmail || '');
        setStudentEmailVal(student?.studentEmail || '');
        setValue('parentEmail', student?.parentEmail || '');
        setParentEmailVal(student?.parentEmail || '');
        setValue('fatherOccupation', student?.fatherOccupation || '');
        setValue('motherOccupation', student?.motherOccupation || '');

        // ✅ Class change karo — classesData seedha pass karo (stale state problem nahi hogi)
        const sections = handleClassChange(student?.classNo, classesData);

        // ✅ Section set karo — sections mile hain to validate karke set karo
        const sectionExists = sections.some(s => s.sectionName === student?.classSection);
        setValue('sectionName', sectionExists ? (student?.classSection || '') : '');

        setValue('studentDOB', student?.dateOfBirth || '');
        setValue('studentAddress', student?.address || '');
        setValue('emergencyNo', student?.emergencyNo || '');
        setValue('studentImage', student?.studentImage || '');
        setStudentImageVal(student?.studentImage || '');
        setValue('parentImage', student?.parentImage || '');
        setParentImageVal(student?.parentImage || '');
        setValue('bloodGroup', student?.bloodGroup || '');
        setValue('gender', student?.studentGender || '');
        setValue('stuStatus', student?.stuStatus ?? false);
        setValue('pinCode', student?.pinCode || '');

        setSelectedCountry(student?.country || '');
        setValue('country', student?.country || '');
        setPendingStateCode(student?.state || '');
        setPendingCityName(student?.city || '');

        setInitialValues({
          studentName: student?.studentName || '',
          fatherName: student?.fatherName || '',
          motherName: student?.motherName || '',
          studentPh: student?.studentPhone || '',
          parentNo: student?.parentNo || '',
          studentEmail: student?.studentEmail || '',
          parentEmail: student?.parentEmail || '',
          fatherOccupation: student?.fatherOccupation || '',
          motherOccupation: student?.motherOccupation || '',
          sectionName: student?.classSection || '',
          classNo: student?.classNo || '',
          studentDOB: student?.dateOfBirth || '',
          studentAddress: student?.address || '',
          emergencyNo: student?.emergencyNo || '',
          studentImage: student?.studentImage || '',
          parentImage: student?.parentImage || '',
          bloodGroup: student?.bloodGroup || '',
          gender: student?.studentGender || '',
          country: student?.country || '',
          state: student?.state || '',
          city: student?.city || '',
          pinCode: student?.pinCode || '',
        });

        setChangeImageType(!!student?.studentImage);
        setChangeImageTypeParent(!!student?.parentImage);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error('Error fetching student data');
      console.error('Error fetching student data:', error);
    }
  };

  // ✅ Main useEffect — pehle class data lo, phir student data
  useEffect(() => {
    if (!studentGetId || studentGetId.toString().trim() === '') return;

    const init = async () => {
      setLoaderState(true);
      try {
        // ✅ Pehle class API call karo aur classes directly lo
        const classResponse = await getAllClassApi();
        let classes = [];
        if (classResponse?.status === 200 && classResponse?.data?.status === 'success') {
          classes = classResponse?.data?.classes || [];
          setAllClassData(classes);
          allClassDataRef.current = classes;
        }

        // ✅ Ab student data fetch karo — classes seedha pass karo
        await getStudentDataById(classes);
      } catch (error) {
        console.error('Init error:', error);
      } finally {
        setLoaderState(false);
      }
    };

    init();
  }, [token, studentGetId]);

  // ---------- Update API ----------
  const updateStudent = async (data) => {
    setLoaderState(true);
    try {
      const formData = new FormData();
      formData.append('studentName', data.studentName);
      formData.append('fatherName', data.fatherName);
      formData.append('motherName', data.motherName);
      formData.append('parentNo', data.parentNo);
      if (data?.studentEmail !== studentEmailVal) formData.append('studentEmail', data.studentEmail);
      if (data?.parentEmail !== parentEmailVal) formData.append('parentEmail', data.parentEmail);
      formData.append('fatherOccupation', data.fatherOccupation);
      formData.append('motherOccupation', data.motherOccupation);
      formData.append('classNo', data.classNo);
      formData.append('stuStatus', data.stuStatus);
      formData.append('sectionName', data.sectionName);
      formData.append('studentDOB', data.studentDOB);
      formData.append('studentAddress', data.studentAddress);
      formData.append('emergencyNo', data.emergencyNo);
      formData.append('studentPh', data.studentPh);
      formData.append('bloodGroup', data.bloodGroup);
      formData.append('gender', data.gender);
      formData.append('country', data.country || '');
      formData.append('state', data.state || '');
      formData.append('city', data.city || '');
      formData.append('pinCode', data.pinCode || '');
      if (data?.studentImage && data?.studentImage !== studentImageVal) formData.append('studentImage', data.studentImage[0]);
      if (data?.parentImage && data?.parentImage !== parentImageVal) formData.append('parentImage', data.parentImage[0]);

      const response = await updateStudentApi(studentGetId, formData);
      if (response?.status === 200 && response?.data?.status === 'success') {
        toast.success(response?.data?.message);
        onReload(true);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error('Error updating student');
      console.error('Error during update:', error);
    } finally {
      setLoaderState(false);
    }
  };

  return (
    <Container className="hideScrollBar pt-3">
      {loaderState && <DataLoader />}
      <div className="container-fluid">
        <form className="row h-100 overflow-scroll" onSubmit={handleSubmit(updateStudent)}>

          {/* ---------- Student Name ---------- */}
          <div className="mb-3">
            <label htmlFor="studentName" className="form-label font14">Name</label>
            <input
              id="studentName" type="text"
              className={`form-control font14 ${errors.studentName ? 'border-danger' : ''}`}
              placeholder="Enter Student Name"
              {...register('studentName', {
                validate: (value) => {
                  if (value && !/^[A-Z]/.test(value)) return 'Student Name must start with an uppercase letter';
                  if (value && value.length < 4) return 'Minimum Length is 4';
                  if (value && !/^[a-zA-Z\s'-]+$/.test(value)) return 'Invalid Characters in Student Name';
                  return true;
                },
              })}
            />
            {errors.studentName && <p className="font12 text-danger">{errors.studentName.message}</p>}
          </div>

          {/* ---------- Blood Group ---------- */}
          <div className="mb-3">
            <label htmlFor="bloodGroup" className="form-label font14">Blood Group</label>
            <select id="bloodGroup" className={`form-select font14 ${errors.bloodGroup ? 'border-danger' : ''}`} {...register('bloodGroup')}>
              <option value="">Select Blood Group</option>
              <option value="AB+">AB+</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="O+">O+</option>
            </select>
            {errors.bloodGroup && <p className="font12 text-danger">{errors.bloodGroup.message}</p>}
          </div>

          {/* ---------- Father Name ---------- */}
          <div className="mb-3">
            <label htmlFor="fatherName" className="form-label font14">Father Name</label>
            <input
              id="fatherName" type="text"
              className={`form-control font14 ${errors.fatherName ? 'border-danger' : ''}`}
              placeholder="Enter Father's Name"
              {...register('fatherName', {
                validate: (value) => {
                  if (value && !/^[A-Z]/.test(value)) return 'Father Name must start with an uppercase letter';
                  if (value && value.length < 4) return 'Minimum Length is 4';
                  if (value && !/^[a-zA-Z\s'-]+$/.test(value)) return 'Invalid Characters in Father Name';
                  return true;
                },
              })}
            />
            {errors.fatherName && <p className="font12 text-danger">{errors.fatherName.message}</p>}
          </div>

          {/* ---------- Mother Name ---------- */}
          <div className="mb-3">
            <label htmlFor="motherName" className="form-label font14">Mother Name</label>
            <input
              id="motherName" type="text"
              className={`form-control font14 ${errors.motherName ? 'border-danger' : ''}`}
              placeholder="Enter Mother's Name"
              {...register('motherName', {
                validate: (value) => {
                  if (value && !/^[A-Z]/.test(value)) return 'Mother Name must start with an uppercase letter';
                  if (value && value.length < 4) return 'Minimum Length is 4';
                  if (value && !/^[a-zA-Z\s'-]+$/.test(value)) return 'Invalid Characters in Mother Name';
                  return true;
                },
              })}
            />
            {errors.motherName && <p className="font12 text-danger">{errors.motherName.message}</p>}
          </div>

          {/* ---------- Student Phone ---------- */}
          <div className="mb-3">
            <label htmlFor="studentPh" className="form-label font14">Student Contact Details</label>
            <input
              id="studentPh" type="tel"
              className={`form-control font14 ${errors.studentPh ? 'border-danger' : ''}`}
              placeholder="Enter Student's Phone Number"
              {...register('studentPh', {
                validate: (value) => {
                  if (value && !/^[6-9][0-9]{3}/.test(value)) return 'Phone number must start with digits between 6 and 9';
                  if (value && !/^[0-9]*$/.test(value)) return 'Invalid character in phone number';
                  if (value && value.length < 10) return 'Minimum 10 digits required';
                  if (value && value.length > 10) return 'Maximum 10 digits allowed';
                  return true;
                },
              })}
            />
            {errors.studentPh && <p className="font12 text-danger">{errors.studentPh.message}</p>}
          </div>

          {/* ---------- Parent Phone ---------- */}
          <div className="mb-3">
            <label htmlFor="parentNo" className="form-label font14">Parent Contact Details</label>
            <input
              id="parentNo" type="tel"
              className={`form-control font14 ${errors.parentNo ? 'border-danger' : ''}`}
              placeholder="Enter Parent's Phone Number"
              {...register('parentNo', {
                validate: (value) => {
                  if (value && !/^[6-9][0-9]{3}/.test(value)) return 'Phone number must start with digits between 6 and 9';
                  if (value && !/^[0-9]*$/.test(value)) return 'Invalid character in phone number';
                  if (value && value.length < 10) return 'Minimum 10 digits required';
                  if (value && value.length > 10) return 'Maximum 10 digits allowed';
                  return true;
                },
              })}
            />
            {errors.parentNo && <p className="font12 text-danger">{errors.parentNo.message}</p>}
          </div>

          {/* ---------- Student Email ---------- */}
          <div className="mb-3">
            <label htmlFor="studentEmail" className="form-label font14">Student Email</label>
            <input
              id="studentEmail" type="email"
              className={`form-control font14 ${errors.studentEmail ? 'border-danger' : ''}`}
              placeholder="Enter Student's Email"
              {...register('studentEmail', {
                validate: (value) => {
                  if (value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Not a valid email format';
                  return true;
                },
              })}
            />
            {errors.studentEmail && <p className="font12 text-danger">{errors.studentEmail.message}</p>}
          </div>

          {/* ---------- Parent Email ---------- */}
          <div className="mb-3">
            <label htmlFor="parentEmail" className="form-label font14">Parent Email</label>
            <input
              id="parentEmail" type="email"
              className={`form-control font14 ${errors.parentEmail ? 'border-danger' : ''}`}
              placeholder="Enter Parent's Email"
              {...register('parentEmail', {
                validate: (value) => {
                  if (value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Not a valid email format';
                  return true;
                },
              })}
            />
            {errors.parentEmail && <p className="font12 text-danger">{errors.parentEmail.message}</p>}
          </div>

          {/* ---------- Father Occupation ---------- */}
          <div className="mb-3">
            <label htmlFor="fatherOccupation" className="form-label font14">Father Occupation</label>
            <select id="fatherOccupation" className={`form-select font14 ${errors.fatherOccupation ? 'border-danger' : ''}`} {...register('fatherOccupation')}>
              <option value="">-- Choose --</option>
              <option value="Private">Private</option>
              <option value="Service Man">Service Man</option>
              <option value="Government">Government</option>
              <option value="Accountant">Accountant</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Teacher">Teacher</option>
              <option value="Doctor">Doctor</option>
              <option value="Unemployment">Unemployment</option>
              <option value="Bussiness Man">Bussiness Man</option>
              <option value="Retired">Retired</option>
            </select>
            {errors.fatherOccupation && <p className="font12 text-danger">{errors.fatherOccupation.message}</p>}
          </div>

          {/* ---------- Mother Occupation ---------- */}
          <div className="mb-3">
            <label htmlFor="motherOccupation" className="form-label font14">Mother Occupation</label>
            <select id="motherOccupation" className={`form-select font14 ${errors.motherOccupation ? 'border-danger' : ''}`} {...register('motherOccupation')}>
              <option value="">-- Choose --</option>
              <option value="House Wife">House Wife</option>
              <option value="Government">Government</option>
              <option value="Working">Working</option>
              <option value="Accountant">Accountant</option>
              <option value="Lawyer">Lawyer</option>
              <option value="Teacher">Teacher</option>
              <option value="Doctor">Doctor</option>
              <option value="Unemployment">Unemployment</option>
              <option value="Retired">Retired</option>
            </select>
            {errors.motherOccupation && <p className="font12 text-danger">{errors.motherOccupation.message}</p>}
          </div>

          {/* ---------- Class ---------- */}
          <div className="mb-3">
            <label htmlFor="classNo" className="form-label font14">Class</label>
            <select
              id="classNo"
              className={`form-select font14 ${errors.classNo ? 'border-danger' : ''}`}
              {...register('classNo')}
              onChange={(e) => {
                handleClassChange(e.target.value);
                setValue('sectionName', ''); // ✅ Class change hone pe section reset
              }}
            >
              <option value="">-- Select --</option>
              {allClassData?.map((cls) => (
                <option key={cls.classId} value={cls.classNo}>{cls.classNo}</option>
              ))}
            </select>
            {errors.classNo && <p className="font12 text-danger">{errors.classNo.message}</p>}
          </div>

          {/* ---------- Section ---------- */}
          <div className="mb-3">
            <label htmlFor="sectionName" className="form-label font14">Section</label>
            <select
              id="sectionName"
              key={allSectionData.map(s => s.classSecId).join('-')} // ✅ key change hoga to remount
              className={`form-select font14 ${errors.sectionName ? 'border-danger' : ''}`}
              {...register('sectionName')}
            >
              <option value="">-- Select --</option>
              {allSectionData.map((sec) => (
                <option key={sec.classSecId} value={sec.sectionName}>
                  {sec.sectionName}
                </option>
              ))}
            </select>
            {errors.sectionName && <p className="font12 text-danger">{errors.sectionName.message}</p>}
          </div>


          {/* ---------- Birthday ---------- */}
          <div className="mb-3">
            <label htmlFor="studentDOB" className="form-label font14">Birthday</label>
            <input id="studentDOB" type="date" className={`form-control font14 ${errors.studentDOB ? 'border-danger' : ''}`} {...register('studentDOB')} />
            {errors.studentDOB && <p className="font12 text-danger">{errors.studentDOB.message}</p>}
          </div>

          {/* ---------- Gender ---------- */}
          <div className="mb-3">
            <label htmlFor="gender" className="form-label font14">Gender</label>
            <select id="gender" className={`form-select font14 ${errors.gender ? 'border-danger' : ''}`} {...register('gender')}>
              <option value="">-- Select --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="font12 text-danger">{errors.gender.message}</p>}
          </div>

          {/* ---------- Status ---------- */}
          <div className="mb-3">
            <label htmlFor="stuStatus" className="form-label font14">Status</label>
            <select id="stuStatus" className={`form-select font14 ${errors.stuStatus ? 'border-danger' : ''}`} {...register('stuStatus')}>
              <option value="">-- Select --</option>
              <option value={true}>Active</option>
              <option value={false}>InActive</option>
            </select>
            {errors.stuStatus && <p className="font12 text-danger">{errors.stuStatus.message}</p>}
          </div>

          {/* ---------- Address ---------- */}
          <div className="mb-3">
            <label htmlFor="studentAddress" className="form-label font14">Address</label>
            <input
              id="studentAddress" type="text"
              className={`form-control font14 ${errors.studentAddress ? 'border-danger' : ''}`}
              placeholder="Enter Address"
              {...register('studentAddress', {
                validate: (value) => {
                  if (value && value.length < 4) return 'Minimum Length is 4';
                  if (value && !/^[a-zA-Z0-9\s,.'-]+$/.test(value)) return 'Address must contain only letters, digits, and spaces';
                  return true;
                },
              })}
            />
            {errors.studentAddress && <p className="font12 text-danger">{errors.studentAddress.message}</p>}
          </div>

          {/* ---------- Emergency Contact ---------- */}
          <div className="mb-3">
            <label htmlFor="emergencyNo" className="form-label font14">Emergency Contact Details</label>
            <input
              id="emergencyNo" type="tel"
              className={`form-control font14 ${errors.emergencyNo ? 'border-danger' : ''}`}
              placeholder="Enter Emergency Phone Number"
              {...register('emergencyNo', {
                validate: (value) => {
                  if (value && !/^[6-9][0-9]{3}/.test(value)) return 'Phone number must start with digits between 6 and 9';
                  if (value && !/^[0-9]*$/.test(value)) return 'Invalid character in phone number';
                  if (value && value.length < 10) return 'Minimum 10 digits required';
                  if (value && value.length > 10) return 'Maximum 10 digits allowed';
                  return true;
                },
              })}
            />
            {errors.emergencyNo && <p className="font12 text-danger">{errors.emergencyNo.message}</p>}
          </div>

          {/* ---------- Country ---------- */}
          <div className="mb-3">
            <label htmlFor="country" className="form-label font14">Country</label>
            <select
              id="country"
              className={`form-select font14 ${errors.country ? 'border-danger' : ''}`}
              {...register('country', {
                validate: (value) => {
                  if (value && !countries.some(c => c.iso2 === value)) return 'Invalid country selected';
                  return true;
                },
              })}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">-- Select Country --</option>
              {countries.map(c => (
                <option key={c.iso2} value={c.iso2}>{c.name}</option>
              ))}
            </select>
            {errors.country && <p className="font12 text-danger">{errors.country.message}</p>}
          </div>

          {/* ---------- State ---------- */}
          <div className="mb-3">
            <label htmlFor="state" className="form-label font14">State</label>
            <select
              id="state"
              className={`form-select font14 ${errors.state ? 'border-danger' : ''}`}
              {...register('state', {
                validate: (value) => {
                  if (value && !states.some(s => s.iso2 === value)) return 'Invalid state selected';
                  return true;
                },
              })}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">-- Select State --</option>
              {states.length > 0 ? states.map(s => (
                <option key={s.iso2} value={s.iso2}>{s.name}</option>
              )) : (
                <option value="" disabled>
                  {watchCountry ? '-- No States Found --' : '-- Select Country First --'}
                </option>
              )}
            </select>
            {errors.state && <p className="font12 text-danger">{errors.state.message}</p>}
          </div>

          {/* ---------- City ---------- */}
          <div className="mb-3">
            <label htmlFor="city" className="form-label font14">City</label>
            <select
              id="city"
              className={`form-select font14 ${errors.city ? 'border-danger' : ''}`}
              {...register('city', {
                validate: (value) => {
                  if (value && !cities.some(c => c.name === value)) return 'Invalid city selected';
                  return true;
                },
              })}
            >
              <option value="">-- Select City --</option>
              {cities.length > 0 ? cities.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              )) : (
                <option value="" disabled>
                  {watchState ? '-- No Cities Found --' : '-- Select State First --'}
                </option>
              )}
            </select>
            {errors.city && <p className="font12 text-danger">{errors.city.message}</p>}
          </div>

          {/* ---------- Pin Code ---------- */}
          <div className="mb-3">
            <label htmlFor="pinCode" className="form-label font14">Pin Code</label>
            <input
              id="pinCode" type="text"
              className={`form-control font14 ${errors.pinCode ? 'border-danger' : ''}`}
              placeholder="Enter Pin Code"
              {...register('pinCode', {
                validate: (value) => {
                  if (value && !/^[0-9]{6}$/.test(value)) return 'Pin Code must be a 6-digit number';
                  return true;
                },
              })}
            />
            {errors.pinCode && <p className="font12 text-danger">{errors.pinCode.message}</p>}
          </div>

          {/* ---------- Student Image ---------- */}
          <div className="mb-3">
            <label htmlFor="studentImage" className="form-label font14">Student Image</label>
            <div className="d-flex bg-white">
              {studentImageVal && changeImageType ? (
                <input id="studentImageText" type="text" className="form-control formimagetext font14" value={studentImageVal.split('/').pop()} disabled />
              ) : (
                <input
                  id="studentImageFile" type="file"
                  className={`form-control formimagetext font14 ${errors.studentImage ? 'border-danger' : ''}`}
                  accept=".jpg, .jpeg, .png"
                  {...register('studentImage', {
                    validate: (value) => {
                      if (value && value.length > 0) {
                        const file = value[0];
                        if (file.size < 10240 || file.size > 204800) return 'File size must be between 10 KB to 200 KB';
                      }
                      return true;
                    },
                  })}
                />
              )}
              <div className="formcontrolButtonborder p-1 ps-3 pe-3 text-center">
                <span className="text-white font14 align-self-center" onClick={() => setChangeImageType(!changeImageType)}>
                  {studentImageVal && changeImageType ? 'Edit' : 'View'}
                </span>
              </div>
            </div>
            {errors.studentImage && <p className="font12 text-danger">{errors.studentImage.message}</p>}
          </div>

          {/* ---------- Parent Image ---------- */}
          <div className="mb-3">
            <label htmlFor="parentImage" className="form-label font14">Parent Image</label>
            <div className="d-flex bg-white">
              {parentImageVal && changeImageTypeParent ? (
                <input id="parentImageText" type="text" className="form-control formimagetext font14" value={parentImageVal.split('/').pop()} disabled />
              ) : (
                <input
                  id="parentImageFile" type="file"
                  className={`form-control formimagetext font14 ${errors.parentImage ? 'border-danger' : ''}`}
                  accept=".jpg, .jpeg, .png"
                  {...register('parentImage', {
                    validate: (value) => {
                      if (value && value.length > 0) {
                        const file = value[0];
                        if (file.size < 10240 || file.size > 204800) return 'File size must be between 10 KB to 200 KB';
                      }
                      return true;
                    },
                  })}
                />
              )}
              <div className="formcontrolButtonborder p-1 ps-3 pe-3 text-center">
                <span className="text-white font14 align-self-center" onClick={() => setChangeImageTypeParent(!changeImageTypeParent)}>
                  {parentImageVal && changeImageTypeParent ? 'Edit' : 'View'}
                </span>
              </div>
            </div>
            {errors.parentImage && <p className="font12 text-danger">{errors.parentImage.message}</p>}
          </div>

          {/* ---------- Submit / Cancel ---------- */}
          <p className="text-center p-3">
            <button className="btn updateButtons text-white" type="submit" disabled={!isFormChanged}>
              Update
            </button>
            <button className="btn cancelButtons ms-3" data-bs-dismiss="offcanvas" aria-label="Close" type="button">
              Cancel
            </button>
          </p>
        </form>
        <Toaster />
      </div>
    </Container>
  );
};

export default EditStudentDetails;
