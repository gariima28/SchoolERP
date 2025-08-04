import{u as T,r as t,fI as y,_ as p,j as a,D as S,L as W,I as r,R as P,c as w}from"./index-DHII64NA.js";const E=T.div`
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

`,I=()=>{sessionStorage.getItem("token");const[o,s]=t.useState(!1),[c,h]=t.useState([]),[g,f]=t.useState(1),[i,j]=t.useState(1),[u,b]=t.useState(1),[N,k]=t.useState(10);t.useEffect(()=>{C()},[]);const C=async()=>{var l,d,n,x,m;try{s(!0);var e=await y(u,N);(e==null?void 0:e.status)===200?((l=e==null?void 0:e.data)==null?void 0:l.status)==="success"?(s(!1),h((d=e==null?void 0:e.data)==null?void 0:d.list),f((n=e==null?void 0:e.data)==null?void 0:n.currentPage),j((x=e==null?void 0:e.data)==null?void 0:x.totalPages)):(s(!1),p.error((m=e==null?void 0:e.data)==null?void 0:m.message)):s(!1)}catch{s(!1)}},v=e=>{b(e.selected+1)};return a.jsxs(E,{className:"container-fluid p-4 overflow-scroll",children:[o&&a.jsx(S,{}),a.jsxs("div",{className:"row pb-3",children:[a.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:a.jsxs("ol",{className:"breadcrumb mb-1",children:[a.jsxs("li",{className:"breadcrumb-item",children:[a.jsx(W,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),a.jsx(r,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),a.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Exam Schedule"})]})}),a.jsx("p",{className:"font14 ps-0 fw-bolder",children:"Exam Schedule Details"})]}),a.jsxs("div",{className:"row p-3 bg-white borderRadius5 pb-5",children:[c.length>0?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"overflow-scroll",children:a.jsxs("table",{className:"table align-middle table-striped",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("td",{className:"textWrapClass font14",children:"#"}),a.jsx("td",{className:"textWrapClass font14",children:"Exam Category"}),a.jsx("td",{className:"textWrapClass font14",children:"Room Number"}),a.jsx("td",{className:"textWrapClass font14",children:"Subject"}),a.jsx("td",{className:"textWrapClass font14",children:"Date"}),a.jsx("td",{className:"textWrapClass font14",children:"Starting Time"}),a.jsx("td",{className:"textWrapClass font14",children:"Ending Time"}),a.jsx("td",{className:"textWrapClass font14",children:"Total Marks"})]})}),a.jsxs("tbody",{children:[a.jsx("tr",{}),c.map((e,l)=>a.jsxs("tr",{children:[a.jsx("td",{className:"textWrapClass font14 greyText",children:l+1}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.examTermName}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.roomNumber}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.subject}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.date}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.startingTime}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.endingTime}),a.jsx("td",{className:"textWrapClass font14 greyText",children:e.totalMarks})]},e.holidayId))]})]})}),a.jsxs("div",{className:"d-flex",children:[a.jsxs("p",{className:"font14",children:["Showing ",g," of ",i," Pages"]}),a.jsx("div",{className:"ms-auto",children:a.jsx(P,{previousLabel:a.jsx(r,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:a.jsx(r,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:i,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:v,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):a.jsx(a.Fragment,{children:a.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:a.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})}),a.jsx(w,{})]})]})};export{I as default};
