const http =require("http")
const app =require('./app')
const connectToDB =require('./config/db.config')
const port =process.env.PORT || 5000

const server = http.createServer(app)
connectToDB()

server.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})