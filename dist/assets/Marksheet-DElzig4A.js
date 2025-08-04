import{u as O,r as c,E as U,U as q,j as e,D as J,R as Q,I as y,ah as X,_ as B}from"./index-DHII64NA.js";const Y=O.div`

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
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
    
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
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
    
    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px ;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

`,ee=()=>{const[D,r]=c.useState(!1),E=sessionStorage.getItem("token"),[I,P]=c.useState([]),[A,m]=c.useState(!1),[M,F]=c.useState(1),[f,G]=c.useState(1),[x,R]=c.useState(1),[b,Z]=c.useState(10),[i,v]=c.useState(""),[j,N]=c.useState(""),[p,C]=c.useState(""),[h,W]=c.useState([]),[S,k]=c.useState([]);c.useState([]);const[u,L]=c.useState([]),[g,V]=c.useState("percentGrade");c.useEffect(()=>{z(),K(),i&&T(i)},[E,x,i]);const H=a=>{R(a.selected+1)},z=async()=>{var o,l,n,s;r(!0);try{var a=await U();(a==null?void 0:a.status)===200?((o=a==null?void 0:a.data)==null?void 0:o.status)==="success"&&(r(!1),W((l=a==null?void 0:a.data)==null?void 0:l.classes)):r(!1)}catch(d){r(!1),r(!1),((s=(n=d==null?void 0:d.response)==null?void 0:n.data)==null?void 0:s.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},K=async()=>{var a,o,l,n;r(!0);try{const s=await q("",x,b);(s==null?void 0:s.status)===200&&((a=s==null?void 0:s.data)==null?void 0:a.status)==="success"?(r(!1),L((o=s==null?void 0:s.data)==null?void 0:o.data)):r(!1)}catch(s){r(!1),r(!1),((n=(l=s==null?void 0:s.response)==null?void 0:l.data)==null?void 0:n.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},T=a=>{const o=a;v(o);const l=h.find(n=>n.classNo===o);k(l?l.section||[]:[])},_=async()=>{var a,o,l,n,s,d;try{m(!0),r(!0);const t=await X(j,i,p,"",x,b);(t==null?void 0:t.status)===200?((a=t==null?void 0:t.data)==null?void 0:a.status)==="success"?(r(!1),P((o=t==null?void 0:t.data)==null?void 0:o.marksheets),G((l=t==null?void 0:t.data)==null?void 0:l.totalPages),F((n=t==null?void 0:t.data)==null?void 0:n.currentPage)):(r(!1),m(!1),B.error((s=t==null?void 0:t.data)==null?void 0:s.message)):(r(!1),m(!1),B.error((d=t==null?void 0:t.data)==null?void 0:d.message))}catch(w){r(!1),r(!1),m(!1),console.error("Error During Get Marksheet",w)}};return e.jsxs(Y,{children:[D&&e.jsx(J,{}),e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"row p-4",children:[e.jsxs("div",{className:"row pb-3",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/ExamTerm",className:"bredcrumText text-decoration-none",children:"Exam Term"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Marksheet"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Marksheet"})]}),e.jsx("div",{className:"row pb-3",children:e.jsxs("div",{className:"bg-white rounded-2 p-4",children:[e.jsxs("form",{className:"row g-3",children:[e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"inputEmail4",className:"form-label font14",children:"Class"}),e.jsxs("select",{className:"form-select borderRadius5 font14","aria-label":"Default select example",value:i,onChange:a=>T(a.target.value),children:[e.jsx("option",{value:"",children:"--- Choose ---"}),h==null?void 0:h.map((a,o)=>e.jsx("option",{value:a==null?void 0:a.classNo,children:a.classNo},a.classId))]})]}),e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"inputEmail4",className:"form-label font14",children:"Section"}),e.jsxs("select",{className:"form-select borderRadius5 font14","aria-label":"Default select example",value:j,onChange:a=>N(a.target.value),children:[e.jsx("option",{value:"",children:"--- Choose ---"}),S.length>0?S.map(a=>e.jsx("option",{value:a.sectionName,children:a.sectionName},a.classSecId)):e.jsx("option",{value:"",disabled:!0,children:i?"-- No Sections Found --":"-- Select Class First --"})]})]}),e.jsxs("div",{className:"col-md-4 col-sm-6 col-12",children:[e.jsx("label",{htmlFor:"inputEmail4",className:"form-label font14",children:"Exam Term"}),e.jsxs("select",{className:"form-select borderRadius5 font14","aria-label":"Default select example",value:p,onChange:a=>C(a.target.value),children:[e.jsx("option",{value:"",children:"Select an Exam Term"}),u==null?void 0:u.map(a=>e.jsx("option",{value:a==null?void 0:a.examTermId,children:a.examTermName},a.examTermId))]})]}),e.jsxs("p",{className:"text-center p-3",children:[e.jsx("button",{type:"button",className:"btn updateButtons text-white",onClick:_,children:"Search"}),e.jsx("button",{type:"button",className:"btn cancelButtons ms-3",onClick:()=>{v(""),N(""),C(""),m(!1)},children:"Cancel"})]})]}),e.jsx("div",{className:"row",children:A?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"d-flex col-3",children:e.jsxs("select",{className:"form-select borderRadius5 font14 ","aria-label":"Default select example",onChange:a=>V(a.target.value),children:[e.jsx("option",{value:"",disabled:!0,children:" -- Select View Mode -- "}),e.jsx("option",{value:"percent",children:"Percent"}),e.jsx("option",{value:"grade",children:"Grade"}),e.jsx("option",{value:"percentGrade",selected:!0,children:"Percent-Grade"})]})}),e.jsx("div",{className:"overflow-scroll cardradius bg-white p-3",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"font14 textWrapClass",children:"#"}),e.jsx("th",{className:"font14 textWrapClass",children:"Marksheet title"})]})}),e.jsx("tbody",{children:I.map((a,o)=>e.jsxs("tr",{className:"my-bg-color align-middle",children:[e.jsx("th",{className:"textWrapClass greyText font14",children:e.jsx("h3",{children:o+1})}),e.jsx("td",{className:"textWrapClass greyText font14",children:e.jsx("h3",{children:a.studentName})}),a.subjects.map(l=>e.jsx("td",{className:"textWrapClass greyText font14 text-center",children:l.marks===null?"-":g==="percentGrade"?e.jsxs(e.Fragment,{children:[" ",l.marks," | ",l.grade," "]}):g==="percent"?e.jsxs(e.Fragment,{children:[" ",l.marks," "]}):g==="grade"?e.jsxs(e.Fragment,{children:[" ",l.grade," "]}):""}))]},a.studentId))})]})}),e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",M," of ",f," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(Q,{previousLabel:e.jsx(y,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(y,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:f,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:H,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):e.jsx("div",{className:"d-flex justify-content-center p-5",children:e.jsx("img",{src:"/images/search.svg",alt:"Search",className:"img-fluid"})})})]})})]})})]})};export{ee as default};
