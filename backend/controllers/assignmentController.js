const Assignment = require("../models/Assignment");

// Create new assignment
exports.createAssignment = async (req, res) => {
  try {
    const { title, creator_roll, question, startTime, endTime, penaltyTime, language, testCases } = req.body;

    const newAssignment = new Assignment({
      title,
      creator_roll,
      question,
      startTime,
      endTime,
      penaltyTime,
      language,
      testCases
    });

    await newAssignment.save();

    res.status(201).json({ message: "Assignment created", assignment: newAssignment });
  } catch (error) {
    res.status(500).json({ message: "Error creating assignment", error: error.message });
  }
};

// Get all assignments
exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignments", error: error.message });
  }
};

// Get assignment by id
exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assignment", error: error.message });
  }
};
