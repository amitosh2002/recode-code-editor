import styled from "styled-components";
import contactImg from "../assets/contactForm.png";
import { onSucessToast } from "./Tostify";
const ContactMe = () => {
  return (
    <ContactForm>
     <div className="responsive_container">
     <div className="img">
        <img src={contactImg} alt="" />
      </div>
      <form
        className="colorful-form"
        action="https://formspree.io/f/mgveanpz"
        method="POST"
        onSubmit={()=>onSucessToast("Message Sent Successfully ,We will contact you soon")}
      >
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name:
          </label>
          <input
            // required=""
            placeholder="Enter your name"
            className="form-input"
            type="text"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            required
            placeholder="Enter your email"
            className="form-input"
            name="email"
            id="email"
            type="email"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="message">
            Message:
          </label>
          <textarea
            required
            placeholder="Enter your message"
            className="form-input"
            name="message"
            id="message"
          ></textarea>
        </div>
        <button className="form-button" type="submit">
          Submit
        </button>
      </form>
     </div>
    </ContactForm>
  );
};
const ContactForm = styled.div`
.responsive_container{

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-left: 250px;
}
  
  img {
    width: 400px;
    height: 300px;
    object-fit: cover;
  }
  @media screen and (width< 768px) {
    .responsive_container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 10px;
        align-items: center;
        min-width: 352px;
        width: 100%;

      }
  img {
    width: 320px;
    height: 300px;
    object-fit: cover;
  }
        
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
