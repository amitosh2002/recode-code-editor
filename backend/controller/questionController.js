import question from "../model/questionsModel.js";

// Create a new question
export const newQuestion = async (req, res) => {
  try {
    const { tittle, description, questionText, difficulty, testCases } =
      req.body;

    if (
      !tittle ||
      !description ||
      !questionText ||
      !difficulty ||
      !Array.isArray(testCases)
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newQuestion = new question(req.body);

    if (!newQuestion) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const result = await newQuestion.save();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all question

export const getAll = async (req, res) => {
  try {
    const allQuestion = await question.find();
    if (!allQuestion) {
      return res.status(404).json({ msg: "No question found" });
    }
    return res.status(200).json({ allQuestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//single question

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const singleQuestion = await question.findById(id);
    // console.log(singleQuestion);

    if (!singleQuestion) {
      return res.status(404).json({ msg: "No question found" });
    }
    return res.status(200).json({ singleQuestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update the question

export const updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;

    const singeQuestion = await question.findById(id);
    if (!singeQuestion) {
      return res.status(404).json({ message: "No question found" });
    }
    const updatedQuestion = await question.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ updatedQuestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete question

export const deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const existquestion = await question.findById(id);
    if (!existquestion) {
      return res.status(404).json({ message: "No question found" });
    }
    await question.findByIdAndDelete(id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
