import React from "react";
import styled from "styled-components";
import logo from "../assets/recode_logo-removebg-preview.png";
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
          <li>
            <a href={`/`}>Home</a>
          </li>
          <li>
            <a href={`/contact`}>Contact</a>
          </li>
          <li>learn</li>
          <li>login</li>
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
