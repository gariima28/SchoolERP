import{u as ae,a as te,r as c,Z as re,$ as o,j as e,D as se,a0 as ne,a1 as de,I as b,R as oe,L as w,c as ce,a2 as le,a3 as ie,a4 as me,a5 as ge}from"./index-DHII64NA.js";import{u as B}from"./index.esm-ByE6_xdu.js";import{A as pe}from"./ActionControls-BF7LUwxs.js";const xe=ae.div`
    .form-control::placeholder, .form-control, .form-select {
        color: var(--greyState);
    }

    .formdltcheck:checked {
        background-color: #B50000;
        border-color: #B50000;
    }

    .form-control, .form-select {
        border-radius: 5px;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .contbtn {
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv {
        background-color: #FBFBFB;
    }

    .mainBreadCrum {
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText {
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText {
        color: var(--breadCrumActiveTextColor);
    }

    .eventablerow {
        background-color: var(--tableGreyBackgroundColor) !important;
    }

    .ExportBtns {
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-check-input {
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .greenBgModal {
        background-color: var(--breadCrumActiveTextColor);
    }

    .greenText {
        color: var(--breadCrumActiveTextColor);
    }

    .form-select {
        color: var(--greyState);
        box-shadow: none;
    }

    .orangeText {
        color: var(--OrangeBtnColor);
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    .infoIcon {
        cursor: pointer;
    }

    .modalHighborder {
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder {
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .correvtSVG {
        position: relative;
        width: fit-content;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .deleteSVG {
        position: relative;
        width: fit-content;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }
`,je=()=>{const U=localStorage.getItem("token"),S=te(),[k,l]=c.useState(!1),[f,E]=c.useState([]),[p,I]=c.useState(""),[D,V]=c.useState(""),[L,O]=c.useState(""),[u,v]=c.useState(!1),[q,H]=c.useState(1),[G,W]=c.useState(1),[j,P]=c.useState(1),[N,he]=c.useState(10);c.useState([]),c.useState(null);const[g,T]=c.useState({}),{register:F,handleSubmit:M,formState:{errors:i,isValid:$},setValue:fe,reset:y}=B({mode:"onChange"}),{register:C,handleSubmit:R,formState:{errors:m,isValid:z},setValue:x,reset:A}=B({mode:"onChange"});c.useEffect(()=>{h(p)},[U,j,N]);const h=async a=>{var n,d,r,t;try{l(!0);const s=await re(a,j,N);(s==null?void 0:s.status)===200&&((n=s==null?void 0:s.data)==null?void 0:n.status)==="success"?(E(s.data.grades||[]),W(s.data.totalPages||1),H(s.data.currentPage||1)):o.error(((d=s==null?void 0:s.data)==null?void 0:d.message)||"Failed to fetch grades")}catch(s){((t=(r=s==null?void 0:s.response)==null?void 0:r.data)==null?void 0:t.statusCode)===401&&(localStorage.removeItem("token"),S("/")),o.error("Error fetching grades")}finally{l(!1)}},K=async a=>{var n,d;try{l(!0),V(a);const r=await le(a);if((r==null?void 0:r.status)===200&&((n=r==null?void 0:r.data)==null?void 0:n.status)==="success"){const t=r.data.grade,s={grade:t.grade||"",percentageFrom:t.percentageFrom||"",percentageUpTo:t.percentageUpTo||""};x("grade",t.grade),x("percentageFrom",t.percentageFrom),x("percentageUpTo",t.percentageUpTo),T(s)}else o.error(((d=r==null?void 0:r.data)==null?void 0:d.message)||"Failed to fetch grade data")}catch{o.error("Error fetching grade data")}finally{l(!1)}},Z=async a=>{var n,d;try{l(!0);const r=new FormData;r.append("grade",a.grade),r.append("percentageFrom",a.percentageFrom),r.append("percentageUpTo",a.percentageUpTo);const t=await ie(r);if((t==null?void 0:t.status)===200&&((n=t==null?void 0:t.data)==null?void 0:n.status)==="success"){o.success(t.data.message),h(p),y();const s=document.getElementById("addGrade");(bootstrap.Offcanvas.getInstance(s)||new bootstrap.Offcanvas(s)).hide()}else o.error(((d=t==null?void 0:t.data)==null?void 0:d.message)||"Failed to add grade")}catch{o.error("Error adding grade")}finally{l(!1)}},J=async a=>{var n,d;try{l(!0);const r=new FormData;a.grade!==g.grade&&r.append("grade",a.grade),a.percentageFrom!==g.percentageFrom&&r.append("percentageFrom",a.percentageFrom),a.percentageUpTo!==g.percentageUpTo&&r.append("percentageUpTo",a.percentageUpTo);const t=await me(D,r);if((t==null?void 0:t.status)===200&&((n=t==null?void 0:t.data)==null?void 0:n.status)==="success"){o.success(t.data.message),h(p),A(),T({});const s=document.getElementById("editGrade");(bootstrap.Offcanvas.getInstance(s)||new bootstrap.Offcanvas(s)).hide()}else o.error(((d=t==null?void 0:t.data)==null?void 0:d.message)||"Failed to update grade"),Object.keys(g).forEach(s=>x(s,g[s]))}catch{o.error("Error updating grade"),Object.keys(g).forEach(t=>x(t,g[t]))}finally{l(!1)}},Q=async()=>{var a,n;if(!u){o.error("Please Agree to Delete Grade");return}try{l(!0);const d=await ge(L);if((d==null?void 0:d.status)===200&&((a=d==null?void 0:d.data)==null?void 0:a.status)==="success"){o.success(d.data.message),h(p),v(!1);const r=document.getElementById("deleteGrade");(bootstrap.Offcanvas.getInstance(r)||new bootstrap.Offcanvas(r)).hide()}else o.error(((n=d==null?void 0:d.data)==null?void 0:n.message)||"Failed to delete grade")}catch{o.error("Error deleting grade")}finally{l(!1)}},X=a=>{I(a),P(1)},Y=a=>{const n=a.selected+1;P(n)},_=()=>{y();const a=document.getElementById("addGrade");a?(bootstrap.Offcanvas.getInstance(a)||new bootstrap.Offcanvas(a)).show():(console.error("Offcanvas element with ID addGrade not found"),o.error("Unable to open Add Grade form"))};return e.jsxs(xe,{children:[k&&e.jsx(se,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[e.jsxs("div",{className:"col-xxl-4 col-xl-4 col-lg-12 col-sm-12 flex-frow-1",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-2",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/ExamTerm",className:"bredcrumText text-decoration-none",children:"Examination"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Grades"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Grades List"})]}),e.jsx("div",{className:"col-xxl-8 col-xl-8 col-lg-12 col-sm-12 pe-0",children:e.jsx(pe,{showAddButton:!0,addButtonText:"Add Grade",addButtonAction:_,showExportPDF:f.length>0,exportPDFText:"Export PDF",exportPDFAction:ne,exportPDFFileName:"Grades.pdf",showExportCSV:f.length>0,exportCSVText:"Export CSV",exportCSVAction:de,exportCSVFileName:"Grades.xlsx",showSearch:!0,searchValue:p,searchAction:h,onSearchChange:X})})]}),e.jsx("div",{className:"row pb-3",children:e.jsx("div",{className:"bg-white rounded-2 p-4",children:f.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"row overflow-scroll",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-center textWrapClass",children:e.jsx("span",{className:"font14",children:"#"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Grade"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Percentage From"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Percentage Upto"})}),e.jsx("th",{className:"text-center textWrapClass",children:e.jsx("span",{className:"font14",children:"Action"})})]})}),e.jsx("tbody",{children:f.map((a,n)=>e.jsxs("tr",{className:"align-middle",children:[e.jsx("th",{className:"textWrapClass text-center greyText",children:e.jsx("h3",{children:(j-1)*N+n+1})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:a.grade})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:a.percentageFrom})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:a.percentageUpTo})}),e.jsxs("td",{className:"textWrapClass text-center",children:[e.jsx("button",{className:"btn ps-1 pe-1 text-black text-decoration-none",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#editGrade","aria-controls":"editGrade",onClick:()=>K(a.id),children:e.jsx(b,{icon:"carbon:edit",width:"1.5em",height:"1.5em",style:{color:"#8F8F8F"}})}),e.jsx("button",{className:"btn ps-1 pe-1 text-black text-decoration-none",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#deleteGrade","aria-controls":"deleteGrade",onClick:()=>O(a.id),children:e.jsx(b,{icon:"mi:delete",width:"1.5em",height:"1.5em",style:{color:"#8F8F8F"}})})]})]},a.id))})]})}),e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",q," of ",G," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(oe,{previousLabel:e.jsx(b,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(b,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:G,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:Y,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("img",{src:"/images/search.svg",alt:"No data",className:"img-fluid"})})})}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2",tabIndex:"-1",id:"addGrade","aria-labelledby":"addGradeLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-2",children:[e.jsx(w,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"addGradeLabel",children:"Add Grade"})]}),e.jsx("div",{className:"offcanvas-body p-3 scrollBarHide",children:e.jsxs("form",{onSubmit:M(Z),children:[e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"gradeAdd",className:"form-label font14",children:["Grade ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"gradeAdd",type:"text",placeholder:"Enter Grade Name",className:`form-control font14 ${i.grade?"border-danger":""}`,...F("grade",{required:"Grade is required *",pattern:{value:/^[A-Za-z0-9\s]+$/,message:"Invalid grade format"}})}),i.grade&&e.jsx("p",{className:"font12 text-danger",children:i.grade.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"percentageFromAdd",className:"form-label font14",children:["Percentage From ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"percentageFromAdd",type:"number",placeholder:"Enter Mark Percentage From",className:`form-control font14 ${i.percentageFrom?"border-danger":""}`,...F("percentageFrom",{required:"Percentage From is required *",min:{value:0,message:"Percentage From cannot be negative"},max:{value:100,message:"Percentage From cannot exceed 100"}})}),i.percentageFrom&&e.jsx("p",{className:"font12 text-danger",children:i.percentageFrom.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"percentageUpToAdd",className:"form-label font14",children:["Percentage Upto ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"percentageUpToAdd",type:"number",placeholder:"Enter Mark Percentage Upto",className:`form-control font14 ${i.percentageUpTo?"border-danger":""}`,...F("percentageUpTo",{required:"Percentage Upto is required *",min:{value:0,message:"Percentage Upto cannot be negative"},max:{value:100,message:"Percentage Upto cannot exceed 100"},validate:{greaterThanPercentageFrom:(a,{percentageFrom:n})=>!n||parseFloat(a)>parseFloat(n)||"Percentage Upto must be greater than Percentage From"}})}),i.percentageUpTo&&e.jsx("p",{className:"font12 text-danger",children:i.percentageUpTo.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons2 font14 text-white me-2",type:"submit",disabled:!$,children:"Add Grade"}),e.jsx("button",{className:"btn cancelButtons font14",type:"button","data-bs-dismiss":"offcanvas",onClick:()=>y(),children:"Cancel"})]})]})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2",tabIndex:"-1",id:"editGrade","aria-labelledby":"editGradeLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-2",children:[e.jsx(w,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"editGradeLabel",children:"Edit Grade"})]}),e.jsx("div",{className:"offcanvas-body p-3 scrollBarHide",children:e.jsxs("form",{onSubmit:R(J),children:[e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"gradeEdit",className:"form-label font14",children:["Grade ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"gradeAdd",type:"text",placeholder:"Enter Grade Name",className:`form-control font14 ${m.grade?"border-danger":""}`,...C("grade",{required:"Grade is required *"})}),m.grade&&e.jsx("p",{className:"font12 text-danger",children:m.grade.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"percentageFromEdit",className:"form-label font14",children:["Percentage From ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"percentageFromEdit",type:"number",placeholder:"Enter Mark Percentage From",className:`form-control font14 ${m.percentageFrom?"border-danger":""}`,...C("percentageFrom",{required:"Percentage From is required *",min:{value:0,message:"Percentage From cannot be negative"},max:{value:100,message:"Percentage From cannot exceed 100"}})}),m.percentageFrom&&e.jsx("p",{className:"font12 text-danger",children:m.percentageFrom.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"percentageUpToEdit",className:"form-label font14",children:["Percentage Upto ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"percentageUpToEdit",type:"number",placeholder:"Enter Mark Percentage Upto",className:`form-control font14 ${m.percentageUpTo?"border-danger":""}`,...C("percentageUpTo",{required:"Percentage Upto is required *",min:{value:0,message:"Percentage Upto cannot be negative"},max:{value:100,message:"Percentage Upto cannot exceed 100"},validate:{greaterThanPercentageFrom:(a,{percentageFrom:n})=>!n||parseFloat(a)>parseFloat(n)||"Percentage Upto must be greater than Percentage From"}})}),m.percentageUpTo&&e.jsx("p",{className:"font12 text-danger",children:m.percentageUpTo.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons3 font14 text-white me-2",type:"submit",disabled:!z,children:"Update Grade"}),e.jsx("button",{className:"btn cancelButtons font14",type:"button","data-bs-dismiss":"offcanvas",onClick:()=>A(),children:"Cancel"})]})]})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2",tabIndex:"-1",id:"deleteGrade","aria-labelledby":"deleteGradeLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-2",children:[e.jsx(w,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"deleteGradeLabel",children:"Delete Grade"})]}),e.jsx("div",{className:"offcanvas-body p-3",children:e.jsxs("div",{children:[e.jsx("p",{className:"text-center p-3",children:e.jsx("img",{src:"/images/errorI.svg",className:"img-fluid",alt:"Error"})}),e.jsx("p",{className:"text-center warningHeading",children:"Are you Sure?"}),e.jsxs("p",{className:"text-center greyText warningText pt-2",children:["This Action will permanently delete",e.jsx("br",{}),"the Grade Data"]}),e.jsxs("p",{className:"text-center warningText p-2",children:[e.jsx("input",{className:"form-check-input formdltcheck me-2",type:"checkbox",checked:u,id:"flexCheckChecked",onChange:a=>v(a.target.checked)}),"I Agree to delete the Grade Data"]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn deleteButtons text-white",disabled:!u,onClick:Q,children:"Delete"}),e.jsx("button",{className:"btn dltcancelButtons ms-3","data-bs-dismiss":"offcanvas",type:"button",onClick:()=>v(!1),children:"Cancel"})]})]})})]})]}),e.jsx(ce,{})]})};export{je as default};
