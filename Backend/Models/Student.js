const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 64,
    },
    batch: {
      type: Number,
      required: true,
      maxlength: 4,
      trim: true,
    },
    collegeId: {
      type: ObjectId,
      ref: "College",
      required: true,
    },
    skills: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
