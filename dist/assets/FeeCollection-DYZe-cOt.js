import{u as G,r as f,E as K,$ as h,bf as Q,bm as X,j as e,D as _,bt as ee}from"./index-DHII64NA.js";import{u as se}from"./index.esm-ByE6_xdu.js";const te=G.div`
  overflow: scroll;

  .checkedinputsbg {
    background-color: #F9F9F9;
  }

  .hideScrollBar::-webkit-scrollbar {
    display: none !important;
  }

  .form-control::placeholder,
  .form-control,
  .form-select {
    color: var(--greyState);
  }

  .form-control,
  .form-select {
    border-radius: 5px ;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .AddBtnn,
  .AddBtnn:visited,
  .AddBtnn:active {
    border: 1px solid var(--breadCrumActiveTextColor);
    background-color: var(--breadCrumActiveTextColor);
  }

  .CancelBtnn,
  .CancelBtnn:active {
    border: 1px solid var(--BtnBorder);
  }

  .form-check-input:checked {
    background-color: #008479;
    border-color: #008479;
    box-shadow: none !important;
  }

  .form-check-input:focus {
    box-shadow: none !important;
    outline: none;
  }

  .custom-dropdown {
    position: relative;
  }

  .custom-dropdown-toggle {
    width: 100%;
    text-align: left;
    padding: 0.375rem 0.75rem;
    background-color: #fff;
    border: 1px solid var(--fontControlBorder);
    border-radius: 5px;
    cursor: pointer;
  }

  .custom-dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    background-color: #fff;
    border: 1px solid var(--fontControlBorder);
    border-radius: 5px;
    padding: 0.5rem;
    display: none;
  }

  .custom-dropdown.open .custom-dropdown-menu {
    display: block;
  }

  .form-check {
    margin-bottom: 0.5rem;
  }

  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`,ae=()=>{var E;const[C,m]=f.useState(!1),[k,w]=f.useState([]),[S,B]=f.useState([]),[j,q]=f.useState([]),[y,I]=f.useState([]),[F,b]=f.useState([]),N=f.useRef(null),R=["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"],{register:u,handleSubmit:M,setValue:x,watch:g,reset:T,formState:{errors:l,isValid:$}}=se({defaultValues:{classNo:"",section:"",studentId:[],feeTypeId:[],feeAmount:"",months:[],dueDate:"",applicableDiscount:"",discountId:"",status:"",description:""},mode:"onChange"}),Y=g("classNo"),L=g("section"),U=g("applicableDiscount"),D=g("feeTypeId");f.useEffect(()=>{V(),P(),A();const t=s=>{N.current&&!N.current.contains(s.target)&&N.current.classList.remove("open")};return document.addEventListener("mousedown",t),()=>{document.removeEventListener("mousedown",t)}},[]);const A=async()=>{var t,s,c,n,r,i;try{m(!0);const o=await K();(o==null?void 0:o.status)===200&&((t=o==null?void 0:o.data)==null?void 0:t.status)==="success"?q(o.data.classes||[]):h.error(((s=o==null?void 0:o.data)==null?void 0:s.message)||"Failed to fetch classes")}catch(o){h.error(((n=(c=o==null?void 0:o.response)==null?void 0:c.data)==null?void 0:n.message)||"Failed to fetch classes"),((i=(r=o==null?void 0:o.response)==null?void 0:r.data)==null?void 0:i.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}finally{m(!1)}},V=async()=>{var t,s,c,n,r,i;try{m(!0);const o=await Q("","","");(o==null?void 0:o.status)===200&&((t=o==null?void 0:o.data)==null?void 0:t.status)==="success"?w(o.data.feeTypes||[]):h.error(((s=o==null?void 0:o.data)==null?void 0:s.message)||"Failed to fetch fee types")}catch(o){h.error(((n=(c=o==null?void 0:o.response)==null?void 0:c.data)==null?void 0:n.message)||"Error fetching fee types"),((i=(r=o==null?void 0:o.response)==null?void 0:r.data)==null?void 0:i.statusCode)===401&&localStorage.removeItem("token")}finally{m(!1)}},P=async()=>{var t,s,c,n,r,i;try{m(!0);const o=await X("","","");(o==null?void 0:o.status)===200&&((t=o==null?void 0:o.data)==null?void 0:t.status)==="success"?B(o.data.discounts||[]):h.error(((s=o==null?void 0:o.data)==null?void 0:s.message)||"Failed to fetch fee discounts")}catch(o){h.error(((n=(c=o==null?void 0:o.response)==null?void 0:c.data)==null?void 0:n.message)||"Error fetching fee discounts"),((i=(r=o==null?void 0:o.response)==null?void 0:r.data)==null?void 0:i.statusCode)===401&&(localStorage.removeItem("token"),navigate("/"))}finally{m(!1)}},O=t=>{x("classNo",t),x("section",""),x("studentId",[]);const s=j.find(c=>c.classNo===t);s?(I(s.section||[]),b([])):(I([]),b([]))},z=t=>{x("section",t),x("studentId",[]);const s=y.find(c=>c.sectionName===t);s&&s.studentDTO?b(s.studentDTO):b([])},J=t=>{const s=Number(t.target.value),c=D||[],n=t.target.checked?[...c,s]:c.filter(r=>r!==s);x("feeTypeId",n,{shouldValidate:!0})},Z=()=>{N.current&&N.current.classList.toggle("open")},H=async t=>{var s,c,n,r,i,o;try{m(!0);const a=new FormData;if(a.append("classNo",t.classNo),a.append("section",t.section),Array.isArray(t.studentId))t.studentId.forEach((p,v)=>{a.append("studentId",(isNaN(p),p))});else{const p=Number(t.studentId.replace(/^\D+/g,""));a.append("studentId[0]",isNaN(p)?parseInt(t.studentId):p)}Array.isArray(t.feeTypeId)?t.feeTypeId.forEach((p,v)=>{a.append("feeTypeId",Number(p))}):a.append("feeTypeId[0]",Number(t.feeTypeId)),a.append("months",t.months),a.append("dueDate",t.dueDate),a.append("applicableDiscount",t.applicableDiscount==="Yes"),a.append("discountId",t.applicableDiscount==="Yes"?t.discountId:""),a.append("status",t.status),a.append("description",t.description||"");const d=await ee(a);(d==null?void 0:d.status)===200&&((s=d==null?void 0:d.data)==null?void 0:s.status)==="success"?(h.success(d.data.message||"Invoice added successfully"),T(),I([]),b([])):h.error(((c=d==null?void 0:d.data)==null?void 0:c.message)||"Failed to add invoice")}catch(a){h.error(((r=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:r.message)||"Error adding invoice"),((o=(i=a==null?void 0:a.response)==null?void 0:i.data)==null?void 0:o.statusCode)===401&&(localStorage.removeItem("token"),navigate("/"))}finally{m(!1)}};return e.jsxs(te,{className:"container-fluid p-4",children:[C&&e.jsx(_,{}),e.jsx("form",{onSubmit:M(H),children:e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"classNo",className:"form-label font14",children:"Class"}),e.jsxs("select",{id:"classNo",className:`form-select font14 ${l.classNo?"border-danger":""}`,...u("classNo",{required:"Class is required * "}),onChange:t=>O(t.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),j==null?void 0:j.map(t=>e.jsx("option",{value:t.classNo,children:t.classNo},t.classId))]}),l.classNo&&e.jsx("span",{className:"error-message",children:l.classNo.message})]}),e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"section",className:"form-label font14",children:"Section"}),e.jsxs("select",{id:"section",className:`form-select font14 ${l.section?"border-danger":""}`,...u("section",{required:"Section is required * "}),onChange:t=>z(t.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),y.length>0?y.map(t=>e.jsx("option",{value:t.sectionName,children:t.sectionName},t.classSecId)):e.jsx("option",{value:"",disabled:!0,children:Y?"-- No Sections Found --":"-- Select Class First --"})]}),l.section&&e.jsx("span",{className:"error-message",children:l.section.message})]}),e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"studentId",className:"form-label font14",children:"Student"}),e.jsxs("select",{id:"studentId",className:`form-select font14 ${l.studentId?"border-danger":""}`,...u("studentId",{required:"Student is required * ",setValueAs:t=>[t]}),onChange:t=>{x("studentId",[t.target.value],{shouldValidate:!0})},children:[e.jsx("option",{value:"",children:"-- Select --"}),F.length>0?F.map(t=>e.jsx("option",{value:t.id,children:t.studentName},t.studentId)):e.jsx("option",{value:"",disabled:!0,children:L?"-- No Students Found --":"-- Select Section First --"})]}),l.studentId&&e.jsx("span",{className:"error-message",children:l.studentId.message})]}),e.jsxs("div",{className:"col-12",children:[e.jsx("label",{className:"form-label font14",children:"Fee Type"}),e.jsx("div",{className:"row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-2 checkedinputsbg px-2 py-2 mt-1",children:k.map(t=>e.jsx("div",{className:"col",children:e.jsxs("div",{className:"form-check",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",name:"feeTypeId",value:t.feeTypeModelId,checked:(D==null?void 0:D.includes(t.feeTypeModelId))||!1,onChange:J}),e.jsx("label",{className:"form-check-label font14",children:t.title})]})},t.feeTypeModelId))}),l.feeTypeId&&e.jsx("span",{className:"error-message",children:l.feeTypeId.message})]}),e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"months",className:"form-label font14",children:"Month"}),e.jsxs("div",{className:"custom-dropdown",ref:N,children:[e.jsx("button",{type:"button",className:"custom-dropdown-toggle font14",onClick:Z,children:((E=g("months"))==null?void 0:E.length)>0?g("months").join(", "):"Select Month"}),e.jsx("div",{className:"custom-dropdown-menu",children:R.map(t=>e.jsxs("div",{className:"form-check",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",value:t,...u("months",{validate:s=>s.length>0||"At least one month is required * "}),onChange:s=>{const c=g("months")||[],n=s.target.checked?[...c,s.target.value]:c.filter(r=>r!==s.target.value);x("months",n,{shouldValidate:!0})}}),e.jsx("label",{className:"form-check-label font14",children:t})]},t))})]}),l.months&&e.jsx("span",{className:"error-message",children:l.months.message})]}),e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"dueDate",className:"form-label font14",children:"Due Date"}),e.jsx("input",{type:"date",id:"dueDate",className:`form-control font14 ${l.dueDate?"border-danger":""}`,...u("dueDate",{required:"Due date is required * "})}),l.dueDate&&e.jsx("span",{className:"error-message",children:l.dueDate.message})]}),e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"applicableDiscount",className:"form-label font14",children:"Is Applicable Discount?"}),e.jsxs("select",{id:"applicableDiscount",className:`form-select font14 ${l.applicableDiscount?"border-danger":""}`,...u("applicableDiscount",{required:"Discount selection is required * "}),children:[e.jsx("option",{value:"",children:"Select Discount"}),e.jsx("option",{value:"Yes",children:"Yes"}),e.jsx("option",{value:"No",children:"No"})]}),l.applicableDiscount&&e.jsx("span",{className:"error-message",children:l.applicableDiscount.message})]}),U==="Yes"&&e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"discountId",className:"form-label font14",children:"Fee Discount"}),e.jsxs("select",{id:"discountId",className:`form-select font14 ${l.discountId?"border-danger":""}`,...u("discountId",{required:"Discount is required when applicable"}),children:[e.jsx("option",{value:"",children:"Select Discount"}),S==null?void 0:S.map(t=>e.jsx("option",{value:t.discountId,children:t.title},t.discountId))]}),l.discountId&&e.jsx("span",{className:"error-message",children:l.discountId.message})]}),e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"status",className:"form-label font14",children:"Paid Status"}),e.jsxs("select",{id:"status",className:`form-select font14 ${l.status?"border-danger":""}`,...u("status",{required:"Paid status is required * "}),children:[e.jsx("option",{value:"",children:"Select Status"}),e.jsx("option",{value:"PAID",children:"Paid"}),e.jsx("option",{value:"UNPAID",children:"Unpaid"})]}),l.status&&e.jsx("span",{className:"error-message",children:l.status.message})]}),e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"description",className:"form-label machine",children:"Description"}),e.jsx("input",{type:"text",id:"description",className:`form-control font14 ${l.description?"border-danger":""}`,placeholder:"Enter Description",...u("description",{validate:t=>!t||(/^[A-Z]/.test(t)||"Description must start with an uppercase letter")&&(t.length>=4||"Minimum Length is 4")&&(/^[a-zA-Z\s'.]+$/.test(t)||"Invalid Characters in Description")})})]}),e.jsxs("div",{className:"col-12 text-center",children:[e.jsx("button",{className:"btn AddBtnn font14 text-white",type:"submit",disabled:!$,children:"Submit"}),e.jsx("button",{className:"btn CancelBtnn font14 ms-2",type:"button",onClick:()=>{T(),I([]),b([])},children:"Cancel"})]})]})})]})},oe=G.div`
  overflow: scroll;

  .checkedinputsbg {
    background-color: #F9F9F9;
  }

  .hideScrollBar::-webkit-scrollbar {
    display: none !important;
  }

  .form-control::placeholder,
  .form-control,
  .form-select {
    color: var(--greyState);
  }

  .form-control,
  .form-select {
    border-radius: 5px ;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .AddBtnn,
  .AddBtnn:visited,
  .AddBtnn:active {
    border: 1px solid var(--breadCrumActiveTextColor);
    background-color: var(--breadCrumActiveTextColor);
  }

  .CancelBtnn,
  .CancelBtnn:active {
    border: 1px solid var(--BtnBorder);
  }

  .form-check-input:checked {
    background-color: #008479;
    border-color: #008479;
    box-shadow: none !important;
  }

  .form-check-input:focus {
    box-shadow: none !important;
    outline: none;
  }

  .custom-dropdown {
    position: relative;
  }

  .custom-dropdown-toggle {
    width: 100%;
    text-align: left;
    padding: 0.375rem 0.75rem;
    background-color: #fff;
    border: 1px solid var(--fontControlBorder);
    border-radius: 5px;
    cursor: pointer;
  }

  .custom-dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    background-color: #fff;
    border: 1px solid var(--fontControlBorder);
    border-radius: 5px;
    padding: 0.5rem;
    display: none;
  }

  .custom-dropdown.open .custom-dropdown-menu {
    display: block;
  }

  .form-check {
    margin-bottom: 0.5rem;
  }

  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`,ce=()=>{var t;const[C,m]=f.useState(!1),[k,w]=f.useState([]),[S,B]=f.useState([]),[j,q]=f.useState([]),[y,I]=f.useState([]),[F,b]=f.useState([]),N=f.useRef(null),R=["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"],{register:u,handleSubmit:M,setValue:x,watch:g,reset:T,formState:{errors:l,isValid:$}}=se({defaultValues:{classNo:"",section:"",studentId:[],feeTypeId:[],feeAmount:"",months:[],dueDate:"",applicableDiscount:"",discountId:"",status:"",description:""},mode:"onChange"}),Y=g("classNo"),L=g("section"),U=g("applicableDiscount"),D=g("feeTypeId"),A=g("studentId");f.useEffect(()=>{P(),O(),V();const s=c=>{N.current&&!N.current.contains(c.target)&&N.current.classList.remove("open")};return document.addEventListener("mousedown",s),()=>{document.removeEventListener("mousedown",s)}},[]);const V=async()=>{var s,c,n,r,i,o;try{m(!0);const a=await K();(a==null?void 0:a.status)===200&&((s=a==null?void 0:a.data)==null?void 0:s.status)==="success"?q(a.data.classes||[]):h.error(((c=a==null?void 0:a.data)==null?void 0:c.message)||"Failed to fetch classes")}catch(a){h.error(((r=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:r.message)||"Failed to fetch classes"),((o=(i=a==null?void 0:a.response)==null?void 0:i.data)==null?void 0:o.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}finally{m(!1)}},P=async()=>{var s,c,n,r,i,o;try{m(!0);const a=await Q("","","");(a==null?void 0:a.status)===200&&((s=a==null?void 0:a.data)==null?void 0:s.status)==="success"?w(a.data.feeTypes||[]):h.error(((c=a==null?void 0:a.data)==null?void 0:c.message)||"Failed to fetch fee types")}catch(a){h.error(((r=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:r.message)||"Error fetching fee types"),((o=(i=a==null?void 0:a.response)==null?void 0:i.data)==null?void 0:o.statusCode)===401&&localStorage.removeItem("token")}finally{m(!1)}},O=async()=>{var s,c,n,r,i,o;try{m(!0);const a=await X("","","");(a==null?void 0:a.status)===200&&((s=a==null?void 0:a.data)==null?void 0:s.status)==="success"?B(a.data.discounts||[]):h.error(((c=a==null?void 0:a.data)==null?void 0:c.message)||"Failed to fetch fee discounts")}catch(a){h.error(((r=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:r.message)||"Error fetching fee discounts"),((o=(i=a==null?void 0:a.response)==null?void 0:i.data)==null?void 0:o.statusCode)===401&&(localStorage.removeItem("token"),navigate("/"))}finally{m(!1)}},z=s=>{x("classNo",s),x("section",""),x("studentId",[]);const c=j.find(n=>n.classNo===s);c?(I(c.section||[]),b([])):(I([]),b([]))},J=s=>{x("section",s),x("studentId",[]);const c=y.find(n=>n.sectionName===s);c&&c.studentDTO?b(c.studentDTO):b([])},Z=s=>{const c=Number(s.target.value),n=D||[],r=s.target.checked?[...n,c]:n.filter(i=>i!==c);x("feeTypeId",r,{shouldValidate:!0})},H=()=>{N.current&&N.current.classList.toggle("open")},E=async s=>{var c,n,r,i,o,a;try{m(!0);const d=new FormData;if(d.append("classNo",s.classNo),d.append("section",s.section),Array.isArray(s.studentId))s.studentId.forEach((v,W)=>{d.append(`studentId[${W}]`,(isNaN(v),v))});else{const v=Number(s.studentId.replace(/^\D+/g,""));d.append("studentId[0]",isNaN(v)?s.studentId:v)}Array.isArray(s.feeTypeId)?s.feeTypeId.forEach((v,W)=>{d.append(`feeTypeId[${W}]`,Number(v))}):d.append("feeTypeId[0]",Number(s.feeTypeId)),d.append("months",s.months),d.append("dueDate",s.dueDate),d.append("applicableDiscount",s.applicableDiscount==="Yes"),d.append("discountId",s.applicableDiscount==="Yes"?s.discountId:""),d.append("status",s.status),d.append("description",s.description||"");const p=await ee(d);(p==null?void 0:p.status)===200&&((c=p==null?void 0:p.data)==null?void 0:c.status)==="success"?(h.success(p.data.message||"Invoice added successfully"),T(),I([]),b([])):h.error(((n=p==null?void 0:p.data)==null?void 0:n.message)||"Failed to add invoice")}catch(d){h.error(((i=(r=d==null?void 0:d.response)==null?void 0:r.data)==null?void 0:i.message)||"Error adding invoice"),((a=(o=d==null?void 0:d.response)==null?void 0:o.data)==null?void 0:a.statusCode)===401&&(localStorage.removeItem("token"),navigate("/"))}finally{m(!1)}};return e.jsxs(oe,{className:"container-fluid p-4",children:[C&&e.jsx(_,{}),e.jsx("form",{onSubmit:M(E),children:e.jsxs("div",{className:"row g-3",children:[e.jsxs("div",{className:"col-12 col-sm-6 col-md-6",children:[e.jsx("label",{htmlFor:"classNo",className:"form-label font14",children:"Class"}),e.jsxs("select",{id:"classNo",className:`form-select font14 ${l.classNo?"border-danger":""}`,...u("classNo",{required:"Class is required * "}),onChange:s=>z(s.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),j==null?void 0:j.map(s=>e.jsx("option",{value:s.classNo,children:s.classNo},s.classId))]}),l.classNo&&e.jsx("span",{className:"error-message",children:l.classNo.message})]}),e.jsxs("div",{className:"col-12 col-sm-6 col-md-6",children:[e.jsx("label",{htmlFor:"section",className:"form-label font14",children:"Section"}),e.jsxs("select",{id:"section",className:`form-select font14 ${l.section?"border-danger":""}`,...u("section",{required:"Section is required * "}),onChange:s=>J(s.target.value),children:[e.jsx("option",{value:"",children:"-- Select --"}),y.length>0?y.map(s=>e.jsx("option",{value:s.sectionName,children:s.sectionName},s.classSecId)):e.jsx("option",{value:"",disabled:!0,children:Y?"-- No Sections Found --":"-- Select Class First --"})]}),l.section&&e.jsx("span",{className:"error-message",children:l.section.message})]}),e.jsxs("div",{className:"col-12",children:[e.jsx("label",{className:"form-label font14",children:"Student"}),e.jsx("div",{className:"row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-2 checkedinputsbg px-2 py-2 mt-1",children:F.length>0?F.map(s=>e.jsx("div",{className:"col",children:e.jsxs("div",{className:"form-check",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",name:"studentId",value:s.id,checked:(A==null?void 0:A.includes(String(s.studentId)))||!1,...u("studentId",{required:"At least one student is required * "}),onChange:c=>{const n=String(c.target.value),r=A||[],i=c.target.checked?[...r,n]:r.filter(o=>o!==n);x("studentId",i,{shouldValidate:!0})}}),e.jsx("label",{className:"form-check-label font14",children:s.studentName})]})},s.studentId)):e.jsx("span",{className:"mt-0 greyText",children:L?"-- No Students Found --":"-- Select Section First --"})}),l.studentId&&e.jsx("span",{className:"error-message",children:l.studentId.message})]}),e.jsxs("div",{className:"col-12",children:[e.jsx("label",{className:"form-label font14",children:"Fee Type"}),e.jsx("div",{className:"row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-2 checkedinputsbg px-2 py-2 mt-1",children:k.map(s=>e.jsx("div",{className:"col",children:e.jsxs("div",{className:"form-check",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",name:"feeTypeId",value:s.feeTypeModelId,checked:(D==null?void 0:D.includes(s.feeTypeModelId))||!1,onChange:Z}),e.jsx("label",{className:"form-check-label font14",children:s.title})]})},s.feeTypeModelId))}),l.feeTypeId&&e.jsx("span",{className:"error-message",children:l.feeTypeId.message})]}),e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"months",className:"form-label font14",children:"Month"}),e.jsxs("div",{className:"custom-dropdown",ref:N,children:[e.jsx("button",{type:"button",className:"custom-dropdown-toggle font14",onClick:H,children:((t=g("months"))==null?void 0:t.length)>0?g("months").join(", "):"Select Month"}),e.jsx("div",{className:"custom-dropdown-menu",children:R.map(s=>e.jsxs("div",{className:"form-check",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",value:s,...u("months",{validate:c=>c.length>0||"At least one month is required * "}),onChange:c=>{const n=g("months")||[],r=c.target.checked?[...n,c.target.value]:n.filter(i=>i!==c.target.value);x("months",r,{shouldValidate:!0})}}),e.jsx("label",{className:"form-check-label font14",children:s})]},s))})]}),l.months&&e.jsx("span",{className:"error-message",children:l.months.message})]}),e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"dueDate",className:"form-label font14",children:"Due Date"}),e.jsx("input",{type:"date",id:"dueDate",className:`form-control font14 ${l.dueDate?"border-danger":""}`,...u("dueDate",{required:"Due date is required * "})}),l.dueDate&&e.jsx("span",{className:"error-message",children:l.dueDate.message})]}),e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"applicableDiscount",className:"form-label font14",children:"Is Applicable Discount?"}),e.jsxs("select",{id:"applicableDiscount",className:`form-select font14 ${l.applicableDiscount?"border-danger":""}`,...u("applicableDiscount",{required:"Discount selection is required * "}),children:[e.jsx("option",{value:"",children:"Select Discount"}),e.jsx("option",{value:"Yes",children:"Yes"}),e.jsx("option",{value:"No",children:"No"})]}),l.applicableDiscount&&e.jsx("span",{className:"error-message",children:l.applicableDiscount.message})]}),U==="Yes"&&e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"discountId",className:"form-label font14",children:"Fee Discount"}),e.jsxs("select",{id:"discountId",className:`form-select font14 ${l.discountId?"border-danger":""}`,...u("discountId",{required:"Discount is required when applicable"}),children:[e.jsx("option",{value:"",children:"Select Discount"}),S==null?void 0:S.map(s=>e.jsx("option",{value:s.discountId,children:s.title},s.discountId))]}),l.discountId&&e.jsx("span",{className:"error-message",children:l.discountId.message})]}),e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"status",className:"form-label font14",children:"Paid Status"}),e.jsxs("select",{id:"status",className:`form-select font14 ${l.status?"border-danger":""}`,...u("status",{required:"Paid status is required * "}),children:[e.jsx("option",{value:"",children:"Select Status"}),e.jsx("option",{value:"PAID",children:"Paid"}),e.jsx("option",{value:"UNPAID",children:"Unpaid"})]}),l.status&&e.jsx("span",{className:"error-message",children:l.status.message})]}),e.jsxs("div",{className:"col-12 col-sm-6 col-md-4",children:[e.jsx("label",{htmlFor:"description",className:"form-label machine",children:"Description"}),e.jsx("input",{type:"text",id:"description",className:`form-control font14 ${l.description?"border-danger":""}`,placeholder:"Enter Description",...u("description",{validate:s=>!s||(/^[A-Z]/.test(s)||"Description must start with an uppercase letter")&&(s.length>=4||"Minimum Length is 4")&&(/^[a-zA-Z\s'.]+$/.test(s)||"Invalid Characters in Description")})})]}),e.jsxs("div",{className:"col-12 text-center",children:[e.jsx("button",{className:"btn AddBtnn font14 text-white",type:"submit",disabled:!$,children:"Submit"}),e.jsx("button",{className:"btn CancelBtnn font14 ms-2",type:"button",onClick:()=>{T(),I([]),b([])},children:"Cancel"})]})]})})]})},le=G.div`
    overflow : scroll;

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ActiveState{
        cursor: pointer;
        color: #000;
        border-bottom: 3px solid orange;
    }

    .InActiveState{
        cursor: pointer;
        color: var(--greyState);
    }

    @media screen and (max-width: 598px) and (min-width: 576px) {
        .fontSizeResponsive{
            font-size: 14px !important;
        }
    }

    @media screen and (max-width: 575px) and (min-width: 6px) {
        .fontSizeResponsive{
            
        }
    }

`,de=()=>{const[C,m]=f.useState(!0),[k,w]=f.useState(!1);return e.jsx(e.Fragment,{children:e.jsx(le,{children:e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"row p-3",children:[e.jsxs("div",{className:"row pb-3",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item","aria-current":"page",children:e.jsx("a",{href:"/admin/feeCollection/feesDiscount",className:"bredcrumText text-decoration-none",children:"Fee Collection"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Fee Collection"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Fee Collection"})]}),e.jsx("div",{className:"row pb-3",children:e.jsxs("div",{className:"bg-white rounded-2 p-4",children:[e.jsx("div",{className:"row border-bottom border-2 ",children:e.jsx("div",{className:"col-xxl-6 col-xl-12 col-sm-12 col-12",children:e.jsxs("div",{className:"row pb-2 gap-sm-0 gap-3",children:[e.jsx("div",{className:"col-md-5 col-sm-6 col-12 text-center",children:e.jsx("span",{className:`font14 fontSizeResponsive fontWeight500 ps-3 pb-2 pe-3 ${C?"ActiveState":"InActiveState"}`,onClick:()=>{m(!0),w(!1)},children:"Create Single Invoice"})}),e.jsx("div",{className:"col-md-5 col-sm-6 col-12 text-center",children:e.jsx("span",{className:`font14 fontSizeResponsive fontWeight500 ps-3 pb-2 pe-3 ${k?"ActiveState":"InActiveState"}`,onClick:()=>{m(!1),w(!0)},children:"Create Bulk Invoice"})})]})})}),e.jsx("div",{className:"row",children:C?e.jsx(ae,{}):e.jsx(ce,{})})]})})]})})})})};export{de as default};
