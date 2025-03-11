import React from 'react'
import { Avatar } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import { RiArrowDropDownLine } from 'react-icons/ri'
import Button from '@mui/material/Button'
import styled from 'styled-components'
import { handleLogOut } from '../Redux/Actions/actions'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
const DropDownNav = ({userDetails}) => {
  const [dropDown, setDropDown] = React.useState(false);
  const dispatch =useDispatch();
  if (!userDetails){
    setDropDown(false);
    return null;
  }
  const logOutHandler = () => { 
    dispatch(handleLogOut());
    setDropDown(false);
  }
  return (
    <DropDownWrapper>

     <div
        className="avtar-container"
        onClick={() => setDropDown((prev) => !prev)} // ✅ Toggle dropdown on click
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
          {userDetails?.name?.slice(0, 2).toUpperCase()}
        </Avatar>
        <RiArrowDropDownLine size={40} />
      </div>

      {/* ✅ Dropdown Content */}
      {dropDown && (
        <div
          className="dropdown-items"
          style={{
            position: "absolute",
            right: 0,
            top: "50px",
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minWidth: "150px",
          }}
        > <NavLink to="/my-account">
          <Button fullWidth>My Account</Button>
          </NavLink>
          <Button fullWidth onClick={logOutHandler} color="error">
            Logout
          </Button>
        </div>
      )}
    </DropDownWrapper>

  )
}

const DropDownWrapper = styled.div`
margin-right: 30px;
  .dropdown-content{
    position: relative;
    display: flex;
    flex-direction: coloumn;
    justify-content: center;
    margin: 20px;
    cursor: pointer;
    width:min-content;
    height:min-content;
    left: 50%;}
  .avtar-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .dropdown-items{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 50px;
    background-color: white;
    color: white;
    padding: 10px;
    margin-top: 25px;
    border-radius: 10px;
  }`
export default DropDownNav