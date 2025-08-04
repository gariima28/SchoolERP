import{u as Ae,a as Se,r,bf as ke,_ as d,E as Be,j as e,D as Ie,bg as De,bh as Ee,I as F,R as Pe,L as A,c as Ve,bi as Le,bj as He,bk as Oe,bl as Me}from"./index-DHII64NA.js";import"./Link-B_f3HVnI.js";import{u as V}from"./index.esm-ByE6_xdu.js";import{d as Ue,A as $e}from"./ActionControls-BF7LUwxs.js";import{O as x}from"./bootstrap.esm-CBxLh-YC.js";import"./index-BKNjMPK8.js";const Re=Ae.div`
  .blueText {
    color: var(--blueTextColor);
  }

  .form-check-input {
    height: 18px !important;
    width: 18px !important;
  }

  .form-check-input:checked {
    align-self: center;
    background-color: #008479;
    border-color: #008479;
    box-shadow: none !important;
  }

  .form-check-input:focus {
    box-shadow: none !important;
    outline: none;
  }

  .custom-fee-table > :not(caption) > * > * {
    border-bottom : 1px solid #fff !important;
  }

  .form-control::placeholder,
  .form-control,
  .form-select {
    color: var(--greyState);
  }

  .formdltcheck:checked {
    background-color: #b50000 !important;
    border-color: #b50000 !important;
  }

  .form-control,
  .form-select {
    border-radius: 5px ;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .contbtn {
    margin-left: 41% !important;
    margin-top: -20% !important;
  }

  .greydiv {
    background-color: #fbfbfb;
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
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .form-check-input:checked {
    background-color: #008479;
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
    background-color: #2bb673;
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

  .greyText {
    color: var(--greyTextColor) !important;
  }
`,at=()=>{const Z=localStorage.getItem("token"),G=Se(),[_,l]=r.useState(!1),[j,J]=r.useState([]);r.useState([]),r.useState(null);const[N,Q]=r.useState(""),[X,Y]=r.useState(""),[K,ee]=r.useState(""),[te,ae]=r.useState(""),[se,le]=r.useState(""),[S,k]=r.useState(!1),[ce,ie]=r.useState(1),[L,de]=r.useState(1),[B,T]=r.useState(1),[I,We]=r.useState(10),[re,ne]=r.useState([]),{register:D,handleSubmit:E,formState:{errors:u,isValid:H},setValue:qe,reset:C}=V({mode:"onChange"}),{register:ze,handleSubmit:Ze,formState:{errors:Ge,isValid:_e},setValue:Je,reset:oe}=V({mode:"onChange"}),{register:O,handleSubmit:me,formState:{errors:v,isValid:fe},setValue:M,reset:U}=V({mode:"onChange"}),he=r.useCallback(Ue(t=>{t.trim(),T(1),g(t)},2e3),[]),xe=t=>{Q(t),he(t)};r.useEffect(()=>{g(N),Fe()},[Z,B,I]);const g=async t=>{var c,n,o,i,f,m,s,h,p,y;try{l(!0);var a=await ke(t==="search"?"":t,B,I);(a==null?void 0:a.status)===200?((c=a==null?void 0:a.data)==null?void 0:c.status)==="success"?(l(!1),J((n=a==null?void 0:a.data)==null?void 0:n.feeTypes),de((o=a==null?void 0:a.data)==null?void 0:o.totalPages),ie((i=a==null?void 0:a.data)==null?void 0:i.currentPage)):(l(!1),d.error((f=a==null?void 0:a.data)==null?void 0:f.message)):(l(!1),d.error((m=a==null?void 0:a.data)==null?void 0:m.message))}catch(b){l(!1),d.error((h=(s=b==null?void 0:b.response)==null?void 0:s.data)==null?void 0:h.message),((y=(p=b==null?void 0:b.response)==null?void 0:p.data)==null?void 0:y.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{},200))}},ue=async t=>{var c,n,o;if(S)try{var a=await Le(t);if((a==null?void 0:a.status)===200){if(a.data.status==="success"){d.success((c=a==null?void 0:a.data)==null?void 0:c.message),k(!1);const i=document.getElementById("deleteFeeType");(x.getInstance(i)||new x(i)).hide(),g("")}}else d.error(a==null?void 0:a.error)}catch(i){l(!1),d.error((o=(n=i==null?void 0:i.response)==null?void 0:n.data)==null?void 0:o.message)}},be=()=>{if(N.trim()===""){d.error("Search key is empty");return}T(1),g(N)},ge=async t=>{var a,c,n,o,i,f;try{const m=new FormData;m.append("title",t==null?void 0:t.title),m.append("description",(t==null?void 0:t.description)||""),l(!0);const s=await He(m);if((s==null?void 0:s.status)===200)if(((a=s==null?void 0:s.data)==null?void 0:a.status)==="success"){l(!1),d.success((c=s==null?void 0:s.data)==null?void 0:c.message);const h=document.getElementById("addFeeType");(x.getInstance(h)||new x(h)).hide(),g(""),setTimeout(()=>{C()},700)}else l(!1),d.error((n=s==null?void 0:s.data)==null?void 0:n.message);else l(!1),d.error((o=s==null?void 0:s.data)==null?void 0:o.message)}catch(m){l(!1),d.error((f=(i=m==null?void 0:m.response)==null?void 0:i.data)==null?void 0:f.message)}},pe=async t=>{var c,n,o,i,f,m,s,h,p,y,b,q,z;Y(t);try{l(!0);var a=await Oe(t);(a==null?void 0:a.status)===200?((c=a==null?void 0:a.data)==null?void 0:c.status)==="success"?(l(!1),M("title",(o=(n=a==null?void 0:a.data)==null?void 0:n.feeType)==null?void 0:o.title),M("description",(f=(i=a==null?void 0:a.data)==null?void 0:i.feeType)==null?void 0:f.description),ee((s=(m=a==null?void 0:a.data)==null?void 0:m.feeType)==null?void 0:s.title),ae((p=(h=a==null?void 0:a.data)==null?void 0:h.feeType)==null?void 0:p.description)):(l(!1),d.error((y=a==null?void 0:a.data)==null?void 0:y.message)):(l(!1),d.error((b=a==null?void 0:a.data)==null?void 0:b.message))}catch(P){l(!1),d.error((z=(q=P==null?void 0:P.response)==null?void 0:q.data)==null?void 0:z.message)}},ve=async t=>{var c,n,o,i,f,m;try{const s=new FormData;(t==null?void 0:t.title)!==K&&s.append("title",t==null?void 0:t.title),(t==null?void 0:t.description)!==te&&s.append("description",t==null?void 0:t.description);var a=await Me(X,s);if((a==null?void 0:a.status)===200)if(((c=a==null?void 0:a.data)==null?void 0:c.status)==="success"){l(!1),d.success((n=a==null?void 0:a.data)==null?void 0:n.message);const h=document.getElementById("editFeeType");(x.getInstance(h)||new x(h)).hide(),g(""),setTimeout(()=>{U()},700)}else l(!1),d.error((o=a==null?void 0:a.data)==null?void 0:o.message);else l(!1),d.error((i=a==null?void 0:a.data)==null?void 0:i.message)}catch(s){l(!1),d.error((m=(f=s==null?void 0:s.response)==null?void 0:f.data)==null?void 0:m.message)}},je=t=>{const a=t.selected+1;T(a)},ye=()=>{C();const t=document.getElementById("addFeeType");t?(x.getInstance(t)||new x(t)).show():(console.error("Offcanvas element with ID addFeeType not found"),d.error("Unable to open Add Fee Type form"))},Ne=()=>{oe();const t=document.getElementById("addFees");t?(x.getInstance(t)||new x(t)).show():(console.error("Offcanvas element with ID add Fees not found"),d.error("Unable to open Add Fees form"))},[w,$]=r.useState({}),[R,W]=r.useState({}),Te=t=>{$(a=>({...a,[t]:!a[t]}))},Ce=(t,a)=>{W(c=>({...c,[t]:a}))},we=t=>{const a=Object.keys(w).filter(c=>w[c]).map(c=>({classId:c,amount:R[c]||""}));E({...t,classAmounts:a})()},Fe=async()=>{var a,c,n,o;l(!0);try{var t=await Be();(t==null?void 0:t.status)===200?((a=t==null?void 0:t.data)==null?void 0:a.status)==="success"&&(l(!1),ne((c=t==null?void 0:t.data)==null?void 0:c.classes)):l(!1)}catch(i){l(!1),l(!1),((o=(n=i==null?void 0:i.response)==null?void 0:n.data)==null?void 0:o.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{G("/")},200))}};return e.jsxs(Re,{children:[_&&e.jsx(Ie,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[e.jsxs("div",{className:"col-xxl-3 col-xl-3 col-lg-12 col-sm-12 flex-frow-1",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-2",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/collectFees",className:"bredcrumText text-decoration-none",children:"Fee Collection"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Fee Type"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Fee Type Details"})]}),e.jsx("div",{className:"col-xxl-9 col-xl-9 col-lg-12 col-sm-12 pe-0",children:e.jsx($e,{showAddButton:!0,addButtonText:"Add Fee Type",addButtonAction:ye,showSecondAddButton:!0,secondAddButtonText:"Add Fees",secondAddButtonAction:Ne,showExportPDF:j.length>0,exportPDFText:"Export PDF",exportPDFAction:De,exportPDFFileName:"Fee Type.pdf",showExportCSV:j.length>0,exportCSVText:"Export CSV",exportCSVAction:Ee,exportCSVFileName:"Fee Type.xlsx",showSearch:!0,searchValue:N,searchAction:be,onSearchChange:xe})})]}),e.jsx("div",{className:"row pb-3",children:e.jsx("div",{className:"bg-white rounded-2 p-3 overflow-scroll",children:j.length>0?e.jsxs(e.Fragment,{children:[e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"#"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Title"})}),e.jsx("th",{className:"textWrapClass",children:e.jsx("span",{className:"font14",children:"Description"})}),e.jsx("th",{className:"text-center",children:e.jsx("span",{className:"font14",children:"Action"})})]})}),e.jsx("tbody",{children:j.map((t,a)=>e.jsxs("tr",{className:"align-middle",children:[e.jsx("th",{className:"textWrapClass greyText",children:e.jsx("h3",{children:(B-1)*I+a+1})}),e.jsx("td",{className:"textWrapClass greyText font14",children:t.title}),e.jsx("td",{className:"textWrapClass greyText font14",children:t.description||"-"}),e.jsxs("td",{className:"textWrapClass text-center",children:[e.jsx("button",{className:"btn ps-1 pe-1 text-black text-decoration-none",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#editFeeType","aria-controls":"editFeeType",onClick:()=>pe(t.feeTypeModelId),children:e.jsx(F,{icon:"carbon:edit",width:"1.5em",height:"1.5em",style:{color:"#8F8F8F"}})}),e.jsx("button",{className:"btn ps-1 pe-1 text-black text-decoration-none",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#deleteFeeType","aria-controls":"deleteFeeType",onClick:()=>le(t.feeTypeModelId),children:e.jsx(F,{icon:"mi:delete",width:"1.5em",height:"1.5em",style:{color:"#8F8F8F"}})})]})]},a))})]}),e.jsx("div",{className:"overflow-scroll",children:e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",ce," of ",L," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(Pe,{previousLabel:e.jsx(F,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(F,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:L,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:je,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})})]}):e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("img",{src:"/images/search.svg",alt:"No data",className:"img-fluid"})})})}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2",tabIndex:"-1",id:"addFeeType",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-2",children:[e.jsx(A,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"addFeeTypeLabel",children:"Add Fees Type"})]}),e.jsx("div",{className:"offcanvas-body p-3",children:e.jsxs("form",{onSubmit:E(ge),children:[e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"title",className:"form-label font14",children:["Title ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"title",type:"text",className:`form-control font14 ${u.title?"border-danger":""}`,placeholder:"Enter Title",...D("title",{required:"Title is required *",validate:t=>t.length<4?"Minimum Length is 4":/^[a-zA-Z\s'-]+$/.test(t)?!0:"Invalid Characters in Title"})}),u.title&&e.jsx("p",{className:"font12 text-danger",children:u.title.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"description",className:"form-label font14",children:"Description"}),e.jsx("input",{id:"description",type:"text",className:`form-control font14 ${u.description?"border-danger":""}`,placeholder:"Enter Description",...D("description",{validate:t=>t?/^[a-zA-Z0-9\s'-]+$/.test(t)?!0:"Invalid Characters in Description":!0})}),u.description&&e.jsx("p",{className:"font12 text-danger",children:u.description.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons2 font14 text-white me-2",type:"submit",disabled:!H,children:"Add Fee Type"}),e.jsx("button",{className:"btn cancelButtons font14",type:"button","data-bs-dismiss":"offcanvas",onClick:()=>{C(),setTypeType("")},children:"Cancel"})]})]})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2",tabIndex:"-1",id:"addFees",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-2",children:[e.jsx(A,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"addFeesLabel",children:"Add Fees"})]}),e.jsx("div",{className:"offcanvas-body p-2",children:e.jsxs("form",{onSubmit:E(we),children:[e.jsxs("div",{className:"mb-2 p-1",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center ",children:[e.jsxs("label",{className:"form-label font14 fw-bold",children:["Fee Type ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("span",{className:"font14 text-primary",children:"Edit"})]}),e.jsxs("select",{id:"feeType",className:`form-select font14 ${u.feeType?"border-danger":""}`,...D("feeType",{required:"Fee Type is required *"}),onChange:t=>setTypeType(t.target.value),children:[e.jsx("option",{value:"",children:"Select Fee Type"}),j.map(t=>e.jsx("option",{value:t.feeTypeModelId,children:t.title},t.feeTypeModelId))]}),u.feeType&&e.jsx("p",{className:"font12 text-danger",children:u.feeType.message})]}),e.jsx("div",{className:"mb-2",children:e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table custom-fee-table align-middle",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"font14",children:"Class"}),e.jsx("th",{className:"font14",children:"Amount"})]})}),e.jsx("tbody",{children:re.map(t=>e.jsxs("tr",{children:[e.jsx("td",{className:"",children:e.jsxs("div",{className:"d-flex align-self-center",children:[e.jsx("input",{type:"checkbox",className:"me-2 form-check-input",id:t.classId,checked:w[t.classId]||!1,onChange:()=>Te(t.classId)}),t.classNo]})}),e.jsx("td",{children:e.jsx("input",{type:"number",className:"form-control font14",placeholder:"0.00",value:R[t.classId]||"",onChange:a=>Ce(t.classId,a.target.value),disabled:!w[t.classId]})})]},t.classId))})]})})}),e.jsxs("div",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons2 font14 text-white me-2",type:"submit",disabled:!H,children:"Add Fees"}),e.jsx("button",{className:"btn cancelButtons font14",type:"button","data-bs-dismiss":"offcanvas",onClick:()=>{C(),setTypeType(""),$({}),W({})},children:"Cancel"})]})]})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2",tabIndex:"-1",id:"editFeeType","aria-labelledby":"editFeeTypeLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-2",children:[e.jsx(A,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"editFeeTypeLabel",children:"Edit Fees Type"})]}),e.jsx("div",{className:"offcanvas-body p-3",children:e.jsxs("form",{onSubmit:me(ve),children:[e.jsxs("div",{className:"mb-3",children:[e.jsxs("label",{htmlFor:"titleEdit",className:"form-label font14",children:["Title ",e.jsx("span",{className:"text-danger",children:"*"})]}),e.jsx("input",{id:"titleEdit",type:"text",className:`form-control font14 ${v.title?"border-danger":""}`,placeholder:"Enter Title",...O("title",{required:"Title is required *",validate:t=>t.length<4?"Minimum Length is 4":/^[a-zA-Z\s'-]+$/.test(t)?!0:"Invalid Characters in Title"})}),v.title&&e.jsx("p",{className:"font12 text-danger",children:v.title.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"exampleFormControlTextarea1",className:"form-label font14",children:"Description"}),e.jsx("input",{id:"description",type:"text",className:`form-control font14 ${v.description?"border-danger":""}`,placeholder:"Enter Description",...O("description",{validate:t=>t?/^[a-zA-Z0-9\s'-]+$/.test(t)?!0:"Invalid Characters in Description":!0})}),v.description&&e.jsx("p",{className:"font12 text-danger",children:v.description.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons3 font14 text-white me-2",type:"submit",disabled:!fe,children:"Update Fee Type"}),e.jsx("button",{className:"btn cancelButtons font14","data-bs-dismiss":"offcanvas",type:"button",onClick:()=>{U()},children:"Cancel"})]})]})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2",tabIndex:"-1",id:"deleteFeeType","aria-labelledby":"deleteFeeTypeLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-2",children:[e.jsx(A,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"deleteFeeTypeLabel",children:"Delete Fees Type"})]}),e.jsx("div",{className:"offcanvas-body p-3",children:e.jsxs("div",{children:[e.jsx("p",{className:"text-center p-3",children:e.jsx("img",{src:"/images/errorI.svg",className:"img-fluid",alt:"Error"})}),e.jsx("p",{className:"text-center warningHeading",children:"Are you Sure?"}),e.jsxs("p",{className:"text-center greyText warningText pt-2",children:["This Action will permanently delete",e.jsx("br",{}),"the Profile Data"]}),e.jsxs("p",{className:"text-center warningText p-2",children:[e.jsx("input",{className:"form-check-input formdltcheck me-2",type:"checkbox",checked:S,id:"flexCheckChecked",onChange:t=>k(t.target.checked)}),"I Agree to delete the Profile Data"]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn deleteButtons text-white",disabled:!S,onClick:()=>ue(se),children:"Delete"}),e.jsx("button",{className:"btn dltcancelButtons ms-3","data-bs-dismiss":"offcanvas",type:"button",onClick:()=>k(!1),children:"Cancel"})]})]})})]})]}),e.jsx(Ve,{})]})};export{at as default};
