import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Editor } from "@monaco-editor/react";
import PracticeCodeQuestionView from "./PracticeCodeQuestionView";
import { useDispatch, useSelector } from "react-redux";
import LanguageButton from "./LanguageButton";
import { useRef } from "react";
import runCode from "./TestCaseOutput";
import { useParams } from "react-router-dom";
import TestCaseOutput from "./TestCaseOutput";
import PageNavigation from "./PageNavigation";
import { getQuestionList } from "../Services/QuestionServices";
const PracticeCodePanel = (props) => {
  // const QuestionProblem = useSelector((state) => state.mainComponent.problems);
  const params = useParams();
  const pid = params.id;
  const question = useSelector((state) =>
    state.mainComponent.problems.find((q) => q._id === pid)
  );

  const language = useSelector((state) => state.editor.currentLanguage);
  console.log(language);
  const editorRef = useRef(null);
  // const handleOutput = (language, editorRef) => {
  //   runCode(language, editorRef);
  //   console.log(btnClicked);
  // };
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };
  // ----getting questionDetails from redux store-----------------
  const { description, questionText, tittle, testCases } = question;

  return (
    <>
      <PracticeCodeWrapper>
        <PageNavigation tittle={tittle} />
        <div className="container">
          <div className="QuestionPreview">
            <PracticeCodeQuestionView
              questionText={questionText}
              tittle={tittle}
              description={description}
              testCases={testCases}
            />
          </div>
          <div className="EditorBody">
            <LanguageButton />
            <Editor
              height="60vh"
              width={720}
              language={language}
              className="editorBody"
              ref={editorRef}
              onMount={handleEditorDidMount}
            />
          </div>
        </div>
      </PracticeCodeWrapper>
      <OutPutWrapper>
        <TestCaseOutput
          language={language}
          editorRef={editorRef}
          testCases={testCases}
        />
      </OutPutWrapper>
    </>
  );
};
const OutPutWrapper = styled.div`
  margin-bottom: 36px;
`;
const PracticeCodeWrapper = styled.div`
  .editorBody {
    border: solid 2px black;
    padding: 5px;
    margin: 5px;
    background-color: #e6e9efd7;
  }
  .container {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    gap: 0px 7px;
    grid-auto-flow: row;
  }

  .QuestionPreview {
    grid-area: 1 / 1 / 2 / 2;
  }

  .EditorBody {
    grid-area: 1 / 2 / 2 / 3;
  }
`;
export default PracticeCodePanel;
