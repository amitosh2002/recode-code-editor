import { onSucessToast } from "../../component/Tostify";
import { COMPILED_CODE_OUTPUT, FETCH_ALL_TEST, FETCH_SINGLE_TEST, STORE_TEST_RESULT } from "../Constants/testConstant";
import axios from "axios";
// import { useSelector } from "react-redux";
import { LANGUAGE_VERSIONS } from "../../EditorComponent/Language";
import store from "../Store"
import { allTest, singleTestUrl, submitCurrentTest } from "../Api/testApi";
export const fetchAllTests = () => async (dispatch) => {
  //   const token = localStorage.getItem("token"); // ✅ Check if token exists

  //   console.log("🚀 Token being sent:", token); // 🔍 Debugging

  //   if (!token) {
  //     console.error("No token found! User might not be logged in.");
  //     return;
  //   }

  try {
    const response = await axios.get(`${allTest}`, {
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
      `${singleTestUrl}/${id}`, // Use the correct endpoint for fetching a single test
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Ensure cookies/tokens are sent if needed
      }
    );
    dispatch({ type: FETCH_SINGLE_TEST, payload: response.data.test });
    console.log(id, "id from action");
    
  } catch (error) {
    console.error("Error fetching tests:", error);
    
  }
};

export const createTest = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${createTest}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Ensure cookies/tokens are sent if needed
      }
    );
    if (response.status === 200) {
      console.log("Test created successfully:", response.data);
      onSucessToast("Test Created Successfully");
    }
    // dispatch({ type: FETCH_ALL_TEST, payload: response.data.allTest });
  } catch (error) {
    console.error("Error creating test:", error);
  }
};


export const deleteTest = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${deleteTest}/${id}`, // Use the correct endpoint for deleting a test
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        withCredentials: true, // Ensure cookies/tokens are sent if needed
      }
    );
    if (response.status === 200) {
      console.log("Test deleted successfully:", response.data);
      onSucessToast("Test Deleted Successfully");
    }
  } catch (error) {
    console.error("Error deleting test:", error);
  }
}

export const submitTestResult = (payload) => async (dispatch) => {
  const { userDetails, currentTest, userSubmit } = payload;

  const userId = userDetails.id;
  console.log(userId)
  const testId = currentTest._id;

  const examDetails = {
    subjectCode: currentTest.subjectCode,
    subjectName: currentTest.subjectName,
    totalQuestions: currentTest.questions.length,
    // correctAnswers: currentTest.correctAnswer || 0,
    // percentageScore: currentTest.percentage || 0,
    // score: currentTest.score || 0,
    passingScore: currentTest.passingScore || 0,
    startTime: currentTest.startTime,
    endTime: currentTest.endTime,
    timeTaken: currentTest.timeTaken || 0,
  };

  try {
    const response = await axios.post(
      `${submitCurrentTest}`, 
      {
        userId,
        testId,
        examDetails,
        responses: userSubmit, // ensure it's named `responses` to match schema
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log("✅ Test result submitted successfully:", response.data);
      onSucessToast("Test Submitted Successfully");
    }
  } catch (error) {
    console.error("❌ Error submitting test result:", error);
  }

  console.log("📦 Final Data from action", {
    userId,
    testId,
    examDetails,
    responses: userSubmit,
  });
};


export const testCompilerRun = (data) => async (dispatch) => {
  // const {code}=data
// const language = useSelector((state) => state.editiorSlice.currentLanguage);
const {currentLanguage} = store.getState().editor;

  console.log(currentLanguage, "language in action");
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});
  const response = await API.post("/execute", {
    language: currentLanguage,
    version: LANGUAGE_VERSIONS[currentLanguage],
    files: [
      {
        content: data,
      },
    ],
  });
  if (response.status === 200) {
    onSucessToast("Code Compiled Successfully");
    dispatch({type:COMPILED_CODE_OUTPUT,payload:{response:response.data,code:data}})
    console.log(response.data, "response data from compiler");
  }
    

}


export const handleTestResultCheker = (data) => async (dispatch) => { const { outputCode, testCases, passingScore } = data;

  let obj = {};

  try {
    // ✅ If outputCode is a string, try parsing it as JSON
    if (typeof outputCode === "string") {
      obj = JSON.parse(outputCode);
    } 
    // ✅ If it's already an object (like Judge0 or API output), use it directly
    else if (typeof outputCode === "object" && outputCode !== null) {
      obj = outputCode;
    } 
    else {
      throw new Error("Unsupported format for outputCode");
    }
  } catch (err) {
    console.error("Invalid JSON format for outputCode:", outputCode, err);

    // Fallback: convert string into { Line 1: ..., Line 2: ... }
    if (typeof outputCode === "string") {
      obj = outputCode
        .split("\n")
        .filter((line) => line.trim() !== "")
        .reduce((acc, line, index) => {
          acc[`Line ${index + 1}`] = line;
          return acc;
        }, {});
    }
  }

  // ✅ Test case validation logic
  let correct = 0;
  let incorrect = 0;

  for (let i = 0; i < testCases.length; i++) {
    const expectedOutput = String(testCases[i].output).trim();
    const actualOutput = String(obj[`Line ${i + 1}`] || "").trim();

    if (expectedOutput === actualOutput) {
      correct++;
    } else {
      incorrect++;
    }
  }

  // ✅ Add pass/fail to each test case
  const testCaseResult = {
    testCases: testCases.map((testCase, index) => ({
      ...testCase,
      passed: String(testCase.output).trim() === String(obj[`Line ${index + 1}`] || "").trim()
    })),
  };

  // ✅ Compile report
  const testReport = {
    correctTestCases: correct,
    incorrectTestCases: incorrect,
    totalPercentage: (correct / testCases.length) * 100,
    status: (correct / testCases.length) * 100 >= passingScore ? "Pass" : "Fail",
  };

  // ✅ Dispatch final result
  dispatch({
    type: STORE_TEST_RESULT,
    payload: {
      testReport,
      testCaseResult,
    },
  });
}