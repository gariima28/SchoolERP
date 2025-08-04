import{u as M,r as g,j as a,I as C,c as T,gO as B,_ as m}from"./index-DHII64NA.js";const S=M.div`
  .form-control::placeholder,
  .form-control {
    color: var(--greyState);
    box-shadow: none;
    border-color: var(--greyBorder);
  }

  .table-striped > tbody > tr:nth-of-type(odd) > * {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
  }

  .creamBg {
    border: 1px dashed var(--tableTopHeadingBorder);
    background-color: var(--tableTopHeadingBg);
  }

  .creamBgtext {
    color: var(--tableTopHeadText);
  }

  .tableHeading {
    background-color: var(--tableheadingbg) !important;
  }

  .heightOfTable {
    height: 37vh;
    overflow: auto;
  }

  .heightOfTable::-webkit-scrollbar {
    display: none;
  }

  /* Add grey background for disabled inputs */
  .form-control:disabled {
    background-color: #e9ecef; /* Bootstrap's default grey background for disabled inputs */
    opacity: 1; /* Ensure no transparency */
  }
`,I=({marksData:b=[],className:i,sectionName:p,subjectName:h,sessionSelect:x,examTermSelect:u,totalMarksSelect:y,ReloadMarksData:o})=>{const[f,n]=g.useState([]);g.useEffect(()=>{console.log(i,p,h,x,u,y,o),n(b.map(e=>({...e,gainMarks:e.gainMarks??"",comments:e.comments??"",isDirty:!1,isSaving:!1,theoryMarks:e.theoryMarks??0,practicalMarks:e.practicalMarks??0})))},[b]);const k=g.useCallback((e,r,s)=>{n(d=>{const c=[...d];return c[e]={...c[e],[r]:s,isDirty:!0},c})},[]),v=async e=>{var d,c;n(t=>{const l=[...t];return l[e].isSaving=!0,l});const r=f[e],s=new FormData;s.append("studentId",r.studentId),s.append("examTermId",u),s.append("classNo",i),s.append("classSec",p),s.append("subject",h),s.append("sessionName",x),s.append("theoryMarks",r.theoryMarks),s.append("practicalMarks",r.practicalMarks);try{const t=await B(s);if((t==null?void 0:t.status)===200&&((d=t==null?void 0:t.data)==null?void 0:d.status)==="success"){m.success(t.data.message);const l=t.data.marks;n(N=>{const j=[...N];return j[e]={...l,isDirty:!1,isSaving:!1},j}),o==null||o()}else m.error(((c=t==null?void 0:t.data)==null?void 0:c.message)||"Failed to save")}catch{m.error("Network error – please try again")}finally{n(t=>{const l=[...t];return l[e]&&(l[e].isSaving=!1),l})}};return a.jsxs(S,{className:"heightOfTable",children:[a.jsxs("div",{className:"container-fluid pt-3",children:[a.jsx("div",{className:"row creamBg p-3 mb-4",children:[["Exam",u],["Class",i],["Section",p],["Total Marks",y],["Subject",h],["Session",x]].map(([e,r])=>a.jsx("div",{className:"col-12 col-sm-6 col-md-2 mb-2 d-flex flex-column text-center",children:a.jsxs("p",{className:"m-0 text-wrap",children:[a.jsxs("span",{className:"creamBgtext font14",children:[e," "]}),a.jsxs("span",{className:"text-black font14 text-break",children:["- ",r]})]})},e))}),a.jsx("div",{className:"overflow-scroll",children:a.jsxs("table",{className:"table align-middle table-striped",children:[a.jsx("thead",{children:a.jsx("tr",{children:["#","Student Name","Theory Marks","Practical Marks","Marks Obtained","Percentage","Grade","Action"].map(e=>a.jsx("th",{className:`textWrapClass tableHeading ${e==="#"||e==="Action"?"text-center":""}`,children:a.jsx("span",{className:"font14",children:e})},e))})}),a.jsx("tbody",{children:f.map((e,r)=>a.jsxs("tr",{children:[a.jsx("th",{className:"textWrapClass text-center greyText",children:a.jsx("span",{className:"font14",children:r+1})}),a.jsx("td",{className:"textWrapClass greyText font14",children:e.studentName}),a.jsx("td",{className:"textWrapClass greyText",children:a.jsx("input",{type:"number",className:"form-control text-start font14",placeholder:"0.0",value:e.theoryMarks!==null&&e.theoryMarks!==void 0?e.theoryMarks:0,onChange:s=>k(r,"theoryMarks",s.target.value)})}),a.jsx("td",{className:"textWrapClass greyText",children:a.jsx("input",{type:"number",className:"form-control text-start font14",placeholder:"0.0",value:e.practicalMarks!==null&&e.practicalMarks!==void 0?e.practicalMarks:0,onChange:s=>k(r,"practicalMarks",s.target.value)})}),a.jsx("td",{className:"textWrapClass greyText",children:a.jsx("input",{type:"number",placeholder:"-",className:"form-control text-start font14",value:e.obtainedMarks!==null&&e.obtainedMarks!==void 0?e.obtainedMarks:"--",disabled:!0})}),a.jsx("td",{className:"textWrapClass greyText",children:a.jsx("input",{type:"text",placeholder:"-",className:"form-control text-start font14",value:e.percentage!==null&&e.percentage!==void 0?e.percentage:"--",disabled:!0})}),a.jsx("td",{className:"textWrapClass greyText",children:a.jsx("input",{type:"text",placeholder:"-",className:"form-control text-start font14",value:e.grade!==null&&e.grade!==void 0?e.grade:"--",disabled:!0})}),a.jsx("td",{className:"textWrapClass text-center",children:a.jsx("button",{className:"btn CorrectSignButtons",disabled:!e.isDirty||e.isSaving,onClick:()=>v(r),children:a.jsx(C,{icon:"charm:circle-tick",width:"1.5em",height:"1.5em",style:{color:"white"}})})})]},e.markId??r))})]})})]}),a.jsx(T,{})]})};export{I as default};
