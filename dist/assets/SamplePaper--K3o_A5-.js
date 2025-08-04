import{u as ie,r,E as oe,_ as S,aP as ue,j as e,c as xe,aQ as Ae,aR as Pe,D as pe,aS as De,aT as he,aU as fe,aV as Ee,I as de,L as ce,R as Fe,aW as Te,aX as qe}from"./index-DHII64NA.js";import{u as be}from"./index.esm-ByE6_xdu.js";import"./Link-B_f3HVnI.js";import{A as $e}from"./ActionControls-BF7LUwxs.js";import{O as g}from"./bootstrap.esm-CBxLh-YC.js";import"./index-BKNjMPK8.js";const Ve=ie.div`
  .form-check-input:checked {
    background-color: #008479;
    border-color: #008479;
    box-shadow: none !important;
  }

  .form-check-input:focus {
    box-shadow: none !important;
    outline: none;
  }

  .form-select,
  .form-control::placeholder,
  .form-control {
    color: var(--greyState);
    box-shadow: none;
    border-color: var(--greyState);
  }

  .form-select.border-danger {
    border-color: #dc3545 !important;
  }

  .table-striped > tbody > tr:nth-of-type(odd) > * {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
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

  .contbtn {
    margin-left: 41% !important;
    margin-top: -20% !important;
  }

  .greydiv {
    background-color: #FBFBFB;
  }

  .scrollBarHide::-webkit-scrollbar {
    display: none;
  }

  .section-container {
    padding: 0.5rem;
    background-color: #f8f9fa;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5rem;
    width: 100%;
  }

  .grid-item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 4px;
  }

  .form-check {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .form-check-input {
    margin-right: 0.5rem;
  }

  .form-check-label {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 576px) {
    .grid-container {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    }
  }

  @media (min-width: 1200px) {
    .grid-container {
      grid-template-columns: repeat(auto-fit, minmax(150px, 2fr));
    }
  }
`,Le=({addedSuccess:$})=>{const x=localStorage.getItem("token"),[H,M]=r.useState(!0),[f,I]=r.useState([]),[y,C]=r.useState([]),[P,D]=r.useState([]),[w,U]=r.useState([]),[W,b]=r.useState(!1),[V,m]=r.useState(!1),{register:u,handleSubmit:N,formState:{errors:o,isValid:E},setValue:j,watch:k,reset:B}=be({mode:"onChange",defaultValues:{classSecIds:[],classId:"",subjectId:"",teacherId:"",title:"",year:"",status:"",note:"",file:null},resolver:async a=>{const d={};return(!a.classSecIds||a.classSecIds.length===0)&&(d.classSecIds={type:"required",message:"At least one section is required *"}),{values:a,errors:d}}}),F=k("classId"),A=k("subjectId"),v=k("sectionIds");r.useEffect(()=>{R()},[x]),r.useEffect(()=>{T(A)},[A]);const R=async()=>{var a,d;try{const n=await oe();(n==null?void 0:n.status)===200&&((a=n==null?void 0:n.data)==null?void 0:a.status)==="success"&&I((d=n==null?void 0:n.data)==null?void 0:d.classes)}catch(n){console.error(n),S.error("Failed to fetch class data")}},T=async a=>{var d,n;try{const c=await ue(F,a);(c==null?void 0:c.status)===200&&((d=c==null?void 0:c.data)==null?void 0:d.status)==="success"&&U((n=c==null?void 0:c.data)==null?void 0:n.teacher)}catch(c){console.error(c),S.error("Failed to fetch teacher data")}},_=a=>{const d=parseInt(a);j("subjectId",d),m(!0),T(d)},q=a=>{const d=parseInt(a);j("classId",d),j("sectionIds",[]),j("subjectId",""),b(!0);const n=f.find(c=>c.classId===d);n?(C(n.section||[]),D(n.subjects||[]),j("year",n.year||"")):(C([]),D([]),j("year",""))},L=(a,d)=>{const n=v||[];let c;d?c=[...n,String(a)]:c=n.filter(p=>p!==String(a)),j("sectionIds",c,{shouldValidate:!0})},t=async a=>{var d,n;try{const c=new FormData;c.append("title",a==null?void 0:a.title),c.append("ClassId",a==null?void 0:a.classId),c.append("sectionIds",JSON.stringify(a==null?void 0:a.sectionIds)),c.append("subjectId",a==null?void 0:a.subjectId),c.append("teacherId",a==null?void 0:a.teacherId),c.append("status",a==null?void 0:a.status),c.append("year",a==null?void 0:a.year),c.append("file",a==null?void 0:a.file[0]),c.append("note",(a==null?void 0:a.note)||"");const p=await Ae(c);(p==null?void 0:p.status)===200&&((d=p==null?void 0:p.data)==null?void 0:d.status)==="success"&&(S.success((n=p==null?void 0:p.data)==null?void 0:n.message),M(!H),$(!0),B())}catch(c){console.error(c),S.error("Failed to add sample paper")}};return e.jsx(Ve,{children:e.jsxs("div",{className:"container-fluid",children:[e.jsx("div",{className:"row",children:e.jsxs("form",{className:"p-3",onSubmit:N(t),children:[e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"title",className:"form-label font14",children:["Title ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"title",type:"text",className:`form-control font14 ${o.title?"border-danger":""}`,placeholder:"Enter Title",...u("title",{required:"Title is required *",validate:a=>/^[A-Z]/.test(a)?a.length<2?"Minimum Length is 2":/^[a-zA-Z0-9\s'-]+$/.test(a)?!0:"Invalid Characters in Title":"Title must start with an uppercase letter"})}),o.title&&e.jsx("p",{className:"font12 text-danger",children:o.title.message})]}),e.jsxs("div",{className:"mb-3 teacher-input",children:[e.jsxs("label",{htmlFor:"classId",className:"form-label font14",children:["Class ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"classId",className:`form-select font14 ${o.classId?"border-danger":""}`,...u("classId",{required:"Class selection is required *"}),onChange:a=>q(a.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),f==null?void 0:f.map(a=>e.jsx("option",{value:a==null?void 0:a.classId,children:a==null?void 0:a.classNo},a.classId))]}),o.classId&&e.jsx("p",{className:"font12 text-danger",children:o.classId.message})]}),e.jsxs("div",{className:"mb-3 teacher-input",children:[e.jsxs("label",{htmlFor:"sectionIds",className:"form-label font14",children:["Section ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("div",{className:"section-container px-2 py-2",children:y.length>0?e.jsx("div",{className:"grid-container",children:y.map(a=>e.jsx("div",{className:"grid-item",children:e.jsxs("div",{className:"form-check",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",id:`section-${a.classSecId}`,value:a.classSecId,checked:v==null?void 0:v.includes(String(a.classSecId)),onChange:d=>L(a.classSecId,d.target.checked)}),e.jsx("label",{className:"form-check-label font14",htmlFor:`section-${a.classSecId}`,children:a.sectionName})]})},a.classSecId))}):e.jsx("span",{className:"mt-0 greyText",children:F?"-- No Sections Found --":"-- Select Class First --"})}),o.sectionIds&&e.jsx("p",{className:"font12 text-danger",children:o.sectionIds.message})]}),e.jsxs("div",{className:"mb-3 teacher-input",children:[e.jsxs("label",{htmlFor:"subjectId",className:"form-label font14",children:["Subject ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("div",{className:`${W?"":"tooltip-container"}`,"data-tooltip":"Select Class First",children:e.jsxs("select",{id:"subjectId",className:`form-select font14 ${o.subjectId?"border-danger":""}`,...u("subjectId",{required:"Subject selection is required *"}),disabled:!W,onChange:a=>_(a.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),P.length>0?P==null?void 0:P.map(a=>e.jsx("option",{value:a.subjectId,children:a.subjectName},a.subjectId)):e.jsx("option",{disabled:!0,children:"-- No Subject found for this Class --"})]})}),o.subjectId&&e.jsx("p",{className:"font12 text-danger",children:o.subjectId.message})]}),e.jsxs("div",{className:"mb-3 teacher-input",children:[e.jsxs("label",{htmlFor:"teacherId",className:"form-label font14",children:["Teacher ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("div",{className:`${V?"":"tooltip-container"}`,"data-tooltip":"Select Subject First",children:e.jsxs("select",{id:"teacherId",className:`form-select font14 ${o.teacherId?"border-danger":""}`,...u("teacherId",{required:"Teacher selection is required *"}),disabled:!V,children:[e.jsx("option",{value:"",children:"-- Select --"}),w.length>0?w==null?void 0:w.map(a=>e.jsx("option",{value:a.staffId,children:a.staffName},a.staffId)):e.jsx("option",{disabled:!0,children:"-- No Teacher found for this Subject --"})]})}),o.teacherId&&e.jsx("p",{className:"font12 text-danger",children:o.teacherId.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"year",className:"form-label font14",children:["Year ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"year",type:"number",className:`form-control font14 ${o.year?"border-danger":""}`,placeholder:"Enter Year",...u("year",{required:"Year is required *",pattern:{value:/^\d{4}$/,message:"Year must be a 4-digit number"}})}),o.year&&e.jsx("p",{className:"font12 text-danger",children:o.year.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"status",className:"form-label font14",children:["Status ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"status",className:`form-select font14 ${o.status?"border-danger":""}`,...u("status",{required:"Status selection is required *"}),children:[e.jsx("option",{value:"",children:"-- Select --"}),e.jsx("option",{value:"Active",children:"Active"}),e.jsx("option",{value:"Draft",children:"Draft"}),e.jsx("option",{value:"Archives",children:"Archives"})]}),o.status&&e.jsx("p",{className:"font12 text-danger",children:o.status.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"note",className:"form-label font14",children:"Description"}),e.jsx("input",{id:"note",type:"text",className:`form-control font14 ${o.note?"border-danger":""}`,placeholder:"Enter Description",...u("note",{validate:a=>a?a.length<2?"Minimum Length is 2":/^[a-zA-Z0-9\s'-]+$/.test(a)?!0:"Invalid Characters in Description":!0})}),o.note&&e.jsx("p",{className:"font12 text-danger",children:o.note.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"file",className:"form-label font14",children:["Sample Paper Upload ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"file",type:"file",className:`form-control font14 ${o.file?"border-danger":""}`,placeholder:"Upload",accept:".pdf, .docx",...u("file",{required:"File is required *",validate:a=>a.length>0&&(a[0].size<10240||a[0].size>204800)?"File size must be between 10 KB to 200 KB":!0})}),o.file&&e.jsx("p",{className:"font12 text-danger",children:o.file.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn updateCreateButtons text-white",disabled:!E,type:"submit",children:"Create"}),e.jsx("button",{className:"btn cancelButtons ms-3",type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:()=>B(),children:"Cancel"})]})]})}),e.jsx(xe,{})]})})},He=ie.div`

    .formimagetext{
      border-radius: 5px 0px 0px 5px !important;
    }

    .form-select, .form-control::placeholder, .form-control{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
    }

    .form-select.border-danger {
        border-color: #dc3545 !important;
    }

    .table-striped>tbody>tr:nth-of-type(odd)>* {
        --bs-table-bg-type: var(--tableGreyBackgroundColor);
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

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }


`,We=({EditItemId:$,EditedSuccess:x})=>{const H=localStorage.getItem("token"),[M,f]=r.useState(!1),[I,y]=r.useState([]),[C,P]=r.useState([]),[D,w]=r.useState([]),[U,W]=r.useState([]),{register:b,handleSubmit:V,formState:{errors:m},setValue:u,watch:N}=be({mode:"onChange"}),o=N("ClassId"),E=N("sectionId"),j=N("subjectId"),k=N("teacherId"),[B,F]=r.useState(""),[A,v]=r.useState(!0);r.useEffect(()=>{R(),T()},[H,$]),r.useEffect(()=>{q(o)},[o]),r.useEffect(()=>{_(j)},[j]);const R=async()=>{var a,d;try{var t=await oe();(t==null?void 0:t.status)===200&&((a=t==null?void 0:t.data)==null?void 0:a.status)==="success"&&y((d=t==null?void 0:t.data)==null?void 0:d.classes)}catch{f(!1)}},T=async()=>{var a,d,n,c,p,Y,J,O,Q,z,X,ee,re,G,Z,ae,te;f(!0);try{var t=await Pe($);(t==null?void 0:t.status)===200&&((a=t==null?void 0:t.data)==null?void 0:a.status)==="success"&&(u("title",(n=(d=t==null?void 0:t.data)==null?void 0:d.SamplePaper)==null?void 0:n.title),u("ClassId",(p=(c=t==null?void 0:t.data)==null?void 0:c.SamplePaper)==null?void 0:p.classId),u("sectionId",(J=(Y=t==null?void 0:t.data)==null?void 0:Y.SamplePaper)==null?void 0:J.sectionId),u("subjectId",(Q=(O=t==null?void 0:t.data)==null?void 0:O.SamplePaper)==null?void 0:Q.subjectId),u("teacherId",(X=(z=t==null?void 0:t.data)==null?void 0:z.SamplePaper)==null?void 0:X.teacherId),u("status",(re=(ee=t==null?void 0:t.data)==null?void 0:ee.SamplePaper)==null?void 0:re.status),u("file",(Z=(G=t==null?void 0:t.data)==null?void 0:G.SamplePaper)==null?void 0:Z.samplePaperPath),F((te=(ae=t==null?void 0:t.data)==null?void 0:ae.SamplePaper)==null?void 0:te.samplePaperPath)),f(!1)}catch{f(!1)}},_=async t=>{var d,n;try{var a=await ue(o,t);(a==null?void 0:a.status)===200&&((d=a==null?void 0:a.data)==null?void 0:d.status)==="success"&&W((n=a==null?void 0:a.data)==null?void 0:n.teacher)}catch{f(!1)}},q=t=>{f(!0),u("ClassId",t);const a=I.find(d=>d.classId===t);a?(P(a.section||[]),w(a.subjects||[]),f(!1)):(P([]),w([]),f(!1))},L=async t=>{var d,n;f(!0);try{const c=new FormData;c.append("title",t==null?void 0:t.title),c.append("ClassId",t==null?void 0:t.ClassId),c.append("sectionId",t==null?void 0:t.sectionId),c.append("subjectId",t==null?void 0:t.subjectId),c.append("teacherId",t==null?void 0:t.teacherId),c.append("status",t==null?void 0:t.status),c.append("file",t==null?void 0:t.file[0]);var a=await De($,c);(a==null?void 0:a.status)===200&&((d=a==null?void 0:a.data)==null?void 0:d.status)==="success"&&(S.success((n=a==null?void 0:a.data)==null?void 0:n.message),x(!0),f(!1))}catch{f(!1)}};return e.jsx(e.Fragment,{children:e.jsxs(He,{children:[M&&e.jsx(pe,{}),e.jsxs("div",{className:"container-fluid ",children:[e.jsx("div",{className:"row",children:e.jsxs("form",{className:"p-3",onSubmit:V(L),children:[e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"exampleInputEmail1",className:"form-label font14",children:["Title ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"title",type:"text",className:`form-control font14 ${m.title?"border-danger":""}`,placeholder:"Enter Title",...b("title",{required:"Title is required *",validate:t=>/^[A-Z]/.test(t)?t.length<2?"Minimum Length is 2":/^[a-zA-Z0-9\s'-]+$/.test(t)?!0:"Invalid Characters in Title":"Title must start with an uppercase letter"})}),m.title&&e.jsx("p",{className:"font12 text-danger",children:m.title.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"ClassId",className:"form-label font14",children:["Class ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"ClassId",className:`form-select font14 ${m.ClassId?"border-danger":""}`,value:o,...b("ClassId",{required:"Class selection is required *"}),onChange:t=>q(t.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),I==null?void 0:I.map(t=>e.jsx("option",{value:t==null?void 0:t.classId,children:t==null?void 0:t.classNo},t.classId))]}),m.ClassId&&e.jsx("p",{className:"font12 text-danger",children:m.ClassId.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"sectionId",className:"form-label font14",children:["Section ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"sectionId",className:`form-select font14 ${m.sectionId?"border-danger":""}`,value:E,...b("sectionId",{required:"Section selection is required *"}),children:[e.jsx("option",{value:"",children:"-- Select --"}),C==null?void 0:C.map(t=>e.jsx("option",{value:t.classSecId,children:t.sectionName},t.classSecId))]}),m.sectionId&&e.jsx("p",{className:"font12 text-danger",children:m.sectionId.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"subjectId",className:"form-label font14",children:["Subject ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"subjectId",className:`form-select font14 ${m.subjectId?"border-danger":""}`,value:j,...b("subjectId",{required:"Subject selection is required *"}),children:[e.jsx("option",{value:"",children:"-- Select --"}),D==null?void 0:D.map(t=>e.jsx("option",{value:t.subjectId,children:t.subjectName},t.subjectId))]}),m.subjectId&&e.jsx("p",{className:"font12 text-danger",children:m.subjectId.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"teacherId",className:"form-label font14",children:["Teacher ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"teacherId",className:`form-select font14 ${m.teacherId?"border-danger":""}`,value:k,...b("teacherId",{required:"Teacher selection is required *"}),children:[e.jsx("option",{value:"",children:"-- Select --"}),U.map(t=>e.jsx("option",{value:t.staffId,children:t.staffName},t.staffId))]}),m.teacherId&&e.jsx("p",{className:"font12 text-danger",children:m.teacherId.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"status",className:"form-label font14",children:["Status ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("select",{id:"status",className:`form-select font14 ${m.status?"border-danger":""}`,...b("status",{required:"Status selection is required *"}),children:[e.jsx("option",{value:"",children:"-- Select --"}),e.jsx("option",{value:"Active",children:"Active"}),e.jsx("option",{value:"Draft",children:"Draft"}),e.jsx("option",{value:"Archives",children:"Archives"})]}),m.status&&e.jsx("p",{className:"font12 text-danger",children:m.status.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"exampleInputEmail1",className:"form-label font14",children:"Description"}),e.jsx("input",{id:"note",type:"text",className:`form-control font14 ${m.note?"border-danger":""}`,placeholder:"Enter Description",...b("note",{validate:t=>t?t.length<2?"Minimum Length is 2":/^[a-zA-Z0-9\s'-]+$/.test(t)?!0:"Invalid Characters in Description":!0})}),m.note&&e.jsx("p",{className:"font12 text-danger",children:m.note.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"file",className:"form-label font14",children:["Sample Paper Upload ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsxs("div",{className:"d-flex bg-white",children:[B!==null&&A?e.jsx("input",{id:"file",type:"text",className:"form-control formimagetext font14",value:B.split("/").pop(),disabled:!0}):e.jsx("input",{id:"file",type:"file",className:`form-control formimagetext font14 ${m.file?"border-danger":""}`,accept:".pdf, .docx",...b("file",{required:"Student Image is required *",validate:t=>t.length>0&&(t[0].size<10240||t[0].size>204800)?"File size must be between 10 KB to 200 KB":!0})}),e.jsx("div",{className:"formcontrolButtonborder p-1 ps-3 pe-3 text-center",children:e.jsx("span",{className:"text-white font14 align-self-center",onClick:()=>v(!A),children:B!==null&&A?"Edit":"View"})})]}),m.file&&e.jsx("p",{className:"font12 text-danger",children:m.file.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn updateCreateButtons text-white",type:"submit",children:"Update"}),e.jsx("button",{className:"btn cancelButtons ms-3",type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:"Cancel"})]})]})}),e.jsx(xe,{})]})]})})},Re=ie.div`
    select:-internal-list-box {
        overflow: visible !important;
        background-color: #00A67E !important;
    }

    .form-select {
        color: var(--greyState);
        box-shadow: none;
        border: 1px solid var(--formInputBorder) !important;
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

    .ExportBtns {
        border-radius: 6px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-control::placeholder, .form-control, .form-select {
        color: var(--greyState);
    }

    .form-control, .form-select {
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
    .formdltcheck:checked {
        background-color: #B50000;
        border-color: #B50000;
    }

    .formEditSpecFeatcheck:checked {
        background-color: #00A67E;
        border-color: #00A67E;
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
`,Ze=()=>{const[$,x]=r.useState(!1),H=localStorage.getItem("token"),[M,f]=r.useState(!1);r.useState(!0);const[I,y]=r.useState(!1),[C,P]=r.useState(""),[D,w]=r.useState(""),[U,W]=r.useState("");r.useState("");const[b,V]=r.useState(0),[m,u]=r.useState(0),[N,o]=r.useState(0),[E,j]=r.useState([]),[k,B]=r.useState([]),[F,A]=r.useState([]),[v,R]=r.useState([]),[T,_]=r.useState(!1),[q,L]=r.useState(!1),[t,a]=r.useState([]),[d,n]=r.useState(),[c,p]=r.useState(!1),[Y,J]=r.useState(1),[O,Q]=r.useState(1),[z,X]=r.useState(1),[ee,re]=r.useState(10),[G,Z]=r.useState(null);r.useEffect(()=>{if(Z(null),(z||T||q||c)&&K(C),ne(),H&&(me(),ge()),T){const s=document.getElementById("add_staticBackdrop");s&&((g.getInstance(s)||new g(s)).hide(),document.querySelectorAll(".offcanvas-backdrop").forEach(i=>i.remove())),_(!1),ne()}if(q){const s=document.getElementById("Edit_staticBackdrop");s&&((g.getInstance(s)||new g(s)).hide(),document.querySelectorAll(".offcanvas-backdrop").forEach(i=>i.remove())),L(!1),ne()}},[H,z,T,q,c]);const ae=s=>{const l=parseInt(s);V(l);const h=E.find(i=>i.classId===l);h?(B(h.section||[]),A(h.subjects||[])):(B([]),A([]))},te=s=>{X(s.selected+1)},me=async()=>{var s;try{const l=await he();if((l==null?void 0:l.status)===200){const h=(s=l==null?void 0:l.data)==null?void 0:s.split(`
`).map(i=>i.split(","));a(h)}}catch{}},ge=async()=>{var s;try{const l=await fe();(l==null?void 0:l.status)===200&&((s=l==null?void 0:l.data)==null?void 0:s.status)==="success"&&n(l==null?void 0:l.data)}catch{}},K=async s=>{var h,i;if(b>0||m>0||N>0)try{f(!0),x(!0);var l=await Ee(b,m,N,s==="search"?"":s,z,ee);(l==null?void 0:l.status)===200?((h=l==null?void 0:l.data)==null?void 0:h.status)==="success"&&(setTimeout(()=>{x(!1)},300),R((i=l==null?void 0:l.data)==null?void 0:i.samplePaper),Q(l.data.totalPages),J(l.data.currentPage),p(!0)):setTimeout(()=>{x(!1)},300)}catch{setTimeout(()=>{x(!1)},300)}},je=(s,l)=>{const h=window.URL.createObjectURL(s),i=document.createElement("a");i.href=h,i.download=l,document.body.appendChild(i),i.click(),document.body.removeChild(i),window.URL.revokeObjectURL(h)},ve=async s=>{try{x(!0);const h=await Te(s,{responseType:"blob"});if((h==null?void 0:h.status)===200){const i=h==null?void 0:h.data;je(i,"SamplPaper.pdf"),S.success("SamplPaper Downloaded Successfully"),setTimeout(()=>{x(!1)},300)}else setTimeout(()=>{x(!1)},300),S.error("Failed to download the SamplPaper.")}catch(l){x(!1),setTimeout(()=>{x(!1)},300),S.error("An error occurred while downloading the SamplPaper-",l)}},ne=async()=>{var l,h,i,se;try{x(!0);var s=await oe();(s==null?void 0:s.status)===200?((l=s==null?void 0:s.data)==null?void 0:l.status)==="success"&&(setTimeout(()=>{x(!1)},300),j((h=s==null?void 0:s.data)==null?void 0:h.classes)):setTimeout(()=>{x(!1)},300)}catch(le){x(!1),((se=(i=le==null?void 0:le.response)==null?void 0:i.data)==null?void 0:se.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},Ne=async s=>{var h;if(I)try{var l=await qe(s);if((l==null?void 0:l.status)===200){if(l.data.status==="success"){S.success((h=l==null?void 0:l.data)==null?void 0:h.message);const i=document.getElementById("Delete_staticBackdrop");i&&((g.getInstance(i)||new g(i)).hide(),document.querySelectorAll(".offcanvas-backdrop").forEach(Be=>Be.remove())),K(""),y(!1)}}else S.error(l==null?void 0:l.error)}catch(i){x(!1),console.error("Error during login:",i)}},Se=()=>{_(!0)},Ie=()=>{L(!0)},ye=()=>{V(0),u(0),o(0),R([]),K("")};r.useState(!0);const Ce=s=>{Z(G===s?null:s)},we=()=>{K(C)},ke=()=>{const s=document.getElementById("add_staticBackdrop");new g(s).show()};return e.jsx(e.Fragment,{children:e.jsxs(Re,{children:[$&&e.jsx(pe,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[e.jsxs("div",{className:"col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"SamplePaper"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"SamplePaper"})]}),e.jsx("div",{className:"col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0",children:e.jsx($e,{showAddButton:!0,addButtonText:"Add Sample Paper",addButtonAction:ke,showSearch:!0,searchAction:we,showExportPDF:v.length>0,exportPDFText:"Export PDF",exportPDFAction:fe,exportPDFFileName:"Sample Paper.pdf",showExportCSV:v.length>0,exportCSVText:"Export CSV",exportCSVAction:he,exportCSVFileName:"Sample PAper.xlsx"})})]}),e.jsx("div",{className:"row pb-3",children:e.jsxs("div",{className:"bg-white rounded-2 p-4",children:[e.jsxs("form",{className:"row g-3",children:[e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"inputEmail4",className:"form-label font14",children:"Class"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",value:b,onChange:s=>ae(s.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),E==null?void 0:E.map(s=>e.jsx("option",{value:s==null?void 0:s.classId,children:s==null?void 0:s.classNo},s.classId))]})]}),e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"inputEmail4",className:"form-label font14",children:"Section"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",value:m,onChange:s=>u(s.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),k==null?void 0:k.map(s=>e.jsx("option",{value:s.classSecId,children:s.sectionName},s.classSecId))]})]}),e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"inputEmail4",className:"form-label font14",children:"Subject"}),e.jsxs("select",{className:"form-select bordeRadius5 font14","aria-label":"Default select example",value:N,onChange:s=>o(s.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),F==null?void 0:F.map(s=>e.jsx("option",{value:s.subjectId,children:s.subjectName},s.subjectId))]})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{type:"button",className:"btn addCategoryButtons text-white",onClick:()=>K(""),disabled:b===0||m===0||N===0,children:"Search"}),e.jsx("button",{type:"button",className:"btn cancelButtons ms-3",onClick:ye,children:"Cancel"})]})]}),M?e.jsx("div",{className:"row",children:v&&v.length===0?e.jsx("div",{className:"d-flex justify-content-center p-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid"})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-scroll",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"textWrapClass tableHeading text-center",children:e.jsx("span",{className:"font14",children:"#"})}),e.jsx("th",{className:"textWrapClass tableHeading",children:e.jsx("span",{className:"font14",children:"Title"})}),e.jsx("th",{className:"textWrapClass tableHeading",children:e.jsx("span",{className:"font14",children:"Class"})}),e.jsx("th",{className:"textWrapClass tableHeading",children:e.jsx("span",{className:"font14",children:"Section"})}),e.jsx("th",{className:"textWrapClass tableHeading",children:e.jsx("span",{className:"font14",children:"Subject"})}),e.jsx("th",{className:"textWrapClass tableHeading",children:e.jsx("span",{className:"font14",children:"Teacher"})}),e.jsx("th",{className:"textWrapClass tableHeading",children:e.jsx("span",{className:"font14",children:"Download"})}),e.jsx("th",{className:"textWrapClass tableHeading text-center",children:e.jsx("span",{className:"font14",children:"Action"})})]})}),e.jsx("tbody",{children:v.map((s,l)=>e.jsxs("tr",{className:"align-middle",children:[e.jsx("th",{className:"textWrapClass text-center greyText",children:e.jsx("span",{className:"font14",children:l+1})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("span",{className:"font14 align-self-start",children:s.title})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("span",{className:"font14 align-self-start",children:s.classNo})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("span",{className:"font14 align-self-start",children:s.sectionName})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("span",{className:"font14 align-self-start",children:s.subjectName})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("span",{className:"font14 align-self-start",children:s.teacherName})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsxs("p",{className:"font14 align-self-start m-0",children:[e.jsx(de,{icon:"bxs:file-pdf",width:"1.3em",height:"1.3em",style:{color:"red"}}),e.jsx(ce,{className:"ms-2",to:"",onClick:()=>ve(s.sampleId),children:"Download"})]})}),e.jsx("td",{className:"textWrapClass text-center",children:e.jsxs("div",{className:"dropdown dropdownbtn",children:[e.jsx("button",{className:"btn btn-sm actionButtons dropdown-toggle",type:"button",onClick:()=>Ce(l),children:e.jsx("span",{children:"Action"})}),e.jsxs("ul",{className:`dropdown-menu dropdown-menu-end ${G===l?"show z-index-high":""}`,children:[e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Edit_staticBackdrop","aria-controls":"Edit_staticBackdrop",onClick:()=>{w(s.sampleId),L(!1)},children:"Edit"})}),e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Delete_staticBackdrop","aria-controls":"Delete_staticBackdrop",onClick:()=>W(s.sampleId),children:"Delete"})})]})]})})]},s.sampleId))})]})}),e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",Y," of ",O," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(Fe,{previousLabel:e.jsx(de,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(de,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:O,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:te,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]})}):e.jsx("div",{className:"d-flex justify-content-center p-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid"})})]})}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"add_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-1",children:[e.jsx(ce,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:()=>{const s=document.getElementById("add_staticBackdrop");(g.getInstance(s)||new g(s)).hide(),document.querySelectorAll(".offcanvas-backdrop").forEach(i=>i.remove())},children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Sample Paper Add"})]}),e.jsx("div",{className:"offcanvas-body p-0",children:e.jsx(Le,{addedSuccess:Se})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Edit_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-1",children:[e.jsx(ce,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:()=>{const s=document.getElementById("Edit_staticBackdrop");(g.getInstance(s)||new g(s)).hide(),document.querySelectorAll(".offcanvas-backdrop").forEach(i=>i.remove())},children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"SamplePaper Edit"})]}),e.jsx("div",{className:"offcanvas-body p-0",children:e.jsx(We,{EditItemId:D,EditedSuccess:Ie})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Delete_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header ps-0 modalHighborder p-1",children:[e.jsx(ce,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:()=>{const s=document.getElementById("Delete_staticBackdrop");(g.getInstance(s)||new g(s)).hide(),document.querySelectorAll(".offcanvas-backdrop").forEach(i=>i.remove()),y(!1)},children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#B50000",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("span",{className:"offcanvas-title",id:"staticBackdropLabel",children:"SamplePaper"})]}),e.jsx("div",{className:"offcanvas-body p-0",children:e.jsx("div",{children:e.jsxs("div",{className:"",children:[e.jsx("p",{className:"modalLightBorder p-2",children:"SamplePaper"}),e.jsxs("p",{className:"text-center p-3",children:[" ",e.jsx("img",{src:"/images/errorI.svg",className:"img-fluid",alt:""})]}),e.jsx("p",{className:"text-center warningHeading",children:"Are you Sure?"}),e.jsxs("p",{className:"text-center greyText warningText pt-2",children:["This Action will permanently delete",e.jsx("br",{}),"the Sample Paper Data"]}),e.jsxs("p",{className:"text-center warningText p-2",children:[e.jsx("input",{className:"form-check-input formdltcheck me-2",type:"checkbox",checked:I,id:"flexCheckChecked",onChange:s=>y(s.target.checked)}),"I Agree to delete the Sample Paper Data"]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn deleteButtons text-white",onClick:()=>Ne(U),children:"Delete"}),e.jsx("button",{className:"btn dltcancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:()=>{const s=document.getElementById("Delete_staticBackdrop");(g.getInstance(s)||new g(s)).hide(),document.querySelectorAll(".offcanvas-backdrop").forEach(i=>i.remove()),y(!1)},children:"Cancel"})]})]})})})]})]})]})})};export{Ze as default};
