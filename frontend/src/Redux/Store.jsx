import { configureStore } from "@reduxjs/toolkit";
import mainComponentReducer from "../Redux/Slices/AdminSlice";
import editiorReducer from "../Redux/Slices/EditiorSlice";
const store = configureStore({
  reducer: {
    mainComponent: mainComponentReducer, // dont know why buy i have to write mainComponentReducer here
    editor: editiorReducer,
  },
});

export default store;
