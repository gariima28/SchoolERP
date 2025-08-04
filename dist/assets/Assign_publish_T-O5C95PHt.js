import{r as t,fQ as He,_ as x,f2 as Oe,j as e,gu as Qe,gh as We,gw as ca,u as ia,a as da,H as ma,L as B,c as ua,R as fa,w as Ze,gx as pa,gy as xa,gz as ha}from"./index-DHII64NA.js";const ba=()=>{const[j,C]=t.useState(!0);t.useState(!1);const[ge,de]=t.useState(!0),[je,p]=t.useState(!1);t.useState(""),t.useState(!0),t.useState(!1),t.useState(!0),t.useState(!1),t.useState(!1),t.useState(),t.useState();const[D,R]=t.useState(),[L,P]=t.useState(),[I,G]=t.useState(),[f,E]=t.useState(),[v,Y]=t.useState(),[J,h]=t.useState(),[y,_]=t.useState(),[S,V]=t.useState(),[N,b]=t.useState(),[K,me]=t.useState(),[z,g]=t.useState(),[ee,ve]=t.useState([]),[U,Z]=t.useState([]),[H,O]=t.useState([]),[Q,W]=t.useState([]),[ue,A]=t.useState(!1),[fe,k]=t.useState(!1),[pe,F]=t.useState(!1),[X,M]=t.useState(!1);t.useEffect(()=>{le()},[]),t.useEffect(()=>{v&&ye()},[v]),t.useState({});const xe=()=>{let s=!0;return(!D||D===""||!/^[A-Za-z\s]+$/.test(D))&&(A(!0),s=!1,p(!1)),(!y||y===""||!/^[0-9]+$/.test(y))&&(k(!0),s=!1,p(!1)),(!S||S===""||!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(S))&&(F(!0),s=!1,p(!1)),(!N||N===""||!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(N))&&(M(!0),s=!1,p(!1)),s},ae=s=>{R(s);const c=/^[A-Za-z\s]+$/;A(c.test(s)),s===""||!c.test(s)?A(!0):A(!1)},te=s=>{_(s);const c=/^[0-9]+$/;k(c.test(s)),s===""||!c.test(s)?k(!0):k(!1)},q=s=>{V(s);const c=/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;F(c.test(s)),s===""||!c.test(s)?F(!0):F(!1)},se=s=>{b(s);const c=/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;M(c.test(s)),s===""||!c.test(s)?M(!0):M(!1)},w=s=>{const c=s.target.value,[u,o]=c.split(",");P(parseInt(u));const i=o.trim();G(i),T(u),oe(u)},le=async()=>{var s,c,u;p(!0);try{const o=await He();(o==null?void 0:o.status)===200?(ve((s=o==null?void 0:o.data)==null?void 0:s.classes),p(!1)):x.error((u=(c=o==null?void 0:o.data)==null?void 0:c.classes)==null?void 0:u.message)}catch{setloaderState(!1)}},T=async s=>{var c,u;p(!0);try{const o=await Qe(s);(o==null?void 0:o.status)===200?(Z((c=o==null?void 0:o.data)==null?void 0:c.allSections),p(!1)):x.error((u=o==null?void 0:o.data)==null?void 0:u.message)}catch{setloaderState(!1)}},oe=async s=>{var c,u,o;p(!0);try{const i=await We(s);(i==null?void 0:i.status)===200?(O((c=i==null?void 0:i.data)==null?void 0:c.subjects),p(!1)):x.error((o=(u=i==null?void 0:i.data)==null?void 0:u.classes)==null?void 0:o.message)}catch{setloaderState(!1)}},ye=async()=>{var s,c,u;p(!0);try{const o=await Oe(L,v);(o==null?void 0:o.status)===200?(W((s=o==null?void 0:o.data)==null?void 0:s.teacher),p(!1)):x.error((u=(c=o==null?void 0:o.data)==null?void 0:c.classes)==null?void 0:u.message)}catch{setloaderState(!1)}},he=t.useRef(null),ne=async()=>{var s,c,u;if(xe()){p(!0);{const o=new FormData;o.append("title",D),o.append("ClassId",L),o.append("subjectId",v),o.append("teacherId",J),o.append("totalMarks",y),o.append("startDate",S),o.append("endDate",N),o.append("status",z),o.append("sectionId",f),o.append("file",K);try{const i=await ca(o);((s=i==null?void 0:i.data)==null?void 0:s.status)==="success"?(x.success((c=i==null?void 0:i.data)==null?void 0:c.message),C(!1),p(!1),R(""),P(""),G(""),E(""),Y(""),h(""),_(""),V(""),b(""),g(""),setTimeout(()=>{re()},.5),bootstrap.Offcanvas.getInstance(he.current).hide(),de(!1),setTimeout(()=>{C(!0)},.5)):(x.error((u=i==null?void 0:i.data)==null?void 0:u.message),C(!0))}catch{setloaderState(!1)}}}},re=()=>{setTimeout(!0)},$=()=>{R(""),P(""),G(""),E(""),Y(""),h(""),_(""),V(""),b(""),g(""),A(!1),k(!1),F(!1),M(!1),C(!0)};return e.jsx("div",{className:"container-fluid",children:e.jsx("div",{className:"row",children:j?e.jsx(e.Fragment,{children:e.jsxs("div",{className:"offcanvas-body pt-0  px-0",children:[e.jsxs("div",{class:"mb-3",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Title"}),e.jsx("input",{type:"email",class:"form-control form-control-sm",value:D,onChange:s=>ae(s.target.value),id:"exampleFormControlInput1",placeholder:"Select Title"})]}),e.jsx("div",{className:"pt-1",children:ue&&e.jsx("p",{className:"ms-1",style:{color:"red",fontSize:"14px",marginTop:"-18px"},children:"Valid title is required"})}),e.jsxs("div",{className:"mb-1  ",children:[e.jsx("label",{for:"exampleFormControlInput1",className:"form-label  heading-16",children:"Class"}),e.jsxs("sealect",{class:"form-select  form-select-sm form-focus  label-color",value:`${L}, ${I}`,onChange:w,"aria-label":"Default select example",children:[e.jsx("option",{selected:!0,children:"--Choose--"}),ee.map(s=>e.jsx("option",{value:`${s.classId}, ${s.classNo}`,children:s.classNo}))]})]}),e.jsxs("div",{className:"mb-1  ",children:[e.jsx("label",{for:"exampleFormControlInput1",className:"form-label   heading-16",children:"Section"}),e.jsxs("select",{class:"form-select  form-select-sm form-focus   label-color",value:f,onChange:s=>E(s.target.value),"aria-label":"Default select example",children:[e.jsx("option",{selected:!0,children:"--Choose--"}),U==null?void 0:U.map(s=>e.jsx("option",{value:s.sectionId,children:s.sectionName}))]})]}),e.jsxs("div",{className:"mb-1  ",children:[e.jsx("label",{for:"exampleFormControlInput1",className:"form-label  heading-16",children:"Subject"}),e.jsxs("select",{class:"form-select  form-select-sm form-focus  label-color",value:v,onChange:s=>Y(s.target.value),"aria-label":"Default select example",children:[e.jsx("option",{selected:!0,children:"--Choose--"}),H==null?void 0:H.map(s=>e.jsx("option",{value:s.subjectId,children:s.subjectName}))]})]}),e.jsxs("div",{className:"mb-1  ",children:[e.jsx("label",{for:"exampleFormControlInput1",className:"form-label  heading-16",children:"Teacher"}),e.jsxs("select",{class:"form-select  form-select-sm form-focus  label-color",value:J,onChange:s=>h(s.target.value),"aria-label":"Default select example",children:[e.jsx("option",{selected:!0,children:"--Choose--"}),Q==null?void 0:Q.map(s=>e.jsx("option",{value:s.subjectId,children:s.staffName}))]})]}),e.jsxs("div",{class:"mb-3",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Total Marks"}),e.jsx("input",{type:"email",class:"form-control form-control-sm",id:"exampleFormControlInput1",value:y,onChange:s=>te(s.target.value),placeholder:"Select Title"})]}),e.jsx("div",{className:"pt-1",children:fe&&e.jsx("p",{className:"ms-1",style:{color:"red",fontSize:"14px",marginTop:"-18px"},children:"Valid marks is required"})}),e.jsxs("div",{class:"mb-3",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Start Day"}),e.jsx("input",{type:"date",class:"form-control form-control-sm",id:"exampleFormControlInput1",value:S,onChange:s=>q(s.target.value),placeholder:"Select Class"})]}),e.jsx("div",{className:"pt-1",children:pe&&e.jsx("p",{className:"ms-1",style:{color:"red",fontSize:"14px",marginTop:"-18px"},children:"Valid start date is required"})}),e.jsxs("div",{class:"mb-3",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"End Day"}),e.jsx("input",{type:"date",class:"form-control form-control-sm",id:"exampleFormControlInput1",value:N,onChange:s=>se(s.target.value),placeholder:"Select Class"})]}),e.jsx("div",{className:"pt-1",children:X&&e.jsx("p",{className:"ms-1",style:{color:"red",fontSize:"14px",marginTop:"-18px"},children:"Valid end date is required"})}),e.jsxs("div",{class:"mb-3",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Assignment Upload "}),e.jsx("input",{type:"file",class:"form-control form-control-sm",id:"exampleFormControlInput1",onChange:s=>me(s.target.files[0]),placeholder:"Select Class",accept:".jpg, .png, .jpeg"})]}),e.jsxs("div",{className:"mb-1  ",children:[e.jsx("label",{for:"exampleFormControlInput1",className:"form-label  heading-16 ",children:"Status"}),e.jsxs("select",{class:"form-select  form-select-sm form-focus  label-color ",value:z,onChange:s=>g(s.target.value),"aria-label":"Default select example",children:[e.jsx("option",{selected:!0,children:"--Choose--"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"draft",children:"Draft"}),e.jsx("option",{value:"archives",children:"Archives"})]})]}),e.jsxs("div",{className:"my-button11 ",children:[e.jsx("button",{type:"button",className:"btn btn-outline-success heading-16 btn-bgAndColor",onClick:ne,children:"Add Assignment"}),e.jsx("button",{type:"button",className:"btn btn-outline-success heading-16","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:$,children:"Cancel"})]})]})}):e.jsx("div",{className:"delete-section  mt-5",children:e.jsxs("div",{className:"bg-container",children:[e.jsx("div",{className:"img-container",children:e.jsx("img",{src:"/images/XMLID_1_.png",alt:""})}),e.jsxs("div",{className:"content mt-5",children:[e.jsx("p",{children:"Successful Added"}),e.jsx("hr",{style:{width:""}}),e.jsxs("p",{className:"mb-5",style:{color:"#ADADBD",fontSize:"14px"},children:["Your Changes has been ",e.jsx("br",{})," Successfully Saved"]})]}),e.jsx("div",{className:"button-position",children:e.jsx("button",{type:"button","data-bs-dismiss":"offcanvas",className:"btn btn-outline-primary button11 mt-4 mb",style:{fontSize:"14px"},onClick:$,children:"Continue"})})]})})})})},ga=ia.div`
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
    /* height: 100vh; */
    border-radius: 15px;

}
.margin-minus22{
    margin-top: -18px;
    font-size: 16px;
}
th, td{
  padding: 10px;
}
.my-td-style-yellow span{
  background-color: #FFEED3;
    color: #FF914C;
    padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-td-style-green span{
  background-color:#E6FFE2;
  color: #00A67E;
  padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-button-drop{
  line-height: 13px !important;
  border: 1px solid var(--tableActionButtonBgColor)  !important;

}
.pagination-a{
  background-color: #f2f0f0;
  color: #000;
  padding: 0.00175rem 0.25rem;
  margin-left: 0px !important;
}
.form-focus:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: var(--greyInputborderColor) !important;
    outline: none !important;
    box-shadow: none !important;
}
.page-link-1122 {
    /* padding: 0.00175rem 0.05rem; */
    padding: 0rem 0rem;
}
.pagination-a a{
  gap: 2px;
}
.my-pagina li a:hover{
  background-color: #008479;
  color: #fff;
  border: none;
}
.input-bg{
  background-color: #F2F3F6 !important;
}
.label-color{
  color: #bbbec1;
}
.cont-drop-btn button:hover{
  background-color: transparent;
  color: #000;
  cursor: pointer;
  border: none;
}


.my-button11{
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-top: 30px;
}

.my-button11 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}
.my-button11 button:hover{
    background-color: #008479;
    color: #fff;
}
.my-button22{
    display: flex;
    gap: 4px;
    margin-top: 4px;
}

.my-button22 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}
.my-button22 button:hover{
    background-color: #008479;
    color: #fff;
}
.my-grey{
  color: #ADADBD;
}

.my-div-class p{
  border: 1px solid #ADADBD;
  padding: 10px;
  border-radius: 4px;
  background-color: #F2F3F6;
  color: #ADADBD;
  border: 1px solid #F2F3F6;
}
.my-div-class span a{
    text-decoration: none;
}
.anchor-color a{
  color: #8F8F8F;
}
.my-own-button{
  height: 33px;
  background-color: var(  --greenTextColor);
  line-height: 18px;
}
.my-own-outline-btn{
  height: 33px;
  line-height: 0px;
  color: #000;
  border: 1px solid var( --buttonBorder);
  background-color: #fff;
}

.img-div img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #b9b8b8;

}
/* ############# offcanvas ############## */
.forInput {
    background : #F2F3F6;
    color:  #ADADBD;
    /* font-family: 'Noto Sans'; */
    font-size: 14px;
  }
  .forInput::placeholder{
    color: #ADADBD;
  }

  .forInputFont{
    font-size: 14px;
  }
    .forLabel {
    color:  #ADADBD;
    font-size: 15px;
  }
  .button11{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #008479;
    border-radius: 0%;
  }

  .img-container{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    top: -16%;
  }
  .img-container22{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    border: 2px solid #cdcdcd;
    top: -16%;
  }
  .img-container img{
    height: 30px;
    width: 36px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container22 img{
    height: 27px;
    width: 32px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container{

  }
  .bg-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #dee2e6;
    width: 65%;
    background-color: #F2F3F6;
  }
  .delete-section {
    /* height: 30%; */
    position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  }
  .button-position{
    position: absolute;
    top: 78%;
  }
  .main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
  .image-container{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #F1F5FA;
  }
  .image-container img{
    width: 100%;
    height: 100%;
  }
  .delete-content{
    font-size: 20px;
  }
  .delete-content span{
    background-color: #0AAD24;
    color: #fff;
    font-size: 15px;
    padding: 2px 6px 2px 6px;
    border-radius: 4px;
  }
  .likeButton{
    background-color: #008479;
    color: #fff;
    font-size: 17px;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
    display: inline;
  }

.view-details-background-color{
    background-color: var(--backgroundColor);
  }

  .symbol-container img{
    object-fit: cover;
  }
  .subject{
    font-size: 14px;
  }
  .sure-main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .sure-content h5{
    font-weight: 200;
  }
  .sure-content p{
    font-size: 14px;
    color: #ADADBD;
  }
  .agree{
    font-size: 14px;
    color: #ADADBD;
  }
  .buttons-topss{
    margin-top: -35px;
  }
  .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #B50000;
    border-radius: 0%;
  }
  .bg-color-pink{
    border: 1px dashed #EECEBE;
    background: #FFF9F6;
  }
  .my-non-clickable button{
    border-radius: 5px;
    border: 1px solid #ECEBF3;
    background: #FFF;
    color: #000;
  }
  .my-form-check-input123:checked {
    background-color: var( --greenTextColor);
    border-color: var( --greenTextColor);
}
.overflow-y {
  max-height: 300px; 
  overflow-y: auto; 
}
.my-own-outline-btn{
    border: 1px solid #008479;
    color: #008479;
}

.button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    background-color: #B50000;
    color: #fff;
    border-radius: 0%;
  }
.cancel-btn{
    color: #959494;
   border-color: #cdcdcd;
  
    --bs-btn-hover-bg: #fff;
    border-radius: 0%;
  }

  .my-btn.disabled, .my-btn:disabled, fieldset:disabled .btn {
    color: #fff ;
    pointer-events: none;
    background-color: #B50000;
    border-color: #cdcdcd;
    opacity: var(--bs-btn-disabled-opacity);
}
.my-form-check-input:checked{
  background-color: #B50000;
  border-color: #B50000;
} 

.unpaid{
    background-color: #B50000;
    color: #fff;
    padding: 2px 10px;
    font-size: 13px;
    border-radius: 15px ;
    display: inline-block;
}
.paid{
    background-color: #00A67E;
    color: #fff;
    font-size: 13px;
    padding: 2px 10px;
    border-radius: 15px ;
    display: inline-block;
}
.my-green{
    background-color: #008479;
    color: #fff !important;
}
.modal-header{
    border-bottom: none !important;
}
.main{
    border-top: none !important;
}
.main-content{
    background-color: #F0F0FF;
    padding: 8px;
}
.img-content img{
    width: 80px;
}
.img-content {
    padding: 4px 0px 0px 4px;
}
.ul-1{
    list-style: none;
    color: #8F8F8F;
}
.ul-2{
    list-style: none;
}
.outer-border{
    border: 1px solid #DDDDEB;
    padding: 0px 12px 0px 12px;
}

.table-input{
    border: 1px solid #E4E7EB;
}
.edit-icon{
    cursor: pointer;
}
.progress-bar{
  background-color: #008479;
}
.pagination {
    display: flex;
    list-style: none;
    padding: 0;
}

.pagination li {
    margin: 0 5px;
}

.pagination li a {
    box-shadow: none !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    font-size: var(--font-size-14);
    border-radius: 8px;
    border: 1px solid #ddd;
    text-decoration: none;
    color: #000;
    /* background-color: #f5f5f5;
    transition: background-color 0.3s; */
}
.pagination li a:hover {
    background-color: #317a77 !important;
    color: #fff !important;
}

.pagination li.active a {
    background-color: #317a77 !important;
    color: #fff;
    font-weight: bold;
}
.my-i-button{
  border: none;
  background: none;
}
/* ############# offcanvas ############## */

/* ########## media query ###########  */
 @media only screen and (max-width: 950px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
 @media only screen and (max-width: 735px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
@media only screen and (max-width: 605px) {
  .for-media-query-22{
    flex: 0 0 auto !important;
    width: 53% !important;
  }
  .my-own-button{
    margin-top: 5px;
    margin-bottom: 25px;
  }
  .search-responsive{
    margin-top: 10px;
  }
  .export1{
    margin-top: 8px !important;
  }
  .export2{
    margin-top: 12px !important;
  }
}

@media only screen and (max-width: 605px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}

@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
`,ja=j=>{var Ae,ke;const C=j.update,ge=da(),[de,je]=t.useState(1),[p,D]=t.useState(1),[R,L]=t.useState(1);t.useState(10),t.useState([]),t.useEffect(()=>{ge("/teacher/assignmenttea",{state:R})},[R]);const P=a=>{L(a.selected+1)},I=(Ae=j.data)!=null&&Ae.assignment?(ke=j.data)==null?void 0:ke.assignment:[];t.useEffect(()=>{var a,n;je((a=j.data)==null?void 0:a.currentPage),D((n=j.data)==null?void 0:n.totalPages)},[j]);const[G,f]=t.useState(!1),[E,v]=t.useState(!1),[Y,J]=t.useState(!0),[h,y]=t.useState(),[_,S]=t.useState(),[V,N]=t.useState(),[b,K]=t.useState(),[me,z]=t.useState(!0),[g,ee]=t.useState(),[ve,U]=t.useState();t.useState(!1);const[Z,H]=t.useState([]),[O,Q]=t.useState([]),[W,ue]=t.useState([]),[A,fe]=t.useState(),[k,pe]=t.useState(),[F,X]=t.useState(!0),[M,xe]=t.useState(!1),[ae,te]=t.useState(),[q,se]=t.useState(),[w,le]=t.useState(),[T,oe]=t.useState(),[ye,he]=t.useState(),[ne,re]=t.useState(),[$,s]=t.useState([]),[c,u]=t.useState(!1),[o,i]=t.useState(!1),[Se,ce]=t.useState(!1),[Xe,ie]=t.useState(!1);t.useEffect(()=>{sa(),Ne(h),Ce(h)},[h]),t.useEffect(()=>{b&&la()},[b]),t.useState({});const Ye=()=>{let a=!0;return(!g||g===""||!/^[A-Za-z\s]+$/.test(g))&&(u(!0),a=!1,f(!1)),(!q||q===""||!/^[0-9]+$/.test(q))&&(i(!0),a=!1,f(!1)),(!w||w===""||!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(w))&&(ce(!0),a=!1,f(!1)),(!T||T===""||!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(T))&&(ie(!0),a=!1,f(!1)),a},Je=a=>{ee(a);const n=/^[A-Za-z\s]+$/;u(n.test(a)),a===""||!n.test(a)?u(!0):u(!1)},Ke=a=>{se(a);const n=/^[0-9]+$/;i(n.test(a)),a===""||!n.test(a)?i(!0):i(!1)},ea=a=>{le(a);const n=/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;ce(n.test(a)),a===""||!n.test(a)?ce(!0):ce(!1)},aa=a=>{oe(a);const n=/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;ie(n.test(a)),a===""||!n.test(a)?ie(!0):ie(!1)},ta=a=>{const n=a.target.value,[m,l]=n.split(",");y(parseInt(m));const d=l.trim();S(d),Ne(m),Ce(m)},sa=async()=>{var a,n,m;f(!0);try{const l=await He();(l==null?void 0:l.status)===200?(H((a=l==null?void 0:l.data)==null?void 0:a.classes),f(!1)):x.error((m=(n=l==null?void 0:l.data)==null?void 0:n.classes)==null?void 0:m.message)}catch{setloaderState(!1)}},Ne=async a=>{var n,m;f(!0);try{const l=await Qe(a);(l==null?void 0:l.status)===200?(Q((n=l==null?void 0:l.data)==null?void 0:n.allSections),f(!1)):x.error((m=l==null?void 0:l.data)==null?void 0:m.message)}catch{setloaderState(!1)}},Ce=async a=>{var n,m,l;f(!0);try{const d=await We(a);(d==null?void 0:d.status)===200?(ue((n=d==null?void 0:d.data)==null?void 0:n.subjects),f(!1)):x.error((l=(m=d==null?void 0:d.data)==null?void 0:m.classes)==null?void 0:l.message)}catch{setloaderState(!1)}},la=async()=>{var a,n,m;f(!0);try{const l=await Oe(h,b);(l==null?void 0:l.status)===200?(s((a=l==null?void 0:l.data)==null?void 0:a.teacher),f(!1)):x.error((m=(n=l==null?void 0:l.data)==null?void 0:n.classes)==null?void 0:m.message)}catch{setloaderState(!1)}},De=t.useRef(null);t.useRef(null);const Ie=t.useRef(null),oa=async a=>{var n,m;f(!0);try{const l=await pa(a);(l==null?void 0:l.status)===200?(x.success((n=l==null?void 0:l.data)==null?void 0:n.message),z(!1),f(!1),C(!0),bootstrap.Offcanvas.getInstance(Ie.current).hide(),setTimeout(()=>{z(!0),v(!1)},.5)):(x.error((m=l==null?void 0:l.data)==null?void 0:m.message),z(!0))}catch{setloaderState(!1)}},na=async a=>{var n,m,l,d,be,Fe,we,Te,Be,Re,Ee,Ve,ze,Me,qe,$e,Le,Pe,Ge,_e,Ue;pe(a),f(!0);try{const r=await xa(a);(r==null?void 0:r.status)===200?(ee((m=(n=r==null?void 0:r.data)==null?void 0:n.Assignment)==null?void 0:m.title),y((d=(l=r==null?void 0:r.data)==null?void 0:l.Assignment)==null?void 0:d.classId),S((Fe=(be=r==null?void 0:r.data)==null?void 0:be.Assignment)==null?void 0:Fe.classNo),N((Te=(we=r==null?void 0:r.data)==null?void 0:we.Assignment)==null?void 0:Te.sectionId),K((Re=(Be=r==null?void 0:r.data)==null?void 0:Be.Assignment)==null?void 0:Re.subjectId),te((Ve=(Ee=r==null?void 0:r.data)==null?void 0:Ee.Assignment)==null?void 0:Ve.teacherId),se((Me=(ze=r==null?void 0:r.data)==null?void 0:ze.Assignment)==null?void 0:Me.totalMarks),le(($e=(qe=r==null?void 0:r.data)==null?void 0:qe.Assignment)==null?void 0:$e.startDate),oe((Pe=(Le=r==null?void 0:r.data)==null?void 0:Le.Assignment)==null?void 0:Pe.endDate),re((_e=(Ge=r==null?void 0:r.data)==null?void 0:Ge.Assignment)==null?void 0:_e.status),f(!1)):x.error((Ue=r==null?void 0:r.data)==null?void 0:Ue.message)}catch{setloaderState(!1)}},ra=async a=>{var n,m;if(Ye()){f(!0);try{const l=new FormData;l.append("title",g),l.append("ClassId",h),l.append("subjectId",b),l.append("teacherId",ae),l.append("totalMarks",h),l.append("startDate",w),l.append("endDate",T),l.append("status",ne),l.append("sectionId",V);const d=await ha(k,l);(d==null?void 0:d.status)===200?(x.success((n=d==null?void 0:d.data)==null?void 0:n.message),X(!1),xe(!0),f(!1),C(!0),bootstrap.Offcanvas.getInstance(De.current).hide(),J(!1),setTimeout(()=>{X(!0)},.5)):(x.error((m=d==null?void 0:d.data)==null?void 0:m.message),X(!0))}catch{setloaderState(!1)}}};return e.jsxs(ga,{children:[G&&e.jsx(ma,{}),e.jsxs("div",{className:"",children:[e.jsx("div",{className:"main-content-conatainer pt-1 ",children:e.jsxs("div",{className:"table-container  table-responsive",children:[e.jsxs("table",{className:"table table-sm r table-striped",children:[e.jsx("thead",{className:"",children:e.jsxs("tr",{className:"heading-16 text-color-000",style:{fontWeight:"500"},children:[e.jsx("th",{className:"",style:{width:"100px"},children:"#"}),e.jsx("th",{children:"Title"}),e.jsx("th",{children:"Details"}),e.jsx("th",{children:"Deadline"}),e.jsx("th",{children:"Submission"}),e.jsx("th",{children:"Status"}),e.jsx("th",{children:"Actions"})]})}),e.jsx("tbody",{className:"heading-14 align-middle greyTextColor",children:I&&I.length>0?I==null?void 0:I.map((a,n)=>e.jsxs("tr",{className:"heading-14",children:[e.jsx("td",{className:" greyText",children:n+1}),e.jsx("td",{className:" greyText",children:a.title}),e.jsxs("td",{className:" greyText",children:[" class -",a.classNo," ",e.jsx("br",{}),"section -",a.sectionName," ",e.jsx("br",{}),"subject -",a.subjectName]}),e.jsxs("td",{className:" greyText",children:["Start Time - ",a.startDate," ",e.jsx("br",{})," End Time - ",a.endDate," "]}),e.jsx("td",{className:" greyText d",children:e.jsx("div",{className:"",children:e.jsx("div",{class:"progress",role:"progressbar","aria-label":"Animated striped example","aria-valuenow":"45","aria-valuemin":"0","aria-valuemax":"100",children:e.jsx("div",{class:"progress-bar progress-bar-striped progress-bar-animated",style:{width:`${a.currentSubmissions}%`}})})})}),e.jsx("td",{className:" greyText",children:a.status}),e.jsx("td",{className:" greyText",children:e.jsx("td",{className:" greyText  pe-0",children:e.jsxs("div",{className:"dropdown my-button-show",children:[e.jsxs("button",{className:"btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false",children:["Action  ",e.jsx("svg",{width:"11",height:"7",viewBox:"0 0 11 7",fill:"none",xmlns:"",children:e.jsx("path",{d:"M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z",fill:"black"})})]}),e.jsxs("ul",{className:"dropdown-menu anchor-color heading-14",children:[e.jsx("li",{children:e.jsx(B,{className:"dropdown-item","data-bs-toggle":"offcanvas","data-bs-target":"#staticBackdrop101","aria-controls":"staticBackdrop",onClick:()=>na(a.id),children:"Edit"})}),e.jsx("li",{children:e.jsx(B,{className:"dropdown-item",to:`/assignmentdetails/${a.id}`,onChange:m=>U(a.id),children:"Open"})}),e.jsx("li",{children:e.jsx(B,{className:"dropdown-item",to:`/assignmntsubmssion/${a.id}/${a.sectionId}/${a.totalMarks}`,children:"Submission"})}),e.jsx("li",{children:e.jsx(B,{className:"dropdown-item","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasRight22","aria-controls":"staticBackdrop",onClick:()=>fe(a.id),children:"Delete"})})]})]})})})]})):e.jsx("tr",{children:e.jsx("td",{colSpan:"12",className:"text-center",children:e.jsx("div",{className:"d-flex justify-content-center align-items-center m-5 ",children:e.jsxs("div",{className:"text-center",children:[e.jsx("img",{src:"/images/search.svg",alt:""}),e.jsx("h2",{children:e.jsx("b",{children:"No Data Found"})})]})})})})}),e.jsx(ua,{})]}),e.jsxs("div",{className:"d-flex",style:{marginBottom:"10px"},children:[e.jsxs("p",{className:"font14",children:["Showing ",de," of ",p," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(fa,{previousLabel:e.jsx(Ze,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(Ze,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:p,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:P,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]})}),e.jsxs("div",{className:"offcanvas offcanvas-end",tabindex:"-1",id:"offcanvasRight","aria-labelledby":"offcanvasRightLabel",children:[e.jsxs("div",{className:"offcanvas-header",children:[e.jsx(B,{"data-bs-dismiss":"offcanvas",children:e.jsx("img",{src:"/images/Vector (13).svg",alt:""})}),e.jsx("h5",{className:"offcanvas-title heading-16",id:"offcanvasRightLabel",children:"Add Assignment"})]}),e.jsx("hr",{className:"",style:{marginTop:"-3px"}}),e.jsx("div",{className:"offcanvas-body pt-0",children:e.jsx(ba,{})})]}),F&&e.jsx(e.Fragment,{children:e.jsxs("div",{className:"offcanvas offcanvas-end",tabindex:"-1",id:"staticBackdrop101","aria-labelledby":"offcanvasRightLabel",ref:De,children:[e.jsxs("div",{className:"offcanvas-header",children:[e.jsx(B,{"data-bs-dismiss":"offcanvas",children:e.jsx("img",{src:"/images/Vector (13).svg",alt:""})}),e.jsx("h5",{className:"offcanvas-title heading-16",id:"offcanvasRightLabel",children:"Edit Assignment"})]}),e.jsx("hr",{className:"",style:{marginTop:"-3px"}}),e.jsxs("div",{className:"offcanvas-body pt-0  ",children:[e.jsxs("div",{class:"mb-3",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Title"}),e.jsx("input",{type:"email",class:"form-control form-control-sm",value:g,onChange:a=>Je(a.target.value),id:"exampleFormControlInput1",placeholder:"Select Title"})]}),e.jsx("div",{className:"pt-1",children:c&&e.jsx("p",{className:"ms-1",style:{color:"red",fontSize:"14px",marginTop:"-18px"},children:"Valid title is required"})}),e.jsxs("div",{className:"mb-1  ",children:[e.jsx("label",{for:"exampleFormControlInput1",className:"form-label  heading-16",children:"Class"}),e.jsxs("select",{class:"form-select  form-select-sm form-focus  label-color",value:`${h},${_}`,onChange:ta,"aria-label":"Default select example",children:[e.jsx("option",{selected:!0,children:"--Choose--"}),Z==null?void 0:Z.map(a=>e.jsx("option",{value:`${a.classId},${a.classNo}`,children:a.classNo}))]})]}),e.jsxs("div",{className:"mb-1  ",children:[e.jsx("label",{for:"exampleFormControlInput1",className:"form-label   heading-16",children:"Section"}),e.jsxs("select",{class:"form-select  form-select-sm form-focus   label-color",value:V,onChange:a=>N(a.target.value),"aria-label":"Default select example",children:[e.jsx("option",{selected:!0,children:"--Choose--"}),O==null?void 0:O.map(a=>e.jsx("option",{value:a.sectionId,children:a.sectionName}))]})]}),e.jsxs("div",{className:"mb-1  ",children:[e.jsx("label",{for:"exampleFormControlInput1",className:"form-label  heading-16",children:"Subject"}),e.jsxs("select",{class:"form-select  form-select-sm form-focus  label-color",value:b,onChange:a=>K(a.target.value),"aria-label":"Default select example",children:[e.jsx("option",{selected:!0,children:"--Choose--"}),W==null?void 0:W.map(a=>e.jsx("option",{value:a.subjectId,children:a.subjectName}))]})]}),e.jsxs("div",{className:"mb-1  ",children:[e.jsx("label",{for:"exampleFormControlInput1",className:"form-label  heading-16",children:"Teacher"}),e.jsxs("select",{class:"form-select  form-select-sm form-focus  label-color",value:ae,onChange:a=>te(a.target.value),"aria-label":"Default select example",children:[e.jsx("option",{selected:!0,children:"--Choose--"}),$==null?void 0:$.map(a=>e.jsx("option",{value:a.subjectId,children:a.staffName}))]})]}),e.jsxs("div",{class:"mb-3",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Total Marks"}),e.jsx("input",{type:"email",class:"form-control form-control-sm",id:"exampleFormControlInput1",value:q,onChange:a=>Ke(a.target.value),placeholder:"Select Title"})]}),e.jsx("div",{className:"pt-1",children:o&&e.jsx("p",{className:"ms-1",style:{color:"red",fontSize:"14px",marginTop:"-18px"},children:"Valid marks is required"})}),e.jsxs("div",{class:"mb-3",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Start Day"}),e.jsx("input",{type:"date",class:"form-control form-control-sm",id:"exampleFormControlInput1",value:w,onChange:a=>ea(a.target.value),placeholder:"Select Class"})]}),e.jsx("div",{className:"pt-1",children:Se&&e.jsx("p",{className:"ms-1",style:{color:"red",fontSize:"14px",marginTop:"-18px"},children:"Valid start date is required"})}),e.jsxs("div",{class:"mb-3",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"End Day"}),e.jsx("input",{type:"date",class:"form-control form-control-sm",id:"exampleFormControlInput1",value:T,onChange:a=>aa(a.target.value),placeholder:"Select Class"})]}),e.jsx("div",{className:"pt-1",children:Xe&&e.jsx("p",{className:"ms-1",style:{color:"red",fontSize:"14px",marginTop:"-18px"},children:"Valid end date is required"})}),e.jsxs("div",{class:"mb-3",children:[e.jsx("label",{for:"exampleFormControlInput1",class:"form-label heading-16",children:"Assignment Upload "}),e.jsx("input",{type:"file",class:"form-control form-control-sm",id:"exampleFormControlInput1",onChange:a=>he(a.target.value),placeholder:"Select Class"})]}),e.jsxs("div",{className:"mb-1  ",children:[e.jsx("label",{for:"exampleFormControlInput1",className:"form-label  heading-16",children:"Status"}),e.jsxs("select",{class:"form-select  form-select-sm form-focus  label-color",value:ne,onChange:a=>re(a.target.value),"aria-label":"Default select example",children:[e.jsx("option",{children:"--Choose--"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"inactive",children:"InActive"})]})]}),e.jsxs("div",{className:"my-button11 ",children:[e.jsx("button",{type:"button",className:"btn btn-outline-success heading-16 btn-bgAndColor",onClick:ra,children:"Update Assignment"}),e.jsx("button",{type:"button",className:"btn btn-outline-success heading-16",children:"Cancel"})]})]})]})}),me&&e.jsx("div",{className:"offcanvas offcanvas-end",tabindex:"-1",id:"offcanvasRight22","aria-labelledby":"offcanvasRightLabel",ref:Ie,children:e.jsxs("div",{className:"container-fluid",children:[e.jsxs("div",{className:"offcanvas-header p-0 pt-3",children:[e.jsx(B,{"data-bs-dismiss":"offcanvas",className:"ps-3",children:e.jsx("img",{src:"/images/Vector (13).svg",alt:""})}),e.jsx("h5",{className:"offcanvas-title pe-3 heading-16",id:"offcanvasRightLabel",children:"Delete Section"})]}),e.jsx("hr",{className:""}),e.jsx("div",{className:"offcanvas-body",children:e.jsx("div",{className:"sure-main-container mt-4",children:e.jsxs("div",{className:"sure-container",children:[e.jsx("div",{children:e.jsxs("svg",{width:"60",height:"60",viewBox:"0 0 60 60",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M29.5312 0.46875C13.2656 0.46875 0 13.7344 0 30C0 46.2656 13.2656 59.5312 29.5312 59.5312C45.7969 59.5312 59.0625 46.2656 59.0625 30C59.0625 13.7344 45.7969 0.46875 29.5312 0.46875ZM29.5312 55.7812C15.3281 55.7812 3.75 44.2031 3.75 30C3.75 15.7969 15.3281 4.21875 29.5312 4.21875C43.7344 4.21875 55.3125 15.7969 55.3125 30C55.3125 44.2031 43.7344 55.7812 29.5312 55.7812Z",fill:"#B50000"}),e.jsx("path",{d:"M31.4062 25.5469H27.6562V44.2969H31.4062V25.5469Z",fill:"#B50000"}),e.jsx("path",{d:"M31.4062 16.6406H27.6562V20.3906H31.4062V16.6406Z",fill:"#B50000"})]})}),e.jsxs("div",{className:"sure-content mt-2",children:[e.jsx("h5",{className:"heading-20",children:"Are you sure?"}),e.jsxs("p",{children:["This Action will be permanently ",e.jsx("br",{})," delete the Profile Data"]})]}),e.jsxs("div",{className:"form-check mt-1",children:[e.jsx("input",{className:"form-check-input my-form-check-input",onClick:()=>v(!E),type:"checkbox",value:"",id:"flexCheckDefault"}),e.jsx("label",{className:"form-check-label agree",for:"flexCheckDefault",children:"I Agree to delete the Profile Data"})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx("button",{type:"button",className:"btn my-btn  button00 my-button112233RedDelete",disabled:!E,onClick:()=>oa(A),children:"Delete"}),e.jsx("button",{type:"button",className:"btn cancel-btn ms-2","data-bs-dismiss":"offcanvas","aria-label":"Close",children:"Cancel"})]})]})})})]})})]})]})},ya=Object.freeze(Object.defineProperty({__proto__:null,default:ja},Symbol.toStringTag,{value:"Module"}));export{ja as A,ba as a,ya as b};
