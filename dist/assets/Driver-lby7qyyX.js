import{u as ye,r as s,as as we,at as De,ak as Ce,_ as m,au as Be,j as e,D as L,I as D,L as k,R as Ie,av as Ee,aw as ke}from"./index-DHII64NA.js";import{C as Ae}from"./index-DwwEihQh.js";import{u as Se}from"./index.esm-ByE6_xdu.js";import"./Link-B_f3HVnI.js";import"./index-BKNjMPK8.js";const Pe=ye.div`

    .formImageInput{
        border-radius: 5px 0px 0px 5px;
    }

    .editViewBtn, .editViewBtn:active, .editViewBtn:hover{
        border-radius: 0px 5px 5px 0px;
        background-color: var(--greenTextColor);
        color: #fff;
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

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

    .oddModaltablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
        border-bottom: 1.5px solid var(--darkGreenBorderColor);
    }
    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
    }

    .formEditSpecFeatcheck:checked{
        background-color: #00A67E;
        border-color: #00A67E;
    }

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .deleteSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }
    
    .warningHeading{
        font-size: var(--font-size-20);
    }

    .warningText{
        font-size: var(--font-size-15);
        line-height: 22px;
        color: var(--greyInputTextColor) !important;
    }

    .textVerticalCenter{
        line-height: 22px;
    }
    
    .form-check-input{
        width: 18px;
        height: 18px;
    }

    .formcontrolinput{
        border-radius: 0px !important;
    }

    .contbtn{
        margin-left: 43% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

`,Te=(N,j)=>{const d=atob(N),o=[];for(let h=0;h<d.length;h+=512){const x=d.slice(h,h+512),y=new Array(x.length);for(let g=0;g<x.length;g++)y[g]=x.charCodeAt(g);const C=new Uint8Array(y);o.push(C)}return new Blob(o,{type:j})},We=()=>{const N=sessionStorage.getItem("token"),[j,d]=s.useState(!1),[o,A]=s.useState([]),[h,x]=s.useState(""),[y,C]=s.useState([]),[g,z]=s.useState(),[q,R]=s.useState(""),[Fe,$]=s.useState(""),[G,Ve]=s.useState(!1),[_,W]=s.useState(1),[S,K]=s.useState(1),[P,M]=s.useState(1),[U,Le]=s.useState(10),[Z,H]=s.useState(),[O,J]=s.useState(),[Q,X]=s.useState(),[Y,ee]=s.useState(),[te,re]=s.useState(),[ae,se]=s.useState(),[B,ie]=s.useState(""),[ze,de]=s.useState(""),[I,le]=s.useState({}),[ne,oe]=s.useState(!1),[E,ce]=s.useState(!0),{register:u,handleSubmit:me,formState:{errors:l},setValue:f,watch:he}=Se({mode:"onChange"}),T=he();s.useEffect(()=>{const t=Object.keys(I).some(r=>I[r]!==T[r]);oe(t)},[T,I]),s.useEffect(()=>{v(),je(),N&&(ge(),ue())},[N,P,G]);const xe=t=>{M(t.selected+1)},ge=async()=>{var t;try{const r=await we();if((r==null?void 0:r.status)===200){const i=(t=r==null?void 0:r.data)==null?void 0:t.split(`
`).map(n=>n.split(","));C(i)}}catch{}},ue=async()=>{var t;try{const r=await De();(r==null?void 0:r.status)===200&&((t=r==null?void 0:r.data)==null?void 0:t.status)==="success"&&z(r==null?void 0:r.data)}catch{}},fe=()=>{const{pdf:t}=g,r=Te(t,"application/pdf"),i=document.createElement("a");i.href=URL.createObjectURL(r),i.download="driver.pdf",i.click()},v=async()=>{var r,i,n,c,a,b,p,V;try{d(!0);var t=await Ce(h,P,U);(t==null?void 0:t.status)===200?((r=t==null?void 0:t.data)==null?void 0:r.status)==="success"?(d(!1),A((i=t==null?void 0:t.data)==null?void 0:i.drivers),K((n=t==null?void 0:t.data)==null?void 0:n.totalPages),W((c=t==null?void 0:t.data)==null?void 0:c.currentPage)):(d(!1),m.error((a=t==null?void 0:t.data)==null?void 0:a.message)):(d(!1),m.error((b=t==null?void 0:t.data)==null?void 0:b.message))}catch(w){d(!1),d(!1),console.error("Error during fetching driver:",w),((V=(p=w==null?void 0:w.response)==null?void 0:p.data)==null?void 0:V.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},ve=async t=>{var i,n,c;try{R(t);var r=await Ee(t);if((r==null?void 0:r.status)===200)if(((i=r==null?void 0:r.data)==null?void 0:i.status)==="success"){const a=r.data.driver;f("driverName",a.driverName),f("driverEmail",a.driverEmail),f("driverAddress",a.driverAddress),f("phoneNo",a.phoneNumber),f("gender",a.gender),f("driverImage",a.driverImage),le({driverName:a.driverName,driverEmail:a.driverEmail,driverAddress:a.driverAddress,phoneNo:a.phoneNumber,gender:a.gender,driverImage:a.driverImage}),H(a.driverName),J(a.driverAddress),X(a.phoneNumber),ee(a.driverEmail),re(a.gender),se(a.driverImage),ie(a.driverImage)}else d(!1),m.error((n=r==null?void 0:r.data)==null?void 0:n.message);else d(!1),m.error((c=r==null?void 0:r.data)==null?void 0:c.message)}catch(a){d(!1),d(!1),console.error("Error during login:",a)}},be=async t=>{var i,n,c;d(!0);try{const a=new FormData;Z!==t.driverName&&a.append("driverName",t.driverName),Y!==t.driverEmail&&a.append("driverEmail",t.driverEmail),O!==t.driverAddress&&a.append("driverAddress",t.driverAddress),Q!==t.phoneNo&&a.append("phoneNo",t.phoneNo),te!==t.gender&&a.append("gender",t.gender),ae!==t.driverImage&&a.append("driverImage",t.driverImage);var r=await ke(q,a);if((r==null?void 0:r.status)===200)if(r.data.status==="success"){d(!1),m.success((i=r==null?void 0:r.data)==null?void 0:i.message),v();const b=document.getElementById("Edit_staticBackdrop");if(b){let p=bootstrap.Offcanvas.getInstance(b);p||(p=new bootstrap.Offcanvas(b)),p.hide()}}else d(!1),m.error((n=r==null?void 0:r.data)==null?void 0:n.message);else d(!1),m.error((c=r==null?void 0:r.data)==null?void 0:c.message)}catch(a){d(!1),d(!1),console.error("Error during login:",a)}},[pe,F]=s.useState(!0),Ne=t=>{t.key==="Backspace"&&setTimeout(()=>{const r=t.target.value.trim();if(r===""&&pe){v(),F(!1);return}r!==""&&(v(),F(!0)),x(r)},200)},je=async()=>{var t,r;setLoader(!0);try{const i=await Be(id);console.log(i,"Resone for roles"),(i==null?void 0:i.status)===200&&(de((r=(t=i==null?void 0:i.data)==null?void 0:t.roles)==null?void 0:r.roleName),setLoader(!1))}catch{setLoader(!1)}};return e.jsx(e.Fragment,{children:e.jsxs(Pe,{children:[j&&e.jsx(L,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[e.jsxs("div",{className:"col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/admin/users/teacher/21",className:"bredcrumText text-decoration-none",children:"Users"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Driver"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Driver List"})]}),e.jsx("div",{className:"col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0",children:e.jsxs("div",{className:"row gap-sm-0 gap-3",children:[e.jsx("div",{className:"col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12 text-end",children:o.length>0&&e.jsxs("div",{className:"row",children:[e.jsx("div",{className:"col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center",children:e.jsx(Ae,{className:"btn ps-2 pe-2 ExportBtns bg-white",type:"submit",data:y,filename:"DriverData.csv",children:e.jsxs("span",{className:"font14 textVerticalCenter",children:[e.jsx(D,{icon:"fa-solid:file-csv",width:"1.4em",height:"1.4em",style:{color:"#008479"}}),e.jsx("span",{className:"ms-1",children:"Export to CSV"})]})})}),e.jsx("div",{className:"col-lg-6 col-sm-6 col-4 text-md-center text-sm-end text-start ps-0 align-self-center",children:e.jsx(k,{className:"btn ps-2 pe-2 ExportBtns bg-white",type:"button",onClick:fe,children:e.jsxs("span",{className:"font14 textVerticalCenter",children:[e.jsx(D,{icon:"fluent:document-pdf-24-filled",width:"1.4em",height:"1.4em",style:{color:"#008479"}}),e.jsx("span",{className:"ms-1",children:"Export to PDF"})]})})})]})}),e.jsx("div",{className:"col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12 text-end align-self-center",children:e.jsxs("div",{className:"row gap-md-0 gap-sm-3",children:[e.jsx("div",{className:"col-md-8 col-sm-12 col-8 text-sm-end text-start ps-0",children:e.jsxs("div",{className:"d-flex",children:[e.jsx("input",{className:"form-control formcontrolsearch font14",disabled:!(o.length>0),type:"text",placeholder:"Search",onChange:t=>x(t.target.value),onKeyDown:Ne}),e.jsx("button",{className:"btn searchhhButtons text-white font14",disabled:!(o.length>0),type:"button",onClick:v,children:e.jsx("h2",{children:"Search"})})]})}),e.jsx("div",{className:"col-md-4 col-sm-12 col-4 text-sm-end text-start",children:e.jsx(k,{className:"btn ps-0 pe-0 addButtons text-white",type:"submit",to:"/admin/users/driver/addDriver",children:e.jsx("span",{className:"font14 textVerticalCenter",children:"+ ADD Driver"})})})]})})]})})]}),e.jsx("div",{className:"row pb-3 pe-0",children:e.jsx("div",{className:" cardradius bg-white p-3",children:o.length>0?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-scroll",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:e.jsx("h2",{children:"#"})}),e.jsx("th",{children:e.jsx("h2",{children:"Name"})}),e.jsx("th",{children:e.jsx("h2",{children:"Address"})}),e.jsx("th",{children:e.jsx("h2",{children:"Phone"})}),e.jsx("th",{children:e.jsx("h2",{children:"Email"})}),e.jsx("th",{className:"text-end",children:e.jsx("h2",{children:"Action"})})]})}),e.jsx("tbody",{children:o.map((t,r)=>e.jsxs("tr",{className:"my-bg-color align-middle",children:[e.jsx("th",{className:"textWrapClass greyText",children:e.jsx("h3",{children:r+1})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:t.driverName})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:t.driverAddress})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:t.phoneNumber})}),e.jsx("td",{className:"textWrapClass greyText",children:e.jsx("h3",{children:t.driverEmail})}),e.jsx("td",{className:"textWrapClass text-end",children:e.jsxs("div",{className:"dropdown dropdownbtn",children:[e.jsx("button",{className:"btn btn-sm actionButtons dropdown-toggle",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false",children:e.jsx("span",{children:"Action"})}),e.jsxs("ul",{className:"dropdown-menu",children:[e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Edit_staticBackdrop","aria-controls":"Edit_staticBackdrop",onClick:()=>ve(t.driverId),children:"Edit"})}),e.jsx("li",{children:e.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Delete_staticBackdrop","aria-controls":"Delete_staticBackdrop",onClick:()=>$(t.driverId),children:"Delete"})})]})]})})]},t.id))})]})}),e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",_," of ",S," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(Ie,{previousLabel:e.jsx(D,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(D,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:S,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:xe,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})})})]}),e.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Edit_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[e.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-2",children:[e.jsx(k,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:v,children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:e.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),e.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Driver Edit"})]}),e.jsxs("div",{className:"offcanvas-body p-0",children:[j&&e.jsx(L,{}),e.jsx("div",{className:"container-fluid p-3",style:{zIndex:-1},children:e.jsx("div",{className:"row",children:e.jsxs("form",{onSubmit:me(be),children:[e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"driverName",className:"form-label greyText font14",children:"Driver Name"}),e.jsx("input",{id:"driverName",type:"text",className:`form-control font14 ${l.driverName?"border-danger":""}`,placeholder:"Enter Driver Name",...u("driverName",{required:"Driver Name is required *",validate:t=>/^[A-Z]/.test(t)?t.length<4?"Minimum Length is 4":/^[a-zA-Z\s'-]+$/.test(t)?!0:"Invalid Characters in Driver Name":"Driver Name must start with an uppercase letter"})}),l.driverName&&e.jsx("p",{className:"font12 text-danger",children:l.driverName.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"driverEmail",className:"form-label greyText font14",children:"Driver Email"}),e.jsx("input",{id:"driverEmail",type:"email",className:`form-control font14 ${l.driverEmail?"border-danger":""}`,placeholder:"Enter Driver's Email",...u("driverEmail",{required:"Driver's Email is required *",validate:t=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(t)?!0:"Not a valid email format"})}),l.driverEmail&&e.jsx("p",{className:"font12 text-danger",children:l.driverEmail.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"driverAddress",className:"form-label greyText font14",children:"Driver Address"}),e.jsx("input",{id:"driverAddress",type:"text",className:`form-control font14 ${l.driverAddress?"border-danger":""}`,placeholder:"Entes Address",...u("driverAddress",{required:"Address is required *",validate:t=>t.length<4?"Minimum Length is 4":/^[a-zA-Z0-9\s,.'-]+$/.test(t)?!0:"Address must contain only letters, digits, and spaces"})}),l.driverAddress&&e.jsx("p",{className:"font12 text-danger",children:l.driverAddress.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"phoneNo",className:"form-label greyText font14",children:"Phone Number"}),e.jsx("input",{id:"phoneNo",type:"tel",className:`form-control font14 ${l.phoneNo?"border-danger":""}`,placeholder:"Enter Driver's Phone Number",...u("phoneNo",{required:"Driver's Phone Number is required *",validate:t=>/^[6-9][0-9]{3}/.test(t)?/^[0-9]*$/.test(t)?t.length<10?"Phone number must be of minimum 10 digits":t.length>10?"Phone number can be of maximum 10 digits":!0:"Invalid character in phone number. Please enter only digits":"Phone number must start with digits between 6 and 9"})}),l.phoneNo&&e.jsx("p",{className:"font12 text-danger",children:l.phoneNo.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"gender",className:"form-label greyText font14",children:"Gender"}),e.jsxs("select",{id:"gender",className:`form-select font14 ${l.gender?"border-danger":""}`,...u("gender",{required:"Gender is required *"}),children:[e.jsx("option",{value:"",children:"--- Choose ---"}),e.jsx("option",{value:"Male",children:"Male"}),e.jsx("option",{value:"Female",children:"Female"})]}),l.gender&&e.jsx("p",{className:"font12 text-danger",children:l.gender.message})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"driverImage",className:"form-label greyText font14",children:"Driver Image"}),e.jsxs("div",{className:"d-flex bg-white",children:[B!==null&&E?e.jsx("input",{id:"studentImage",type:"text",className:"form-control formimagetext font14",value:B.split("/").pop(),disabled:!0}):e.jsx("input",{id:"studentImage",type:"file",className:`form-control formimagetext font14 ${l.studentImage?"border-danger":""}`,accept:".jpg, .jpeg, .png",...u("studentImage",{required:"Admin Image is required *",validate:t=>t.length>0&&(t[0].size<10240||t[0].size>204800)?"File size must be between 10 KB to 200 KB":!0})}),e.jsx("div",{className:"formcontrolButtonborder p-1 ps-3 pe-3 text-center",children:e.jsx("span",{className:"text-white font14 align-self-center",onClick:()=>ce(!E),children:B!==null&&E?"Edit":"View"})})]}),l.studentImage&&e.jsx("p",{className:"font12 text-danger",children:l.studentImage.message})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{className:"btn addButtons text-white",type:"submit",disabled:!ne,children:"Update Driver"}),e.jsx("button",{className:"btn cancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",type:"button",children:"Cancel"})]})]})})})]})]})]})})};export{We as default};
