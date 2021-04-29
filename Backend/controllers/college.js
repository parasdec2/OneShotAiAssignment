const College = require("../Models/College");

exports.getCollegeById = (req, res, next, id) => {
  College.findById(id).exec((err, College) => {
    if (err || !College) {
      return res.status(400).json({
        error: "No College not found in DB",
      });
    }
    req.profile = College;
    next();
  });
};

exports.getCollegeName = (req, res, next) => {
  College.findById(req.profile.collegeId).exec((err, college) => {
    if (err || !college) {
      return res.status(400).json({
        error: "No College not found in DB",
      });
    }
    req.collegename = college["name"];
    next();
  });
};

exports.getCollege = (req, res) => {
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  req.college = {
    college: req.profile,
    students: req.students,
    similar: req.similarcolleges,
  };
  delete req.profile;
  delete req.students;
  delete req.similarcolleges;
  return res.status(200).json(req.college);
};

exports.getSimilarColleges = (req, res, next) => {
  College.find({
    $and: [
      {
        studentCount: {
          $gt: req.profile.studentCount - 100,
          $lt: req.profile.studentCount + 100,
        },
      },
      { state: req.profile.state },

      { courses: { $in: req.profile.courses } },
    ],
  }).exec((err, college) => {
    if (err || !college) {
      return res.status(400).json({
        error: "No College not found in DB1",
      });
    }
    req.similarcolleges = college;
    next();
  });
};

exports.getCollegeCount = (req, res, next) => {
  College.countDocuments().exec((err, count) => {
    if (err || !count) {
      return res.status(400).json({
        error: "No College found in DB",
      });
    }
    req.totalColleges = count;
    next();
  });
};

exports.getUniqueCourses = (req, res, next) => {
  College.distinct("courses").exec((err, courses) => {
    if (err || !courses) {
      return res.status(400).json({
        error: "No College found in DB",
      });
    }
    req.uniqueCourses = courses;
    next();
  });
};

exports.getCollegesByStates = (req, res, next) => {
  College.aggregate([{ $group: { _id: "$state", count: { $sum: 1 } } }]).exec(
    (err, colleges) => {
      if (err || !colleges) {
        return res.status(400).json({
          error: "No College not found in DB",
        });
      }
      const c_count = req.totalColleges;
      colleges.map(
        ({ count }, index) =>
          (colleges[index].count =
            (count / c_count) * 100 - Math.floor((count / c_count) * 100) !== 0
              ? ((count / c_count) * 100).toFixed(2)
              : (count / c_count) * 100)
      );
      req.collegesByStates = colleges;
      next();
    }
  );
};

exports.getCollegesByStream = (req, res, next) => {
  College.aggregate([
    {
      $unwind: "$courses",
    },
    {
      $group: {
        _id: "$courses",
        count: {
          $sum: 1,
        },
      },
    },
  ]).exec((err, colleges) => {
    if (err || !colleges) {
      return res.status(400).json({
        error: "No College not found in DB",
      });
    }
    const c_count = req.totalColleges;
    colleges.map(
      ({ count }, index) =>
        (colleges[index].count =
          (count / c_count) * 100 - Math.floor((count / c_count) * 100) !== 0
            ? ((count / c_count) * 100).toFixed(2)
            : (count / c_count) * 100)
    );
    req.collegesByStream = colleges;
    next();
  });
};

exports.getCollegesStats = (req, res) => {
  req.collegesStats = {
    collegesByStates: req.collegesByStates,
    collegesByStream: req.collegesByStream,
    coursesOffered: req.uniqueCourses,
    totalColleges: req.totalColleges,
  };
  delete req.collegesByStates;
  delete req.collegesByStream;
  delete req.uniqueCourses;
  delete req.totalColleges;
  return res.status(200).json(req.collegesStats);
};

exports.getCollegesByState = (req, res) => {
  console.log("Body", req.body.state);
  College.find({ state: req.body.state }).exec((err, colleges) => {
    if (err || !colleges) {
      return res.status(400).json({
        error: "No Colleges found in DB",
      });
    }
    req.colleges = colleges;
    return res.status(200).json(req.colleges);
  });
};

exports.getCollegesByCourses = (req, res) => {
  console.log("Body", req.body.stream);
  College.find({ courses: req.body.stream }).exec((err, colleges) => {
    if (err || !colleges) {
      return res.status(400).json({
        error: "No Colleges found in DB",
      });
    }
    req.colleges = colleges;
    return res.status(200).json(req.colleges);
  });
};
