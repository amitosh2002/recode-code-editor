import { Card, CardContent, Typography, Button, Chip, DialogActions, TextField, DialogContent, DialogTitle, Dialog } from "@mui/material";
import "./AvailableTests.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllTests } from "../../Redux/Actions/testActions";
import { onerrorToast } from "../../component/Tostify";
import CustomLoader from"../../component/Platform/Loader/customLoader"
const AvailableTests = () => {
  const dispatch = useDispatch();
  const getCurrentTime = () =>
    new Date().toLocaleTimeString("en-US", { hour12: false });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      dispatch(fetchAllTests()); // ✅ Fix: Use `dispatch()
      setIsLoading(false); // ✅ Fix: Set loading state to false after fetching tests
      // `
    } catch (error) {
      onerrorToast("Failed to fetch tests", error); // ✅ Fix: Use `onerrorToast()`
    }
  }, [dispatch]);
  const tests = useSelector((state) => state.testReducer.allTests);
  const navigate = useNavigate();
const [selectedTestId, setSelectedTestId] = useState(null);


   const [open, setOpen] = useState(false);
  const [testKey, setTestKey] = useState("");

  const handleOpen = (testId) => {
  setSelectedTestId(testId);
  setOpen(true);
};

  const handleClose = () => setOpen(false);
  const onJoinTest = () => {
  const selectedTest = tests.find((test) => test._id === selectedTestId);
  if (!selectedTest) return;

  if (testKey === selectedTest.accessKey) {
    const data = { testId: selectedTest._id, Joinkey: selectedTest.accessKey };
    navigate(`/exam/${selectedTest._id}`, { state: { data } });
    setOpen(false);
    setTestKey(""); // clear field
  } else {
    onerrorToast("Invalid Test Key");
  }
};
if (isLoading) {
  return <>
  <CustomLoader/></>; // ✅ Fix: Add loading state
  
}

  return (
    <div className="test-container">
      {tests?.map((test, index) => {
        const isActive =
          getCurrentTime() >= test.startTime.toLocaleString() &&
          getCurrentTime() <= test.endTime.toLocaleString();

        return (
          <Card key={index} className={`test-card ${isActive ? "active" : ""}`}>
            <CardContent>
              <div className="card-header">
                <div className="test_subject_detail">
                  <Typography variant="h5" className="test-title">
                    {test.subjectCode}
                  </Typography>
                  <Typography variant="h5" className="test-title">
                    {test.subjectName}
                  </Typography>
                </div>
                {isActive && (
                  <Chip label="Active Now" className="active-badge" />
                )}
              </div>
              <Typography variant="body1" className="test-info">
                Duration: {test.duration} mins
              </Typography>
              <Typography variant="body2" className="test-info">
                Start: {new Date(test?.startTime).toLocaleString()}
              </Typography>
              <Typography variant="body2" className="test-info">
                End: {new Date(test?.endTime).toLocaleString()}
              </Typography>

              {!isActive ? (
                <div className="join-section">
                  <Typography variant="body2" className="join-key">
                    Join Key: <strong>{test.accessKey}</strong>
                  </Typography>
                 
                  <Button
                      variant="contained"
                      className="join-button"
                      onClick={() => handleOpen(test._id)}
                    >
                      Join Test
                    </Button>

                </div>
                
              ) : (
                <Button
                  variant="contained"
                  className="take-button"
                  onClick={() =>  onerrorToast("Test is not active yet it active a t " + new Date(test?.startTime).toLocaleString())}
                >
                  Take Test
                </Button>
              
              )}
              
      
            </CardContent>
          </Card>



        );
      })}

       
      <Dialog open={open} onClose={handleClose}>
  <DialogTitle>
    <Typography variant="h6">Enter the test key to join the test</Typography>
  </DialogTitle>
  <DialogContent>
    <TextField
      fullWidth
      placeholder="Enter the code"
      value={testKey}
      onChange={(e) => setTestKey(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="secondary">
      Cancel
    </Button>
    <Button onClick={onJoinTest} variant="contained" color="primary">
      Submit
    </Button>
  </DialogActions>
</Dialog>



    </div>
  );
};

export default AvailableTests;
