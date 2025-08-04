import{u as h,r as a,cK as g,j as e,D as f}from"./index-DHII64NA.js";import"./ActionControls-BF7LUwxs.js";import"./bootstrap.esm-CBxLh-YC.js";const v=h.div`
    
    select:-internal-list-box{
        overflow: visible !important;
        background-color: #00A67E !important;
    }

    .form-select{
        color: var(--greyState);
        box-shadow: none;
        border: 1px solid var(--formInputBorder) !important;
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
        border-radius: 6px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
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
    

`,j=["#","Category","Product Name","Quantity"],T=()=>{const m=localStorage.getItem("token");a.useState(!1),a.useState({});const[x,s]=a.useState(!1);a.useState(1),a.useState(1);const[l,S]=a.useState(1),[c,N]=a.useState(10),[n,p]=a.useState([]),[u,k]=a.useState("");a.useEffect(()=>{b()},[m,l,c]);const b=async()=>{var r,o,i,d;try{s(!0);const t=await g(u,l,c);(t==null?void 0:t.status)===200&&((r=t==null?void 0:t.data)==null?void 0:r.status)==="success"?p(t.data.stocks||[]):toast.error(((o=t==null?void 0:t.data)==null?void 0:o.message)||"Failed to fetch suppliers")}catch(t){((d=(i=t==null?void 0:t.response)==null?void 0:i.data)==null?void 0:d.statusType)===401&&(localStorage.removeItem("token"),navigate("/")),toast.error("Error fetching suppliers")}finally{s(!1)}};return e.jsx(e.Fragment,{children:e.jsxs(v,{children:[x&&e.jsx(f,{}),e.jsxs("div",{className:"container-fluid p-4",children:[e.jsxs("div",{className:"row pb-3 gap-xl-0 gap-3",children:[e.jsx("nav",{className:"mainBreadCrum font14 ps-0","aria-label":"breadcrumb",children:e.jsxs("ol",{className:"breadcrumb mb-1",children:[e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/",className:"bredcrumText text-decoration-none",children:"Home"})}),e.jsx("li",{className:"breadcrumb-item",children:e.jsx("a",{href:"/admin/inventory/itemsupplier",className:"bredcrumText text-decoration-none",children:"Inventory"})}),e.jsx("li",{className:"breadcrumb-item active bredcrumActiveText","aria-current":"page",children:"Item Stock"})]})}),e.jsx("p",{className:"font14 ps-0 fontWeight500",children:"Item Stock"})]}),e.jsx("div",{className:"row pb-3",children:e.jsx("div",{className:"bg-white rounded-2 p-3",children:n.length>0?e.jsx(e.Fragment,{children:e.jsx("div",{className:"overflow-scroll",children:e.jsxs("table",{className:"table align-middle table-striped",children:[e.jsx("thead",{children:e.jsx("tr",{children:j.map(r=>e.jsx("th",{className:`textWrapClass font14 'text-center' ${r==="Action"&&"text-end"}`,children:r}))})}),e.jsx("tbody",{children:n.map((r,o)=>e.jsxs("tr",{className:"align-middle",children:[e.jsx("td",{className:"textWrapClass greyText font14",children:o+1}),e.jsx("td",{className:"textWrapClass greyText font14",children:r.categoryName}),e.jsx("td",{className:"textWrapClass greyText font14",children:r.itemName}),e.jsx("td",{className:"textWrapClass greyText font14",children:r.availableQuantity})]},r.id))})]})})}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"d-flex justify-content-center p-5 m-5",children:e.jsx("img",{src:"/images/search.svg",alt:"",className:"img-fluid p-5"})})})})})]})]})})};export{T as default};
