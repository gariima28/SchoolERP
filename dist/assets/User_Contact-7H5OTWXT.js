import{u as ue,r as l,bO as Ie,_ as i,bP as ke,j as e,c as fe,bQ as Ce,bR as Ee,bS as Fe,bT as Re,D as De,bU as Te,bV as Oe,bW as Pe,bX as Me,bY as Le,bZ as Ve,b_ as _e,b$ as qe,c0 as ze,c1 as Ue}from"./index-DHII64NA.js";ue.div`
height: fit-content;
overflow : scroll;

    .content-div{
       background-color: #f9f9f9;
       padding: 5px ;
    }
    .my-button112233{
      background: #008479;
      color: #fff;
      border-radius: 2px;
      border: 1px solid #008479;
    }
    .my-button11223344:hover{
background-color: #008479;
color: #fff;
    }
    .breadcrum-li a{
  text-decoration: none;
  margin-top: 5px;
  color: #008479;
  }
  
`;ue.div`
height: fit-content;
overflow : scroll;

    .content-div{
       background-color: #f9f9f9;
       padding: 5px ;
    }
    .my-button112233{
      background: #008479;
      color: #fff;
      border-radius: 2px;
      border: 1px solid #008479;
    }
    .my-button11223344:hover{
background-color: #008479;
color: #fff;
    }
  
`;const $e=({data:ae})=>{const{transferId:E,myUserId:U}=ae,j=U,w=localStorage.getItem("MyUserID"),[c,h]=l.useState(!1),[$,Y]=l.useState([]),[Z,v]=l.useState(""),[D,T]=l.useState(),[S,b]=l.useState(""),[y,g]=l.useState(""),[N,_]=l.useState(""),[A,Q]=l.useState(""),[p,te]=l.useState(""),[R,I]=l.useState(""),[k,H]=l.useState(""),[P,B]=l.useState(""),[F,M]=l.useState(""),[J,O]=l.useState(!1),[q,L]=l.useState(!1),[de,V]=l.useState(!1),[me,K]=l.useState(!1);l.useEffect(()=>{t(),X()},[]);const ee=()=>{let a=!0;const o=/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,u=/^\d+$/,f=/^\d+(\.\d{1,2})?$/;return!S||!o.test(S)?(O(!0),a=!1):O(!1),p==="PER_MONTH"&&(!N||!u.test(N))?(L(!0),a=!1):L(!1),p==="CONTRACTUAL"&&(!A||!f.test(A))?(V(!0),a=!1):V(!1),p?K(!1):(K(!0),a=!1),a},oe=a=>{const o=a.target.value;b(o),O(!o||!/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(o))},X=async()=>{var a,o,u,f;h(!0),v("");try{const m=await Ie();(m==null?void 0:m.status)===200&&((a=m==null?void 0:m.data)==null?void 0:a.status)==="success"?(Y(((o=m==null?void 0:m.data)==null?void 0:o.leave)||[]),h(!1)):(v(((u=m==null?void 0:m.data)==null?void 0:u.msg)||"Failed to fetch leave categories"),i.error(((f=m==null?void 0:m.data)==null?void 0:f.msg)||"Failed to fetch leave categories"),h(!1))}catch{v("Failed to fetch leave categories"),i.error("Failed to fetch leave categories"),h(!1)}},W=a=>{g(a.target.value)},le=a=>{H(a.target.value)},se=a=>{B(a.target.value)},G=a=>{const o=a.target.value;_(o),L(!o||!/^\d+$/.test(o))},ne=a=>{const o=a.target.value;Q(o),V(!o||!/^\d+(\.\d{1,2})?$/.test(o))},re=a=>{const o=a.target.value;te(o),K(!o),_(""),Q(""),L(!1),V(!1)},ce=a=>{I(a.target.value)},ie=a=>{M(a.target.value)},C=async()=>{var a,o,u,f;if(ee()){const m=new FormData;m.append("contactDate",S),m.append("basicSalary",N),m.append("hourlyRate",A),m.append("contractEnd",y),m.append("paySlipType",p),m.append("shift",R),m.append("department",k),m.append("designation",P),m.append("leaveCategory",F),h(!0);try{const x=await Ce(w,m);((a=x==null?void 0:x.data)==null?void 0:a.status)==="success"?(i.success((o=x==null?void 0:x.data)==null?void 0:o.message),T((u=x==null?void 0:x.data)==null?void 0:u.status),n(),h(!1)):(i.error(((f=x==null?void 0:x.data)==null?void 0:f.message)||"Failed to add contract"),h(!1))}catch{h(!1),i.error("Failed to add contract")}}},t=async()=>{var a,o,u,f,m,x,z,r,pe,he,xe,be,ge,ye,ve,je,Ne,we,Se,Ae;h(!0);try{const d=await ke(j);(d==null?void 0:d.status)===200?(T((a=d==null?void 0:d.data)==null?void 0:a.status),b(((u=(o=d==null?void 0:d.data)==null?void 0:o.contact)==null?void 0:u.contractStart)||""),g(((m=(f=d==null?void 0:d.data)==null?void 0:f.contact)==null?void 0:m.contractEnd)||""),_(((z=(x=d==null?void 0:d.data)==null?void 0:x.contact)==null?void 0:z.basicSalary)||""),Q(((pe=(r=d==null?void 0:d.data)==null?void 0:r.contact)==null?void 0:pe.hourlyRate)||""),te(((xe=(he=d==null?void 0:d.data)==null?void 0:he.contact)==null?void 0:xe.paySlipType)||""),I(((ge=(be=d==null?void 0:d.data)==null?void 0:be.contact)==null?void 0:ge.shift)||""),H(((ve=(ye=d==null?void 0:d.data)==null?void 0:ye.contact)==null?void 0:ve.department)||""),B(((Ne=(je=d==null?void 0:d.data)==null?void 0:je.contact)==null?void 0:Ne.designation)||""),M(((Se=(we=d==null?void 0:d.data)==null?void 0:we.contact)==null?void 0:Se.leaveCategory)||""),h(!1)):(i.error(((Ae=d==null?void 0:d.data)==null?void 0:Ae.msg)||"Failed to fetch contract data"),h(!1))}catch{h(!1),i.error("Failed to fetch contract data")}},s=async()=>{var a,o;if(ee()){const u=new FormData;u.append("contactDate",S),u.append("basicSalary",N),u.append("hourlyRate",A),u.append("contractEnd",y),u.append("paySlipType",p),u.append("shift",R),u.append("department",k),u.append("designation",P),u.append("leaveCategory",F),h(!0);try{const f=await Ee(j,u);(f==null?void 0:f.status)===200?(i.success(((a=f==null?void 0:f.data)==null?void 0:a.message)||"Contract updated successfully"),n(),h(!1)):(i.error(((o=f==null?void 0:f.data)==null?void 0:o.message)||"Failed to update contract"),h(!1))}catch{h(!1),i.error("Failed to update contract")}}},n=()=>{b(""),g(""),_(""),Q(""),te(""),I(""),H(""),B(""),M(""),O(!1),L(!1),V(!1),K(!1),v("")};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
          .form-container {
            background: linear-gradient(145deg, #ffffff 0%, #e6f4f1 100%);
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 6px 20px rgba(0, 132, 121, 0.1);
            transition: all 0.3s ease;
            animation: slideIn 0.5s ease-out;
          }
          .form-container:hover {
            box-shadow: 0 8px 24px rgba(0, 132, 121, 0.15);
          }
          @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .form-control, .form-select {
            border-radius: 8px;
            font-size: 14px;
            padding: 10px;
            transition: all 0.3s ease;
            border: 1px solid #ced4da;
            background: #f8fafc;
          }
          .form-control:hover, .form-select:hover {
            border-color: #008479;
            background: #fff;
          }
          .form-control:focus, .form-select:focus {
            border-color: #008479;
            box-shadow: 0 0 0 0.2rem rgba(0, 132, 121, 0.25);
            outline: none;
            background: #fff;
          }
          .form-control:disabled, .form-select:disabled {
            background: #e9ecef;
            cursor: not-allowed;
            opacity: 0.7;
          }
          .form-label {
            font-weight: 600;
            color: #1a3c34;
            margin-bottom: 5px;
            position: relative;
            display: inline-block;
          }
          .form-label:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: #008479;
            color: #fff;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 10;
            opacity: 0;
            animation: fadeIn 0.2s ease forwards;
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
          .my-green {
            background: linear-gradient(135deg, #008479 0%, #006b63 100%) !important;
            border: none !important;
            color: #fff !important;
            padding: 10px 20px;
            border-radius: 8px;
            transition: transform 0.2s ease, background 0.3s ease;
          }
          .my-green:hover {
            background: linear-gradient(135deg, #006b63 0%, #005a50 100%) !important;
            transform: scale(1.05);
          }
          .my-green:disabled {
            background: #b0b0b0 !important;
            cursor: not-allowed;
            transform: none;
          }
          .btn-outline-success {
            border-color: #008479;
            color: #008479;
            padding: 10px 20px;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          .btn-outline-success:hover {
            background: linear-gradient(135deg, #008479 0%, #006b63 100%);
            color: #fff;
            transform: scale(1.05);
          }
          .error-message {
            font-size: 12px;
            color: #dc3545;
            margin-top: 3px;
            min-height: 16px;
            animation: fadeIn 0.3s ease;
          }
          .valid-indicator::after {
            content: '✔';
            color: #28a745;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 14px;
          }
          .form-group {
            margin-bottom: 0.4rem;
            position: relative;
          }
          .row-margin {
            margin-bottom: 0.5rem;
          }
          .buttons-tops {
            margin-top: 1rem;
            display: flex;
            justify-content: center;
            gap: 10px;
          }
          .loader {
            border: 2px solid #fff;
            border-top: 2px solid #008479;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-left: 10px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .note-text {
            font-size: 12px;
            color: #ADADBD;
            margin-top: 5px;
          }
        `}),e.jsx("div",{className:"container-fluid px-0 mt-3",children:e.jsxs("div",{className:"form-container",children:[e.jsx("p",{className:"heading-16 mb-3",style:{color:"#1a3c34",fontWeight:"700"},children:"Contract Information"}),e.jsxs("div",{className:"row px-1 pt-2 row-margin",children:[e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"contractStart",className:"form-label heading-14 label-color","data-tooltip":"Select contract start date (YYYY-MM-DD)","aria-label":"Contract Start Date",children:["Contract Start Date ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"date",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!J&&S?"valid-indicator":""}`,id:"contractStart",value:S,onChange:a=>oe(a.target.value),tabIndex:"1","aria-describedby":"contractStartError"}),J&&e.jsx("div",{id:"contractStartError",className:"error-message",children:"Valid date is required"})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"department",className:"form-label heading-14 label-color","data-tooltip":"Select department","aria-label":"Department",children:"Department"}),e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"department",value:k,onChange:le,tabIndex:"2","aria-describedby":"departmentError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"HR",children:"HR"}),e.jsx("option",{value:"IT",children:"IT"}),e.jsx("option",{value:"Finance",children:"Finance"})]})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"designation",className:"form-label heading-14 label-color","data-tooltip":"Enter designation (letters only)","aria-label":"Designation",children:"Designation"}),e.jsx("input",{type:"text",className:"form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color",id:"designation",placeholder:"Enter designation",value:P,onChange:se,tabIndex:"3","aria-describedby":"designationError"})]})})]}),e.jsxs("div",{className:"row px-1 row-margin",children:[e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"payslip",className:"form-label heading-14 label-color","data-tooltip":"Select payslip type","aria-label":"Payslip Type",children:["Payslip Type ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsxs("select",{className:`form-select form-select-sm form-focus label-color ${!me&&p?"valid-indicator":""}`,id:"payslip",value:p,onChange:re,tabIndex:"4","aria-describedby":"payslipError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"PER_MONTH",children:"Per Month"}),e.jsx("option",{value:"CONTRACTUAL",children:"Contractual"})]}),me&&e.jsx("div",{id:"payslipError",className:"error-message",children:"Payslip type is required"})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"basicSalary",className:"form-label heading-14 label-color","data-tooltip":"Enter basic salary (whole numbers only)","aria-label":"Basic Salary",children:["Basic Salary ",p==="PER_MONTH"&&e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!q&&N&&p==="PER_MONTH"?"valid-indicator":""}`,id:"basicSalary",placeholder:"Enter amount",value:N,onChange:G,disabled:p!=="PER_MONTH",tabIndex:"5","aria-describedby":"basicSalaryError"}),q&&p==="PER_MONTH"&&e.jsx("div",{id:"basicSalaryError",className:"error-message",children:"Valid salary is required"})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"hourlyRate",className:"form-label heading-14 label-color","data-tooltip":"Enter per day rate (e.g., 100.00)","aria-label":"Per Day",children:["Per Day ",p==="CONTRACTUAL"&&e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!de&&A&&p==="CONTRACTUAL"?"valid-indicator":""}`,id:"hourlyRate",placeholder:"Enter amount",value:A,onChange:ne,disabled:p!=="CONTRACTUAL",tabIndex:"6","aria-describedby":"hourlyRateError"}),de&&p==="CONTRACTUAL"&&e.jsx("div",{id:"hourlyRateError",className:"error-message",children:"Valid per day rate is required"})]})})]}),e.jsxs("div",{className:"row px-1 row-margin",children:[e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"officeShift",className:"form-label heading-14 label-color","data-tooltip":"Select office shift","aria-label":"Office Shift",children:"Office Shift"}),e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"officeShift",value:R,onChange:ce,tabIndex:"7","aria-describedby":"officeShiftError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"Day",children:"Day"}),e.jsx("option",{value:"Night",children:"Night"})]})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"contractEnd",className:"form-label heading-14 label-color","data-tooltip":"Select contract end date (YYYY-MM-DD)","aria-label":"Contract End Date",children:"Contract End Date"}),e.jsx("input",{type:"date",className:"form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color",id:"contractEnd",value:y,onChange:W,tabIndex:"8","aria-describedby":"contractEndError"})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"leaveCategories",className:"form-label heading-14 label-color","data-tooltip":"Select leave categories","aria-label":"Leave Categories",children:"Leave Categories"}),c?e.jsxs("div",{className:"note-text",style:{textAlign:"center"},children:[e.jsx("span",{className:"loader"})," Loading leave categories..."]}):Z?e.jsx("div",{className:"error-message",children:Z}):e.jsxs("select",{className:`form-select form-select-sm form-focus label-color ${F?"valid-indicator":""}`,id:"leaveCategories",value:F,onChange:ie,tabIndex:"9","aria-describedby":"leaveCategoriesNote",children:[e.jsx("option",{value:"",children:"--Choose--"}),$.map((a,o)=>e.jsx("option",{value:a.leaveType,children:a.leaveType},o)),e.jsx("option",{value:"All",children:"All"})]}),e.jsx("p",{id:"leaveCategoriesNote",className:"note-text",children:"If All is selected, all leave categories added in the system will apply."})]})})]}),e.jsx("div",{className:"row px-1 row-margin",children:e.jsx("div",{className:"col-12",children:e.jsx("p",{className:"note-text",children:"Note: Basic Salary is required for Per Month payslip type; Per Day is required for Contractual payslip type."})})}),e.jsx("div",{className:"row buttons-tops text-center",children:e.jsxs("div",{className:"my-button11 heading-14",children:[e.jsx("button",{type:"button",className:"btn btn-outline-success my-green heading-14 me-1",onClick:D==="success"?s:C,disabled:c,tabIndex:"10","aria-label":D==="success"?"Update Contract":"Submit Contract",children:c?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading"}),e.jsx("span",{className:"loader"})]}):D==="success"?"Update Contract":"Submit Contract"}),e.jsx("button",{type:"button",className:"btn btn-outline-success heading-14",onClick:n,tabIndex:"11","aria-label":"Cancel",children:"Cancel"}),e.jsx(fe,{})]})})]})})]})},Ye=({data:ae})=>{localStorage.getItem("token");const E=localStorage.getItem("MyUserID"),[U,j]=l.useState(!1),[w,c]=l.useState(!1),[h,$]=l.useState(!0),[Y,Z]=l.useState(),[v,D]=l.useState(""),[T,S]=l.useState(""),[b,y]=l.useState(""),[g,N]=l.useState(""),[_,A]=l.useState(!1),[Q,p]=l.useState(!1),[te,R]=l.useState(!1),[I,k]=l.useState(!1);l.useState([]);const[H,P]=l.useState(null),[B,F]=l.useState(!1),[M,J]=l.useState([]),[O,q]=l.useState([]),[L,de]=l.useState(1),[V,me]=l.useState(10),[K,ee]=l.useState(1);l.useEffect(()=>{se(),le()},[]);const oe=()=>{let t=!0;const s=/^[A-Za-z\s]+$/,n=/^\d+(\.\d{1,2})?$/;return!v||!s.test(v)?(A(!0),t=!1,c(!1)):A(!1),!T||!s.test(T)?(p(!0),t=!1,c(!1)):p(!1),!b||!n.test(b)?(R(!0),t=!1,c(!1)):R(!1),!g||!n.test(g)?(k(!0),t=!1,c(!1)):k(!1),t},X=t=>{console.log(t),D(t)},W=t=>{N(t),k(!t||!/^\d+(\.\d{1,2})?$/.test(t))},le=async()=>{var t,s,n,a;try{j(!0);const o=await Fe("",L,V);(o==null?void 0:o.status)===200&&((t=o==null?void 0:o.data)==null?void 0:t.status)==="success"?J(o.data.allowanceNames||[]):i.error(((s=o==null?void 0:o.data)==null?void 0:s.message)||"Failed to fetch allowances")}catch(o){((a=(n=o==null?void 0:o.response)==null?void 0:n.data)==null?void 0:a.statusType)===401&&localStorage.removeItem("token"),i.error("Error fetching allowances")}finally{j(!1)}},se=async()=>{var t,s,n,a,o,u,f,m,x,z;c(!0);try{const r=await Re(E);(r==null?void 0:r.status)===200?(Z((t=r==null?void 0:r.data)==null?void 0:t.status),q(r.data.allowance||[]),D(((n=(s=r==null?void 0:r.data)==null?void 0:s.allowance)==null?void 0:n.allowanceOption)||""),S(((o=(a=r==null?void 0:r.data)==null?void 0:a.allowance)==null?void 0:o.title)||""),y(((f=(u=r==null?void 0:r.data)==null?void 0:u.allowance)==null?void 0:f.amountOption)||""),N(((x=(m=r==null?void 0:r.data)==null?void 0:m.allowance)==null?void 0:x.amount)||""),c(!1)):(i.error(((z=r==null?void 0:r.data)==null?void 0:z.msg)||"Failed to fetch allowance data"),c(!1))}catch{c(!1),i.error("Failed to fetch allowance data")}},G=async()=>{var t,s,n,a;try{j(!0);const o=await Me(E);(o==null?void 0:o.status)===200&&((t=o==null?void 0:o.data)==null?void 0:t.status)==="success"?(q(o.data.allowance||[]),ee(o.data.totalPages||1)):i.error(((s=o==null?void 0:o.data)==null?void 0:s.message)||"Failed to fetch allowances")}catch(o){((a=(n=o==null?void 0:o.response)==null?void 0:n.data)==null?void 0:a.statusType)===401&&localStorage.removeItem("token"),i.error("Error fetching allowances")}finally{j(!1)}},ne=async()=>{var s,n;const t=new FormData;t.append("allowanceNameId",v),t.append("allowanceType",b),t.append("amount",g),c(!0);try{const a=await Te(E,t);console.log(a,"Update Allowance"),(a==null?void 0:a.status)===200?(G(),i.success((s=a==null?void 0:a.data)==null?void 0:s.message),$(!1),c(!1),C()):(i.error(((n=a==null?void 0:a.data)==null?void 0:n.message)||"Failed to update allowance"),$(!0),c(!1))}catch{c(!1),i.error("Failed to update allowance")}},re=t=>{P(t),D(t.allowanceOption),S(t.title),y(t.amountOption),N(t.amount),F(!0)},ce=async t=>{var s,n;c(!0);try{const a=await Oe(E,t);((s=a==null?void 0:a.data)==null?void 0:s.status)==="success"?(i.success("Allowance deleted successfully"),G()):i.error(((n=a==null?void 0:a.data)==null?void 0:n.message)||"Failed to delete allowance")}catch{i.error("Failed to delete allowance")}finally{c(!1)}},ie=async()=>{var t,s;if(oe()){const n=new FormData;n.append("allowanceOption",v),n.append("amountOption",b),n.append("title",T),n.append("amount",g),c(!0);try{const a=await Pe(H.id,n);(a==null?void 0:a.status)===200?(i.success((t=a==null?void 0:a.data)==null?void 0:t.message),F(!1),C()):i.error(((s=a==null?void 0:a.data)==null?void 0:s.message)||"Failed to update allowance")}catch{i.error("Failed to update allowance")}finally{c(!1)}}},C=()=>{D(""),S(""),y(""),N(""),A(!1),p(!1),R(!1),k(!1),P(null),F(!1)};return e.jsxs(e.Fragment,{children:[U&&e.jsx(De,{}),e.jsx("style",{children:`
          .form-container {
            background: linear-gradient(145deg, #ffffff 0%, #e6f4f1 100%);
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 6px 20px rgba(0, 132, 121, 0.1);
            transition: all 0.3s ease;
            animation: slideIn 0.5s ease-out;
          }
          .form-container:hover {
            box-shadow: 0 8px 24px rgba(0, 132, 121, 0.15);
          }
          @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .form-control, .form-select {
            border-radius: 8px;
            font-size: 14px;
            padding: 10px;
            transition: all 0.3s ease;
            border: 1px solid #ced4da;
            background: #f8fafc;
          }
          .form-control:hover, .form-select:hover {
            border-color: #008479;
            background: #fff;
          }
          .form-control:focus, .form-select:focus {
            border-color: #008479;
            box-shadow: 0 0 0 0.2rem rgba(0, 132, 121, 0.25);
            outline: none;
            background: #fff;
          }
          .form-label {
            font-weight: 600;
            color: #1a3c34;
            margin-bottom: 5px;
            position: relative;
            display: inline-block;
          }
          .form-label:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: #008479;
            color: #fff;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 10;
            opacity: 0;
            animation: fadeIn 0.2s ease forwards;
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
          .my-green {
            background: linear-gradient(135deg, #008479 0%, #006b63 100%) !important;
            border: none !important;
            color: #fff !important;
            padding: 10px 20px;
            border-radius: 8px;
            transition: transform 0.2s ease, background 0.3s ease;
          }
          .my-green:hover {
            background: linear-gradient(135deg, #006b63 0%, #005a50 100%) !important;
            transform: scale(1.05);
          }
          .my-green:disabled {
            background: #b0b0b0 !important;
            cursor: not-allowed;
            transform: none;
          }
          .btn-outline-success {
            border-color: #008479;
            color: #008479;
            padding: 10px 20px;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          .btn-outline-success:hover {
            background: linear-gradient(135deg, #008479 0%, #006b63 100%);
            color: #fff;
            transform: scale(1.05);
          }
          .error-message {
            font-size: 12px;
            color: #dc3545;
            margin-top: 3px;
            min-height: 16px;
            animation: fadeIn 0.3s ease;
          }
          .valid-indicator::after {
            content: '✔';
            color: #28a745;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 14px;
          }
          .form-group {
            margin-bottom: 0.4rem;
            position: relative;
          }
          .row-margin {
            margin-bottom: 0.5rem;
          }
          .buttons-tops {
            margin-top: 1rem;
            display: flex;
            justify-content: center;
            gap: 10px;
          }
          .loader {
            border: 2px solid #fff;
            border-top: 2px solid #008479;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-left: 10px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .table-container {
            margin-top: 2rem;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 132, 121, 0.1);
            overflow-x: auto;
          }
          .table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
          }
          .table thead {
            background: linear-gradient(135deg, #008479 0%, #006b63 100%);
            color: #fff;
          }
          .table th {
            padding: 12px;
            font-weight: 600;
            text-align: left;
            font-size: 14px;
          }
          .table td {
            padding: 12px;
            font-size: 14px;
            color: #1a3c34;
            border-bottom: 1px solid #e9ecef;
          }
          .table tbody tr:nth-child(even) {
            background: #f8fafc;
          }
          .table tbody tr:hover {
            background: #e6f4f1;
            transition: background 0.3s ease;
          }
          .action-btn {
            padding: 6px 12px;
            font-size: 12px;
            border-radius: 6px;
            transition: all 0.3s ease;
          }
          .action-btn.edit {
            background: #28a745;
            color: #fff;
            border: none;
          }
          .action-btn.delete {
            background: #dc3545;
            color: #fff;
            border: none;
          }
          .action-btn:hover {
            transform: scale(1.05);
          }
          .offcanvas {
            background: #f8fafc;
            border-radius: 0 16px 16px 0;
          }
          .offcanvas-header {
            background: linear-gradient(135deg, #008479 0%, #006b63 100%);
            color: #fff;
            padding: 16px;
          }
          .offcanvas-title {
            font-size: 16px;
            font-weight: 600;
          }
          .offcanvas-body {
            padding: 24px;
          }
        `}),e.jsxs("div",{className:"container-fluid",children:[e.jsxs("div",{className:"form-container",children:[e.jsx("p",{className:"heading-16 mb-3",style:{color:"#1a3c34",fontWeight:"700"},children:"Add Allowance"}),e.jsxs("div",{className:"row px-1 row-margin",children:[e.jsx("div",{className:"col-lg-6 col-md-6 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"allowance",className:"form-label heading-14 label-color","data-tooltip":"Select allowance name","aria-label":"Allowance Name",children:["Allowance Name ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),M.length>0?e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"allowance",value:v,onChange:t=>X(t.target.value),tabIndex:"1","aria-describedby":"allowanceError",children:[e.jsx("option",{value:"",children:"--Choose--"}),M.map((t,s)=>e.jsx("option",{value:t.id,children:t.allowanceName},t.id||s))]}):e.jsx("p",{className:"text-muted small mt-2",children:"No allowances found"})]})}),e.jsx("div",{className:"col-lg-6 col-md-6 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"amount",className:"form-label heading-14 label-color","data-tooltip":"Enter amount (e.g., 1000.00)","aria-label":"Amount",children:["Amount ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!I&&g?"valid-indicator":""}`,id:"amount",placeholder:"Enter amount",value:g,onChange:t=>W(t.target.value),tabIndex:"2","aria-describedby":"amountError"}),I&&e.jsx("div",{id:"amountError",className:"error-message",children:"Valid amount is required"})]})})]}),e.jsxs("div",{className:"row px-1 row-margin",children:[e.jsx("div",{className:"col-lg-8 col-md-6 col-sm-12",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-lg-6 col-md-6 col-sm-12",children:e.jsxs("div",{className:"form-check",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"applyOption",id:"instantApply",value:"instant",checked:b==="INSTANT_APPLY",onChange:()=>y("INSTANT_APPLY"),tabIndex:"3"}),e.jsx("label",{className:"form-check-label",htmlFor:"instantApply",children:"Instant Apply"})]})}),e.jsx("div",{className:"col-lg-6 col-md-6 col-sm-12",children:e.jsxs("div",{className:"form-check",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"applyOption",id:"nextMonthApply",value:"nextMonth",checked:b==="NEXT_MONTH_APPLY",onChange:()=>y("NEXT_MONTH_APPLY"),tabIndex:"4"}),e.jsx("label",{className:"form-check-label",htmlFor:"nextMonthApply",children:"Next Month Apply"})]})})]})}),e.jsx("div",{className:"col-lg-4 col-md-6 col-sm-12"})]}),e.jsx("div",{className:"row buttons-tops text-center",children:e.jsxs("div",{className:"my-button11 heading-14",children:[e.jsx("button",{type:"button",className:"btn btn-outline-success my-green heading-12 me-1",onClick:ne,disabled:w,tabIndex:"5","aria-label":Y==="success"?"Update Allowance":"Add Allowance",children:w?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading"}),e.jsx("span",{className:"loader"})]}):Y==="success"?"Update Allowance":"Add Allowance"}),e.jsx("button",{type:"button",className:"btn btn-outline-success heading-12",onClick:C,tabIndex:"6","aria-label":"Cancel",children:"Cancel"}),e.jsx(fe,{})]})})]}),e.jsx("div",{className:"table-container mt-4",children:e.jsxs("table",{className:"table","aria-label":"Allowance List",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"Allowance Name"}),e.jsx("th",{scope:"col",children:"Allowance Type"}),e.jsx("th",{scope:"col",children:"Amount"}),e.jsx("th",{scope:"col",children:"Action"})]})}),e.jsx("tbody",{children:O.length>0?O.map((t,s)=>e.jsxs("tr",{children:[e.jsx("td",{children:t.allowanceName}),e.jsx("td",{children:t.allowanceType}),e.jsx("td",{children:t.amount}),e.jsxs("td",{children:[e.jsx("button",{className:"action-btn edit me-2",onClick:()=>re(t),tabIndex:7+s*2,"aria-label":`Edit allowance ${t.allowanceNameId}`,children:"Edit"}),e.jsx("button",{className:"action-btn delete",onClick:()=>ce(t.allowanceId),tabIndex:8+s*2,"aria-label":`Delete allowance ${t.allowanceOption}`,children:"Delete"})]})]},t.id)):e.jsx("tr",{children:e.jsx("td",{colSpan:"5",className:"text-center",children:"No allowances found"})})})]})}),e.jsxs("div",{className:`offcanvas offcanvas-end ${B?"show":""}`,tabIndex:"-1",id:"editAllowanceOffcanvas","aria-labelledby":"editAllowanceOffcanvasLabel",children:[e.jsxs("div",{className:"offcanvas-header",children:[e.jsx("h5",{className:"offcanvas-title",id:"editAllowanceOffcanvasLabel",children:"Edit Allowance"}),e.jsx("button",{type:"button",className:"btn-close btn-close-white",onClick:C,"aria-label":"Close"})]}),e.jsxs("div",{className:"offcanvas-body",children:[e.jsxs("div",{className:"form-group mb-3",children:[e.jsxs("label",{htmlFor:"editAllowance",className:"form-label heading-14 label-color","data-tooltip":"Select allowance name","aria-label":"Allowance Name",children:["Allowance Name ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"editAllowance",value:v,onChange:t=>X(t.target.value),tabIndex:"8","aria-describedby":"editAllowanceError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"Housing",children:"Housing"}),e.jsx("option",{value:"Travel",children:"Travel"})]}),_&&e.jsx("div",{id:"editAllowanceError",className:"error-message",children:"Allowance name is required"})]}),e.jsxs("div",{className:"form-group mb-3",children:[e.jsxs("label",{htmlFor:"editAmount",className:"form-label heading-14 label-color","data-tooltip":"Enter amount (e.g., 1000.00)","aria-label":"Amount",children:["Amount ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!I&&g?"valid-indicator":""}`,id:"editAmount",placeholder:"Enter amount",value:g,onChange:t=>W(t.target.value),tabIndex:"9","aria-describedby":"editAmountError"}),I&&e.jsx("div",{id:"editAmountError",className:"error-message",children:"Valid amount is required"})]}),e.jsx("div",{className:"form-group mb-3",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"form-check",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"editApplyOption",id:"editInstantApply",value:"instant",checked:b==="instant",onChange:()=>y("instant"),tabIndex:"10"}),e.jsx("label",{className:"form-check-label",htmlFor:"editInstantApply",children:"Instant Apply"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"form-check",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"editApplyOption",id:"editNextMonthApply",value:"nextMonth",checked:b==="nextMonth",onChange:()=>y("nextMonth"),tabIndex:"11"}),e.jsx("label",{className:"form-check-label",htmlFor:"editNextMonthApply",children:"Next Month Apply"})]})})]})}),e.jsxs("div",{className:"buttons-tops text-center",children:[e.jsx("button",{type:"button",className:"btn btn-outline-success my-green heading-12 me-1",onClick:ie,disabled:w,tabIndex:"12","aria-label":"Update Allowance",children:w?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading"}),e.jsx("span",{className:"loader"})]}):"Update Allowance"}),e.jsx("button",{type:"button",className:"btn btn-outline-success heading-12",onClick:C,tabIndex:"13","aria-label":"Cancel",children:"Cancel"})]})]})]})]})]})},He=({data:ae})=>{localStorage.getItem("token");const E=localStorage.getItem("MyUserID"),[U,j]=l.useState(!1),[w,c]=l.useState(!1),[h,$]=l.useState(!0),[Y,Z]=l.useState(),[v,D]=l.useState(""),[T,S]=l.useState(""),[b,y]=l.useState(""),[g,N]=l.useState(""),[_,A]=l.useState(!1),[Q,p]=l.useState(!1),[te,R]=l.useState(!1),[I,k]=l.useState(!1);l.useState([]);const[H,P]=l.useState(null),[B,F]=l.useState(!1),[M,J]=l.useState([]),[O,q]=l.useState([]),[L,de]=l.useState(1),[V,me]=l.useState(10),[K,ee]=l.useState(1);l.useEffect(()=>{se(),le()},[]);const oe=()=>{let t=!0;const s=/^[A-Za-z\s]+$/,n=/^\d+(\.\d{1,2})?$/;return!v||!s.test(v)?(A(!0),t=!1,c(!1)):A(!1),!T||!s.test(T)?(p(!0),t=!1,c(!1)):p(!1),!b||!n.test(b)?(R(!0),t=!1,c(!1)):R(!1),!g||!n.test(g)?(k(!0),t=!1,c(!1)):k(!1),t},X=t=>{console.log(t),D(t)},W=t=>{N(t),k(!t||!/^\d+(\.\d{1,2})?$/.test(t))},le=async()=>{var t,s,n,a;try{j(!0);const o=await Le("",L,V);(o==null?void 0:o.status)===200&&((t=o==null?void 0:o.data)==null?void 0:t.status)==="success"?J(o.data.deductionNames||[]):i.error(((s=o==null?void 0:o.data)==null?void 0:s.message)||"Failed to fetch Deductions")}catch(o){((a=(n=o==null?void 0:o.response)==null?void 0:n.data)==null?void 0:a.statusType)===401&&localStorage.removeItem("token"),i.error("Error fetching Deductions")}finally{j(!1)}},se=async()=>{var t,s,n,a,o,u,f,m,x,z;c(!0);try{const r=await Ve(E);(r==null?void 0:r.status)===200?(Z((t=r==null?void 0:r.data)==null?void 0:t.status),q(r.data.statutory||[]),D(((n=(s=r==null?void 0:r.data)==null?void 0:s.deduction)==null?void 0:n.deductionOption)||""),S(((o=(a=r==null?void 0:r.data)==null?void 0:a.deduction)==null?void 0:o.title)||""),y(((f=(u=r==null?void 0:r.data)==null?void 0:u.deduction)==null?void 0:f.amountOption)||""),N(((x=(m=r==null?void 0:r.data)==null?void 0:m.deduction)==null?void 0:x.amount)||""),c(!1)):(i.error(((z=r==null?void 0:r.data)==null?void 0:z.msg)||"Failed to fetch Deduction data"),c(!1))}catch{c(!1),i.error("Failed to fetch Deduction data")}},G=async()=>{var t,s,n;try{j(!0);const a=await Ue(E);console.log(a,"firsyt"),(a==null?void 0:a.status)===200?(console.log(a.data.statutory,"sec"),q(a.data.statutory||[]),ee(a.data.totalPages||1)):i.error(((t=a==null?void 0:a.data)==null?void 0:t.message)||"Failed to fetch Deductions")}catch(a){((n=(s=a==null?void 0:a.response)==null?void 0:s.data)==null?void 0:n.statusType)===401&&localStorage.removeItem("token"),i.error("Error fetching Deductions")}finally{j(!1)}},ne=async()=>{var s,n;const t=new FormData;t.append("deductionNameId",v),t.append("deductionOption",b),t.append("amount",g),c(!0);try{const a=await _e(E,t);console.log(a,"Update Deduction"),(a==null?void 0:a.status)===200?(G(),i.success((s=a==null?void 0:a.data)==null?void 0:s.message),$(!1),c(!1),C()):(i.error(((n=a==null?void 0:a.data)==null?void 0:n.message)||"Failed to update Deduction"),$(!0),c(!1))}catch{c(!1),i.error("Failed to update Deduction")}},re=t=>{P(t),D(t.deductionOption),S(t.title),y(t.amountOption),N(t.amount),F(!0)},ce=async t=>{var s,n;c(!0);try{const a=await qe(E,t);((s=a==null?void 0:a.data)==null?void 0:s.status)==="success"?(i.success("Deduction deleted successfully"),G()):i.error(((n=a==null?void 0:a.data)==null?void 0:n.message)||"Failed to delete Deduction")}catch{i.error("Failed to delete Deduction")}finally{c(!1)}},ie=async()=>{var t,s;if(oe()){const n=new FormData;n.append("DeductionOption",v),n.append("amountOption",b),n.append("title",T),n.append("amount",g),c(!0);try{const a=await ze(H.id,n);(a==null?void 0:a.status)===200?(i.success((t=a==null?void 0:a.data)==null?void 0:t.message),F(!1),C()):i.error(((s=a==null?void 0:a.data)==null?void 0:s.message)||"Failed to update Deduction")}catch{i.error("Failed to update Deduction")}finally{c(!1)}}},C=()=>{D(""),S(""),y(""),N(""),A(!1),p(!1),R(!1),k(!1),P(null),F(!1)};return e.jsxs(e.Fragment,{children:[U&&e.jsx(De,{}),e.jsx("style",{children:`
          .form-container {
            background: linear-gradient(145deg, #ffffff 0%, #e6f4f1 100%);
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 6px 20px rgba(0, 132, 121, 0.1);
            transition: all 0.3s ease;
            animation: slideIn 0.5s ease-out;
          }
          .form-container:hover {
            box-shadow: 0 8px 24px rgba(0, 132, 121, 0.15);
          }
          @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .form-control, .form-select {
            border-radius: 8px;
            font-size: 14px;
            padding: 10px;
            transition: all 0.3s ease;
            border: 1px solid #ced4da;
            background: #f8fafc;
          }
          .form-control:hover, .form-select:hover {
            border-color: #008479;
            background: #fff;
          }
          .form-control:focus, .form-select:focus {
            border-color: #008479;
            box-shadow: 0 0 0 0.2rem rgba(0, 132, 121, 0.25);
            outline: none;
            background: #fff;
          }
          .form-label {
            font-weight: 600;
            color: #1a3c34;
            margin-bottom: 5px;
            position: relative;
            display: inline-block;
          }
          .form-label:hover::after {
            content: attr(data-tooltip);
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: #008479;
            color: #fff;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 10;
            opacity: 0;
            animation: fadeIn 0.2s ease forwards;
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
          .my-green {
            background: linear-gradient(135deg, #008479 0%, #006b63 100%) !important;
            border: none !important;
            color: #fff !important;
            padding: 10px 20px;
            border-radius: 8px;
            transition: transform 0.2s ease, background 0.3s ease;
          }
          .my-green:hover {
            background: linear-gradient(135deg, #006b63 0%, #005a50 100%) !important;
            transform: scale(1.05);
          }
          .my-green:disabled {
            background: #b0b0b0 !important;
            cursor: not-allowed;
            transform: none;
          }
          .btn-outline-success {
            border-color: #008479;
            color: #008479;
            padding: 10px 20px;
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          .btn-outline-success:hover {
            background: linear-gradient(135deg, #008479 0%, #006b63 100%);
            color: #fff;
            transform: scale(1.05);
          }
          .error-message {
            font-size: 12px;
            color: #dc3545;
            margin-top: 3px;
            min-height: 16px;
            animation: fadeIn 0.3s ease;
          }
          .valid-indicator::after {
            content: '✔';
            color: #28a745;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 14px;
          }
          .form-group {
            margin-bottom: 0.4rem;
            position: relative;
          }
          .row-margin {
            margin-bottom: 0.5rem;
          }
          .buttons-tops {
            margin-top: 1rem;
            display: flex;
            justify-content: center;
            gap: 10px;
          }
          .loader {
            border: 2px solid #fff;
            border-top: 2px solid #008479;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            display: inline-block;
            margin-left: 10px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .table-container {
            margin-top: 2rem;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 132, 121, 0.1);
            overflow-x: auto;
          }
          .table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
          }
          .table thead {
            background: linear-gradient(135deg, #008479 0%, #006b63 100%);
            color: #fff;
          }
          .table th {
            padding: 12px;
            font-weight: 600;
            text-align: left;
            font-size: 14px;
          }
          .table td {
            padding: 12px;
            font-size: 14px;
            color: #1a3c34;
            border-bottom: 1px solid #e9ecef;
          }
          .table tbody tr:nth-child(even) {
            background: #f8fafc;
          }
          .table tbody tr:hover {
            background: #e6f4f1;
            transition: background 0.3s ease;
          }
          .action-btn {
            padding: 6px 12px;
            font-size: 12px;
            border-radius: 6px;
            transition: all 0.3s ease;
          }
          .action-btn.edit {
            background: #28a745;
            color: #fff;
            border: none;
          }
          .action-btn.delete {
            background: #dc3545;
            color: #fff;
            border: none;
          }
          .action-btn:hover {
            transform: scale(1.05);
          }
          .offcanvas {
            background: #f8fafc;
            border-radius: 0 16px 16px 0;
          }
          .offcanvas-header {
            background: linear-gradient(135deg, #008479 0%, #006b63 100%);
            color: #fff;
            padding: 16px;
          }
          .offcanvas-title {
            font-size: 16px;
            font-weight: 600;
          }
          .offcanvas-body {
            padding: 24px;
          }
        `}),e.jsxs("div",{className:"container-fluid",children:[e.jsxs("div",{className:"form-container",children:[e.jsx("p",{className:"heading-16 mb-3",style:{color:"#1a3c34",fontWeight:"700"},children:"Add Deduction"}),e.jsxs("div",{className:"row px-1 row-margin",children:[e.jsx("div",{className:"col-lg-6 col-md-6 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"Deduction",className:"form-label heading-14 label-color","data-tooltip":"Select Deduction name","aria-label":"Deduction Name",children:["Deduction Name ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),M.length>0?e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"Deduction",value:v,onChange:t=>X(t.target.value),tabIndex:"1","aria-describedby":"DeductionError",children:[e.jsx("option",{value:"",children:"--Choose--"}),M.map((t,s)=>e.jsx("option",{value:t.id,children:t.deductionName},t.id||s))]}):e.jsx("p",{className:"text-muted small mt-2",children:"No Deductions found"})]})}),e.jsx("div",{className:"col-lg-6 col-md-6 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"amount",className:"form-label heading-14 label-color","data-tooltip":"Enter amount (e.g., 1000.00)","aria-label":"Amount",children:["Amount ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!I&&g?"valid-indicator":""}`,id:"amount",placeholder:"Enter amount",value:g,onChange:t=>W(t.target.value),tabIndex:"2","aria-describedby":"amountError"}),I&&e.jsx("div",{id:"amountError",className:"error-message",children:"Valid amount is required"})]})})]}),e.jsxs("div",{className:"row px-1 row-margin",children:[e.jsx("div",{className:"col-lg-8 col-md-6 col-sm-12",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-lg-6 col-md-6 col-sm-12",children:e.jsxs("div",{className:"form-check",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"applyOption",id:"instantApply",value:"instant",checked:b==="INSTANT_APPLY",onChange:()=>y("INSTANT_APPLY"),tabIndex:"3"}),e.jsx("label",{className:"form-check-label",htmlFor:"instantApply",children:"Instant Apply"})]})}),e.jsx("div",{className:"col-lg-6 col-md-6 col-sm-12",children:e.jsxs("div",{className:"form-check",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"applyOption",id:"nextMonthApply",value:"nextMonth",checked:b==="NEXT_MONTH_APPLY",onChange:()=>y("NEXT_MONTH_APPLY"),tabIndex:"4"}),e.jsx("label",{className:"form-check-label",htmlFor:"nextMonthApply",children:"Next Month Apply"})]})})]})}),e.jsx("div",{className:"col-lg-4 col-md-6 col-sm-12"})]}),e.jsx("div",{className:"row buttons-tops text-center",children:e.jsxs("div",{className:"my-button11 heading-14",children:[e.jsx("button",{type:"button",className:"btn btn-outline-success my-green heading-12 me-1",onClick:ne,disabled:w,tabIndex:"5","aria-label":Y==="success"?"Update Deduction":"Add Deduction",children:w?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading"}),e.jsx("span",{className:"loader"})]}):Y==="success"?"Update Deduction":"Add Deduction"}),e.jsx("button",{type:"button",className:"btn btn-outline-success heading-12",onClick:C,tabIndex:"6","aria-label":"Cancel",children:"Cancel"}),e.jsx(fe,{})]})})]}),e.jsx("div",{className:"table-container mt-4",children:e.jsxs("table",{className:"table","aria-label":"Deduction List",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",children:"Deduction Name"}),e.jsx("th",{scope:"col",children:"Deduction Type"}),e.jsx("th",{scope:"col",children:"Amount"}),e.jsx("th",{scope:"col",children:"Action"})]})}),e.jsx("tbody",{children:O.length>0?O.map((t,s)=>e.jsxs("tr",{children:[e.jsx("td",{children:t.title}),e.jsx("td",{children:t.deductionOption}),e.jsx("td",{children:t.amount}),e.jsxs("td",{children:[e.jsx("button",{className:"action-btn edit me-2",onClick:()=>re(t),tabIndex:7+s*2,"aria-label":`Edit Deduction ${t.deductionNameId}`,children:"Edit"}),e.jsx("button",{className:"action-btn delete",onClick:()=>ce(t.statutoryDeductionId),tabIndex:8+s*2,"aria-label":`Delete Deduction ${t.deductionOption}`,children:"Delete"})]})]},t.id)):e.jsx("tr",{children:e.jsx("td",{colSpan:"5",className:"text-center",children:"No Deductions found"})})})]})}),e.jsxs("div",{className:`offcanvas offcanvas-end ${B?"show":""}`,tabIndex:"-1",id:"editDeductionOffcanvas","aria-labelledby":"editDeductionOffcanvasLabel",children:[e.jsxs("div",{className:"offcanvas-header",children:[e.jsx("h5",{className:"offcanvas-title",id:"editDeductionOffcanvasLabel",children:"Edit Deduction"}),e.jsx("button",{type:"button",className:"btn-close btn-close-white",onClick:C,"aria-label":"Close"})]}),e.jsxs("div",{className:"offcanvas-body",children:[e.jsxs("div",{className:"form-group mb-3",children:[e.jsxs("label",{htmlFor:"editDeduction",className:"form-label heading-14 label-color","data-tooltip":"Select Deduction name","aria-label":"Deduction Name",children:["Deduction Name ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"editDeduction",value:v,onChange:t=>X(t.target.value),tabIndex:"8","aria-describedby":"editDeductionError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"Housing",children:"Housing"}),e.jsx("option",{value:"Travel",children:"Travel"})]}),_&&e.jsx("div",{id:"editDeductionError",className:"error-message",children:"Deduction name is required"})]}),e.jsxs("div",{className:"form-group mb-3",children:[e.jsxs("label",{htmlFor:"editAmount",className:"form-label heading-14 label-color","data-tooltip":"Enter amount (e.g., 1000.00)","aria-label":"Amount",children:["Amount ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!I&&g?"valid-indicator":""}`,id:"editAmount",placeholder:"Enter amount",value:g,onChange:t=>W(t.target.value),tabIndex:"9","aria-describedby":"editAmountError"}),I&&e.jsx("div",{id:"editAmountError",className:"error-message",children:"Valid amount is required"})]}),e.jsx("div",{className:"form-group mb-3",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"form-check",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"editApplyOption",id:"editInstantApply",value:"instant",checked:b==="instant",onChange:()=>y("instant"),tabIndex:"10"}),e.jsx("label",{className:"form-check-label",htmlFor:"editInstantApply",children:"Instant Apply"})]})}),e.jsx("div",{className:"col-6",children:e.jsxs("div",{className:"form-check",children:[e.jsx("input",{className:"form-check-input",type:"radio",name:"editApplyOption",id:"editNextMonthApply",value:"nextMonth",checked:b==="nextMonth",onChange:()=>y("nextMonth"),tabIndex:"11"}),e.jsx("label",{className:"form-check-label",htmlFor:"editNextMonthApply",children:"Next Month Apply"})]})})]})}),e.jsxs("div",{className:"buttons-tops text-center",children:[e.jsx("button",{type:"button",className:"btn btn-outline-success my-green heading-12 me-1",onClick:ie,disabled:w,tabIndex:"12","aria-label":"Update Deduction",children:w?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading"}),e.jsx("span",{className:"loader"})]}):"Update Deduction"}),e.jsx("button",{type:"button",className:"btn btn-outline-success heading-12",onClick:C,tabIndex:"13","aria-label":"Cancel",children:"Cancel"})]})]})]})]})]})},Be=ue.div`
height: fit-content;
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
        background-color: #F0F8F7;
        padding: 10px;
        cursor: pointer;
        /* height: 20px; */
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

`,We=({data:ae})=>{const{Id:E,userId:U}=ae,j=E,w=U,[c,h]=l.useState("contact");return e.jsx(e.Fragment,{children:e.jsx(Be,{children:e.jsx("div",{className:"container-fluid",children:e.jsx("div",{className:"row",children:e.jsx("div",{className:"row pb-3",children:e.jsxs("div",{className:"bg-white rounded-2 p-2 ",children:[e.jsx("div",{className:"row border-bottom border-2 ",children:e.jsx("div",{className:"col-xxl-12 col-xl-12 col-sm-12 col-12",children:e.jsxs("div",{className:"row pb-2 gap-sm-0 gap-3 ",children:[e.jsx("div",{className:"col-md-2 col-sm-6 col-12 text-center ",children:e.jsx("span",{className:`font16 fontSizeResponsive px-0 fontWeight500 ps-3 pb-2 pe-3 heading-16  ${c==="contact"?"ActiveState":"InActiveState"}`,onClick:()=>{h("contact")},children:"Contract"})}),e.jsx("div",{className:"col-md-2 col-sm-12 col-12 text-center px-0",children:e.jsx("span",{className:`font16 fontSizeResponsive px-0 fontWeight500  ps-3 pb-2 pe-3 heading-16 ${c==="allowance"?"ActiveState":"InActiveState"}`,onClick:()=>{h("allowance")},children:"Allowances"})}),e.jsx("div",{className:"col-md-2 col-sm-12 col-12 text-center",children:e.jsx("span",{className:`font16 fontSizeResponsive px-0 fontWeight500  ps-3 pb-2 pe-3 heading-16  ${c==="commission"?"ActiveState":"InActiveState"}`,onClick:()=>{h("commission")},children:"Deduction"})})]})})}),e.jsxs("div",{className:"row",children:[c==="contact"&&e.jsx($e,{data:{transferId:j,myUserId:w}}),c==="allowance"&&e.jsx(Ye,{data:{transferId:j,myUserId:w}}),c==="commission"&&e.jsx(He,{data:{transferId:j,myUserId:w}})]})]})})})})})})};export{We as default};
