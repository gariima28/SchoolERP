import{u as j,a as g,r as C,j as e,D as w,c as A,aC as p,_ as o}from"./index-DHII64NA.js";import{u as T}from"./index.esm-ByE6_xdu.js";const R=j.div`
  height: 92vh;

  .mainBreadCrum {
    --bs-breadcrumb-divider: '>' !important;
  }

  .bredcrumText {
    color: var(--breadCrumTextColor);
  }

  .bredcrumActiveText {
    color: var(--breadCrumActiveTextColor);
  }

  .form-control::placeholder, .form-control {
    color: var(--greyState);
  }

  .form-control {
    border-radius: 5px ;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .AddBtnn, .AddBtnn:visited, .AddBtnn:active {
    width: fit-content;
    border: 1px solid var(--breadCrumActiveTextColor);
    background-color: var(--breadCrumActiveTextColor);
  }

  .EyeViewBtnn, .EyeViewBtnn:active {
    width: fit-content;
    border: 1px solid var(--breadCrumActiveTextColor);
    background-color: var(--OrangeBtnColor);
  }

`,S=()=>{const s=g(),[h,c]=C.useState(!1),{register:b,handleSubmit:N,formState:{errors:d}}=T({mode:"onChange"}),f=async r=>{var l,i,n,m,u,x;try{const a=new FormData;a.append("routeName",r.routeName);var t=await p(a);(t==null?void 0:t.status)===200?((l=t==null?void 0:t.data)==null?void 0:l.status)==="success"?(o.success((i=t==null?void 0:t.data)==null?void 0:i.message),setTimeout(()=>{s("/admin/transport/route")},1e3)):(o.error((n=t==null?void 0:t.data)==null?void 0:n.message,"else 1"),c(!1)):(o.error((m=t==null?void 0:t.data)==null?void 0:m.message,"else 2"),c(!1))}catch(a){o.error(a),c(!1),((x=(u=a==null?void 0:a.response)==null?void 0:u.data)==null?void 0:x.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{s("/")},200))}},v=()=>{s("/admin/transport/route")};return e.jsx(e.Fragment,{children:e.jsxs(R,{children:[h&&e.jsx(w,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsx("div",{className:"row",children:e.jsx("div",{className:"col-lg-7 col-md-8 col-sm-12 flex-grow-1",children:e.jsxs("div",{className:"row ps-2",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/driver",className:"bredcrumText text-decoration-none",children:"Transport"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/route",className:"bredcrumText text-decoration-none",children:"Route"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Add Route"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Add Route"})]})})}),e.jsx("div",{className:"row ps-2 pe-2 pt-3",children:e.jsx("div",{className:"bg-white cardradius p-3",children:e.jsxs("form",{className:"row g-3",onSubmit:N(f),children:[e.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[e.jsxs("label",{htmlFor:"routeName",className:"form-label font14",children:["Route  ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"routeName",type:"text",className:`form-control font14 ${d.routeName?"border-danger":""}`,placeholder:"Enter Route Name",...b("routeName",{required:"Route Name is required *",validate:r=>/^[A-Z]/.test(r)?r.length<4?"Minimum Length is 4":/^[a-zA-Z\s'-]+$/.test(r)?!0:"Invalid Characters in Route Name":"Route Name must start with an uppercase letter"})}),d.routeName&&e.jsx("p",{className:"font12 text-danger",children:d.routeName.message})]}),e.jsxs("div",{className:"row p-3",children:[e.jsx("button",{className:"col-lg-2 col-md-3 col-sm-4 col-6 btn addButtons font16 text-white",type:"submit",children:"Add Route"}),e.jsx("button",{type:"button",className:"col-lg-2 col-md-3 col-sm-4 col-6 btn cancelButtons font14 ms-2",onClick:v,children:"Cancel"})]})]})})}),e.jsx(A,{})]})]})})};export{S as default};
