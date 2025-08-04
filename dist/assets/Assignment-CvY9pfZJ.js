import{u as T,r as i,fB as S,_ as c,j as e,D as W,L as h,I as n,R as P,c as k,b3 as L}from"./index-DHII64NA.js";const R=T.div`
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

`,I=()=>{const b=sessionStorage.getItem("token"),[u,r]=i.useState(!1),[o,f]=i.useState([]),[j,v]=i.useState(1),[d,N]=i.useState(1),[m,p]=i.useState(1),[C,B]=i.useState(10);i.useEffect(()=>{w()},[b,m]);const w=async()=>{var l,t,s,x,g;try{r(!0);var a=await S(m,C);(a==null?void 0:a.status)===200?((l=a==null?void 0:a.data)==null?void 0:l.status)==="success"?(r(!1),f((t=a==null?void 0:a.data)==null?void 0:t.assignment),v((s=a==null?void 0:a.data)==null?void 0:s.currentPage),N((x=a==null?void 0:a.data)==null?void 0:x.totalPages)):(r(!1),c.error((g=a==null?void 0:a.data)==null?void 0:g.message)):r(!1)}catch{r(!1)}},y=a=>{p(a.selected+1)},D=async a=>{try{r(!0);const t=await L(a,{responseType:"blob"});if((t==null?void 0:t.status)===200){const s=t==null?void 0:t.data;A(s,"Assignment.pdf"),c.success("Assignment Downloaded Successfully"),r(!1)}else c.error("Failed to download the Assignment.")}catch(l){r(!1),c.error("An error occurred while downloading the Assignment-",l)}},A=(a,l)=>{const t=window.URL.createObjectURL(a),s=document.createElement("a");s.href=t,s.download=l,document.body.appendChild(s),s.click(),document.body.removeChild(s),window.URL.revokeObjectURL(t)};return e.jsxs(R,{className:"container-fluid p-4 overflow-scroll",children:[u&&e.jsx(W,{}),e.jsxs("div",{className:"row pb-3",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsxs("li",{className:"breadcrumb-item",children:[e.jsx(h,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),e.jsx(n,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Assignment"})]})}),e.jsx("p",{className:"font14 ps-0 fw-bolder",children:"Assignment Details"})]}),e.jsxs("div",{className:"row p-3 bg-white borderRadius5 pb-5",children:[o.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-scroll",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("td",{className:"textWrapClass font14",children:"#"}),e.jsx("td",{className:"textWrapClass font14",children:"Title"}),e.jsx("td",{className:"textWrapClass font14",children:"Teacher"}),e.jsx("td",{className:"textWrapClass font14",children:"Subject"}),e.jsx("td",{className:"textWrapClass font14",children:"Download"}),e.jsx("td",{className:"textWrapClass font14",children:"Start Time"}),e.jsx("td",{className:"textWrapClass font14",children:"End Time"})]})}),e.jsxs("tbody",{children:[e.jsx("tr",{}),e.jsx("tr",{}),o.map((a,l)=>e.jsxs("tr",{children:[e.jsx("td",{className:"textWrapClass font14 greyText",children:l+1}),e.jsx("td",{className:"textWrapClass font14 greyText",children:a.title}),e.jsx("td",{className:"textWrapClass font14 greyText",children:a.createdBy}),e.jsx("td",{className:"textWrapClass font14 greyText",children:a.subjectName}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsxs("p",{className:"font14 align-self-start m-0",children:[e.jsx(n,{icon:"bxs:file-pdf",width:"1.3em",height:"1.3em",style:{color:"red"}}),e.jsx(h,{className:"ms-2",to:"",onClick:()=>D(a.id),children:"Download"})]})}),e.jsx("td",{className:"textWrapClass font14 greyText",children:a.startDate}),e.jsx("td",{className:"textWrapClass font14 greyText",children:a.endDate})]},a.id))]})]})}),e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",j," of ",d," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(P,{previousLabel:e.jsx(n,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(n,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:d,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:y,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})}),e.jsx(k,{})]})]})};export{I as default};
