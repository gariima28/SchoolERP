import axios from 'axios'
const token = `Bearer ${sessionStorage.getItem('token')}`;
const forgetTooken = `Bearer ${sessionStorage.getItem('ERPForgetToken')}`;
// const token = sessionStorage.getItem('token');
// const Domain= 'http://89.116.122.211:5000';
const Domain = 'https://www.auth.edu2all.in/sch';




// ******************************************************************************************************
// Login  //
// ******************************************************************************************************


export const loginApi = async (data) => {
  try {
    var res = await axios.post(`${Domain}/login/all`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const logoutApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/login/logout`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Forget Password  //
// ******************************************************************************************************


export const getOTPByMailApi = async (mail) => {
  try {
    var res = await axios.post(`${Domain}/login/getOtp?email=${mail}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const verifyOTPApi = async (OTP) => {
  try {
    // axios.defaults.headers.common["Authorization"] = forgetTooken;
    var res = await axios.post(`${Domain}/login/verify-otp?OTP=${OTP}`
      , '',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': forgetTooken,
        }
      });
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const setPassApi = async (newpass) => {
  try {
    axios.defaults.headers.common["Authorization"] = forgetTooken;
    var res = await axios.post(`${Domain}/login/setPassword?password=${newpass}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ******************************************************************************************************
// Dashboard  //
// ******************************************************************************************************




export const getAllDashDataApi = async (graphKey, day, month, year) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/dashboard/mainDash?graphKey=${graphKey}&day=${day}&month=${month}&year=${year}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getSidebarDataApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/dashboard/sidebar`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getAdminDashDataApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/admin/getDashboardData`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



export const getAttendanceGraphDataApi = async (graphKey) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/attendance/stuAttendanceGraph?graphKey=${graphKey}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export const UserGetAllApi = async (roleId, searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getStaffByRoleType/${roleId}?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // const res= await axios.get(${Domain}/otherStaff/getStaffBySchId/${id})
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getSuperAdminProfileApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/admin/getSuperAdmin`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getAdminProfileApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/admin/getAdminById`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getTeacherProfileApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/otherStaff/getUserByToken`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getParentProfileApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/getParentByStudent`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getStudentProfileApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/getByStdId`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getDashDataApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getDashData`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ***************************************************************************************
// School  //
// ***************************************************************************************


export const getSchoolDataApi = async (searchKeyData, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getAllSchool?searchKey=${searchKeyData}&page=${pageNo}&size=${pageSize}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getSchoolDataByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getSchoolById?schoolBusinessId=${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewSchoolApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/sch/addSchool`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateSchoolApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/sch/editBySuperAdmin/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const deleteSchoolApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/sch/deleteById?schoolId=${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateSpecialFeatureInSchoolApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/plan/addFeaByPlanId/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ***************************************************************************************
// Plan // Package  //
// ***************************************************************************************


export const getAllPlanApi = async (searchKeyData, pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/plan/getAllPlan?searchKey=${searchKeyData}&page=${pageNo}&size=${size}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getPlanByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/plan/getById?planId=${id}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updatePlanApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/plan/editById/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const deletePlanApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/plan/deleteById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewPackageApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/plan/addPlans`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ***************************************************************************************
// Special Features  //
// ***************************************************************************************


export const getPlanInFeatureApi = async (planId, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/plan/addFeaByPlanId/${planId}`, data);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getAllSpeFeatApi = async (searchKeyData, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/fea/getAllFeatures?searchKey=${searchKeyData}&page=${pageNo}&size=${pageSize}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



export const getAllActiveInActiveSpeFeatApi = async (planIdd) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/fea/getActiveUnActiveByPlan?planId=${planIdd}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getSpeFeaByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/fea/getByFeaId/${id}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getPermBySpeFeaIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/per/getAllPerByFeaId?featureId=${id}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateSpeFeaNameApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/fea/editByFeaId/${id}`, data);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const addNewSpecialFeatureApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/fea/addFeature`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewFeaPerApi = async (data, id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/per/addPermission/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const deletePerByidApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/per/deleteById?permissionId=${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const deleteSpeFeaByidApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/fea/deleteById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}













// ***************************************************************************************************************************

// Saqib Code 

// ***************************************************************************************************************************


// GetAll 

export const GetApi = async (searchKey, pageNo, pageSize, startDate, endDate) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subs/getAllSubs?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}&startDate=${startDate}&lastDate=${endDate}`)

    //    // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// delete Api 

export const SubscriptionDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/subs/deleteById/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Get By id 

export const SubscriptionGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/subs/getBySubsId/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Put Api 

export const SubscriptionPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/subs/editBySubsId/${id}`, datares)

    // // console.log('my-response-get-by-id-suscription', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Get data Api from Plan modules __________

export const PlanGetApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/plan/getAllPlan?pageNo=1&pageSize=4`)

    //    // console.log('my-response', res)

    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ################### Subcription Apis  end  ####################### 




// ################### Request Apis ####################### 

// Get all api 
export const RequestGetApi = async (searchKey, pageNo, pageSize, startDate, endDate) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/request/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}&startDate=${startDate}&lastDate=${endDate}`)
    // // console.log(res2)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// resqust delete api 
export const RequestDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/request/delete?reqId=${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Put Data Api 
export const RequestPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/request/viewId/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ################### Request Apis end  ####################### 


// ################### specialfeature and addon Apis start  ####################### 

// GetAll 

export const SpecialFeaGetApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/fea/getAllFeatures`)

    //    // console.log('my-response', res)

    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// delete Api 

export const SpecialFeaDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/fea/deleteById?feaId=${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ################### specialfeature and addon Apis end  ####################### 














//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// ******************************************************************************************************
// Student  //
// ******************************************************************************************************


export const getStudentDataApi = async (classNo, classSec, searchKey, pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/getAllScClSec?classNo=${classNo}&classSec=${classSec}&searchKey=${searchKey}&page=${pageNo}&size=${size}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



export const getStudentDataByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/getStudentById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const addNewStudentApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/student/regStudent`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateStudentApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/student/updateStudent/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteStudentApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/student/deleteByStId/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const DownloadStudentExcelForm = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/emptyCSV`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const AddStudentByCSVApi = async (classNo, sectionName, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/student/importStudentCSV?classNo=${classNo}&sectionName=${sectionName}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const DownloadStudentFeeDataCSV = async (studentId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/csv/${studentId}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadStudentFeeDataPDF = async (studentId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/pdf/${studentId}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}




// ******************************************************************************************************
// Assign Student  //
// ******************************************************************************************************

export const getAssignStudentDataApi = async (searchKey, pageNo, pageSize) => {
  try {

    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/getAllAssignStudent?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const unAssignStudentApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/vehicle/unAssignStudent`, data);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const assignStudentApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/vehicle/assignStudent`, data);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadAssignStudentsPdf = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/vehicleStudentPDF`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadAssignStudentsCsv = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/vehicleStudentCSV`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadVehiclePdf = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/allStudentPDF`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadVehicleCsv = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/allStudentCSV`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Room  //
// ******************************************************************************************************

export const getRoomDataApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/room/getAllRoomBySchId?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ******************************************************************************************************
// Vehicle  //
// ******************************************************************************************************

export const getVehicleDataApi = async (searchKey, pageNo, pageSize) => {
  try {

    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/getAllVehByScId?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const AddNewVehicleApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/vehicle/addVehicle`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteVehicleApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/vehicle/deleteById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



export const getVehicleDataByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/getVehicleById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateVehicleDataApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/vehicle/updateVehicle/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadVehicleExcel = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/vehicleStudentCSV`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadVehiclePDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/vehiclePDF`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Driver  //
// ******************************************************************************************************

export const getDriverDataApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/getAllDriver?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadDriverPDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/driverPDF`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadDriverExcel = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/driverCSV`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewDriverApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/drivers/addDriver`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getDriverDataByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/getDriverById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateDriverDataApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/drivers/updateDriver/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteDriverApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/drivers/deleteById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ******************************************************************************************************
// Route  //
// ******************************************************************************************************

export const getAllRouteApi = async (search, page, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/route/getAllRoutByScId?searchKey=${search}&page=${page}&size=${size}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewRouteApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/route/addRoute`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getRouteCSVDataApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/driverCSV`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getRouteDataByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/route/getById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateRouteDataApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/route/updateById/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteRouteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/route/deleteById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const DownloadRouteExcel = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/driverCSV`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Drop Point  //
// ******************************************************************************************************


export const addNewDropPointApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/drop/addDrop`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getAllDropPointByVehicleApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drop/getAllDropByVehicle?vehicleNo=${data}`, data);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getAllDropPointApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drop/getAllSch?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getDropPointCSVDataApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/driverCSV`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getDropPointDataByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drop/getById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateDropPointDataApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/drop/editDrop/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteDropPointApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/drop/deleteDrop/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Class  //
// ******************************************************************************************************



export const getAllClassApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/class/getAllClassBySchId`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ******************************************************************************************************
// Section  //
// ******************************************************************************************************



export const getAllSectionApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/section/getAllSecByStudent`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getAllSectionByClassApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/section/getByClassId?classNo=${data}`,);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Subject  //
// ******************************************************************************************************


export const getAllSubjectApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getAllSubjectBySchId`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getAllSubjectByClassApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getAllSubByClassId/${id}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Teacher By Subject  //
// ******************************************************************************************************



export const getTeacherBySubjectApi = async (id1, id2) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${id1}&subjectId=${id2}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ******************************************************************************************************
// Session  //
// ******************************************************************************************************



export const getAllSessionDataAPI = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/session/getAllSessionBySchId`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteSessionApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/session/deleteById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const activeSessionDataApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/session/activeSession/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const addNewSessionApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/session/addSession`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getSessionDataByIdAPI = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/session/getSessionById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const updateSessionApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/session/editSession/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Grade  //
// ******************************************************************************************************

export const getGradeDataApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/api/grades?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewGradeApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/api/grades/create`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getGradeDataByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/api/grades/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateGradeByIdApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/api/grades/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteGradeApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/api/grades/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const PdfGradeApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/api/grades/pdf`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const CsvGradeApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/api/grades/csv`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const StudentGradeApi = async (page, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/api/grades/student?page=${page}&size=${size}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}




// ******************************************************************************************************
// ExamTerm  //
// ******************************************************************************************************

export const getExamTermDataApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam-terms/all?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewExamTermApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/exam-terms/add`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getExamTermDataByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam-terms/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateExamTermDataApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/exam-terms/update/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteExamTermApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/exam_category/delete/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}




// ******************************************************************************************************
// Marksheet  //
// ******************************************************************************************************

export const getAllMarksheetDataAPI = async (sectionId, classId, examTermId, searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/marks/all-students-marks-sheet?classSec=${sectionId}&classNo=${classId}&examTermId=${examTermId}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Promotion  //
// ******************************************************************************************************

export const getAllPromotedStudentsDataAPI = async (nextSession, prevSectionId, nextSectionId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/promotion/promoteAll?nextSession=${nextSession}&prevSectionId=${prevSectionId}&nextSectionId=${nextSectionId}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}





// ******************************************************************************************************
// SamplePaper  //
// ******************************************************************************************************

export const getSearhSamplePaperDataApi = async (id1, id2, id3, searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/search-paper?classId=${id1}&sectionId=${id2}&subjectId=${id3}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getDownloadSamplePaperDataApi = async (id, BlobData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/download-sample/${id}`, BlobData);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const deleteSamplePaperApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/samplePaper/delete/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addSamplePaperApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/samplePaper/create`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateSamplePaperApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/samplePaper/update/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadSamplePaperPDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/pdf`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Admin Account  //
// ******************************************************************************************************

export const AdminAccountApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/settings/updateAdmin`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getAdminDataAPI = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/admin/getAdminById`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getSamplePaperByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/getById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadSamplePaperExcel = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/csv`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Assignment  //
// ******************************************************************************************************

export const getSearhAssignmentDataApi = async (searchKey, id1, id2, id3, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/getAllAssignments?searchKey=${searchKey}&classId=${id1}&sectionId=${id2}&subjectId=${id3}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getAssignmentByIdDataApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/getById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getAllSubmissionsByAssignmentIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/submission/getAll/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getDownloadAssignmentDataApi = async (id, BlobData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/download-Assignment/${id}`, BlobData);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const deleteAssignmentApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/assignment/delete/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



export const addNewAssignmentAPI = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/assignment/create`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const EditNewAssignmentAPI = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/assignment/update/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadAssignmentExcel = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/csv`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadAssignmentPDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/pdf`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getAllAssignmentsDataApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/submission/studentSubmitAssignment/${id}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};



// ******************************************************************************************************
// Submission  //
// ******************************************************************************************************

export const getSearhSubmissionDataApi = async (searchKey, id1, id2, id3, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/submission/getAllSubmissions?searchKey=${searchKey}&classId=${id1}&sectionId=${id2}&subjectId=${id3}&page=${pageNo}&size=${pageSize}`
    );
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getSubmissionByIdDataApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/getById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getAllSubmissionsBySubmissionIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/submission/getAll/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getDownloadSubmissionDataApi = async (id, BlobData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/download-Submission/${id}`, BlobData);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const deleteSubmissionApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/assignment/delete/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



export const addNewSubmissionAPI = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/assignment/create`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const EditNewSubmissionAPI = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/assignment/update/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadSubmissionExcel = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/csv`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadSubmissionPDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/pdf`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Marks  //
// ******************************************************************************************************



export const getAllMarksApi = async (classNo, sectionId, subjectId, sessionName, examTermId, page, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/marks/filter?classNo=${classNo}&classSec=${sectionId}&subject=${subjectId}&sessionName=${sessionName}&examTermId=${examTermId}`,);
    // var res = await axios.get(`${Domain}/marks/all?classId=${classId}&sectionId=${sectionId}&subjectId=${subjectId}&sessionName=${sessionName}&ExamTerm=${ExamTerm}`,);
    // &page=${page}&size=${size}

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const AddUpdateMarksApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/marks/saveOrUpdate`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ******************************************************************************************************
// Offline Exam  //
// ******************************************************************************************************



export const getAllExamScheduleApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/api/exam-schedule/getAllExamScheduleForStudent?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ExamSchuledForTeacher 
export const getAllExamScheduleApiForTeacher = async (searchKey, pageNo, pageSize,classNo, sectionName) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/api/exam-schedule/filterByClassAndSection?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}&classNo=${classNo}&section=${sectionName}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getSearchExamScheduleApi = async (classNo, subject, searchKey, page, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/api/exam-schedule/filterByClassAndSubject?classNo=${classNo}&subject=${subject}&searchKey=${searchKey}&page=${page}&size=${size}`,);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const deleteExamScheduleApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/api/exam-schedule/delete/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getExamScheduleDataByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/api/exam-schedule/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewExamScheduleApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/api/exam-schedule/create`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateExamScheduleApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/api/exam-schedule/update/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}




// ******************************************************************************************************
// Subscription  //
// ******************************************************************************************************


export const getSubscriptionByIdApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subs/getBySchoolId`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateSubscriptionApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/settings/upgradeSubs/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getAllPlansApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/plan/getAllPlan`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}




// ******************************************************************************************************
// School Data  //
// ******************************************************************************************************



export const getSchoolDataByIdAPI = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getSchoolByAdmin`,);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateSchoolDataByIdAPI = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/settings/editById`, data);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}




