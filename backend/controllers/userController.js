const asyncHandler = require("express-async-handler");
const Users = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//REGISTER

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter values in all fields");
  }
  const userExists = await Users.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already registered");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  const user = await Users.create({
    name,
    email,
    password: hashedpassword,
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
    throw new Error("Unable to register user");
  }
  res.status(200).json(user);
});

//LOGIN
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Wrong credentials");
  }
  res.json({ user: "USER" });
});

//GET ALL USERS
const allUsers = asyncHandler(async (req, res) => {
  const users = await Users.find();
  res.status(200).json(users);
});

//GET SINGLE USER
const singleUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("Invalid user ID");
  }
  const { _id, name, email } = user;
  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

//DELETE SINGLE USER
const deleteUser = asyncHandler(async (req, res) => {
  const userDeleted = await Users.findById(req.params.id);
  if (!userDeleted) {
    res.status(404);
    throw new Error("No such User found");
  } else {
    await Posts.findByIdAndRemove(req.params.id);
    res.status(200).json({ id: req.params.id });
  }
});

//TOKEN GENERATION
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  allUsers,
  singleUser,
  deleteUser,
};
