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
const AdminPage = () => {
  // const currentComponent = useSelector(
  //   (state) => state.mainComponent.currentComponent
  // );

  // console.log(
  //   "Current Redux State:",
  //   useSelector((state) => state)
  // ); // Add this to debug
  // if (!currentComponent)
  //   return <div>Error: Current Component is undefined</div>;

  return (
    <AdminWrapper>
      <div className="grid">
        <header className="page-header">
          <AdminTopPanel />
        </header>
        <BodyWrapper>
          <aside className="page-rightbar">
            <AdminRightPanel />
          </aside>
          <main className="page-main">
            {/* <AdminGraph /> */}
            <Outlet />
          </main>
        </BodyWrapper>
      </div>
    </AdminWrapper>
  );
};
const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* margin-top: 30px; */
  padding: 20px;
  gap: 80px;
  width: 1120px;
`;
const AdminWrapper = styled.div`
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  .grid {
    display: grid;
    grid-template-columns: auto 300px;
    grid-template-rows: 70px minmax(160px, auto) auto;
    grid-template-areas:
      "header header"
      "main rightbar"
      "footer footer";
    column-gap: 1px;
    row-gap: 1px;
    /* box-sizing: border-box; */
    margin-bottom: 20px;
    /* width: 170px; */
    height: 841px;
  }

  .page-header {
    grid-area: header;
    height: 841;
    width: 1513px;
    margin-bottom: 10px;
  }

  .page-rightbar {
    grid-area: rightbar;
    margin: 10px;
    margin-top: 50px;
  }
  .page-leftbar {
    grid-area: leftbar;
    margin: 10px;
    margin-top: 80px;
  }

  .page-main {
    grid-area: main;
    margin-top: 80px;
    width: 1170px;
    height: 841px;
  }
`;
export default AdminPage;
