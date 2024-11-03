// import axios from "axios";

// const CodeExecutor = () => {
//   const handleCodeExecution = async (code) => {
//     try {
//       const response = await axios.post(
//         "https://api.piston.codes/execute",
//         {
//           language: "javascript", // Replace with your desired language
//           code: code,
//         },
//         {
//           headers: {
//             Authorization: "Bearer YOUR_API_KEY", // Replace with your API key
//           },
//         }
//       );

//       const result = response.data.output;
//       console.log(result);
//       // Handle the result and display it to the user
//     } catch (error) {
//       console.error("Error executing code:", error);
//     }
//   };

//   // ... rest of your component
// };

import axios from "axios";
import { LANGUAGE_VERSIONS } from "../EditorComponent/Language";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});
export const ececutionCode = async (language, code) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: code,
      },
    ],
  });
  return response.data;
};
