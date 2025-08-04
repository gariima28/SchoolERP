import{u as A,r as c,fx as E,_ as P,j as t,D as V,R as F,I as y,fy as H,c as z,L as _}from"./index-DHII64NA.js";const $=A.div`

    .greyText{
        color: var(--greyTextColor);
    }

    .table td {
        border-right: 0.3px solid #dee2e6;
    }

    .viewBtn{
        border: 1px solid var(--viewBtn);
        color: #000;
        background-color: var(--viewBtn);
        border-radius: var(--borderRadius5px);
    }
    
    .viewBtn:active, .viewBtn:hover{
        border: 1px solid var(--viewBtn);
        color: #000;
        background-color: var(--viewBtn);
        border-radius: var(--borderRadius5px);
    }
    
`,q=({viewState:o,dataById:s})=>{const n=localStorage.getItem("token"),[x,i]=c.useState(!1),[r,m]=c.useState([]),[u,S]=c.useState(1),[j,T]=c.useState(1),[w,I]=c.useState(1),[D,R]=c.useState(10);c.useEffect(()=>{e()},[n,w]);const e=async()=>{var l,h,v,g,b,f,N;try{i(!0);var a=await E(w,D);(a==null?void 0:a.status)===200?((l=a==null?void 0:a.data)==null?void 0:l.status)==="success"?(i(!1),m((h=a==null?void 0:a.data)==null?void 0:h.notices),S((v=a==null?void 0:a.data)==null?void 0:v.currentPage),T((g=a==null?void 0:a.data)==null?void 0:g.totalPages)):(i(!1),P.error((b=a==null?void 0:a.data)==null?void 0:b.message)):i(!1)}catch(d){i(!1),((N=(f=d==null?void 0:d.response)==null?void 0:f.data)==null?void 0:N.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},C=a=>{I(a.selected+1)},B=a=>{o(!0),s(a)};return t.jsxs($,{className:"container-fluid",children:[x&&t.jsx(V,{}),t.jsx("div",{className:"row",children:r.length>0?t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"overflow-scroll",children:t.jsxs("table",{className:"table align-middle table-striped",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("td",{className:"textWrapClass font14",children:"#"}),t.jsx("td",{className:"textWrapClass font14",children:"Notice Details"}),t.jsx("td",{className:"textWrapClass font14",children:"Date"}),t.jsx("td",{className:"textWrapClass font14 text-center",children:"Actions"})]})}),t.jsxs("tbody",{children:[t.jsx("tr",{}),r.map((a,l)=>t.jsxs("tr",{children:[t.jsx("td",{className:"font14 textWrapClass greyText",children:l+1}),t.jsx("td",{className:"font14 textWrapClass greyText",children:a.noticeTitle}),t.jsx("td",{className:"font14 textWrapClass greyText",children:a.noticeDate}),t.jsx("td",{className:"font14 textWrapClass text-center",children:t.jsx("button",{className:"btn viewBtn font12",onClick:()=>B(a.noticeId),children:" View "})})]},a.noticeId))]})]})}),t.jsxs("div",{className:"d-flex",children:[t.jsxs("p",{className:"font14",children:["Showing ",u," of ",j," Pages"]}),t.jsx("div",{className:"ms-auto",children:t.jsx(F,{previousLabel:t.jsx(y,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:t.jsx(y,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:j,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:C,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):t.jsx(t.Fragment,{children:t.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:t.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})})})]})},G=A.div`

    .backBtn{
        border: 1px solid var(--viewBtn) !important;
        color: var(--breadCrumTextColor) !important;
    }

`,J=({dataId:o,viewAllState:s})=>{const n=localStorage.getItem("token"),[x,i]=c.useState(!1),[r,m]=c.useState(""),[u,S]=c.useState(""),[j,T]=c.useState(""),[w,I]=c.useState("");c.useEffect(()=>{D()},[n]);const D=async()=>{var C,B,a,l,h,v,g,b,f,N,d,W,L;try{i(!0);var e=await H(o);(e==null?void 0:e.status)===200?((C=e==null?void 0:e.data)==null?void 0:C.status)==="success"?(m((a=(B=e==null?void 0:e.data)==null?void 0:B.notice)==null?void 0:a.noticeTitle),S((h=(l=e==null?void 0:e.data)==null?void 0:l.notice)==null?void 0:h.noticeDate),T((g=(v=e==null?void 0:e.data)==null?void 0:v.notice)==null?void 0:g.noticeTime),I((f=(b=e==null?void 0:e.data)==null?void 0:b.notice)==null?void 0:f.description),i(!1)):P.error((N=e==null?void 0:e.data)==null?void 0:N.message):P.error((d=e==null?void 0:e.data)==null?void 0:d.message)}catch(k){i(!1),i(!1),((L=(W=k==null?void 0:k.response)==null?void 0:W.data)==null?void 0:L.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},R=e=>{s(!0)};return t.jsxs(G,{className:"container-fluid",children:[x&&t.jsx(V,{}),t.jsx("div",{className:"row overflow-scroll",children:t.jsxs("div",{className:"d-flex",children:[t.jsxs("div",{className:"flex-grow-1",children:[t.jsx("p",{className:"font20",children:r}),t.jsxs("p",{className:"font12 greyText",children:[u," ",j]})]}),t.jsx("button",{className:"btn backBtn p-2",type:"button",children:t.jsxs("div",{className:"d-flex",onClick:R,children:[t.jsx(y,{className:"align-self-center",icon:"weui:back-filled",width:"1.3em",height:"1.3em",style:{color:"#134563"}}),t.jsx("span",{className:"font14 align-self-center",children:"Back"})]})})]})}),t.jsx("hr",{}),t.jsx("div",{className:"row",children:t.jsx("p",{className:"font14",children:w})}),t.jsx(z,{})]})},K=A.div`
    
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

    .viewBtn{
        border: 1px solid var(--viewBtn);
        color: #000;
        background-color: var(--viewBtn);
        border-radius: var(--borderRadius5px);
    }

    .viewBtn:active, .viewBtn:hover{
        border: 1px solid var(--viewBtn);
        color: #000;
        background-color: var(--viewBtn);
        border-radius: var(--borderRadius5px);
    }
    
`,O=()=>{const[o,s]=c.useState(!0),[n,x]=c.useState(""),i=()=>{s(!1)},r=()=>{s(!0)},m=u=>{x(u)};return t.jsxs(K,{className:"container-fluid p-4 overflow-scroll",children:[t.jsxs("div",{className:"row pb-3",children:[t.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:t.jsxs("ol",{className:"breadcrumb mb-1",children:[t.jsxs("li",{className:"breadcrumb-item",children:[t.jsx(_,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),t.jsx(y,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),t.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Notice"})]})}),t.jsx("p",{className:"font14 ps-0 fw-bolder",children:"Notice Details"})]}),t.jsx("div",{className:"row p-3 bg-white borderRadius5 pb-5",children:o?t.jsx(q,{viewState:i,dataById:m}):t.jsx(J,{dataId:n,viewAllState:r})})]})};export{O as default};
