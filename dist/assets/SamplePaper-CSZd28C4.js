import{u as D,r as c,fz as T,_ as i,j as a,D as k,L as g,I as o,R as L,c as A,fA as R}from"./index-DHII64NA.js";const W=D.div`
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

`,z=()=>{const p=sessionStorage.getItem("token"),[u,r]=c.useState(!1),[d,b]=c.useState([]),[f,j]=c.useState(1),[n,v]=c.useState(1),[m,N]=c.useState(1),[w,I]=c.useState(10);c.useEffect(()=>{C()},[p,m]);const C=async()=>{var l,t,s,h,x;try{r(!0);var e=await T(m,w);(e==null?void 0:e.status)===200?((l=e==null?void 0:e.data)==null?void 0:l.status)==="success"?(r(!1),b((t=e==null?void 0:e.data)==null?void 0:t.samplePaper),j((s=e==null?void 0:e.data)==null?void 0:s.currentPage),v((h=e==null?void 0:e.data)==null?void 0:h.totalPages)):(r(!1),i.error((x=e==null?void 0:e.data)==null?void 0:x.message)):r(!1)}catch{r(!1)}},S=e=>{N(e.selected+1)},P=(e,l)=>{const t=window.URL.createObjectURL(e),s=document.createElement("a");s.href=t,s.download=l,document.body.appendChild(s),s.click(),document.body.removeChild(s),window.URL.revokeObjectURL(t)},y=async e=>{try{r(!0);const t=await R(e,{responseType:"blob"});if((t==null?void 0:t.status)===200){const s=t==null?void 0:t.data;P(s,"Sample Paper.pdf"),i.success("Sample Paper Downloaded Successfully"),r(!1)}else i.error("Failed to download the Sample Paper.")}catch(l){r(!1),i.error("An error occurred while downloading the Sample Paper-",l)}};return a.jsxs(W,{className:"container-fluid p-4 overflow-scroll",children:[u&&a.jsx(k,{}),a.jsxs("div",{className:"row pb-3",children:[a.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:a.jsxs("ol",{className:"breadcrumb mb-1",children:[a.jsxs("li",{className:"breadcrumb-item",children:[a.jsx(g,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),a.jsx(o,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),a.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Sample Paper"})]})}),a.jsx("p",{className:"font14 ps-0 fw-bolder",children:"Sample Paper Details"})]}),a.jsxs("div",{className:"row p-3 bg-white borderRadius5 pb-5",children:[d.length>0?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"overflow-scroll",children:a.jsxs("table",{className:"table align-middle table-striped",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("td",{className:"textWrapClass font14",children:"#"}),a.jsx("td",{className:"textWrapClass font14",children:"Title"}),a.jsx("td",{className:"textWrapClass font14",children:"Subject"}),a.jsx("td",{className:"textWrapClass font14",children:"Sample Paper Details"})]})}),a.jsxs("tbody",{children:[a.jsx("tr",{}),d.map((e,l)=>a.jsxs("tr",{children:[a.jsx("td",{className:"font14 textWrapClass greyText",children:l+1}),a.jsx("td",{className:"font14 textWrapClass greyText",children:e.title}),a.jsx("td",{className:"font14 textWrapClass greyText",children:e.subjectName}),a.jsx("td",{className:"textWrapClass greyText",children:a.jsxs("p",{className:"font14 align-self-start m-0",children:[a.jsx(o,{icon:"bxs:file-pdf",width:"1.3em",height:"1.3em",style:{color:"red"}}),a.jsx(g,{className:"ms-2",to:"",onClick:()=>y(e.sampleId),children:"Download"})]})})]},e.holidayId))]})]})}),a.jsxs("div",{className:"d-flex",children:[a.jsxs("p",{className:"font14",children:["Showing ",f," of ",n," Pages"]}),a.jsx("div",{className:"ms-auto",children:a.jsx(L,{previousLabel:a.jsx(o,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:a.jsx(o,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:n,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:S,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):a.jsx(a.Fragment,{children:a.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:a.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})}),a.jsx(A,{})]})]})};export{z as default};
