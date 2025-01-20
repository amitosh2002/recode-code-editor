import React from "react";
import styled from "styled-components";
import QuestionCard from "./QuestionCard";
import { useSelector } from "react-redux";

const QuestionList = () => {
  const allQuestion = useSelector((state) => state.mainComponent.problems);
  console.log("bcvhfc", allQuestion);

  return (
    <QuestionContainerAdmin>
      <div class="container">
        <div class="header">
          <h1>Schedule Management</h1>
          <p>Manage all your existing schedules or add a new schedule.</p>
          <button class="add-schedule-btn">+ Add New Schedule</button>
        </div>
        <table class="schedule-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Employee</th>
              <th>Schedule</th>
              <th>Period</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {allQuestion.map((question, index) => {
                const { tittle } = question;
                return (
                  <>
                    <td>{index + 1}</td>
                    <td class="employee-info">
                      {/* <img src="tara.jpg" alt="Tara Peter"> */}
                      <span>{tittle}r</span>
                    </td>
                    <td>Morning Shift</td>
                    <td>Nov 5 - Nov 15</td>
                    <td>
                      <span class="status inactive">Inactive</span>
                    </td>
                    <td class="actions">
                      <button class="edit-btn">✏️</button>
                      <button class="delete-btn">🗑️</button>
                    </td>
                  </>
                );
              })}
            </tr>
          </tbody>
        </table>
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
