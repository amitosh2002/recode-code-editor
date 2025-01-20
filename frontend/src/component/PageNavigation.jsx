import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PageNavigation = ({ tittle }) => {
  return (
    <Wrapper>
      <NavLink
        to="/practice"
        style={{ color: "#2ec4b5eb", textDecoration: "none" }}
      >
        practice /
      </NavLink>
      <h6 style={{ color: "#2ec4b5eb", textDecoration: "none" }}>{tittle}</h6>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  height: 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 3.2rem;
  padding-left: 1.2rem;

  a {
    font-size: 2.2rem;
  }
`;
export default PageNavigation;
