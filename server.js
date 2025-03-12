const express = require("express")
// const {Server} = require("socket.io")
const http = require("http")
const cors = require("cors")
const socket = require("socket.io")
const app = express()
app.use(cors({
    origin:"*",
    credentials: true
}))
app.use(express.json())


const server = http.createServer(app)
const io = socket(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true
    }
});

io.on('connection',(socket)=>{
    console.log("User Connected: ",socket.id)

    socket.on("send all", (data)=>{
        console.log(data)
        io.emit("reveive all", data)
    })
    
    socket.on("send personal msg",(data)=>{
        const {id, message} = data;
        console.log(data)
        io.to(id).emit("receive personal msg",({message,id: socket.id}))
    })

    socket.on("disconnect",(msg)=>{
        console.log("disconnected: ",msg)
    })
})



server.listen(4000,()=>{
    console.log("online")
    
})
