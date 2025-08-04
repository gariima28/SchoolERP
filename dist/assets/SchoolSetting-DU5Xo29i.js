import{u as q,a as V,r as d,b4 as M,_ as p,j as e,D as U,L as H,b5 as W}from"./index-DHII64NA.js";import{u as _}from"./index.esm-ByE6_xdu.js";const K=q.div`
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }
/* 
    .form-control::placeholder{
        text-decoration
    } */

    .form-control, .form-select{
        border-radius: 5px;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .formimagetext{
        border-radius: 5px 0px 0px 5px;
    }
    
    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .eventablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
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
    
`,G=()=>{const b=V(),w=sessionStorage.getItem("token"),[S,h]=d.useState(!1),{register:c,handleSubmit:C,formState:{errors:r},setValue:A,watch:N,getValues:T}=_({mode:"onChange"}),[u,F]=d.useState(""),[f,E]=d.useState(!0),[x,P]=d.useState({}),[y,j]=d.useState(!1);d.useEffect(()=>{const o=N((a,{name:m})=>{i()});return()=>o.unsubscribe()},[N,x]),d.useEffect(()=>{k()},[w]);const k=async()=>{var o,a,m,t,n;try{h(!0);const l=await M();if((l==null?void 0:l.status)===200&&((o=l==null?void 0:l.data)==null?void 0:o.status)==="success"){const s=(a=l==null?void 0:l.data)==null?void 0:a.school,g={schoolName:(s==null?void 0:s.schoolName)||"",schoolPhone:(s==null?void 0:s.schoolPhone)||"",schoolAddress:(s==null?void 0:s.schoolAddress)||"",schoolInfo:(s==null?void 0:s.description)||"",email:(s==null?void 0:s.schoolEmail)||"",warningText:(s==null?void 0:s.warningText)||"",socialLink1:(s==null?void 0:s.socialLink1)||"",socialLink2:(s==null?void 0:s.socialLink2)||"",socialLink3:(s==null?void 0:s.socialLink3)||"",schoolLogo:(s==null?void 0:s.schoolPhoto)||""};F((s==null?void 0:s.schoolPhoto)||""),P(g),Object.keys(g).forEach(L=>{A(L,g[L],{shouldDirty:!1})}),h(!1)}else p.error((m=l==null?void 0:l.data)==null?void 0:m.message)}catch(l){h(!1),console.error(l),((n=(t=l==null?void 0:l.response)==null?void 0:t.data)==null?void 0:n.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>b("/"),200))}},i=()=>{var m;const o=T();let a=!1;for(const t in x)if(t!=="schoolLogo"&&o[t]!==x[t]){a=!0;break}a||((m=o.schoolLogo)!=null&&m[0]||o.schoolLogo!==x.schoolLogo)&&(a=!0),j(a)},I=async o=>{var a,m;h(!0);try{const t=new FormData;t.append("schoolPrefix",""),t.append("schoolName",o==null?void 0:o.schoolName),t.append("schoolAddress",o==null?void 0:o.schoolAddress),t.append("schoolPhone",o==null?void 0:o.schoolPhone),t.append("email",o==null?void 0:o.email),t.append("schoolInfo",o==null?void 0:o.schoolInfo),t.append("socialLink1",o==null?void 0:o.socialLink1),t.append("socialLink2",o==null?void 0:o.socialLink2),t.append("socialLink3",o==null?void 0:o.socialLink3),t.append("warningText",o==null?void 0:o.warningText),(a=o==null?void 0:o.schoolLogo)!=null&&a[0]&&t.append("schoolLogo",o==null?void 0:o.schoolLogo[0]);const n=await W(t);(n==null?void 0:n.status)===200?n.data.status==="success"&&(p.success((m=n==null?void 0:n.data)==null?void 0:m.message),setTimeout(()=>{b("/")},1e3),h(!1),j(!1),k()):(p.error(n==null?void 0:n.error),h(!1))}catch(t){h(!1),console.error("Error during update:",t)}},[$,v]=d.useState(!1),z=()=>{v(!0)},Z=()=>{v(!1)};return e.jsxs(e.Fragment,{children:[e.jsxs(K,{children:[S&&e.jsx(U,{}),e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"row p-2 pt-4",children:[e.jsxs("div",{className:"row pb-3",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/schoolSetting",className:"bredcrumText text-decoration-none",children:"Settings"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"School Settings"})]})}),e.jsx("p",{className:"font16 ps-0 fontWeight500",children:"School Settings"})]}),e.jsx("div",{className:"row pb-3",children:e.jsx("div",{className:"overflow-scroll cardradius bg-white p-3",children:e.jsxs("form",{className:"row",onSubmit:C(I),children:[e.jsxs("div",{className:"col-md-6 col-sm-12 mb-3",children:[e.jsx("label",{htmlFor:"exampleFormControlInput1",className:"form-label font14",children:"School Name"}),e.jsx("input",{id:"schoolName",onChange:i,type:"text",className:`form-control font14 ${r.schoolName?"border-danger":""}`,placeholder:"Enter School Name",...c("schoolName",{required:"School Name is required *",validate:o=>/^[A-Z]/.test(o)?o.length<4?"Minimum Length is 4":/^[a-zA-Z\s'-]+$/.test(o)?!0:"Invalid Characters in School Name":"School Name must start with an uppercase letter"})}),r.schoolName&&e.jsx("p",{className:"font12 text-danger",children:r.schoolName.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 mb-3",children:[e.jsx("label",{htmlFor:"exampleFormControlInput1",className:"form-label font14",children:"School Phone"}),e.jsx("input",{id:"schoolPhone",onChange:i,type:"tel",className:`form-control font14 ${r.schoolPhone?"border-danger":""}`,placeholder:"Enter School's Phone Number",...c("schoolPhone",{required:"School Phone Number is required *",validate:o=>/^[6-9][0-9]{3}/.test(o)?/^[0-9]*$/.test(o)?o.length<10?"Phone number must be of minimum 10 digits":o.length>10?"Phone number can be of maximum 10 digits":!0:"Invalid character in phone number. Please enter only digits":"Phone number must start with digits between 6 and 9"})}),r.schoolPhone&&e.jsx("p",{className:"font12 text-danger",children:r.schoolPhone.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 mb-3",children:[e.jsx("label",{htmlFor:"exampleFormControlInput1",className:"form-label font14",children:"Address"}),e.jsx("input",{id:"schoolAddress",onChange:i,type:"text",className:`form-control font14 ${r.schoolAddress?"border-danger":""}`,placeholder:"Entes Address",...c("schoolAddress",{required:"School Address is required *",validate:o=>o.length<4?"Minimum Length is 4":/^[a-zA-Z0-9\s,.'-]+$/.test(o)?!0:"Address must contain only letters, digits, and spaces"})}),r.schoolAddress&&e.jsx("p",{className:"font12 text-danger",children:r.schoolAddress.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 mb-3",children:[e.jsx("label",{htmlFor:"exampleFormControlInput1",className:"form-label font14",children:"School Information"}),e.jsx("input",{id:"schoolInfo",onChange:i,type:"text",className:`form-control font14 ${r.schoolInfo?"border-danger":""}`,placeholder:"Entes School Info",...c("schoolInfo",{validate:o=>o?/^[a-zA-Z0-9\s,.'-]+$/.test(o)?!0:"School Info must contain only letters, digits, and spaces":!0})}),r.schoolInfo&&e.jsx("p",{className:"font12 text-danger",children:r.schoolInfo.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 mb-3",children:[e.jsx("label",{htmlFor:"exampleFormControlInput1",className:"form-label font14",children:"Email Receipt Title"}),e.jsx("input",{id:"email",onChange:i,type:"email",className:`form-control font14 ${r.email?"border-danger":""}`,placeholder:"Enter School's Email",...c("email",{required:"School Email is required *",validate:o=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(o)?!0:"Not a valid email format"})}),r.email&&e.jsx("p",{className:"font12 text-danger",children:r.email.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 mb-3",children:[e.jsx("label",{htmlFor:"exampleFormControlInput1",className:"form-label font14",children:"Social Link 1"}),e.jsx("input",{id:"socialLink1",onChange:i,type:"text",className:`form-control font14 ${r.socialLink1?"border-danger":""}`,placeholder:"Enter Social Link",...c("socialLink1",{validate:o=>o?/^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/.test(o)?!0:"Not a valid social link format":!0})}),r.socialLink1&&e.jsx("p",{className:"font12 text-danger",children:r.socialLink1.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 mb-3",children:[e.jsx("label",{htmlFor:"warningText",className:"form-label font14",children:"Warning Text"}),e.jsx("input",{id:"warningText",onChange:i,type:"text",className:`form-control font14 ${r.warningText?"border-danger":""}`,placeholder:"Entes Warning Text",...c("warningText",{validate:o=>o?/^[a-zA-Z0-9\s,.'-]+$/.test(o)?!0:"Address must contain only letters, digits, and spaces":!0})}),r.warningText&&e.jsx("p",{className:"font12 text-danger",children:r.warningText.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 mb-3",children:[e.jsx("label",{htmlFor:"exampleFormControlInput1",className:"form-label font14",children:"Social Link 2"}),e.jsx("input",{id:"socialLink2",onChange:i,type:"text",className:`form-control font14 ${r.socialLink2?"border-danger":""}`,placeholder:"Enter Social Link",...c("socialLink2",{validate:o=>o?/^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/.test(o)?!0:"Not a valid social link format":!0})}),r.socialLink2&&e.jsx("p",{className:"font12 text-danger",children:r.socialLink2.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 mb-3",children:[e.jsx("label",{htmlFor:"exampleFormControlInput1",className:"form-label font14",children:"Social Link 3"}),e.jsx("input",{id:"socialLink3",onChange:i,type:"text",className:`form-control font14 ${r.socialLink3?"border-danger":""}`,placeholder:"Enter Social Link",...c("socialLink3",{validate:o=>o?/^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/.test(o)?!0:"Not a valid social link format":!0})}),r.socialLink3&&e.jsx("p",{className:"font12 text-danger",children:r.socialLink3.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 mb-3",children:[e.jsx("label",{htmlFor:"exampleFormControlInput1",className:"form-label font14",children:"Update Logo"}),e.jsxs("div",{className:"d-flex bg-white",children:[u!==null&&f?e.jsx("div",{style:{width:"100%",border:"1px solid #E4E7EB"},children:e.jsx("img",{src:u,alt:"School Logo",height:33,width:100,style:{cursor:"pointer"},onClick:z})}):e.jsx("input",{id:"schoolLogo",onChange:i,type:"file",className:`form-control formimagetext font14 ${r.schoolLogo?"border-danger":""}`,accept:".jpg, .jpeg, .png",...c("schoolLogo",{required:"Student Image is required *",validate:o=>o.length>0&&(o[0].size<10240||o[0].size>204800)?"File size must be between 10 KB to 200 KB":!0})}),e.jsx("div",{className:"formcontrolButtonborder p-1 ps-3 pe-3 text-center",children:e.jsx("span",{className:"text-white font14 align-self-center",onClick:()=>E(!f),children:u!==null&&f?"Edit":"View"})})]}),r.schoolLogo&&e.jsx("p",{className:"font12 text-danger",children:r.schoolLogo.message})]}),e.jsxs("div",{className:"row p-3",children:[e.jsx("div",{className:"col-md-6 col-sm-6 col-6 text-end",children:e.jsx("button",{className:"btn addCategoryButtons font16 text-white",type:"submit",disabled:!y,children:"Update Settings"})}),e.jsx("div",{className:"col-md-6 col-sm-6 col-6 text-start",children:e.jsx(H,{className:"btn cancelButtons font16",to:"/",children:"Cancel"})})]})]})})})]})})]}),$&&e.jsx("div",{className:"modal fade show d-block",tabIndex:"-1",style:{background:"rgba(0,0,0,0.5)"},children:e.jsx("div",{className:"modal-dialog modal-dialog-centered",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("h5",{className:"modal-title",children:"Logo Preview"}),e.jsx("button",{type:"button",className:"btn-close",onClick:Z})]}),e.jsx("div",{className:"modal-body text-center",children:e.jsx("img",{src:u,alt:"Preview",className:"img-fluid",style:{maxHeight:"70vh"}})})]})})})]})};export{G as default};