// ******************************************************************************************************
// Dashboard Data  //
// ******************************************************************************************************



export const getAllNoticeApi = async (searchKey) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/notice/allNotice?searchKey=${searchKey}`,);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getAllEventsApi = async (searchKey) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/events/allEvents?searchKey=${searchKey}`,);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ******************************************************************************************************
// Invoice  //
// ******************************************************************************************************


export const getAllRecieptApi = async (startDate, endDate, classNo, section, status) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/receipt/getAll?startDate=${startDate}&endDate=${endDate}&classNo=${classNo}&section=${section}&status=${status}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getRecieptByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/receipt/getById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getRecieptCsvApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/receipt/CSV`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getAllManageInvoiceApi = async (startDate, endDate, classNo, section, status) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/invoice/manage?startDate=${startDate}&endDate=${endDate}&classNo=${classNo}&section=${section}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getAllDueInvoiceApi = async (startDate, endDate, classNo, section, status) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/invoice/due?startDate=${startDate}&endDate=${endDate}&classNo=${classNo}&section=${section}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewInvoiceApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/invoice/create`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const collectFeesApi = async (data, invoiceId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/invoice/collectFee/${invoiceId}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Fee Type  //
// ******************************************************************************************************


export const getAllWarehouseApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/warehouse/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewWarehouseApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/warehouse/add`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getByIdWarehouseApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/warehouse/getOne/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateByIdWarehouseApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/warehouse/modify/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteByIdWarehouseApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/warehouse/delete/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Fee Type  //
// ******************************************************************************************************


export const getAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feeType/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/feeType/addFeeType`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feeType/getById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateByIdApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/feeType/updateById/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/feeType/deleteById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ******************************************************************************************************
// Fee Type  //
// ******************************************************************************************************


export const getAllFeesApi = async (feeTypeId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feeType/getFeeById/${feeTypeId}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const addFeesApi = async (feeTypeId, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/feeType/addFee/${feeTypeId}`, data);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const updateFeesApi = async (feeTypeId, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/feeType/updateFee/${feeTypeId}`, data);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getAllFeeTypeApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feeType/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewFeeTypeApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/feeType/addFeeType`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getFeeTypeByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feeType/getById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateFeeTypeByIdApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/feeType/updateById/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteFeeTypeByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/feeType/deleteById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadFeeTypeExcel = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feeType/csv`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadFeeTypePDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feeType/pdf`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}




// ******************************************************************************************************
// Fee Group  //
// ******************************************************************************************************


export const getAllFeeGroupApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/group/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewFeeGroupApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/group/addGroup`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getFeeGroupByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/group/getById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateFeeGroupByIdApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/group/updateFeeGroup/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteFeeGroupByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/group/deleteById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadFeeGroupExcel = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/group/csv`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadFeeGroupPDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/group/pdf`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ******************************************************************************************************
// Fee Master  //
// ******************************************************************************************************


export const getAllFeeMasterApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/master/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewFeeMasterApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/master/add`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewFeeApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/feePay/updateById/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getFeeByPaymentIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByPaymentId?paymentId=${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getFeeMasterByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/master/getById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getFeeMasterByGroupNameApi = async (groupName) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/master/getByGroupName/${groupName}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateFeeMasterByIdApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/master/update/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteFeeMasterByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/master/deleteById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteFeeMasterByGroupNameApi = async (name) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/master/deleteByGroupName/${name}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadFeeMasterExcel = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/master/csv`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadFeeMasterPDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/master/pdf`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Fee Discount  //
// ******************************************************************************************************


export const getAllFeeDiscountApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/discount/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewFeeDiscountApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/discount/add`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getFeeDiscountByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/discount/getById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateFeeDiscountByIdApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/discount/update/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteFeeDiscountByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/discount/deleteById/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadFeeDiscountExcel = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/discount/csv`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadFeeDiscountPDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/discount/pdf`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Collect Fees  //
// ******************************************************************************************************


export const getCollectedStudentsFeeApi = async (classId, classSectionId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByClassSec?classId=${classId}&classSectionId=${classSectionId}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getCollectedStudentFeeByIdApi = async (studentId, size, page) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByStId/${studentId}?size=${size}&page=${page}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getExamDetailsByIdApi = async (studentId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/marks/stu-get-all-marks?studentId=${studentId}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getCbseExamDetailsByIdApi = async (studentId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/marks/stu-get-cbse?studentId=${studentId}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getDueFeesApi = async (feeCode, classNo, section, page, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getPendingFee?feeCode=${feeCode}&classNo=${classNo}&section=${section}&page=${page}&size=${size}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadDueFeesExcel = async (feeCode, classNo, section) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getPendingFeeCSV?feeCode=${feeCode}&classNo=${classNo}&section=${section}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadDueFeesPDF = async (feeCode, classNo, section) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getPendingFeePDF?feeCode=${feeCode}&classNo=${classNo}&section=${section}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}






// ******************************************************************************************************
// Issue Item Inventory  //
// ******************************************************************************************************


export const getAllIssueItemApi = async (searchByKey, page, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemIssue/getAll?searchKey=${searchByKey}&page=${page}&size=${size}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewIssueItemApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/itemIssue/issue`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadIssueItemExcel = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemIssue/csv`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadIssueItemPDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemIssue/pdf`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const returnItemApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/itemIssue/oneClickReturn/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getIssueItemByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemIssue/getOne/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateIssueItemByIdApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/group/updateFeeGroup/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteIssueItemByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/itemIssue/delete/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ******************************************************************************************************
// Item Inventory  //
// ******************************************************************************************************


export const getAllItemApi = async (page, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/item/getAll?page=${page}&size=${size}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewItemApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/item/add`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getItemByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/item/getOne/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateItemByIdApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/item/modify/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteItemByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/item/delete/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Item Stock Inventory  //
// ******************************************************************************************************


export const getAllItemStockApi = async (page, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemStock/getAll?page=${page}&size=${size}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const addNewItemStockApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/itemStock/add`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getItemStockByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemStock/getOne/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateItemStockByIdApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/itemStock/update/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const deleteItemStockByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/itemStock/delete/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ******************************************************************************************************
// Item Category Inventory  //
// ******************************************************************************************************


// export const getAllItemCategoryApi = async (page, size) => {
//     try{
//     axios.defaults.headers.common["Authorization"] = token;
//     var res = await axios.get(`${Domain}/itemCategory/getAll?page${page}&size=${size}`);
//     if (res) {
//         return res;
//     } else {
//         return []
//     }
//   } catch (error) {
//     return [];
//   }
// }



// ******************************************************************************************************
// Item Supplier Inventory  //
// ******************************************************************************************************


export const getAllItemSupplierApi = async (page, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemSupplier/getAll?page${page}&size=${size}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ******************************************************************************************************
// Item Store Inventory  //
// ******************************************************************************************************


export const getAllItemStoreApi = async (page, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemStore/getAll?page${page}&size=${size}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ******************************************************************************************************
// All Roles  //
// ******************************************************************************************************


export const getAllRolesApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/role/getRoleBySch`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ******************************************************************************************************
// All Data By Role Id  //
// ******************************************************************************************************


export const getDataByRoleIdApi = async (id, searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/otherStaff/getStaffByRoleType/${id}?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Holiday  //
// ******************************************************************************************************


export const getAllHolidayDataApi = async (searchKey, pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/holiday/all?&searchKey=${searchKey}&page=${pageNo}&size=${size}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}




// Saqib


// ########################## Human Resources API start ###########################

// post api 
export const PostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/role/addRole`, formData)

    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// GetAll Api 
export const RolePermissionGetApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/role/getRoleBySch`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const roleName = async (roleId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/role/getByRoleId/${roleId}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


//  Get All Api of special feature get from addon page in super admin panel
export const SpeFeaGetAllApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/fea/getFeaByRoleId`)
    // const res= await axios.get(`${Domain}/fea/getAllFeatures`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// delete Api 

export const RolePermDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/role/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get by Id 

export const RolePerGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/role/getByRoleId/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Put Data Api 
export const RolePerPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/role/editById/${id}`, datares)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ########################## Human Resources API end ########################### 



// ########################## Class API start ########################### 

// post Api 
export const ClassPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/class/addClass`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }

}

//  for admin class GetAll Api 
export const ClassGetApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/class/getClassAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)

    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// delete Api 

export const ClassDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/class/deleteById/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// Get By id 

export const ClassGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/class/getClassById/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Put Data Api 
export const ClassPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/class/updateClassById/${id}`, datares)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ########################## Class API end ########################### 


// ########################## Class Room API start ########################### 


// Post Api 

export const ClassRoomPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/room/addRoom`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }

}

// GetAll Api 
export const ClassRoomGetApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/room/getAllRoomBySchId?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    //    // console.log('my-response', res)

    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get By id 

export const ClassRoomGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/room/getRoomById/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// delete Api 

export const classRoomDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/room/deleteById/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Put Data Api 
export const ClassRoomPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/room/updateRoomById/${id}`, datares)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Class Room API end ########################### 





// ########################## Section API end ########################### 

// Post Api with Get all Api of class and Get all api of room

export const SectionPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/section/addSecInClass`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }

}

// NullGetAll Api from room page for room id

export const NullRoomGetApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/room/getAllNullRoom`)
    //    // console.log('my-response', res)

    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Sectionn Get All Api 
export const SectionRoomGetApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/getAllSecBySchool?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)

    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// Sectionn Delete Api 
export const SectionDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/section/deleteSection/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get By id 

export const SectionGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/section/getBySectionId/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// Put Data Api 
export const SectionPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    // const res2= await axios.put(`${Domain}/section/updateSection/${id}`,datares)
    const res2 = await axios.put(`${Domain}/section/updateSec/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// Section Get by class Id All Api 

export const SectionRoomByIdGetApi = async (Class) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/getByClassId?classId=${Class}`,)

    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// alll book 
export const GettAllBookByIssueBook = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/books/allBooks`)

    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// book by id 
export const BookBtId = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/books/getBook/${id}`)

    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ########################## Section API end ########################### 





// ########################## Event  API start ########################### 

// Event post Api 
export const EventPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/events/addEvents`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Event Get All Api 

export const EventGetAllApi = async (key, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/events/allEvents?searchKey=${key}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// Event Delete Api 
export const EventDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/events/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// Event get by id 
export const EventGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/events/findEvents/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// Event Put Data Api 
export const EventPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/events/modify/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Event CSV 
export const EventCSV = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/events/csv`)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Event API end ########################### 





// ########################## Notice API start ########################### 

// Event post Api 
export const NoticePostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/notice/addNotice`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }

}


// Notice Get All Api 

export const NoticeGetAllApi = async (key, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/notice/allNotice?searchKey=${key}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Notice Delete Api 
export const NoticeDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/notice/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Notice get by id 
export const NoticeGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/notice/findNotice/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Notice Put Data Api 
export const NoticePutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/notice/modify/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Notice CSV 
export const NoticeCSV = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/notice/csv`)
    // console.log('my-response-get-by-id', res2)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Notice API end ########################### 





// ########################## Holiday API start ########################### 

// Holiday post Api 
export const HolidayPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/holiday/addHoliday`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Holiday Get All Api 
export const HolidayGetAllApi = async (key, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/holiday/all?searchKey=${key}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Holiday Delete Api 
export const HolidayDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/holiday/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Holiday get by id 
export const HolidayGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/holiday/find/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// Holiday Put Data Api 
export const HolidayPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/holiday/modify/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Holiday CSV
export const HolidayCSV = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/holiday/csv`,)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Holiday PDF
export const HolidayPDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/holiday/pdf`,)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Holiday API end ########################### 






// ########################## Staff  API start ########################### 


// Staff  post Api 
export const StaffPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/otherStaff/addStaff`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }

}


