import express from 'express';
import { Socket, Server } from 'socket.io';

const app = express();

const server = app.listen(3000, () => {
    console.log('Server started on port 3000');
});

const io = new Server(server);
const nsp = io.of('/dummy');

app.get('/', (req, res) => {
    res.send('Hello World!');
});


//connection for the room
nsp.on('connection', (socket: Socket) => {
    console.log('Connected to dummy namespace');
    socket.emit('success', "hello is this working?");
    
    socket.on('execute', (data:string)=>{
        console.log(data);
    })
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
})


//connection for everyone else
io.on('connection', (socket: Socket) => {
    console.log('New client connected');
    socket.emit('success', "hello is this working?");
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});