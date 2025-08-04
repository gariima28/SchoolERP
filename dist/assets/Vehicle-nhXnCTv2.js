import{u as ne,a as de,r as d,ax as he,ay as me,am as xe,aj as ue,_ as f,ak as fe,j as e,D as v,R as pe,I as D,L as B,az as be,aA as ge,aB as ve}from"./index-DHII64NA.js";import{u as Ne}from"./index.esm-ByE6_xdu.js";import"./Link-B_f3HVnI.js";import{A as je}from"./ActionControls-BF7LUwxs.js";import"./index-BKNjMPK8.js";const Ce=ne.div`

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


    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

`,Ae=()=>{const N=de(),k=sessionStorage.getItem("token"),[b,c]=d.useState(!1),[ye,V]=d.useState([]),[Se,A]=d.useState(),[j,E]=d.useState([]),[F,T]=d.useState([]),[P,M]=d.useState([]),[C,W]=d.useState(""),[R,L]=d.useState(!1),[q,z]=d.useState(1),[y,$]=d.useState(1),[S,w]=d.useState(1),[_,we]=d.useState(5),[H,G]=d.useState(""),[O,Z]=d.useState(""),{register:u,handleSubmit:K,formState:{errors:i},setValue:x,watch:U}=Ne({mode:"onChange"}),[g,J]=d.useState({}),[Q,X]=d.useState(!1),I=U();d.useEffect(()=>{const a=Object.keys(g).some(r=>g[r]!==I[r]);X(a)},[I,g]),d.useEffect(()=>{p(),se(),te(),ee(),Y()},[k,S]);const Y=async()=>{var a;try{const r=await he();(r==null?void 0:r.status)===200&&((a=r==null?void 0:r.data)==null?void 0:a.status)==="success"&&A(r==null?void 0:r.data)}catch{}},ee=async()=>{var a;try{const r=await me();if((r==null?void 0:r.status)===200){const l=(a=r==null?void 0:r.data)==null?void 0:a.split(`
`).map(t=>t.split(","));V(l)}}catch{}},ae=a=>{w(a.selected+1)},p=async()=>{var a,r,l,t,n,m;c(!0);try{const o=await xe(C,S,_);(o==null?void 0:o.status)===200&&((a=o==null?void 0:o.data)==null?void 0:a.status)==="success"&&(c(!1),E((r=o==null?void 0:o.data)==null?void 0:r.vehicles),$((l=o==null?void 0:o.data)==null?void 0:l.totalPages),z((t=o==null?void 0:o.data)==null?void 0:t.currentPage))}catch(o){c(!1),console.error("Error fetching vehicle data:",o),((m=(n=o==null?void 0:o.response)==null?void 0:n.data)==null?void 0:m.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{N("/")},200))}},te=async()=>{var a,r,l;c(!0);try{const t=await ue("","","");(t==null?void 0:t.status)===200&&((a=t==null?void 0:t.data)==null?void 0:a.status)==="success"?(c(!1),T((r=t==null?void 0:t.data)==null?void 0:r.routes)):(c(!1),f.error((l=t==null?void 0:t.data)==null?void 0:l.message))}catch(t){c(!1),c(!1),console.error("Error fetching route data:",t)}},se=async()=>{var a,r,l;c(!0);try{const t=await fe("","","");(t==null?void 0:t.status)===200&&((a=t==null?void 0:t.data)==null?void 0:a.status)==="success"?(c(!1),M((r=t==null?void 0:t.data)==null?void 0:r.drivers)):(c(!1),f.error((l=t==null?void 0:t.data)==null?void 0:l.message))}catch(t){c(!1),c(!1),console.error("Error fetching driver data:",t)}},re=async a=>{var r;if(c(!0),R)try{const l=await be(a);if((l==null?void 0:l.status)===200&&l.data.status==="success"){c(!1),f.success((r=l==null?void 0:l.data)==null?void 0:r.message);const t=document.getElementById("Delete_staticBackdrop");if(p(),t){let n=bootstrap.Offcanvas.getInstance(t);n||(n=new bootstrap.Offcanvas(t)),n.hide()}}else c(!1),f.error(l==null?void 0:l.error)}catch(l){c(!1),c(!1),console.error("Error deleting vehicle:",l)}else f.error("Firstly, agree to delete the Data"),c(!1)},le=async a=>{var r,l,t,n,m,o;c(!0);try{G(a);const h=await ge(a);if((h==null?void 0:h.status)===200&&((r=h==null?void 0:h.data)==null?void 0:r.status)==="success"){const s=(l=h==null?void 0:h.data)==null?void 0:l.vehicles;x("vehicleNo",s==null?void 0:s.vehicleNumber),x("vehicleNo",s==null?void 0:s.vehicleNumber),x("vehicleModel",s==null?void 0:s.vehicleModel),x("chassisNo",s==null?void 0:s.chassisNumber),x("driverId",(t=s==null?void 0:s.driver)==null?void 0:t.driverId),x("totalSeat",s==null?void 0:s.seatCapacity),x("routeId",(n=s==null?void 0:s.routeClass)==null?void 0:n.routeId),x("vehicleStatus",s==null?void 0:s.vehicleStatus),J({vehicleNo:s==null?void 0:s.vehicleNumber,vehicleModel:s==null?void 0:s.vehicleModel,chassisNo:s==null?void 0:s.chassisNumber,driverId:(m=s==null?void 0:s.driver)==null?void 0:m.driverId,totalSeat:s==null?void 0:s.seatCapacity,routeId:(o=s==null?void 0:s.routeClass)==null?void 0:o.routeId,vehicleStatus:s==null?void 0:s.vehicleStatus}),c(!1)}else c(!1)}catch(h){c(!1),c(!1),console.error("Error fetching vehicle data by id:",h)}},ce=async a=>{var r,l;c(!0);try{const t=new FormData;t.append("vehicleNo",a==null?void 0:a.vehicleNo),t.append("vehicleModel",a==null?void 0:a.vehicleModel),t.append("chassisNo",a==null?void 0:a.chassisNo),t.append("driverId",a==null?void 0:a.driverId),t.append("totalSeat",a==null?void 0:a.totalSeat),t.append("routeId",a==null?void 0:a.routeId),t.append("vehicleStatus",a==null?void 0:a.vehicleStatus);const n=await ve(H,t);if((n==null?void 0:n.status)===200&&n.data.status==="success"){c(!1),f.success((r=n==null?void 0:n.data)==null?void 0:r.message),p();const m=document.getElementById("Edit_staticBackdrop");if(m){let o=bootstrap.Offcanvas.getInstance(m);o||(o=new bootstrap.Offcanvas(m)),o.hide()}}else c(!1),f.error((l=n==null?void 0:n.data)==null?void 0:l.message)}catch(t){c(!1),c(!1),console.error("Error during update:",t)}};d.useState(!0);const oe=()=>{N("/admin/transport/vehicle/addVehicle")},ie=a=>{W(a),w(1)};return d.useState(null),e.jsx(e.Fragment,{children:e.jsxs(Ce,{children:[b&&e.jsx(v,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[e.jsxs("div",{className:"col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/admin/transport/route",className:"bredcrumText text-decoration-none",children:"Transport"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Vehicle"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Vehicle List"})]}),e.jsx("div",{className:"col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0",children:e.jsx(je,{showAddButton:!0,addButtonText:"Add Vehicle",addButtonAction:oe,showExportPDF:!1,exportPDFText:"Export PDF",exportPDFAction:"",exportPDFFileName:"Vehicles.pdf",showExportCSV:!1,exportCSVText:"Export CSV",exportCSVAction:"",exportCSVFileName:"Vehicles.xlsx",showSearch:!0,searchValue:C,searchAction:p,onSearchChange:ie})})]}),e.jsx("div",{className:"row pb-3 pe-0",children:e.jsx("div",{className:"cardradius bg-white p-3",children:j.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-scroll",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"#"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Vehicle Model"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Vehicle Info"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Driver Name"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Driver Contact"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Capacity"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Route"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Status"})}),e.jsx("th",{className:"text-end textWrapClass",children:e.jsx("span",{className:"font14",children:"Action"})})]})}),e.jsx("tbody",{children:j.map((a,r)=>{var l,t;return e.jsxs("tr",{className:"my-bg-color align-middle",children:[e.jsx("th",{className:"textWrapClass font14 greyText",children:r+1}),e.jsx("td",{className:"textWrapClass font14 greyText",children:a.vehicleModel}),e.jsx("td",{className:"textWrapClass font14 greyText",children:a.vehicleNumber}),e.jsx("td",{className:"textWrapClass font14 greyText",children:(l=a.driver)==null?void 0:l.driverName}),e.jsx("td",{className:"textWrapClass font14 greyText",children:(t=a.driver)==null?void 0:t.phoneNumber}),e.jsx("td",{className:"textWrapClass font14 greyText",children:a.seatCapacity}),e.jsx("td",{className:"textWrapClass font14 greyText",children:a.routeClass.routeName}),e.jsx("td",{className:`textWrapClass font14 ${a.vehicleStatus?"activeText":"deactiveText"}`,children:a.vehicleStatus?"Active":"InActive"}),e.jsx("td",{className:"textWrapClass text-end",children:e.jsxs("div",{className:"dropdown dropdownbtn",children:[e.jsx("button",{className:"btn btn-sm actionButtons dropdown-toggle",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false",children:e.jsx("span",{children:"Action"})}),e.jsxs("ul",{className:"dropdown-menu",children:[e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Edit_staticBackdrop","aria-controls":"Edit_staticBackdrop",onClick:()=>le(a.vehicleId),children:"Edit"})}),e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Delete_staticBackdrop","aria-controls":"Delete_staticBackdrop",onClick:()=>Z(a.vehicleId),children:"Delete"})})]})]})})]},a.vehicleId)})})]})}),e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",q," of ",y," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(pe,{previousLabel:e.jsx(D,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(D,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:y,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:ae,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Edit_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-1",children:[e.jsx(B,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:p,children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Vehicle Edit"})]}),e.jsxs("div",{className:"offcanvas-body p-0",children:[b&&e.jsx(v,{}),e.jsx("div",{className:"p-3",style:{zIndex:-1},children:e.jsxs("form",{onSubmit:K(ce),children:[e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"vehicleNo",className:"form-label font14",children:["Vehicle Number ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"vehicleNo",type:"text",className:`form-control font14 ${i.vehicleNo?"border-danger":""}`,placeholder:"Enter Vehicle Number",...u("vehicleNo",{required:"Vehicle Number is required *",pattern:{value:/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/,message:"Vehicle Number must follow the format (e.g., AB12CD3456)"}})}),i.vehicleNo&&e.jsx("p",{className:"font12 text-danger",children:i.vehicleNo.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"vehicleModel",className:"form-label font14",children:["Vehicle Model ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"vehicleModel",type:"text",className:`form-control font14 ${i.vehicleModel?"border-danger":""}`,placeholder:"Enter Vehicle Model",...u("vehicleModel",{required:"Vehicle Model is required *",validate:a=>/^[A-Z][a-zA-Z0-9-]*$/.test(a)?!0:"Vehicle Model must start with an uppercase letter and can only contain letters, digits, and hyphens (-)"})}),i.vehicleModel&&e.jsx("p",{className:"font12 text-danger",children:i.vehicleModel.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"chassisNo",className:"form-label font14",children:["Chassis Number ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"chassisNo",type:"text",className:`form-control font14 ${i.chassisNo?"border-danger":""}`,placeholder:"Enter Chassis Number",...u("chassisNo",{required:"Chassis Number is required *",min:{value:10,message:"Chassis Number must be of size 10"},validate:a=>/^[A-Z0-9]+$/.test(a)?!0:"Chassis Number can only contain uppercase letters and digits"})}),i.chassisNo&&e.jsx("p",{className:"font12 text-danger",children:i.chassisNo.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"driverId",className:"form-label font14",children:["Assign Driver ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"driverId",className:`form-select font14 ${i.driverId?"border-danger":""}`,...u("driverId",{required:"Driver selection is required *"}),children:[e.jsx("option",{value:"",children:"Select Driver"}),P.map(a=>e.jsx("option",{value:a.driverId,children:a.driverName},a.driverId))]}),i.driverId&&e.jsx("p",{className:"font12 text-danger",children:i.driverId.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"totalSeat",className:"form-label font14",children:["Seat Capacity ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"totalSeat",type:"number",className:`form-control font14 ${i.totalSeat?"border-danger":""}`,placeholder:"Enter Seat Capacity",...u("totalSeat",{required:"Seat Capacity is required *"})}),i.totalSeat&&e.jsx("p",{className:"font12 text-danger",children:i.totalSeat.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"routeId",className:"form-label font14",children:["Route ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"routeId",className:`form-select font14 ${i.routeId?"border-danger":""}`,...u("routeId",{required:"Route selection is required *"}),children:[e.jsx("option",{value:"",children:"Select Route"}),F.map(a=>e.jsx("option",{value:a.routeId,children:a.routeName},a.routeId))]}),i.routeId&&e.jsx("p",{className:"font12 text-danger",children:i.routeId.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"vehicleStatus",className:"form-label font14",children:["Status ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"vehicleStatus",className:`form-select font14 ${i.vehicleStatus?"border-danger":""}`,...u("vehicleStatus",{required:"Status selection is required *"}),children:[e.jsx("option",{value:"",children:"Select Status"}),e.jsx("option",{value:!0,children:"Active"}),e.jsx("option",{value:!1,children:"InActive"})]}),i.vehicleStatus&&e.jsx("p",{className:"font12 text-danger",children:i.vehicleStatus.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons2 text-white",type:"submit",disabled:!Q,children:"Update Vehicle"}),e.jsx("button",{className:"btn cancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",type:"button",children:"Cancel"})]})]})})]})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Delete_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header ps-0 modalHighborder p-1",children:[e.jsx(B,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:p,children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#B50000",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("span",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Vehicle"})]}),e.jsxs("div",{className:"offcanvas-body p-0",children:[b&&e.jsx(v,{}),e.jsxs("div",{className:"",style:{zIndex:-1},children:[e.jsx("p",{className:"modalLightBorder p-2",children:"Vehicle"}),e.jsxs("p",{className:"text-center p-3",children:[" ",e.jsx("img",{src:"/images/errorI.svg",className:"img-fluid",alt:""})]}),e.jsx("p",{className:"text-center warningHeading",children:"Are you Sure?"}),e.jsxs("p",{className:"text-center greyText warningText pt-2",children:["This Action will be permanently delete",e.jsx("br",{}),"the Vehicle Data"]}),e.jsxs("p",{className:"text-center warningText p-2",children:[e.jsx("input",{className:"form-check-input formdltcheck me-2",type:"checkbox",value:"",id:"flexCheckChecked",onChange:a=>L(a.target.checked)}),"I Agree to delete the Vehicle Data"]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn deleteButtons text-white",onClick:()=>re(O),children:"Delete"}),e.jsx("button",{className:"btn dltcancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",type:"button",children:"Cancel"})]})]})]})]})]})})};export{Ae as default};
