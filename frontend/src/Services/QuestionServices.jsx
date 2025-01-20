import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5001",
});

export const getQuestionList = () => {
  return API.get("/questions");
};
export const addQuestions = async () => {
  try {
    const response = await axios.post(url, question, {
      headers: {
        "Content-Type": "application/json", // Set the correct content type
      },
    });
    console.log("Question added successfully:", response.data);
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Other errors
      console.error("Error setting up the request:", error.message);
    }
  }
  return API.post("/questions", data);
};
