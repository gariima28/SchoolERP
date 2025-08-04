import{u as F,a as I,r as n,cL as L,$ as m,j as e,D as N,c as P,L as v,cM as V}from"./index-DHII64NA.js";import{D as W}from"./Download-BQ9PMn9l.js";import{A as H}from"./ActionControls-BF7LUwxs.js";import{u as g}from"./index.esm-ByE6_xdu.js";const M=F.div`
    select:-internal-list-box {
        overflow: visible !important;
        background-color: #00A67E !important;
    }

    .viewbutton {
        border-radius: 30px;
        background-color: #008479;
        color: #fff;
        padding: 0.34rem 1rem;
    }

    .paybutton {
        border-radius: 30px;
        background-color: #FF914C;
        color: #fff;
        padding: 0.34rem 1rem;
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

    .form-control::placeholder,
    .form-control,
    .form-select {
        color: var(--greyState);
    }

    .form-control,
    .form-select {
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

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
`,$=["#","Invoice Number","Sale To","Gross Amount","Discount","Net Amount","Status","Action"],J=()=>{const x=I();localStorage.getItem("token");const[p,o]=n.useState(!1),[j,u]=n.useState(!1),[b,y]=n.useState([]),[r,f]=n.useState(null),{register:q,handleSubmit:G,formState:{errors:Q,isValid:w},setValue:_,reset:C}=g({mode:"onChange"}),{register:h,handleSubmit:S,formState:{errors:c,isValid:A},setValue:R,reset:T}=g({mode:"onChange"});n.useEffect(()=>{D()},[]);const D=async()=>{var s,l,d,i;try{o(!0);const a=await L();(a==null?void 0:a.status)===200&&((s=a==null?void 0:a.data)==null?void 0:s.status)==="success"?y(a.data.sales||[]):m.error(((l=a==null?void 0:a.data)==null?void 0:l.message)||"Failed to fetch sales")}catch(a){((i=(d=a==null?void 0:a.response)==null?void 0:d.data)==null?void 0:i.statusType)===401&&(localStorage.removeItem("token"),x("/")),m.error("Error fetching sales")}finally{o(!1)}},k=async s=>{var l,d,i,a;try{o(!0);const t=await V(s);(t==null?void 0:t.status)===200&&((l=t==null?void 0:t.data)==null?void 0:l.status)==="success"?f(t.data.sale||null):m.error(((d=t==null?void 0:t.data)==null?void 0:d.message)||"Failed to fetch sale details")}catch(t){((a=(i=t==null?void 0:t.response)==null?void 0:i.data)==null?void 0:a.statusType)===401&&(localStorage.removeItem("token"),x("/")),m.error("Error fetching sale details")}finally{o(!1)}},B=()=>{x("/admin/inventory/addSale")},E=s=>{k(s)};return e.jsx(e.Fragment,{children:e.jsxs(M,{children:[p&&e.jsx(N,{}),e.jsx(P,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[e.jsxs("div",{className:"col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 p-0",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/admin/inventory",className:"bredcrumText text-decoration-none",children:"Inventory"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Sale"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Manage Sale"})]}),e.jsx("div",{className:"col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0",children:e.jsx(H,{showAddButton:!0,addButtonText:"Add Sale",addButtonAction:B,showSearch:!1,searchAction:"",showExportPDF:!1,exportPDFText:"Export PDF",exportPDFAction:"",exportPDFFileName:"Sales.pdf",showExportCSV:!1,exportCSVText:"Export CSV",exportCSVAction:"",exportCSVFileName:"Sales.xlsx"})})]}),e.jsx("div",{className:"row pb-3",children:e.jsx("div",{className:"bg-white rounded-2 p-3",children:b.length>0?e.jsx("div",{className:"overflow-scroll",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsx("tr",{children:$.map(s=>e.jsx("th",{className:`textWrapClass font14 ${s==="Action"?"text-end":"text-center"}`,children:s},s))})}),e.jsx("tbody",{children:b.map((s,l)=>e.jsxs("tr",{className:"align-middle",children:[e.jsx("td",{className:"textWrapClass greyText font14",children:l+1}),e.jsx("td",{className:"textWrapClass greyText font14",children:s.invoiceNumber}),e.jsx("td",{className:"textWrapClass greyText font14",children:s.saleTo}),e.jsx("td",{className:"textWrapClass greyText font14",children:s.items.reduce((d,i)=>d+(i.subTotal||0),0).toFixed(2)}),e.jsx("td",{className:"textWrapClass greyText font14",children:s.discount.toFixed(2)}),e.jsx("td",{className:"textWrapClass greyText font14",children:s.grandTotal.toFixed(2)}),e.jsx("td",{className:"textWrapClass greyText font14",children:s.saleStatus}),e.jsxs("td",{className:"text-end",children:[s.saleStatus!=="PAID"&&e.jsx("span",{className:"paybutton me-3","data-bs-toggle":"offcanvas","data-bs-target":"#Edit_staticBackdrop","aria-controls":"Edit_staticBackdrop",style:{cursor:"pointer"},children:"Pay"}),e.jsx("span",{className:"viewbutton","data-bs-toggle":"modal","data-bs-target":"#viewDetails",style:{cursor:"pointer"},onClick:()=>E(s.id),children:"View"})]})]},s.id))})]})}):e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})})}),e.jsx("div",{className:"modal modal-lg fade",id:"viewDetails",tabIndex:"-1","aria-labelledby":"viewDetailsLabel","aria-hidden":"true",children:e.jsx("div",{className:"modal-dialog modal-dialog-centered",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header p-1 px-3",children:[e.jsx("h2",{className:"modal-title",id:"viewDetailsLabel",children:"View Sale"}),e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsxs("button",{className:"btn greyText",type:"button",children:[e.jsx(W,{})," ",e.jsx("span",{className:"ms-1 greyText",children:"Download"})]}),e.jsx("button",{type:"button",className:"btn-close greyText","data-bs-dismiss":"modal","aria-label":"Close"})]})]}),e.jsx("div",{className:"modal-body p-0",children:e.jsxs("div",{className:"container-fluid p-3",children:[r?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"row",children:e.jsxs("div",{className:"col-12",children:[e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-5",children:e.jsx("span",{children:"Invoice Number"})}),e.jsx("div",{className:"col-2",children:e.jsx("span",{children:":"})}),e.jsx("div",{className:"col-5",children:e.jsx("span",{children:r.invoiceNumber})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-5",children:e.jsx("span",{children:"Discount"})}),e.jsx("div",{className:"col-2",children:e.jsx("span",{children:":"})}),e.jsx("div",{className:"col-5",children:e.jsx("span",{children:r.discount.toFixed(2)})})]})})]}),e.jsxs("div",{className:"row mt-2",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-5",children:e.jsx("span",{children:"Sale To"})}),e.jsx("div",{className:"col-2",children:e.jsx("span",{children:":"})}),e.jsx("div",{className:"col-5",children:e.jsx("span",{children:r.saleTo})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-5",children:e.jsx("span",{children:"Net Amount"})}),e.jsx("div",{className:"col-2",children:e.jsx("span",{children:":"})}),e.jsx("div",{className:"col-5",children:e.jsx("span",{children:r.grandTotal.toFixed(2)})})]})})]}),e.jsxs("div",{className:"row mt-2",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-5",children:e.jsx("span",{children:"Gross Amount"})}),e.jsx("div",{className:"col-2",children:e.jsx("span",{children:":"})}),e.jsx("div",{className:"col-5",children:e.jsx("span",{children:r.items.reduce((s,l)=>s+(l.subTotal||0),0).toFixed(2)})})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-5",children:e.jsx("span",{children:"Status"})}),e.jsx("div",{className:"col-2",children:e.jsx("span",{children:":"})}),e.jsx("div",{className:"col-5",children:e.jsx("span",{children:r.saleStatus})})]})})]})]})}),e.jsx("div",{className:"row mt-3",children:e.jsx("div",{className:"col-12",children:e.jsxs("table",{className:"table align-middle border",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"font14",children:"#"}),e.jsx("th",{className:"font14",children:"Supplier"}),e.jsx("th",{className:"font14",children:"Category"}),e.jsx("th",{className:"font14",children:"Product Name"}),e.jsx("th",{className:"font14",children:"Quantity"}),e.jsx("th",{className:"font14",children:"Unit Price"}),e.jsx("th",{className:"font14",children:"Total Amount"})]})}),e.jsx("tbody",{children:r.items.map((s,l)=>e.jsxs("tr",{className:"align-middle",children:[e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:l+1}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:s.supplierName}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:s.categoryName}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:s.itemName}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:s.saleQuantity}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:s.salePricePerPiece.toFixed(2)}),e.jsx("td",{className:"font14 pt-3 textWrapClass greyText",children:s.subTotal.toFixed(2)})]},l))})]})})})]}):e.jsx("div",{className:"text-center p-5",children:"No sale data available"}),e.jsxs("div",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons2 font14 text-white me-2",type:"button",disabled:(r==null?void 0:r.saleStatus)==="PAID"||!w,children:"Pay Amount"}),e.jsx("button",{className:"btn cancelButtons font14",type:"button","data-bs-dismiss":"modal",onClick:()=>{C(),f(null)},children:"Cancel"})]})]})})]})})}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Edit_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-1",children:[e.jsx(v,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Pay"})]}),e.jsx("div",{className:"offcanvas-body p-3",children:e.jsxs("form",{onSubmit:S(),children:[e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"AmountEdit",className:"form-label font14",children:["Amount ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"AmountEdit",type:"number",className:`form-control font14 ${c.amount?"border-danger":""}`,placeholder:"Enter Amount",...h("amount",{required:"Amount is required *",min:{value:0,message:"Amount must be non-negative"}})}),c.amount&&e.jsx("p",{className:"font12 text-danger",children:c.amount.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"paymentMethodEdit",className:"form-label font14",children:["Payment Method ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"paymentMethodEdit",className:`form-select font14 ${c.paymentMethod?"border-danger":""}`,...h("paymentMethod",{required:"Payment Method is required *"}),children:[e.jsx("option",{value:"",children:"--- Choose ---"}),e.jsx("option",{value:"CASH",children:"CASH"}),e.jsx("option",{value:"CHEQUE",children:"CHEQUE"}),e.jsx("option",{value:"ONLINE",children:"ONLINE"})]}),c.paymentMethod&&e.jsx("p",{className:"font12 text-danger",children:c.paymentMethod.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"feeDiscountDescriptionEdit",className:"form-label font14",children:"Description"}),e.jsx("input",{id:"feeDiscountDescriptionEdit",type:"text",className:`form-control font14 ${c.feeDiscountDescription?"border-danger":""}`,placeholder:"Enter Description",...h("feeDiscountDescription",{validate:s=>!s||(/^[A-Z]/.test(s)||"Description must start with an uppercase letter")&&(s.length>=4||"Minimum Length is 4")&&(/^[a-zA-Z\s'-]+$/.test(s)||"Invalid Characters in Description")})}),c.feeDiscountDescription&&e.jsx("p",{className:"font12 text-danger",children:c.feeDiscountDescription.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons2 font14 text-white me-2",type:"submit",disabled:!A,children:"Pay"}),e.jsx("button",{className:"btn cancelButtons font14",type:"button","data-bs-dismiss":"offcanvas",onClick:()=>{T()},children:"Cancel"})]})]})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Delete_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header ps-0 modalHighborder p-1",children:[e.jsx(v,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#B50000",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("span",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Sale"})]}),e.jsxs("div",{className:"offcanvas-body p-0",children:[p&&e.jsx(N,{}),e.jsxs("div",{className:"",style:{zIndex:-1},children:[e.jsx("p",{className:"modalLightBorder p-2",children:"Sale"}),e.jsx("p",{className:"text-center p-3",children:e.jsx("img",{src:"/images/errorI.svg",className:"img-fluid",alt:""})}),e.jsx("p",{className:"text-center warningHeading",children:"Are you Sure?"}),e.jsxs("p",{className:"text-center greyText warningText pt-2",children:["This Action will permanently delete",e.jsx("br",{}),"the Sale Data"]}),e.jsxs("p",{className:"text-center warningText p-2",children:[e.jsx("input",{className:"form-check-input formdltcheck me-2",type:"checkbox",checked:j,id:"flexCheckChecked",onChange:s=>u(s.target.checked)}),"I Agree to delete the Sale Data"]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn deleteButtons text-white",disabled:!j,children:"Delete"}),e.jsx("button",{className:"btn dltcancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:()=>u(!1),children:"Cancel"})]})]})]})]})]})]})})};export{J as default};
