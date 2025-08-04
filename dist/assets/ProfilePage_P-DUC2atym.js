import{u as nt,r,fs as ct,_ as h,j as t,D as mt,L as ut,I as xt,c as ft,ft as ht}from"./index-DHII64NA.js";import{u as bt}from"./index.esm-ByE6_xdu.js";const gt=nt.div`
    .mainBreadCrum{
        --bs-breadcrumb-divider: none !important;
    }

    .capitalize {
        text-transform: capitalize;
    }

    .formimagetext{
      border-radius: 5px 0px 0px 5px !important;
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
        border-radius: 5px;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .greenBgModal{
        background-color: var(--breadCrumActiveTextColor);
    }

    .greenText{
        color: var(--greenTextColor);
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

    .headingBgColor{
        background-color: var(--headingBackgroundColor);
        
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px ;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .CancelBtnn, .CancelBtnn:active{
        border: 1px solid var(--breadCrumActiveTextColor);
    }

    .verifiedBtn{
        background-color: var(--verifiedButton);
    }

    .form-control{
        border : 1px solid var(--fontControlBorder);
    }

    .formcontrolButtonborder {
        border-top: 1px solid var(--greenTextColor) !important;
        border-right: 1px solid var(--greenTextColor) !important;
        border-bottom: 1px solid var(--greenTextColor) !important;
        border-left: none !important;
        background-color: var(--greenTextColor);
        border-radius: 0px 6px 6px 0px;
        box-shadow: none !important;
        cursor: pointer;
    }

    .greyText{
        color: var(--greyTextColor);
    }

    .borderRadiusleft{
        border-radius: 5px 0px 0px 5px;
    }
    
`,St=()=>{const _=sessionStorage.getItem("token"),i=sessionStorage.getItem("loggedInUserRole"),[o,W]=r.useState(),[m,b]=r.useState(!0),[g,Z]=r.useState(""),[Nt,J]=r.useState(""),[jt,Q]=r.useState(""),[N,X]=r.useState(""),[j,Y]=r.useState(""),[tt,et]=r.useState(""),[at,rt]=r.useState(""),[lt,dt]=r.useState("");r.useState("");const[st,l]=r.useState(!1);r.useEffect(()=>{v()},[_]);const v=async()=>{var a,n,c,s,p,S,C,y,w,A,B,F,T,P,D,I,k,E,L,q,z,O,R,M,V,$,G,H,K,U;try{l(!0);var e=await ct();(e==null?void 0:e.status)===200?((a=e==null?void 0:e.data)==null?void 0:a.status)==="success"?(l(!1),Z((c=(n=e==null?void 0:e.data)==null?void 0:n.student)==null?void 0:c.fatherName),J((p=(s=e==null?void 0:e.data)==null?void 0:s.student)==null?void 0:p.classNo),Q((C=(S=e==null?void 0:e.data)==null?void 0:S.student)==null?void 0:C.classSection),X((w=(y=e==null?void 0:e.data)==null?void 0:y.student)==null?void 0:w.studentPhone),x("phoneNumber",(B=(A=e==null?void 0:e.data)==null?void 0:A.student)==null?void 0:B.parentNo),Y((T=(F=e==null?void 0:e.data)==null?void 0:F.student)==null?void 0:T.address),x("studentAddress",(D=(P=e==null?void 0:e.data)==null?void 0:P.student)==null?void 0:D.address),et((k=(I=e==null?void 0:e.data)==null?void 0:I.student)==null?void 0:k.parentEmail),rt((L=(E=e==null?void 0:e.data)==null?void 0:E.student)==null?void 0:L.dateOfBirth),dt((z=(q=e==null?void 0:e.data)==null?void 0:q.student)==null?void 0:z.studentGender),x("multipartFile",(R=(O=e==null?void 0:e.data)==null?void 0:O.student)==null?void 0:R.parentImage),W((V=(M=e==null?void 0:e.data)==null?void 0:M.student)==null?void 0:V.parentImage),(G=($=e==null?void 0:e.data)==null?void 0:$.student)!=null&&G.parentImage&&b(!0)):(l(!1),h.error((H=e==null?void 0:e.data)==null?void 0:H.message)):l(!1)}catch(f){l(!1),l(!1),((U=(K=f==null?void 0:f.response)==null?void 0:K.data)==null?void 0:U.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},it=async e=>{var n,c;try{l(!0);const s=new FormData;j!==e.studentAddress&&s.append("studentAddress",e==null?void 0:e.studentAddress),N!==e.phoneNumber&&s.append("phoneNumber",e==null?void 0:e.phoneNumber),o!==e.multipartFile&&s.append("multipartFile",e==null?void 0:e.multipartFile[0]);var a=await ht(s);(a==null?void 0:a.status)===200?((n=a==null?void 0:a.data)==null?void 0:n.status)==="success"?(l(!1),v(),h.success(a.data.message)):(l(!1),h.error((c=a==null?void 0:a.data)==null?void 0:c.message)):l(!1)}catch{l(!1)}},{register:u,handleSubmit:ot,formState:{errors:d},setValue:x}=bt({mode:"onChange"});return t.jsxs(gt,{className:"container-fluid p-md-4 p-3 overflow-scroll",children:[st&&t.jsx(mt,{}),t.jsxs("div",{className:"row pb-3",children:[t.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:t.jsxs("ol",{className:"breadcrumb mb-1",children:[t.jsxs("li",{className:"breadcrumb-item",children:[t.jsx(ut,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),t.jsx(xt,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),t.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Profile"})]})}),t.jsx("p",{className:"font14 ps-0 fw-bolder",children:"My Account"})]}),t.jsxs("div",{className:"row p-md-3 p-2 gap-md-0 gap-2 bg-white borderRadius5 pb-5",children:[t.jsx("div",{className:"col-md-4 col-sm-12",children:t.jsx("div",{className:"row h-100",children:t.jsxs("div",{className:"headingBgColor borderRadius5 ps-4 pe-4",children:[t.jsx("p",{className:"p-3 text-center",children:t.jsx("img",{className:"rounded-circle",src:o,alt:"Student Profile Image",width:80,height:80})}),t.jsx("p",{className:"text-center mb-2",children:t.jsx("span",{className:"font14 text-center mb-2 activeTexttt fontWeight600",children:g})}),t.jsxs("div",{className:"d-flex align-items-center justify-content-center mb-2",children:[t.jsx("span",{className:"font14 c",children:(i==null?void 0:i.charAt(0).toUpperCase())+(i==null?void 0:i.slice(1).toLowerCase())}),t.jsx("button",{className:"ms-2 verifiedBtn btn text-white font12 align-items-center p-1 ps-3 pe-3 cardradius2",children:"Verified"})]}),t.jsx("hr",{className:"mb-2 mt-2"}),t.jsx("span",{className:"font14 p-0 greenText fw-bold",children:"Details info"}),t.jsx("hr",{className:"mb-2 mt-2"}),t.jsxs("form",{action:"",className:"pe-0",children:[t.jsxs("div",{className:"row p-0",children:[t.jsx("label",{htmlFor:"staticPhone",className:"col-md-3 col-5 col-form-label greyText font14",children:"Phone :"}),t.jsxs("div",{className:"col-md-9 col-7 flex-wrap",children:[t.jsxs("div",{className:"row",children:[" ",t.jsx("input",{type:"text",readOnly:!0,className:"form-control-plaintext text-end font14",id:"staticPhone",value:N})," "]})," "]})]}),t.jsxs("div",{className:"row p-0",children:[t.jsx("label",{htmlFor:"staticAddress",className:"col-md-3 col-5 col-form-label greyText font14",children:"Address :"}),t.jsxs("div",{className:"col-md-9 col-7",children:[t.jsxs("div",{className:"row",children:[t.jsx("input",{type:"text",readOnly:!0,className:"form-control-plaintext text-end text-break font14",id:"staticAddress",value:j})," "]})," "]})]})]})]})})}),t.jsx("div",{className:"col-md-8 col-sm-12 px-md-3 p-1",children:t.jsxs("form",{className:"row mb-1 g-3",onSubmit:ot(it),children:[t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Name"}),t.jsx("input",{type:"text",className:"form-control font14 readonly-bg",id:"validationDefault02",value:g,disabled:!0})]}),t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"Email"}),t.jsx("input",{type:"text",className:"form-control font14 readonly-bg",id:"validationDefault02",value:tt,disabled:!0})]}),t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"Birthday"}),t.jsx("input",{type:"date",className:"form-control font14 readonly-bg",id:"validationDefault02",value:at,disabled:!0})]}),t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Gender"}),t.jsxs("select",{className:"form-select font14","aria-label":"Default select example",value:lt,disabled:!0,children:[t.jsx("option",{selected:!0,disabled:!0,children:"--- Choose ---"}),t.jsx("option",{value:"Male",children:"Male"}),t.jsx("option",{value:"Female",children:"Female"})]})]}),t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Phone Number"}),t.jsx("input",{id:"phoneNumber",type:"tel",className:`form-control font14 ${d.phoneNumber?"border-danger":""}`,placeholder:"Enter Student's Phone Number",...u("phoneNumber",{required:"Student's Phone Number is required *",validate:e=>/^[6-9][0-9]{3}/.test(e)?/^[0-9]*$/.test(e)?e.length<10?"Phone number must be of minimum 10 digits":e.length>10?"Phone number can be of maximum 10 digits":!0:"Invalid character in phone number. Please enter only digits":"Phone number must start with digits between 6 and 9"})}),d.phoneNumber&&t.jsx("p",{className:"font12 text-danger",children:d.phoneNumber.message})]}),t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"Address"}),t.jsx("input",{id:"studentAddress",type:"text",className:`form-control font14 ${d.studentAddress?"border-danger":""}`,placeholder:"Entes Address",...u("studentAddress",{required:"Address is required *",validate:e=>e.length<4?"Minimum Length is 4":/^[a-zA-Z0-9\s,.'-]+$/.test(e)?!0:"Address must contain only letters, digits, and spaces"})}),d.studentAddress&&t.jsx("p",{className:"font12 text-danger",children:d.studentAddress.message})]}),t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"multipartFile",className:"form-label font14",children:"Photo*"}),t.jsxs("div",{className:"d-flex bg-white",children:[o&&m?t.jsx("p",{className:"col-11 border borderRadiusleft",children:t.jsx("img",{className:"",src:o,height:34,alt:"student image"})}):t.jsx("input",{id:"multipartFile",type:"file",className:`form-control formimagetext font14 ${d.multipartFile?"border-danger":""}`,accept:".jpg, .jpeg, .png",...u("multipartFile",{required:"Student Image is required *",validate:e=>e.length>0&&(e[0].size<10240||e[0].size>204800)?"File size must be between 10 KB to 200 KB":!0})}),t.jsx("div",{className:"formcontrolButtonborder p-1 ps-3 pe-3 text-center",children:t.jsx("span",{className:"text-white font14 align-self-center",onClick:()=>b(!m),children:o!==null&&m?"Edit":"View"})})]}),d.multipartFile&&t.jsx("p",{className:"font12 text-danger",children:d.multipartFile.message})]}),t.jsx("div",{className:"col-12 text-md-start text-center",children:t.jsxs("p",{children:[t.jsx("button",{className:"btn addButtons text-white font14",type:"submit",children:"Save Changes"}),t.jsx("button",{className:"btn cancelButtons font14 ms-3",type:"button",children:"Cancel"})]})})]})})]}),t.jsx(ft,{})]})};export{St as default};
