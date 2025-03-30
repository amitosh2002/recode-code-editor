import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { deleteUser, getUserList } from "../Services/UserServices";
import { confirmAlert } from "react-confirm-alert";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
const Userlist = () => {
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      const res = await getUserList();
      setUser(res.data.allUser);

      console.log(res);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // alert for delete confirmation

  const submitDelete = ({ id }) => {
    confirmAlert({
      title: "Confirm to Remove",
      message: "Are you sure to Remove this user?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleDeleteUser(id);
          },
        },
        {
          label: "No", // Dialog closes automatically without any action
        },
      ],
    });
  };

  const handleDeleteUser = async (id) => {
    // console.log(id);
    const deltedUser = await deleteUser(id);
    console.log(deltedUser);
    setUser(user.filter((q) => q._id !== id));

    alert("User Deleted Successfully", id);
  };

  return (
    <UserListWrapper>
      {user.map((user) => {
        const {  name, email, _id } = user;
        return (
          <div className="card" key={_id}>
            <div className="img"></div>
           <Avatar sx={{ bgcolor: deepOrange[500]  , width: 50, height: 50,margin:2}}>
          {name?.slice(0, 2).toUpperCase()}
        </Avatar>
            <div className="textBox">
              <div className="textContent">
                <p className="h1">{name}</p>
                <button className="deleteBtn" onClick={() => submitDelete(_id)}>
                  Delete
                </button>
              </div>
              <p className="p">{email}</p>
            </div>
          </div>
        );
      })}
    </UserListWrapper>
  );
};

const UserListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  .card {
    /* width: 100%; */
    max-width: max-content;
    height: 70px;
    background: #f9eeee;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: left;
    backdrop-filter: blur(10px);
    transition: 0.5s ease-in-out;
    margin: 15px;
    padding: 10px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
  }

  .card:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  .img {
    /* width: 50px;
    height: 50px;
    margin-left: 10px;
    border-radius: 10px;
    background: linear-gradient(#d7cfcf, #9198e5); */
  }

  .card:hover > .img {
    transition: 0.5s ease-in-out;
    background: linear-gradient(#9198e5, #712020);
  }

  .textBox {
    width: calc(100% - 90px);
    margin-left: 10px;
    color: white;
    font-family: "Poppins", sans-serif;
  }

  .textContent {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .h1 {
    font-size: 16px;
    font-weight: bold;
    color: black;
  }

  .p {
    font-size: 12px;
    font-weight: lighter;
    color: black;
  }

  .deleteBtn {
    background: red;
    color: white;
    border: none;
    padding: 5px 10px;
    margin: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 12px;
  }

  .deleteBtn:hover {
    background: darkred;
  }
`;

export default Userlist;
