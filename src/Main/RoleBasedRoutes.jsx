import React from 'react'
const AttendanceReportTea = React.lazy(() => import('src/Pages/Teacher/attendanceReport_T'));
const Assignment_details = React.lazy(() => import('src/Pages/Teacher/Assignment_details_T'));
const Assignmnt_submss = React.lazy(() => import('src/Pages/Teacher/Assignmnt_submss_T'));
// import User_basic_infomation from '../Pages/Admin/User/User_basic_infomation';
// import UserRouting from '/Users/saqib/Documents/My data/NewCollaboratorSchlERP/SchoolERP/src/Pages/Admin/ContextApi/UserRouting.jsx';


// Super Admin
const AllSchools = React.lazy(() => import('src/Pages/SuperAdmin/AllSchools'));
const ViewSchoolDetails = React.lazy(() => import('src/Pages/SuperAdmin/ViewSchoolDetails'));
const AddSchool = React.lazy(() => import('src/Pages/SuperAdmin/AddSchool'));
const Addon = React.lazy(() => import('src/Pages/SuperAdmin/Addon'));
const AddAddon = React.lazy(() => import('src/Pages/SuperAdmin/AddAddon'));
const Packages = React.lazy(() => import('src/Pages/SuperAdmin/Packages'));
const Subscription = React.lazy(() => import('src/Pages/SuperAdmin/Subscription'));
const Request = React.lazy(() => import('src/Pages/SuperAdmin/Request'));
const SystemSetting = React.lazy(() => import('src/Pages/SuperAdmin/SystemSetting'));
const WebsiteSetting = React.lazy(() => import('src/Pages/SuperAdmin/WebsiteSetting'));
const ManageFaq2 = React.lazy(() => import('src/Pages/SuperAdmin/ManageFaq2'));
const PaymentSetting = React.lazy(() => import('src/Pages/SuperAdmin/PaymentSetting'));

const AdmissionForm = React.lazy(() => import('src/Pages/Admin/Student/AdmissionForm'));
const ExcelUpload = React.lazy(() => import('src/Pages/Admin/Student/ExcelUpload'));
const SingleStudentAdmission = React.lazy(() => import('src/Pages/Admin/Student/SingleStudentAdmission'));
const AllStudents = React.lazy(() => import('src/Pages/Admin/Student/AllStudents'));

const ExamTerm = React.lazy(() => import('src/Pages/Admin/Examination/ExamTerm'));
const Grades = React.lazy(() => import('src/Pages/Admin/Examination/Grades'));
const Marks = React.lazy(() => import('src/Pages/Admin/Examination/Marks'));
const ExamSchedule = React.lazy(() => import('src/Pages/Admin/Examination/ExamSchedule'));
const Promotion = React.lazy(() => import('src/Pages/Admin/Examination/Promotion'));
const Marksheet = React.lazy(() => import('src/Pages/Admin/Examination/Marksheet'));

const AddDriver = React.lazy(() => import('src/Pages/Admin/User/AddDriver'));
const AddVehicle = React.lazy(() => import('src/Pages/Admin/Transport/AddVehicle'));
const AssignStudent = React.lazy(() => import('src/Pages/Admin/Transport/AssignStudent'));
const Driver = React.lazy(() => import('src/Pages/Admin/User/Driver'));
const Vehicle = React.lazy(() => import('src/Pages/Admin/Transport/Vehicle'));
const AddRoute = React.lazy(() => import('src/Pages/Admin/Transport/AddRoute'));
const AddDropPoint = React.lazy(() => import('src/Pages/Admin/Transport/AddDropPoint'));
const DropPoint = React.lazy(() => import('src/Pages/Admin/Transport/DropPoint'));
const AllRoute = React.lazy(() => import('src/Pages/Admin/Transport/Route'));

const SamplePaper = React.lazy(() => import('src/Pages/Admin/SamplePaper/SamplePaper'));

const Assignment = React.lazy(() => import('src/Pages/Admin/Assignment/Assignment'));
const OpenAssignment = React.lazy(() => import('../Modals/Assignments/OpenAssignment'));
const Submissions = React.lazy(() => import('src/Pages/Admin/Assignment/Submissions'));

