const userModel = require("../models/users.models");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistToken = require("../models/blacllistToken.model");

module.exports.registerUser = async (req, res, next) => {
  try {
    //step 1 : we need to validate input
    const errors = validationResult(req); // this use express-validator  to check if there are any input error(e.g; empty email,short password)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //step 2: check if user already exists
    const { firstname, lastname, email, password } = req.body;

    //check if user is already exist
    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
      return res.status(400).json({ message: "user already exist" });
    }
    //step 3: I hashed the password  using model static method
    const hashedPassword = await userModel.hashPassword(password);

    // step 4: I create the user using service layer
    const user = await userService.createUser({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    //step 5 :  Generate the jwt token
    const token = user.generateAuthToken();
      res.cookie("token", token, {
      httpOnly: true,
    });

    //step 6 : send success response
    res.status(201).json({
      token,
      user: {
        _id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error({"signup errror":error})
    res.status(500).json({message:"internal server error"})
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    //step 1 validate the input
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //step 2  Extract input
    const { email, password } = req.body;

    // Step 3: Check if user exists
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "invalid  email or password" });
    }
    // Step 4: Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "invalid email or password" });
    }
    // Step 5: Generate token
    const token = user.generateAuthToken();

    // Step 6: Set cookie and respond
    res.cookie("token", token);
    res.status(200).json({ token, user });
  } catch (error) {
        console.error({"login errror":error})
    res.status(500).json({message:"internal server error"})
    next(error);
  }
};

module.exports.getUserProfile = async (req, res, next) => {
  const { _id, firstname, lastname, email, createdAt } = req.user;
  res.status(200).json({
    _id,
    firstname,
    lastname,
    email,
    createdAt,
  });
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blacklistToken.create({ token });

  res.status(200).json({ message: "logged out" });
};

module.exports.checkAuth= async(req,res,next)=>{

  res.status(200).json(req.user)
  
}