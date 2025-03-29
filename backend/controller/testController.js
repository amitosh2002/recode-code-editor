import Test from "../model/testQrganizeModel.js";

export const getAllTest = async (req, res, next) => {
  try {
    const allTest = await Test.find();
    if (!allTest) {
      return res.status(404).json({ message: "No test found" });
    }
    return res.status(200).json({ allTest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTest = async (req, res, next) => {
  try {
    const id = req.params.id;
    const test = await Test.findByIdAndDelete(id);
    if (!test) {
      return res.status(404).json({ message: "No test found" });
    }
    return res.status(200).json({ message: "Test deleted successfully" });
  } catch (error) {}
};

export const createTest = async (req, res, next) => {
  try {
    const newTest = new Test(req.body);
    await newTest.save();
    res.status(201).json({ newTest });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
