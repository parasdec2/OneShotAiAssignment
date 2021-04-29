const express = require("express");
const { getCollegeName } = require("../controllers/college");
const router = express.Router();
const { getStudent, getStudentById } = require("../controllers/student");

router.param("studentId", getStudentById);

router.get("/student/:studentId", getCollegeName, getStudent);

module.exports = router;