// Staff Get All Api
export const StaffGetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getStaffBySchId?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // const res= await axios.get(${Domain}/otherStaff/getStaffBySchId/${id})
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Techer
export const TeacherGetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getTeacherBySchool?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // const res= await axios.get(${Domain}/otherStaff/getStaffBySchId/${id})
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Accountant
export const AccountantGetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getAccountantBySchool?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // const res= await axios.get(${Domain}/otherStaff/getStaffBySchId/${id})
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Librarian
export const LibrarianGetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getLibrarianBySchool?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // const res= await axios.get(${Domain}/otherStaff/getStaffBySchId/${id})
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// Staff Delete Api 
export const StaffDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/otherStaff/deleteStaff/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Staff Get by user Id 

export const StaffGetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getUser/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// staff Put Data Api 
export const StaffPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/otherStaff/editStaff/${id}`, datares)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  /otherStaff/getUser/{userId}
// ########################## Staff API end ########################### 







// ########################## Book manager list API start ########################### 

//  post Api 
export const BookManagerPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/books/add`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// book issue post Api 
export const BookIssue = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/transaction/issue-book`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// book return and issue 
export const BookIssueReturn = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/transaction/return-book/${id}`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// book issue get all api
export const BookIssueGetAllApi = async (searchKey, pageNo, pageSize, Class, sectionId, startDate, endDate) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/transaction/book-transactions?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}&classId=${Class ? Class : ''}&sectionId=${sectionId ? sectionId : ''}&startDate=${startDate ? startDate : ''}&endDate=${endDate ? endDate : ''}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get boo id api Api 
export const GetBookIdApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/books/nextBookId`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Library  Get All Api 
export const BookManagerGetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/books/allBooks?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Delete Api 
export const BookManagerDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/books/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Get by user Id 

export const BookmanGetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/books/getBook/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Book Manager Put Data Api 
export const BookManPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/books/modifyBook/${id}`, datares)
    // // console.log('my-response-get-by-id', res2)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// retun and isseu by id 
