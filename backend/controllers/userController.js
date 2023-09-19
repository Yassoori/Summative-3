// import userModel
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// create token function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    // call upon our custom login method
    const user = await User.login(email, password, username);

    // create token
    const token = createToken({ _id: user._id, isvendor: user.isvendor });

    // Return username, email, isvendor, and token
    res
      .status(200)
      .json({
        _id: user._id,
        username: user.username,
        email,
        isvendor: user.isvendor,
        token,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { username, email, password, isvendor } = req.body;

  // signup user
  try {
    // call upon the custom signup static method defined in the user model
    const user = await User.signup(username, email, password, isvendor);

    // create token
    const token = createToken({ _id: user._id, isvendor });

    // return the username and newly created user
    res.status(200).json({ _id: user._id, username, email, isvendor, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
