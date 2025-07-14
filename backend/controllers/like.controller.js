const like =require("../models/like.model")

//like  or unlike a video
const toggleLike = async (req,res)=>{
    const {videoId} = req.body;
    const userId =req.user._id

    try{
        const existing =await like.findOne({userId,videoId})

        if(existing){
            await like.findByIdAndDelete(existing._id)
            return res.status(200).json({liked:false,message:"unliked"})
        }

        await like.create({userId,videoId})
        res.status(200).json({liked:true,message:"liked"})
        


    }catch (error){
        res.status(500).json({ message: err.message });

    }
}

//get liked count for a video
 const getLikes = async(req,res)=>{
const {videoId} =req.params

try{
const count =await like.countDocuments({videoId})
res.status(200).json({likes:count})
}catch (err){
res.status(500).json({ message: err.message });
}
 }

 module.exports = { toggleLike, getLikes };