import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { CgAdd, CgRemove } from "react-icons/cg";
import { onerrorToast, onSucessToast } from "../../component/Tostify";
import { useDispatch } from "react-redux";
import { createTest } from "../../Redux/Actions/testActions";

const TestForm = ({ Popup, setPopup, handleSubmit }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
  subjectCode: "",
  subjectName: "",
  date: null, // Will be a Date object
  startTime: null, // Date object for time
  endTime: null, // Date object for time
  duration: 0, // Number
  totalQuestions: 0, // Number
  passingScore: 0, // Number
  testId: "",
  questions: [
    {
      questionTitle: "",
      questionDescription: "",
      questionText: "",
      difficulty: "",
      testCases: [
        {
          input: "",
          output: "",
        },
      ],
    },
  ],
});

  useEffect(()=>{
    try {
      if (formData?.questions?.length === 0) {
        dispatch(createTest(formData));
        
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
      onerrorToast("Fill all the fields properly")

      
    }
  },[Popup])


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][e.target.name] = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleTestCaseChange = (qIndex, e) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[qIndex].testCases[0][e.target.name] = e.target.value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          questionTitle: "",
          questionDescription: "",
          questionText: "",
          difficulty: "",
          testCases: [{ input: "", output: "" }],
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions.splice(index, 1);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // const onSubmit = () => {
  //   // handleSubmit(formData);
  //       dispatch(createTest(formData));
  //       onSucessToast("Test Created Successfully")

  //   setPopup(false);
  // };
       const onSubmit = () => {
  try {
    const { date, startTime, endTime, ...rest } = formData;

    const fullStart = new Date(`${date}T${startTime}`);
    const fullEnd = new Date(`${date}T${endTime}`);

    const finalPayload = {
      ...rest,
      date, // keep original date
      startTime: fullStart.toISOString(),
      endTime: fullEnd.toISOString(),
    };

    dispatch(createTest(finalPayload));
    onSucessToast("Test Created Successfully");
    setPopup(false);
  } catch (error) {
    console.error(error);
    onerrorToast("Failed to create test");
  }
};

  return (
    <Dialog open={Popup} onClose={() => setPopup(false)} maxWidth="md" fullWidth>
      <DialogTitle>Create Test</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Test Info Fields */}
          {[
            ["Subject Code", "subjectCode"],
            ["Subject Name", "subjectName"],
            ["Date", "date", "date"],
            ["Start Time", "startTime", "time"],
            ["End Time", "endTime", "time"],
            ["Duration (minutes)", "duration"],
            ["Total Questions", "totalQuestions"],
            ["Passing Score", "passingScore"],
            ["Test ID", "testId"],
          ].map(([label, name, type = "text"], idx) => (
            <Grid item xs={6} key={idx}>
              <TextField
                label={label}
                name={name}
                fullWidth
                type={type}
                value={formData[name]}
                onChange={handleChange}
                InputLabelProps={type !== "text" ? { shrink: true } : {}}
              />
            </Grid>
          ))}

          {/* Questions Section */}
          {formData.questions.map((q, index) => (
            <Grid item xs={12} key={index}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ marginBottom: 0 }}>Question {index + 1}</h3>
                {formData.questions.length > 1 && (
                  <IconButton onClick={() => removeQuestion(index)} color="error">
                    <CgRemove/>
                  </IconButton>
                )}
              </div>

              <Grid container spacing={2} mt={0}>
                <Grid item xs={6}>
                  <TextField
                    label="Question Title"
                    name="questionTitle"
                    fullWidth
                    value={q.questionTitle}
                    onChange={(e) => handleQuestionChange(index, e)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Question Description"
                    name="questionDescription"
                    fullWidth
                    value={q.questionDescription}
                    onChange={(e) => handleQuestionChange(index, e)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Question Text"
                    name="questionText"
                    fullWidth
                    value={q.questionText}
                    onChange={(e) => handleQuestionChange(index, e)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Difficulty"
                    name="difficulty"
                    fullWidth
                    value={q.difficulty}
                    onChange={(e) => handleQuestionChange(index, e)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <h4>Test Case</h4>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Input"
                    name="input"
                    fullWidth
                    value={q.testCases[0]?.input || ""}
                    onChange={(e) => handleTestCaseChange(index, e)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Output"
                    name="output"
                    fullWidth
                    value={q.testCases[0]?.output || ""}
                    onChange={(e) => handleTestCaseChange(index, e)}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}

          {/* Add Question Button */}
          <Grid item xs={12}>
            <Button startIcon={<CgAdd/>} onClick={addQuestion} variant="outlined" fullWidth>
              Add Question
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setPopup(false)} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestForm;
