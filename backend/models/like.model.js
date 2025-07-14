const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,

    },
    videoId:{
        type:String,
        required:true,   
    },

},{timestamps:true})

module.exports= mongoose.model("like",likeSchema)