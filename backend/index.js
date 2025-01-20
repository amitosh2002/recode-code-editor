const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = 5001; // Specify the port number
const MONGO_URI = "mongodb://localhost:27017/question_db"; // MongoDB URI

// MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a Schema
const QuestionSchema = new mongoose.Schema(
  {
    tittle: { type: String, required: true },
    description: { type: String, required: true },
    questionText: { type: String, required: true },
    testCases: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
      },
    ],
  },
  { collection: "question" } // Explicitly set the collection name
);

// Create a Model
const Question = mongoose.model("Question", QuestionSchema);

// Routes
// Fetch all questions
app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find(); // Fetch data from the `question` collection
    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Server error while fetching questions" });
  }
});

// Add a new question
app.post("/questions", async (req, res) => {
  try {
    const { tittle, description, questionText, testCases } = req.body;

    // Validate input
    if (!tittle || !description || !questionText || !testCases) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create and save question
    const newQuestion = new Question({
      tittle,
      description,
      questionText,
      testCases,
    });
    const savedQuestion = await newQuestion.save();

    res.status(201).json(savedQuestion);
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ error: "Server error while adding question" });
  }
});

// Update a question by ID
app.put("/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json(updatedQuestion);
  } catch (err) {
    console.error("Error updating question:", err);
    res.status(500).json({ error: "Server error while updating question" });
  }
});

// Delete a question by ID
app.delete("/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error("Error deleting question:", err);
    res.status(500).json({ error: "Server error while deleting question" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
