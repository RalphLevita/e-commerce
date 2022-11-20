const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  firstName: {
    type: String,
    required: [true, "Please provide a first Name."],
  },
  role: {
    type: String,
    required: [true, "Please provide a role."],
  },
  middleName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    required: [true, "Please provide a Last Name."],
  },
  email: {
    type: String,
    required: [true, "Please provide email Email Address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  placeOfBirth: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  mobileNo: {
    type: Number,
    default: null,
  },
  image: {
    type: String,
    default: null
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
},
{ timestamps: true });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 86400000; // 1 day
  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
