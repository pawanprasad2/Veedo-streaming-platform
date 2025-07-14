require("dotenv").config();
const AWS = require("aws-sdk");
const mongoose = require("mongoose");
const Video = require("../models/video.model");

// AWS credentials from .env
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || "eu-north-1",
});

const s3 = new AWS.S3();
const BUCKET = "veedo-videos";
const PREFIX = "videos/";
const BASE_URL = `https://${BUCKET}.s3.eu-north-1.amazonaws.com/`;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Keyword-based auto category detection
const keywordCategoryMap = {
  coding: ["code", "js", "react", "node", "tutorial", "html", "css","tutorial","javascript","coding","express","node","mongodb","socket.io","course","programming","backend","session","token","crash course","authentication","django","master","roadmap","jwt"],
  music: ["music", "song", "beat", "lofi", "instrumental"],
  vlogs: ["vlog", "travel", "daily", "life"],
  fitness: ["fitness", "gym", "workout", "exercise"],
  news: ["news", "update", "breaking"],
  comedy: ["funny", "comedy", "joke", "meme"],
  podcast: ["podcast", "talk", "interview"],
  movie: ["movie", "trailer", "scene"],
};

function getCategoryFromTitle(fileName) {
  const name = fileName.toLowerCase();
  for (const [category, keywords] of Object.entries(keywordCategoryMap)) {
    if (keywords.some((keyword) => name.includes(keyword))) {
      return category;
    }
  }
  return "general";
}

async function syncVideos() {
  try {
    const response = await s3.listObjectsV2({
      Bucket: BUCKET,
      Prefix: PREFIX,
    }).promise();

    for (const file of response.Contents) {
      const key = file.Key;
      if (!key.endsWith(".mp4")) continue;

      const fileName = key.split("/").pop();
      const title = fileName.replace(".mp4", "").replace(/[_]/g, " ");
      
      //PROPER ENCODING (fixes playback issues)
      const url = BASE_URL + key.split("/").map(encodeURIComponent).join("/");
      
      const category = getCategoryFromTitle(fileName);
      const exists = await Video.findOne({ url });

      if (!exists) {
        await Video.create({ title, url, category });
        console.log(" Inserted:", title, "| Category:", category);
      } else {
        console.log(" Already exists:", title);
      }
    }

    console.log(" Sync complete");
    process.exit();
  } catch (error) {
    console.error(" Sync error:", error);
    process.exit(1);
  }
}

syncVideos();