export const retunIssueById = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/transaction/getOne/${id}`, datares)
    // // console.log('my-response-get-by-id', res2)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// remove library member 
export const RemoveLibraryMemberApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.post(`${Domain}/library/removeLibMembers?studentIds=${data}`)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// GetAllNonMemberApi  Get All Api 
export const GetAllNonMemberApi = async (classNo, sectionName, nonMember) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/library/getAllMembers?studentStatus=${nonMember}&classNo=${classNo ? classNo : ''}&classSection=${sectionName ? sectionName : ''}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// GetAllMemberApi  Get All Api 
export const GetAllMemberApi = async (classNo, sectionName, nonMember) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/library/getAllMembers?studentStatus=${nonMember}&classNo=${classNo ? classNo : ''}&classSection=${sectionName ? sectionName : ''}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// add library member 
export const AddLibraryMemberApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.post(`${Domain}/library/addLibMembers?studentIds=${data}`)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Book Manager CSV
export const BookManCSV = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/books/csv`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Book Manager PDF
export const BookManPDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/books/pdf`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Book manager list API end ########################### 


// ########################## Book issue report API start ########################### 

//  post Api 
export const BookIssuePostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/transaction/issue-book`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//   Get All Api 
export const bookIssueGetAllApi = async (startDate, endDate, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/transaction/book-transactions?startDate=${startDate}&endDate=${endDate}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Delete Api 
export const IssueBookDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/transaction/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Get by user Id 
export const IssueBookGetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/transaction/getOne/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Book Issue Put Data Api 
export const IssueBookPutApi = async (id, PuData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/transaction/update/${id}`, PuData)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Book issue report API end ########################### 





// ########################## Student apsi start  ########################### 


// Student  Get All Api 
export const studentGetAllApi = async (searchKey, classNo, sectionName) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/student/getAllScClSec?searchKey=${searchKey}&classNo=${classNo}&classSec=${sectionName}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}




// ########################## Student apsi  end ########################### 


// ########################## Online Course API start ########################### 

//  post Api 
export const OnlinePostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/courses/add`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get All Api 
export const OnlineCourseGetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/courses/getAllCourses?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Delete Api 
export const OnlineDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/courses/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Get by user Id 
export const OnlineGetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/courses/getCourses/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Put Data Api 
export const OnlinePutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/courses/update/${id}`, datares)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Online Course API end ########################### 




// ########################## Human resources Leave API start ########################### 

//  post Api 
export const LeavePostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/leaveType/create`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// Get All Api 
export const LeaveGetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leaveType/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Delete Api 
export const LeaveDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/leaveType/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Get by user Id 
export const LeaveGetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leaveType/get/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Put Data Api 
export const LeavePutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/leaveType/edit/${id}`, datares)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// -----------------------------------------
// Assign leave Apis 

//  post Api 
export const AssignLeavePostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/leaveUser/add`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Get All Api 
export const AssignLeaveGetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leaveUser/getUsers?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Delete api
export const LeaveAssignDeleteApi = async (IdForDelete,selectedLeaveTypes) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/leaveUser/delete/${IdForDelete}?selectedLeaveType=${selectedLeaveTypes}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Delete leave type api
export const LeaveAssignDeleteTypeApi = async (id, roleId) => {
  try {
    // // console.log('my leave type in apis page',datares)
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/leaveUser/deleteLeaveType/${id}?leaveType=${roleId}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


//  Get by user Id 
export const AssignLeaveGetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leaveUser/getById/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Assign leave put api
export const AssignLeavePutApi = async (IdForUpdate, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/leaveUser/update/${IdForUpdate}`,formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// -----------------------------------------
// leave status 

//  post Api 
export const LeaveStatusPostApi = async (id, status) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/leave/acknowledge/${id}?status=${status}`,)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get All Api 
export const LeaveStatusGetAllApi = async (pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leave/new-applied?page=${pageNo}&size=${pageSize}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ########################## Human resources Leave API end ########################### 

// ########################## Subject API start ########################### 

//  post Api 
export const SubjectPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/subject/addSubject`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// subject Get All Api 
export const SubjectGetAllApi = async (searchKey, classIdForSearch, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubjectBySchId?searchKey=${searchKey}&classNo=${classIdForSearch}&page=${pageNo}&size=${pageSize}`,)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// subject by token to assigng suject teacher
export const GetAllAssignSubjectTeahcer = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubjectBySchId`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Delete Api 
export const SubjectDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/subject/deleteById/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Get by user Id 
export const SubjectGetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getSubjectById/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


//  Put Data Api 
export const SubjectPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/subject/updateSubById/${id}`, datares)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const Download_CSV = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/departments/allDepartCSV`)
    // // console.log('my-response-get-by-id', res2)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Subject API end ########################### 




// ########################## Department API start ########################### 
//  post Api 
export const DepartmentPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/departments/add`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Department Get All Api 
export const DepartmentGetAllApi = async (key, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/departments/all?searchKey=${key}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Delete Api 
export const DepartmentDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/departments/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Get by user Id 
export const DepartmentGetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/departments/getById/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Put Data Api 
export const DepartmentPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/departments/modify/${id}`, datares)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Search by class id 

// Department Get All Api 
export const DepartmentSearchGetAllApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubByClassId/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Department API end ########################### 



// ########################## Syllabus API Start ########################### 

//  post Api 
export const SyllabusPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/syllabus/addSyllabus`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// this section api use for section by class id for section 
export const SyllabusSectionGetAllApi = async (classId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/getByClassId?classId=${classId}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get subject by class id in syllabus 
export const SubjectByClassIdInSyllabusGetAllApi = async (classId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubByClassId/${classId}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// Get all api syllabus 
export const SyllabusGetAllApi = async (key, classId, sectionId, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    //   const res= await axios.get(`${Domain}/syllabus/getAllSyllabus`)
    const res = await axios.get(`${Domain}/syllabus/getByClassSection?searchKey=${key}&classId=${classId}&classSecId=${sectionId}&pageNo=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Delete Api 
export const SyllabusDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/syllabus/deleteById/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Get by user Id 

export const SyllbusGetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/syllabus/getSyllabusById/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Put Data Api 
export const SyllabusPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/syllabus/updateById/${id}`, datares)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Download file apis 
export const SyllabusFileDownloadGetAllApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/syllabus/downloadSyllabus/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ########################## Syllabus API end ########################### 




// ########################## Academics API start ########################### 

// Class Routine 


// Get all teacher by sybject id api syllabus 
export const AllTeacherBySubjectId = async (classId, subjectId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${classId}&subjectId=${subjectId}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  post Api 
export const ClassRoitinePostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    //   const res= await axios.post(`${girjeshServer}/routine/addRoutine`,datares)
    const res = await axios.post(`${Domain}/routine/addRoutine`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Slot Apis start
//  post Api 
export const ClassRoutineSlotPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    //   const res= await axios.post(`${girjeshServer}/routine/addRoutine`,datares)
    const res = await axios.post(`${Domain}/period/create`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  get all Api 
export const SlotGetAllApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    //   const res= await axios.post(`${girjeshServer}/routine/addRoutine`,datares)
    const res = await axios.get(`${Domain}/period/all`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  get by id Api 
export const SlotGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    //   const res= await axios.post(`${girjeshServer}/routine/addRoutine`,datares)
    const res = await axios.get(`${Domain}/period/getById/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  slot put id Api 
export const SlotPutApi = async (id,formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    //   const res= await axios.post(`${girjeshServer}/routine/addRoutine`,datares)
    const res = await axios.put(`${Domain}/period/update/${id}`,formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Slot Apis end

// class routine get by id 
export const ClassRoutineGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    //   const res= await axios.post(`${girjeshServer}/routine/addRoutine`,datares)
    const res = await axios.get(`${Domain}/routine/getById/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// class routine put 
export const ClassRoutinePutApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    //   const res= await axios.post(`${girjeshServer}/routine/addRoutine`,datares)
    const res = await axios.put(`${Domain}/routine/updateById/${id}`, data)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// get all api 
export const ClassRoutineGetAll = async (classNo, sectionName) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/routine/getClassRoutine?classNo=${classNo}&section=${sectionName}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  ClassRoutine CSV
export const ClassRoutineCSV = async (classNo, sectionName) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/routine/getCSV?classNo=${classNo}&section=${sectionName}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// get all api by search class and section 
export const ClassRoutineBySearchGetAll = async (classNo, section) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/routine/getBySchClassId?classNo=${classNo}&section=${section}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}




// Assign Subject and teacher start

//  post Api 
export const AssignTeaSubPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/subject/setSubjectTeacher`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Get section with class 
export const GetAlSectionWithClass = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/getClassSection`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// subject and teacher Get all api  
export const AssignGetAllApi = async (classId, subjectId, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${classId}&subjectId=${subjectId}&pageNo=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Delete Api 
export const AssignDeleteDeleteApi = async (subjectIdForDelete, staffIdForDelete) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/subject/removeSubjectTeacher?subjectId=${subjectIdForDelete}&teacherId=${staffIdForDelete}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Assign Subject and teacher end

// ########################## Academics API end ########################### 



// ########################## Daily attendace API start ########################### 

export const DailyAttendancehGetAll = async (sectionId, date) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/attendance/search-date?sectionId=${sectionId}&date=${date}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  post Api 
export const DailyAttendancePostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/attendance/create`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Put Data Api 
export const MyDailyAttendancePutApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/attendance/update`, datares)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DailyAttendancehGetAllBymonth = async (sectionId2, month, year, search, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/attendance/search-month?sectionId=${sectionId2}&month=${month}&year=${year}&searchKey=${search}&page=${pageNo}&size=${pageSize}`,)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Daily attendace API end ########################### 

// ########################## Assign Class teacher APIs start ########################### 

// get all api by search class and section 
export const GeyAllTeacherLightWeightGetAll = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getAllStaff-light`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  post Api 
export const AssignClassTreachPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/section/assignClassTeacher`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// assign get all api
export const AssignClassTeacherGetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/section-classTeacher-getAll?searchKey=${searchKey}&pageNo=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


//  Delete Api 
export const AssignDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/section/removeClassTeacher/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Get by id
export const AssignClassTeacherGetByIdAllApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/sectionClassTeacherGetById/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Put Data Api 
export const AssignClassTeacherPutApi = async (section, teacher) => {
  try {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/section/editClassTeacher?sectionId=${section}&staffId=${teacher}`)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// CSV 
export const ClassTeacherCSV = async() =>{
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.get(`${Domain}/class/classTeacherCSV`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// ########################## Assign Class teacher APIs end ########################### 





// ########################## StaffAttendance APIs start ########################### 

export const StaffAttendanceGetAllApi = async (date, roleid) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/staffAttendance/search-date?roleId=${roleid}&date=${date}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  post Api 
export const TakeAttendancePostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/staffAttendance/create`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Put Data Api 
export const SatffAttendancePutApi = async (data) => {
  try {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/staffAttendance/update`, data)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const AttendanceGetAllBymonth = async (roleid, month, year, search) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/staffAttendance/search-month?roleId=${roleid}&month=${month}&year=${year}&searchKey=${search}&page=${1}&size=${10}`,)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const AttendanceCSV = async (roleid, month, year) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/staffAttendance/csv?roleId=${roleid}&month=${month}&year=${year}`,)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## StaffAttendance APIs end ########################### 




// ########################## Income category APIs start ########################### 

//  post Api 
export const IncomeCategoryPostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/accounting/income-category/add`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


//  Income get all api
export const IncomeCategorygetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/accounting/income-category/all?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Delete Api 
export const IncomeCategoryDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/accounting/income-category/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Get by id
export const IncomeCategoryGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/accounting/income-category/get/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Put Data Api 
export const IncomeCategoryPutApi = async (id, formData) => {
  try {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/accounting/income-category/update/${id}`, formData)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ########################## Income category APIs end ########################### 





// ########################## Expense category APIs start ########################### 
//  post Api 
export const ExpenseCategoryPostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/accounting/expenseCategory/add`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Expense get all api
export const ExpenseCategorygetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/accounting/expenseCategory/all?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Delete Api 
export const ExpenseCategoryDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/accounting/expenseCategory/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Get by id
export const ExpenseCategoryGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/accounting/expenseCategory/get/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Put Data Api 
export const ExpenseCategoryPutApi = async (id, formData) => {
  try {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/accounting/expenseCategory/update/${id}`, formData)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Expense category APIs end ########################### 


// ########################## Income APIs end ########################### 

//  post Api 
export const IncomePostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/accounting/income/add`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  income get all api
export const IncomeAllApi = async (startDate, endDate, examTermId, searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/accounting/income/all?startDate=${startDate}&endDate=${endDate}&incomeCategoryId=${examTermId}&search=${searchKey}&page=${pageNo}&size=${pageSize}`)
    //   ,startDate,endDate,examTermId
    //   &examTermId=${examTermId}&startDate=${startDate}&endDate=${endDate}
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Delete Api 
export const IncomeDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/accounting/income/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return []; incomePutApi
  }
}

// Get by id
export const IncomeGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/accounting/income/get/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Put Data Api 
export const incomePutApi = async (id, formData) => {
  try {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/accounting/income/update/${id}`, formData)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }

}


// ########################## Income APIs end ########################### 




// ########################## Expense APIs start ########################### 

//  post Api 
export const ExpensePostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/accounting/expense/add`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  income get all api
export const ExpenseAllApi = async (searchKey, pageNo, pageSize, startDate, endDate, examTermId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/accounting/expense/all?expenseCategoryId=${examTermId}&search=${searchKey}&page=${pageNo}&size=${pageSize}&startDate=${startDate}&endDate=${endDate}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Delete Api 
export const ExpenseDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/accounting/expense/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get by id
export const ExpenseGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/accounting/expense/get/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Put Data Api 
export const ExpensePutApi = async (id, formData) => {
  try {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/accounting/expense/update/${id}`, formData)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }

}
// ########################## Expense APIs end ########################### 



// ########################## Payroll APIs start ########################### 

//  Post 
export const PayrollPostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/payroll/create`, formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// get all 
export const PayrollGetAllApi = async (month, year) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/payroll/view?month=${month}&year=${year}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const ContractGetAllApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/contact/getByStaffId/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ########################## Payroll APIs end ########################### 


// ########################## user contact APIs start ########################### 

export const UserContactGetAllApi = async (MyUserID, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/contact/saveOrUpdateContract/${MyUserID}`, formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const UserAllowanceGetAllApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/allowance/saveOrUpdateAllowance/${id}`, formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const UserCommissionGetAllApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/commissions/saveOrUpdateCommission/${id}`, formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const UserStueGetAllApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/statutory/saveOrUpdateStatutory/${id}`, formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const UserReimbirmntGetAllApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/reimb/saveOrUpdateReimbursement/${id}`, formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// personal post api 
export const SocialGetAllApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/social/saveOrUpdateSocial/${id}`, formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const BankGetAllApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/bank/updateDetails/${id}`, formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const EmergencyGetAllApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/emergency/saveOrUpdateCon/${id}`, formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const UpdateImageGetAllApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/otherStaff/editStaff/${id}`, formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}



export const Conatct_conat_ById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/contact/getByStaffId/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const Conatct_conat_PutApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/contact/updateContract/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const Conatct_allowance_getById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/allowance/getByStaffId/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const Conatct_allowance_PutApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/allowance/updateAllowance/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const Conatct_comission_GetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/commissions/getByStaffId/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const Conatct_statuary_GetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/statutory/getByStaffId/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const Conatct_reimbursement_GetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/reimb/getByStaffId/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const personal_info_Social__GetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/social/getByStaffId/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const personal_Bank_details__GetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/bank/getByStaffId/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const personal_Emergeny__GetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/emergency/getByStaffId/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const Profile_picture__GetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getUser/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const Profile_picture_PutApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/otherStaff/editStaff/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## user contact APIs end ########################### 



// ########################## Item category APIs start ########################### 



//  post Api 

export const ItemCategoryPostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/itemCategory/add`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const ItemCategoryGetAllApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemCategory/getAll`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const ItemCategoryDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/itemCategory/delete/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// get by id 
export const ItemCategoryGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemCategory/getOne/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// put api 
export const ItemCategoryUpdateApi = async (IdForUpdate, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/itemCategory/modify/${IdForUpdate}`, formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ########################## Item category APIs end ########################### 



// ########################## Item store APIs start ########################### 


//  post Api 

export const ItemStorePostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/itemStore/add`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// get all 

export const ItemStoreGetAllApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemStore/getAll`,)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// delete api 
export const ItemStoreDeleetApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/itemStore/delete/${id}`,)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// get by id api 
export const ItemStoreGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemStore/getOne/${id}`,)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// put id api 
export const ItemUpdatedApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/itemStore/modify/${id}`,)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ########################## Item store APIs end ########################### 




// ########################## Item Supplier APIs start ########################### 

//  post Api 
export const ItemSupplierPostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/itemSupplier/add`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// get all api 
export const ItemSupplierGetAllApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemSupplier/getAll`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// delete api 
export const ItemSupplierDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/itemSupplier/delete/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// get by api 
export const ItemSupplierGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemSupplier/getOne/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// update api 
export const ItemSupplierUpdateApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/itemSupplier/modify/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ########################## Item Supplier APIs end ########################### 


// ###############  CSV ####################

// Daily attendance CSV 
export const OtherStaffCSV = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/staffExportCSV?id=${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Daily attendance CSV 
export const DailyAttendanceCSV = async (sectionId, month, year) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/attendance/getCSV?sectionId=${sectionId}&month=${month}&year=${year}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// PARENT
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////



// ******************************************************************************************************
// Dashboard  //
// ******************************************************************************************************


export const getFeeDashDataApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/dashboard/getFeeDasByParent`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getFeeDataByIdApi = async (feeId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByFeeId/${feeId}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ******************************************************************************************************
// Holiday  //
// ******************************************************************************************************


export const getAllHolidayDataApiByStu = async (searchKey, pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/holiday/all?&searchKey=${searchKey}&page=${pageNo}&size=${size}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ******************************************************************************************************
// Notice  //
// ******************************************************************************************************


export const getAllNoticeDataApi = async (pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/notice/allNotice?page=${pageNo}&size=${size}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getNoticeDataByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/notice/findNotice/${id}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Event  //
// ******************************************************************************************************


export const getAllEventDataApi = async (searchKey, pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/events/allEvents?&searchKey=${searchKey}&page=${pageNo}&size=${size}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// SamplePaper  //
// ******************************************************************************************************


export const getAllSamplePaperDataApi = async (pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/stu-get-samplePaper?page=${pageNo}&size=${size}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const getDownloadSamplePaperDataApiByStu = async (id, BlobData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/download-sample/${id}`, BlobData);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// ExamSchedules  //
// ******************************************************************************************************


export const getAllExamSchedulesDataApi = async (pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam_details/stu-exam-details?page=${pageNo}&size=${size}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Marks  //
// ******************************************************************************************************


export const getAllMarksDataApi = async (pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/marks/stu-get-marks?page=${pageNo}&size=${size}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ******************************************************************************************************
// Teachers  //
// ******************************************************************************************************


export const getAllTeachersDataApi = async (pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getByTeaByStd?page=${pageNo}&size=${size}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Fees  //
// ******************************************************************************************************




export const getCollectedStudentFeeByStuIdApi = async (id, searchByKey, size, page) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByStudent?searchKey=${searchByKey}&size=${size}&page=${page}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



export const getFeePaidByParentApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/payByParents/${id}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const AddNewOfflinePaymentApi = async (id, data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/offline/payment/${id}`, data);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const DownloadStudentFeeDataCSVById = async (studentId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/csv/${studentId}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DownloadStudentFeeDataPDFById = async (studentId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/pdf/${studentId}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Online Course  //
// ******************************************************************************************************


export const getOnlineCoursesDataApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/courses/stu-get-onlineCourse`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ******************************************************************************************************
// Student Profile  //
// ******************************************************************************************************


export const getStudentProfileDataApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/studentData`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const updateStudentProfileDataApi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/student/updateByStudent`, data);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const AddNewOfflinePaymentAPi = async (data) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/student/updateByStudent`, data);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}








// ******************************************************************************************************
// Syllabus  //
// ******************************************************************************************************


export const getAllSyllabusDataApi = async (pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(
      `${Domain}/syllabus/getAllSyllabusForStudent?page=${pageNo}&size=${size}`
    );
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const downloadSyllabusDataApi = async (syllabusId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/syllabus/downloadSyllabus/${syllabusId}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};





// ******************************************************************************************************
// Subject  //
// ******************************************************************************************************


export const getAllSubjectDataApi = async (pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getBySubByStd?page=${pageNo}&size=${size}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// ******************************************************************************************************
// Attendance  //
// ******************************************************************************************************


export const getAllStudentAttendanceApi = async (month, year) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/attendance/getStudentAttendance?&month=${month}&year=${year}`);
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// ClassRoutine  //
// ******************************************************************************************************


export const getAllClassRoutineDataApi = async (day) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/routine/getByStudent`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// TEACHER 
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////



// ########################## Human Resources API start ###########################


// post Api 
export const TeacherClassPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/class/addClass`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }

}

// Class GetAll Api teacher -----
export const TeacherClassGetApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/class/getClassAllForTeacher`)
    // const res = await axios.get(`${Domain}/class/getAllClassBySchId`)
    // console.log('my-response', res)

    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// delete Api 
export const TeacherClassDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/class/deleteById/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// Get By id 

export const TeacherClassGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/class/getClassById/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Put Data Api 
export const TeacherClassPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/class/updateClassById/${id}`, datares)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  post Api 
export const TeacherLeaveStatusPostApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/leave/acknowledge/${id}`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// Get All Api 
export const TeacherLeaveStatusGetAllApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leave/new-applied`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// GetAll Api 
export const TeacherClassRoomGetApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/room/getAllRoomBySchId`)
    //    // console.log('my-response', res)

    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// Section Get by class Id All Api 

export const TeacherSectionRoomByIdGetApi = async (Class) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/getByClassId?classId=${Class}`,)

    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ########################## Section API end ########################### 





// ########################## Event  API start ########################### 

// Event post Api 
export const TeacherEventPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/events/addEvents`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }

}

// All roles in event Get All Api 

export const AllRolesGetAllApiInEvent = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/events/getAllEventRoleTypes`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Event Get All Api 

export const TeacherEventGetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/events/allEvents?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Event CSV 
export const TeacherEventCSV = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/events/csv`)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Event Delete Api 
export const TeacherEventDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/events/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// Event get by id 
export const TeacherEventGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/events/findEvents/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// Event Put Data Api 
export const TeacherEventPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/events/modify/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Event API end ########################### 





// ########################## Notice API start ########################### 

// Event post Api 
export const TeacherNoticePostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/notice/addNotice`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }

}


// Event Get All Api 

export const TeacherNoticeGetAllApi = async (key, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/notice/allNotice?searchKey=${key}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Notice CSV 
export const TeacherNoticeCSV = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/notice/csv`)
    // console.log('my-response-get-by-id', res2)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Notice Delete Api 
export const TeacherNoticeDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/notice/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Notice get by id 
export const TeacherNoticeGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/notice/findNotice/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Notice Put Data Api 
export const TeacherNoticePutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/notice/modify/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Notice API end ########################### 





// ########################## Holiday API start ########################### 

// Holiday post Api 
export const TeacherHolidayPostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/holiday/addHoliday`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Holiday Get All Api 
export const TeacherHolidayGetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/holiday/all?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Holiday CSV
export const TeacherHolidayCSV = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/holiday/csv`,)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Holiday PDF
export const TeacherHolidayPDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/holiday/pdf`,)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Holiday Delete Api 
export const TeacherHolidayDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/holiday/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Holiday get by id 
export const TeacherHolidayGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/holiday/find/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// Holiday Put Data Api 
export const TeacherHolidayPutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/holiday/modify/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Holiday API end ########################### 







// Teacher  Get All Api 
export const TeacherGetAllByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getStaffByRoleType/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}




// ########################## Student apsi  end ########################### 


// ########################## Online Course API start ########################### 

//  post Api 
export const TeacherOnlinePostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/courses/add`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get All Api 
export const TeacherOnlineCourseGetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/courses/getAllCourses?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Delete Api 
export const TeacherOnlineDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/courses/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Get by user Id 
export const TeacherOnlineGetById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/courses/getCourses/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Put Data Api 
export const TeacherOnlinePutApi = async (id, datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/courses/update/${id}`, datares)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Online Course API end ########################### 






// this section api use for section by class id for section 
export const TeacherSyllabusSectionGetAllApi = async (classId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/getByClassId?classId=${classId}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get subject by class id in  
export const TeacherSubjectByClassIdInSyllabusGetAllApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubByClassId/${id}`)
    // const res = await axios.get(`${Domain}/subject/getAllSubByClassId/${classId}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}





// ########################## Academics API start ########################### 

// Class Routine 


// Get all teacher by sybject id api syllabus 
export const TeacherAllTeacherBySubjectId = async (classId, subjectId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${classId}&subjectId=${subjectId}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  post Api 
export const TeacherClassRoitinePostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    //   const res= await axios.post(`${girjeshServer}/routine/addRoutine`,datares)
    const res = await axios.post(`${Domain}/routine/addRoutine`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// get all api teacher--
export const TeacherClassRoutineGetAll = async (classNo,sectionName) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/routine/getClassRoutine?classNo=${classNo}&section=${sectionName}`)
    // const res = await axios.get(`${Domain}/routine/getByTeacher`)
    //   const res= await axios.get(`${Domain}/routine/getAllRoute`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// export const ClassRoutineBySearchGetAll = async(classNo, section) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/routine/getBySchClassId?classNo=${classNo}&section=${section}`)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }

// export const AssignTeaSubPostApi = async(datares) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.post(`${Domain}/subject/setSubjectTeacher`,datares)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }  
// }

// export const AssignGetAllApi = async(classId,subjectId) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${classId}&subjectId=${subjectId}`)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }
// export const AssignDeleteDeleteApi = async(subjectIdForDelete, staffIdForDelete) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res2= await axios.delete(`${Domain}/subject/removeSubjectTeacher?subjectId=${subjectIdForDelete}&teacherId=${staffIdForDelete}`)
//   if(res2) {
//    return res2;
//   }
//   else{
//    return []
//   }
// }

// Assign Subject and teacher end

// ########################## Academics API end ########################### 



// ########################## Daily attendace API start ########################### 

export const TeacherDailyAttendancehGetAll = async (sectionId, date) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/attendance/search-date?sectionId=${sectionId}&date=${date}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  post Api 
export const TeacherDailyAttendancePostApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/attendance/create`, datares)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Put Data Api 
export const TeacherMyDailyAttendancePutApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/attendance/update`, datares)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const TeacherDailyAttendancehGetAllBymonth = async (sectionId2, month, year, search, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/attendance/search-month?sectionId=${sectionId2}&month=${month}&year=${year}&searchKey=${search}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const TeacherDailyAttendancehCSVBymonth = async (sectionId2, month, year) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/attendance/getCSV?sectionId=${sectionId2}&month=${month}&year=${year}`,)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ########################## Daily attendace API end ########################### 

// ########################## Assign Class teacher APIs start ########################### 

// get all api by search class and section 
// export const GeyAllTeacherLightWeightGetAll = async(classNo, section) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/otherStaff/getAllStaff-light`)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }



// export const AssignClassTreachPostApi = async(datares) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.post(`${Domain}/section/assignClassTeacher`,datares)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }  
// }
// export const AssignClassTeacherGetAllApi = async() =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/section/section-classTeacher-getAll`)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }


// export const AssignDeleteApi = async(id) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res2= await axios.delete(`${Domain}/section/removeClassTeacher/${id}`)
//   if(res2) {
//    return res2;
//   }
//   else{
//    return []
//   }
// }
// export const AssignClassTeacherGetByIdAllApi = async(id) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/section/sectionClassTeacherGetById/${id}`)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }

// export const AssignClassTeacherPutApi = async(section, teacher) =>{

//    axios.defaults.headers.common["Authorization"] = token;
//    const res2= await axios.put(`${Domain}/section/editClassTeacher?sectionId=${section}&staffId=${teacher}`)

//    if(res2) {
//     return res2;
//    }
//    else{
//     return []
//    }
// }

// ########################## Assign Class teacher APIs end ########################### 





// ########################## StaffAttendance APIs start ########################### 

// export const StaffAttendanceGetAllApi = async(date,roleid) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/staffAttendance/search-date?roleId=${roleid}&date=${date}`)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }
// export const TakeAttendancePostApi = async(datares) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.post(`${Domain}/staffAttendance/create`,datares)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }  
// }
// export const SatffAttendancePutApi = async(data) =>{

//    axios.defaults.headers.common["Authorization"] = token;
//    const res2= await axios.put(`${Domain}/staffAttendance/update`, data)

//    if(res2) {
//     return res2;
//    }
//    else{
//     return []
//    }
// }

// export const AttendanceGetAllBymonth = async(roleid,month,year,search) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/staffAttendance/search-month?roleId=${roleid}&month=${month}&year=${year}&searchKey=${search}&page=${1}&size=${10}`,)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }
// ########################## StaffAttendance APIs end ########################### 




// ########################## Income category APIs start ########################### 

// ########################## Income category APIs end ########################### 





// ########################## Expense category APIs start ########################### 

// ########################## Expense category APIs end ########################### 




// ########################## Income APIs end ########################### 




// ########################## Expense APIs start ########################### 

// ########################## Expense APIs end ########################### 


// ########################## Exam Category APIs start ########################### 


//  Exam category get all api
export const TeacherExamTermGetAll = async (searchKey) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/exam-terms/all`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ########################## Exam Category APIs end ########################### 


// ##########################  Session  APIs start ########################### 

//  Session category get all api
export const TeacherSessionyGetAll = async (searchKey) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/session/getAllSessionBySchId?searchKey=${searchKey}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ##########################  Session  APIs end ########################### 


// ##########################  Marks  APIs start ########################### 

export const TeacherMarksGetAll = async (classNo,sectionId, subjectId, sessionName, ExamTerm,searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/marks/filter?classNo=${classNo}&classSec=${sectionId}&sessionName=${sessionName}&subject=${subjectId}&examTermId=${ExamTerm}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`,)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  post Api 
export const TeacherMarksPostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/marks/saveOrUpdate`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ##########################  Marks  APIs end ########################### 


// ##########################  Offline exam  APIs start ########################### 

export const TeacherExamScheduleGetAll = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/exam_details/all?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  post Api 
export const TeacherOfflinePostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/exam_details/register`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Delete Api 
export const TeacherOfflineDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/exam_details/delete/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get by id
export const TeacherOfflineGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/exam_details/getOne/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Put Data Api 
export const TeacherOfflinePutApi = async (id, formData) => {
  try {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/exam_details/modify/${id}`, formData)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }

}

// ##########################  Offline exam  APIs end ########################### 




// ##########################  Assignemnt exam  APIs start ########################### 


//  post Api 
export const AssignmentPostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/assignment/create`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Teacher get with class id and subject id all api
export const TeacherGetTeacherGetAll = async (classId, subjectId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${classId}&subjectId=${subjectId}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Assignmnt get all api
export const TeacherAssignmntGetAllApi = async (classId,sectioId,subjectId,searchKey,pageNo,pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/assignment/getAllAssignments?classId=${classId}&sectionId=${sectioId}&subjectId=${subjectId}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Submission get all api
export const TeacherSubmissionGetAllApi = async (classId, sectionId,subjectId,assignmentId,searchKey,pageNo,pageSize,singleState) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/submission/getAllSubmissions?classId=${classId}&sectionId=${sectionId}&assignmentId=${assignmentId}&subjectId=${subjectId}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}&status=${singleState}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Submission get by id api
export const TeacherSubmissionGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/submission/getSubmissionById/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Submission put by id api
export const TeacherSubmissionPutByIdApi = async (IdForUpdate, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/submission/adminTea/update/${IdForUpdate}`, formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ##########################  Sample Paper exam  APIs start ########################### 

//  post Api 
export const TeacherSamplePaperPostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/samplePaper/create`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
//  Assignmnt get all api
export const TeacherSampleGetAllApi = async (searchKey, pageNo, pageSize, classId, sectionId, subjectId) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/samplePaper/search-paper?searchkey=${searchKey}&page=${pageNo}&size=${pageSize}&classId=${classId}&sectionId=${sectionId}&subjectId=${subjectId}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// delete 
export const TeacherSampleDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/samplePaper/delete/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// get by id 
export const TeacherSampleGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/samplePaper/getById/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

//  Put Data Api 
export const TeacherSamplePutApi = async (IdForUpdate, formData) => {
  try {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/samplePaper/update/${IdForUpdate}`, formData)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }

}
// Sample PDF
export const TeacherSamplePDF = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/samplePaper/download-sample/${id}`)
    // // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ##########################  Sample Paper exam  APIs end ########################### 





// ##########################  payroll  APIs start ########################### 


//  Payroll get all api

export const TeacherPayGetAllApi = async (pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/payroll/getByStaff?page=${pageNo}&size=${pageSize}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get by ud 
export const TeacherPayGetByIdAllApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/payroll/viewPayStaff/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// ##########################  payroll  APIs end ########################### 


// ##########################  Profile  APIs start ########################### 

// Get All api 
export const TeacherProfileByIdAllApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getUserByToken`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// put api 
export const TeacherProfileUpdateAllApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/otherStaff/updateByUser`, formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ##########################  Profile  APIs end ########################### 



// ##########################  Leave in teacher  APIs start ########################### 
//  post Api 
export const TeacherLeaveTeacherPostApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/leave/add`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get All type api 
export const TeacherLeaveTeacherAllApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leaveType/getAll`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// Get All api 
export const TeacherLeaveTeacherGetAllApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leave/user-readAll?&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // const res= await axios.get(`${Domain}/leave/user-readAll`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ##########################  Leave in teacher  APIs end ########################### 


// --- Garim api dashboard --- 


// ******************************************************************************************************
// Holiday  //
// ******************************************************************************************************


export const TeachergetAllHolidayDataApi = async (searchKey, pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/holiday/all?&searchKey=${searchKey}&page=${pageNo}&size=${size}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Event  //
// ******************************************************************************************************


export const TeachergetAllEventDataApi = async (searchKey, pageNo, size) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/events/allEvents?&searchKey=${searchKey}&page=${pageNo}&size=${size}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// ******************************************************************************************************
// Assignments  //
// ******************************************************************************************************


export const TeachergetAllAssignmentsDataApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/tea-get-assignment`);
    // var res = await axios.get(`${Domain}/assignment/stu-get-assignment`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ******************************************************************************************************
// ClassRoutine  //
// ******************************************************************************************************


export const TeachergetAllClassRoutineDataApi = async (timeTableDay) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    // var res = await axios.get(`${Domain}/routine/getByTeacher?day=${'tuesday'}`);
    var res = await axios.get(`${Domain}/routine/getByTeacher?day=${timeTableDay}`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const TeachergetAllLeaveOfTeacherDataApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/leave/tea-leaveReport`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}
export const TeachergetAllDashboardAttendanceDataApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/staffAttendance/checkInTimeInfo`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// ##########################  attendance in teacher  APIs start ########################### 

export const TeacherAttendanceTeacherGetAllApi = async (pageNo, pageSize, formattedStartDate, formattedEndDate, formattedDate, view) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    // console.log(formattedDate, 'formattedhdgjdjbfjd')
    const url = view === "week"
      ? `${Domain}/staffAttendance/attendanceReport?page=${pageNo}&size=${pageSize}&fromDate=${formattedStartDate}&toDate=${formattedEndDate}`
      : `${Domain}/staffAttendance/attendanceReport?page=${pageNo}&size=${pageSize}&apiData=${view}&monthYear=${formattedDate}`

    var res = await axios.get(url);
    // var res = await axios.get(${Domain}/staffAttendance/attendanceReport?page=${pageNo}&size=${pageSize}&apiData=${view}&fromDate=${formattedStartDate}&toDate=${formattedEndDate}&monthYear=${formattedDate});
    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}



// check-in post
export const TeacherAttendanceCheckInApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/staffAttendance/checkIn`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}
// check-out post
export const TeacherAttendanceCheckOutApi = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/staffAttendance/checkOut`);

    if (res) {
      return res;
    } else {
      return []
    }
  } catch (error) {
    return [];
  }
}


// Get by id
export const TeacherAssignmntGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/assignment/getById/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Put api
export const AssignmntPutApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/assignment/update/${id}`,formData)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// delete api
export const TeacherAssignmntDelete = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/assignment/delete/${id}`)
    // // console.log('my-response', res)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// Get by id
export const RequestGetByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/request/getById/${id}`)
    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

// request update
export const RequestUpdatePutApi = async (datares) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/request/updateStatus`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
      return res2;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const addNewSupplierApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/itemSupplier/add`, formData);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getAllSupplierApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemSupplier/getAll?searchkey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const deleteSupplierByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/itemSupplier/delete/${id}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getSupplierByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemSupplier/getOne/${id}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const updateSupplierByIdApi = async (supplierId, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/itemSupplier/modify/${supplierId}`, formData);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const DownloadSupplierPDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/samplePaper/download-sample`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const DownloadSupplierExcel = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/feePay/csv`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
// NEW INVENTORY
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// New Item Category APIs
export const addNewItemCategoryApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/itemCategory/add`, formData);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getAllItemCategoryApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemCategory/getAll?searchkey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const deleteItemCategoryByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/itemCategory/delete/${id}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getItemCategoryByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemCategory/getOne/${id}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const updateItemCategoryByIdApi = async (examTermId, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/itemCategory/modify/${examTermId}`, formData);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const DownloadItemCategoryPDF = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemCategory/download-pdf`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const DownloadItemCategoryExcel = async () => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemCategory/csv`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};



// New Products APIs
export const addNewManageProductApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/item/add`, formData);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getAllManageProductApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/item/getAll?searchkey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const deleteManageProductByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/item/delete/${id}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getManageProductByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/item/getOne/${id}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const updateManageProductByIdApi = async (examTermId, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/item/modify/${examTermId}`, formData);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};


// New Purchase APIS Export APIs





// New Products APIs
export const addNewManagePurchaseApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/purchase/add`, formData);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getAllManagePurchaseApi = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/purchase/getAll?searchkey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const deleteManagePurchaseByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/item/delete/${id}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getManagePurchaseByIdApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/purchase/getById/${id}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const updateManagePurchaseByIdApi = async (examTermId, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/purchase/modify/${examTermId}`, formData);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};


// New Product Export APIs
export const DownloadManageProductPDF = async () => {
  try {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/manageProduct/download-pdf`);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const DownloadManageProductExcel = async () => {
  try {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/manageProduct/csv`);
    return res || [];
  } catch (error) {
    return [];
  }
};

// Allowance APIs
export const addNewAllowanceName = async (formData) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.post(`${Domain}/allowance/addAllowanceName`, formData);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const getAllHRAllowanceName = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/allowance/getAllowanceNames?searchkey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const getAllowanceByIdApi = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/allowance/getAllowanceNameById/${id}`);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const updateAllowanceByIdApi = async (allowanceId, formData) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.put(`${Domain}/allowance/updateAllowanceName/${allowanceId}`, formData);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const deleteAllowanceByIdApi = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.delete(`${Domain}/allowance/deleteAllowanceName/${id}`);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const DownloadAllowanceExcel = async () => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/allowance/csv`);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const DownloadAllowancePDF = async () => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/allowance/download-pdf`);
    return res || [];
  } catch (error) {
    return [];
  }
};





// Deduction APIs
export const addNewDeductionName = async (formData) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.post(`${Domain}/statutory/addDeductionName`, formData);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const getAllHRDeductionName = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/statutory/getDeductionNames?searchkey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const getDeductionByIdApi = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/statutory/getDeductionNameById/${id}`);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const updateDeductionByIdApi = async (deductionId, formData) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.put(`${Domain}/statutory/updateDeductionName//${deductionId}`, formData);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const deleteDeductionByIdApi = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.delete(`${Domain}/statutory/deleteDeductionName/${id}`);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const DownloadDeductionExcel = async () => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/allowance/csv`);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const DownloadDeductionPDF = async () => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/allowance/download-pdf`);
    return res || [];
  } catch (error) {
    return [];
  }
};


export const AssignAllowanceToStaff = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/allowance/addAllowance/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}



export const getAllHRAllowanceByStaffID = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/allowance/getByStaffId/${id}`);
    return res || [];
  } catch (error) {
    return [];
  }
};


export const DeleteItemAssignAllowanceToStaff = async (id, ids) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/allowance/deleteAllowance/${id}/${ids}`);
    return res || [];
  } catch (error) {
    return [];
  }
}

export const getAllStockData = async (searchKey, pageNo, pageSize) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/stock/getAll?searchkey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};


