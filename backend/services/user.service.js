const userModel = require("../models/users.models");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = await userModel.create({
    firstname,
    lastname,
    email,
    password,
  });
  return user;
};
