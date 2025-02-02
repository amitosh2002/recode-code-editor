import React, { useState } from "react";
import { CgAddR } from "react-icons/cg";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import logo from "../assets/recode_logo-removebg-preview.png";
import { NavLink } from "react-router-dom";
// main culprit is iporting setCurrentComponent
import { setCurrentComponent } from "../Redux/Slices/AdminSlice";
const AdminRightPanel = () => {
  const dispatch = useDispatch();
  const handlePageChange = (currPage) => {
    dispatch(setCurrentComponent(currPage));
  };
  return (
    <RightPanel>
      <LogoWrapper>
        <img src={logo} alt="" />
        <hr />
      </LogoWrapper>
      <label htmlFor="panel" className="panel-label">
        Admin Control Panel
      </label>
      <div className="panel">
        <NavLink to="/admin">
          <Button
            // onClick={() => handlePageChange("Userlist")}
            aria-label="View User List"
          >
            Home
          </Button>
        </NavLink>
        <NavLink to="questionForm">
          <Button
            // onClick={() => handlePageChange("QuestionPanel")}
            aria-label="Add Question"
          >
            <IconWrapper>
              <CgAddR />
            </IconWrapper>
            Add Question
          </Button>
        </NavLink>
        <NavLink to="questionList">
          <Button
            // onClick={() => handlePageChange("QuestionList")}
            aria-label="View Question List"
          >
            Question List
          </Button>
        </NavLink>
        <NavLink to="userlist">
          <Button
            // onClick={() => handlePageChange("Userlist")}
            aria-label="View User List"
          >
            User List
          </Button>
        </NavLink>
      </div>
    </RightPanel>
  );
};

export default AdminRightPanel;

const LogoWrapper = styled.div`
  img {
    width: 190px;
  }
  margin-bottom: 5px;
  hr {
    size: xl;
  }
`;
const RightPanel = styled.div`
  width: 220px; /* Reduce the width */
  height: 90vh; /* Adjust the height to 90% of the viewport */
  background-color: #f0f4f8;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;

  /* Center the panel within its container */
  /* margin: 0 auto; */
  margin-top: 15px;
  /* Sticky positioning to keep it visible while scrolling */
  position: sticky;
  top: 40;
  left: 0;

  .panel-label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
    display: block;
    color: #333;
  }

  .panel {
    display: flex;
    flex-direction: column;
    align-items: stretch; /* Make buttons stretch to full width */
    gap: 15px;
  }
`;

const Button = styled.button`
  width: 100%; /* Full width buttons */
  padding: 10px 0; /* Adjust padding for better height */
  font-size: 14px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: #fff;
  background-image: linear-gradient(
    90deg,
    rgba(25, 136, 247, 1) 0%,
    rgba(247, 25, 136, 1) 100%
  );
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    transform: scale(1.05); /* Slightly enlarge on hover */
    background-image: linear-gradient(
      90deg,
      rgba(24, 232, 247, 1) 0%,
      rgba(46, 255, 164, 1) 100%
    );
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    width: 180px; /* Narrower width for smaller screens */
    height: 85vh; /* Slightly shorter height */
  }

  @media (max-width: 480px) {
    width: 100%; /* Full width for mobile */
    height: auto;
    border-radius: 0;
    box-shadow: none;
    padding: 10px;
  }
`;

const IconWrapper = styled.span`
  font-size: 20px;
`;
