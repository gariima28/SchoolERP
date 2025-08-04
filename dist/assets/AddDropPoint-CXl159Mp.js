import{u as C,a as A,r as x,aj as w,_ as n,j as t,c as D,aD as P}from"./index-DHII64NA.js";import{u as T}from"./index.esm-ByE6_xdu.js";const I=C.div`

  .mainBreadCrum{
    --bs-breadcrumb-divider: '>' !important;
  }

  .bredcrumText{
    color: var(--breadCrumTextColor);
  }

  .bredcrumActiveText{
    color: var(--breadCrumActiveTextColor);
  }

  .form-control::placeholder, .form-control , .form-select{
        color: var(--greyState)
    }

    .form-control , .form-select{
        border-radius: 5px ;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

  .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
      width: fit-content;
      border: 1px solid var(--breadCrumActiveTextColor);
      background-color: var(--breadCrumActiveTextColor)
  }

  .EyeViewBtnn, .EyeViewBtnn:active{
      width: fit-content;
      border: 1px solid var(--breadCrumActiveTextColor);
      background-color: var(--OrangeBtnColor)
  }

    
`,E=()=>{const u=A(),h=sessionStorage.getItem("token"),[B,r]=x.useState(!1),[b,N]=x.useState([]),{register:f,handleSubmit:g,formState:{errors:l}}=T({mode:"onChange"});x.useEffect(()=>{j()},[h]);const j=async()=>{var a,c,d,i,s,o;r(!0);try{var e=await w("","","");(e==null?void 0:e.status)===200?((a=e==null?void 0:e.data)==null?void 0:a.status)==="success"?(r(!1),N((c=e==null?void 0:e.data)==null?void 0:c.routes)):(r(!1),n.error((d=e==null?void 0:e.data)==null?void 0:d.message)):(r(!1),n.error((i=e==null?void 0:e.data)==null?void 0:i.message))}catch(m){r(!1),r(!1),console.error("Error during fetching routes:",m),((o=(s=m==null?void 0:m.response)==null?void 0:s.data)==null?void 0:o.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{u("/")},200))}},v=async e=>{var c,d,i,s;try{const o=new FormData;o.append("routeId",e==null?void 0:e.routeId),o.append("dropName",e==null?void 0:e.dropName);var a=await P(o);(a==null?void 0:a.status)===200?((c=a==null?void 0:a.data)==null?void 0:c.status)==="success"?(n.success((d=a==null?void 0:a.data)==null?void 0:d.message),setTimeout(()=>{u("/admin/transport/dropPoint")},1e3)):(r(!1),n.error((i=a==null?void 0:a.data)==null?void 0:i.message)):(r(!1),n.error((s=a==null?void 0:a.data)==null?void 0:s.message))}catch(o){r(!1),r(!1),console.error("Error during login:",o)}},p=()=>{u("/admin/transport/dropPoint")};return t.jsx(t.Fragment,{children:t.jsx(I,{children:t.jsxs("div",{className:"container-fluid p-4",children:[t.jsx("div",{className:"row",children:t.jsx("div",{className:"col-lg-7 col-md-8 col-sm-12 flex-grow-1",children:t.jsxs("div",{className:"row ps-2",children:[t.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:t.jsxs("ol",{className:"breadcrumb mb-1",children:[t.jsx("li",{className:"breadcrumb-item",children:t.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),t.jsx("li",{className:"breadcrumb-item",children:t.jsx("a",{href:"/driver",className:"bredcrumText text-decoration-none",children:"Transport"})}),t.jsx("li",{className:"breadcrumb-item",children:t.jsx("a",{href:"/dropPoint",className:"bredcrumText text-decoration-none",children:"Drop Point"})}),t.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Add Drop Point"})]})}),t.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Add Drop Point"})]})})}),t.jsx("div",{className:"row ps-2 pe-2 pt-3",children:t.jsx("div",{className:"bg-white cardradius p-3",children:t.jsxs("form",{className:"row g-3",onSubmit:g(v),children:[t.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[t.jsxs("label",{htmlFor:"dropName",className:"form-label font14",children:["Route  ",t.jsx("span",{className:"text-danger",children:"*"})]}),t.jsxs("select",{id:"routeId",className:`form-select font14 ${l.routeId?"border-danger":""}`,...f("routeId",{required:"Route selection is required *"}),children:[t.jsx("option",{value:"",children:"Select Route"}),b.map(e=>t.jsx("option",{value:e.routeId,children:e.routeName},e.routeId))]}),l.routeId&&t.jsx("p",{className:"font12 text-danger",children:l.routeId.message})]}),t.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[t.jsxs("label",{htmlFor:"dropName",className:"form-label font14",children:["Drop Point  ",t.jsx("span",{className:"text-danger",children:"*"})]}),t.jsx("input",{id:"dropName",type:"text",className:`form-control font14 ${l.dropName?"border-danger":""}`,placeholder:"Enter Drop Point Name",...f("dropName",{required:"Drop Point Name is required *",validate:e=>/^[A-Z]/.test(e)?e.length<4?"Minimum Length is 4":/^[a-zA-Z0-9\s'-]+$/.test(e)?!0:"Invalid Characters in Drop Point Name":"Drop Point Name must start with an uppercase letter"})}),l.dropName&&t.jsx("p",{className:"font12 text-danger",children:l.dropName.message})]}),t.jsxs("div",{className:"row p-3",children:[t.jsx("button",{className:"col-lg-2 col-md-3 col-sm-4 col-6 btn addCategoryButtons font16 text-white",type:"submit",children:"Add Drop Point"}),t.jsx("button",{className:"col-lg-2 col-md-3 col-sm-4 col-6 btn cancelButtons font14 ms-2",type:"button",onClick:p,children:"Cancel"})]})]})})}),t.jsx(D,{})]})})})};export{E as default};
