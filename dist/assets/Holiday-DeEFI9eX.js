import{u as F,r as l,j as e,fv as H,_ as S,D as L,L as A,I as j,R as W,c as $}from"./index-DHII64NA.js";import{C as I}from"./Calendar-CVCK5PIO.js";import{u as B}from"./index.esm-ByE6_xdu.js";const M=F.div`
  .react-calendar__tile--active:active, 
  .react-calendar__tile--active:enabled, 
  .react-calendar__tile--active:focus,
  .react-calendar__tile--now {
    background: #fff;
    color: #000;
  }

  .react-calendar__tile {
    height: ${({smallBox:h})=>h?"75px":"90px"};
    border: 1px solid #E7E7E7;
    position: relative;
  }

  abbr[title] {
    text-decoration: none;
    color: #FF904A;
  }

  .react-calendar__month-view__weekdays {
    text-transform: none !important;
    font-weight: 400;
  }

  .react-calendar__navigation {
    display: none !important;
  }

  .react-calendar {
    width: 100%;
    border: none !important;
  }

  .react-calendar__month-view__weekdays {
    padding: 1%;
  }

  .holiday-tile {
    border-left: 4px solid #008479;
    background-color: #FFF8E9 !important;
    padding-left: 5px;
  }

  .holiday-name {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 80%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 10px);
    text-align: left;
  }

  .legend {
    display: flex;
    margin-top: 20px;
  }

  .legend-item {
    margin-right: 20px;
    display: flex;
    align-items: center;
  }

  .react-calendar__tile--active{
    background-color: #eff8f7 !important;
  }

  .react-calendar__tile:hover{
    background-color: #eff8f7 !important;
    border-bottom: 4px solid #008479
  }
`,R=({DailyAttendanceData:h,month:r,year:i,monthUpdate:C,yearUpdate:f,smallBox:_})=>{const[g,u]=l.useState(new Date);l.useEffect(()=>{if(r||i){const s=new Date(i||new Date().getFullYear(),(r||new Date().getMonth()+1)-1);u(s)}},[r,i]);const b=s=>{const o=s.getFullYear(),n=(s.getMonth()+1).toString().padStart(2,"0"),w=s.getDate().toString().padStart(2,"0"),x=`${o}-${n}-${w}`;console.log(`Checking date: ${x}, Data length: ${h.length}, Sample:`,h.slice(0,2));const N=h.find(y=>y.date===x&&y.status==="holiday");return console.log(`Found holiday for ${x}:`,N),N||{status:null,holidayTitle:""}},v=({activeStartDate:s})=>{const o=s.getMonth()+1,n=s.getFullYear();o!==r&&C(o),n!==i&&f(n)};return e.jsx(M,{smallBox:_,children:e.jsx(I,{onChange:u,value:g,onActiveStartDateChange:v,tileClassName:({date:s,view:o})=>o==="month"&&b(s).status==="holiday"?"holiday-tile":"",tileContent:({date:s,view:o})=>{const n=b(s);return o==="month"&&n.status==="holiday"?(console.log(`Rendering tile for ${s.toISOString().split("T")[0]}, Title: ${n.holidayTitle}`),e.jsx("div",{className:"holiday-name"})):null}})})},V=F.div`
    height: 92vh;
    .mainBreadCrum {
        --bs-breadcrumb-divider: none !important;
    }

    .bredcrumText {
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText {
        color: var(--breadCrumActiveTextColor);
    }

    .greyText {
        color: var(--greyTextColor);
    }

    .table td {
        border-right: 0.3px solid #dee2e6;
    }
`,O=()=>{sessionStorage.getItem("token");const[h,r]=l.useState(!1),[i,C]=l.useState(!1),[f,_]=l.useState(""),[g,u]=l.useState([]),[b,v]=l.useState(1),[s,o]=l.useState(1),[n,w]=l.useState(1),[x,N]=l.useState(10);B({mode:"onChange",defaultValues:{searchByKey:""}}),l.useEffect(()=>{y();const d=Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(c=>new window.bootstrap.Tooltip(c));return()=>{d.forEach(c=>c.dispose())}},[n,f]);const y=async()=>{var a,d,c,p,m,T;try{r(!0);const t=await H(f,n,x);if((t==null?void 0:t.status)===200)if(((a=t==null?void 0:t.data)==null?void 0:a.status)==="success"){r(!1);const k=(d=t==null?void 0:t.data)==null?void 0:d.holidays.filter(D=>D.holidayTitle&&D.startDate&&D.endDate);k.length<((c=t==null?void 0:t.data)==null?void 0:c.holidays.length)&&S.error("Some holiday data is incomplete and has been filtered out."),u(k),v((p=t==null?void 0:t.data)==null?void 0:p.currentPage),o((m=t==null?void 0:t.data)==null?void 0:m.totalPages)}else r(!1),S.error((T=t==null?void 0:t.data)==null?void 0:T.message);else r(!1)}catch{r(!1),S.error("Error fetching holidays")}},P=a=>{w(a.selected+1)},E=g.map(a=>({date:a.startDate,status:"holiday"})).concat(g.flatMap(a=>{const d=new Date(a.startDate),c=new Date(a.endDate),p=[];for(let m=new Date(d);m<=c;m.setDate(m.getDate()+1))p.push({date:m.toISOString().split("T")[0],status:"holiday"});return p}));return e.jsxs(V,{className:"container-fluid px-5 py-4 overflow-scroll",children:[h&&e.jsx(L,{}),e.jsxs("div",{className:"row pb-3",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsxs("li",{className:"breadcrumb-item",children:[e.jsx(A,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),e.jsx(j,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Holiday"})]})}),e.jsx("p",{className:"font14 ps-0 fw-bolder",children:"Holiday Details"})]}),e.jsxs("div",{className:"row p-3 bg-white borderRadius5 pb-5",children:[e.jsx("div",{className:"d-flex justify-content-end align-items-center mb-3",children:e.jsx("span",{className:"border greyText p-2 borderradius8 cursorPointer",onClick:()=>C(!i),children:i?"List View":"Calendar View"})}),g.length>0?i?e.jsx(R,{DailyAttendanceData:E,month:new Date().getMonth()+1,year:new Date().getFullYear(),monthUpdate:a=>{},yearUpdate:a=>{},smallBox:!1}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-scroll mt-2",children:e.jsxs("table",{className:"table align-middle table-striped table-bordered",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("td",{className:"textWrapClass font14",children:"#"}),e.jsx("td",{className:"textWrapClass font14",children:"Holiday Name"}),e.jsx("td",{className:"textWrapClass font14",children:"Start Date"}),e.jsx("td",{className:"textWrapClass font14",children:"End Date"}),e.jsx("td",{className:"textWrapClass font14",children:"Description"})]})}),e.jsx("tbody",{children:g.map((a,d)=>e.jsxs("tr",{children:[e.jsx("td",{className:"textWrapClass font14 greyText",children:d+1}),e.jsx("td",{className:"textWrapClass font14 greyText",children:a.holidayTitle}),e.jsx("td",{className:"textWrapClass font14 greyText",children:a.startDate}),e.jsx("td",{className:"textWrapClass font14 greyText",children:a.endDate}),e.jsx("td",{className:"textWrapClass font14 greyText",children:a.description.length>60?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"me-2",children:a.description.substring(0,60)+"..."}),e.jsx("button",{className:"btn p-0",type:"button","data-bs-toggle":"tooltip","data-bs-placement":"top","data-bs-title":a.description,children:e.jsx(j,{className:"",icon:"ph:info-fill",width:"1.5em",height:"1.5em",style:{color:"#C1C1C1"}})})]}):e.jsx("span",{children:a.description})})]},a.holidayId))})]})}),e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",b," of ",s," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(W,{previousLabel:e.jsx(j,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(j,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:s,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:P,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})}),e.jsx($,{})]})]})};export{O as default};
