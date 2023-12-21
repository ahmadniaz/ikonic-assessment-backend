const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Users = require("../models/usersModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Users.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Unauthorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error(" Not authorized");
  }
});

//ADMIN AUTHORIZATION

const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      throw new Error(" you are not authorised to perform this task");
    }
    next();
  };
};

//SINGLE USER AUTHORIZATION

const authGetSingle = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role || req.user.id === req.params.id) {
      res.status(401);
      throw new Error(" you are not authorised to perform this task");
    }
    next();
  };
};

//DELETE USER AUTHORIZATION

const authDelete = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role || req.user.id === req.params.id) {
      res.status(401);
      throw new Error(" you are not authorised to perform this task");
    }
    next();
  };
};

module.exports = { protect, authorize, authGetSingle, authDelete };
