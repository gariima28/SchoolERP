import{u as ue,r as t,aY as be,aZ as ge,a_ as pe,E as je,j as e,D as W,L as x,R as ve,I as R,a$ as Ne,_}from"./index-DHII64NA.js";import{P as Se,A as Ce,E as we}from"./index-Bc9X7owL.js";import"./Link-B_f3HVnI.js";import{A as ye}from"./ActionControls-BF7LUwxs.js";import{O as r}from"./bootstrap.esm-CBxLh-YC.js";import"./index.esm-ByE6_xdu.js";import"./index-BKNjMPK8.js";const ke=ue.div`
    
    select:-internal-list-box{
        overflow: visible !important;
        background-color: #00A67E !important;
    }

    .form-select{
        color: var(--greyState);
        box-shadow: none;
        border: 1px solid var(--formInputBorder) !important;
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

    .ExportBtns{
        border-radius: 6px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
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
    

`,Re=()=>{const[v,n]=t.useState(!1),N=localStorage.getItem("token"),[V,S]=t.useState(!1),[C,Ae]=t.useState(""),[f,u]=t.useState(!1),[M,O]=t.useState(""),[z,$]=t.useState("");t.useState("");const[w,q]=t.useState(0),[y,G]=t.useState(0),[k,K]=t.useState(0),[h,Y]=t.useState([]),[b,A]=t.useState([]),[g,B]=t.useState([]),[m,Z]=t.useState([]),[D,I]=t.useState(!1),[T,p]=t.useState(!1),[Be,J]=t.useState([]),[De,Q]=t.useState(),[E,U]=t.useState(!1),[X,ee]=t.useState(1),[P,ae]=t.useState(1),[j,se]=t.useState(1),[te,Ie]=t.useState(10);t.useEffect(()=>{if(L(null),F(),(j||E)&&o(C),N&&(ie(),re()),D){const s=document.getElementById("add_staticBackdrop");s&&(r.getInstance(s)||new r(s)).hide(),I(!1)}if(T){const s=document.getElementById("Edit_staticBackdrop");s&&(r.getInstance(s)||new r(s)).hide(),p(!1),F()}const a=document.querySelector(".offcanvas-backdrop");a&&a.remove()},[N,j,D,T,E]);const le=()=>{I(!0),o("")},ce=()=>{p(!0),o("")},ne=a=>{se(a.selected+1)},ie=async()=>{var a;try{const s=await be();if((s==null?void 0:s.status)===200){const l=(a=s==null?void 0:s.data)==null?void 0:a.split(`
`).map(c=>c.split(","));J(l)}}catch{}},re=async()=>{var a;try{const s=await ge();(s==null?void 0:s.status)===200&&((a=s==null?void 0:s.data)==null?void 0:a.status)==="success"&&Q(s==null?void 0:s.data)}catch{}},o=async a=>{var l,c;n(!0);try{var s=await pe(a==="search"?"":a,w,y,k,j,te);(s==null?void 0:s.status)===200?((l=s==null?void 0:s.data)==null?void 0:l.status)==="success"&&(S(!0),Z((c=s==null?void 0:s.data)==null?void 0:c.submission),ae(s.data.totalPages),ee(s.data.currentPage),setTimeout(()=>{n(!1)},800),U(!0)):setTimeout(()=>{n(!1)},800)}catch{setTimeout(()=>{n(!1)},800)}},F=async()=>{var s,l,c,i;try{n(!0);var a=await je();(a==null?void 0:a.status)===200&&((s=a==null?void 0:a.data)==null?void 0:s.status)==="success"&&(setTimeout(()=>{n(!1)},800),Y((l=a==null?void 0:a.data)==null?void 0:l.classes))}catch(d){setTimeout(()=>{n(!1)},800),((i=(c=d==null?void 0:d.response)==null?void 0:c.data)==null?void 0:i.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},oe=async a=>{var l;if(f){n(!0);try{var s=await Ne(a);if((s==null?void 0:s.status)===200){if(s.data.status==="success"){_.success((l=s==null?void 0:s.data)==null?void 0:l.message);const c=document.getElementById("Delete_staticBackdrop");if(c){let i=r.getInstance(c);i||(i=new r(c)),i.hide();const d=document.querySelector(".offcanvas-backdrop");d&&d.remove()}u(!1),o(""),setTimeout(()=>{n(!1)},800)}}else _.error(s==null?void 0:s.error)}catch(c){setTimeout(()=>{n(!1)},800),console.error("Error during login:",c)}}},de=()=>{S(!1)};t.useState(!0);const me=a=>{const s=parseInt(a);q(s);const l=h.find(c=>c.classId===s);l?(A(l.section||[]),B(l.subjects||[])):(A([]),B([]))},xe=()=>{o(C)},he=()=>{const a=document.getElementById("add_staticBackdrop");new r(a).show()},[H,L]=t.useState(null),fe=a=>{L(H===a?null:a)};return e.jsx(e.Fragment,{children:e.jsxs(ke,{children:[v&&e.jsx(W,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[e.jsxs("div",{className:"col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Submission"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Submission"})]}),e.jsx("div",{className:"col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0",children:e.jsx(ye,{showAddButton:!1,addButtonText:"Add Submission",addButtonAction:he,showSearch:!0,searchAction:xe,showExportPDF:m.length>0,exportPDFText:"Export PDF",exportPDFAction:"",exportPDFFileName:"Receipts.pdf",showExportCSV:m.length>0,exportCSVText:"Export CSV",exportCSVAction:"",exportCSVFileName:"Receipts.xlsx"})})]}),e.jsx("div",{className:"row pb-3",children:e.jsxs("div",{className:"bg-white rounded-2 p-4",children:[e.jsxs("form",{className:"row g-3",children:[e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"inputEmail4",className:"form-label font14",children:"Class"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",onChange:a=>me(a.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),h==null?void 0:h.map(a=>e.jsx("option",{value:a==null?void 0:a.classId,children:a==null?void 0:a.classNo},a.classId))]})]}),e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"inputEmail4",className:"form-label font14",children:"Section"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",onChange:a=>G(a.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),b==null?void 0:b.map(a=>e.jsx("option",{value:a.classSecId,children:a.sectionName},a.classSecId))]})]}),e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"inputEmail4",className:"form-label font14",children:"Subject"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",onChange:a=>K(a.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),g==null?void 0:g.map(a=>e.jsx("option",{value:a.subjectId,children:a.subjectName},a.subjectId))]})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{type:"button",className:"btn addCategoryButtons text-white",onClick:()=>o(""),disabled:w===0||y===0||k===0,children:"Search"}),e.jsx("button",{type:"button",className:"btn cancelButtons ms-3",onClick:de,children:"Cancel"})]})]}),V?e.jsx(e.Fragment,{children:e.jsx("div",{className:"row",children:m&&m.length===0?e.jsx("div",{className:"d-flex justify-content-center p-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid"})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-scroll",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"textWrapClass tableHeading text-center",children:e.jsx("span",{className:"font14",children:"#"})}),e.jsx("th",{className:"textWrapClass tableHeading ",children:e.jsx("span",{className:"font14",children:"Title"})}),e.jsx("th",{className:"textWrapClass tableHeading ",children:e.jsx("span",{className:"font14",children:"Teacher"})}),e.jsx("th",{className:"textWrapClass tableHeading ",children:e.jsx("span",{className:"font14",children:"Details"})}),e.jsx("th",{className:"textWrapClass tableHeading ",children:e.jsx("span",{className:"font14",children:"Deadline"})}),e.jsx("th",{className:"textWrapClass tableHeading ",children:e.jsx("span",{className:"font14",children:"Submission"})}),e.jsx("th",{className:"textWrapClass tableHeading ",children:e.jsx("span",{className:"font14",children:"Status"})}),e.jsx("th",{className:"textWrapClass tableHeading text-center",children:e.jsx("span",{className:"font14",children:"Action"})})]})}),e.jsx("tbody",{children:m.map((a,s)=>e.jsxs("tr",{className:"align-middle",children:[e.jsx("th",{className:"textWrapClass text-center greyText",children:e.jsx("span",{className:"font14",children:s+1})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("span",{className:"font14 align-self-start",children:a.title})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("span",{className:"font14 align-self-start",children:a.teacherId})}),e.jsxs("td",{className:"textWrapClass greyText",children:[e.jsxs("p",{className:"font14 align-self-start",children:["Class - ",a.classNo]}),e.jsxs("p",{className:"font14 align-self-start",children:["Section - ",a.sectionName]}),e.jsxs("p",{className:"font14 align-self-start",children:["Subject - ",a.subjectName]})]}),e.jsxs("td",{className:"textWrapClass greyText",children:[e.jsxs("p",{className:"font14 align-self-start",children:["Start Time - ",a.startDate]}),e.jsxs("p",{className:"font14 align-self-start",children:["End Time - ",a.endDate]})]}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("span",{className:"font14 align-self-start",children:e.jsx(Se,{completed:a.currentSubmissions,height:"12px",maxCompleted:a.totalSubmissions,fontSize:"2px"})})}),e.jsx("td",{className:"textWrapClass greyText",children:a.status==="ACTIVE"?e.jsx("span",{className:"font14 align-self-start activeText",children:"Active"}):a.status==="DRAFT"?e.jsx("span",{className:"font14 align-self-start orangeText",children:"Draft"}):e.jsx("span",{className:"font14 align-self-start deactiveText",children:"InActive"})}),e.jsx("td",{className:"textWrapClass text-center",children:e.jsxs("div",{className:"dropdown dropdownbtn",children:[e.jsx("button",{className:"btn btn-sm actionButtons dropdown-toggle",type:"button",onClick:()=>fe(s),children:e.jsx("span",{children:"Action"})}),e.jsxs("ul",{className:`dropdown-menu dropdown-menu-end ${H===s?"show z-index-high":""}`,children:[e.jsx("li",{children:e.jsx(x,{className:"dropdown-item greyText",to:`/admin/submission/openAssignment/${a.id}`,children:"Open"})}),e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Edit_staticBackdrop","aria-controls":"Edit_staticBackdrop",onClick:()=>{O(a.id),p(!1)},children:"Edit"})}),e.jsx("li",{children:e.jsx(x,{className:"dropdown-item greyText",to:`/admin/submission/submitAssignment/${a.id}`,children:"Submission"})}),e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Delete_staticBackdrop","aria-controls":"Delete_staticBackdrop",onClick:()=>$(a.id),children:"Delete"})})]})]})})]},a.id))})]})}),e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",X," of ",P," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(ve,{previousLabel:e.jsx(R,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(R,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:P,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:ne,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]})})}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"d-flex justify-content-center p-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid"})})})]})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"add_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-1",children:[e.jsx(x,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Submission Add"})]}),e.jsx("div",{className:"offcanvas-body p-0",children:e.jsx(Ce,{addedSuccess:le})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Edit_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-1",children:[e.jsx(x,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Submission Edit"})]}),e.jsx("div",{className:"offcanvas-body p-0",children:e.jsx(we,{EditItemId:M,editedSuccess:ce})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Delete_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header ps-0 modalHighborder p-1",children:[e.jsx(x,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#B50000",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("span",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Submission"})]}),e.jsxs("div",{className:"offcanvas-body p-0",children:[v&&e.jsx(W,{}),e.jsxs("div",{className:"",style:{zIndex:-1},children:[e.jsx("p",{className:"modalLightBorder p-2",children:"Submission"}),e.jsxs("p",{className:"text-center p-3",children:[" ",e.jsx("img",{src:"/images/errorI.svg",className:"img-fluid",alt:""})]}),e.jsx("p",{className:"text-center warningHeading",children:"Are you Sure?"}),e.jsxs("p",{className:"text-center greyText warningText pt-2",children:["This Action will be permanently delete",e.jsx("br",{}),"the Submission Data"]}),e.jsxs("p",{className:"text-center warningText p-2",children:[e.jsx("input",{className:"form-check-input formdltcheck me-2",type:"checkbox",checked:f,id:"flexCheckChecked",onChange:a=>u(a.target.checked)}),"I Agree to delete the Submission Data"]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn deleteButtons text-white",disabled:!f,onClick:()=>oe(z),children:"Delete"}),e.jsx("button",{className:"btn dltcancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:()=>u(!1),children:"Cancel"})]})]})]})]})]})})};export{Re as default};
