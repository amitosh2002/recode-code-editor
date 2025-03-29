import mongoose from "mongoose";

const generateAccessKey = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const testSchema = new mongoose.Schema(
  {
    subjectCode: { type: String, required: true },
    subjectName: { type: String, required: true },
    date: { type: Date, required: true }, // Test Date
    startTime: { type: Date, required: true }, // Start Time
    endTime: { type: Date, required: true }, // End Time
    duration: { type: Number, required: true }, // Duration in minutes
    totalQuestions: { type: Number, required: true },
    passingScore: { type: Number, required: true },
    accessKey: {
      type: String,
      unique: true,
      required: true,
      default: generateAccessKey,
    }, // Unique 6-digit key
    questions: [
      {
        questionTitle: { type: String, required: true },
        questionDescription: { type: String, required: true },
        questionText: { type: String, required: true },
        testCases: [
          {
            input: { type: String, required: true },
            output: { type: String, required: true },
          },
        ],
        difficulty: { type: String, required: true },
      },
    ],
  },
  { collection: "Test" }
);
testSchema.pre("save", function (next) {
  if (!this.accessKey) {
    this.accessKey = generateAccessKey();
  }
  next();
});
// Create the model after defining the schema
export default mongoose.model("Test", testSchema);
