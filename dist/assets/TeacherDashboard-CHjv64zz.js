import{j as l,u as ua,r as d,a as ja,gJ as Na,_ as x,gK as fa,gL as ba,gM as ya,fX as wa,gN as Ta,H as Aa,L as m,c as Sa}from"./index-DHII64NA.js";import{C as Ca,B as ka,a as Da,L as Ba,p as La,b as Ea,c as Ha,d as Fa,A as Oa,P as Ia,i as Ra,D as Ga}from"./index-DQpL8U9A.js";Ca.register(ka,Da,Ba,La,Ea,Ha,Fa,Oa,Ia,Ra);const pa=({leaveData:n})=>{const g={plugins:{legend:{labels:{font:{size:14},boxWidth:8,padding:10}}}};return l.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"10px",justifyContent:"center"},children:Array.isArray(n)&&(n==null?void 0:n.map((t,v)=>{const u={labels:["Available","Booked"],datasets:[{label:t.leaveType,data:[t.leaveCount,t.bookedCount],backgroundColor:["#FF914C","red"],hoverOffset:2}]};return l.jsx("div",{style:{width:"100px",textAlign:"center"},children:l.jsx(Ga,{data:u,options:g})},v)}))})},Pa=ua.div`

  .cards{
    border : 1px solid var(--cardsBorder);
    background-color: #fff;
    border-radius: var(--borderRadius10px);
  }

  .borderOrange{
    border: 1px solid var(--activeOrangeBorder) !important;
  }

  .continueLesson{
    background-color: var(--greenTextColor);
    border-radius: var(--borderRadius17px);
  }

  .borderLeftOrange{
    border-left: 4px solid var(--orangeTextColor) !important;
  }

  .timeTableCard{
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
  .my-btn12{
  border: 1px solid #aaa;
  padding: 5px 7px;
}
.progress-bar{
  width: 100% !important;
  height: 5px !important;
  border-radius: 0px !important;
  background-color: #FF914C;
}
.my-progress-bar {
    /* width: 10% ; */
    height: 6px!important ;
    border-radius: 10px !important;
    background-color: #FF914D;
    margin-top: -3px ;
}
.my-graph-length{
height: 10px;
border:1px solid #aaa;
width: "100%" !important;
border-radius: 10px !important;

}

`,Va=()=>{const n=localStorage.getItem("token"),[g,t]=d.useState(!1);ja();const[v,u]=d.useState([]),[R,G]=d.useState([]),[j,p]=d.useState([]);d.useState([]);const[P,M]=d.useState([]),[N,$]=d.useState([]),[Ma,z]=d.useState([]),[K,_]=d.useState([]);console.log("leave data in dashboard page",K);const[$a,V]=d.useState(),[b,U]=d.useState(),[y,W]=d.useState(),[q,J]=d.useState(),[X,Q]=d.useState(),[Y,Z]=d.useState(),[aa,la]=d.useState(),[w,ea]=d.useState(),[T,ta]=d.useState(),[A,ca]=d.useState(),[S,da]=d.useState(),[f,sa]=d.useState(""),ia=new Date().toLocaleDateString("en-US",{weekday:"long"});d.useEffect(()=>{oa(),na(),ha(),xa(),ma(),ga()},[n,f]);const ra=a=>{sa(a.toLowerCase())},oa=async()=>{var a,s,c,i;try{t(!0);let e=await Na(f);(e==null?void 0:e.status)===200?((a=e==null?void 0:e.data)==null?void 0:a.status)==="success"?(t(!1),p((s=e==null?void 0:e.data)==null?void 0:s.timeTable)):(t(!1),x.error((c=e==null?void 0:e.data)==null?void 0:c.message)):(t(!1),console.log((i=e==null?void 0:e.data)==null?void 0:i.msg))}catch(e){console.log("Error Facing during Get All ClassRoutines API - ",e)}},na=async()=>{var s,c,i,e;try{t(!0);var a=await fa();console.log(a,"Assignment responseeee-------------"),(a==null?void 0:a.status)===200?((s=a==null?void 0:a.data)==null?void 0:s.status)==="success"?(t(!1),u((c=a==null?void 0:a.data)==null?void 0:c.assignment)):(t(!1),x.error((i=a==null?void 0:a.data)==null?void 0:i.message)):(t(!1),console.log((e=a==null?void 0:a.data)==null?void 0:e.msg))}catch(r){console.log("Error Facing during Get All Assignment API - ",r)}},ha=async()=>{var s,c,i,e;try{t(!0);var a=await ba("","","");(a==null?void 0:a.status)===200?((s=a==null?void 0:a.data)==null?void 0:s.status)==="success"?(t(!1),G((c=a==null?void 0:a.data)==null?void 0:c.holidays)):(t(!1),x.error((i=a==null?void 0:a.data)==null?void 0:i.message)):(t(!1),console.log((e=a==null?void 0:a.data)==null?void 0:e.msg))}catch(r){console.log("Error Facing during Get All Holiday API - ",r)}},xa=async()=>{var s,c,i,e;try{t(!0);var a=await ya("","","");console.log(a,"Events"),(a==null?void 0:a.status)===200?((s=a==null?void 0:a.data)==null?void 0:s.status)==="success"?(t(!1),M((c=a==null?void 0:a.data)==null?void 0:c.events)):(t(!1),x.error((i=a==null?void 0:a.data)==null?void 0:i.message)):(t(!1),console.log((e=a==null?void 0:a.data)==null?void 0:e.msg))}catch(r){console.log("Error Facing during Get All Event API - ",r)}},ma=async()=>{var s,c,i,e,r,o;try{t(!0);var a=await wa();(a==null?void 0:a.status)===200?((s=a==null?void 0:a.data)==null?void 0:s.status)==="success"?(t(!1),$((c=a==null?void 0:a.data)==null?void 0:c.leave),z((i=a==null?void 0:a.data)==null?void 0:i.leave),_((e=a==null?void 0:a.data)==null?void 0:e.leave)):(t(!1),x.error((r=a==null?void 0:a.data)==null?void 0:r.message)):(t(!1),console.log((o=a==null?void 0:a.data)==null?void 0:o.msg))}catch(h){console.log("Error Facing during Get All Event API - ",h)}},ga=async()=>{var s,c,i,e,r,o,h,C,k,D,B,L,E,H,F,O,I;try{t(!0);var a=await Ta();(a==null?void 0:a.status)===200?((s=a==null?void 0:a.data)==null?void 0:s.status)==="success"?(t(!1),V((c=a==null?void 0:a.data)==null?void 0:c.leave),U((i=a==null?void 0:a.data)==null?void 0:i.ByHour),W((e=a==null?void 0:a.data)==null?void 0:e.ByMin),J((r=a==null?void 0:a.data)==null?void 0:r.attendanceDate),Q((o=a==null?void 0:a.data)==null?void 0:o.state),Z((h=a==null?void 0:a.data)==null?void 0:h.checkInTime),la((C=a==null?void 0:a.data)==null?void 0:C.checkOutTime),ea((D=(k=a==null?void 0:a.data)==null?void 0:k.workHour)==null?void 0:D.hours),ta((L=(B=a==null?void 0:a.data)==null?void 0:B.workHour)==null?void 0:L.minutes),ca((H=(E=a==null?void 0:a.data)==null?void 0:E.workHour)==null?void 0:H.seconds),da((F=a==null?void 0:a.data)==null?void 0:F.percent)):(t(!1),x.error((O=a==null?void 0:a.data)==null?void 0:O.message)):(t(!1),console.log((I=a==null?void 0:a.data)==null?void 0:I.msg))}catch(va){console.log("Error Facing during Get All Event API - ",va)}};return l.jsxs(Pa,{className:"container-fluid pb-4",children:[g&&l.jsx(Aa,{}),l.jsxs("div",{className:"row mx-2",children:[l.jsx("div",{className:"col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3",children:l.jsx("div",{className:"row cards p-2 h-100",children:l.jsxs("div",{className:"col-12",children:[l.jsx("div",{className:"row",children:l.jsxs("div",{className:"d-flex p-1",children:[l.jsx("div",{className:"flex-grow-1 align-self-center",children:l.jsx("p",{className:"font14",children:"Timetable Details"})}),l.jsx("div",{children:l.jsxs("select",{className:"form-select rounded-2 borderOrange text-black font12",value:f,"aria-label":"Default select example",onChange:a=>ra(a.target.value),children:[l.jsx("option",{value:ia,children:"Today"}),l.jsx("option",{value:"",children:"Week"})]})})]})}),l.jsx("div",{className:"row heading-16",children:j==null?void 0:j.map(a=>{var s;return l.jsx("div",{className:"row",children:(s=a==null?void 0:a.periodTable)==null?void 0:s.map(c=>l.jsx("div",{className:"col-6 p-1",children:l.jsxs("div",{className:"timeTableCard p-2",children:[l.jsx("p",{className:"greenText font18",children:c.subject}),l.jsxs("div",{className:"d-flex pt-2",children:[l.jsx("div",{className:"flex-grow-1 align-self-center",children:l.jsxs("p",{className:"font12",children:[c.startHourTime,"-",c.endHourTime]})}),l.jsx("div",{children:l.jsxs("p",{className:"font12 greyText",children:["Class - ",c.classNo," ",c.section]})})]})]})},c.classRouteId))},a.day)})})]})})}),l.jsx("div",{className:"col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3",children:l.jsx("div",{className:"row cards p-2 h-100",children:l.jsxs("div",{className:"col-12",children:[l.jsxs("div",{className:" d-flex justify-content-between",children:[l.jsx("div",{className:"pt-2",children:l.jsx("p",{children:"Attendance"})}),l.jsx("div",{className:"",children:l.jsxs("div",{className:"d-flex g-1 for-media-query",children:[l.jsx("div",{className:"pe-2"}),l.jsx("div",{className:"pe-2",children:l.jsx(m,{className:"btn my-btn12 heading-12  mt-1",children:"Today"})})]})})]}),l.jsx("hr",{}),l.jsxs("div",{className:"row",children:[l.jsxs("div",{className:"text-center mt-4",children:[l.jsxs("h4",{className:"mb-0",children:[`${w||0} : ${T||0} : ${A||0}`," Hrs"]}),l.jsx("p",{className:"pt-0",children:q}),l.jsxs("p",{className:"heading-14 pb-3",style:{color:"#FF914C"},children:[X," by ",`${b||0} : ${y||0}`]})]}),l.jsx("div",{className:"pt-1 my-graph-length p-0",children:l.jsx("div",{class:"progress my-progress-bar  ",style:{width:`${S!==0?`${S}%`:"0%"}`},role:"progressbar","aria-label":"Animated striped example","aria-valuenow":"45","aria-valuemin":"0","aria-valuemax":"100",children:l.jsx("div",{class:"progress-bar  progress-bar-striped progress-bar-animated"})})}),l.jsxs("div",{className:"d-flex mb-3 mt-2 justify-content-between heading-14",style:{color:"#8F8F8F"},children:[l.jsx("p",{children:Y}),l.jsx("p",{children:"General"}),l.jsx("p",{children:aa})]})]})]})})})]}),l.jsxs("div",{className:"row mx-2",children:[l.jsx("div",{className:"col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3",children:l.jsx("div",{className:"row cards p-2 h-100",children:l.jsxs("div",{className:"col-12",children:[l.jsx("div",{className:"row",children:l.jsxs("div",{className:"d-flex p-1",children:[l.jsx("div",{className:"flex-grow-1 align-self-center",children:l.jsx("p",{className:"font14",children:"Assignment Details"})}),l.jsx(m,{className:"p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12",type:"button",to:"/teacher/assignmenttea",children:"View All"})]})}),l.jsx("div",{className:"row",children:v.slice(0,3).map(a=>l.jsx("div",{className:"col-12 p-1",children:l.jsxs("div",{className:"timeTableCard p-2",children:[l.jsxs("div",{className:"row mb-2",children:[l.jsx("div",{className:"col-4 align-self-center",children:l.jsx("p",{className:"greenText font16",children:a.title})}),l.jsx("div",{className:"col-4 align-self-center",children:l.jsx("p",{className:"font14",children:a.subjectName})}),l.jsx("div",{className:"col-4 align-self-center",children:l.jsx("p",{className:"font12"})})]}),l.jsxs("div",{className:"row pt-1 heading-16",children:[l.jsx("div",{className:"col-2 align-self-center",children:l.jsxs("p",{className:"font12 greyText",children:["Class - ",a.sectionName]})}),l.jsx("div",{className:"col-5 align-self-center",children:l.jsxs("p",{className:"font12 greyText",children:["Start Date - ",a.startDate]})}),l.jsx("div",{className:"col-5 align-self-center",children:l.jsxs("p",{className:"font12 greyText",children:["End Date - ",a.endDate]})})]})]})},a.id))})]})})}),l.jsx("div",{className:"col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3",children:l.jsx("div",{className:"row cards p-2 h-100",children:l.jsxs("div",{className:"col-12",children:[l.jsx("div",{className:"row",children:l.jsxs("div",{className:"d-flex p-1",children:[l.jsx("div",{className:"flex-grow-1 align-self-center",children:l.jsx("p",{className:"font14",children:"Leave Report"})}),l.jsx(m,{className:"p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12",type:"button",to:"/teacher/leave",children:"View All"})]})}),l.jsx("div",{className:"row heading-16",children:N==null?void 0:N.map((a,s)=>l.jsx("div",{className:"col-6 p-1 ",children:l.jsxs("div",{className:"d-flex timeTableCard",children:[l.jsxs("div",{className:"p-2",children:[l.jsx("p",{className:"greenText font18",children:a==null?void 0:a.leaveType}),l.jsx("div",{className:"d-flex pt-2",children:l.jsxs("div",{className:"flex-grow-1 align-self-center",children:[l.jsxs("p",{className:"font12",children:["Available ",a==null?void 0:a.leaveCount," day"]}),l.jsxs("p",{className:"font12",children:["Booked ",a==null?void 0:a.bookedCount," day"]})]})})]}),l.jsx("div",{className:"my-class",children:l.jsx("p",{className:"ps-3",children:l.jsx(pa,{leaveData:[a]})})})]})},a.classRouteId))})]})})})]}),l.jsxs("div",{className:"row mx-2",children:[l.jsx("div",{className:"col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3",children:l.jsx("div",{className:"row cards p-2 h-100",children:l.jsxs("div",{className:"col-12",children:[l.jsx("div",{className:"row",children:l.jsxs("div",{className:"d-flex p-1",children:[l.jsx("div",{className:"flex-grow-1 align-self-center",children:l.jsx("p",{className:"font14",children:"Upcoming Events"})}),l.jsx(m,{className:"p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12",to:"/teacher/event",children:"View All"})]})}),l.jsx("div",{className:"row",children:P.map(a=>l.jsx("div",{className:"col-12 p-1",children:l.jsx("div",{className:"eventCards",children:l.jsx("div",{className:"borderLeftOrange p-2",children:l.jsxs("div",{className:"d-flex p-1",children:[l.jsx("div",{className:"flex-fill",children:l.jsx("p",{className:"font14",children:a.eventName})}),l.jsx("div",{className:"flex-shrink",children:l.jsx("p",{className:"font14 text-end greyText",children:a.startDate})})]})})})},a.eventId))})]})})}),l.jsx("div",{className:"col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3",children:l.jsx("div",{className:"row cards p-2 h-100",children:l.jsxs("div",{className:"col-12",children:[l.jsx("div",{className:"row",children:l.jsxs("div",{className:"d-flex p-1",children:[l.jsx("div",{className:"flex-grow-1 align-self-center",children:l.jsx("p",{className:"font14",children:"Upcoming Holiday"})}),l.jsx(m,{className:"p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12",type:"button",to:"/teacher/holiday",children:"View All"})]})}),l.jsx("div",{className:"row",children:R.map(a=>l.jsx("div",{className:"col-4 p-2",children:l.jsxs("div",{className:"holidayCard p-4",children:[l.jsx("p",{className:"font16 text-center",children:a.holidayTitle}),l.jsx("p",{className:"greyText font14 text-center",children:a.holidayDate})]})},a.holidayId))})]})})})]}),l.jsx(Sa,{})]})};export{Va as default};
