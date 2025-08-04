import{u as oe,a as ne,r as l,E as re,j as e,D as de,bx as ce,L as ie,by as me,_ as S}from"./index-DHII64NA.js";import{d as ue,S as xe}from"./StudentFeeDetails-8bKB1z8K.js";import{A as he}from"./ActionControls-BF7LUwxs.js";import{u as W}from"./index.esm-ByE6_xdu.js";import"./index-BKNjMPK8.js";const fe=oe.div`
    select:-internal-list-box {
        overflow: visible !important;
        background-color: #00A67E !important;
    }

    .padding-daterange {
        padding: 0.4rem 0.5rem !important;
        margin-top: 0.12rem !important;
    }

    .form-select {
        color: var(--greyState);
        box-shadow: none;
        border: 1px solid var(--formInputBorder) !important;
    }
    
    .mainBreadCrum {
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText {
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText {
        color: var(--breadCrumActiveTextColor);
    }

    .ExportBtns {
        border-radius: 6px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-control::placeholder, .form-control, .form-select {
        color: var(--greyState);
    }

    .form-control, .form-select {
        box-shadow: none !important;
        border: 1px solid var(--formInputBorder);
    }

    //date range
    .rdrCalendarWrapper{
        background-color: #eff8f7 !important;
    }

    .rdrSelected, .rdrInRange, .rdrStartEdge, .rdrEndEdge {
        background-color: #008479;
    }

    .rdrDayHovered {
        outline: #008479;
    }
    //date range

    .contbtn {
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv {
        background-color: #FBFBFB;
    }

    .formdltcheck:checked {
        background-color: #B50000;
        border-color: #B50000;
    }

    .formEditSpecFeatcheck:checked {
        background-color: #00A67E;
        border-color: #00A67E;
    }

    .modalHighborder {
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder {
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .correvtSVG {
        position: relative;
        width: fit-content;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .deleteSVG {
        position: relative;
        width: fit-content;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }

    .w-fitcontent {
        width: fit-content;
    }

    .greyText {
        color: #8F8F8F;
    }

    .blueText {
        color: #008ECA;
    }

    .paidbutton {
        border-radius: 30px;
        background-color: #00A67E;
        color: #fff;
        padding: 0.34rem 1rem;
    }

    .unPaidbutton {
        border-radius: 30px;
        background-color: #B50000;
        color: #fff;
        padding: 0.34rem 1rem;
    }
`,De=()=>{const C=ne(),H=localStorage.getItem("token"),[L,c]=l.useState(!1),[V,D]=l.useState(!0),[U,y]=l.useState(""),[M,w]=l.useState(""),[u,A]=l.useState(""),[f,b]=l.useState(""),[F,O]=l.useState(""),[x,k]=l.useState(!1),[i,g]=l.useState([{startDate:null,endDate:null,key:"selection"}]),[R,$]=l.useState(null),[h,q]=l.useState([]),[B,p]=l.useState([]),[j,I]=l.useState([]),v=l.useRef(null);W({mode:"onChange"});const{register:N,handleSubmit:K,formState:{errors:r,isValid:_},setValue:be,reset:z}=W({mode:"onChange"});l.useEffect(()=>{const t=o=>{v.current&&!v.current.contains(o.target)&&k(!1)};return x&&document.addEventListener("mousedown",t),()=>{document.removeEventListener("mousedown",t)}},[x]),l.useEffect(()=>{G()},[H]);const G=async()=>{var t,o,n,d;try{c(!0);const s=await re();(s==null?void 0:s.status)===200&&((t=s==null?void 0:s.data)==null?void 0:t.status)==="success"&&(setTimeout(()=>{c(!1)},800),q(((o=s==null?void 0:s.data)==null?void 0:o.classes)||[]))}catch(s){setTimeout(()=>{c(!1)},800),((d=(n=s==null?void 0:s.response)==null?void 0:n.data)==null?void 0:d.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{C("/")},200))}},Y=t=>{A(t),b("");const o=h.find(n=>n.classNo===t);p(o?o.section||[]:[])},Z=t=>{b(t)},[ge,J]=l.useState(0),Q=t=>{g([t.selection]);const{startDate:o,endDate:n}=t.selection;y(o?o.toISOString().split("T")[0]:""),w(n?n.toISOString().split("T")[0]:""),console.log("DateRange updated:",t.selection)},X=i[0].startDate&&i[0].endDate?`${i[0].startDate.toLocaleDateString()} - ${i[0].endDate.toLocaleDateString()}`:"Select Date Range",ee=()=>{D(!0),A(""),b(""),y(""),w(""),g([{startDate:null,endDate:null,key:"selection"}]),J(t=>t+1),p([]),I([])},te=async()=>{var t,o,n,d,s,m;try{c(!0);const a=await me(U,M,u,f,F);(a==null?void 0:a.status)===200&&((t=a==null?void 0:a.data)==null?void 0:t.status)==="success"?(I(((o=a==null?void 0:a.data)==null?void 0:o.receipts)||[]),D(!0),S.success(((n=a==null?void 0:a.data)==null?void 0:n.message)||"Invoices fetched successfully")):S.error(((d=a==null?void 0:a.data)==null?void 0:d.message)||"Failed to fetch invoices")}catch(a){S.error(((m=(s=a==null?void 0:a.response)==null?void 0:s.data)==null?void 0:m.message)||"Error fetching invoices")}finally{c(!1)}},T=()=>{te()},ae=()=>{C("/admin/feeCollection/collectFees")},[pe,se]=l.useState(""),le=t=>{$(R===t?null:t),se(t)};return e.jsxs(fe,{children:[L&&e.jsx(de,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row pb-2 gap-xl-0 px-0",children:[e.jsxs("div",{className:"col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/admin/feeCollection/feesDiscount",className:"bredcrumText text-decoration-none",children:"Fee Collection"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Reciept"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Reciept"})]}),e.jsx("div",{className:"col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0",children:e.jsx(he,{showAddButton:!0,addButtonText:"Add Invoice",addButtonAction:ae,showSearch:!0,searchAction:T,showExportPDF:!1,exportPDFText:"Export PDF",exportPDFAction:"",exportPDFFileName:"Receipts.pdf",showExportCSV:j.length>0,exportCSVText:"Export CSV",exportCSVAction:ce,exportCSVFileName:"Receipts.xlsx"})})]}),e.jsx("div",{className:"row pb-3",children:e.jsxs("div",{className:"bg-white rounded-2 p-4",children:[e.jsxs("form",{className:"row g-3",children:[e.jsxs("div",{className:"col-md-3 col-sm-6 col-12 d-flex flex-column position-relative",children:[e.jsx("label",{htmlFor:"dateRange",className:"form-label font14",children:"Date Range"}),e.jsxs("div",{className:"position-relative",children:[e.jsx("input",{readOnly:!0,value:X,onClick:()=>{g([{startDate:null,endDate:null,key:"selection"}]),k(!x)},className:"border border-gray-300 rounded padding-daterange font14 cursor-pointer w-100"}),x&&e.jsx("div",{ref:v,style:{position:"absolute",zIndex:1e3,top:"100%",left:0,marginTop:"2%"},children:e.jsx(ue.DateRange,{editableDateInputs:!0,onChange:Q,moveRangeOnFirstSelection:!1,ranges:i,preventSnapRefocus:!0,showDateDisplay:!1,rangeColors:["transparent"],showSelectionPreview:!1,focusedRange:[0,0],showMonthAndYearPickers:!0,retainEndDateOnFirstSelection:!1})})]})]}),e.jsxs("div",{className:"col-md-3 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"classNo",className:"form-label font14",children:"Class"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",value:u,onChange:t=>Y(t.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),h==null?void 0:h.map(t=>e.jsx("option",{value:t.classNo,children:t.classNo},t.classId))]})]}),e.jsxs("div",{className:"col-md-3 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"section",className:"form-label font14",children:"Section"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",value:f,onChange:t=>Z(t.target.value),children:[e.jsx("option",{value:"",disabled:!0,children:"-- Select --"}),u!==""?B.length>0?B.map(t=>e.jsx("option",{value:t.sectionName,children:t.sectionName},t.classSecId)):e.jsx("option",{value:"",disabled:!0,children:"-- No Sections Found --"}):e.jsx("option",{value:"",disabled:!0,children:"-- Select Class First --"})]})]}),e.jsxs("div",{className:"col-md-3 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"section",className:"form-label font14",children:"Status"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",value:F,onChange:t=>O(t.target.value),children:[e.jsx("option",{value:"",children:"All Status"}),e.jsx("option",{value:"PAID",children:" PAID "}),e.jsx("option",{value:"UNPAID",children:" UNPAID "})]})]}),e.jsxs("div",{className:"text-center p-3 col-12",children:[e.jsx("button",{type:"button",className:"btn addCategoryButtons text-white",onClick:T,disabled:!u||!f,children:"Search"}),e.jsx("button",{type:"button",className:"btn cancelButtons ms-3",onClick:ee,children:"Cancel"})]})]}),V?e.jsx("div",{className:"row",children:j.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-scroll",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"font14 textWrapClass tableHeading text-center",children:"#"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Invoice No"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Student"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Class & Section"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Net Amount"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Paid Amount"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Due Amount"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Paid Status"}),e.jsx("th",{className:"font14 textWrapClass tableHeading text-center",children:"Action"})]})}),e.jsx("tbody",{children:j.map((t,o)=>{var n,d,s,m,a,E,P;return e.jsxs("tr",{className:"align-top",children:[e.jsxs("th",{className:"font14 pt-3 textWrapClass text-center greyText",children:[o+1,"."]}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:(n=t==null?void 0:t.invoice)==null?void 0:n.invoiceNo}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:(d=t==null?void 0:t.invoice)==null?void 0:d.studentName}),e.jsxs("td",{className:"font14 pt-3 textWrapClass greyText",children:[(s=t==null?void 0:t.invoice)==null?void 0:s.classNo," - ",(m=t==null?void 0:t.invoice)==null?void 0:m.section]}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:(a=t==null?void 0:t.invoice)==null?void 0:a.totalAmount}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:(E=t==null?void 0:t.invoice)==null?void 0:E.paidAmount}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:(P=t==null?void 0:t.invoice)==null?void 0:P.dueAmount}),e.jsx("td",{className:" pt-3 textWrapClass",children:e.jsx("span",{className:`font14 ${(t==null?void 0:t.status)==="Paid"||(t==null?void 0:t.status)==="PAID"?"paidbutton":"unPaidbutton"}`,children:t==null?void 0:t.status})}),e.jsx("td",{className:"font14 pt-3 textWrapClass text-center",children:e.jsxs("div",{className:"dropdown dropdownbtn",children:[e.jsx("button",{className:"btn btn-sm actionButtons dropdown-toggle",type:"button",onClick:()=>le(t.invoiceId),children:"Action"}),e.jsxs("ul",{className:`dropdown-menu dropdown-menu-end ${R===t.invoiceId?"show z-index-high":""}`,children:[e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#collectFees","aria-controls":"collectFees",children:"Collect Fees"})}),e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"modal","data-bs-target":"#viewDetails",children:"View"})})]})]})})]},t.invoiceId)})})]})}),e.jsx("div",{className:"d-flex"})]}):e.jsx("div",{className:"d-flex justify-content-center p-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid"})})}):e.jsx("div",{className:"d-flex justify-content-center p-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid"})})]})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2",tabIndex:"-1",id:"collectFees","aria-labelledby":"collectFeesLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-2",children:[e.jsx(ie,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"collectFeesLabel",children:"Collect Fees"})]}),e.jsx("div",{className:"offcanvas-body p-3",children:e.jsxs("form",{onSubmit:K(),children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"amount",className:"form-label font14",children:"Amount"}),e.jsx("input",{id:"amount",type:"number",className:`form-control font14 ${r.amount?"border-danger":""}`,placeholder:"Enter Amount",...N("amount",{required:"Amount is required *",min:{value:.01,message:"Amount must be greater than 0"}})}),r.amount&&e.jsx("p",{className:"font12 text-danger",children:r.amount.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"paymentMethod",className:"form-label font14",children:"Payment Method"}),e.jsxs("select",{id:"paymentMethod",className:"form-select font14",...N("paymentMethod",{required:"Payment method is required *"}),children:[e.jsx("option",{value:"",children:"Select Payment Method"}),e.jsx("option",{value:"CASH",children:"CASH"}),e.jsx("option",{value:"UPI",children:"UPI"}),e.jsx("option",{value:"BANK_TRANSFER",children:"BANK_TRANSFER"})]}),r.paymentMethod&&e.jsx("p",{className:"font12 text-danger",children:r.paymentMethod.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"description",className:"form-label font14",children:"Description"}),e.jsx("input",{id:"description",type:"text",className:`form-control font14 ${r.description?"border-danger":""}`,placeholder:"Enter Description",...N("description",{validate:t=>!t||/^[a-zA-Z0-9\s'-]+$/.test(t)||"Invalid Characters in Description"})}),r.description&&e.jsx("p",{className:"font12 text-danger",children:r.description.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons font14 text-white me-2",type:"submit",disabled:!_,children:"Submit"}),e.jsx("button",{className:"btn cancelButtons font14","data-bs-dismiss":"offcanvas",type:"button",onClick:()=>{z()},children:"Cancel"})]})]})})]}),e.jsx("div",{className:"modal modal-lg fade",id:"viewDetails",tabIndex:"-1","aria-labelledby":"viewDetailsLabel","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-dialog-centered",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header pb-2",children:[e.jsx("h2",{className:"modal-title",id:"viewDetailsLabel",children:"Windsor Park High School"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx(xe,{})})]})})})]})};export{De as default};
