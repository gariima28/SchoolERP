import{u as _,r as d,j as e}from"./index-DHII64NA.js";import{C as j}from"./Calendar-CVCK5PIO.js";const v=_.div`
  .react-calendar__tile--active:active, 
  .react-calendar__tile--active:enabled, 
  .react-calendar__tile--active:focus {
    background: #daffe4;
    color: #000;
  }

  .react-calendar__tile--now {
    color: #008479 !important;
    border-bottom: 5px solid #008479 !important;
    background: #ffb88b69;
}

  .react-calendar__tile {
    height: ${({smallBox:c})=>c?"75px":"90px"};
    border: 1px solid #E7E7E7;
  }

  abbr[title] {
    text-decoration: none;
    color: #FF904A;
  }

  .react-calendar__month-view__weekdays{
    text-transform: none !important;
    font-weight: 400;
  }

  .react-calendar__navigation{
    /* display: none !important; */
  }

  .react-calendar {
    width: 100%;
    border: none !important;
  }

  .react-calendar__month-view__weekdays{
    padding: 1%;
  }

  .status-circle-container {
    margin-top: 5px;
    display: flex;
    justify-content: center;
  }

  .status-circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }

  .present {
    background-color: #008479;
  }

  .absent {
    background-color: #ff5f5f;
  }

  .holiday {
    background-color: #f4b840;
  }

  .legend {
    display: flex;
    margin-top: 20px;
  }

  .legend-item {
    margin-right: 20px;
    display: flex;
    align-items: center;
  }

  .legend-item .status-circle {
    margin-right: 5px;
  }

  .react-calendar__navigation{
    display: none;
  }
`,N=({DailyAttendanceData:c,month:n,year:s,monthUpdate:p,yearUpdate:g,smallBox:m})=>{const[u,o]=d.useState(new Date);d.useEffect(()=>{if(n||s){const t=new Date(s,n-1);o(t)}},[n,s]);const i=t=>{const a=t.getFullYear(),r=(t.getMonth()+1).toString().padStart(2,"0"),f=t.getDate().toString().padStart(2,"0"),h=`${a}-${r}-${f}`,l=c.find(b=>b.date===h);return l?l.status:null},x=({activeStartDate:t})=>{const a=t.getMonth()+1,r=t.getFullYear();a!==n&&p(a),r!==s&&g(r)};return e.jsxs(v,{smallBox:m,children:[e.jsx(j,{onChange:o,value:u,onActiveStartDateChange:x,tileContent:({date:t,view:a})=>a==="month"&&e.jsxs("div",{className:"status-circle-container",children:[i(t)==="present"&&e.jsx("span",{className:"status-circle present"}),i(t)==="absent"&&e.jsx("span",{className:"status-circle absent"}),i(t)==="holiday"&&e.jsx("span",{className:"status-circle holiday"})]})}),e.jsxs("div",{className:"legend pb-3",children:[e.jsxs("div",{className:"legend-item font14",children:[e.jsx("span",{className:"status-circle present"})," Present"]}),e.jsxs("div",{className:"legend-item font14",children:[e.jsx("span",{className:"status-circle holiday"})," Holiday"]}),e.jsxs("div",{className:"legend-item font14",children:[e.jsx("span",{className:"status-circle absent"})," Absent"]})]})]})};export{N as C};
