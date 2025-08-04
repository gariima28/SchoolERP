import{u as k,r as l,bb as P,j as e,L as m,I as i,R as A,c as B,bc as H,_ as h}from"./index-DHII64NA.js";const F=k.div`

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .table-striped>tbody>tr:nth-of-type(odd)>* {
      --bs-table-bg-type: var(--tableGreyBackgroundColor);
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

    .table222>.tableHead{
        --bs-table-bg: var(--tableGreyBackgroundColor) !important;
    }
    
`,G=()=>{const j=localStorage.getItem("token"),[g,N]=l.useState(!1),[s,b]=l.useState(),[n,u]=l.useState([]),[d,f]=l.useState([]),[p,v]=l.useState(""),[y,I]=l.useState(1),[x,L]=l.useState(1),[R,T]=l.useState(1);l.useState(5),l.useEffect(()=>{w()},[j]);const C=a=>{T(a.selected+1)},w=async()=>{var t,r;try{var a=await P("","","");(a==null?void 0:a.status)===200&&b(a==null?void 0:a.data)}catch(c){setloaderState(!1),setloaderState(!1),((r=(t=c==null?void 0:c.response)==null?void 0:t.data)==null?void 0:r.statusCode)===401&&(localStorage.removeItem("token"),setTimeout(()=>{navigate("/")},200))}},S=async()=>{var t,r,c,o;try{var a=await H();(a==null?void 0:a.status)===200&&(N(!0),((t=a==null?void 0:a.data)==null?void 0:t.status)==="success"?(u((r=a==null?void 0:a.data)==null?void 0:r.plans),h.success((c=a==null?void 0:a.data)==null?void 0:c.message)):h.error((o=a==null?void 0:a.data)==null?void 0:o.message))}catch{setloaderState(!1),setloaderState(!1)}};return e.jsxs(F,{children:[e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"row p-2 pt-4",children:[e.jsxs("div",{className:"row pb-3",children:[e.jsxs("div",{className:"col-lg-6 col-md-6 col-sm-12 flex-frow-1",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/schoolSetting",className:"bredcrumText text-decoration-none",children:"Settings"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Subscription"})]})}),e.jsx("p",{className:"font16 ps-0 fontWeight500",children:"Subscription"})]}),e.jsx("div",{className:"col-lg-6 col-md-6 col-sm-12 text-end"})]}),e.jsx("div",{className:"row pb-3",children:e.jsx("div",{className:"cardradius bg-white p-3",children:g?e.jsx(e.Fragment,{children:n.length>0?e.jsxs(e.Fragment,{children:[e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"tableHeading text-center",children:e.jsx("span",{className:"font14",children:"#"})}),e.jsx("th",{className:"tableHeading ",children:e.jsx("span",{className:"font14",children:"Package"})}),e.jsx("th",{className:"tableHeading ",children:e.jsxs("span",{className:"font14",children:["Price ",e.jsx("img",{src:"/images/StatusArrow.svg",alt:""})]})}),e.jsx("th",{className:"tableHeading ",children:e.jsxs("span",{className:"font14",children:["Interval ",e.jsx("img",{src:"/images/StatusArrow.svg",alt:""})]})}),e.jsx("th",{className:"tableHeading ",children:e.jsxs("span",{className:"font14",children:["Period ",e.jsx("img",{src:"/images/StatusArrow.svg",alt:""})]})}),e.jsx("th",{className:"tableHeading ",children:e.jsxs("span",{className:"font14",children:["Student Limit ",e.jsx("img",{src:"/images/StatusArrow.svg",alt:""})]})}),e.jsx("th",{className:"tableHeading ",children:e.jsx("span",{className:"font14",children:"Feature Details"})}),e.jsx("th",{className:"tableHeading ",children:e.jsxs("span",{className:"font14",children:["Status ",e.jsx("img",{src:"/images/StatusArrow.svg",alt:""})]})}),e.jsx("th",{className:"tableHeading text-center",children:e.jsx("span",{className:"font14"})})]})}),e.jsx("tbody",{children:n==null?void 0:n.map((a,t)=>e.jsxs("tr",{children:[e.jsx("th",{className:"text-center greyText",children:e.jsx("span",{className:"font14",children:t+1})}),e.jsx("td",{className:"greyText",children:e.jsx("span",{className:"font14 align-self-start",children:a==null?void 0:a.planName})}),e.jsx("td",{className:"greyText",children:e.jsx("span",{className:"font14 align-self-start",children:a==null?void 0:a.price})}),e.jsx("td",{className:"greyText",children:e.jsx("span",{className:"font14 align-self-start",children:a==null?void 0:a.type})}),e.jsx("td",{className:"greyText",children:e.jsx("span",{className:"font14 align-self-start",children:a==null?void 0:a.value})}),e.jsx("td",{className:"greyText",children:e.jsx("span",{className:"font14 align-self-start",children:a==null?void 0:a.studentLimit})}),e.jsx("td",{className:"greyText",children:(a==null?void 0:a.usedAddons)===null?"-":e.jsxs("p",{className:"font14 align-self-start m-0","data-bs-toggle":"modal","data-bs-target":"#viewSubscriptionFeature","data-bs-backdrop":"false",children:[e.jsx(m,{className:"blueText text-decoration-none",to:"",onClick:()=>{f(a==null?void 0:a.usedAddons),v(a==null?void 0:a.planName)},children:"View Features"}),e.jsx(i,{className:"ms-2 ",icon:"bi:info-circle-fill",width:"1.2em",height:"1.2em",style:{color:"#8F8F8F"}})]})}),e.jsx("td",{className:"greyText",children:e.jsx("span",{className:"font14 align-self-start active",children:"Active"})}),e.jsx("td",{className:"text-center",children:e.jsx(m,{className:"btn addButtons text-white",to:"/admin/settings/paymentSettings",children:e.jsx("span",{className:"font14",children:"Book Now"})})})]}))})]}),e.jsxs("div",{className:"d-flex",children:[e.jsxs("p",{className:"font14",children:["Showing ",y," of ",x," Pages"]}),e.jsx("div",{className:"ms-auto",children:e.jsx(A,{previousLabel:e.jsx(i,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:e.jsx(i,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:x,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:C,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-scroll",children:e.jsxs("table",{className:"table table222 align-middle border",children:[e.jsx("thead",{className:"tableHead",children:e.jsxs("tr",{children:[e.jsx("td",{className:"tableHeading",children:e.jsx("span",{className:"font14",children:"Current Plan"})}),e.jsx("td",{className:"tableHeading"}),e.jsx("td",{className:"tableHeading"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{className:"greyText text-start",children:e.jsx("span",{className:"font14",children:"Plan"})}),e.jsx("td",{className:"greyText text-center",children:e.jsx("span",{className:"font14",children:"-"})}),e.jsx("td",{className:"greyText text-end",children:e.jsx("span",{className:"font14",children:s==null?void 0:s.plan})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"greyText text-start",children:e.jsx("span",{className:"font14",children:"Valid"})}),e.jsx("td",{className:"greyText text-center",children:e.jsx("span",{className:"font14",children:"-"})}),e.jsx("td",{className:"greyText text-end",children:e.jsx("span",{className:"font14",children:s==null?void 0:s.valid})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"greyText text-start",children:e.jsx("span",{className:"font14",children:"Total Students"})}),e.jsx("td",{className:"greyText text-center",children:e.jsx("span",{className:"font14",children:"-"})}),e.jsx("td",{className:"greyText text-end",children:e.jsx("span",{className:"font14",children:s==null?void 0:s.totalStudent})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"greyText text-start",children:e.jsx("span",{className:"font14",children:"Subscription Purchase Date"})}),e.jsx("td",{className:"greyText text-center",children:e.jsx("span",{className:"font14",children:"-"})}),e.jsx("td",{className:"greyText text-end",children:e.jsx("span",{className:"font14",children:s==null?void 0:s.purchaseDate.split("T")[0]})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"greyText text-start",children:e.jsx("span",{className:"font14",children:"Subscription Renew Date"})}),e.jsx("td",{className:"greyText text-center",children:e.jsx("span",{className:"font14",children:"-"})}),e.jsx("td",{className:"greyText text-end",children:e.jsx("span",{className:"font14",children:(s==null?void 0:s.renewDate)||"-"})})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"greyText text-start",children:e.jsx("span",{className:"font14",children:"Amount To Be Charged"})}),e.jsx("td",{className:"greyText text-center",children:e.jsx("span",{className:"font14",children:"-"})}),e.jsx("td",{className:"greyText text-end",children:e.jsx("span",{className:"font14",children:s==null?void 0:s.amount})})]})]})]})}),e.jsx("div",{className:"overflow-scroll",children:e.jsx("p",{className:"text-center m-md-5 mt-3 mb-3",children:e.jsx("button",{className:"btn ps-0 pe-0 addCategoryButtons text-white",type:"button",onClick:S,children:e.jsx("span",{className:"font14 textVerticalCenter",children:"Update Subscription"})})})})]})})})]})}),e.jsx("div",{className:"modal fade",id:"viewSubscriptionFeature",tabindex:"-1","aria-labelledby":"viewSubscriptionFeatureLabel","aria-hidden":"true",role:"dialog","data-bs-keyboard":"false","data-bs-backdrop":"static",children:e.jsx("div",{className:"modal-dialog modal-dialog-centered",children:e.jsxs("div",{className:"modal-content",children:[e.jsxs("div",{className:"modal-header",children:[e.jsx("p",{className:"modal-title font16",id:"viewSubscriptionFeatureLabel",children:"Feature Details"}),e.jsx("button",{type:"button",className:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})]}),e.jsxs("div",{className:"modal-body p-0",children:[e.jsxs("h2",{className:"bgHeaderModal p-3 activeTexttt fw-bold",children:["Package - ",p]}),d==null?void 0:d.map(a=>{var t;return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"p-3",children:[e.jsx("h2",{children:a.featureName}),e.jsx("h3",{className:"pt-3 greyText",children:(t=a.feaPermission)==null?void 0:t.map(r=>r==null?void 0:r.perName)})]}),e.jsx("hr",{className:"ms-3 me-3 mt-0 mb-0"})]})})]})]})})}),e.jsx(B,{})]})};export{G as default};
