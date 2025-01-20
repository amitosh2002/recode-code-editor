import React from "react";
import styled from "styled-components";

const QuestionCard = ({ title, onEdit, onDelete, onView }) => {
  return (
    <CardWrapper>
      <h3 className="question-title">{title}jhdanavjnvlaejiaejiaj</h3>
      <div className="button-group">
        <button className="edit-btn" onClick={onEdit}>
          Edit
        </button>
        <button className="delete-btn" onClick={onDelete}>
          Delete
        </button>
        <button className="view-btn" onClick={onView}>
          View
        </button>
      </div>
    </CardWrapper>
  );
};

export default QuestionCard;

// Styled components
const CardWrapper = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 6px;
  margin: 16px 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 600px;
  max-width: 800px;
  background-color: #f9f9f9;

  .question-title {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 12px;
    text-align: left;
  }

  .button-group {
    display: flex;
    gap: 8px;
  }

  button {
    padding: 6px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s ease;

    &.edit-btn {
      background-color: #007bff;
      color: white;
    }

    &.edit-btn:hover {
      background-color: #0056b3;
    }

    &.delete-btn {
      background-color: #dc3545;
      color: white;
    }

    &.delete-btn:hover {
      background-color: #a71d2a;
    }

    &.view-btn {
      background-color: #28a745;
      color: white;
    }

    &.view-btn:hover {
      background-color: #1e7e34;
    }
  }
`;
