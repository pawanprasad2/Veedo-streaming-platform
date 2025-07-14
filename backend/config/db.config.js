const mongoose =require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(()=>{
        console.log('connected to db')
    })

    .catch((err)=>{
        console.error('mongoDB connection error',err)
        process.exit(1) //process exit if connection fails
    })
}

module.exports=connectToDB