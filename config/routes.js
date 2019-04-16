const authRoutes = require("../routes/auth");
const userRoutes = require("../routes/users");
const adminRoutes = require("../routes/admin");

module.exports = app => {
  app.use("/auth", authRoutes);
  app.use("/admin", adminRoutes);
  app.use("/users", userRoutes);
};
