// import and installed all three as npms
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  // account type, is this a vendor - true, or a customer - false
  // this would be a boolean, but the account page won't work properly unless its a string for some reason, so its a string now
  isvendor: {
    type: String,
    required: true,
  },
});

// static method for user sign up
userSchema.statics.signup = async function (
  username,
  email,
  password,
  isvendor
) {
  // check if we have a value for the username and password
  if (!username || !email || !password || !isvendor) {
    throw Error("All fields must be filled");
  }
  // check if password is strong enough
  // By default: minLength: 8,minLowercase: 1,minUppercase: 1, minNumber: 1, minSymbols: 1
  if (!validator.isStrongPassword(password)) {
    throw Error("Please enter in a stronger password");
  }

  const exists = await this.findOne({ username, email });

  if (exists) {
    throw Error("that username already in use");
  }

  // check if email is valid
  if (!validator.isEmail(email)) {
    throw Error("Please enter a vaild email");
  }

  if (exists) {
    throw Error("Email already in use");
  }

  // Normal password: mypassword
  // Add Salt: (10 characters long)  mypassword6f53h9j6d1
  // Hash both the password and salt combined: $2b$10$s2wXeKbzULRE2RLbHh2PSuCMzQWN.Eiv/klCyQfBy5M7FkGipxyEa

  // Generate a Salt with a cist of 10
  // 10 is the default
  const salt = await bcrypt.genSalt(10);
  //Hash both the password and the salt combined
  const hash = await bcrypt.hash(password, salt);
  // set the password to the hash value when creating the user
  const user = await this.create({ username, email, password: hash, isvendor });

  return user;
};

// static method for user log in
userSchema.statics.login = async function (email, password) {
  // check is email and password values exist
  if (!email || !password) {
    throw Error("both fields must be filled in");
  }

  // try and find the user on the database via the email provided
  const user = await this.findOne({ email });
  // if no user is found
  if (!user) {
    throw Error("Incorrect email");
  }

  // compare passwords
  const match = await bcrypt.compare(password, user.password);
  // throw error if the dont match
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
