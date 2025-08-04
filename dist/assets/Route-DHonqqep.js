import{u as Y,a as Q,r as s,aj as X,_ as o,j as t,D as b,R as tt,I as D,L as R,aI as et,aJ as at,aK as rt}from"./index-DHII64NA.js";import{u as ot}from"./index.esm-ByE6_xdu.js";import{A as st}from"./ActionControls-BF7LUwxs.js";const lt=Y.div`
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

`,mt=()=>{const p=Q(),S=sessionStorage.getItem("token"),[g,r]=s.useState(!1),[v,A]=s.useState([]),[j,I]=s.useState("");s.useState([]);const[E,T]=s.useState(""),[P,F]=s.useState(""),[N,w]=s.useState(!1),[L,V]=s.useState(1),[C,_]=s.useState(1),[y,B]=s.useState(1),[z,ct]=s.useState(10),{register:H,handleSubmit:W,formState:{errors:f},setValue:G}=ot({mode:"onChange"});s.useEffect(()=>{u()},[S,y]);const O=e=>{B(e.selected+1)},u=async()=>{var a,l,c,m,i,d,n,h;try{r(!0);var e=await X(j,y,z);(e==null?void 0:e.status)===200?((a=e==null?void 0:e.data)==null?void 0:a.status)==="success"?(r(!1),A((l=e==null?void 0:e.data)==null?void 0:l.routes),V((c=e==null?void 0:e.data)==null?void 0:c.currentPage),_((m=e==null?void 0:e.data)==null?void 0:m.totalPages)):(r(!1),o.error((i=e==null?void 0:e.data)==null?void 0:i.message)):(r(!1),o.error((d=e==null?void 0:e.data)==null?void 0:d.message))}catch(x){r(!1),r(!1),console.error("Error during get All:",x),o.error("Error during get All:",x),((h=(n=x==null?void 0:x.response)==null?void 0:n.data)==null?void 0:h.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{p("/")},200))}},M=async e=>{var l,c,m,i,d;r(!0);try{T(e);var a=await et(e);(a==null?void 0:a.status)===200?((l=a==null?void 0:a.data)==null?void 0:l.status)==="success"?(r(!1),G("routeName",(m=(c=a==null?void 0:a.data)==null?void 0:c.route)==null?void 0:m.routeName)):(r(!1),o.error((i=a==null?void 0:a.data)==null?void 0:i.message)):(r(!1),o.error((d=a==null?void 0:a.data)==null?void 0:d.message))}catch(n){r(!1),r(!1),console.error("Error during Get By Id:",n),o.error("Error during Get By Id:",n)}},q=async e=>{var l,c,m;r(!0);try{const i=new FormData;i.append("routeName",e==null?void 0:e.routeName);var a=await at(E,i);if((a==null?void 0:a.status)===200)if(a.data.status==="success"){r(!1),o.success((l=a==null?void 0:a.data)==null?void 0:l.message),u();const d=document.getElementById("Edit_staticBackdrop");if(d){let n=bootstrap.Offcanvas.getInstance(d);n||(n=new bootstrap.Offcanvas(d)),n.hide();const h=document.querySelector(".offcanvas-backdrop");h&&h.remove()}}else r(!1),o.error((c=a==null?void 0:a.data)==null?void 0:c.message);else r(!1),o.error((m=a==null?void 0:a.data)==null?void 0:m.message)}catch(i){r(!1),r(!1),console.error("Error during update:",i),o.error("Error during update:",i)}},K=async e=>{if(N)try{const a=await rt(e);(a==null?void 0:a.status)===200&&a.data.status==="success"?(o.success(a.data.message),u(),setTimeout(()=>{const l=document.getElementById("Delete_staticBackdrop");if(l){let c=bootstrap.Offcanvas.getInstance(l);c||(c=new bootstrap.Offcanvas(l)),c.hide()}w(!1)},400)):o.error((a==null?void 0:a.error)||"Something went wrong")}catch(a){r(!1),console.error("Error during deletion:",a),o.error("An error occurred while deleting the route")}else o.error("You must agree to delete the Route Data")},$=()=>{p("/admin/transport/route/addRoute")},U=e=>{I(e),B(1)},[k,Z]=s.useState(null),J=e=>{Z(k===e?null:e)};return t.jsx(t.Fragment,{children:t.jsxs(lt,{children:[g&&t.jsx(b,{}),t.jsxs("div",{className:"container-fluid p-4",children:[t.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[t.jsxs("div",{className:"col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ",children:[t.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:t.jsxs("ol",{className:"breadcrumb mb-1",children:[t.jsx("li",{className:"breadcrumb-item",children:t.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),t.jsx("li",{className:"breadcrumb-item",children:t.jsx("a",{href:"/admin/transport/route",className:"bredcrumText text-decoration-none",children:"Transport"})}),t.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Route"})]})}),t.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Route List"})]}),t.jsx("div",{className:"col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0",children:t.jsx(st,{showAddButton:!0,addButtonText:"Add Route",addButtonAction:$,showExportPDF:!1,exportPDFText:"Export PDF",exportPDFAction:"",exportPDFFileName:"Routes.pdf",showExportCSV:!1,exportCSVText:"Export CSV",exportCSVAction:"",exportCSVFileName:"Routes.xlsx",showSearch:!0,searchValue:j,searchAction:u,onSearchChange:U})})]}),t.jsx("div",{className:"row pb-3 pe-0",children:t.jsx("div",{className:" cardradius bg-white p-3",children:v.length>0?t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"overflow-scrolling",children:t.jsxs("table",{className:"table align-middle table-striped w-100",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{className:"textWrapClass",children:t.jsx("h2",{children:"#"})}),t.jsx("th",{className:"textWrapClass",children:t.jsx("h2",{children:"Name"})}),t.jsx("th",{className:"text-end textWrapClass",children:t.jsx("h2",{children:"Action"})})," "]})}),t.jsx("tbody",{children:v.map((e,a)=>t.jsxs("tr",{className:"my-bg-color align-middle",children:[t.jsx("th",{className:"textWrapClass greyText",children:t.jsx("h3",{children:a+1})}),t.jsx("td",{className:"textWrapClass greyText",children:t.jsx("h3",{children:e.routeName})}),t.jsx("td",{className:"textWrapClass text-end",style:{minWidth:"120px",position:"relative"},children:t.jsxs("div",{className:"dropdown dropdownbtn",children:[t.jsx("button",{className:"btn btn-sm actionButtons dropdown-toggle",type:"button",onClick:()=>J(a),children:t.jsx("span",{children:"Action"})}),t.jsxs("ul",{className:`dropdown-menu dropdown-menu-end ${k===a?"show":""}`,style:{position:"absolute",right:0},children:[t.jsx("li",{children:t.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Edit_staticBackdrop","aria-controls":"Edit_staticBackdrop",onClick:()=>M(e.routeId),children:"Edit"})}),t.jsx("li",{children:t.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Delete_staticBackdrop","aria-controls":"Delete_staticBackdrop",onClick:()=>F(e.routeId),children:"Delete"})})]})]})})]},e.routeId))})]})}),t.jsxs("div",{className:"d-flex",children:[t.jsxs("p",{className:"font14",children:["Showing ",L," of ",C," Pages"]}),t.jsx("div",{className:"ms-auto",children:t.jsx(tt,{previousLabel:t.jsx(D,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:t.jsx(D,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:C,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:O,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):t.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:t.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})})})]}),t.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Edit_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[t.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-1",children:[t.jsx(R,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:u,children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:t.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),t.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Route Edit"})]}),t.jsxs("div",{className:"offcanvas-body p-0",children:[g&&t.jsx(b,{}),t.jsx("div",{className:"",style:{zIndex:-1},children:t.jsx("div",{className:"p-3",children:t.jsxs("form",{onSubmit:W(q),children:[t.jsxs("div",{className:"mb-3",children:[t.jsx("label",{htmlFor:"routeName",className:"form-label font14",children:"Route"}),t.jsx("input",{id:"routeName",type:"text",className:`form-control font14 ${f.routeName?"border-danger":""}`,placeholder:"Enter Route Name",...H("routeName",{required:"Route Name is required *",validate:e=>/^[A-Z]/.test(e)?e.length<4?"Minimum Length is 4":/^[a-zA-Z\s'-]+$/.test(e)?!0:"Invalid Characters in Route Name":"Route Name must start with an uppercase letter"})}),f.routeName&&t.jsx("p",{className:"font12 text-danger",children:f.routeName.message})]}),t.jsxs("p",{className:"text-center p-3",children:[t.jsx("button",{className:"btn addButtons text-white",type:"submit",children:"Update Route"}),t.jsx("button",{className:"btn cancelButtons ms-3",type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:"Cancel"})]})]})})})]})]}),t.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Delete_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[t.jsxs("div",{className:"offcanvas-header ps-0 modalHighborder p-1",children:[t.jsx(R,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:u,children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:t.jsx("path",{fill:"#B50000",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),t.jsx("span",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Route"})]}),t.jsxs("div",{className:"offcanvas-body p-0",children:[g&&t.jsx(b,{}),t.jsxs("div",{className:"",style:{zIndex:-1},children:[t.jsx("p",{className:"modalLightBorder p-2",children:"Route"}),t.jsx("p",{className:"text-center p-3",children:t.jsx("img",{src:"/images/errorI.svg",className:"img-fluid",alt:""})}),t.jsx("p",{className:"text-center warningHeading",children:"Are you Sure?"}),t.jsxs("p",{className:"text-center greyText warningText pt-2",children:["This action will permanently delete ",t.jsx("br",{})," the Route Data."]}),t.jsxs("p",{className:"text-center warningText p-2",children:[t.jsx("input",{className:"form-check-input formdltcheck me-2",type:"checkbox",checked:N,onChange:e=>w(e.target.checked)})," I Agree to delete the Profile Dat "]}),t.jsxs("p",{className:"text-center p-3",children:[t.jsx("button",{className:"btn deleteButtons text-white",onClick:()=>K(P),children:" Delete "}),t.jsx("button",{className:"btn dltcancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",children:" Cancel "})]})]})]})]})]})})};export{mt as default};
