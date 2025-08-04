import{u as ut,r as l,fs as xt,_ as b,j as t,D as ft,L as ht,I as bt,c as gt,ft as Nt}from"./index-DHII64NA.js";import{u as jt}from"./index.esm-ByE6_xdu.js";const vt=ut.div`
    .mainBreadCrum{
        --bs-breadcrumb-divider: none !important;
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
    
`,yt=()=>{const Z=sessionStorage.getItem("token"),s=sessionStorage.getItem("loggedInUserRole"),[i,J]=l.useState(),[u,g]=l.useState(!0),[N,Q]=l.useState(""),[X,Y]=l.useState(""),[j,tt]=l.useState(""),[v,et]=l.useState(""),[p,at]=l.useState(""),[lt,rt]=l.useState(""),[dt,ot]=l.useState(""),[st,it]=l.useState("");l.useState("");const[nt,r]=l.useState(!1);l.useEffect(()=>{S()},[Z]);const S=async()=>{var a,n,c,m,o,y,C,w,A,F,B,T,P,D,E,I,k,O,L,q,R,G,M,V,$,z,H,K,U,_,W;try{r(!0);var e=await xt();console.log(e,"profile"),(e==null?void 0:e.status)===200?((a=e==null?void 0:e.data)==null?void 0:a.status)==="success"?(r(!1),Q((c=(n=e==null?void 0:e.data)==null?void 0:n.student)==null?void 0:c.studentName),Y((o=(m=e==null?void 0:e.data)==null?void 0:m.student)==null?void 0:o.classNo),tt((C=(y=e==null?void 0:e.data)==null?void 0:y.student)==null?void 0:C.classSection),et((A=(w=e==null?void 0:e.data)==null?void 0:w.student)==null?void 0:A.studentPhone),h("phoneNumber",(B=(F=e==null?void 0:e.data)==null?void 0:F.student)==null?void 0:B.studentPhone),at((P=(T=e==null?void 0:e.data)==null?void 0:T.student)==null?void 0:P.address),h("studentAddress",(E=(D=e==null?void 0:e.data)==null?void 0:D.student)==null?void 0:E.address),rt((k=(I=e==null?void 0:e.data)==null?void 0:I.student)==null?void 0:k.studentEmail),ot((L=(O=e==null?void 0:e.data)==null?void 0:O.student)==null?void 0:L.dateOfBirth),it((R=(q=e==null?void 0:e.data)==null?void 0:q.student)==null?void 0:R.studentGender),h("multipartFile",(M=(G=e==null?void 0:e.data)==null?void 0:G.student)==null?void 0:M.multipartFile),J(($=(V=e==null?void 0:e.data)==null?void 0:V.student)==null?void 0:$.studentImage),(H=(z=e==null?void 0:e.data)==null?void 0:z.student)!=null&&H.studentImage&&g(!0)):(r(!1),b.error((K=e==null?void 0:e.data)==null?void 0:K.message)):(r(!1),console.log((U=e==null?void 0:e.data)==null?void 0:U.message))}catch(x){r(!1),console.log(x),((W=(_=x==null?void 0:x.response)==null?void 0:_.data)==null?void 0:W.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},ct=async e=>{var n,c,m;try{r(!0),console.log(u);const o=new FormData;p!==e.studentAddress&&o.append("studentAddress",e==null?void 0:e.studentAddress),v!==e.phoneNumber&&o.append("phoneNumber",e==null?void 0:e.phoneNumber),i!==e.multipartFile&&o.append("multipartFile",e==null?void 0:e.multipartFile[0]);var a=await Nt(o);console.log(a,"profile updated"),(a==null?void 0:a.status)===200?((n=a==null?void 0:a.data)==null?void 0:n.status)==="success"?(r(!1),S(),b.success(a.data.message)):(r(!1),b.error((c=a==null?void 0:a.data)==null?void 0:c.message)):(r(!1),console.log((m=a==null?void 0:a.data)==null?void 0:m.message))}catch(o){console.log("Error Facing during Get All Profile API - ",o)}},{register:f,handleSubmit:mt,formState:{errors:d},setValue:h}=jt({mode:"onChange"});return t.jsxs(vt,{className:"container-fluid p-md-4 p-3 overflow-scroll",children:[nt&&t.jsx(ft,{}),t.jsxs("div",{className:"row pb-3",children:[t.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:t.jsxs("ol",{className:"breadcrumb mb-1",children:[t.jsxs("li",{className:"breadcrumb-item",children:[t.jsx(ht,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),t.jsx(bt,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),t.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Profile"})]})}),t.jsx("p",{className:"font14 ps-0 fw-bolder",children:"My Account"})]}),t.jsxs("div",{className:"row p-md-3 p-2 gap-md-0 gap-2 bg-white borderRadius5 pb-5",children:[t.jsx("div",{className:"col-md-4 col-sm-12",children:t.jsx("div",{className:"row h-100",children:t.jsxs("div",{className:"headingBgColor borderRadius5 ps-4 pe-4",children:[t.jsx("p",{className:"p-3 text-center",children:t.jsx("img",{className:"rounded-circle",src:i,alt:"Student Profile Image",width:80,height:80})}),t.jsx("p",{className:"text-center mb-2",children:t.jsx("span",{className:"font14 text-center mb-2 activeTexttt fontWeight600",children:N})}),t.jsxs("div",{className:"d-flex align-items-center justify-content-center mb-2",children:[t.jsx("span",{className:"font14 c",children:(s==null?void 0:s.charAt(0).toUpperCase())+(s==null?void 0:s.slice(1).toLowerCase())}),t.jsx("button",{className:"ms-2 verifiedBtn btn text-white font12 align-items-center p-1 ps-3 pe-3 cardradius2",children:"Verified"})]}),t.jsx("hr",{className:"mb-2 mt-2"}),t.jsx("span",{className:"font14 p-0 greenText fw-bold",children:"Details info"}),t.jsx("hr",{className:"mb-2 mt-2"}),t.jsxs("form",{action:"",className:"pe-0",children:[t.jsxs("div",{className:"row p-0",children:[t.jsx("label",{htmlFor:"staticEmail",className:"col-md-3 col-5 col-form-label greyText font14",children:"Class :"}),t.jsx("div",{className:"col-md-9 col-7 flex-wrap",children:t.jsx("div",{className:"row",children:t.jsx("input",{type:"text",readOnly:!0,className:"form-control-plaintext text-end font14",id:"staticEmail",value:X})})})]}),t.jsxs("div",{className:"row p-0",children:[t.jsx("label",{htmlFor:"staticEmail",className:"col-md-3 col-5 col-form-label greyText font14",children:"Section :"}),t.jsxs("div",{className:"col-md-9 col-7 flex-wrap",children:[t.jsxs("div",{className:"row",children:[" ",t.jsx("input",{type:"text",readOnly:!0,className:"form-control-plaintext text-end font14",id:"staticEmail",value:j})," "]})," "]})]}),t.jsxs("div",{className:"row p-0",children:[t.jsx("label",{htmlFor:"staticPhone",className:"col-md-3 col-5 col-form-label greyText font14",children:"Phone :"}),t.jsxs("div",{className:"col-md-9 col-7 flex-wrap",children:[t.jsxs("div",{className:"row",children:[" ",t.jsx("input",{type:"text",readOnly:!0,className:"form-control-plaintext text-end font14",id:"staticPhone",value:v})," "]})," "]})]}),t.jsxs("div",{className:"row p-0",children:[t.jsx("label",{htmlFor:"staticAddress",className:"col-md-3 col-5 col-form-label greyText font14",children:"Address :"}),t.jsxs("div",{className:"col-md-9 col-7",children:[t.jsxs("div",{className:"row",children:[t.jsx("input",{type:"text",readOnly:!0,className:"form-control-plaintext text-end text-break font14",id:"staticAddress",value:p})," "]})," "]})]})]})]})})}),t.jsx("div",{className:"col-md-8 col-sm-12 px-md-3 p-1",children:t.jsxs("form",{className:"row mb-1 g-3",onSubmit:mt(ct),children:[t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Name"}),t.jsx("input",{type:"text",className:"form-control font14 readonly-bg",id:"validationDefault02",value:N,disabled:!0})]}),t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"Email"}),t.jsx("input",{type:"text",className:"form-control font14 readonly-bg",id:"validationDefault02",value:lt,disabled:!0})]}),t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Class & Section"}),t.jsx("input",{type:"text",className:"form-control font14 readonly-bg",id:"validationDefault02",value:j,disabled:!0})]}),t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"Birthday"}),t.jsx("input",{type:"date",className:"form-control font14 readonly-bg",id:"validationDefault02",value:dt,disabled:!0})]}),t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Gender"}),t.jsxs("select",{className:"form-select font14","aria-label":"Default select example",value:st,disabled:!0,children:[t.jsx("option",{selected:!0,disabled:!0,children:"--- Choose ---"}),t.jsx("option",{value:"Male",children:"Male"}),t.jsx("option",{value:"Female",children:"Female"})]})]}),t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"validationDefault01",className:"form-label font14",children:"Phone Number"}),t.jsx("input",{id:"phoneNumber",type:"tel",className:`form-control font14 ${d.phoneNumber?"border-danger":""}`,placeholder:"Enter Student's Phone Number",...f("phoneNumber",{required:"Student's Phone Number is required *",validate:e=>/^[6-9][0-9]{3}/.test(e)?/^[0-9]*$/.test(e)?e.length<10?"Phone number must be of minimum 10 digits":e.length>10?"Phone number can be of maximum 10 digits":!0:"Invalid character in phone number. Please enter only digits":"Phone number must start with digits between 6 and 9"})}),d.phoneNumber&&t.jsx("p",{className:"font12 text-danger",children:d.phoneNumber.message})]}),t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"Address"}),t.jsx("input",{id:"studentAddress",type:"text",className:`form-control font14 ${d.studentAddress?"border-danger":""}`,placeholder:"Entes Address",...f("studentAddress",{required:"Address is required *",validate:e=>e.length<4?"Minimum Length is 4":/^[a-zA-Z0-9\s,.'-]+$/.test(e)?!0:"Address must contain only letters, digits, and spaces"})}),d.studentAddress&&t.jsx("p",{className:"font12 text-danger",children:d.studentAddress.message})]}),t.jsxs("div",{className:"col-12",children:[t.jsx("label",{htmlFor:"multipartFile",className:"form-label font14",children:"Photo*"}),t.jsxs("div",{className:"d-flex bg-white",children:[i&&u?t.jsx("p",{className:"col-10 border borderRadiusleft",children:t.jsx("img",{className:"",src:i,height:34,alt:"student image"})}):t.jsx("input",{id:"multipartFile",type:"file",className:`form-control col-10 formimagetext font14 ${d.multipartFile?"border-danger":""}`,accept:".jpg, .jpeg, .png",...f("multipartFile",{required:"Student Image is required *",validate:e=>e.length>0&&(e[0].size<10240||e[0].size>204800)?"File size must be between 10 KB to 200 KB":!0})}),t.jsx("div",{className:"formcontrolButtonborder p-1 ps-3 pe-3 text-center",children:t.jsx("span",{className:"text-white font14 align-self-center col-2",onClick:()=>g(!u),children:i!==null&&u?"Edit":"View"})})]}),d.multipartFile&&t.jsx("p",{className:"font12 text-danger",children:d.multipartFile.message})]}),t.jsx("div",{className:"col-12 text-md-start text-center",children:t.jsxs("p",{children:[t.jsx("button",{className:"btn addButtons text-white font14",type:"submit",children:"Save Changes"}),t.jsx("button",{className:"btn cancelButtons font14 ms-3",type:"button",children:"Cancel"})]})})]})})]}),t.jsx(gt,{})]})};export{yt as default};
