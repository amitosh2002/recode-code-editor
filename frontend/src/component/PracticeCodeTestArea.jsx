import React from "react";
import styled from "styled-components";

const PracticeCodeTestArea = ({ outputCode, error }) => {
  console.log(error);

  return (
    <TerminalContainer>
      <div className="terminal-container">
        <div className="terminal-header">
          <span className="path">~/path/to/{"<re/code>"}/practice/</span>
        </div>
        <div className="terminal-body">
          <textarea
            className={error ? "terminal-input" : "terminal-input-error"}
            value={outputCode}
            readOnly
          />
        </div>
      </div>
    </TerminalContainer>
  );
};

export default PracticeCodeTestArea;
const TerminalContainer = styled.div`
  .terminal-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(164, 159, 159, 0.1);
    width: 100%;
    height: 150px;
    margin-bottom: 20px;
  }

  .terminal-header {
    background-color: #0b0b09;
    color: #0d0a0a;
    padding: 5px 10px;
  }

  .terminal-body {
    background-color: #0a0a0aec;
    color: #f6f5f5;

    padding: 10px;
    height: 150px; /* Adjust height as needed */
    overflow-y: scroll;
  }

  .terminal-input {
    width: 100%;
    height: 100%;
    border: none;
    resize: none;
    font-family: monospace;
    font-size: 14px;
    background-color: transparent;
    color: #020202;
  }
  .terminal-input-error {
    width: 100%;
    height: 100%;
    border: none;
    resize: none;
    font-family: monospace;
    font-size: 14px;
    background-color: transparent;
    color: #e10202;
  }

  .path {
    color: #f2eeee;
  }
`;
