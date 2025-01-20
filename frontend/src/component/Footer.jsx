import React from "react";
import styled from "styled-components";
import logo from "../assets/recode_logo-removebg-preview.png";
const Footer = () => {
  return (
    <Wrapper>
      <footer>
        <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>{" "}
           
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i
              className="fab   
 fa-youtube"
            ></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-tiktok"></i>
          </a>
        </div>{" "}
         
        <div className="hubspot-logo">
          <img src={logo} alt={"<re/code>"} style={{ width: "100px" }} />
          <p>Copyright © 2024 {"<re/code>"}, Inc.</p>
        </div>
        <div className="legal-links">
          <a href="#">Online Code Editor</a>
          <a href="#">Learn Through Quizzes</a>
          <a href="#">Online Problem Solving</a>
          <a href="#">Contact Us</a>
          <a href="#">Manage Cookies</a>
        </div>
      </footer>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  footer {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #18191a;
    color: #fff;
    font-family: Arial, sans-serif;
  }

  .social-icons {
    display: flex;
    margin-bottom: 20px;
  }

  .social-icons a {
    margin: 0 10px;
    color: #fff;
    font-size: 24px;
  }

  .hubspot-logo {
    text-align: center;
  }

  .hubspot-logo p {
    font-size: 12px;
    margin-top: 5px;
  }

  .legal-links {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 500px;
    margin-top: 20px;
  }

  .legal-links a {
    color: #fff;
    text-decoration: none;
  }

  /* Media Queries for Responsiveness */
  @media (max-width: 768px) {
    .social-icons {
      flex-direction: column;
      align-items: center;
    }

    .social-icons a {
      margin: 5px 0;
    }

    .legal-links {
      flex-direction: column;
      align-items: center;
    }

    .legal-links a {
      margin: 5px 0;
    }
  }
`;
export default Footer;
