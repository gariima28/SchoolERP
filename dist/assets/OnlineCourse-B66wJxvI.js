import{u as g,r as s,fD as u,j as e,D as j,L as m,I as v}from"./index-DHII64NA.js";const N=g.div`

    .subjectName{
        background-color: #E1EDEB;
        padding: 0.7rem;
    }

    .cards{
        border : 1px solid var(--cardsBorder);
        background-color: #fff;
        border-radius: var(--borderRadius10px);
    }

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

    .card{
        padding: 0%;
        border: 1px solid ;
    }

    .card-header {
        background-color: white !important;
        border-bottom: none !important;
    }

    .subjectButton{
        background-color: var(--borderSidebar);
    }

    .continueLesson{
        background-color: var(--greenTextColor);
        border-radius: var(--borderRadius17px);
    }

`,C=()=>{const x=sessionStorage.getItem("token"),[b,r]=s.useState(!1),[l,f]=s.useState([]);s.useEffect(()=>{h()},[x]);const h=async()=>{var i,d,n,c,o;try{r(!0);var a=await u();(a==null?void 0:a.status)===200?((i=a==null?void 0:a.data)==null?void 0:i.status)==="success"?(r(!1),f((d=a==null?void 0:a.data)==null?void 0:d.courses)):(r(!1),toast.error((n=a==null?void 0:a.data)==null?void 0:n.message)):r(!1)}catch(t){r(!1),r(!1),((o=(c=t==null?void 0:t.response)==null?void 0:c.data)==null?void 0:o.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}};return e.jsxs(N,{className:"container-fluid p-3 overflow-scroll",children:[b&&e.jsx(j,{}),e.jsxs("div",{className:"row pb-2 ps-3 pt-2",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsxs("li",{className:"breadcrumb-item",children:[e.jsx(m,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),e.jsx(v,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Online Course"})]})}),e.jsx("p",{className:"font14 ps-0 fw-bolder",children:"Online Course Details"})]}),e.jsx("div",{className:"row",children:l.length>0?e.jsx(e.Fragment,{children:l.map(a=>e.jsx("div",{className:"col-sm-6 col-12",children:e.jsx("div",{className:"row p-2",children:e.jsxs("div",{className:"col-12 cards h-100 overflow-hidden",children:[e.jsx("div",{className:"row",children:e.jsxs("div",{className:"d-flex p-0",children:[e.jsx("div",{className:"flex-grow-1 p-2 ps-3 align-self-center",children:e.jsx("p",{className:"font14 align-self-center",children:a==null?void 0:a.courseName})}),e.jsx("div",{className:"align-self-center",children:e.jsx("span",{className:"font14 subjectName",children:a==null?void 0:a.courseName})})]})}),e.jsx("div",{className:"row pt-3",children:e.jsx("img",{className:"img-fluid",src:a==null?void 0:a.courseImage,alt:a==null?void 0:a.courseName})}),e.jsx("div",{className:"row p-4",children:e.jsx("p",{className:"text-center",children:e.jsx(m,{className:"btn continueLesson ps-3 pe-3 text-white font12",to:a==null?void 0:a.courseFile,target:"_blank",rel:"noopener noreferrer",children:"Continue Lesson"})})})]})})}))}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})})})]})};export{C as default};
