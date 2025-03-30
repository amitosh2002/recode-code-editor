import { FETCH_ALL_TEST, FETCH_SINGLE_TEST } from "../Constants/testConstant";
import axios from "axios";

export const fetchAllTests = () => async (dispatch) => {
  //   const token = localStorage.getItem("token"); // ✅ Check if token exists

  //   console.log("🚀 Token being sent:", token); // 🔍 Debugging

  //   if (!token) {
  //     console.error("No token found! User might not be logged in.");
  //     return;
  //   }

  try {
    const response = await axios.get(`http://localhost:6001/api/test/allTest`, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // Ensure cookies/tokens are sent if needed
    });

    dispatch({ type: FETCH_ALL_TEST, payload: response.data.allTest });
  } catch (error) {
    console.error("Error fetching tests:", error);
  }
};

export const fetchSingleTest = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:6001/api/test/singletest/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Ensure cookies/tokens are sent if needed
      }
    );
    dispatch({ type: FETCH_SINGLE_TEST, payload: response.data.test });
  } catch (error) {
    console.error("Error fetching tests:", error);
  }
};
