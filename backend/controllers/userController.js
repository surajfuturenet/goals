const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const { use } = require("../routes/userRoutes");

//@desc Register user
//@route POST/api/users/
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Add all fields");
  }
  //Check user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists!!");
  }

  //Has the password
  const salt = await bcryptjs.genSalt(10);
  const hasedPassword = await bcryptjs.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hasedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data !!");
  }
});

//@desc Authenticate a User
//@route POST/api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check user email
  const user = await User.findOne({ email });
  if (user && (await bcryptjs.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User credentials");
  }

  res.json({ messege: "Login User" });
});

//@desc Get User
//@route GET/api/users/me
//@access public
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
