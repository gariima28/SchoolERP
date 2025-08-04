import{a as Ga,r as s,bB as Ba,_ as u,bA as Ta,j as e,c as Sa,bI as Za,bD as Oa,u as wa,bJ as Ya,w as q,R as _a,bK as Ha,bL as Ja,bM as Wa,bN as Xa,k as Ka,L as we}from"./index-DHII64NA.js";import Qa from"./User_Contact-7H5OTWXT.js";import et from"./User_Per_info-DhP7qcJd.js";import{u as at}from"./index.esm-ByE6_xdu.js";const tt=({data:de,setFunction:w,dataFunct:I,imageFunct:y,myUserName:D})=>{Ga();const P=de,[$,c]=s.useState(!1),[K,E]=s.useState(!0),[ce,U]=s.useState(),[se,Q]=s.useState(""),[le,C]=s.useState(),[j,M]=s.useState(),[A,G]=s.useState(),[z,B]=s.useState(),[L,T]=s.useState(),[N,S]=s.useState(),[R,F]=s.useState(),[x,Z]=s.useState(),[De,Ce]=s.useState(),[O,Fe]=s.useState([]),[ee,Y]=s.useState(""),[V,ae]=s.useState(""),[ke,me]=s.useState(!1),[Ee,fe]=s.useState(),[_,ue]=s.useState();s.useState(!1);const[pe,he]=s.useState(),[xe,i]=s.useState(null),[r,g]=s.useState(""),[f,b]=s.useState(""),[o,l]=s.useState(),[v,te]=s.useState(),[k,Ae]=s.useState(),[H,Re]=s.useState(""),[J,Pe]=s.useState(""),[W,ze]=s.useState(),[Ve,$e]=s.useState(),[Ue,ge]=s.useState(!1),[Le,be]=s.useState(!1),[qe,ve]=s.useState(!1),[Me,je]=s.useState(!1),[Ge,Ne]=s.useState(!1),[Be,ye]=s.useState(!1),[Te,Ie]=s.useState(!1),[Ze,Se]=s.useState(!1);s.useEffect(()=>{za(),Ua()},[]),s.useEffect(()=>{y(xe),D(r,f,k,V)},[xe,r,f,k,V]);const Oe=()=>{let a=!0;const n=/^[A-Za-z\s]+$/;return!r||!n.test(r)?(ge(!0),a=!1,c(!1)):ge(!1),!f||!n.test(f)?(be(!0),a=!1,c(!1)):be(!1),!o||o===""||!/^[a-zA-Z0-9\s,.'-/#%]+$/.test(o)?(ve(!0),a=!1,c(!1)):ve(!1),!v||v===""||!/^[a-zA-Z0-9\s,.'-/#%]+$/.test(v)?(je(!0),a=!1,c(!1)):je(!1),!k||k===""||!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(k)?(Ne(!0),a=!1,c(!1)):Ne(!1),!H||H===""||!/^[0-9]{10}$/.test(H)?(ye(!0),a=!1,c(!1)):ye(!1),!J||J===""||!/^\d{6}(-\d{4})?$/.test(J)?(Ie(!0),a=!1,c(!1)):Ie(!1),!W||W===""||!/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(W)?(Se(!0),a=!1,c(!1)):Se(!1),a},Da=a=>{g(a),ge(!a||!/^[A-Za-z\s]+$/.test(a))},Ca=a=>{b(a),be(!a||!/^[A-Za-z\s]+$/.test(a))},Fa=a=>{l(a),ve(!a||!/^[a-zA-Z0-9\s,.'-/#%]+$/.test(a))},ka=a=>{te(a),je(!a||!/^[a-zA-Z0-9\s,.'-/#%]+$/.test(a))},Ea=a=>{Ae(a),Ne(!a||!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(a))},Aa=a=>{Re(a),ye(!a||!/^[0-9]{10}$/.test(a))},Ra=a=>{Pe(a),Ie(!a||!/^\d{6}(-\d{4})?$/.test(a))},Pa=a=>{ze(a),Se(!a||!/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(a))},za=async()=>{var a;try{const n=await Ba();if((n==null?void 0:n.status)===200){const d=((a=n==null?void 0:n.data)==null?void 0:a.roles)||[];Fe(d);const p=d.find(X=>X.roleId===Number(P));p&&P!==0?(Y(p.roleId.toString()),ae(p.roleName),me(!0)):(Y(""),ae(""),me(!1))}}catch{c(!1),u.error("Failed to fetch roles")}},Va=a=>{const n=a.target.value;if(n){const[d,p]=n.split(", ");Y(d.trim()),ae(p.trim())}else Y(""),ae("")},$a=async()=>{var a,n,d,p,X,oe,re,ie,ne;if(Oe()){const h=new FormData;h.append("staffName",r),h.append("staffEmail",k),h.append("staffAddress",o),h.append("staffPhone",H),h.append("staffGender",se),h.append("roleId",ee),h.append("staffLastName",f),h.append("staffDOB",W),h.append("address2",v),h.append("bloodGroup",A),h.append("city",N),h.append("maritalStatus",j),h.append("nationality",z),h.append("pinCode",J),h.append("religion",R),h.append("staffImage",pe),h.append("state",L),h.append("citizenship",Ve),c(!0);try{const m=await Za(h);((a=m==null?void 0:m.data)==null?void 0:a.status)==="success"?(u.success((n=m==null?void 0:m.data)==null?void 0:n.message),Z((d=m==null?void 0:m.data)==null?void 0:d.status),Ce((p=m==null?void 0:m.data)==null?void 0:p.status),w((oe=(X=m==null?void 0:m.data)==null?void 0:X.otherstaff)==null?void 0:oe.id),localStorage.setItem("MyUserID",(ie=(re=m==null?void 0:m.data)==null?void 0:re.otherstaff)==null?void 0:ie.id),c(!1)):(u.error((ne=m==null?void 0:m.data)==null?void 0:ne.message),c(!1))}catch{c(!1),u.error("Failed to add profile")}}},Ua=async a=>{var n,d,p,X,oe,re,ie,ne,h,m,Ye,_e,He,Je,We,Xe,Ke,Qe,ea,aa,ta,sa,la,oa,ra,ia,na,da,ca,ma,fa,ua,pa,ha,xa,ga,ba,va,ja,Na,ya;U(a),c(!0);try{const t=await Ta(P);if((t==null?void 0:t.status)===200){ue((n=t==null?void 0:t.data)==null?void 0:n.status),g(((p=(d=t==null?void 0:t.data)==null?void 0:d.user)==null?void 0:p.staffName)||""),b(((oe=(X=t==null?void 0:t.data)==null?void 0:X.user)==null?void 0:oe.staffLastName)||""),Re(((ie=(re=t==null?void 0:t.data)==null?void 0:re.user)==null?void 0:ie.staffPhone)||""),Ae(((h=(ne=t==null?void 0:t.data)==null?void 0:ne.user)==null?void 0:h.staffEmail)||""),fe(((Ye=(m=t==null?void 0:t.data)==null?void 0:m.user)==null?void 0:Ye.staffEmail)||""),Pe(((He=(_e=t==null?void 0:t.data)==null?void 0:_e.user)==null?void 0:He.pinCode)||""),l(((We=(Je=t==null?void 0:t.data)==null?void 0:Je.user)==null?void 0:We.staffAddress)||""),te(((Ke=(Xe=t==null?void 0:t.data)==null?void 0:Xe.user)==null?void 0:Ke.address2)||""),Q(((ea=(Qe=t==null?void 0:t.data)==null?void 0:Qe.user)==null?void 0:ea.staffGender)||""),C(((ta=(aa=t==null?void 0:t.data)==null?void 0:aa.user)==null?void 0:ta.staffStatus)||""),M(((la=(sa=t==null?void 0:t.data)==null?void 0:sa.user)==null?void 0:la.maritalStatus)||""),T(((ra=(oa=t==null?void 0:t.data)==null?void 0:oa.user)==null?void 0:ra.state)||""),S(((na=(ia=t==null?void 0:t.data)==null?void 0:ia.user)==null?void 0:na.city)||""),B(((ca=(da=t==null?void 0:t.data)==null?void 0:da.user)==null?void 0:ca.nationality)||""),G(((fa=(ma=t==null?void 0:t.data)==null?void 0:ma.user)==null?void 0:fa.bloodGroup)||""),F(((pa=(ua=t==null?void 0:t.data)==null?void 0:ua.user)==null?void 0:pa.religion)||""),he(((xa=(ha=t==null?void 0:t.data)==null?void 0:ha.user)==null?void 0:xa.staffImage)||""),$e(((ba=(ga=t==null?void 0:t.data)==null?void 0:ga.user)==null?void 0:ba.citizenship)||""),I((va=t==null?void 0:t.data)==null?void 0:va.user);const Ia=(Na=(ja=t==null?void 0:t.data)==null?void 0:ja.user)==null?void 0:Na.staffDOB,Ma=Ia?Ia.split("T")[0]:"";ze(Ma),c(!1)}else u.error(((ya=t==null?void 0:t.data)==null?void 0:ya.msg)||"Failed to fetch user data"),c(!1)}catch{c(!1),u.error("Failed to fetch user data")}},La=async()=>{var a,n;if(Oe()){const d=new FormData;Ee!==k&&d.append("staffEmail",k),d.append("staffName",r),d.append("staffAddress",o),d.append("staffPhone",H),d.append("staffGender",se),d.append("roleId",ee),d.append("staffLastName",f),d.append("staffDOB",W),d.append("address2",v),d.append("bloodGroup",A),d.append("city",N),d.append("maritalStatus",j),d.append("nationality",z),d.append("pinCode",J),d.append("religion",R),d.append("staffImage",pe),d.append("state",L),d.append("citizenship",Ve),c(!0);try{const p=await Oa(P,d);(p==null?void 0:p.status)===200?(u.success((a=p==null?void 0:p.data)==null?void 0:a.message),E(!1),c(!1)):(u.error(((n=p==null?void 0:p.data)==null?void 0:n.message)||"Failed to update profile"),E(!0),c(!1))}catch{c(!1),u.error("Failed to update profile")}}},qa=()=>{C(""),M(""),G(""),B(""),T(""),S(""),F(""),Z(""),fe(""),ue(""),g(""),b(""),l(""),te(""),Ae(""),Re(""),Pe(""),ze(""),$e(""),ge(!1),be(!1),ve(!1),je(!1),ye(!1),Ie(!1),Ne(!1),Se(!1)};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
        `}),e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"form-container",children:[e.jsx("p",{className:"heading-16 mb-3",style:{color:"#1a3c34",fontWeight:"700"},children:"Basic Information"}),e.jsxs("div",{className:"row px-1 pt-2 row-margin",children:[e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"firstName",className:"form-label heading-14 label-color","data-tooltip":"Enter first name (letters only)","aria-label":"First Name",children:["First Name ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!Ue&&r?"valid-indicator":""}`,id:"firstName",placeholder:"John",value:x==="success"?"":r,onChange:a=>Da(a.target.value),tabIndex:"1","aria-describedby":"firstNameError"}),Ue&&e.jsx("div",{id:"firstNameError",className:"error-message",children:"Valid first name is required"})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"lastName",className:"form-label heading-14 label-color","data-tooltip":"Enter last name (letters only)","aria-label":"Last Name",children:["Last Name ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!Le&&f?"valid-indicator":""}`,id:"lastName",placeholder:"Doe",value:x==="success"?"":f,onChange:a=>Ca(a.target.value),tabIndex:"2","aria-describedby":"lastNameError"}),Le&&e.jsx("div",{id:"lastNameError",className:"error-message",children:"Valid last name is required"})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"phone",className:"form-label heading-14 label-color","data-tooltip":"Enter 10-digit phone number","aria-label":"Contact Number",children:["Contact Number ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!Be&&H?"valid-indicator":""}`,id:"phone",placeholder:"Number",value:x==="success"?"":H,onChange:a=>Aa(a.target.value),tabIndex:"3","aria-describedby":"phoneError"}),Be&&e.jsx("div",{id:"phoneError",className:"error-message",children:"Valid phone is required"})]})})]}),e.jsxs("div",{className:"row px-1 row-margin",children:[e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"gender",className:"form-label heading-14 label-color","data-tooltip":"Select your gender","aria-label":"Gender",children:["Gender ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"gender",value:x==="success"?"":se,onChange:a=>Q(a.target.value),tabIndex:"4","aria-describedby":"genderError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"male",children:"Male"}),e.jsx("option",{value:"female",children:"Female"}),e.jsx("option",{value:"other",children:"Other"})]})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"email",className:"form-label heading-14 label-color","data-tooltip":"Enter a valid email address","aria-label":"Email",children:["Email ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!Ge&&k?"valid-indicator":""}`,id:"email",placeholder:"Email",disabled:_==="success",value:x==="success"?"":k,onChange:a=>Ea(a.target.value),tabIndex:"5","aria-describedby":"emailError"}),Ge&&e.jsx("div",{id:"emailError",className:"error-message",children:"Valid email is required"})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"dob",className:"form-label heading-14 label-color","data-tooltip":"Select your date of birth (YYYY-MM-DD)","aria-label":"Date of Birth",children:["Date of Birth ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"date",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!Ze&&W?"valid-indicator":""}`,id:"dob",value:x==="success"?"":W,onChange:a=>Pa(a.target.value),tabIndex:"6","aria-describedby":"dobError"}),Ze&&e.jsx("div",{id:"dobError",className:"error-message",children:"Valid dob is required"})]})})]}),e.jsxs("div",{className:"row px-1 row-margin",children:[e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"status",className:"form-label heading-14 label-color","data-tooltip":"Select account status","aria-label":"Status",children:["Status ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"status",value:x==="success"?"":le,onChange:a=>C(a.target.value),tabIndex:"7","aria-describedby":"statusError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"true",children:"Active"}),e.jsx("option",{value:"false",children:"InActive"})]})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"maritalStatus",className:"form-label heading-14 label-color","data-tooltip":"Select marital status","aria-label":"Marital Status",children:["Marital Status ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"maritalStatus",value:x==="success"?"":j,onChange:a=>M(a.target.value),tabIndex:"8","aria-describedby":"maritalStatusError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"married",children:"Married"}),e.jsx("option",{value:"Unmarried",children:"Unmarried"})]})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"roleName",className:"form-label heading-14 label-color","data-tooltip":"Select user role","aria-label":"Role Name",children:["Role Name ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsxs("select",{className:"form-select form-select-sm form-focus-input heading-14 grey-input-text-color input-border-color",id:"roleName",disabled:ke||_==="success",value:ee&&V?`${ee}, ${V}`:"",onChange:Va,tabIndex:"9","aria-describedby":"roleNameError",children:[e.jsx("option",{value:"",children:"--Choose--"}),O==null?void 0:O.map(a=>e.jsx("option",{value:`${a.roleId}, ${a.roleName}`,children:a.roleName},a.roleId))]})]})})]}),e.jsxs("div",{className:"row px-1 row-margin",children:[e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"state",className:"form-label heading-14 label-color","data-tooltip":"Select your state or province","aria-label":"State or Province",children:["State / Province ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"state",value:x==="success"?"":L,onChange:a=>T(a.target.value),tabIndex:"10","aria-describedby":"stateError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"uttar pradesh",children:"Uttar Pradesh"}),e.jsx("option",{value:"delhi",children:"Delhi"})]})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"city",className:"form-label heading-14 label-color","data-tooltip":"Select your city","aria-label":"City",children:["City ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"city",value:x==="success"?"":N,onChange:a=>S(a.target.value),tabIndex:"11","aria-describedby":"cityError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"noida",children:"Noida"}),e.jsx("option",{value:"aligarh",children:"Aligarh"})]})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"pinCode",className:"form-label heading-14 label-color","data-tooltip":"Enter 6-digit pin code","aria-label":"Pin Code",children:["Pin Code ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!Te&&J?"valid-indicator":""}`,id:"pinCode",placeholder:"Enter pin code",value:x==="success"?"":J,onChange:a=>Ra(a.target.value),tabIndex:"12","aria-describedby":"pinCodeError"}),Te&&e.jsx("div",{id:"pinCodeError",className:"error-message",children:"Valid pin code is required"})]})})]}),e.jsxs("div",{className:"row px-1 row-margin",children:[e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"nationality",className:"form-label heading-14 label-color","data-tooltip":"Select your nationality","aria-label":"Nationality",children:["Nationality ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"nationality",value:x==="success"?"":z,onChange:a=>B(a.target.value),tabIndex:"13","aria-describedby":"nationalityError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"indian",children:"Indian"}),e.jsx("option",{value:"other",children:"Other"})]})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"citizenship",className:"form-label heading-14 label-color","data-tooltip":"Select your citizenship","aria-label":"Citizenship",children:["Citizenship ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"citizenship",value:x==="success"?"":Ve,onChange:a=>$e(a.target.value),tabIndex:"14","aria-describedby":"citizenshipError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"indian",children:"Indian"}),e.jsx("option",{value:"other",children:"Other"})]})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"religion",className:"form-label heading-14 label-color","data-tooltip":"Select your religion","aria-label":"Religion",children:["Religion ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"religion",value:x==="success"?"":R,onChange:a=>F(a.target.value),tabIndex:"15","aria-describedby":"religionError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"muslim",children:"Muslim"}),e.jsx("option",{value:"hindu",children:"Hindu"}),e.jsx("option",{value:"sikh",children:"Sikh"}),e.jsx("option",{value:"isai",children:"Isai"})]})]})})]}),e.jsxs("div",{className:"row px-1 row-margin",children:[e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"bloodGroup",className:"form-label heading-14 label-color","data-tooltip":"Select your blood group","aria-label":"Blood Group",children:["Blood Group ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsxs("select",{className:"form-select form-select-sm form-focus label-color",id:"bloodGroup",value:x==="success"?"":A,onChange:a=>G(a.target.value),tabIndex:"16","aria-describedby":"bloodGroupError",children:[e.jsx("option",{value:"",children:"--Choose--"}),e.jsx("option",{value:"a",children:"A"}),e.jsx("option",{value:"b",children:"B"})]})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"address1",className:"form-label heading-14 label-color","data-tooltip":"Enter primary address","aria-label":"Address Line 1",children:["Address Line 1 ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!qe&&o?"valid-indicator":""}`,id:"address1",placeholder:"Address",value:x==="success"?"":o,onChange:a=>Fa(a.target.value),tabIndex:"17","aria-describedby":"address1Error"}),qe&&e.jsx("div",{id:"address1Error",className:"error-message",children:"Valid address is required"})]})}),e.jsx("div",{className:"col-lg-4 col-md-4 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"address2",className:"form-label heading-14 label-color","data-tooltip":"Enter secondary address","aria-label":"Address Line 2",children:["Address Line 2 ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!Me&&v?"valid-indicator":""}`,id:"address2",placeholder:"Enter Address",value:x==="success"?"":v,onChange:a=>ka(a.target.value),tabIndex:"18","aria-describedby":"address2Error"}),Me&&e.jsx("div",{id:"address2Error",className:"error-message",children:"Valid address is required"})]})})]}),e.jsx("div",{className:"row buttons-tops text-center",children:e.jsxs("div",{className:"my-button11 heading-14",children:[e.jsx("button",{type:"button",className:"btn btn-outline-success my-green heading-12",onClick:_==="success"?La:$a,disabled:$,tabIndex:"22","aria-label":_==="success"?"Update Profile":"Add Profile",children:$?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading"}),e.jsx("span",{className:"loader"})]}):_==="success"?"Update Profile":"Add Profile"}),e.jsx("button",{type:"button",className:"btn btn-outline-success heading-12 ms-2",onClick:qa,tabIndex:"23","aria-label":"Cancel",children:"Cancel"}),e.jsx(Sa,{})]})})]})})]})},st=wa.div`
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
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 132, 121, 0.1);
    padding: 16px;
    margin-top: 20px;
  }
  .table {
    margin-bottom: 0;
  }
  .table th {
    background: #f8fafc;
    color: #1a3c34;
    font-weight: 600;
    padding: 12px;
  }
  .table td {
    padding: 12px;
    vertical-align: middle;
    color: #4a4a4a;
  }
  .table tr:hover {
    background: #e6f4f1;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 10px;
  }
  .pagination li {
    display: inline-block;
  }
  .pagination li a {
    padding: 6px 12px;
    border-radius: 6px;
    color: #008479;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .pagination li.active a {
    background: #008479;
    color: #fff;
  }
  .pagination li a:hover {
    background: #e6f4f1;
  }
`,lt=({data:de})=>{const w=localStorage.getItem("MyUserID"),[I,y]=s.useState(!1),[D,P]=s.useState(""),[$,c]=s.useState(null),[K,E]=s.useState(null),[ce,U]=s.useState(!1),[se,Q]=s.useState(!1),[le,C]=s.useState(!1),[j,M]=s.useState(1),[A,G]=s.useState(10),[z,B]=s.useState(1),[L,T]=s.useState([]),[N,S]=s.useState(""),[R,F]=s.useState(""),[x,Z]=s.useState(!1),{register:De,handleSubmit:Ce,formState:{errors:O,isValid:Fe},setValue:ee,reset:Y}=at({mode:"onChange"});s.useEffect(()=>{w&&V()},[w,j,A]);const V=async()=>{var i,r,g,f,b,o;y(!0);try{const l=await Ya(w,{pageNo:j,pageSize:A});(l==null?void 0:l.status)===200&&((i=l==null?void 0:l.data)==null?void 0:i.status)==="success"?(T(((r=l==null?void 0:l.data)==null?void 0:r.documents)||[]),B(((g=l==null?void 0:l.data)==null?void 0:g.totalPages)||1)):u.error(((f=l==null?void 0:l.data)==null?void 0:f.msg)||"Failed to fetch documents")}catch(l){((o=(b=l==null?void 0:l.response)==null?void 0:b.data)==null?void 0:o.statusType)===401&&localStorage.removeItem("MyUserID"),u.error("Failed to fetch documents")}finally{y(!1)}},ae=()=>{let i=!0;return!D||!/^[A-Za-z\s]+$/.test(D)?(U(!0),i=!1):U(!1),$?C(!1):(C(!0),i=!1),i},ke=i=>{const r=i;P(r),U(!r||!/^[A-Za-z\s]+$/.test(r))},me=i=>{const r=i.target.files[0];r&&["image/jpeg","image/png"].includes(r.type)?(c(r),E(URL.createObjectURL(r)),C(!1)):(C(!0),u.error("Please upload a valid JPG or PNG file"))},Ee=async()=>{var i,r,g,f,b;if(ae()){const o=new FormData;o.append("docName",D),o.append("docPath",$),o.append("staffId",w),y(!0);try{const l=await Ha(w,o);((i=l==null?void 0:l.data)==null?void 0:i.status)==="success"?(u.success((r=l==null?void 0:l.data)==null?void 0:r.message),V(),he()):u.error(((g=l==null?void 0:l.data)==null?void 0:g.message)||"Failed to add document")}catch(l){((b=(f=l==null?void 0:l.response)==null?void 0:f.data)==null?void 0:b.statusType)===401&&localStorage.removeItem("MyUserID"),u.error("Failed to add document")}finally{y(!1)}}},fe=async i=>{var r,g,f,b;y(!0);try{const o=await Ja(i);if((o==null?void 0:o.status)===200){const l=(r=o==null?void 0:o.data)==null?void 0:r.document;S(l.id),ee("docName",l.docName||""),E(l.docPath||null)}else u.error(((g=o==null?void 0:o.data)==null?void 0:g.msg)||"Failed to fetch document")}catch(o){((b=(f=o==null?void 0:o.response)==null?void 0:f.data)==null?void 0:b.statusType)===401&&localStorage.removeItem("MyUserID"),u.error("Failed to fetch document")}finally{y(!1)}},_=async i=>{var r,g,f,b,o;y(!0);try{const l=new FormData;l.append("docName",i.docName),i.file&&i.file[0]&&l.append("docPath",i.file[0]),l.append("documentId",N);const v=await Wa(N,l);if(((r=v==null?void 0:v.data)==null?void 0:r.status)==="success"){u.success((g=v==null?void 0:v.data)==null?void 0:g.message),V(),Y(),S(""),E(null);const te=document.getElementById("editDocument");(bootstrap.Offcanvas.getInstance(te)||new bootstrap.Offcanvas(te)).hide()}else u.error(((f=v==null?void 0:v.data)==null?void 0:f.message)||"Failed to update document")}catch(l){((o=(b=l==null?void 0:l.response)==null?void 0:b.data)==null?void 0:o.statusType)===401&&localStorage.removeItem("MyUserID"),u.error("Failed to update document")}finally{y(!1)}},ue=i=>{F(i),Z(!1)},pe=async()=>{var i,r,g,f,b;if(x){y(!0);try{const o=await Xa(w,R);if(((i=o==null?void 0:o.data)==null?void 0:i.status)==="success"){u.success((r=o==null?void 0:o.data)==null?void 0:r.message),V(),Z(!1),F("");const l=document.getElementById("deleteDocument");(bootstrap.Offcanvas.getInstance(l)||new bootstrap.Offcanvas(l)).hide()}else u.error(((g=o==null?void 0:o.data)==null?void 0:g.message)||"Failed to delete document")}catch(o){((b=(f=o==null?void 0:o.response)==null?void 0:f.data)==null?void 0:b.statusType)===401&&localStorage.removeItem("MyUserID"),u.error("Failed to delete document")}finally{y(!1)}}},he=()=>{P(""),c(null),E(null),U(!1),Q(!1),C(!1)},xe=i=>{const r=i.selected+1;M(r)};return e.jsxs(st,{children:[e.jsx(Sa,{}),I&&e.jsx("div",{className:"loader",style:{position:"fixed",top:"50%",left:"50%",zIndex:1e3}}),e.jsxs("div",{className:"container-fluid px-0 mt-3",children:[e.jsxs("div",{className:"form-container",children:[e.jsx("p",{className:"heading-16 mb-3",style:{color:"#1a3c34",fontWeight:"700"},children:"Add New Document"}),e.jsxs("div",{className:"row row-margin",children:[e.jsx("div",{className:"col-lg-6 col-md-6 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"documentTitle",className:"form-label heading-14 label-color","data-tooltip":"Enter document title (letters only)","aria-label":"Document Title",children:["Document Title ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color ${!ce&&D?"valid-indicator":""}`,id:"documentTitle",placeholder:"Enter document title",value:D,onChange:i=>ke(i.target.value),tabIndex:"1","aria-describedby":"documentTitleError"}),ce&&e.jsx("div",{id:"documentTitleError",className:"error-message",children:"Valid document title is required"})]})}),e.jsx("div",{className:"col-lg-6 col-md-6 col-sm-12",children:e.jsxs("div",{className:"form-group",children:[e.jsxs("label",{htmlFor:"documentFile",className:"form-label heading-14 label-color","data-tooltip":"Upload a JPG, JPEG, or PNG file","aria-label":"Document File",children:["Document File ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"file",className:"form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color",id:"documentFile",onChange:me,accept:".jpg,.jpeg,.png",tabIndex:"3","aria-describedby":"documentFileError"}),le&&e.jsx("div",{id:"documentFileError",className:"error-message",children:"Valid file (JPG, JPEG, PNG) is required"})]})}),K&&e.jsx("div",{className:"col-lg-6 col-md-6 col-sm-12",children:e.jsx("div",{className:"form-group",children:e.jsx("img",{src:K,alt:"Document Preview",style:{maxWidth:"100%",maxHeight:"100px",marginTop:"10px"}})})})]}),e.jsx("div",{className:"row buttons-tops text-center",children:e.jsxs("div",{className:"my-button11 heading-14",children:[e.jsx("button",{type:"button",className:"btn btn-outline-success my-green heading-14 me-1",onClick:Ee,disabled:I,tabIndex:"4","aria-label":"Add Document",children:I?e.jsxs(e.Fragment,{children:[e.jsx("span",{children:"Loading"}),e.jsx("span",{className:"loader"})]}):"Add Document"}),e.jsx("button",{type:"button",className:"btn btn-outline-success heading-14",onClick:he,tabIndex:"5","aria-label":"Cancel",children:"Cancel"})]})})]}),e.jsxs("div",{className:"form-container",children:[e.jsx("h2",{className:"heading-16 mb-3",style:{color:"#1a3c34",fontWeight:"700"},children:"Document Details"}),e.jsxs("div",{className:"table-container table-responsive",children:[e.jsxs("table",{className:"table table-sm table-striped text-center",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"heading-16 text-color-000",style:{fontWeight:"600"},children:[e.jsx("th",{style:{width:"100px"},children:"Sr no."}),e.jsx("th",{style:{width:"600px"},children:"Document Name"}),e.jsx("th",{style:{width:"100px"},children:"Action"})]})}),e.jsx("tbody",{className:"heading-14 align-middle greyTextColor",children:L.length>0?L.map((i,r)=>e.jsxs("tr",{className:"heading-14",children:[e.jsx("td",{children:(j-1)*A+r+1}),e.jsx("td",{children:i.docName||"N/A"}),e.jsxs("td",{children:[e.jsx("button",{className:"action-btn edit me-2",onClick:()=>fe(i.id),"data-bs-toggle":"offcanvas","data-bs-target":"#editDocument",tabIndex:6+r*2,"aria-label":`Edit document ${i.docName}`,children:e.jsx(q,{icon:"tabler:edit",width:"1.4em",height:"1.4em"})}),e.jsx("button",{className:"action-btn delete",onClick:()=>ue(i.id),"data-bs-toggle":"offcanvas","data-bs-target":"#deleteDocument",tabIndex:7+r*2,"aria-label":`Delete document ${i.docName}`,children:e.jsx(q,{icon:"tabler:trash",width:"1.4em",height:"1.4em"})})]})]},i.id||r)):e.jsx("tr",{children:e.jsx("td",{colSpan:"4",children:"No documents found"})})})]}),e.jsxs("div",{className:"d-flex",style:{marginBottom:"10px"},children:[e.jsxs("p",{className:"font14",children:["Showing ",j," of ",z," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(_a,{previousLabel:e.jsx(q,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(q,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:z,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:xe,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"editDocument","aria-labelledby":"editDocumentLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-1",children:[e.jsx("a",{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title heading-16",id:"editDocumentLabel",children:"Edit Document"})]}),e.jsx("div",{className:"offcanvas-body p-3",children:e.jsxs("form",{onSubmit:Ce(_),children:[e.jsxs("div",{className:"form-group mb-3",children:[e.jsxs("label",{htmlFor:"editDocumentName",className:"form-label heading-14 label-color","data-tooltip":"Enter document title (letters only)",children:["Document Title ",e.jsx("span",{style:{color:"#dc3545"},children:"*"})]}),e.jsx("input",{type:"text",className:`form-control form-control-sm heading-14 grey-input-text-color input-border-color ${O.docName?"border-danger":""}`,id:"editDocumentName",placeholder:"Enter document title",...De("docName",{required:"Valid document title is required",pattern:{value:/^[A-Za-z\s]+$/,message:"Document title must contain only letters and spaces"}})}),O.docName&&e.jsx("div",{className:"error-message",children:O.docName.message})]}),e.jsxs("div",{className:"form-group mb-3",children:[e.jsx("label",{htmlFor:"editDocumentFile",className:"form-label heading-14 label-color","data-tooltip":"Upload a JPG, JPEG, or PNG file (optional)",children:"Document File"}),e.jsx("input",{type:"file",className:"form-control form-control-sm heading-14 grey-input-text-color input-border-color",id:"editDocumentFile",accept:".jpg,.jpeg,.png",...De("file")}),K&&e.jsx("img",{src:K,alt:"Document Preview",style:{maxWidth:"100%",maxHeight:"100px",marginTop:"10px"}})]}),e.jsxs("div",{className:"text-center p-3",children:[e.jsxs("button",{type:"submit",className:"btn btn-outline-success my-green heading-14 me-2",disabled:!Fe||I,children:["Update Document ",I&&e.jsx("span",{className:"loader"})]}),e.jsx("button",{type:"button",className:"btn btn-outline-success heading-14","data-bs-dismiss":"offcanvas",onClick:()=>{Y(),S(""),E(null)},children:"Cancel"})]})]})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"deleteDocument","aria-labelledby":"deleteDocumentLabel",children:[e.jsxs("div",{className:"offcanvas-header ps-0 p-1",children:[e.jsx("a",{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#B50000",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("span",{className:"offcanvas-title heading-16",id:"deleteDocumentLabel",children:"Delete Document"})]}),e.jsx("div",{className:"offcanvas-body p-0",children:e.jsxs("div",{style:{zIndex:-1},children:[e.jsx("p",{className:"p-2",children:"Document"}),e.jsx("p",{className:"text-center p-3",children:e.jsx("img",{src:"/images/errorI.svg",className:"img-fluid",alt:"Error"})}),e.jsx("p",{className:"text-center heading-16",style:{color:"#1a3c34",fontWeight:"700"},children:"Are you Sure?"}),e.jsxs("p",{className:"text-center greyTextColor heading-14 pt-2",children:["This action will permanently delete",e.jsx("br",{}),"the Document Data"]}),e.jsxs("p",{className:"text-center heading-14 p-2",children:[e.jsx("input",{className:"form-check-input me-2",type:"checkbox",checked:x,id:"deleteConfirm",onChange:i=>Z(i.target.checked)}),"I Agree to delete the Document Data"]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsxs("button",{className:"btn btn-outline-success my-green heading-14",disabled:!x||I,onClick:pe,children:["Delete ",I&&e.jsx("span",{className:"loader"})]}),e.jsx("button",{className:"btn btn-outline-success heading-14 ms-2","data-bs-dismiss":"offcanvas",onClick:()=>{Z(!1),F("")},children:"Cancel"})]})]})})]})]})]})]})},ot=wa.div`
  .main-body {
    background-color: #F2F3F6;
  }
  .main-content-container {
    background-color: #fff;
    margin: 15px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
  .container-div-content {
    padding: 24px;
    background-color: #fff;
    border-radius: 10px;
  }
  .profile-card {
    background: linear-gradient(135deg, #E5F3F2 0%, #F8FAFC 100%);
    border-radius: 12px;
    padding: 24px;
    min-height: 450px; /* Increased height */
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  .profile-card:hover {
    transform: translateY(-4px);
  }
  .mainContainer img {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 4px solid #ffffff;
    transition: all 0.3s ease;
  }
  .mainContainer img:hover {
    transform: scale(1.05);
  }
  .mainContainer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    margin: 0 auto;
  }
  .camera-icon-container {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: #ffffff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 2px solid #f5f5f5;
  }
  .camera-icon-container:hover {
    transform: scale(1.15);
    box-shadow: 0 4px 12px rgba(0, 118, 110, 0.25);
    background: #f8f8f8;
  }
  .camera-icon {
    width: 20px;
    height: 20px;
    color: #008479;
    transition: transform 0.3s ease;
  }
  .camera-icon-container:hover .camera-icon {
    transform: scale(1.1);
    color: #006b63;
  }
  .file-input {
    display: none;
  }
  .profile-info {
    margin-top: 16px;
    text-align: center;
  }
  .profile-info h2 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
  .profile-info p {
    font-size: 16px;
    color: #666;
  }
  .profile-info .role {
    font-size: 18px;
    font-weight: 600;
    color: #008479;
  }
  .nav-tabs-container {
    margin-top: 24px;
    border-top: 1px solid #D7E7E5;
    padding-top: 16px;
  }
  .nav-link {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    padding: 12px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  .nav-link:hover {
    background-color: #f8f8f8;
    color: #008479;
  }
  .nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    background-color: #008479;
    color: #fff;
    border-radius: 8px;
    font-weight: 600;
  }
  .my-nav-link {
    color: #000 !important;
    background-color: #f0f0f0 !important;
    pointer-events: none !important;
    border-radius: 8px;
  }
  @media only screen and (max-width: 1260px) {
    .mainContainer img {
      width: 120px;
      height: 120px;
    }
    .mainContainer {
      width: 130px;
      height: 130px;
    }
  }
  @media only screen and (max-width: 991px) {
    .profile-info h2 {
      font-size: 16px;
    }
    .profile-info p {
      font-size: 14px;
    }
    .profile-info .role {
      font-size: 16px;
    }
    .profile-card {
      min-height: 400px;
    }
    .nav-link {
      padding: 10px 12px;
    }
  }
`,ct=()=>{const{id:de}=Ka(),w=de,[I,y]=s.useState(!1),[D,P]=s.useState(),[$,c]=s.useState(),[K,E]=s.useState(""),[ce,U]=s.useState(""),[se,Q]=s.useState(""),[le,C]=s.useState(""),[j,M]=s.useState(),A=localStorage.getItem("MyUserID");s.useEffect(()=>{G(),z()},[A]);const G=N=>{P(N),y(!0)},z=N=>{M(N)},B=(N,S,R,F)=>{E(N),U(S),Q(R),C(F)},L=N=>{c(N)},T=N=>{const S=N.target.files[0];if(S){const R=new FileReader;R.onload=F=>{c(F.target.result)},R.readAsDataURL(S)}};return e.jsx(ot,{children:e.jsx("div",{className:"container-fluid p-2",children:e.jsx("div",{className:"main-content-container",children:e.jsx("div",{className:"container-div-content",children:e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-lg-3 div-col-3",children:e.jsxs("div",{className:"profile-card",children:[e.jsxs("div",{className:"mainContainer",children:[e.jsx("img",{src:$||(j==null?void 0:j.staffImage)||"/images/user-image.png",alt:"Profile"}),e.jsx("label",{htmlFor:"staff-image-upload",className:"camera-icon-container",children:e.jsxs("svg",{className:"camera-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",children:[e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"}),e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M15 13a3 3 0 11-6 0 3 3 0 016 0z"}),e.jsx("circle",{cx:"12",cy:"10",r:"1",fill:"currentColor"})]})}),e.jsx("input",{id:"staff-image-upload",type:"file",accept:"image/*",onChange:T,className:"file-input"})]}),e.jsx("div",{className:"profile-info",children:e.jsx("p",{className:"role heading-18 font-rsponsive",children:j!=null&&j.userRole?j.userRole:le})}),e.jsx("div",{className:"nav-tabs-container",children:e.jsxs("div",{className:"nav flex-column nav-pills",id:"v-pills-tab",role:"tablist","aria-orientation":"vertical",children:[e.jsxs(we,{className:"nav-link active d-flex align-items-center",id:"v-pills-profile-tab","data-bs-toggle":"pill","data-bs-target":"#v-pills-profile",type:"button",role:"tab","aria-controls":"v-pills-profile","aria-selected":"true",children:[e.jsx("span",{className:"flex-grow-1 heading-16",children:"Basic Information"}),e.jsx(q,{icon:"iconamoon:arrow-right-2-light",width:"1.5em",height:"1.5em"})]}),e.jsxs(we,{className:`nav-link d-flex align-items-center ${I?"":"my-nav-link"}`,id:"v-pills-home-tab","data-bs-toggle":"pill","data-bs-target":"#v-pills-home",type:"button",role:"tab","aria-controls":"v-pills-home","aria-selected":"false",children:[e.jsx("span",{className:"flex-grow-1 heading-16",children:"Contract"}),e.jsx(q,{icon:"iconamoon:arrow-right-2-light",width:"1.5em",height:"1.5em"})]}),e.jsxs(we,{className:`nav-link d-flex align-items-center ${I?"":"my-nav-link"}`,id:"v-pills-messages-tab","data-bs-toggle":"pill","data-bs-target":"#v-pills-messages",type:"button",role:"tab","aria-controls":"v-pills-messages","aria-selected":"false",children:[e.jsx("span",{className:"flex-grow-1 heading-16",children:"Personal Information"}),e.jsx(q,{icon:"iconamoon:arrow-right-2-light",width:"1.5em",height:"1.5em"})]}),e.jsxs(we,{className:`nav-link d-flex align-items-center ${I?"":"my-nav-link"}`,id:"v-pills-settings-tab2","data-bs-toggle":"pill","data-bs-target":"#v-pills-settings2",type:"button",role:"tab","aria-controls":"v-pills-settings2","aria-selected":"false",children:[e.jsx("span",{className:"flex-grow-1 heading-16",children:"Documents"}),e.jsx(q,{icon:"iconamoon:arrow-right-2-light",width:"1.5em",height:"1.5em"})]})]})})]})}),e.jsx("div",{className:"col-lg-9",children:e.jsxs("div",{className:"tab-content",id:"v-pills-tabContent",children:[e.jsx("div",{className:"tab-pane fade show active",id:"v-pills-profile",role:"tabpanel","aria-labelledby":"v-pills-profile-tab",tabIndex:"0",children:e.jsx(tt,{data:w,setFunction:G,dataFunct:z,imageFunct:L,myUserName:B,image:$})}),e.jsx("div",{className:"tab-pane fade for-disabled",id:"v-pills-home",role:"tabpanel","aria-labelledby":"v-pills-home-tab",tabIndex:"0",children:e.jsx(Qa,{data:{Id:D,userId:w}})}),e.jsx("div",{className:"tab-pane fade for-disabled",id:"v-pills-messages",role:"tabpanel","aria-labelledby":"v-pills-messages-tab",tabIndex:"0",children:e.jsx(et,{data:D})}),e.jsx("div",{className:"tab-pane fade for-disabled",id:"v-pills-settings2",role:"tabpanel","aria-labelledby":"v-pills-settings-tab2",tabIndex:"0",children:e.jsx(lt,{data:D})})]})})]})})})})})};export{ct as default};
