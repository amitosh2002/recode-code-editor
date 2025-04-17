// // import mongoose from "mongoose";

// // const testResultSchema = new mongoose.Schema(
// //   {
// //     userId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     testId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Test",
// //       required: true,
// //     },

// //     responses: [
// //       {
// //         questionId: {
// //           type: mongoose.Schema.Types.ObjectId,
// //           ref: "Test.questions",
// //           required: true,
// //         },
// //         userAnswer: { type: String, required: true },
// //         isCorrect: { type: Boolean, required: true },
// //         writtenCode: { type: String, required: true },
// //       },
// //     ],

// //     totalQuestions: { type: Number, required: true },
// //     correctAnswers: { type: Number, required: true },
// //     percentageScore: { type: Number, required: true }, // Score in percentage
// //     score: { type: Number, required: true }, // Total score
// //     passingScore: { type: Number, required: true }, // Pass mark for test

// //     difficultyWiseScore: {
// //       Easy: { type: Number, default: 0 },
// //       Medium: { type: Number, default: 0 },
// //       Hard: { type: Number, default: 0 },
// //     },

// //     status: { type: String, enum: ["Passed", "Failed"], required: true },

// //     startTime: { type: Date, required: true }, // When user started test
// //     endTime: { type: Date, required: true }, // When user submitted test
// //     timeTaken: { type: Number }, // Automatically calculated (in minutes)

// //     submittedAt: { type: Date, default: Date.now },
// //   },
// //   { collection: "testResult", timestamps: true }
// // );

// // // Pre-save hook to calculate `timeTaken`
// // testResultSchema.pre("save", function (next) {
// //   if (this.startTime && this.endTime) {
// //     this.timeTaken = Math.round((this.endTime - this.startTime) / (1000 * 60)); // Convert ms to minutes
// //   }
// //   next();
// // });

// // export default mongoose.model("TestResult", testResultSchema);




// import mongoose from "mongoose";

// const testCaseSchema = new mongoose.Schema({
//   input: { type: String, required: true },
//   output: { type: String, required: true },
//   passed: { type: Boolean, required: true },
// });

// const responseSchema = new mongoose.Schema({
//   questionId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Test.questions", // Or just "Question" if you have a separate Question model
//     required: true,
//   },
//   writtenCode: {
//     type: String,
//     required: true,
//   },
//   testCases: {
//     type: [testCaseSchema],
//     required: true,
//   },
//   isCorrect: {
//     type: Boolean,
//     required: true,
//   },

// });

// const examDetailsSchema = new mongoose.Schema({
//     subjectCode: { type: String, required: true },
//     subjectName: { type: String, required: true },
//     totalQuestions: { type: Number, required: true },
//     correctAnswers: { type: Number, required: true },
//     percentageScore: { type: Number, required: true }, // Score in percentage
//     score: { type: Number, required: true }, // Total score
//     passingScore: { type: Number, required: true }, // Pass mark for test

//     startTime: { type: Date, required: true }, // When user started test
//     endTime: { type: Date, required: true }, // When user submitted test
//     timeTaken: { type: Number }, // Automatically calculated (in minutes)
// })

// const testResultSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   testId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Test",
//     required: true,
//   },
//   responses: {
//     type: [responseSchema],
//     required: true,
//   },
//   examDettails:{
//     type:[examDetailsSchema],
//     required: true,
//   },

//   submittedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model("TestResult", testResultSchema);



import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true },
  // passed: { type: Boolean, required: true },
});

const responseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test.questions", // Or "Question" model if defined separately
    required: true,
  },
  writtenCode: { type: String, required: true },
  testCases: { type: [testCaseSchema], required: true },
  correctAnswers: { type: Number, required: true },
  incorrectTestCases: { type: Number, required: true },
  percentageScore: { type: Number, required: true },
  score: { type: String, required: true },
  // isCorrect: { type: Boolean, required: true },
});

const examDetailsSchema = new mongoose.Schema({
  subjectCode: { type: String, required: true },
  subjectName: { type: String, required: true },
  totalQuestions: { type: Number, required: true },
  
  passingScore: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  // timeTaken: { type: Number }, // in minutes
});

const testResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  responses: { type: [responseSchema], required: true },
  examDetails: { type: examDetailsSchema, required: true },
  submittedAt: { type: Date, default: Date.now },


},
  { collection: "TestResult" }

);

export default mongoose.model("TestResult", testResultSchema);
