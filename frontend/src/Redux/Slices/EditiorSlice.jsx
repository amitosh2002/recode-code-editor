import { createSlice } from "@reduxjs/toolkit";
import Output from "../../component/Output";
import { useRef } from "react";

const initialState = {
  currentLanguage: "javascript",
  Output: "",
  // editiorRef: null,
};
// const editiorRef = useRef(null);
const editiorSlice = createSlice({
  name: "editor",
  initialState,

  reducers: {
    setCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    // setEditorOutput: (state, action) => {
    //   const { language, editorRef } = action.payload;
    //   state.language = language;
    //   state.editorRef = editorRef;
    //   const runCode = async () => {
    //     const sourceCode = editorRef.current.getValue();
    //     if (!sourceCode) return;

    //     try {
    //       const { run: result } = await ececutionCode(language, sourceCode);
    //       state.Output = result.Output;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
    // },

    //for boilerplate purposes
    // setEditiorInput: (state, action) => {},
  },
});

export const { setCurrentLanguage, setEditorOutput } = editiorSlice.actions;
export default editiorSlice.reducer;
