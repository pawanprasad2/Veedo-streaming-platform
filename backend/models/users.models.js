const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "firstName must be at least 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "lastName must be at least 3 characters long"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },
  },
  { timestamps: true }
);
//generate the jwt token to the user
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  }); //generate the jwt token for specific user for login or for authentications,..this._id refers to the current mongodb id
  return token;
};

//compare password before saving in the dataBase
userSchema.methods.comparePassword = async function (password) {

  return await bcrypt.compare(password,this.password);
};



//hash password before saving in database
userSchema.statics.hashPassword= async function(password){
  return await bcrypt.hash(password,10)
}


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
