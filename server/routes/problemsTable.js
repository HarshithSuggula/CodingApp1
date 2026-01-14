import Problems from "../models/ProblemsTable.js";

// GET - Get all problems for table
export const problemsTable = async (req, res) => {
  try {
    const problems = await Problems.find().select(
      "id title difficult category order"
    );
    res.status(200).json({ data: problems });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// POST - Create new problem in table
export const createProblem = async (req, res) => {
  try {
    const { id, title, difficult, category, order } = req.body;

    // Validate required fields
    if (!id || !title) {
      return res.status(400).json({
        message: "Missing required fields: id and title are required",
      });
    }

    // Check if problem with same id already exists
    const existingProblem = await Problems.findOne({ id });
    if (existingProblem) {
      return res.status(409).json({
        message: "Problem with this ID already exists",
      });
    }

    const newProblem = new Problems({
      id,
      title,
      difficult: difficult || "Easy",
      category: category || "Array",
      order: order || 0,
    });

    const savedProblem = await newProblem.save();
    res.status(201).json({
      message: "Problem created successfully",
      data: savedProblem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating problem",
      error: error.message,
    });
  }
};
