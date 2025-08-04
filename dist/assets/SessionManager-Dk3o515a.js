import{u as pa,r as l,a7 as ya,j as a,R as Ea,I as U,L as k,D as I,b6 as ka,_ as n,b7 as Ia,b8 as Aa,b9 as Ta,ba as Pa}from"./index-DHII64NA.js";import{A as Fa}from"./ActionControls-BF7LUwxs.js";import{O as f}from"./bootstrap.esm-CBxLh-YC.js";const La=pa.div`

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
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

    .activeSession{
        background-color: var(--activebglightgreen);
    }

    .orangeText{
        color: var(--activeOrangeBorder);
    }
    
    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px ;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
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
    
    .contbtn{
        margin-left: 43% !important;
        margin-top: -20% !important;
    }


`,Ua=()=>{const G=sessionStorage.getItem("token"),[N,x]=l.useState(!1),[q,K]=l.useState(),[Y,J]=l.useState(),[b,Q]=l.useState([]),[A,_a]=l.useState(""),[S,T]=l.useState(""),[D,C]=l.useState(""),[w,B]=l.useState(""),[P,p]=l.useState(""),[F,y]=l.useState(""),[L,_]=l.useState(""),[X,Z]=l.useState(""),[V,H]=l.useState(""),[aa,ta]=l.useState(""),[W,ea]=l.useState(""),[O,sa]=l.useState(""),[la,ca]=l.useState(""),[ia,da]=l.useState(""),[E,M]=l.useState(),[ra,j]=l.useState(!0),[na,Va]=l.useState(1),[R,Ha]=l.useState(1),[z,oa]=l.useState(1),[ma,Wa]=l.useState(5),[ha,Oa]=l.useState("");l.useEffect(()=>{u()},[G,z]);const xa=t=>{oa(t.selected+1)},fa=t=>{const s=new Date(t.target.value).toISOString().split("T")[0];C(s),p("")},ba=t=>{const s=new Date(t.target.value).toISOString().split("T")[0];B(s),y("")},ga=t=>{const s=new Date(t.target.value).toISOString().split("T")[0];_(s),ea(""),j(s===X)},ua=t=>{const s=new Date(t.target.value).toISOString().split("T")[0];H(s),sa(""),j(s===aa)},u=async()=>{var e,s,c,i,r,h,d,o,m,v;try{var t=await ya(z,ma);(t==null?void 0:t.status)===200&&((e=t==null?void 0:t.data)==null?void 0:e.status)==="success"&&(Q((s=t==null?void 0:t.data)==null?void 0:s.sessions),K((i=(c=t==null?void 0:t.data)==null?void 0:c.activeSession)==null?void 0:i.currentYear),J((h=(r=t==null?void 0:t.data)==null?void 0:r.activeSession)==null?void 0:h.sessionId),T((o=(d=t==null?void 0:t.data)==null?void 0:d.activeSession)==null?void 0:o.sessionId))}catch(g){x(!1),x(!1),((v=(m=g==null?void 0:g.response)==null?void 0:m.data)==null?void 0:v.statusCode)===401&&(sessionStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},va=async t=>{var s,c,i,r,h,d,o,m,v,g,$;try{ca(t);var e=await ka(t);(e==null?void 0:e.status)===200?((s=e==null?void 0:e.data)==null?void 0:s.status)==="success"?(_((i=(c=e==null?void 0:e.data)==null?void 0:c.session)==null?void 0:i.startDate),H((h=(r=e==null?void 0:e.data)==null?void 0:r.session)==null?void 0:h.endDate),Z((o=(d=e==null?void 0:e.data)==null?void 0:d.session)==null?void 0:o.startDate),ta((v=(m=e==null?void 0:e.data)==null?void 0:m.session)==null?void 0:v.endDate)):n.error((g=e==null?void 0:e.data)==null?void 0:g.message):n.error(($=e==null?void 0:e.data)==null?void 0:$.message)}catch{x(!1)}},ja=async()=>{var e,s,c,i,r,h;if(Da())try{const d=new FormData;d.append("startDate",D),d.append("endDate",w);var t=await Ia(d);if((t==null?void 0:t.status)===200)if(((e=t==null?void 0:t.data)==null?void 0:e.status)==="success"){n.success((s=t==null?void 0:t.data)==null?void 0:s.message);const o=document.getElementById("Add_staticBackdrop");if(o){let m=f.getInstance(o);m||(m=new f(o)),m.hide()}u(),C(""),B("")}else n.error((c=t==null?void 0:t.data)==null?void 0:c.message);else n.error((i=t==null?void 0:t.data)==null?void 0:i.message)}catch(d){x(!1),n.error((h=(r=d==null?void 0:d.response)==null?void 0:r.data)==null?void 0:h.message)}},Na=async()=>{var e,s;try{var t=await Aa(S);(t==null?void 0:t.status)===200&&((e=t==null?void 0:t.data)==null?void 0:e.status)==="success"&&(n.success((s=t==null?void 0:t.data)==null?void 0:s.message),u())}catch{x(!1)}},Sa=async()=>{var e,s;try{const c=new FormData;c.append("startDate",L),c.append("endDate",V);var t=await Ta(la,c);if((t==null?void 0:t.status)===200&&((e=t==null?void 0:t.data)==null?void 0:e.status)==="success"){n.success((s=t==null?void 0:t.data)==null?void 0:s.message),u();const i=document.getElementById("Edit_staticBackdrop");if(i){let r=f.getInstance(i);r||(r=new f(i)),r.hide()}}}catch{x(!1)}},Da=()=>{let t=!0;return D?p(""):(p("* This Field is required"),t=!1),w?y(""):(y("* This Field is required"),t=!1),t},Ca=async t=>{var s;if(E)try{var e=await Pa(t);if((e==null?void 0:e.status)===200){if(e.data.status==="success"){n.success((s=e==null?void 0:e.data)==null?void 0:s.message),u();const c=document.getElementById("Delete_staticBackdrop");if(c){let i=f.getInstance(c);i||(i=new f(c)),i.hide()}}}else n.error(e==null?void 0:e.error)}catch(c){x(!1),console.error("Error during delete:",c)}},wa=()=>{getAllPlans(ha)},Ba=()=>{const t=document.getElementById("Add_staticBackdrop");new f(t).show()};return a.jsxs(La,{children:[a.jsxs("div",{className:"container-fluid p-4",children:[a.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[a.jsxs("div",{className:"col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ",children:[a.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:a.jsxs("ol",{className:"breadcrumb mb-1",children:[a.jsx("li",{className:"breadcrumb-item",children:a.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),a.jsx("li",{className:"breadcrumb-item",children:a.jsx("a",{href:"/schoolSetting",className:"bredcrumText text-decoration-none",children:"Settings"})}),a.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Session Manager"})]})}),a.jsx("p",{className:"font16 ps-0 fontWeight500",children:"Session Manager"})]}),a.jsx("div",{className:"col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0",children:a.jsx(Fa,{showAddButton:!0,addButtonText:"Add Session",addButtonAction:Ba,showSearch:!0,searchAction:wa,showExportPDF:!1,exportPDFText:"Export PDF",exportPDFAction:"",exportPDFFileName:"Sessions.pdf",showExportCSV:!1,exportCSVText:"Export CSV",exportCSVAction:"",exportCSVFileName:"Sessions.xlsx"})})]}),a.jsx("div",{className:"row pb-3",children:a.jsxs("div",{className:"cardradius bg-white p-3",children:[a.jsxs("p",{className:"activeSession font18 p-2 ps-3 fontWeight500",children:["Active session - ",a.jsx("small",{className:"font18 orangeText fontWeight500",children:q})]}),a.jsxs("form",{action:"",className:"row",children:[a.jsxs("div",{className:"mb-3 mt-3",children:[a.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"Session*"}),a.jsxs("select",{className:`form-select font14 ${A?"border-1 border-danger":""} `,value:S,"aria-label":"Default select example",onChange:t=>T(t.target.value),disabled:!b.length>0,children:[a.jsx("option",{children:"--- Choose ---"}),b==null?void 0:b.map(t=>a.jsx("option",{value:t.sessionId,children:t.sessionName},t.sessionId))]}),a.jsx("span",{className:"text-danger",children:A})]}),a.jsx("p",{className:"text-center m-3",children:a.jsx("button",{className:"btn addButtons text-white",type:"button",disabled:S===Y,onClick:Na,children:" Active"})})]}),b.length>0?a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"overflow-scroll",children:a.jsxs("table",{className:"table align-middle table-striped",children:[a.jsx("thead",{children:a.jsxs("tr",{children:[a.jsx("th",{className:"textWrapClass",children:a.jsx("h2",{children:"#"})}),a.jsx("th",{className:"textWrapClass",children:a.jsx("h2",{children:"Session title"})}),a.jsx("th",{className:"textWrapClass",children:a.jsx("h2",{children:"Status"})}),a.jsx("th",{className:"textWrapClass text-center",children:a.jsx("h2",{children:"Action"})})]})}),a.jsx("tbody",{children:b.map((t,e)=>a.jsxs("tr",{className:"my-bg-color align-middle",children:[a.jsx("th",{className:"textWrapClass greyText",children:a.jsx("h3",{children:e+1})}),a.jsx("td",{className:"textWrapClass greyText",children:a.jsx("h3",{children:t.sessionName})}),a.jsx("td",{className:"textWrapClass greyText",children:t.status?a.jsx("h3",{className:"activeText",children:"Active"}):a.jsx("h3",{className:"deactiveText",children:"InActive"})}),a.jsx("td",{className:"textWrapClass text-center",children:a.jsxs("div",{className:"dropdown dropdownbtn",children:[a.jsx("button",{className:"btn btn-sm actionButtons dropdown-toggle",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false",children:a.jsx("span",{children:"Action"})}),a.jsxs("ul",{className:"dropdown-menu",children:[a.jsx("li",{children:a.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Edit_staticBackdrop","aria-controls":"Edit_staticBackdrop",onClick:()=>va(t.sessionId),children:"Edit"})}),a.jsx("li",{children:a.jsx("button",{className:"dropdown-item greyText",type:"button","data-bs-toggle":"offcanvas","data-bs-target":"#Delete_staticBackdrop","aria-controls":"Delete_staticBackdrop",onClick:()=>da(t.sessionId),children:"Delete"})})]})]})})]},t.sessionId))})]})}),a.jsxs("div",{className:"d-flex",children:[a.jsxs("p",{className:"font14",children:["Showing ",na," of ",R," Pages"]}),a.jsx("div",{className:"ms-auto",children:a.jsx(Ea,{previousLabel:a.jsx(U,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:a.jsx(U,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:R,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:xa,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):a.jsx("div",{className:"h-100 text-center m-5",children:a.jsx("img",{src:"/images/search.svg",style:{height:"30vh"}})})]})})]}),a.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Add_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[a.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-1",children:[a.jsx(k,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:a.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),a.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Add Session"})]}),a.jsxs("div",{className:"offcanvas-body p-0",children:[N&&a.jsx(I,{}),a.jsxs("div",{className:"p-3",style:{zIndex:-1},children:[a.jsxs("form",{children:[a.jsxs("div",{className:"mb-3",children:[a.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"Start Date*"}),a.jsx("input",{className:`form-control font14 ${P?"border-1 border-danger":""}`,value:D,type:"date",onChange:t=>fa(t),min:"1970-04-01"}),a.jsx("span",{className:"text-danger",children:P})]}),a.jsxs("div",{className:"mb-3",children:[a.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"End Date*"}),a.jsx("input",{className:`form-control font14 ${F?"border-1 border-danger":""}`,value:w,type:"date",onChange:t=>ba(t),min:"1970-04-01"}),a.jsx("span",{className:"text-danger",children:F})]})]}),a.jsxs("p",{className:"text-center p-3",children:[a.jsx("button",{className:"btn addButtons text-white",onClick:ja,children:"Create"}),a.jsx("button",{className:"btn cancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:()=>{B(""),C("")},children:"Cancel"})]})]})]})]}),a.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Edit_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[a.jsxs("div",{className:"offcanvas-header border-bottom border-2 p-1",children:[a.jsx(k,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:a.jsx("path",{fill:"#008479",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),a.jsx("h2",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Session Edit"})]}),a.jsxs("div",{className:"offcanvas-body p-0",children:[N&&a.jsx(I,{}),a.jsxs("div",{className:"p-3",style:{zIndex:-1},children:[a.jsxs("form",{children:[a.jsxs("div",{className:"mb-3",children:[a.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"Start Date*"}),a.jsx("input",{className:`form-control font14 ${W?"border-1 border-danger":""}`,type:"date",value:L,onChange:t=>ga(t),min:"1970-04-01"}),a.jsx("span",{className:"text-danger",children:W})]}),a.jsxs("div",{className:"mb-3",children:[a.jsx("label",{htmlFor:"validationDefault02",className:"form-label font14",children:"End Date*"}),a.jsx("input",{className:`form-control font14 ${O?"border-1 border-danger":""}`,type:"date",value:V,onChange:t=>ua(t),min:"1970-04-01"}),a.jsx("span",{className:"text-danger",children:O})]})]}),a.jsxs("p",{className:"text-center p-3",children:[a.jsx("button",{className:"btn addButtons text-white",onClick:Sa,disabled:ra,children:"Update"}),a.jsx("button",{className:"btn cancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",children:"Cancel"})]})]})]})]}),a.jsxs("div",{className:"offcanvas offcanvas-end p-2","data-bs-backdrop":"static",tabIndex:"-1",id:"Delete_staticBackdrop","aria-labelledby":"staticBackdropLabel",children:[a.jsxs("div",{className:"offcanvas-header ps-0 modalHighborder p-1",children:[a.jsx(k,{type:"button","data-bs-dismiss":"offcanvas","aria-label":"Close",children:a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"2em",height:"2em",viewBox:"0 0 16 16",children:a.jsx("path",{fill:"#B50000",fillRule:"evenodd",d:"M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"})})}),a.jsx("span",{className:"offcanvas-title",id:"staticBackdropLabel",children:"Session"})]}),a.jsxs("div",{className:"offcanvas-body p-0",children:[N&&a.jsx(I,{}),a.jsxs("div",{className:"",style:{zIndex:-1},children:[a.jsx("p",{className:"modalLightBorder p-2",children:"Session"}),a.jsxs("p",{className:"text-center p-3",children:[" ",a.jsx("img",{src:"/images/errorI.svg",className:"img-fluid",alt:""})]}),a.jsx("p",{className:"text-center warningHeading",children:"Are you Sure?"}),a.jsxs("p",{className:"text-center greyText warningText pt-2",children:["This Action will be permanently delete",a.jsx("br",{}),"the Session Manager Data"]}),a.jsxs("p",{className:"text-center warningText p-2",children:[a.jsx("input",{className:"form-check-input formdltcheck me-2",type:"checkbox",checked:E,id:"flexCheckChecked",onChange:t=>M(t.target.checked)}),"I Agree to delete the Session Manager Data"]}),a.jsxs("p",{className:"text-center p-3",children:[a.jsx("button",{className:"btn deleteButtons text-white",disabled:!E,onClick:()=>Ca(ia),children:"Delete"}),a.jsx("button",{className:"btn dltcancelButtons ms-3","data-bs-dismiss":"offcanvas","aria-label":"Close",onClick:()=>M(!1),children:"Cancel"})]})]})]})]})]})};export{Ua as default};