export const addNewSaleApi = async (formData) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.post(`${Domain}/sale/add`, formData);
    return res || [];
  } catch (error) {
    return [];
  }
};



export const getAllProductByCategoryId = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/item/getByCategory/${id}`);
    if (res) {
      return res;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};




// User Deduction in User Form 


export const Conatct_deduction_PutApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/allowance/updateAllowance/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const Conatct_Deduction_getById = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/statutory/getByStaffId/${id}`)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const AssignDeductionToStaff = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/statutory/addStatutory/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getAllHRDeductionByStaffID = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/statutory/getByStaffId/${id}`);
    return res || [];
  } catch (error) {
    return [];
  }
};


export const DeleteItemAssignDeductionToStaff = async (id, ids) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/statutory/deleteStatutory/${id}/${ids}`);
    return res || [];
  } catch (error) {
    return [];
  }
}

export const Conatct_Deduction_PutApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/statutory/updateStatutory/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const BankPostApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/bank/bankDetail/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const BankPutApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/bank/updateDetails/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const EmergencyPostApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/emergency/addCon/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const EmergencyPutApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/emergency/updateCon/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const EmergencyDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/emergency/deleteByEmerId/${id}`);
    return res || [];
  } catch (error) {
    return [];
  }
}


export const getEmergencyByEmergencyId = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/emergency/getByEmerId/${id}`);
    return res || [];
  } catch (error) {
    return [];
  }
};



