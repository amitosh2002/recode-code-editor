import React from "react";
import styled from "styled-components";
import HeaderCard from "./HeaderCard";

const AdminTopPanel = () => {
  return (
    <TopWrapper>
      <HeaderCard />
      <HeaderCard />
      <HeaderCard />
    </TopWrapper>
  );
};
const TopWrapper = styled.div`
  padding: 10px;
  width: 1503px;
  height: 156px;
  box-sizing: border-box;
  background-image: linear-gradient(
    315deg,
    rgba(12, 97, 182, 1) 0%,
    rgba(32, 30, 31, 1) 100%
  );
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Create 3 equal-width columns */
  gap: 20px; /* Gap between cards */
  justify-items: center; /* Center cards horizontally */

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Change to 1 column on smaller screens */
    gap: 10px;
  }
`;
export default AdminTopPanel;
