import React, { useEffect } from "react";
import styled from "styled-components";
import { getQuestionList } from "../Services/QuestionServices";
import { TbHandLittleFinger } from "react-icons/tb";

const PracticeCodeQuestionView = ({
  description,
  tittle,
  questionText,
  testCases,
}) => {
  return (
    <QuestionViewWrapper>
      <div className="container">
        <div className="QuestionDisplay">
          <strong style={{ fontWeight: "800", fontSize: "Larger" }}>
            {tittle}
          </strong>
          <hr />
          <p>{questionText}</p>

          <p>{description}</p>
        </div>
        <div className="TestCase">
          <ol>
            {testCases?.map((testCase, index) => (
              <li key={index}>
                Example {index + 1}: Input: {testCase.input} Output:{" "}
                {testCase.output}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </QuestionViewWrapper>
  );
};

export default PracticeCodeQuestionView;

const QuestionViewWrapper = styled.div`
  background-color: #e6e9efd7;
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 5px;

  p {
    font-size: large;
  }
  li {
    text-decoration: none;
    list-style: none;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    gap: 20px;
    grid-template-areas:
      "QuestionDisplay"
      "TestCase";
  }

  .QuestionDisplay {
    grid-area: QuestionDisplay;
    height: 320px; /* Fixed height to enable scrolling */
    overflow-y: scroll; /* Ensure scrolling is always enabled */
    padding: 15px;
    width: 650px;
    background-color: #ffffff;
    border: 1px solid #f6f3f3;
    border-radius: 5px;

    /* Custom scrollbar styles */
    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #080808;
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #000000;
    }
  }

  .TestCase {
    grid-area: TestCase;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-inline-start: 10px;
  }
`;
