import{u as oe,a as le,r as c,U as ce,_ as l,j as e,D as de,I as j,R as ie,L as k,c as me,V as xe,W as he,X as fe,Y as pe}from"./index-DHII64NA.js";import{u as U}from"./index.esm-ByE6_xdu.js";import{A as be}from"./ActionControls-BF7LUwxs.js";const ge=oe.div`

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
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
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .greenBgModal{
        background-color: var(--breadCrumActiveTextColor);
    }

    .greenText{
        color: var(--breadCrumActiveTextColor);
    }

    .orangeText{
        color: var(--OrangeBtnColor);
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    .infoIcon{
        cursor: pointer;
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
`,ue=(T,N)=>{const v=atob(T),d=[];for(let i=0;i<v.length;i+=512){const b=v.slice(i,i+512),E=new Array(b.length);for(let m=0;m<b.length;m++)E[m]=b.charCodeAt(m);const D=new Uint8Array(E);d.push(D)}return new Blob(d,{type:N})},we=()=>{const T=localStorage.getItem("token"),N=le(),[v,d]=c.useState(!1),[i,b]=c.useState([]),[E,D]=c.useState([]),[m,Ne]=c.useState(null),[g,O]=c.useState(""),[W,H]=c.useState(""),[$,R]=c.useState(""),[w,C]=c.useState(!1),[q,M]=c.useState(1),[F,Z]=c.useState(1),[y,L]=c.useState(1),[A,ve]=c.useState(10),[x,V]=c.useState({}),{register:S,handleSubmit:z,formState:{errors:h,isValid:G},setValue:je,reset:I}=U({mode:"onChange"}),{register:B,handleSubmit:_,formState:{errors:f,isValid:X},setValue:p,reset:P}=U({mode:"onChange"});c.useEffect(()=>{u(g)},[T,y,A]);const u=async(a="")=>{var n,o,t,s;try{d(!0);const r=await ce(a,y,A);(r==null?void 0:r.status)===200&&((n=r==null?void 0:r.data)==null?void 0:n.status)==="success"?(b(r.data.data||[]),Z(r.data.totalPages||1),M(r.data.currentPage||1)):l.error(((o=r==null?void 0:r.data)==null?void 0:o.message)||"Failed to fetch exam terms")}catch(r){((s=(t=r==null?void 0:r.response)==null?void 0:t.data)==null?void 0:s.statusCode)===401&&(localStorage.removeItem("token"),N("/")),l.error("Error fetching exam terms")}finally{d(!1)}},Y=a=>{O(a),L(1)},J=async a=>{var n,o;try{d(!0),H(a);const t=await xe(a);if((t==null?void 0:t.status)===200&&((n=t==null?void 0:t.data)==null?void 0:n.status)==="success"){const s=t.data.data,r={examTermName:s.examTermName||"",startDate:s.startDate||"",description:s.description||""};p("examTermName",s.examTermName),p("startDate",s.startDate),p("description",s.description||""),V(r)}else l.error(((o=t==null?void 0:t.data)==null?void 0:o.message)||"Failed to fetch exam term")}catch{l.error("Error fetching exam term")}finally{d(!1)}},K=async a=>{var n,o;try{d(!0);const t=new FormData;t.append("examTermName",a.examTermName),t.append("startDate",a.startDate),t.append("description",a.description||"");const s=await he(t);if((s==null?void 0:s.status)===200&&((n=s==null?void 0:s.data)==null?void 0:n.status)==="success"){l.success(s.data.message),u(g),I();const r=document.getElementById("addExamTerm");(bootstrap.Offcanvas.getInstance(r)||new bootstrap.Offcanvas(r)).hide()}else l.error(((o=s==null?void 0:s.data)==null?void 0:o.message)||"Failed to add exam term")}catch{l.error("Error adding exam term")}finally{d(!1)}},Q=async a=>{var n,o;try{d(!0);const t=new FormData;a.examTermName!==x.examTermName&&t.append("examTermName",a.examTermName),a.startDate!==x.startDate&&t.append("startDate",a.startDate),a.description!==x.description&&t.append("description",a.description||"");const s=await fe(W,t);if((s==null?void 0:s.status)===200&&((n=s==null?void 0:s.data)==null?void 0:n.status)==="success"){l.success(s.data.message),u(g),P(),V({});const r=document.getElementById("editExamTerm");(bootstrap.Offcanvas.getInstance(r)||new bootstrap.Offcanvas(r)).hide()}else l.error(((o=s==null?void 0:s.data)==null?void 0:o.message)||"Failed to update exam term"),p("examTermName",x.examTermName),p("startDate",x.startDate),p("description",x.description)}catch{l.error("Error updating exam term"),p("examTermName",x.examTermName),p("startDate",x.startDate),p("description",x.description)}finally{d(!1)}},ee=async a=>{var n,o;if(w)try{d(!0);const t=await pe(a);if((t==null?void 0:t.status)===200&&((n=t==null?void 0:t.data)==null?void 0:n.status)==="success"){l.success(t.data.message),u(g),C(!1);const s=document.getElementById("deleteExamTerm");(bootstrap.Offcanvas.getInstance(s)||new bootstrap.Offcanvas(s)).hide()}else l.error(((o=t==null?void 0:t.data)==null?void 0:o.message)||"Failed to delete exam term")}catch{l.error("Error deleting exam term")}finally{d(!1)}},ae=async()=>{var a,n,o;try{const t=await DownloadExamTermExcel();if((t==null?void 0:t.status)===200){const s=(a=t==null?void 0:t.data)==null?void 0:a.split(`
`).map(r=>r.split(","));D(s)}else l.error("Failed to download CSV")}catch(t){((o=(n=t==null?void 0:t.response)==null?void 0:n.data)==null?void 0:o.statusCode)===401&&(localStorage.removeItem("token"),N("/")),l.error("Error downloading CSV")}},te=()=>{if(m!=null&&m.pdf){const a=ue(m.pdf,"application/pdf"),n=document.createElement("a");n.href=URL.createObjectURL(a),n.download="Exam Term Data.pdf",n.click()}else l.error("No PDF data available")},se=a=>{const n=a.selected+1;L(n)},re=()=>{I();const a=document.getElementById("addExamTerm");a?(bootstrap.Offcanvas.getInstance(a)||new bootstrap.Offcanvas(a)).show():(console.error("Offcanvas element with ID addExamTerm not found"),l.error("Unable to open Add Exam Term form"))};return e.jsxs(ge,{children:[v&&e.jsx(de,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[e.jsxs("div",{className:"col-xxl-4 col-xl-4 col-lg-12 col-sm-12 flex-frow-1",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-2",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/examTerm",className:"bredcrumText text-decoration-none",children:"Examination"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Exam Term"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Exam Term Details"})]}),e.jsx("div",{className:"col-xxl-8 col-xl-8 col-lg-12 col-sm-12 pe-0",children:e.jsx(be,{showAddButton:!0,addButtonText:"Add Exam Term",addButtonAction:re,showExportPDF:i.length>0,exportPDFText:"Export PDF",exportPDFAction:te,showExportCSV:i.length>0,exportCSVText:"Export CSV",exportCSVAction:ae,showSearch:!0,searchValue:g,searchAction:u,onSearchChange:Y})})]}),e.jsx("div",{className:"row pb-3",children:e.jsx("div",{className:"bg-white rounded-2 p-3 overflow-scroll",children:i.length>0?e.jsxs(e.Fragment,{children:[e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"#"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Title"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Start Date"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Description"})}),e.jsx("th",{className:"text-center",children:e.jsx("span",{className:"font14",children:"Action"})})]})}),e.jsx("tbody",{children:i.map((a,n)=>e.jsxs("tr",{className:"align-middle",children:[e.jsx("th",{className:"textWrapClass greyText",children:e.jsx("h3",{children:(y-1)*A+n+1})}),e.jsx("td",{className:"textWrapClass greyText font14",children:a.examTermName}),e.jsx("td",{className:"textWrapClass greyText font14",children:a.startDate||"-"}),e.jsx("td",{className:"textWrapClass greyText font14",children:a.description||"-"}),e.jsxs("td",{className:"textWrapClass text-center",children:[e.jsx("button",{className:"btn ps-1 pe-1 text-black text-decoration-none",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#editExamTerm","aria-controls":"editExamTerm",onClick:()=>J(a.examTermId),children:e.jsx(j,{icon:"carbon:edit",width:"1.5em",height:"1.5em",style:{color:"#8F8F8F"}})}),e.jsx("button",{className:"btn ps-1 pe-1 text-black text-decoration-none",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#deleteExamTerm","aria-controls":"deleteExamTerm",onClick:()=>R(a.examTermId),children:e.jsx(j,{icon:"mi:delete",width:"1.5em",height:"1.5em",style:{color:"#8F8F8F"}})})]})]},a.examTermId))})]}),e.jsx("div",{className:"overflow-scroll",children:e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",q," of ",F," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(ie,{previousLabel:e.jsx(j,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(j,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:F,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:se,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})})]}):e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("img",{src:"/images/search.svg",alt:"No data",className:"img-fluid"})})})}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2",tabIndex:"-1",id:"addExamTerm","aria-labelledby":"addExamTermLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-2",children:[e.jsx(k,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"addExamTermLabel",children:"Add Exam Term"})]}),e.jsx("div",{className:"offcanvas-body p-3",children:e.jsxs("form",{onSubmit:z(K),children:[e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"examTermNameAdd",className:"form-label font14",children:["Name ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"examTermNameAdd",type:"text",className:`form-control font14 ${h.examTermName?"border-danger":""}`,placeholder:"Enter Exam Term Name",...S("examTermName",{required:"Exam Term Name is required *",validate:{startsWithUppercase:a=>/^[A-Z]/.test(a)||"Exam Term Name must start with an uppercase letter",minLength:a=>a.length>=4||"Minimum Length is 4",validChars:a=>/^[a-zA-Z\s'-]+$/.test(a)||"Invalid Characters in Exam Term Name"}})}),h.examTermName&&e.jsx("p",{className:"font12 text-danger",children:h.examTermName.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"startDateAdd",className:"form-label font14",children:["Start Date ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"startDateAdd",type:"date",className:`form-control font14 ${h.startDate?"border-danger":""}`,placeholder:"Select Start Date",...S("startDate",{required:"Start Date is required *",validate:{validDate:a=>!isNaN(new Date(a).getTime())||"Invalid date format"}})}),h.startDate&&e.jsx("p",{className:"font12 text-danger",children:h.startDate.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"descriptionAdd",className:"form-label font14",children:"Description"}),e.jsx("input",{id:"descriptionAdd",type:"text",className:`form-control font14 ${h.description?"border-danger":""}`,placeholder:"Enter Description",...S("description",{validate:a=>!a||(/^[A-Z]/.test(a)||"Description must start with an uppercase letter")&&(a.length>=4||"Minimum Length is 4")&&(/^[a-zA-Z\s'-]+$/.test(a)||"Invalid Characters in Description")})}),h.description&&e.jsx("p",{className:"font12 text-danger",children:h.description.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons2 font14 text-white me-2",type:"submit",disabled:!G,children:"Add Exam Term"}),e.jsx("button",{className:"btn cancelButtons font14",type:"button","data-bs-dismiss":"offcanvas",onClick:()=>I(),children:"Cancel"})]})]})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2",tabIndex:"-1",id:"editExamTerm","aria-labelledby":"editExamTermLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-2",children:[e.jsx(k,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"editExamTermLabel",children:"Edit Exam Term"})]}),e.jsx("div",{className:"offcanvas-body p-3",children:e.jsxs("form",{onSubmit:_(Q),children:[e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"examTermNameEdit",className:"form-label font14",children:["Name ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"examTermNameEdit",type:"text",className:`form-control font14 ${f.examTermName?"border-danger":""}`,placeholder:"Enter Exam Term Name",...B("examTermName",{required:"Exam Term Name is required *",validate:{startsWithUppercase:a=>/^[A-Z]/.test(a)||"Exam Term Name must start with an uppercase letter",minLength:a=>a.length>=4||"Minimum Length is 4",validChars:a=>/^[a-zA-Z\s'-]+$/.test(a)||"Invalid Characters in Exam Term Name"}})}),f.examTermName&&e.jsx("p",{className:"font12 text-danger",children:f.examTermName.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"startDateEdit",className:"form-label font14",children:["Start Date ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"startDateEdit",type:"date",className:`form-control font14 ${f.startDate?"border-danger":""}`,placeholder:"Select Start Date",...B("startDate",{required:"Start Date is required *",validate:{validDate:a=>!isNaN(new Date(a).getTime())||"Invalid date format"}})}),f.startDate&&e.jsx("p",{className:"font12 text-danger",children:f.startDate.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"descriptionEdit",className:"form-label font14",children:"Description"}),e.jsx("input",{id:"descriptionEdit",type:"text",className:`form-control font14 ${f.description?"border-danger":""}`,placeholder:"Enter Description",...B("description",{validate:a=>!a||(/^[A-Z]/.test(a)||"Description must start with an uppercase letter")&&(a.length>=4||"Minimum Length is 4")&&(/^[a-zA-Z\s'-]+$/.test(a)||"Invalid Characters in Description")})}),f.description&&e.jsx("p",{className:"font12 text-danger",children:f.description.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons3 font14 text-white me-2",type:"submit",disabled:!X,children:"Update Exam Term"}),e.jsx("button",{className:"btn cancelButtons font14","data-bs-dismiss":"offcanvas",type:"button",onClick:()=>P(),children:"Cancel"})]})]})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2",tabIndex:"-1",id:"deleteExamTerm","aria-labelledby":"deleteExamTermLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-2",children:[e.jsx(k,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"deleteExamTermLabel",children:"Delete Exam Term"})]}),e.jsx("div",{className:"offcanvas-body p-3",children:e.jsxs("div",{children:[e.jsx("p",{className:"text-center p-3",children:e.jsx("img",{src:"/images/errorI.svg",className:"img-fluid",alt:"Error"})}),e.jsx("p",{className:"text-center warningHeading",children:"Are you Sure?"}),e.jsxs("p",{className:"text-center greyText warningText pt-2",children:["This Action will permanently delete",e.jsx("br",{}),"the Exam Term Data"]}),e.jsxs("p",{className:"text-center warningText p-2",children:[e.jsx("input",{className:"form-check-input formdltcheck me-2",type:"checkbox",checked:w,id:"flexCheckChecked",onChange:a=>C(a.target.checked)}),"I Agree to delete the Exam Term Data"]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn deleteButtons text-white",disabled:!w,onClick:()=>ee($),children:"Delete"}),e.jsx("button",{className:"btn dltcancelButtons ms-3","data-bs-dismiss":"offcanvas",type:"button",onClick:()=>C(!1),children:"Cancel"})]})]})})]})]}),e.jsx(me,{})]})};export{we as default};
