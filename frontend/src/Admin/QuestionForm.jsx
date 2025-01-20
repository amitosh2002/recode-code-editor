import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { addQuestions } from "../Services/QuestionServices";
const QuestionForm = () => {
  async function addQuestion() {
    const url = "http://localhost:5001/questions"; // Update with your backend's URL
    // const data = {
    //   tittle: "Sample Title", // Ensure the spelling matches backend
    //   description: "This is a sample description.",
    //   questionText: "Write a function to reverse a string.",
    //   testCases: [
    //     { input: "hello", expectedOutput: "olleh" },
    //     { input: "world", expectedOutput: "dlrow" },
    //   ],
    // };

    try {
      const response = await axios.post(url, question, {
        headers: {
          "Content-Type": "application/json", // Set the correct content type
        },
      });
      console.log("Question added successfully:", response.data);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
      } else {
        // Other errors
        console.error("Error setting up the request:", error.message);
      }
    }
  }

  const [question, setQuestion] = useState({
    tittle: "",
    description: "",
    questionText: "",

    testCases: [
      {
        input: "",
        output: "",
      },
      {
        input: "",
        output: "",
      },
    ],
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // setQuestion({ ...question, [name]: value });
    if (name.startsWith("testCases")) {
      const [testCaseIndex, field] = name.split(".");
      const updatedTestCases = [...question.testCases];
      updatedTestCases[testCaseIndex][field] = value;
      setQuestion({ ...question, testCases: updatedTestCases });
    } else {
      setQuestion({ ...question, [name]: value });
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    addQuestion();
    console.log(question);
  };

  return (
    <FormWrapper>
      <header> Question Panel </header>
      <form action="" onSubmit={handleOnSubmit}>
        <div className="question-input">
          <div className="input-container">
            <label htmlFor="tittle">Tittle:</label>
            <input
              type="text"
              placeholder="Enter question tittle"
              name="tittle"
              value={question.tittle}
              onChange={handleOnChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              placeholder="Enter question tittle"
              name="description"
              value={question.description}
              onChange={handleOnChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="questionText">Question:</label>
            <textarea
              name="questionText"
              id=""
              row={10}
              col={50}
              placeholder="Enter the Question"
              value={question.questionText}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="test-case">
          <div className="input-container">
            <label htmlFor="testCase1">Test Case 1</label>
            <input
              type="text"
              name="testCase1"
              value={question.testCases[0].input.value}
              placeholder="Test Case 1"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="testCaseOutput1">Test Case Output 1</label>
            <input
              type="text"
              name="testCaseOutput1"
              value={question.testCases[0].output.value}
              placeholder="Test Case 1 Output"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="testCase2"> Test Case 2</label>
            <input
              type="text"
              name="testCase2"
              value={question.testCases[1].input.value}
              placeholder="Test Case 1"
              onChange={handleOnChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="testCaseOutput2">Test Case 2 Output</label>
            <input
              type="text"
              name="testCaseOutput2"
              value={question.testCases[1].output.value}
              placeholder="Test Case 1 Output"
              onChange={handleOnChange}
            />
          </div>

          <button type="submit">ADD</button>
        </div>
      </form>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  /* padding: 20px; */
  /* margin-top: 20px; */

  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  align-items: self-start;
  /* margin-left: 20px; */
  width: 1015px;
  flex-direction: column;

  /* .test-case {
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    background-color: #f8f9fa;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  } */
  header {
    font-weight: 1200;
    font-size: xx-large;
    margin-bottom: 30px;
    font-family: "Courier New", Courier, monospace;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: self-start;
    padding: 10px;
    margin: 20px;
    background: #f2f9ff;

    font-weight: 800;
    font-size: larger;
    font-family: cursive;
    border: solid 3px #d4ebf8;
  }
  .input-container label {
    margin: 5px;
  }
  form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    gap: 15px;
    max-width: 450px;
  }
  input {
    padding: 10px;
    max-width: 400px;
    width: 375px;
    /* margin: ; */
  }
  textarea {
    width: 391px;
    height: 195px;
  }
  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    width: 120px;
    margin: 10px;

    &:hover {
      background-color: #19ced7;
    }
  }
`;

export default QuestionForm;
