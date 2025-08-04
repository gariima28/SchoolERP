import{u as N,a as j,r as p,j as e,D as A,L as C,c as D,ai as E,_ as l}from"./index-DHII64NA.js";import{u as w}from"./index.esm-ByE6_xdu.js";const I=N.div`
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

    .form-control::placeholder, .form-control , .form-select{
        color: var(--greyState)
    }

    .form-control , .form-select{
        border-radius: 5px ;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
        border: 1px solid var(--breadCrumActiveTextColor);
        background-color: var(--breadCrumActiveTextColor)
    }

    .CancelBtnn, .CancelBtnn:active{
        border: 1px solid var(--greyState);
    }
`,q=()=>{const n=j(),[x,d]=p.useState(!1),{register:i,handleSubmit:f,formState:{errors:a},setValue:b}=w({mode:"onChange"}),g=async r=>{var o,m,c,u,h,v;try{const s=new FormData;s.append("driverName",r.driverName),s.append("driverEmail",r.driverEmail),s.append("gender",r.gender),s.append("driverAddress",r.driverAddress),s.append("phoneNo",r.phoneNo),s.append("driverImage",r.driverImage[0]);var t=await E(s);(t==null?void 0:t.status)===200?((o=t==null?void 0:t.data)==null?void 0:o.status)==="success"?(d(!1),l.success((m=t==null?void 0:t.data)==null?void 0:m.message),setTimeout(()=>{n("/admin/transport/drivers")},1500)):(l.error((c=t==null?void 0:t.data)==null?void 0:c.message,"else 1"),d(!1)):(l.error((u=t==null?void 0:t.data)==null?void 0:u.message,"else 2"),d(!1))}catch(s){l.error(s),d(!1),((v=(h=s==null?void 0:s.response)==null?void 0:h.data)==null?void 0:v.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{n("/")},200))}};return e.jsx(e.Fragment,{children:e.jsxs(I,{children:[x&&e.jsx(A,{}),e.jsxs("div",{className:"container-fluid",children:[e.jsxs("div",{className:"row p-4",children:[e.jsxs("div",{className:"row pb-3",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/admin/users/teacher/21",className:"bredcrumText text-decoration-none",children:"Users"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/admin/users/drivers/26",className:"bredcrumText text-decoration-none",children:"Driver"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Add Driver"})]})}),e.jsx("p",{className:"font16 ps-0 fontWeight500",children:"Add Driver Form"})]}),e.jsx("div",{className:"row pb-3",children:e.jsx("div",{className:"bg-white rounded-2 p-4",children:e.jsxs("form",{className:"row g-3",onSubmit:f(g),children:[e.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[e.jsx("label",{htmlFor:"driverName",className:"form-label font14",children:"Name*"}),e.jsx("input",{id:"driverName",type:"text",className:`form-control font14 ${a.driverName?"border-danger":""}`,placeholder:"Enter Driver Name",...i("driverName",{required:"Driver Name is required *",validate:r=>/^[A-Z]/.test(r)?r.length<4?"Minimum Length is 4":/^[a-zA-Z\s'-]+$/.test(r)?!0:"Invalid Characters in Driver Name":"Driver Name must start with an uppercase letter"})}),a.driverName&&e.jsx("p",{className:"font12 text-danger",children:a.driverName.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[e.jsx("label",{htmlFor:"driverEmail",className:"form-label font14",children:"Email*"}),e.jsx("input",{id:"driverEmail",type:"email",className:`form-control font14 ${a.driverEmail?"border-danger":""}`,placeholder:"Enter Driver's Email",...i("driverEmail",{required:"Driver's Email is required *",validate:r=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(r)?!0:"Not a valid email format"})}),a.driverEmail&&e.jsx("p",{className:"font12 text-danger",children:a.driverEmail.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[e.jsx("label",{htmlFor:"driverAddress",className:"form-label font14",children:"Address*"}),e.jsx("input",{id:"driverAddress",type:"text",className:`form-control font14 ${a.driverAddress?"border-danger":""}`,placeholder:"Entes Address",...i("driverAddress",{required:"Address is required *",validate:r=>r.length<4?"Minimum Length is 4":/^[a-zA-Z0-9\s,.'-]+$/.test(r)?!0:"Address must contain only letters, digits, and spaces"})}),a.driverAddress&&e.jsx("p",{className:"font12 text-danger",children:a.driverAddress.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[e.jsx("label",{htmlFor:"phoneNo",className:"form-label font14",children:"Phone*"}),e.jsx("input",{id:"phoneNo",type:"tel",className:`form-control font14 ${a.phoneNo?"border-danger":""}`,placeholder:"Enter Driver's Phone Number",...i("phoneNo",{required:"Driver's Phone Number is required *",validate:r=>/^[6-9][0-9]{3}/.test(r)?/^[0-9]*$/.test(r)?r.length<10?"Phone number must be of minimum 10 digits":r.length>10?"Phone number can be of maximum 10 digits":!0:"Invalid character in phone number. Please enter only digits":"Phone number must start with digits between 6 and 9"})}),a.phoneNo&&e.jsx("p",{className:"font12 text-danger",children:a.phoneNo.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[e.jsx("label",{htmlFor:"gender",className:"form-label font14",children:"Gender*"}),e.jsxs("select",{id:"gender",className:`form-select font14 ${a.gender?"border-danger":""}`,...i("gender",{required:"Gender is required *"}),children:[e.jsx("option",{value:"",children:"--- Choose ---"}),e.jsx("option",{value:"Male",children:"Male"}),e.jsx("option",{value:"Female",children:"Female"})]}),a.gender&&e.jsx("p",{className:"font12 text-danger",children:a.gender.message})]}),e.jsxs("div",{className:"col-md-6 col-sm-12 col-12",children:[e.jsx("label",{htmlFor:"driverImage",className:"form-label font14",children:"Photo*"}),e.jsx("input",{id:"driverImage",type:"file",className:`form-control font14 ${a.driverImage?"border-danger":""}`,accept:".jpg, .jpeg, .png",onChange:r=>{const t=r.target.files;b("driverImage",t[0])},...i("driverImage",{required:"Driver Image is required *",validate:r=>r.length>0&&(r[0].size<10240||r[0].size>204800)?"File size must be between 10 KB to 200 KB":!0})}),a.driverImage&&e.jsx("p",{className:"font12 text-danger",children:a.driverImage.message})]}),e.jsxs("div",{className:"row p-5",children:[e.jsx("div",{className:"col-md-6 col-sm-6 col-6 text-end",children:e.jsx("button",{className:"btn AddBtnn font14 text-white",type:"submit",children:"Add Driver"})}),e.jsx("div",{className:"col-md-6 col-sm-6 col-6 text-start",children:e.jsx(C,{className:"btn CancelBtnn font14",to:"/admin/users/drivers/26",children:"Cancel"})})]})]})})})]}),e.jsx(D,{})]})]})})};export{q as default};
