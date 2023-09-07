// import userModel
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// create token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // call upon our custom login method
    const user = await User.login(username, password);

    // create token
    const token = createToken(user._id);

    // return username and newly logged in token
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { username, password, isvendor } = req.body;

  // signup user
  try {
    // call upon the custom signup static method defined in the user model
    const user = await User.signup(username, password, isvendor);

    // create token
    const token = createToken(user._id);

    // return the username and newly created user
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
