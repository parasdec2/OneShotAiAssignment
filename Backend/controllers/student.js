const Student = require("../Models/Student");
const mongoose = require("mongoose");

exports.getStudentById = (req, res, next, id) => {
  Student.findById(id).exec((err, student) => {
    if (err || !student) {
      return res.status(400).json({
        error: "No Student not found in DB",
      });
    }
    req.profile = student;
    next();
  });
};

exports.getStudent = (req, res) => {
  const student = {
    _id: req.profile._id,
    name: req.profile.name,
    collegeName: req.collegename,
    batch: req.profile.batch,
    skills: req.profile.skills,
    collegeId: req.profile.collegeId,
  };
  req.studentProfile = student;
  delete req.profile;
  delete req.collegename;
  return res.status(200).json(req.studentProfile);
};

exports.getStudentsByCollege = (req, res, next) => {
  cid = new mongoose.Types.ObjectId(req.profile._id);
  Student.find({ collegeId: cid }).exec((err, students) => {
    if (err || !students) {
      console.log("students", students);
      return res.status(400).json({
        error: "No Student found in DB",
      });
    }
    req.students = students;
    // console.log(req.students);
    next();
  });
};
