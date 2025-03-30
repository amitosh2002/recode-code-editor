import { Card, CardContent, Typography, Button, Chip } from "@mui/material";
import "./AvailableTests.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllTests } from "../../Redux/Actions/testActions";
import { onerrorToast } from "../../component/Tostify";
const AvailableTests = () => {
  const dispatch = useDispatch();
  const getCurrentTime = () =>
    new Date().toLocaleTimeString("en-US", { hour12: false });
  useEffect(() => {
    try {
      dispatch(fetchAllTests()); // ✅ Fix: Use `dispatch()`
    } catch (error) {
      onerrorToast("Failed to fetch tests", error); // ✅ Fix: Use `onerrorToast()`
    }
  }, [dispatch]);
  const tests = useSelector((state) => state.testReducer.allTests);
  const navigate = useNavigate();

  const onJoinTest = (testId, Joinkey) => {
    const data = { testId, Joinkey };
    navigate(`/exam/${testId}`, { state: { data } });
  };

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

              {isActive ? (
                <div className="join-section">
                  <Typography variant="body2" className="join-key">
                    Join Key: <strong>{test.accessKey}</strong>
                  </Typography>
                  <Button
                    variant="contained"
                    className="join-button"
                    onClick={() => onJoinTest(test._id, test.accessKey)}
                  >
                    Join Test
                  </Button>
                </div>
              ) : (
                <Button
                  variant="contained"
                  className="take-button"
                  // onClick={() => onJoinTest(test.id)}
                >
                  Take Test
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AvailableTests;
