const express = require("express");
const router = express.Router();
const Video = require('../models/video.model');
const { getVideos } = require('../controllers/video.controller');

router.get("/", getVideos);
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    console.error("Error fetching video by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
