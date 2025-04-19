import styled from "styled-components";
import logo from "../assets/recode_logo-removebg-preview.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import DropDownNav from "./DropDownNav";
const NavBar = () => {
  const userDetails =
    useSelector((state) => state.userReducer.userDetails) || ``;
  const sucessLogin = useSelector(
    (state) => state.userReducer.SUCESS_FETCH_USER_DETAIL
  );
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
          {!sucessLogin && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
          <li>
            {userDetails.role === "admin" && (
              <NavLink to="/admin">Admin</NavLink>
            )}
          </li>
          <li>
            {/* {userDetails.role === "admin" && (
              <NavLink to="/exam">Test Page</NavLink>
            )} */}
              <NavLink to="/exam">Test Page</NavLink>
          </li>
        </ul>
        <ul>
          <li>{sucessLogin && <DropDownNav userDetails={userDetails} />}</li>
        </ul>
      </nav>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #18191a;
  }
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
`;
export default NavBar;