const SchoolSetting = React.lazy(() => import('src/Pages/Admin/Settings/SchoolSetting'));
const SessionManager = React.lazy(() => import('src/Pages/Admin/Settings/SessionManager'));
const PaymentSettings = React.lazy(() => import('src/Pages/Admin/Settings/PaymentSettings'));
const SettingsSubscription = React.lazy(() => import('src/Pages/Admin/Settings/SettingsSubscription'));
const MyAccount = React.lazy(() => import('src/Pages/Admin/Settings/MyAccount'));

const FeesType = React.lazy(() => import('src/Pages/Admin/FeeCollection/FeesType'));
const FeesDiscount = React.lazy(() => import('src/Pages/Admin/FeeCollection/FeesDiscount'));
const FeeCollection = React.lazy(() => import('src/Pages/Admin/FeeCollection/FeeCollection'));
const ManageInvoice = React.lazy(() => import('src/Pages/Admin/FeeCollection/ManageInvoice'));
const DueInvoice = React.lazy(() => import('src/Pages/Admin/FeeCollection/DueInvoice'));
const Reciept = React.lazy(() => import('src/Pages/Admin/FeeCollection/Reciept'));

const Teacher = React.lazy(() => import('src/Pages/Admin/User/Teacher'));
const Accountant = React.lazy(() => import('src/Pages/Admin/User/Accountant'));
const Librarian = React.lazy(() => import('src/Pages/Admin/User/Librarian'));
const OtherStaff = React.lazy(() => import('src/Pages/Admin/User/OtherStaff'));

const MainUserForm = React.lazy(() => import('src/Pages/Admin/User/MainUserForm'));
const User_Contact = React.lazy(() => import('src/Pages/Admin/User/User_Contact'));
const User_Per_info = React.lazy(() => import('src/Pages/Admin/User/User_Per_info'));
const User_Documents = React.lazy(() => import('src/Pages/Admin/User/User_Documnt'));
const User_basic_infomation = React.lazy(() => import('src/Pages/Admin/User/User_basic_infomation'));

const ManageSupplier = React.lazy(() => import('src/Pages/Admin/Inventory/ManageSupplier'));
const ManageWarehouse = React.lazy(() => import('src/Pages/Admin/Inventory/ManageWarehouse'));
const ItemCategory = React.lazy(() => import('src/Pages/Admin/Inventory/ItemCategory'));
const ManageProducts = React.lazy(() => import('src/Pages/Admin/Inventory/ManageProducts'));
const ManagePurchase = React.lazy(() => import('src/Pages/Admin/Inventory/ManagePurchase'));
const ItemStock = React.lazy(() => import('src/Pages/Admin/Inventory/ItemStock'));
const ManageSale = React.lazy(() => import('src/Pages/Admin/Inventory/ManageSale'));
const AddSale = React.lazy(() => import('src/Pages/Admin/Inventory/AddSale'));
const ManageIssue = React.lazy(() => import('src/Pages/Admin/Inventory/ManageIssue'));

const DailyAttendance = React.lazy(() => import('src/Pages/Admin/Academic/DailyAttendance'));
const ClassList = React.lazy(() => import('src/Pages/Admin/Academic/ClassList'));
const ClassRoutine = React.lazy(() => import('src/Pages/Admin/Academic/ClassRoutine'));
const Subject = React.lazy(() => import('src/Pages/Admin/Academic/Subject'));
const Syllabus = React.lazy(() => import('src/Pages/Admin/Academic/Syllabus'));
const ClassRoom = React.lazy(() => import('src/Pages/Admin/Academic/ClassRoom'));
const Departments = React.lazy(() => import('src/Pages/Admin/Academic/Departments'));
const Section = React.lazy(() => import('src/Pages/Admin/Academic/Section'));
const AssignSubjectTeacher = React.lazy(() => import('src/Pages/Admin/Academic/AssignSubjectTeacher'));
const AssignClassTeacher = React.lazy(() => import('src/Pages/Admin/Academic/AssignClassTeacher'));

const UserRole = React.lazy(() => import('src/Pages/Admin/HR/RolePermission'));
const UserList = React.lazy(() => import('src/Pages/Admin/HR/UserList'));
const TakeAttendance = React.lazy(() => import('src/Pages/Admin/HR/TakeAttendance'));
const Payroll = React.lazy(() => import('src/Pages/Admin/HR/Payroll'));
const PayRoll_Create = React.lazy(() => import('src/Pages/Admin/HR/PayRoll_Create'));
const RolePermisGetAll = React.lazy(() => import('src/Pages/Admin/HR/RolePermisGetAll'));
const AssignLeave = React.lazy(() => import('src/Pages/Admin/HR/AssignLeave'));
const LeaveType = React.lazy(() => import('src/Pages/Admin/HR/Leave'));
const LeaveStatus = React.lazy(() => import('src/Pages/Admin/HR/LeaveStatus'));
const Allowance = React.lazy(() => import('src/Pages/Admin/HR/Allowance&Deductions'));

