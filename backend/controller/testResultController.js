import TestResult from "../model/testResultModel.js";
import { ensureAuthenticated } from "../MiddleWare/Auth.js";

// Get all test results for a user
export const getALlResult = async (req, res, next) => {
  try {
    const testResults = await TestResult.find({ userId: req.user._id });
    if (!testResults) {
      return res.status(404).json({ msg: "No test results found" });
    }
    res.status(200).json({ testResults });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getSingleResult = async (req, res, next) => {
  try {
    const testResult = await TestResult.findById({ userId: req.user._id });
    if (!testResult) {
      return res.status(404).json({ msg: "Test result not found" });
    }
    res.status(200).json({ testResult });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const submitExam = async (req, res) => {
  
//   try {
//     const testResult = new TestResult(req.body);
//     if (!testResult) {
//       res.status(404).json({ msg: "Your test is not submited" });
//     }
//     await testResult.save();
//     res.status(200).json({ msg: "Test submitted successfully", testResult });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };
// import TestResult from "../models/TestResult.js"; // make sure this path is correct

export const submitExam = async (req, res) => {
  try {
    const { userId, testId, examDetails, responses } = req.body;

    // Basic validation
    if (!userId || !testId || !examDetails || !responses || responses.length === 0) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const testResult = new TestResult({
      userId,
      testId,
      examDetails: examDetails, // Note: your schema uses 'examDettails' (might want to fix the spelling)
      responses,
    });

    await testResult.save();

    res.status(200).json({
      msg: "✅ Test submitted successfully",
      testResult,
    });
  } catch (error) {
    console.error("❌ Error in submitExam:", error.message);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};
