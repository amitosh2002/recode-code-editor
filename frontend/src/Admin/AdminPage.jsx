// import React from "react";
// import styled from "styled-components";
// import AdminRightPanel from "./AdminRightPanel";
// import AdminTopPanel from "./AdminTopPanel";
// import QuestionForm from "./QuestionForm";
// import QuestionList from "./QuestionList";
// import Userlist from "./Userlist";
// import { useSelector } from "react-redux";
// import { Routes, Route, Outlet } from "react-router-dom";
// import AdminGraph from "./AdminGraph";
// import NavBar from "../component/NavBar";
// const AdminPage = () => {
//   // const currentComponent = useSelector(
//   //   (state) => state.mainComponent.currentComponent
//   // );

//   // console.log(
//   //   "Current Redux State:",
//   //   useSelector((state) => state)
//   // ); // Add this to debug
//   // if (!currentComponent)
//   //   return <div>Error: Current Component is undefined</div>;

//   return (
//     <AdminWrapper>
//       <NavBar />
//       <div className="grid">
//         {/* <header className="page-header">
//           <AdminTopPanel />
//         </header> */}
//         <BodyWrapper>
//           <aside className="page-rightbar">
//             <AdminRightPanel />
//           </aside>
//           <main className="page-main">
//             {/* <AdminGraph /> */}
//             <Outlet />
//           </main>
//         </BodyWrapper>
//       </div>
//     </AdminWrapper>
//   );
// };
// const BodyWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   /* margin-top: 30px; */
//   padding: 20px;
//   gap: 80px;
//   width: 1120px;
// `;
// const AdminWrapper = styled.div`
//   padding: 0;
//   margin: 0;
//   box-sizing: border-box;
//   .grid {
//     display: grid;
//     grid-template-columns: auto 300px;
//     grid-template-rows: 70px minmax(160px, auto) auto;
//     grid-template-areas:
//       "header header"
//       "main rightbar"
//       "footer footer";
//     column-gap: 1px;
//     row-gap: 1px;
//     /* box-sizing: border-box; */
//     margin-bottom: 20px;
//     /* width: 170px; */
//     height: 841px;
//   }

//   .page-header {
//     grid-area: header;
//     height: 841;
//     width: 1513px;
//     margin-bottom: 10px;
//   }

//   .page-rightbar {
//     grid-area: rightbar;
//     margin: 10px;
//     margin-top: 50px;
//   }
//   .page-leftbar {
//     grid-area: leftbar;
//     margin: 10px;
//     margin-top: 80px;
//   }

//   .page-main {
//     grid-area: main;
//     margin-top: 80px;
//     width: 1170px;
//     height: 841px;
//   }
// `;
// export default AdminPage;


import React from "react";
import styled from "styled-components";
import AdminRightPanel from "./AdminRightPanel";
import AdminTopPanel from "./AdminTopPanel";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import Userlist from "./Userlist";
import { useSelector } from "react-redux";
import { Routes, Route, Outlet } from "react-router-dom";
import AdminGraph from "./AdminGraph";
import NavBar from "../component/NavBar";
import Dashboard from "./AdminDashBoard";

const AdminPage = () => {
  return (
    <AdminWrapper>
      <NavBar />
      <div className="grid">
        {/* <header className="page-header">
          <AdminTopPanel />
        </header> */}
        <BodyWrapper>
          {/* <aside className="page-rightbar">
            <AdminRightPanel />
          </aside> */}
          <main className="page-main">
            <Dashboard />
            {/* <Outlet /> */}
          </main>
        </BodyWrapper>
      </div>
    </AdminWrapper>
  );
};

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  gap: 80px;
  width: 100%; /* Ensure BodyWrapper takes full width */
  box-sizing: border-box; /* Include padding in width calculation */
`;

const AdminWrapper = styled.div`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%; /* Ensure AdminWrapper takes full width */

  .grid {
    display: grid;
    grid-template-columns: 1fr; /* Only one column, taking the full available width */
    grid-template-rows: auto; /* Adjust rows based on content */
    grid-template-areas:
      /* "header" */
      "main"
      /* "footer" */;
    column-gap: 0; /* Remove column gap */
    row-gap: 1px;
    margin-bottom: 20px;
    height: auto; /* Adjust height based on content */
  }

  /* .page-header {
    grid-area: header;
    margin-bottom: 10px;
  } */

  /* Remove styles for page-rightbar as it's not in the grid anymore */
  /* .page-rightbar {
    grid-area: rightbar;
    margin: 10px;
    margin-top: 50px;
  } */
  /* .page-leftbar {
    grid-area: leftbar;
    margin: 10px;
    margin-top: 80px;
  } */

  .page-main {
    grid-area: main;
    margin-top: 20px; /* Adjust top margin as needed */
    width: 100%; /* Ensure page-main takes full width of the grid */
    height: auto; /* Adjust height based on content */
  }
`;

export default AdminPage;