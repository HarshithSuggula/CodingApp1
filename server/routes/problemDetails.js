import ProblemDetails from "../models/ProblemDetails.js";

// GET problem details by ID
export const problemDetails = async (req, res) => {
  try {
    const problemId = req.params.id;

    const details = await ProblemDetails.findOne({ id: problemId }).lean();
    if (details) {
      res.status(200).json(details);
    } else {
      res.status(404).json({ message: "Problem not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Fetching Failed", error: error.message });
  }
};

// POST - Create new problem details
export const createProblemDetails = async (req, res) => {
  try {
    const {
      id,
      title,
      difficult,
      category,
      order,
      description,
      examples,
      constraints,
      testcases,
    } = req.body;

    // Validate required fields
    if (!id || !title || !description) {
      return res.status(400).json({
        message: "Missing required fields: id, title, and description are required",
      });
    }

    // Check if problem with same id already exists
    const existingProblem = await ProblemDetails.findOne({ id });
    if (existingProblem) {
      return res.status(409).json({
        message: "Problem with this ID already exists",
      });
    }

    const newProblem = new ProblemDetails({
      id,
      title,
      difficult: difficult || "Easy",
      category: category || "Array",
      order: order || 0,
      description,
      examples: examples || [],
      constraints: constraints || [],
      testcases: testcases || [],
    });

    const savedProblem = await newProblem.save();
    res.status(201).json({
      message: "Problem details created successfully",
      data: savedProblem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating problem details",
      error: error.message,
    });
  }
};
