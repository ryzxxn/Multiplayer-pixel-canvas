const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')

const cors = require('cors')
const { Socket } = require('dgram')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin: "*"
    }
})

io.on('connection', (socket) => {
    // console.log("user Connected: " + socket.id);

    socket.on('message', (message) =>{
        console.log("User: " + socket.id + ": " + message);
        if (message) {
            io.emit('chats', message)
        }
    })

    socket.on('pixel-data', (pixelData) =>{
        if (pixelData) {
            io.emit('pixel-client', pixelData)
        }
    })
})

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
})