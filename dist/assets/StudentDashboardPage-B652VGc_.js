import{u as A,r as t,gI as S,j as e,D as I,L as d,I as u,c as E}from"./index-DHII64NA.js";import{C as G}from"./Calender-DytgPfN-.js";import"./BarChart-CHHWraQg.js";import"./Calendar-CVCK5PIO.js";import"./index-DQpL8U9A.js";const L=A.div`

.bgOrange{
  width: fit-content;
  background-color: var(--activeOrangeBorder);
}
.cards{
  border : 1px solid var(--cardsBorder);
  background-color: #fff;
  border-radius: var(--borderRadius10px);
}

.borderOrange{
  border: 1px solid var(--activeOrangeBorder) !important;
}

.borderLeftOrange{
  border-left: 4px solid var(--orangeTextColor) !important;
}

.timeTableCard{
  border : 1px solid var(--timeTableCardBorder);
  background-color: var(--timeTableCardBg);
  border-radius: var(--borderRadius5px);
}

.chartCard{
  border : 1px solid var(--timeTableCardBorder);
  background-color: var(--timeTableCardBg);
  border-radius: var(--borderRadius5px);
}

.holidayCard{
  border : 1px solid var(--timeTableCardBorder);
  background-image: url(/images/holidayBg.svg);
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: var(--borderRadius5px);
}

.eventCards{
  border : 1px solid var(--timeTableCardBorder);
  background-color: var(--timeTableCardBg);
  border-radius: 0px !important;
}

.greyText{
  color: var(--greyTextColor);
}

.greenText{
  color: var(--greenTextColor);
}

.carousel-indicators [data-bs-target] {
  background-color: #D9D9D9;
  border-radius: 50%;
  width: 10px;
  height: 10px;
}

.carousel-indicators .active {
  background-color: #01CCBB;
}


`,z=()=>{const f=sessionStorage.getItem("token"),[w,c]=t.useState(!1),[s,y]=t.useState(),[O,T]=t.useState([]),[k,C]=t.useState([]),[r,D]=t.useState(new Date().getMonth()+1),[l,B]=t.useState(new Date().getFullYear()),o=a=>D(a),n=a=>B(a);t.useEffect(()=>{R()},[f]);const R=async()=>{var x,m,h,p,g,j,N,b,v;try{c(!0);var a=await S("","","","","");(a==null?void 0:a.status)===200?((x=a==null?void 0:a.data)==null?void 0:x.status)==="success"&&(y((m=a==null?void 0:a.data)==null?void 0:m.data),T((p=(h=a==null?void 0:a.data)==null?void 0:h.data)==null?void 0:p.timetable),C((N=(j=(g=a==null?void 0:a.data)==null?void 0:g.data)==null?void 0:j.attendance)==null?void 0:N.attendance),c(!1)):c(!1)}catch(i){c(!1),console.error("Error fetching student data:",i),((v=(b=i==null?void 0:i.response)==null?void 0:b.data)==null?void 0:v.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}};return e.jsxs(L,{className:"container-fluid px-4",children:[w&&e.jsx(I,{}),e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-lg-6 col-12 ps-3 pe-3 pt-3",children:e.jsx("div",{className:"row cards borderradius8 h-100",children:e.jsxs("div",{className:"col-12",children:[e.jsx("div",{className:"row",children:e.jsxs("div",{className:"d-flex p-3 bgDarkGreen bordeRadiusTop text-white",children:[e.jsx("div",{className:"flex-grow-1 align-self-center",children:e.jsx("p",{className:"font14",children:"TimeTable Details"})}),e.jsx(d,{className:"p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12",type:"button",to:"/student/classRoutines",children:"View All"})]})}),e.jsx("div",{className:"row"})]})})}),e.jsx("div",{className:"col-md-6 col-12 ps-3 pe-3 pt-3",children:e.jsx("div",{className:"row cards borderradius8 h-100",children:e.jsxs("div",{className:"col-12",children:[e.jsx("div",{className:"row bgDarkGreen bordeRadiusTop text-white p-1 py-2",children:e.jsxs("div",{className:"d-flex p-0 align-items-center justify-content-between",children:[e.jsx("span",{className:"font14 ms-3",children:"Attendance"}),e.jsx("button",{className:"btn",onClick:()=>o(r===1?12:r-1)||n(r===1?l-1:l),children:e.jsx(u,{icon:"lsicon:double-arrow-left-filled",width:"16",height:"16",style:{color:"#fff"}})}),e.jsxs("span",{className:"mx-2",children:[new Date(l,r-1).toLocaleString("default",{month:"long"})," ",l]}),e.jsx("button",{className:"btn",onClick:()=>o(r===12?1:r+1)||n(r===12?l+1:l),children:e.jsx(u,{icon:"lsicon:double-arrow-right-filled",width:"16",height:"16",style:{color:"#fff"}})}),e.jsx("span",{})]})}),e.jsx("div",{className:"row mt-3",children:e.jsx(G,{className:"calenderp0",DailyAttendanceData:k,month:r,year:l,monthUpdate:o,yearUpdate:n,smallBox:!0})})]})})})]}),e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-md-6 col-12 ps-3 pe-3 pt-3",children:e.jsx("div",{className:"row cards borderradius8 h-100",children:e.jsxs("div",{className:"col-12",children:[e.jsx("div",{className:"row",children:e.jsxs("div",{className:"d-flex p-3 bgDarkGreen bordeRadiusTop text-white",children:[e.jsx("div",{className:"flex-grow-1 align-self-center",children:e.jsx("p",{className:"font14",children:"Assignment Details"})}),e.jsx(d,{className:"p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12",type:"button",to:"/parent/assignments",children:"View All"})]})}),e.jsx("div",{className:"row p-2",children:(s==null?void 0:s.assignments.length)>0?s==null?void 0:s.assignments.slice(0,3).map(a=>e.jsx("div",{className:"col-12 p-1",children:e.jsxs("div",{className:"timeTableCard p-2",children:[e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-4 align-self-center",children:e.jsx("p",{className:"greenText font16",children:a.title})}),e.jsx("div",{className:"col-4 align-self-center",children:e.jsx("p",{className:"font14",children:a.subjectName})}),e.jsx("div",{className:"col-4 align-self-center",children:e.jsx("p",{className:"font12"})})]}),e.jsxs("div",{className:"row pt-1",children:[e.jsx("div",{className:"col-4 align-self-center",children:e.jsxs("p",{className:"font12 greyText",children:["Class - ",a.sectionName]})}),e.jsx("div",{className:"col-4 align-self-center",children:e.jsxs("p",{className:"font12 greyText",children:["Start Date - ",a.startDate]})}),e.jsx("div",{className:"col-4 align-self-center",children:e.jsxs("p",{className:"font12 greyText",children:["End Date - ",a.endDate]})})]})]})},a.id)):e.jsx("p",{className:"text-danger font14",children:" No Data Found !!!"})})]})})}),e.jsx("div",{className:"col-md-6 col-12 ps-3 pe-3 pt-3",children:e.jsx("div",{className:"row cards borderradius8 h-100",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"row",children:e.jsxs("div",{className:"d-flex p-3 bgDarkGreen bordeRadiusTop text-white",children:[e.jsx("div",{className:"flex-grow-1 align-self-center",children:e.jsx("p",{className:"font14",children:"Notice Board"})}),e.jsx(d,{className:"p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12",type:"button",to:"/parent/notice",children:"View All"})]})})})})})]}),e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-md-6 col-12 ps-3 pe-3 pt-3",children:e.jsx("div",{className:"row cards borderradius8 h-100",children:e.jsx("div",{className:"col-12",children:e.jsx("div",{className:"row",children:e.jsxs("div",{className:"d-flex p-3 bgDarkGreen bordeRadiusTop text-white",children:[e.jsx("div",{className:"flex-grow-1 align-self-center",children:e.jsx("p",{className:"font14",children:"Upcoming Events"})}),e.jsx(d,{className:"p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12",to:"/parent/event",children:"View All"})]})})})})}),e.jsx("div",{className:"col-md-6 col-12 ps-3 pe-3 pt-3",children:e.jsx("div",{className:"row cards borderradius8 h-100",children:e.jsxs("div",{className:"col-12",children:[e.jsx("div",{className:"row",children:e.jsxs("div",{className:"d-flex p-3 bgDarkGreen bordeRadiusTop text-white",children:[e.jsx("div",{className:"flex-grow-1 align-self-center",children:e.jsx("p",{className:"font14",children:"Upcoming Holiday"})}),e.jsx(d,{className:"p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12",type:"button",to:"/parent/holiday",children:"View All"})]})}),e.jsx("div",{className:"row p-2",children:(s==null?void 0:s.holidays.length)>0?s==null?void 0:s.holidays.slice(0,6).map(a=>e.jsx("div",{className:"col-4 p-2",children:e.jsxs("div",{className:"holidayCard p-4",children:[e.jsx("p",{className:"font14 text-center",children:a.title}),e.jsx("p",{className:"greyText font14 text-center",children:a.date})]})},a.holidayId)):e.jsx("p",{children:"No Data Found !!!"})})]})})})]}),e.jsx(E,{})]})};export{z as default};
