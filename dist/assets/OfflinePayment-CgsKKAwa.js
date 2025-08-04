import{u as h,k as b,a as g,r as j,j as e,D as y,L as N,fL as v,_ as c}from"./index-DHII64NA.js";import{u as P}from"./index.esm-ByE6_xdu.js";const F=h.div`

    .table thead tr{
        --bs-table-bg-type: #F2F3F6 !important;
    }
    
    .table tbody tr:last-child {
        background-color: #1f47c0 !important;
    }

    .form-control::placeholder{
        color: var(--greyState);
    }

    .form-control, .form-select{
        color: var(--greyState);
        border-radius: 5px ;
        border: 1px solid var(--fontControlBorder);
        box-shadow: none;
    }

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ExportBtns{
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .greenBG{
        background-color: var(--headingBackgroundColor);
    }

    .darkgreentext{
        color: var(--greenTextColor);
    }

    .greyText{
      color: var(--greyTextColor) !important;
    }

    .greenText{
      color: var(--greenTextColor) !important;
    }

    .modal-footer{
        border: none !important;
    }

`,A=()=>{const{id:d}=b(),f=g(),[u,s]=j.useState(!1),{register:n,handleSubmit:x,formState:{errors:t},setValue:O}=P({mode:"onChange"}),p=async r=>{var o,i,m;s(!0);try{const l=new FormData;l.append("dateOfPayment",r==null?void 0:r.dateOfPayment),l.append("paymentMode",r==null?void 0:r.paymentMode),l.append("paymentFrom",r==null?void 0:r.paymentFrom),l.append("reference",r==null?void 0:r.reference),l.append("amountPaid",r==null?void 0:r.amountPaid),l.append("multipartFile",r==null?void 0:r.multipartFile[0]);var a=await v(d,l);(a==null?void 0:a.status)===200&&(((o=a==null?void 0:a.data)==null?void 0:o.status)==="success"?(s(!1),c.success((i=a==null?void 0:a.data)==null?void 0:i.message),f("/parent/fees")):(c.error((m=a==null?void 0:a.data)==null?void 0:m.message),s(!1)))}catch{s(!1),s(!1)}};return e.jsxs(F,{children:[u&&e.jsx(y,{}),e.jsx("div",{className:"container-fluid pt-4 ",children:e.jsxs("div",{className:"row gap-xl-0 gap-3",children:[e.jsxs("div",{className:"col-xxl-5 col-xl-4 col-lg-12 col-sm-12 flex-frow-1 ",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Fee Collection "})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Fees"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Fees List"})]}),e.jsx("div",{className:"col-xxl-7 col-xl-8 col-lg-12 col-sm-12"})]})}),e.jsx("div",{className:"container-fluid p-4",children:e.jsxs("div",{className:"row bg-white cardradius2 p-3",children:[e.jsx("p",{className:"greenText font14 p-0",children:"Offline Bank Payments"}),e.jsx("hr",{className:"mt-2 mb-1"}),e.jsxs("form",{className:"row g-3",onSubmit:x(p),children:[e.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[e.jsx("label",{htmlFor:"dateOfPayment",className:"form-label font14",children:"Date Of Payment *"}),e.jsx("input",{id:"dateOfPayment",type:"date",className:`form-control font14 ${t.dateOfPayment?"border-danger":""}`,placeholder:"Enter Date ",...n("dateOfPayment",{required:"Date Of Payment is required *"})}),t.dateOfPayment&&e.jsx("p",{className:"font12 text-danger",children:t.dateOfPayment.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[e.jsx("label",{htmlFor:"paymentMode",className:"form-label font14",children:"Payment Mode *"}),e.jsxs("select",{id:"paymentMode",className:`form-select font14 ${t.paymentMode?"border-danger":""}`,...n("paymentMode",{required:"Payment Mode is required *"}),children:[e.jsx("option",{value:"",disabled:!0,selected:!0,children:"--- Select ---"}),e.jsx("option",{value:"Offline",children:"Offline"}),e.jsx("option",{value:"Online",children:"Online"})]}),t.paymentMode&&e.jsx("p",{className:"font12 text-danger",children:t.paymentMode.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[e.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Payment From *"}),e.jsx("input",{id:"paymentFrom",type:"text",className:`form-control font14 ${t.paymentFrom?"border-danger":""}`,placeholder:"Enter Payment From",...n("paymentFrom",{required:"Payment From is required *",validate:r=>/^[A-Z]/.test(r)?r.length<2?"Minimum Length is 2":/^[a-zA-Z0-9\s'-]+$/.test(r)?!0:"Invalid Characters in Payment From":"Payment From must start with an uppercase letter"})}),t.paymentFrom&&e.jsx("p",{className:"font12 text-danger",children:t.paymentFrom.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[e.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Reference *"}),e.jsx("input",{id:"reference",type:"text",className:`form-control font14 ${t.reference?"border-danger":""}`,placeholder:"Enter Reference",...n("reference",{required:"Reference is required *",validate:r=>/^[A-Z]/.test(r)?r.length<2?"Minimum Length is 2":/^[a-zA-Z0-9\s'-]+$/.test(r)?!0:"Invalid Characters in Reference":"Reference must start with an uppercase letter"})}),t.reference&&e.jsx("p",{className:"font12 text-danger",children:t.reference.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[e.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"Amount Paid ($) *"}),e.jsx("input",{id:"amountPaid",type:"number",className:`form-control font14 ${t.amountPaid?"border-danger":""}`,placeholder:"Enter Paid Amount",...n("amountPaid",{required:"Paid Amount id required *",min:{value:0,message:"Amount cannot be negative"}})}),t.amountPaid&&e.jsx("p",{className:"font12 text-danger",children:t.amountPaid.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[e.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"Proof Of Payment *"}),e.jsx("input",{id:"multipartFile",type:"file",className:`form-control font14 ${t.multipartFile?"border-danger":""}`,accept:".jpg, .jpeg, .png",...n("multipartFile",{required:"Student Image is required *",validate:r=>r.length>0&&(r[0].size<10240||r[0].size>204800)?"File size must be between 10 KB to 200 KB":!0})}),t.multipartFile&&e.jsx("p",{className:"font12 text-danger",children:t.multipartFile.message})]}),e.jsxs("div",{className:"row p-5",children:[e.jsx("div",{className:"col-md-6 col-sm-6 col-6 text-end",children:e.jsx("button",{className:"btn saveButtons font16 text-white",type:"submit",children:"Pay"})}),e.jsx("div",{className:"col-md-6 col-sm-6 col-6 text-start",children:e.jsx(N,{className:"btn cancelButtons font16",to:"/parent/fees",children:"Cancel"})})]})]})]})})]})};export{A as default};
