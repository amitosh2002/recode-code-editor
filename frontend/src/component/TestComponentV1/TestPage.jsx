import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTest } from "../../Redux/Actions/testActions";
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

const TestPage = () => {
  const location = useLocation();
  const testCredential = location.state?.data;
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [editorValues, setEditorValues] = useState({});

  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    if (testCredential?.testId) {
      dispatch(fetchSingleTest(testCredential.testId));
    }
  }, [dispatch, testCredential]);

  const currentTest = useSelector((state) => state.testReducer.singleExam);
  const language = useSelector((state) => state.editor.currentLanguage);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditorChange = (value) => {
    setEditorValues((prevValues) => ({
      ...prevValues,
      [activeTab]: value,
    }));
  };

  return (
    <div className="coding_exam">
      {/* Test Info */}
      <Card className="test-info">
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "20px",
            border: "1px solid black",
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
              sx={{ borderBottom: 1, width: "100%", borderColor: "divider" }}
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
                  </Box>
                </>
              )}
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
