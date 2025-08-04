import{u as L,a as W,r as m,bd as _,j as a,D as H,be as K,_ as S}from"./index-DHII64NA.js";import{u as R}from"./index.esm-ByE6_xdu.js";const U=L.div`
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
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

    .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
        border: 1px solid var(--breadCrumActiveTextColor);
        background-color: var(--breadCrumActiveTextColor)
    }

    .CancelBtnn, .CancelBtnn:active{
        border: 1px solid var(--breadCrumActiveTextColor);
    }

    .verifiedBtn{
        background-color: var(--verifiedButton);
    }
    
    .formimagetext{
        border-radius: 5px 0px 0px 5px;
    }
`,Y=()=>{const k=W(),F=sessionStorage.getItem("token"),[I,o]=m.useState(!1),[i,b]=m.useState({}),{register:d,handleSubmit:G,formState:{errors:t},setValue:l,watch:x}=R({mode:"onChange"});x("adminName"),x("adminEmail"),x("adminPhone"),x("adminAddress");const[u,$]=m.useState(""),[f,q]=m.useState(!0);m.useEffect(()=>{N()},[F]);const N=async()=>{var n,c,s,h,r,j,v,A,B,D,y,p,C,E,P,w,T,O;try{o(!0);var e=await _();console.log(e,"Admin Response "),e.status===200&&(l("adminName",(n=e==null?void 0:e.data)==null?void 0:n.name),l("adminGender",(c=e==null?void 0:e.data)==null?void 0:c.gender),l("adminAddress",(s=e==null?void 0:e.data)==null?void 0:s.address),l("adminEmail",(h=e==null?void 0:e.data)==null?void 0:h.email),l("adminPhone",(r=e==null?void 0:e.data)==null?void 0:r.phone),l("adminDesignation",(j=e==null?void 0:e.data)==null?void 0:j.designation),l("adminPhoto",(v=e==null?void 0:e.data)==null?void 0:v.image),$((A=e==null?void 0:e.data)==null?void 0:A.image),o(!1),b({adminName:(B=e==null?void 0:e.data)==null?void 0:B.name,adminEmail:(D=e==null?void 0:e.data)==null?void 0:D.email,adminPhone:(y=e==null?void 0:e.data)==null?void 0:y.phone,adminAddress:(p=e==null?void 0:e.data)==null?void 0:p.address,adminGender:(C=e==null?void 0:e.data)==null?void 0:C.gender,adminDesignation:(E=e==null?void 0:e.data)==null?void 0:E.designation}),b({adminDOB:(P=e==null?void 0:e.data)==null?void 0:P.dateOfBirth.split("T")[0]}),l("adminDOB",(w=e==null?void 0:e.data)==null?void 0:w.dateOfBirth.split("T")[0]))}catch(g){o(!1),o(!1),((O=(T=g==null?void 0:g.response)==null?void 0:T.data)==null?void 0:O.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{k("/")},200))}},M=async e=>{var c,s,h;try{const r=new FormData;r.append("adminName",(e==null?void 0:e.adminName)===null?i==null?void 0:i.adminName:e==null?void 0:e.adminName),r.append("adminGender",(e==null?void 0:e.adminGender)===null?i==null?void 0:i.adminGender:e==null?void 0:e.adminGender),r.append("adminAddress",(e==null?void 0:e.adminAddress)===null?i==null?void 0:i.adminAddress:e==null?void 0:e.adminAddress),r.append("adminEmail",(e==null?void 0:e.adminadminEmail)===null?i==null?void 0:i.adminEmail:e==null?void 0:e.adminEmail),r.append("adminPhone",(e==null?void 0:e.adminPhone)===null?i==null?void 0:i.adminPhone:e==null?void 0:e.adminPhone),r.append("adminDesignation",(e==null?void 0:e.adminDesignation)===null?i==null?void 0:i.adminDesignation:e==null?void 0:e.adminDesignation),r.append("adminDOB",(e==null?void 0:e.adminDOB)===null?i==null?void 0:i.adminDOB:e==null?void 0:e.adminDOB),r.append("adminPhoto",e==null?void 0:e.adminPhoto[0]);var n=await K(r);(n==null?void 0:n.status)===200?((c=n==null?void 0:n.data)==null?void 0:c.status)==="success"&&(S.success((s=n==null?void 0:n.data)==null?void 0:s.message),N()):S.error((h=n==null?void 0:n.data)==null?void 0:h.message)}catch{o(!1)}},[J,z]=m.useState(!1),Z=()=>{z(!0)};return a.jsxs(U,{children:[I&&a.jsx(H,{}),a.jsxs("div",{className:"container-fluid pt-4",children:[a.jsxs("div",{className:"row pb-3",children:[a.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:a.jsxs("ol",{className:"breadcrumb mb-1",children:[a.jsx("li",{className:"breadcrumb-item",children:a.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),a.jsx("li",{className:"breadcrumb-item",children:a.jsx("a",{href:"/schoolSetting",className:"bredcrumText text-decoration-none",children:"Settings"})}),a.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"My Account"})]})}),a.jsx("p",{className:"font16 ps-0 fontWeight500",children:"My Account"})]}),a.jsx("div",{className:"row pb-3",children:a.jsx("div",{className:"overflow-scroll cardradius bg-white",children:a.jsxs("div",{className:"row p-4",children:[a.jsx("div",{className:"col-md-4 col-12",children:a.jsx("div",{className:"row h-100",children:a.jsxs("div",{className:"headingBgColor cardradius2 ps-4 pe-4",children:[a.jsx("p",{className:"p-3 text-center",children:a.jsx("img",{className:"border rounded-5",src:u,alt:"Not found !!",height:100,onError:e=>e.target.src=gender==="Male"?"/images/boyImage.png":"/images/girlImage.png"})}),a.jsx("h2",{className:"text-center mb-2 activeTexttt fontWeight600",children:i.adminName}),a.jsxs("div",{className:"d-flex align-items-center justify-content-center mb-2",children:[a.jsx("h2",{className:"",children:"Admin"}),a.jsx("button",{className:"ms-2 verifiedBtn btn text-white font12 align-items-center p-1 ps-3 pe-3 cardradius2",children:"Verified"})]}),a.jsx("hr",{className:"mb-3"}),a.jsx("h2",{className:"p-0 mb-3 activeTexttt fontWeight600",children:"Details info"}),a.jsx("hr",{className:"mb-2"}),a.jsxs("form",{action:"",className:"pe-0",children:[a.jsxs("div",{className:"row p-0",children:[a.jsx("label",{htmlFor:"staticadminEmail",className:"col-3 col-form-label greyText font14",children:"Email :"}),a.jsxs("div",{className:"col-9 flex-wrap",children:[" ",a.jsx("input",{type:"text",readOnly:!0,className:"form-control-plaintext text-end font14",id:"staticadminEmail",value:i.adminEmail})," "]})]}),a.jsxs("div",{className:"row p-0",children:[a.jsx("label",{htmlFor:"staticPhone",className:"col-3 col-form-label greyText font14",children:"Phone :"}),a.jsxs("div",{className:"col-9 flex-wrap",children:[" ",a.jsx("input",{type:"text",readOnly:!0,className:"form-control-plaintext text-end font14",id:"staticPhone",value:i.adminPhone})," "]})]}),a.jsxs("div",{className:"row p-0",children:[a.jsx("label",{htmlFor:"staticAddress",className:"col-3 col-form-label greyText font14",children:"Address :"}),a.jsxs("div",{className:"col-9",children:[a.jsx("input",{type:"text",readOnly:!0,className:"form-control-plaintext text-end text-break font14",id:"staticAddress",value:i.adminAddress})," "]})]})]})]})})}),a.jsx("div",{className:"col-md-8 col-12 pt-3 pt-md-0",children:a.jsxs("form",{className:"row mb-1 g-3",onSubmit:G(M),children:[a.jsxs("div",{className:"col-12",children:[a.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Name"}),a.jsx("input",{id:"adminName",type:"text",className:`form-control font14 ${t.adminName?"border-danger":""}`,placeholder:"Enter admin Name",...d("adminName",{required:"admin Name is required *",validate:e=>/^[A-Z]/.test(e)?e.length<4?"Minimum Length is 4":/^[a-zA-Z\s'-]+$/.test(e)?!0:"Invalid Characters in admin Name":"admin Name must start with an uppercase letter"})}),t.adminName&&a.jsx("p",{className:"font12 text-danger",children:t.adminName.message})]}),a.jsxs("div",{className:"col-12",children:[a.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"adminEmail"}),a.jsx("input",{id:"adminEmail",type:"email",className:`form-control font14 ${t.adminEmail?"border-danger":""}`,placeholder:"Enter admin's adminEmail",...d("adminEmail",{required:"admin adminEmail is required *",validate:e=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e)?!0:"Not a valid adminEmail format"})}),t.adminEmail&&a.jsx("p",{className:"font12 text-danger",children:t.adminEmail.message})]}),a.jsxs("div",{className:"col-12",children:[a.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Designation"}),a.jsx("input",{id:"adminDesignation",type:"text",className:`form-control font14 ${t.adminDesignation?"border-danger":""}`,placeholder:"Enter Designation",...d("adminDesignation",{validate:e=>e?/^[a-zA-Z0-9\s]+$/.test(e)?!0:"Designation must contain only letters, digits, and spaces":!0})}),t.adminDesignation&&a.jsx("p",{className:"font12 text-danger",children:t.adminDesignation.message})]}),a.jsxs("div",{className:"col-12",children:[a.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"Birthday"}),a.jsx("input",{id:"adminDOB",type:"date",className:`form-control font14 ${t.adminDOB?"border-danger":""}`,placeholder:"Enter Date Of Birth",...d("adminDOB",{validate:e=>{if(!e)return!0}})}),t.adminDOB&&a.jsx("p",{className:"font12 text-danger",children:t.adminDOB.message})]}),a.jsxs("div",{className:"col-12",children:[a.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Gender"}),a.jsxs("select",{id:"adminGender",className:`form-select font14 ${t.adminGender?"border-danger":""}`,...d("adminGender",{required:"Gender is required *"}),children:[a.jsx("option",{value:"",children:"--- Choose ---"}),a.jsx("option",{value:"male",children:"Male"}),a.jsx("option",{value:"female",children:"Female"})]}),t.adminGender&&a.jsx("p",{className:"font12 text-danger",children:t.adminGender.message})]}),a.jsxs("div",{className:"col-12",children:[a.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Phone Number"}),a.jsx("input",{id:"adminPhone",type:"tel",className:`form-control font14 ${t.adminPhone?"border-danger":""}`,placeholder:"Enter admin's Phone Number",...d("adminPhone",{required:"admin Phone Number is required *",validate:e=>/^[6-9][0-9]{3}/.test(e)?/^[0-9]*$/.test(e)?e.length<10?"Phone number must be of minimum 10 digits":e.length>10?"Phone number can be of maximum 10 digits":!0:"Invalid character in phone number. Please enter only digits":"Phone number must start with digits between 6 and 9"})}),t.adminPhone&&a.jsx("p",{className:"font12 text-danger",children:t.adminPhone.message})]}),a.jsxs("div",{className:"col-12",children:[a.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"Address"}),a.jsx("input",{id:"adminAddress",type:"text",className:`form-control font14 ${t.adminAddress?"border-danger":""}`,placeholder:"Entes Address",...d("adminAddress",{required:"admin Address is required *",validate:e=>e.length<4?"Minimum Length is 4":/^[a-zA-Z0-9\s,.'-]+$/.test(e)?!0:"Address must contain only letters, digits, and spaces"})}),t.adminAddress&&a.jsx("p",{className:"font12 text-danger",children:t.adminAddress.message})]}),a.jsxs("div",{className:"col-12",children:[a.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Photo"}),a.jsxs("div",{className:"d-flex bg-white",children:[u!==null&&f?a.jsx("div",{style:{width:"100%",border:"1px solid #E4E7EB"},children:a.jsx("img",{src:u,alt:"Admin Image",height:30,style:{cursor:"pointer"},onClick:Z})}):a.jsx("input",{id:"adminPhoto",type:"file",className:`form-control formimagetext font14 ${t.adminPhoto?"border-danger":""}`,accept:".jpg, .jpeg, .png",...d("adminPhoto",{required:"Admin Image is required *",validate:e=>e.length>0&&(e[0].size<10240||e[0].size>204800)?"File size must be between 10 KB to 200 KB":!0})}),a.jsx("div",{className:"formcontrolButtonborder p-1 ps-3 pe-3 text-center",children:a.jsx("span",{className:"text-white font14 align-self-center",onClick:()=>q(!f),children:u!==null&&f?"Edit":"View"})})]}),t.adminPhoto&&a.jsx("p",{className:"font12 text-danger",children:t.adminPhoto.message})]}),a.jsx("div",{className:"col-12",children:a.jsxs("p",{children:[a.jsx("button",{className:"btn addButtons text-white font14",type:"submit",children:"Save Changes"}),a.jsx("button",{className:"btn cancelButtons font14 ms-3",type:"button",children:"Cancel"})]})})]})})]})})})]})]})};export{Y as default};
