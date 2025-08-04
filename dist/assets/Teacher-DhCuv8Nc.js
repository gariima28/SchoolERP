import{u as p,r as t,fC as T,_ as y,j as a,D,L as w,I as l,R as P,c as S}from"./index-DHII64NA.js";const k=p.div`
    height: 92vh;
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

    /* .hoverIcon{
        position: relative;
        cursor: pointer;

        &:hover .hoveringDescriptionDiv{
            display: block;
            cursor: pointer;
            position: absolute;
            background-color: var(--hoveringDivBg) !important;
            border: 1px solid var(--hoveringDivBorder);
            color: #fff;
            width: 260px;
            z-index: 1;
        }
    }

    .hoveringDescriptionDiv{
        display: none;
    } */
/* 
    .custom-tooltip {
        --bs-tooltip-bg: var(--bd-violet-bg);
        --bs-tooltip-color: var(--bs-white);
    } */

`,W=()=>{localStorage.getItem("token");const[x,s]=t.useState(!1),[c,g]=t.useState([]),[b,u]=t.useState(1),[i,v]=t.useState(1),[o,j]=t.useState(1),[f,A]=t.useState(10);t.useEffect(()=>{N()},[o]);const N=async()=>{var r,d,n,m,h;try{s(!0);var e=await T(o,f);(e==null?void 0:e.status)===200?((r=e==null?void 0:e.data)==null?void 0:r.status)==="success"?(s(!1),g((d=e==null?void 0:e.data)==null?void 0:d.subjectsAndTeachers),u((n=e==null?void 0:e.data)==null?void 0:n.currentPage),v((m=e==null?void 0:e.data)==null?void 0:m.totalPages)):(s(!1),y.error((h=e==null?void 0:e.data)==null?void 0:h.message)):s(!1)}catch{s(!1)}},C=e=>{j(e.selected+1)};return a.jsxs(k,{className:"container-fluid p-4 overflow-scroll",children:[x&&a.jsx(D,{}),a.jsxs("div",{className:"row pb-3",children:[a.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:a.jsxs("ol",{className:"breadcrumb mb-1",children:[a.jsxs("li",{className:"breadcrumb-item",children:[a.jsx(w,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),a.jsx(l,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),a.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Teacher"})]})}),a.jsx("p",{className:"font14 ps-0 fw-bolder",children:"Teacher Details"})]}),a.jsxs("div",{className:"row p-3 bg-white borderRadius5 pb-5",children:[c.length>0?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"overflow-scroll",children:a.jsxs("table",{className:"table align-middle table-striped",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("td",{className:"textWrapClass font14",children:"#"}),a.jsx("td",{className:"textWrapClass font14",children:"Name"}),a.jsx("td",{className:"textWrapClass font14",children:"Department"})]})}),a.jsxs("tbody",{children:[a.jsx("tr",{}),c.map((e,r)=>a.jsxs("tr",{children:[a.jsx("td",{className:"textWrapClass font14 greyText",children:r+1}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.teacher}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.subject})]},e.holidayId))]})]})}),a.jsxs("div",{className:"d-flex",children:[a.jsxs("p",{className:"font14",children:["Showing ",b," of ",i," Pages"]}),a.jsx("div",{className:"ms-auto",children:a.jsx(P,{previousLabel:a.jsx(l,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:a.jsx(l,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:i,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:C,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):a.jsx(a.Fragment,{children:a.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:a.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})}),a.jsx(S,{})]})]})};export{W as default};
