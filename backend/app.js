const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const userRoutes= require('./routes/users.route')
const videoRoutes=require('./routes/video.router')
const likeRoute =require('./routes/like.route')
const commentRoutes =require('./routes/comment.route')


const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(cookieParser()); //This line tells Express how to handle form data sent from HTML forms using POST.
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.json());
app.use('/api/users',userRoutes)
app.use('/api/videos',videoRoutes)
app.use('/api',likeRoute)
app.use('/api',commentRoutes)
app.use(express.urlencoded({ extended: true }));

module.exports = app;
