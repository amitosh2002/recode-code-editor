import { createSlice } from "@reduxjs/toolkit";
// import Userlist from "../../Admin/Userlist";

const initialState = {
  currentComponent: "Userlist",
  problems: [],
  totalQuestion: 0,
};
const mainComponentSlice = createSlice({
  name: "mainComponent",
  initialState,
  reducers: {
    setCurrentComponent: (state, action) => {
      state.currentComponent = action.payload; //errror line
    },
    updateQuestionProblems: (state, action) => {
      // state.problems = action.payload; // Update problems state with new data
      // state.data = action.payload;
      state.problems = [...state.problems, ...action.payload]; //append the data in the problems array
    },
    updateTotalQuestionCount: (state, action) => {
      state.totalQuestion = action.payload; // Update totalQuestionCount state with new data
    },
  },
});

export const {
  setCurrentComponent,
  updateQuestionProblems,
  updateTotalQuestionCount,
} = mainComponentSlice.actions;
export default mainComponentSlice.reducer;

// export default mainComponent.reducer;
