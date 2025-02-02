import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { updateQuestion } from "../Services/QuestionServices";
const QuestionForm = () => {
  // get exisisting questions data
  const location = useLocation();
  const existQuestion = location.state || {}; // Retrieve passed state

  const [question, setQuestion] = useState({
    tittle: existQuestion.tittle || "",
    description: existQuestion.description || "",
    questionText: existQuestion.questionText || "",
    difficulty: existQuestion.difficulty || "Easy",
    testCases: existQuestion.testCases || [{ input: "", output: "" }],
  });

  // checking for update question condition
  useEffect(() => {
    if (existQuestion._id) {
      setQuestion(existQuestion);
    }
  }, [existQuestion]);
  console.log(existQuestion);
  // console.log(data.currentQuestion);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...question.testCases];
    updatedTestCases[index][field] = value;
    setQuestion({ ...question, testCases: updatedTestCases });
  };

  const addTestCase = () => {
    setQuestion({
      ...question,
      testCases: [...question.testCases, { input: "", output: "" }],
    });
  };

  const removeTestCase = (index) => {
    const updatedTestCases = question.testCases.filter((_, i) => i !== index);
    setQuestion({ ...question, testCases: updatedTestCases });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      if (existQuestion._id) {
        const response = await updateQuestion(existQuestion._id, question);

        console.log("Question updated successfully:", response.data);
        alert("Question updated successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:6001/api/addQuestion",
          question,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("Question added successfully:", response.data);
        alert("Question added successfully!");
      }
    } catch (error) {
      console.error(
        "Error adding question:",
        error.response?.data || error.message
      );
      alert("Failed to add question. Please try again.");
    }
    console.log(question);
  };

  return (
    <FormWrapper>
      <header>{question._id ? "Edit Question" : "Add New Question"}</header>
      <form onSubmit={handleOnSubmit}>
        <div className="question-field">
          <div className="question-input">
            <div className="input-container">
              <label htmlFor="tittle">Title:</label>
              <input
                type="text"
                placeholder="Enter question title"
                name="tittle"
                value={question.tittle}
                onChange={handleOnChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                placeholder="Enter question description"
                name="description"
                value={question.description}
                onChange={handleOnChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="questionText">Question:</label>
              <textarea
                name="questionText"
                rows={10}
                cols={50}
                placeholder="Enter the question text"
                value={question.questionText}
                onChange={handleOnChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="dificulty">Difficulty:</label>
              <select
                id="difficulty"
                name="difficulty" // This links the value to the 'question.difficulty' field
                value={question.difficulty} // Binds the state to the dropdown
                onChange={handleOnChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        <div className="test-case">
          {question.testCases.map((testCase, index) => (
            <div class="contact-form" key={index}>
              <h3>Test Case {index + 1}</h3>
              <div class="input-group">
                <input
                  type="text"
                  placeholder="Test case input"
                  value={testCase.input}
                  onChange={(e) =>
                    handleTestCaseChange(index, "input", e.target.value)
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Test case output"
                  value={testCase.output}
                  onChange={(e) =>
                    handleTestCaseChange(index, "output", e.target.value)
                  }
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => removeTestCase(index)}
                className="remove-button"
              >
                Remove Test Case {index + 1}
              </button>
            </div>
          ))}
          <div className="button-class">
            <button type="button" onClick={addTestCase} className="add-button">
              Add Test Case
            </button>
          </div>
          {/* <button type="submit">Submit</button> */}
          <button type="submit">{question._id ? "Update" : "Submit"}</button>
        </div>
      </form>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 1015px;

  /* ------------------------test case---------------- */
  .contact-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 170px;
    padding: 5px;
    border: 2px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    background-color: #fff;
  }

  .contact-form h3 {
    font-size: 24px;
    color: #346beb;
    margin-bottom: 20px;
  }

  .input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    width: 100%;
  }

  .input-group input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .submit-button {
    padding: 10px 20px;
    background-color: #346beb;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .submit-button:hover {
    background-color: #274b9f;
  }

  /* ----------------- */

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
    align-items: flex-start;
    padding: 10px;
    margin: 20px;
    border: 2px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
    background-color: #fff;
  }
  .input-container label {
    margin: 5px;
  }

  form {
    display: flex;

    gap: 15px;
    max-width: 700px;
  }

  input {
    padding: 10px;
    width: 400px;
  }

  textarea {
    width: 400px;
    height: 120px;
  }

  .test-case-colm {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    margin-bottom: 15px;
  }
  .button-class {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 10px;
    width: 150px;

    &:hover {
      background-color: #19ced7;
    }
  }

  .add-button {
    background-color: #007bff;

    &:hover {
      background-color: #0056b3;
    }
  }

  .remove-button {
    background-color: #dc3545;

    &:hover {
      background-color: #b02a37;
    }
  }
`;

export default QuestionForm;
