import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const TestForm = ({ Popup, setPopup, handleSubmit }) => {
  const [formData, setFormData] = useState({
    subjectCode: "",
    subjectName: "",
    date: "",
    startTime: "",
    endTime: "",
    duration: "",
    totalQuestions: "",
    passingScore: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    handleSubmit(formData);
    setPopup(false);
  };

  return (
    <Dialog
      open={Popup}
      onClose={() => setPopup(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Create Test</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Subject Code"
              name="subjectCode"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Subject Name"
              name="subjectName"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="date"
              label="Date"
              name="date"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="time"
              label="Start Time"
              name="startTime"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="time"
              label="End Time"
              name="endTime"
              fullWidth
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Duration (minutes)"
              name="duration"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Questions"
              name="totalQuestions"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Passing Score"
              name="passingScore"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setPopup(false)}
          color="secondary"
          variant="outlined"
        >
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
