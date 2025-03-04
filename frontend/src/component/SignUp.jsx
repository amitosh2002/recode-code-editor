import React, { useState } from "react";
import styled from "styled-components";
import registerImg from "../assets/registration.png";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../AuthControl/authService";
const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleSignup();
    console.log(user);
  };

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //       try {
  //           await createAccount(user.email, user.password, user.firstName );
  //           console.log('Account created successfully!');
  //           navigate('/login'); // Redirect to login page after successful signup.
  //           // Optionally, you can log the user in automatically here.
  //       } catch (err) {
  //           console.log(err.message );
  //       }
  //   };

  return (
    <SignUpContainer>
      <div className="img">
        <img src={registerImg} alt="" />
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register </p>
        <p className="message">
          <strong>Signup now and get full access to our app.</strong>{" "}
        </p>
        <div className="flex">
          <label>
            <input
              className="input"
              name="firstName"
              value={user.firstName}
              type="text"
              onChange={onHandleChange}
              placeholder=""
              required
            />
            <span>Firstname</span>
          </label>

          <label>
            <input
              className="input"
              type="text"
              onChange={onHandleChange}
              placeholder=""
              required
              name="lastName"
              value={user.lastName}
            />
            <span>Lastname</span>
          </label>
        </div>

        <label>
          <input
            className="input"
            type="email"
            onChange={onHandleChange}
            placeholder=""
            required
            name="email"
            value={user.email}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            className="input"
            type="password"
            name="password"
            value={user.password}
            onChange={onHandleChange}
            placeholder=""
            required
          />
          <span>Password</span>
        </label>
        <label>
          <input
            className="input"
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={onHandleChange}
            placeholder=" "
            required
          />
          <span>Confirm password</span>
        </label>
        <button className="submit">Submit</button>
        <p className="signin">
          <strong>
            {" "}
            Already have an acount ? <a href={`/login`}>Signin</a>{" "}
          </strong>
        </p>
      </form>
    </SignUpContainer>
  );
};
const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 250px;
  margin: 50px;

  img {
    width: 400px;
    height: 300px;
    object-fit: cover;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 450px;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    background-color: #e6e9efd7;
    color: #0c0808;
    border: 1px solid #333;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #00bfff;
  }

  .title::before {
    width: 18px;
    height: 18px;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #00bfff;
  }

  .message,
  .signin {
    font-size: 14.5px;
    color: rgb(10, 9, 9);
  }

  .signin {
    text-align: center;
  }

  .signin a:hover {
    text-decoration: underline royalblue;
  }

  .signin a {
    color: #ff0000;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    background-color: #fdf7f7;
    color: #0a0909;
    width: 90%;
    padding: 20px 05px 05px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    color: rgb(2, 1, 1);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #00bfff;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input {
    font-size: medium;
    margin-right: 25px;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transform: 0.3s ease;
    background-color: #00bfff;
    cursor: pointer;
  }

  .submit:hover {
    background-color: #00bfff96;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;
export default SignUp;
