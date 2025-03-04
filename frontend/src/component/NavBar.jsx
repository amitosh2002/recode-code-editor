import React from "react";
import styled from "styled-components";
import logo from "../assets/recode_logo-removebg-preview.png";
import { NavLink } from "react-router-dom";
const NavBar = ({ user, handleLogout}) => {
  
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
            <NavLink to="/">Home</NavLink>
          </li>
          {/* </NavLink> */}
          <li>
            <NavLink to="/learn">Learn more</NavLink>
          </li>
          <li>
            {/* <a href={`/practice`}>PracticeCode</a> */}
            <NavLink to="/practice">Practice</NavLink>
          </li>{" "}
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
          {/* {user ? (
        <>
          <span>Welcome, {user.name}!</span>
          <button onClick={handleLogout}>Logout</button>
          {user.labels?.includes("admin") && <NavLink to="/admin">Admin</NavLink>}
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      )} */}
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
