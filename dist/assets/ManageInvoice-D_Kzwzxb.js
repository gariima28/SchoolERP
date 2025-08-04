import{u as ae,a as se,r as o,E as le,j as e,D as oe,L as ne,bu as re,_ as i,bv as ce}from"./index-DHII64NA.js";import{d as de,S as ie}from"./StudentFeeDetails-8bKB1z8K.js";import{A as me}from"./ActionControls-BF7LUwxs.js";import{u as ue}from"./index.esm-ByE6_xdu.js";import"./index-BKNjMPK8.js";const xe=ae.div`
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
`,ve=()=>{const S=se(),R=localStorage.getItem("token"),[P,d]=o.useState(!1),[W,C]=o.useState(!0),[H,D]=o.useState(""),[M,y]=o.useState(""),[x,w]=o.useState(""),[f,g]=o.useState(""),[L,he]=o.useState(""),[V,O]=o.useState(""),[h,A]=o.useState(!1),[m,b]=o.useState([{startDate:null,endDate:null,key:"selection"}]),[F,U]=o.useState(null),[p,$]=o.useState([]),[I,j]=o.useState([]),[B,k]=o.useState([]),N=o.useRef(null),{register:v,handleSubmit:q,formState:{errors:c,isValid:_},setValue:pe,reset:T}=ue({mode:"onChange"});o.useEffect(()=>{const t=l=>{N.current&&!N.current.contains(l.target)&&A(!1)};return h&&document.addEventListener("mousedown",t),()=>{document.removeEventListener("mousedown",t)}},[h]),o.useEffect(()=>{z()},[R]);const z=async()=>{var t,l,n,r;try{d(!0);const a=await le();(a==null?void 0:a.status)===200&&((t=a==null?void 0:a.data)==null?void 0:t.status)==="success"&&(setTimeout(()=>{d(!1)},800),$(((l=a==null?void 0:a.data)==null?void 0:l.classes)||[]))}catch(a){setTimeout(()=>{d(!1)},800),((r=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:r.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{S("/")},200))}},G=t=>{w(t),g("");const l=p.find(n=>n.classNo===t);j(l?l.section||[]:[])},K=t=>{g(t)},Y=t=>{b([t.selection]);const{startDate:l,endDate:n}=t.selection;D(l?l.toISOString().split("T")[0]:""),y(n?n.toISOString().split("T")[0]:""),console.log("DateRange updated:",t.selection)},Z=m[0].startDate&&m[0].endDate?`${m[0].startDate.toLocaleDateString()} - ${m[0].endDate.toLocaleDateString()}`:"Select Date Range",J=()=>{C(!0),w(""),g(""),D(""),y(""),b([{startDate:null,endDate:null,key:"selection"}]),j([]),k([])},Q=async()=>{var t,l,n,r,a,u;try{d(!0);const s=await ce(H,M,x,f,L);(s==null?void 0:s.status)===200&&((t=s==null?void 0:s.data)==null?void 0:t.status)==="success"?(k(((l=s==null?void 0:s.data)==null?void 0:l.invoices)||[]),C(!0),i.success(((n=s==null?void 0:s.data)==null?void 0:n.message)||"Invoices fetched successfully")):i.error(((r=s==null?void 0:s.data)==null?void 0:r.message)||"Failed to fetch invoices")}catch(s){i.error(((u=(a=s==null?void 0:s.response)==null?void 0:a.data)==null?void 0:u.message)||"Error fetching invoices")}finally{d(!1)}},E=()=>{Q()},X=()=>{S("/admin/feeCollection/collectFees")},ee=t=>{U(F===t?null:t),O(t)},te=async t=>{var l,n;console.log("sd");try{console.log("sd"),d(!0);const r=new FormData;r.append("amount",t.amount),r.append("paymentMethod",t.paymentMethod),r.append("description",t.description||""),console.log("sd");const a=await re(r,V);if(console.log(0,a),(a==null?void 0:a.status)===200&&((l=a==null?void 0:a.data)==null?void 0:l.status)==="success"){console.log(1),i.success(a.data.message),console.log(2),T(),console.log(3);const u=document.getElementById("collectFees");console.log(4),(bootstrap.Offcanvas.getInstance(u)||new bootstrap.Offcanvas(u)).hide()}else console.log(5),i.error(((n=a==null?void 0:a.data)==null?void 0:n.message)||"Failed to Collect Fees")}catch{i.error("Error Collecting Fees")}finally{d(!1)}};return e.jsxs(xe,{children:[P&&e.jsx(oe,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row pb-2 gap-xl-0 px-0",children:[e.jsxs("div",{className:"col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/admin/feeCollection/feesDiscount",className:"bredcrumText text-decoration-none",children:"Fee Collection"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Manage Invoice"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Manage Invoice"})]}),e.jsx("div",{className:"col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0",children:e.jsx(me,{showAddButton:!0,addButtonText:"Add Invoice",addButtonAction:X,showSearch:!0,searchAction:E,showExportPDF:!1,exportPDFText:"Export PDF",exportPDFAction:"",exportPDFFileName:"Invoices.pdf",showExportCSV:!1,exportCSVText:"Export CSV",exportCSVAction:"",exportCSVFileName:"Invoices.xlsx"})})]}),e.jsx("div",{className:"row pb-3",children:e.jsxs("div",{className:"bg-white rounded-2 p-4",children:[e.jsxs("form",{className:"row g-3",children:[e.jsxs("div",{className:"col-md-4 col-sm-6 col-12 d-flex flex-column position-relative",children:[e.jsx("label",{htmlFor:"dateRange",className:"form-label font14",children:"Date Range"}),e.jsxs("div",{className:"position-relative",children:[e.jsx("input",{readOnly:!0,value:Z,onClick:()=>{b([{startDate:null,endDate:null,key:"selection"}]),A(!h)},className:"border border-gray-300 rounded padding-daterange font14 cursor-pointer w-100"}),h&&e.jsx("div",{ref:N,style:{position:"absolute",zIndex:1e3,top:"100%",left:0,marginTop:"2%"},children:e.jsx(de.DateRange,{editableDateInputs:!0,onChange:Y,moveRangeOnFirstSelection:!1,ranges:m,preventSnapRefocus:!0,showDateDisplay:!1,rangeColors:["transparent"],showSelectionPreview:!1,focusedRange:[0,0],showMonthAndYearPickers:!0,retainEndDateOnFirstSelection:!1})})]})]}),e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"classNo",className:"form-label font14",children:"Class"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",value:x,onChange:t=>G(t.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),p==null?void 0:p.map(t=>e.jsx("option",{value:t.classNo,children:t.classNo},t.classId))]})]}),e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"section",className:"form-label font14",children:"Section"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",value:f,onChange:t=>K(t.target.value),children:[e.jsx("option",{value:"",disabled:!0,children:"-- Select --"}),x!==""?I.length>0?I.map(t=>e.jsx("option",{value:t.sectionName,children:t.sectionName},t.classSecId)):e.jsx("option",{value:"",disabled:!0,children:"-- No Sections Found --"}):e.jsx("option",{value:"",disabled:!0,children:"-- Select Class First --"})]})]}),e.jsxs("div",{className:"text-center p-3 col-12",children:[e.jsx("button",{type:"button",className:"btn addCategoryButtons text-white",onClick:E,disabled:!x||!f,children:"Search"}),e.jsx("button",{type:"button",className:"btn cancelButtons ms-3",onClick:J,children:"Cancel"})]})]}),W?e.jsx("div",{className:"row",children:B.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-scroll",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"font14 textWrapClass tableHeading text-center",children:"#"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Invoice No"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Student"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Invoice Title"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Total Amount"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Discount"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Due Amount"}),e.jsx("th",{className:"font14 textWrapClass tableHeading",children:"Paid Status"}),e.jsx("th",{className:"font14 textWrapClass tableHeading text-center",children:"Action"})]})}),e.jsx("tbody",{children:B.map((t,l)=>e.jsxs("tr",{className:"align-top",children:[e.jsxs("th",{className:"font14 pt-3 textWrapClass text-center greyText",children:[l+1,"."]}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:t==null?void 0:t.invoiceNo}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:t==null?void 0:t.studentName}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:t==null?void 0:t.invoiceTitle}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:t==null?void 0:t.totalAmount}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:t==null?void 0:t.discount}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:t==null?void 0:t.dueAmount}),e.jsx("td",{className:" pt-3 textWrapClass",children:e.jsx("span",{className:`font14 ${(t==null?void 0:t.status)==="Paid"||(t==null?void 0:t.status)==="PAID"?"paidbutton":"unPaidbutton"}`,children:t==null?void 0:t.status})}),e.jsx("td",{className:"font14 pt-3 textWrapClass text-center",children:e.jsxs("div",{className:"dropdown dropdownbtn",children:[e.jsx("button",{className:"btn btn-sm actionButtons dropdown-toggle",type:"button",onClick:()=>ee(t.invoiceId),children:"Action"}),e.jsxs("ul",{className:`dropdown-menu dropdown-menu-end ${F===t.invoiceId?"show z-index-high":""}`,children:[e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#collectFees","aria-controls":"collectFees",children:"Collect Fees"})}),e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"modal","data-bs-target":"#viewDetails",children:"View"})})]})]})})]},t.invoiceId))})]})}),e.jsx("div",{className:"d-flex"})]}):e.jsx("div",{className:"d-flex justify-content-center p-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid"})})}):e.jsx("div",{className:"d-flex justify-content-center p-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid"})})]})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2",tabIndex:"-1",id:"collectFees","aria-labelledby":"collectFeesLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-2",children:[e.jsx(ne,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"collectFeesLabel",children:"Collect Fees"})]}),e.jsx("div",{className:"offcanvas-body p-3",children:e.jsxs("form",{onSubmit:q(te),children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"amount",className:"form-label font14",children:"Amount"}),e.jsx("input",{id:"amount",type:"number",className:`form-control font14 ${c.amount?"border-danger":""}`,placeholder:"Enter Amount",...v("amount",{required:"Amount is required *",min:{value:.01,message:"Amount must be greater than 0"}})}),c.amount&&e.jsx("p",{className:"font12 text-danger",children:c.amount.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"paymentMethod",className:"form-label font14",children:"Payment Method"}),e.jsxs("select",{id:"paymentMethod",className:"form-select font14",...v("paymentMethod",{required:"Payment method is required *"}),children:[e.jsx("option",{value:"",children:"Select Payment Method"}),e.jsx("option",{value:"CASH",children:"CASH"}),e.jsx("option",{value:"UPI",children:"UPI"}),e.jsx("option",{value:"BANK_TRANSFER",children:"BANK_TRANSFER"})]}),c.paymentMethod&&e.jsx("p",{className:"font12 text-danger",children:c.paymentMethod.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"description",className:"form-label font14",children:"Description"}),e.jsx("input",{id:"description",type:"text",className:`form-control font14 ${c.description?"border-danger":""}`,placeholder:"Enter Description",...v("description",{validate:t=>!t||/^[a-zA-Z0-9\s'-]+$/.test(t)||"Invalid Characters in Description"})}),c.description&&e.jsx("p",{className:"font12 text-danger",children:c.description.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons font14 text-white me-2",type:"submit",disabled:!_,children:"Submit"}),e.jsx("button",{className:"btn cancelButtons font14","data-bs-dismiss":"offcanvas",type:"button",onClick:()=>{T()},children:"Cancel"})]})]})})]}),e.jsx("div",{className:"modal modal-lg fade",id:"viewDetails",tabIndex:"-1","aria-labelledby":"viewDetailsLabel","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-dialog-centered",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header pb-2",children:[e.jsx("h2",{className:"modal-title",id:"viewDetailsLabel",children:"Windsor Park High School"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsx("div",{className:"modal-body",children:e.jsx(ie,{})})]})})})]})};export{ve as default};
