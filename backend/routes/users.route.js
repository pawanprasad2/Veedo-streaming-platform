const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const usercontroller = require("../controllers/user.controller");
const userauthMiddleware = require("../middleware/user.auth");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("firstname")
      .isLength({ min: 3 })
      .withMessage("firstname must be 3 characters long"),

    body("password")
      .isLength({ min: 5 })
      .withMessage("password must be 5 characters long"),
  ],
  usercontroller.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password must be 5 characters long"),
  ],
  usercontroller.loginUser
);


router.get('/profile',userauthMiddleware.authUser,usercontroller.getUserProfile)

router.post('/logout',userauthMiddleware.authUser,usercontroller.logoutUser)

module.exports=router