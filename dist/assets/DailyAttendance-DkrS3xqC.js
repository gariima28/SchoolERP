import{u as A,r,fO as D,_ as w,j as e,D as T,L as k,I as B,c as I}from"./index-DHII64NA.js";import{C as L}from"./Calender-DytgPfN-.js";import"./Calendar-CVCK5PIO.js";const M=A.div`

  .mainBreadCrum{
    --bs-breadcrumb-divider: none !important;
  }
  .bredcrumText{
    color: var(--breadCrumTextColor);
  }
  .bredcrumActiveText{
    color: var(--breadCrumActiveTextColor);
  }
  .greyText{
    color: var(--greyTextColor);
  }
  .table td {
    border-right: 0.3px solid #dee2e6;
  }
  .form-control::placeholder, .form-control, .form-select{
    color: var(--greyState);
  }
  .form-control, .form-select{
    border-radius: 5px ;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }
  
`,F=()=>{const i=sessionStorage.getItem("token"),[v,m]=r.useState(!1),[u,o]=r.useState(!1),[h,l]=r.useState(!1),[N,C]=r.useState([]),[n,x]=r.useState(new Date().getMonth()+1),[c,f]=r.useState(new Date().getFullYear());r.useEffect(()=>{i&&d(),u&&d(),h&&d()},[i,u,h]);const d=async a=>{var s,b,p,j,g;m(!0);try{const t=await D(n,c);(t==null?void 0:t.status)===200&&((s=t==null?void 0:t.data)==null?void 0:s.status)==="success"?(C((b=t==null?void 0:t.data)==null?void 0:b.attendance),o(!1),l(!1)):w.error((p=t==null?void 0:t.data)==null?void 0:p.msg)}catch(t){setloaderState(!1),console.error(t),((g=(j=t==null?void 0:t.response)==null?void 0:j.data)==null?void 0:g.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}finally{m(!1)}},S=a=>{n!==a&&(x(a),l(!0))},y=a=>{c!==a&&(f(a),l(!0))};return e.jsxs(M,{className:"container-fluid p-4 overflow-scroll",children:[v&&e.jsx(T,{}),e.jsxs("div",{className:"row pb-3",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsxs("li",{className:"breadcrumb-item",children:[e.jsx(k,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),e.jsx(B,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Daily Attendance"})]})}),e.jsx("p",{className:"font14 ps-0 fw-bolder",children:"Daily Attendance Details"})]}),e.jsxs("div",{className:"row p-3 bg-white borderRadius5 pb-5",children:[e.jsxs("div",{className:"col-12",children:[e.jsxs("div",{className:"row mb-4",children:[e.jsxs("div",{className:"col-6",children:[e.jsx("label",{htmlFor:"inputState",className:"form-label font14",children:"Month"}),e.jsxs("select",{id:"inputState",className:"form-select font14",onChange:a=>x(a.target.value),children:[e.jsx("option",{selected:!0,disabled:!0,children:"Choose..."}),Array.from({length:12},(a,s)=>e.jsx("option",{value:s+1,children:new Date(0,s).toLocaleString("default",{month:"long"})},s))]})]}),e.jsxs("div",{className:"col-6",children:[e.jsx("label",{htmlFor:"inputYear",className:"form-label font14",children:"Year"}),e.jsxs("select",{id:"inputYear",className:"form-select font14",onChange:a=>f(a.target.value),children:[e.jsx("option",{selected:!0,disabled:!0,children:"Choose..."}),Array.from({length:71},(a,s)=>e.jsx("option",{value:1990+s,children:1990+s},s))]})]})]}),e.jsx("div",{className:"row mb-4",children:e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{type:"button",className:"btn printButtons text-white",onClick:()=>o(!0),children:"Search"}),e.jsx("button",{type:"button",className:"btn cancelButtons ms-3",onClick:()=>o(!1),children:"Cancel"})]})}),e.jsx("div",{className:"row",children:e.jsx(L,{DailyAttendanceData:N,month:n,year:c,monthUpdate:S,yearUpdate:y})})]}),e.jsx(I,{})]})]})};export{F as default};
