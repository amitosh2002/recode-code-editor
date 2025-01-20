import { createSlice } from "@reduxjs/toolkit";
// import Userlist from "../../Admin/Userlist";

const initialState = {
  currentComponent: "Userlist",
  problems: [],
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
    // getQuestion: async (state, action) => {
    //   const url = "http://localhost:5001/questions"; // Update with your backend's URL
    //   try {
    //     const res = await fetch(url);
    //     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    //     const data = await res.json();
    //     dispatch(updateQuestionProblems(data));
    //   } catch (error) {
    //     console.error("Error fetching questions:", error);
    //   }
    // },
  },
});

export const { setCurrentComponent, updateQuestionProblems, getQuestion } =
  mainComponentSlice.actions;
export default mainComponentSlice.reducer;

// export default mainComponent.reducer;
