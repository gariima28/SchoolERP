import{u as U,a as Z,r as s,aE as $,j as t,D as p,R as W,I as B,L as y,aF as J,aG as Q,_ as n,aH as X}from"./index-DHII64NA.js";import{u as Y}from"./index.esm-ByE6_xdu.js";import{A as tt}from"./ActionControls-BF7LUwxs.js";const at=U.div`

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .eventablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
    }

    .ExportBtns{
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .oddModaltablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
        border-bottom: 1.5px solid var(--darkGreenBorderColor);
    }
    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
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

`,it=()=>{const f=Z(),C=sessionStorage.getItem("token"),[m,c]=s.useState(!1),[u,k]=s.useState([]),[b,P]=s.useState(""),[g,v]=s.useState(!1),[S,A]=s.useState(""),[I,E]=s.useState(""),[T,F]=s.useState(1),[j,L]=s.useState(1),[N,D]=s.useState(1),[H,et]=s.useState(10),{register:V,handleSubmit:_,formState:{errors:h},setValue:z}=Y({mode:"onChange"});s.useEffect(()=>{d()},[C,N]);const G=a=>{D(a.selected+1)},d=async()=>{var e,r,o,i,l,w;c(!0);try{var a=await $(b,N,H);(a==null?void 0:a.status)===200&&((e=a==null?void 0:a.data)==null?void 0:e.status)==="success"&&(c(!1),k((r=a==null?void 0:a.data)==null?void 0:r.drops),L((o=a==null?void 0:a.data)==null?void 0:o.totalPages),F((i=a==null?void 0:a.data)==null?void 0:i.currentPage))}catch(x){c(!1),((w=(l=x==null?void 0:x.response)==null?void 0:l.data)==null?void 0:w.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{f("/")},200))}},R=async a=>{var r,o,i;try{A(a);var e=await J(a);(e==null?void 0:e.status)===200&&((r=e==null?void 0:e.data)==null?void 0:r.status)==="success"&&z("dropName",(i=(o=e==null?void 0:e.data)==null?void 0:o.drops)==null?void 0:i.stopName)}catch{c(!1),c(!1)}},M=async a=>{var r;try{const o=new FormData;o.append("dropName",a==null?void 0:a.dropName);var e=await Q(S,o);if((e==null?void 0:e.status)===200){if(e.data.status==="success"){n.success((r=e==null?void 0:e.data)==null?void 0:r.message),d();const i=document.getElementById("Edit_staticBackdrop");if(i){let l=bootstrap.Offcanvas.getInstance(i);l||(l=new bootstrap.Offcanvas(i)),l.hide()}}}else n.error(e==null?void 0:e.error)}catch(o){c(!1),console.error("Error during update:",o)}},O=async a=>{if(g)try{var e=await X(a);(e==null?void 0:e.status)===200?e.data.status==="success"&&(n.success(e.data.message),d(),setTimeout(()=>{const r=document.getElementById("Delete_staticBackdrop");if(r){let o=bootstrap.Offcanvas.getInstance(r);o||(o=new bootstrap.Offcanvas(r)),o.hide()}v(!1)},400)):n.error(e==null?void 0:e.error)}catch(r){c(!1),console.error("Error during login:",r)}};s.useState(!0);const q=()=>{f("/admin/transport/dropPoint/addDropPoint")},K=a=>{P(a),D(1)};return s.useState(null),t.jsx(t.Fragment,{children:t.jsxs(at,{children:[m&&t.jsx(p,{}),t.jsxs("div",{className:"container-fluid p-4",children:[t.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[t.jsxs("div",{className:"col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ",children:[t.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:t.jsxs("ol",{className:"breadcrumb mb-1",children:[t.jsx("li",{className:"breadcrumb-item",children:t.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),t.jsx("li",{className:"breadcrumb-item",children:t.jsx("a",{href:"/admin/transport/route",className:"bredcrumText text-decoration-none",children:"Transport"})}),t.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Drop Point"})]})}),t.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Drop Point"})]}),t.jsx("div",{className:"col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0",children:t.jsx(tt,{showAddButton:!0,addButtonText:"Add Drop Point",addButtonAction:q,showExportPDF:!1,exportPDFText:"Export PDF",exportPDFAction:"",exportPDFFileName:"Drop Point.pdf",showExportCSV:!1,exportCSVText:"Export CSV",exportCSVAction:"",exportCSVFileName:"Drop Point.xlsx",showSearch:!0,searchValue:b,searchAction:d,onSearchChange:K})})]}),t.jsx("div",{className:"row pb-3 pe-0",children:t.jsx("div",{className:" cardradius bg-white p-3",children:u.length>0?t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"overflow-scroll",children:t.jsxs("table",{className:"table align-middle table-striped",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:t.jsx("h2",{children:"#"})}),t.jsx("th",{children:t.jsx("h2",{children:"Stop Name"})}),t.jsx("th",{className:"text-end",children:t.jsx("h2",{children:"Action"})})]})}),t.jsx("tbody",{children:u.map((a,e)=>t.jsxs("tr",{className:"my-bg-color align-middle",children:[t.jsx("th",{className:"greyText",children:t.jsx("h3",{children:e+1})}),t.jsx("td",{className:"greyText",children:t.jsx("h3",{children:a.stopName})}),t.jsx("td",{className:"text-end",children:t.jsxs("div",{className:"dropdown dropdownbtn",children:[t.jsx("button",{className:"btn btn-sm actionButtons dropdown-toggle",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false",children:t.jsx("span",{children:"Action"})}),t.jsxs("ul",{className:"dropdown-menu",children:[t.jsx("li",{children:t.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Edit_staticBackdrop","aria-controls":"Edit_staticBackdrop",onClick:()=>R(a.dropId),children:"Edit"})}),t.jsx("li",{children:t.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Delete_staticBackdrop","aria-controls":"Delete_staticBackdrop",onClick:()=>E(a.dropId),children:"Delete"})})]})]})})]},a.id))})]})}),t.jsxs("div",{className:"d-flex",children:[t.jsxs("p",{className:"font14",children:["Showing ",T," of ",j," Pages"]}),t.jsx("div",{className:"ms-auto",children:t.jsx(W,{previousLabel:t.jsx(B,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:t.jsx(B,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:j,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:G,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):t.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:t.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})})})]}),t.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Edit_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[t.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-1",children:[t.jsx(y,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:t.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),t.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"DropPoint Edit"})]}),t.jsxs("div",{className:"offcanvas-body p-0",children:[m&&t.jsx(p,{}),t.jsx("div",{className:"p-3",style:{zIndex:-1},children:t.jsxs("form",{onSubmit:_(M),children:[t.jsxs("div",{className:"mb-3",children:[t.jsx("label",{htmlFor:"dropName",className:"form-label greyText font14",children:"Drop Point"}),t.jsx("input",{id:"dropName",type:"text",className:`form-control font14 ${h.dropName?"border-danger":""}`,placeholder:"Enter Driver Name",...V("dropName",{required:"Drop Point Name is required *",validate:a=>/^[A-Z]/.test(a)?a.length<4?"Minimum Length is 4":/^[a-zA-Z\s'-]+$/.test(a)?!0:"Invalid Characters in Drop Point Name":"Drop Point Name must start with an uppercase letter"})}),h.dropName&&t.jsx("p",{className:"font12 text-danger",children:h.dropName.message})]}),t.jsxs("p",{className:"text-center p-3",children:[t.jsx("button",{className:"btn addButtons text-white",type:"submit",children:"Update"}),t.jsx("button",{className:"btn cancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",type:"button",children:"Cancel"})]})]})})]})]}),t.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Delete_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[t.jsxs("div",{className:"offcanvas-header ps-0 modalHighborder p-1",children:[t.jsx(y,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:t.jsx("path",{fill:"#B50000",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),t.jsx("span",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Drop Point"})]}),t.jsxs("div",{className:"offcanvas-body p-0",children:[m&&t.jsx(p,{}),t.jsxs("div",{style:{zIndex:-1},children:[t.jsx("p",{className:"modalLightBorder p-2",children:"DropPoint"}),t.jsxs("p",{className:"text-center p-3",children:[" ",t.jsx("img",{src:"/images/errorI.svg",className:"img-fluid",alt:""})]}),t.jsx("p",{className:"text-center warningHeading",children:"Are you Sure?"}),t.jsxs("p",{className:"text-center greyText warningText pt-2",children:["This Action will be permanently delete",t.jsx("br",{}),"the Drop Point Data"]}),t.jsxs("p",{className:"text-center warningText p-2",children:[t.jsx("input",{className:"form-check-input formdltcheck me-2",type:"checkbox",value:"",id:"flexCheckChecked",checked:g,onChange:a=>v(a.target.checked)}),"I Agree to delete the Drop Point Data"]}),t.jsxs("p",{className:"text-center p-3",children:[t.jsx("button",{className:"btn deleteButtons text-white",onClick:()=>O(I),children:"Delete"}),t.jsx("button",{className:"btn dltcancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",children:"Cancel"})]})]})]})]})]})})};export{it as default};
