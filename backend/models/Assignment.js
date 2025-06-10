const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  creator_roll: { type: Number },

  question: { type: String, required: true },
  startTime: { type: Date, default: Date.now, index: true },  // <-- add index
  endTime: { type: Date, default: Date.now, index: true },    // <-- add index

  penaltyTime: Number,
  language: String,

  testCases: [
    {
      input: { type: String },
      output: { type: String }
    }
  ]
});


const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
