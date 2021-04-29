const express = require("express");
const {
  getCollegeById,
  getCollege,
  getSimilarColleges,
  getCollegesByStates,
  getCollegeCount,
  getUniqueCourses,
  getCollegesByStream,
  getCollegesStats,
  getCollegesByState,
  getCollegesByCourses,
} = require("../controllers/college");
const { getStudentsByCollege } = require("../controllers/student");
const router = express.Router();

router.param("collegeId", getCollegeById);

router.get(
  "/home",
  getCollegeCount,
  getUniqueCourses,
  getCollegesByStates,
  getCollegesByStream,
  getCollegesStats
);

router.get(
  "/college/:collegeId",
  getStudentsByCollege,
  getSimilarColleges,
  getCollege
);

router.post("/colleges/state", getCollegesByState);
router.post("/colleges/course", getCollegesByCourses);

module.exports = router;