// Document 


export const DocumentPostApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/document/addDocByStaffId/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DocumentPutApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/document/updateByDocId/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}

export const DocumentDeleteApi = async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/document/deleteByDocId/${id}`);
    return res || [];
  } catch (error) {
    return [];
  }
}


export const getDocumentByDocumentId = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/document/getByDocId/${id}`);
    return res || [];
  } catch (error) {
    return [];
  }
};


export const getDocumentByStaffId = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/document/getAllForStaff/${id}`);
    return res || [];
  } catch (error) {
    return [];
  }
};


export const getAllSalesApi = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/sale/getAll`);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const getSaleByIdApi = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/sale/getById/${id}`);
    return res || [];
  } catch (error) {
    return [];
  }
};


export const DownloadManagePurchasePDF = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/sale`);
    return res || [];
  } catch (error) {
    return [];
  }
};

export const DownloadManagePurchaseExcel = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/sale`);
    return res || [];
  } catch (error) {
    return [];
  }
};


export const addIssueApi = async (formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/issue/add`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}


export const getAllIssuesApi = async () => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/issue/getAll`);
    return res || [];
  } catch (error) {
    return [];
  }
};


export const getIssueByIdApi = async (id) => {
  try {
    axios.defaults.headers.common['Authorization'] = token;
    const res = await axios.get(`${Domain}/issue/getById/${id}`);
    return res || [];
  } catch (error) {
    return [];
  }
};



export const modifyIssueApi = async (id, formData) => {
  try {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/issue/modify/${id}`, formData)
    if (res) {
      return res;
    }
    else {
      return []
    }
  } catch (error) {
    return [];
  }
}
