import{u as je,r as s,aY as V,aZ as ve,a_ as Ne,E as Ce,j as e,D as M,L as N,R as we,I as O,a$ as Ae,_ as z}from"./index-DHII64NA.js";import{P as Se,A as ye,E as ke}from"./index-Bc9X7owL.js";import"./Link-B_f3HVnI.js";import{A as Be}from"./ActionControls-BF7LUwxs.js";import{O as d}from"./bootstrap.esm-CBxLh-YC.js";import"./index.esm-ByE6_xdu.js";import"./index-BKNjMPK8.js";const De=je.div`
    
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
    

`,Ie=(b,n)=>{const f=atob(b),p=[];for(let r=0;r<f.length;r+=512){const j=f.slice(r,r+512),i=new Array(j.length);for(let m=0;m<j.length;m++)i[m]=j.charCodeAt(m);const g=new Uint8Array(i);p.push(g)}return new Blob(p,{type:n})},Ve=()=>{const[b,n]=s.useState(!1),f=localStorage.getItem("token"),[p,C]=s.useState(!1),[r,j]=s.useState(""),[i,g]=s.useState(!1),[m,U]=s.useState(""),[$,q]=s.useState("");s.useState("");const[k,G]=s.useState(0),[B,K]=s.useState(0),[D,Y]=s.useState(0),[v,Z]=s.useState([]),[w,I]=s.useState([]),[A,E]=s.useState([]),[u,J]=s.useState([]),[T,P]=s.useState(!1),[F,S]=s.useState(!1),[Ee,Q]=s.useState([]),[X,ee]=s.useState(),[L,ae]=s.useState(!1),[te,se]=s.useState(1),[H,le]=s.useState(1),[y,ce]=s.useState(1),[ne,Te]=s.useState(10);s.useEffect(()=>{if(_(null),W(),(y||L)&&h(r),f&&(ie(),me()),T){const t=document.getElementById("add_staticBackdrop");t&&(d.getInstance(t)||new d(t)).hide(),P(!1)}if(F){const t=document.getElementById("Edit_staticBackdrop");t&&(d.getInstance(t)||new d(t)).hide(),S(!1),W()}const a=document.querySelector(".offcanvas-backdrop");a&&a.remove()},[f,y,T,F,L]);const re=()=>{P(!0),h("")},oe=()=>{S(!0),h("")},de=a=>{ce(a.selected+1)},ie=async()=>{var a;try{const t=await V();if((t==null?void 0:t.status)===200){const l=(a=t==null?void 0:t.data)==null?void 0:a.split(`
`).map(c=>c.split(","));Q(l)}}catch{}},me=async()=>{var a;try{const t=await ve();(t==null?void 0:t.status)===200&&((a=t==null?void 0:t.data)==null?void 0:a.status)==="success"&&ee(t==null?void 0:t.data)}catch{}},he=()=>{const{pdf:a}=X,t=Ie(a,"application/pdf"),l=document.createElement("a");l.href=URL.createObjectURL(t),l.download="Assignment Record.pdf",l.click()},h=async a=>{var l,c;n(!0);try{var t=await Ne(a==="search"?"":a,k,B,D,y,ne);(t==null?void 0:t.status)===200?((l=t==null?void 0:t.data)==null?void 0:l.status)==="success"&&(C(!0),J((c=t==null?void 0:t.data)==null?void 0:c.assignment),le(t.data.totalPages),se(t.data.currentPage),setTimeout(()=>{n(!1)},800),ae(!0)):setTimeout(()=>{n(!1)},800)}catch{setTimeout(()=>{n(!1)},800)}},W=async()=>{var t,l,c,o;try{n(!0);var a=await Ce();(a==null?void 0:a.status)===200&&((t=a==null?void 0:a.data)==null?void 0:t.status)==="success"&&(setTimeout(()=>{n(!1)},800),Z((l=a==null?void 0:a.data)==null?void 0:l.classes))}catch(x){setTimeout(()=>{n(!1)},800),((o=(c=x==null?void 0:x.response)==null?void 0:c.data)==null?void 0:o.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},xe=async a=>{var l;if(i){n(!0);try{var t=await Ae(a);if((t==null?void 0:t.status)===200){if(t.data.status==="success"){z.success((l=t==null?void 0:t.data)==null?void 0:l.message);const c=document.getElementById("Delete_staticBackdrop");if(c){let o=d.getInstance(c);o||(o=new d(c)),o.hide();const x=document.querySelector(".offcanvas-backdrop");x&&x.remove()}g(!1),h(""),setTimeout(()=>{n(!1)},800)}}else z.error(t==null?void 0:t.error)}catch(c){setTimeout(()=>{n(!1)},800),console.error("Error during login:",c)}}},fe=()=>{C(!1)};s.useState(!0);const ge=a=>{const t=parseInt(a);G(t);const l=v.find(c=>c.classId===t);l?(I(l.section||[]),E(l.subjects||[])):(I([]),E([]))},ue=()=>{h(r)},be=()=>{const a=document.getElementById("add_staticBackdrop");new d(a).show()},[R,_]=s.useState(null),pe=a=>{_(R===a?null:a)};return e.jsx(e.Fragment,{children:e.jsxs(De,{children:[b&&e.jsx(M,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[e.jsxs("div",{className:"col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Assignment"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Assignment"})]}),e.jsx("div",{className:"col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0",children:e.jsx(Be,{showAddButton:!0,addButtonText:"Add Assignment",addButtonAction:be,showSearch:!0,searchAction:ue,showExportPDF:u.length>0,exportPDFText:"Export PDF",exportPDFAction:he,exportPDFFileName:"Assignment.pdf",showExportCSV:u.length>0,exportCSVText:"Export CSV",exportCSVAction:V,exportCSVFileName:"Assignment.xlsx"})})]}),e.jsx("div",{className:"row pb-3",children:e.jsxs("div",{className:"bg-white rounded-2 p-4",children:[e.jsxs("form",{className:"row g-3",children:[e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"inputEmail4",className:"form-label font14",children:"Class"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",onChange:a=>ge(a.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),v==null?void 0:v.map(a=>e.jsx("option",{value:a==null?void 0:a.classId,children:a==null?void 0:a.classNo},a.classId))]})]}),e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"inputEmail4",className:"form-label font14",children:"Section"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",onChange:a=>K(a.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),w==null?void 0:w.map(a=>e.jsx("option",{value:a.classSecId,children:a.sectionName},a.classSecId))]})]}),e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"inputEmail4",className:"form-label font14",children:"Subject"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",onChange:a=>Y(a.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),A==null?void 0:A.map(a=>e.jsx("option",{value:a.subjectId,children:a.subjectName},a.subjectId))]})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{type:"button",className:"btn addCategoryButtons text-white",onClick:()=>h(""),disabled:k===0||B===0||D===0,children:"Search"}),e.jsx("button",{type:"button",className:"btn cancelButtons ms-3",onClick:fe,children:"Cancel"})]})]}),p?e.jsx(e.Fragment,{children:e.jsx("div",{className:"row",children:u&&u.length===0?e.jsx("div",{className:"d-flex justify-content-center p-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid"})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-scroll",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"textWrapClass tableHeading text-center",children:e.jsx("span",{className:"font14",children:"#"})}),e.jsx("th",{className:"textWrapClass tableHeading ",children:e.jsx("span",{className:"font14",children:"Title"})}),e.jsx("th",{className:"textWrapClass tableHeading ",children:e.jsx("span",{className:"font14",children:"Teacher"})}),e.jsx("th",{className:"textWrapClass tableHeading ",children:e.jsx("span",{className:"font14",children:"Details"})}),e.jsx("th",{className:"textWrapClass tableHeading ",children:e.jsx("span",{className:"font14",children:"Deadline"})}),e.jsx("th",{className:"textWrapClass tableHeading ",children:e.jsx("span",{className:"font14",children:"Submission"})}),e.jsx("th",{className:"textWrapClass tableHeading ",children:e.jsx("span",{className:"font14",children:"Status"})}),e.jsx("th",{className:"textWrapClass tableHeading text-center",children:e.jsx("span",{className:"font14",children:"Action"})})]})}),e.jsx("tbody",{children:u.map((a,t)=>e.jsxs("tr",{className:"align-middle",children:[e.jsx("th",{className:"textWrapClass text-center greyText",children:e.jsx("span",{className:"font14",children:t+1})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("span",{className:"font14 align-self-start",children:a.title})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("span",{className:"font14 align-self-start",children:a.teacherId})}),e.jsxs("td",{className:"textWrapClass greyText",children:[e.jsxs("p",{className:"font14 align-self-start",children:["Class - ",a.classNo]}),e.jsxs("p",{className:"font14 align-self-start",children:["Section - ",a.sectionName]}),e.jsxs("p",{className:"font14 align-self-start",children:["Subject - ",a.subjectName]})]}),e.jsxs("td",{className:"textWrapClass greyText",children:[e.jsxs("p",{className:"font14 align-self-start",children:["Start Time - ",a.startDate]}),e.jsxs("p",{className:"font14 align-self-start",children:["End Time - ",a.endDate]})]}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("span",{className:"font14 align-self-start",children:e.jsx(Se,{completed:a.currentSubmissions,height:"12px",maxCompleted:a.totalSubmissions,fontSize:"2px"})})}),e.jsx("td",{className:"textWrapClass greyText",children:a.status==="ACTIVE"?e.jsx("span",{className:"font14 align-self-start activeText",children:"Active"}):a.status==="DRAFT"?e.jsx("span",{className:"font14 align-self-start orangeText",children:"Draft"}):e.jsx("span",{className:"font14 align-self-start deactiveText",children:"InActive"})}),e.jsx("td",{className:"textWrapClass text-center",children:e.jsxs("div",{className:"dropdown dropdownbtn",children:[e.jsx("button",{className:"btn btn-sm actionButtons dropdown-toggle",type:"button",onClick:()=>pe(t),children:e.jsx("span",{children:"Action"})}),e.jsxs("ul",{className:`dropdown-menu dropdown-menu-end ${R===t?"show z-index-high":""}`,children:[e.jsx("li",{children:e.jsx(N,{className:"dropdown-item greyText",to:`/admin/assignment/openAssignment/${a.id}`,children:"Open"})}),e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Edit_staticBackdrop","aria-controls":"Edit_staticBackdrop",onClick:()=>{U(a.id),S(!1)},children:" Edit "})}),e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Delete_staticBackdrop","aria-controls":"Delete_staticBackdrop",onClick:()=>q(a.id),children:"Delete"})})]})]})})]},a.id))})]})}),e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",te," of ",H," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(we,{previousLabel:e.jsx(O,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(O,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:H,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:de,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]})})}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"d-flex justify-content-center p-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid"})})})]})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"add_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-1",children:[e.jsx(N,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Assignment Add"})]}),e.jsx("div",{className:"offcanvas-body p-0",children:e.jsx(ye,{addedSuccess:re})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Edit_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-1",children:[e.jsx(N,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Assignment Edit"})]}),e.jsx("div",{className:"offcanvas-body p-0",children:e.jsx(ke,{EditItemId:m,editedSuccess:oe})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Delete_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header ps-0 modalHighborder p-1",children:[e.jsx(N,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#B50000",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("span",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Assignment"})]}),e.jsxs("div",{className:"offcanvas-body p-0",children:[b&&e.jsx(M,{}),e.jsxs("div",{className:"",style:{zIndex:-1},children:[e.jsx("p",{className:"modalLightBorder p-2",children:"Assignment"}),e.jsxs("p",{className:"text-center p-3",children:[" ",e.jsx("img",{src:"/images/errorI.svg",className:"img-fluid",alt:""})]}),e.jsx("p",{className:"text-center warningHeading",children:"Are you Sure?"}),e.jsxs("p",{className:"text-center greyText warningText pt-2",children:["This Action will be permanently delete",e.jsx("br",{}),"the Assignment Data"]}),e.jsxs("p",{className:"text-center warningText p-2",children:[e.jsx("input",{className:"form-check-input formdltcheck me-2",type:"checkbox",checked:i,id:"flexCheckChecked",onChange:a=>g(a.target.checked)}),"I Agree to delete the Assignment Data"]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn deleteButtons text-white",disabled:!i,onClick:()=>xe($),children:"Delete"}),e.jsx("button",{className:"btn dltcancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:()=>g(!1),children:"Cancel"})]})]})]})]})]})})};export{Ve as default};
