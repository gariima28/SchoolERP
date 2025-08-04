import{u as f,r as c,fM as g,_ as N,j as e,D as p,L as C,I as d,c as v}from"./index-DHII64NA.js";const y=f.div`
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

    .greenText{
        color: var(--greenTextColor);
    }

    .table td {
        border-right: 0.3px solid #dee2e6;
    }

    .table-striped>thead>tr>* {
        --bs-table-bg-type: #F2F3F6;
    }

    .table-striped>tbody>tr:nth-of-type(odd)>* {
        --bs-table-bg-type: #FFF9F6;
    }

    .table-striped>tbody>tr>* {
       padding-top: 2%;
       padding-bottom: 2%;
    }

    
`,w=()=>{const m=sessionStorage.getItem("token"),[h,s]=c.useState(!1),[i,j]=c.useState([]);c.useEffect(()=>{u()},[m]);const b="",u=async()=>{var l,t,o,n,x;try{s(!0);var a=await g(b);(a==null?void 0:a.status)===200?((l=a==null?void 0:a.data)==null?void 0:l.status)==="success"?(s(!1),j((t=a==null?void 0:a.data)==null?void 0:t.timetable)):(s(!1),N.error((o=a==null?void 0:a.data)==null?void 0:o.message)):s(!1)}catch(r){s(!1),s(!1),((x=(n=r==null?void 0:r.response)==null?void 0:n.data)==null?void 0:x.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}};return e.jsxs(y,{className:"container-fluid p-4 overflow-scroll",children:[h&&e.jsx(p,{}),e.jsxs("div",{className:"row pb-3",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsxs("li",{className:"breadcrumb-item",children:[e.jsx(C,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),e.jsx(d,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Class Routine"})]})}),e.jsx("p",{className:"font14 ps-0 fw-bolder",children:"Class Routine Details"})]}),e.jsxs("div",{className:"row p-3 bg-white borderRadius5 pb-5",children:[i.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"col-12 p-0",children:e.jsxs("div",{className:"row pb-3",children:[e.jsx("div",{className:"col-md-4 col-6",children:e.jsx("p",{className:"greenText",children:"Class Routine Details"})}),e.jsx("div",{className:"col-md-4 col-6 text-center",children:e.jsxs("span",{className:"fw-bolder",children:[e.jsx(d,{className:"pointer",icon:"mingcute:left-fill",width:"2.5em",height:"1.5em",style:{color:"#000"}}),"20 May - 26 May",e.jsx(d,{className:"pointer",icon:"mingcute:right-fill",width:"2.5em",height:"1.5em",style:{color:"#000"}})]})}),e.jsx("div",{className:"col-md-4 col-12"})]})}),e.jsx("div",{className:"overflow-scroll",children:e.jsxs("table",{className:"table align-middle table-striped table-bordered",children:[e.jsxs("thead",{children:[e.jsx("tr",{}),e.jsxs("tr",{children:[e.jsx("td",{className:"textWrapClass font14"})," ",e.jsx("td",{className:"textWrapClass font14",children:"9 - 9.45 AM"}),e.jsx("td",{className:"textWrapClass font14",children:"10 - 10.45 AM"}),e.jsx("td",{className:"textWrapClass font14",children:"11 - 11.45 AM"}),e.jsx("td",{className:"textWrapClass font14",children:"12 - 12.45 AM"}),e.jsx("td",{className:"textWrapClass font14",children:"1 - 1.45 AM"}),e.jsx("td",{className:"textWrapClass font14",children:"2 - 2.45 AM"}),e.jsx("td",{className:"textWrapClass font14",children:"3 - 3.45 AM"}),e.jsx("td",{className:"textWrapClass font14",children:"4 - 4.45 AM"})]})]}),e.jsxs("tbody",{children:[e.jsx("tr",{}),i.map((a,l)=>e.jsxs("tr",{children:[e.jsx("td",{className:"textWrapClass font14",children:a==null?void 0:a.day}),(a==null?void 0:a.timetable).map(t=>e.jsxs("td",{className:"textWrapClass font14",children:[e.jsxs("p",{className:"text-center greyText",children:["Class - ",t.section]}),e.jsx("p",{className:"text-center",children:t.subject})]}))]},l))]})]})})]}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid"})})}),e.jsx(v,{})]})]})};export{w as default};
