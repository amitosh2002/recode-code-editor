import React from "react";
import noTestImg from "../../assets/books.png";
import "./TestOrganizeHome.scss";
import TestForm from "./TestOrganizer";
import { Button } from "@mui/material";
import AvailableTests from "./AvailableTests";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllTests } from "../../Redux/Actions/testActions";
import { onerrorToast } from "../../component/Tostify";

const TestOrganizeHome = () => {
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.testReducer.allTests);

  const [Popup, setPopup] = React.useState(false);
  useEffect(() => {
    try {
      dispatch(fetchAllTests()); // ✅ Fix: Use `dispatch()`
    } catch (error) {
      onerrorToast("Failed to fetch tests", error); // ✅ Fix: Use `onerrorToast()`
    }
  }, [dispatch]);
  return (
    <>
      {tests.length > 0 ? (
        <div className="active_tests" style={{width:"100%",maxWidth:"1450px"}}>
          <AvailableTests />
          <Button onClick={() => setPopup(true)}>Create A Test Now</Button>

          <TestForm Popup={Popup} setPopup={setPopup} />
        </div>
      ) : (
        <div className="home_default">
          <img className="home_default_image" src={noTestImg} alt="No Test" />
          <h2>No Active Test Found</h2>
          <p>Please create a new test or join an existing one.</p>
          <Button onClick={() => setPopup(true)}>Create A Test Now</Button>
          <TestForm Popup={Popup} setPopup={setPopup} />
        </div>
      )}
    </>
  );
};

export default TestOrganizeHome;
