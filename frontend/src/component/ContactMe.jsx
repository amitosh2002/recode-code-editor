import React from "react";
import styled from "styled-components";
import contactImg from "../assets/contactForm.png";
const ContactMe = () => {
  return (
    <ContactForm>
      <div className="img">
        <img src={contactImg} alt="" />
      </div>
      <form
        class="colorful-form"
        action="https://formspree.io/f/mgveanpz"
        method="POST"
      >
        <div class="form-group">
          <label class="form-label" for="name">
            Name:
          </label>
          <input
            // required=""
            placeholder="Enter your name"
            class="form-input"
            type="text"
            required
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="email">
            Email:
          </label>
          <input
            required
            placeholder="Enter your email"
            class="form-input"
            name="email"
            id="email"
            type="email"
          />
        </div>
        <div class="form-group">
          <label class="form-label" for="message">
            Message:
          </label>
          <textarea
            required
            placeholder="Enter your message"
            class="form-input"
            name="message"
            id="message"
          ></textarea>
        </div>
        <button class="form-button" type="submit">
          Submit
        </button>
      </form>
    </ContactForm>
  );
};
const ContactForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 250px;
  img {
    width: 400px;
    height: 300px;
    object-fit: cover;
  }
  .colorful-form {
    width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #e6e9efd7;
    border-radius: 10px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
  }

  .form-input {
    width: 100%;
    padding: 10px;
    border: none;
    background-color: #fff;
    color: #333;
    border-radius: 5px;
  }

  textarea.form-input {
    height: 100px;
  }

  .form-button {
    display: block;
    width: 100%;
    padding: 10px;
    background-color: #ff6f69;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .form-button:hover {
    background-color: #ff5f59;
  }
`;
export default ContactMe;
