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
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isStrongPassword(value, { minLength: 8 }),
      message: "Please enter a stronger password",
    },
  },
  // account type, is this a vendor - true, or a customer - false
  // this would be a boolean, but the account page won't work properly unless its a string for some reason, so its a string now

  isvendor: {
    type: String,
    required: true,
  },
  wishlists: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  carts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

// Static method for user sign up
userSchema.statics.signup = async function (
  username,
  email,
  password,
  isvendor
) {
  if (!username || !email || !password || !isvendor) {
    throw new Error("All fields must be filled");
  }

  const exists = await this.findOne({ $or: [{ username }, { email }] });

  if (exists) {
    throw new Error("Username or email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash, isvendor });

  return user;
};

// Static method for user log in
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Both fields must be filled in");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
