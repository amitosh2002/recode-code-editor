import { onerrorToast, onSucessToast } from "../../component/Tostify";
import { submitTest } from "../../Services/UserServices";
import { SET_USER_DATA } from "../Constants/constants";
import { SET_USER_DETAILS } from "../Constants/constants";
import { SET_USER_LIST } from "../Constants/constants";
export const handleUserDetails = (payload) => (dispatch) => {
    if (!payload) {
        onerrorToast("Cannot Fetch User Details");
        return;
    }
    dispatch({
        type: SET_USER_DETAILS,
        payload, // ✅ Ensure correct payload
    });
};
export const handleLogOut = () => (dispatch) => {
    // ✅ Clear authentication data (localStorage, sessionStorage, cookies)
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    dispatch({
        type: SET_USER_DETAILS,
        payload: {}, 
    });
    console.log("User Logout Sucessfully");
    
    onSucessToast("User Logout Sucessfully");
};

export const handleUserData = (payload) => (dispatch) => {
    if (!payload) {
        onerrorToast("Cannot Fetch User Data");
        return;
    }
    dispatch({
        type: SET_USER_DATA,
        payload, 
    });
};

export const handleEnableFormEdit=(payload) => (dispatch) => {
    dispatch({
        type: SET_USER_LIST,
        payload, 
    });
}

export const handleSubmitAnswers= (payload) =>async (dispatch) => {
    if (!payload) {
        onerrorToast("Cannot Submit Answers , please try again");
        return;
    }
   try {
     const res = await submitTest(payload);
     if (!res){ 
        onerrorToast("Cannot Submit Answers , please try again");
        return;
     }else{

         onSucessToast("Successfully Submit Answers");
         console.log(res);
         
     }
   }catch (error) {
    onerrorToast(error);
   }
   
};

