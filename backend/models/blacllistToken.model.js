const mongoose =require ('mongoose')

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        deafualt:Date.now,
        expires:86400 //24hrs in seconds
    }
})

module.exports=mongoose.model('blacklistToken',blacklistTokenSchema)