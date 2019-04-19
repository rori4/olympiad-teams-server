const authRoutes = require("../routes/auth");
const userRoutes = require("../routes/users");
const adminRoutes = require("../routes/admin");
const studentRoutes = require("../routes/students");
const subjectsRoutes = require("../routes/subjects");
const resultsRoutes = require("../routes/results");

module.exports = app => {
  app.use("/auth", authRoutes);
  app.use("/admin", adminRoutes);
  app.use("/users", userRoutes);
  app.use("/students", studentRoutes);
  app.use("/subjects", subjectsRoutes);
  app.use("/results", resultsRoutes);
};
