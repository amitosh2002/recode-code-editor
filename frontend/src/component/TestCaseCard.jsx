import React from "react";
import styled from "styled-components";
import { VscPassFilled } from "react-icons/vsc";
import { ImCross } from "react-icons/im";
const TestCaseCard = ({ outputCode, testCases }) => {
  return (
    <TestCaseWrapper>
      {testCases.map((testCase, index) => {
        // Normalize both expected and actual output
        const expectedOutput = String(testCase.output).trim();
        const actualOutput = String(outputCode).trim();

        console.log(
          "Expected Output:",
          expectedOutput,
          "Actual Output:",
          actualOutput
        );

        const status = expectedOutput === actualOutput ? "Pass" : "Fail";
        console.log(status);
        return (
          <div
            className={
              status === "Pass"
                ? "test-case-card-pass"
                : status === "Fail"
                ? "test-case-card-fail"
                : "test-case-card"
            }
            key={index}
          >
            <div className="test-case-status">
              {status === "Pass" ? (
                <>
                  <VscPassFilled style={{ color: "green" }} size={30} />
                  <span style={{ color: "green", marginLeft: "5px" }}>
                    Pass
                  </span>
                </>
              ) : (
                <>
                  <ImCross style={{ color: "red" }} size={20} />
                  <span style={{ color: "red", marginLeft: "5px" }}>Fail</span>
                </>
              )}
              <h3>Test Case {index + 1}</h3>
            </div>

            <div className="testCase">
              <span>
                <p>Input:</p>
                <pre>{testCase.input}</pre>
              </span>
              <span>
                <p>Expected Output:</p>
                <pre>{expectedOutput}</pre>
              </span>
            </div>
            <div className="user-output">
              <span>
                <p>Output:</p>
                <pre>{actualOutput}</pre>
              </span>
            </div>
          </div>
        );
      })}
    </TestCaseWrapper>
  );
};

export default TestCaseCard;
const TestCaseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  .test-case-status {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
  }
  .test-case-card {
    background-color: #0a0a09;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 250px;
    height: 180px;
    padding: 10px;
    border: 1px solid green;
    border-radius: 5px;
    margin: 20px;
    box-sizing: border-box;
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  .test-case-card-pass {
    background-color: #fcfbf8;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 250px;
    height: 150px;
    padding: 10px;
    border: 1px solid green;
    border-radius: 5px;
    margin: 20px;
    /* box-sizing: border-box; */
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  .test-case-card-fail {
    background-color: #fcfbf8;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 250px;
    height: 150px;
    padding: 10px;
    border: 1px solid red;
    border-radius: 5px;
    margin: 20px;
    /* box-sizing: border-box; */
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  h3 {
    font-weight: 300px;
    font-family: "Helvetica";
  }
  p {
    /* font-size: large; */
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    margin-top: 3px;
  }
  span {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
  }
  pre {
    font-weight: 300px;
    font-family: "Helvetica";
    margin-top: 6px;
  }
`;
