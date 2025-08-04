import{u as g,a as p,j as e,L as h,c as f,p as N,_ as n}from"./index-DHII64NA.js";import{u as j}from"./index.esm-ByE6_xdu.js";const v=g.div`
  height: 92vh;
  
.table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
}
  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }

  .headingbg{
    background-color: var(--headingBackgroundColor);
    border-radius: 5px;
  }

  .card{
    border: none;
  }

  .form-control, .form-control::placeholder, .form-select{
    font-size: var(--font-size-14) !important;
    color: var(--greyInputTextColor);
    
  }

  .form-control, .form-select{
    background-color: #fff !important;
    box-shadow: none !important;
    border-color: var(--greyInputborderColor);
  }

  .form-control:focus, .form-select:focus{
    box-shadow: none !important;
    border-color: var(--greyInputborderColor);
  }

  .formcontrolFile{
    color: Black;
  }

`,I=()=>{var l,o,c;const d=p(),{register:s,handleSubmit:x,formState:{errors:a}}=j(),b=async t=>{var i,m,u;try{const r=await N(t);(r==null?void 0:r.status)===200&&((i=r==null?void 0:r.data)==null?void 0:i.status)==="success"?(n.success((m=r==null?void 0:r.data)==null?void 0:m.message),setTimeout(()=>d("/superadmin/addon/allAddons"),1e3)):n.error(((u=r==null?void 0:r.data)==null?void 0:u.message)||"Something went wrong")}catch{setloaderState(!1),n.error("Invalid request")}};return e.jsx(e.Fragment,{children:e.jsx(v,{children:e.jsxs("div",{className:"container-fluid ps-3 pe-3 pt-2 pb-2",children:[e.jsxs("div",{className:"row pt-3 pb-3",children:[e.jsx("nav",{className:"breadcrumnav","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx(h,{to:"/",className:"greyText text-decoration-none",children:e.jsx("h2",{children:"Home > "})})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx(h,{to:"/superadmin/addon/allAddons",className:"greyText text-decoration-none",children:e.jsx("h2",{children:"Addon > "})})}),e.jsx("li",{className:"breadcrumb-item active greenText","aria-current":"page",children:e.jsx("h2",{children:" Add Addon"})})]})}),e.jsx("h2",{children:"Add Addon"})]}),e.jsx("div",{className:"cardradius bg-white p-3",children:e.jsxs("form",{onSubmit:x(b),children:[e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-md-4 col-sm-12",children:[e.jsx("label",{htmlFor:"FeatureName",className:"form-label greyText",children:"Feature Name"}),e.jsx("input",{type:"text",placeholder:"Enter Feature Name",className:`form-control ${a.featureName?"border-danger":""}`,...s("featureName",{required:"Feature Name is required",minLength:{value:3,message:"Minimum length is 3"},validate:t=>/^[A-Z]/.test(t)?t.length<3?"Minimum Length is 3":/^[a-zA-Z\s'-]+$/.test(t)?!0:"Invalid Characters in Feature Name":"Feature Name must start with an uppercase letter"})}),e.jsx("span",{className:"text-danger",children:(l=a.featureName)==null?void 0:l.message})]}),e.jsxs("div",{className:"col-md-4 col-sm-12",children:[e.jsx("label",{htmlFor:"Status",className:"form-label greyText",children:"Status"}),e.jsxs("select",{className:`form-select ${a.status?"border-danger":""}`,...s("status",{required:"Status is required"}),children:[e.jsx("option",{value:"",children:"-- Select --"}),e.jsx("option",{value:"true",children:"Active"}),e.jsx("option",{value:"false",children:"Inactive"})]}),e.jsx("span",{className:"text-danger",children:(o=a.status)==null?void 0:o.message})]}),e.jsxs("div",{className:"col-md-4 col-sm-12",children:[e.jsx("label",{htmlFor:"IdentityName",className:"form-label greyText",children:"Identity Name"}),e.jsx("input",{type:"text",placeholder:"Enter Identity Name",className:`form-control ${a.featureIdentity?"border-danger":""}`,...s("featureIdentity",{required:"Identity Name is required",pattern:{value:/^[A-Za-z0-9\s]+$/,message:"Invalid characters"}})}),e.jsx("span",{className:"text-danger",children:(c=a.featureIdentity)==null?void 0:c.message})]})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons2 text-white",type:"submit",children:"Add Addon"}),e.jsx("button",{className:"btn cancelButtons ms-3",type:"button",onClick:()=>d("/superadmin/addon/allAddons"),children:"Cancel"})]})]})}),e.jsx(f,{})]})})})};export{I as default};
