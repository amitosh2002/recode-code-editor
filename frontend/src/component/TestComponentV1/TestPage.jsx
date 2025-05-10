import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  fetchSingleTest, handleTestResultCheker, submitTestResult, testCompilerRun } from "../../Redux/Actions/testActions";
import { onerrorToast } from "../Tostify";
import { Editor } from "@monaco-editor/react";
import LanguageButton from "../LanguageButton";
import {
  Button,
  Tab,
  Tabs,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import "./CodingExamPage.scss";
import {
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import { CgArrowDown,  CgCornerDoubleDownRight } from "react-icons/cg";
import { CLOSE_TEST_CASES_AREA } from "../../Redux/Constants/testConstant";
import Invigilator from "./Invigilator";
import { use } from "react";

const TestPage = () => {
  const location = useLocation();
  const testCredential = location.state?.data;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [editorValues, setEditorValues] = useState({});
  // const [correctTestCases, setCorrectTestCases] = useState(0);

  const editorRef = useRef(null);
  const{checkTestCases} = useSelector((state) => state.testReducer);
  console.log(checkTestCases,"checkTestCases")
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };
  const [monitering,setMonitering]=useState(false);
//

  useEffect(() => {
    if (testCredential?.testId) {
      dispatch(fetchSingleTest(testCredential.testId));
      setMonitering(true)
    }
  }, [dispatch, testCredential]);

  const currentTest = useSelector((state) => state.testReducer?.singleExam);
  const language = useSelector((state) => state.editor.currentLanguage);
  const {compilerResult,testReport,testCaseResult,outputPopUp} = useSelector((state) => state.testReducer);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditorChange = (value) => {
    setEditorValues((prevValues) => ({
      ...prevValues,
      [activeTab]: value,
    }));
  };

  const handleCompilerRun=()=>{


    const testCasesData = currentTest?.questions[activeTab]?.testCases;
    const passingScore = currentTest?.passingScore;

    
    const code = editorRef.current.getValue() ||" ";  // Get the code from the editor
    dispatch(testCompilerRun(code));
     const checkTestActionData = {
      testCases: testCasesData,
      passingScore: passingScore,
      outputCode:compilerResult
  }
    dispatch(handleTestResultCheker(checkTestActionData))
    // compilerResult
    dispatch({type:CLOSE_TEST_CASES_AREA})
  }
  const {userDetails} = useSelector((state) => state.userReducer);
  


  const answers = currentTest?.questions?.map((question, index) => ({
  questionId: question._id,
  // questionTitle: question.questionTitle,
  // questionDescription: question.questionDescription,
  writtenCode: editorValues[index] || "", // fallback in case no code entered
  testCases: question?.testCases?.map((testCase) => ({
    input: testCase.input,
    output: testCase.output,
  })),
correctAnswers:testReport?.correctTestCases||0,
incorrectTestCases:testReport?.incorrectTestCases||0,
percentageScore:testReport?.totalPercentage||0,
score:testReport?.status||""  // isCorrect: question.testCases.every((testCase) => testCase.passed === true) || "",


}));
  console.log(answers,"answers from test page")


  const handlesubmitTest=()=>{
    // const code = currentTest?.questions[activeTab]?.editorRef.current.getValue();  // Get the code from the editor
    const testData = { currentTest:currentTest,userSubmit:answers, userDetails: userDetails };

    dispatch(submitTestResult(testData));
    console.log(testData,"data from test page")
  }

  return (
    <div className="coding_exam">
      {
        monitering && <Invigilator/>
      }
      {/* Test Info */}
      <Card className="test-info">
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
            border: "1px solid black",
    background:" #111c2e",
    color:"white"

          }}
        >
          <Typography variant="h5">{currentTest?.subjectName}</Typography>
          <Typography variant="subtitle1">
            Subject Code: {currentTest?.subjectCode}
          </Typography>
          <Typography>
            Start Time: {new Date(currentTest?.startTime).toLocaleString()}
          </Typography>
          <Typography>
            End Time: {new Date(currentTest?.endTime).toLocaleString()}
          </Typography>
          <Typography>Duration: {currentTest?.duration} minutes</Typography>
          <Typography>Passing Score: {currentTest?.passingScore}%</Typography>
          <Typography>
            Total Questions: {currentTest?.totalQuestions}
          </Typography>
        </CardContent>
      </Card>

      {/* Exam Section */}
      <div className="exam-section">
        {/* Left Side - Question and Test Cases */}
        <div className="left-panel">
          <div className="tab_control">
            <Box
              sx={{ borderBottom: 1, width: "100%",maxWidth:"1450px", borderColor: "divider" }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="exam questions tabs"
              >
                {currentTest?.questions?.map((question, index) => (
                  <Tab key={index} label={`Question ${index + 1}`} />
                ))}
              </Tabs>
            </Box>
          </div>
          {currentTest?.questions?.map((question, index) => (
            <Box
              key={index}
              role="tabpanel"
              hidden={activeTab !== index}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {activeTab === index && (
                <>
                  <Box
                    sx={{
                      padding: 2,
                      border: "1px solid grey",
                      width: "100%",
                      height: "60vh",
                    }}
                  >
                    <Typography variant="h6">
                      {question.questionTitle}
                    </Typography>
                    <Typography>{question.questionDescription}</Typography>
                    <Typography>
                      <strong>Question Text:</strong> {question.questionText}
                    </Typography>
                    <Typography>
                      <strong>Difficulty:</strong> {question.difficulty}
                    </Typography>
                    <Typography>
                      <strong>Test Cases:</strong>
                    </Typography>
                    <ul style={{ margin: "25px" }}>
                      {question.testCases.map((testCase, testIndex) => (
                        <li key={testIndex}>
                          Input: {JSON.stringify(testCase.input)}, Expected:{" "}
                          {JSON.stringify(testCase.output)}
                        </li>
                      ))}
                    </ul>
                  </Box>

                  <Box sx={{ border: "1px solid grey" }}>
                    <LanguageButton />
                    <Editor
                      height="60vh"
                      width={720}
                      language={language}
                      className="editorBody"
                      ref={editorRef}
                      value={editorValues[activeTab] || ""}
                      onChange={handleEditorChange}
                      onMount={handleEditorDidMount}
                    />
                     <ButtonGroup variant="outlined" aria-label="Loading button group">
                            <Button onClick={handleCompilerRun}>Submit</Button>
                            <Button onClick={handlesubmitTest}>Fetch data</Button>
                            <Button loading loadingPosition="start" startIcon={CgCornerDoubleDownRight}>
                              Save
                            </Button>
                          </ButtonGroup>
                  </Box>
                </>
              )}
              {
                outputPopUp && (
                  <Paper elevation={4} className="bottom-test-panel">
      <Box className="panel-section">
        <Typography variant="h6">Test Cases</Typography>
        <List>
          {testCaseResult?.testCases?.map((test, index) => (
            <ListItem
              key={index}
              className={`test-case ${test.passed ? "passed" : "failed"}`}
            >
              <ListItemText
                primary={`Test ${index + 1}` }
                secondary={test.passed ? "✅ Passed" : "❌ Failed"}
              />
              <ListItemText
                primary={test.input }
                secondary={test.output}
              />
            </ListItem > 
          ))}
        </List>
      </Box>

      <Divider orientation="vertical" flexItem />
      <CgArrowDown size={32} style={{ cursor:"pointer"}}onClick={()=>dispatch({type:CLOSE_TEST_CASES_AREA})}/>

      <Box className="panel-section output-panel">
        <Typography variant="h6">Output</Typography>
        <Box className="output-box">
          <pre>{compilerResult.run.output}</pre>
        </Box>
      </Box>
    </Paper>
                )
              }
            </Box>
            
          ))}

        </div>
      </div>
      {/* output panel */}
      
    </div>
  );
};

export default TestPage;
