import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteQuestion, getQuestionList } from "../Services/QuestionServices";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTotalQuestionCount } from "../Redux/Slices/AdminSlice";
const QuestionList = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState([]);
  const questionList = async () => {
    try {
      const res = await getQuestionList();
      setQuestion(res.data.allQuestion);
      dispatch(updateTotalQuestionCount(question.length));

      console.log(res.data.allQuestion);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    questionList();
  }, []);
  const submitDelete = ({ id }) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this question?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            handleDeleteQuestion(id);
          },
        },
        {
          label: "No", // Dialog closes automatically without any action
        },
      ],
    });
  };

  const handleDeleteQuestion = async (id) => {
    try {
      const response = await deleteQuestion(id);
      console.log("Question deleted successfully:", response.data);
      setQuestion(question.filter((q) => q._id !== id));
      // Handle success (e.g., update UI, show success message)
    } catch (error) {
      console.error("Error deleting question:", error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <QuestionContainerAdmin>
      <div class="container">
        <div class="header">
          <h1>Question Management</h1>
          <p>Manage all your existing question or add a new question.</p>
          <button
            class="add-schedule-btn"
            onClick={() => {
              submit();
            }}
          >
            + Add New Question
          </button>
        </div>
        <div className="table-body">
          <table class="schedule-table">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Tittle</th>
                <th>Question</th>
                <th>Difficulty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr> */}
              {question.map((question, index) => {
                const {
                  tittle,
                  difficulty,
                  questionText,
                  _id,
                  testCases,
                  description,
                } = question;
                const data = {
                  isUpdate: false,
                  tittle: tittle,
                  difficulty: difficulty,
                  questionText: questionText,
                  _id: _id,
                  testCases: testCases,
                  description,
                };
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td class="employee-info">
                      <span>{tittle}</span>
                    </td>
                    <td>{questionText}</td>
                    <td>
                      <span class="status inactive">{difficulty}</span>
                    </td>
                    <td class="actions">
                      <NavLink to="/admin/questionForm" state={data}>
                        <button class="edit-btn">✏️</button>
                      </NavLink>

                      <button
                        class="delete-btn"
                        onClick={() => {
                          // handleDeleteQuestion(_id);
                          submitDelete({ id: _id });
                        }}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })}
              {/* </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </QuestionContainerAdmin>
  );
};

export default QuestionList;
// Styled Components
const QuestionContainerAdmin = styled.div`
  /* styles.css */
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
  .table-body {
    max-height: 500px; /* Fixed height for the container */
    height: 500px; /* Fixed height for the container */
    overflow-y: auto; /* Enable vertical scrolling */
  }
  .container {
    max-width: 900px;
    margin: 20px auto;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .header h1 {
    font-size: 1.5rem;
    margin: 0;
  }

  .header p {
    color: #6c757d;
    margin: 0;
    font-size: 0.9rem;
  }

  .add-schedule-btn {
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .add-schedule-btn:hover {
    background: #0056b3;
  }

  .schedule-table {
    width: 100%;
    border-collapse: collapse;
  }

  .schedule-table th,
  .schedule-table td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #e9ecef;
  }

  .schedule-table th {
    background: #f8f9fa;
    font-weight: bold;
  }

  .employee-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .employee-info img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .status {
    padding: 5px 10px;
    border-radius: 12px;
    font-size: 0.9rem;
    color: white;
    font-weight: bold;
  }

  .status.active {
    background: #28a745;
  }

  .status.inactive {
    background: #ffc107;
    color: #343a40;
  }

  .actions {
    display: flex;
    gap: 10px;
  }

  .actions button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .actions button:hover {
    opacity: 0.7;
  }
`;
