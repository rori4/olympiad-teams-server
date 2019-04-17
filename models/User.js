const mongoose = require("mongoose");
const encryption = require("../utilities/encryption");

const REQUIRED_VALIDATION_MESSAGE = "{PATH} is required";

let userSchema = new mongoose.Schema({
  email: { type: String, required: REQUIRED_VALIDATION_MESSAGE, unique: true, required: true },
  fullName: { type: String, required: REQUIRED_VALIDATION_MESSAGE, required: true },
  profilePic: { type: String },
  createdOn: { type: Date, default: Date.now },
  status: { type: String, default: "active" },
  salt: { type: String, required: true },
  password: { type: String, default: "" },
  roles: [String],
  school: { type: String, default: "" },
  facebook: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  town: { type: String, default: "" },
  country: { type: String, default: "" },
  university: { type: String, default: "" },
  educationFrom: { type: Date },
  educationTo: { type: Date },
  work: { type: String, default: "" },
  info: { type: String, default: "" },
  subjects: [{type:  mongoose.Schema.Types.ObjectId, ref: "Subject"}],
  results: [{type:  mongoose.Schema.Types.ObjectId, ref: "Result"}],
});

userSchema.method({
  authenticate: function(password) {
    return (
      encryption.generateHashedPassword(this.salt, password) === this.password
    );
  }
});

let User = mongoose.model("User", userSchema);

module.exports = User;
module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) return;

    let salt = encryption.generateSalt();
    let password = encryption.generateHashedPassword(salt, "12345678");

    User.create({
      email: "admin@admin.com",
      fullName: "Admin",
      salt: salt,
      password: password,
      roles: ["Admin"]
    });
  });
};
