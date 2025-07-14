const Video = require('../models/video.model');

exports.getVideos = async (req, res) => {
  try {
    const { category, title,page=1,limit=10 } = req.query;
    let query = {};

    if (category) query.category = category;
    if (title) query.title = { $regex: title, $options: 'i' };

    const skip =(parseInt(page)-1) * parseInt(limit)

    const videos = await Video.find(query)
    .skip(skip)
    .limit(parseInt(limit))
    const total = await Video.countDocuments(query);
    res.status(200).json({
      page: parseInt(page),
      limit: parseInt(limit),
      totalVideos: total,
      totalPages: Math.ceil(total / limit),
      videos,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
