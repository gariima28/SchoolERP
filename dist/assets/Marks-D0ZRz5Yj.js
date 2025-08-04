import{u as y,r as t,fJ as P,_ as S,j as a,D as T,L as w,I as l,R as p,c as M}from"./index-DHII64NA.js";const D=y.div`
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

`,I=()=>{const g=sessionStorage.getItem("token"),[h,s]=t.useState(!1),[c,u]=t.useState([]),[b,j]=t.useState(1),[i,f]=t.useState(1),[d,N]=t.useState(1),[v,W]=t.useState(10);t.useEffect(()=>{C()},[g,d]);const C=async()=>{var r,n,m,o,x;try{s(!0);var e=await P(d,v);(e==null?void 0:e.status)===200?((r=e==null?void 0:e.data)==null?void 0:r.status)==="success"?(s(!1),u((n=e==null?void 0:e.data)==null?void 0:n.marks),j((m=e==null?void 0:e.data)==null?void 0:m.currentPage),f((o=e==null?void 0:e.data)==null?void 0:o.totalPages)):(s(!1),S.error((x=e==null?void 0:e.data)==null?void 0:x.message)):s(!1)}catch{s(!1)}},k=e=>{N(e.selected+1)};return a.jsxs(D,{className:"container-fluid p-4 overflow-scroll",children:[h&&a.jsx(T,{}),a.jsxs("div",{className:"row pb-3",children:[a.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:a.jsxs("ol",{className:"breadcrumb mb-1",children:[a.jsxs("li",{className:"breadcrumb-item",children:[a.jsx(w,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),a.jsx(l,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),a.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Marks"})]})}),a.jsx("p",{className:"font14 ps-0 fw-bolder",children:"Marks Details"})]}),a.jsxs("div",{className:"row p-3 bg-white borderRadius5 pb-5",children:[c.length>0?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"overflow-scroll",children:a.jsxs("table",{className:"table align-middle table-striped",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("td",{className:"textWrapClass font14",children:"#"}),a.jsx("td",{className:"textWrapClass font14",children:"Subject"}),a.jsx("td",{className:"textWrapClass font14",children:"Marks"}),a.jsx("td",{className:"textWrapClass font14",children:"Grade"})]})}),a.jsxs("tbody",{children:[a.jsx("tr",{}),c.map((e,r)=>a.jsxs("tr",{children:[a.jsx("td",{className:"textWrapClass font14 greyText",children:r+1}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.subjectName}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.gainMarks}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.grade})]},e.holidayId))]})]})}),a.jsxs("div",{className:"d-flex",children:[a.jsxs("p",{className:"font14",children:["Showing ",b," of ",i," Pages"]}),a.jsx("div",{className:"ms-auto",children:a.jsx(p,{previousLabel:a.jsx(l,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:a.jsx(l,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:i,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:k,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):a.jsx(a.Fragment,{children:a.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:a.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})}),a.jsx(M,{})]})]})};export{I as default};
