import styled from "styled-components";
import { VscPassFilled } from "react-icons/vsc";
import { ImCross } from "react-icons/im";
import { json } from "react-router-dom";
const TestCaseCard = ({ outputCode, testCases }) => {
  console.log(typeof(outputCode), "outputCode from test case card");

let obj = {};
// try {
//   obj = JSON.parse(outputCode);
//   // console.log("Parsed JSON object:", obj);
// } catch (err) {
//   console.error("Invalid JSON format for outputCode:", outputCode,err);
//   // Fallback: Convert the string into an object with line numbers as keys
//   obj = outputCode
//     .split("\n")
//     .filter((line) => line.trim() !== "") // Remove empty lines
//     .reduce((acc, line, index) => {
//       acc[`Line ${index + 1}`] = line;
//       return acc;
//     }, {});
// }let obj = {};
try {
  // Attempt to parse as JSON (expecting a structured object or array)
  if (outputCode.trim().startsWith("{") || outputCode.trim().startsWith("[")) {
    obj = JSON.parse(outputCode);
  } else {
    // Fallback to line-based parsing
    obj = outputCode
      .split("\n")
      .filter((line) => line.trim() !== "")
      .reduce((acc, line, index) => {
        acc[`Line ${index + 1}`] = line.trim();
        return acc;
      }, {});
  }
} catch (err) {
  console.error("Invalid outputCode format:", outputCode, err);
  // Fallback for unexpected cases
  obj = outputCode
    .split("\n")
    .filter((line) => line.trim() !== "")
    .reduce((acc, line, index) => {
      acc[`Line ${index + 1}`] = line.trim();
      return acc;
    }, {});
}

console.log("Parsed outputCode object:", obj);


  return (
    <TestCaseWrapper>
    
     
      {
        testCases?.map((testCase, index) => {
          // Normalize both expected and actual output
          const expectedOutput = String(testCase.output)?.trim();
          // const actualOutput = obj[`Line ${index + 1}`] || ""; // Get the corresponding line from obj
          const actualOutput = (obj && obj[`Line ${index + 1}`]) || ""; // Safely access obj
          console.log(actualOutput,"actual output 4545")


          console.log(
            "Expected Output:",
            expectedOutput,
            "Actual Output:",
            actualOutput
          );

          const status = expectedOutput === actualOutput ? "Pass" : "Fail";
          // console.log(status);

          return (
            <div
              className={
                status === "Pass"
                  ? "test-case-card-pass"
                  : status === "Fail"
                  ? "test-case-card-fail"
                  : "test-case-card"
              }
              key={index}
            >
              <div className="test-case-status">
                {status === "Pass" ? (
                  <>
                    <VscPassFilled style={{ color: "green" }} size={30} />
                    <span style={{ color: "green", marginLeft: "5px" }}>
                      Pass
                    </span>
                  </>
                ) : (
                  <>
                    <ImCross style={{ color: "red" }} size={20} />
                    <span style={{ color: "red", marginLeft: "5px" }}>Fail</span>
                  </>
                )}
                <h3>Test Case {index + 1}</h3>
              </div>

              <div className="testCase">
                <span>
                  <p>Input:</p>
                  <pre>{testCase.input}</pre>
                </span>
                <span>
                  <p>Expected Output:</p>
                  <pre>{expectedOutput}</pre>
                </span>
              </div>
              <div className="user-output">
                <span>
                  <p>Output:</p>
                  <pre>{actualOutput}</pre>
                </span>
              </div>
            </div>
          );
        })
      }
    </TestCaseWrapper>
  );
};

export default TestCaseCard;
const TestCaseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  .test-case-status {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
  }
  .test-case-card {
    background-color: #0a0a09;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 250px;
    height: 180px;
    padding: 10px;
    border: 1px solid green;
    border-radius: 5px;
    margin: 20px;
    box-sizing: border-box;
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  .test-case-card-pass {
    background-color: #fcfbf8;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 250px;
    height: 150px;
    padding: 10px;
    border: 1px solid green;
    border-radius: 5px;
    margin: 20px;
    /* box-sizing: border-box; */
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  .test-case-card-fail {
    background-color: #fcfbf8;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 250px;
    height: 150px;
    padding: 10px;
    border: 1px solid red;
    border-radius: 5px;
    margin: 20px;
    /* box-sizing: border-box; */
    overflow: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  h3 {
    font-weight: 300px;
    font-family: "Helvetica";
  }
  p {
    /* font-size: large; */
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    margin-top: 3px;
  }
  span {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
  }
  pre {
    font-weight: 300px;
    font-family: "Helvetica";
    margin-top: 6px;
  }
`;
