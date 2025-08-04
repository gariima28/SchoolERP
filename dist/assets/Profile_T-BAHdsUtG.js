import{u as ee,r as t,gG as ae,_ as N,j as e,gH as se}from"./index-DHII64NA.js";const te=ee.div`
  .breadcrum-li a{
  text-decoration: none;
  margin-top: 5px;
  color: #008479;
  }
  .main-body{
    background-color: #F2F3F6; 
  }
.main-content-conatainer{
    background-color: #fff;
    margin: 10px;
    border-radius: 15px;
}
.container-div-conetent{
    padding: 18px 18px 18px 18px;
    background-color: #fff;
    border-radius: 3px;
}
.my-ul{
    border: 1px solid #D7E7E5;

}
.content-div{
    background-color: #E5F3F2;
    text-align: center;
    padding: 15px 0px 15px 0px;
}
.content-div123{
    background-color: #E5F3F2;
   
}
.li-link{
    color: #000;
    text-decoration: none ;
    cursor: pointer !important;
}
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    background-color: transparent ;
    color: orange;
    border-bottom: 1px solid orange;
    border-radius: 0;
}
.my-nav-link{
    color: #000;
}
.color123{
    color: #8F8F8F;
}
.for-padding{
    /* padding: 0px 0px 2px 60px; */
}
.li-links{
    border: 1px solid  #D7E7E5;
}
.verified{
    background: #0AAD24;
    color: #fff;
    padding: 2px 7px;
    border-radius: 3px;
}

.my-image img{
    width: 35%;
    height: 10%;
}

@media only screen and (max-width: 1200px) {
    .content-responsive{
font-size: 11px !important;
padding-bottom: 8px;
}
}
@media only screen and (max-width: 991px) {
    .content-responsive{
font-size: 14px !important;
}
}
`,oe=()=>{t.useState(!1),t.useState(!0);const[le,i]=t.useState(!1),[r,y]=t.useState(),[c,S]=t.useState(),[Z,L]=t.useState(),[d,F]=t.useState(),[m,C]=t.useState(),[f,I]=t.useState(),[b,A]=t.useState(),[E,R]=t.useState(),[x,k]=t.useState(!1),[v,q]=t.useState(),[G,u]=t.useState(!1),[M,h]=t.useState(!1);t.useState(!1);const[_,p]=t.useState(!1),[H,g]=t.useState(!1),[O,j]=t.useState(!1);t.useEffect(()=>{D()},[]),t.useState({});const U=()=>{let a=!0;return(!r||r===""||!/^[a-zA-Z0-9\s,.'-/#%]+$/.test(r))&&(u(!0),a=!1,i(!1)),(!c||c===""||!/^[A-Za-z\s]+$/.test(c))&&(h(!0),a=!1,i(!1)),(!d||d===""||!/^[6-9]{4}[0-9]{6}$/.test(d))&&(p(!0),a=!1,i(!1)),(!f||f===""||!/^[A-Za-z\s]+$/.test(f))&&(j(!0),a=!1,i(!1)),(m===""||!m||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m))&&(g(!0),a=!1,i(!1)),a},J=a=>{y(a);const l=/^[a-zA-Z0-9\s,.'-/#%]+$/;u(l.test(a)),a===""||!l.test(a)?u(!0):u(!1)},K=a=>{S(a);const l=/^[A-Za-z\s]+$/;h(l.test(a)),a===""||!l.test(a)?h(!0):h(!1)},Q=a=>{F(a);const l=/^[6-9]{4}[0-9]{6}$/;p(l.test(a)),a===""||!l.test(a)?p(!0):p(!1),a.length>10?p(!0):p(!1)},W=a=>{I(a);const l=/^[A-Za-z\s]+$/;j(l.test(a)),a===""||!l.test(a)?j(!0):j(!1)},X=a=>{C(a);const l=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;g(l.test(a)),a===""||!l.test(a)?g(!0):g(!1)},D=async()=>{var a,l,n,o,P,V,w,z,T,$,B;i(!0);try{const s=await ae();(s==null?void 0:s.status)===200?(y((a=s==null?void 0:s.data)==null?void 0:a.address),S((l=s==null?void 0:s.data)==null?void 0:l.name),L((o=(n=s==null?void 0:s.data)==null?void 0:n.otherStaff)==null?void 0:o.staffLastName),F((P=s==null?void 0:s.data)==null?void 0:P.phone),C((V=s==null?void 0:s.data)==null?void 0:V.email),I((w=s==null?void 0:s.data)==null?void 0:w.designation),A((z=s==null?void 0:s.data)==null?void 0:z.dob),q((T=s==null?void 0:s.data)==null?void 0:T.image),R(($=s==null?void 0:s.data)==null?void 0:$.gender),i(!1)):N.error((B=s==null?void 0:s.data)==null?void 0:B.message)}catch{setloaderState(!1)}},Y=async()=>{var a,l;if(U()){i(!0);try{const n=new FormData;n.append("staffName",c),n.append("lastName",Z),n.append("staffPhone",d),n.append("address",r),n.append("staffImage",v),n.append("staffEmail",m),n.append("designation",f),n.append("dob",b),n.append("gender",E);const o=await se(n);(o==null?void 0:o.status)===200?(N.success((a=o==null?void 0:o.data)==null?void 0:a.message),D(),i(!1)):N.error((l=o==null?void 0:o.data)==null?void 0:l.message)}catch{setloaderState(!1)}}};return e.jsx(te,{children:e.jsx("div",{className:"container-fluid p-4",children:e.jsx("div",{className:"container-div-conetent",children:e.jsxs("div",{className:"row ",children:[e.jsxs("div",{className:"col-lg-3 div-col-3 content-div123",children:[e.jsxs("div",{className:"content-div",children:[e.jsx("div",{className:"image-container",children:e.jsx("p",{className:"my-image",children:e.jsx("img",{src:v,alt:""})})}),e.jsx("h2",{className:"heading-20 mt-2",children:c}),e.jsxs("p",{className:"heading-14 mt-2",children:["Teacher ",e.jsx("span",{className:"verified",children:"Verified"})]}),e.jsx("hr",{className:"mx-2 mb-0"}),e.jsx("p",{className:"ps-4 py-2  heading-14",style:{color:"#008479",textAlign:"initial"},children:"Details info"}),e.jsx("hr",{className:"mx-2 mt-0"})]}),e.jsxs("div",{className:"row heading-14 content-responsive",children:[e.jsxs("div",{className:"col-lg-6 col-md-6 col-sm-4",children:[e.jsx("p",{className:"pt-1 color123",children:"Email:"}),e.jsx("p",{className:"pt-1 color123",children:"Phone:"}),e.jsx("p",{className:"pt-1 color123",children:"Address:"})]}),e.jsxs("div",{className:"col-lg-6 col-md-6 col-sm-6",children:[e.jsx("p",{className:"pt-1",children:m}),e.jsx("p",{className:"pt-1",children:d}),e.jsx("p",{className:"pt-1",children:r})]})]})]}),e.jsxs("div",{className:"col-lg-9",children:[e.jsxs("div",{class:"mb-1",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Name"}),e.jsx("input",{type:"text",class:"form-control form-control-sm",value:c,onChange:a=>K(a.target.value),id:"exampleFormControlInput1",placeholder:"Bertha N. Fisher"})]}),e.jsx("div",{className:"pt-1",children:M&&e.jsx("p",{className:"ms-1",style:{color:"red",fontSize:"14px",marginTop:"-18px"},children:"Name is required"})}),e.jsxs("div",{class:"mb-1",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Email"}),e.jsx("input",{type:"text",class:"form-control form-control-sm",id:"exampleFormControlInput1",value:m,placeholder:"admin@example.com",onChange:a=>X(a.target.value)})]}),e.jsx("div",{className:"pt-3",children:H&&e.jsx("p",{className:"ms-1",style:{color:"red",fontSize:"14px",marginTop:"-18px"},children:"Email is required"})}),e.jsxs("div",{class:"mb-1",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Designation"}),e.jsx("input",{type:"text",class:"form-control form-control-sm",id:"exampleFormControlInput1",value:f,placeholder:"Enter your Designation",onChange:a=>W(a.target.value)})]}),e.jsx("div",{className:"pt-3",children:O&&e.jsx("p",{className:"ms-1",style:{color:"red",fontSize:"14px",marginTop:"-18px"},children:"Designation is required"})}),e.jsxs("div",{class:"mb-1",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Birthday"}),e.jsx("input",{type:"date",class:"form-control form-control-sm",id:"exampleFormControlInput1",value:b?b.split("T")[0]:"",placeholder:"Bertha N. Fisher",onChange:a=>A(a.target.value)})]}),e.jsxs("div",{className:"mb-1  ",children:[e.jsx("label",{for:"exampleFormControlInput1",className:"form-label heading-16",children:"Gender"}),e.jsxs("select",{class:"form-select  form-select-sm form-focus label-color",value:E,"aria-label":"Default select example",onChange:a=>R(a.target.value),children:[e.jsx("option",{value:"male",children:"Male"}),e.jsx("option",{value:"female",children:"Female"}),e.jsx("option",{value:"other",children:"Other"})]})]}),e.jsxs("div",{class:"mb-1",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Phone Number"}),e.jsx("input",{type:"email",class:"form-control form-control-sm",value:d,onChange:a=>Q(a.target.value),id:"exampleFormControlInput1",placeholder:"Bertha N. Fisher"})]}),e.jsx("div",{className:"pt-3",children:_&&e.jsx("p",{className:"ms-1",style:{color:"red",fontSize:"14px",marginTop:"-18px"},children:"Number is required"})}),e.jsxs("div",{className:"mb-1",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Address"}),e.jsx("input",{type:"text",class:"form-control form-control-sm",value:r,onChange:a=>J(a.target.value),id:"exampleFormControlInput1",placeholder:"Bertha N. Fisher"})]}),e.jsx("div",{className:"pt-3",children:G&&e.jsx("p",{className:"ms-1",style:{color:"red",fontSize:"14px",marginTop:"-18px"},children:"Address is required"})}),e.jsxs("div",{class:"mb-3 ",style:{display:"flex"},children:[e.jsxs("div",{className:"w-100",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label",children:"Profile Image"}),x?e.jsx("input",{type:"file",class:"form-control",id:"exampleFormControlInput1",onChange:a=>q(a.target.files[0]),placeholder:"select file",accept:".jpg, .png, .jpeg"}):e.jsx("input",{type:"text",class:"form-control",id:"exampleFormControlInput1",value:v,placeholder:"name@example.com"})]}),e.jsx("div",{style:{margin:"auto",paddingTop:"30px",paddingLeft:"5px"},children:x?e.jsx("button",{type:"button",class:"btn btn-outline-success my-green heading-14 ",onClick:()=>k(!x),children:"Edit"}):e.jsx("button",{type:"button",class:"btn btn-outline-success my-green heading-14 ",onClick:()=>k(!x),children:"View"})})]}),e.jsxs("div",{className:"my-button11 mt-2",children:[e.jsx("button",{type:"button",className:"btn btn-outline-success heading-12 btn-bgAndColor",onClick:Y,children:"Save Changes"}),e.jsx("button",{type:"button",className:"btn btn-outline-success heading-12 ms-1",children:"Cancel"})]})]})]})})})})};export{oe as default};
