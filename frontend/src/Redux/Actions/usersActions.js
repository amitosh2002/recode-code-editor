import axios from "axios"
import { getAllUser, loginUser, singleUser } from "../Api/userCredentialApi"
import { onerrorToast, onSucessToast } from "../../component/Tostify"
import { FETCH_ALL_USERS, FETCH_sINGLE_USER, SET_USER_DETAILS } from "../Constants/constants"


export const fetchAllUsers = () => async(dispatch)=>{

    try {
        const response = axios.get(`${getAllUser}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`,
                },
                withCredentials: true, // Ensure cookies/tokens are sent if needed
            }
        )
        if (response.status === 200) {
            dispatch({ type: FETCH_ALL_USERS, payload: response.data.allUsers })
            onSucessToast("User Fetched Successfully")

            
        }
        
    } catch (error) {
        console.error("Error fetching users:", error);
        onerrorToast("Failed to fetch users", error); // ✅ Fix: Use `onerrorToast()`
        
    }

}

export const fetchSingleUser = (id) => async (dispatch) => {
    try {
        const response = await axios.get(
            `${singleUser}/${id}`, // Use the correct endpoint for fetching a single test
            {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`,
                },
                withCredentials: true, // Ensure cookies/tokens are sent if needed
            }
        );
        dispatch({ type: FETCH_sINGLE_USER, payload: response.data.user });
        console.log(id, "id from action");
        
    } catch (error) {
        console.error("Error fetching tests:", error);
        
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(
            `${deleteUser}/${id}`, // Use the correct endpoint for fetching a single test
            {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`,
                },
                withCredentials: true, // Ensure cookies/tokens are sent if needed
            }
        );
        // dispatch({ type: FETCH_sINGLE_USER, payload: response.data.user });
        console.log(id, "id from action");
        console.log(response, "response from delete user action")
        if (response.status === 200) {
            onSucessToast("User Deleted Successfully")

            
        }
        
    } catch (error) {
        console.error("Error fetching tests:", error);
        
    }
}

export const loginValidation = (data) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${loginUser}`,
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`,
                },
                withCredentials: true, // Ensure cookies/tokens are sent if needed
            }
        );
        dispatch({ type: SET_USER_DETAILS, payload: response.data.user });
        console.log(data, "id from action");
        
    } catch (error) {
        console.error("Error fetching tests:", error);
        
    }
}