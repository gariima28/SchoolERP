import{u as T,r as t,fK as p,_ as y,j as a,D as S,L as w,I as l,R as k,c as W}from"./index-DHII64NA.js";const G=T.div`
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

`,R=()=>{const g=sessionStorage.getItem("token"),[h,s]=t.useState(!1),[c,j]=t.useState([]),[u,b]=t.useState(1),[d,f]=t.useState(1),[i,N]=t.useState(1),[C,D]=t.useState(10);t.useEffect(()=>{v()},[g,i]);const v=async()=>{var r,n,o,m,x;try{s(!0);var e=await p(i,C);(e==null?void 0:e.status)===200?((r=e==null?void 0:e.data)==null?void 0:r.status)==="success"?(s(!1),j((n=e==null?void 0:e.data)==null?void 0:n.grade),b((o=e==null?void 0:e.data)==null?void 0:o.currentPage),f((m=e==null?void 0:e.data)==null?void 0:m.totalPages)):(s(!1),y.error((x=e==null?void 0:e.data)==null?void 0:x.message)):s(!1)}catch{s(!1)}},P=e=>{N(e.selected+1)};return a.jsxs(G,{className:"container-fluid p-4 overflow-scroll",children:[h&&a.jsx(S,{}),a.jsxs("div",{className:"row pb-3",children:[a.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:a.jsxs("ol",{className:"breadcrumb mb-1",children:[a.jsxs("li",{className:"breadcrumb-item",children:[a.jsx(w,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),a.jsx(l,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),a.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Grades"})]})}),a.jsx("p",{className:"font14 ps-0 fw-bolder",children:"Grades Details"})]}),a.jsxs("div",{className:"row p-3 bg-white borderRadius5 pb-5",children:[c.length>0?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"overflow-scroll",children:a.jsxs("table",{className:"table align-middle table-striped",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("td",{className:"textWrapClass font14",children:"#"}),a.jsx("td",{className:"textWrapClass font14",children:"Grade"}),a.jsx("td",{className:"textWrapClass font14",children:"Grade Point"}),a.jsx("td",{className:"textWrapClass font14",children:"Mark From"}),a.jsx("td",{className:"textWrapClass font14",children:"Mark Upto"})]})}),a.jsxs("tbody",{children:[a.jsx("tr",{}),c.map((e,r)=>a.jsxs("tr",{children:[a.jsx("td",{className:"textWrapClass font14 greyText",children:r+1}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.grade}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.gradePoint}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.marksFrom}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.marksUpTo})]},e.id))]})]})}),a.jsxs("div",{className:"d-flex",children:[a.jsxs("p",{className:"font14",children:["Showing ",u," of ",d," Pages"]}),a.jsx("div",{className:"ms-auto",children:a.jsx(k,{previousLabel:a.jsx(l,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:a.jsx(l,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:d,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:P,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):a.jsx(a.Fragment,{children:a.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:a.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})}),a.jsx(W,{})]})]})};export{R as default};
