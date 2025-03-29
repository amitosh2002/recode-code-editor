import mongoose from "mongoose";

const testResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },

    responses: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Test.questions",
          required: true,
        },
        userAnswer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        writtenCode: { type: String, required: true },
      },
    ],

    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    percentageScore: { type: Number, required: true }, // Score in percentage
    score: { type: Number, required: true }, // Total score
    passingScore: { type: Number, required: true }, // Pass mark for test

    difficultyWiseScore: {
      Easy: { type: Number, default: 0 },
      Medium: { type: Number, default: 0 },
      Hard: { type: Number, default: 0 },
    },

    status: { type: String, enum: ["Passed", "Failed"], required: true },

    startTime: { type: Date, required: true }, // When user started test
    endTime: { type: Date, required: true }, // When user submitted test
    timeTaken: { type: Number }, // Automatically calculated (in minutes)

    submittedAt: { type: Date, default: Date.now },
  },
  { collection: "testResults", timestamps: true }
);

// Pre-save hook to calculate `timeTaken`
testResultSchema.pre("save", function (next) {
  if (this.startTime && this.endTime) {
    this.timeTaken = Math.round((this.endTime - this.startTime) / (1000 * 60)); // Convert ms to minutes
  }
  next();
});

export default mongoose.model("TestResult", testResultSchema);
