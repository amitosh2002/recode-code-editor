import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Editor } from "@monaco-editor/react";
import PracticeCodeQuestionView from "./PracticeCodeQuestionView";
import { useDispatch, useSelector } from "react-redux";
import LanguageButton from "./LanguageButton";
import { useRef } from "react";
// import runCode from "./TestCaseOutput";
import { useParams } from "react-router-dom";
import TestCaseOutput from "./TestCaseOutput";
import PageNavigation from "./PageNavigation";
// import { getQuestionList } from "../Services/QuestionServices";
// import Stopwatch from "./Stopwatch";
import { getSingleQuestion } from "../Services/QuestionServices";
const PracticeCodePanel = (props) => {
  // const QuestionProblem = useSelector((state) => state.mainComponent.problems);
  const params = useParams();
  const pid = params.id;
  const [currQuestion, setCurrQuestion] = useState([]);
  const handleSingleQuestion = async (pid) => {
    try {
      const res = await getSingleQuestion(pid);
      setCurrQuestion(res.data.singleQuestion);
      console.log(currQuestion);
      
      
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    handleSingleQuestion(pid);
  }, [pid]);
 
  const language = useSelector((state) => state.editor.currentLanguage);
  console.log(language);
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  return (
    <>
      <PracticeCodeWrapper>
        <PageNavigation tittle={currQuestion.tittle} />
        {/* <Stopwatch /> */}
        <div className="container">
          <div className="QuestionPreview">
            <PracticeCodeQuestionView
              questionText={currQuestion.questionText}
              tittle={currQuestion.tittle}
              description={currQuestion.description}
              testCases={currQuestion.testCases}
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
          testCases={currQuestion.testCases}
          currQuestion={currQuestion}
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

// import React, { useEffect, useState, useRef } from "react";
// import styled from "styled-components";
// import { Editor } from "@monaco-editor/react";
// import PracticeCodeQuestionView from "./PracticeCodeQuestionView";
// import { useSelector } from "react-redux";
// import LanguageButton from "./LanguageButton";
// import TestCaseOutput from "./TestCaseOutput";
// import PageNavigation from "./PageNavigation";
// import Stopwatch from "./Stopwatch";
// import { getSingleQuestion } from "../Services/QuestionServices";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const PracticeCodePanel = () => {
//   const { id: pid } = useParams();
//   const [currQuestion, setCurrQuestion] = useState(null);
//   const language = useSelector((state) => state.editor.currentLanguage);
//   const editorRef = useRef(null);

//   // Fetch single question
//   useEffect(() => {
//     const fetchQuestion = async (pid) => {
//       try {
//         // const res = await getSingleQuestion(pid);
//         // // const QuestionData = Object.entries(res.data.SingleQuestion);
//         // // console.log(QuestionData);

//         // setCurrQuestion(res.data.SingleQuestion); // ✅ Fix: Update state with API response
//         // console.log(res.data);
//         // // console.log(currQuestion);
//         const res = await axios.get(
//           `http://localhost:6001/api/singleQuestion/${pid}`
//         );
//         console.log(res.data);
//       } catch (error) {
//         console.error("Error fetching question:", error.message);
//       }
//     };

//     fetchQuestion(pid);
//   }, [pid]); // ✅ Fix: Re-run API call when `pid` changes

//   const handleEditorDidMount = (editor) => {
//     editorRef.current = editor;
//   };

//   // ✅ Fix: Prevent rendering before data is available
//   if (!currQuestion) return <p>Loading question...</p>;

//   return (
//     <>
//       <PracticeCodeWrapper>
//         <PageNavigation tittle={currQuestion.tittle} />
//         <Stopwatch />
//         <div className="container">
//           <div className="QuestionPreview">
//             <PracticeCodeQuestionView
//               questionText={currQuestion.questionText}
//               tittle={currQuestion.tittle}
//               description={currQuestion.description}
//               testCases={currQuestion.testCases}
//             />
//           </div>
//           <div className="EditorBody">
//             <LanguageButton />
//             <Editor
//               height="60vh"
//               width={720}
//               language={language}
//               className="editorBody"
//               ref={editorRef}
//               onMount={handleEditorDidMount}
//             />
//           </div>
//         </div>
//       </PracticeCodeWrapper>
//       <OutPutWrapper>
//         <TestCaseOutput
//           language={language}
//           editorRef={editorRef}
//           testCases={currQuestion.testCases}
//         />
//       </OutPutWrapper>
//     </>
//   );
// };

// const OutPutWrapper = styled.div`
//   margin-bottom: 36px;
// `;

// const PracticeCodeWrapper = styled.div`
//   .editorBody {
//     border: solid 2px black;
//     padding: 5px;
//     margin: 5px;
//     background-color: #e6e9efd7;
//   }
//   .container {
//     display: grid;
//     grid-template-columns: 0.9fr 1.1fr;
//     grid-auto-columns: 1fr;
//     grid-auto-rows: 1fr;
//     gap: 0px 7px;
//     grid-auto-flow: row;
//   }

//   .QuestionPreview {
//     grid-area: 1 / 1 / 2 / 2;
//   }

//   .EditorBody {
//     grid-area: 1 / 2 / 2 / 3;
//   }
// `;

// export default PracticeCodePanel;
