import{u as o,r as i,j as e}from"./index-DHII64NA.js";import c from"./SingleStudentAdmission-BvcunKz-.js";import n from"./ExcelUpload-CVfM5E0q.js";import"./index.esm-ByE6_xdu.js";import"./index-DwwEihQh.js";import"./Link-B_f3HVnI.js";import"./index-BKNjMPK8.js";const l=o.div`
    overflow : scroll;

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ActiveState{
        cursor: pointer;
        color: #000;
        border-bottom: 3px solid orange;
    }

    .InActiveState{
        cursor: pointer;
        color: var(--greyState);
    }

    @media screen and (max-width: 598px) and (min-width: 576px) {
        .fontSizeResponsive{
            font-size: 14px !important;
        }
    }

    @media screen and (max-width: 575px) and (min-width: 6px) {
        .fontSizeResponsive{
            
        }
    }

`,v=()=>{const[r,s]=i.useState(!0),[a,t]=i.useState(!1);return e.jsx(e.Fragment,{children:e.jsx(l,{children:e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"row p-3",children:[e.jsxs("div",{className:"row pb-3",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item","aria-current":"page",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Admissions"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Admission Form"})]})}),e.jsx("p",{className:"font16 ps-0 fontWeight500",children:"Admission Form"})]}),e.jsx("div",{className:"row pb-3",children:e.jsxs("div",{className:"bg-white rounded-2 p-4",children:[e.jsx("div",{className:"row border-bottom border-2 ",children:e.jsx("div",{className:"col-xxl-6 col-xl-12 col-sm-12 col-12",children:e.jsxs("div",{className:"row pb-2 gap-sm-0 gap-3",children:[e.jsx("div",{className:"col-md-6 col-sm-6 col-12 text-center",children:e.jsx("span",{className:`font16 fontSizeResponsive fontWeight500 ps-3 pb-2 pe-3 ${r?"ActiveState":"InActiveState"}`,onClick:()=>{s(!0),t(!1)},children:"Single Student Admission"})}),e.jsx("div",{className:"col-md-6 col-sm-6 col-12 text-center",children:e.jsx("span",{className:`font16 fontSizeResponsive fontWeight500 ps-3 pb-2 pe-3 ${a?"ActiveState":"InActiveState"}`,onClick:()=>{s(!1),t(!0)},children:"Excel Upload"})})]})})}),e.jsx("div",{className:"row",children:r?e.jsx(c,{}):e.jsx(n,{})})]})})]})})})})};export{v as default};
