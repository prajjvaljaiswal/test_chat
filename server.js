const express = require("express")
const {Server} = require("socket.io")
const http = require("http")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
    transports: ["websocket"]
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
})

server.listen(4000,()=>{
    console.log("online")
})
