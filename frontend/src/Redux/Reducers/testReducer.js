import { createReducer } from "@reduxjs/toolkit";
import {
  TEST_QUESTION_POPUP,
  FETCH_ALL_TEST,
  FETCH_SINGLE_TEST,
} from "../Constants/testConstant";

// Define initial state
const initalState = {
  testPopup: false,
  testDate: [],
  allTests: [],
  singleExam: [],
};

// Define action types
export const testReducer = createReducer(initalState, (builder) => {
  builder.addCase(TEST_QUESTION_POPUP, (state) => {
    state.testPopup = !state.testPopup;
  });

  builder.addCase(FETCH_ALL_TEST, (state, action) => {
    state.allTests = action.payload; // ✅ Fix: Correctly extract `payload`
  });
  builder.addCase(FETCH_SINGLE_TEST, (state, action) => {
    state.singleExam = action.payload; // Update singleExam state with new data
  });
});
