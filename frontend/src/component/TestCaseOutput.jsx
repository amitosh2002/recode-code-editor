import React, { useState } from "react";
import { ececutionCode } from "../Services/Api";
import styled from "styled-components";
// import { VscPassFilled } from "react-icons/vsc";
// import { ImCross } from "react-icons/im";
import TestCaseCard from "./TestCaseCard";
import PracticeCodeTestArea from "./PracticeCodeTestArea";
// import { handleSubmitAnswers } from "../Redux/Actions/actions";
import { onSucessToast,onerrorToast } from "./Tostify";
import { submitTest } from "../Services/UserServices";
import { useSelector } from "react-redux";

const TestCaseOutput = ({ testCases, language, editorRef ,currQuestion}) => {
  const [outputCode, setOutputCode] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [testCaseComponent, setTestCaseComponent] = useState(false);
  const [outputComponent, setOutputComponent] = useState(false);
  // console.log("testCaseComponent", currQuestion._id );
  const userDetails = useSelector((state)=>state.userReducer.userDetails)

// console.log(userDetails ,"ssnj");

  const submitTestData ={
    id:userDetails.id,
  testDetails: { // Added a key 'testDetails' to wrap the inner object
    date: new Date().toISOString().slice(0, 10),
    passed: "",
    failed: "",
    questionId: currQuestion._id || "",
    programming_language:language,
    questionDetails: currQuestion.description || "",
    // writtenCode: editorRef.current.getValue() || "",
    questionAnswer: testCases || "",
    answerStatus: "",
    feedback: "",
    report: [],
  },}

  console.log(submitTestData);
const handleOnSubmit = async () => {
  if (!submitTestData || !submitTestData.testDetails) {
    onerrorToast("Cannot Submit Answers, please try again");
    return;
  }

  console.log("Sending Data:", JSON.stringify(submitTestData, null, 2));

  try {
    const res = await submitTest({
      id: submitTestData.id, 
      testDetails: submitTestData.testDetails, 
    });

    if (!res) {
      onerrorToast("Cannot Submit Answers, please try again");
      return;
    } else {
      onSucessToast("Successfully Submitted Answers");
      console.log("Response Data:", res);
    }
  } catch (error) {
    console.error("Submit Error:", error);
    onerrorToast(error.message);
  }

  console.log("Submit Clicked");
};


  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    setWaiting(true); // Show waiting status
    try {
      const { run: result } = await ececutionCode(language, sourceCode);
      console.log("Result:", result); // Debugging
      setOutputCode(result.output); // Update state
    } catch (error) {
      console.error("Error running code:", error);
      setIsError(true); // Show error status
    } finally {
      setWaiting(false); // Stop waiting
    }
  };
  

  return (
    <div>
      <ButtonPossitionWrapper>
        <Button
          onClick={() => {
            runCode(), setOutputComponent(true), setTestCaseComponent(false);
          }}
        >
          Run Code
        </Button>
        <Button
          onClick={() => {
            runCode(), setTestCaseComponent(true), setOutputComponent(false);
          }}
        >
          Run All TestCase
        </Button>
        <Button onClick={()=>handleOnSubmit(submitTestData)}>Submit</Button>
        {waiting && <p>Waiting for code execution...</p>}
      </ButtonPossitionWrapper>
      {testCaseComponent && (
        <TestCaseCard outputCode={outputCode} testCases={testCases} />
      )}
      {outputComponent && (
        <PracticeCodeTestArea outputCode={outputCode} error={IsError} />
      )}
    </div>
  );
};

export default TestCaseOutput;

const ButtonPossitionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-right: 90px;
  /* justify-items: flex-end; */
`;
const Button = styled.div`
  margin-right: 10px;
  display: inline-block;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #45a049;
  }
`;
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
    background-color: #fcfbf8;
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
