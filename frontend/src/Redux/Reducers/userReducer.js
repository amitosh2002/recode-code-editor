import { SET_USER_DATA } from "../Constants/constants";
import { SET_USER_DETAILS } from "../Constants/constants";
import { SET_USER_LIST } from "../Constants/constants";
import { createReducer } from "@reduxjs/toolkit";
import { ENABLE_EDIT_FORM } from "../Constants/constants";

const initialState = {

    userData: [],
    userDetails: {},
    userList: [],   
    FETCH_USER_DATA:false,
    SUCESS_FETCH_USER_DETAIL:false,
    FETCH_USER_USERLIST:false,
    IS_EDIT_FORM_ENABLED:false,
}

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(SET_USER_DETAILS, (state, action) => {
        state.userDetails = action.payload || {}; 
        state.SUCESS_FETCH_USER_DETAIL = Object.keys(action.payload).length > 0; // check wether the condition is true or not.
    })
    .addCase(SET_USER_DATA,(state,action)=>{
        state.userData=action.payload;
    })
    .addCase(SET_USER_LIST,(state,action)=>{
        state.userList=action.payload;
    })
    .addCase(ENABLE_EDIT_FORM,(state,action)=>{
        state.IS_EDIT_FORM_ENABLED=action.payload;

    })
})