const BookListManager = React.lazy(() => import('src/Pages/Admin/Library/BookListManager'));
const BookIssueReport = React.lazy(() => import('src/Pages/Admin/Library/BookIssueReport'));
const Issue_Report = React.lazy(() => import('src/Pages/Admin/Library/Issue_Report'));

const Holiday = React.lazy(() => import('src/Pages/Admin/Announcement/Holiday'));
const Notice = React.lazy(() => import('src/Pages/Admin/Announcement/Notice'));
const NoticeViewPage = React.lazy(() => import('src/Pages/Admin/Announcement/NoticeViewPage'));
const Event = React.lazy(() => import('src/Pages/Admin/Announcement/Event'));

const OnlineCourse = React.lazy(() => import('src/Pages/Admin/OnlineCourse/OnlineCourse'));

const Income = React.lazy(() => import('src/Pages/Admin/Accounting/Income'));
const Income_category = React.lazy(() => import('src/Pages/Admin/Accounting/Income_category'));
const Expense = React.lazy(() => import('src/Pages/Admin/Accounting/Expense'));
const Expense_category = React.lazy(() => import('src/Pages/Admin/Accounting/Expense_category'));


const ProfilePage_P = React.lazy(() => import('src/Pages/Student-Parent/ProfilePage_P'));
const Event_P = React.lazy(() => import('src/Pages/Student-Parent/Event'));
const Holiday_P = React.lazy(() => import('src/Pages/Student-Parent/Holiday'));
const Notice_P = React.lazy(() => import('src/Pages/Student-Parent/Notice'));
const SamplePaper_P = React.lazy(() => import('src/Pages/Student-Parent/SamplePaper'));
const Assignment_P = React.lazy(() => import('src/Pages/Student-Parent/Assignment'));
const Submissions_P = React.lazy(() => import('src/Pages/Student-Parent/Submissions'));
const Teacher_P = React.lazy(() => import('src/Pages/Student-Parent/Teacher'));
const OnlineCourse_P = React.lazy(() => import('src/Pages/Student-Parent/OnlineCourse'));
const Fees_P = React.lazy(() => import('src/Pages/Student-Parent/Fees'));
const OfflineExams_P = React.lazy(() => import('src/Pages/Student-Parent/OfflineExams'));
const Marks_P = React.lazy(() => import('src/Pages/Student-Parent/Marks'));
const Grades_P = React.lazy(() => import('src/Pages/Student-Parent/Grades'));
const OfflinePayment_P = React.lazy(() => import('src/Pages/Student-Parent/OfflinePayment'));
const ProfilePage_S = React.lazy(() => import('src/Pages/Student-Parent/ProfilePage_S'));
const ClassRoutines_S = React.lazy(() => import('src/Pages/Student-Parent/ClassRoutines'));
const Subject_S = React.lazy(() => import('src/Pages/Student-Parent/Subject'));
const Syllabus_S = React.lazy(() => import("src/Pages/Student-Parent/Syllabus"));
const DailyAttendance_S = React.lazy(() => import('src/Pages/Student-Parent/DailyAttendance'));

