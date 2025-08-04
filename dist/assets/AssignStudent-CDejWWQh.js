import{u as H,a as $,r,am as z,_ as o,E as G,an as K,j as e,c as _,ao as U,ap as J,D as Q,aq as X,I as O,R as Y,L as Z,ar as ee}from"./index-DHII64NA.js";import{u as ae}from"./index.esm-ByE6_xdu.js";import"./Link-B_f3HVnI.js";import{A as te}from"./ActionControls-BF7LUwxs.js";import"./index-BKNjMPK8.js";const se=H.div`
    .form-select{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
    }

    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

`,le=({setAssignStudent:T})=>{$();const F=localStorage.getItem("token"),[n,D]=r.useState([]),[f,R]=r.useState([]),[N,P]=r.useState([]),[v,m]=r.useState([]),[S,A]=r.useState([]),{register:h,handleSubmit:w,formState:{errors:d},setValue:C,watch:k,trigger:p,reset:I}=ae({mode:"onChange"}),y=k("vehicleNo");r.useEffect(()=>{B(),V()},[F]),r.useEffect(()=>{M()},[y]);const B=async()=>{var l,c,i;try{var a=await z("","","");(a==null?void 0:a.status)===200?((l=a==null?void 0:a.data)==null?void 0:l.status)==="success"&&D((c=a==null?void 0:a.data)==null?void 0:c.vehicles):o.error((i=a==null?void 0:a.data)==null?void 0:i.message)}catch{setloaderState(!1),setloaderState(!1)}},V=async()=>{var l,c,i;try{var a=await G();(a==null?void 0:a.status)===200?((l=a==null?void 0:a.data)==null?void 0:l.status)==="success"&&R((c=a==null?void 0:a.data)==null?void 0:c.classes):o.error((i=a==null?void 0:a.data)==null?void 0:i.message)}catch{setloaderState(!1),setloaderState(!1)}},M=async()=>{var l,c;try{var a=await K(y);(a==null?void 0:a.status)===200&&((l=a==null?void 0:a.data)==null?void 0:l.status)==="success"&&A((c=a==null?void 0:a.data)==null?void 0:c.drops)}catch{setloaderState(!1),setloaderState(!1)}},W=async a=>{var c,i,j,t;try{const s=new FormData;s.append("vehicleNo",a==null?void 0:a.vehicleNo),s.append("classNo",a==null?void 0:a.classNo),s.append("sec",a==null?void 0:a.sec),s.append("studentId",a==null?void 0:a.studentId),s.append("dropId",a==null?void 0:a.dropId);var l=await U(s);(l==null?void 0:l.status)===200?((c=l==null?void 0:l.data)==null?void 0:c.status)==="success"?(o.success((i=l==null?void 0:l.data)==null?void 0:i.message),setTimeout(()=>{I()},600),T(!0)):o.error((j=l==null?void 0:l.data)==null?void 0:j.message):o.error((t=l==null?void 0:l.data)==null?void 0:t.message)}catch{setloaderState(!1)}},E=a=>{const l=a;C("classNo",l,{shouldValidate:!0});const c=f.find(i=>i.classNo===l);P(c?c.section||[]:[]),p("classNo")},L=a=>{const l=a;C("sec",l,{shouldValidate:!0});const c=N.find(i=>i.sectionName===l);m(c?c.studentDTO||[]:[]),p("sec")};return e.jsx(e.Fragment,{children:e.jsx(se,{children:e.jsxs("div",{className:"container-fluid",children:[e.jsx("div",{className:"row",children:e.jsxs("form",{className:"p-3",onSubmit:w(W),children:[e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"vehicleNo",className:"form-label font14",children:["Vehicle  ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"vehicleNo",className:`form-select font14 ${d.vehicleNo?"border-danger":""}`,...h("vehicleNo",{required:"Vehicle selection is required *"}),children:[e.jsx("option",{value:"",children:"--- Select ---"}),n==null?void 0:n.map(a=>e.jsx("option",{value:a.vehicleNumber,children:a.vehicleModel},a.vehicleId))]}),d.vehicleNo&&e.jsx("p",{className:"font12 text-danger",children:d.vehicleNo.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"classNo",className:"form-label font14",children:["Class  ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"classNo",className:`form-select font14 ${d.classNo?"border-danger":""}`,...h("classNo",{required:"Class selection is required *"}),onChange:a=>E(a.target.value),children:[e.jsx("option",{value:"",children:"--- Select ---"}),f==null?void 0:f.map(a=>e.jsx("option",{value:a==null?void 0:a.classNo,children:a.classNo},a.classId))]}),d.classNo&&e.jsx("p",{className:"font12 text-danger",children:d.classNo.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"sec",className:"form-label font14",children:["Section  ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"sec",className:`form-select font14 ${d.sec?"border-danger":""}`,...h("sec",{required:"Section selection is required *"}),onChange:a=>L(a.target.value),children:[e.jsx("option",{value:"",children:"--- Select ---"}),N==null?void 0:N.map(a=>e.jsx("option",{value:a==null?void 0:a.sectionName,children:a.sectionName},a.classSecId))]}),d.sec&&e.jsx("p",{className:"font12 text-danger",children:d.sec.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"studentId",className:"form-label font14",children:["Student  ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"studentId",className:`form-select font14 ${d.studentId?"border-danger":""}`,...h("studentId",{required:"Student selection is required *"}),children:[e.jsx("option",{value:"",children:"--- Select ---"}),v==null?void 0:v.map(a=>e.jsx("option",{value:a.studentId,children:a.studentName},a.studentId))]}),d.studentId&&e.jsx("p",{className:"font12 text-danger",children:d.studentId.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"dropId",className:"form-label font14",children:["Drop Point  ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"dropId",className:`form-select font14 ${d.dropId?"border-danger":""}`,...h("dropId",{required:"Drop selection is required *"}),children:[e.jsx("option",{value:"",children:"--- Select ---"}),S==null?void 0:S.map(a=>e.jsx("option",{value:a.dropId,children:a.stopName},a.dropId))]}),d.dropId&&e.jsx("p",{className:"font12 text-danger",children:d.dropId.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn updateButtons text-white",type:"submit",children:"Assign"}),e.jsx("button",{className:"btn cancelButtons ms-3",type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:()=>I(),children:"Cancel"})]})]})}),e.jsx(_,{})]})})})},ce=H.div`

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .eventablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
    }

    .ExportBtns{
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .greenBgModal{
        background-color: var(--breadCrumActiveTextColor);
    }

    .greenText{
        color: var(--breadCrumActiveTextColor);
    }

    .orangeText{
        color: var(--OrangeBtnColor);
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }
    
    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .pointer{
        cursor: pointer;
    }

`,me=()=>{const T=sessionStorage.getItem("token"),[F,n]=r.useState(!1),[D,f]=r.useState(!1),[R,N]=r.useState([]),[P,v]=r.useState(),[m,S]=r.useState([]),[A,h]=r.useState([]),[w,d]=r.useState(""),[C,k]=r.useState(1),[p,I]=r.useState(1),[y,B]=r.useState(1),[V,M]=r.useState(5);r.useEffect(()=>{a(),W(),E()},[T,C,y,D]);const W=async()=>{var t;try{const s=await DownloadVehicleStudentsExcel();if((s==null?void 0:s.status)===200){const x=(t=s==null?void 0:s.data)==null?void 0:t.split(`
`).map(u=>u.split(","));N(x)}}catch{}},E=async()=>{var t;try{const s=await DownloadVehicleStudentsPDF();(s==null?void 0:s.status)===200&&((t=s==null?void 0:s.data)==null?void 0:t.status)==="success"&&v(s==null?void 0:s.data)}catch{}},L=t=>{B(t.selected+1)},a=async()=>{var s,x,u,b;try{n(!0);var t=await J(w,y,V);if((t==null?void 0:t.status)===200&&((s=t==null?void 0:t.data)==null?void 0:s.status)==="success"&&(n(!1),S((x=t==null?void 0:t.data)==null?void 0:x.vehicles),I(t.data.totalPages),k(t.data.currentPage),D)){const g=document.getElementById("assignStudent_staticBackdrop");if(g){let q=bootstrap.Offcanvas.getInstance(g);q||(q=new bootstrap.Offcanvas(g)),q.hide()}}}catch(g){n(!1),((b=(u=g==null?void 0:g.response)==null?void 0:u.data)==null?void 0:b.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},l=async t=>{var x,u;try{const b=new FormData;b.append("studentId",t);var s=await ee(b);(s==null?void 0:s.status)===200?((x=s==null?void 0:s.data)==null?void 0:x.status)==="success"&&(setRefershPage(!refreshPage),a(),o.success(s.data.msg)):o.error((u=s==null?void 0:s.data)==null?void 0:u.message)}catch{n(!1),n(!1)}},c=t=>{f(t)},i=()=>{const t=document.getElementById("assignStudent_staticBackdrop");t?(bootstrap.Offcanvas.getInstance(t)||new bootstrap.Offcanvas(t)).show():(console.error("Offcanvas element with ID addFeeDiscount not found"),o.error("Unable to open Add Fee Discount form"))},j=t=>{d(t),B(1)};return e.jsx(e.Fragment,{children:e.jsxs(ce,{children:[F&&e.jsx(Q,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[e.jsxs("div",{className:"col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/admin/transport/route",className:"bredcrumText text-decoration-none",children:"Transport"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Admin"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Admin List"})]}),e.jsx("div",{className:"col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0",children:e.jsx(te,{showAddButton:!0,addButtonText:"Assign Students",addButtonAction:i,showExportPDF:m.length>0,exportPDFText:"Export PDF",exportPDFAction:DownloadVehicleStudentsPDF,exportPDFFileName:"Assigned Students.pdf",showExportCSV:m.length>0,exportCSVText:"Export CSV",exportCSVAction:X,exportCSVFileName:"Assigned Students.xlsx",showSearch:!0,searchValue:w,searchAction:a,onSearchChange:j})})]}),e.jsx("div",{className:"row pb-3",children:e.jsx("div",{className:"bg-white p-3 cardradius",children:m.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-scroll ",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"#"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Vehicle info"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Route"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Driver Name"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Driver No"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Student Details"})})]})}),e.jsx("tbody",{children:m.map((t,s)=>e.jsxs("tr",{className:"my-bg-color align-middle",children:[e.jsx("th",{className:"textWrapClass greyText",children:e.jsx("h3",{children:s+1})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:t.vehicleNo})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:t.route})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:t.driverName})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:t.driverNo})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsxs("h3",{className:"align-self-center pointer","data-bs-toggle":"modal","data-bs-target":"#StudentDetailsModal",onClick:()=>h(t.students),children:["Details ",e.jsx(O,{icon:"material-symbols:info-outline",width:"1.4em",height:"1.4em",style:{color:"#008479"}})]})})]},t.vehicleId))})]})}),e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",C," of ",p," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(Y,{previousLabel:e.jsx(O,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(O,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:p,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:L,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"assignStudent_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header ps-0 modalHighborder p-1",children:[e.jsx(Z,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("span",{className:"offcanvas-title font14",id:"staticBackdropLabel",children:"Assign Student"})]}),e.jsx("div",{className:"offcanvas-body p-0",children:e.jsx(le,{setAssignStudent:c})})]}),e.jsx("div",{className:"modal modal-lg fade",id:"StudentDetailsModal",tabIndex:"-1","aria-labelledby":"StudentDetailsModalLabel","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-dialog-centered",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header pb-2",children:[e.jsx("h2",{className:"modal-title",id:"StudentDetailsModalLabel",children:"Student Details"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:A.length>0?e.jsx(e.Fragment,{children:e.jsxs("table",{className:"table",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"textWrapClass",children:"#"}),e.jsx("th",{className:"textWrapClass",children:"Student Id"}),e.jsx("th",{className:"textWrapClass",children:"Student Name"}),e.jsx("th",{className:"textWrapClass",children:"Drop Name"}),e.jsx("th",{className:"text-center textWrapClass",children:e.jsx("span",{className:"font14",children:"Action"})})]})}),e.jsx("tbody",{children:A.map((t,s)=>e.jsxs("tr",{className:"my-bg-color align-middle",children:[e.jsx("th",{className:"textWrapClass greyText",children:e.jsx("h3",{children:s+1})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:t.studentId})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:t.studentName})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:t.dropName})}),e.jsx("td",{className:"textWrapClass text-center",children:e.jsx("img",{src:"/images/dlt_Icon.svg","data-bs-dismiss":"modal",onClick:()=>l(t.studentId),style:{cursor:"pointer"}})})]},t.studentId))})]})}):e.jsx("div",{className:"d-flex justify-content-center p-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid "})})})]})})}),e.jsx(_,{})]})})};export{me as default};
