const userModel = require("../models/users.models");
const blacklistToken = require("../models/blacllistToken.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  // 1. Get token from cookie or Authorization header

  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  // 2. Check if token is blacklisted
  const isBlacklisted = await blacklistToken.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    // 3. Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 4. Find user from DB
    const user = await userModel.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User Not Found" });
    }

     // 5. Attach user to request for later use
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};
