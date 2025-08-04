import{u as T,r as t,fN as k,_ as D,j as a,D as A,L as I,I as i,R as L,c as R}from"./index-DHII64NA.js";const p=T.div`
    height: 92vh;
    width: 100%;
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

`,B=()=>{const b=sessionStorage.getItem("token"),[j,s]=t.useState(!1),[r,f]=t.useState([]),[N,v]=t.useState(1),[d,S]=t.useState(1),[n,C]=t.useState(1),[w,E]=t.useState(10);t.useEffect(()=>{y()},[b,n]);const y=async()=>{var c,m,o,x,h,g,u;try{s(!0);var e=await k(n,w);(e==null?void 0:e.status)===200?((c=e==null?void 0:e.data)==null?void 0:c.status)==="success"?(s(!1),f((m=e==null?void 0:e.data)==null?void 0:m.subjects),v((o=e==null?void 0:e.data)==null?void 0:o.currentPage),S((x=e==null?void 0:e.data)==null?void 0:x.totalPages)):(s(!1),D.error((h=e==null?void 0:e.data)==null?void 0:h.message)):s(!1)}catch(l){s(!1),s(!1),((u=(g=l==null?void 0:l.response)==null?void 0:g.data)==null?void 0:u.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},P=e=>{C(e.selected+1)};return a.jsxs(p,{children:[j&&a.jsx(A,{}),a.jsxs("div",{className:"container-fluid p-4 overflow-scroll",children:[a.jsxs("div",{className:"row px-2",children:[a.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:a.jsxs("ol",{className:"breadcrumb mb-1",children:[a.jsxs("li",{className:"breadcrumb-item",children:[a.jsx(I,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),a.jsx(i,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),a.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Subject"})]})}),a.jsx("p",{className:"font14 ps-0 fw-bolder",children:"Subject Details"})]}),a.jsxs("div",{className:"row p-2",children:[a.jsx("div",{className:"col-12 bg-white borderRadius5 px-4 py-2",children:a.jsx("div",{className:"row",children:r.length>0?a.jsxs(a.Fragment,{children:[a.jsxs("table",{className:"table align-middle table-striped",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("td",{className:"font14",children:"#"}),a.jsx("td",{className:"font14",children:"Subject Name"})]})}),a.jsxs("tbody",{children:[a.jsx("tr",{}),r.map((e,c)=>a.jsxs("tr",{children:[a.jsx("td",{className:"font14 greyText",children:c+1}),a.jsx("td",{className:"font14 greyText",children:e.subjectName})]},e.holidayId))]})]}),a.jsxs("div",{className:"d-flex",children:[a.jsxs("p",{className:"font14",children:["Showing ",N," of ",d," Pages"]}),a.jsx("div",{className:"ms-auto",children:a.jsx(L,{previousLabel:a.jsx(i,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:a.jsx(i,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:d,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:P,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):a.jsx(a.Fragment,{children:a.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:a.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})})})}),a.jsx(R,{})]})]})]})};export{B as default};
