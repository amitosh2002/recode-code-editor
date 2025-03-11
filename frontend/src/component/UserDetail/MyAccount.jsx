import styled from "styled-components";
import { Avatar, Button,Stack } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { handleEnableFormEdit } from "../../Redux/Actions/actions";
const MyAccount = () => {
    // const userDetails = useSelector((state)=>{state.userReducer.userDetails}) ;
    const userDetails = useSelector((state) => state.userReducer.userDetails) ||``  ;
    const formEdit =useSelector((state)=> state.userReducer.IS_EDIT_FORM_ENABLED) ;
    console.log("User Details:",userDetails);
    
    const {name, email ,role,id} = userDetails;
    const [isEnable,setIsEnable] =useState(formEdit);
  return (
    <UserDetailForm>
      <h1>My Account Page</h1>
      <p>This is where you can manage your account settings, view your progress, and access your personalized content.</p>

      <div className="user-details">
        <div className="edit-avtar-container">
                <div className="avtar-containert">
                    <Avatar  variant="square" sx={{ bgcolor: deepOrange[500]  , width: 70, height: 70,margin:2}}> {name?.slice(0, 2).toUpperCase()} </Avatar>
                <p>User Id: {id}</p>
                </div>


                     <Stack direction="row" spacing={2}>
      <Button  variant="contained" disabled={!isEnable}  onClick={()=>setIsEnable((prev)=>!prev)}>Save</Button>
      <Button variant="contained" disabled={isEnable} onClick={()=>setIsEnable((prev)=>!prev)}>Edit</Button>
    </Stack>
              

        </div>
        <div className="user-info">
            <div className="input-container">
            <label htmlFor="name">Name:</label>
            <TextField fullWidth  id="name"disabled={!isEnable}  value={name}/>
            </div>
            <div className="input-container">
            <label htmlFor="email">Email:</label>
            <TextField fullWidth  id="email" disabled={!isEnable}  value={email}/>
            </div>
            <div className="input-container">
            <label htmlFor="name">Role:</label>
            <TextField fullWidth  id="role" disabled value={role}/>
            </div>
            
        </div>
      </div>
    </UserDetailForm>
  )
}

export default MyAccount

const UserDetailForm = styled.div`
.avtar-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 10px;
    text-align: center;
}
.input-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 20px;
    margin: 10px;
}
.my-account-button{
    background-color: #030d2c; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 28px;
}
.user-details{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 15px;
}
.user-info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    margin: 20px;
    width:550px;
}
.edit-avtar-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 190px;
    margin: 20px;
}

`