import{u as A,r as d,gI as R,j as e,D as F,I as c,L as o,c as S}from"./index-DHII64NA.js";import{C as O}from"./Calender-DytgPfN-.js";import{B as E}from"./BarChart-CHHWraQg.js";import"./Calendar-CVCK5PIO.js";import"./index-DQpL8U9A.js";const I=A.div`

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


`,D=()=>{var m;const b=sessionStorage.getItem("token"),[u,t]=d.useState(!1),[a,w]=d.useState(),[y,T]=d.useState([]),[r,C]=d.useState(new Date().getMonth()+1),[l,k]=d.useState(new Date().getFullYear()),x=s=>C(s),h=s=>k(s);d.useEffect(()=>{B()},[b]);const B=async()=>{var n,j,p,N,g,v,f;try{t(!0);var s=await R("","","","","");(s==null?void 0:s.status)===200?((n=s==null?void 0:s.data)==null?void 0:n.status)==="success"&&(w((j=s==null?void 0:s.data)==null?void 0:j.data),T((g=(N=(p=s==null?void 0:s.data)==null?void 0:p.data)==null?void 0:N.attendance)==null?void 0:g.attendance),t(!1)):t(!1)}catch(i){t(!1),console.error("Error fetching student data:",i),((f=(v=i==null?void 0:i.response)==null?void 0:v.data)==null?void 0:f.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}};return e.jsxs(I,{className:"container-fluid px-4",children:[u&&e.jsx(F,{}),e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-md-6 col-12 ps-3 pe-3 pt-3 ",children:e.jsx("div",{className:"row cards borderradius8 h-100",children:e.jsxs("div",{className:"col-12",children:[e.jsx("div",{className:"row",children:e.jsx("p",{className:"font14 p-3 bgDarkGreen bordeRadiusTop text-white",children:"Fees Report Details"})}),e.jsxs("div",{className:"row p-3",children:[e.jsx("div",{className:"row pb-3 justify-content-center",children:e.jsx(E,{graphKey:(m=a==null?void 0:a.attendance)==null?void 0:m.attendance})}),e.jsx("div",{className:"row pb-3",children:e.jsxs("div",{className:"chartCard",children:[e.jsxs("div",{className:"d-flex p-3",children:[e.jsx("div",{className:"flex-grow-1",children:e.jsxs("p",{children:[e.jsx(c,{className:"me-2",icon:"ic:round-square",width:"1.2em",height:"1.2em",style:{color:"#01CCBB"}}),e.jsx("span",{className:"font14",children:"Total Fee"})]})}),e.jsx("div",{className:"align-self-center"})]}),e.jsxs("div",{className:"d-flex p-3",children:[e.jsx("div",{className:"flex-grow-1",children:e.jsxs("p",{children:[e.jsx(c,{className:"me-2",icon:"ic:round-square",width:"1.2em",height:"1.2em",style:{color:"#E95B6D"}}),e.jsx("span",{className:"font14",children:"Paid Fee"})]})}),e.jsx("div",{className:"align-self-center"})]}),e.jsxs("div",{className:"d-flex p-3",children:[e.jsx("div",{className:"flex-grow-1",children:e.jsxs("p",{children:[e.jsx(c,{className:"me-2",icon:"ic:round-square",width:"1.2em",height:"1.2em",style:{color:"#FEBC00"}}),e.jsx("span",{className:"font14",children:"Balance Fee"})]})}),e.jsx("div",{className:"align-self-center"})]})]})}),e.jsxs("div",{className:"row pb-3",children:[e.jsx("p",{className:"font14 p-0",children:"Last Paid Activity"}),e.jsx("hr",{className:"mt-1 mb-2"}),e.jsxs("div",{className:"d-flex justify-content-between p-0",children:[e.jsx("p",{className:"font14 greyText",children:"October Month Fese"}),e.jsx("p",{className:"font14 greyText",children:"16 October 2023"}),e.jsx("p",{className:"font14 greenText fw-bolder",children:"10,250"})]})]})]})]})})}),e.jsx("div",{className:"col-md-6 col-12 ps-3 pe-3 pt-3",children:e.jsx("div",{className:"row cards borderradius8 h-100",children:e.jsxs("div",{className:"col-12",children:[e.jsx("div",{className:"row bgDarkGreen bordeRadiusTop text-white p-1 py-2",children:e.jsxs("div",{className:"d-flex p-0 align-items-center justify-content-between",children:[e.jsx("span",{className:"font14 ms-3",children:"Attendance"}),e.jsx("button",{className:"btn",onClick:()=>x(r===1?12:r-1)||h(r===1?l-1:l),children:e.jsx(c,{icon:"lsicon:double-arrow-left-filled",width:"16",height:"16",style:{color:"#fff"}})}),e.jsxs("span",{className:"mx-2",children:[new Date(l,r-1).toLocaleString("default",{month:"long"})," ",l]}),e.jsx("button",{className:"btn",onClick:()=>x(r===12?1:r+1)||h(r===12?l+1:l),children:e.jsx(c,{icon:"lsicon:double-arrow-right-filled",width:"16",height:"16",style:{color:"#fff"}})}),e.jsx("span",{})]})}),e.jsx("div",{className:"row mt-3",children:e.jsx(O,{className:"calenderp0",DailyAttendanceData:y,month:r,year:l,monthUpdate:x,yearUpdate:h,smallBox:!0})})]})})})]}),e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-md-6 col-12 ps-3 pe-3 pt-3",children:e.jsx("div",{className:"row cards borderradius8 h-100",children:e.jsxs("div",{className:"col-12",children:[e.jsx("div",{className:"row",children:e.jsxs("div",{className:"d-flex p-3 bgDarkGreen bordeRadiusTop text-white",children:[e.jsx("div",{className:"flex-grow-1 align-self-center",children:e.jsx("p",{className:"font14",children:"Assignment Details"})}),e.jsx(o,{className:"p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12",type:"button",to:"/parent/assignments",children:"View All"})]})}),e.jsx("div",{className:"row p-2",children:(a==null?void 0:a.assignments.length)>0?a==null?void 0:a.assignments.slice(0,3).map(s=>e.jsx("div",{className:"col-12 p-1",children:e.jsxs("div",{className:"timeTableCard p-2",children:[e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-4 align-self-center",children:e.jsx("p",{className:"greenText font16",children:s.title})}),e.jsx("div",{className:"col-4 align-self-center",children:e.jsx("p",{className:"font14",children:s.subjectName})}),e.jsx("div",{className:"col-4 align-self-center",children:e.jsx("p",{className:"font12"})})]}),e.jsxs("div",{className:"row pt-1",children:[e.jsx("div",{className:"col-4 align-self-center",children:e.jsxs("p",{className:"font12 greyText",children:["Class - ",s.sectionName]})}),e.jsx("div",{className:"col-4 align-self-center",children:e.jsxs("p",{className:"font12 greyText",children:["Start Date - ",s.startDate]})}),e.jsx("div",{className:"col-4 align-self-center",children:e.jsxs("p",{className:"font12 greyText",children:["End Date - ",s.endDate]})})]})]})},s.id)):e.jsx("p",{className:"text-danger font14",children:" No Data Found !!!"})})]})})}),e.jsx("div",{className:"col-md-6 col-12 ps-3 pe-3 pt-3",children:e.jsx("div",{className:"row cards borderradius8 h-100",children:e.jsxs("div",{className:"col-12",children:[e.jsx("div",{className:"row",children:e.jsxs("div",{className:"d-flex p-3 bgDarkGreen bordeRadiusTop text-white",children:[e.jsx("div",{className:"flex-grow-1 align-self-center",children:e.jsx("p",{className:"font14",children:"Notice Board"})}),e.jsx(o,{className:"p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12",type:"button",to:"/parent/notice",children:"View All"})]})}),e.jsx("div",{className:"row p-2 py-3",children:(a==null?void 0:a.notices.length)>0?a==null?void 0:a.notices.slice(0,2).map((s,n)=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"pt-2",children:[e.jsx("h2",{className:"p-1 ps-2 pe-2 text-white bgOrange rounded-4 text-decoration-none",children:s==null?void 0:s.date}),e.jsx("h2",{className:"border-bottom border-1 pt-3 pb-3 text-grey",children:s==null?void 0:s.message}),e.jsxs("h5",{className:"greyText pt-3",children:[s==null?void 0:s.author," | ",(s==null?void 0:s.daysAgo)===0?"Today":`${s==null?void 0:s.daysAgo} days ago`]})]},n)})):e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("span",{children:"No Notice Data Yet !!!"})})})]})})})]}),e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-md-6 col-12 ps-3 pe-3 pt-3",children:e.jsx("div",{className:"row cards borderradius8 h-100",children:e.jsxs("div",{className:"col-12",children:[e.jsx("div",{className:"row",children:e.jsxs("div",{className:"d-flex p-3 bgDarkGreen bordeRadiusTop text-white",children:[e.jsx("div",{className:"flex-grow-1 align-self-center",children:e.jsx("p",{className:"font14",children:"Upcoming Events"})}),e.jsx(o,{className:"p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12",to:"/parent/event",children:"View All"})]})}),e.jsx("div",{className:"row p-2",children:(a==null?void 0:a.notices.length)>0?a==null?void 0:a.notices.slice(0,4).map(s=>e.jsx("div",{className:"col-12 p-1",children:e.jsx("div",{className:"eventCards",children:e.jsx("div",{className:"borderLeftOrange p-2",children:e.jsxs("div",{className:"d-flex p-1",children:[e.jsx("div",{className:"flex-fill",children:e.jsx("p",{className:"font14",children:s.eventName})}),e.jsx("div",{className:"flex-shrink",children:e.jsx("p",{className:"font14 text-end greyText",children:s.startDate})})]})})})},s.eventId)):e.jsx("p",{children:"No Data Found !!!"})})]})})}),e.jsx("div",{className:"col-md-6 col-12 ps-3 pe-3 pt-3",children:e.jsx("div",{className:"row cards borderradius8 h-100",children:e.jsxs("div",{className:"col-12",children:[e.jsx("div",{className:"row",children:e.jsxs("div",{className:"d-flex p-3 bgDarkGreen bordeRadiusTop text-white",children:[e.jsx("div",{className:"flex-grow-1 align-self-center",children:e.jsx("p",{className:"font14",children:"Upcoming Holiday"})}),e.jsx(o,{className:"p-1 ps-2 pe-2 rounded-2 bg-white text-black text-decoration-none font12",type:"button",to:"/parent/holiday",children:"View All"})]})}),e.jsx("div",{className:"row p-2",children:(a==null?void 0:a.holidays.length)>0?a==null?void 0:a.holidays.slice(0,6).map(s=>e.jsx("div",{className:"col-4 p-2",children:e.jsxs("div",{className:"holidayCard p-4",children:[e.jsx("p",{className:"font14 text-center",children:s.title}),e.jsx("p",{className:"greyText font14 text-center",children:s.date})]})},s.holidayId)):e.jsx("p",{children:"No Data Found !!!"})})]})})})]}),e.jsx(S,{})]})};export{D as default};
