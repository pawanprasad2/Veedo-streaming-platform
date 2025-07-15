const Comment = require("../models/comment.model"); // ✅ Model

// POST a comment
const postComment = async (req, res) => {
  const { videoId, text } = req.body;
  const userId = req.user._id;

  if (!videoId || !text) {
    return res.status(400).json({ message: "Missing videoId or text" });
  }

  try {
    const comment = await Comment.create({ userId, videoId, text });
    return res.status(201).json({ success: true, comment });
  } catch (err) {
    console.error("Error posting comment:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET comments by videoId
const getComments = async (req, res) => {
  const { videoId } = req.params;

  try {
    const comments = await Comment.find({ videoId })
      .populate("userId", "firstname")
      .sort({ createdAt: -1 }); // ✅ typo fixed: was `createAt`

    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE a comment
const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE a comment
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (!comment.userId || comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    comment.text = text;
    await comment.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  postComment,
  getComments,
  deleteComment,
  updateComment,
};