const DailyAttendance_T = React.lazy(() => import('src/Pages/Teacher/DailyAttendance_T'));
const ClassRoutine_T = React.lazy(() => import('src/Pages/Teacher/ClassRoutine_T'));
const Leave_T = React.lazy(() => import('src/Pages/Teacher/Leave_T'));
const Payroll_T = React.lazy(() => import('src/Pages/Teacher/Payroll_T'));
const Holiday_T = React.lazy(() => import('src/Pages/Teacher/Holiday_T'));
const Notice_T = React.lazy(() => import('src/Pages/Teacher/Notice_T'));
const Event_T = React.lazy(() => import('src/Pages/Teacher/Event_T'));
const OnlineCourse_T = React.lazy(() => import('src/Pages/Teacher/OnlineCourse_T'));
const AssignLeave_T = React.lazy(() => import('src/Pages/Teacher/AssignLeave_T'));
const OfflineExam_T = React.lazy(() => import('src/Pages/Teacher/OfflineExam_T'));
const Marks_T = React.lazy(() => import('src/Pages/Teacher/Marks_T'));
const AssignmentTea_T = React.lazy(() => import('src/Pages/Teacher/AssignmentTea_T'));
// const Assignmnt_submss_T = React.lazy(() => import('src/Pages/Teacher/Assignmnt_submss_T'));
const Assign_publish_T = React.lazy(() => import('src/Pages/Teacher/Assign_publish_T'));
const Assign_archieves_T = React.lazy(() => import('src/Pages/Teacher/Assign_archieves_T'));
const Assign_draft_T = React.lazy(() => import('src/Pages/Teacher/Assign_draft_T'));
const Sample_paper_T = React.lazy(() => import('src/Pages/Teacher/Sample_paper_T'));
const Profile_T = React.lazy(() => import('src/Pages/Teacher/Profile_T'));


