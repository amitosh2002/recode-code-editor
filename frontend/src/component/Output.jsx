import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ececutionCode } from "../Services/Api";
import Loading from "../EditorComponent/Loading";
const Output = ({ language, editorRef }) => {
  const [outputCode, setOutputCode] = useState(null);
  const [waiting, setWaiting] = useState(false);
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      const { run: result } = await ececutionCode(language, sourceCode);
      setOutputCode(result.output);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className="outputWindow">
        <button onClick={runCode}>Run</button>

        <textarea
          name="executionResult"
          id=""
          value={
            outputCode ? outputCode : "Click on  run button to execute the Code"
          }
          rows={15}
          height="70vh"
          width="320px"
        ></textarea>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .outputWindow {
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 8px;
    width: 650px;
  }
  button {
    width: 90px;
    margin-bottom: 20px;
    padding: 12.5px 30px;
    border: 0;
    border-radius: 100px;
    background-color: #2ba8fb;
    color: #ffffff;
    font-weight: Bold;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
  }

  button:hover {
    background-color: #6fc5ff;
    box-shadow: 0 0 20px #6fc5ff50;
    transform: scale(1.1);
  }

  button:active {
    background-color: #3d94cf;
    transition: all 0.25s;
    -webkit-transition: all 0.25s;
    box-shadow: none;
    transform: scale(0.98);
  }
`;
export default Output;
