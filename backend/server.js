const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);

// socket io server
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
var cors = require('cors');
app.use(cors());


const room = {};
const users = new Map();

function addValueToList(key, value) {
    //if the list is already created for the "key", then uses it
    //else creates new list for the "key" to store multiple values in it.
    room[key] = room[key] || [];
    room[key].push(value);
}

io.on("connection", (socket) => {

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(roomId);
        socket.broadcast.to(roomId).emit('new-user-joined', socket.id);
        socket.emit('user-data', room[roomId]);
        addValueToList(roomId,socket.id);
        users.set(socket.id, roomId);

        socket.on('disconnect',(err)=>{
            console.log(err);
            socket.broadcast.to(users.get(socket.id)).emit('disconnected', socket.id);

            // erase user
            if(room[users.get(socket.id)]){
                const index = room[users.get(socket.id)].indexOf(socket.id);
                room[users.get(socket.id)].splice(index,1);
                
                users.delete(socket.id);
            }
        })
    });
    
    socket.on("code-file-change", (msg) => {
        let {text,roomId} = msg;
        socket.broadcast.to(roomId).emit('code-file-change', text);
    });
    socket.on("input-file-change", (msg) => {
        let {text,roomId} = msg;
        socket.broadcast.to(roomId).emit('input-file-change', text);
    });
    socket.on("output-file-change", (msg) => {
        let {text,roomId} = msg;
        socket.broadcast.to(roomId).emit('output-file-change', text);
    });
    
    socket.on("init-signal", (msg) => {
        let {to,from,data} = msg;
        //  send signal to user 'to'
        console.log(to);
        io.to(to).emit('get-signal', {from,data});
    })
    
    socket.on("lang-change", msg => {
        let {newLang, roomId} = msg;
        socket.broadcast.to(roomId).emit('lang-change', newLang);
        
    })
    
    socket.on("compile-code", roomId => {
        socket.broadcast.to(roomId).emit('compile-code', {});
    })
    
    
});

// const PORT = process.env.PORT || 3000;

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
