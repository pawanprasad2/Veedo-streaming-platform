const express =require("express")

const router =express.Router()
const {
  postComment,
  getComments,
  deleteComment,
  updateComment
} = require("../controllers/comment.controller");

const {authUser} =require("../middleware/user.auth")

router.post("/comment", authUser, postComment);
router.get("/comments/:videoId", getComments);
router.delete("/comment/:id", authUser, deleteComment);
router.put("/comment/:id", authUser, updateComment);

module.exports = router;