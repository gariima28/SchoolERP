import{u as q,a as U,r,m as Z,j as e,D as y,L as C,R as $,I as S,c as J,n as K,_ as F,o as O}from"./index-DHII64NA.js";import{u as Q}from"./index.esm-ByE6_xdu.js";import{A as X}from"./ActionControls-BF7LUwxs.js";const Y=q.div`

.table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
}
  
  .table-striped>tbody>tr:nth-of-type(odd)>* {
      --bs-table-bg-type: var(--tableGreyBackgroundColor);
  }

  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }

  .eventablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
  }

  .greyText{
    color: var(--greyInputTextColor);
  }

  .successText{
    color: var(--darkGreenBorderColor);
  }

  .form-control, .form-select{
    box-shadow: none !important;
    border: 1px solid var(--greyInputborderColor);
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

  .form-check-input{
    box-shadow: none ;
  }

  .formdltcheck:checked{
    background-color: #B50000;
    border-color: #B50000;
  }

  .formEditSpecFeatcheck:checked{
    background-color: #00A67E;
    border-color: #00A67E;
  }
  
  .modalHighborder{
    border-bottom: 2px solid var(--modalBorderColor);
  }

  .modalLightBorder{
    border-bottom: 1px solid var(--modalBorderColor);
  }

  .correvtSVG{
    position: relative;
    width: fit-content ;
    margin-left: 43% !important;
    margin-bottom: -16% !important;
    background-color: #2BB673;
    width: 73px;
    height: 73px;
    align-items: center;
  }

  .deleteSVG{
    position: relative;
    width: fit-content ;
    margin-left: 43% !important;
    margin-bottom: -18% !important;
    background-color: #fff;
  }
  
  .warningHeading{
    font-size: var(--font-size-20);
  }

  .warningText{
    font-size: var(--font-size-15);
    line-height: 22px;
    color: var(--greyInputTextColor) !important;
  }

  .textVerticalCenter{
    line-height: 22px;
  }
  
  .form-check-input{
    width: 18px;
    height: 18px;
  }

  .formcontrolinput{
    border-radius: 0px !important;
  }

  .contbtn{
    margin-left: 43% !important;
    margin-top: -20% !important;
  }

  .greydiv{
    background-color: #FBFBFB;
  }
  .for-margin-top{
    margin-top: -6px;
  }


`,ce=()=>{var w;const u=U(),A=sessionStorage.getItem("token"),[x,s]=r.useState(!1),[ee,k]=r.useState(!0),[te,B]=r.useState(!0),[E,I]=r.useState("");r.useState(""),r.useState(!1);const[g,T]=r.useState([]),[b,ae]=r.useState(""),{register:P,handleSubmit:W,formState:{errors:f},setValue:D}=Q(),[p,L]=r.useState(1),[j,z]=r.useState(1),[v,V]=r.useState(1),[N,re]=r.useState(10);r.useEffect(()=>{h(b)},[A,v]);const G=a=>{V(a.selected+1)},h=async a=>{var o,l,c,d,i,n;try{s(!0);var t=await Z(a==="search"?"":a,v,N);(t==null?void 0:t.status)===200&&((o=t==null?void 0:t.data)==null?void 0:o.status)==="success"?(s(!1),T((l=t==null?void 0:t.data)==null?void 0:l.addons),L((c=t==null?void 0:t.data)==null?void 0:c.currentPage),z((d=t==null?void 0:t.data)==null?void 0:d.totalPages),setTimeout(()=>{k(!0),B(!0)},1200)):s(!1)}catch(m){s(!1),s(!1),console.error("Error fetching student data:",m),((n=(i=m==null?void 0:m.response)==null?void 0:i.data)==null?void 0:n.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{u("/")},200))}},H=async a=>{var o,l,c;try{const d={featureName:a.newFeatureName};var t=await K(E,d);(t==null?void 0:t.status)===200&&(((o=t==null?void 0:t.data)==null?void 0:o.status)==="success"?(F.success((l=t==null?void 0:t.data)==null?void 0:l.message),setTimeout(async()=>{await h("");const i=document.getElementById("Edit_Feature"),n=bootstrap.Offcanvas.getInstance(i);n&&n.hide()},700)):F.error((c=t==null?void 0:t.data)==null?void 0:c.message))}catch{s(!1)}},_=async a=>{var o,l,c;I(a);try{var t=await O(a);(t==null?void 0:t.status)===200&&((o=t==null?void 0:t.data)==null?void 0:o.status)==="success"&&D("newFeatureName",(c=(l=t==null?void 0:t.data)==null?void 0:l.features)==null?void 0:c.featureName)}catch{s(!1),s(!1)}};r.useState(!0);const R=()=>{h(b)},M=()=>{u("/superadmin/addon/addAddon")};return e.jsx(e.Fragment,{children:e.jsxs(Y,{children:[x&&e.jsx(y,{}),e.jsxs("div",{className:"container-fluid ps-3 pe-3 pt-2 pb-2",children:[e.jsxs("div",{className:"row pt-2",children:[e.jsxs("div",{className:"col-xl-6 col-lg-5 col-md-5 col-sm-12 flex-grow-1",children:[e.jsx("div",{className:"row",children:e.jsx("nav",{className:"breadcrumnav","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx(C,{to:"/",className:"greyText text-decoration-none",children:e.jsx("h2",{children:"Home > "})})}),e.jsx("li",{className:"breadcrumb-item active greenText","aria-current":"page",children:e.jsx("h2",{children:" Addons"})})]})})}),e.jsx("div",{className:"row mb-3 for-margin-top",children:e.jsx("h2",{children:"Manage Addons"})})]}),e.jsx("div",{className:"col-xl-6 col-lg-7 col-md-7 col-sm-12 mb-lg-0 mb-md-0 mb-3",children:e.jsx(X,{showAddButton:!0,addButtonText:"Add Addon",addButtonAction:M,showSearch:!0,searchAction:R,showExportPDF:!1,exportPDFText:"Export PDF",exportPDFAction:"",showExportCSV:!1,exportCSVText:"Export CSV",exportCSVAction:""})})]}),e.jsx("div",{className:"row ps-2 pe-2",children:e.jsx("div",{className:" cardradius bg-white p-3",children:g.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-scroll",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"textWrapClass",children:e.jsx("h2",{children:"#"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("h2",{children:"Feature Name"})}),e.jsx("th",{className:"textWrapClass text-center",children:e.jsxs("h2",{children:["Status ",e.jsx("img",{src:"/images/StatusArrow.svg",alt:""})]})}),e.jsx("th",{className:"textWrapClass text-end",children:e.jsx("h2",{children:"Action"})})]})}),e.jsx("tbody",{children:g.map((a,t)=>e.jsxs("tr",{children:[e.jsx("th",{className:"textWrapClass greyText",children:e.jsx("h3",{children:t+1+(p-1)*N})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:a.featureName})}),e.jsx("td",{className:"textWrapClass text-center",children:a.status?e.jsx("h3",{className:"activeText textWrapClass",children:" Active "}):e.jsx("h3",{className:"deactiveText textWrapClass",children:" InActive "})}),e.jsx("td",{className:"textWrapClass text-end",children:e.jsxs("div",{className:"dropdown",children:[e.jsx("button",{className:"btn btn-sm actionButtons dropdown-toggle",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false",children:e.jsx("span",{children:"Action"})}),e.jsx("ul",{className:"dropdown-menu",children:e.jsx("li",{className:"p-0",children:e.jsx("button",{className:"dropdown-item greyText font14",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Edit_Feature","aria-controls":"Edit_Feature",onClick:()=>_(a==null?void 0:a.planFeatureId),children:"Edit Feature"})})})]})})]},a.planFeatureId))})]})}),e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",p," of ",j," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx($,{previousLabel:e.jsx(S,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(S,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:j,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:G,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):e.jsx("div",{className:"h-100 text-center m-5",children:e.jsx("img",{src:"/images/search.svg",style:{height:"40vh"}})})})}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Edit_Feature","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header modalHighborder p-1",children:[e.jsx(C,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Edit Feature Name"})]}),e.jsxs("div",{className:"offcanvas-body p-0",children:[x&&e.jsx(y,{}),e.jsx("div",{style:{zIndex:-1},children:e.jsx("div",{className:"p-3",children:e.jsxs("form",{onSubmit:W(H),children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"FeatureName",className:"form-label greyText font14",children:"Feature Name"}),e.jsx("input",{type:"text",className:`form-control p-2 formcontrolinput ${f.newFeatureName?"border border-danger":""}`,id:"FeatureName",...P("newFeatureName",{required:"Feature Name is required",validate:a=>/^[A-Z]/.test(a)?a.length<3?"Minimum Length is 3":/^[a-zA-Z\s'-]+$/.test(a)?!0:"Invalid Characters in Feature Name":"Feature Name must start with an uppercase letter"})}),e.jsx("span",{className:"text-danger",children:(w=f.newFeatureName)==null?void 0:w.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn updateButtons text-white",type:"submit",children:"Update"}),e.jsx("button",{className:"btn cancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",type:"button",children:"Cancel"})]})]})})})]})]}),e.jsx(J,{})]})]})})};export{ce as default};
