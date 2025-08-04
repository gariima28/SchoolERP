import{u as B,r as a,fu as w,_ as y,j as t,D as T,L as S,I as n,R as P,c as D}from"./index-DHII64NA.js";const R=B.div`
    height: 92vh;
    .mainBreadCrum{
        --bs-breadcrumb-divider: none !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .greyText{
        color: var(--greyTextColor);
    }

    .table td {
        border-right: 0.3px solid #dee2e6;
    }

    .ongoingEventBtn:active, .ongoingEventBtn:hover{
        border: 1px solid var(--ongoingEventBtn) !important;
        color: var(--ongoingEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
    }

    .ongoingEventBtn{
        border: 1px solid var(--ongoingEventBtn) !important;
        color: var(--ongoingEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
    }

    .upcomingEventBtn:active, .upcomingEventBtn:hover{
        border: 1px solid var(--upcomingEventBtn) !important;
        color: var(--upcomingEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
    }

    .upcomingEventBtn{
        border: 1px solid var(--upcomingEventBtn) !important;
        color: var(--upcomingEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
    }

    .closedEventBtn:active, .closedEventBtn:hover{
        border: 1px solid var(--closedEventBtn) !important;
        color: var(--closedEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
    }

    .closedEventBtn{
        border: 1px solid var(--closedEventBtn) !important;
        color: var(--closedEventBtn) !important;
        border-radius: var(--borderRadius25px);
        width: 100px;
    }
    
`,L=()=>{const x=sessionStorage.getItem("token"),[v,r]=a.useState(!1),g="",[i,u]=a.useState([]),[h,b]=a.useState(1),[o,p]=a.useState(1),[j,f]=a.useState(1),[E,W]=a.useState(10);a.useEffect(()=>{N()},[x]);const N=async()=>{var s,l,d,c,m;try{r(!0);var e=await w(g,j,E);(e==null?void 0:e.status)===200?((s=e==null?void 0:e.data)==null?void 0:s.status)==="success"?(r(!1),u((l=e==null?void 0:e.data)==null?void 0:l.events),b((d=e==null?void 0:e.data)==null?void 0:d.currentPage),p((c=e==null?void 0:e.data)==null?void 0:c.totalPages)):(r(!1),y.error((m=e==null?void 0:e.data)==null?void 0:m.message)):r(!1)}catch{r(!1)}},C=e=>{f(e.selected+1)};return t.jsxs(R,{className:"container-fluid p-4 overflow-scroll",children:[v&&t.jsx(T,{}),t.jsxs("div",{className:"row pb-3",children:[t.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:t.jsxs("ol",{className:"breadcrumb mb-1",children:[t.jsxs("li",{className:"breadcrumb-item",children:[t.jsx(S,{to:"/",className:"align-self-center bredcrumText text-decoration-none font14",children:"Home"}),t.jsx(n,{className:"ms-2",icon:"ep:arrow-right-bold",width:"1em",height:"1em",style:{color:"#78788C"}})]}),t.jsx("li",{className:"breadcrumb-item active bredcrumActiveText font14","aria-current":"page",children:"Event"})]})}),t.jsx("p",{className:"font14 ps-0 fw-bolder",children:"Event Details"})]}),t.jsxs("div",{className:"row p-3 bg-white borderRadius5 pb-5",children:[i.length>0?t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"overflow-scroll",children:t.jsxs("table",{className:"table align-middle table-striped",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("td",{className:"textWrapClass font14",children:"#"}),t.jsx("td",{className:"textWrapClass font14",children:"Event Name"}),t.jsx("td",{className:"textWrapClass font14",children:"Start Date & Time"}),t.jsx("td",{className:"textWrapClass font14",children:"End Date & Time"}),t.jsx("td",{className:"textWrapClass font14 text-center",children:"Status"})]})}),t.jsxs("tbody",{children:[t.jsx("tr",{}),i.map((e,s)=>t.jsxs("tr",{children:[t.jsx("td",{className:"textWrapClass font14 greyText",children:s+1}),t.jsx("td",{className:"textWrapClass font14 greyText",children:e.eventName}),t.jsxs("td",{className:"textWrapClass font14 greyText",children:[e.startDate," ",e.startTime]}),t.jsxs("td",{className:"textWrapClass font14 greyText",children:[e.endDate," ",e.endTime]}),t.jsx("td",{className:"textWrapClass font14 greyText text-center",children:t.jsx("button",{className:`btn ${e.status==="Upcoming"?"upcomingEventBtn":e.status==="Ongoing"?"ongoingEventBtn":e.status==="Completed"?"closedEventBtn":""}`,type:"button",children:e.status})})]},e.holidayId))]})]})}),t.jsxs("div",{className:"d-flex",children:[t.jsxs("p",{className:"font14",children:["Showing ",h," of ",o," Pages"]}),t.jsx("div",{className:"ms-auto",children:t.jsx(P,{previousLabel:t.jsx(n,{icon:"tabler:chevrons-left",width:"1.4em",height:"1.4em"}),nextLabel:t.jsx(n,{icon:"tabler:chevrons-right",width:"1.4em",height:"1.4em"}),breakLabel:"...",breakClassName:"break-me",pageCount:o,marginPagesDisplayed:2,pageRangeDisplayed:10,onPageChange:C,containerClassName:"pagination",subContainerClassName:"pages pagination",activeClassName:"active"})})]})]}):t.jsx(t.Fragment,{children:t.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:t.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})}),t.jsx(D,{})]})]})};export{L as default};