export const RoleBasedRoutes = {
  SUPERADMIN: [
    { path: "/superadmin/schools/allSchools", element: <AllSchools /> },
    {
      path: "/superadmin/schools/viewSchoolDetails/:schoolId",
      element: <ViewSchoolDetails />,
    },
    { path: "/superadmin/schools/addSchool", element: <AddSchool /> },

    { path: "/superadmin/addon/allAddons", element: <Addon /> },
    { path: "/superadmin/addon/addAddon", element: <AddAddon /> },

    { path: "/superadmin/packages", element: <Packages /> },

    { path: "/superadmin/subscriptions", element: <Subscription /> },

    { path: "/superadmin/requests", element: <Request /> },

    {
      path: "/superadmin/settings/systemSettingPage",
      element: <SystemSetting />,
    },
    {
      path: "/superadmin/settings/websiteSettingPage",
      element: <WebsiteSetting />,
    },
    { path: "/superadmin/settings/manageFaqPage", element: <ManageFaq2 /> },
    {
      path: "/superadmin/settings/paymentSettingPage",
      element: <PaymentSetting />,
    },
  ],
  ADMIN: [
    { path: "/admin/admission/admissionForm", element: <AdmissionForm /> },
    { path: "/admin/admission/excelUpload", element: <ExcelUpload /> },
    {
      path: "/admin/admission/singleStudentAdmission",
      element: <SingleStudentAdmission />,
    },
    { path: "/admin/admission/allStudents", element: <AllStudents /> },

    { path: "/admin/examination/ExamTerm", element: <ExamTerm /> },
    { path: "/admin/examination/examSchedule", element: <ExamSchedule /> },
    { path: "/admin/examination/grades", element: <Grades /> },
    { path: "/admin/examination/marks", element: <Marks /> },
    { path: "/admin/examination/marksheet", element: <Marksheet /> },
    { path: "/admin/examination/promotion", element: <Promotion /> },

    { path: "/admin/transport/vehicle", element: <Vehicle /> },
    { path: "/admin/transport/route", element: <AllRoute /> },
    { path: "/admin/transport/dropPoint", element: <DropPoint /> },
    { path: "/admin/transport/vehicle/addVehicle", element: <AddVehicle /> },
    { path: "/admin/transport/route/addRoute", element: <AddRoute /> },
    {
      path: "/admin/transport/dropPoint/addDropPoint",
      element: <AddDropPoint />,
    },
    { path: "/admin/transport/assignStudent", element: <AssignStudent /> },

    { path: "/admin/samplePaper", element: <SamplePaper /> },

    { path: "/admin/assignment/allAssignments", element: <Assignment /> },
    {
      path: "/admin/assignment/openAssignment/:id",
      element: <OpenAssignment />,
    },
    { path: "/admin/assignment/allSubmissions", element: <Submissions /> },

    { path: "/admin/settings/schoolSetting", element: <SchoolSetting /> },
    { path: "/admin/settings/sessionManager", element: <SessionManager /> },
    { path: "/admin/settings/paymentSettings", element: <PaymentSettings /> },
    { path: "/admin/settings/subscription", element: <SettingsSubscription /> },
    { path: "/admin/settings/myAccount", element: <MyAccount /> },

    { path: "/admin/feeCollection/feesType", element: <FeesType /> },
    { path: "/admin/feeCollection/feesDiscount", element: <FeesDiscount /> },
    { path: "/admin/feeCollection/collectFees", element: <FeeCollection /> },
    { path: "/admin/feeCollection/manageInvoice", element: <ManageInvoice /> },
    { path: "/admin/feeCollection/dueInvoice", element: <DueInvoice /> },
    { path: "/admin/feeCollection/receipt", element: <Reciept /> },

    { path: "/admin/inventory/itemsupplier", element: <ManageSupplier /> },
    { path: "/admin/inventory/warehouse", element: <ManageWarehouse /> },
    { path: "/admin/inventory/itemCategory", element: <ItemCategory /> },
    { path: "/admin/inventory/addItem", element: <ManageProducts /> },
    { path: "/admin/inventory/purchase", element: <ManagePurchase /> },
    { path: "/admin/inventory/addItemStock", element: <ItemStock /> },
    { path: "/admin/inventory/sale", element: <ManageSale /> },
    { path: "/admin/inventory/addSale", element: <AddSale /> },
    { path: "/admin/inventory/issueItem", element: <ManageIssue /> },

    { path: '/admin/users/teacher/:roleId', element: <Teacher /> },
    { path: '/admin/users/accountant/:roleId', element: <Accountant /> },
    { path: '/admin/users/librarian/:roleId', element: <Librarian /> },
    { path: '/admin/users/otherStaff/:roleId', element: <OtherStaff /> },
    { path: '/admin/users/drivers/:roleId', element: <Driver /> },
    { path: '/admin/users/driver/:roleId', element: <AddDriver /> },

    // Add flow
    {
      path: '/admin/users/:roleName/:roleId/add/mainuserform',
      element: <MainUserForm />,
      children: [
        { path: 'userbasicinformation', element: <User_basic_infomation /> },
        { path: ':userId/usercontact', element: <User_Contact /> },
        { path: ':userId/userperinfo', element: <User_Per_info /> },
        { path: ':userId/userdocuments', element: <User_Documents /> },
      ]
    },

    // Update flow
    {
      path: '/admin/users/:roleName/:roleId/update/mainuserform/:userId',
      element: <MainUserForm />,
      children: [
        { path: 'userbasicinformation', element: <User_basic_infomation /> },
        { path: 'usercontact', element: <User_Contact /> },
        { path: 'userperinfo', element: <User_Per_info /> },
        { path: 'userdocuments', element: <User_Documents /> },
      ]
    },

    { path: "/admin/holiday", element: <Holiday /> },

    { path: "/admin/notice", element: <Notice /> },
    { path: "/admin/notice/view", element: <NoticeViewPage /> },

    { path: "/admin/event", element: <Event /> },

    { path: "/admin/onlinecourse", element: <OnlineCourse /> },

    { path: "/admin/library/booklistmanager", element: <BookListManager /> },
    { path: "/admin/library/librarymember", element: <BookIssueReport /> },
    { path: "/admin/library/issue&return", element: <Issue_Report /> },

    { path: "/admin/academic/dailyattendance", element: <DailyAttendance /> },
    { path: "/admin/academic/dailyattendance", element: <DailyAttendance /> },
    { path: "/admin/academic/classlist", element: <ClassList /> },
    { path: "/admin/academic/classroutine", element: <ClassRoutine /> },
    { path: "/admin/academic/subject", element: <Subject /> },
    { path: "/admin/academic/syllabus", element: <Syllabus /> },
    { path: "/admin/academic/Classroom", element: <ClassRoom /> },
    { path: "/admin/academic/Department", element: <Departments /> },
    { path: "/admin/academic/section", element: <Section /> },
    {
      path: "/admin/academic/assignsubjectteacher",
      element: <AssignSubjectTeacher />,
    },
    {
      path: "/admin/academic/assignclassteacher",
      element: <AssignClassTeacher />,
    },


    { path: "/admin/hr/userrole", element: <UserRole /> },
    { path: "/admin/hr/userlist", element: <UserList /> },
    { path: "/admin/hr/takeattendance", element: <TakeAttendance /> },
    { path: "/admin/hr/leaveType", element: <LeaveType /> },
    { path: "/admin/hr/assignleave", element: <AssignLeave /> },
    { path: "/admin/hr/leavestatus", element: <LeaveStatus /> },
    { path: "/admin/hr/payroll", element: <Payroll /> },
    { path: "/admin/hr/payrollcreate", element: <PayRoll_Create /> },
    { path: "/admin/hr/rolepermissiongetall", element: <RolePermisGetAll /> },
    { path: "/admin/hr/allowance&deduction", element: <Allowance /> },

    { path: "/admin/accounting/income", element: <Income /> },
    { path: "/admin/accounting/incomecategory", element: <Income_category /> },
    { path: "/admin/accounting/expense", element: <Expense /> },
    {
      path: "/admin/accounting/expensecategory",
      element: <Expense_category />,
    },

    // { path: '/admin/users/contexttest', element: <ContextTest /> },
    // { path: '/admin/users/context/routing', element: <UserRouting /> },
  ],
  PARENT: [
    { path: "/parent/grades", element: <Grades_P /> },
    { path: "/parent/marks", element: <Marks_P /> },
    { path: "/parent/examSchedule", element: <OfflineExams_P /> },
    { path: "/parent/fees", element: <Fees_P /> },
    { path: "/parent/offlinePaymentForm", element: <OfflinePayment_P /> },
    { path: "/parent/onlineCourse", element: <OnlineCourse_P /> },
    { path: "/parent/teacher", element: <Teacher_P /> },
    { path: "/parent/assignments", element: <Assignment_P /> },
    { path: "/parent/samplePaper", element: <SamplePaper_P /> },
    { path: "/parent/holiday", element: <Holiday_P /> },
    { path: "/parent/notice", element: <Notice_P /> },
    { path: "/parent/event", element: <Event_P /> },
    { path: "/parent/profile", element: <ProfilePage_P /> },
  ],
  STUDENT: [
    { path: "/student/syllabus", element: <Syllabus_S /> },
    { path: "/student/subject", element: <Subject_S /> },
    { path: "/student/classRoutines", element: <ClassRoutines_S /> },
    { path: "/student/dailyAttendance", element: <DailyAttendance_S /> },
    { path: "/student/grades", element: <Grades_P /> },
    { path: "/student/marks", element: <Marks_P /> },
    { path: "/student/examSchedule", element: <OfflineExams_P /> },
    { path: "/student/offlinePaymentForm/:id", element: <OfflinePayment_P /> },
    { path: "/student/onlineCourse", element: <OnlineCourse_P /> },
    { path: "/student/teacher", element: <Teacher_P /> },
    { path: "/student/assignments", element: <Assignment_P /> },
    { path: "/student/submissions", element: <Submissions_P /> },
    { path: "/student/samplePaper", element: <SamplePaper_P /> },
    { path: "/student/holiday", element: <Holiday_P /> },
    { path: "/student/notice", element: <Notice_P /> },
    { path: "/student/event", element: <Event_P /> },
    { path: "/student/profile", element: <ProfilePage_S /> },
  ],
  USER: [
    { path: "/teacher/dailyattendance", element: <DailyAttendance_T /> },
    { path: "/teacher/attendanceReport", element: <AttendanceReportTea /> },
    { path: "/teacher/classroutine", element: <ClassRoutine_T /> },
    { path: "/teacher/leave", element: <Leave_T /> },
    { path: "/teacher/payroll", element: <Payroll_T /> },
    { path: "/teacher/holiday", element: <Holiday_T /> },
    { path: "/teacher/notice", element: <Notice_T /> },
    { path: "/teacher/notice/view", element: <NoticeViewPage /> },
    { path: "/teacher/event", element: <Event_T /> },
    { path: "/teacher/onlinecourse", element: <OnlineCourse_T /> },
    { path: "/teacher/assignleave", element: <AssignLeave_T /> },
    { path: "/teacher/examSchedule", element: <OfflineExam_T /> },
    { path: "/teacher/marks", element: <Marks_T /> },
    { path: "/teacher/assignmenttea", element: <AssignmentTea_T /> },
    { path: "/teacher/submissions", element: <Assignmnt_submss /> },
    { path: "/teacher/assignpublish", element: <Assign_publish_T /> },
    { path: "/teacher/assignarchieves", element: <Assign_archieves_T /> },
    { path: "/teacher/assigndraft", element: <Assign_draft_T /> },
    { path: "/teacher/samplepaper", element: <Sample_paper_T /> },
    { path: "/teacher/profile", element: <Profile_T /> },
    { path: '/teacher/assigndetails/:id', element: <Assignment_details /> },
  ],
};
