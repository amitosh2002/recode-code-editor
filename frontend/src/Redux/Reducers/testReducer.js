import { createReducer } from "@reduxjs/toolkit";
import {
  TEST_QUESTION_POPUP,
  FETCH_ALL_TEST,
  FETCH_SINGLE_TEST,
  CREATE_TEST,
  COMPILED_CODE_OUTPUT,
  STORE_TEST_RESULT,
  CLOSE_TEST_CASES_AREA
} from "../Constants/testConstant";

// Define initial state
const initalState = {
  testPopup: false,
  testDate: [],
  allTests: [],
  singleExam: [],
  testData: [],
  compilerResult: null,
  writtenCode: [],
  checkTestCases:false,
  testCaseResult:null,
  testReport:null,

  outputPopUp: false,
  
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
  builder.addCase(CREATE_TEST, (state, action) => {
    state.testData = action.payload; // Update testDate state with new data
  });
  builder.addCase(COMPILED_CODE_OUTPUT, (state, action) => {
   
    state.compilerResult = action.payload?.response; // Update testDate state with new data
    state.writtenCode = action.payload.code; 
    // state.checkTestCases=true; // Update testDate state with new data
  });
  builder.addCase(STORE_TEST_RESULT,(state,action) => {
    state.testReport = action.payload.testReport; // Update testDate state with new data
    state.testCaseResult  = action.payload.testCaseResult; // Update testDate state with new data
    // Handle any other actions if needed
    
  });
  builder.addCase(CLOSE_TEST_CASES_AREA, (state) => {
    state.outputPopUp = ! state.outputPopUp; // Update testDate state with new data
  },)
});
