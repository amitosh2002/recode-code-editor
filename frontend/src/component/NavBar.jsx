import React from "react";
import styled from "styled-components";
import logo from "../assets/recode_logo-removebg-preview.png";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <Wrapper>
      <nav>
        <ul>
          <li>
            <img
              src={logo}
              alt={"<re/code>"}
              style={{ width: "90px", position: "center" }}
            />
          </li>
          {/* <NavLink to={`/`}> */}
          <li>
            <a href={`/`}>Home</a>
          </li>
          {/* </NavLink> */}
          <li>
            <a href={`/contact`}>Contact</a>
          </li>
          <li>
            <a href={`/learn`}>learn</a>
          </li>
          <li>
            <a href={`/practice`}>PracticeCode</a>
          </li>
          <li>
            <a href={`/login`}>Sign in/Sign up</a>
          </li>
          <li>
            <a href={`/admin`}>Admin</a>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  a {
    text-decoration: none;
    color: white;
  }
  nav {
    background-color: #18191a;

    padding: 2px;
  }
  ul {
    display: flex;
    flex-direction: row;
    /* justify-content: space-around; */
    text-decoration: none;
  }
  li {
    text-decoration: none;
    font-weight: 30px;
    font-size: larger;
    color: white;
    list-style-type: none;
    margin: 10px;
    display: flex;
    justify-items: center;
    align-items: center;
  }
  li:hover {
    transform: scale(1.2);
    background: #6868ef;
    padding: 5px;
    border-radius: 8px;
  }
`;
export default NavBar;
