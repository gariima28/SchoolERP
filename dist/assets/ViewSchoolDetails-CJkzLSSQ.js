import{u as f,k as g,a as w,r as t,d as v,_ as y,j as e,D as k,L as h,I as m,c as T}from"./index-DHII64NA.js";const B=f.div`
  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }

  .schoolNameDetails {
    border-radius: 0px 250px 250px 0px;
    background-color: var(--greenTextColor);
  }

  .orangeHighlightText {
    color: #f5b048;
  }

  .school-details-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
  }

  .school-details-text {
    flex: 1;
    color: white;
    z-index: 2;
  }

  .school-image-container {
    transform: translate(-30%, -10%);
    display: flex;
    align-items: center;
    background-color: var(--greenTextColor);
    width: 255px;
    height: 255px;
    border-radius: 100%;
    z-index: 1;
  }

  .school-image-inner {
    display: flex;
    align-items: center;
    background-color: white;
    width: 243px;
    height: 243px;
    border-radius: 50%;
  }

  .school-image-inner img {
    width: 237px;
    height: 237px;
    border-radius: 50%;
    object-fit: cover;
  }

  .fixed-width-container {
    max-width: 70%;
    word-wrap: break-word;
  }
`,P=()=>{var l;const{schoolId:x}=g(),j=w(),u=sessionStorage.getItem("token"),[s,b]=t.useState([]),[N,r]=t.useState(!1);t.useEffect(()=>{p()},[u]);const p=async()=>{var i,c,o,n,d;try{r(!0);const a=await v(x);(a==null?void 0:a.status)===200&&((i=a==null?void 0:a.data)==null?void 0:i.status)==="success"?(b((c=a==null?void 0:a.data)==null?void 0:c.school),r(!1)):(r(!1),y.error((o=a==null?void 0:a.data)==null?void 0:o.message))}catch(a){r(!1),r(!1),console.error("Error fetching student data:",a),((d=(n=a==null?void 0:a.response)==null?void 0:n.data)==null?void 0:d.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{j("/")},200))}};return e.jsx(e.Fragment,{children:e.jsxs(B,{className:"scrollHide",children:[N&&e.jsx(k,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row mb-3",children:[e.jsx("nav",{className:"breadcrumnav","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-2",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx(h,{to:"#",className:"greyText text-decoration-none",children:e.jsx("h2",{children:"Home > "})})}),e.jsx("li",{className:"breadcrumb-item active greenText","aria-current":"page",children:e.jsx("h2",{children:" Schools"})})]})}),e.jsxs("h2",{className:"",children:["School Detail - ",s==null?void 0:s.schoolName]})]}),e.jsx("div",{className:"row ps-2 pe-2",children:e.jsx("div",{className:"cardradius bg-white p-5 d-flex justify-content-center",children:e.jsxs("div",{className:"p-3 border rounded fixed-width-container",children:[e.jsx("div",{className:"row pt-3 pt-5",children:e.jsxs("div",{className:"school-details-container p-0",children:[e.jsxs("div",{className:"school-details-text",children:[e.jsxs("div",{className:"schoolNameDetails p-3",children:[e.jsx("h4",{className:"font26 orangeHighlightText",children:s==null?void 0:s.schoolName}),e.jsxs("div",{className:"d-flex dottedTopBorder pt-2 gap-1 flex-wrap",children:[e.jsx("h2",{children:"Address:"}),e.jsxs("h2",{className:"text-wrap",style:{wordBreak:"break-word",overflowWrap:"break-word",flex:1},children:[" ",s==null?void 0:s.schoolAddress," "]})]})]}),e.jsxs("div",{className:"row mt-3 w-100",children:[e.jsxs("div",{className:"d-flex justify-content-between",children:[e.jsxs("h3",{className:"greyText",children:[e.jsx(m,{className:"me-2",icon:"bxs:phone-call",width:"1.5em",height:"1.5em",style:{color:"#00A67E"}}),"Phone Number:"]}),e.jsx("h3",{className:"text-black",children:s==null?void 0:s.schoolPhone})]}),e.jsxs("div",{className:"d-flex justify-content-between",children:[e.jsxs("h3",{className:"greyText mt-2",children:[e.jsx(m,{className:"me-2",icon:"material-symbols:list-alt-outline",width:"1.5em",height:"1.5em",style:{color:"#00A67E"}}),"Plan:"]}),e.jsx("h3",{className:"mt-2 text-black",children:(l=s==null?void 0:s.plans)==null?void 0:l.planName})]})]})]}),e.jsx("div",{className:"school-image-container",children:e.jsx("div",{className:"school-image-inner",children:e.jsx("img",{src:"/images/studentProfile.png",alt:`${s==null?void 0:s.schoolName} Profile`})})})]})}),e.jsx("p",{className:"text-center p-3",children:e.jsx(h,{className:"btn cancelButtons ms-3",to:"/",children:"Back"})})]})})}),e.jsx(T,{})]})]})})};export{P as default};
